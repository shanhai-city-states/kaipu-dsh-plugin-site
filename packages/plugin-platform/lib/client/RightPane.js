"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightPane = RightPane;
exports.ActionBar = ActionBar;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * 山海·开铺 · 场地插件 · 右栏 = **运行视图 / 报告**
 * =====================================================================
 * 契约 `sse-events.json` 的 renderRules 就是这一栏的验收标准，逐条落点写在这里：
 *
 *   [R2] 按「**第 N 轮**」**分段**（不合并成一条流水）—— 回炉必须看得见
 *   [R3] 四类判定可区分且可见（实底徽标，见 theme.ts）
 *   [R4] ★ dims 裁剪后，尾部**固定**显示「本次参与审核面 / 未参与审核面 / 裁剪依据」，
 *        且**不得做成可折叠的次要信息**。
 *        ★ 2026-10-05 起本栏**允许折叠**（"一页预览"：折轮次过程），
 *          但**那两块口径永远不进折叠** —— 判据沿它们的**祖先链**断言
 *          "不在任何 details 里"（对准契约原文）。
 *          ⚠️ 原注释写的是"整栏没有折叠控件"，那是**比契约更严**的自我约束，
 *             会把一个正当需求挡在门外 ⇒ 已按原文改写。
 *   [R5] 断开 = 「**已停止接收**」，不写「已取消」
 *
 * ★ 另一条来自契约的"不许做的事"：`usage` 是**唯一可信计费口径**，
 *   这一栏**只显示**它，不做任何二次计算（不"估算"、不"按 token 折算"）。
 */
const react_1 = require("react");
const kaipu_contract_1 = require("@shanhai/kaipu-contract");
const copy_js_1 = require("./copy.js");
const ErrorSurface_js_1 = require("./ErrorSurface.js");
const data_js_1 = require("./mock/data.js");
const run_reducer_js_1 = require("./run-reducer.js");
const theme_js_1 = require("./theme.js");
function RightPane({ scene, run, sourceLabel, isMock, onStop, onStart, running, runError, signed, errorCode, onFireError, onClearError, onGoShop, lead, leftHidden, fill, focusSeq, onFocusConsumed, }) {
    // ★ 空态也要能回答"去哪儿挑场景" ⇒ 把原因带下去
    if (scene === null)
        return (0, jsx_runtime_1.jsx)(NoScenePicked, { lead: lead, leftHidden: leftHidden });
    // ★ 一个执行方都没有 ⇒ 这不是错误，是"场地本来就是空的"这一**正常状态**
    //   （零内置执行方也能把场地跑起来）。措辞要让用户知道接下来做什么，而不是以为坏了。
    const inbound = scene.lamps.filter((l) => l.agentId !== null).length;
    return (
    // `overflowWrap` 兜底：面板可能被挂进很窄的挂载点，长 ID / 长英文串要有地方断
    (0, jsx_runtime_1.jsxs)("div", { style: { padding: 14, overflowWrap: 'break-word' }, children: [(0, jsx_runtime_1.jsx)(Header, { scene: scene, run: run, onStop: onStop }), isMock && sourceLabel !== null && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 10, fontSize: theme_js_1.FS.small, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsx)(Badge, { bg: "#6b7280", children: sourceLabel }), (0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.dim }, children: [' ', "\u2014\u2014 \u9762\u677F\u5C1A\u672A\u63A5\u5165\u670D\u52A1\u7AEF\uFF1B\u4E0B\u9762\u6BCF\u6761\u5224\u5B9A\u90FD\u6765\u81EA\u672C\u5730\u6F14\u793A\u5E8F\u5217\uFF0C\u4E0D\u662F\u771F\u5B9E\u8FD0\u884C\u7ED3\u679C\u3002"] })] })), !signed && (0, jsx_runtime_1.jsx)(UnsignedBanner, {}), errorCode !== null && ((0, jsx_runtime_1.jsx)(ErrorSurface_js_1.ErrorSurface, { code: errorCode, detail: (0, data_js_1.errorDetailOf)(errorCode), onDismiss: onClearError })), inbound === 0 && (0, jsx_runtime_1.jsx)(ZeroInbound, { scene: scene }), run.status === 'stopped' && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 12, fontSize: theme_js_1.FS.base, color: '#b45309', lineHeight: theme_js_1.LH.normal }, children: run_reducer_js_1.STOPPED_EXPLAIN })), runError !== null && ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-run-error": "1", style: {
                    marginTop: 12,
                    padding: '10px 12px',
                    border: '1px solid #fca5a5',
                    borderLeft: '3px solid #dc2626',
                    background: 'rgba(220,38,38,0.05)',
                    fontSize: theme_js_1.FS.base,
                    lineHeight: theme_js_1.LH.normal,
                }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: '#dc2626' }, children: "\u8FD9\u6B21\u8FD0\u884C\u6CA1\u80FD\u8DD1\u8D77\u6765\u3002" }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 3 }, children: ["\u670D\u52A1\u7AEF\u7684\u8BF4\u660E\uFF1A", runError] })] })), run.status === 'idle' && (onStart !== null && !isMock
                ? ((0, jsx_runtime_1.jsx)(StartRunForm, { onStart: onStart, running: running, sceneLabel: scene.label, noneInbound: inbound === 0, onGoShop: onGoShop, fill: fill, focusSeq: focusSeq, onFocusConsumed: onFocusConsumed }))
                : (0, jsx_runtime_1.jsx)(Note, { children: "\u8BE5\u573A\u666F\u5C1A\u672A\u8FD0\u884C\u3002" })), run.errors.length > 0 && (0, jsx_runtime_1.jsx)(RunErrorsBlock, { errors: run.errors }), run.rounds.map((r) => ((0, jsx_runtime_1.jsx)(RoundBlock, { round: r }, r.round))), run.summary !== null && (0, jsx_runtime_1.jsx)(SummaryBlock, { summary: run.summary, finishReason: run.finishReason }), run.usage !== null && (0, jsx_runtime_1.jsx)(UsageBlock, { usage: run.usage }), (0, jsx_runtime_1.jsx)(SeatChangeBlock, { records: (0, data_js_1.seatChangesOf)(scene.scene) }), isMock && (0, jsx_runtime_1.jsx)(DemoErrorHarness, { active: errorCode, onFire: onFireError })] }));
}
/* ─────────────────── 发起运行（真服务端路径）─────────────────── */
/**
 * 往上找**真正在滚动**的那个容器。
 *
 * ★ 为什么"往上找"而不是拿某个写死的 ref：主滚动容器属于装配层
 *   （`PlatformPanel` 里那块 `overflowY: 'auto'`），发起区自己够不着；
 *   写死 ref 就要把 ref 一路传下来，多一层套管就多一处会断的地方。
 * ★ 判据是"`overflowY` 可滚 **且** scrollHeight 真超出 clientHeight" ——
 *   只看 `overflow` 会挑出一个"样式写着能滚、其实内容没超"的祖先，滚了等于没滚。
 */
