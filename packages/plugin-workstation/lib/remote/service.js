var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import * as dshProtocol from '@deepseek-ai/dsh-typert-protocol';
import { checkedWorkstationState, summarizeSeats } from './workstation-state.js';
import { KaipuHttpClient, KaipuHttpError, readAnyDeviceCred } from './kai-pu-http.js';
export const REMOTE_NS = 'kaipu-workstation';
function listRemoteMethods(service) {
    const fn = dshProtocol.remoteMethods;
    return typeof fn === 'function' ? fn(service) : [];
}
export function installErrorBoundary(target) {
    const holder = target;
    for (const marker of listRemoteMethods(target)) {
        const name = marker.method;
        const orig = holder[name];
        if (typeof orig !== 'function')
            continue;
        const callOriginal = orig;
        holder[name] = async (...args) => {
            try {
                return await callOriginal.apply(target, args);
            }
            catch (e) {
                if (e instanceof KaipuHttpError) {
                    const kind = e.status >= 400 && e.status < 500 ? 'denied' : 'error';
                    return { ok: false, kind, error: e.message, code: e.code };
                }
                throw e;
            }
        };
    }
}
let WorkstationRemoteService = (() => {
    let _classSuper = TypertRemoteService;
    let _instanceExtraInitializers = [];
    let _status_decorators;
    let _deviceCred_decorators;
    let _state_decorators;
    let _orgTree_decorators;
    let _orgNodeCreate_decorators;
    let _orgNodePatch_decorators;
    let _orgNodeDelete_decorators;
    let _tasksCreate_decorators;
    let _tasksList_decorators;
    let _tasksClaim_decorators;
    let _projectsList_decorators;
    let _projectsCreate_decorators;
    let _projectsRename_decorators;
    let _projectPhaseSet_decorators;
    let _projectSuggestPhase_decorators;
    let _projectSuggestionsList_decorators;
    let _projectDecidePhase_decorators;
    let _tasksDepsList_decorators;
    let _tasksDepsDelete_decorators;
    let _deliverablesList_decorators;
    let _deliverablePromote_decorators;
    let _projectUnarchive_decorators;
    let _projectArchiveDownload_decorators;
    let _projectArchive_decorators;
    let _tasksDone_decorators;
    let _tasksStart_decorators;
    let _tasksHeartbeat_decorators;
    let _tasksBlock_decorators;
    let _projectAuditRequest_decorators;
    let _auditGet_decorators;
    let _tasksUnblock_decorators;
    let _tasksAssign_decorators;
    let _tasksDeps_decorators;
    let _tasksApprove_decorators;
    let _tasksReject_decorators;
    let _tasksBoard_decorators;
    let _tasksBlocked_decorators;
    let _tasksPendingApprovals_decorators;
    let _whoami_decorators;
    let _packsList_decorators;
    let _packUpload_decorators;
    let _notifications_decorators;
    let _notificationsRead_decorators;
    let _pluginVersion_decorators;
    let _packsInteractions_decorators;
    let _packExport_decorators;
    let _packPurge_decorators;
    let _packPurgeCancel_decorators;
    let _packPurgeStatus_decorators;
    let _crmCustomers_decorators;
    let _crmCustomerCreate_decorators;
    let _crmCustomerUpdate_decorators;
    let _crmCustomerArchive_decorators;
    let _crmFollowups_decorators;
    let _crmFunnel_decorators;
    let _crmGuard_decorators;
    let _crmGuardCheck_decorators;
    let _notesHealth_decorators;
    let _notesStats_decorators;
    let _skillsList_decorators;
    let _skillsCatalog_decorators;
    let _creditsGet_decorators;
    let _creditsLedger_decorators;
    let _creditsClaim_decorators;
    let _notesList_decorators;
    let _notesCreate_decorators;
    let _notesUpdate_decorators;
    let _notesToggle_decorators;
    let _notesDelete_decorators;
    let _packDownload_decorators;
    let _packDelete_decorators;
    let _rolesSeats_decorators;
    let _grantList_decorators;
    let _grantCreate_decorators;
    let _grantGenerate_decorators;
    let _grantRevoke_decorators;
    let _grantEvents_decorators;
    let _contextGet_decorators;
    let _contextPut_decorators;
    let _tenantRegions_decorators;
    let _tenantShops_decorators;
    let _tenantNameRename_decorators;
    let _shopOpen_decorators;
    let _shopSwitch_decorators;
    let _tenantDoorAssign_decorators;
    let _agentResetConnection_decorators;
    let _seatEvict_decorators;
    let _orgClearAgents_decorators;
    let _deviceResetSecret_decorators;
    let _deviceJoinCodeCreate_decorators;
    let _deviceJoinCodes_decorators;
    let _deviceJoinCodeRevoke_decorators;
    let _deviceJoinCodeRenew_decorators;
    let _joinRequests_decorators;
    let _joinRequestGet_decorators;
    let _joinRequestCreate_decorators;
    let _joinRequestApprove_decorators;
    let _joinRequestReject_decorators;
    let _devicesList_decorators;
    let _deviceRevoke_decorators;
    let _deviceEvents_decorators;
    let _inviteCreate_decorators;
    let _packJournal_decorators;
    let _startEventStream_decorators;
    let _pollEvents_decorators;
    let _stopEventStream_decorators;
    return class WorkstationRemoteService extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _status_decorators = [Remote('status')];
            _deviceCred_decorators = [Remote('deviceCred')];
            _state_decorators = [Remote('state')];
            _orgTree_decorators = [Remote('orgTree')];
            _orgNodeCreate_decorators = [Remote('orgNodeCreate')];
            _orgNodePatch_decorators = [Remote('orgNodePatch')];
            _orgNodeDelete_decorators = [Remote('orgNodeDelete')];
            _tasksCreate_decorators = [Remote('tasksCreate')];
            _tasksList_decorators = [Remote('tasksList')];
            _tasksClaim_decorators = [Remote('tasksClaim')];
            _projectsList_decorators = [Remote('projectsList')];
            _projectsCreate_decorators = [Remote('projectsCreate')];
            _projectsRename_decorators = [Remote('projectsRename')];
            _projectPhaseSet_decorators = [Remote('projectPhaseSet')];
            _projectSuggestPhase_decorators = [Remote('projectSuggestPhase')];
            _projectSuggestionsList_decorators = [Remote('projectSuggestionsList')];
            _projectDecidePhase_decorators = [Remote('projectDecidePhase')];
            _tasksDepsList_decorators = [Remote('tasksDepsList')];
            _tasksDepsDelete_decorators = [Remote('tasksDepsDelete')];
            _deliverablesList_decorators = [Remote('deliverablesList')];
            _deliverablePromote_decorators = [Remote('deliverablePromote')];
            _projectUnarchive_decorators = [Remote('projectUnarchive')];
            _projectArchiveDownload_decorators = [Remote('projectArchiveDownload')];
            _projectArchive_decorators = [Remote('projectArchive')];
            _tasksDone_decorators = [Remote('tasksDone')];
            _tasksStart_decorators = [Remote('tasksStart')];
            _tasksHeartbeat_decorators = [Remote('tasksHeartbeat')];
            _tasksBlock_decorators = [Remote('tasksBlock')];
            _projectAuditRequest_decorators = [Remote('projectAuditRequest')];
            _auditGet_decorators = [Remote('auditGet')];
            _tasksUnblock_decorators = [Remote('tasksUnblock')];
            _tasksAssign_decorators = [Remote('tasksAssign')];
            _tasksDeps_decorators = [Remote('tasksDeps')];
            _tasksApprove_decorators = [Remote('tasksApprove')];
            _tasksReject_decorators = [Remote('tasksReject')];
            _tasksBoard_decorators = [Remote('tasksBoard')];
            _tasksBlocked_decorators = [Remote('tasksBlocked')];
            _tasksPendingApprovals_decorators = [Remote('tasksPendingApprovals')];
            _whoami_decorators = [Remote('whoami')];
            _packsList_decorators = [Remote('packsList')];
            _packUpload_decorators = [Remote('packUpload')];
            _notifications_decorators = [Remote('notifications')];
            _notificationsRead_decorators = [Remote('notificationsRead')];
            _pluginVersion_decorators = [Remote('pluginVersion')];
            _packsInteractions_decorators = [Remote('packsInteractions')];
            _packExport_decorators = [Remote('packExport')];
            _packPurge_decorators = [Remote('packPurge')];
            _packPurgeCancel_decorators = [Remote('packPurgeCancel')];
            _packPurgeStatus_decorators = [Remote('packPurgeStatus')];
            _crmCustomers_decorators = [Remote('crmCustomers')];
            _crmCustomerCreate_decorators = [Remote('crmCustomerCreate')];
            _crmCustomerUpdate_decorators = [Remote('crmCustomerUpdate')];
            _crmCustomerArchive_decorators = [Remote('crmCustomerArchive')];
            _crmFollowups_decorators = [Remote('crmFollowups')];
            _crmFunnel_decorators = [Remote('crmFunnel')];
            _crmGuard_decorators = [Remote('crmGuard')];
            _crmGuardCheck_decorators = [Remote('crmGuardCheck')];
            _notesHealth_decorators = [Remote('notesHealth')];
            _notesStats_decorators = [Remote('notesStats')];
            _skillsList_decorators = [Remote('skillsList')];
            _skillsCatalog_decorators = [Remote('skillsCatalog')];
            _creditsGet_decorators = [Remote('creditsGet')];
            _creditsLedger_decorators = [Remote('creditsLedger')];
            _creditsClaim_decorators = [Remote('creditsClaim')];
            _notesList_decorators = [Remote('notesList')];
            _notesCreate_decorators = [Remote('notesCreate')];
            _notesUpdate_decorators = [Remote('notesUpdate')];
            _notesToggle_decorators = [Remote('notesToggle')];
            _notesDelete_decorators = [Remote('notesDelete')];
            _packDownload_decorators = [Remote('packDownload')];
            _packDelete_decorators = [Remote('packDelete')];
            _rolesSeats_decorators = [Remote('rolesSeats')];
            _grantList_decorators = [Remote('grantList')];
            _grantCreate_decorators = [Remote('grantCreate')];
            _grantGenerate_decorators = [Remote('grantGenerate')];
            _grantRevoke_decorators = [Remote('grantRevoke')];
            _grantEvents_decorators = [Remote('grantEvents')];
            _contextGet_decorators = [Remote('contextGet')];
            _contextPut_decorators = [Remote('contextPut')];
            _tenantRegions_decorators = [Remote('tenantRegions')];
            _tenantShops_decorators = [Remote('tenantShops')];
            _tenantNameRename_decorators = [Remote('tenantNameRename')];
            _shopOpen_decorators = [Remote('shopOpen')];
            _shopSwitch_decorators = [Remote('shopSwitch')];
            _tenantDoorAssign_decorators = [Remote('tenantDoorAssign')];
            _agentResetConnection_decorators = [Remote('agentResetConnection')];
            _seatEvict_decorators = [Remote('seatEvict')];
            _orgClearAgents_decorators = [Remote('orgClearAgents')];
            _deviceResetSecret_decorators = [Remote('deviceResetSecret')];
            _deviceJoinCodeCreate_decorators = [Remote('deviceJoinCodeCreate')];
            _deviceJoinCodes_decorators = [Remote('deviceJoinCodes')];
            _deviceJoinCodeRevoke_decorators = [Remote('deviceJoinCodeRevoke')];
            _deviceJoinCodeRenew_decorators = [Remote('deviceJoinCodeRenew')];
            _joinRequests_decorators = [Remote('joinRequests')];
            _joinRequestGet_decorators = [Remote('joinRequestGet')];
            _joinRequestCreate_decorators = [Remote('joinRequestCreate')];
            _joinRequestApprove_decorators = [Remote('joinRequestApprove')];
            _joinRequestReject_decorators = [Remote('joinRequestReject')];
            _devicesList_decorators = [Remote('devicesList')];
            _deviceRevoke_decorators = [Remote('deviceRevoke')];
            _deviceEvents_decorators = [Remote('deviceEvents')];
            _inviteCreate_decorators = [Remote('inviteCreate')];
            _packJournal_decorators = [Remote('packJournal')];
            _startEventStream_decorators = [Remote('startEventStream')];
            _pollEvents_decorators = [Remote('pollEvents')];
            _stopEventStream_decorators = [Remote('stopEventStream')];
            __esDecorate(this, null, _status_decorators, { kind: "method", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deviceCred_decorators, { kind: "method", name: "deviceCred", static: false, private: false, access: { has: obj => "deviceCred" in obj, get: obj => obj.deviceCred }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _state_decorators, { kind: "method", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _orgTree_decorators, { kind: "method", name: "orgTree", static: false, private: false, access: { has: obj => "orgTree" in obj, get: obj => obj.orgTree }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _orgNodeCreate_decorators, { kind: "method", name: "orgNodeCreate", static: false, private: false, access: { has: obj => "orgNodeCreate" in obj, get: obj => obj.orgNodeCreate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _orgNodePatch_decorators, { kind: "method", name: "orgNodePatch", static: false, private: false, access: { has: obj => "orgNodePatch" in obj, get: obj => obj.orgNodePatch }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _orgNodeDelete_decorators, { kind: "method", name: "orgNodeDelete", static: false, private: false, access: { has: obj => "orgNodeDelete" in obj, get: obj => obj.orgNodeDelete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksCreate_decorators, { kind: "method", name: "tasksCreate", static: false, private: false, access: { has: obj => "tasksCreate" in obj, get: obj => obj.tasksCreate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksList_decorators, { kind: "method", name: "tasksList", static: false, private: false, access: { has: obj => "tasksList" in obj, get: obj => obj.tasksList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksClaim_decorators, { kind: "method", name: "tasksClaim", static: false, private: false, access: { has: obj => "tasksClaim" in obj, get: obj => obj.tasksClaim }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _projectsList_decorators, { kind: "method", name: "projectsList", static: false, private: false, access: { has: obj => "projectsList" in obj, get: obj => obj.projectsList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _projectsCreate_decorators, { kind: "method", name: "projectsCreate", static: false, private: false, access: { has: obj => "projectsCreate" in obj, get: obj => obj.projectsCreate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _projectsRename_decorators, { kind: "method", name: "projectsRename", static: false, private: false, access: { has: obj => "projectsRename" in obj, get: obj => obj.projectsRename }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _projectPhaseSet_decorators, { kind: "method", name: "projectPhaseSet", static: false, private: false, access: { has: obj => "projectPhaseSet" in obj, get: obj => obj.projectPhaseSet }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _projectSuggestPhase_decorators, { kind: "method", name: "projectSuggestPhase", static: false, private: false, access: { has: obj => "projectSuggestPhase" in obj, get: obj => obj.projectSuggestPhase }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _projectSuggestionsList_decorators, { kind: "method", name: "projectSuggestionsList", static: false, private: false, access: { has: obj => "projectSuggestionsList" in obj, get: obj => obj.projectSuggestionsList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _projectDecidePhase_decorators, { kind: "method", name: "projectDecidePhase", static: false, private: false, access: { has: obj => "projectDecidePhase" in obj, get: obj => obj.projectDecidePhase }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksDepsList_decorators, { kind: "method", name: "tasksDepsList", static: false, private: false, access: { has: obj => "tasksDepsList" in obj, get: obj => obj.tasksDepsList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksDepsDelete_decorators, { kind: "method", name: "tasksDepsDelete", static: false, private: false, access: { has: obj => "tasksDepsDelete" in obj, get: obj => obj.tasksDepsDelete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deliverablesList_decorators, { kind: "method", name: "deliverablesList", static: false, private: false, access: { has: obj => "deliverablesList" in obj, get: obj => obj.deliverablesList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deliverablePromote_decorators, { kind: "method", name: "deliverablePromote", static: false, private: false, access: { has: obj => "deliverablePromote" in obj, get: obj => obj.deliverablePromote }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _projectUnarchive_decorators, { kind: "method", name: "projectUnarchive", static: false, private: false, access: { has: obj => "projectUnarchive" in obj, get: obj => obj.projectUnarchive }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _projectArchiveDownload_decorators, { kind: "method", name: "projectArchiveDownload", static: false, private: false, access: { has: obj => "projectArchiveDownload" in obj, get: obj => obj.projectArchiveDownload }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _projectArchive_decorators, { kind: "method", name: "projectArchive", static: false, private: false, access: { has: obj => "projectArchive" in obj, get: obj => obj.projectArchive }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksDone_decorators, { kind: "method", name: "tasksDone", static: false, private: false, access: { has: obj => "tasksDone" in obj, get: obj => obj.tasksDone }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksStart_decorators, { kind: "method", name: "tasksStart", static: false, private: false, access: { has: obj => "tasksStart" in obj, get: obj => obj.tasksStart }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksHeartbeat_decorators, { kind: "method", name: "tasksHeartbeat", static: false, private: false, access: { has: obj => "tasksHeartbeat" in obj, get: obj => obj.tasksHeartbeat }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksBlock_decorators, { kind: "method", name: "tasksBlock", static: false, private: false, access: { has: obj => "tasksBlock" in obj, get: obj => obj.tasksBlock }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _projectAuditRequest_decorators, { kind: "method", name: "projectAuditRequest", static: false, private: false, access: { has: obj => "projectAuditRequest" in obj, get: obj => obj.projectAuditRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _auditGet_decorators, { kind: "method", name: "auditGet", static: false, private: false, access: { has: obj => "auditGet" in obj, get: obj => obj.auditGet }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksUnblock_decorators, { kind: "method", name: "tasksUnblock", static: false, private: false, access: { has: obj => "tasksUnblock" in obj, get: obj => obj.tasksUnblock }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksAssign_decorators, { kind: "method", name: "tasksAssign", static: false, private: false, access: { has: obj => "tasksAssign" in obj, get: obj => obj.tasksAssign }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksDeps_decorators, { kind: "method", name: "tasksDeps", static: false, private: false, access: { has: obj => "tasksDeps" in obj, get: obj => obj.tasksDeps }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksApprove_decorators, { kind: "method", name: "tasksApprove", static: false, private: false, access: { has: obj => "tasksApprove" in obj, get: obj => obj.tasksApprove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksReject_decorators, { kind: "method", name: "tasksReject", static: false, private: false, access: { has: obj => "tasksReject" in obj, get: obj => obj.tasksReject }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksBoard_decorators, { kind: "method", name: "tasksBoard", static: false, private: false, access: { has: obj => "tasksBoard" in obj, get: obj => obj.tasksBoard }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksBlocked_decorators, { kind: "method", name: "tasksBlocked", static: false, private: false, access: { has: obj => "tasksBlocked" in obj, get: obj => obj.tasksBlocked }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tasksPendingApprovals_decorators, { kind: "method", name: "tasksPendingApprovals", static: false, private: false, access: { has: obj => "tasksPendingApprovals" in obj, get: obj => obj.tasksPendingApprovals }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _whoami_decorators, { kind: "method", name: "whoami", static: false, private: false, access: { has: obj => "whoami" in obj, get: obj => obj.whoami }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _packsList_decorators, { kind: "method", name: "packsList", static: false, private: false, access: { has: obj => "packsList" in obj, get: obj => obj.packsList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _packUpload_decorators, { kind: "method", name: "packUpload", static: false, private: false, access: { has: obj => "packUpload" in obj, get: obj => obj.packUpload }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _notifications_decorators, { kind: "method", name: "notifications", static: false, private: false, access: { has: obj => "notifications" in obj, get: obj => obj.notifications }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _notificationsRead_decorators, { kind: "method", name: "notificationsRead", static: false, private: false, access: { has: obj => "notificationsRead" in obj, get: obj => obj.notificationsRead }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _pluginVersion_decorators, { kind: "method", name: "pluginVersion", static: false, private: false, access: { has: obj => "pluginVersion" in obj, get: obj => obj.pluginVersion }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _packsInteractions_decorators, { kind: "method", name: "packsInteractions", static: false, private: false, access: { has: obj => "packsInteractions" in obj, get: obj => obj.packsInteractions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _packExport_decorators, { kind: "method", name: "packExport", static: false, private: false, access: { has: obj => "packExport" in obj, get: obj => obj.packExport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _packPurge_decorators, { kind: "method", name: "packPurge", static: false, private: false, access: { has: obj => "packPurge" in obj, get: obj => obj.packPurge }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _packPurgeCancel_decorators, { kind: "method", name: "packPurgeCancel", static: false, private: false, access: { has: obj => "packPurgeCancel" in obj, get: obj => obj.packPurgeCancel }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _packPurgeStatus_decorators, { kind: "method", name: "packPurgeStatus", static: false, private: false, access: { has: obj => "packPurgeStatus" in obj, get: obj => obj.packPurgeStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _crmCustomers_decorators, { kind: "method", name: "crmCustomers", static: false, private: false, access: { has: obj => "crmCustomers" in obj, get: obj => obj.crmCustomers }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _crmCustomerCreate_decorators, { kind: "method", name: "crmCustomerCreate", static: false, private: false, access: { has: obj => "crmCustomerCreate" in obj, get: obj => obj.crmCustomerCreate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _crmCustomerUpdate_decorators, { kind: "method", name: "crmCustomerUpdate", static: false, private: false, access: { has: obj => "crmCustomerUpdate" in obj, get: obj => obj.crmCustomerUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _crmCustomerArchive_decorators, { kind: "method", name: "crmCustomerArchive", static: false, private: false, access: { has: obj => "crmCustomerArchive" in obj, get: obj => obj.crmCustomerArchive }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _crmFollowups_decorators, { kind: "method", name: "crmFollowups", static: false, private: false, access: { has: obj => "crmFollowups" in obj, get: obj => obj.crmFollowups }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _crmFunnel_decorators, { kind: "method", name: "crmFunnel", static: false, private: false, access: { has: obj => "crmFunnel" in obj, get: obj => obj.crmFunnel }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _crmGuard_decorators, { kind: "method", name: "crmGuard", static: false, private: false, access: { has: obj => "crmGuard" in obj, get: obj => obj.crmGuard }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _crmGuardCheck_decorators, { kind: "method", name: "crmGuardCheck", static: false, private: false, access: { has: obj => "crmGuardCheck" in obj, get: obj => obj.crmGuardCheck }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _notesHealth_decorators, { kind: "method", name: "notesHealth", static: false, private: false, access: { has: obj => "notesHealth" in obj, get: obj => obj.notesHealth }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _notesStats_decorators, { kind: "method", name: "notesStats", static: false, private: false, access: { has: obj => "notesStats" in obj, get: obj => obj.notesStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _skillsList_decorators, { kind: "method", name: "skillsList", static: false, private: false, access: { has: obj => "skillsList" in obj, get: obj => obj.skillsList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _skillsCatalog_decorators, { kind: "method", name: "skillsCatalog", static: false, private: false, access: { has: obj => "skillsCatalog" in obj, get: obj => obj.skillsCatalog }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _creditsGet_decorators, { kind: "method", name: "creditsGet", static: false, private: false, access: { has: obj => "creditsGet" in obj, get: obj => obj.creditsGet }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _creditsLedger_decorators, { kind: "method", name: "creditsLedger", static: false, private: false, access: { has: obj => "creditsLedger" in obj, get: obj => obj.creditsLedger }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _creditsClaim_decorators, { kind: "method", name: "creditsClaim", static: false, private: false, access: { has: obj => "creditsClaim" in obj, get: obj => obj.creditsClaim }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _notesList_decorators, { kind: "method", name: "notesList", static: false, private: false, access: { has: obj => "notesList" in obj, get: obj => obj.notesList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _notesCreate_decorators, { kind: "method", name: "notesCreate", static: false, private: false, access: { has: obj => "notesCreate" in obj, get: obj => obj.notesCreate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _notesUpdate_decorators, { kind: "method", name: "notesUpdate", static: false, private: false, access: { has: obj => "notesUpdate" in obj, get: obj => obj.notesUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _notesToggle_decorators, { kind: "method", name: "notesToggle", static: false, private: false, access: { has: obj => "notesToggle" in obj, get: obj => obj.notesToggle }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _notesDelete_decorators, { kind: "method", name: "notesDelete", static: false, private: false, access: { has: obj => "notesDelete" in obj, get: obj => obj.notesDelete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _packDownload_decorators, { kind: "method", name: "packDownload", static: false, private: false, access: { has: obj => "packDownload" in obj, get: obj => obj.packDownload }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _packDelete_decorators, { kind: "method", name: "packDelete", static: false, private: false, access: { has: obj => "packDelete" in obj, get: obj => obj.packDelete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _rolesSeats_decorators, { kind: "method", name: "rolesSeats", static: false, private: false, access: { has: obj => "rolesSeats" in obj, get: obj => obj.rolesSeats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _grantList_decorators, { kind: "method", name: "grantList", static: false, private: false, access: { has: obj => "grantList" in obj, get: obj => obj.grantList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _grantCreate_decorators, { kind: "method", name: "grantCreate", static: false, private: false, access: { has: obj => "grantCreate" in obj, get: obj => obj.grantCreate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _grantGenerate_decorators, { kind: "method", name: "grantGenerate", static: false, private: false, access: { has: obj => "grantGenerate" in obj, get: obj => obj.grantGenerate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _grantRevoke_decorators, { kind: "method", name: "grantRevoke", static: false, private: false, access: { has: obj => "grantRevoke" in obj, get: obj => obj.grantRevoke }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _grantEvents_decorators, { kind: "method", name: "grantEvents", static: false, private: false, access: { has: obj => "grantEvents" in obj, get: obj => obj.grantEvents }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _contextGet_decorators, { kind: "method", name: "contextGet", static: false, private: false, access: { has: obj => "contextGet" in obj, get: obj => obj.contextGet }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _contextPut_decorators, { kind: "method", name: "contextPut", static: false, private: false, access: { has: obj => "contextPut" in obj, get: obj => obj.contextPut }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tenantRegions_decorators, { kind: "method", name: "tenantRegions", static: false, private: false, access: { has: obj => "tenantRegions" in obj, get: obj => obj.tenantRegions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tenantShops_decorators, { kind: "method", name: "tenantShops", static: false, private: false, access: { has: obj => "tenantShops" in obj, get: obj => obj.tenantShops }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tenantNameRename_decorators, { kind: "method", name: "tenantNameRename", static: false, private: false, access: { has: obj => "tenantNameRename" in obj, get: obj => obj.tenantNameRename }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _shopOpen_decorators, { kind: "method", name: "shopOpen", static: false, private: false, access: { has: obj => "shopOpen" in obj, get: obj => obj.shopOpen }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _shopSwitch_decorators, { kind: "method", name: "shopSwitch", static: false, private: false, access: { has: obj => "shopSwitch" in obj, get: obj => obj.shopSwitch }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tenantDoorAssign_decorators, { kind: "method", name: "tenantDoorAssign", static: false, private: false, access: { has: obj => "tenantDoorAssign" in obj, get: obj => obj.tenantDoorAssign }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _agentResetConnection_decorators, { kind: "method", name: "agentResetConnection", static: false, private: false, access: { has: obj => "agentResetConnection" in obj, get: obj => obj.agentResetConnection }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _seatEvict_decorators, { kind: "method", name: "seatEvict", static: false, private: false, access: { has: obj => "seatEvict" in obj, get: obj => obj.seatEvict }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _orgClearAgents_decorators, { kind: "method", name: "orgClearAgents", static: false, private: false, access: { has: obj => "orgClearAgents" in obj, get: obj => obj.orgClearAgents }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deviceResetSecret_decorators, { kind: "method", name: "deviceResetSecret", static: false, private: false, access: { has: obj => "deviceResetSecret" in obj, get: obj => obj.deviceResetSecret }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deviceJoinCodeCreate_decorators, { kind: "method", name: "deviceJoinCodeCreate", static: false, private: false, access: { has: obj => "deviceJoinCodeCreate" in obj, get: obj => obj.deviceJoinCodeCreate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deviceJoinCodes_decorators, { kind: "method", name: "deviceJoinCodes", static: false, private: false, access: { has: obj => "deviceJoinCodes" in obj, get: obj => obj.deviceJoinCodes }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deviceJoinCodeRevoke_decorators, { kind: "method", name: "deviceJoinCodeRevoke", static: false, private: false, access: { has: obj => "deviceJoinCodeRevoke" in obj, get: obj => obj.deviceJoinCodeRevoke }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deviceJoinCodeRenew_decorators, { kind: "method", name: "deviceJoinCodeRenew", static: false, private: false, access: { has: obj => "deviceJoinCodeRenew" in obj, get: obj => obj.deviceJoinCodeRenew }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _joinRequests_decorators, { kind: "method", name: "joinRequests", static: false, private: false, access: { has: obj => "joinRequests" in obj, get: obj => obj.joinRequests }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _joinRequestGet_decorators, { kind: "method", name: "joinRequestGet", static: false, private: false, access: { has: obj => "joinRequestGet" in obj, get: obj => obj.joinRequestGet }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _joinRequestCreate_decorators, { kind: "method", name: "joinRequestCreate", static: false, private: false, access: { has: obj => "joinRequestCreate" in obj, get: obj => obj.joinRequestCreate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _joinRequestApprove_decorators, { kind: "method", name: "joinRequestApprove", static: false, private: false, access: { has: obj => "joinRequestApprove" in obj, get: obj => obj.joinRequestApprove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _joinRequestReject_decorators, { kind: "method", name: "joinRequestReject", static: false, private: false, access: { has: obj => "joinRequestReject" in obj, get: obj => obj.joinRequestReject }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _devicesList_decorators, { kind: "method", name: "devicesList", static: false, private: false, access: { has: obj => "devicesList" in obj, get: obj => obj.devicesList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deviceRevoke_decorators, { kind: "method", name: "deviceRevoke", static: false, private: false, access: { has: obj => "deviceRevoke" in obj, get: obj => obj.deviceRevoke }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deviceEvents_decorators, { kind: "method", name: "deviceEvents", static: false, private: false, access: { has: obj => "deviceEvents" in obj, get: obj => obj.deviceEvents }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _inviteCreate_decorators, { kind: "method", name: "inviteCreate", static: false, private: false, access: { has: obj => "inviteCreate" in obj, get: obj => obj.inviteCreate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _packJournal_decorators, { kind: "method", name: "packJournal", static: false, private: false, access: { has: obj => "packJournal" in obj, get: obj => obj.packJournal }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _startEventStream_decorators, { kind: "method", name: "startEventStream", static: false, private: false, access: { has: obj => "startEventStream" in obj, get: obj => obj.startEventStream }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _pollEvents_decorators, { kind: "method", name: "pollEvents", static: false, private: false, access: { has: obj => "pollEvents" in obj, get: obj => obj.pollEvents }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _stopEventStream_decorators, { kind: "method", name: "stopEventStream", static: false, private: false, access: { has: obj => "stopEventStream" in obj, get: obj => obj.stopEventStream }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        http = __runInitializers(this, _instanceExtraInitializers);
        constructor(ctx, _cfg = {}) {
            super(ctx, REMOTE_NS);
            const baseUrl = typeof _cfg.baseUrl === 'string' ? _cfg.baseUrl.trim() : '';
            if (baseUrl.length > 0) {
                const opts = { baseUrl };
                if (typeof _cfg.fingerprint === 'string')
                    opts.fingerprint = _cfg.fingerprint;
                if (typeof _cfg.clientVersion === 'string')
                    opts.clientVersion = _cfg.clientVersion;
                this.http = new KaipuHttpClient(opts);
            }
            else {
                this.http = null;
            }
            installErrorBoundary(this);
        }
        requireHttp() {
            if (this.http === null) {
                throw new KaipuHttpError(0, 'not_configured', '工位还没接服务端 —— 插件配置里缺 baseUrl。装上开铺（kaipu-platform）或手工填接入地址后可操作工位。');
            }
            return this.http;
        }
        async status(query, signal) {
            void query;
            void signal;
            const state = checkedWorkstationState();
            return {
                ok: true,
                data: {
                    connected: true,
                    projectId: state.projectId,
                    source: state.source,
                    seats: summarizeSeats(state),
                    note: '期1 渲染持久化态（scaffold），服务端五项落地后接真 kaipu-workstation/state',
                },
            };
        }
        async deviceCred(query, signal) {
            void query;
            void signal;
            return { ok: true, data: readAnyDeviceCred() };
        }
        async state(query, signal) {
            void query;
            void signal;
            return { ok: true, data: checkedWorkstationState() };
        }
        async orgTree(query, signal) {
            void query;
            const data = await this.requireHttp().call('GET', '/org/tree', undefined, signal);
            return {
                ok: true,
                data: {
                    nodes: Array.isArray(data?.nodes) ? data.nodes : [],
                    edges: Array.isArray(data?.edges) ? data.edges : [],
                    org_ready: data?.org_ready === true,
                },
            };
        }
        async orgNodeCreate(query, signal) {
            const body = { name: query.name };
            if (typeof query.parentNodeId === 'string' && query.parentNodeId.length > 0) {
                body.parent_node_id = query.parentNodeId;
            }
            if (typeof query.nodeKind === 'string' && query.nodeKind.length > 0)
                body.node_kind = query.nodeKind;
            const data = await this.requireHttp().call('POST', '/org/nodes', body, signal);
            return { ok: true, data };
        }
        async orgNodePatch(query, signal) {
            const body = {};
            if (typeof query.name === 'string')
                body.name = query.name;
            if (typeof query.parentNodeId === 'string')
                body.parent_node_id = query.parentNodeId;
            if (typeof query.bindSeat === 'string')
                body.bind_seat = query.bindSeat;
            if (typeof query.unbindSeat === 'string')
                body.unbind_seat = query.unbindSeat;
            if (Object.keys(body).length === 0) {
                throw new KaipuHttpError(400, 'empty_patch', '没有要改的内容 —— 至少给 name / parentNodeId / bindSeat / unbindSeat 之一。');
            }
            const data = await this.requireHttp().call('PATCH', `/org/nodes/${encodeURIComponent(query.nodeId)}`, body, signal);
            return { ok: true, data };
        }
        async orgNodeDelete(query, signal) {
            const data = await this.requireHttp().call('DELETE', `/org/nodes/${encodeURIComponent(query.nodeId)}`, undefined, signal);
            return { ok: true, data };
        }
        async tasksCreate(query, signal) {
            const body = { title: query.title };
            if (typeof query.detail === 'string')
                body.detail = query.detail;
            if (typeof query.nodeId === 'string' && query.nodeId.length > 0)
                body.node_id = query.nodeId;
            if (typeof query.projectId === 'string' && query.projectId.length > 0)
                body.project_id = query.projectId;
            if (typeof query.interactionId === 'string' && query.interactionId.length > 0)
                body.interaction_id = query.interactionId;
            if (typeof query.notifyAgent === 'string' && query.notifyAgent.length > 0)
                body.notifyAgent = query.notifyAgent;
            const data = await this.requireHttp().call('POST', '/tasks', body, signal);
            return { ok: true, data };
        }
        async tasksList(query, signal) {
            const qs = [];
            if (typeof query.status === 'string' && query.status.length > 0) {
                qs.push(`status=${encodeURIComponent(query.status)}`);
            }
            if (typeof query.nodeId === 'string' && query.nodeId.length > 0) {
                qs.push(`node_id=${encodeURIComponent(query.nodeId)}`);
            }
            if (query.all === true)
                qs.push('all=1');
            const path = qs.length > 0 ? `/tasks?${qs.join('&')}` : '/tasks';
            const data = await this.requireHttp().call('GET', path, undefined, signal);
            return {
                ok: true,
                data: {
                    tasks: Array.isArray(data?.tasks) ? data.tasks : [],
                    counts: data?.counts ?? { open: 0, claimed: 0, done: 0, cancelled: 0 },
                },
            };
        }
        async tasksClaim(query, signal) {
            const data = await this.requireHttp().call('POST', `/tasks/${encodeURIComponent(query.taskId)}/claim`, {}, signal);
            return { ok: true, data };
        }
        async projectsList(query, signal) {
            void query;
            const data = await this.requireHttp().call('GET', '/projects', undefined, signal);
            return { ok: true, data: { projects: Array.isArray(data?.projects) ? data.projects : [] } };
        }
        async projectsCreate(query, signal) {
            const name = (query.name ?? '').trim();
            if (name.length === 0) {
                throw new KaipuHttpError(400, 'empty_name', '项目名不能为空。');
            }
            const data = await this.requireHttp().call('POST', '/projects', { name }, signal);
            return { ok: true, data };
        }
        async projectsRename(query, signal) {
            const pid = typeof query.projectId === 'string' ? query.projectId : '';
            const name = (query.name ?? '').trim();
            if (pid.length === 0)
                throw new KaipuHttpError(400, 'missing_project_id', '改名缺项目 id');
            if (name.length === 0)
                throw new KaipuHttpError(400, 'empty_name', '项目名不能为空。');
            const data = await this.requireHttp().call('PATCH', `/projects/${encodeURIComponent(pid)}`, { name }, signal);
            return { ok: true, data };
        }
        async projectPhaseSet(query, signal) {
            const pid = typeof query.projectId === 'string' ? query.projectId : '';
            const phase = (query.phase ?? '').trim();
            if (pid.length === 0)
                throw new KaipuHttpError(400, 'missing_project_id', '改阶段缺项目 id');
            if (phase.length === 0)
                throw new KaipuHttpError(400, 'missing_phase', '改阶段缺目标阶段');
            const data = await this.requireHttp().call('PATCH', `/projects/${encodeURIComponent(pid)}/phase`, { phase }, signal);
            return { ok: true, data };
        }
        async projectSuggestPhase(query, signal) {
            const pid = typeof query.projectId === 'string' ? query.projectId : '';
            if (pid.length === 0)
                throw new KaipuHttpError(400, 'missing_project_id', '提建议缺项目 id');
            const body = {
                toPhase: query.toPhase,
                idempotencyKey: query.idempotencyKey,
                expectedVersion: query.expectedVersion,
            };
            if (typeof query.reason === 'string' && query.reason.length > 0)
                body.reason = query.reason;
            const data = await this.requireHttp().call('POST', `/projects/${encodeURIComponent(pid)}/suggest_phase`, body, signal);
            return { ok: true, data };
        }
        async projectSuggestionsList(query, signal) {
            const pid = typeof query.projectId === 'string' ? query.projectId : '';
            if (pid.length === 0)
                throw new KaipuHttpError(400, 'missing_project_id', '读建议缺项目 id');
            const data = await this.requireHttp().call('GET', `/projects/${encodeURIComponent(pid)}/suggestions`, undefined, signal);
            return { ok: true, data };
        }
        async projectDecidePhase(query, signal) {
            const pid = typeof query.projectId === 'string' ? query.projectId : '';
            const sid = typeof query.suggestionId === 'string' ? query.suggestionId : '';
            if (pid.length === 0)
                throw new KaipuHttpError(400, 'missing_project_id', '决策缺项目 id');
            if (sid.length === 0)
                throw new KaipuHttpError(400, 'missing_suggestion_id', '决策缺建议 id');
            const body = { verdict: query.verdict };
            if (typeof query.reasonCode === 'string' && query.reasonCode.length > 0) {
                body.reasonCode = query.reasonCode;
            }
            if (typeof query.reasonText === 'string' && query.reasonText.length > 0) {
                body.reasonText = query.reasonText;
            }
            const data = await this.requireHttp().call('POST', `/projects/${encodeURIComponent(pid)}/suggestions/${encodeURIComponent(sid)}/decide`, body, signal);
            return { ok: true, data };
        }
        async tasksDepsList(query, signal) {
            const tid = typeof query.taskId === 'string' ? query.taskId : '';
            if (tid.length === 0)
                throw new KaipuHttpError(400, 'missing_task_id', '读依赖缺任务 id');
            const data = await this.requireHttp().call('GET', `/tasks/${encodeURIComponent(tid)}/deps`, undefined, signal);
            return { ok: true, data };
        }
        async tasksDepsDelete(query, signal) {
            const tid = typeof query.taskId === 'string' ? query.taskId : '';
            const dep = typeof query.dependsOnTaskId === 'string' ? query.dependsOnTaskId : '';
            if (tid.length === 0 || dep.length === 0) {
                throw new KaipuHttpError(400, 'missing_ids', '撤依赖缺任务 id 或前置 id');
            }
            const data = await this.requireHttp().call('DELETE', `/tasks/${encodeURIComponent(tid)}/deps/${encodeURIComponent(dep)}`, undefined, signal);
            return { ok: true, data };
        }
        async deliverablesList(query, signal) {
            const tid = typeof query.taskId === 'string' ? query.taskId : '';
            if (tid.length === 0)
                throw new KaipuHttpError(400, 'missing_task_id', '读交付版本缺任务 id');
            const data = await this.requireHttp().call('GET', `/tasks/${encodeURIComponent(tid)}/deliverables`, undefined, signal);
            return { ok: true, data };
        }
        async deliverablePromote(query, signal) {
            const tid = typeof query.taskId === 'string' ? query.taskId : '';
            const did = typeof query.deliverableId === 'string' ? query.deliverableId : '';
            if (tid.length === 0 || did.length === 0) {
                throw new KaipuHttpError(400, 'missing_ids', '指定最终稿缺任务 id 或稿 id');
            }
            const data = await this.requireHttp().call('POST', `/tasks/${encodeURIComponent(tid)}/deliverables/${encodeURIComponent(did)}/promote`, {}, signal);
            return { ok: true, data };
        }
        async projectUnarchive(query, signal) {
            const pid = typeof query.projectId === 'string' ? query.projectId : '';
            if (pid.length === 0)
                throw new KaipuHttpError(400, 'missing_project_id', '取消归档缺项目 id');
            const data = await this.requireHttp().call('POST', `/projects/${encodeURIComponent(pid)}/unarchive`, {}, signal);
            return { ok: true, data };
        }
        async projectArchiveDownload(query, signal) {
            const pid = typeof query.projectId === 'string' ? query.projectId : '';
            if (pid.length === 0)
                throw new KaipuHttpError(400, 'missing_project_id', '下载归档缺项目 id');
            const data = await this.requireHttp().call('GET', `/projects/${encodeURIComponent(pid)}/archive/base64`, undefined, signal);
            return { ok: true, data };
        }
        async projectArchive(query, signal) {
            const data = await this.requireHttp().call('POST', `/projects/${encodeURIComponent(query.projectId)}/archive`, { force: query.force === true }, signal);
            return { ok: true, data };
        }
        async tasksDone(query, signal) {
            const data = await this.requireHttp().call('POST', `/tasks/${encodeURIComponent(query.taskId)}/done`, { result: query.result ?? '' }, signal);
            return { ok: true, data };
        }
        async tasksStart(query, signal) {
            const data = await this.requireHttp().call('POST', `/tasks/${encodeURIComponent(query.taskId)}/start`, {}, signal);
            return { ok: true, data };
        }
        async tasksHeartbeat(query, signal) {
            const data = await this.requireHttp().call('POST', `/tasks/${encodeURIComponent(query.taskId)}/heartbeat`, {}, signal);
            return { ok: true, data };
        }
        async tasksBlock(query, signal) {
            const data = await this.requireHttp().call('POST', `/tasks/${encodeURIComponent(query.taskId)}/block`, { reason: query.reason }, signal);
            return { ok: true, data };
        }
        async projectAuditRequest(query, signal) {
            const data = await this.requireHttp().call('POST', `/projects/${encodeURIComponent(query.projectId)}/audit-request`, { package: query.package ?? 'standard' }, signal);
            return { ok: true, data };
        }
        async auditGet(query, signal) {
            const data = await this.requireHttp().call('GET', `/audit/${encodeURIComponent(query.auditId)}`, undefined, signal);
            return { ok: true, data };
        }
        async tasksUnblock(query, signal) {
            const data = await this.requireHttp().call('POST', `/tasks/${encodeURIComponent(query.taskId)}/unblock`, {}, signal);
            return { ok: true, data };
        }
        async tasksAssign(query, signal) {
            const agentId = typeof query.agentId === 'string' && query.agentId.length > 0
                ? query.agentId
                : typeof query.agent_id === 'string'
                    ? query.agent_id
                    : '';
            if (agentId.length === 0) {
                throw new KaipuHttpError(400, 'missing_agent_id', '指派缺 agentId —— 要指给哪个 agent？');
            }
            const data = await this.requireHttp().call('POST', `/tasks/${encodeURIComponent(query.taskId)}/assign`, { agent_id: agentId }, signal);
            return { ok: true, data };
        }
        async tasksDeps(query, signal) {
            const dependsOn = typeof query.dependsOnTaskId === 'string' && query.dependsOnTaskId.length > 0
                ? query.dependsOnTaskId
                : typeof query.depends_on_task_id === 'string'
                    ? query.depends_on_task_id
                    : '';
            if (dependsOn.length === 0) {
                throw new KaipuHttpError(400, 'missing_depends_on', '加依赖缺 dependsOnTaskId —— 要等哪条任务？');
            }
            const data = await this.requireHttp().call('POST', `/tasks/${encodeURIComponent(query.taskId)}/deps`, { depends_on_task_id: dependsOn }, signal);
            return { ok: true, data };
        }
        async tasksApprove(query, signal) {
            const body = { approver_id: resolveApproverId(query) };
            if (typeof query.comment === 'string' && query.comment.length > 0)
                body.comment = query.comment;
            const data = await this.requireHttp().call('POST', `/tasks/${encodeURIComponent(query.taskId)}/approve`, body, signal);
            return { ok: true, data };
        }
        async tasksReject(query, signal) {
            const body = { approver_id: resolveApproverId(query) };
            if (typeof query.comment === 'string' && query.comment.length > 0)
                body.comment = query.comment;
            const data = await this.requireHttp().call('POST', `/tasks/${encodeURIComponent(query.taskId)}/reject`, body, signal);
            return { ok: true, data };
        }
        async tasksBoard(query, signal) {
            void query;
            const data = await this.requireHttp().call('GET', '/tasks/board', undefined, signal);
            const payload = {
                groups: data !== null && typeof data.groups === 'object' && data.groups !== null ? data.groups : {},
                counts: data !== null && typeof data.counts === 'object' && data.counts !== null ? data.counts : {},
                total: typeof data.total === 'number' ? data.total : 0,
            };
            if (typeof data.stale_count === 'number')
                payload.stale_count = data.stale_count;
            return { ok: true, data: payload };
        }
        async tasksBlocked(query, signal) {
            void query;
            const data = await this.requireHttp().call('GET', '/tasks/blocked', undefined, signal);
            return { ok: true, data };
        }
        async tasksPendingApprovals(query, signal) {
            void query;
            const data = await this.requireHttp().call('GET', '/tasks/pending-approvals', undefined, signal);
            return { ok: true, data };
        }
        async whoami(query, signal) {
            void query;
            const data = await this.requireHttp().call('GET', '/tenant/me', undefined, signal);
            const accountId = typeof data?.accountId === 'string'
                ? data.accountId
                : typeof data?.account_id === 'string'
                    ? data.account_id
                    : '';
            return { ok: true, data: { accountId } };
        }
        async packsList(query, signal) {
            const path = `${packBase(query)}/files${seatQuery(query)}`;
            const data = await this.requireHttp().call('GET', path, undefined, signal);
            const files = Array.isArray(data?.files) ? data.files : [];
            return { ok: true, data: { count: typeof data?.count === 'number' ? data.count : files.length, files } };
        }
        async packUpload(query, signal) {
            const filename = typeof query.filename === 'string' ? query.filename : '';
            if (filename.length === 0) {
                throw new KaipuHttpError(400, 'missing_filename', '上传缺文件名 —— 这个件叫什么？');
            }
            const bytes = base64ToBytes(query.contentBase64);
            if (bytes.length === 0) {
                throw new KaipuHttpError(400, 'empty_file', '文件是空的（0 字节）—— 不传空件。');
            }
            const sha = await sha256Hex(bytes);
            const data = await this.requireHttp().uploadRaw(`${packBase(query)}/files${seatQuery(query)}`, bytes, {
                'X-Filename': encodeURIComponent(filename),
                'X-Body-Sha256': sha,
                'Content-Type': 'application/octet-stream',
            }, signal);
            return { ok: true, data: (data || {}) };
        }
        async notifications(query, signal) {
            const d = await this.requireHttp().call('GET', '/notifications', undefined, signal);
            return { ok: true, data: {
                    items: (Array.isArray(d?.items) ? d.items : []).map((r) => ({
                        kind: String(r.kind ?? ''), taskId: String(r.taskId ?? ''), title: String(r.title ?? ''),
                        at: String(r.at ?? ''), text: String(r.text ?? ''), unread: r.unread === true,
                    })),
                    unread: Number(d?.unread ?? 0) || 0,
                    total: Number(d?.total ?? 0) || 0,
                    seenAt: String(d?.seenAt ?? ''),
                } };
        }
        async notificationsRead(query, signal) {
            void query;
            const d = await this.requireHttp().call('POST', '/notifications/read', {}, signal);
            return { ok: true, data: { seen: d?.seen === true } };
        }
        async pluginVersion(query, signal) {
            const data = await this.requireHttp().call('GET', `/plugin/version?current=${encodeURIComponent(query.current)}`, undefined, signal);
            return { ok: true, data: {
                    current: data?.current ?? null,
                    latest: data?.latest ?? null,
                    updateAvailable: data?.updateAvailable === true,
                    notes: typeof data?.notes === 'string' ? data.notes : '',
                } };
        }
        async packsInteractions(query, signal) {
            void query;
            const data = await this.requireHttp().call('GET', '/packs/interactions', undefined, signal);
            return { ok: true, data: { interactions: Array.isArray(data?.interactions) ? data.interactions : [] } };
        }
        async packExport(query, signal) {
            const iid = typeof query.interactionId === 'string' ? query.interactionId : '';
            if (iid.length === 0) {
                throw new KaipuHttpError(400, 'missing_interaction_id', '打包下载缺交互 ID');
            }
            const got = await this.requireHttp().downloadRaw(`/packs/${encodeURIComponent(iid)}/export`, signal);
            return {
                ok: true,
                data: {
                    filename: got.filename ?? `${iid}-资料.zip`,
                    dataBase64: bytesToBase64(got.bytes),
                    bytes: got.bytes.length,
                    files: 0,
                },
            };
        }
        async packPurge(query, signal) {
            const data = await this.requireHttp().call('POST', `/packs/${encodeURIComponent(query.interactionId)}/purge`, { confirm: 'DELETE' }, signal);
            return { ok: true, data: { interactionId: data?.interactionId ?? query.interactionId, deleteAfter: data?.deleteAfter ?? '' } };
        }
        async packPurgeCancel(query, signal) {
            const data = await this.requireHttp().call('POST', `/packs/${encodeURIComponent(query.interactionId)}/purge/cancel`, {}, signal);
            return { ok: true, data: { interactionId: data?.interactionId ?? query.interactionId, cancelled: true } };
        }
        async packPurgeStatus(query, signal) {
            const data = await this.requireHttp().call('GET', `/packs/${encodeURIComponent(query.interactionId)}/purge`, undefined, signal);
            return { ok: true, data: { interactionId: query.interactionId, pending: data?.pending === true, deleteAfter: data?.deleteAfter ?? null } };
        }
        async crmCustomers(query, signal) {
            const qs = [];
            if (typeof query.q === 'string' && query.q.trim() !== '')
                qs.push(`q=${encodeURIComponent(query.q.trim())}`);
            if (typeof query.limit === 'number' && query.limit > 0)
                qs.push(`limit=${query.limit}`);
            const path = qs.length > 0 ? `/crm/customers?${qs.join('&')}` : '/crm/customers';
            const d = await this.requireHttp().call('GET', path, undefined, signal);
            return { ok: true, data: {
                    items: Array.isArray(d?.items) ? d.items : [],
                    total: Number(d?.total ?? (Array.isArray(d?.items) ? d.items.length : 0)) || 0,
                } };
        }
        async crmCustomerCreate(query, signal) {
            const d = await this.requireHttp().call('POST', '/crm/customers', {
                name: query.name,
                taxId: query.taxId ?? '',
                phone: query.phone ?? '',
                source: query.source ?? '',
            }, signal);
            return { ok: true, data: { customer: d?.customer ?? {} } };
        }
        async crmCustomerUpdate(query, signal) {
            const cid = encodeURIComponent(String(query.customerId ?? ''));
            const body = {};
            if (typeof query.name === 'string')
                body.name = query.name;
            if (typeof query.taxId === 'string')
                body.taxId = query.taxId;
            if (typeof query.phone === 'string')
                body.phone = query.phone;
            if (typeof query.source === 'string')
                body.source = query.source;
            const d = await this.requireHttp().call('PATCH', `/crm/customers/${cid}`, body, signal);
            return { ok: true, data: { customer: d?.customer ?? {} } };
        }
        async crmCustomerArchive(query, signal) {
            const cid = encodeURIComponent(String(query.customerId ?? ''));
            const d = await this.requireHttp().call('DELETE', `/crm/customers/${cid}`, undefined, signal);
            return { ok: true, data: { archived: d?.archived === true } };
        }
        async crmFollowups(query, signal) {
            const cid = encodeURIComponent(String(query.customerId ?? ''));
            const base = `/crm/customers/${cid}/followups`;
            const isWrite = typeof query.note === 'string' && query.note !== '';
            if (isWrite) {
                const d = await this.requireHttp().call('POST', base, {
                    note: query.note,
                    channel: query.channel ?? 'other',
                    evidenceCount: query.evidenceCount ?? 0,
                    taskId: query.taskId ?? '',
                }, signal);
                return { ok: true, data: d ?? {} };
            }
            const d = await this.requireHttp().call('GET', base, undefined, signal);
            return { ok: true, data: d ?? {} };
        }
        async crmFunnel(query, signal) {
            void query;
            const d = await this.requireHttp().call('GET', '/crm/funnel', undefined, signal);
            return { ok: true, data: d ?? {} };
        }
        async crmGuard(query, signal) {
            void query;
            const d = await this.requireHttp().call('GET', '/crm/guard/irreversible', undefined, signal);
            return { ok: true, data: d ?? {} };
        }
        async crmGuardCheck(query, signal) {
            const d = await this.requireHttp().call('POST', '/crm/guard/irreversible/check', {
                action: String(query.action ?? ''),
            }, signal);
            return { ok: true, data: d ?? {} };
        }
        async notesHealth(query, signal) {
            void query;
            const d = await this.requireHttp().call('GET', '/notes/health', undefined, signal);
            return { ok: true, data: d ?? {} };
        }
        async notesStats(query, signal) {
            void query;
            const d = await this.requireHttp().call('GET', '/notes/stats', undefined, signal);
            return { ok: true, data: d ?? {} };
        }
        async skillsList(query, signal) {
            const st = typeof query.status === 'string' && query.status.trim() !== ''
                ? query.status.trim() : 'all';
            const d = await this.requireHttp().call('GET', `/skills?status=${encodeURIComponent(st)}`, undefined, signal);
            const skills = Array.isArray(d?.skills) ? d.skills : [];
            return { ok: true, data: { count: Number(d?.count ?? skills.length) || 0, skills } };
        }
        async skillsCatalog(query, signal) {
            void query;
            const d = await this.requireHttp().call('GET', '/skills/catalog', undefined, signal);
            const skills = Array.isArray(d?.skills) ? d.skills : [];
            const categories = Array.isArray(d?.categories) ? d.categories : [];
            return { ok: true, data: { count: Number(d?.count ?? skills.length) || 0, categories, skills } };
        }
        async creditsGet(query, signal) {
            void query;
            const d = await this.requireHttp().call('GET', '/credits', undefined, signal);
            const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
            return {
                ok: true,
                data: {
                    credits: num(d?.credits),
                    bonusCredits: num(d?.bonusCredits),
                    giftCredits: num(d?.giftCredits),
                    paidCredits: num(d?.paidCredits),
                    dailyClaimAmount: num(d?.dailyClaimAmount),
                    claimedToday: d?.claimedToday === true,
                    canClaim: d?.canClaim === true,
                },
            };
        }
        async creditsLedger(body, signal) {
            const lim = Number(body?.limit ?? 50);
            const before = typeof body?.before === 'string' ? body.before : '';
            const qs = [`limit=${encodeURIComponent(String(Number.isFinite(lim) ? lim : 50))}`];
            if (before !== '')
                qs.push(`before=${encodeURIComponent(before)}`);
            const d = await this.requireHttp().call('GET', `/credits/ledger?${qs.join('&')}`, undefined, signal);
            return { ok: true, data: d };
        }
        async creditsClaim(body, signal) {
            void body;
            const d = await this.requireHttp().call('POST', '/credits/claim', {}, signal);
            const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
            return {
                ok: true,
                data: {
                    ok: d?.ok === true,
                    reason: typeof d?.reason === 'string' ? d.reason : '',
                    amount: num(d?.amount),
                    credits: num(d?.credits),
                    bonusCredits: num(d?.bonusCredits),
                    giftCredits: num(d?.giftCredits),
                    paidCredits: num(d?.paidCredits),
                    expiresAt: typeof d?.expiresAt === 'string' ? d.expiresAt : '',
                },
            };
        }
        async notesList(query, signal) {
            const qs = [];
            for (const k of ['status', 'priority', 'q', 'dueBefore']) {
                const v = query[k];
                if (typeof v === 'string' && v.trim() !== '') {
                    qs.push(`${k}=${encodeURIComponent(v.trim())}`);
                }
            }
            if (typeof query.limit === 'number' && query.limit > 0)
                qs.push(`limit=${query.limit}`);
            const path = qs.length > 0 ? `/notes?${qs.join('&')}` : '/notes';
            const d = await this.requireHttp().call('GET', path, undefined, signal);
            const items = Array.isArray(d?.items) ? d.items : [];
            return { ok: true, data: { items, total: Number(d?.total ?? items.length) || 0 } };
        }
        async notesCreate(query, signal) {
            const d = await this.requireHttp().call('POST', '/notes', {
                title: String(query.title ?? ''),
                detail: String(query.detail ?? ''),
                dueAt: String(query.dueAt ?? ''),
                remindAt: String(query.remindAt ?? ''),
                priority: String(query.priority ?? 'normal'),
                tags: Array.isArray(query.tags) ? query.tags : [],
            }, signal);
            return { ok: true, data: { note: d?.note ?? {} } };
        }
        async notesUpdate(query, signal) {
            const nid = encodeURIComponent(String(query.noteId ?? ''));
            const body = {};
            for (const k of ['title', 'detail', 'dueAt', 'remindAt', 'priority', 'status', 'tags']) {
                if (k in query)
                    body[k] = query[k];
            }
            const d = await this.requireHttp().call('PATCH', `/notes/${nid}`, body, signal);
            return { ok: true, data: { note: d?.note ?? {} } };
        }
        async notesToggle(query, signal) {
            const nid = encodeURIComponent(String(query.noteId ?? ''));
            const d = await this.requireHttp().call('POST', `/notes/${nid}/toggle`, {}, signal);
            return { ok: true, data: { note: d?.note ?? {} } };
        }
        async notesDelete(query, signal) {
            const nid = encodeURIComponent(String(query.noteId ?? ''));
            const d = await this.requireHttp().call('DELETE', `/notes/${nid}`, undefined, signal);
            return { ok: true, data: { deleted: Boolean(d?.deleted) } };
        }
        async packDownload(query, signal) {
            const name = typeof query.filename === 'string' ? query.filename : '';
            if (name.length === 0) {
                throw new KaipuHttpError(400, 'missing_filename', '下载缺文件名 —— 取哪个件？');
            }
            const got = await this.requireHttp().downloadRaw(`${packBase(query)}/files/${encodeURIComponent(name)}${seatQuery(query)}`, signal);
            return {
                ok: true,
                data: {
                    filename: got.filename ?? name,
                    contentType: got.contentType,
                    contentBase64: bytesToBase64(got.bytes),
                    size: got.bytes.length,
                },
            };
        }
        async packDelete(query, signal) {
            const name = typeof query.filename === 'string' ? query.filename : '';
            if (name.length === 0) {
                throw new KaipuHttpError(400, 'missing_filename', '删除缺文件名 —— 删哪个件？');
            }
            const data = await this.requireHttp().call('DELETE', `${packBase(query)}/files/${encodeURIComponent(name)}${seatQuery(query)}`, undefined, signal);
            return { ok: true, data: data || {} };
        }
        async rolesSeats(query, signal) {
            void query;
            const data = await this.requireHttp().call('GET', '/roles/seats', undefined, signal);
            return {
                ok: true,
                data: { seats: Array.isArray(data?.seats) ? data.seats : [], accountId: data?.accountId ?? '' },
            };
        }
        async grantList(query, signal) {
            const qs = query?.status ? `?status=${encodeURIComponent(query.status)}` : '';
            const data = await this.requireHttp().call('GET', '/grants' + qs, undefined, signal);
            return {
                ok: true,
                data: {
                    grants: Array.isArray(data?.grants) ? data.grants : [],
                    ttlOptions: Array.isArray(data?.ttlOptions) ? data.ttlOptions : [24, 72, 168],
                    accountId: data?.accountId ?? '',
                },
            };
        }
        async grantCreate(query, signal) {
            const data = await this.requireHttp().call('POST', '/grants', {
                granteeId: query.granteeId,
                ttlHours: query.ttlHours,
                ...(query.name ? { name: query.name } : {}),
                ...(query.note ? { note: query.note } : {}),
            }, signal);
            return { ok: true, data };
        }
        async grantGenerate(query, signal) {
            const data = await this.requireHttp().call('POST', '/grants/generate', {
                ttlHours: query.ttlHours,
                ...(query.note ? { note: query.note } : {}),
            }, signal);
            return { ok: true, data };
        }
        async grantRevoke(query, signal) {
            const gid = encodeURIComponent(query.grantId);
            const data = await this.requireHttp().call('POST', `/grants/${gid}/revoke`, query.reason ? { reason: query.reason } : {}, signal);
            return { ok: true, data };
        }
        async grantEvents(query, signal) {
            const gid = encodeURIComponent(query.grantId);
            const data = await this.requireHttp().call('GET', `/grants/${gid}/events`, undefined, signal);
            return { ok: true, data: { grantId: data?.grantId ?? query.grantId, events: Array.isArray(data?.events) ? data.events : [] } };
        }
        async contextGet(query, signal) {
            void query;
            const data = await this.requireHttp().call('GET', '/workstation/context', undefined, signal);
            return {
                ok: true,
                data: {
                    interactionId: typeof data?.interactionId === 'string' ? data.interactionId : '',
                    seat: typeof data?.seat === 'string' ? data.seat : '',
                    note: typeof data?.note === 'string' ? data.note : '',
                    project: typeof data?.project === 'string' ? data.project : '',
                    shopName: typeof data?.shopName === 'string' ? data.shopName : '',
                    onboardSeen: data?.onboardSeen === true,
                    updatedAt: typeof data?.updatedAt === 'string' ? data.updatedAt : '',
                },
            };
        }
        async contextPut(query, signal) {
            const body = {};
            if (typeof query.interactionId === 'string')
                body.interactionId = query.interactionId;
            if (typeof query.seat === 'string')
                body.seat = query.seat;
            if (typeof query.note === 'string')
                body.note = query.note;
            if (typeof query.project === 'string')
                body.project = query.project;
            if (typeof query.shopName === 'string')
                body.shopName = query.shopName;
            if (query.onboardSeen === true)
                body.onboardSeen = true;
            const data = await this.requireHttp().call('POST', '/workstation/context', body, signal);
            return {
                ok: true,
                data: {
                    interactionId: typeof data?.interactionId === 'string' ? data.interactionId : '',
                    seat: typeof data?.seat === 'string' ? data.seat : '',
                    note: typeof data?.note === 'string' ? data.note : '',
                    project: typeof data?.project === 'string' ? data.project : '',
                    shopName: typeof data?.shopName === 'string' ? data.shopName : '',
                    onboardSeen: data?.onboardSeen === true,
                    updatedAt: typeof data?.updatedAt === 'string' ? data.updatedAt : '',
                },
            };
        }
        async tenantRegions(query, signal) {
            void query;
            const data = await this.requireHttp().call('GET', '/tenant/regions', undefined, signal);
            const raw = Array.isArray(data?.regions) ? data.regions : [];
            return {
                ok: true,
                data: {
                    regions: raw.map((r) => ({
                        planet: typeof r?.planet === 'string' ? r.planet : '',
                        country: typeof r?.country === 'string' ? r.country : '',
                        region: typeof r?.region === 'string' ? r.region : '',
                        label: typeof r?.label === 'string' ? r.label : '',
                    })).filter((r) => r.planet && r.country && r.region),
                },
            };
        }
        async tenantShops(query, signal) {
            void query;
            const data = await this.requireHttp().call('GET', '/tenant/shops', undefined, signal);
            const raw = Array.isArray(data?.shops) ? data.shops : [];
            return {
                ok: true,
                data: {
                    ownerAccount: typeof data?.ownerAccount === 'string' ? data.ownerAccount : '',
                    current: typeof data?.current === 'string' ? data.current : '',
                    count: typeof data?.count === 'number' ? data.count : raw.length,
                    currentRole: typeof data?.currentRole === 'string' ? data.currentRole : '',
                    shops: raw.map((s) => ({
                        accountId: typeof s?.accountId === 'string' ? s.accountId : '',
                        name: typeof s?.name === 'string' ? s.name : '',
                        shopNo: typeof s?.shopNo === 'number' ? s.shopNo : 1,
                        isPrimary: s?.isPrimary === true,
                        status: typeof s?.status === 'string' ? s.status : 'active',
                        doorNo: typeof s?.doorNo === 'number' ? s.doorNo : 0,
                        doorLabel: typeof s?.doorLabel === 'string' ? s.doorLabel : '',
                        plan: typeof s?.plan === 'string' ? s.plan : 'standard',
                        role: (s?.role === 'owner' ? 'owner' : 'invitee'),
                        ownerName: typeof s?.ownerName === 'string' ? s.ownerName : '',
                        seat: typeof s?.seat === 'string' ? s.seat : '',
                        joinedAt: typeof s?.joinedAt === 'string' ? s.joinedAt : '',
                        nameIsPlaceholder: s?.nameIsPlaceholder === true,
                    })).filter((s) => s.accountId),
                },
            };
        }
        async tenantNameRename(query, signal) {
            const name = typeof query?.name === 'string' ? query.name.trim() : '';
            const data = await this.requireHttp().call('PATCH', '/tenant/name', { name }, signal);
            const q = data?.renameQuota ?? {};
            return {
                ok: true,
                data: {
                    name: typeof data?.name === 'string' ? data.name : '',
                    previousName: typeof data?.previousName === 'string' ? data.previousName : '',
                    changedAt: typeof data?.changedAt === 'string' ? data.changedAt : '',
                    renameQuota: {
                        limit: typeof q.limit === 'number' ? q.limit : 3,
                        used: typeof q.used === 'number' ? q.used : 0,
                        left: typeof q.left === 'number' ? q.left : 0,
                        year: typeof q.year === 'number' ? q.year : new Date().getFullYear(),
                    },
                },
            };
        }
        async shopOpen(query, signal) {
            const body = {
                planet: query.planet,
                country: query.country,
                region: query.region,
            };
            if (typeof query.name === 'string' && query.name.trim())
                body.name = query.name.trim();
            const data = await this.requireHttp().call('POST', '/tenant/shops', body, signal);
            return {
                ok: true,
                data: {
                    accountId: typeof data?.accountId === 'string' ? data.accountId : '',
                    ownerAccount: typeof data?.ownerAccount === 'string' ? data.ownerAccount : '',
                    shopNo: typeof data?.shopNo === 'number' ? data.shopNo : 0,
                    name: typeof data?.name === 'string' ? data.name : '',
                    plan: typeof data?.plan === 'string' ? data.plan : 'standard',
                    status: typeof data?.status === 'string' ? data.status : 'active',
                    doorNo: typeof data?.doorNo === 'number' ? data.doorNo : 0,
                    doorLabel: typeof data?.doorLabel === 'string' ? data.doorLabel : '',
                    seatsProvisioned: data?.seatsProvisioned === true,
                },
            };
        }
        async shopSwitch(query, signal) {
            const http = this.requireHttp();
            http.switchShop(query?.accountId ?? null);
            const who = await http.identify(signal);
            return { ok: true, data: { accountId: who || null } };
        }
        async tenantDoorAssign(query, signal) {
            const body = {
                planet: query.planet,
                country: query.country,
                region: query.region,
            };
            const data = await this.requireHttp().call('POST', '/tenant/door', body, signal);
            return {
                ok: true,
                data: {
                    accountId: typeof data?.accountId === 'string' ? data.accountId : '',
                    doorNo: typeof data?.doorNo === 'number' ? data.doorNo : 0,
                    doorLabel: typeof data?.doorLabel === 'string' ? data.doorLabel : '',
                    doorPlanet: typeof data?.doorPlanet === 'string' ? data.doorPlanet : '',
                    doorCountry: typeof data?.doorCountry === 'string' ? data.doorCountry : '',
                    doorRegion: typeof data?.doorRegion === 'string' ? data.doorRegion : '',
                    newlyAssigned: data?.newlyAssigned === true,
                },
            };
        }
        async agentResetConnection(query, signal) {
            const data = await this.requireHttp().call('POST', `/agents/${encodeURIComponent(query.agentId)}/reset-connection`, {}, signal);
            return {
                ok: true,
                data: {
                    agentId: typeof data?.agentId === 'string' ? data.agentId : query.agentId,
                    pendingSecret: data?.pendingSecret === true,
                    graceHours: typeof data?.graceHours === 'number' ? data.graceHours : 24,
                    message: typeof data?.message === 'string' ? data.message : '',
                },
            };
        }
        async seatEvict(query, signal) {
            const data = await this.requireHttp().call('POST', `/seats/${encodeURIComponent(query.seat)}/evict`, query.agentId !== undefined && query.agentId !== '' ? { agentId: query.agentId } : {}, signal);
            return {
                ok: true,
                data: {
                    seat: typeof data?.seat === 'string' ? data.seat : query.seat,
                    evicted: {
                        agentId: typeof data?.evicted?.agentId === 'string' ? data.evicted.agentId : '',
                        name: typeof data?.evicted?.name === 'string' ? data.evicted.name : '',
                    },
                },
            };
        }
        async orgClearAgents(query, signal) {
            const data = await this.requireHttp().call('POST', '/org/clear-agents', { confirm: query.confirm }, signal);
            return {
                ok: true,
                data: {
                    cleared: typeof data?.cleared === 'number' ? data.cleared : 0,
                    agents: Array.isArray(data?.agents) ? data.agents : [],
                },
            };
        }
        async deviceResetSecret(query, signal) {
            const data = await this.requireHttp().resetDeviceSecret(signal);
            return { ok: true, data };
        }
        async deviceJoinCodeCreate(query, signal) {
            const body = {};
            if (typeof query.note === 'string' && query.note.length > 0)
                body.note = query.note;
            if (typeof query.ttlHours === 'number' && Number.isFinite(query.ttlHours))
                body.ttlHours = query.ttlHours;
            if (typeof query.count === 'number' && Number.isFinite(query.count) && query.count > 1)
                body.count = query.count;
            if (typeof query.seat === 'string' && query.seat.length > 0)
                body.seat = query.seat;
            if (typeof query.invitedName === 'string' && query.invitedName.length > 0)
                body.invitedName = query.invitedName;
            const data = await this.requireHttp().call('POST', '/device-join-codes', body, signal);
            return { ok: true, data };
        }
        async deviceJoinCodes(query, signal) {
            const qs = typeof query.state === 'string' && query.state.length > 0
                ? `?state=${encodeURIComponent(query.state)}` : '';
            const data = await this.requireHttp().call('GET', `/device-join-codes${qs}`, undefined, signal);
            const codes = Array.isArray(data.codes) ? data.codes : [];
            return {
                ok: true,
                data: typeof data.count === 'number' ? { codes, count: data.count } : { codes },
            };
        }
        async deviceJoinCodeRevoke(query, signal) {
            const h = (query.codeHash ?? '').trim();
            const data = await this.requireHttp().call('POST', `/device-join-codes/${encodeURIComponent(h)}/revoke`, {}, signal);
            return { ok: true, data: { codeHash: data.codeHash ?? h, state: data.state ?? 'revoked' } };
        }
        async deviceJoinCodeRenew(query, signal) {
            const h = (query.codeHash ?? '').trim();
            const body = {};
            if (typeof query.ttlHours === 'number' && Number.isFinite(query.ttlHours))
                body.ttlHours = query.ttlHours;
            const data = await this.requireHttp().call('POST', `/device-join-codes/${encodeURIComponent(h)}/renew`, body, signal);
            return {
                ok: true,
                data: { codeHash: data.codeHash ?? h, state: data.state ?? 'pending', expiresAt: data.expiresAt ?? '' },
            };
        }
        async joinRequests(query, signal) {
            const status = typeof query.status === 'string' && query.status.length > 0 ? query.status : 'pending';
            const data = await this.requireHttp().call('GET', `/join/requests?status=${encodeURIComponent(status)}`, undefined, signal);
            const items = Array.isArray(data?.items) ? data.items : [];
            const count = typeof data?.count === 'number' && Number.isFinite(data.count) ? data.count : items.length;
            return { ok: true, data: { items, count } };
        }
        async joinRequestGet(query, signal) {
            const rid = typeof query.requestId === 'string' ? query.requestId.trim() : '';
            if (rid.length === 0)
                throw new KaipuHttpError(400, 'missing_request_id', '查申请状态缺申请号');
            const data = await this.requireHttp().call('GET', `/join/request/${encodeURIComponent(rid)}`, undefined, signal);
            return { ok: true, data };
        }
        async joinRequestCreate(query, signal) {
            const accountId = typeof query.accountId === 'string' ? query.accountId.trim() : '';
            const applicantKind = typeof query.applicantKind === 'string' ? query.applicantKind.trim() : '';
            const applicantId = typeof query.applicantId === 'string' ? query.applicantId.trim() : '';
            if (accountId.length === 0)
                throw new KaipuHttpError(400, 'missing_account_id', '不知道要申请哪个铺子');
            if (applicantKind !== 'agent' && applicantKind !== 'human') {
                throw new KaipuHttpError(400, 'bad_applicant_kind', '申请人类型只能是 agent 或 human');
            }
            if (applicantId.length === 0)
                throw new KaipuHttpError(400, 'missing_applicant_id', '不知道你是谁');
            const body = { accountId, applicantKind, applicantId };
            const fp = this.requireHttp().fingerprintHint().trim();
            if (fp.length > 0)
                body.deviceFp = fp;
            const joinCode = typeof query.joinCode === 'string' ? query.joinCode.trim() : '';
            if (joinCode.length > 0)
                body.joinCode = joinCode;
            for (const [k, v] of [
                ['applicantName', query.applicantName], ['nodeId', query.nodeId],
                ['seat', query.seat], ['reason', query.reason],
            ]) {
                if (typeof v === 'string' && v.trim().length > 0)
                    body[k] = v.trim();
            }
            const data = await this.requireHttp().callAnon('POST', '/join/request', body, signal);
            return { ok: true, data };
        }
        async joinRequestApprove(query, signal) {
            const rid = typeof query.requestId === 'string' ? query.requestId.trim() : '';
            if (rid.length === 0)
                throw new KaipuHttpError(400, 'missing_request_id', '同意哪一条申请？');
            const data = await this.requireHttp().call('POST', `/join/request/${encodeURIComponent(rid)}/approve`, {}, signal);
            return { ok: true, data };
        }
        async joinRequestReject(query, signal) {
            const rid = typeof query.requestId === 'string' ? query.requestId.trim() : '';
            if (rid.length === 0)
                throw new KaipuHttpError(400, 'missing_request_id', '拒绝哪一条申请？');
            const body = {};
            if (typeof query.reason === 'string' && query.reason.trim().length > 0)
                body.reason = query.reason.trim();
            const data = await this.requireHttp().call('POST', `/join/request/${encodeURIComponent(rid)}/reject`, body, signal);
            return { ok: true, data };
        }
        async devicesList(query, signal) {
            void query;
            const data = await this.requireHttp().call('GET', '/devices', undefined, signal);
            return { ok: true, data };
        }
        async deviceRevoke(query, signal) {
            const fp = typeof query.fpHash === 'string' ? query.fpHash.trim() : '';
            if (fp.length < 8)
                throw new KaipuHttpError(400, 'missing_fp', '缺设备指纹');
            const data = await this.requireHttp().call('POST', `/devices/${encodeURIComponent(fp)}/revoke`, { revoked: query.revoked !== false }, signal);
            return { ok: true, data };
        }
        async deviceEvents(query, signal) {
            const limit = typeof query.limit === 'number' && Number.isFinite(query.limit) ? query.limit : 50;
            const data = await this.requireHttp().call('GET', `/devices/events?limit=${limit}`, undefined, signal);
            return { ok: true, data };
        }
        async inviteCreate(query, signal) {
            const lamp = typeof query.lamp === 'string' ? query.lamp.trim() : '';
            if (lamp.length === 0) {
                throw new KaipuHttpError(400, 'missing_lamp', '缺 lamp —— 要请这位 Agent 进哪一盏灯？');
            }
            const body = { lamp };
            if (typeof query.seat === 'string' && query.seat.trim().length > 0)
                body.seat = query.seat.trim();
            if (typeof query.note === 'string' && query.note.length > 0)
                body.note = query.note;
            if (typeof query.ttlDays === 'number' && Number.isFinite(query.ttlDays))
                body.ttlDays = query.ttlDays;
            const data = await this.requireHttp().call('POST', '/invites', body, signal);
            return { ok: true, data };
        }
        async packJournal(query, signal) {
            const data = await this.requireHttp().call('GET', `${packBase(query)}/journal${seatQuery(query)}`, undefined, signal);
            const payload = {
                interactionId: data?.interactionId ?? query.interactionId,
                lines: Array.isArray(data?.lines) ? data.lines : [],
                ok: data?.ok === true,
                brokenAtSeq: typeof data?.brokenAtSeq === 'number' ? data.brokenAtSeq : null,
            };
            if (typeof data?.seat === 'string')
                payload.seat = data.seat;
            if (typeof data?.anchorOk === 'boolean')
                payload.anchorOk = data.anchorOk;
            if (typeof data?.appendOnly === 'boolean')
                payload.appendOnly = data.appendOnly;
            return { ok: true, data: payload };
        }
        static WS_EVENTS_KEEP = 400;
        static WS_BACKOFF_MIN_MS = 1_000;
        static WS_BACKOFF_MAX_MS = 30_000;
        ws = {
            events: [],
            lastSeq: 0,
            running: false,
            error: null,
            lastBeatAt: 0,
            lagged: false,
            ctrl: null,
        };
        async startEventStream(query, signal) {
            void query;
            if (signal !== undefined && signal.aborted) {
                return { ok: false, kind: 'denied', code: 'aborted', error: '已取消' };
            }
            if (this.http === null) {
                return { ok: false, kind: 'error', code: 'not_configured', error: '工位还没接服务端，实时更新不可用。' };
            }
            if (this.ws.running)
                return { ok: true, data: this.wsHead() };
            this.ws.running = true;
            this.ws.error = null;
            void this.pumpEvents();
            return { ok: true, data: this.wsHead() };
        }
        async pollEvents(query, signal) {
            void signal;
            const from = typeof query.from === 'number' && Number.isFinite(query.from) && query.from >= 0
                ? Math.floor(query.from)
                : 0;
            const head = this.wsHead();
            const overrun = from > this.ws.events.length;
            if (overrun)
                this.ws.lagged = true;
            const events = this.ws.events.slice(from);
            const lagged = this.ws.lagged;
            if (events.length > 0)
                this.ws.lagged = false;
            return {
                ok: true,
                data: { ...head, events, next: this.ws.events.length, lagged },
            };
        }
        async stopEventStream(query, signal) {
            void query;
            void signal;
            this.stopEventPump();
            return { ok: true, data: { stopped: true } };
        }
        wsHead() {
            return {
                running: this.ws.running,
                error: this.ws.error,
                lastSeq: this.ws.lastSeq,
                lastBeatAt: this.ws.lastBeatAt,
                lagged: this.ws.lagged,
            };
        }
        stopEventPump() {
            this.ws.running = false;
            try {
                this.ws.ctrl?.abort();
            }
            catch {
            }
            this.ws.ctrl = null;
        }
        async pumpEvents() {
            const G = globalThis;
            const Ctor = G.AbortController;
            if (Ctor === undefined) {
                this.ws.running = false;
                this.ws.error = '当前宿主缺少 AbortController，实时流无法建立。';
                return;
            }
            let backoff = WorkstationRemoteService.WS_BACKOFF_MIN_MS;
            while (this.ws.running) {
                const ctrl = new Ctor();
                this.ws.ctrl = ctrl;
                try {
                    const http = this.http;
                    if (http === null)
                        throw new Error('工位还没接服务端，实时更新不可用。');
                    const headers = {};
                    if (this.ws.lastSeq > 0)
                        headers['Last-Event-ID'] = String(this.ws.lastSeq);
                    for await (const frame of http.openSseStream('/events', headers, ctrl.signal)) {
                        this.ws.lastBeatAt = Date.now();
                        this.acceptFrame(frame);
                    }
                    if (this.ws.running)
                        this.ws.error = null;
                    backoff = WorkstationRemoteService.WS_BACKOFF_MIN_MS;
                }
                catch (e) {
                    if (!this.ws.running)
                        break;
                    const is401 = e instanceof KaipuHttpError && e.status === 401;
                    const isIdle = e instanceof KaipuHttpError && e.code === 'stream_idle_timeout';
                    if (isIdle) {
                        this.ws.error = null;
                        break;
                    }
                    if (is401) {
                        this.invalidateHttpToken();
                        this.ws.error = null;
                    }
                    else {
                        this.ws.error = e instanceof Error ? e.message : String(e);
                    }
                }
                if (!this.ws.running)
                    break;
                await sleepMs(Math.min(backoff, WorkstationRemoteService.WS_BACKOFF_MAX_MS));
                backoff = Math.min(backoff * 2, WorkstationRemoteService.WS_BACKOFF_MAX_MS);
            }
            this.ws.running = false;
            this.ws.ctrl = null;
        }
        invalidateHttpToken() {
            try {
                this.http?.invalidateToken();
            }
            catch {
            }
        }
        acceptFrame(frame) {
            const dataLine = frame
                .split('\n')
                .filter((l) => l.startsWith('data:'))
                .map((l) => l.slice(5).trimStart())
                .join('\n');
            if (dataLine.trim() === '')
                return;
            let obj;
            try {
                obj = JSON.parse(dataLine);
            }
            catch {
                return;
            }
            if (obj === null || typeof obj !== 'object')
                return;
            const ev = obj;
            const seq = typeof ev['seq'] === 'number' ? ev['seq'] : Number.NaN;
            if (!Number.isFinite(seq))
                return;
            if (this.ws.lastSeq > 0 && seq <= this.ws.lastSeq)
                return;
            this.ws.lastSeq = seq;
            this.ws.events.push({
                seq,
                type: typeof ev['type'] === 'string' ? ev['type'] : '',
                ts: typeof ev['ts'] === 'number' ? ev['ts'] : Date.now(),
                actor: typeof ev['actor'] === 'string' ? ev['actor'] : '',
                seat: typeof ev['seat'] === 'string' ? ev['seat'] : '',
                payload: ev['payload'] ?? null,
            });
            while (this.ws.events.length > WorkstationRemoteService.WS_EVENTS_KEEP) {
                this.ws.events.shift();
            }
        }
    };
})();
export { WorkstationRemoteService };
function resolveApproverId(query) {
    const id = typeof query.approverId === 'string' && query.approverId.length > 0
        ? query.approverId
        : typeof query.approver_id === 'string'
            ? query.approver_id
            : '';
    if (id.length === 0) {
        throw new KaipuHttpError(400, 'missing_approver_id', '审批缺 approverId —— 谁在批？');
    }
    return id;
}
function sleepMs(ms) {
    const g = globalThis;
    return new Promise((resolve) => {
        g.setTimeout?.(() => resolve(), ms) ?? resolve();
    });
}
function packBase(query) {
    const iid = typeof query.interactionId === 'string' ? query.interactionId : '';
    if (iid.length === 0) {
        throw new KaipuHttpError(400, 'missing_interaction_id', '缺交互 ID —— 资料在谁的位上？');
    }
    return `/packs/${encodeURIComponent(iid)}`;
}
function seatQuery(query) {
    const seat = typeof query.seat === 'string' ? query.seat.trim() : '';
    return seat.length > 0 ? `?seat=${encodeURIComponent(seat)}` : '';
}
function base64ToBytes(b64) {
    const raw = typeof b64 === 'string' ? b64.replace(/^data:[^,]*,/, '') : '';
    const g = globalThis;
    if (g.Buffer)
        return new Uint8Array(g.Buffer.from(raw, 'base64'));
    const bin = g.atob ? g.atob(raw) : '';
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1)
        out[i] = bin.charCodeAt(i);
    return out;
}
function bytesToBase64(bytes) {
    const g = globalThis;
    if (g.Buffer)
        return g.Buffer.from(bytes).toString('base64');
    let s = '';
    const CHUNK = 0x8000;
    for (let i = 0; i < bytes.length; i += CHUNK) {
        s += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + CHUNK)));
    }
    return g.btoa ? g.btoa(s) : '';
}
async function sha256Hex(bytes) {
    const c = globalThis
        .crypto;
    if (!c?.subtle) {
        throw new KaipuHttpError(0, 'no_crypto', '当前宿主没有 WebCrypto（需 Node 18+）—— 算不出摘要，不能上传。');
    }
    const buf = await c.subtle.digest('SHA-256', bytes);
    const arr = new Uint8Array(buf);
    let out = '';
    for (let i = 0; i < arr.length; i += 1)
        out += (arr[i] ?? 0).toString(16).padStart(2, '0');
    return out;
}
//# sourceMappingURL=service.js.map