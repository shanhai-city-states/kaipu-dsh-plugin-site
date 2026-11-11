interface ClientContext {
    slots: {
        inject(key: string, cb: () => (() => void) | Iterable<() => void>): () => void;
        register(options: Record<string, unknown>, component: unknown): () => void;
    };
}
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
export {};
//# sourceMappingURL=index.d.ts.map