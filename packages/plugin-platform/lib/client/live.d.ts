/**
 * 山海·开铺 · 场地插件 · client half —— **数据源层**（真服务端 / 演示数据）
 * =====================================================================
 * 面板只认这一层，**不关心数据从哪来**。两条来源：
 *
 *   · `live`   —— 经宿主通道读真服务端（`kaipu/status|connect|listScenes|listAgents`）
 *   · `mock`   —— 本地演示数据（设计评审用；**界面必须明示**）
 *
 * ★★ 为什么把"来源"做成**显式状态**，而不是"请求失败就回落 mock"：
 *   那是最坏的一种做法 —— **用户以为在看真结果，其实在看演示数据**。
 *   所以三者严格分开：`live` / `mock`（人工选的）/ `unreachable`（真连不上）。
 *   连不上时**如实说连不上**，不悄悄换成 mock。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 与真服务端对账时发现的三处形状差异（都**不改契约**，只做防御读法）
 * ══════════════════════════════════════════════════════════════════
 * 全部实测自 `GET /scenes`（2026-10-05）：
 *
 * ① ★★ **`scenes[].category` 与 `categories[].scenes` 自相矛盾**：
 *      `multi-dim-review` 一边被列入 `categories[standard_review].scenes`（count=1），
 *      一边自己的 `category` 是**空串**。
 *    ⇒ 本文件认同一个读法：**以 `categories[].scenes` 为权威**（它是显式的成员表、
 *      且自带 `count`），`scene.category` 只作**单场景的兜底**，两者都没有 ⇒ 未归类。
 *      理由：**冗余字段打架时，选信息量大的那个，并保证"内容不丢"**——
 *      按 `scene.category` 读会让「标准审查」这一组**直接消失**（组内空 ⇒ 我的
 *      `groupScenes` 会过滤掉空组），而那个场景被塞进「未归类」。
 *
 * ② ★★ **`scenes[].lamps` 已于 2026-10-06 升格为对象数组**（对方按契约 §23.3 落地）。
 *      对方**同时**给 `lampNames`（老形状 · 逐字相同）⇒ 老读法不必改。
 *      **我方处理**：类型写成**联合**（两种都吃），并在 `mapLamps` 里**归一化** ——
 *      把"占位 / 待接入"一律收敛成 `agentId: null`，界面层只认这一种表达。
 *      ★ 权威字段是 `lamps[].agentId` ＋ `/agents[].status`，
 *        **不再靠 role 猜**（旧实现那样猜，见 `mapLamps` 注释里那段教训）。
 *
 * ③ **`categories[]` 多带 `scenes` / `count`**（我方契约类型里没有这两个字段）。
 *    ⇒ 宿主侧 `CategoryView` 已按实测形状声明；传到 `LeftPane` 时按可选字段消费。
 */
import type { AgentCard, SceneCard, SceneCategory, SceneRecommendation } from '@shanhai/kaipu-contract';
import { type ConnectionHandle } from './bridge.js';
export declare function setConnection(conn: ConnectionHandle | null): void;
export declare function hasConnection(): boolean;
/**
 * 取当前的通道句柄。
 *
 * ★ 为什么要开这个口子：`run.ts`（发起运行）走的是**同一条一元通道**
 *   （host 后台读 SSE、客户端轮询增量，见其文件头），它需要自己发请求 ——
 *   而连接是 `index.ts` 在 apply 期注入到**本模块**的。
 *   与其把连接再存一份（两个落点必然漂移），不如从唯一的持有者这里取。
 */
export declare function currentConnection(): ConnectionHandle | null;
/** 面板能显示的数据源状态（★ 三者严格分开，见文件头） */
export type SourceKind = 
/** 真服务端，读到了 */
'live'
/** 人工选的演示数据 */
 | 'mock'
/** 想连真服务端但没连上（★ 如实说，不悄悄换 mock） */
 | 'unreachable'
/** 连通道都没取到（环境问题） */
 | 'no_channel';
