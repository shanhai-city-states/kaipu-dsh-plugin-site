"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENDPOINTS = exports.CONNECTION_SERVICE = exports.REMOTE_CHANNEL = exports.REMOTE_NS = void 0;
exports.endpointOf = endpointOf;
exports.getConnection = getConnection;
exports.callKaipu = callKaipu;
exports.REMOTE_NS = 'kaipu-workstation';
exports.REMOTE_CHANNEL = '/api';
exports.CONNECTION_SERVICE = 'connection';
exports.ENDPOINTS = {
    status: 'status',
    deviceCred: 'deviceCred',
    state: 'state',
    orgTree: 'orgTree',
    orgNodeCreate: 'orgNodeCreate',
    orgNodePatch: 'orgNodePatch',
    orgNodeDelete: 'orgNodeDelete',
    tasksCreate: 'tasksCreate',
    tasksList: 'tasksList',
    tasksClaim: 'tasksClaim',
    tasksDone: 'tasksDone',
    projectsList: 'projectsList',
    projectsCreate: 'projectsCreate',
    projectsRename: 'projectsRename',
    projectArchive: 'projectArchive',
    projectUnarchive: 'projectUnarchive',
    projectArchiveDownload: 'projectArchiveDownload',
    projectAuditRequest: 'projectAuditRequest',
    auditGet: 'auditGet',
    tasksStart: 'tasksStart',
    tasksHeartbeat: 'tasksHeartbeat',
    tasksBlock: 'tasksBlock',
    tasksUnblock: 'tasksUnblock',
    tasksAssign: 'tasksAssign',
    tasksDeps: 'tasksDeps',
    tasksDepsList: 'tasksDepsList',
    tasksDepsDelete: 'tasksDepsDelete',
    projectPhaseSet: 'projectPhaseSet',
    projectSuggestPhase: 'projectSuggestPhase',
    projectSuggestionsList: 'projectSuggestionsList',
    projectDecidePhase: 'projectDecidePhase',
    deliverablesList: 'deliverablesList',
    deliverablePromote: 'deliverablePromote',
    tasksApprove: 'tasksApprove',
    tasksReject: 'tasksReject',
    tasksBoard: 'tasksBoard',
    tasksBlocked: 'tasksBlocked',
    tasksPendingApprovals: 'tasksPendingApprovals',
    whoami: 'whoami',
    packsList: 'packsList',
    packUpload: 'packUpload',
    packDownload: 'packDownload',
    packDelete: 'packDelete',
    packJournal: 'packJournal',
    rolesSeats: 'rolesSeats',
    grantList: 'grantList',
    grantCreate: 'grantCreate',
    grantGenerate: 'grantGenerate',
    grantRevoke: 'grantRevoke',
    grantEvents: 'grantEvents',
    inviteCreate: 'inviteCreate',
    deviceJoinCodeCreate: 'deviceJoinCodeCreate',
    joinRequests: 'joinRequests',
    joinRequestGet: 'joinRequestGet',
    joinRequestCreate: 'joinRequestCreate',
    joinRequestApprove: 'joinRequestApprove',
    joinRequestReject: 'joinRequestReject',
    devicesList: 'devicesList',
    deviceRevoke: 'deviceRevoke',
    deviceResetSecret: 'deviceResetSecret',
    deviceJoinCodes: 'deviceJoinCodes',
    deviceJoinCodeRevoke: 'deviceJoinCodeRevoke',
    deviceJoinCodeRenew: 'deviceJoinCodeRenew',
    deviceEvents: 'deviceEvents',
    contextGet: 'contextGet',
    contextPut: 'contextPut',
    tenantRegions: 'tenantRegions',
    tenantShops: 'tenantShops',
    tenantNameRename: 'tenantNameRename',
    shopOpen: 'shopOpen',
    shopSwitch: 'shopSwitch',
    tenantDoorAssign: 'tenantDoorAssign',
    orgClearAgents: 'orgClearAgents',
    seatEvict: 'seatEvict',
    agentResetConnection: 'agentResetConnection',
    notifications: 'notifications',
    notificationsRead: 'notificationsRead',
    pluginVersion: 'pluginVersion',
    packExport: 'packExport',
    packsInteractions: 'packsInteractions',
    packPurge: 'packPurge',
    packPurgeCancel: 'packPurgeCancel',
    packPurgeStatus: 'packPurgeStatus',
    crmCustomers: 'crmCustomers',
    crmCustomerCreate: 'crmCustomerCreate',
    crmCustomerUpdate: 'crmCustomerUpdate',
    crmCustomerArchive: 'crmCustomerArchive',
    crmFollowups: 'crmFollowups',
    crmFunnel: 'crmFunnel',
    crmGuard: 'crmGuard',
    crmGuardCheck: 'crmGuardCheck',
    startEventStream: 'startEventStream',
    pollEvents: 'pollEvents',
    stopEventStream: 'stopEventStream',
    notesHealth: 'notesHealth',
    notesStats: 'notesStats',
    notesList: 'notesList',
    notesCreate: 'notesCreate',
    notesUpdate: 'notesUpdate',
    notesToggle: 'notesToggle',
    notesDelete: 'notesDelete',
    skillsList: 'skillsList',
    skillsCatalog: 'skillsCatalog',
    creditsGet: 'creditsGet',
    creditsClaim: 'creditsClaim',
    creditsLedger: 'creditsLedger',
};
function endpointOf(method) {
    return `${exports.REMOTE_NS}/${method}`;
}
function getConnection(ctx) {
    let got;
    try {
        got = ctx.get?.(exports.CONNECTION_SERVICE);
    }
    catch {
        got = undefined;
    }
    if (got === undefined) {
        got = ctx[exports.CONNECTION_SERVICE];
    }
    if (got === null || typeof got !== 'object')
        return null;
    const conn = got;
    return typeof conn.rpc?.call === 'function' ? conn : null;
}
async function callKaipu(conn, method, query, signal) {
    const payload = { args: { query } };
    let raw;
    try {
        raw = await conn.rpc.call(exports.REMOTE_CHANNEL, endpointOf(method), payload, signal);
    }
    catch (e) {
        const detail = e instanceof Error ? e.message : String(e);
        if (/\b404\b/.test(detail)) {
            return { ok: false, error: { kind: 'gateway', code: 'not_found', detail } };
        }
        return { ok: false, error: { kind: 'unreachable', code: 'transport', detail } };
    }
    const gw = raw;
    if (gw === null || typeof gw !== 'object') {
        return { ok: false, error: { kind: 'gateway', code: 'bad_result', detail: '网关返回体为空' } };
    }
    if (gw.ok !== true) {
        const anyGw = gw;
        const gwMsg = anyGw.message ?? anyGw.error?.message ?? '';
        if (anyGw.success === false) {
            return { ok: false, error: { kind: 'gateway', code: 'not_found', detail: gwMsg || '端点不存在' } };
        }
        if (/路径不存在/.test(gwMsg)) {
            return { ok: false, error: { kind: 'gateway', code: 'not_found', detail: gwMsg } };
        }
        return {
            ok: false,
            error: {
                kind: 'gateway',
                code: gw.error?.code ?? 'gateway',
                detail: gw.error?.message ?? '网关调用失败',
            },
        };
    }
    const v = gw.value;
    if (v === null || typeof v !== 'object') {
        return { ok: false, error: { kind: 'gateway', code: 'empty_value', detail: 'host 方法没有返回值' } };
    }
    if (v.ok !== true) {
        const vErr = v.error;
        const vErrObj = vErr !== null && typeof vErr === 'object' ? vErr : null;
        const code0 = typeof v.code === 'string' ? v.code : typeof vErrObj?.code === 'string' ? vErrObj.code : 'unknown';
        const msg0 = typeof vErr === 'string'
            ? vErr
            : typeof vErrObj?.message === 'string'
                ? vErrObj.message
                : '服务端没有说明原因';
        return {
            ok: false,
            business: { code: code0, message: msg0 },
        };
    }
    return { ok: true, data: v.data };
}
//# sourceMappingURL=bridge.js.map