function nearestScroller(el) {
    let p = el.parentElement;
    while (p !== null) {
        const oy = getComputedStyle(p).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && p.scrollHeight > p.clientHeight + 1)
            return p;
        p = p.parentElement;
    }
    return null;
}
/** 让 `el` 在容器 `box` 里**居中**所需的 scrollTop */
function centerTop(box, el) {
    const b = box.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    // ★ 元素比容器还高时"居中"没意义（上下沿都在视野外）⇒ 退回到"顶对齐"，至少头在这里
    const delta = e.height >= b.height ? e.top - b.top : e.top - b.top - (b.height - e.height) / 2;
    return Math.max(0, Math.min(box.scrollHeight - box.clientHeight, box.scrollTop + delta));
}
/**
 * ★★ 平滑滚到 `want`，并**只在"没起步"时**补一次瞬移 —— 返回兜底定时器句柄。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 为什么兜底判据是"**位置变没变**"，不是"**到没到目标**"
 * ══════════════════════════════════════════════════════════════════
 * 两种判据都写着"400ms 后补一枪"，但语义完全不同：
 *
 *   · 「**没到目标**就补」⇒ 用户在这 400ms 里**自己滚了**，就把他**拽回**目标位置。
 *     它在 `101`（跨页切过来居中）那个场景没问题 —— 刚切页，用户不可能同时在自己滚。
 *   · 「**没起步**就补」⇒ 只有当"滚动位置与发起时**一模一样**"才补。
 *     那说明平滑那一路**压根没起步**（本仓老账：**页面不可见时平滑滚动是空操作，且不报错**）；
 *     只要位置动过一点（无论去的是目标还是用户自己的方向）就不插手。
 *
 * ⇒ 本函数现在也服务于「**点开某一轮**」这种**高频、用户正在读**的场景（`104`）：
 *   那里"抢用户滚动"的代价大得多（他可能正滚着往下看第 2 轮）。
 *   ⇒ 统一用"没起步就补"，两处都受益；`101` 原来的语义**被这条严格覆盖**（它那边同样满足）。
 *
 * ★ `onSettle` 在两种结局后都会回调（"已经到位"与"补完瞬移"）—— 调用方据此消费一次性信号。
 */
function smoothScrollTo(box, want, onSettle) {
    const start = box.scrollTop;
    if (Math.abs(want - start) <= 1) {
        onSettle?.();
        return null;
    }
    box.scrollTo({ top: want, behavior: 'smooth' });
    return window.setTimeout(() => {
        if (Math.abs(box.scrollTop - start) <= 1)
            box.scrollTop = want;
        onSettle?.();
    }, 400);
}
/**
 * ★★ 「展开之后把被展开的东西落到视野中央」的**门控阈值**（`104`）。
 *
 * 语义：**只有当"展开后确有内容在视野外（> 这个像素数）"才滚**；否则一动不动。
 *
 * ★★ 为什么必须有门控（实测反例，不是洁癖）：
 *   同一轮次块，容器 `scrollTop=268` 时它**只差 13px 就全看得见**，
 *   而"居中"要跳 **220px** —— **用户点一下，页面猛挪，什么都没多看到**。
 *   ★ 要害是：**居中要跳的距离与"你还有多少看不见"无关**（另一个样本：差 108px 却跳 315px）。
 *   ★ 它与 `100` 里给"自动收缩"判**不做**的那条代价同族（位置不稳定 ⇒ 想再点第二次得重新找），
 *     只是量级更大（那边 347px，这边最大 817px）。
 *
 * ★ 取值 24px ≈ 半行中文（`FS.base` 14 × 行高 1.8 ≈ 25）——
 *   "差半行以上才算真看不见"，差半行以内不值得动页面。
 */
const EXPAND_CENTER_MIN_HIDDEN = 24;
/**
 * 「上一次点击 summary」的**有效期**（毫秒）—— 窗口内到来的 `toggle` 才算"用户点的"。
 *
 * ★ 取值 300ms 的依据：点击与 `toggle` 派发之间是**同一轮任务队列**（浏览器在默认动作
 *   改变 `open` 后排队派发），实测在几十毫秒内 ⇒ 300ms 余量充足。
 * ★ 取太长的代价：把"用户上一下点过的残留"当成这一次（误滚）；
 *   取太短的代价：`toggle` 还没派发到、窗口就过期了（该滚的没滚）。
 *   两头都不好，所以取"远大于实际间隔、远小于人的下一次动作"。
 */
const USER_CLICK_WINDOW_MS = 300;
/**
 * ★ 为什么"发起运行"要有输入框，而不是一个按钮直接跑：
 *   契约 §3.4 的 `content` 是**待审内容** —— 没有它，这一场审的就是空。
 *   给一个能填的表单是**诚实**的；给一个直接跑的按钮会把
 *   "我们没内容可审" 伪装成 "场地在正常工作"（**看起来是对的**，最坏的一类）。
 *
 * ★ 按钮的禁用判据：`content` 为空 ⇒ 禁用。**不替用户编一段占位内容**。
 */
