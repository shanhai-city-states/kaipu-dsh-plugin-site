export interface JoinCodeRowLike {
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
export declare const PENDING_LIMIT = 3;
export declare const CODE_STORE_PREFIX = "kaipu.joinCode.plain.";
export declare function plainStoreKey(hash: string): string;
export declare function sha256Hex(input: string): string;
export declare function codeHashOf(plain: string): string;
export declare function stateLabel(state: string): string;
export declare function isActionable(state: string): boolean;
export declare function remainingText(expiresAt: string, nowMs: number): string;
export declare function codeTextOf(hash: string, plain: string): string;
export declare function usedByText(row: JoinCodeRowLike): string;
export declare function pendingCount(rows: JoinCodeRowLike[]): number;
export declare function canCreateMore(pending: number): boolean;
export declare function createBlockedTip(pending: number): string;
export declare function batchChoices(pending: number): number[];
export declare function staleHashes(rows: JoinCodeRowLike[], hasPlain: (hash: string) => boolean, nowMs: number): string[];
export declare function humanizeCodeError(code: string, message: string, pending?: number): string;
export interface CodeRowView {
    codeText: string;
    stateText: string;
    remainText: string;
    actionable: boolean;
    usedByText: string;
    plainLocal: boolean;
}
export declare function codeRowView(row: JoinCodeRowLike, plain: string, nowMs: number): CodeRowView;
export declare function emptyListText(owner: boolean): string;
//# sourceMappingURL=invite-code.d.ts.map