"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatLampPanel = SeatLampPanel;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * 山海·开铺 · 场地插件 · 左栏之外的**第二块展示面**：「这场谁来审」+「要过哪几面」
 * =====================================================================
 * 回答两个用户在**发起之前**就该知道的问题：
 *   · **这场谁来审** —— 执行 / 审计 / 管理 / 签名 四个位，当前各自由谁承担；
 *   · **要过哪几面** —— 这场有几个审核面，每个面管什么。
 *
 * ★ 设计稿（位与灯分开画 · v2.1/v2.2 口径）。发起人 2026-10-08 定稿认可。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 为什么这块**必须**长在 `[data-kaipu-run]` **之外**（不是审美，是判据）
 * ══════════════════════════════════════════════════════════════════
 * 探针有一条 R4 断言：「被裁剪的审核面（`仁灯`）在**报告**里可见」——
 * 它读的正是 `[data-kaipu-run]` 区块**内**的文本。
 * 而本块按设计就会列出**全部审核面**（含 `仁灯`）。
 * ⇒ 若把本块塞进运行视图，那条断言会**恒真**：不管报告里有没有仁灯，
 *   它都能在灯栏里找到「仁灯」两个字。**一个不会失败的断言等于没有断言。**
 * ★ 这不是"判据写得不好"，而是**新内容越过了判据边界**。那节口径的原话：
 *   「**先隔离，再展示**」，且「**新增锚点必须在 `data-kaipu-run` 之外**」。
 * ★ 同类先例：`ProcessFacts`（`data-kaipu-process`）与 `Intro` 卡都照此处理。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★ 两个取数口径（**权威源已钉死 = `GET /roles/seats`**）
 * ══════════════════════════════════════════════════════════════════
 *   · **位名**（执行位/审计位/…）：★ 钉死以 `/roles/seats[].label`（租户级配置）为准。
 *     **当前我方不接该端点** —— 因为服务端明确「你不必现在改：
 *     `seatHolders[]` 保留 ⇒ 你现状可不动」，并建议 **v1.6 落地后再新接 `/roles/seats`**。
 *     ⇒ 现在用常量 `SEAT_LABEL` 把 key 译成中文（同义兜底；v1.6 后改为读 `label`）。
 *     ★ **重要实测**：`seatHolders[]` 是**租户级数据在 N 个场景里的 N 份拷贝**，
 *       根本不跟场景走 —— 所以位栏本质是「**本开铺**由谁审」，不是「这场戏谁来审」。
 *   · **承担方名**：一律取 `holderName`（**不硬编码「山海」**）—— 发起人 2026-10-08 明确
 *     「管理位不一定姓山海，可以是**项目主持人**，也可以是**委托方自己**」；
 *     已钉死：**管理位由铺主（委托方）指派**，值域 `builtin/client/none`。
 *     `holderType === 'none'`、或响应里根本没这一位 ⇒ 如实显示「没人 / 未登记」，
 *     **不替它编一个名字**（编了就是编事实）。
 *   · **位行带「可改 / 不可改 / 🔒 锁死」纯展示标签（非控件）**：已确认
 *     **P1 期客户端无自助改入口** —— 所以这只是**把既定政策标出来**（谁有资格改这个位），
 *     **不是**一个可点控件。样式用淡色纯文本（与灯栏「待接入」同款），不画边框、不挂
 *     `cursor:pointer`，避免被读成"这里能改"。政策依据见 `SEAT_EDITABLE` 注释与文件末注释。
 */
