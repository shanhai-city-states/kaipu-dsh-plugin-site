"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRIORITY_COLOR = exports.PRIORITY_LABEL = void 0;
exports.setNotesConnection = setNotesConnection;
exports.notesHealth = notesHealth;
exports.notesStats = notesStats;
exports.notesList = notesList;
exports.noteCreate = noteCreate;
exports.noteUpdate = noteUpdate;
exports.noteToggle = noteToggle;
exports.noteDelete = noteDelete;
exports.humanDue = humanDue;
exports.dayGap = dayGap;
exports.todayStr = todayStr;
exports.parseTags = parseTags;
const bridge_js_1 = require("./bridge.js");
let connection = null;
function setNotesConnection(conn) {
    connection = conn;
}
function translateError(r) {
    if (r.ok === true)
        return { code: '', message: '' };
    const anyR = r;
    const biz = anyR.business;
    const err = anyR.error;
    const code = String(biz?.code ?? err?.code ?? '');
    const kind = String(err?.kind ?? (biz !== undefined ? 'business' : ''));
    if (kind === 'unreachable' || kind === 'no_channel') {
        return { code: code || 'unreachable', message: '连不上服务端，请检查网络后重试。' };
    }
    if (code === 'not_found' || code === 'endpoint_not_found') {
        return {
            code,
            message: '这个功能在当前版本的服务端还没开通，请更新后再试。',
        };
    }
    const KNOWN = {
        note_not_found: '这条事项不存在，可能已经被删掉了。',
        note_id_required: '缺少事项标识。',
        title_required: '事项标题不能是空的 —— 写一句话就能记下来。',
        title_too_long: '这件事写得有点长（上限 500 字），把要点写前面就行。',
        detail_too_long: '正文太长了（上限 5000 字），可以拆成几条。',
        status_invalid: '状态不对，请刷新后重试。',
        priority_invalid: '优先级不对，请刷新后重试。',
        notes_not_enabled: '记事本还没启用，请联系管理员。',
        notes_crypto_unavailable: '内容服务暂时不可用，请稍后重试；内容本身没有丢失。',
    };
    if (KNOWN[code])
        return { code, message: KNOWN[code] };
    return {
        code: code || 'unknown',
        message: String(biz?.message ?? '').trim() || '操作没成功，请稍后重试。',
    };
}
async function rpc(name, payload) {
    if (!connection) {
        throw new Error('没取到宿主的数据通道，这是环境问题，不是你的操作有问题。请重开面板再试。');
    }
    const r = await (0, bridge_js_1.callKaipu)(connection, name, payload);
    if (r.ok !== true) {
        const { message } = translateError(r);
        throw new Error(message);
    }
    return r.data;
}
async function notesHealth() {
    return rpc('notesHealth', {});
}
async function notesStats() {
    return rpc('notesStats', {});
}
async function notesList(query) {
    return rpc('notesList', query);
}
async function noteCreate(body) {
    const r = await rpc('notesCreate', body);
    return r.note;
}
async function noteUpdate(nid, body) {
    const r = await rpc('notesUpdate', { noteId: nid, ...body });
    return r.note;
}
async function noteToggle(nid) {
    const r = await rpc('notesToggle', { noteId: nid });
    return r.note;
}
async function noteDelete(nid) {
    const r = await rpc('notesDelete', { noteId: nid });
    return Boolean(r.deleted);
}
function humanDue(dueAt, today) {
    if (!dueAt)
        return { text: '', tone: 'none' };
    const d = String(dueAt).slice(0, 10);
    if (d === today)
        return { text: '今天', tone: 'today' };
    if (d < today) {
        const n = dayGap(d, today);
        return { text: n === 1 ? '昨天' : `逾期 ${n} 天`, tone: 'overdue' };
    }
    const gap = dayGap(today, d);
    if (gap === 1)
        return { text: '明天', tone: 'soon' };
    if (gap <= 7)
        return { text: `${gap} 天后`, tone: 'soon' };
    return { text: d, tone: 'later' };
}
function dayGap(a, b) {
    const toUTC = (s) => {
        const [y, m, d] = s.slice(0, 10).split('-').map(Number);
        return Date.UTC(y || 1970, (m || 1) - 1, d || 1);
    };
    return Math.round((toUTC(b) - toUTC(a)) / 86400000);
}
function todayStr(d = new Date()) {
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function parseTags(tags) {
    if (!tags)
        return [];
    try {
        const v = JSON.parse(tags);
        return Array.isArray(v) ? v.map(String) : [];
    }
    catch {
        return String(tags)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
    }
}
exports.PRIORITY_LABEL = {
    high: '紧急',
    normal: '普通',
    low: '不急',
};
exports.PRIORITY_COLOR = {
    high: '#dc2626',
    normal: '#78716c',
    low: '#a8a29e',
};
//# sourceMappingURL=notes.js.map