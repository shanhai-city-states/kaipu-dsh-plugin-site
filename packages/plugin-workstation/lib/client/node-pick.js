"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_POOL_LABEL = exports.PUBLIC_POOL_VALUE = void 0;
exports.seqLabel = seqLabel;
exports.nodeChipLabel = nodeChipLabel;
exports.nodeChipWho = nodeChipWho;
exports.sortedNodes = sortedNodes;
exports.seatNodesOf = seatNodesOf;
exports.publishToast = publishToast;
exports.pickerHint = pickerHint;
exports.joinStateOf = joinStateOf;
exports.dotOf = dotOf;
exports.invitedLabel = invitedLabel;
exports.showInvited = showInvited;
exports.taskBindingText = taskBindingText;
exports.humanizePublishError = humanizePublishError;
exports.PUBLIC_POOL_VALUE = '';
exports.PUBLIC_POOL_LABEL = '不指定工位（谁都能领）';
function seqLabel(node) {
    return typeof node.seq === 'number' && Number.isFinite(node.seq) ? `#${node.seq}` : '';
}
function nodeChipLabel(node) {
    const seq = seqLabel(node);
    const name = (node.name ?? '').trim();
    return seq.length > 0 ? `${seq} ${name}` : name;
}
function nodeChipWho(node) {
    const holders = Array.isArray(node.holders) ? node.holders : [];
    const names = holders
        .map((h) => (h.name ?? '').trim())
        .filter((n) => n.length > 0);
    if (names.length > 0)
        return names.join('·');
    const invited = node.invited;
    if (invited !== null && invited !== undefined)
        return invitedLabel(invited);
    return '空';
}
function sortedNodes(nodes) {
    const withSeq = nodes.filter((n) => typeof n.seq === 'number' && Number.isFinite(n.seq));
    const rest = nodes.filter((n) => !(typeof n.seq === 'number' && Number.isFinite(n.seq)));
    withSeq.sort((a, b) => a.seq - b.seq);
    rest.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? '', 'zh-Hans-CN'));
    return [...withSeq, ...rest];
}
function seatNodesOf(nodes, childrenOf) {
    return nodes.filter((n) => childrenOf(n.node_id).length === 0);
}
function publishToast(nodeLabel, agentName) {
    const who = (agentName ?? '').trim();
    if (nodeLabel.length === 0) {
        return who.length > 0
            ? `✅ 已发布到公共池 · 指派给 ${who}`
            : '✅ 已发布到公共池 · 谁都能领';
    }
    return who.length > 0
        ? `✅ 已发布到「${nodeLabel}」· 指派给 ${who}`
        : `✅ 已发布到「${nodeLabel}」`;
}
function pickerHint(node) {
    const holders = Array.isArray(node.holders) ? node.holders : [];
    if (holders.length > 0) {
        const online = holders.filter((h) => h.online === true).length;
        return online > 0 ? `${nodeChipWho(node)}（在线）` : `${nodeChipWho(node)}（离线，能领活）`;
    }
    if (node.invited !== null && node.invited !== undefined)
        return invitedLabel(node.invited);
    return '空位（没人，发了暂时没人领）';
}
function joinStateOf(holder) {
    const s = (holder.joinState ?? '').trim();
    if (s === 'present' || s === 'joined' || s === 'invited')
        return s;
    return holder.online === true ? 'present' : 'joined';
}
function dotOf(state) {
    if (state === 'present')
        return { color: '#27ae60', hollow: false, title: '在岗（90 秒内有心跳）' };
    if (state === 'joined')
        return { color: '#bbb', hollow: false, title: '离线（人在，没收到心跳）' };
    return { color: '#bbb', hollow: true, title: '已受邀，还没来' };
}
function invitedLabel(invited) {
    const n = (invited.invitedName ?? '').trim();
    return n.length > 0 ? `已受邀：${n}` : '已受邀 · 等待接入';
}
function showInvited(holders, invited) {
    if (holders.length > 0)
        return false;
    return invited !== null && invited !== undefined;
}
function taskBindingText(nodeLabel, agentName) {
    const label = (nodeLabel ?? '').trim();
    const who = (agentName ?? '').trim();
    if (label.length === 0 && who.length === 0)
        return '公共池 · 谁都能领';
    if (label.length === 0)
        return `公共池 · 指派给 ${who}`;
    return who.length > 0 ? `${label} · 指派给 ${who}` : label;
}
function humanizePublishError(code, message) {
    switch (code) {
        case 'node_not_found':
            return '选的那个工位已经不在了（可能被改名或删掉），换个工位或选「谁都能领」';
        case 'agent_not_found':
            return '选的那个 Agent 已经不在这个铺子里了，换个目标或选「谁在岗谁领」';
        case 'project_not_found':
            return '选的项目已经不在了，换一个项目再发';
        default: {
            const m = (message ?? '').trim();
            return m.length > 0 ? m : '发布没成功，稍后再试一次';
        }
    }
}
//# sourceMappingURL=node-pick.js.map