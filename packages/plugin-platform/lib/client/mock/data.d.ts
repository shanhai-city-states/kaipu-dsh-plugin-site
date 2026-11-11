/**
 * 山海·开铺 · 场地插件 · **演示数据**（mock）
 * =====================================================================
 * ★★ 三条纪律（写在最前面，改这个文件前先读）
 *
 *   1) **形状严格按契约** —— 类型一律从 `@shanhai/kaipu-contract` 取，
 *      本地**不另行定义**任何字段名/事件名/判定字符串。契约层存在的唯一理由就是这个。
 *      （契约包的运行时值会被内联进 bundle。）
 *
 *   2) **确定性** —— 不用 `Math.random()`、不用 `Date.now()`。
 *      理由：界面判据要能被探针**断言到具体字面量**（"第 2 轮"/"未参与审核面"…）。
 *      带随机数的 mock 只能证明"界面没崩"，证明不了"它显示了该显示的东西"。
 *
 *   3) ★★ **必须在界面上明示这是演示数据**（`DATA_SOURCE_LABEL`）。
 *      理由与官方 `contributing.md` 同源：「描述必须属实，会被当作声明与代码核对」。
 *      把 mock 混成看起来像真数据，等于自己给自己造了一个"名不副实"的把柄。
 *
 * ── 这组数据刻意覆盖的**全部契约分支**（Step 6 的验收面）──────────────
 *
 *   | 场景 | 覆盖 |
 *   |:--|:--|
 *   | 开铺审计 · 标准 | **round=2 回炉**（⚡有条件 → ✅通过）+ **dims 裁剪**（skippedDims） |
 *   | 复核演练 · 全场未接入 | `agentId === null` ⇒ 界面「待接入」 |
 *   | 预约核验 · 需外部预约 | `requiresExternal` + `seatHolders` |
 *   | 资料预检 | **⛔拒收**（不收费） |
 *   | 开铺审计 · 进行中 | 停在第一轮中段 ⇒ 可演示 **「已停止接收」**（R5） |
 *
 *   四类判定 `✅通过 / ⚡有条件 / ❌驳回 / ⛔拒收` **全部出现**（R3：必须可区分且可见）。
 *
 * ── ★★ 2026-10-07：灯名字段已对齐契约 v1.4（本文件最重要的一次改动）────────
 *
 * **权威来源**：契约 v1.4（sha256 `f1211713…` · 1,448 行）
 *   §3.1 `role: "匠灯"` / `lamp: "匠灯"` · §3.3 `lamps: ["智灯","匠灯","戒灯","仁灯"]`
 *   · §3.4 SSE `start.lamps` / `lamp_start.lamp` / `dims` 同值域。
 *
 * **为什么必须改**（原来填的是「主体核验」这类**自编维度名**）：
 *   ① **事实错误**：`lamps[].lamp` / `agents[].role` 的真值是**灯名**。
 *      工坊 2026-10-07 实测 `GET /scenes` / `start.lamps` 均返灯名。
 *   ② **这条本来就在撒谎**：`live.ts:214` 用 `agents.find(x => x.role === raw)`
 *      把 `role` 与 lamp 名精确匹配 —— 而旧 mock 里 `role` 是 `'执行'`/`'审计'`、
 *      `lamp` 是 `'主体核验'`，**根本匹配不上**。旧数据下这条兜底路径**恒不命中**。
 *      改成灯名后它才**真的能工作**：这是**修好**，不只是改名。
 *   ③ 裁定(a) 的原话 = **内容自编 + 形状合契约** —— 而这里错的是**形状**（取值域），
 *      不是内容。
 *
 * **★ 全局映射（一个执行位一盏灯，跨场景必须一致）**
 *   —— 因为同一个 agent 的 `role` 是**固定**的，它在任何场景出现，
 *   `lamp` 都必须与之一致，否则 `role === lamp` 这条匹配又会断。
 *
 *   | agent | 执行方名（**自编**） | 灯（**契约值**） |
 *   |:--|:--|:--|
 *   | `ag-1001` | 主体核验方 | **智灯** |
 *   | `ag-1002` | 权责确认方 | **匠灯** |
 *   | `ag-1003` | 留痕审计方 | **戒灯** |
 *   | `ag-1004` | 利益冲突筛查方 | **仁灯** |
 *   | `ag-1005` | (待接入) | `综合维度` ★ **保留原值**，见该条注释（真服务端实测） |
 *
 *   ★ **只取四灯**，不引入第五个名字：v1.4 §3.3 的**内置**多灯场景
 *     (`multi-dim-review`) 就是 `["智灯","匠灯","戒灯","仁灯"]` 四盏。
 *     **我方不发明内置场景里没有的取值**（少做比多做好）。
 *
 *   ★ **哪些保持自编**（裁定(a) 的"内容自编"那一半）：
 *     `agentName` / `seatHolders[].holderName` / `MOCK_SEAT_CHANGES` 的 from·to
 *     —— 它们承载的是「**哪个执行方坐这个位子**」（人/机构），**不是灯名**。
 *     契约 §3.1 里 `name` 与 `lamp` 本就是两个字段。
 *
 * ⚠️ **反向判据已配**：`tools/probe/run-view-probe.mjs` ⓪.3 段断「界面不出现旧自编名」——
 *   ★ **先加的反向那条**（旧名必须 0 命中），正向只是它的前提。
 *   理由：只断"新的在"是假绿 —— 改漏一处（比如只改了场景没改事件序列），正向照样全绿。
 */
