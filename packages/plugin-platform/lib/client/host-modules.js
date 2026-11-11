"use strict";
/**
 * ★ 宿主模块的**手写最小形状**。
 *
 * 为什么不 import DSH 的类型：`@deepseek-ai/dsh-client-ui-layout` /
 * `dsh-client-ui-sidebar` 是 DSH monorepo 内部包，**不发布到 npm**，
 * 独立包解析不到。另有一组名称由**宿主运行时**在浏览器里另行提供
 * （它同样不是 npm 依赖，因此也不该被 import）。
 *
 * ★ 这里**不再列出**"运行时提供了哪些名字" —— 那份清单是**宿主运行时的内部结构**，
 *   不是我们的资产（2026-10-07 裁定：拆两半判 —
 *   「包不发布到 npm」= **公开可核的世界事实，可留**；
 *   「它的运行时表里有哪些」= **它的内部结构，收掉**）。
 *   ⇒ 删掉清单**论证一点没弱**：结论只依赖"解析不到、所以手写"，
 *     完全不需要知道那份表里有谁。**能少说就少说。**
 *
 * ⇒ 按实际用到的 API 手写 interface。代价：类型安全靠我们自己维护；
 *   收益：**插件能独立构建、不绑 DSH monorepo**（这正是"能上市场"的前提）。
 *
 * 依据：`src/client/index.ts` 同名注释（源码级核过）。
 */
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=host-modules.js.map