const react_1 = require("react");
const bridge_js_1 = require("./bridge.js");
const live_js_1 = require("./live.js");
const theme_js_1 = require("./theme.js");
/**
 * ★★ 四个位的**固定顺序与位名** —— 这是本文件里唯一"可能要改"的一处。
 *
 * **为什么用常量而不是"有什么画什么"**：
 *   契约 v1.5 §23.3 说 `seatHolders`「各场景 4 项」，但**万一**某场景少一项，
 *   "少一项"与"这一位没人"是**两件不同的事**（前者是响应缺字段，后者是 `holderType:'none'`）。
 *   ⇒ 以契约的**四席为准**逐位渲染，缺的落「未登记」兜底 ——
 *     两者在界面上**看得出来**，不会糊成一句"没人"。
 *
 * **为什么现在是常量（而不是取 `/roles/seats[].label`）**：
 *   已钉死**权威源 = `GET /roles/seats`**，但同时也明确
 *   「**你不必现在改**：`seatHolders[]` 保留 ⇒ 你现状可不动；等 v1.6 落地后建议新接 `/roles/seats`」。
 *   ⇒ 现在仍用常量译 `seat` key 的位名（同义兜底，因 `seatHolders[]` 无 `label` 字段）。
 *   **将来切换点（唯一一处）**：v1.6 落地后，把 `SEAT_LABEL` 换成从 `/roles/seats[].label` 读，
 *   **行形态一行都不用动**；取数从 `scene.seatHolders` 改为一次拉 `/roles/seats`（租户级、可缓存）。
 *
 * ★ `seat` 取值域（实测四席）来自契约 `seats.json`，不是自编。
 */
/* ★ 2026-10-23（083 单 G-4 · 星月）：**签名位挪到 1 号位**。
 *   为什么是它排第一：签名是审计流程的**最后一环**，也是整条链的出口 ——
 *   用户在这一排里先看到「签没签」，才明白前面四个位在为什么服务。
 *   ★ 顺序是「流程顺序」，不是「权限大小」，所以不写"级别"含义。 */
const SEAT_ORDER = ['signature', 'execution', 'audit', 'management'];
/* ★ 2026-10-23（G-4）：**签名位不进邀请抽屉**。
 *   抽屉干的事是「请个人来坐这个位」；签名位是契约层结构性锁死、
 *   由系统在送审闭环里落章 —— 它出现在「邀请谁」的勾选清单里，
 *   就是「标了锁死却还能邀请」的语义打架（星月原文：语义矛盾）。
 *   ⇒ 抽屉只列可请人的位，签名位不出现；它在位栏里照常显示状态。 */
const INVITE_SEATS = SEAT_ORDER.filter((s) => s !== 'signature');
/* ★ 2026-10-23（G-4）：签名位**不单独给按钮** —— 用户只点「申请送审」。
 *   状态只有两种说法：「⛨ 山海已签」/「⛨ 待签」。
 *   为什么不像别的位那样写「未指派」：签名方不是一个"座位上的同事"，
 *   是场地底座，人不需要去指派它，只需要知道「签了 / 还没签」。 */
function signatureLabel(h) {
    const signed = h !== undefined && h.holderType !== 'none' && h.holderName.trim() !== '';
    return signed ? '⛨ 山海已签' : '⛨ 待签';
}
const SEAT_LABEL = {
    execution: '执行位',
    audit: '审计位',
    management: '管理位',
    signature: '签名位',
};
/**
 * ★ 每个位「谁有资格改」的既定政策（**纯展示标签用，不控制任何行为**）。
 *
 * 依据：定案「P1 阶段客户**只能改执行位与审计位**，管理位与签名位不可改。」
 *   · 执行位 / 审计位 ⇒ `可改`：这两位在 P1 就是可重派的（由管理位/铺主指派），
 *     标「可改」= 陈述"这个位允许被改"这一事实，**不暗示界面上有按钮**。
 *   · 管理位 ⇒ `不可改`：定案说客户不能自助改；但它**由铺主指派**（已钉死），
 *     本质是"指派给谁"的问题，不是"锁死"——故用「不可改」而非「锁死」。
 *   · 签名位 ⇒ `🔒 锁死`：契约层**结构性不可改**（签名身份是场地底座的硬约束），
 *     不是策略层的"暂不许"，故用「锁死」标其性质。
 *
 * ★ 这三类标签**都是纯文本**（淡色、无边框、无 pointer），刻意**不做成控件** ——
 *   避免"标了可改却点不动"这类界面说了不成立的话。政策若随 v1.6 / P2.5 调整，只改这一个常量。
 */
