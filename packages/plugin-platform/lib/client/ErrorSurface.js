"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorSurface = ErrorSurface;
const jsx_runtime_1 = require("react/jsx-runtime");
const kaipu_contract_1 = require("@shanhai/kaipu-contract");
const copy_js_1 = require("./copy.js");
const theme_js_1 = require("./theme.js");
function ErrorSurface({ code, detail, onDismiss }) {
    // ★ 契约点名的两个"另走一条路"的码
    if ((0, kaipu_contract_1.isReroutableError)(code))
        return (0, jsx_runtime_1.jsx)(Reroute, { code: code, detail: detail, onDismiss: onDismiss });
    const text = (0, kaipu_contract_1.translateError)(code);
    const isExpiry = code === 'reservation_expired';
    return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-error": code, style: {
            marginTop: 12,
            padding: '10px 12px',
            border: `1px solid ${theme_js_1.C.border}`,
            borderLeft: '3px solid #dc2626',
            background: 'rgba(220,38,38,0.06)',
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'flex-start', gap: 10 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.normal }, children: text }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onDismiss, style: { ...ghost, marginLeft: 'auto' }, children: "\u77E5\u9053\u4E86" })] }), isExpiry && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 8 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.base, color: '#b45309' }, children: copy_js_1.CONSTRAINTS.expiry }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 3, lineHeight: theme_js_1.LH.normal }, children: copy_js_1.CONSTRAINTS.expiryWhy }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onDismiss, style: { ...ghost, marginTop: 8 }, children: "\u91CD\u65B0\u9884\u7EA6\uFF08\u4E0D\u7528\u91CD\u65B0\u586B\uFF09" })] }))] }));
}
/** `duplicate_request` / `not_checked_in` ⇒ **不是错误**，是"该走另一条路"。 */
function Reroute({ code, detail, onDismiss, }) {
    const text = (0, kaipu_contract_1.translateError)(code);
    const poll = (0, kaipu_contract_1.duplicatePollPath)(detail);
    const requiresExternal = detail?.['requiresExternal'] === true;
    const availableAt = formatAt(detail?.['availableAt']);
    return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-reroute": code, ...(poll === undefined ? {} : { 'data-kaipu-poll': poll }), ...(availableAt === null ? {} : { 'data-kaipu-available-at': availableAt }), style: {
            marginTop: 12,
            padding: '10px 12px',
            border: `1px solid ${theme_js_1.C.border}`,
            borderLeft: `3px solid ${theme_js_1.C.accent}`,
            background: 'rgba(59,111,224,0.06)',
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.normal }, children: text }), poll !== undefined && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 8 }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onDismiss, style: ghost, children: "\u67E5\u770B\u8FD9\u6B21\u8FD0\u884C" }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginLeft: 10 }, children: "\uFF08\u5207\u5230\u67E5\u8BE2\u63A5\u53E3\uFF0C\u4E0D\u91CD\u590D\u63D0\u4EA4\uFF09" })] })), requiresExternal && ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 6, lineHeight: theme_js_1.LH.normal }, children: ["\u8BE5\u573A\u666F\u9700\u8FDB\u573A\uFF1A\u6709\u6709\u6548\u9884\u7EA6\u540E\u624D\u53EF\u8FD0\u884C\uFF08\u8FD9\u4E0D\u662F\u6545\u969C\uFF09\u3002", availableAt !== null && ((0, jsx_runtime_1.jsxs)("span", { children: [' ', "\u53EF\u8FDB\u573A\u65F6\u70B9\uFF1A", (0, jsx_runtime_1.jsx)("strong", { "data-kaipu-available-text": "1", children: availableAt })] }))] }))] }));
}
/**
 * ISO8601 → 本地可读时点。**读不懂就返回 null**（不显示，不抛）。
 *
 * ★★ 只做「格式化绝对时点」，**不做「还剩多久」** —— 这是契约纪律，不是偷懒：
 *   服务端给的是**绝对时点**（`availableAt`），而倒计时的**基准**必须由服务端给
 *   （契约原文：`windowRemainingSec` 服务端给，客户端不自己算基准）。
 *   ⇒ 一旦我自己 `Date.now()` 相减，客户端时钟偏差就会变成一个**看起来像真的**的错数字。
 */
function formatAt(iso) {
    if (typeof iso !== 'string')
        return null;
    const t = Date.parse(iso);
    if (Number.isNaN(t))
        return null;
    const d = new Date(t);
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
const ghost = {
    fontSize: theme_js_1.FS.small,
    padding: '4px 12px',
    border: `1px solid ${theme_js_1.C.border}`,
    borderRadius: 4,
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    font: 'inherit',
};
//# sourceMappingURL=ErrorSurface.js.map