function StartRunForm({ onStart, running, sceneLabel, noneInbound, fill, onGoShop, focusSeq, onFocusConsumed, }) {
    const [target, setTarget] = (0, react_1.useState)('');
    const [content, setContent] = (0, react_1.useState)('');
    const ready = content.trim() !== '' && !running;
    const boxRef = (0, react_1.useRef)(null);
    /** 居中滚动的兜底定时器（★ 为什么不放 effect cleanup —— 见下面那段注释） */
    const scrollTimer = (0, react_1.useRef)(null);
    /**
     * ★★ 从铺子资料填入待审内容 —— 依赖的是 `seq`（**事件**），不是 `text`（**值**）。
     *
     * 为什么必须这样：用户可能连着两次用**同一份**文件 —— 文本逐字没变，
     * 若拿文本当依赖，第二次就不会触发，而用户会觉得"点了没反应"。
     *
     * ★ 只写 `content`，**不碰 `target`**：`target` 是"这一场审的是什么"的名字，
     *   由用户自己起；文件名未必等于他想给这一场起的名字，
     *   顺手覆盖它 = 替他做了一个他没做的决定。
     */
    (0, react_1.useEffect)(() => {
        if (fill === null)
            return;
        setContent(fill.text);
    }, [fill]);
    /**
     * ★★ 从铺子资料点「开始运行」过来 ⇒ 把自己滚到**视野正中间**（2026-10-08 · 101）。
     *
     * 为什么必须滚：这一栏上面压着「这场谁来审 / 要过哪几面」那一整块，
     *   发起区常常在第一屏之外 ⇒ 只切页签，人到了却看不见它（"点了没反应"体感）。
     *
     * ★★ 为什么**不是** `scrollIntoView`：它会连带滚动**外层窗口**（宿主页面），
     *   把宿主自己的布局也拽动 —— 这一层不该碰别人的滚动位置。
     *   ⇒ 只动**自己那个**滚动容器的 `scrollTop`（`nearestScroller` 认出来的）。
     *
     * ★★ 延时兜底这条路径**不能用 effect 自己的 cleanup 收** —— 那是个坑：
     *   消费信号会改 `focusSeq` ⇒ effect 重跑 ⇒ cleanup 先执行 ⇒ **把兜底定时器当场掐掉**
     *   （只剩平滑那一路，而它恰恰是可能一动不动的那一路）。
     *   ⇒ 定时器存 ref，只在**本组件真的卸载**时清（下面那个空依赖的 effect）。
     *   ★ 滚动本身走共用的 `smoothScrollTo`（`104` 起两处共用，兜底判据统一为"**没起步**就补"）。
     */
    (0, react_1.useEffect)(() => {
        if (focusSeq === 0)
            return;
        const el = boxRef.current;
        const box = el === null ? null : nearestScroller(el);
        // 没有可滚的容器 ⇒ 它本来就在视野里，没有"目标位"可去；信号照样算已消费
        if (el === null || box === null) {
            onFocusConsumed();
            return;
        }
        scrollTimer.current = smoothScrollTo(box, centerTop(box, el), onFocusConsumed);
    }, [focusSeq, onFocusConsumed]);
    /** 卸载时把还没落的定时器收掉（★ 只收卸载这一次，不参与上面那条链路） */
    (0, react_1.useEffect)(() => () => {
        if (scrollTimer.current !== null)
            window.clearTimeout(scrollTimer.current);
    }, []);
    const inputStyle = {
        width: '100%',
        boxSizing: 'border-box',
        fontSize: theme_js_1.FS.small,
        fontFamily: 'inherit',
        padding: '6px 8px',
        border: `1px solid ${theme_js_1.C.border}`,
        borderRadius: 4,
        background: 'transparent',
        color: 'inherit',
        resize: 'vertical',
    };
    return ((0, jsx_runtime_1.jsxs)("section", { ref: boxRef, "data-kaipu-start": "1", style: { marginTop: 14 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: "\u8BE5\u573A\u666F\u5C1A\u672A\u8FD0\u884C\u3002\u586B\u597D\u8981\u5BA1\u7684\u4E1C\u897F\uFF0C\u518D\u53D1\u8D77 \u2014\u2014 \u8DD1\u8D77\u6765\u540E\u8FD9\u91CC\u4F1A\u9010\u4E2A\u5BA1\u6838\u9762\u663E\u793A\u8FDB\u5C55\u3002" }), fill !== null && ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-fill-card": "1", style: {
                    marginTop: 10,
                    padding: '10px 12px',
                    border: `1px solid ${theme_js_1.C.border}`,
                    borderRadius: 6,
                    background: theme_js_1.C.soft,
                    textAlign: 'center',
                }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u5DF2\u4ECE\u94FA\u5B50\u8D44\u6599\u5E26\u5165\u5F85\u5BA1\u5185\u5BB9" }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 3, fontSize: theme_js_1.FS.base, color: theme_js_1.C.text, wordBreak: 'break-all' }, children: fill.name }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 4, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, maxHeight: 46, overflow: 'hidden', lineHeight: theme_js_1.LH.normal }, children: fill.text.length > 120 ? `${fill.text.slice(0, 120)}…` : fill.text })] })), noneInbound && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 8, fontSize: theme_js_1.FS.small, color: '#b45309', lineHeight: theme_js_1.LH.normal }, children: "\u8FD9\u4E00\u573A\u7684\u5BA1\u6838\u9762\u76EE\u524D\u90FD\u8FD8\u6CA1\u6709\u63A5\u5165\u6267\u884C\u65B9\u3002\u73B0\u5728\u4E5F\u80FD\u53D1\u8D77\uFF0C\u4F46\u7ED3\u8BBA\u5927\u6982\u7387\u662F\u300C\u672A\u63A5\u5165\u300D\uFF08\u4E0D\u662F\u6545\u969C\uFF09\u3002" })), (0, jsx_runtime_1.jsxs)("label", { style: { display: 'block', marginTop: 10, fontSize: theme_js_1.FS.small }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u5BA1\u7684\u662F\u4EC0\u4E48\uFF08\u9009\u586B\uFF09" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: target, onChange: (e) => setTarget(e.target.value), placeholder: "\u4F8B\uFF1AXX \u65B9\u6848\u4E66 v3", style: { ...inputStyle, marginTop: 4 } })] }), (0, jsx_runtime_1.jsxs)("label", { style: { display: 'block', marginTop: 8, fontSize: theme_js_1.FS.small }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u5F85\u5BA1\u5185\u5BB9\uFF08\u5FC5\u586B\uFF09" }), (0, jsx_runtime_1.jsx)("textarea", { value: content, onChange: (e) => setContent(e.target.value), rows: 6, placeholder: `粘进来就行。这一场会用「${sceneLabel}」的流程来审。`, style: { ...inputStyle, marginTop: 4, lineHeight: theme_js_1.LH.normal } })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginTop: 8 }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", disabled: !ready, 
                        // ★ 防连点第二道：真跑着就绝不再发（第一个属性 disabled 是视觉层，
                        //   这里才是行为层 —— `disabled` 在合成事件重入 / 程序化 .click() 时
                        //   不保证拦截；重复发起 = 两路 SSE 抢同一视图 + 服务端 503）
                        onClick: () => {
                            if (running)
                                return;
                            onStart({ target: target.trim(), content });
                        }, style: {
                            fontSize: theme_js_1.FS.small,
                            padding: '5px 14px',
                            border: `1px solid ${ready ? '#c69a3c' : theme_js_1.C.border}`,
                            borderRadius: 4,
                            background: ready ? '#c69a3c' : 'transparent',
                            color: ready ? '#2b1d00' : theme_js_1.C.dim,
                            fontWeight: ready ? 600 : 400,
                            cursor: ready ? 'pointer' : 'not-allowed',
                            font: 'inherit',
                        }, children: running ? '质检进行中…' : '开始运行' }), (0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-goshop": "1", onClick: onGoShop, style: {
                            fontSize: theme_js_1.FS.small,
                            padding: '5px 14px',
                            border: `1px solid ${theme_js_1.C.border}`,
                            borderRadius: 4,
                            background: 'transparent',
                            color: theme_js_1.C.dim,
                            cursor: 'pointer',
                            font: 'inherit',
                        }, children: "\u94FA\u5B50\u8D44\u6599" }), !ready && !running && content.trim() === '' && ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u8BF7\u5148\u586B\u5199\u5F85\u5BA1\u5185\u5BB9" }))] })] }));
}
/* ─────────────────────── 还没选场景 ─────────────────────── */
/**
 * ★ 空态**不给一句"从左侧选一个场景"就完事** ——
 *   那时用户还不知道"场景"是什么、选了会怎样。
 *   空态是唯一"用户一定会停在这里想一下"的位置，所以把三句话放在这最划算。
 */
