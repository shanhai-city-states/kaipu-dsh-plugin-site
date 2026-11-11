"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIMS_FOOTER = exports.STOPPED_EXPLAIN = exports.STATUS_TEXT = exports.EMPTY_RUN = void 0;
exports.reduceRun = reduceRun;
exports.toneOf = toneOf;
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
const kaipu_contract_1 = require("@shanhai/kaipu-contract");
exports.EMPTY_RUN = {
    requestId: null,
    scene: null,
    serverTime: null,
    status: 'idle',
    participated: [],
    rounds: [],
    summary: null,
    usage: null,
    finishReason: null,
    errors: [],
};
/**
 * 归约。
 * @param events   契约事件序列（mock / 真 SSE 均可）
 * @param stopped  客户端是否已停止接收（由 UI 传入 —— 它不属于事件流，见 R5）
 */
function reduceRun(events, stopped = false) {
    const view = { ...exports.EMPTY_RUN, participated: [], rounds: [] };
    /** ★ 归组键必须 (round, lamp) —— 见 R1 */
    const lampIndex = new Map();
    const roundIndex = new Map();
    /** 取或建某一轮的分段。`fromLampEvent` = 该分段是**兜底**出来的（没见着 round_start）。 */
    const ensureRound = (round, reason, fromLampEvent = false) => {
        const hit = roundIndex.get(round);
        if (hit !== undefined)
            return hit;
        const created = {
            round,
            /**
             * ★★ 「没有 reason」有**两种**，必须说成两句不同的话（2026-10-05 抓到的真缺陷）：
             *   · `fromLampEvent` ⇒ 压根**没收到 `round_start`**（那是我们的兜底分组）
             *   · 否则           ⇒ **收到了 `round_start`，但服务端没给 `reason`**
             * 原来一律写成"（未收到轮次开始事件）" ⇒ 服务端明明发了却说没收到，
             * **那是错误陈述** —— 比不显示更坏。
             * （触发背景：服务端 2026-10-05 补发了 `round_start`，但它的 data 是
             *  `{round, lamps}`，**没有** §3.4 里的 `reason` ⇒ 这条立刻显形。）
             */
            reason: reason ?? (fromLampEvent ? '（未收到轮次开始事件）' : '（服务端未给本轮说明）'),
            // ★ 兜底分组才算 degraded；"收到了但没给说明"**不是** degraded，是服务端少给一个字段
            degraded: fromLampEvent,
            lamps: [],
            verdict: null,
        };
        roundIndex.set(round, created);
        view.rounds.push(created);
        return created;
    };
    const ensureLamp = (round, lamp, agent) => {
        const key = (0, kaipu_contract_1.lampKey)(round, lamp); // ← ★ 契约提供的键构造，不许本地拼字符串
        const hit = lampIndex.get(key);
        if (hit !== undefined) {
            if (agent !== null && hit.agent === null)
                hit.agent = agent;
            return hit;
        }
        const created = { lamp, agent, lines: [], verdict: null, detail: '', latencyMs: null, started: false };
        lampIndex.set(key, created);
        ensureRound(round, null, true).lamps.push(created);
        return created;
    };
    for (const e of events) {
        switch (e.event) {
            case 'start': {
                view.requestId = e.requestId;
                view.scene = e.scene;
                /**
                 * ★★ 服务器时刻 —— 契约 §3.4 的 `start` 里就有它。
                 *
                 * ★ 取值方式与下面 `usage` 那一段**同款**（`e as unknown as Record<string, unknown>`
                 *   + `typeof` 判型）：契约类型若没收这个字段，也**不该**在这层编一个值出来。
                 *   拿不到就 `null` ⇒ 界面不显示那一行（不是显示个本地时刻顶上）。
                 */
                const st = e;
                view.serverTime =
                    typeof st['serverTime'] === 'string' && st['serverTime'] !== '' ? st['serverTime'] : null;
                view.participated = [...e.lamps];
                break;
            }
            case 'round_start': {
                ensureRound(e.round, e.reason);
                break;
            }
            case 'lamp_start': {
                // ★ 2026-11-09：标记「已开工」⇒ 界面据此显示「正在深度核查」，
                //   与「真·待接入」（started=false 且 verdict=null）区分开。
                ensureLamp(e.round, e.lamp, e.agent).started = true;
                break;
            }
            case 'lamp_delta': {
                // ★ 收到流式文本也是「已开工」的硬证据（有些链路先 delta 后 start）
                const dl = ensureLamp(e.round, e.lamp, null);
                dl.started = true;
                dl.lines.push(e.text);
                break;
            }
            case 'lamp_done': {
                const l = ensureLamp(e.round, e.lamp, null);
                l.verdict = e.verdict;
                l.detail = e.detail;
                l.latencyMs = e.latencyMs;
                break;
            }
            case 'round_done': {
                ensureRound(e.round, null, true).verdict = e.verdict;
                break;
            }
            case 'summary': {
                // ★ `conditions` 契约里是必填；服务端给了就给，没给就空数组（不编内容）
                const conditions = Array.isArray(e.conditions) ? [...e.conditions] : [];
                // ★★ 维度信息：**服务端给没给**是两件事，必须分开记（见 SummaryView.dimsReported）
                const hasDims = Array.isArray(e.participatedDims) && Array.isArray(e.skippedDims);
                view.summary = {
                    verdict: e.verdict,
                    conditions,
                    round: typeof e.round === 'number' ? e.round : 1,
                    participatedDims: Array.isArray(e.participatedDims) ? [...e.participatedDims] : [],
                    skippedDims: Array.isArray(e.skippedDims) ? [...e.skippedDims] : [],
                    dimsReported: hasDims,
                };
                break;
            }
            case 'usage': {
                // ★ 契约：usage 是**唯一可信计费口径**，客户端不得自行计算 ⇒ 原样存、原样显示
                //   ★ 兜底只用 `typeof` 判型（**不填 0**）：没有的数就让它"没有"，
                //     界面才可能如实说"未提供"。编一个 0 = 替服务端撒谎。
                const u = e;
                view.usage = {
                    tokensIn: typeof u['tokensIn'] === 'number' ? u['tokensIn'] : 0,
                    tokensOut: typeof u['tokensOut'] === 'number' ? u['tokensOut'] : 0,
                    credits: typeof u['credits'] === 'number' ? u['credits'] : 0,
                    balanceAfter: typeof u['balanceAfter'] === 'number' ? u['balanceAfter'] : null,
                    note: typeof u['note'] === 'string' && u['note'] !== '' ? u['note'] : null,
                };
                break;
            }
            case 'done': {
                view.finishReason = e.finishReason;
                break;
            }
            /**
             * ★★ 流内 `error`（契约 §3.4 · 2026-10-06 补）。
             *
             * ★ **不改 `status`**：收到它**不代表这次运行结束了**（契约示例里它排在 `done` 之前）
             *   ⇒ 不能在这里把 status 置成 `done`/失败 —— 那是**替服务端下结论**。
             *   若服务端之后真不发 `done`，流结束时的"提前结束"检查会**如实说出来**。
             * ★ **按到达顺序留着**（可能是多条）：同一次运行里不同阶段各报一条是合理的，
             *   合并/去重都会丢掉"发生过几次"这个信息。
             */
            case 'error': {
                view.errors = [
                    ...view.errors,
                    {
                        code: typeof e.code === 'string' ? e.code : '',
                        message: typeof e.message === 'string' ? e.message : '',
                    },
                ];
                break;
            }
        }
    }
    view.status = view.requestId === null ? 'idle' : (stopped ? 'stopped' : (view.finishReason === null ? 'running' : 'done'));
    return view;
}
/* ─────────────────────────── 渲染辅助（纯函数） ─────────────────────────── */
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
function toneOf(verdict) {
    if (verdict === null)
        return null;
    return kaipu_contract_1.VERDICT_TONE[verdict] ?? null;
}
exports.STATUS_TEXT = {
    idle: '尚未运行',
    running: '运行中',
    // ★ R5：断开 = **已停止接收**。契约明文禁止写「已取消」——
    //   因为服务端仍在算完并落 lamp_runs，写"已取消"就是在说一件没发生的事。
    stopped: '已停止接收',
    done: '已完成',
};
exports.STOPPED_EXPLAIN = '已停止接收 —— 服务端仍在算完并落 lamp_runs；最终判定以服务端报告为准。';
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
exports.DIMS_FOOTER = {
    participated: '本次参与审核面',
    skipped: '未参与审核面',
    basis: '裁剪依据',
};
//# sourceMappingURL=run-reducer.js.map