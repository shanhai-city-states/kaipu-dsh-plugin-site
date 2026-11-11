"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopShelf = ShopShelf;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * 山海·开铺 · 场地插件 · client half —— **铺子资料**（本机目录）
 * =====================================================================
 * 用户自己的资料放在哪儿、放进去了什么、怎么拿出来用 —— 这一块只回答这三个问题。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 为什么它**自取数据**，不从面板快照那条链上拿
 * ══════════════════════════════════════════════════════════════════
 * 它读写的是**本机目录**，与"接没接上服务端"毫无关系。
 * 若把它挂到快照链上，就会出现最荒唐的一种状态：
 *   **未接入服务端 ⇒ 连自己的文件都看不见了**。
 * ⇒ 它自己经 `currentConnection()` 调 host（与本仓 `run.ts` 同款做法），
 *   自成一体：服务端挂了、演示模式下，它**照常工作**。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 为什么把「数据根路径」摆在界面上
 * ══════════════════════════════════════════════════════════════════
 * 用户有权知道自己的东西存在哪里 —— 能自己去打开、去备份、去拷走。
 * "我们知道但不告诉你"是这一层最不该有的姿态。
 * ⇒ 路径以小字常驻，配一个「复制」。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 拖放的**两处** `preventDefault` 都是必须的（少一处就废）
 * ══════════════════════════════════════════════════════════════════
 *   · `onDragOver` 不拦 ⇒ 浏览器**不认这是落点**，`drop` 根本不触发；
 *   · `onDrop`     不拦 ⇒ 浏览器会「导航到该文件」，**整个页面被换掉**。
 * 两者症状完全不同，但都会被当成"拖放没做"。写在这里省下一次排查。
 */
