"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConnection = setConnection;
exports.hasConnection = hasConnection;
exports.getConnection = getConnection;
exports.loadWorkstationState = loadWorkstationState;
exports.loadOrgTree = loadOrgTree;
exports.createOrgNode = createOrgNode;
exports.resetAgentKey = resetAgentKey;
exports.evictSeat = evictSeat;
exports.loadNotifications = loadNotifications;
exports.markNotificationsRead = markNotificationsRead;
exports.checkPluginVersion = checkPluginVersion;
exports.exportPack = exportPack;
exports.loadPackInteractions = loadPackInteractions;
exports.purgePack = purgePack;
exports.cancelPurge = cancelPurge;
exports.purgeStatus = purgeStatus;
exports.clearAgents = clearAgents;
exports.renameOrgNode = renameOrgNode;
exports.deleteOrgNode = deleteOrgNode;
exports.loadTasks = loadTasks;
exports.createTask = createTask;
exports.loadProjects = loadProjects;
exports.createProject = createProject;
exports.renameProject = renameProject;
exports.setProjectPhase = setProjectPhase;
exports.suggestProjectPhase = suggestProjectPhase;
exports.loadPhaseSuggestions = loadPhaseSuggestions;
exports.decideProjectPhase = decideProjectPhase;
exports.loadTaskDeps = loadTaskDeps;
exports.addTaskDep = addTaskDep;
exports.removeTaskDep = removeTaskDep;
exports.loadDeliverables = loadDeliverables;
exports.promoteDeliverable = promoteDeliverable;
exports.unarchiveProject = unarchiveProject;
exports.downloadProjectArchive = downloadProjectArchive;
exports.archiveProject = archiveProject;
exports.claimTask = claimTask;
exports.finishTask = finishTask;
exports.seatText = seatText;
exports.inviteExpired = inviteExpired;
exports.splitMembers = splitMembers;
exports.summarizeSeats = summarizeSeats;
const bridge_js_1 = require("./bridge.js");
let connection = null;
function setConnection(conn) {
    connection = conn;
}
function hasConnection() {
    return connection !== null;
}
function getConnection() {
    return connection;
}
function offline(kind, label, reason) {
    return { kind, label, reason, state: null, server: null };
}
const MISSING_ENDPOINT_CODES = new Set(['not_found', 'endpoint_not_found', 'no_handler', 'unknown_endpoint']);
function looksLikeMissingEndpoint(err) {
    if (err.kind !== 'gateway')
        return false;
    if (MISSING_ENDPOINT_CODES.has(err.code))
        return true;
    if (/^(?:http_)?404$/.test(err.code))
        return true;
    const s = `${err.code} ${err.detail}`.toLowerCase();
    return (s.includes('not_found') ||
        s.includes('notfound') ||
        s.includes('no_handler') ||
        s.includes('no handler') ||
        s.includes('unknown_endpoint') ||
        s.includes('unknown endpoint') ||
        s.includes('endpoint_not_found') ||
        s.includes('路径不存在'));
}
async function loadWorkstationState(signal) {
    if (connection === null) {
        return offline('no_channel', '通道不可用', '没取到宿主的数据通道。这是环境问题，不是服务端故障。');
    }
    const r = await (0, bridge_js_1.callKaipu)(connection, 'state', {}, signal);
    if (r.ok !== true) {
        if (!('business' in r) && looksLikeMissingEndpoint(r.error)) {
            const ownBug = /\/api\//.test(r.error.detail) || /路径不存在/.test(r.error.detail);
            return offline('stale', '工位数据读不到', ownBug
                ? '接入地址不对 —— 数据通道未被正确寻址（路径里混入了内部通道段），请核对接入地址配置。'
                : '数据通道未就绪 —— 工位数据由本插件 host half 提供，它可能未加载成功。');
        }
        return offline('unreachable', '未连上', 'business' in r ? r.business.message : r.error.detail);
    }
    const st = r.data;
    return {
        kind: st.source,
        label: st.source === 'scaffold' ? '本地持久化态' : '已接入',
        reason: null,
        state: st,
        server: { baseUrl: '', accountId: st.accountId },
    };
}
function orgError(r) {
    if ('business' in r && r.business) {
        return { ok: false, code: r.business.code, message: r.business.message };
    }
    const detail = r.error?.detail ?? '未知错误';
    return { ok: false, code: r.error?.code ?? 'unknown', message: detail };
}
async function loadOrgTree(signal) {
    if (connection === null) {
        return { ok: false, code: 'no_channel', message: '没有数据通道 —— 工位 host 未加载。' };
    }
    const r = await (0, bridge_js_1.callKaipu)(connection, 'orgTree', {}, signal);
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function createOrgNode(name, parentNodeId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const query = { name };
    if (parentNodeId)
        query.parentNodeId = parentNodeId;
    const r = await (0, bridge_js_1.callKaipu)(connection, 'orgNodeCreate', query);
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function resetAgentKey(agentId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'agentResetConnection', { agentId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function evictSeat(seat, agentId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'seatEvict', agentId !== undefined && agentId !== '' ? { seat, agentId } : { seat });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function loadNotifications() {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'notifications', {});
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function markNotificationsRead() {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'notificationsRead', {});
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function checkPluginVersion(current) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'pluginVersion', { current });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function exportPack(interactionId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'packExport', { interactionId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function loadPackInteractions() {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'packsInteractions', {});
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function purgePack(interactionId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'packPurge', { interactionId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function cancelPurge(interactionId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'packPurgeCancel', { interactionId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function purgeStatus(interactionId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'packPurgeStatus', { interactionId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function clearAgents() {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'orgClearAgents', { confirm: 'CLEAR' });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function renameOrgNode(nodeId, name) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'orgNodePatch', { nodeId, name });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function deleteOrgNode(nodeId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'orgNodeDelete', { nodeId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function loadTasks(all, page) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const query = all ? { all: true } : {};
    if (page?.limit !== undefined)
        query.limit = page.limit;
    if (page?.offset !== undefined && page.offset > 0)
        query.offset = page.offset;
    const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksList', query);
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function createTask(title, detail, projectId, interactionId, kind, notifyAgent, nodeId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const query = { title, detail };
    if (typeof projectId === 'string' && projectId.length > 0)
        query.projectId = projectId;
    if (typeof interactionId === 'string' && interactionId.length > 0)
        query.interactionId = interactionId;
    if (typeof kind === 'string' && kind.length > 0)
        query.kind = kind;
    if (typeof notifyAgent === 'string' && notifyAgent.length > 0)
        query.notifyAgent = notifyAgent;
    if (typeof nodeId === 'string' && nodeId.length > 0)
        query.nodeId = nodeId;
    const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksCreate', query);
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function loadProjects() {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'projectsList', {});
    if (r.ok === true)
        return { ok: true, data: { projects: Array.isArray(r.data?.projects) ? r.data.projects : [] } };
    return orgError(r);
}
async function createProject(name) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'projectsCreate', { name });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function renameProject(projectId, name) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'projectsRename', { projectId, name });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function setProjectPhase(projectId, phase) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'projectPhaseSet', { projectId, phase });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function suggestProjectPhase(projectId, toPhase, reason, expectedVersion) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'projectSuggestPhase', {
        projectId, toPhase, reason, expectedVersion,
        idempotencyKey: 'ui-' + Date.now().toString(36) + '-' +
            Math.random().toString(36).slice(2, 8),
    });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function loadPhaseSuggestions(projectId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'projectSuggestionsList', { projectId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function decideProjectPhase(projectId, suggestionId, verdict, reasonCode = '', reasonText = '') {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'projectDecidePhase', { projectId, suggestionId, verdict, reasonCode, reasonText });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function loadTaskDeps(taskId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksDepsList', { taskId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function addTaskDep(taskId, dependsOnTaskId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksDeps', { taskId, dependsOnTaskId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function removeTaskDep(taskId, dependsOnTaskId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksDepsDelete', { taskId, dependsOnTaskId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function loadDeliverables(taskId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'deliverablesList', { taskId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function promoteDeliverable(taskId, deliverableId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'deliverablePromote', { taskId, deliverableId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function unarchiveProject(projectId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'projectUnarchive', { projectId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function downloadProjectArchive(projectId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'projectArchiveDownload', { projectId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function archiveProject(projectId, force = false) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'projectArchive', { projectId, force });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function claimTask(taskId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksClaim', { taskId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
async function finishTask(taskId, result) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: '没有数据通道。' };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksDone', { taskId, result });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return orgError(r);
}
function seatText(seat) {
    if (seat.status === 'vacant')
        return '空位 · 可邀请';
    return seat.presence === 'away' ? '离座 · 留痕在' : '在场';
}
function inviteExpired(invite, now) {
    if (invite.used)
        return false;
    return new Date(invite.expiresAt).getTime() <= new Date(now).getTime();
}
function splitMembers(state) {
    const humans = [];
    const agents = [];
    for (const m of state.members) {
        if (m.kind === 'agent')
            agents.push(m);
        else
            humans.push(m);
    }
    return { humans, agents };
}
function summarizeSeats(state) {
    let occupied = 0;
    let vacant = 0;
    let awayButActive = 0;
    let removed = 0;
    for (const s of state.seats) {
        if (!s.membershipActive) {
            removed++;
            continue;
        }
        if (s.status === 'vacant') {
            vacant++;
            continue;
        }
        occupied++;
        if (s.presence === 'away')
            awayButActive++;
    }
    return { occupied, vacant, awayButActive, removed };
}
//# sourceMappingURL=live.js.map