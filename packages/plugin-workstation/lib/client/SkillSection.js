"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECHARGE_RATE = exports.RECHARGE_WECHAT = exports.SEARCH_MIN = void 0;
exports.SkillSection = SkillSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const theme_js_1 = require("./theme.js");
const skills_js_1 = require("./skills.js");
const skill_pitch_js_1 = require("./skill-pitch.js");
function parseUtc(iso) {
    if (!iso)
        return null;
    const t = Date.parse(iso);
    if (!Number.isFinite(t))
        return null;
    return new Date(t);
}
function formatTs(iso) {
    const d = parseUtc(iso);
    if (d === null)
        return iso;
    const bj = new Date(d.getTime() + 8 * 3600 * 1000);
    const p = (n) => (n < 10 ? `0${n}` : String(n));
    return `${p(bj.getUTCMonth() + 1)}-${p(bj.getUTCDate())} ${p(bj.getUTCHours())}:${p(bj.getUTCMinutes())}`;
}
function formatDate(iso) {
    const d = parseUtc(iso);
    if (d === null)
        return iso;
    const bj = new Date(d.getTime() + 8 * 3600 * 1000);
    const p = (n) => (n < 10 ? `0${n}` : String(n));
    return `${bj.getUTCFullYear()}-${p(bj.getUTCMonth() + 1)}-${p(bj.getUTCDate())}`;
}
exports.SEARCH_MIN = 6;
exports.RECHARGE_WECHAT = 'AK20260910';
exports.RECHARGE_RATE = '10 元 = 100 积分';
function SkillSection({ shopName }) {
    const [cat, setCat] = (0, react_1.useState)({ st: 'loading' });
    const [installed, setInstalled] = (0, react_1.useState)({ st: 'loading' });
    const [openId, setOpenId] = (0, react_1.useState)('');
    const [copiedId, setCopiedId] = (0, react_1.useState)('');
    const [copyErr, setCopyErr] = (0, react_1.useState)('');
    const [q, setQ] = (0, react_1.useState)('');
    const [credits, setCredits] = (0, react_1.useState)({ st: 'loading' });
    const [claimMsg, setClaimMsg] = (0, react_1.useState)('');
    const [claiming, setClaiming] = (0, react_1.useState)(false);
    const [rechargeOpen, setRechargeOpen] = (0, react_1.useState)(false);
    const [wxCopied, setWxCopied] = (0, react_1.useState)(false);
    const [ledgerOpen, setLedgerOpen] = (0, react_1.useState)(false);
    const [ledger, setLedger] = (0, react_1.useState)({ st: 'idle' });
    const [ledgerMore, setLedgerMore] = (0, react_1.useState)(false);
    const load = (0, react_1.useCallback)(async () => {
        setCat({ st: 'loading' });
        setInstalled({ st: 'loading' });
        try {
            const d = await (0, skills_js_1.skillsCatalog)();
            setCat({ st: 'ok', data: d });
        }
        catch (e) {
            setCat({ st: 'err', msg: e instanceof Error ? e.message : '技能目录读不到' });
        }
        try {
            const rows = await (0, skills_js_1.skillsInstalled)();
            const map = {};
            for (const r of rows) {
                map[r.skillId] = { version: r.version, runCount: r.runCount, quota: r.quota, via: r.installedVia };
            }
            setInstalled({ st: 'ok', data: map });
        }
        catch (e) {
            setInstalled({ st: 'err', msg: e instanceof Error ? e.message : '已装列表读不到' });
        }
    }, []);
    const loadCredits = (0, react_1.useCallback)(async () => {
        try {
            const d = await (0, skills_js_1.creditsGet)();
            setCredits({
                st: 'ok',
                data: {
                    credits: d.credits,
                    bonus: d.bonusCredits,
                    gift: d.giftCredits,
                    paid: d.paidCredits,
                    claimAmount: d.dailyClaimAmount,
                    canClaim: d.canClaim,
                },
            });
        }
        catch (e) {
            setCredits({ st: 'err', msg: e instanceof Error ? e.message : '积分读不到' });
        }
    }, []);
    (0, react_1.useEffect)(() => {
        void load();
        void loadCredits();
    }, [load, loadCredits]);
    const onClaim = (0, react_1.useCallback)(async () => {
        if (claiming)
            return;
        setClaiming(true);
        setClaimMsg('');
        try {
            const r = await (0, skills_js_1.creditsClaim)();
            if (r.ok) {
                setClaimMsg(`已领取 ${r.amount} 积分`);
            }
            else if (r.reason === 'already_claimed') {
                setClaimMsg('今天已经领过了，明天再来');
            }
            else {
                setClaimMsg('领取没成功，请稍后再试');
            }
            await loadCredits();
        }
        catch (e) {
            setClaimMsg(e instanceof Error ? e.message : '领取失败');
        }
        finally {
            setClaiming(false);
        }
    }, [claiming, loadCredits]);
    const openLedger = (0, react_1.useCallback)(async () => {
        setLedgerOpen(true);
        setLedger({ st: 'loading' });
        try {
            const d = await (0, skills_js_1.creditsLedger)(50, '');
            setLedger({ st: 'ok', rows: d.rows, hasMore: d.hasMore, nextBefore: d.nextBefore });
        }
        catch (e) {
            setLedger({ st: 'err', msg: e instanceof Error ? e.message : '明细读不到' });
        }
    }, []);
    const loadMoreLedger = (0, react_1.useCallback)(async () => {
        if (ledgerMore || ledger.st !== 'ok' || !ledger.hasMore)
            return;
        setLedgerMore(true);
        try {
            const d = await (0, skills_js_1.creditsLedger)(50, ledger.nextBefore);
            setLedger({
                st: 'ok',
                rows: [...ledger.rows, ...d.rows],
                hasMore: d.hasMore,
                nextBefore: d.nextBefore,
            });
        }
        catch (e) {
            setClaimMsg(e instanceof Error ? `更早的明细没取到：${e.message}` : '更早的明细没取到');
        }
        finally {
            setLedgerMore(false);
        }
    }, [ledger, ledgerMore]);
    const onCopyWx = (0, react_1.useCallback)(async () => {
        try {
            if (typeof navigator !== 'undefined' && navigator.clipboard !== undefined) {
                await navigator.clipboard.writeText(exports.RECHARGE_WECHAT);
                setWxCopied(true);
            }
            else {
                setWxCopied(false);
            }
        }
        catch {
            setWxCopied(false);
        }
    }, []);
    const catSkills = cat.st === 'ok' ? cat.data.skills : [];
    const catCats = cat.st === 'ok' ? cat.data.categories : [];
    const grouped = (0, react_1.useMemo)(() => {
        const order = [];
        const byCat = {};
        for (const s of catSkills) {
            const cid = (s.category ?? '').trim() || '_';
            if (!(cid in byCat)) {
                byCat[cid] = [];
                order.push(cid);
            }
            const bucket = byCat[cid];
            if (bucket !== undefined)
                bucket.push(s);
        }
        return { order, byCat };
    }, [catSkills]);
    const flatSkills = (0, react_1.useMemo)(() => {
        const catNameOf = (cid) => {
            for (const c of catCats) {
                if (c.id === cid)
                    return c.name !== '' ? c.name : cid;
            }
            return cid;
        };
        const out = [];
        for (const cid of grouped.order) {
            const name = catNameOf(cid);
            for (const s of grouped.byCat[cid] ?? [])
                out.push({ s, cname: name });
        }
        const kw = q.trim().toLowerCase();
        if (kw === '')
            return out;
        return out.filter(({ s, cname }) => {
            const hay = `${s.name}\n${s.summary}\n${cname}\n${s.skillId}`.toLowerCase();
            return hay.includes(kw);
        });
    }, [grouped, catCats, q]);
    const catName = (0, react_1.useCallback)((id) => {
        if (id === '_')
            return '其他';
        for (const c of catCats)
            if (c.id === id)
                return c.name !== '' ? c.name : id;
        return id;
    }, [catCats]);
    const doCopy = (0, react_1.useCallback)(async (s) => {
        setCopyErr('');
        const sid = s.skillId;
        const inst = installed.st === 'ok' ? installed.data[sid] : undefined;
        const isInstalled = inst !== undefined || s.installed === true;
        const instVersion = inst !== undefined ? inst.version : (s.installedInfo?.version ?? '');
        const text = (0, skill_pitch_js_1.buildInstallPitch)({
            name: s.name !== '' ? s.name : sid,
            skillId: sid,
            summary: s.summary,
            shopName,
            installed: isInstalled,
            installedVersion: instVersion,
        });
        try {
            if (typeof navigator !== 'undefined' && navigator.clipboard !== undefined) {
                await navigator.clipboard.writeText(text);
            }
            else {
                throw new Error('no clipboard');
            }
            setCopiedId(sid);
            window.setTimeout(() => setCopiedId(''), 3000);
        }
        catch {
            setCopyErr('这台机器不让自动复制 —— 请手动选中下面这段文字复制。');
            setOpenId(sid);
        }
    }, [installed, shopName]);
    const grid = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 8,
        alignItems: 'start',
    };
    const box = {
        border: `1px solid ${theme_js_1.C.border}`,
        borderRadius: 10,
        padding: '10px 12px',
        minHeight: 78,
        background: theme_js_1.C.soft,
        boxSizing: 'border-box',
    };
    const note = {
        border: `1px solid ${theme_js_1.C.border}`,
        borderRadius: 10,
        padding: '14px 16px',
        marginBottom: 12,
        background: 'transparent',
    };
    const btn = {
        fontSize: theme_js_1.FS.small,
        padding: '6px 12px',
        minHeight: 35,
        borderRadius: 8,
        border: `1px solid ${theme_js_1.C.accent}`,
        background: 'transparent',
        color: theme_js_1.C.accent,
        cursor: 'pointer',
        fontWeight: 600,
    };
    const btnDisabled = {
        ...btn,
        border: `1px solid ${theme_js_1.C.border}`,
        color: theme_js_1.C.dim,
        cursor: 'not-allowed',
        fontWeight: 400,
    };
    const btnPlain = {
        ...btn,
        border: `1px solid ${theme_js_1.C.border}`,
        color: theme_js_1.C.text,
        fontWeight: 400,
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 14 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.heading, fontWeight: 700 }, children: "\u6280\u80FD" }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 4, lineHeight: theme_js_1.LH.normal }, children: "\u8FD9\u91CC\u662F\u4F60\u8FD9\u4E2A\u94FA\u5B50\u80FD\u7528\u7684\u672C\u4E8B\u3002\u88C5\u6280\u80FD\u901A\u5E38\u8BA9\u4F60\u81EA\u5DF1\u7684 Agent \u505A \u2014\u2014 \u70B9\u300C\u590D\u5236\u5B89\u88C5\u8BDD\u672F\u300D\uFF0C\u628A\u90A3\u6BB5\u8BDD\u53D1\u7ED9\u5B83\u5C31\u884C\u3002" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { ...note, marginBottom: 12 }, children: [credits.st === 'loading' ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u6B63\u5728\u8BFB\u53D6\u79EF\u5206\u2026" })) : null, credits.st === 'err' ? ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: ["\u79EF\u5206\u6682\u65F6\u8BFB\u4E0D\u5230\uFF08", credits.msg, "\uFF09\u2014\u2014 \u4E0D\u5F71\u54CD\u67E5\u770B\u6280\u80FD\u8BF4\u660E\u3002", (0, jsx_runtime_1.jsx)("button", { type: "button", style: { ...btnPlain, marginLeft: 10, padding: '2px 10px' }, onClick: () => void loadCredits(), children: "\u91CD\u8BD5" })] })) : null, credits.st === 'ok' ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.title, fontWeight: 700 }, children: [credits.data.credits, " \u79EF\u5206"] }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: [credits.data.bonus > 0 ? `见面礼 ${credits.data.bonus}（永久）· ` : '', "\u8D60\u9001 ", credits.data.gift, "\uFF08\u6BCF\u7B14 1 \u5E74\uFF09\u00B7 \u5145\u503C ", credits.data.paid, "\uFF08\u6C38\u4E45\uFF09"] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, flexWrap: 'wrap' }, children: [credits.data.canClaim ? ((0, jsx_runtime_1.jsx)("button", { type: "button", style: { ...btn, opacity: claiming ? 0.6 : 1 }, onClick: () => void onClaim(), disabled: claiming, children: claiming ? '领取中…' : `领取今日 ${credits.data.claimAmount} 积分` })) : ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u4ECA\u5929\u7684\u79EF\u5206\u5DF2\u9886\u53D6\uFF0C\u660E\u5929\u518D\u6765" })), (0, jsx_runtime_1.jsx)("button", { type: "button", style: { ...btn, opacity: 0.95 }, onClick: () => { setWxCopied(false); setRechargeOpen(true); }, children: "\u5145\u503C" }), (0, jsx_runtime_1.jsx)("button", { type: "button", style: { ...btnPlain, padding: '4px 12px' }, onClick: () => void openLedger(), children: "\u660E\u7EC6" })] }), claimMsg !== '' ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.accent, marginTop: 6 }, children: claimMsg })) : null] })) : null] }), cat.st === 'err' ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...note, borderColor: 'color-mix(in srgb, #c0392b 45%, transparent)' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: '#c0392b' }, children: ["\u6280\u80FD\u76EE\u5F55\u8BFB\u4E0D\u5230\uFF1A", cat.msg] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 10 }, children: (0, jsx_runtime_1.jsx)("button", { type: "button", style: btn, onClick: () => void load(), children: "\u91CD\u8BD5" }) })] })) : null, cat.st === 'loading' ? ((0, jsx_runtime_1.jsx)("div", { style: { ...note, color: theme_js_1.C.dim, fontSize: theme_js_1.FS.small }, children: "\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u76EE\u5F55\u2026" })) : null, installed.st === 'err' ? ((0, jsx_runtime_1.jsx)("div", { style: { ...note }, children: (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: ["\u5DF2\u88C5\u72B6\u6001\u6682\u65F6\u8BFB\u4E0D\u5230\uFF08", installed.msg, "\uFF09\u2014\u2014 \u4E0B\u9762\u4ECD\u53EF\u67E5\u770B\u6280\u80FD\u8BF4\u660E\uFF0C\u4F46\u4E0D\u77E5\u9053\u54EA\u4E9B\u5DF2\u7ECF\u88C5\u4E86\u3002"] }) })) : null, copiedId !== '' ? ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", style: { ...note, borderColor: 'color-mix(in srgb, #2e7d32 45%, transparent)' }, children: (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: '#2e7d32' }, children: "\u5DF2\u590D\u5236 \u2014\u2014 \u73B0\u5728\u53BB\u53D1\u7ED9\u4F60\u7684 Agent \u5C31\u884C\u3002" }) })) : null, copyErr !== '' ? ((0, jsx_runtime_1.jsx)("div", { style: { ...note, borderColor: 'color-mix(in srgb, #c0392b 45%, transparent)' }, children: (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: '#c0392b' }, children: copyErr }) })) : null, cat.st === 'ok' && catSkills.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { ...note, color: theme_js_1.C.dim, fontSize: theme_js_1.FS.small }, children: "\u5E73\u53F0\u8FD8\u6CA1\u6709\u4E0A\u67B6\u6280\u80FD\u3002" })) : null, cat.st === 'ok' && catSkills.length >= exports.SEARCH_MIN ? ((0, jsx_runtime_1.jsx)("div", { style: { marginBottom: 12 }, children: (0, jsx_runtime_1.jsx)("input", { type: "search", value: q, onChange: (e) => setQ(e.target.value), placeholder: "\u641C\u6280\u80FD\u540D\u3001\u7B80\u4ECB\u6216\u5206\u7C7B", "aria-label": "\u641C\u7D22\u6280\u80FD", style: {
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '7px 12px',
                        fontSize: theme_js_1.FS.base,
                        color: theme_js_1.C.text,
                        background: theme_js_1.C.soft,
                        border: `1px solid ${theme_js_1.C.border}`,
                        borderRadius: 8,
                        outline: 'none',
                    } }) })) : null, cat.st === 'ok' && catSkills.length > 0 && flatSkills.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: note, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: ["\u6CA1\u6709\u5339\u914D\u300C", q.trim(), "\u300D\u7684\u6280\u80FD\u3002"] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 10 }, children: (0, jsx_runtime_1.jsx)("button", { type: "button", style: btnPlain, onClick: () => setQ(''), children: "\u6E05\u7A7A\u641C\u7D22" }) })] })) : null, (0, jsx_runtime_1.jsx)("div", { style: grid, children: flatSkills.map(({ s, cname }) => {
                    const sid = s.skillId;
                    const inst = installed.st === 'ok' ? installed.data[sid] : undefined;
                    const isInstalled = inst !== undefined || s.installed === true;
                    const version = inst !== undefined ? inst.version : (s.installedInfo?.version ?? '');
                    const runCount = inst !== undefined ? inst.runCount : (s.installedInfo?.runCount ?? 0);
                    const canInstall = s.canInstall === true;
                    const reasons = s.blockedReasons;
                    const isBuilding = s.status === 'building';
                    const isOpen = openId === sid;
                    const free = s.pricing.freeQuota;
                    const q = inst !== undefined ? inst.quota : null;
                    const exhausted = q !== null && q.exhausted === true;
                    const left = q !== null ? q.totalLeft : 0;
                    return ((0, jsx_runtime_1.jsxs)("div", { style: {
                            ...box,
                            ...(isOpen ? { gridColumn: '1 / -1' } : {}),
                        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                            fontSize: theme_js_1.FS.tag,
                                            padding: '1px 7px',
                                            borderRadius: 999,
                                            border: `1px solid ${theme_js_1.C.border}`,
                                            color: theme_js_1.C.dim,
                                        }, children: cname }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.title, fontWeight: 700 }, children: s.name !== '' ? s.name : sid }), isInstalled ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                            fontSize: theme_js_1.FS.tag,
                                            padding: '1px 7px',
                                            borderRadius: 999,
                                            border: `1px solid ${theme_js_1.C.accent}`,
                                            color: theme_js_1.C.accent,
                                        }, children: version !== '' ? `已装 v${version}` : '已装' })) : null, isBuilding ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                            fontSize: theme_js_1.FS.tag,
                                            padding: '1px 7px',
                                            borderRadius: 999,
                                            border: `1px solid ${theme_js_1.C.border}`,
                                            color: theme_js_1.C.dim,
                                        }, children: "\u5373\u5C06\u4E0A\u7EBF" })) : null, !isBuilding && free > 0 && q === null ? ((0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: ["\u514D\u8D39 ", free, " \u6B21"] })) : null, q !== null && !exhausted ? ((0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: ["\u8FD8\u5269 ", left, " \u6B21", q.paidRuns > 0 ? `（含已购 ${q.paidRuns} 次）` : ''] })) : null, exhausted ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                            fontSize: theme_js_1.FS.tag,
                                            padding: '1px 7px',
                                            borderRadius: 999,
                                            border: '1px solid #c0392b',
                                            color: '#c0392b',
                                        }, children: "\u6B21\u6570\u5DF2\u7528\u5B8C" })) : null] }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.base, marginTop: 8, lineHeight: theme_js_1.LH.normal }, children: s.summary }), isInstalled && runCount > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 6 }, children: ["\u5DF2\u7ECF\u7528\u8FC7 ", runCount, " \u6B21"] })) : null, exhausted ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                                    marginTop: 10,
                                    padding: '10px 12px',
                                    borderRadius: 8,
                                    border: '1px solid color-mix(in srgb, #c0392b 35%, transparent)',
                                    background: 'color-mix(in srgb, #c0392b 6%, transparent)',
                                }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: '#c0392b' }, children: ["\u514D\u8D39 ", q !== null ? q.freeQuota : free, " \u6B21\u5DF2\u7ECF\u7528\u5B8C\u4E86\u3002"] }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 6, lineHeight: theme_js_1.LH.normal }, children: "\u8981\u63A5\u7740\u7528\u5F97\u5148\u5F00\u901A\u6B21\u6570\u3002\u627E\u4F60\u8FD9\u4E2A\u94FA\u5B50\u7684\u94FA\u4E3B\u5F00\u901A\u5373\u53EF \u2014\u2014 \u5F00\u901A\u540E\u8FD9\u91CC\u7684\u300C\u8FD8\u5269 N \u6B21\u300D\u4F1A\u81EA\u52A8\u66F4\u65B0\uFF0C\u4E0D\u7528\u91CD\u65B0\u5B89\u88C5\u3002" })] })) : null, (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }, children: [canInstall ? ((0, jsx_runtime_1.jsx)("button", { type: "button", style: btn, "aria-label": `复制「${s.name !== '' ? s.name : sid}」的安装话术，发给你的 Agent`, onClick: () => void doCopy(s), children: "\uD83D\uDCCB \u590D\u5236\u5B89\u88C5\u8BDD\u672F" })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", style: btnDisabled, disabled: true, "aria-disabled": "true", children: "\u6682\u65F6\u4E0D\u80FD\u5B89\u88C5" })), (0, jsx_runtime_1.jsx)("button", { type: "button", style: btnPlain, "aria-expanded": isOpen, onClick: () => setOpenId(isOpen ? '' : sid), children: isOpen ? '收起说明' : '看详细说明' })] }), !canInstall ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 8 }, children: (0, skill_pitch_js_1.blockedReasonText)(reasons) })) : null, isOpen ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                                    marginTop: 12,
                                    paddingTop: 12,
                                    borderTop: `1px dashed ${theme_js_1.C.border}`,
                                    fontSize: theme_js_1.FS.small,
                                    lineHeight: theme_js_1.LH.normal,
                                    whiteSpace: 'pre-wrap',
                                }, children: [s.detail !== '' ? s.detail : s.summary, (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 10, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: [s.runtime !== '' ? `运行方式：${s.runtime}` : '', s.dataPolicy === 'local_only' ? '　·　数据不出本机' : '', (() => {
                                                if (inst === undefined)
                                                    return null;
                                                const via = inst.via;
                                                if (via === null)
                                                    return '　·　安装来源：未记录（早期安装）';
                                                const LABEL = {
                                                    client: '工位客户端',
                                                    agent: 'Agent 代装',
                                                    api: '接口调用',
                                                    cli: '命令行',
                                                    web: '网页',
                                                    unknown: '未识别',
                                                };
                                                const name = LABEL[via] !== undefined ? LABEL[via] : via;
                                                return `　·　安装来源：${name}`;
                                            })()] }), copyErr !== '' ? ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 12 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginBottom: 6 }, children: "\u8981\u53D1\u7684\u8FD9\u6BB5\u8BDD\uFF1A" }), (0, jsx_runtime_1.jsx)("pre", { style: {
                                                    margin: 0,
                                                    padding: 10,
                                                    background: theme_js_1.C.soft,
                                                    borderRadius: 8,
                                                    fontSize: theme_js_1.FS.tag,
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word',
                                                }, children: (0, skill_pitch_js_1.buildInstallPitch)({
                                                    name: s.name !== '' ? s.name : sid,
                                                    skillId: sid,
                                                    summary: s.summary,
                                                    shopName,
                                                    installed: isInstalled,
                                                    installedVersion: version,
                                                }) })] })) : null] })) : null] }, sid));
                }) }), rechargeOpen ? ((0, jsx_runtime_1.jsx)("div", { role: "dialog", "aria-modal": "true", "aria-label": "\u5145\u503C\u79EF\u5206", onClick: (e) => { if (e.target === e.currentTarget)
                    setRechargeOpen(false); }, style: {
                    position: 'fixed', inset: 0, zIndex: 9999,
                    background: 'rgba(0,0,0,.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 16,
                }, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                        width: 'min(420px, 100%)',
                        padding: 20,
                        borderRadius: 12,
                        border: `1px solid ${theme_js_1.C.border}`,
                        background: 'var(--dsh-bg, #fff)',
                        boxShadow: '0 16px 48px rgba(0,0,0,.35)',
                    }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.heading, fontWeight: 600, lineHeight: 1.4 }, children: "\u5145\u503C\u79EF\u5206" }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 8, lineHeight: theme_js_1.LH.normal }, children: "\u76EE\u524D\u79EF\u5206\u5145\u503C\u7531\u4EBA\u5DE5\u5F00\u901A\u3002\u52A0\u5FAE\u4FE1\u540E\u544A\u8BC9\u6211\u4EEC\u4F60\u7684\u94FA\u5B50\u540D\u548C\u8981\u5145\u7684\u91D1\u989D\u5373\u53EF\u3002" }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                marginTop: 14,
                                padding: '12px 14px',
                                borderRadius: 8,
                                border: `1px solid ${theme_js_1.C.border}`,
                                background: theme_js_1.C.soft,
                            }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u5FAE\u4FE1" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.title, fontWeight: 700, letterSpacing: 0.5 }, children: exports.RECHARGE_WECHAT }), (0, jsx_runtime_1.jsx)("button", { type: "button", style: { ...btnPlain, padding: '2px 10px' }, onClick: () => void onCopyWx(), children: wxCopied ? '已复制' : '复制' })] }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 8 }, children: ["\u5151\u6362\u6BD4\u4F8B\uFF1A", exports.RECHARGE_RATE] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 12, lineHeight: theme_js_1.LH.normal }, children: ["\u2605 \u4E09\u7C7B\u79EF\u5206\u89C4\u5219\u4E0D\u540C\uFF1A\u89C1\u9762\u793C\u4E0E\u5145\u503C\u79EF\u5206\u6C38\u4E45\u6709\u6548\uFF1B\u6BCF\u5929\u9886\u53D6\u7684\u8D60\u9001\u79EF\u5206", (0, jsx_runtime_1.jsx)("b", { children: " \u6BCF\u7B14\u5404\u81EA\u4FDD\u7559\u4E00\u5E74" }), "\uFF08\u4E0D\u662F\u6708\u5E95\u6E05\u96F6\uFF09\u3002\u6D88\u8017\u65F6\u6309\u300C\u89C1\u9762\u793C \u2192 \u8D60\u9001 \u2192 \u5145\u503C\u300D\u987A\u5E8F\u6263\uFF0C \u6240\u4EE5\u771F\u91D1\u767D\u94F6\u4E70\u7684\u79EF\u5206\u603B\u662F\u6700\u540E\u624D\u52A8\u3002 \u52A0\u4E86\u5FAE\u4FE1\u53EF\u4EE5\u76F4\u63A5\u95EE\u300C\u6211\u8FD8\u5269\u591A\u5C11\u300D\uFF0C\u6211\u4EEC\u67E5\u5F97\u5230\u6BCF\u4E00\u7B14\u660E\u7EC6\u3002"] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', justifyContent: 'flex-end', marginTop: 16 }, children: (0, jsx_runtime_1.jsx)("button", { type: "button", style: btn, onClick: () => setRechargeOpen(false), children: "\u77E5\u9053\u4E86" }) })] }) })) : null, ledgerOpen ? ((0, jsx_runtime_1.jsx)("div", { role: "dialog", "aria-modal": "true", "aria-label": "\u79EF\u5206\u660E\u7EC6", onClick: (e) => { if (e.target === e.currentTarget)
                    setLedgerOpen(false); }, style: {
                    position: 'fixed', inset: 0, zIndex: 9999,
                    background: 'rgba(0,0,0,.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 16,
                }, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                        width: 'min(560px, 100%)',
                        maxHeight: 'min(76vh, 620px)',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 20,
                        borderRadius: 12,
                        border: `1px solid ${theme_js_1.C.border}`,
                        background: 'var(--dsh-bg, #fff)',
                        boxShadow: '0 16px 48px rgba(0,0,0,.35)',
                    }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.heading, fontWeight: 600, lineHeight: 1.4 }, children: "\u79EF\u5206\u660E\u7EC6" }), credits.st === 'ok' ? ((0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: ["\u5F53\u524D ", credits.data.credits, " \u5206"] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1, overflowY: 'auto', marginTop: 12 }, children: [ledger.st === 'loading' ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, padding: '18px 0' }, children: "\u6B63\u5728\u8BFB\u53D6\u660E\u7EC6\u2026" })) : null, ledger.st === 'err' ? ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: '#c0392b', padding: '18px 0' }, children: ["\u660E\u7EC6\u8BFB\u4E0D\u5230\uFF08", ledger.msg, "\uFF09\u3002", (0, jsx_runtime_1.jsx)("button", { type: "button", style: { ...btnPlain, marginLeft: 10, padding: '2px 10px' }, onClick: () => void openLedger(), children: "\u91CD\u8BD5" })] })) : null, ledger.st === 'ok' && ledger.rows.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, padding: '18px 0' }, children: "\u8FD8\u6CA1\u6709\u4EFB\u4F55\u79EF\u5206\u8BB0\u5F55\u3002\u9886\u53D6\u6BCF\u65E5\u79EF\u5206\u6216\u4F7F\u7528\u6280\u80FD\u540E\uFF0C\u8FD9\u91CC\u4F1A\u51FA\u73B0\u6BCF\u4E00\u7B14\u3002" })) : null, ledger.st === 'ok' && ledger.rows.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { children: [ledger.rows.map((r) => {
                                            const isIn = r.dir === 'in';
                                            const dead = r.expired || r.revoked;
                                            const tagBg = r.kind === 'bonus' ? theme_js_1.C.accent : (r.kind === 'paid' ? '#2e7d32' : theme_js_1.C.dim);
                                            const kindText = r.kind === 'bonus' ? '见面礼' : (r.kind === 'paid' ? '充值' : '赠送');
                                            return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 10,
                                                    padding: '9px 0',
                                                    borderBottom: `1px solid ${theme_js_1.C.border}`,
                                                    opacity: dead ? 0.55 : 1,
                                                }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600 }, children: r.title }), (0, jsx_runtime_1.jsx)("span", { style: {
                                                                            fontSize: 11,
                                                                            padding: '1px 6px',
                                                                            borderRadius: 4,
                                                                            color: '#fff',
                                                                            background: tagBg,
                                                                        }, children: kindText }), r.expired ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: 11, color: '#c0392b' }, children: "\u5DF2\u8FC7\u671F" })) : null, r.revoked ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: 11, color: '#c0392b' }, children: "\u5DF2\u4F5C\u5E9F" })) : null] }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: 11, color: theme_js_1.C.dim, marginTop: 3 }, children: [formatTs(r.ts), isIn && !dead ? ` · 这笔还剩 ${r.remaining}` : '', r.expiresAt !== '' ? ` · ${r.expired ? '已于' : ''}${formatDate(r.expiresAt)}${r.expired ? '过期' : ' 到期'}` : ''] })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                                            fontSize: theme_js_1.FS.small,
                                                            fontWeight: 700,
                                                            color: isIn ? '#2e7d32' : theme_js_1.C.dim,
                                                            whiteSpace: 'nowrap',
                                                        }, children: [isIn ? '+' : '−', r.amount] })] }, r.id));
                                        }), ledger.hasMore ? ((0, jsx_runtime_1.jsx)("div", { style: { textAlign: 'center', marginTop: 12 }, children: (0, jsx_runtime_1.jsx)("button", { type: "button", style: { ...btnPlain, padding: '4px 14px', opacity: ledgerMore ? 0.6 : 1 }, onClick: () => void loadMoreLedger(), disabled: ledgerMore, children: ledgerMore ? '读取中…' : '看更早的记录' }) })) : ((0, jsx_runtime_1.jsx)("div", { style: { textAlign: 'center', fontSize: 11, color: theme_js_1.C.dim, marginTop: 12 }, children: "\u6CA1\u6709\u66F4\u65E9\u7684\u8BB0\u5F55\u4E86" }))] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, gap: 10 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: 11, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: "\u6263\u5206\u987A\u5E8F\uFF1A\u89C1\u9762\u793C \u2192 \u8D60\u9001 \u2192 \u5145\u503C" }), (0, jsx_runtime_1.jsx)("button", { type: "button", style: btn, onClick: () => setLedgerOpen(false), children: "\u77E5\u9053\u4E86" })] })] }) })) : null] }));
}
//# sourceMappingURL=SkillSection.js.map