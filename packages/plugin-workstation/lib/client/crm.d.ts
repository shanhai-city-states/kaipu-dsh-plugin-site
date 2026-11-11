import { type ConnectionHandle } from './bridge.js';
import type { OrgResult } from './live.js';
export interface CrmCustomer {
    customer_id: string;
    account_id: string;
    name: string;
    tax_id: string;
    phone: string;
    source: string;
    status: 'active' | 'suspended' | 'archived';
    created_by: string;
    created_at: string;
    updated_at: string;
}
export interface CrmFollowup {
    followup_id: string;
    customer_id: string;
    channel: 'phone' | 'visit' | 'wechat' | 'email' | 'other';
    note: string;
    evidence_count: number;
    created_by: string;
    is_evidenced: number;
    task_id: string;
    created_at: string;
}
export type CrmStage = 'lead' | 'following' | 'pending_approval' | 'won' | 'stalled';
export interface CrmFunnelRow {
    customerId: string;
    name: string;
    stage: CrmStage;
    stageLabel: string;
    lastActivity: string;
    taskCount: number;
    followupCount: number;
    evidencedCount: number;
    lastFollowupAt: string;
    linked: boolean;
}
export interface CrmFunnel {
    ready: boolean;
    reason: string | null;
    stages: Record<CrmStage, number>;
    items: CrmFunnelRow[];
    totals: {
        customers: number;
        linked: number;
        stagesSum: number;
    };
}
export interface CrmIrreversibleAction {
    action: string;
    label: string;
    why: string;
}
export interface CrmGuardInfo {
    agentCount: number;
    mode: 'confirm' | 'approval';
    wording: string;
    actions: CrmIrreversibleAction[];
    note: string;
}
export declare function setCrmConnection(conn: ConnectionHandle | null): void;
export declare function loadCustomers(opts?: {
    q?: string;
    limit?: number;
}): Promise<OrgResult<{
    items: CrmCustomer[];
    total: number;
}>>;
export declare function createCustomer(input: {
    name: string;
    taxId?: string;
    phone?: string;
    source?: string;
}): Promise<OrgResult<CrmCustomer>>;
export declare function updateCustomer(customerId: string, patch: {
    name?: string;
    taxId?: string;
    phone?: string;
    source?: string;
}): Promise<OrgResult<CrmCustomer>>;
export declare function archiveCustomer(customerId: string): Promise<OrgResult<{
    archived: boolean;
}>>;
export declare function loadFollowups(customerId: string): Promise<OrgResult<{
    items: CrmFollowup[];
    stats: {
        followup_count: number;
        evidenced_count: number;
        last_followup_at: string;
    };
}>>;
export declare function addFollowup(customerId: string, input: {
    note: string;
    channel?: string;
    evidenceCount?: number;
    taskId?: string;
}): Promise<OrgResult<CrmFollowup>>;
export declare function loadFunnel(): Promise<OrgResult<CrmFunnel>>;
export declare function loadGuardInfo(): Promise<OrgResult<CrmGuardInfo>>;
export declare function precheckIrreversible(action: string): Promise<OrgResult<{
    allowed: boolean;
    mode?: string;
    wording?: string;
    needsConfirm?: boolean;
    irreversible?: boolean;
    label?: string;
    why?: string;
}>>;
//# sourceMappingURL=crm.d.ts.map