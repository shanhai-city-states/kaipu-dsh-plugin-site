"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestOnly = exports.SSE_IDLE_TIMEOUT_MS = exports.SSE_WATCHDOG_MS = exports.PUMP_EXHAUSTED_TEXT = exports.PUMP_REVIVE_MAX = exports.PUMP_REVIVE_AFTER = exports.POLL_OFFLINE_MS = exports.POLL_HIDDEN_MS = exports.POLL_SILENT_MS = exports.POLL_WEAK_MS = exports.POLL_STRONG_MS = void 0;
exports.levelOf = levelOf;
exports.pollIntervalFor = pollIntervalFor;
exports.openEventStream = openEventStream;
exports.onVisibilityChange = onVisibilityChange;
exports.subscribeEvents = subscribeEvents;
const bridge_js_1 = require("./bridge.js");
const live_js_1 = require("./live.js");
const LEVEL_OF_TYPE = {
    'task.posted': 'strong',
    'task.rejected': 'strong',
    'task.blocked': 'strong',
    'task.need_approval': 'strong',
    'task.claimed': 'weak',
    'task.started': 'weak',
    'task.submitted': 'weak',
    'task.approved': 'weak',
    'task.unblocked': 'silent',
    'stream.ready': 'silent',
    'stream.recycle': 'silent',
    'stream.lagged': 'silent',
};
function levelOf(type) {
    return LEVEL_OF_TYPE[type] ?? 'silent';
}
exports.POLL_STRONG_MS = 3_000;
exports.POLL_WEAK_MS = 10_000;
exports.POLL_SILENT_MS = 15_000;
exports.POLL_HIDDEN_MS = 30_000;
exports.POLL_OFFLINE_MS = 30_000;
exports.PUMP_REVIVE_AFTER = 2;
exports.PUMP_REVIVE_MAX = 5;
exports.PUMP_EXHAUSTED_TEXT = '实时连接无法自动恢复，请重开面板。';
exports.SSE_WATCHDOG_MS = 35_000;
exports.SSE_IDLE_TIMEOUT_MS = 35_000;
function pollIntervalFor(strongest, visible) {
    if (!visible)
        return exports.POLL_HIDDEN_MS;
    if (strongest === 'strong')
        return exports.POLL_STRONG_MS;
    if (strongest === 'weak')
        return exports.POLL_WEAK_MS;
    return exports.POLL_SILENT_MS;
}
class LatestOnly {
    applied = 0;
    next() {
        return ++this.seq;
    }
    seq = 0;
    accept(seq) {
        if (seq <= this.applied)
            return false;
        this.applied = seq;
        return true;
    }
    get current() {
        return this.applied;
    }
}
exports.LatestOnly = LatestOnly;
function humanizeStreamError(raw) {
    if (raw === null || raw.trim() === '')
        return '实时连接中断了，正在自动重连。';
    const s = raw.toLowerCase();
    if (s.includes('not_connected'))
        return '还没连上服务端，实时更新暂时不可用。';
    if (s.includes('401') || s.includes('通行证'))
        return '登录状态过期了，正在重新连接。';
    if (/\b5\d\d\b/u.test(s))
        return '服务端暂时没有响应，正在重试。';
    if (s.includes('fetch') || s.includes('连不上'))
        return '网络断了，正在重试。';
    return '实时连接中断了，正在自动重连。';
}
function openEventStream(conn, handlers) {
    const guard = new LatestOnly();
    let disposed = false;
    let timer = null;
    let cursor = 0;
    let pendingStrong = 0;
    let pendingWeak = 0;
    let lastBeatAt = 0;
    let running = false;
    let lastError = null;
    let lagged = false;
    let online = true;
    let deadReason = null;
    let lastAppliedSeq = 0;
    const netOnline = () => {
        const nav = globalThis.navigator;
        return nav?.onLine !== false;
    };
    const visible = () => {
        const d = globalThis.document;
        return d === undefined || d.hidden !== true;
    };
    const call = async (method, query) => {
        const r = await (0, bridge_js_1.callKaipu)(conn, method, query);
        return r;
    };
    const dispatch = (ev) => {
        const seq = typeof ev.seq === 'number' && Number.isFinite(ev.seq) ? ev.seq : 0;
        if (seq > 0 && seq <= lastAppliedSeq)
            return;
        if (seq > 0)
            lastAppliedSeq = seq;
        const level = levelOf(ev.type);
        if (level === 'strong') {
            pendingStrong += 1;
            handlers.onStrong?.(ev);
        }
        else if (level === 'weak') {
            pendingWeak += 1;
            handlers.onWeak?.(ev);
        }
    };
    const isDead = (staleMs) => {
        if (!online)
            return true;
        if (lastBeatAt > 0 && staleMs > exports.SSE_WATCHDOG_MS)
            return true;
        return !running;
    };
    const stateNow = () => {
        const now = Date.now();
        const staleMs = lastBeatAt === 0 ? 0 : Math.max(0, now - lastBeatAt);
        const dead = isDead(staleMs);
        const exhausted = dead && online && pumpReviveTotal >= exports.PUMP_REVIVE_MAX;
        let err = null;
        if (dead) {
            if (!online) {
                err = '本机网络已断开，恢复后会自动重连。';
            }
            else if (exhausted) {
                err = exports.PUMP_EXHAUSTED_TEXT;
            }
            else {
                err = humanizeStreamError(lastError);
            }
        }
        return {
            running: !dead,
            staleMs,
            error: err,
            lagged,
            strongest: pendingStrong > 0 ? 'strong' : (pendingWeak > 0 ? 'weak' : 'silent'),
        };
    };
    let pumpDownRounds = 0;
    let pumpReviveTotal = 0;
    const schedule = () => {
        if (disposed)
            return;
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
        const strongest = pendingStrong > 0 ? 'strong' : (pendingWeak > 0 ? 'weak' : 'silent');
        const suspectDead = !online || (lastBeatAt > 0 && Date.now() - lastBeatAt > exports.SSE_WATCHDOG_MS) || !running;
        const wait = suspectDead ? exports.POLL_STRONG_MS : pollIntervalFor(strongest, visible());
        timer = setTimeout(() => {
            void tick();
        }, wait);
    };
    const tick = async () => {
        if (disposed)
            return;
        online = netOnline();
        const seq = guard.next();
        const r = await call('pollEvents', { from: cursor });
        if (disposed)
            return;
        if (!guard.accept(seq))
            return;
        if (r === null || !r.ok) {
            running = false;
            handlers.onState?.(stateNow());
            schedule();
            return;
        }
        const d = r.data;
        running = d.running;
        lastBeatAt = d.lastBeatAt;
        lastError = d.error;
        lagged = d.lagged;
        if (d.running) {
            pumpDownRounds = 0;
            pumpReviveTotal = 0;
        }
        else {
            pumpDownRounds += 1;
            if (pumpDownRounds >= exports.PUMP_REVIVE_AFTER && pumpReviveTotal < exports.PUMP_REVIVE_MAX) {
                pumpDownRounds = 0;
                pumpReviveTotal += 1;
                void boot();
            }
        }
        if (d.lagged) {
            handlers.onLagged?.();
            lagged = false;
        }
        cursor = typeof d.next === 'number' && d.next >= 0 ? Math.max(cursor, d.next) : cursor;
        for (const ev of d.events)
            dispatch(ev);
        handlers.onState?.(stateNow());
        schedule();
        pendingStrong = 0;
        pendingWeak = 0;
    };
    const boot = async () => {
        const r = await call('startEventStream', {});
        if (r !== null && r.ok) {
            lastError = null;
        }
        else if (r !== null) {
            lastError = 'error' in r ? r.error.detail : r.business.message;
        }
        await tick();
    };
    void boot();
    const navObj = globalThis.navigator;
    const onNetChange = () => {
        if (disposed)
            return;
        const next = netOnline();
        online = next;
        handlers.onState?.(stateNow());
        if (next)
            void boot();
        else
            schedule();
    };
    if (navObj?.addEventListener !== undefined) {
        navObj.addEventListener('offline', onNetChange);
        navObj.addEventListener('online', onNetChange);
    }
    return {
        kick: async () => {
            if (disposed)
                return;
            await tick();
        },
        dispose: () => {
            if (disposed)
                return;
            disposed = true;
            if (timer !== null) {
                clearTimeout(timer);
                timer = null;
            }
            navObj?.removeEventListener?.('offline', onNetChange);
            navObj?.removeEventListener?.('online', onNetChange);
            void call('stopEventStream', {});
        },
    };
}
function onVisibilityChange(cb) {
    const d = globalThis.document;
    if (d === undefined || d.addEventListener === undefined)
        return () => { };
    const handler = () => {
        cb(d.hidden !== true);
    };
    d.addEventListener('visibilitychange', handler);
    return () => {
        d.removeEventListener?.('visibilitychange', handler);
    };
}
function subscribeEvents(handlers) {
    if (!(0, live_js_1.hasConnection)())
        return null;
    const conn = (0, live_js_1.getConnection)();
    if (conn === null)
        return null;
    const h = openEventStream(conn, handlers);
    const off = onVisibilityChange((visible) => {
        if (visible)
            void h.kick();
    });
    return {
        kick: h.kick,
        dispose: () => {
            off();
            h.dispose();
        },
    };
}
//# sourceMappingURL=events.js.map