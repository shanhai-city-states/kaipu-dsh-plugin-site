import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import type { GrantCodeIssued, GrantCreated, GrantEvent, GrantListPayload, JoinRequestCreated, JoinRequestListPayload, JoinRequestStatusPayload, RemoteResult, WorkstationState, WorkstationStatusPayload } from '@shanhai/kaipu-contract';
export declare const REMOTE_NS = "kaipu-workstation";
export interface WsEvent {
    seq: number;
    type: string;
    ts: number;
    actor: string;
    seat: string;
    payload: unknown;
}
export interface WsEventsHead {
    running: boolean;
    error: string | null;
    lastSeq: number;
    lastBeatAt: number;
    lagged: boolean;
}
export interface WsEventsPoll extends WsEventsHead {
    events: WsEvent[];
    next: number;
}
export interface CancelSignal {
    readonly aborted: boolean;
}
export interface EmptyQuery {
    [k: string]: never;
}
export interface OrgNodeCreateQuery {
    name: string;
    parentNodeId?: string;
    nodeKind?: string;
}
export interface OrgNodePatchQuery {
    nodeId: string;
    name?: string;
    parentNodeId?: string;
    bindSeat?: string;
    unbindSeat?: string;
}
export interface OrgNodeDeleteQuery {
    nodeId: string;
}
export interface OrgNode {
    node_id: string;
    account_id?: string;
    name: string;
    parent_node_id?: string | null;
    node_kind?: string;
    capabilities?: string;
    org_scope?: string;
    cross_scope?: number | string | null;
    created_at?: string;
    seq?: number;
    invited?: {
        lamp?: string;
        invitedName?: string;
        invitedAt?: string;
    } | null;
    holders?: {
        agentId?: string;
        name?: string;
        seat?: string;
        online?: boolean;
        onRoster?: boolean;
        hasCred?: boolean;
        joinState?: string;
    }[];
    seat_count?: number;
    child_count?: number;
    undeletable?: string | null;
}
export interface OrgEdge {
    edge_id: string;
    from_node_id: string;
    to_node_id: string;
    edge_kind?: string;
    created_at?: string;
}
export interface OrgTreePayload {
    nodes: OrgNode[];
    edges: OrgEdge[];
    org_ready: boolean;
}
export interface TaskCreateQuery {
    title: string;
    detail?: string;
    nodeId?: string;
    projectId?: string;
    interactionId?: string;
    notifyAgent?: string;
}
export interface ProjectRow {
    projectId: string;
    name: string;
    status: 'active' | 'archived' | string;
    createdAt: string;
    archivedAt?: string | null;
    taskCount?: number;
}
export interface ProjectsListPayload {
    projects: ProjectRow[];
}
export interface PackInteractionRow {
    interactionId: string;
    files: number;
    seats: number;
    lastAt: string;
    title?: string;
    projectName?: string;
    projectId?: string;
}
export interface TasksListQuery {
    status?: string;
    nodeId?: string;
    all?: boolean;
}
export interface DoorRegion {
    planet: string;
    country: string;
    region: string;
    label: string;
}
export interface ShopRow {
    accountId: string;
    name: string;
    shopNo: number;
    isPrimary: boolean;
    status: string;
    doorNo: number;
    doorLabel: string;
    plan: string;
    nameIsPlaceholder: boolean;
    role?: 'owner' | 'invitee';
    ownerName?: string;
    seat?: string;
    joinedAt?: string;
}
export interface ShopListPayload {
    ownerAccount: string;
    current: string;
    count: number;
    currentRole?: string;
    shops: ShopRow[];
}
export interface ShopOpenQuery {
    planet: string;
    country: string;
    region: string;
    name?: string;
}
export interface ShopRenameQuery {
    name: string;
}
export interface ShopRenameResult {
    name: string;
    previousName: string;
    changedAt: string;
    renameQuota: {
        limit: number;
        used: number;
        left: number;
        year: number;
    };
}
export interface ShopOpenResult {
    accountId: string;
    ownerAccount: string;
    shopNo: number;
    name: string;
    plan: string;
    status: string;
    doorNo: number;
    doorLabel: string;
    seatsProvisioned: boolean;
}
export interface DoorAssignQuery {
    planet: string;
    country: string;
    region: string;
}
export interface DoorAssignResult {
    accountId: string;
    doorNo: number;
    doorLabel: string;
    doorPlanet: string;
    doorCountry: string;
    doorRegion: string;
    newlyAssigned: boolean;
}
export interface TaskIdQuery {
    taskId: string;
}
export interface TaskDoneQuery {
    taskId: string;
    result?: string;
}
export interface TaskBlockQuery {
    taskId: string;
    reason: string;
}
export type TaskUnblockQuery = TaskIdQuery;
export interface TaskAssignQuery {
    taskId: string;
    agentId?: string;
    agent_id?: string;
}
export interface TaskDepsQuery {
    taskId: string;
    dependsOnTaskId?: string;
    depends_on_task_id?: string;
}
export interface TaskApproveQuery {
    taskId: string;
    approverId?: string;
    approver_id?: string;
    comment?: string;
}
export type TaskRejectQuery = TaskApproveQuery;
export type TaskStatusNine = 'posted' | 'claimed' | 'in_progress' | 'blocked' | 'submitted' | 'accepted' | 'rejected' | 'done' | 'cancelled';
export interface TaskBoardItem extends Omit<TaskRow, 'status'> {
    status: TaskStatusNine;
    stale?: boolean;
    age_days?: number;
}
export interface TaskBoardPayload {
    groups: Record<string, TaskBoardItem[]>;
    counts: Record<string, number>;
    total: number;
    stale_count?: number;
}
export interface WhoamiPayload {
    accountId: string;
}
export interface TaskRow {
    task_id: string;
    title: string;
    detail?: string;
    status: 'open' | 'claimed' | 'done' | 'cancelled';
    created_by: string;
    claimed_by?: string | null;
    node_id?: string | null;
    created_at: string;
    claimed_at?: string | null;
    done_at?: string | null;
    result?: string | null;
}
export interface JoinCodeRow {
    codeHash: string;
    note?: string;
    seat?: string;
    invitedName?: string;
    state: string;
    createdAt: string;
    expiresAt: string;
    usedAt?: string | null;
    usedBy?: string;
    revokedAt?: string | null;
    batchId?: string;
}
export interface PackRefQuery {
    interactionId: string;
    seat?: string;
}
export interface PackUploadQuery extends PackRefQuery {
    filename: string;
    contentBase64: string;
}
export interface PackFileRefQuery extends PackRefQuery {
    filename: string;
}
export interface PackFileItem {
    filename: string;
    seat?: string;
    size?: number;
    sha256?: string;
    createdAt?: string;
    [k: string]: unknown;
}
export interface PackListPayload {
    count: number;
    files: PackFileItem[];
}
export interface PackDownloadPayload {
    filename: string;
    contentType: string;
    contentBase64: string;
    size: number;
}
export interface WorkstationContext {
    interactionId: string;
    seat: string;
    note: string;
    project: string;
    shopName: string;
    onboardSeen: boolean;
    updatedAt: string;
}
export interface WorkstationContextWrite {
    interactionId?: string;
    seat?: string;
    note?: string;
    project?: string;
    shopName?: string;
    onboardSeen?: boolean;
}
export interface RolesSeat {
    seat: string;
    label: string;
    holder: {
        type: string;
        id: string;
        name: string;
    };
    replaceable: boolean;
}
export interface RolesSeatsPayload {
    seats: RolesSeat[];
    accountId: string;
}
export interface InviteCreateQuery {
    lamp: string;
    seat?: string;
    note?: string;
    ttlDays?: number;
}
export interface InviteCreated {
    code: string;
    url?: string;
    path?: string;
    lamp: string;
    expiresAt: string;
    ttlDays?: number;
    createdAt?: string;
}
export interface PackJournalPayload {
    interactionId: string;
    seat?: string;
    lines: Record<string, unknown>[];
    ok: boolean;
    brokenAtSeq: number | null;
    anchorOk?: boolean;
    appendOnly?: boolean;
}
export interface TasksListPayload {
    tasks: TaskRow[];
    counts: {
        open: number;
        claimed: number;
        done: number;
        cancelled: number;
    };
}
export declare function installErrorBoundary(target: object): void;
export declare class WorkstationRemoteService extends TypertRemoteService {
    private readonly http;
    constructor(ctx: unknown, _cfg?: Record<string, unknown>);
    private requireHttp;
    status(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<WorkstationStatusPayload>>;
    deviceCred(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<{
        deviceId: string;
        deviceSecret: string;
    } | null>>;
    state(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<WorkstationState>>;
    orgTree(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<OrgTreePayload>>;
    orgNodeCreate(query: OrgNodeCreateQuery, signal?: CancelSignal): Promise<RemoteResult<OrgNode>>;
    orgNodePatch(query: OrgNodePatchQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    orgNodeDelete(query: OrgNodeDeleteQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    tasksCreate(query: TaskCreateQuery, signal?: CancelSignal): Promise<RemoteResult<TaskRow>>;
    tasksList(query: TasksListQuery, signal?: CancelSignal): Promise<RemoteResult<TasksListPayload>>;
    tasksClaim(query: TaskIdQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    projectsList(query: Record<string, never>, signal?: CancelSignal): Promise<RemoteResult<ProjectsListPayload>>;
    projectsCreate(query: {
        name: string;
    }, signal?: CancelSignal): Promise<RemoteResult<ProjectRow>>;
    projectsRename(query: {
        projectId: string;
        name: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        projectId: string;
        name: string;
    }>>;
    projectPhaseSet(query: {
        projectId: string;
        phase: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        projectId: string;
        phase: string;
        from?: string;
        changed: boolean;
    }>>;
    projectSuggestPhase(query: {
        projectId: string;
        toPhase: string;
        reason?: string;
        idempotencyKey: string;
        expectedVersion: number;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        suggestionId: string;
        fromPhase: string;
        toPhase: string;
        expectedVersion: number;
        currentVersion: number;
        stale: boolean;
        precheck: Array<Record<string, string>>;
        precheckStatus: string;
        duplicate?: boolean;
    }>>;
    projectSuggestionsList(query: {
        projectId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        projectId: string;
        currentPhase: string;
        currentVersion: number;
        suggestions: Array<Record<string, unknown>>;
    }>>;
    projectDecidePhase(query: {
        projectId: string;
        suggestionId: string;
        verdict: 'approve' | 'reject';
        reasonCode?: string;
        reasonText?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        ok: boolean;
        verdict: string;
        suggestionId: string;
        decisionId: string;
        phase: string;
        version: number;
    }>>;
    tasksDepsList(query: {
        taskId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        task_id: string;
        dependsOn: Array<{
            id: string;
            title: string;
            status: string;
        }>;
        blocks: Array<{
            id: string;
            title: string;
            status: string;
        }>;
        unmet: number;
        claimable: boolean;
    }>>;
    tasksDepsDelete(query: {
        taskId: string;
        dependsOnTaskId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        task_id: string;
        depends_on_task_id: string;
        removed: boolean;
    }>>;
    deliverablesList(query: {
        taskId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        task_id: string;
        versions: number[];
        count: number;
        finalVersion: number;
        items: Array<{
            id: string;
            version: number;
            is_final: number;
            filename: string;
            size: number;
            sha256: string;
            interaction_id: string;
            created_at: string;
        }>;
    }>>;
    deliverablePromote(query: {
        taskId: string;
        deliverableId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        task_id: string;
        deliverable_id: string;
        version: number;
        is_final: boolean;
    }>>;
    projectUnarchive(query: {
        projectId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        projectId: string;
        status: string;
    }>>;
    projectArchiveDownload(query: {
        projectId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        filename: string;
        bytes: number;
        sha256: string;
        stale?: boolean;
        staleSince?: string;
        dataBase64: string;
    }>>;
    projectArchive(query: {
        projectId: string;
        force?: boolean;
    }, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    tasksDone(query: TaskDoneQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    tasksStart(query: TaskIdQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    tasksHeartbeat(query: TaskIdQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    tasksBlock(query: TaskBlockQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    projectAuditRequest(query: {
        projectId: string;
        package?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    auditGet(query: {
        auditId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    tasksUnblock(query: TaskUnblockQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    tasksAssign(query: TaskAssignQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    tasksDeps(query: TaskDepsQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    tasksApprove(query: TaskApproveQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    tasksReject(query: TaskRejectQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    tasksBoard(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<TaskBoardPayload>>;
    tasksBlocked(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    tasksPendingApprovals(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    whoami(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<WhoamiPayload>>;
    packsList(query: PackRefQuery, signal?: CancelSignal): Promise<RemoteResult<PackListPayload>>;
    packUpload(query: PackUploadQuery, signal?: CancelSignal): Promise<RemoteResult<PackFileItem>>;
    notifications(query: Record<string, never>, signal?: CancelSignal): Promise<RemoteResult<{
        items: Array<{
            kind: string;
            taskId: string;
            title: string;
            at: string;
            text: string;
            unread: boolean;
            projectId?: string;
            projectName?: string;
        }>;
        unread: number;
        total: number;
        seenAt: string;
    }>>;
    notificationsRead(query: Record<string, never>, signal?: CancelSignal): Promise<RemoteResult<{
        seen: boolean;
    }>>;
    pluginVersion(query: {
        current: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        current: string | null;
        latest: string | null;
        updateAvailable: boolean;
        notes: string;
    }>>;
    packsInteractions(query: Record<string, never>, signal?: CancelSignal): Promise<RemoteResult<{
        interactions: PackInteractionRow[];
    }>>;
    packExport(query: {
        interactionId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        filename: string;
        dataBase64: string;
        files: number;
        bytes: number;
    }>>;
    packPurge(query: {
        interactionId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        interactionId: string;
        deleteAfter: string;
    }>>;
    packPurgeCancel(query: {
        interactionId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        interactionId: string;
        cancelled: boolean;
    }>>;
    packPurgeStatus(query: {
        interactionId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        interactionId: string;
        pending: boolean;
        deleteAfter: string | null;
    }>>;
    crmCustomers(query: {
        q?: string;
        limit?: number;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        items: Record<string, unknown>[];
        total: number;
    }>>;
    crmCustomerCreate(query: {
        name: string;
        taxId?: string;
        phone?: string;
        source?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        customer: Record<string, unknown>;
    }>>;
    crmCustomerUpdate(query: {
        customerId: string;
        name?: string;
        taxId?: string;
        phone?: string;
        source?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        customer: Record<string, unknown>;
    }>>;
    crmCustomerArchive(query: {
        customerId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        archived: boolean;
    }>>;
    crmFollowups(query: {
        customerId: string;
        note?: string;
        channel?: string;
        evidenceCount?: number;
        taskId?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    crmFunnel(query: Record<string, never>, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    crmGuard(query: Record<string, never>, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    crmGuardCheck(query: {
        action: string;
    }, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    notesHealth(query: Record<string, never>, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    notesStats(query: Record<string, never>, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    skillsList(query: {
        status?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        count: number;
        skills: Record<string, unknown>[];
    }>>;
    skillsCatalog(query: Record<string, never>, signal?: CancelSignal): Promise<RemoteResult<{
        count: number;
        categories: Record<string, unknown>[];
        skills: Record<string, unknown>[];
    }>>;
    creditsGet(query: Record<string, unknown>, signal?: CancelSignal): Promise<RemoteResult<{
        credits: number;
        bonusCredits: number;
        giftCredits: number;
        paidCredits: number;
        dailyClaimAmount: number;
        claimedToday: boolean;
        canClaim: boolean;
    }>>;
    creditsLedger(body: Record<string, unknown>, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    creditsClaim(body: Record<string, unknown>, signal?: CancelSignal): Promise<RemoteResult<{
        ok: boolean;
        reason: string;
        amount: number;
        credits: number;
        bonusCredits: number;
        giftCredits: number;
        paidCredits: number;
        expiresAt: string;
    }>>;
    notesList(query: {
        status?: string;
        priority?: string;
        q?: string;
        dueBefore?: string;
        limit?: number;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        items: Record<string, unknown>[];
        total: number;
    }>>;
    notesCreate(query: {
        title: string;
        detail?: string;
        dueAt?: string;
        remindAt?: string;
        priority?: string;
        tags?: string[];
    }, signal?: CancelSignal): Promise<RemoteResult<{
        note: Record<string, unknown>;
    }>>;
    notesUpdate(query: {
        noteId: string;
    } & Record<string, unknown>, signal?: CancelSignal): Promise<RemoteResult<{
        note: Record<string, unknown>;
    }>>;
    notesToggle(query: {
        noteId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        note: Record<string, unknown>;
    }>>;
    notesDelete(query: {
        noteId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        deleted: boolean;
    }>>;
    packDownload(query: PackFileRefQuery, signal?: CancelSignal): Promise<RemoteResult<PackDownloadPayload>>;
    packDelete(query: PackFileRefQuery, signal?: CancelSignal): Promise<RemoteResult<Record<string, unknown>>>;
    rolesSeats(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<RolesSeatsPayload>>;
    grantList(query: {
        status?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<GrantListPayload>>;
    grantCreate(query: {
        granteeId: string;
        ttlHours: number;
        name?: string;
        note?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<GrantCreated>>;
    grantGenerate(query: {
        ttlHours: number;
        note?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<GrantCodeIssued>>;
    grantRevoke(query: {
        grantId: string;
        reason?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        grantId: string;
        status: string;
        revokedAt: string;
    }>>;
    grantEvents(query: {
        grantId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        grantId: string;
        events: GrantEvent[];
    }>>;
    contextGet(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<WorkstationContext>>;
    contextPut(query: WorkstationContextWrite, signal?: CancelSignal): Promise<RemoteResult<WorkstationContext>>;
    tenantRegions(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<{
        regions: DoorRegion[];
    }>>;
    tenantShops(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<ShopListPayload>>;
    tenantNameRename(query: ShopRenameQuery, signal?: CancelSignal): Promise<RemoteResult<ShopRenameResult>>;
    shopOpen(query: ShopOpenQuery, signal?: CancelSignal): Promise<RemoteResult<ShopOpenResult>>;
    shopSwitch(query: {
        accountId: string | null;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        accountId: string | null;
    }>>;
    tenantDoorAssign(query: DoorAssignQuery, signal?: CancelSignal): Promise<RemoteResult<DoorAssignResult>>;
    agentResetConnection(query: {
        agentId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        agentId: string;
        pendingSecret: boolean;
        graceHours: number;
        message: string;
    }>>;
    seatEvict(query: {
        seat: string;
        agentId?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        seat: string;
        evicted: {
            agentId: string;
            name: string;
        };
    }>>;
    orgClearAgents(query: {
        confirm: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        cleared: number;
        agents: Array<{
            agentId: string;
            name: string;
            seat: string;
        }>;
    }>>;
    deviceResetSecret(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<{
        deviceId: string;
        deviceSecret: string;
        expiresAt?: string;
    }>>;
    deviceJoinCodeCreate(query: {
        note?: string;
        ttlHours?: number;
        count?: number;
        seat?: string;
        invitedName?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        code: string;
        accountId: string;
        expiresAt: string;
        ttlHours: number;
        howTo?: string;
        codes?: {
            code: string;
            codeHash: string;
            expiresAt: string;
        }[];
    }>>;
    deviceJoinCodes(query: {
        state?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        codes: JoinCodeRow[];
        count?: number;
    }>>;
    deviceJoinCodeRevoke(query: {
        codeHash: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        codeHash: string;
        state: string;
    }>>;
    deviceJoinCodeRenew(query: {
        codeHash: string;
        ttlHours?: number;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        codeHash: string;
        state: string;
        expiresAt: string;
    }>>;
    joinRequests(query: {
        status?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<JoinRequestListPayload>>;
    joinRequestGet(query: {
        requestId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<JoinRequestStatusPayload>>;
    joinRequestCreate(query: {
        accountId: string;
        applicantKind: string;
        applicantId: string;
        joinCode?: string;
        applicantName?: string;
        nodeId?: string;
        seat?: string;
        reason?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<JoinRequestCreated>>;
    joinRequestApprove(query: {
        requestId: string;
    }, signal?: CancelSignal): Promise<RemoteResult<JoinRequestStatusPayload>>;
    joinRequestReject(query: {
        requestId: string;
        reason?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        requestId: string;
        status: string;
    }>>;
    devicesList(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<{
        items: Array<{
            deviceId: string;
            fpHash8: string;
            fpHash: string;
            status: string;
            clientVersion: string;
            firstSeen: string | null;
            lastSeen: string | null;
            issueCount: number;
        }>;
        count: number;
        activeCount: number;
    }>>;
    deviceRevoke(query: {
        fpHash: string;
        revoked?: boolean;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        fpHash8: string;
        status: string;
    }>>;
    deviceEvents(query: {
        limit?: number;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        items: Array<{
            id: number;
            fpHash8: string;
            event: string;
            note: string;
            at: string;
        }>;
        count: number;
    }>>;
    inviteCreate(query: InviteCreateQuery, signal?: CancelSignal): Promise<RemoteResult<InviteCreated>>;
    packJournal(query: PackRefQuery, signal?: CancelSignal): Promise<RemoteResult<PackJournalPayload>>;
    private static readonly WS_EVENTS_KEEP;
    private static readonly WS_BACKOFF_MIN_MS;
    private static readonly WS_BACKOFF_MAX_MS;
    private readonly ws;
    startEventStream(query: {
        types?: string[];
    }, signal?: CancelSignal): Promise<RemoteResult<WsEventsHead>>;
    pollEvents(query: {
        from?: number;
    }, signal?: CancelSignal): Promise<RemoteResult<WsEventsPoll>>;
    stopEventStream(query: {
        reason?: string;
    }, signal?: CancelSignal): Promise<RemoteResult<{
        stopped: boolean;
    }>>;
    private wsHead;
    private stopEventPump;
    private pumpEvents;
    private invalidateHttpToken;
    private acceptFrame;
}
//# sourceMappingURL=service.d.ts.map