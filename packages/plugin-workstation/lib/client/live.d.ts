import type { Invite, Member, Seat, SourceKind, WorkstationState } from '@shanhai/kaipu-contract';
import { type ConnectionHandle } from './bridge.js';
export type { SourceKind } from '@shanhai/kaipu-contract';
export declare function setConnection(conn: ConnectionHandle | null): void;
export declare function hasConnection(): boolean;
export declare function getConnection(): ConnectionHandle | null;
export interface WorkstationSnapshot {
    kind: SourceKind;
    label: string;
    reason: string | null;
    state: WorkstationState | null;
    server: {
        baseUrl: string;
        accountId: string;
    } | null;
}
export declare function loadWorkstationState(signal?: AbortSignal): Promise<WorkstationSnapshot>;
export interface OrgNodeView {
    node_id: string;
    name: string;
    parent_node_id?: string | null;
    node_kind?: string;
    capabilities?: string;
    created_at?: string;
    seat_count?: number;
    child_count?: number;
    origin?: string;
    seq?: number;
    holders?: Array<{
        agentId: string;
        name: string;
        seat: string;
        seatLabel?: string;
        online?: boolean;
        lastSeen?: string | null;
        joinState?: string;
        onRoster?: boolean;
        hasCred?: boolean;
    }>;
    invited?: {
        lamp?: string;
        invitedName?: string;
        invitedAt?: string;
        expiresAt?: string;
        url?: string;
    } | null;
    undeletable?: string | null;
    renameable?: boolean;
    seatKey?: string;
}
export interface OrgTreeView {
    nodes: OrgNodeView[];
    edges: Array<{
        edge_id: string;
        from_node_id: string;
        to_node_id: string;
        edge_kind?: string;
    }>;
    org_ready: boolean;
}
export type OrgResult<T> = {
    ok: true;
    data: T;
} | {
    ok: false;
    code: string;
    message: string;
};
export declare function loadOrgTree(signal?: AbortSignal): Promise<OrgResult<OrgTreeView>>;
export declare function createOrgNode(name: string, parentNodeId?: string): Promise<OrgResult<OrgNodeView>>;
export declare function resetAgentKey(agentId: string): Promise<OrgResult<{
    agentId: string;
    pendingSecret: boolean;
    graceHours: number;
    message: string;
}>>;
export declare function evictSeat(seat: string, agentId?: string): Promise<OrgResult<{
    seat: string;
    evicted: {
        agentId: string;
        name: string;
    };
}>>;
export declare function loadNotifications(): Promise<OrgResult<{
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
export declare function markNotificationsRead(): Promise<OrgResult<{
    seen: boolean;
}>>;
export declare function checkPluginVersion(current: string): Promise<OrgResult<{
    current: string | null;
    latest: string | null;
    updateAvailable: boolean;
    notes: string;
}>>;
export declare function exportPack(interactionId: string): Promise<OrgResult<{
    filename: string;
    dataBase64: string;
    files: number;
    bytes: number;
}>>;
export declare function loadPackInteractions(): Promise<OrgResult<{
    interactions: Array<{
        interactionId: string;
        files: number;
        seats: number;
        lastAt: string;
    }>;
}>>;
export declare function purgePack(interactionId: string): Promise<OrgResult<{
    interactionId: string;
    deleteAfter: string;
}>>;
export declare function cancelPurge(interactionId: string): Promise<OrgResult<{
    interactionId: string;
    cancelled: boolean;
}>>;
export declare function purgeStatus(interactionId: string): Promise<OrgResult<{
    interactionId: string;
    pending: boolean;
    deleteAfter: string | null;
}>>;
export declare function clearAgents(): Promise<OrgResult<{
    cleared: number;
    agents: Array<{
        agentId: string;
        name: string;
        seat: string;
    }>;
}>>;
export declare function renameOrgNode(nodeId: string, name: string): Promise<OrgResult<unknown>>;
export declare function deleteOrgNode(nodeId: string): Promise<OrgResult<unknown>>;
export interface TaskItem {
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
    interactionId?: string;
    fileCount?: number;
    projectId?: string | null;
    createdByName?: string;
    kind?: 'requirement' | 'delivery' | 'report' | 'test' | 'other';
    tags?: string[];
}
export interface TaskGroups {
    byKind: Record<string, TaskGroupBrief[]>;
    byStatus: Record<string, TaskGroupBrief[]>;
    kindCounts: Record<string, number>;
    statusCounts: Record<string, number>;
}
export interface TaskListResult {
    tasks: TaskItem[];
    counts: {
        open: number;
        claimed: number;
        done: number;
        cancelled: number;
    };
    groups?: TaskGroups | null;
    total?: number;
    limit?: number | null;
    offset?: number;
}
export interface TaskGroupBrief {
    taskId: string;
    title: string;
    status: string;
    kind?: string;
    tags?: string[];
    projectId?: string | null;
    createdAt?: string;
    createdByName?: string;
    fileCount?: number;
}
export declare function loadTasks(all: boolean, page?: {
    limit?: number;
    offset?: number;
}): Promise<OrgResult<TaskListResult>>;
export declare function createTask(title: string, detail: string, projectId?: string, interactionId?: string, kind?: string, notifyAgent?: string, nodeId?: string): Promise<OrgResult<TaskItem>>;
export interface ProjectItem {
    projectId: string;
    name: string;
    status: string;
    createdAt: string;
    archivedAt?: string | null;
    taskCount?: number;
    phase?: string;
    phaseLabel?: string;
}
export declare function loadProjects(): Promise<OrgResult<{
    projects: ProjectItem[];
}>>;
export declare function createProject(name: string): Promise<OrgResult<ProjectItem>>;
export declare function renameProject(projectId: string, name: string): Promise<OrgResult<{
    projectId: string;
    name: string;
}>>;
export declare function setProjectPhase(projectId: string, phase: string): Promise<OrgResult<{
    projectId: string;
    phase: string;
    from?: string;
    changed: boolean;
}>>;
export interface PhaseSuggestion {
    suggestionId: string;
    fromPhase: string;
    toPhase: string;
    reason: string;
    suggesterKind: string;
    suggesterId: string;
    precheckStatus: string;
    precheckReasons: Array<{
        code: string;
        remediation?: string;
        ruleVersion?: string;
    }>;
    evidenceSnapshot: Record<string, unknown>;
    createdAt: string;
    verdict: string | null;
    reasonCode: string;
    reasonText: string;
    decidedAt: string | null;
    pending: boolean;
    stale: boolean;
}
export interface PhaseSuggestionsPayload {
    projectId: string;
    currentPhase: string;
    currentVersion: number;
    suggestions: PhaseSuggestion[];
}
export declare function suggestProjectPhase(projectId: string, toPhase: string, reason: string, expectedVersion: number): Promise<OrgResult<{
    suggestionId: string;
    stale: boolean;
    precheckStatus: string;
    precheck: Array<Record<string, string>>;
}>>;
export declare function loadPhaseSuggestions(projectId: string): Promise<OrgResult<PhaseSuggestionsPayload>>;
export declare function decideProjectPhase(projectId: string, suggestionId: string, verdict: 'approve' | 'reject', reasonCode?: string, reasonText?: string): Promise<OrgResult<{
    verdict: string;
    phase: string;
    version: number;
}>>;
export interface TaskDepItem {
    id: string;
    title: string;
    status: string;
}
export interface TaskDepsPayload {
    task_id: string;
    dependsOn: TaskDepItem[];
    blocks: TaskDepItem[];
    unmet: number;
    claimable: boolean;
}
export declare function loadTaskDeps(taskId: string): Promise<OrgResult<TaskDepsPayload>>;
export declare function addTaskDep(taskId: string, dependsOnTaskId: string): Promise<OrgResult<Record<string, unknown>>>;
export declare function removeTaskDep(taskId: string, dependsOnTaskId: string): Promise<OrgResult<{
    removed: boolean;
}>>;
export interface DeliverableItem {
    id: string;
    version: number;
    is_final: number;
    filename: string;
    size: number;
    sha256: string;
    interaction_id: string;
    created_at: string;
}
export interface DeliverablesPayload {
    task_id: string;
    versions: number[];
    count: number;
    finalVersion: number;
    items: DeliverableItem[];
}
export declare function loadDeliverables(taskId: string): Promise<OrgResult<DeliverablesPayload>>;
export declare function promoteDeliverable(taskId: string, deliverableId: string): Promise<OrgResult<{
    version: number;
}>>;
export declare function unarchiveProject(projectId: string): Promise<OrgResult<{
    projectId: string;
    status: string;
}>>;
export declare function downloadProjectArchive(projectId: string): Promise<OrgResult<{
    filename: string;
    bytes: number;
    sha256: string;
    stale?: boolean;
    staleSince?: string;
    dataBase64: string;
}>>;
export declare function archiveProject(projectId: string, force?: boolean): Promise<OrgResult<Record<string, unknown>>>;
export declare function claimTask(taskId: string): Promise<OrgResult<unknown>>;
export declare function finishTask(taskId: string, result: string): Promise<OrgResult<unknown>>;
export declare function seatText(seat: Seat): string;
export declare function inviteExpired(invite: Invite, now: string): boolean;
export declare function splitMembers(state: WorkstationState): {
    humans: Member[];
    agents: Member[];
};
export declare function summarizeSeats(state: WorkstationState): {
    occupied: number;
    vacant: number;
    awayButActive: number;
    removed: number;
};
//# sourceMappingURL=live.d.ts.map