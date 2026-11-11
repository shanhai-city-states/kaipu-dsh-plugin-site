/** 解一帧。`null` = 没有 `data:` 行（注释 / 心跳 / 空帧），**不是错误** */
export function parseSseFrame(frame) {
    let event = 'message';
    const dataLines = [];
    for (const raw of frame.split('\n')) {
        const line = raw.endsWith('\r') ? raw.slice(0, -1) : raw;
        if (line === '' || line.startsWith(':'))
            continue;
        const colon = line.indexOf(':');
        const field = colon < 0 ? line : line.slice(0, colon);
        let value = colon < 0 ? '' : line.slice(colon + 1);
        if (value.startsWith(' '))
            value = value.slice(1);
        if (field === 'event')
            event = value;
        else if (field === 'data')
            dataLines.push(value);
    }
    return dataLines.length === 0 ? null : { event, data: dataLines.join('\n') };
}
/* ══════════════════════════════════════════════════════════════════
   二、契约内的事件名与"带不带 round"
   ══════════════════════════════════════════════════════════════════ */
/**
 * 契约 §3.4 的**十个**事件名。★ **不在表里的帧一律不产出**（fail-closed）。
 *
 * ★ 2026-10-06 补 `'error'`（差异单 B 组）：契约 §3.4 的示例里**一直有** `event: error`，
 *   是我方这张表漏了它 ⇒ 后果是 error 帧被下游**转成抛出**，
 *   把"运行中收到一条错误"表达成了"**这次运行挂了**"（两回事，见 `frameToEvent` 注释）。
 */
export const SSE_KNOWN = new Set([
    'start',
    'round_start',
    'lamp_start',
    'lamp_delta',
    'lamp_done',
    'round_done',
    'summary',
    'usage',
    'error',
    'done',
]);
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
export const ROUNDED_EVENTS = new Set([
    'round_start',
    'lamp_start',
    'lamp_delta',
    'lamp_done',
    'round_done',
]);
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
export function frameToEvent(frame, curRound) {
    if (frame === null)
        return null;
    // ★ fail-closed ①：契约外的事件名 ⇒ 不产出
    if (!SSE_KNOWN.has(frame.event))
        return null;
    let obj;
    try {
        obj = JSON.parse(frame.data);
    }
    catch {
        return null; // ★ fail-closed ②：坏 JSON ⇒ 跳过该帧
    }
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj))
        return null;
    const rec = obj;
    // ★ fail-closed ③：**带 `round` 的事件**缺 `round` ⇒ 填最近一次 `round_start` 的值
    const needsRound = ROUNDED_EVENTS.has(frame.event);
    const withR = needsRound && typeof rec['round'] !== 'number' ? { ...rec, round: curRound } : rec;
    // ★★ `error` 事件：把 `code` / `message` **归一化成字符串**
    //    （缺字段 ⇒ **空串**，而不是 `undefined`）。
    //    ★ 这里**只做归一，不编内容** —— 缺了就是缺了，由界面如实说"服务端没给细节"。
    //      （同 `#4`「不许编空数组」：兜底不能变成"假装有信息"。）
    if (frame.event === 'error') {
        const code = typeof withR['code'] === 'string' ? withR['code'] : '';
        const message = typeof withR['message'] === 'string' ? withR['message'] : '';
        return { kind: 'event', event: { event: 'error', code, message } };
    }
    const event = { ...withR, event: frame.event };
    if (frame.event === 'round_start' && typeof withR['round'] === 'number') {
        return { kind: 'round', round: withR['round'], event };
    }
    return { kind: 'event', event };
}
//# sourceMappingURL=sse-frame.js.map