export declare function granteeLabel(name?: string | null, id?: string | null): string;
export declare function granteeUnknown(name?: string | null): boolean;
export declare function grantCopyText(code: string, ttlHours: number, codeExpiresAt: string): string;
export declare function codeDaysLeft(codeExpiresAt: string | undefined, nowMs?: number): number | null;
export declare function codeLeftText(codeExpiresAt: string | undefined, nowMs?: number): string;
//# sourceMappingURL=grant-copy.d.ts.map