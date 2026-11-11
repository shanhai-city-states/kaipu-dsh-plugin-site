export interface InstallPitchInput {
    name: string;
    skillId: string;
    summary: string;
    shopName?: string | undefined;
    installed?: boolean;
    installedVersion?: string;
}
export declare function buildInstallPitch(input: InstallPitchInput): string;
export declare function blockedReasonText(reasons: readonly string[]): string;
//# sourceMappingURL=skill-pitch.d.ts.map