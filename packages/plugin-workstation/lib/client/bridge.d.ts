export declare const REMOTE_NS = "kaipu-workstation";
export declare const REMOTE_CHANNEL = "/api";
export declare const CONNECTION_SERVICE = "connection";
export declare const ENDPOINTS: {
    readonly status: "status";
    readonly deviceCred: "deviceCred";
    readonly state: "state";
    readonly orgTree: "orgTree";
    readonly orgNodeCreate: "orgNodeCreate";
    readonly orgNodePatch: "orgNodePatch";
    readonly orgNodeDelete: "orgNodeDelete";
    readonly tasksCreate: "tasksCreate";
    readonly tasksList: "tasksList";
    readonly tasksClaim: "tasksClaim";
    readonly tasksDone: "tasksDone";
    readonly projectsList: "projectsList";
    readonly projectsCreate: "projectsCreate";
    readonly projectsRename: "projectsRename";
    readonly projectArchive: "projectArchive";
    readonly projectUnarchive: "projectUnarchive";
    readonly projectArchiveDownload: "projectArchiveDownload";
    readonly projectAuditRequest: "projectAuditRequest";
    readonly auditGet: "auditGet";
    readonly tasksStart: "tasksStart";
    readonly tasksHeartbeat: "tasksHeartbeat";
    readonly tasksBlock: "tasksBlock";
    readonly tasksUnblock: "tasksUnblock";
    readonly tasksAssign: "tasksAssign";
    readonly tasksDeps: "tasksDeps";
    readonly tasksDepsList: "tasksDepsList";
    readonly tasksDepsDelete: "tasksDepsDelete";
    readonly projectPhaseSet: "projectPhaseSet";
    readonly projectSuggestPhase: "projectSuggestPhase";
    readonly projectSuggestionsList: "projectSuggestionsList";
    readonly projectDecidePhase: "projectDecidePhase";
    readonly deliverablesList: "deliverablesList";
    readonly deliverablePromote: "deliverablePromote";
    readonly tasksApprove: "tasksApprove";
    readonly tasksReject: "tasksReject";
    readonly tasksBoard: "tasksBoard";
    readonly tasksBlocked: "tasksBlocked";
    readonly tasksPendingApprovals: "tasksPendingApprovals";
    readonly whoami: "whoami";
    readonly packsList: "packsList";
    readonly packUpload: "packUpload";
    readonly packDownload: "packDownload";
    readonly packDelete: "packDelete";
    readonly packJournal: "packJournal";
    readonly rolesSeats: "rolesSeats";
    readonly grantList: "grantList";
    readonly grantCreate: "grantCreate";
    readonly grantGenerate: "grantGenerate";
    readonly grantRevoke: "grantRevoke";
    readonly grantEvents: "grantEvents";
    readonly inviteCreate: "inviteCreate";
    readonly deviceJoinCodeCreate: "deviceJoinCodeCreate";
    readonly joinRequests: "joinRequests";
    readonly joinRequestGet: "joinRequestGet";
    readonly joinRequestCreate: "joinRequestCreate";
    readonly joinRequestApprove: "joinRequestApprove";
    readonly joinRequestReject: "joinRequestReject";
    readonly devicesList: "devicesList";
    readonly deviceRevoke: "deviceRevoke";
    readonly deviceResetSecret: "deviceResetSecret";
    readonly deviceJoinCodes: "deviceJoinCodes";
    readonly deviceJoinCodeRevoke: "deviceJoinCodeRevoke";
    readonly deviceJoinCodeRenew: "deviceJoinCodeRenew";
    readonly deviceEvents: "deviceEvents";
    readonly contextGet: "contextGet";
    readonly contextPut: "contextPut";
    readonly tenantRegions: "tenantRegions";
    readonly tenantShops: "tenantShops";
    readonly tenantNameRename: "tenantNameRename";
    readonly shopOpen: "shopOpen";
    readonly shopSwitch: "shopSwitch";
    readonly tenantDoorAssign: "tenantDoorAssign";
    readonly orgClearAgents: "orgClearAgents";
    readonly seatEvict: "seatEvict";
    readonly agentResetConnection: "agentResetConnection";
    readonly notifications: "notifications";
    readonly notificationsRead: "notificationsRead";
    readonly pluginVersion: "pluginVersion";
    readonly packExport: "packExport";
    readonly packsInteractions: "packsInteractions";
    readonly packPurge: "packPurge";
    readonly packPurgeCancel: "packPurgeCancel";
    readonly packPurgeStatus: "packPurgeStatus";
    readonly crmCustomers: "crmCustomers";
    readonly crmCustomerCreate: "crmCustomerCreate";
    readonly crmCustomerUpdate: "crmCustomerUpdate";
    readonly crmCustomerArchive: "crmCustomerArchive";
    readonly crmFollowups: "crmFollowups";
    readonly crmFunnel: "crmFunnel";
    readonly crmGuard: "crmGuard";
    readonly crmGuardCheck: "crmGuardCheck";
    readonly startEventStream: "startEventStream";
    readonly pollEvents: "pollEvents";
    readonly stopEventStream: "stopEventStream";
    readonly notesHealth: "notesHealth";
    readonly notesStats: "notesStats";
    readonly notesList: "notesList";
    readonly notesCreate: "notesCreate";
    readonly notesUpdate: "notesUpdate";
    readonly notesToggle: "notesToggle";
    readonly notesDelete: "notesDelete";
    readonly skillsList: "skillsList";
    readonly skillsCatalog: "skillsCatalog";
    readonly creditsGet: "creditsGet";
    readonly creditsClaim: "creditsClaim";
    readonly creditsLedger: "creditsLedger";
};
export type EndpointName = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];
export declare function endpointOf(method: EndpointName): string;
export interface ConnectionHandle {
    rpc?: {
        call(channel: string, endpoint: string, payload: unknown, signal?: unknown): Promise<unknown>;
    };
}
export interface ClientCtxLike {
    get?: (name: string) => unknown;
}
export declare function getConnection(ctx: ClientCtxLike): ConnectionHandle | null;
export interface BridgeError {
    kind: 'gateway' | 'unreachable';
    code: string;
    detail: string;
}
export interface BusinessErr {
    code: string;
    message: string;
}
export type BridgeResult<T> = {
    ok: true;
    data: T;
} | {
    ok: false;
    error: BridgeError;
} | {
    ok: false;
    business: BusinessErr;
};
export declare function callKaipu<T>(conn: ConnectionHandle, method: EndpointName, query: Record<string, unknown>, signal?: AbortSignal): Promise<BridgeResult<T>>;
//# sourceMappingURL=bridge.d.ts.map