const SEAT_EDITABLE = {
    execution: true,
    audit: true,
    management: false,
    signature: false,
};
/** 位行右侧的「可改性」标签（纯展示，非控件）。 */
function editLabelOf(seat) {
    if (SEAT_EDITABLE[seat] === true)
        return '可改';
    return seat === 'signature' ? '🔒 锁死' : '不可改';
}
/**
 * ★ 承担方名 —— 三种"没有人"必须**分开说**，不能糊成一句：
 *   · 响应里没这一位     ⇒ 「未登记」（**是数据缺口**，该去问服务端）
 *   · `holderType:'none'` ⇒ 「未指派」（**是事实**：这个位现在没人）
 *   · `none` 但有名字     ⇒ 仍按 `holderType` 判 —— 名字是服务端给的标签，位置状态以类型为准
 *   ★ 空名字（`''`）也归「未指派」：界面上不能出现一个**光秃秃的空格**当人名。
 */
function holderLabel(h) {
    if (h === undefined)
        return { text: '（未登记）', muted: true };
    if (h.holderType === 'none' || h.holderName.trim() === '')
        return { text: '（未指派）', muted: true };
    return { text: h.holderName, muted: false };
}
function SeatLampPanel({ scene }) {
    // ★★ Hooks 必须在 early return **之前**（React 规则：条件返回后不能再挂 hooks）
    // ── 指派已有执行方（能力保留，入口收进邀请抽屉 —— 2026-10-18 发起人裁定）──
    const [editing, setEditing] = (0, react_1.useState)(null);
    const [cands, setCands] = (0, react_1.useState)([]);
    const [busy, setBusy] = (0, react_1.useState)(false);
    const [note, setNote] = (0, react_1.useState)(null);
    // ── ★ 邀请协作方 · **抽屉式**（2026-10-18 · 发起人重画了交互）──────────────
    //   原来是两处入口：行内「可改」按钮（点开=换已有执行方）+ 标题行「＋邀请协作方」
    //   （点开=小表单选灯位）。发起人反馈：行内「可改」点开没意义；他想象中的形态是
    //   —— 点「邀请」→ **抽屉**里把四个位摆出来（位名 + 当前承担方 + 可改性），
    //   **勾选**可改的位 → 生成邀请链接。
    //   ⇒ 按他画的改：行内按钮撤掉（恢复纯文本标签），邀请入口只剩一个，
    //     抽屉里"看位 → 勾位 → 出链接"一条线走完。
    const [inviting, setInviting] = (0, react_1.useState)(false);
    /** 勾选了哪些位（只有 `可改` 的位可勾；默认全勾 —— 打开后一步就能生成） */
    const [picked, setPicked] = (0, react_1.useState)([]);
    const [invNote, setInvNote] = (0, react_1.useState)('');
    const [invBusy, setInvBusy] = (0, react_1.useState)(false);
    const [invErr, setInvErr] = (0, react_1.useState)(null);
    const [invResults, setInvResults] = (0, react_1.useState)([]);
    /**
     * 抽屉里的「生成邀请链接」：对**每个勾选的位**各生成一条一次性链接。
     * ★ `seat` 走勾选值（execution/audit…）；`lamp` 取该场景**第一个待接入**的审核面
     *   （全接入则退第一个）—— 对方 Agent 接进来先补"缺人"的那面，这是最自然的落位。
     * ★ 有效期、一次性消费、码的随机性全在服务端；前端只负责发起与展示。
     */
    const doInvitePicked = (0, react_1.useCallback)(async () => {
        const conn = (0, live_js_1.currentConnection)();
        if (!conn) {
            setInvErr('还没接上服务端，发不了邀请。');
            return;
        }
        if (picked.length === 0) {
            setInvErr('先勾选要请人的位。');
            return;
        }
        const lamp = scene?.lamps?.find((l) => l.agentId === null)?.lamp ?? scene?.lamps?.[0]?.lamp ?? '';
        if (lamp === '') {
            setInvErr('这一场还没有可接入的审核面。');
            return;
        }
        setInvBusy(true);
        setInvErr(null);
        const got = [];
        for (const seat of picked) {
            const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.createInvite, {
                lamp,
                seat,
                note: invNote,
                ttlDays: 7,
            });
            if (r.ok === true) {
                got.push({ seat, url: String(r.data.url ?? ''), expiresAt: String(r.data.expiresAt ?? '') });
            }
            else {
                setInvErr('business' in r ? r.business.message : r.error.detail);
                break;
            }
        }
        setInvBusy(false);
        if (got.length > 0)
            setInvResults(got);
    }, [picked, invNote, scene]);
    /**
     * 点「可改」→ 拉可选执行方。
     * ★ 候选来自 `GET /agents`（本铺 + 平台级），**不在前端硬编码** ——
     *   谁有资格当执行方是服务端的事实，不是界面常量。
     */
    const openEditor = (0, react_1.useCallback)(async (seat) => {
        setNote(null);
        setCands([]);
        setEditing((cur) => (cur === seat ? null : seat));
        const conn = (0, live_js_1.currentConnection)();
        if (!conn) {
            setNote('还没接上服务端，改不了。');
            return;
        }
        const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.listAgents, {});
        if (r.ok === true) {
            const list = (r.data.agents ?? [])
                .filter((a) => typeof a.id === 'string' && a.id !== '')
                .map((a) => ({ id: String(a.id), name: String(a.name ?? a.id) }));
            setCands(list);
            if (list.length === 0)
                setNote('这个开铺里还没有可以指派的执行方。');
        }
        else {
            setNote('读不到可选执行方。');
        }
    }, []);
    const doAssign = (0, react_1.useCallback)(async (seat, id, name) => {
        const conn = (0, live_js_1.currentConnection)();
        if (!conn) {
            setNote('还没接上服务端，改不了。');
            return;
        }
        setBusy(true);
        const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.assignSeat, { seat, holderId: id, holderName: name, reason: '' });
        setBusy(false);
        if (r.ok === true) {
            setEditing(null);
            setNote(`已改成「${name}」—— 重新打开面板即可看到。`);
        }
        else {
            // ★ 服务端的话原样给用户看（签名位 403 / 兼任 409 都在这里出）
            setNote('business' in r ? r.business.message : r.error.detail);
        }
    }, []);
    // ★ 没选场景 ⇒ 什么都不画（与 `ProcessFacts` 同款：不占位、不留空壳）
    if (scene === null)
        return null;
    const holders = new Map((scene.seatHolders ?? []).map((h) => [h.seat, h]));
    return (
    // ★ `data-kaipu-seatlamp` = 本块的**判据锚点**，探针据此断言"它在 run 之外"
    (0, jsx_runtime_1.jsxs)("section", { "data-kaipu-seatlamp": "1", style: { padding: '14px 14px 0' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, fontWeight: 500, color: theme_js_1.C.text }, children: scene.label }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 2, lineHeight: theme_js_1.LH.tight }, children: "\u53D1\u8D77\u4E4B\u524D\u5148\u770B\u6E05\u4E24\u4EF6\u4E8B\uFF1A\u8C01\u5728\u5E2E\u4F60\u505A\uFF0C\u4EE5\u53CA\u8981\u8FC7\u54EA\u51E0\u9762\u3002" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 12 }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: ["\u89D2\u8272\u4F4D \u00B7 \u672C\u5F00\u94FA\u8C01\u6765\u5BA1 \u00B7 ", SEAT_ORDER.length, " \u4E2A\u4F4D"] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                            const next = !inviting;
                            setInviting(next);
                            setInvErr(null);
                            setInvResults([]);
                            setEditing(null);
                            // ★ 打开抽屉 ⇒ 默认把两个可改位勾上 —— "打开 → 生成"两步走完；
                            //   不想请某一位就取消勾选（勾选权仍在用户手里）
                            setPicked(next ? SEAT_ORDER.filter((k) => SEAT_EDITABLE[k] === true) : []);
                        }, style: {
                            marginLeft: 'auto', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, background: 'none',
                            border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline',
                        }, children: inviting ? '收起' : '＋ 邀请协作方' })] }), inviting ? ((0, jsx_runtime_1.jsxs)("div", { style: { border: `1px solid ${theme_js_1.C.border}`, borderRadius: 8, padding: '9px 11px', marginTop: 6 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginBottom: 4 }, children: "\u52FE\u9009\u8981\u8BF7\u4EBA\u5750\u7684\u4F4D\uFF0C\u751F\u6210\u4E00\u6B21\u6027\u9080\u8BF7\u94FE\u63A5 \u2014\u2014 \u5BF9\u65B9\u6253\u5F00\u5C31\u80FD\u63A5\u5165\u3002" }), INVITE_SEATS.map((k) => {
                        const { text, muted } = holderLabel(holders.get(k));
                        const editable = SEAT_EDITABLE[k] === true;
                        const checked = picked.includes(k);
                        return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }, children: [editable ? ((0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: checked, onChange: (e) => setPicked((cur) => (e.target.checked ? [...cur, k] : cur.filter((s) => s !== k))), style: { flex: '0 0 auto', margin: 0, accentColor: '#C8881F' } })) : (
                                // ★ 占位对齐：不可改的位没有勾选框，但留同样宽的空位 —— 四行左缘齐
                                (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { flex: '0 0 13px' } })), (0, jsx_runtime_1.jsx)("span", { style: { flex: '0 0 44px', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: SEAT_LABEL[k] ?? k }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: muted ? theme_js_1.C.dim : theme_js_1.C.text, minWidth: 0 }, children: text }), (0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 'auto', flex: '0 0 auto', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: editLabelOf(k) })] }, k));
                    }), invResults.length === 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { value: invNote, onChange: (e) => setInvNote(e.target.value), placeholder: "\u7ED9\u5BF9\u65B9\u7559\u4E00\u53E5\u8BDD\uFF08\u53EF\u9009\uFF09", style: {
                                    width: '100%', boxSizing: 'border-box', fontSize: theme_js_1.FS.tag, padding: '4px 7px',
                                    border: `1px solid ${theme_js_1.C.border}`, borderRadius: 4, marginTop: 4, fontFamily: 'inherit',
                                } }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: invBusy || picked.length === 0, onClick: () => void doInvitePicked(), style: {
                                    width: '100%', marginTop: 7, padding: '7px 12px', borderRadius: 6,
                                    border: `1px solid ${picked.length === 0 || invBusy ? theme_js_1.C.border : '#C8881F'}`,
                                    background: picked.length === 0 || invBusy ? 'transparent' : 'rgba(200,136,31,0.12)',
                                    color: picked.length === 0 || invBusy ? theme_js_1.C.dim : '#A66A12',
                                    cursor: picked.length === 0 || invBusy ? 'default' : 'pointer',
                                    font: 'inherit', fontSize: theme_js_1.FS.small, fontWeight: 600,
                                }, children: invBusy ? '生成中…' : picked.length === 0 ? '先勾选上面的位' : `生成邀请链接（${picked.length} 位）` })] })), invResults.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 6, marginBottom: 3, lineHeight: 1.6 }, children: "\u53D1\u7ED9\u8981\u8BF7\u7684\u90A3\u4F4D\uFF08\u4EBA\u6216\u4ED6\u7684 Agent\uFF09\u00B7 7 \u5929\u6709\u6548 \u00B7 \u4E00\u4E2A\u94FE\u63A5\u53EA\u80FD\u63A5\u4E00\u4E2A\u4F4D" }), invResults.map((r) => ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6, alignItems: 'center', marginTop: 4, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { flex: '0 0 44px', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: SEAT_LABEL[r.seat] ?? r.seat }), (0, jsx_runtime_1.jsx)("input", { readOnly: true, value: r.url, onFocus: (e) => e.currentTarget.select(), style: {
                                            flex: '1 1 160px', minWidth: 0, fontSize: theme_js_1.FS.tag, padding: '3px 6px',
                                            border: `1px solid ${theme_js_1.C.border}`, borderRadius: 3, fontFamily: 'inherit',
                                        } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                            void navigator.clipboard?.writeText(r.url);
                                        }, style: { flex: '0 0 auto', fontSize: theme_js_1.FS.tag, padding: '2px 8px', cursor: 'pointer' }, children: "\u590D\u5236" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                            const who = SEAT_LABEL[r.seat] ?? r.seat;
                                            const msg = [
                                                `邀请你担任「${who}」`,
                                                '',
                                                `打开这个链接接入（7 天有效，一个链接只能接一个人）：`,
                                                r.url,
                                                '',
                                                `接入后你就能在这里领活、交结论、传资料。`,
                                                `完整接入说明在服务端，用你的 agentId + secret 调`,
                                                `POST /kb/guide/index 自取（按你的座位给该看的段落）。`,
                                            ].join('\n');
                                            void navigator.clipboard?.writeText(msg);
                                        }, title: "\u590D\u5236\u4E00\u6BB5\u53EF\u4EE5\u76F4\u63A5\u7C98\u7ED9\u5BF9\u65B9\u7684\u8BDD\uFF08\u542B\u8BF4\u660E\uFF09", style: { flex: '0 0 auto', fontSize: theme_js_1.FS.tag, padding: '2px 8px', cursor: 'pointer' }, children: "\u590D\u5236\u6574\u6BB5\u8BDD" })] }, r.seat))), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 4 }, children: ["\u6709\u6548\u671F\u81F3 ", invResults[0]?.expiresAt ?? '—', (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                            setInvResults([]);
                                            setPicked(SEAT_ORDER.filter((k) => SEAT_EDITABLE[k] === true));
                                        }, style: {
                                            marginLeft: 10, fontSize: theme_js_1.FS.tag, background: 'none', border: 'none',
                                            color: theme_js_1.C.dim, cursor: 'pointer', textDecoration: 'underline', padding: 0,
                                        }, children: "\u518D\u53D1\u4E00\u6279" })] })] })), invErr !== null && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: '#b45309', marginTop: 5, lineHeight: theme_js_1.LH.tight }, children: invErr }))] })) : null, (0, jsx_runtime_1.jsxs)("div", { "data-kaipu-seats": "1", style: { border: `1px solid ${theme_js_1.C.border}`, borderRadius: 4, padding: '3px 10px', marginTop: 4 }, children: [SEAT_ORDER.map((k) => {
                        const { text, muted } = holderLabel(holders.get(k));
                        const editable = SEAT_EDITABLE[k] === true;
                        /* ★ 2026-10-23（G-4）：签名位不按「未登记/未指派」说 —— 它不是座位，是底座。
                           状态只有两种：⛨ 山海已签 / ⛨ 待签。 */
                        const isSig = k === 'signature';
                        return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 8, padding: '3px 0' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { flex: '0 0 44px', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: SEAT_LABEL[k] ?? k }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: muted ? theme_js_1.C.dim : theme_js_1.C.text }, children: isSig ? '' : text }), (0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 'auto', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: isSig ? signatureLabel(holders.get(k)) : editLabelOf(k) })] }), inviting && editable && editing === k && cands.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { padding: '2px 0 8px 13px' }, children: cands.map((a) => ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: busy, onClick: () => void doAssign(k, a.id, a.name), style: {
                                            display: 'block', width: '100%', textAlign: 'left', fontSize: theme_js_1.FS.small,
                                            color: theme_js_1.C.text, background: 'none', border: `1px solid ${theme_js_1.C.border}`,
                                            borderRadius: 3, padding: '3px 8px', marginTop: 4,
                                            cursor: busy ? 'default' : 'pointer',
                                        }, children: a.name }, a.id))) })) : null] }, k));
                    }), note !== null ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, padding: '4px 0 2px' }, children: note })) : null] }), inviting && picked.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 5, display: 'flex', gap: 6, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { children: "\u4E0D\u662F\u8BF7\u65B0\u4EBA\uFF0C\u662F\u628A\u4F4D\u5B50\u6362\u7ED9\u5DF2\u6709\u6267\u884C\u65B9\uFF1F" }), picked.filter((k) => SEAT_EDITABLE[k] === true).map((k) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => void openEditor(k), style: {
                            fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, background: 'none', border: 'none', padding: 0,
                            cursor: 'pointer', textDecoration: 'underline', font: 'inherit',
                        }, children: ["\u6307\u6D3E", SEAT_LABEL[k] ?? k] }, k)))] })), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 12, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: ["\u80FD\u529B\u8FB9\u754C \u00B7 \u8981\u8FC7\u54EA\u51E0\u9762 \u00B7 ", scene.lamps.length, " \u4E2A\u5BA1\u6838\u9762"] }), (0, jsx_runtime_1.jsxs)("div", { "data-kaipu-lamps": "1", style: { border: `1px solid ${theme_js_1.C.border}`, borderRadius: 4, padding: '12px 10px 10px', marginTop: 4 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', justifyContent: 'space-around', gap: 6 }, children: scene.lamps.map((l, i) => {
                            const lit = l.agentId !== null;
                            // ★ hover 说明：把 duty 短名 + dutyNote 长说明 + 连接状态**收进 title**，
                            //   页面本身只留"灯笼 + 名字 + 状态"三层安静信息。
                            const tip = [
                                l.lamp,
                                l.duty !== undefined && l.duty !== '' ? `· ${l.duty}` : '',
                                l.dutyNote !== undefined && l.dutyNote !== '' ? `（${l.dutyNote}）` : '',
                                lit ? '已接入执行方' : '尚未接入执行方 —— 这不是故障，接入后即可点亮',
                            ]
                                .filter(Boolean)
                                .join(' ');
                            // ★★ 2026-10-08 发起人点题「参考灯笼🏮好看一些」：把圆点做成**小灯笼**。
                            //   画法对齐《山海城邦 · 视觉设计文档》（DESIGN.md §5）：
                            //   「圆角灯体 + 暖金径向光晕 + 朱砂灯帽 + 火苗」，色板取品牌四色：
                            //     · 暖金 gold #C8881F —— 灯体 / 光晕
                            //     · 朱砂 cinnabar #A8351A —— 灯帽（点睛）
                            //     · 宣纸米 #F7F4EC / 松烟墨 #1A1A1A —— 高光核心 / 暗字
                            //   · 未接入 ⇒ 灯帽与灯体一律**褪成灰**、无光晕（安静，不抢眼、不像报错）；
                            //   · 已接入 ⇒ 朱砂灯帽 + 暖金径向灯体（核心近米白 = 火苗）+ 暖金光晕。
                            const capColor = lit ? '#A8351A' : '#C9C2B4'; // 灯帽：朱砂 / 灰
                            return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-lamp": "1", title: tip, style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 3,
                                    minWidth: 0,
                                    flex: '1 1 0',
                                }, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { width: 9, height: 3, borderRadius: 1.5, background: capColor } }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: {
                                            width: 21,
                                            height: 26,
                                            borderRadius: '50%',
                                            boxSizing: 'border-box',
                                            border: lit ? '1px solid #A66A12' : '1.5px solid #C9C2B4',
                                            background: lit
                                                ? 'radial-gradient(circle at 50% 36%, #FFF6DA 0%, #F0BE55 36%, #C8881F 70%, #A66A12 100%)'
                                                : 'rgba(26,26,26,0.05)',
                                            boxShadow: lit
                                                ? '0 0 9px 2px rgba(200,136,31,0.55), inset 0 0 3px rgba(255,246,218,0.7)'
                                                : 'none',
                                        } }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { width: 4, height: 4, borderRadius: '50%', background: capColor } }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.text, lineHeight: 1.3, textAlign: 'center', marginTop: 3 }, children: l.lamp }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: 1.3 }, children: lit ? '已接入' : '待接入' })] }, `${l.lamp}-${String(i)}`));
                        }) }), (0, jsx_runtime_1.jsx)(LightFirstButton, {})] })] }));
}
/*
 * ★★ 「🪔 点亮第一盏灯」—— 给面板一个**出口**（夜话 2026-10-08）。
 *
 * 页面原来全在解释状态、没有告诉用户"现在该做什么"。这个主按钮把
 * "待接入"从**状态**变成**动作**：点下去 = 去选执行方。
 *
 * ★★ 为什么点击只展开一段**说明**、不直接开"选择执行方"：
 *   定案 + 服务端口径钉死 ——P1 期客户端**无自助改入口**，
 *   执行位/审计位由铺主指派、管理位/签名位结构性不可改。⇒ "选择执行方"这个动作
 *   **在当前版本不存在**。若把按钮做成"点了跳去一个不存在的 picker"，就是本仓明令禁止的
 *   "点了没反应的承诺"。⇒ 如实展开去向（接入服务端后由铺主在管理方界面指派，P2.5），
 *   既给了出口，又没编一条假的流程。
 *   ★ 锚点 `data-kaipu-light-first="1"` 供探针断言"出口存在"。
 */