export interface Snapshot {
    kind: SourceKind;
    /** 界面顶部挂的来源标签（`null` = 不挂，仅 live 且正常时不挂？—— 挂，见纪律3） */
    label: string;
    /** 连不上时的原因（**已翻译**；只在 unreachable/no_channel 时有值） */
    reason: string | null;
    /** 服务端自报（live 才有） */
    server: {
        baseUrl: string;
        accountId: string;
        serverTime: string | null;
        serverVersion: string | null;
        agentsLoaded: number | null;
        tenants: number | null;
        fingerprintSource: string;
        authError: string | null;
    } | null;
    agents: AgentCard[];
    scenes: SceneCard[];
    categories: SceneCategory[];
    recommendations: SceneRecommendation[];
    /** 铺子身份（live 才有）：`/me` 的 name / plan / features */
    account: {
        name: string;
        plan: string;
        features: Record<string, boolean>;
        creditsNote: string | null;
    } | null;
    /**
     * ★ 流程清单的**缓存状态**（2026-10-07 新增 · 对应该验收项：缓存策略生效）
     *
     * ★★ 为什么要有它：v2 要求「首次全量拉，之后用响应顶层 `updatedAt` 比对 ——
     *   不同则重拉，相同则用缓存」。**不做/做没做**必须能被看见，
     *   否则"缓存策略生效"就是一句无法核的话。
     *
     * ⚠️ **实测现状（2026-10-07）**：服务端**尚未下发 `updatedAt`** ⇒ `basis === 'absent'`。
     *   此时**退化为每次全量拉取**，且**必须如实标出来** ——
     *   见 `SnapshotCache.basis` 的三值注释。
     */
    cache: SnapshotCache;
}
/**
 * 缓存状态。★ **三值分开表达**，因为"没走缓存"有**三种完全不同的原因**：
 *   ① `basis: 'absent'` —— **依据字段都没有**（`updatedAt` 未落）⇒ 机制不生效
 *   ② `basis: 'updatedAt'` + `hit: false` —— 依据在、但**值变了** ⇒ 正在重拉
 *   ③ `basis: 'updatedAt'` + `hit: true` —— 依据在、值没变 ⇒ 走缓存
 *
 * ★ 为什么不用一个 `boolean cacheHit`：那样会把 ① 和 ② 混成一句"没命中"，
 *   而用户/判据要问的是"**为什么**没命中" —— 是"服务端还没给依据"还是"清单真变了"。
 */
export interface SnapshotCache {
    hit: boolean;
    /**
     * ★★ **四值**，每一值对应一种不同的处境（别压成 boolean）：
     *   · `'updatedAt'` —— 依据在（走正常比对）
     *   · `'absent'`    —— ★ **服务端还没给依据** ⇒ 退化为全量拉（**这是个待办**，对方落了就变）
     *   · `'n/a'`       —— ★ **本快照不来自己服务端**（演示数据 / 未接入）⇒ 机制**不适用**（不会变）
     *   · `null`        —— 还没取过（初始态）
     * ★ 为什么把 `absent` 与 `n/a` 分开：两者在界面上都是"没走缓存"，
     *   但一个是"**等对方**"、一个是"**本来就没这回事**" ——
     *   混在一起会让后来人**对着演示态去追服务端**（追一个不存在的东西）。
     */
    basis: 'updatedAt' | 'absent' | 'n/a' | null;
    /** 本次响应里的 `updatedAt`（`basis === 'absent'` 时为 `null`） */
    updatedAt: string | null;
    /**
     * ★★ 依据在、`updatedAt` 也没变，但**仍然没用缓存**的原因（`null` = 没有这回事）。
     *
     * 为什么会有这种情况：场景卡片里嵌着**执行方名**（`lamps[].agentName`），
     * 而执行方是**另一个接口**（`/agents`）来的 ⇒ **场景清单没变、执行方变了**时，
     * 若直接复用旧卡片，会显示**过期的执行方名**。
     * ⇒ 所以命中缓存**还要加一道**：执行方签名也得一致。
     * ★ 这条是我对自己写的"防它偷懒"：**缓存不许拿新鲜度换正确性**。
     */
    staleReason: string | null;
}
/** 演示数据快照（面板的"设计评审"模式） */
export declare function mockSnapshot(): Snapshot;
/**
 * ★★ 流程清单缓存的**判定**（纯函数 · 2026-10-07）
 *
 * ★★ 为什么抽成纯函数：这套判定的**真实触发条件今天根本到不了** ——
 *   服务端还没下发 `updatedAt` ⇒ 线上永远走 `basis: 'absent'` 那一支。
 *   ⇒ 若把逻辑埋在 `liveFromServer` 里，**"命中缓存"这条路径将永远没人验过**，
 *     等对方落了 `updatedAt` 那天，第一次真跑就是它在线上第一次执行。
 *   ★ 这违反我方纪律：**"该判的东西变了"要能被判**，而不能靠"它看起来对"。
 *   ⇒ 抽出来 ⇒ 四支都能被**独立喂入**验一遍（`tools/probe/scene-cache-test.mjs`）。
 *
 * @param input.updatedAt  本次响应顶层 `updatedAt`（`null` = 服务端没给）
 * @param input.agentsSig  本次执行方清单的签名
 * @param input.cached     上次成功的缓存（`null` = 没有）
 * @returns 决定：`hit` 表示**复用 cached 的三份清单**；`store` 表示**要不要写入缓存**
 */
export declare function decideSceneCache(input: {
    updatedAt: string | null;
    agentsSig: string;
    cached: {
        updatedAt: string;
        agentsSig: string;
    } | null;
}): {
    hit: boolean;
    basis: SnapshotCache['basis'];
    staleReason: string | null;
    store: boolean;
};
/** 读真服务端。**任何一步失败都如实返回，不回落到 mock**（见上） */
export declare function loadLive(signal?: AbortSignal): Promise<Snapshot>;
//# sourceMappingURL=live.d.ts.map