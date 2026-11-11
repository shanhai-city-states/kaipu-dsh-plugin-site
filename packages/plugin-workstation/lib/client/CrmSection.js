"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmSection = CrmSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const theme_js_1 = require("./theme.js");
const crm_js_1 = require("./crm.js");
const card = {
    border: `1px solid ${theme_js_1.C.border}`,
    borderRadius: 10,
    padding: '12px 14px',
    background: theme_js_1.C.soft,
};
const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '7px 9px',
    borderRadius: 7,
    border: `1px solid ${theme_js_1.C.border}`,
    background: 'transparent',
    color: theme_js_1.C.text,
    fontSize: theme_js_1.FS.small,
    fontFamily: 'inherit',
};
function btn(primary, disabled = false) {
    return {
        padding: '6px 12px',
        borderRadius: 7,
        border: primary ? 'none' : `1px solid ${theme_js_1.C.border}`,
        background: primary ? theme_js_1.C.accent : 'transparent',
        color: primary ? '#fff' : theme_js_1.C.dim,
        fontSize: theme_js_1.FS.small,
        fontFamily: 'inherit',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        whiteSpace: 'nowrap',
    };
}
const STAGE_COLOR = {
    lead: '#8a8a8a',
    following: '#3B6FE0',
    pending_approval: '#d97706',
    won: '#16a34a',
    stalled: '#c0392b',
};
const CHANNEL_LABEL = {
    phone: '电话',
    visit: '拜访',
    wechat: '微信',
    email: '邮件',
    other: '其他',
};
const CHANNELS = [
    { k: 'phone', label: '电话' },
    { k: 'wechat', label: '微信' },
    { k: 'visit', label: '拜访' },
    { k: 'email', label: '邮件' },
    { k: 'other', label: '其他' },
];
function shortTime(iso) {
    if (!iso)
        return '';
    const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(iso);
    if (m === null)
        return '';
    return `${m[2]}-${m[3]} ${m[4]}:${m[5]}`;
}
function CrmSection({ reloadTick }) {
    const [customers, setCustomers] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [loadErr, setLoadErr] = (0, react_1.useState)('');
    const [funnel, setFunnel] = (0, react_1.useState)(null);
    const [guard, setGuard] = (0, react_1.useState)(null);
    const [q, setQ] = (0, react_1.useState)('');
    const [showCreate, setShowCreate] = (0, react_1.useState)(false);
    const [nName, setNName] = (0, react_1.useState)('');
    const [nTax, setNTax] = (0, react_1.useState)('');
    const [nPhone, setNPhone] = (0, react_1.useState)('');
    const [busy, setBusy] = (0, react_1.useState)(false);
    const [msg, setMsg] = (0, react_1.useState)(null);
    const [openId, setOpenId] = (0, react_1.useState)('');
    const reload = (0, react_1.useCallback)(async () => {
        setLoading(true);
        setLoadErr('');
        const r = await (0, crm_js_1.loadCustomers)({ q, limit: 200 });
        if (r.ok === true) {
            setCustomers(r.data.items);
        }
        else {
            setCustomers([]);
            setLoadErr(r.message);
        }
        const f = await (0, crm_js_1.loadFunnel)();
        setFunnel(f.ok === true ? f.data : null);
        const g = await (0, crm_js_1.loadGuardInfo)();
        setGuard(g.ok === true ? g.data : null);
        setLoading(false);
    }, [q]);
    (0, react_1.useEffect)(() => { void reload(); }, [reload, reloadTick]);
    const doCreate = async () => {
        if (nName.trim() === '') {
            setMsg({ kind: 'err', text: '请填写客户名称。' });
            return;
        }
        setBusy(true);
        setMsg(null);
        const r = await (0, crm_js_1.createCustomer)({ name: nName.trim(), taxId: nTax.trim(), phone: nPhone.trim() });
        setBusy(false);
        if (r.ok === true) {
            setMsg({ kind: 'ok', text: `已建档：${r.data.name}` });
            setNName('');
            setNTax('');
            setNPhone('');
            setShowCreate(false);
            void reload();
        }
        else {
            setMsg({ kind: 'err', text: r.message });
        }
    };
    const doArchive = async (c) => {
        const pre = await (0, crm_js_1.precheckIrreversible)('customer.archive');
        if (pre.ok === true && pre.data.allowed === false) {
            setMsg({ kind: 'err', text: pre.data.wording ?? '这个动作需要先审批。' });
            return;
        }
        setBusy(true);
        const r = await (0, crm_js_1.archiveCustomer)(c.customer_id);
        setBusy(false);
        if (r.ok === true) {
            setMsg({ kind: 'ok', text: `已归档：${c.name}（可随时恢复）` });
            void reload();
        }
        else {
            setMsg({ kind: 'err', text: r.message });
        }
    };
    const funnelBar = (() => {
        if (funnel === null)
            return null;
        if (!funnel.ready) {
            return ((0, jsx_runtime_1.jsx)("div", { style: { ...card, marginBottom: 10, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: funnel.reason ?? '漏斗数据暂时取不到。' }));
        }
        const order = [
            ['lead', '线索'], ['following', '跟进中'], ['pending_approval', '待审批'],
            ['won', '已成交'], ['stalled', '已停滞'],
        ];
        return ((0, jsx_runtime_1.jsxs)("div", { style: { ...card, marginBottom: 10 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }, children: order.map(([k, label]) => {
                        const n = funnel.stages[k] ?? 0;
                        return ((0, jsx_runtime_1.jsxs)("span", { style: {
                                display: 'inline-flex', alignItems: 'center', gap: 4,
                                padding: '3px 8px', borderRadius: 20, fontSize: theme_js_1.FS.tag,
                                border: `1px solid ${n > 0 ? STAGE_COLOR[k] : theme_js_1.C.border}`,
                                color: n > 0 ? STAGE_COLOR[k] : theme_js_1.C.dim,
                            }, children: [label, " ", (0, jsx_runtime_1.jsx)("b", { children: n })] }, k));
                    }) }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: ["\u5171 ", funnel.totals.customers, " \u4F4D\u5BA2\u6237", funnel.totals.linked < funnel.totals.customers
                            ? `（其中 ${funnel.totals.customers - funnel.totals.linked} 位还没挂项目）`
                            : ''] })] }));
    })();
    const guardHint = (() => {
        if (guard === null)
            return null;
        return ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginBottom: 8, lineHeight: theme_js_1.LH.normal }, children: [guard.wording, (0, jsx_runtime_1.jsxs)("span", { style: { opacity: 0.7 }, children: ["\uFF08\u672C\u94FA ", guard.agentCount, " \u4E2A Agent\uFF09"] })] }));
    })();
    return ((0, jsx_runtime_1.jsxs)("div", { children: [funnelBar, guardHint, (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, marginBottom: 10 }, children: [(0, jsx_runtime_1.jsx)("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "\u641C\u5BA2\u6237\u540D / \u7A0E\u53F7 / \u7535\u8BDD", style: { ...inputStyle, flex: 1 } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setShowCreate((v) => !v), style: btn(!showCreate), children: showCreate ? '取消' : '+ 新客户' })] }), showCreate ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...card, marginBottom: 10 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, fontWeight: 600, marginBottom: 8 }, children: "\u5EFA\u5BA2\u6237\u6863\u6848" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [(0, jsx_runtime_1.jsx)("input", { value: nName, onChange: (e) => setNName(e.target.value), placeholder: "\u5BA2\u6237\u540D\u79F0\uFF08\u5FC5\u586B\uFF0C\u5199\u5168\u79F0\uFF09", style: inputStyle }), (0, jsx_runtime_1.jsx)("input", { value: nTax, onChange: (e) => setNTax(e.target.value), placeholder: "\u7EDF\u4E00\u793E\u4F1A\u4FE1\u7528\u4EE3\u7801 / \u7A0E\u53F7\uFF08\u9009\u586B\uFF0C\u586B\u4E86\u80FD\u9632\u649E\u5355\uFF09", style: inputStyle }), (0, jsx_runtime_1.jsx)("input", { value: nPhone, onChange: (e) => setNPhone(e.target.value), placeholder: "\u8054\u7CFB\u7535\u8BDD\uFF08\u9009\u586B\uFF09", style: inputStyle }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void doCreate(), disabled: busy, style: btn(true, busy), children: busy ? '保存中…' : '建档' }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u540D\u79F0\u6216\u7A0E\u53F7\u91CD\u590D\u4F1A\u88AB\u62E6\u4E0B\uFF0C\u8BA9\u4F60\u786E\u8BA4\u662F\u4E0D\u662F\u540C\u4E00\u5BB6" })] })] })] })) : null, msg !== null ? ((0, jsx_runtime_1.jsx)("div", { style: {
                    marginBottom: 10, padding: '7px 10px', borderRadius: 7, fontSize: theme_js_1.FS.small,
                    background: msg.kind === 'ok' ? 'rgba(22,163,74,0.10)' : 'rgba(192,57,43,0.10)',
                    color: msg.kind === 'ok' ? '#16a34a' : '#c0392b',
                }, children: msg.text })) : null, loading ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u52A0\u8F7D\u4E2D\u2026" })) : loadErr !== '' ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...card, fontSize: theme_js_1.FS.small, color: '#c0392b' }, children: [loadErr, (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void reload(), style: { ...btn(false), marginLeft: 10 }, children: "\u91CD\u8BD5" })] })) : customers.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { ...card, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: q.trim() !== ''
                    ? `没找到匹配「${q.trim()}」的客户。`
                    : '还没有客户。点上面「+ 新客户」建第一个。' })) : ((0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: customers.map((c) => ((0, jsx_runtime_1.jsx)(CustomerRow, { c: c, open: openId === c.customer_id, onToggle: () => setOpenId(openId === c.customer_id ? '' : c.customer_id), onArchive: () => void doArchive(c), busy: busy }, c.customer_id))) }))] }));
}
function CustomerRow({ c, open, onToggle, onArchive, busy, }) {
    const [items, setItems] = (0, react_1.useState)([]);
    const [stats, setStats] = (0, react_1.useState)({ followup_count: 0, evidenced_count: 0, last_followup_at: '' });
    const [note, setNote] = (0, react_1.useState)('');
    const [channel, setChannel] = (0, react_1.useState)('phone');
    const [evCount, setEvCount] = (0, react_1.useState)(0);
    const [saving, setSaving] = (0, react_1.useState)(false);
    const [err, setErr] = (0, react_1.useState)('');
    const loadFu = (0, react_1.useCallback)(async () => {
        const r = await (0, crm_js_1.loadFollowups)(c.customer_id);
        if (r.ok === true) {
            setItems(r.data.items);
            setStats(r.data.stats);
            setErr('');
        }
        else {
            setItems([]);
            setErr(r.message);
        }
    }, [c.customer_id]);
    (0, react_1.useEffect)(() => {
        if (open)
            void loadFu();
    }, [open, loadFu]);
    const doAdd = async () => {
        if (note.trim() === '' && evCount === 0) {
            setErr('跟进记录不能是空的：写点说明，或贴一份材料。');
            return;
        }
        setSaving(true);
        setErr('');
        const r = await (0, crm_js_1.addFollowup)(c.customer_id, { note: note.trim(), channel, evidenceCount: evCount });
        setSaving(false);
        if (r.ok === true) {
            setNote('');
            setEvCount(0);
            await loadFu();
        }
        else {
            setErr(r.message);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: card, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'flex-start', gap: 10 }, children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: onToggle, style: {
                            flex: 1, textAlign: 'left', background: 'transparent', border: 'none',
                            padding: 0, cursor: 'pointer', color: theme_js_1.C.text, fontFamily: 'inherit',
                        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.base, fontWeight: 600, marginBottom: 3 }, children: [c.name, c.status === 'suspended' ? ((0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 6, fontSize: theme_js_1.FS.tag, color: '#d97706' }, children: "\u6682\u505C\u4E2D" })) : null] }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: [c.tax_id !== '' ? `税号 ${c.tax_id}` : '未填税号', c.phone !== '' ? ` · ${c.phone}` : ''] })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onArchive, disabled: busy, style: btn(false, busy), children: "\u5F52\u6863" })] }), open ? ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 10, paddingTop: 10, borderTop: `1px solid ${theme_js_1.C.border}` }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginBottom: 8 }, children: ["\u5171 ", stats.followup_count, " \u6761\u8DDF\u8FDB\uFF0C\u5176\u4E2D ", stats.evidenced_count, " \u6761\u6709\u636E\u53EF\u67E5", stats.last_followup_at !== '' ? ` · 最近 ${shortTime(stats.last_followup_at)}` : ''] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6, flexWrap: 'wrap' }, children: [CHANNELS.map((ch) => ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setChannel(ch.k), style: {
                                            padding: '3px 9px', borderRadius: 20, fontSize: theme_js_1.FS.tag,
                                            border: `1px solid ${channel === ch.k ? theme_js_1.C.accent : theme_js_1.C.border}`,
                                            background: channel === ch.k ? theme_js_1.C.accent : 'transparent',
                                            color: channel === ch.k ? '#fff' : theme_js_1.C.dim,
                                            cursor: 'pointer', fontFamily: 'inherit',
                                        }, children: ch.label }, ch.k))), (0, jsx_runtime_1.jsxs)("span", { style: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u8D34\u4E86\u51E0\u4EFD\u6750\u6599" }), (0, jsx_runtime_1.jsx)("input", { type: "number", min: 0, value: evCount, onChange: (e) => setEvCount(Math.max(0, Number(e.target.value) || 0)), style: { ...inputStyle, width: 56, padding: '3px 6px' } })] })] }), (0, jsx_runtime_1.jsx)("textarea", { value: note, onChange: (e) => setNote(e.target.value), placeholder: "\u8FD9\u6B21\u6C9F\u901A\u8C01\u3001\u8BF4\u4E86\u4EC0\u4E48\u3001\u4E0B\u4E00\u6B65\u505A\u4EC0\u4E48\uFF08\u5199\u6E05\u8FD9\u4E09\u6837\u624D\u7B97\u6709\u6548\u8DDF\u8FDB\uFF09", rows: 2, style: { ...inputStyle, resize: 'vertical', lineHeight: theme_js_1.LH.normal } }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void doAdd(), disabled: saving, style: btn(true, saving), children: saving ? '保存中…' : '记一条' }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u7CFB\u7EDF\u6309\u300C\u6709\u6CA1\u6709\u6750\u6599 / \u8BF4\u660E\u5199\u6CA1\u5199\u6E05\u300D\u81EA\u52A8\u5224\u5B9A\u662F\u5426\u6709\u6548\uFF0C\u4E0D\u7528\u4F60\u52FE" })] })] }), err !== '' ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: '#c0392b', marginBottom: 8 }, children: err })) : null, items.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u8FD8\u6CA1\u6709\u8DDF\u8FDB\u8BB0\u5F55\u3002" })) : ((0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: 7 }, children: items.map((f) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                                paddingLeft: 10, borderLeft: `2px solid ${f.is_evidenced === 1 ? '#16a34a' : theme_js_1.C.border}`,
                                fontSize: theme_js_1.FS.tag, lineHeight: theme_js_1.LH.normal,
                            }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.dim, marginBottom: 2 }, children: [shortTime(f.created_at), " \u00B7 ", CHANNEL_LABEL[f.channel] ?? f.channel, f.evidence_count > 0 ? ` · ${f.evidence_count} 份材料` : '', f.is_evidenced === 1 ? ' · 有据可查' : ''] }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.text }, children: f.note !== '' ? f.note : '（只贴了材料，没写说明）' })] }, f.followup_id))) }))] })) : null] }));
}
//# sourceMappingURL=CrmSection.js.map