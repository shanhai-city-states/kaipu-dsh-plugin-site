export declare const PROJECT_PHASES: ReadonlyArray<string>;
export declare function phaseIndex(phase: string | undefined): number;
export declare function phaseLabel(phase: string | undefined, serverLabel?: string | undefined): string;
export declare function phaseHint(phase: string | undefined): string;
export declare function phaseBar(phase: string | undefined): string;
export declare function nextPhase(phase: string | undefined): string | null;
export declare function prevPhase(phase: string | undefined): string | null;
export declare function isArchivedPhase(phase: string | undefined): boolean;
//# sourceMappingURL=project-phase.d.ts.map