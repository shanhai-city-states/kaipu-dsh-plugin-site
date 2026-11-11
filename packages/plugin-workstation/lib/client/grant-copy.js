"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.granteeLabel = granteeLabel;
exports.granteeUnknown = granteeUnknown;
exports.grantCopyText = grantCopyText;
exports.codeDaysLeft = codeDaysLeft;
exports.codeLeftText = codeLeftText;
function granteeLabel(name, id) {
    const n = String(name ?? '').trim();
    if (n.length > 0)
        return n;
    const i = String(id ?? '').trim();
    return i.length > 0 ? '对方未填名字' : '未兑换';
}
function granteeUnknown(name) {
    return String(name ?? '').trim().length === 0;
}
function grantCopyText(code, ttlHours, codeExpiresAt) {
    const day = String(codeExpiresAt ?? '').slice(0, 10);
    const when = day.length === 10 ? `这个码到 ${day} 前都能兑换` : '这个码 7 天内有效';
    return [
        `我在山海城铺子里给你开了临时管理权限（兑换后 ${ttlHours} 小时，${when}）。`,
        '把这个码发给你自己的 Agent 就行：',
        '',
        code,
    ].join('\n');
}
function codeDaysLeft(codeExpiresAt, nowMs) {
    const t = Date.parse(String(codeExpiresAt ?? ''));
    if (Number.isNaN(t))
        return null;
    const now = typeof nowMs === 'number' ? nowMs : Date.now();
    const ms = t - now;
    if (ms <= 0)
        return 0;
    return Math.ceil(ms / 86400000);
}
function codeLeftText(codeExpiresAt, nowMs) {
    const d = codeDaysLeft(codeExpiresAt, nowMs);
    if (d === null)
        return '码 7 天内有效';
    if (d <= 0)
        return '码已过期';
    return `剩 ${d} 天`;
}
//# sourceMappingURL=grant-copy.js.map