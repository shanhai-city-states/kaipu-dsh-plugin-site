"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRun = startRun;
const bridge_js_1 = require("./bridge.js");
const live_js_1 = require("./live.js");
/**
 * 轮询周期。
 * ★ 300ms 的取法：够快（"逐灯"读起来是连贯的），又不至于把一元通道打满
 *   （一场运行几十个事件 ⇒ 十几秒里几十次请求，与一次 `listScenes` 同量级）。
 */
const POLL_MS = 300;
/* ══════════════════════════════════════════════════════════════════
   二、发起运行
   ══════════════════════════════════════════════════════════════════ */
/**
 * 发起一次运行。
 *
 * ★ 幂等键由**客户端**生成（契约要求）：同一 `requestId` 重复提交 ⇒
 *   服务端回 `duplicate_request`，这是**保护**不是错误。
 */
function startRun(query, cb) {
    let stopped = false;
    let timer = null;
    /** 下次该从第几个事件取（由服务端回的 `next` 决定，**不自己数长度**） */
    let cursor = 0;
    const clearTimer = () => {
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
    };
    const finish = () => {
        clearTimer();
        cb.onEnd();
    };
    /** 把两种失败形态（网关层 / 业务层）都收敛成**一句人话** */
    const reasonOf = (r) => r.ok === true ? '' : ('business' in r ? r.business.message : r.error.detail);
    const poll = async (runId) => {
        if (stopped)
            return;
        const conn = (0, live_js_1.currentConnection)();
        if (conn === null) {
            cb.onError('运行通道断了（宿主的数据通道不可用）。');
            finish();
            return;
        }
        const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.pollRun, { runId, from: cursor });
        if (stopped)
            return;
        if (r.ok !== true) {
            cb.onError(reasonOf(r));
            finish();
            return;
        }
        for (const raw of r.data.events ?? []) {
            const ev = asEvent(raw);
            if (ev !== null)
                cb.onEvent(ev);
        }
        if (typeof r.data.next === 'number' && r.data.next >= cursor)
            cursor = r.data.next;
        if (r.data.done === true) {
            // ★ 泵失败过 ⇒ 如实说出来（**不把"跑挂了"当"跑完了"**）
            const err = r.data.error;
            if (typeof err === 'string' && err !== '')
                cb.onError(err);
            finish();
            return;
        }
        timer = setTimeout(() => {
            void poll(runId);
        }, POLL_MS);
    };
    void (async () => {
        const conn = (0, live_js_1.currentConnection)();
        if (conn === null) {
            cb.onError('运行通道不可用：没取到宿主的数据通道（这是环境问题，不是服务端故障）。');
            finish();
            return;
        }
        const payload = { sceneId: query.sceneId, requestId: newRequestId() };
        if (query.target !== undefined)
            payload['target'] = query.target;
        if (query.content !== undefined)
            payload['content'] = query.content;
        if (Array.isArray(query.dims))
            payload['dims'] = query.dims;
        if (query.outputLevel !== undefined)
            payload['outputLevel'] = query.outputLevel;
        const started = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.startRun, payload);
        if (stopped)
            return;
        if (started.ok !== true) {
            cb.onError(reasonOf(started));
            finish();
            return;
        }
        const runId = typeof started.data.runId === 'string' ? started.data.runId : '';
        if (runId === '') {
            cb.onError('宿主没有返回 runId，这次运行没法跟踪。');
            finish();
            return;
        }
        void poll(runId);
    })();
    return {
        stop: () => {
            // ★ 只停**客户端这一侧**：不再取，也不再回调 ——
            //   服务端与 host 的泵都会把这一场读完（R5：断开 ≠ 取消）。
            stopped = true;
            clearTimer();
        },
    };
}
/* ══════════════════════════════════════════════════════════════════
   三、小工具
   ══════════════════════════════════════════════════════════════════ */
/**
 * 把服务端来的一个 item 收敛成契约事件。
 * ★ **形状不对就丢**（返回 `null`）—— 绝不把半个对象交给 reducer 去渲染。
 */
function asEvent(raw) {
    if (raw === null || typeof raw !== 'object' || Array.isArray(raw))
        return null;
    const rec = raw;
    if (typeof rec['event'] !== 'string' || rec['event'] === '')
        return null;
    return raw;
}
/**
 * 幂等键。★ 优先 `crypto.randomUUID`；兜底只用**非密码学**随机（它只做幂等键）
 */
function newRequestId() {
    const c = globalThis.crypto;
    if (typeof c?.randomUUID === 'function')
        return c.randomUUID();
    return `req-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
//# sourceMappingURL=run.js.map