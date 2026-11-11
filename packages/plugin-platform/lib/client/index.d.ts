import type { ClientContext } from './host-modules.js';
/**
 * ★ 服务名（不是包名）。
 *   · `slots`      —— 由 ui-renderer 提供（面板注册用）
 *   · `connection` —— 由 `@deepseek-ai/dsh-client-connection` 提供（**数据通道**；
 *     面板经它调本插件 host half，见 `bridge.ts` 文件头）
 *
 * ★★ 这里**曾经加过** `'remote'`（为了走流式端点），2026-10-05 **撤掉了**，原因记在这：
 *   加了 `'remote'` 之后确实能拿到 `ctx.remote`（键：`ctx/name/ownerCtx/connection/
 *   namespaces/hostFacts/streams/events/mutations`），**但里面没有 `kaipu`** ——
 *   DSH 侧装配 namespace 的那份清单是**硬编码的内部包清单**
 *   （逐个 `import '@deepseek-ai/xxx/remote'` 再 `ctx.remote.$mount(...)`），
 *   **第三方插件不在其中**，namespace 不会自动来。
 *   ⇒ 运行改走一元通道（`startRun` + `pollRun`），`remote` 也就不需要了。
 *   ★ 留这条注释是因为"加 inject 拿 remote"是一条**看起来最自然、实际走不通**的路，
 *     下一个人很可能再试一次。
 */
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map