"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WisdomPanel = WisdomPanel;
exports.wireConnection = wireConnection;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * 山海·开铺 · 智囊团插件 · 面板（四区会商视图）
 * =====================================================================
 * 定位：**一群谋士（会商量的组织）**，不是"一组专家（能力的集合）"。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 与场地面板的分工（已确认）
 * ══════════════════════════════════════════════════════════════════
 *
 * 我读场地插件 `RightPane.tsx` 时发现：**"会商"这件事，场地插件已经渲染得很完整了**
 * （`RoundBlock` 有第 N 轮 + 回炉理由，`LampRow` 有维度 + 执行方 + 判定 + 耗时）。
 * ⇒ 若本面板把同一份数据再渲染一遍，就是"**两个面板、同一件事**"：
 *   用户会问"我该看哪个"，且两处都要跟着契约改（维护双份）。
 *
 * ⇒ **切法是「同一批数据的两个时间尺度」**：
 *
 *   | 面板 | 问的问题 | 时间尺度 |
 *   |:--|:--|:--|
 *   | 场地 `RightPane` | 「**这一次**会商跑到哪了」 | 一场（面向过程） |
 *   | 智囊团（本文件） | 「**这群谋士**是谁 · 服务哪些场子」 | 跨场（面向组织） |
 *
 * ★ **所以本面板不显示判定 / 耗时 / 轮次** —— 那些是场地面板的活。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 四区（设计稿 · 可开工 4/5 区）
 * ══════════════════════════════════════════════════════════════════
 *   ① 状态带    —— 接没接上 / 几个灯位 / **已登记 vs 未登记**（状态带区分的落点）
 *   ② 灯位一览  —— ★ 核心区：这里的"人"是谁（判定**只认 agentId**）
 *   ③ 场景归属  —— 这几位服务于哪些场景（复用 `scenes[].lamps` 反查）
 *   ④ 会商履历  —— ⏸ **只占位**（数据源未知）
 *
 * ★★ **空态是一等公民**：现在真实数据就是 **5/5 待接入**
 *   ⇒ "空态"**不是边缘情况，而是当前的主要状态**。
 *   它是「场地零内置可跑」的**用户可见面**，措辞要**正向且诚实**：
 *   不是"我们还没装好"（那是我们的问题），而是"**位子给你留着了**"（这是场地的承诺）。
 */
const react_1 = require("react");
const bridge_js_1 = require("./bridge.js");
const live_js_1 = require("./live.js");
const theme_js_1 = require("./theme.js");
function WisdomPanel() {
    const [snap, setSnap] = (0, react_1.useState)(null);
    /**
     * ★ 取一次快照。
     *
     * ⚠️ 本插件**不做"改用演示数据"按钮**（场地侧有）。
     *   为什么不做：场地面板那个按钮是为了**设计评审**（便于设计评审看界面）。
     *   智囊团的空态**本身就是当前真实状态**（5/5 待接入）⇒ 不需要编演示数据
     *   来"演示空态"—— 编了反而**掩盖了真实的空态长什么样**。
     *   ★ 若将来评审需要，再加不迟；现在加就是**多一个能说谎的入口**。
     */
    (0, react_1.useEffect)(() => {
        let alive = true;
        const ac = new AbortController();
        void (async () => {
            const next = await (0, live_js_1.loadLive)(ac.signal);
            if (alive)
                setSnap(next);
        })();
        return () => {
            alive = false;
            ac.abort();
        };
    }, []);
    const lamps = (0, react_1.useMemo)(() => snap?.lamps ?? [], [snap]);
    const sum = (0, react_1.useMemo)(() => (0, live_js_1.summarize)(lamps), [lamps]);
    return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-wisdom": "1", style: { padding: 16, overflowWrap: 'break-word', color: theme_js_1.C.text }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.heading, fontWeight: 600, marginBottom: 10 }, children: "\u667A\u56CA\u56E2" }), (0, jsx_runtime_1.jsx)(StatusBand, { snap: snap, sum: sum }), snap !== null && snap.kind !== 'live' ? ((0, jsx_runtime_1.jsx)(Unreadable, { kind: snap.kind, reason: snap.reason })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(LampSection, { lamps: lamps, loading: snap === null }), (0, jsx_runtime_1.jsx)(SceneSection, { scenes: snap?.scenes ?? [], loading: snap === null })] })), (0, jsx_runtime_1.jsx)(HistorySection, {})] }));
}
/* ══════════════════════════════════════════════════════════════════
   ① 状态带（一行 · 不占高度）
   ══════════════════════════════════════════════════════════════════ */
