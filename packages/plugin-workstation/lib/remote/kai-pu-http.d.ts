interface AbortSignalLike {
    readonly aborted: boolean;
}
export interface KaipuErrorBody {
    error?: string | {
        code?: string;
        message?: string;
        detail?: string;
    };
    message?: string;
    code?: string;
    detail?: string;
}
export declare function readApiError(res: {
    status: number;
}, parsed: unknown): {
    code: string;
    message: string;
};
export declare class KaipuHttpError extends Error {
    readonly status: number;
    readonly code: string;
    readonly details: Record<string, unknown> | undefined;
    constructor(status: number, code: string, message: string, details?: Record<string, unknown>);
}
export interface KaipuHttpOptions {
    baseUrl: string;
    fingerprint?: string;
    clientVersion?: string;
}
export declare class KaipuHttpClient {
    private readonly baseUrl;
    private readonly fingerprint;
    private readonly clientVersion;
    resetDeviceSecret(signal?: unknown): Promise<{
        deviceId: string;
        deviceSecret: string;
        expiresAt?: string;
    }>;
    private token;
    private accountId;
    private expiresAt;
    private shopOverride;
    switchShop(accountId: string | null): void;
    currentShopOverride(): string | null;
    constructor(opts: KaipuHttpOptions);
    describe(): {
        baseUrl: string;
        accountId: string | null;
        hasToken: boolean;
    };
    fingerprintHint(): string;
    requestProjectAudit(projectId: string, pkg?: 'light' | 'standard' | 'deep'): Promise<{
        id: string;
        status: string;
        reused?: boolean;
        project_name?: string;
    }>;
    getAudit(id: string): Promise<{
        id: string;
        status: string;
        package: string;
        project_id: string;
        created_at: string;
        finished_at: string;
        report: AuditReportLike | null;
    }>;
    identify(signal?: AbortSignalLike): Promise<string>;
    private ensureToken;
    invalidateToken(): void;
    openSseStream(path: string, headers: Record<string, string>, signal?: AbortSignalLike): AsyncGenerator<string>;
    call<T>(method: 'GET' | 'POST' | 'PATCH' | 'DELETE', path: string, body?: unknown, signal?: AbortSignalLike): Promise<T>;
    callAnon<T>(method: 'POST', path: string, body: unknown, signal?: AbortSignalLike): Promise<T>;
    uploadRaw(path: string, bytes: Uint8Array, headers: Record<string, string>, signal?: AbortSignalLike): Promise<unknown>;
    downloadRaw(path: string, signal?: AbortSignalLike): Promise<{
        bytes: Uint8Array;
        contentType: string;
        filename: string | null;
    }>;
    private parseJsonResponse;
    private request;
}
export declare function getOrCreateInstallId(): string;
export interface DeviceCred {
    deviceId: string;
    deviceSecret: string;
    fingerprint?: string;
}
export interface AuditReportLike {
    verdict?: string;
    summary?: string;
    precheck?: {
        verdict?: string;
        counts?: Record<string, number>;
        findings?: Array<{
            code?: string;
            level?: string;
            detail?: string;
        }>;
    };
    review?: {
        scene?: string;
        aborted?: boolean;
        elapsed_ms?: number;
        lights?: Record<string, string>;
        error?: string;
    };
    files?: Array<{
        path?: string;
        bytes?: number;
        sha256?: string;
    }>;
    error?: string;
    message?: string;
}
export declare function readDeviceCred(baseUrl: string): DeviceCred | null;
export declare function updateDeviceCredById(deviceId: string, patch: Partial<DeviceCred>): boolean;
export declare function readAnyDeviceCred(): DeviceCred | null;
export declare function writeDeviceCred(baseUrl: string, c: DeviceCred): boolean;
export declare function clearDeviceCred(baseUrl: string): void;
export {};
//# sourceMappingURL=kai-pu-http.d.ts.map