function LightFirstButton() {
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 12 }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-light-first": "1", "aria-expanded": open, onClick: () => setOpen((v) => !v), style: {
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 6,
                    // ★ 色对齐《山海城邦 · 视觉设计文档》暖金 gold #C8881F（"灯火"用色）
                    border: '1px solid #C8881F',
                    background: 'rgba(200,136,31,0.12)',
                    color: '#A66A12',
                    cursor: 'pointer',
                    // ⚠️⚠️ `font` 是**简写属性**，会重置 `fontSize` / `fontWeight`。
                    //   本行原来写在它俩**之前** ⇒ 那两行**一直没生效**（2026-10-08 用 CDP 读
                    //   computed style 才发现：代码写 600，实读 400 —— 光看代码看不出来）。
                    //   ⇒ 简写放**最后**，再补要覆盖的。
                    font: 'inherit',
                    fontSize: theme_js_1.FS.base,
                    fontWeight: 600,
                }, children: "\uD83E\uDE94 \u70B9\u4EAE\u7B2C\u4E00\u76CF\u706F" }), open && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 8, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: "\u300C\u9009\u62E9\u6267\u884C\u65B9\u300D\u5C06\u5728\u63A5\u5165\u670D\u52A1\u7AEF\u540E\u3001\u7531\u94FA\u4E3B\u5728\u7BA1\u7406\u65B9\u754C\u9762\u6307\u6D3E\uFF08P2.5\uFF09\u3002\u5F53\u524D\u672C\u5730\u6F14\u793A\u6A21\u5F0F\u6682\u4E0D\u5F00\u653E\u6B64\u5165\u53E3 \u2014\u2014 \u4E94\u76CF\u706F\u4F1A\u5728\u63A5\u5165\u540E\u9010\u4E00\u4EAE\u8D77\u3002" }))] }));
}
//# sourceMappingURL=SeatLampPanel.js.map