function NoScenePicked({ lead, leftHidden, }) {
    // ★ 有 lead ⇒ 说明"没场景"是**外部原因**（正在读 / 读不到），先如实说清它
    if (lead !== null) {
        return (0, jsx_runtime_1.jsx)("div", { style: { padding: 20, fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.loose }, children: lead });
    }
    /**
     * ★★ 指引必须**指得着**（2026-10-05 修；2026-10-08 再修一次）。
     *
     * 原来写死"先从左边挑一场「场景」"—— 但左栏可能**被用户收起**、或被窄容器**挤掉**，
     * 那两种情况下左边**什么都没有**：用户照着做只会扑空，
     * 然后怀疑是自己不会用（**界面说了不成立的话，比不说更糟**）。
     * ★ 三种情况**出路不同**，所以必须分开说：
     *   · 可见     ⇒ 指左栏
     *   · 用户收起 ⇒ 指顶部那条分隔线上的把手（它在）
     *   · 容器太窄 ⇒ 指顶部那条「场景」折叠条（它在）
     *
     * ★★ 改的那一条（`'narrow'`）：原文是「把窗口拉宽一些」——
     *   那是把**功能缺失说成用户限制**：窄屏下用户本来就该能干活，
     *   让他去拉窗口 = 承认"这儿你用不了"。
     *   ⇒ 现在窄屏有 `NarrowScenePicker` 兜着，指引就**指得着**了。
     *   ★ 顺带说清一个容易误判的点：这条文案**在窄屏下几乎不会出现** ——
     *     `selected` 会自动选中第一场，`scene !== null` ⇒ 走不到空态。
     *     它是"场景列表为空 / 切数据源的一瞬"的兜底。但**兜底文案也必须是真的**：
     *     写一句"去拉宽窗口"，在真出现的那一次就是**假话**。
     *
     * `data-kaipu-lead` 是判据锚点：让"指引与左栏状态一致"这件事**可被断言**。
     */
    const guide = leftHidden === null
        ? '先从左边挑一场「场景」'
        : leftHidden === 'collapsed'
            ? '点顶部的「展开场景栏」，再挑一场「场景」'
            : '窗口太窄放不下场景栏 —— 点顶部的「场景」，再挑一场';
    return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: 20, fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.loose }, children: [(0, jsx_runtime_1.jsx)("div", { "data-kaipu-gist": "1", style: { fontSize: theme_js_1.FS.heading, lineHeight: theme_js_1.LH.normal }, children: "\u9009\u4E00\u573A\uFF0C\u628A\u4F60\u624B\u5934\u7684\u4E1C\u897F\u653E\u8FDB\u6765\u5BA1\u4E00\u5BA1\u3002\u5BA1\u5B8C\u7ED9\u4F60\u4E00\u4EFD\u5E26\u7B7E\u7684\u62A5\u544A\u3002" }), (0, jsx_runtime_1.jsx)("div", { "data-kaipu-lead": leftHidden ?? 'visible', style: { marginTop: 10, color: theme_js_1.C.dim }, children: guide })] }));
}
/* ─────────────────────── 约束 ①：未签名 ───────────────────────
 *
 * ★★ 改版：**红框 → 暖金提示框**。
 *
 * 旧版是 `border/左边线` 全红 + 红字，形如「报错台」；而"未签名"只是
 * **还没接入签名服务**这一正常态，不是故障。⇒ 视觉改暖金（左侧线 + 米色底），
 * 文案改「预告」语气（见 `copy.ts` 的 `unsignedReport*` 注释）。
 * 约束义务**没丢**：仍醒目显示"当前还不能对外出具"，只是不再像在指责用户。
 * ★ 配色走固定暖金色（不随宿主主题变量）：与旧版红框同策略——
 *   锚点 `data-kaipu-unsigned="1"` 保留，探针可继续认。
 */
function UnsignedBanner() {
    return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-unsigned": "1", style: {
            marginTop: 12,
            padding: '10px 12px',
            border: '1px solid #d8b863',
            borderLeft: '4px solid #c69a3c',
            background: 'rgba(214,180,92,0.12)',
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.base, fontWeight: 600, color: '#9c7a2e' }, children: copy_js_1.CONSTRAINTS.unsignedReport }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 4, lineHeight: theme_js_1.LH.normal }, children: copy_js_1.CONSTRAINTS.unsignedReportWhy })] }));
}
/* ─────────────── 流内 error（契约 §3.4 · 2026-10-06 补 · B 组）─────────────── */
/**
 * 流内 `error` 事件。
 *
 * ★★ 它长成这样，是被"**它与请求失败不是一回事**"决定的：
 *   · 请求失败（HTTP 层）⇒ 运行**没跑起来** ⇒ `ErrorSurface`：**可关闭**的提示
 *   · 流内 `error`        ⇒ 运行**跑起来了**   ⇒ **不可关闭**（它不是提示，是记录）
 *   ⇒ 所以这里**没有「知道了」按钮**，也**不打断**下面的轮次与结论 ——
 *     那是 `ErrorSurface` 的职责，不是这条的。
 *
 * ★ 文案来源两条路（**都不直出裸码**）：
 *   ① `code` 在 §8.2 表里 ⇒ 用**契约译法**（口径统一）
 *   ② 未收录 ⇒ 显示**服务端原话** ＋ 标记「未收录」
 *      ★ **不自己补一条文案**：§8.2 由对方维护 —— 缺口**要报，不单方补**。
 *      ★ 裸码只进 `data-kaipu-*` 属性（给判据），**不进可见文本**（同 `ErrorSurface` 的纪律）。
 */
function RunErrorsBlock({ errors }) {
    return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-run-errors": errors.length, style: {
            marginTop: 12,
            padding: '10px 12px',
            border: `1px solid ${theme_js_1.C.border}`,
            borderLeft: '3px solid #b45309',
            background: 'rgba(180,83,9,0.05)',
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: '#b45309', lineHeight: theme_js_1.LH.normal }, children: ["\u8FD0\u884C\u4E2D\u6536\u5230\u670D\u52A1\u7AEF\u7684 ", errors.length, " \u6761\u9519\u8BEF\u3002\u8FD9\u6B21\u8FD0\u884C\u4ECD\u5728\u7EE7\u7EED \u2014\u2014 \u9519\u8BEF\u662F\u8FC7\u7A0B\u8BB0\u5F55\uFF0C\u4E0D\u4EE3\u8868\u5B83\u4E2D\u65AD\u4E86\u3002"] }), errors.map((e, i) => {
                const known = (0, kaipu_contract_1.hasUiText)(e.code);
                const text = known
                    ? (0, kaipu_contract_1.translateError)(e.code)
                    : e.message !== ''
                        ? e.message
                        : '服务端报告了一条错误，但没有给出说明。';
                return ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsx)("span", { children: text }), !known && ((0, jsx_runtime_1.jsx)("span", { "data-kaipu-unlisted-code": e.code, style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginLeft: 6 }, children: "\uFF08\u8FD9\u6761\u7684\u8BF4\u660E\u8FD8\u6CA1\u6536\u5F55\uFF0C\u5DF2\u6309\u670D\u52A1\u7AEF\u539F\u8BDD\u663E\u793A\uFF1B\u6211\u65B9\u4F1A\u62A5\u7ED9\u5BF9\u65B9\u8865\uFF0C\u4E0D\u81EA\u884C\u4EE3\u5199\uFF09" }))] }, `${e.code}\u0000${i}`));
            })] }));
}
/* ─────────────────── 约束 ②：角色位变更留痕 ─────────────────── */
function SeatChangeBlock({ records }) {
    return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-seatlog": "1", style: { marginTop: 18, borderTop: `1px solid ${theme_js_1.C.border}`, paddingTop: 12 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title }, children: copy_js_1.CONSTRAINTS.seatChangeTitle }), records.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 6 }, children: copy_js_1.CONSTRAINTS.seatChangeEmpty })) : ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 8 }, children: records.map((r) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                        fontSize: theme_js_1.FS.small,
                        lineHeight: theme_js_1.LH.normal,
                        borderLeft: `1px solid ${theme_js_1.C.border}`,
                        paddingLeft: 10,
                        marginBottom: 6,
                    }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: r.at }), " \u00B7 ", r.seat, "\uFF1A", r.from, " \u2192 ", (0, jsx_runtime_1.jsx)("strong", { children: r.to })] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.dim }, children: ["\u539F\u56E0\uFF1A", r.reason, " \u00B7 \u64CD\u4F5C\uFF1A", r.by] })] }, `${r.seat}|${r.at}`))) }))] }));
}
/* ─────────────── 演示脚手：错误码全走一遍 ─────────────── */
/**
 * ★ 这是**演示脚手**，不是产品界面 —— 所以它只在 `sourceLabel !== null`（mock 模式）时出现。
 *
 * 为什么需要它：Step 7 要证明的是「14 条码都接到了**真实渲染路径**上」，
 *   而不是"文案表里写了 14 条"。一个能逐个触发、并让判据逐条断言的入口，
 *   比"我读了一遍表"强得多 —— 后者无法被证伪。
 *
 * ★★ 2026-10-05 收进 `<details>`（默认**收起**）：
 *   它自己写着"产品界面里没有这一块"，却在演示态占了 **181px**（实测，全栏第二高）——
 *   一块**非产品**的调试入口比正片还显眼，是"信息量太大"里最不该占位的那个。
 *   收起来以后：想复现错误路径的人点一下就能用，不想看的人**永远不用看见它**。
 *   ★ 判据不受影响：收起时按钮仍在 DOM 里（且 `copy-probe` 的 `fire()` 会**先展开**再点，
 *     见该文件）—— 但"能点到"这件事**必须由探针自己保证**，不能指望巧合约等于可见。
 */
