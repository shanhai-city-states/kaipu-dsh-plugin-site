/**
 * 山海·开铺 · 场地插件 · **运行归约器**（纯函数）
 * =====================================================================
 * 输入一串契约 SSE 事件，输出**只与渲染有关**的视图状态。
 *
 * ★★ 为什么单独一个模块、而且是纯函数
 *
 *   契约里最容易出错的正是这一步（`sse.ts` 的注释把它叫"全场最容易出错的地方"）。
 *   把它做成**纯函数**以后：
 *     · 事件从哪来（mock / 真 SSE / 断线补拉）**与本模块无关** —— 换来源不改它；
 *     · 可被单测/探针直接喂事件断言结果，不需要起浏览器。
 *   ⇒ 这正是"一个服务只做一件事"的落法：**归约只做归约**。
 *
 * ★★ 三条契约硬约束（逐条对应 sse-events.json 的 renderRules）
 *
 *   [R1] 归组键 = **(round, lamp)**，不是 `lamp`。
 *        `round_start`/`round_done` 给流程语义；每个 `lamp_*` **自带 round** 作兜底。
 *        ⇒ 即便漏接 `round_start`，也**不会**把第 2 轮的 delta 串进第 1 轮。
 *   [R2] 按「第 N 轮」**分段**，回炉可见 —— 不合并成一条流水。
 *   [R6] 轮数**由服务端 `loopPolicy` 决定，客户端不得推断**。
 *        ⇒ 本模块**只反映事件里说的**，永不自己造一个轮次
 *          （所以"兜底"只兜"分组"，不兜"编造第几轮"）。
 *
 * ★ 另有一条不属于本模块但必须记住：[R5] 断开 ≠ 取消。
 *   断开只改**客户端的接收状态**（`status: 'stopped'`），
 *   服务端的最终判定仍以 `summary` 为准 —— 两者分开存，界面才不会说出"已取消"。
 */
import { type SceneRunEvent, type Verdict, type VerdictTone } from '@shanhai/kaipu-contract';
export interface LampView {
    lamp: string;
    /** `null` ⇒ 该维度尚未接入执行方（界面对应「待接入」） */
    agent: string | null;
    /** `lamp_delta` 累积的流式文本（按到达顺序） */
    lines: string[];
    verdict: Verdict | null;
    detail: string;
    latencyMs: number | null;
    /**
     * ★★ 2026-11-09（阿开拍板·乙案配套）：该灯**已开工但还没出结论**。
     *
     * 为什么必须单独一个字段 —— 三态必须能分开，不许混：
     *   · `started=false` 且 `verdict=null` ⇒ 真·待接入（这盏灯没人接）
     *   · `started=true`  且 `verdict=null` ⇒ **正在深度核查中**（灯在干活，还没答完）
     *   · `verdict!==null`              ⇒ 已有结论
     *
     * 现实依据（2026-11-09 实测）：文灯用 `deepseek-v4-pro` 跑完整 rubric 需 **222.4 秒**。
     * 超时已按阿开拍板提到 600 秒（**不换 Flash** —— 宁可慢一点，不能假一点），
     * 但「等 3-4 分钟」必须让用户**看得见原因**，否则客户会以为系统卡死了。
     */
    started: boolean;
}
export interface RoundView {
    round: number;
    reason: string;
    /**
     * ★ 该轮**没有收到 `round_start`** ⇒ 由 `lamp_*` 自带的 `round` 兜出来的分段。
     *   界面据此可以提示"轮次开始事件缺失"，**而不是假装它是正常的第 N 轮**。
     */
    degraded: boolean;
    lamps: LampView[];
    verdict: Verdict | null;
}
export interface SummaryView {
    verdict: Verdict;
    conditions: string[];
    round: number;
    participatedDims: string[];
    skippedDims: string[];
    /**
     * ★★ 服务端**到底有没有给**维度信息（`participatedDims` / `skippedDims`）。
     *
     * 为什么必须单独记这一位（2026-10-05 接真 SSE 后当场立的）：
     *   契约变更 #4 要求 `summary` 带这两个数组，用意是**「报告不能给出『审全了』的错觉」**。
     *   但**实测**（配套的联调探针，2026-10-05）服务端发的是：
     *     `{"verdict":"⚪未接入","conditions":[…],"round":1}`   ← **没有这两个字段**
     *   若我们把"缺字段"兜底成空数组，界面就会显示「未参与审核面：（无）」
     *   —— 那**恰好**制造了 #4 要防的那个错觉：看起来"该审的都审了"。
     *   ⇒ 所以缺字段时**不许编**：留 `false`，界面据此说清"服务端没给维度信息，
     *     因此**无法判断是否审全**"。**如实说不确定，好过编一个确定的坏答案。**
     */
    dimsReported: boolean;
}
export interface UsageView {
    tokensIn: number;
    tokensOut: number;
    credits: number;
    /**
     * ★ 实测（2026-10-05）服务端会回 `balanceAfter: null`（契约写的是 number）
     *   —— 计费未接入时**如实 null，不编造**（契约 §20.2 同款口径）。
     *   ⇒ 类型放宽成 `number | null`：**让"没给"能被表达出来**，
     *     否则界面只能显示一个假的 0。
     */
    balanceAfter: number | null;
    /**
     * ★ 服务端附的**口径说明**（契约里没有，是实测多出来的字段）。
     *   例：`"P1 占位：无真实模型调用 ⇒ 用量为 0（不虚报）"`。
     *   为什么要透传：没有它，"用量 0"会被读成"这次没花钱"，而实际含义是
     *   **"这一档还没接真实计费"** —— 两者是完全不同的意思。
     */
    note: string | null;
}
/**
 * `idle`     —— 没跑过（**不是错误态**，这是正常状态）
 * `running`  —— 收到事件但还没 `done`
 * `stopped`  —— **客户端断开**（R5：措辞是「已停止接收」，不是「已取消」）
 * `done`     —— 收到 `done`
 */