/**
 * ★★ 「状态带内部区分已登记/未登记」的**唯一落点**。
 *
 * 形态：`已接入 · 5 灯位 · 5 已登记待启用`
 *
 * ★ 为什么把"已登记/未登记"提到**第一行**：
 *   这是「场地零内置可跑」的**用户可见面**，现在实测 5/5 都不是 `ready`
 *   ⇒ 这件事**不该藏在下滑区**，第一眼就要看到。
 *
 * ★ 数据源状态**三态显式**（`live` 外都带原因），**绝不悄悄回落**。
 */
function StatusBand({ snap, sum }) {
    const kind = snap === null ? 'loading' : snap.kind;
    const label = snap === null ? '正在读取…' : snap.label;
    return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-wisdom-band": kind, style: {
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
            flexWrap: 'wrap',
            paddingBottom: 10,
            borderBottom: `1px solid ${theme_js_1.C.border}`,
            fontSize: theme_js_1.FS.small,
            lineHeight: theme_js_1.LH.normal,
        }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: kind === 'live' ? theme_js_1.C.dim : theme_js_1.VACANT }, children: label }), snap !== null && snap.kind === 'live' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.faint }, children: "\u00B7" }), (0, jsx_runtime_1.jsx)("span", { "data-kaipu-wisdom-summary": "1", style: { color: theme_js_1.C.text }, children: (0, live_js_1.summaryText)(sum) })] }))] }));
}
/* ══════════════════════════════════════════════════════════════════
   ② 灯位一览（核心区）
   ══════════════════════════════════════════════════════════════════ */
/** 网格形状（发起人 2026-10-06 定：一组 5 个灯位一行，预留大概 4-5 组 ⇒ 取上沿 5 行；要调改这两个常量即可） */
const LAMP_COLS = 5;
const LAMP_ROWS = 5;
function LampSection({ lamps, loading }) {
    return ((0, jsx_runtime_1.jsxs)("section", { style: { marginTop: 14 }, children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\u706F\u4F4D" }), loading ? ((0, jsx_runtime_1.jsx)(Hint, { children: "\u6B63\u5728\u8BFB\u53D6\u2026" })) : lamps.length === 0 ? (
            /* ★ 零灯位 ≠ "5 个待接入"。措辞必须分开：
                 - 零灯位 = 这个铺子**还没配灯组**（去配）
                 - 全待接入 = 灯组配好了，**人还没来**（去接人） */
            (0, jsx_runtime_1.jsx)(Hint, { children: "\u8FD9\u4E2A\u94FA\u5B50\u8FD8\u6CA1\u6709\u706F\u4F4D\u3002\u706F\u7EC4\u7531\u573A\u666F\u5B9A\u4E49\u51B3\u5B9A\u3002" })) : ((0, jsx_runtime_1.jsx)(LampGrid, { lamps: lamps })), !loading && lamps.length > 0 && lamps.every((l) => l.state !== 'ready') && (0, jsx_runtime_1.jsx)(VacantNote, { lamps: lamps })] }));
}
/**
 * 灯位网格：**真灯位在前，占位补足到 `LAMP_COLS × LAMP_ROWS`**。
 *
 * ★★ 占位（`ReservedSlot`）是发起人点名的"预留灯位"—— 它把「位子给你留着了」
 *   从一句话变成**看得见的格子**。但它必须与真灯位**在判据层可分**：
 *   真灯位挂 `data-kaipu-wisdom-lamp`，占位挂 `data-kaipu-wisdom-slot="reserved"`
 *   —— 探针（`wisdom-view-probe.mjs`）数的是前者，占位混进去会把
 *   "至少渲染 1 个灯位行"和逐态断言全部污染。
 */