function DemoErrorHarness({ active, onFire }) {
    return ((0, jsx_runtime_1.jsxs)("details", { "data-kaipu-harness": "1", style: { marginTop: 20, borderTop: `1px dashed ${theme_js_1.C.border}`, paddingTop: 10 }, children: [(0, jsx_runtime_1.jsxs)("summary", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, cursor: 'pointer', lineHeight: theme_js_1.LH.normal }, children: ["\u6F14\u793A\u811A\u624B \u00B7 \u9519\u8BEF\u8DEF\u5F84\uFF08", kaipu_contract_1.ERROR_CODES.length, " \u6761\u7801 \u00B7 \u70B9\u5F00\u9010\u4E2A\u89E6\u53D1\uFF1B\u4EA7\u54C1\u754C\u9762\u91CC\u6CA1\u6709\u8FD9\u4E00\u5757\uFF09"] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }, children: kaipu_contract_1.ERROR_CODES.map((e) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": active === e.code, onClick: () => onFire(e.code), style: {
                        fontSize: theme_js_1.FS.tag,
                        fontFamily: theme_js_1.FONT.mono,
                        padding: '3px 7px',
                        border: `1px solid ${theme_js_1.C.border}`,
                        borderRadius: 3,
                        background: active === e.code ? theme_js_1.C.soft : 'transparent',
                        color: 'inherit',
                        cursor: 'pointer',
                    }, children: e.code }, e.code))) })] }));
}
/* ───────────────────────────── 头部 ───────────────────────────── */
function Header({ scene, run, onStop }) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.heading }, children: scene.label }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint }, children: ["v", scene.version] }), run.requestId !== null && ((0, jsx_runtime_1.jsx)("span", { "data-kaipu-request-id": "1", title: run.requestId, style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, fontFamily: theme_js_1.FONT.mono }, children: shortId(run.requestId) })), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: run_reducer_js_1.STATUS_TEXT[run.status] }), run.summary !== null && (0, jsx_runtime_1.jsx)(VerdictBadge, { verdict: run.summary.verdict }), run.status === 'running' && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onStop, style: ghostButton, children: "\u505C\u6B62\u63A5\u6536" }))] }));
}
/**
 * 长 ID 的缩略显示（请求号 · 审计号）。
 *
 * ★ 只缩**长到影响阅读的**（UUID = 36 字符），短 ID（`req-mock-0001`）原样显示 ——
 *   对所有 ID 一律截断反而会让人认不出它是什么。
 * ★ 全值挂在 `title` 上 ⇒ **信息没丢，只是不在第一眼占位**。
 *   （"缩略显示"与"删掉"的区别就在这里，别滑过去。）
 */
function shortId(id) {
    return id.length <= 20 ? id : `${id.slice(0, 8)}…`;
}
/* ─────────────────── 行动带（A1 · 2026-10-17）─────────────────── */
/**
 * ★★★ 右栏行动带 —— **分状态**告诉用户"现在该做什么"。
 *
 * ── 为什么它必须存在（2026-10-17 实测出来的缺口）────────────────────────────
 *   `PlatformPanel` 在 `selected` 失效时会**自动回落到第一场**（那个 `useEffect`，
 *   PlatformPanel.tsx:289）⇒ **只要列表非空，`NoScenePicked` 空态几乎永远不显示**
 *   ⇒ 那段已定案的空态文案「选一场，把你手头的东西放进来审一审」事实上**被架空了**。
 *   用户真正看到的第一屏是：场景名 + 一大块配置 + 未签名提示 + 未接入说明，
 *   **却没有一句指向"下一步"**。这一带就是补这一句。
 *
 * ── 分支规则（**只说真话，不编进度**）──────────────────────────────────────
 * | 状态 | 显示 |
 * |:--|:--|
 * | `idle` + 可发起 | 「已选：{场景}。粘贴待审内容，或从铺子资料带入。」+ 定位按钮 |
 * | `idle` + 演示模式 | 「选择场景，查看演示过程。」（**不挂定位按钮** ——
 *   演示模式没有真实发起表单，按了是假入口） |
 * | `running` | 「正在运行，下面逐轮更新。」（**不给进度条/百分比/剩余时间**） |
 * | `stopped` | 「已停止接收」+ 指路下方已有结论（若有） |
 * | `summary` 到达 | 追加「查看本次结论 ↓」按钮 |
 * | 异常 | **不覆盖**上列任何一条 —— 下面的 `runError` / `ErrorSurface` 原文照出 |
 *
 * ★ 为什么 `summary` 之前**不挂**结论按钮：那时还没有结论，挂一个点不动的按钮
 *   比不挂更糟（同"禁用态只靠颜色"的问题）。
 *
 * ── 定位怎么做的 ───────────────────────────────────────────────────────────
 *   复用本文件既有的 `nearestScroller` + `smoothScrollTo`（StartRunForm 与
 *   `expandAndCenter` 两处同款），**只滚面板自己的滚动容器**。
 *   ★ 不用 `scrollIntoView`：它会连带滚动宿主页面，把别人的布局也拽动（踩过）。
 *   ★ 滚完**移键盘焦点**到目标标题：只用鼠标点完，用户 Tab 一下会跳回别处。
 */
