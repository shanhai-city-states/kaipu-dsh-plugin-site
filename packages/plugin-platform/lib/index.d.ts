/**
 * 山海·开铺 · 场地插件 · host half
 * =====================================================================
 * 这一半跑在 **DSH Host（②/③ 层）**，不碰浏览器。
 * 它负责：契约对接（④ 适配层）、场地能力（场景目录 / 运行编排对接 /
 * 角色位 / 能力边界 / 留痕读取）。
 *
 * ★★ 三条不能破的边界（架构级，不是"藏起来"）：
 *   1. **不持有模型 Key、不直连模型**
 *   2. **不绕过宿主统一适配层**直连服务端域名
 *   3. **不越受管根**
 *
 * ★ 我方 Agent 的 skill / memory / 内部 prompt **永不出现在任何响应体里** ——
 *   这条要在每个出参上自查（Step 6 会做成可断言的用例）。
 *
 * ── 2026-10-05（接真接口）改了什么 ──────────────────────────────────
 *   ① 新增 `src/remote/`：host 侧数据通道（`kaipu/status` · `connect` ·
 *      `listAgents` · `listScenes` · `capabilities`）；面板经**宿主网关**调到它。
 *      ★ 为什么必须中转而不是浏览器直连：`kai-pu` **不发任何 `access-control-*`
 *        头**、预检 `OPTIONS` 回 **501**（实测）⇒ 浏览器跨源直连在**技术上**
 *        就走不通；纪律（不直连服务端域名）与物理现实在这里指向同一处。
 *   ② ★ **凭据（deviceToken）落在本进程内存**，浏览器永不持有 ——
 *      这是那条纪律的**收益**，不是负担。
 *   ③ 未配 `baseUrl` ⇒ **本地/未接入模式**（`status.connected:false`）。
 *      ★ 这是**正常状态**，不是故障 —— 面板按它如实说，而不是靠"请求失败"去猜。
 */
import { type KaipuServiceConfig } from './remote/service.js';
/** 插件配置（与 `cordis.patch.yml` 的 config 对应） */
export interface PlatformConfig extends KaipuServiceConfig {
    scenesCatalog?: boolean;
    runView?: boolean;
    capabilityBoundary?: boolean;
    roleSeats?: boolean;
}
/** DSH host 侧最小 ctx 形状（只写我们用到的，避免绑 DSH monorepo 内部包） */
export interface HostContext {
    logger?: {
        info(msg: string, ...rest: unknown[]): void;
        warn(msg: string, ...rest: unknown[]): void;
    };
}
export declare const name = "shanhai-kaipu-platform";
export declare function apply(ctx: HostContext, config?: PlatformConfig): void;
//# sourceMappingURL=index.d.ts.map