function LampGrid({ lamps }) {
    const reserved = Math.max(0, LAMP_COLS * LAMP_ROWS - lamps.length);
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            marginTop: 6,
            display: 'grid',
            gridTemplateColumns: `repeat(${String(LAMP_COLS)}, minmax(0, 1fr))`,
            gap: 8,
        }, children: [lamps.map((l) => ((0, jsx_runtime_1.jsx)(LampCard, { seat: l }, l.lamp))), Array.from({ length: reserved }, (_, i) => ((0, jsx_runtime_1.jsx)(ReservedSlot, {}, `reserved-${String(i)}`)))] }));
}
/**
 * 一个灯位一张卡（原为一行；2026-10-06 起改网格卡，锚点与文案纪律**原样保留**）。
 *
 * ★★ **判定只认 `agentId`**（契约 §23.3 权威字段）——
 *   即使服务端把 `agentName` 写成 `(待接入)`，界面也不会"看起来对、其实错"。
 *
 * ★★ 状态文案**故意不区分 `vacant` / `registered`**（两者都显「待接入」）：
 *   区分发生在**状态带的汇总层** —— 见 `StatusBand` 与 `live.ts` 的 `LampState` 注释。
 *
 * ★★ 状态**紧贴灯名**（发起人 2026-10-06：别甩到行尾）——
 *   原一行式布局里状态用 `marginLeft:auto` 推到最右，灯一多名字与状态就分离了；
 *   卡片式天然上下相邻，这个问题消失。
 */
function LampCard({ seat }) {
    const ready = seat.state === 'ready';
    const tip = lampTip(seat);
    return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-wisdom-lamp": seat.lamp, "data-kaipu-wisdom-lamp-state": seat.state, title: tip, "aria-label": `${seat.lamp}，${lampAria(seat)}`, style: {
            padding: '8px 10px',
            border: `1px solid ${theme_js_1.C.border}`,
            borderLeft: `3px solid ${ready ? theme_js_1.C.accent : theme_js_1.VACANT}`,
            borderRadius: 4,
            // ★ 只有 `ready` 是满色；`vacant`/`registered` 不淡化（那是**正常态**，不是"坏了"）
            cursor: tip === '' ? 'default' : 'help',
            minWidth: 0,
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.base, color: theme_js_1.C.text, overflowWrap: 'break-word' }, children: seat.lamp }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 2 }, children: (0, jsx_runtime_1.jsx)("span", { "data-kaipu-wisdom-lamp-text": "1", style: { fontSize: theme_js_1.FS.tag, color: ready ? theme_js_1.C.dim : theme_js_1.VACANT }, children: (0, live_js_1.lampText)(seat) }) }), seat.agentId !== null && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 2, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, fontFamily: theme_js_1.FONT.mono, overflowWrap: 'break-word' }, children: seat.agentId }))] }));
}
/**
 * 预留灯位（虚线卡）—— **不是灯位**，只是"这里的格子留着"。
 * ⚠️ 不挂 `data-kaipu-wisdom-lamp`（见 `LampGrid` 注释）· `aria-hidden`：屏幕阅读器不读空位。
 */
function ReservedSlot() {
    return ((0, jsx_runtime_1.jsx)("div", { "data-kaipu-wisdom-slot": "reserved", "aria-hidden": "true", style: {
            padding: '8px 10px',
            border: `1px dashed ${theme_js_1.C.border}`,
            borderRadius: 4,
            color: theme_js_1.C.faint,
            fontSize: theme_js_1.FS.tag,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 0,
        }, children: "\u9884\u7559" }));
}
/**
 * 悬停提示 —— ★ **如实写**，不因为行文案合并了就把事实也合并掉。
 *
 * ★ 为什么这里要写出 `pending` / `disabled` 的区别：
 *   行文案为了保守合并成「待接入」，那是**给"扫一眼"的人看的**；
 *   而悬停是**给"想弄清楚"的人看的** —— 对他**不许说假话**。
 *   ⇒ `registered` 的提示必须说清"**有人了，但还没上线**"，
 *     否则行文案的保守就变成了**信息删失**。
 *
 * ★ 用原生 `title` 而不是自绘浮层（承场地侧理由）：面板挂在宿主容器里，
 *   容器常带 `overflow` 裁剪 ⇒ 自绘浮层会被裁掉；`title` 零 JS、不会被裁、
 *   屏幕阅读器会当 accessible description 读。
 *
 * ⚠️⚠️ **`title` 是纯文本，不渲染 markdown** ⇒ 文案里**不许有 `**` / `_` 之类记号**
 *   —— 它们会被**原样显示**（用户看到一串星号）。
 *   这不是洁癖：场地侧第一版就把 `**…**` 直接印在了界面上，属于同一类错
 *   （"上屏文本不许带 markdown 记号"是 `live.ts` 已立的纪律）。
 *   ⇒ 要强调就用中文标点（「」），不要用星号。
 */
