export interface WorkstationConfig {
    scaffold?: boolean;
    baseUrl?: string;
    fingerprint?: string;
    clientVersion?: string;
}
export interface HostContext {
    logger?: {
        info(msg: string, ...rest: unknown[]): void;
        warn(msg: string, ...rest: unknown[]): void;
    };
}
export declare const name = "shanhai-kaipu-workstation";
export declare function apply(ctx: HostContext, config?: WorkstationConfig): void;
//# sourceMappingURL=index.d.ts.map