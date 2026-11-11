"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesSection = NotesSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const notes_js_1 = require("./notes.js");
const C = {
    ink: '#44403c',
    ink2: '#78716c',
    ink3: '#a8a29e',
    line: '#e5e0d8',
    bg: '#faf8f5',
    white: '#fff',
    blue: '#3B6FE0',
    green: '#15803d',
    amber: '#a16207',
    red: '#dc2626',
};
const STAT_LABEL = 'font-size:12px;color:#78716c;display:block;margin:0 0 6px';
const TITLE_LIMIT = 500;
function StatCard(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { onClick: props.onClick, style: {
            background: C.white,
            border: props.active ? `1.5px solid ${C.blue}` : `1px solid ${C.line}`,
            borderRadius: 12,
            padding: '14px 16px',
            cursor: props.onClick ? 'pointer' : 'default',
        }, children: [(0, jsx_runtime_1.jsx)("i", { style: { ...{ display: 'block', fontStyle: 'normal' }, fontSize: 12, color: C.ink2, margin: '0 0 6px' }, children: props.label }), (0, jsx_runtime_1.jsx)("b", { style: { fontSize: 22, color: props.color }, children: props.value })] }));
}
function NoteRow(props) {
    const { note } = props;
    const done = note.status === 'done';
    const due = (0, notes_js_1.humanDue)(note.dueAt, props.today);
    const tags = (0, notes_js_1.parseTags)(note.tags);
    const dueColor = due.tone === 'overdue' ? C.red : due.tone === 'today' ? C.amber : C.ink3;
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            padding: '11px 4px',
            borderBottom: `1px solid ${C.line}`,
            opacity: done ? 0.55 : 1,
        }, children: [(0, jsx_runtime_1.jsx)("div", { onClick: () => !props.busy && props.onToggle(note.note_id), title: done ? '取消完成' : '标记完成', style: {
                    width: 19,
                    height: 19,
                    border: done ? 'none' : `1.5px solid ${C.ink3}`,
                    borderRadius: 5,
                    background: done ? C.green : 'transparent',
                    color: C.white,
                    fontSize: 13,
                    lineHeight: '19px',
                    textAlign: 'center',
                    cursor: props.busy ? 'default' : 'pointer',
                    flexShrink: 0,
                    marginTop: 1,
                    userSelect: 'none',
                }, children: done ? '✓' : '' }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                            fontSize: 14,
                            color: C.ink,
                            textDecoration: done ? 'line-through' : 'none',
                            wordBreak: 'break-word',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }, children: [note.priority === 'high' && !done ? ((0, jsx_runtime_1.jsx)("span", { style: { color: notes_js_1.PRIORITY_COLOR.high, marginRight: 5 }, children: "\u25CF" })) : null, note.title] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4, fontSize: 12, color: C.ink3 }, children: [due.text ? (0, jsx_runtime_1.jsx)("span", { style: { color: dueColor }, children: due.text }) : null, note.priority !== 'normal' ? ((0, jsx_runtime_1.jsx)("span", { style: { color: notes_js_1.PRIORITY_COLOR[note.priority] || C.ink3 }, children: notes_js_1.PRIORITY_LABEL[note.priority] || note.priority })) : null, tags.map((t) => ((0, jsx_runtime_1.jsx)("span", { style: { background: C.bg, borderRadius: 4, padding: '0 5px' }, children: t }, t))), note.detail ? ((0, jsx_runtime_1.jsx)("span", { style: { color: C.ink3, cursor: 'pointer' }, onClick: () => props.onEdit(note), children: "\u6709\u5907\u6CE8" })) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, flexShrink: 0, fontSize: 12 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: C.blue, cursor: 'pointer' }, onClick: () => props.onEdit(note), children: "\u7F16\u8F91" }), (0, jsx_runtime_1.jsx)("span", { style: { color: C.ink3, cursor: 'pointer' }, onClick: () => !props.busy && props.onDelete(note.note_id), children: "\u5220\u9664" })] })] }));
}
function NotesSection(props) {
    const [items, setItems] = (0, react_1.useState)([]);
    const [stats, setStats] = (0, react_1.useState)({ open: 0, done: 0, overdue: 0, today: 0 });
    const [health, setHealth] = (0, react_1.useState)(null);
    const [filter, setFilter] = (0, react_1.useState)('open');
    const [q, setQ] = (0, react_1.useState)('');
    const [draft, setDraft] = (0, react_1.useState)('');
    const [draftDue, setDraftDue] = (0, react_1.useState)('');
    const [draftPriority, setDraftPriority] = (0, react_1.useState)('normal');
    const [editing, setEditing] = (0, react_1.useState)(null);
    const [busy, setBusy] = (0, react_1.useState)(false);
    const [msg, setMsg] = (0, react_1.useState)(null);
    const today = (0, notes_js_1.todayStr)();
    const say = (text, bad = false) => {
        setMsg({ text, bad });
        window.setTimeout(() => setMsg(null), 4000);
    };
    const load = (0, react_1.useCallback)(async () => {
        try {
            const [h, s, l] = await Promise.all([
                (0, notes_js_1.notesHealth)(),
                (0, notes_js_1.notesStats)(),
                (0, notes_js_1.notesList)({
                    status: filter === 'done' ? 'done' : filter === 'open' || filter === 'overdue' ? 'open' : '',
                    q: q.trim(),
                    limit: 200,
                }),
            ]);
            setHealth(h);
            setStats({
                open: Number(s.open ?? 0),
                done: Number(s.done ?? 0),
                overdue: Number(s.overdue ?? 0),
                today: Number(s.today ?? 0),
            });
            let list = l.items || [];
            if (filter === 'overdue') {
                const t = (0, notes_js_1.todayStr)();
                list = list.filter((n) => n.dueAt && String(n.dueAt).slice(0, 10) < t);
            }
            setItems(list);
        }
        catch (e) {
            say(e.message, true);
        }
    }, [filter, q]);
    (0, react_1.useEffect)(() => {
        void load();
    }, [load, props.reloadTick]);
    async function onAdd() {
        const title = draft.trim();
        if (!title)
            return;
        setBusy(true);
        try {
            await (0, notes_js_1.noteCreate)({
                title,
                dueAt: draftDue,
                priority: draftPriority,
            });
            setDraft('');
            setDraftDue('');
            setDraftPriority('normal');
            await load();
            say('记下了');
        }
        catch (e) {
            say(e.message, true);
        }
        finally {
            setBusy(false);
        }
    }
    async function onToggle(id) {
        setBusy(true);
        try {
            await (0, notes_js_1.noteToggle)(id);
            await load();
        }
        catch (e) {
            say(e.message, true);
        }
        finally {
            setBusy(false);
        }
    }
    async function onDelete(id) {
        if (!window.confirm('删掉这条事项？删了就找不回来了。'))
            return;
        setBusy(true);
        try {
            await (0, notes_js_1.noteDelete)(id);
            await load();
            say('已删除');
        }
        catch (e) {
            say(e.message, true);
        }
        finally {
            setBusy(false);
        }
    }
    async function onSaveEdit() {
        if (!editing)
            return;
        setBusy(true);
        try {
            await (0, notes_js_1.noteUpdate)(editing.note_id, {
                title: editing.title,
                detail: editing.detail,
                dueAt: editing.dueAt,
                priority: editing.priority,
            });
            setEditing(null);
            await load();
            say('已保存');
        }
        catch (e) {
            say(e.message, true);
        }
        finally {
            setBusy(false);
        }
    }
    const storageNote = health?.storage === 'local-only'
        ? '这些事项只存在你这台电脑上，不会上传到山海。'
        : health?.storage === 'cloud'
            ? '这些事项存在山海的服务器上（已加密）。需要只存本地，请联系我们。'
            : '';
    return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '4px 0' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: 15, fontWeight: 600, color: C.ink }, children: "\u8BB0\u4E8B\u672C" }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: 12, color: C.ink3, marginTop: 3 }, children: "\u968F\u624B\u8BB0\u4E0B\u8981\u505A\u7684\u4E8B \u00B7 \u52FE\u6389\u5C31\u5B8C\u6210" })] }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: 12, color: C.ink3 }, children: today })] }), storageNote ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                    background: C.bg,
                    border: `1px solid ${C.line}`,
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 12,
                    color: C.ink2,
                    marginBottom: 12,
                    lineHeight: 1.6,
                }, children: [health?.storage === 'local-only' ? '🔒 ' : '☁️ ', storageNote] })) : null, (0, jsx_runtime_1.jsxs)("div", { style: { background: C.white, border: `1px solid ${C.line}`, borderRadius: 12, padding: '12px 14px', marginBottom: 12 }, children: [(0, jsx_runtime_1.jsx)("textarea", { value: draft, rows: 2, onChange: (e) => {
                            setDraft(e.target.value);
                            const el = e.currentTarget;
                            el.style.height = 'auto';
                            el.style.height = Math.min(el.scrollHeight, 6 * 22 + 20) + 'px';
                        }, onKeyDown: (e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                void onAdd();
                            }
                        }, placeholder: "\u8981\u505A\u4EC0\u4E48\uFF1F\u56DE\u8F66\u5C31\u8BB0\u4E0B\uFF0CShift+\u56DE\u8F66\u6362\u884C\uFF08\u4F8B\u5982\uFF1A\u4E0B\u5468\u4E09\u7ED9\u738B\u59D0\u56DE\u7535\uFF09", style: {
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '10px 12px',
                            border: `1px solid ${C.line}`,
                            borderRadius: 8,
                            fontSize: 14,
                            color: C.ink,
                            outline: 'none',
                            fontFamily: 'inherit',
                            lineHeight: '22px',
                            minHeight: 66,
                            maxHeight: 152,
                            resize: 'none',
                            overflowY: 'auto',
                        } }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: 11, color: C.ink3, textAlign: 'right', marginTop: 4 }, children: draft.length > TITLE_LIMIT ? ((0, jsx_runtime_1.jsxs)("span", { style: { color: C.red || '#d4380d' }, children: ["\u5DEE ", draft.length - TITLE_LIMIT, " \u5B57\u8D85\u4E86\uFF0C\u51CF\u4E00\u51CF"] })) : draft.length > TITLE_LIMIT * 0.8 ? ((0, jsx_runtime_1.jsxs)("span", { children: [draft.length, " / ", TITLE_LIMIT] })) : null }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, alignItems: 'center', marginTop: 8, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("input", { type: "date", value: draftDue, onChange: (e) => setDraftDue(e.target.value), style: { padding: '6px 8px', border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 12, color: C.ink2, fontFamily: 'inherit' } }), (0, jsx_runtime_1.jsxs)("select", { value: draftPriority, onChange: (e) => setDraftPriority(e.target.value), style: { padding: '6px 8px', border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 12, color: C.ink2, fontFamily: 'inherit' }, children: [(0, jsx_runtime_1.jsx)("option", { value: "high", children: "\u7D27\u6025" }), (0, jsx_runtime_1.jsx)("option", { value: "normal", children: "\u666E\u901A" }), (0, jsx_runtime_1.jsx)("option", { value: "low", children: "\u4E0D\u6025" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void onAdd(), disabled: busy || !draft.trim(), style: {
                                    marginLeft: 'auto',
                                    padding: '8px 18px',
                                    border: 'none',
                                    borderRadius: 8,
                                    background: draft.trim() && !busy ? C.blue : C.line,
                                    color: draft.trim() && !busy ? C.white : C.ink3,
                                    fontSize: 13,
                                    cursor: draft.trim() && !busy ? 'pointer' : 'default',
                                    fontFamily: 'inherit',
                                }, children: "\u8BB0\u4E0B" })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 12 }, children: [(0, jsx_runtime_1.jsx)(StatCard, { label: "\u5F85\u529E", value: stats.open, color: C.ink, active: filter === 'open', onClick: () => setFilter('open') }), (0, jsx_runtime_1.jsx)(StatCard, { label: "\u4ECA\u65E5\u5230\u671F", value: stats.today, color: C.amber }), (0, jsx_runtime_1.jsx)(StatCard, { label: "\u5DF2\u903E\u671F", value: stats.overdue, color: C.red, active: filter === 'overdue', onClick: () => setFilter('overdue') }), (0, jsx_runtime_1.jsx)(StatCard, { label: "\u5DF2\u5B8C\u6210", value: stats.done, color: C.green, active: filter === 'done', onClick: () => setFilter('done') })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }, children: [[['open', '待办'], ['done', '已完成'], ['all', '全部']].map(([k, label]) => ((0, jsx_runtime_1.jsx)("span", { onClick: () => setFilter(k), style: {
                            padding: '5px 12px',
                            borderRadius: 14,
                            fontSize: 12,
                            cursor: 'pointer',
                            background: filter === k ? C.blue : C.white,
                            color: filter === k ? C.white : C.ink2,
                            border: `1px solid ${filter === k ? C.blue : C.line}`,
                        }, children: label }, k))), (0, jsx_runtime_1.jsx)("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "\u641C\u6807\u9898\u2026", style: {
                            marginLeft: 'auto',
                            padding: '6px 10px',
                            border: `1px solid ${C.line}`,
                            borderRadius: 8,
                            fontSize: 12,
                            color: C.ink,
                            outline: 'none',
                            width: 150,
                            fontFamily: 'inherit',
                        } }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void load(), style: { padding: '6px 12px', border: `1px solid ${C.line}`, background: C.white, borderRadius: 8, fontSize: 12, cursor: 'pointer', color: C.ink2, fontFamily: 'inherit' }, children: "\u5237\u65B0" })] }), msg ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: 12, color: msg.bad ? C.red : C.green, marginBottom: 8 }, children: msg.text })) : null, (0, jsx_runtime_1.jsx)("div", { style: { background: C.white, border: `1px solid ${C.line}`, borderRadius: 12, padding: '4px 16px' }, children: items.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { padding: '28px 0', textAlign: 'center', fontSize: 13, color: C.ink3, lineHeight: 1.9 }, children: q.trim()
                        ? '没搜到。换个词试试。'
                        : filter === 'done'
                            ? '还没有完成的事项。'
                            : '还没有事项 —— 上面写一句，回车就记下了。' })) : (items.map((n) => ((0, jsx_runtime_1.jsx)(NoteRow, { note: n, today: today, busy: busy, onToggle: onToggle, onEdit: setEditing, onDelete: onDelete }, n.note_id)))) }), editing ? ((0, jsx_runtime_1.jsx)("div", { style: {
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                }, onClick: () => setEditing(null), children: (0, jsx_runtime_1.jsxs)("div", { onClick: (e) => e.stopPropagation(), style: { background: C.white, borderRadius: 12, padding: 20, width: 520, maxWidth: '92vw', maxHeight: '86vh', overflow: 'auto' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: 15, fontWeight: 600, color: C.ink, marginBottom: 12 }, children: "\u7F16\u8F91\u4E8B\u9879" }), (0, jsx_runtime_1.jsx)("input", { value: editing.title, onChange: (e) => setEditing({ ...editing, title: e.target.value }), style: { width: '100%', boxSizing: 'border-box', padding: '9px 11px', border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 14, color: C.ink, marginBottom: 8, fontFamily: 'inherit' } }), (0, jsx_runtime_1.jsx)("textarea", { value: editing.detail, onChange: (e) => setEditing({ ...editing, detail: e.target.value }), placeholder: "\u5907\u6CE8\uFF08\u53EF\u9009\uFF09", rows: 5, style: { width: '100%', boxSizing: 'border-box', padding: '9px 11px', border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 13, color: C.ink, marginBottom: 8, fontFamily: 'inherit', resize: 'vertical' } }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("input", { type: "date", value: String(editing.dueAt || '').slice(0, 10), onChange: (e) => setEditing({ ...editing, dueAt: e.target.value }), style: { padding: '7px 9px', border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 12, color: C.ink2, fontFamily: 'inherit' } }), (0, jsx_runtime_1.jsxs)("select", { value: editing.priority, onChange: (e) => setEditing({ ...editing, priority: e.target.value }), style: { padding: '7px 9px', border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 12, color: C.ink2, fontFamily: 'inherit' }, children: [(0, jsx_runtime_1.jsx)("option", { value: "high", children: "\u7D27\u6025" }), (0, jsx_runtime_1.jsx)("option", { value: "normal", children: "\u666E\u901A" }), (0, jsx_runtime_1.jsx)("option", { value: "low", children: "\u4E0D\u6025" })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 10, justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setEditing(null), style: { padding: '8px 16px', border: `1px solid ${C.line}`, background: C.white, borderRadius: 8, fontSize: 13, cursor: 'pointer', color: C.ink2, fontFamily: 'inherit' }, children: "\u53D6\u6D88" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void onSaveEdit(), disabled: busy, style: { padding: '8px 16px', border: 'none', background: busy ? C.line : C.blue, color: busy ? C.ink3 : C.white, borderRadius: 8, fontSize: 13, cursor: busy ? 'default' : 'pointer', fontFamily: 'inherit' }, children: "\u4FDD\u5B58" })] })] }) })) : null] }));
}
//# sourceMappingURL=NotesSection.js.map