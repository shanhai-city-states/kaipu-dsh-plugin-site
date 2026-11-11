/**
 * 山海·开铺 · 场地插件 · **SSE 分帧与事件映射**（纯模块 · 零运行时依赖）
 * =====================================================================
 * ★★ 为什么单独一个文件（2026-10-06 抽出）：
 *
 *   这段逻辑原来长在 `remote/service.ts` 的 class 里，其中 `frameToEvent` 的注释
 *   明写"**纯函数，便于单独断言**"—— **但它当时是 `private`，根本断言不了**。
 *   注释说了没做的事，就是一处**假承诺**。
 *
 *   而"流内 `error` 帧"这个输入**在真服务端上很难自然发生**（正常路径不发），
 *   ⇒ 想验证"error 帧会被解析成**事件**、而不是被当成『这次运行挂了』"，
 *     就**必须能把一帧直接喂进去**。
 *
 *   ⇒ 抽成零依赖模块：`import type` 契约类型（**编译后无运行时 import**），
 *     于是**判据可以直接 import 编译产物来喂帧**（由配套探针脚本）。
 *     —— 判据要断在**真会发生的输入**上；发生不了就**造**一个。
 */
import type { SceneRunEvent } from '@shanhai/kaipu-contract';
export interface SseFrame {
    event: string;
    data: string;
}
/** 解一帧。`null` = 没有 `data:` 行（注释 / 心跳 / 空帧），**不是错误** */
export declare function parseSseFrame(frame: string): SseFrame | null;
/**
 * 契约 §3.4 的**十个**事件名。★ **不在表里的帧一律不产出**（fail-closed）。
 *
 * ★ 2026-10-06 补 `'error'`（差异单 B 组）：契约 §3.4 的示例里**一直有** `event: error`，
 *   是我方这张表漏了它 ⇒ 后果是 error 帧被下游**转成抛出**，
 *   把"运行中收到一条错误"表达成了"**这次运行挂了**"（两回事，见 `frameToEvent` 注释）。
 */
export declare const SSE_KNOWN: ReadonlySet<string>;
/**
 * ★ 需要 `round` 的事件 —— **正向白名单**（2026-10-06 改）。
 *
 * 原来写的是"排除法"（`!== start && !== summary && …`）：每加一个新事件，
 * 都要记得往**排除列表**里补一次 —— 漏一次就给它错误地补上一个 `round`。
 * ⇒ 改成正向列举：**新事件默认不带 `round`**。
 *   这个默认方向更安全：漏加的后果只是"少一个字段"，而 reducer 对缺 `round`
 *   本来就有兜底（用最近一次 `round_start`）；反过来（**多**一个来路不明的 round）
 *   会把事件分到**错误的分段**里 —— 那是"看起来对、其实错"的一类。
 */
export declare const ROUNDED_EVENTS: ReadonlySet<string>;
/** 一帧的产物：一个事件，或者"一个事件 + 它顺带推进了 `round`" */
export type FrameOutcome = {
    kind: 'event';
    event: SceneRunEvent;
} | {
    kind: 'round';
    round: number;
    event: SceneRunEvent;
};
/**
 * 一帧 → 一个事件。
 *
 * ★ **纯函数**（`curRound` 由调用方持有并传入）—— 现在这句是**真的**：
 *   本函数已从 class 里抽出并导出，判据可以直接喂帧断言它。
 *
 * ★★ 2026-10-06 改动：**移除了 `error` 帧的特殊分支**。
 *   原来它被转成 `{ kind: 'error', message }`（下游当**抛出**处理）——
 *   也就是说"运行中收到一条服务端错误"被表达成"**这次运行挂了**"。
 *   但 `error` 是契约 §3.4 的**普通事件**（示例里排在 `usage` 后、`done` 前）
 *   ⇒ 现在它产出正常的 `SceneRunEvent`，由**界面**当"运行记录的一部分"如实显示
 *     （不打断视图、不可关闭）。
 *
 * ★ fail-closed 三处（都是"宁可少产出，不可编造"）：
 *   ① 契约外的事件名 ⇒ 不产出；
 *   ② 坏 JSON / 非对象 ⇒ 跳过该帧；
 *   ③ 带 `round` 的事件缺 `round` ⇒ **填最近一次 `round_start` 的值**（不新造轮次）。
 */
export declare function frameToEvent(frame: SseFrame | null, curRound: number): FrameOutcome | null;
//# sourceMappingURL=sse-frame.d.ts.map