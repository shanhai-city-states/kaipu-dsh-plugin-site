"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelHead = PanelHead;
exports.Intro = Intro;
const jsx_runtime_1 = require("react/jsx-runtime");
const theme_js_1 = require("./theme.js");
/* ★ 2026-10-08：`open` / `onJumpToIntro` / `onJumpToShelf` 三个 prop 与
   `HEAD_BTN` 外观常量**已随两个跳转按钮一并删除** ——
   「铺子资料 / 怎么用」成了页签，标题栏只剩"主标 + 数据源 + 切换数据源"。 */
/**
 * 常驻标题栏：一句话说清这是什么 + 当前数据源 + 切换数据源。
 *
 * ★ 左栏的收起/展开开关**不在这里** —— 它是**分隔线上的把手**（见 PlatformPanel）。
 *   放标题栏的话，用户每次都得把鼠标甩到顶上再甩回来（设计评审指出）。
 */
function PanelHead({ source, onUseMock, mockActive }) {
    return ((0, jsx_runtime_1.jsxs)("header", { "data-kaipu-head": "1", style: {
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            borderBottom: `1px solid ${theme_js_1.C.border}`,
            flexWrap: 'wrap',
        }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.heading }, children: "\u5C71\u6D77 \u00B7 \u5F00\u94FA" }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u5F00\u94FA\u5BA1\u8BA1\u7684\u8FD0\u884C\u53F0" }), (0, jsx_runtime_1.jsx)("span", { "data-kaipu-source-label": "1", "data-kaipu-source-mock": mockActive ? '1' : '0', style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: source }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "\u5207\u6362\u6570\u636E\u6E90", "aria-pressed": mockActive, onClick: onUseMock, style: {
                    fontSize: theme_js_1.FS.tag,
                    padding: '3px 10px',
                    border: `1px solid ${theme_js_1.C.border}`,
                    borderRadius: 4,
                    background: mockActive ? theme_js_1.C.soft : 'transparent',
                    color: 'inherit',
                    cursor: 'pointer',
                    font: 'inherit',
                }, children: mockActive ? '用真服务端' : '用演示数据' })] }));
}
/**
 * 「怎么用」页：三步 + 四个词 + 判定图例。**整页即内容**（2026-10-08）。
 *
 * ★★ 为什么不再有「收起」（定稿）
 *   旧版它是右栏顶部一张**默认展开的卡**，必须给个「收起」免得每次挡路。
 *   现在它独占一个页签：**点页签本身就是"我要看用法"** ——
 *   整页即内容，没有"挡不挡路"的问题，也就不需要开合。
 *   ⇒ `onCollapse` prop 与 `data-kaipu-intro-collapse` 锚点一并删除。
 * ★ 锚点 `data-kaipu-intro` 保留（判据认它）。
 *
 * ★★ 2026-10-08 补丁：三步里的「左栏」「右栏」各加前缀「**在操作台的**」。
 *
 *   为什么必须加（不是措辞润色，是**位置指代失去了参照系**）：
 *     「左栏 / 右栏」是**相对位置** —— 相对的是**操作台那一页**。
 *     分页之前「怎么用」长在操作台右栏里，读者**就站在操作台上**，
 *     "左栏"不言自明。分页之后它成了**独立页签**：读者点进来时，
 *     操作台已经不在屏幕上，此时"左栏"指向**屏幕上不存在的东西**。
 *   ⇒ 一句话补参照系：**在操作台的**左栏 / 右栏。
 *
 *   ★ 只加前缀，**不动句子其余部分** —— 三步的动作、右侧的解释一字未改。
 *   ★★ 2026-10-08 · 同一窗口补齐：**第三步也加**（发起人当场追加）——
 *     「拉到最底看「本次结论」」→「**在操作台**拉到最底看「本次结论」」。
 *     理由同前两条（位置指代要带参照系）；它不指某个"栏"，故前缀直接接在动词前。
 *   ★ 判据同步**升级**（不是放松）：老写法 `includes('左栏选一场')` 是**子串** ——
 *     前缀被删它照样绿（恰好在这次改动上"不会失败"）。现改为三条**完整句**断言，
 *     去掉前缀即变红。三条的理由与取舍写在探针里那三条的注释上。
 */