function ActionBar({ run, scene, isMock, canStart, leftHidden, queryRootRef, }) {
    /** 两个定位目标：表单在 `data-kaipu-start`，结论块在 `data-kaipu-summary` */
    const jumpTo = (0, react_1.useCallback)((anchor) => {
        const sel = anchor === 'start' ? '[data-kaipu-start]' : '[data-kaipu-summary]';
        // ★ 只在本面板容器内查；没有容器 / 没有目标 ⇒ 什么都不做（**不跨实例兜底**）
        const scope = queryRootRef?.current ?? null;
        if (scope === null)
            return;
        const host = scope.querySelector(sel);
        if (host === null)
            return;
        const box = nearestScroller(host);
        // 没有可滚容器 ⇒ 它本来就在视野里，没有"目标位"可去（与 StartRunForm 同款判据）
        if (box !== null)
            smoothScrollTo(box, centerTop(box, host));
        // 焦点跟随：只用鼠标点完，Tab 会跳回别处 ⇒ 把焦点落在目标上
        if (!host.hasAttribute('tabindex'))
            host.setAttribute('tabindex', '-1');
        host.focus({ preventScroll: true });
    }, [queryRootRef]);
    const idle = run.status === 'idle';
    const running = run.status === 'running';
    const stopped = run.status === 'stopped';
    /**
     * ★★ `done` 必须显式覆盖（2026-10-17 实测补漏）。
     *
     * `RunStatus` 是**四值**：`idle | running | stopped | done`（见 `run-reducer.ts`）。
     * 第一版只写了前三个 ⇒ **跑完之后行动带只剩一个「查看本次结论 ↓」按钮、没有一句主体文案**，
     * 看起来像"话被吞了"。这是实测点开一次运行才发现的 —— 光看代码很容易漏。
     */
    const done = run.status === 'done';
    const hasSummary = run.summary !== null;
    // 没有可指认的状态 ⇒ 不渲染这一带（不做"其实没有"的空壳）
    if (!idle && !running && !stopped && !done && !hasSummary)
        return null;
    // 没有场景 ⇒ 没有"已选 X"可说（此时右栏本身在走空态，这一带不出来抢话）
    if (scene === null)
        return null;
    const sceneName = scene.label;
    /**
     * ★★ 「换一场去哪」**按三态各指各的**（2026-10-17 · Codex 验收 P2 订正）。
     *
     * `nearestScroller` / 上面那套只负责滚动；这里负责**指路是否指得着**：
     *   · `null`      ⇒ 左栏在场，什么都不用说（就在左边）
     *   · `collapsed` ⇒ 左栏是**用户自己收起的**，出口是**侧边那条把手**（宽屏**没有**顶部折叠条）
     *   · `narrow`    ⇒ 容器太窄、左栏压根不渲染，出口才是**顶部折叠条**
     * ★ 第一版把后两者合并、一律写"点顶部的「场景」" ⇒ 宽屏收起时**指路指空**。
     *   与 `NoScenePicked.guide` 保持同一口径（那里早就分了三态，这里当时没跟上）。
     */
    const switchHint = leftHidden === null
        ? null
        : leftHidden === 'collapsed'
            ? '换一场：点左侧那条「展开场景栏」的把手。'
            : '换一场：点顶部的「场景」。';
    return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-actionbar": "1", style: {
            margin: '0 14px',
            padding: '8px 11px',
            border: `1px solid ${theme_js_1.C.border}`,
            borderLeft: `3px solid ${running ? '#d97706' : theme_js_1.C.accent}`,
            background: theme_js_1.C.soft,
            fontSize: theme_js_1.FS.small,
            lineHeight: theme_js_1.LH.normal,
        }, children: [idle && ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.text }, children: canStart ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u5DF2\u9009\uFF1A", (0, jsx_runtime_1.jsx)("b", { children: sceneName }), "\u3002\u7C98\u8D34\u5F85\u5BA1\u5185\u5BB9\uFF0C\u6216\u4ECE\u94FA\u5B50\u8D44\u6599\u5E26\u5165\u3002", switchHint !== null && (0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.dim }, children: ["\u3000", switchHint] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u5DF2\u9009\uFF1A", (0, jsx_runtime_1.jsx)("b", { children: sceneName }), "\u3002\u9009\u62E9\u573A\u666F\uFF0C\u67E5\u770B\u6F14\u793A\u8FC7\u7A0B\u3002"] })) })), running && ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.text }, children: "\u6B63\u5728\u8FD0\u884C\u3002\u4E0B\u9762\u6309\u300C\u7B2C N \u8F6E\u300D\u9010\u8F6E\u66F4\u65B0 \u2014\u2014 \u73B0\u5728\u8BFB\u5230\u7684\u90FD\u662F\u5DF2\u53D1\u751F\u7684\u4E8B\u3002" })), stopped && ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.text }, children: "\u5DF2\u505C\u6B62\u63A5\u6536\u3002\u670D\u52A1\u7AEF\u4ECD\u5728\u628A\u5B83\u7B97\u5B8C \u2014\u2014 \u4E0B\u9762\u5DF2\u6709\u7684\u8F6E\u6B21\u4E0E\u7ED3\u8BBA\u4ECD\u7136\u4F5C\u6570\u3002" })), done && !stopped && ((0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.text }, children: ["\u8FD9\u4E00\u8D9F\u8DD1\u5B8C\u4E86\u3002\u5F80\u4E0B\u770B", (0, jsx_runtime_1.jsx)("b", { children: "\u672C\u6B21\u7ED3\u8BBA" }), " \u2014\u2014 \u7279\u522B\u7559\u610F\u300C\u672A\u53C2\u4E0E\u5BA1\u6838\u9762\u300D\u90A3\u4E00\u680F\u3002"] })), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 10px', marginTop: 6 }, children: [idle && canStart && ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-jump-fill": "1", onClick: () => jumpTo('start'), style: {
                            fontSize: theme_js_1.FS.small,
                            padding: '3px 10px',
                            border: `1px solid ${theme_js_1.C.border}`,
                            borderRadius: 4,
                            background: 'transparent',
                            color: theme_js_1.C.accent,
                            cursor: 'pointer',
                            font: 'inherit',
                        }, children: "\u586B\u5199\u5F85\u5BA1\u5185\u5BB9 \u2193" })), hasSummary && ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-jump-summary": "1", onClick: () => jumpTo('summary'), style: {
                            fontSize: theme_js_1.FS.small,
                            padding: '3px 10px',
                            border: `1px solid ${theme_js_1.C.border}`,
                            borderRadius: 4,
                            background: 'transparent',
                            color: theme_js_1.C.accent,
                            cursor: 'pointer',
                            font: 'inherit',
                        }, children: "\u67E5\u770B\u672C\u6B21\u7ED3\u8BBA \u2193" }))] })] }));
}
/* ─────────────────── 空场（用户可见面）─────────────────── */
function ZeroInbound({ scene }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            marginTop: 12,
            padding: '11px 13px',
            border: `1px solid ${theme_js_1.C.border}`,
            borderLeft: '3px solid #d97706',
            fontSize: theme_js_1.FS.base,
            lineHeight: theme_js_1.LH.normal,
        }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsxs)("span", { children: ["\u8BE5\u573A\u666F\u7684 ", scene.lamps.length, " \u4E2A\u5BA1\u6838\u9762\u5168\u90E8\u5F85\u63A5\u5165\u6267\u884C\u65B9\u3002"] }), (0, jsx_runtime_1.jsx)("span", { title: "\u8FD9\u4E0D\u662F\u6545\u969C\uFF1A\u573A\u5730\u4E0D\u5185\u7F6E\u4EFB\u4F55\u300C\u5FC5\u987B\u6709\u7684\u300D\u6267\u884C\u65B9\u3002\u63A5\u5165\u6267\u884C\u65B9\u540E\u672C\u573A\u666F\u5373\u53EF\u8FD0\u884C\uFF1B\u5728\u6B64\u4E4B\u524D\uFF0C\u573A\u5730\u672C\u8EAB\u4ECD\u7136\u53EF\u7528\uFF08\u53EF\u67E5\u770B\u3001\u53EF\u914D\u7F6E\uFF09\u3002", "aria-label": "\u4E3A\u4EC0\u4E48\u4E0D\u662F\u6545\u969C", style: {
                        fontSize: theme_js_1.FS.tag,
                        color: theme_js_1.C.dim,
                        cursor: 'help',
                        borderBottom: `1px dotted ${theme_js_1.C.dim}`,
                    }, children: "?" })] }) }));
}
/* ───────── B 组「运行事实」**不在这里**（2026-10-06）─────────
 *
 * 本文件渲染的整块 DOM 就是 `data-kaipu-run` —— 运行视图的**判据边界**
 * （见 `PlatformPanel` 的注释）。而 B 组是**新增的展示内容**。
 *
 * ⇒ 那节口径：「**新增锚点必须在 `data-kaipu-run` 之外**（`data-kaipu-process`）」
 *   ⇒ 它渲染在 `PlatformPanel.tsx` 的 `ProcessFacts`，**物理落在运行视图之外**。
 *
 * ★ 为什么不靠"读文本时排除"（那是我方第一版做法，已废弃）：
 *   排除是**减法**，减法只在"探针记得减"时成立 —— 换一个人写判据、或换一个探针，
 *   污染立刻回来。**先隔离，再展示**（回函原文）说的就是别把正确性押在判据的自律上。
 */
