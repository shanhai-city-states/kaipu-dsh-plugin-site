import { type ConnectionHandle } from './bridge.js';
export interface CatalogSkill {
    skillId: string;
    name: string;
    category: string;
    version: string;
    summary: string;
    detail: string;
    runtime: string;
    dataPolicy: string;
    pricing: {
        sku: string;
        freeQuota: number;
        paidPlan: string;
    };
    installed: boolean;
    installedInfo: {
        version?: string;
        status?: string;
        runCount?: number;
        lastRunAt?: string;
    } | null;
    canInstall: boolean;
    blockedReasons: string[];
    status: string;
}
export interface CatalogCategory {
    id: string;
    name: string;
    desc: string;
}
export interface InstalledSkill {
    skillId: string;
    name: string;
    version: string;
    status: string;
    runCount: number;
    lastRunAt: string;
    quota: SkillQuota | null;
    installedVia: string | null;
    installedAt: string;
}
export interface SkillQuota {
    freeQuota: number;
    freeUsed: number;
    freeLeft: number;
    paidRuns: number;
    totalLeft: number;
    exhausted: boolean;
}
export declare function setSkillsConnection(conn: ConnectionHandle | null): void;
export declare function skillsCatalog(): Promise<{
    skills: CatalogSkill[];
    categories: CatalogCategory[];
}>;
export declare function skillsInstalled(): Promise<InstalledSkill[]>;
export interface CreditState {
    credits: number;
    bonusCredits: number;
    giftCredits: number;
    paidCredits: number;
    dailyClaimAmount: number;
    claimedToday: boolean;
    canClaim: boolean;
}
export declare function creditsGet(): Promise<CreditState>;
export interface CreditRow {
    id: string;
    ts: string;
    dir: 'in' | 'out';
    kind: 'bonus' | 'gift' | 'paid';
    amount: number;
    remaining: number;
    reason: string;
    title: string;
    refId: string;
    expiresAt: string;
    expired: boolean;
    revoked: boolean;
}
export interface CreditLedger {
    credits: number;
    bonusCredits: number;
    giftCredits: number;
    paidCredits: number;
    rows: CreditRow[];
    nextBefore: string;
    hasMore: boolean;
}
export declare function creditsLedger(limit?: number, before?: string): Promise<CreditLedger>;
export declare function creditsClaim(): Promise<{
    ok: boolean;
    reason: string;
    amount: number;
    credits: number;
    bonusCredits: number;
    giftCredits: number;
    paidCredits: number;
    expiresAt: string;
}>;
//# sourceMappingURL=skills.d.ts.map