function Intro() {
    return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-intro": "1", style: {
            margin: '12px 12px 0',
            padding: '12px 14px',
            border: `1px solid ${theme_js_1.C.border}`,
            borderLeft: `3px solid ${theme_js_1.C.accent}`,
            background: 'rgba(59,111,224,0.05)',
            fontSize: theme_js_1.FS.base,
            lineHeight: theme_js_1.LH.normal,
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 10 }, children: (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, flex: '1 1 auto', minWidth: 0 }, children: "\u7B2C\u4E00\u6B21\u7528\uFF1F\u770B\u8FD9\u4E09\u6B65\u5C31\u591F" }) }), (0, jsx_runtime_1.jsxs)("ol", { style: { margin: '8px 0 0', paddingLeft: 20, paddingRight: 4 }, children: [(0, jsx_runtime_1.jsxs)("li", { style: { overflowWrap: 'break-word' }, children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u5728\u64CD\u4F5C\u53F0\u7684\u5DE6\u680F\u9009\u4E00\u573A\u300C\u573A\u666F\u300D" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u3000\u4E00\u573A\u573A\u666F = \u4E00\u6B21\u56FA\u5B9A\u7684\u4F1A\u5546\u6D41\u7A0B\uFF08\u51E0\u4E2A\u5BA1\u6838\u9762\u4E00\u8D77\u5BA1\uFF09\u3002" })] }), (0, jsx_runtime_1.jsxs)("li", { style: { overflowWrap: 'break-word' }, children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u5728\u64CD\u4F5C\u53F0\u7684\u53F3\u680F\u4ECE\u4E0A\u5F80\u4E0B\u770B\u300C\u7B2C N \u8F6E\u300D" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u3000\u6BCF\u8F6E\u91CC\u6BCF\u4E2A\u5BA1\u6838\u9762\u5404\u7ED9\u4E00\u4E2A\u5224\u5B9A\uFF1B\u88AB\u56DE\u7089\u7684\u4F1A\u53E6\u8D77\u4E00\u8F6E\u3002" })] }), (0, jsx_runtime_1.jsxs)("li", { style: { overflowWrap: 'break-word' }, children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u5728\u64CD\u4F5C\u53F0\u62C9\u5230\u6700\u5E95\u770B\u300C\u672C\u6B21\u7ED3\u8BBA\u300D" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u2605\u300C\u672A\u53C2\u4E0E\u5BA1\u6838\u9762\u300D\u4E00\u5B9A\u8981\u770B \u2014\u2014 \u5B83\u8BF4\u660E\u8FD9\u4E00\u8D9F\u5230\u5E95\u6CA1\u5BA1\u54EA\u4E9B\uFF0C\u62A5\u544A\u4E0D\u4F1A\u7ED9\u4F60\"\u5BA1\u5168\u4E86\"\u7684\u9519\u89C9\u3002" })] })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 12, fontSize: theme_js_1.FS.title }, children: "\u56DB\u4E2A\u8BCD\uFF0C\u4E00\u773C\u5BF9\u4E0A" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 6 }, children: [(0, jsx_runtime_1.jsx)(Term, { k: "\u6267\u884C\u65B9", v: "\u5DF2\u63A5\u5165\u7684\u6267\u884C\u65B9\u53CA\u5176\u72B6\u6001\u3002\u7070\u6389\u7684\u662F\u88AB\u6709\u610F\u5173\u6389\u7684\uFF0C\u4E0D\u662F\u574F\u4E86\u3002" }), (0, jsx_runtime_1.jsx)(Term, { k: "\u573A\u666F", v: "\u4E00\u6B21\u4F1A\u5546\u6D41\u7A0B\u7684\u56FA\u5B9A\u914D\u7F6E\uFF1A\u5BA1\u54EA\u51E0\u4E2A\u5BA1\u6838\u9762\u3001\u6700\u591A\u56DE\u7089\u51E0\u8F6E\u3002" }), (0, jsx_runtime_1.jsx)(Term, { k: "\u5BA1\u6838\u9762", v: "\u4E00\u4E2A\u5BA1\u67E5\u89D2\u5EA6\uFF0C\u4F8B\u5982\u300C\u667A\u706F\u300D\u300C\u5320\u706F\u300D\u3002\u5177\u4F53\u662F\u54EA\u51E0\u4E2A\uFF0C\u4EE5\u8FD9\u4E00\u573A\u7684\u914D\u7F6E\u4E3A\u51C6\u3002" }), (0, jsx_runtime_1.jsx)(Term, { k: "\u5F85\u63A5\u5165", v: "\u8FD9\u4E2A\u5BA1\u6838\u9762\u8FD8\u6CA1\u6709\u6267\u884C\u65B9\u3002\u8FD9\u4E0D\u662F\u6545\u969C \u2014\u2014 \u573A\u5730\u4E0D\u5185\u7F6E\u4EFB\u4F55\u300C\u5FC5\u987B\u6709\u7684\u300D\u6267\u884C\u65B9\u3002" })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 12, fontSize: theme_js_1.FS.title }, children: "\u5224\u5B9A\u957F\u4EC0\u4E48\u6837" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }, children: [(0, jsx_runtime_1.jsx)(Legend, { tone: theme_js_1.TONE_BG.pass, word: "\u2705\u901A\u8FC7", note: "\u76F4\u63A5\u8FC7" }), (0, jsx_runtime_1.jsx)(Legend, { tone: theme_js_1.TONE_BG.conditional, word: "\u26A1\u6709\u6761\u4EF6", note: "\u8865\u4EF6\u540E\u53EF\u8FC7\uFF0C\u901A\u5E38\u4F1A\u89E6\u53D1\u56DE\u7089" }), (0, jsx_runtime_1.jsx)(Legend, { tone: theme_js_1.TONE_BG.reject, word: "\u274C\u9A73\u56DE", note: "\u8FD9\u4E00\u8F6E\u7684\u7ED3\u8BBA\u4E0D\u901A\u8FC7" }), (0, jsx_runtime_1.jsx)(Legend, { tone: theme_js_1.TONE_BG.refuse, word: "\u26D4\u62D2\u6536", note: "\u8FDB\u4EF6\u524D\u5C31\u9000\u56DE\uFF0C\u4E0D\u6536\u8D39" })] })] }));
}
function Term({ k, v }) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 10, marginTop: 3 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { flex: '0 0 auto', width: 62, color: theme_js_1.C.text }, children: k }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: v })] }));
}
/** 图例一律**实底徽标**，与运行视图里的判定徽标同色 —— 让人把颜色和词对上。 */
function Legend({ tone, word, note }) {
    return ((0, jsx_runtime_1.jsxs)("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                    display: 'inline-block',
                    padding: '1px 7px',
                    borderRadius: 3,
                    background: tone,
                    color: '#fff',
                    fontSize: theme_js_1.FS.tag,
                    lineHeight: '18px',
                    whiteSpace: 'nowrap',
                }, children: word }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.small }, children: note })] }));
}
//# sourceMappingURL=Intro.js.map