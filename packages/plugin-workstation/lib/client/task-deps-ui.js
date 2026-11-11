"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDepsSection = TaskDepsSection;
exports.DeliverableVersionsSection = DeliverableVersionsSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const live_js_1 = require("./live.js");
const theme_js_1 = require("./theme.js");
const deps_text_js_1 = require("./deps-text.js");
const box = {
    marginTop: 8,
    padding: '8px 10px',
    border: `1px solid ${theme_js_1.C.border}`,
    borderRadius: 8,
};
const btn = (primary) => ({
    padding: '2px 8px',
    borderRadius: 6,
    border: `1px solid ${primary ? 'transparent' : theme_js_1.C.border}`,
    background: primary ? theme_js_1.C.accent : 'transparent',
    color: primary ? '#ffffff' : theme_js_1.C.text,
    fontSize: theme_js_1.FS.tag,
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
});
function CandidateList({ candidates, onPick, busy, }) {
    if (candidates.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsxs)("details", { style: { marginTop: 6 }, children: [(0, jsx_runtime_1.jsxs)("summary", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, cursor: 'pointer' }, children: ["\uFF0B \u9009\u4E00\u6761\u524D\u7F6E\u4EFB\u52A1\uFF08", candidates.length, "\uFF09"] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4, maxHeight: 180, overflow: 'auto' }, children: candidates.map((c) => ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: busy, onClick: () => onPick(c.id), style: { ...btn(false), textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis' }, title: c.title, children: c.title }, c.id))) })] }));
}
function TaskDepsSection({ taskId, allTasks, run, }) {
    const [deps, setDeps] = (0, react_1.useState)(null);
    const [err, setErr] = (0, react_1.useState)(null);
    const [busy, setBusy] = (0, react_1.useState)(false);
    const reload = () => {
        void (0, live_js_1.loadTaskDeps)(taskId).then((r) => {
            if (r.ok) {
                setDeps(r.data);
                setErr(null);
            }
            else
                setErr(`${r.code}：${r.message}`);
        });
    };
    (0, react_1.useEffect)(reload, [taskId]);
    const candidates = deps === null ? [] : (0, deps_text_js_1.pickDepCandidates)(taskId, allTasks, deps);
    const doAdd = (depId) => {
        setBusy(true);
        void run(async () => {
            const r = await (0, live_js_1.addTaskDep)(taskId, depId);
            return r.ok ? { ok: true } : { ok: false, code: r.code, message: r.message };
        }, '已加依赖').then(() => { setBusy(false); reload(); });
    };
    const doRemove = (depId) => {
        setBusy(true);
        void run(async () => {
            const r = await (0, live_js_1.removeTaskDep)(taskId, depId);
            return r.ok ? { ok: true } : { ok: false, code: r.code, message: r.message };
        }, '已撤依赖').then(() => { setBusy(false); reload(); });
    };
    if (err !== null) {
        return (0, jsx_runtime_1.jsx)("div", { style: { ...box, borderColor: '#e5b4b4' }, children: (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: '#9b2c2c' }, children: ["\u4F9D\u8D56\u8BFB\u4E0D\u5230\uFF08", err, "\uFF09"] }) });
    }
    if (deps === null) {
        return (0, jsx_runtime_1.jsx)("div", { style: { ...box }, children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint }, children: "\u4F9D\u8D56\u8BFB\u53D6\u4E2D\u2026" }) });
    }
    const idle = deps.dependsOn.length === 0 && deps.blocks.length === 0;
    return ((0, jsx_runtime_1.jsxs)("div", { style: box, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, fontWeight: 600, color: theme_js_1.C.dim, marginBottom: 4 }, children: (0, deps_text_js_1.depsHeadline)(deps) }), deps.dependsOn.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 4 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint }, children: "\u6211\u7B49\u8FD9\u4E9B\u5148\u4EA4\uFF1A" }), deps.dependsOn.map((d) => ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, title: d.title, children: (0, deps_text_js_1.depLine)(d) }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: busy, onClick: () => doRemove(d.id), style: btn(false), title: "\u64A4\u6389\u8FD9\u6761\u4F9D\u8D56 \u2014\u2014 \u64A4\u4E86\u8FD9\u6761\u4EFB\u52A1\u53EF\u80FD\u7ACB\u523B\u53EF\u4EE5\u9886", children: "\u64A4" })] }, d.id)))] })) : null, deps.blocks.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 4 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint }, children: "\u6211\u6321\u7740\u8FD9\u4E9B\uFF08\u6211\u4EA4\u4E86\u5B83\u4EEC\u624D\u80FD\u52A8\uFF09\uFF1A" }), deps.blocks.map((d) => ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, title: d.title, children: (0, deps_text_js_1.depLine)(d) }, d.id)))] })) : null, idle ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint }, children: "\u6CA1\u6709\u4F9D\u8D56 \u2014\u2014 \u8FD9\u6761\u73B0\u5728\u5C31\u80FD\u9886\uFF0C\u4E5F\u4E0D\u6321\u522B\u4EBA\u7684\u6D3B\u3002" })) : null, (0, jsx_runtime_1.jsx)(CandidateList, { candidates: candidates, onPick: doAdd, busy: busy })] }));
}
function DeliverableVersionsSection({ taskId, run, }) {
    const [dl, setDl] = (0, react_1.useState)(null);
    const [err, setErr] = (0, react_1.useState)(null);
    const [busy, setBusy] = (0, react_1.useState)(false);
    const reload = () => {
        void (0, live_js_1.loadDeliverables)(taskId).then((r) => {
            if (r.ok) {
                setDl(r.data);
                setErr(null);
            }
            else
                setErr(`${r.code}：${r.message}`);
        });
    };
    (0, react_1.useEffect)(reload, [taskId]);
    const doPromote = (did) => {
        setBusy(true);
        void run(async () => {
            const r = await (0, live_js_1.promoteDeliverable)(taskId, did);
            return r.ok ? { ok: true } : { ok: false, code: r.code, message: r.message };
        }, '已切换最终稿').then(() => { setBusy(false); reload(); });
    };
    if (err !== null) {
        return (0, jsx_runtime_1.jsx)("div", { style: { ...box, borderColor: '#e5b4b4' }, children: (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: '#9b2c2c' }, children: ["\u4EA4\u4ED8\u7248\u672C\u8BFB\u4E0D\u5230\uFF08", err, "\uFF09"] }) });
    }
    if (dl === null) {
        return (0, jsx_runtime_1.jsx)("div", { style: { ...box }, children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint }, children: "\u4EA4\u4ED8\u7248\u672C\u8BFB\u53D6\u4E2D\u2026" }) });
    }
    if (dl.count === 0) {
        return (0, jsx_runtime_1.jsx)("div", { style: box, children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint }, children: "\u8FD8\u6CA1\u4EA4\u8FC7\u4E1C\u897F \u2014\u2014 \u4EA4\u4E86\u7B2C\u4E00\u7A3F\u8FD9\u91CC\u4F1A\u6709\u7248\u672C\u3002" }) });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: box, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, fontWeight: 600, color: theme_js_1.C.dim, marginBottom: 2 }, children: (0, deps_text_js_1.versionLine)(dl) }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, marginBottom: 6 }, children: (0, deps_text_js_1.versionHint)(dl) }), dl.items.map((it) => {
                const isFinal = it.is_final === 1;
                return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, fontWeight: isFinal ? 700 : 400, flex: '0 0 auto' }, children: ["v", it.version] }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, title: `${it.filename} · ${it.sha256}`, children: it.filename }), isFinal ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: '#1e7e42', flex: '0 0 auto' }, children: "\u6700\u7EC8\u7A3F" })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: busy, onClick: () => doPromote(it.id), style: btn(false), title: "\u628A\u8FD9\u4E00\u7A3F\u6307\u5B9A\u4E3A\u6700\u7EC8\u7A3F\uFF08\u4E0B\u4E00\u7A3F\u4EA4\u574F\u4E86\uFF0C\u7528\u5B83\u56DE\u9000\uFF09", children: "\u8BBE\u4E3A\u6700\u7EC8" }))] }, it.id));
            })] }));
}
//# sourceMappingURL=task-deps-ui.js.map