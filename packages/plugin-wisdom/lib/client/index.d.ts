interface ClientContext {
    slots: {
        inject(key: string, cb: () => (() => void) | Iterable<() => void>): () => void;
        register(options: Record<string, unknown>, component: unknown): () => void;
    };
}
/**
 * ★ 服务名（不是包名）。
 *   · `slots`      —— 由 ui-renderer 提供（面板注册用）
 *   · `connection` —— 由 `@deepseek-ai/dsh-client-connection` 提供（**数据通道**）
 *
 * ⚠️ `connection` 是**新增**的（Step 1 骨架时没有）——
 *   ⇒ `package.json` 的 `dsh.client.inject`（**包名**词表）也要同步加
 *     `@deepseek-ai/dsh-client-connection`，**两处都要**（漏一处 = 取不到服务）。
 *     这是踩过的坑：两套词表填反了会卡在 "waiting for services"。
 */
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
export {};
//# sourceMappingURL=index.d.ts.map