export type RunStatus = 'idle' | 'running' | 'stopped' | 'done';
/**
 * 流内 `error` 事件（契约 §3.4 · 2026-10-06 补进判别联合后的消费形状）。
 *
 * `code` 与 §8.2 文案表**同一套**；`message` 是服务端给的原文。
 * ★ 界面渲染纪律：**有译法用译法**（口径统一）；**没收录**才回落到 `message`，
 *   且要**标记「未收录」** —— **不许自己补文案**（§8.2 归对方维护，缺口要报不单方补）。
 */
export interface RunErrorView {
    code: string;
    message: string;
}
export interface RunView {
    requestId: string | null;
    scene: string | null;
    /**
     * ★★ `start.serverTime` —— **服务端**给出的那一刻（2026-10-06 加）。
     *
     * ★ 为什么值得单独显示：客户端**不掌握**服务端时间，而"这一场是服务端什么时候跑的"
     *   是一条**可核对的依据**（审计语义：给依据，不给推理）。
     * ★ 服务端没给 ⇒ `null` ⇒ 界面**不显示这一行**。
     *   **绝不**退回本地 `Date.now()` 冒充 —— 那是在替服务端说话。
     */
    serverTime: string | null;
    status: RunStatus;
    /** `start.lamps` = 本次**实际参与**的维度（dims 裁剪后的结果） */
    participated: string[];
    rounds: RoundView[];
    summary: SummaryView | null;
    usage: UsageView | null;
    finishReason: string | null;
    /**
     * ★★ **流内** `error` 事件（2026-10-06 加 · 差异单 B 组补完）。
     *
     * ★ 为什么它不是"那条错误提示"——两者同名但完全不同：
     *   · **请求失败**（HTTP 层）⇒ 运行**根本没跑起来** ⇒ 走 `runError` / `ErrorSurface`：
     *     一条**可关闭**的提示。
     *   · **流内 `error`** ⇒ 运行**跑起来了**，中途服务端报一条实况（如"积分不足"）
     *     ⇒ 它是**运行记录的一部分**：**不可关闭、不打断视图**，按到达顺序留着。
     * ★ 契约示例里 `error` 排在 `usage` 之后、`done` 之前 ⇒ 它**不是终止信号**，流会继续。
     */
    errors: RunErrorView[];
}
export declare const EMPTY_RUN: RunView;
/**
 * 归约。
 * @param events   契约事件序列（mock / 真 SSE 均可）
 * @param stopped  客户端是否已停止接收（由 UI 传入 —— 它不属于事件流，见 R5）
 */
