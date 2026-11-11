"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSkillsConnection = setSkillsConnection;
exports.skillsCatalog = skillsCatalog;
exports.skillsInstalled = skillsInstalled;
exports.creditsGet = creditsGet;
exports.creditsLedger = creditsLedger;
exports.creditsClaim = creditsClaim;
const bridge_js_1 = require("./bridge.js");
function parseQuota(raw) {
    if (typeof raw !== 'object' || raw === null)
        return null;
    const o = raw;
    const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
    return {
        freeQuota: num(o.freeQuota),
        freeUsed: num(o.freeUsed),
        freeLeft: num(o.freeLeft),
        paidRuns: num(o.paidRuns),
        totalLeft: num(o.totalLeft),
        exhausted: o.exhausted === true,
    };
}
let connection = null;
function setSkillsConnection(conn) {
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
        catalog_unavailable: '技能目录暂时读不出来，请稍后重试；这不影响你已装的技能。',
        tenant_required: '没取到你的铺子身份，请重开面板再试。',
        skills_not_enabled: '技能功能还没启用，请联系管理员。',
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
async function skillsCatalog() {
    const d = await rpc('skillsCatalog', {});
    const rawSkills = Array.isArray(d?.skills) ? d.skills : [];
    const rawCats = Array.isArray(d?.categories) ? d.categories : [];
    const skills = [];
    for (const it of rawSkills) {
        if (typeof it !== 'object' || it === null)
            continue;
        const o = it;
        const sid = typeof o.skillId === 'string' ? o.skillId : '';
        if (sid === '')
            continue;
        const pr = (typeof o.pricing === 'object' && o.pricing !== null
            ? o.pricing
            : {});
        skills.push({
            skillId: sid,
            name: typeof o.name === 'string' ? o.name : sid,
            category: typeof o.category === 'string' ? o.category : '',
            version: typeof o.version === 'string' ? o.version : '',
            summary: typeof o.summary === 'string' ? o.summary : '',
            detail: typeof o.detail === 'string' ? o.detail : '',
            runtime: typeof o.runtime === 'string' ? o.runtime : '',
            dataPolicy: typeof o.dataPolicy === 'string' ? o.dataPolicy : '',
            pricing: {
                sku: typeof pr.sku === 'string' ? pr.sku : '',
                freeQuota: typeof pr.freeQuota === 'number' ? pr.freeQuota : 0,
                paidPlan: typeof pr.paidPlan === 'string' ? pr.paidPlan : '',
            },
            installed: o.installed === true,
            installedInfo: (typeof o.installedInfo === 'object' && o.installedInfo !== null
                ? o.installedInfo
                : null),
            canInstall: o.canInstall === true,
            blockedReasons: Array.isArray(o.blockedReasons)
                ? o.blockedReasons.filter((x) => typeof x === 'string')
                : [],
            status: typeof o.status === 'string' ? o.status : '',
        });
    }
    const categories = [];
    for (const it of rawCats) {
        if (typeof it !== 'object' || it === null)
            continue;
        const o = it;
        const id = typeof o.id === 'string' ? o.id : '';
        if (id === '')
            continue;
        categories.push({
            id,
            name: typeof o.name === 'string' ? o.name : id,
            desc: typeof o.desc === 'string' ? o.desc : '',
        });
    }
    return { skills, categories };
}
async function skillsInstalled() {
    const d = await rpc('skillsList', { status: 'all' });
    const raw = Array.isArray(d?.skills) ? d.skills : [];
    const out = [];
    for (const it of raw) {
        if (typeof it !== 'object' || it === null)
            continue;
        const o = it;
        const sid = typeof o.skillId === 'string' ? o.skillId : '';
        if (sid === '')
            continue;
        out.push({
            skillId: sid,
            name: typeof o.name === 'string' ? o.name : sid,
            version: typeof o.version === 'string' ? o.version : '',
            status: typeof o.status === 'string' ? o.status : '',
            runCount: typeof o.runCount === 'number' ? o.runCount : 0,
            lastRunAt: typeof o.lastRunAt === 'string' ? o.lastRunAt : '',
            quota: parseQuota(o.quota),
            installedVia: typeof o.installedVia === 'string' ? o.installedVia : null,
            installedAt: typeof o.installedAt === 'string' ? o.installedAt : '',
        });
    }
    return out;
}
async function creditsGet() {
    const d = await rpc('creditsGet', {});
    const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
    return {
        credits: num(d?.credits),
        bonusCredits: num(d?.bonusCredits),
        giftCredits: num(d?.giftCredits),
        paidCredits: num(d?.paidCredits),
        dailyClaimAmount: num(d?.dailyClaimAmount),
        claimedToday: d?.claimedToday === true,
        canClaim: d?.canClaim === true,
    };
}
async function creditsLedger(limit = 50, before = '') {
    const d = await rpc('creditsLedger', { limit, before });
    const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
    const str = (v) => (typeof v === 'string' ? v : '');
    const rawRows = Array.isArray(d?.rows) ? d.rows : [];
    const rows = rawRows.map((r) => {
        const k = str(r?.kind);
        return {
            id: str(r?.id),
            ts: str(r?.ts),
            dir: r?.dir === 'out' ? 'out' : 'in',
            kind: (k === 'bonus' || k === 'gift' || k === 'paid' ? k : 'gift'),
            amount: num(r?.amount),
            remaining: num(r?.remaining),
            reason: str(r?.reason),
            title: str(r?.title),
            refId: str(r?.refId),
            expiresAt: str(r?.expiresAt),
            expired: r?.expired === true,
            revoked: r?.revoked === true,
        };
    });
    return {
        credits: num(d?.credits),
        bonusCredits: num(d?.bonusCredits),
        giftCredits: num(d?.giftCredits),
        paidCredits: num(d?.paidCredits),
        rows,
        nextBefore: str(d?.nextBefore),
        hasMore: d?.hasMore === true,
    };
}
async function creditsClaim() {
    const d = await rpc('creditsClaim', {});
    const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
    return {
        ok: d?.ok === true,
        reason: typeof d?.reason === 'string' ? d.reason : '',
        amount: num(d?.amount),
        credits: num(d?.credits),
        bonusCredits: num(d?.bonusCredits),
        giftCredits: num(d?.giftCredits),
        paidCredits: num(d?.paidCredits),
        expiresAt: typeof d?.expiresAt === 'string' ? d.expiresAt : '',
    };
}
//# sourceMappingURL=skills.js.map