import type { AgentCard, SceneCard, SceneCategory, SceneRecommendation, SceneRunEvent } from '@shanhai/kaipu-contract';
/** ★ 数据来源标签 —— 面板必须显示它（纪律 3） */
export declare const DATA_SOURCE_LABEL = "\u6F14\u793A\u6570\u636E\uFF08mock\uFF09";
export declare const MOCK_AGENTS: AgentCard[];
export declare const MOCK_SCENES: SceneCard[];
export declare const MOCK_SCENE_CATEGORIES: SceneCategory[];
export declare const MOCK_SCENE_RECOMMENDATIONS: SceneRecommendation[];
/** scene → 事件序列。**没有条目的场景 = 未运行**（不是错误态）。 */
export declare const MOCK_RUNS: Record<string, SceneRunEvent[]>;
/**
 * ★ 约束 ①：报告**无签名** ⇒ 界面必须醒目提示。
 *
 * 这里**恒为 `null`（未签名）**，而且是**刻意的**：
 * 签名只能由服务端给出，而演示数据根本不来自服务端 ——
 * 显示"已签名"就是撒谎（官方 `contributing.md`：呈现也不能夸大）。
 * 如实显示未签名，既符合事实，也顺手把"这是演示数据"再说清一遍。
 */
export declare const MOCK_SIGNATURE: null;
/** 角色位变更记录（约束 ②：变更必须有记录 + 原因，可追溯） */
export interface SeatChangeRecord {
    seat: string;
    from: string;
    to: string;
    reason: string;
    at: string;
    by: string;
}
export declare const MOCK_SEAT_CHANGES: Record<string, SeatChangeRecord[]>;
/** 没有变更记录的场景返回空数组（**不是错误态**，界面显「尚无变更记录」） */
export declare function seatChangesOf(scene: string): SeatChangeRecord[];
/**
 * 错误的 `detail`（**只有两个"另走一条路"的码需要**）。
 *
 * ★★ 为什么必须有这张表：契约里那两个码的 `clientAction` 是「**按 `detail.poll` 切到查询接口**」
 *    「按 `detail.requiresExternal` 显示该场景需进场」「带 `availableAt` 就必须一并显示」。
 *    **没有 detail 就没有出路** —— 界面只能干说一句"这一单已经在跑了，别急"，用户仍然什么也做不了。
 *    （这是 Step 7 实测抓到的真实缺口：第一版接线漏了 detail。）
 *
 * 形状照抄契约的 `detailShape` 字段：
 *   duplicate_request → { "state": "running", "poll": "/scene/run/{requestId}" }
 *   not_checked_in    → { "requiresExternal": true, "availableAt": "<ISO8601>" }
 *
 * ★ `availableAt` 用**固定值**（确定性纪律）：判据要能断言到具体字面量。
 *   日期取了一个明确的时间点，避免"跑的时候刚好跨天"导致断言飘。
 */
export declare const MOCK_ERROR_DETAIL: Record<string, Record<string, unknown>>;
export declare function errorDetailOf(code: string | null): Record<string, unknown> | undefined;
//# sourceMappingURL=data.d.ts.map