export declare function reduceRun(events: readonly SceneRunEvent[], stopped?: boolean): RunView;
/**
 * 判定 → 配色档位。
 *
 * ★★ **未知判定必须回 `null`（中性灰），不能回 `undefined`** —— 2026-10-05 联调实测抓到的真洞：
 *   服务端已在发**契约里没有的第五类判定 `⚪未接入`**（`agents` 表为空时，维度无执行方）。
 *   原实现是 `VERDICT_TONE[verdict]`：
 *     · 类型上 `Record<Verdict, VerdictTone>` 让 TS 以为**永远有值**（类型在说谎）
 *     · 运行时未知键得 `undefined` ⇒ 下游 `tone === null ? 灰 : TONE_BG[undefined]` 走后者
 *       ⇒ `background: undefined` ⇒ **徽标没有底色**，而"兜底那行"永远到不了
 *   ⇒ **兜底写了但不可达 = 没有兜底**。这里 `?? null` 把它接上。
 *   （这也是"第三道闸门·客户端不渲染未授权/未知取值"的落点。）
 */
export declare function toneOf(verdict: Verdict | null): VerdictTone | null;
export declare const STATUS_TEXT: Record<RunStatus, string>;
export declare const STOPPED_EXPLAIN = "\u5DF2\u505C\u6B62\u63A5\u6536 \u2014\u2014 \u670D\u52A1\u7AEF\u4ECD\u5728\u7B97\u5B8C\u5E76\u843D lamp_runs\uFF1B\u6700\u7EC8\u5224\u5B9A\u4EE5\u670D\u52A1\u7AEF\u62A5\u544A\u4E3A\u51C6\u3002";
/**
 * ★★★ 对外措辞：「审核面」——**内部叫灯次，对外叫审核面**（2026-10-07 定）
 *
 * 依据：已定口径（发起人 2026-10-07 采纳：
 *   「改，全换审核面」）。原措辞是「维度」，问题有三：
 *     ① **「维度」不是给客户看的词** —— 客户看到"维度"不知道指的是什么；
 *     ② 契约里已经叫「灯次」、灯名是「智灯/匠灯/戒灯/仁灯/文灯」，
 *        **内部术语已经够多，界面不该再加一个"维度"**；
 *     ③ 「审核面」直接告诉客户"**这是审的一个面**"，且与「灯」不冲突（一盏灯负责一个审核面）。
 *
 * ★★ 口径一句话：**内部叫灯次，对外叫审核面。一个面向施工，一个面向客户。**
 *
 * ⚠️⚠️ **改的范围边界**（很容易"改过头"，所以写死在这里）：
 *   只改**我们自己写的界面文案**（labels / 说明句 / 术语条目）。
 *   **不改下列两类** —— 它们不是我们的措辞，客户看到什么由服务端决定：
 *     · **契约字段名**（`dims` / `participatedDims` / `run_when` / `dim` 等）——
 *       它们是与服务端见面的**接口词汇**，改了就是改契约（本仓纪律：不单方改契约）；
 *     · **服务端下发的数据值**（如 `/agents[].role` 的值「综合维度」、
 *       `RecommendationView.when` 的值）—— 客户端**原样显示**，改 mock 只会让
 *       mock 与服务端不一致（`live.ts` 就是靠 `role === 灯名` 精确匹配找执行方的）。
 *   ⇒ 判别的问法：**这句话是谁写的？** 我们写的 ⇒ 改；服务端给的 ⇒ 不动。
 *
 * ⚠️ 改这些字符串会**连带**改 `tools/probe/run-view-probe.mjs` 里几条锚文本的断言
 *   （它们正是断"R4 尾部那两行在不在"）。那些断言是**有意锚文案**的 ——
 *   见该文件品牌名那条注释里对"什么时候该锚文案"的判别。
 */
export declare const DIMS_FOOTER: {
    readonly participated: "本次参与审核面";
    readonly skipped: "未参与审核面";
    readonly basis: "裁剪依据";
};
//# sourceMappingURL=run-reducer.d.ts.map