/* ─────────────────────── 逐轮分段（R2）─────────────────────── */
/**
 * 逐轮分段（R2）。
 *
 * ★★ 折叠的**边界**（为"一页预览"加的，逐条对应契约）：
 *
 *   折进去的：**每个维度的过程内容**（`lamp_delta` 流式文本 + `detail` + 耗时行）
 *   留在外面的：**轮次号 · reason（回炉原因）· 本轮判定 · 各审核面判定缩略**
 *
 *   为什么这样切 —— 契约有两条硬约束，折错了就违约：
 *     · **R2**「回炉**必须看得见**」⇒ 折起来后 `第 2 轮 · ⚡有条件回炉` 仍在标题行上，看得见；
 *     · **R3**「四类判定**可区分且可见**」⇒ 判定徽标与**各审核面判定缩略**都留在标题行，
 *       折起来也一眼看出"谁过了谁没过"。**把判定折进去 = 让人必须点开才知道结论 = 不可见。**
 *
 *   ★ `<details>` **非受控**（不传 `open`）—— 两个原因：
 *     ① 默认折叠（"一页预览"）；
 *     ② React 不管 `open` ⇒ 用户手动展开后，事件继续到达、组件重渲染**不会把它弹回去**。
 *        （若做成受控，每来一个 SSE 事件就会把用户展开的那一节重新折上，那是灾难。
 *         同理，探针里 `d.open = true` 设上去就保持，不会被 React 重置。）
 */