const react_1 = require("react");
const kaipu_contract_1 = require("@shanhai/kaipu-contract");
const bridge_js_1 = require("./bridge.js");
const live_js_1 = require("./live.js");
const theme_js_1 = require("./theme.js");
/* ─────────────────────── 小工具 ─────────────────────── */
function fmtSize(n) {
    if (n < 1024)
        return `${String(n)} B`;
    if (n < 1024 * 1024)
        return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
function fmtTime(ms) {
    const d = new Date(ms);
    const p = (x) => String(x).padStart(2, '0');
    return `${String(d.getFullYear())}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
/**
 * `ArrayBuffer` → base64。
 * ★ 分块拼串：`String.fromCharCode(...bytes)` 一次摊开几 MB 会**爆栈**
 *   （`Maximum call stack size exceeded`）—— 而拖进来的文件经常不止几百 KB。
 */
function toBase64(buf) {
    const bytes = new Uint8Array(buf);
    const CHUNK = 0x8000;
    let bin = '';
    for (let i = 0; i < bytes.length; i += CHUNK) {
        bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
    }
    return btoa(bin);
}
/**
 * ★★ 三个抽屉**一次性全列**（一次调用拿全部，不是三次往返）：
 *   抽屉只有三个，用户一眼看完比"点一下等一次"强。
 */
function ShopShelf({ onFill, onGoRun, open, onToggleOpen, }) {
    const [payload, setPayload] = (0, react_1.useState)(null);
    /** 读失败的原因（★ 与"读到了但是空的"必须分开表达） */
    const [loadErr, setLoadErr] = (0, react_1.useState)(null);
    /** 正在做什么（上传/删除/读取时的提示）。`null` = 空闲 */
    const [busy, setBusy] = (0, react_1.useState)(null);
    /** 本次动作的结果提示（成功与失败都往这里写，**如实说**） */
    const [note, setNote] = (0, react_1.useState)(null);
    /** 当前被拖到哪个抽屉上方（高亮用） */
    const [over, setOver] = (0, react_1.useState)(null);
    /** 「开始运行」按钮的悬停态（inline style 写不了 `:hover`，用它换色） */
    const [runHover, setRunHover] = (0, react_1.useState)(false);
    /* ★ 折叠状态**不在这里** —— 它由装配层持有（见 ShopShelfProps.open 的注释）。
       这里只留"正在忙什么/提示什么"这类**本块私有**的状态。 */
    const reload = (0, react_1.useCallback)(async () => {
        const conn = (0, live_js_1.currentConnection)();
        if (conn === null) {
            setLoadErr('没取到宿主的数据通道，这一块暂时读不了。这是环境问题，不是文件坏了。');
            return;
        }
        const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.listShopFiles, {});
        if (r.ok === true) {
            setPayload(r.data);
            setLoadErr(null);
        }
        else {
            setLoadErr('business' in r ? r.business.message : r.error.detail);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        void reload();
    }, [reload]);
    /**
     * 打开系统文件管理器（2026-10-06）。
     *
     * ★ 本机操作，与"接没接上服务端"无关 —— 未接入时它**照常可用**
     *   （与这一层其它能力同一条口径：没接入服务端从来不是"自己不能用"的理由）。
     *
     * ★★ 措辞是「**已请**系统打开」，**不是「已打开」** —— host 只回"已发起"，
     *   文件管理器窗口是否真的弹出，这一层无法确证。
     *   说"已打开"就是在陈述一件没被验证的事。
     *
     * ★ 打不开时**降级到「复制」那条路**，并把原因如实说出来 ——
     *   用户永远留着"自己拿路径去资源管理器打开"的出路，不会卡死在这儿。
     */
    const openDir = (0, react_1.useCallback)(async () => {
        const conn = (0, live_js_1.currentConnection)();
        if (conn === null) {
            setNote('这个环境打不开文件管理器（没取到宿主通道）—— 用「复制」把路径粘到资源管理器里打开即可。');
            return;
        }
        setNote(null);
        const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.openShopDir, {});
        if (r.ok === true) {
            setNote(`已请系统打开：${r.data.path}`);
        }
        else {
            const why = 'business' in r ? r.business.message : r.error.detail;
            setNote(`打不开文件管理器（${why}）—— 用「复制」把路径粘到资源管理器里打开即可。`);
        }
    }, []);
    /* ── 放进文件 ── */
    const put = (0, react_1.useCallback)(async (sub, list) => {
        const conn = (0, live_js_1.currentConnection)();
        if (conn === null || list === null || list.length === 0)
            return;
        const picked = Array.from(list);
        setBusy(`正在放进「${sub}」（${String(picked.length)} 个）…`);
        setNote(null);
        try {
            const files = [];
            for (const f of picked) {
                // ★ 逐个读，读完才发一次请求 —— 请求体是**一元**的（一次调用一次响应）
                files.push({ name: f.name, base64: toBase64(await f.arrayBuffer()) });
            }
            const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.writeShopFiles, { sub, files });
            if (r.ok === true) {
                const { written, failed } = r.data;
                const okPart = written.length > 0 ? `放进去了 ${String(written.length)} 个` : '';
                // ★ 失败的**逐个列出来**（含原因），不折成"部分成功"一句空话
                const badPart = failed.map((f) => `${f.name}：${f.error}`).join('；');
                setNote([okPart, badPart].filter((s) => s !== '').join(' ｜ ') || '没有文件被放进');
            }
            else {
                setNote(`没能放进去：${'business' in r ? r.business.message : r.error.detail}`);
            }
        }
        catch (e) {
            setNote(`没能放进去：${e instanceof Error ? e.message : String(e)}`);
        }
        finally {
            setBusy(null);
            setOver(null);
            await reload();
        }
    }, [reload]);
    /* ── 删除 ── */
    const drop = (0, react_1.useCallback)(async (sub, name) => {
        const conn = (0, live_js_1.currentConnection)();
        if (conn === null)
            return;
        setBusy(`正在删除 ${name}…`);
        setNote(null);
        try {
            const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.removeShopFile, { sub, name });
            setNote(r.ok === true ? `已删除 ${name}` : `没删掉：${'business' in r ? r.business.message : r.error.detail}`);
        }
        finally {
            setBusy(null);
            await reload();
        }
    }, [reload]);
    /* ── 读成文本（填入待审内容） ── */
    const pick = (0, react_1.useCallback)(async (sub, name) => {
        const conn = (0, live_js_1.currentConnection)();
        if (conn === null || onFill === null)
            return;
        setBusy(`正在读 ${name}…`);
        setNote(null);
        try {
            const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.readShopTextFile, { sub, name });
            if (r.ok === true) {
                onFill(r.data.text, name);
                setNote(r.data.truncated
                    ? `已填入待审内容（★ 这份文件较大，只读回了前 ${fmtSize(r.data.text.length)} —— 完整文件仍在抽屉里）`
                    : `已填入待审内容（${fmtSize(r.data.size)}）`);
            }
            else {
                setNote('business' in r ? r.business.message : r.error.detail);
            }
        }
        finally {
            setBusy(null);
        }
    }, [onFill]);
    const files = payload?.files ?? [];
    const bySub = (sub) => files.filter((f) => f.sub === sub);
    /* ── 读不到时：**如实说**，且不摆出"空抽屉"的样子骗人 ── */
    if (loadErr !== null) {
        return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-shop": "1", style: { marginTop: 16, padding: '0 14px', fontSize: theme_js_1.FS.small, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.dim }, children: "\u94FA\u5B50\u8D44\u6599" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 4, color: '#b45309' }, children: ["\u8FD9\u4E00\u5757\u6682\u65F6\u8BFB\u4E0D\u4E86\uFF1A", loadErr] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-shop": "1", style: { marginTop: 16, padding: '0 14px', fontSize: theme_js_1.FS.small, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 8 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u94FA\u5B50\u8D44\u6599" }), (0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-shop-toggle": "1", "aria-label": open ? '收起铺子资料' : '展开铺子资料', "aria-expanded": open, onClick: onToggleOpen, style: {
                            marginLeft: 'auto',
                            fontSize: theme_js_1.FS.small,
                            padding: '1px 8px',
                            border: `1px solid ${theme_js_1.C.border}`,
                            borderRadius: 4,
                            background: 'transparent',
                            color: theme_js_1.C.dim,
                            cursor: 'pointer',
                            font: 'inherit',
                        }, children: open ? '收起' : '展开' })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 4, color: theme_js_1.C.text }, children: "\u8FD9\u4E09\u4E2A\u62BD\u5C49\u5C31\u662F\u300C\u4F60\u81EA\u5DF1\u7684\u8D44\u6599\u300D\u2014\u2014\u5B83\u4EEC\u5B58\u5728\u672C\u673A\uFF0C\u4E0D\u968F\u63D2\u4EF6\u88C5\u5378\u800C\u6D88\u5931\u3002" }), onGoRun !== null && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u4E1C\u897F\u653E\u597D\u4E86\u5C31\uFF1A" }), (0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-shop-run": "1", onClick: onGoRun, onMouseEnter: () => setRunHover(true), onMouseLeave: () => setRunHover(false), style: {
                            fontSize: theme_js_1.FS.small,
                            padding: '4px 14px',
                            borderRadius: 6,
                            // ★★ 暖金「灯火」用色 —— **与 SeatLampPanel 的「点亮第一盏灯」逐字同一套**
                            //   （`#C8881F` 描边 / `rgba(200,136,31,0.12)` 底 / `#A66A12` 字，见 `DESIGN.md` §5）。
                            //   ★ 为什么不另调一个色：同一个面板里"暖金"已经锚定为**可以开始做事**的意思，
                            //     再造一个相近色只会让人以为它们是两种状态（本项目踩过："同一件事两处各说各话"）。
                            //   ★ 为什么加个 `▸`：这一页有三个抽屉、一行说明、一串小按钮，
                            //     纯文字按钮在这一堆里**没有落点**；一个随开始/停止语境通用的三角
                            //     足以让人一眼看到"这一步是往前走的"，又不至于像彩色大按钮那样抢戏。
                            border: `1px solid ${runHover ? '#A66A12' : '#C8881F'}`,
                            background: runHover ? 'rgba(200,136,31,0.20)' : 'rgba(200,136,31,0.12)',
                            color: '#A66A12',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'background 120ms ease, border-color 120ms ease',
                            // ⚠️⚠️ `font` 是**简写属性**，会把上面写好的 `fontSize` / `fontWeight`
                            //   **一并重置**。本项目原来把它写在字号字重**之后** ⇒ 那两行全部失效
                            //   （2026-10-08 用 CDP 读 computed style 当场读到 `fontWeight: 400`，
                            //     而代码里写的是 600 —— 光看代码永远发现不了）。
                            //   ⇒ 简写放**最后**，再补上想加的覆盖。
                            font: 'inherit',
                            fontWeight: 600,
                        }, children: "\u25B8 \u5F00\u59CB\u8FD0\u884C" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\uFF08\u56DE\u5230\u64CD\u4F5C\u53F0\uFF0C\u53D1\u8D77\u533A\u4F1A\u5728\u6B63\u4E2D\u95F4\uFF09" })] })), !open ? null : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [payload !== null && payload.root !== '' && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 4, color: theme_js_1.C.dim, wordBreak: 'break-all' }, children: ["\u5B58\u5728\u672C\u673A\uFF1A", payload.root, (0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-shop-opendir": "1", onClick: () => {
                                    void openDir();
                                }, style: {
                                    marginLeft: 6,
                                    fontSize: theme_js_1.FS.small,
                                    padding: '0 6px',
                                    border: `1px solid ${theme_js_1.C.border}`,
                                    borderRadius: 4,
                                    background: 'transparent',
                                    color: theme_js_1.C.text,
                                    cursor: 'pointer',
                                    font: 'inherit',
                                    whiteSpace: 'nowrap',
                                }, children: "\u6253\u5F00\u76EE\u5F55" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                    void navigator.clipboard?.writeText(payload.root);
                                    setNote('路径已复制');
                                }, style: {
                                    marginLeft: 4,
                                    fontSize: theme_js_1.FS.small,
                                    padding: '0 6px',
                                    border: `1px solid ${theme_js_1.C.border}`,
                                    borderRadius: 4,
                                    background: 'transparent',
                                    color: theme_js_1.C.dim,
                                    cursor: 'pointer',
                                    font: 'inherit',
                                    whiteSpace: 'nowrap',
                                }, children: "\u590D\u5236" })] })), payload?.unavailable !== undefined && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 4, color: '#b45309' }, children: ["\u6709\u4E00\u5904\u8BFB\u4E0D\u4E86\uFF1A", payload.unavailable] })), busy !== null && (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, color: theme_js_1.C.dim }, children: busy }), note !== null && (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, color: theme_js_1.C.dim }, children: note }), kaipu_contract_1.SHOP_SUBDIRS.map((sub) => {
                        const rows = bySub(sub);
                        const hot = over === sub;
                        return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-shop-drawers": sub, 
                            // ★★ 两处 preventDefault 缺一不可（见文件头）
                            onDragOver: (e) => {
                                e.preventDefault();
                                if (over !== sub)
                                    setOver(sub);
                            }, onDragLeave: () => {
                                if (over === sub)
                                    setOver(null);
                            }, onDrop: (e) => {
                                e.preventDefault();
                                void put(sub, e.dataTransfer?.files ?? null);
                            }, style: {
                                marginTop: 8,
                                padding: '8px 10px',
                                border: `1px ${hot ? 'dashed' : 'solid'} ${hot ? '#2563eb' : theme_js_1.C.border}`,
                                borderRadius: 4,
                                background: hot ? 'rgba(37,99,235,0.06)' : 'transparent',
                            }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("span", { children: sub }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: rows.length > 0 ? `${String(rows.length)} 个` : '' }), (0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 'auto', color: theme_js_1.C.dim }, children: "\u62D6\u6587\u4EF6\u5230\u8FD9\u91CC" })] }), rows.length === 0 && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 3, color: theme_js_1.C.dim }, children: sub === '待审材料'
                                        ? '要审的东西放这儿 —— 拖进来就行。'
                                        : sub === '审校报告'
                                            ? '这里放审过之后留下的结论。'
                                            : '断网也照样能写的东西放这儿。' })), rows.map((f) => ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 5, display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { wordBreak: 'break-all' }, children: f.name }), (0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.dim }, children: [fmtSize(f.size), " \u00B7 ", fmtTime(f.mtimeMs)] }), (0, jsx_runtime_1.jsxs)("span", { style: { marginLeft: 'auto', display: 'flex', gap: 4 }, children: [f.readable && onFill !== null && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                                        void pick(f.sub, f.name);
                                                    }, style: {
                                                        fontSize: theme_js_1.FS.small,
                                                        padding: '0 6px',
                                                        border: `1px solid ${theme_js_1.C.border}`,
                                                        borderRadius: 4,
                                                        background: 'transparent',
                                                        color: 'inherit',
                                                        cursor: 'pointer',
                                                        font: 'inherit',
                                                    }, children: "\u586B\u5165\u5F85\u5BA1\u5185\u5BB9" })), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                                        void drop(f.sub, f.name);
                                                    }, style: {
                                                        fontSize: theme_js_1.FS.small,
                                                        padding: '0 6px',
                                                        border: `1px solid ${theme_js_1.C.border}`,
                                                        borderRadius: 4,
                                                        background: 'transparent',
                                                        color: theme_js_1.C.dim,
                                                        cursor: 'pointer',
                                                        font: 'inherit',
                                                    }, children: "\u5220\u9664" })] })] }, f.name)))] }, sub));
                    })] }))] }));
}
//# sourceMappingURL=ShopShelf.js.map