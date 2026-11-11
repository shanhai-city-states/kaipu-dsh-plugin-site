"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFY_DEGRADED_NOTICE = exports.NOTIFY_HINT = exports.NOTIFY_LABEL = exports.NOTIFY_PUBLIC_LABEL = exports.NOTIFY_PUBLIC_VALUE = void 0;
exports.agentChoices = agentChoices;
exports.notifyPickHint = notifyPickHint;
exports.isNotifyUnsupported = isNotifyUnsupported;
exports.notifyFailText = notifyFailText;
exports.extraHolderBadge = extraHolderBadge;
exports.extraHolderTitle = extraHolderTitle;
exports.holderUnknownText = holderUnknownText;
function agentChoices(members) {
    const seen = new Set();
    const out = [];
    for (const m of members) {
        if (m.kind !== 'agent')
            continue;
        if (m.membershipActive === false)
            continue;
        const id = (m.id ?? '').trim();
        if (id.length === 0 || seen.has(id))
            continue;
        seen.add(id);
        out.push({ id, name: (m.name ?? '').trim().length > 0 ? m.name.trim() : id });
    }
    out.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'));
    return out;
}
exports.NOTIFY_PUBLIC_VALUE = '';
exports.NOTIFY_PUBLIC_LABEL = '谁在岗谁领（默认）';
exports.NOTIFY_LABEL = '顺手通知谁';
exports.NOTIFY_HINT = '点名后它会更快看到这活；不点名，活也在公池里等认领。';
function notifyPickHint(choice) {
    if (choice === null)
        return exports.NOTIFY_HINT;
    return `已选 ${choice.name} —— 它下次来取活时会先看到这条；别人也能领。`;
}
function isNotifyUnsupported(code, message) {
    if (code !== 'unknown_field')
        return false;
    return /notifyAgent|notify_agent/i.test(message);
}
exports.NOTIFY_DEGRADED_NOTICE = '这条已按「谁在岗谁领」发到公池 —— 服务端还没开通点名通知，选了也不会生效。';
function notifyFailText(code, message) {
    if (code === 'agent_not_found') {
        return '选的那个 Agent 已经不在这个铺子里了，换个目标，或者选「谁在岗谁领」。';
    }
    if (isNotifyUnsupported(code, message)) {
        return '服务端这版还不支持点名通知，把「顺手通知谁」调回「谁在岗谁领」再发一次就行。';
    }
    return message.length > 0 ? message : '这条没发出去，稍后再试一次。';
}
function extraHolderBadge(holderCount) {
    const extra = holderCount - 1;
    if (!Number.isFinite(extra) || extra < 1)
        return '';
    return `＋${extra}`;
}
function extraHolderTitle(holderCount) {
    const extra = holderCount - 1;
    if (!Number.isFinite(extra) || extra < 1)
        return '';
    return `这个位子上还有 ${extra} 个人`;
}
function holderUnknownText(holderCount, seatCount, seatVacantish = undefined) {
    if (holderCount > 0)
        return '';
    if (!Number.isFinite(seatCount) || seatCount <= 0)
        return '';
    if (seatVacantish === undefined)
        return '';
    if (seatVacantish)
        return '';
    return '有人，但读不到是谁';
}
//# sourceMappingURL=notify-copy.js.map