function RoundBlock({ round }) {
    /** 各审核面判定的**缩略串** —— 折起来也要能一眼看出这一轮的结论分布 */
    const decided = round.lamps.filter((l) => l.verdict !== null);
    /**
     * ★★ **默认展开，但保持"非受控"**（2026-10-06「A 组默认展开」）
     *
     * 为什么**不能**直接写 `<details open>`：
     *   React 会把 `open` 当**受控属性**、**每次渲染都设回去** ⇒ 用户（或探针）
     *   把它折上之后，**下一个 SSE 事件到达就被重新弹开**。
     *   本组件每 ≈300ms 就随轮询增量重渲染一次 ⇒ 症状会非常明显（折不动）。
     *
     * 用 ref + **空依赖** useEffect ⇒ 只在**挂载那一瞬**设一次，之后交给浏览器管：
     *   · 新出现的轮次 ⇒ 默认可见（这就是 A 组的诉求）
     *   · 用户折上 ⇒ **留得住**（重渲染不弹回）
     *   · 探针 `collapseAll()` 仍能把它折上 ⇒「折叠边界」那组断言照旧成立
     *     （其中「折起来时判定仍可见」是 R3 的关键落点，不能因此失效）
     */
    const ref = (0, react_1.useRef)(null);
    /**
     * ★★ 「这一下是人点的」的时间戳 —— `toggle` 回调据此判断该不该滚（见 `onToggle` 守则 ②）。
     *   `0` = 从没点过 ⇒ 任何程序化开合都不会被当成用户操作。
     */
    const clickedAt = (0, react_1.useRef)(0);
    /** 展开后居中的兜底定时器（同 `StartRunForm`：存 ref、只在卸载时清） */
    const scrollTimer = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const el = ref.current;
        if (el !== null)
            el.open = true;
    }, []);
    /**
     * ★★ 「点开这一轮 ⇒ 把它落到视野中间」（2026-10-08 · 104 落地）。
     *
     * ══════════════════════════════════════════════════════════════════
     * 它修的是什么（实测，不是观感）
     * ══════════════════════════════════════════════════════════════════
     *   一轮展开态 315px / 折叠态 43px ⇒ 展开出来 **+272px**。
     *   而用户往往是**在这一轮标题停在容器底部时**点开它
     *   （实测起始 `scrollTop=0` 时块有 **281px 在视野外，全在下边**）
     *   ⇒ **展开出来的内容一个像素都看不见**，且现状 `scrollTop 0 → 0`（一动不动）。
     *
     * ══════════════════════════════════════════════════════════════════
     * ★★ 三条守则（每条都对着一个会出事的场景）
     * ══════════════════════════════════════════════════════════════════
     *   ① **折叠不滚**：折叠是内容变少，不会造成"看不见"；这时滚反而把用户推离他正在读的位置。
     *   ② ★★ **只有"用户点的"才滚** —— 见下面 `clickedAt` 那段的理由（这条最要紧）。
     *   ③ ★★ **门控**：块已经基本在视野里（视野外 ≤ `EXPAND_CENTER_MIN_HIDDEN`）就一动不动。
     *      理由见那个常量的注释（实测反例：只差 13px 却要跳 220px）。
     */
    const onToggle = (e) => {
        const el = e.currentTarget;
        if (!el.open)
            return; // ①
        if (Date.now() - clickedAt.current > USER_CLICK_WINDOW_MS)
            return; // ②
        const box = nearestScroller(el);
        if (box === null)
            return;
        const b = box.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        const hidden = Math.max(0, b.top - r.top) + Math.max(0, r.bottom - b.bottom);
        if (hidden <= EXPAND_CENTER_MIN_HIDDEN)
            return; // ③
        scrollTimer.current = smoothScrollTo(box, centerTop(box, el));
    };
    /** 卸载时把还没落的兜底定时器收掉（与 `StartRunForm` 同款做法） */
    (0, react_1.useEffect)(() => () => {
        if (scrollTimer.current !== null)
            window.clearTimeout(scrollTimer.current);
    }, []);
    return ((0, jsx_runtime_1.jsxs)("details", { ref: ref, "data-kaipu-round": round.round, onToggle: onToggle, style: { marginTop: 14, borderTop: `1px solid ${theme_js_1.C.border}`, paddingTop: 6 }, children: [(0, jsx_runtime_1.jsxs)("summary", { onClick: () => { clickedAt.current = Date.now(); }, style: { cursor: 'pointer', padding: '2px 0', lineHeight: theme_js_1.LH.loose }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.title }, children: ["\u7B2C ", round.round, " \u8F6E"] }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginLeft: 10 }, children: round.reason }), round.verdict !== null && (0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 10 }, children: (0, jsx_runtime_1.jsx)(VerdictBadge, { verdict: round.verdict }) }), round.degraded && ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: '#b45309', marginLeft: 10 }, children: "\uFF08\u672A\u6536\u5230\u8F6E\u6B21\u5F00\u59CB\u4E8B\u4EF6\uFF0C\u6309\u4E8B\u4EF6\u81EA\u5E26 round \u515C\u5E95\u5206\u7EC4\uFF09" })), decided.length > 0 && ((0, jsx_runtime_1.jsx)("span", { "data-kaipu-round-verdicts": "1", style: { fontSize: theme_js_1.FS.tag, marginLeft: 10 }, children: decided.map((l, i) => ((0, jsx_runtime_1.jsxs)("span", { children: [i > 0 && (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.faint }, children: " \u00B7 " }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.faint }, children: l.lamp }), ' ', (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.text, fontWeight: 600 }, children: l.verdict ?? '' })] }, l.lamp))) }))] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, borderLeft: `1px solid ${theme_js_1.C.border}`, paddingLeft: 12 }, children: round.lamps.map((l) => ((0, jsx_runtime_1.jsx)(LampRow, { lamp: l }, `${round.round}\u0000${l.lamp}`))) })] }));
}
function LampRow({ lamp }) {
    // ★ `agent === null` ⇒ 该维度尚未接入执行方 ⇒ 必须显「待接入」（一等公民）
    const pending = lamp.agent === null;
    // ★★ 2026-11-09 阿开拍板（乙案配套）：三态必须分得开，不许把「正在干活」画成「没接入」
    //   · pending                         ⇒ 真·待接入（没人接这盏灯）
    //   · started && verdict===null        ⇒ **正在深度核查**（灯在干活，还没答完）
    //   · verdict!==null                   ⇒ 已有结论
    //   为什么必须有第三态：文灯用 deepseek-v4-pro 跑完整 rubric 需 **222.4 秒**（实测）。
    //   阿开定「宁可慢一点，不能假一点」⇒ 超时提到 600s、**不换 Flash**；
    //   但等 3-4 分钟必须让用户看见原因，否则客户以为系统卡死。
    const running = !pending && lamp.started && lamp.verdict === null;
    return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '7px 0' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.base }, children: lamp.lamp }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: pending ? '#d97706' : theme_js_1.C.dim }, children: pending ? '待接入' : lamp.agent }), running && ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: '#3B6FE0' }, children: "\u6B63\u5728\u6DF1\u5EA6\u6838\u67E5\u5408\u89C4\u98CE\u9669\uFF0C\u9884\u8BA1\u9700\u8981 2-3 \u5206\u949F\uFF0C\u8BF7\u7A0D\u5019\u2026" })), lamp.verdict !== null && (0, jsx_runtime_1.jsx)(VerdictBadge, { verdict: lamp.verdict }), lamp.latencyMs !== null && (
                    // ★ 耗时是"元信息"⇒ 用最淡一档（faint）：它要能查到，但**不该和维度名抢注意力**
                    (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, fontFamily: theme_js_1.FONT.mono, marginLeft: 'auto' }, children: [lamp.latencyMs, " ms"] }))] }), lamp.lines.length > 0 && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 3, lineHeight: theme_js_1.LH.normal }, children: lamp.lines.join(' ') })), lamp.detail !== '' && (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.base, marginTop: 3, lineHeight: theme_js_1.LH.normal }, children: lamp.detail })] }));
}
/* ───────────── 报告体：审核面口径（R4）+ 用量 ───────────── */
function SummaryBlock({ summary, finishReason }) {
    return (
    // ★★ `data-kaipu-summary`（2026-10-17 · Codex 提案 §6 方案B）：行动带「查看本次结论 ↓」
    //   的滚动目标。★ **不是**复用 `data-kaipu-gist` —— 那个锚点在 `NoScenePicked`
    //   空态里（"选一场，把你手头的东西…"），拿它当目标会跳到空态而不是结论。
    //   落点选**块的根**而非内层，滚到块首比滚到内层某行好读。
    (0, jsx_runtime_1.jsxs)("section", { "data-kaipu-summary": "1", style: { marginTop: 18, borderTop: `1px solid ${theme_js_1.C.border}`, paddingTop: 12 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.title }, children: "\u672C\u6B21\u7ED3\u8BBA" }), (0, jsx_runtime_1.jsx)(VerdictBadge, { verdict: summary.verdict }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: ["\u5171 ", summary.round, " \u8F6E \u00B7 ", finishReason ?? '—'] })] }), summary.conditions.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 6 }, children: ["\u9644\u52A0\u6761\u4EF6\uFF1A", summary.conditions.join('；')] })), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 12, padding: '10px 12px', background: theme_js_1.C.soft, fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.loose }, children: summary.dimsReported ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(DimLine, { label: run_reducer_js_1.DIMS_FOOTER.participated, items: summary.participatedDims }), (0, jsx_runtime_1.jsx)(DimLine, { label: run_reducer_js_1.DIMS_FOOTER.skipped, items: summary.skippedDims, tone: "#b45309" }), (0, jsx_runtime_1.jsx)(DimLine, { label: run_reducer_js_1.DIMS_FOOTER.basis, items: ['dim / run_when 裁剪（请求方指定，客户端不推断）'] })] })) : ((0, jsx_runtime_1.jsx)("div", { "data-kaipu-dims-missing": "1", style: { color: '#b45309' }, children: "\u670D\u52A1\u7AEF\u8FD9\u6B21\u6CA1\u6709\u7ED9\u5BA1\u6838\u9762\u4FE1\u606F\uFF0C\u56E0\u6B64\u300C\u672A\u53C2\u4E0E\u5BA1\u6838\u9762\u300D\u65E0\u4ECE\u5224\u65AD\u3002 \u8FD9\u4EFD\u7ED3\u8BBA\u4E0D\u8DB3\u4EE5\u8BF4\u660E\u300C\u8BE5\u5BA1\u7684\u90FD\u5BA1\u4E86\u300D\u2014\u2014 \u8BF7\u4EE5\u670D\u52A1\u7AEF\u62A5\u544A\u4E3A\u51C6\u3002" })) })] }));
}
function DimLine({ label, items, tone }) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 10 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, minWidth: 94, flex: '0 0 auto' }, children: label }), (0, jsx_runtime_1.jsx)("span", { style: { color: tone ?? theme_js_1.C.text, minWidth: 0, overflowWrap: 'break-word' }, children: items.length === 0 ? '（无）' : items.join('、') })] }));
}
function UsageBlock({ usage }) {
    return ((0, jsx_runtime_1.jsxs)("section", { style: { marginTop: 14, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, fontFamily: theme_js_1.FONT.mono }, children: [(0, jsx_runtime_1.jsxs)("div", { children: ["tokens ", usage.tokensIn, " in / ", usage.tokensOut, " out \u00B7 credits ", usage.credits, " \u00B7 balance", ' ', usage.balanceAfter === null ? '未提供' : usage.balanceAfter] }), usage.note !== null && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 3, fontFamily: 'inherit', color: theme_js_1.C.dim }, children: usage.note }))] }));
}
/* ─────────────────────────── 小件 ─────────────────────────── */
function VerdictBadge({ verdict }) {
    const tone = (0, run_reducer_js_1.toneOf)(verdict);
    return (0, jsx_runtime_1.jsx)(Badge, { bg: tone === null ? '#6b7280' : theme_js_1.TONE_BG[tone], children: verdict });
}
function Badge({ children, bg }) {
    return ((0, jsx_runtime_1.jsx)("span", { style: {
            display: 'inline-block',
            padding: '1px 7px',
            borderRadius: 3,
            background: bg,
            color: '#fff',
            fontSize: theme_js_1.FS.tag,
            lineHeight: '18px',
            whiteSpace: 'nowrap',
        }, children: children }));
}
function Note({ children }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 160,
            color: theme_js_1.C.dim,
            fontSize: theme_js_1.FS.base,
        }, children: children }));
}
const ghostButton = {
    marginLeft: 'auto',
    fontSize: theme_js_1.FS.small,
    padding: '4px 12px',
    border: `1px solid ${theme_js_1.C.border}`,
    borderRadius: 4,
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    font: 'inherit',
};
//# sourceMappingURL=RightPane.js.map