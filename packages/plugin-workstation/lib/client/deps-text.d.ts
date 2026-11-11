export interface DepItem {
    id: string;
    title: string;
    status: string;
}
export interface DepsLike {
    task_id: string;
    dependsOn: DepItem[];
    blocks: DepItem[];
    unmet: number;
    claimable: boolean;
}
export declare function depStatusLabel(status: string | undefined): string;
export declare function depLine(d: DepItem): string;
export declare function depsHeadline(d: DepsLike): string;
export declare function pickDepCandidates(selfId: string, all: Array<{
    task_id: string;
    title: string;
    status: string;
}>, deps: DepsLike): Array<{
    id: string;
    title: string;
}>;
export interface DeliverablesLike {
    task_id: string;
    versions: number[];
    count: number;
    finalVersion: number;
    items: Array<{
        id: string;
        version: number;
        is_final: number;
        filename: string;
    }>;
}
export declare function versionLine(dl: DeliverablesLike): string;
export declare function versionHint(dl: DeliverablesLike): string;
//# sourceMappingURL=deps-text.d.ts.map