function lampTip(seat) {
    const parts = [];
    if (seat.state === 'vacant') {
        parts.push('这个位子还没有人接。');
    }
    else if (seat.state === 'registered') {
        // ★ 不合并：把"有人了"这个事实说出来
        parts.push(seat.rawStatus === 'disabled'
            ? '这个位子有人，但当前被停用。'
            : '这个位子已登记，但还没有上线。');
    }
    else {
        parts.push('这个位子已就绪。');
    }
    if (seat.agentId !== null)
        parts.push(`执行方：${seat.agentId}`);
    if (seat.scenes.length > 0)
        parts.push(`服务于：${seat.scenes.join(' · ')}`);
    return parts.join('\n');
}
function lampAria(seat) {
    if (seat.state === 'ready')
        return `${seat.agentId ?? ''} 已就绪`.trim();
    if (seat.state === 'registered')
        return '已登记待启用';
    return '待接入';
}
/**
 * ★★ 空态的正向表达 —— **本面板最重要的一句文案**。
 *
 * 取向：这是「场地零内置可跑」的正向表达 ——
 * **不是"我们还没装好"（那是我们的问题），而是"位子给你留着了"（这是场地的承诺）**。
 * 对齐总体定位：**"场地"是我们做的，"谁来"是客户定的。**
 *
 * ⚠️ **Q4 的纠结已落地**（Q4 归发起人拍，选了"两句分开说"的写法 ——
 *   即下面前两句；因为那既是诚实的、也是正向的）。
 *   ★ 但这里**没有**写第三句"内置谋士（山海智囊团）也在这个位子上，尚未入场"。
 *     为什么不写：**Q2 还没答**（5 条灯是否共享同一 host Agent）。
 *     若 Q2 答"共享" ⇒ 加那句成立；若答"各自独立" ⇒ 那句话是**错的**。
 *     ⇒ 在 Q2 落地前**只写不依赖 Q2 的两句**（这是已承诺的降级行为：
 *       不确定处不编，答了改一处文案，不动结构）。
 */
function VacantNote({ lamps }) {
    const allVacant = lamps.every((l) => l.state === 'vacant');
    return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-wisdom-vacant": allVacant ? 'all' : 'partial', style: { marginTop: 10, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.loose }, children: [(0, jsx_runtime_1.jsx)("div", { children: "\u8FD9\u7FA4\u8C0B\u58EB\u8FD8\u6CA1\u5230\u4F4D\u3002" }), (0, jsx_runtime_1.jsx)("div", { children: "\u706F\u4F4D\u5DF2\u5907\u597D\uFF0C\u8C01\u6765\u5750\u7531\u4F60\u5B9A\u3002" })] }));
}
/* ══════════════════════════════════════════════════════════════════
   ③ 场景归属
   ══════════════════════════════════════════════════════════════════ */
/**
 * ★ 这一区的价值：它回答了"**这群谋士是给哪些场子用的**" ——
 *   场地面板**回答不了**这个问题（它只看一场）。**这就是"纵深"的第一个落点。**
 */
