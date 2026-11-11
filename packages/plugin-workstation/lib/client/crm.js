"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCrmConnection = setCrmConnection;
exports.loadCustomers = loadCustomers;
exports.createCustomer = createCustomer;
exports.updateCustomer = updateCustomer;
exports.archiveCustomer = archiveCustomer;
exports.loadFollowups = loadFollowups;
exports.addFollowup = addFollowup;
exports.loadFunnel = loadFunnel;
exports.loadGuardInfo = loadGuardInfo;
exports.precheckIrreversible = precheckIrreversible;
const bridge_js_1 = require("./bridge.js");
let connection = null;
function setCrmConnection(conn) {
    connection = conn;
}
const NO_CHANNEL = '没取到宿主的数据通道。这是环境问题，不是服务端故障。';
function translateError(r) {
    if (r.ok === true)
        return { code: '', message: '' };
    const anyR = r;
    const biz = anyR.business;
    const err = anyR.error;
    const code = String(biz?.code ?? err?.code ?? '');
    const detail = String(biz?.message ?? err?.detail ?? '');
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
    if (code === 'customer_duplicate' || code === 'customer_dup') {
        return {
            code,
            message: detail.trim() !== ''
                ? detail
                : '已有同名或同税号的客户，请先在列表里搜一下，确认是不是同一家。',
        };
    }
    const KNOWN = {
        customer_not_found: '这个客户不存在或已归档。',
        customer_id_required: '缺少客户标识。',
        followup_empty: '跟进记录不能是空的：写点说明，或贴一份材料。',
        channel_invalid: '跟进渠道不对，请重新选择。',
        note_too_long: '跟进说明太长了，请精简一下。',
        action_required: '缺少要执行的动作。',
        self_approval_blocked: '这个动作不可逆，需要铺子里其他人审批，不能自己批自己。',
        name_required: '请填写客户名称。',
        name_too_long: '客户名称太长了。',
        crm_not_enabled: 'CRM 还没启用，请联系管理员。',
    };
    if (KNOWN[code])
        return { code, message: KNOWN[code] };
    const looksHuman = detail.length > 0 && detail.length < 120 && !/[A-Za-z_]{6,}/.test(detail);
    return {
        code: code || 'unknown',
        message: looksHuman ? detail : '操作没成功，请稍后再试。',
    };
}
function toOrgErr(r) {
    const t = translateError(r);
    return { ok: false, code: t.code, message: t.message };
}
async function loadCustomers(opts = {}) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: NO_CHANNEL };
    const query = {};
    if (opts.q && opts.q.trim() !== '')
        query.q = opts.q.trim();
    if (typeof opts.limit === 'number' && opts.limit > 0)
        query.limit = opts.limit;
    const r = await (0, bridge_js_1.callKaipu)(connection, 'crmCustomers', query);
    if (r.ok === true) {
        const d = r.data ?? {};
        return {
            ok: true,
            data: {
                items: Array.isArray(d.items) ? d.items : [],
                total: Number(d.total ?? (Array.isArray(d.items) ? d.items.length : 0)) || 0,
            },
        };
    }
    return toOrgErr(r);
}
async function createCustomer(input) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: NO_CHANNEL };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'crmCustomerCreate', {
        name: input.name,
        taxId: input.taxId ?? '',
        phone: input.phone ?? '',
        source: input.source ?? '',
    });
    if (r.ok === true)
        return { ok: true, data: r.data.customer };
    return toOrgErr(r);
}
async function updateCustomer(customerId, patch) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: NO_CHANNEL };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'crmCustomerUpdate', {
        customerId,
        ...patch,
    });
    if (r.ok === true)
        return { ok: true, data: r.data.customer };
    return toOrgErr(r);
}
async function archiveCustomer(customerId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: NO_CHANNEL };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'crmCustomerArchive', { customerId });
    if (r.ok === true)
        return { ok: true, data: r.data };
    return toOrgErr(r);
}
async function loadFollowups(customerId) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: NO_CHANNEL };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'crmFollowups', { customerId });
    if (r.ok === true) {
        const d = r.data ?? {};
        return {
            ok: true,
            data: {
                items: Array.isArray(d.items) ? d.items : [],
                stats: d.stats ?? { followup_count: 0, evidenced_count: 0, last_followup_at: '' },
            },
        };
    }
    return toOrgErr(r);
}
async function addFollowup(customerId, input) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: NO_CHANNEL };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'crmFollowups', {
        customerId,
        note: input.note,
        channel: input.channel ?? 'other',
        evidenceCount: input.evidenceCount ?? 0,
        taskId: input.taskId ?? '',
    });
    if (r.ok === true) {
        return { ok: true, data: r.data };
    }
    return toOrgErr(r);
}
async function loadFunnel() {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: NO_CHANNEL };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'crmFunnel', {});
    if (r.ok === true) {
        const d = (r.data ?? {});
        const ready = d.funnelReady === true;
        if (!ready) {
            return {
                ok: true,
                data: {
                    ready: false,
                    reason: String(d.funnelNote ?? '漏斗数据暂时取不到。'),
                    stages: { lead: 0, following: 0, pending_approval: 0, won: 0, stalled: 0 },
                    items: [],
                    totals: { customers: 0, linked: 0, stagesSum: 0 },
                },
            };
        }
        const st = (d.stages ?? {});
        const items = (Array.isArray(d.items) ? d.items : []);
        return {
            ok: true,
            data: {
                ready: true,
                reason: null,
                stages: {
                    lead: Number(st.lead ?? 0) || 0,
                    following: Number(st.following ?? 0) || 0,
                    pending_approval: Number(st.pending_approval ?? 0) || 0,
                    won: Number(st.won ?? 0) || 0,
                    stalled: Number(st.stalled ?? 0) || 0,
                },
                items,
                totals: {
                    customers: Number(d.totals?.customers ?? items.length) || 0,
                    linked: Number(d.totals?.linked ?? 0) || 0,
                    stagesSum: Number(d.totals?.stagesSum ?? 0) || 0,
                },
            },
        };
    }
    return toOrgErr(r);
}
async function loadGuardInfo() {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: NO_CHANNEL };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'crmGuard', {});
    if (r.ok === true) {
        const d = (r.data ?? {});
        const mode = d.mode === 'approval' ? 'approval' : 'confirm';
        return {
            ok: true,
            data: {
                agentCount: Number(d.agentCount ?? 0) || 0,
                mode,
                wording: String(d.wording ?? (mode === 'approval'
                    ? '需要铺内他人审批后才能生效'
                    : '需要你二次确认后才能生效，全程留痕可追溯')),
                actions: Array.isArray(d.actions) ? d.actions : [],
                note: String(d.note ?? ''),
            },
        };
    }
    return toOrgErr(r);
}
async function precheckIrreversible(action) {
    if (connection === null)
        return { ok: false, code: 'no_channel', message: NO_CHANNEL };
    const r = await (0, bridge_js_1.callKaipu)(connection, 'crmGuardCheck', { action });
    if (r.ok === true) {
        const d = (r.data ?? {});
        return {
            ok: true,
            data: (() => {
                const out = {
                    allowed: d.allowed !== false,
                    needsConfirm: d.needsConfirm === true,
                    irreversible: d.irreversible === true,
                };
                if (typeof d.mode === 'string')
                    out.mode = d.mode;
                if (typeof d.wording === 'string')
                    out.wording = d.wording;
                if (typeof d.label === 'string')
                    out.label = d.label;
                if (typeof d.why === 'string')
                    out.why = d.why;
                return out;
            })(),
        };
    }
    return toOrgErr(r);
}
//# sourceMappingURL=crm.js.map