function SceneSection({ scenes, loading }) {
    return ((0, jsx_runtime_1.jsxs)("section", { style: { marginTop: 16 }, children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\u670D\u52A1\u4E8E\u6B64\u5904\u7684\u573A\u666F" }), loading ? ((0, jsx_runtime_1.jsx)(Hint, { children: "\u6B63\u5728\u8BFB\u53D6\u2026" })) : scenes.length === 0 ? ((0, jsx_runtime_1.jsx)(Hint, { children: "\u8FD8\u6CA1\u6709\u53EF\u7528\u573A\u666F\u3002" })) : ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6 }, children: scenes.map((s) => ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '4px 0', fontSize: theme_js_1.FS.small, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.text }, children: ["\u00B7 ", s.label] }), s.lamps.length > 0 && ((0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.faint }, children: ["\u3000", s.lamps.join(' / ')] }))] }, s.label))) }))] }));
}
/* ══════════════════════════════════════════════════════════════════
   ④ 会商履历（⏸ 只占位 · 数据源未知）
   ══════════════════════════════════════════════════════════════════ */
/**
 * ★★ **本期只画框**——数据源未知（P1 清单里**找不到**跨场会商记录的读口；
 *   `/roles/changes` 是**席位变更**，`/scene/{id}/run` 是**当次** SSE）。
 *
 * ★ 为什么不偷偷省掉它：若省掉，将来补上时**这一区无位置可插**，
 *   只能重排整个面板（那才是真返工）。**先占位、后填肉**是成本最低的做法。
 *
 * ★ 而且——**"暂无记录"本身是诚实的**：它没说"没有会商发生过"，
 *   只说"**这里还没有记录可看**"。句子里带出下一句，让用户知道不是他的问题。
 */
function HistorySection() {
    return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-wisdom-history": "placeholder", style: { marginTop: 16 }, children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\u4F1A\u5546\u5C65\u5386" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsx)("div", { children: "\u6682\u65E0\u8BB0\u5F55" }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.faint }, children: "\u8DE8\u573A\u4F1A\u5546\u8BB0\u5F55\u9700\u8981\u670D\u52A1\u7AEF\u63D0\u4F9B\uFF0C\u672C\u7248\u672C\u6682\u672A\u63A5\u5165\u3002" })] })] }));
}
/* ══════════════════════════════════════════════════════════════════
   小件
   ══════════════════════════════════════════════════════════════════ */
function SectionTitle({ children }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, fontWeight: 600, color: theme_js_1.C.text }, children: children }));
}
function Hint({ children }) {
    return (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: children });
}
/**
 * ★★ **读不到**时的那一屏 —— 与"空态"**绝不同形**。
 *
 * 为什么必须独立成组件（而不是复用 `VacantNote`）：
 *   两者的**用户下一步动作完全不同** ——
 *     · 空态（`live` + 全 vacant）⇒ "**去接 Agent**"（用户自己的活）
 *     · 读不到（`stale`/`unreachable`/`no_channel`）⇒ "**去查通道/地址/插件**"（环境问题）
 *   用同一屏糊过去 = **把"我读不到"伪装成"你这里没人"** ——
 *   那是**编造了一个不存在的事实**，与"`pending` 被误显成「已停用」"是同一类错。
 *
 * ★ 措辞纪律：`stale`（通道未就绪）与 `unreachable`（连不上）**要分开说**，
 *   因为出路不同（查插件装载 vs 查地址/网络）。
 */
function Unreadable({ kind, reason }) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 14 }, children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\u706F\u4F4D" }), (0, jsx_runtime_1.jsxs)("div", { "data-kaipu-wisdom-unreadable": kind, style: { marginTop: 6, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.loose }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.VACANT }, children: "\u8BFB\u4E0D\u5230\u706F\u4F4D\u6570\u636E\u3002" }), reason !== null && (0, jsx_runtime_1.jsx)("div", { children: reason }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.faint }, children: "\u8FD9\u4E0D\u4EE3\u8868\u706F\u4F4D\u662F\u7A7A\u7684 \u2014\u2014 \u53EA\u662F\u8FD9\u4E00\u4FA7\u6CA1\u80FD\u8BFB\u5230\u3002" })] })] }));
}
/* ══════════════════════════════════════════════════════════════════
   入口接线：★ 与场地侧**同款**，但**不 import 它的任何东西**
   ══════════════════════════════════════════════════════════════════

   ⚠️ 本模块在 `apply()` 里被调用一次。为什么把 `setConnection` 放这里
   而不是 `index.ts`：`index.ts` 是**接线层**，它不该知道"数据层怎么存句柄"。
   ⇒ 提供一个 `wireConnection(ctx)` 出口，让接线层只表达意图。
*/
function wireConnection(ctx) {
    (0, live_js_1.setConnection)((0, bridge_js_1.getConnection)(ctx));
}
//# sourceMappingURL=WisdomPanel.js.map