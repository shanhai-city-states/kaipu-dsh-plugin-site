/* 山海·开铺 · client bundle · @shanhai/kaipu-workstation
 * 由 tools/build-client.mjs 生成 —— 请勿手改。
 * 模块 27 个（按依赖序）· 宿主外部模块 2 个：react/jsx-runtime, react
 */
window.__ModuleLoader__.load({
  id: "@shanhai/kaipu-workstation",
  factory: function (require) {
    'use strict';

    /* ── client/panel-id.js ── */
    var m_panel_id = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WORKSTATION_PANEL_ID = void 0;
      exports.WORKSTATION_PANEL_ID = 'shanhai-kaipu-workstation-gw';
      //# sourceMappingURL=panel-id.js.map
      return module.exports;
    })();

    /* ── client/WorkstationPanelIcon.js ── */
    var m_WorkstationPanelIcon = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WorkstationPanelIcon = WorkstationPanelIcon;
      const react_1 = require("react");
      function WorkstationPanelIcon() {
          return (0, react_1.createElement)('span', { 'aria-label': '工位', title: '工位', style: { display: 'inline-flex' } }, (0, react_1.createElement)('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true }, (0, react_1.createElement)('path', {
              d: 'M3 10h13M5 10v9M14 10v9M17 13h4v6',
              stroke: 'currentColor',
              strokeWidth: 1.6,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
          })));
      }
      //# sourceMappingURL=WorkstationPanelIcon.js.map
      return module.exports;
    })();

    /* ── client/theme.js ── */
    var m_theme = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LH = exports.FS = exports.FONT = exports.C = exports.TONE_BG = void 0;
      exports.TONE_BG = {
          pass: '#16a34a',
          conditional: '#d97706',
          reject: '#dc2626',
          refuse: '#6d28d9',
      };
      exports.C = {
          border: 'var(--dsh-border, #e5e5e5)',
          text: 'var(--dsh-text, inherit)',
          dim: 'var(--dsh-text-secondary, #8a8a8a)',
          faint: 'var(--dsh-text-tertiary, color-mix(in srgb, currentColor 45%, transparent))',
          soft: 'var(--dsh-surface-secondary, rgba(127,127,127,0.08))',
          accent: '#3B6FE0',
      };
      exports.FONT = {
          mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      };
      exports.FS = {
          tag: 12,
          small: 13,
          base: 14,
          title: 15,
          heading: 17,
      };
      exports.LH = {
          tight: 1.6,
          normal: 1.8,
          loose: 2,
      };
      //# sourceMappingURL=theme.js.map
      return module.exports;
    })();

    /* ── client/bridge.js ── */
    var m_bridge = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ENDPOINTS = exports.CONNECTION_SERVICE = exports.REMOTE_CHANNEL = exports.REMOTE_NS = void 0;
      exports.endpointOf = endpointOf;
      exports.getConnection = getConnection;
      exports.callKaipu = callKaipu;
      exports.REMOTE_NS = 'kaipu-workstation';
      exports.REMOTE_CHANNEL = '/api';
      exports.CONNECTION_SERVICE = 'connection';
      exports.ENDPOINTS = {
          status: 'status',
          deviceCred: 'deviceCred',
          state: 'state',
          orgTree: 'orgTree',
          orgNodeCreate: 'orgNodeCreate',
          orgNodePatch: 'orgNodePatch',
          orgNodeDelete: 'orgNodeDelete',
          tasksCreate: 'tasksCreate',
          tasksList: 'tasksList',
          tasksClaim: 'tasksClaim',
          tasksDone: 'tasksDone',
          projectsList: 'projectsList',
          projectsCreate: 'projectsCreate',
          projectsRename: 'projectsRename',
          projectArchive: 'projectArchive',
          projectUnarchive: 'projectUnarchive',
          projectArchiveDownload: 'projectArchiveDownload',
          projectAuditRequest: 'projectAuditRequest',
          auditGet: 'auditGet',
          tasksStart: 'tasksStart',
          tasksHeartbeat: 'tasksHeartbeat',
          tasksBlock: 'tasksBlock',
          tasksUnblock: 'tasksUnblock',
          tasksAssign: 'tasksAssign',
          tasksDeps: 'tasksDeps',
          tasksDepsList: 'tasksDepsList',
          tasksDepsDelete: 'tasksDepsDelete',
          projectPhaseSet: 'projectPhaseSet',
          projectSuggestPhase: 'projectSuggestPhase',
          projectSuggestionsList: 'projectSuggestionsList',
          projectDecidePhase: 'projectDecidePhase',
          deliverablesList: 'deliverablesList',
          deliverablePromote: 'deliverablePromote',
          tasksApprove: 'tasksApprove',
          tasksReject: 'tasksReject',
          tasksBoard: 'tasksBoard',
          tasksBlocked: 'tasksBlocked',
          tasksPendingApprovals: 'tasksPendingApprovals',
          whoami: 'whoami',
          packsList: 'packsList',
          packUpload: 'packUpload',
          packDownload: 'packDownload',
          packDelete: 'packDelete',
          packJournal: 'packJournal',
          rolesSeats: 'rolesSeats',
          grantList: 'grantList',
          grantCreate: 'grantCreate',
          grantGenerate: 'grantGenerate',
          grantRevoke: 'grantRevoke',
          grantEvents: 'grantEvents',
          inviteCreate: 'inviteCreate',
          deviceJoinCodeCreate: 'deviceJoinCodeCreate',
          joinRequests: 'joinRequests',
          joinRequestGet: 'joinRequestGet',
          joinRequestCreate: 'joinRequestCreate',
          joinRequestApprove: 'joinRequestApprove',
          joinRequestReject: 'joinRequestReject',
          devicesList: 'devicesList',
          deviceRevoke: 'deviceRevoke',
          deviceResetSecret: 'deviceResetSecret',
          deviceJoinCodes: 'deviceJoinCodes',
          deviceJoinCodeRevoke: 'deviceJoinCodeRevoke',
          deviceJoinCodeRenew: 'deviceJoinCodeRenew',
          deviceEvents: 'deviceEvents',
          contextGet: 'contextGet',
          contextPut: 'contextPut',
          tenantRegions: 'tenantRegions',
          tenantShops: 'tenantShops',
          tenantNameRename: 'tenantNameRename',
          shopOpen: 'shopOpen',
          shopSwitch: 'shopSwitch',
          tenantDoorAssign: 'tenantDoorAssign',
          orgClearAgents: 'orgClearAgents',
          seatEvict: 'seatEvict',
          agentResetConnection: 'agentResetConnection',
          notifications: 'notifications',
          notificationsRead: 'notificationsRead',
          pluginVersion: 'pluginVersion',
          packExport: 'packExport',
          packsInteractions: 'packsInteractions',
          packPurge: 'packPurge',
          packPurgeCancel: 'packPurgeCancel',
          packPurgeStatus: 'packPurgeStatus',
          crmCustomers: 'crmCustomers',
          crmCustomerCreate: 'crmCustomerCreate',
          crmCustomerUpdate: 'crmCustomerUpdate',
          crmCustomerArchive: 'crmCustomerArchive',
          crmFollowups: 'crmFollowups',
          crmFunnel: 'crmFunnel',
          crmGuard: 'crmGuard',
          crmGuardCheck: 'crmGuardCheck',
          startEventStream: 'startEventStream',
          pollEvents: 'pollEvents',
          stopEventStream: 'stopEventStream',
          notesHealth: 'notesHealth',
          notesStats: 'notesStats',
          notesList: 'notesList',
          notesCreate: 'notesCreate',
          notesUpdate: 'notesUpdate',
          notesToggle: 'notesToggle',
          notesDelete: 'notesDelete',
          skillsList: 'skillsList',
          skillsCatalog: 'skillsCatalog',
          creditsGet: 'creditsGet',
          creditsClaim: 'creditsClaim',
          creditsLedger: 'creditsLedger',
      };
      function endpointOf(method) {
          return `${exports.REMOTE_NS}/${method}`;
      }
      function getConnection(ctx) {
          let got;
          try {
              got = ctx.get?.(exports.CONNECTION_SERVICE);
          }
          catch {
              got = undefined;
          }
          if (got === undefined) {
              got = ctx[exports.CONNECTION_SERVICE];
          }
          if (got === null || typeof got !== 'object')
              return null;
          const conn = got;
          return typeof conn.rpc?.call === 'function' ? conn : null;
      }
      async function callKaipu(conn, method, query, signal) {
          const payload = { args: { query } };
          let raw;
          try {
              raw = await conn.rpc.call(exports.REMOTE_CHANNEL, endpointOf(method), payload, signal);
          }
          catch (e) {
              const detail = e instanceof Error ? e.message : String(e);
              if (/\b404\b/.test(detail)) {
                  return { ok: false, error: { kind: 'gateway', code: 'not_found', detail } };
              }
              return { ok: false, error: { kind: 'unreachable', code: 'transport', detail } };
          }
          const gw = raw;
          if (gw === null || typeof gw !== 'object') {
              return { ok: false, error: { kind: 'gateway', code: 'bad_result', detail: '网关返回体为空' } };
          }
          if (gw.ok !== true) {
              const anyGw = gw;
              const gwMsg = anyGw.message ?? anyGw.error?.message ?? '';
              if (anyGw.success === false) {
                  return { ok: false, error: { kind: 'gateway', code: 'not_found', detail: gwMsg || '端点不存在' } };
              }
              if (/路径不存在/.test(gwMsg)) {
                  return { ok: false, error: { kind: 'gateway', code: 'not_found', detail: gwMsg } };
              }
              return {
                  ok: false,
                  error: {
                      kind: 'gateway',
                      code: gw.error?.code ?? 'gateway',
                      detail: gw.error?.message ?? '网关调用失败',
                  },
              };
          }
          const v = gw.value;
          if (v === null || typeof v !== 'object') {
              return { ok: false, error: { kind: 'gateway', code: 'empty_value', detail: 'host 方法没有返回值' } };
          }
          if (v.ok !== true) {
              const vErr = v.error;
              const vErrObj = vErr !== null && typeof vErr === 'object' ? vErr : null;
              const code0 = typeof v.code === 'string' ? v.code : typeof vErrObj?.code === 'string' ? vErrObj.code : 'unknown';
              const msg0 = typeof vErr === 'string'
                  ? vErr
                  : typeof vErrObj?.message === 'string'
                      ? vErrObj.message
                      : '服务端没有说明原因';
              return {
                  ok: false,
                  business: { code: code0, message: msg0 },
              };
          }
          return { ok: true, data: v.data };
      }
      //# sourceMappingURL=bridge.js.map
      return module.exports;
    })();

    /* ── client/crm.js ── */
    var m_crm = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
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
      const bridge_js_1 = m_bridge;
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
      return module.exports;
    })();

    /* ── client/CrmSection.js ── */
    var m_CrmSection = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CrmSection = CrmSection;
      const jsx_runtime_1 = require("react/jsx-runtime");
      const react_1 = require("react");
      const theme_js_1 = m_theme;
      const crm_js_1 = m_crm;
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
      return module.exports;
    })();

    /* ── client/notes.js ── */
    var m_notes = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
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
      const bridge_js_1 = m_bridge;
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
      return module.exports;
    })();

    /* ── client/NotesSection.js ── */
    var m_NotesSection = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NotesSection = NotesSection;
      const jsx_runtime_1 = require("react/jsx-runtime");
      const react_1 = require("react");
      const notes_js_1 = m_notes;
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
      return module.exports;
    })();

    /* ── client/skills.js ── */
    var m_skills = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.setSkillsConnection = setSkillsConnection;
      exports.skillsCatalog = skillsCatalog;
      exports.skillsInstalled = skillsInstalled;
      exports.creditsGet = creditsGet;
      exports.creditsLedger = creditsLedger;
      exports.creditsClaim = creditsClaim;
      const bridge_js_1 = m_bridge;
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
      return module.exports;
    })();

    /* ── client/skill-pitch.js ── */
    var m_skill_pitch = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.buildInstallPitch = buildInstallPitch;
      exports.blockedReasonText = blockedReasonText;
      function buildInstallPitch(input) {
          const NL = '\n';
          const shop = (input.shopName ?? '').trim();
          const where = shop.length > 0 ? `「${shop}」这个铺子` : '我这个铺子';
          if (input.installed === true) {
              const v = (input.installedVersion ?? '').trim();
              return [
                  `帮我确认一下「${input.name}」这个技能在我${where}里的状态。`,
                  '',
                  '它已经装过了，我不是要重装 —— 重装会覆盖现有授权，装完反而不能用。',
                  '',
                  '请帮我确认三件事，然后告诉我结果：',
                  `1. 技能标识是不是 ${input.skillId}`,
                  v.length > 0 ? `2. 当前版本是不是 ${v}` : '2. 当前装的是哪个版本',
                  '3. 能不能正常跑一次',
                  '',
                  '如果版本不对或者跑不起来，停下来告诉我原因，不要自己删了重装。',
              ].join(NL);
          }
          return [
              `帮我安装「${input.name}」这个技能到${where}。`,
              '',
              `技能标识：${input.skillId}`,
              `它是干什么的：${input.summary}`,
              '',
              '安装的时候注意：',
              '1. 只装这一个，不要顺手把别的也装上；',
              '2. 装完看一眼结果，装失败了就停下来告诉我原因，不要反复重试；',
              '3. 如果提示已经装过，不要覆盖 —— 先告诉我它现在是什么版本。',
              '',
              '装完告诉我：装好了没有、版本是多少、有没有报错。',
          ].join(NL);
      }
      function blockedReasonText(reasons) {
          if (reasons.length === 0)
              return '';
          if (reasons.some((r) => r.includes('建设中') || r.includes('尚无实物'))) {
              return '这个技能还在建设中，暂时不能安装。';
          }
          if (reasons.some((r) => r.includes('manifest'))) {
              return '安装包还在准备中，暂时不能安装。';
          }
          return '这个技能暂时不能安装。';
      }
      //# sourceMappingURL=skill-pitch.js.map
      return module.exports;
    })();

    /* ── client/SkillSection.js ── */
    var m_SkillSection = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RECHARGE_RATE = exports.RECHARGE_WECHAT = exports.SEARCH_MIN = void 0;
      exports.SkillSection = SkillSection;
      const jsx_runtime_1 = require("react/jsx-runtime");
      const react_1 = require("react");
      const theme_js_1 = m_theme;
      const skills_js_1 = m_skills;
      const skill_pitch_js_1 = m_skill_pitch;
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
      return module.exports;
    })();

    /* ── client/live.js ── */
    var m_live = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.setConnection = setConnection;
      exports.hasConnection = hasConnection;
      exports.getConnection = getConnection;
      exports.loadWorkstationState = loadWorkstationState;
      exports.loadOrgTree = loadOrgTree;
      exports.createOrgNode = createOrgNode;
      exports.resetAgentKey = resetAgentKey;
      exports.evictSeat = evictSeat;
      exports.loadNotifications = loadNotifications;
      exports.markNotificationsRead = markNotificationsRead;
      exports.checkPluginVersion = checkPluginVersion;
      exports.exportPack = exportPack;
      exports.loadPackInteractions = loadPackInteractions;
      exports.purgePack = purgePack;
      exports.cancelPurge = cancelPurge;
      exports.purgeStatus = purgeStatus;
      exports.clearAgents = clearAgents;
      exports.renameOrgNode = renameOrgNode;
      exports.deleteOrgNode = deleteOrgNode;
      exports.loadTasks = loadTasks;
      exports.createTask = createTask;
      exports.loadProjects = loadProjects;
      exports.createProject = createProject;
      exports.renameProject = renameProject;
      exports.setProjectPhase = setProjectPhase;
      exports.suggestProjectPhase = suggestProjectPhase;
      exports.loadPhaseSuggestions = loadPhaseSuggestions;
      exports.decideProjectPhase = decideProjectPhase;
      exports.loadTaskDeps = loadTaskDeps;
      exports.addTaskDep = addTaskDep;
      exports.removeTaskDep = removeTaskDep;
      exports.loadDeliverables = loadDeliverables;
      exports.promoteDeliverable = promoteDeliverable;
      exports.unarchiveProject = unarchiveProject;
      exports.downloadProjectArchive = downloadProjectArchive;
      exports.archiveProject = archiveProject;
      exports.claimTask = claimTask;
      exports.finishTask = finishTask;
      exports.seatText = seatText;
      exports.inviteExpired = inviteExpired;
      exports.splitMembers = splitMembers;
      exports.summarizeSeats = summarizeSeats;
      const bridge_js_1 = m_bridge;
      let connection = null;
      function setConnection(conn) {
          connection = conn;
      }
      function hasConnection() {
          return connection !== null;
      }
      function getConnection() {
          return connection;
      }
      function offline(kind, label, reason) {
          return { kind, label, reason, state: null, server: null };
      }
      const MISSING_ENDPOINT_CODES = new Set(['not_found', 'endpoint_not_found', 'no_handler', 'unknown_endpoint']);
      function looksLikeMissingEndpoint(err) {
          if (err.kind !== 'gateway')
              return false;
          if (MISSING_ENDPOINT_CODES.has(err.code))
              return true;
          if (/^(?:http_)?404$/.test(err.code))
              return true;
          const s = `${err.code} ${err.detail}`.toLowerCase();
          return (s.includes('not_found') ||
              s.includes('notfound') ||
              s.includes('no_handler') ||
              s.includes('no handler') ||
              s.includes('unknown_endpoint') ||
              s.includes('unknown endpoint') ||
              s.includes('endpoint_not_found') ||
              s.includes('路径不存在'));
      }
      async function loadWorkstationState(signal) {
          if (connection === null) {
              return offline('no_channel', '通道不可用', '没取到宿主的数据通道。这是环境问题，不是服务端故障。');
          }
          const r = await (0, bridge_js_1.callKaipu)(connection, 'state', {}, signal);
          if (r.ok !== true) {
              if (!('business' in r) && looksLikeMissingEndpoint(r.error)) {
                  const ownBug = /\/api\//.test(r.error.detail) || /路径不存在/.test(r.error.detail);
                  return offline('stale', '工位数据读不到', ownBug
                      ? '接入地址不对 —— 数据通道未被正确寻址（路径里混入了内部通道段），请核对接入地址配置。'
                      : '数据通道未就绪 —— 工位数据由本插件 host half 提供，它可能未加载成功。');
              }
              return offline('unreachable', '未连上', 'business' in r ? r.business.message : r.error.detail);
          }
          const st = r.data;
          return {
              kind: st.source,
              label: st.source === 'scaffold' ? '本地持久化态' : '已接入',
              reason: null,
              state: st,
              server: { baseUrl: '', accountId: st.accountId },
          };
      }
      function orgError(r) {
          if ('business' in r && r.business) {
              return { ok: false, code: r.business.code, message: r.business.message };
          }
          const detail = r.error?.detail ?? '未知错误';
          return { ok: false, code: r.error?.code ?? 'unknown', message: detail };
      }
      async function loadOrgTree(signal) {
          if (connection === null) {
              return { ok: false, code: 'no_channel', message: '没有数据通道 —— 工位 host 未加载。' };
          }
          const r = await (0, bridge_js_1.callKaipu)(connection, 'orgTree', {}, signal);
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function createOrgNode(name, parentNodeId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const query = { name };
          if (parentNodeId)
              query.parentNodeId = parentNodeId;
          const r = await (0, bridge_js_1.callKaipu)(connection, 'orgNodeCreate', query);
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function resetAgentKey(agentId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'agentResetConnection', { agentId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function evictSeat(seat, agentId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'seatEvict', agentId !== undefined && agentId !== '' ? { seat, agentId } : { seat });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function loadNotifications() {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'notifications', {});
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function markNotificationsRead() {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'notificationsRead', {});
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function checkPluginVersion(current) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'pluginVersion', { current });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function exportPack(interactionId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'packExport', { interactionId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function loadPackInteractions() {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'packsInteractions', {});
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function purgePack(interactionId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'packPurge', { interactionId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function cancelPurge(interactionId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'packPurgeCancel', { interactionId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function purgeStatus(interactionId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'packPurgeStatus', { interactionId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function clearAgents() {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'orgClearAgents', { confirm: 'CLEAR' });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function renameOrgNode(nodeId, name) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'orgNodePatch', { nodeId, name });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function deleteOrgNode(nodeId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'orgNodeDelete', { nodeId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function loadTasks(all, page) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const query = all ? { all: true } : {};
          if (page?.limit !== undefined)
              query.limit = page.limit;
          if (page?.offset !== undefined && page.offset > 0)
              query.offset = page.offset;
          const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksList', query);
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function createTask(title, detail, projectId, interactionId, kind, notifyAgent, nodeId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const query = { title, detail };
          if (typeof projectId === 'string' && projectId.length > 0)
              query.projectId = projectId;
          if (typeof interactionId === 'string' && interactionId.length > 0)
              query.interactionId = interactionId;
          if (typeof kind === 'string' && kind.length > 0)
              query.kind = kind;
          if (typeof notifyAgent === 'string' && notifyAgent.length > 0)
              query.notifyAgent = notifyAgent;
          if (typeof nodeId === 'string' && nodeId.length > 0)
              query.nodeId = nodeId;
          const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksCreate', query);
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function loadProjects() {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'projectsList', {});
          if (r.ok === true)
              return { ok: true, data: { projects: Array.isArray(r.data?.projects) ? r.data.projects : [] } };
          return orgError(r);
      }
      async function createProject(name) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'projectsCreate', { name });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function renameProject(projectId, name) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'projectsRename', { projectId, name });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function setProjectPhase(projectId, phase) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'projectPhaseSet', { projectId, phase });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function suggestProjectPhase(projectId, toPhase, reason, expectedVersion) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'projectSuggestPhase', {
              projectId, toPhase, reason, expectedVersion,
              idempotencyKey: 'ui-' + Date.now().toString(36) + '-' +
                  Math.random().toString(36).slice(2, 8),
          });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function loadPhaseSuggestions(projectId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'projectSuggestionsList', { projectId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function decideProjectPhase(projectId, suggestionId, verdict, reasonCode = '', reasonText = '') {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'projectDecidePhase', { projectId, suggestionId, verdict, reasonCode, reasonText });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function loadTaskDeps(taskId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksDepsList', { taskId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function addTaskDep(taskId, dependsOnTaskId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksDeps', { taskId, dependsOnTaskId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function removeTaskDep(taskId, dependsOnTaskId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksDepsDelete', { taskId, dependsOnTaskId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function loadDeliverables(taskId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'deliverablesList', { taskId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function promoteDeliverable(taskId, deliverableId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'deliverablePromote', { taskId, deliverableId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function unarchiveProject(projectId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'projectUnarchive', { projectId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function downloadProjectArchive(projectId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'projectArchiveDownload', { projectId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function archiveProject(projectId, force = false) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'projectArchive', { projectId, force });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function claimTask(taskId) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksClaim', { taskId });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      async function finishTask(taskId, result) {
          if (connection === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道。' };
          const r = await (0, bridge_js_1.callKaipu)(connection, 'tasksDone', { taskId, result });
          if (r.ok === true)
              return { ok: true, data: r.data };
          return orgError(r);
      }
      function seatText(seat) {
          if (seat.status === 'vacant')
              return '空位 · 可邀请';
          return seat.presence === 'away' ? '离座 · 留痕在' : '在场';
      }
      function inviteExpired(invite, now) {
          if (invite.used)
              return false;
          return new Date(invite.expiresAt).getTime() <= new Date(now).getTime();
      }
      function splitMembers(state) {
          const humans = [];
          const agents = [];
          for (const m of state.members) {
              if (m.kind === 'agent')
                  agents.push(m);
              else
                  humans.push(m);
          }
          return { humans, agents };
      }
      function summarizeSeats(state) {
          let occupied = 0;
          let vacant = 0;
          let awayButActive = 0;
          let removed = 0;
          for (const s of state.seats) {
              if (!s.membershipActive) {
                  removed++;
                  continue;
              }
              if (s.status === 'vacant') {
                  vacant++;
                  continue;
              }
              occupied++;
              if (s.presence === 'away')
                  awayButActive++;
          }
          return { occupied, vacant, awayButActive, removed };
      }
      //# sourceMappingURL=live.js.map
      return module.exports;
    })();

    /* ── client/notify-copy.js ── */
    var m_notify_copy = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NOTIFY_DEGRADED_NOTICE = exports.NOTIFY_HINT = exports.NOTIFY_LABEL = exports.NOTIFY_PUBLIC_LABEL = exports.NOTIFY_PUBLIC_VALUE = void 0;
      exports.agentChoices = agentChoices;
      exports.notifyPickHint = notifyPickHint;
      exports.isNotifyUnsupported = isNotifyUnsupported;
      exports.notifyFailText = notifyFailText;
      exports.extraHolderBadge = extraHolderBadge;
      exports.extraHolderTitle = extraHolderTitle;
      exports.holderUnknownText = holderUnknownText;
      function agentChoices(members) {
          const seen = new Set();
          const out = [];
          for (const m of members) {
              if (m.kind !== 'agent')
                  continue;
              if (m.membershipActive === false)
                  continue;
              const id = (m.id ?? '').trim();
              if (id.length === 0 || seen.has(id))
                  continue;
              seen.add(id);
              out.push({ id, name: (m.name ?? '').trim().length > 0 ? m.name.trim() : id });
          }
          out.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'));
          return out;
      }
      exports.NOTIFY_PUBLIC_VALUE = '';
      exports.NOTIFY_PUBLIC_LABEL = '谁在岗谁领（默认）';
      exports.NOTIFY_LABEL = '顺手通知谁';
      exports.NOTIFY_HINT = '点名后它会更快看到这活；不点名，活也在公池里等认领。';
      function notifyPickHint(choice) {
          if (choice === null)
              return exports.NOTIFY_HINT;
          return `已选 ${choice.name} —— 它下次来取活时会先看到这条；别人也能领。`;
      }
      function isNotifyUnsupported(code, message) {
          if (code !== 'unknown_field')
              return false;
          return /notifyAgent|notify_agent/i.test(message);
      }
      exports.NOTIFY_DEGRADED_NOTICE = '这条已按「谁在岗谁领」发到公池 —— 服务端还没开通点名通知，选了也不会生效。';
      function notifyFailText(code, message) {
          if (code === 'agent_not_found') {
              return '选的那个 Agent 已经不在这个铺子里了，换个目标，或者选「谁在岗谁领」。';
          }
          if (isNotifyUnsupported(code, message)) {
              return '服务端这版还不支持点名通知，把「顺手通知谁」调回「谁在岗谁领」再发一次就行。';
          }
          return message.length > 0 ? message : '这条没发出去，稍后再试一次。';
      }
      function extraHolderBadge(holderCount) {
          const extra = holderCount - 1;
          if (!Number.isFinite(extra) || extra < 1)
              return '';
          return `＋${extra}`;
      }
      function extraHolderTitle(holderCount) {
          const extra = holderCount - 1;
          if (!Number.isFinite(extra) || extra < 1)
              return '';
          return `这个位子上还有 ${extra} 个人`;
      }
      function holderUnknownText(holderCount, seatCount, seatVacantish = undefined) {
          if (holderCount > 0)
              return '';
          if (!Number.isFinite(seatCount) || seatCount <= 0)
              return '';
          if (seatVacantish === undefined)
              return '';
          if (seatVacantish)
              return '';
          return '有人，但读不到是谁';
      }
      //# sourceMappingURL=notify-copy.js.map
      return module.exports;
    })();

    /* ── client/events.js ── */
    var m_events = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LatestOnly = exports.SSE_IDLE_TIMEOUT_MS = exports.SSE_WATCHDOG_MS = exports.PUMP_EXHAUSTED_TEXT = exports.PUMP_REVIVE_MAX = exports.PUMP_REVIVE_AFTER = exports.POLL_OFFLINE_MS = exports.POLL_HIDDEN_MS = exports.POLL_SILENT_MS = exports.POLL_WEAK_MS = exports.POLL_STRONG_MS = void 0;
      exports.levelOf = levelOf;
      exports.pollIntervalFor = pollIntervalFor;
      exports.openEventStream = openEventStream;
      exports.onVisibilityChange = onVisibilityChange;
      exports.subscribeEvents = subscribeEvents;
      const bridge_js_1 = m_bridge;
      const live_js_1 = m_live;
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
      return module.exports;
    })();

    /* ── client/suggest-theme.js ── */
    var m_suggest_theme = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SP = exports.SF = exports.SR = exports.SC_ACCENT = exports.SC = void 0;
      exports.buttonStyle = buttonStyle;
      exports.toneStyle = toneStyle;
      exports.SC = {
          ink: '#1B1F24',
          face: '#FFFFFF',
          line: '#E3E6EA',
          brand: '#C2410C',
          blue: '#3B6FE0',
      };
      exports.SC_ACCENT = '#3B6FE0';
      exports.SR = {
          card: 10,
          ctrl: 6,
      };
      exports.SF = {
          title: 15,
          body: 13,
          tag: 11,
      };
      exports.SP = {
          card: 14,
          block: 10,
      };
      function buttonStyle(tone) {
          if (tone === 'stale') {
              return {
                  bg: exports.SC.line,
                  fg: exports.SC.ink,
                  border: exports.SC.line,
                  label: '✓ 确认推进',
                  disabled: true,
              };
          }
          if (tone === 'blocked') {
              return {
                  bg: exports.SC.face,
                  fg: exports.SC.blue,
                  border: exports.SC.blue,
                  label: '⚠ 仍要推进',
                  disabled: false,
              };
          }
          return {
              bg: exports.SC.blue,
              fg: exports.SC.face,
              border: exports.SC.blue,
              label: '✓ 确认推进',
              disabled: false,
          };
      }
      function toneStyle(tone) {
          if (tone === 'stale') {
              return {
                  card: {
                      border: `1px dashed ${exports.SC.ink}`,
                      background: exports.SC.face,
                      borderRadius: exports.SR.card,
                      padding: exports.SP.card,
                  },
                  showBrand: false,
              };
          }
          if (tone === 'blocked') {
              return {
                  card: {
                      border: `1px solid ${exports.SC.line}`,
                      borderLeft: `3px solid ${exports.SC.brand}`,
                      background: exports.SC.face,
                      borderRadius: exports.SR.card,
                      padding: exports.SP.card,
                  },
                  showBrand: true,
              };
          }
          return {
              card: {
                  border: `1px solid ${exports.SC.line}`,
                  background: exports.SC.face,
                  borderRadius: exports.SR.card,
                  padding: exports.SP.card,
              },
              showBrand: false,
          };
      }
      //# sourceMappingURL=suggest-theme.js.map
      return module.exports;
    })();

    /* ── client/project-phase.js ── */
    var m_project_phase = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PROJECT_PHASES = void 0;
      exports.phaseIndex = phaseIndex;
      exports.phaseLabel = phaseLabel;
      exports.phaseHint = phaseHint;
      exports.phaseBar = phaseBar;
      exports.nextPhase = nextPhase;
      exports.prevPhase = prevPhase;
      exports.isArchivedPhase = isArchivedPhase;
      exports.PROJECT_PHASES = [
          'requirement',
          'plan',
          'assignment',
          'build',
          'review',
          'archived',
      ];
      const PHASE_LABEL = {
          requirement: '立需求',
          plan: '出计划书',
          assignment: '分工',
          build: '施工',
          review: '验收',
          archived: '归档',
      };
      const PHASE_DELIVERABLE = {
          requirement: '需求确认书：要做成什么样、什么不做',
          plan: '开发计划书：怎么做、分几期、多大代价',
          assignment: '分工方案：谁干哪件（任务依赖在这里定）',
          build: '交付物：干出来的东西',
          review: '验收结论：通过 / 有条件通过 / 打回',
          archived: '归档包：定稿资料 + 清单，冻结不再改',
      };
      function phaseIndex(phase) {
          const p = (phase ?? '').trim();
          const i = exports.PROJECT_PHASES.indexOf(p);
          return i < 0 ? 0 : i + 1;
      }
      function phaseLabel(phase, serverLabel) {
          const p = (phase ?? '').trim();
          if (p === '')
              return '未知阶段';
          const given = (serverLabel ?? '').trim();
          if (given.length > 0)
              return given;
          return PHASE_LABEL[p] ?? p;
      }
      function phaseHint(phase) {
          const p = (phase ?? '').trim();
          const i = phaseIndex(p);
          if (i === 0)
              return `未知阶段（${p || '空'}）—— 不在六阶之内`;
          const what = PHASE_DELIVERABLE[p] ?? '';
          return `第 ${i}/${exports.PROJECT_PHASES.length} 步：${PHASE_LABEL[p] ?? p}${what ? ' · 这步要交：' + what : ''}`;
      }
      function phaseBar(phase) {
          const i = phaseIndex(phase);
          if (i === 0)
              return '？'.repeat(exports.PROJECT_PHASES.length);
          return '●'.repeat(i) + '○'.repeat(exports.PROJECT_PHASES.length - i);
      }
      function nextPhase(phase) {
          const i = phaseIndex(phase);
          if (i === 0 || i >= exports.PROJECT_PHASES.length)
              return null;
          return exports.PROJECT_PHASES[i] ?? null;
      }
      function prevPhase(phase) {
          const i = phaseIndex(phase);
          if (i <= 1)
              return null;
          return exports.PROJECT_PHASES[i - 2] ?? null;
      }
      function isArchivedPhase(phase) {
          return (phase ?? '').trim() === 'archived';
      }
      //# sourceMappingURL=project-phase.js.map
      return module.exports;
    })();

    /* ── client/suggest-confirm.js ── */
    var m_suggest_confirm = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isIrreversibleStep = isIrreversibleStep;
      exports.confirmLabel = confirmLabel;
      exports.confirmLabelIrreversible = confirmLabelIrreversible;
      exports.confirmLabelFor = confirmLabelFor;
      exports.confirmHint = confirmHint;
      exports.confirmAriaLabel = confirmAriaLabel;
      const project_phase_js_1 = m_project_phase;
      const IRREVERSIBLE_TO = new Set(['review', 'archived']);
      function isIrreversibleStep(toPhase) {
          return IRREVERSIBLE_TO.has((toPhase ?? '').trim());
      }
      function confirmLabel(toPhase) {
          const p = (0, project_phase_js_1.phaseLabel)(toPhase);
          return `⚠ 再点一次：推进到「${p}」`;
      }
      function confirmLabelIrreversible(toPhase) {
          const p = (0, project_phase_js_1.phaseLabel)(toPhase);
          return `⚠ 不可逆：推进到「${p}」`;
      }
      function confirmLabelFor(toPhase) {
          return isIrreversibleStep(toPhase) ? confirmLabelIrreversible(toPhase) : confirmLabel(toPhase);
      }
      function confirmHint(armed, toPhase) {
          if (!armed)
              return '';
          const p = (0, project_phase_js_1.phaseLabel)(toPhase);
          if (isIrreversibleStep(toPhase)) {
              return `已确认一次。再点一次将推进到「${p}」，并记录为人工覆盖；归档后不可再改。`;
          }
          return `已确认一次。再点一次将推进到「${p}」，并记录为人工覆盖。`;
      }
      function confirmAriaLabel(tone, armed, toPhase) {
          const p = (0, project_phase_js_1.phaseLabel)(toPhase);
          if (tone === 'stale')
              return `这条建议已失效，不能推进到「${p}」`;
          if (tone === 'normal')
              return `确认推进到「${p}」`;
          return armed
              ? `再按一次确认推进到「${p}」（需按两次，第二次才生效）`
              : `预检未通过，仍要推进到「${p}」（需按两次）`;
      }
      //# sourceMappingURL=suggest-confirm.js.map
      return module.exports;
    })();

    /* ── client/deps-text.js ── */
    var m_deps_text = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.depStatusLabel = depStatusLabel;
      exports.depLine = depLine;
      exports.depsHeadline = depsHeadline;
      exports.pickDepCandidates = pickDepCandidates;
      exports.versionLine = versionLine;
      exports.versionHint = versionHint;
      const ST_LABEL = {
          posted: '待领',
          claimed: '已领',
          in_progress: '在干',
          done: '已交',
          accepted: '已通过',
          rejected: '被驳回',
          blocked: '求助中',
      };
      function depStatusLabel(status) {
          const s = (status ?? '').trim();
          if (s === '')
              return '状态不明';
          return ST_LABEL[s] ?? s;
      }
      function depLine(d) {
          const title = (d.title ?? '').trim() || (d.id ?? '').trim() || '未命名任务';
          return `${title}（${depStatusLabel(d.status)}）`;
      }
      function depsHeadline(d) {
          const on = d.dependsOn.length;
          const bl = d.blocks.length;
          if (on === 0 && bl === 0)
              return '无依赖';
          if (d.claimable && on === 0)
              return `能领${bl > 0 ? ` · 我挡着 ${bl} 件` : ''}`;
          if (!d.claimable) {
              const n = d.unmet > 0 ? d.unmet : on;
              return `还不能领 · 等 ${n} 件前置交付`;
          }
          return `能领${bl > 0 ? ` · 我挡着 ${bl} 件` : ''}`;
      }
      function pickDepCandidates(selfId, all, deps) {
          const have = new Set(deps.dependsOn.map((d) => d.id));
          const blocksMe = new Set(deps.blocks.map((d) => d.id));
          return all
              .filter((t) => t.task_id !== selfId)
              .filter((t) => !have.has(t.task_id))
              .filter((t) => !blocksMe.has(t.task_id))
              .map((t) => ({ id: t.task_id, title: t.title || t.task_id }));
      }
      function versionLine(dl) {
          const n = dl.count;
          if (n === 0)
              return '无交付';
          const fv = dl.finalVersion;
          const max = dl.versions.length > 0 ? Math.max(...dl.versions) : 0;
          const tail = fv > 0 && fv < max ? ` · 最终 v${fv}（不是最新那稿）` : fv > 0 ? ` · 最终 v${fv}` : '';
          return `交付 ${n} 稿${tail}`;
      }
      function versionHint(dl) {
          const max = dl.versions.length > 0 ? Math.max(...dl.versions) : 0;
          if (dl.finalVersion > 0 && dl.finalVersion < max) {
              return `v${max} 交上去后发现有问题，已回退到 v${dl.finalVersion} —— 对外算数的是 v${dl.finalVersion}。`;
          }
          if (dl.count === 1)
              return '只有一稿。';
          return `v${max} 是最新，也是最终稿。`;
      }
      //# sourceMappingURL=deps-text.js.map
      return module.exports;
    })();

    /* ── client/task-deps-ui.js ── */
    var m_task_deps_ui = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TaskDepsSection = TaskDepsSection;
      exports.DeliverableVersionsSection = DeliverableVersionsSection;
      const jsx_runtime_1 = require("react/jsx-runtime");
      const react_1 = require("react");
      const live_js_1 = m_live;
      const theme_js_1 = m_theme;
      const deps_text_js_1 = m_deps_text;
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
      return module.exports;
    })();

    /* ── client/version.js ── */
    var m_version = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PLUGIN_VERSION = void 0;
      exports.PLUGIN_VERSION = "0.3.0";
      //# sourceMappingURL=version.js.map
      return module.exports;
    })();

    /* ── client/seat-summary.js ── */
    var m_seat_summary = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SEAT_ORDER = exports.SEAT_LABELS = void 0;
      exports.isAdvisorSeat = isAdvisorSeat;
      exports.countSeatTypes = countSeatTypes;
      exports.resolveSeatKey = resolveSeatKey;
      exports.seatSummary = seatSummary;
      exports.seatBadge = seatBadge;
      exports.SEAT_LABELS = {
          execution: '执行位',
          audit: '审计位',
          management: '管理位',
          strategy: '战略位',
          signature: '山海顾问位',
          management_assistant: '管理助理位',
      };
      const ADVISOR_SEAT_NAMES = [
          '山海顾问位',
          '签名位',
      ];
      function isAdvisorSeat(seatKey, name) {
          const key = (seatKey ?? '').trim();
          if (key !== '')
              return key === 'signature';
          const n = (name ?? '').trim();
          if (n === '')
              return false;
          if (ADVISOR_SEAT_NAMES.some((x) => n === x || n.includes(x)))
              return true;
          return n.includes('签名');
      }
      exports.SEAT_ORDER = [
          'signature',
          'strategy',
          'management',
          'audit',
          'execution',
      ];
      function countSeatTypes(seats) {
          const map = new Map();
          for (const s of seats) {
              const key = resolveSeatKey(s);
              const cur = map.get(key) ?? {
                  key,
                  label: exports.SEAT_LABELS[key] ?? (typeof s.label === 'string' && s.label.trim().length > 0 ? s.label.trim() : key),
                  total: 0,
                  occupied: 0,
                  occupantsTotal: 0,
                  vacant: 0,
                  holders: [],
              };
              cur.total += 1;
              const names = holderNames(s);
              if (names.length > 0) {
                  cur.occupied += 1;
                  cur.occupantsTotal += names.length;
                  for (const n of names)
                      if (!cur.holders.includes(n))
                          cur.holders.push(n);
              }
              else {
                  cur.vacant += 1;
              }
              map.set(key, cur);
          }
          const out = Array.from(map.values());
          out.sort((a, b) => {
              const ia = exports.SEAT_ORDER.indexOf(a.key);
              const ib = exports.SEAT_ORDER.indexOf(b.key);
              return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
          });
          return out;
      }
      function holderNames(s) {
          const names = [];
          if (Array.isArray(s.occupants)) {
              for (const o of s.occupants) {
                  const n = typeof o?.name === 'string' ? o.name.trim() : '';
                  if (n.length > 0 && !names.includes(n))
                      names.push(n);
              }
          }
          return names;
      }
      function resolveSeatKey(s) {
          const raw = typeof s.seat === 'string' ? s.seat.trim().toLowerCase() : '';
          if (raw.length > 0 && exports.SEAT_LABELS[raw] !== undefined)
              return raw;
          if (raw.length > 0)
              return raw;
          const label = typeof s.label === 'string' ? s.label : '';
          for (const k of Object.keys(exports.SEAT_LABELS)) {
              const name = exports.SEAT_LABELS[k];
              if (name !== undefined && label.includes(name))
                  return k;
          }
          if (label.includes('签名'))
              return 'signature';
          return 'unknown';
      }
      function seatSummary(counts) {
          const total = counts.reduce((n, c) => n + c.total, 0);
          const people = counts.reduce((n, c) => (c.key === 'signature' ? n : n + c.occupantsTotal), 0);
          const vac = counts.reduce((n, c) => (c.key === 'signature' ? n : n + c.vacant), 0);
          if (total === 0)
              return '还没有建工位';
          return `${total} 个位 · ${people} 人已坐 · ${vac} 个空`;
      }
      function seatBadge(c) {
          if (c.key === 'signature')
              return `${c.label} （已占）`;
          if (c.occupantsTotal === 0)
              return `${c.label} 空`;
          return `${c.label} ${c.occupantsTotal} 人`;
      }
      //# sourceMappingURL=seat-summary.js.map
      return module.exports;
    })();

    /* ── client/join-copy.js ── */
    var m_join_copy = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.JOIN_GUIDE_SECTION = exports.REQ_ID_KEEP_LINE = exports.CODE_LOST_TIP = exports.CODE_STORED_TIP = exports.CODE_ONCE_TIP = exports.JOIN_CODE_KEY_PREFIX = exports.JOIN_REQ_KEY_PREFIX = void 0;
      exports.humanizeJoinError = humanizeJoinError;
      exports.invitePitch = invitePitch;
      exports.containsInternalCode = containsInternalCode;
      exports.isPasserbyRow = isPasserbyRow;
      exports.splitJoinRows = splitJoinRows;
      exports.joinRowLabel = joinRowLabel;
      exports.applicantView = applicantView;
      exports.looksLikeRequestId = looksLikeRequestId;
      exports.reqStoreKey = reqStoreKey;
      exports.codeStoreKey = codeStoreKey;
      exports.applicantCodeState = applicantCodeState;
      exports.joinGuideText = joinGuideText;
      const JOIN_ERROR_TEXT = {
          no_credential: '查不到你的身份，请用原来那张码或原来的机器再试一次',
          account_not_found: '找不到这个铺子，确认一下铺号有没有打错',
          duplicate_pending: '你已经申请过一次了，还在等铺主处理，不用重复提交',
          not_owner: '这条申请只有铺主能处理',
          not_applicant: '这条申请不是你提的，看不到结果',
          already_decided: '这条申请已经处理过了，刷新一下看结果',
          expired: '这条申请放太久，已经自动作废了，重新申请一次就行',
          not_found: '铺子那边的服务还没更新，过一会儿再试',
          denied: '这次提交没被受理，确认一下码和机器对不对',
      };
      function humanizeJoinError(code, serverMessage) {
          const k = (code ?? '').trim();
          const hit = JOIN_ERROR_TEXT[k];
          if (hit !== undefined)
              return hit;
          const msg = (serverMessage ?? '').trim();
          if (msg.length > 0 && !containsInternalCode(msg))
              return msg;
          return '这次没提交成功，过一会儿再试一次';
      }
      function invitePitch(url) {
          return [
              '我邀请你进我的工位（山海·开铺 kaipu）。',
              '',
              '你可以直接把下面这段发给你的 Agent，或者自己打开也行：',
              url,
              '',
              '· 链接一次性、有效期内可用，别人打不开也用不了。',
              '· 打开后按页面提示装好「工位」插件，用你的账号登录即可。',
              '· 进去后你会看到分给你的位子，有活会在「任务」页出现。',
          ].join('\n');
      }
      const INTERNAL_CODE_RE = /\b(no_credential|not_owner|not_applicant|already_decided|duplicate_pending|account_not_found|missing_[a-z_]+|bad_[a-z_]+)\b/;
      const INTERNAL_PATH_RE = /\/(join|packs|grants|devices|auth)\/[A-Za-z0-9_{}/-]*/;
      const INTERNAL_ORG_RE = new RegExp('(\\u5c71\\u6d77\\u57ce\\u90a6|\\u57ce\\u90a6)');
      function containsInternalCode(text) {
          return INTERNAL_CODE_RE.test(text) || INTERNAL_PATH_RE.test(text) || INTERNAL_ORG_RE.test(text);
      }
      function isPasserbyRow(row) {
          const reason = (row.reason ?? '').trim();
          return reason.includes('自动登记');
      }
      function splitJoinRows(rows) {
          const requests = [];
          const passers = [];
          for (const r of rows) {
              if (isPasserbyRow(r))
                  passers.push(r);
              else
                  requests.push(r);
          }
          return { requests, passers };
      }
      function joinRowLabel(row) {
          const parts = [];
          const node = (row.nodeId ?? '').trim();
          const seat = (row.seat ?? '').trim();
          if (node.length > 0)
              parts.push(node.startsWith('工位') ? node : `工位 ${node}`);
          else if (seat.length > 0)
              parts.push(seat);
          const name = (row.applicantName ?? '').trim();
          const tag = (row.deviceTag ?? '').trim();
          if (name.length > 0) {
              parts.push(tag.length > 0 ? `${name}（设备 ${tag}）` : name);
          }
          else {
              parts.push(row.applicantKind === 'agent' ? '(Agent)' : '(未署名)');
          }
          const reason = (row.reason ?? '').trim();
          if (reason.length > 0)
              parts.push(reason);
          else
              parts.push(row.applicantKind === 'agent' ? 'Agent 申请补发' : '申请补发加入码');
          return parts.join(' · ');
      }
      function applicantView(status) {
          const s = (status ?? '').trim();
          if (s === 'pending') {
              return { text: '已申请，等铺主通过', tone: 'wait', dot: false, canRetry: false };
          }
          if (s === 'approved') {
              return { text: '铺主通过了，新码在下面 —— 复制给 Agent 就能继续干活', tone: 'ok', dot: true, canRetry: false };
          }
          if (s === 'rejected') {
              return { text: '铺主拒绝了这次申请', tone: 'bad', dot: false, canRetry: true };
          }
          if (s === 'expired') {
              return { text: '这条申请放太久作废了，重新申请一次', tone: 'bad', dot: true, canRetry: true };
          }
          return { text: '', tone: 'plain', dot: false, canRetry: false };
      }
      exports.JOIN_REQ_KEY_PREFIX = 'kaipu.join.requestId';
      exports.JOIN_CODE_KEY_PREFIX = 'kaipu.join.code';
      function looksLikeRequestId(v) {
          return typeof v === 'string' && /^jr_[A-Za-z0-9_-]{4,}$/.test(v.trim());
      }
      function reqStoreKey(accountId, appId) {
          const a = (accountId ?? '').trim();
          const b = (appId ?? '').trim();
          if (a.length === 0 || b.length === 0)
              return exports.JOIN_REQ_KEY_PREFIX;
          return `${exports.JOIN_REQ_KEY_PREFIX}.${a}.${b}`;
      }
      function codeStoreKey(requestId) {
          return `${exports.JOIN_CODE_KEY_PREFIX}.${(requestId ?? '').trim()}`;
      }
      function applicantCodeState(status, serverCode, localCode) {
          const sv = (serverCode ?? '').trim();
          if (sv.length > 0)
              return 'fresh';
          const s = (status ?? '').trim();
          if (s !== 'approved')
              return 'none';
          const lc = (localCode ?? '').trim();
          if (lc.length > 0)
              return 'stored';
          return 'lost';
      }
      exports.CODE_ONCE_TIP = '这张码只显示一次，请现在复制（关掉就找不回来了）';
      exports.CODE_STORED_TIP = '这张码已经存在本机，服务端只回一次明文，再查不会重复给';
      exports.CODE_LOST_TIP = '这张码已经取过了，本机没存下来。请找铺主再补一张';
      exports.REQ_ID_KEEP_LINE = '★ 提交成功后请把 requestId 抄下来，查状态和取码都要用它。';
      exports.JOIN_GUIDE_SECTION = [
          '',
          '五、钥匙（密钥）会到期，到期了你自己能换 —— 不用等人搬',
          '',
          '每次领任务（poll）的返回里会多一个 keyStatus 字段，看它的 state：',
          '',
          '  ok / no_prev      → 没事，继续干活',
          '  renew_available   → 旧钥匙还在宽限期，新钥匙已经在服务端保险箱，去取',
          '  expired           → 旧钥匙过期且没有新钥匙 ⇒ 别死循环，报错给人，等人点重置',
          '',
          'state 是 renew_available 时，用【当前这把钥匙】签名，调这个接口取新钥匙：',
          '',
          '  TS=$(date +%s)',
          '  SIG=$(printf \'%s\' "{你的agentId}${TS}" | openssl dgst -sha256 -hmac "{当前secret}" -r | cut -d\' \' -f1)',
          '  curl -sS -X POST "https://agent.ak2029.com/kai-pu/agent/key/claim" \\',
          '    -H "Content-Type: application/json" \\',
          '    -d "{\\"agentId\\":\\"{你的agentId}\\",\\"accountId\\":\\"{铺ID}\\",\\"ts\\":${TS},\\"sig\\":\\"${SIG}\\"}"',
          '',
          '★ body 只能有这四个字段（agentId / accountId / ts / sig），多一个都不行。',
          '★ 签名串是 agentId+ts 直接拼，中间没有任何分隔符 —— 和上传包（竖线分隔）不一样。',
          '★ sig 放 JSON body，不要放 HTTP 头（X-Agent-Id 那套是上传包的格式，用在这必然 401）。',
          '',
          '返回 200 时，里面的 agentSecret 就是新钥匙：',
          '  1) 用 printf 写入（不要用 echo，会多一个换行变成 44 字节）',
          '  2) 写完回读校验：长度 43，sha256 前 16 位应与返回值一致',
          '  3) **立刻把内存里的密钥换掉**（守护进程发 SIGHUP 重载，脚本就直接改指向）',
          '     文件改了但内存没换 = 下一轮还是 401，而且人会以为已经换好了',
          '',
          '返回 409 no_pending_key 不是错误 —— 说明铺主还没点「重置连接」，',
          '保险箱里暂时没新钥匙。等下一轮再看，**不要重试同一个请求**。',
          '',
          '密钥从哪来：铺主在工位点「🔑 重置连接」，新钥匙自动放进服务端保险箱，',
          '你上面这一步就是把它取走。取走那一刻旧钥匙立即作废（宽限期是给这一步留的窗口）。',
          '',
          '六、如果你发现邀请码失效了（报错 401 / 403 / 码已用过）',
          '',
          '先分两件事：钥匙坏了，还是码坏了。',
          '  · poll 返回 401 且拿不到 keyStatus ⇒ 钥匙不对（先核 sha256 长度 43 对不对）',
          '  · 码已用过 / 码过期 ⇒ 码坏了，走下面的补发流程',
          '',
          '补发不要死循环重试，也不要干等。立刻申请：',
          '',
          '  curl -sS -X POST "https://agent.ak2029.com/kai-pu/join/request" \\',
          '    -H "Content-Type: application/json" \\',
          '    -d \'{"accountId":"{你的铺ID}","joinCode":"{旧码}","applicantKind":"agent","applicantId":"{你的agentId}","reason":"邀请码过期，无法提交交付物"}\'',
          '',
          exports.REQ_ID_KEEP_LINE,
          '',
          '拿到 201 后，请告诉你的主人这句话：',
          '  「邀请码已过期，我已经申请补发，等铺主通过后我会拿到新码。」',
          '',
          '然后每 5 分钟查一次：',
          '  curl -sS "https://agent.ak2029.com/kai-pu/join/request/{requestId}"',
          '',
          '当 status 变成 approved，返回里的 joinCode 就是新码，用它继续干活。',
      ];
      function joinGuideText(baseLines) {
          return [...baseLines, ...exports.JOIN_GUIDE_SECTION].join('\n');
      }
      //# sourceMappingURL=join-copy.js.map
      return module.exports;
    })();

    /* ── client/invite-code.js ── */
    var m_invite_code = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CODE_STORE_PREFIX = exports.PENDING_LIMIT = void 0;
      exports.plainStoreKey = plainStoreKey;
      exports.sha256Hex = sha256Hex;
      exports.codeHashOf = codeHashOf;
      exports.stateLabel = stateLabel;
      exports.isActionable = isActionable;
      exports.remainingText = remainingText;
      exports.codeTextOf = codeTextOf;
      exports.usedByText = usedByText;
      exports.pendingCount = pendingCount;
      exports.canCreateMore = canCreateMore;
      exports.createBlockedTip = createBlockedTip;
      exports.batchChoices = batchChoices;
      exports.staleHashes = staleHashes;
      exports.humanizeCodeError = humanizeCodeError;
      exports.codeRowView = codeRowView;
      exports.emptyListText = emptyListText;
      exports.PENDING_LIMIT = 3;
      exports.CODE_STORE_PREFIX = 'kaipu.joinCode.plain.';
      function plainStoreKey(hash) {
          return exports.CODE_STORE_PREFIX + hash;
      }
      const K = [
          0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
          0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
          0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
          0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
          0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
          0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
          0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
          0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
      ];
      function rotr(x, n) {
          return ((x >>> n) | (x << (32 - n))) >>> 0;
      }
      function sha256Hex(input) {
          const bytes = [];
          for (let i = 0; i < input.length; i += 1) {
              const c = input.charCodeAt(i);
              if (c < 0x80)
                  bytes.push(c);
              else if (c < 0x800)
                  bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
              else if (c >= 0xd800 && c <= 0xdbff) {
                  const next = input.charCodeAt(i + 1);
                  const cp = 0x10000 + ((c - 0xd800) << 10) + (next - 0xdc00);
                  i += 1;
                  bytes.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
              }
              else
                  bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
          }
          const bitLen = bytes.length * 8;
          bytes.push(0x80);
          while (bytes.length % 64 !== 56)
              bytes.push(0);
          const hi = Math.floor(bitLen / 0x100000000);
          const lo = bitLen >>> 0;
          bytes.push((hi >>> 24) & 0xff, (hi >>> 16) & 0xff, (hi >>> 8) & 0xff, hi & 0xff);
          bytes.push((lo >>> 24) & 0xff, (lo >>> 16) & 0xff, (lo >>> 8) & 0xff, lo & 0xff);
          let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
          let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
          const w = new Array(64);
          for (let off = 0; off < bytes.length; off += 64) {
              for (let i = 0; i < 16; i += 1) {
                  const j = off + i * 4;
                  w[i] = ((bytes[j] ?? 0) << 24) | ((bytes[j + 1] ?? 0) << 16) | ((bytes[j + 2] ?? 0) << 8) | (bytes[j + 3] ?? 0);
              }
              for (let i = 16; i < 64; i += 1) {
                  const w15 = w[i - 15];
                  const w2 = w[i - 2];
                  const s0 = (rotr(w15, 7) ^ rotr(w15, 18) ^ (w15 >>> 3)) >>> 0;
                  const s1 = (rotr(w2, 17) ^ rotr(w2, 19) ^ (w2 >>> 10)) >>> 0;
                  w[i] = ((w[i - 16] + s0 + w[i - 7] + s1) >>> 0);
              }
              let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, hh = h7;
              for (let i = 0; i < 64; i += 1) {
                  const S1 = (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) >>> 0;
                  const ch = ((e & f) ^ (~e & g)) >>> 0;
                  const t1 = (hh + S1 + ch + K[i] + w[i]) >>> 0;
                  const S0 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) >>> 0;
                  const maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0;
                  const t2 = (S0 + maj) >>> 0;
                  hh = g;
                  g = f;
                  f = e;
                  e = (d + t1) >>> 0;
                  d = c;
                  c = b;
                  b = a;
                  a = (t1 + t2) >>> 0;
              }
              h0 = (h0 + a) >>> 0;
              h1 = (h1 + b) >>> 0;
              h2 = (h2 + c) >>> 0;
              h3 = (h3 + d) >>> 0;
              h4 = (h4 + e) >>> 0;
              h5 = (h5 + f) >>> 0;
              h6 = (h6 + g) >>> 0;
              h7 = (h7 + hh) >>> 0;
          }
          return [h0, h1, h2, h3, h4, h5, h6, h7].map((x) => x.toString(16).padStart(8, '0')).join('');
      }
      function codeHashOf(plain) {
          return sha256Hex(plain.trim()).slice(0, 12);
      }
      function stateLabel(state) {
          switch (state) {
              case 'pending': return '待用';
              case 'used': return '已用';
              case 'expired': return '已过期';
              case 'revoked': return '已作废';
              default: return state.length > 0 ? `状态未知（${state}）` : '状态未知';
          }
      }
      function isActionable(state) {
          return state === 'pending';
      }
      function remainingText(expiresAt, nowMs) {
          const t = Date.parse(expiresAt);
          if (!Number.isFinite(t))
              return '有效期读不出来';
          const ms = t - nowMs;
          if (ms <= 0)
              return '已过期';
          const min = Math.floor(ms / 60000);
          if (min < 60)
              return `还剩 ${Math.max(1, min)} 分钟`;
          const hour = Math.floor(min / 60);
          if (hour < 24)
              return `还剩 ${hour} 小时 ${min % 60} 分`;
          const day = Math.floor(hour / 24);
          return `还剩 ${day} 天 ${hour % 24} 小时`;
      }
      function codeTextOf(hash, plain) {
          const p = (plain ?? '').trim();
          if (p.length > 0)
              return p;
          return hash.length > 0 ? '已生成 · 明文未保存在本机' : '（缺 codeHash）';
      }
      function usedByText(row) {
          if (row.state !== 'used')
              return '';
          const who = (row.usedBy ?? '').trim();
          return who.length > 0 ? `被 ${who} 用掉` : '已用（服务端没记是谁）';
      }
      function pendingCount(rows) {
          let n = 0;
          for (const r of rows)
              if (r.state === 'pending')
                  n += 1;
          return n;
      }
      function canCreateMore(pending) {
          return pending < exports.PENDING_LIMIT;
      }
      function createBlockedTip(pending) {
          return canCreateMore(pending) ? '' : `先作废不用的，或等它们过期（现在手上 ${pending} 张没用过）`;
      }
      function batchChoices(pending) {
          const room = Math.max(1, exports.PENDING_LIMIT - pending);
          const top = Math.min(exports.PENDING_LIMIT, room);
          const out = [];
          for (let i = 1; i <= top; i += 1)
              out.push(i);
          return out;
      }
      function staleHashes(rows, hasPlain, nowMs) {
          const out = [];
          for (const r of rows) {
              const h = (r.codeHash ?? '').trim();
              if (h.length === 0 || !hasPlain(h))
                  continue;
              const expiredByTime = r.state === 'pending' && Date.parse(r.expiresAt) <= nowMs;
              if (r.state === 'used' || r.state === 'revoked' || r.state === 'expired' || expiredByTime) {
                  out.push(h);
              }
          }
          return out;
      }
      function humanizeCodeError(code, message, pending) {
          switch (code) {
              case 'too_many_pending_codes':
                  return typeof pending === 'number' && pending > 0
                      ? `手上还有 ${pending} 张没用过的码，先作废不用的`
                      : '手上没用过的码已经满了，先作废不用的';
              case 'code_not_revocable':
                  return '这张码已经用过或过期了，作废不了';
              case 'code_not_renewable':
                  return '这张码已经用过或作废了，续不了期';
              case 'code_not_found':
                  return '找不到这张码（可能刚被清理），刷新一下再看';
              case 'owner_only':
              case 'not_owner':
                  return '只有铺主能管理邀请码';
              case 'unauthorized':
              case 'login_required':
                  return '这台机器还没进本铺，先用加入码进来';
              default: {
                  const m = (message ?? '').trim();
                  return m.length > 0 ? m : '操作没成功，稍后再试一次';
              }
          }
      }
      function codeRowView(row, plain, nowMs) {
          const p = (plain ?? '').trim();
          return {
              codeText: codeTextOf(row.codeHash, p),
              stateText: stateLabel(row.state),
              remainText: isActionable(row.state) ? remainingText(row.expiresAt, nowMs) : '',
              actionable: isActionable(row.state),
              usedByText: usedByText(row),
              plainLocal: p.length > 0,
          };
      }
      function emptyListText(owner) {
          return owner ? '还没有生成过加入码 —— 点上面「生成」给新同事发一张' : '';
      }
      //# sourceMappingURL=invite-code.js.map
      return module.exports;
    })();

    /* ── client/node-pick.js ── */
    var m_node_pick = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PUBLIC_POOL_LABEL = exports.PUBLIC_POOL_VALUE = void 0;
      exports.seqLabel = seqLabel;
      exports.nodeChipLabel = nodeChipLabel;
      exports.nodeChipWho = nodeChipWho;
      exports.sortedNodes = sortedNodes;
      exports.seatNodesOf = seatNodesOf;
      exports.publishToast = publishToast;
      exports.pickerHint = pickerHint;
      exports.joinStateOf = joinStateOf;
      exports.dotOf = dotOf;
      exports.invitedLabel = invitedLabel;
      exports.showInvited = showInvited;
      exports.taskBindingText = taskBindingText;
      exports.humanizePublishError = humanizePublishError;
      exports.PUBLIC_POOL_VALUE = '';
      exports.PUBLIC_POOL_LABEL = '不指定工位（谁都能领）';
      function seqLabel(node) {
          return typeof node.seq === 'number' && Number.isFinite(node.seq) ? `#${node.seq}` : '';
      }
      function nodeChipLabel(node) {
          const seq = seqLabel(node);
          const name = (node.name ?? '').trim();
          return seq.length > 0 ? `${seq} ${name}` : name;
      }
      function nodeChipWho(node) {
          const holders = Array.isArray(node.holders) ? node.holders : [];
          const names = holders
              .map((h) => (h.name ?? '').trim())
              .filter((n) => n.length > 0);
          if (names.length > 0)
              return names.join('·');
          const invited = node.invited;
          if (invited !== null && invited !== undefined)
              return invitedLabel(invited);
          return '空';
      }
      function sortedNodes(nodes) {
          const withSeq = nodes.filter((n) => typeof n.seq === 'number' && Number.isFinite(n.seq));
          const rest = nodes.filter((n) => !(typeof n.seq === 'number' && Number.isFinite(n.seq)));
          withSeq.sort((a, b) => a.seq - b.seq);
          rest.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? '', 'zh-Hans-CN'));
          return [...withSeq, ...rest];
      }
      function seatNodesOf(nodes, childrenOf) {
          return nodes.filter((n) => childrenOf(n.node_id).length === 0);
      }
      function publishToast(nodeLabel, agentName) {
          const who = (agentName ?? '').trim();
          if (nodeLabel.length === 0) {
              return who.length > 0
                  ? `✅ 已发布到公共池 · 指派给 ${who}`
                  : '✅ 已发布到公共池 · 谁都能领';
          }
          return who.length > 0
              ? `✅ 已发布到「${nodeLabel}」· 指派给 ${who}`
              : `✅ 已发布到「${nodeLabel}」`;
      }
      function pickerHint(node) {
          const holders = Array.isArray(node.holders) ? node.holders : [];
          if (holders.length > 0) {
              const online = holders.filter((h) => h.online === true).length;
              return online > 0 ? `${nodeChipWho(node)}（在线）` : `${nodeChipWho(node)}（离线，能领活）`;
          }
          if (node.invited !== null && node.invited !== undefined)
              return invitedLabel(node.invited);
          return '空位（没人，发了暂时没人领）';
      }
      function joinStateOf(holder) {
          const s = (holder.joinState ?? '').trim();
          if (s === 'present' || s === 'joined' || s === 'invited')
              return s;
          return holder.online === true ? 'present' : 'joined';
      }
      function dotOf(state) {
          if (state === 'present')
              return { color: '#27ae60', hollow: false, title: '在岗（90 秒内有心跳）' };
          if (state === 'joined')
              return { color: '#bbb', hollow: false, title: '离线（人在，没收到心跳）' };
          return { color: '#bbb', hollow: true, title: '已受邀，还没来' };
      }
      function invitedLabel(invited) {
          const n = (invited.invitedName ?? '').trim();
          return n.length > 0 ? `已受邀：${n}` : '已受邀 · 等待接入';
      }
      function showInvited(holders, invited) {
          if (holders.length > 0)
              return false;
          return invited !== null && invited !== undefined;
      }
      function taskBindingText(nodeLabel, agentName) {
          const label = (nodeLabel ?? '').trim();
          const who = (agentName ?? '').trim();
          if (label.length === 0 && who.length === 0)
              return '公共池 · 谁都能领';
          if (label.length === 0)
              return `公共池 · 指派给 ${who}`;
          return who.length > 0 ? `${label} · 指派给 ${who}` : label;
      }
      function humanizePublishError(code, message) {
          switch (code) {
              case 'node_not_found':
                  return '选的那个工位已经不在了（可能被改名或删掉），换个工位或选「谁都能领」';
              case 'agent_not_found':
                  return '选的那个 Agent 已经不在这个铺子里了，换个目标或选「谁在岗谁领」';
              case 'project_not_found':
                  return '选的项目已经不在了，换一个项目再发';
              default: {
                  const m = (message ?? '').trim();
                  return m.length > 0 ? m : '发布没成功，稍后再试一次';
              }
          }
      }
      //# sourceMappingURL=node-pick.js.map
      return module.exports;
    })();

    /* ── client/grant-copy.js ── */
    var m_grant_copy = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.granteeLabel = granteeLabel;
      exports.granteeUnknown = granteeUnknown;
      exports.grantCopyText = grantCopyText;
      exports.codeDaysLeft = codeDaysLeft;
      exports.codeLeftText = codeLeftText;
      function granteeLabel(name, id) {
          const n = String(name ?? '').trim();
          if (n.length > 0)
              return n;
          const i = String(id ?? '').trim();
          return i.length > 0 ? '对方未填名字' : '未兑换';
      }
      function granteeUnknown(name) {
          return String(name ?? '').trim().length === 0;
      }
      function grantCopyText(code, ttlHours, codeExpiresAt) {
          const day = String(codeExpiresAt ?? '').slice(0, 10);
          const when = day.length === 10 ? `这个码到 ${day} 前都能兑换` : '这个码 7 天内有效';
          return [
              `我在山海城铺子里给你开了临时管理权限（兑换后 ${ttlHours} 小时，${when}）。`,
              '把这个码发给你自己的 Agent 就行：',
              '',
              code,
          ].join('\n');
      }
      function codeDaysLeft(codeExpiresAt, nowMs) {
          const t = Date.parse(String(codeExpiresAt ?? ''));
          if (Number.isNaN(t))
              return null;
          const now = typeof nowMs === 'number' ? nowMs : Date.now();
          const ms = t - now;
          if (ms <= 0)
              return 0;
          return Math.ceil(ms / 86400000);
      }
      function codeLeftText(codeExpiresAt, nowMs) {
          const d = codeDaysLeft(codeExpiresAt, nowMs);
          if (d === null)
              return '码 7 天内有效';
          if (d <= 0)
              return '码已过期';
          return `剩 ${d} 天`;
      }
      //# sourceMappingURL=grant-copy.js.map
      return module.exports;
    })();

    /* ── client/WorkstationPanel.js ── */
    var m_WorkstationPanel = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CONCISE_OWNER = exports.CONCISE_JOINEE = void 0;
      exports.roleOf = roleOf;
      exports.wireConnection = wireConnection;
      exports.WorkstationPanel = WorkstationPanel;
      const jsx_runtime_1 = require("react/jsx-runtime");
      const react_1 = require("react");
      const CrmSection_js_1 = m_CrmSection;
      const crm_js_1 = m_crm;
      const NotesSection_js_1 = m_NotesSection;
      const notes_js_1 = m_notes;
      const skills_js_1 = m_skills;
      const SkillSection_js_1 = m_SkillSection;
      const bridge_js_1 = m_bridge;
      const live_js_1 = m_live;
      const notify_copy_js_1 = m_notify_copy;
      const events_js_1 = m_events;
      const theme_js_1 = m_theme;
      const suggest_theme_js_1 = m_suggest_theme;
      const suggest_confirm_js_1 = m_suggest_confirm;
      const task_deps_ui_js_1 = m_task_deps_ui;
      const project_phase_js_1 = m_project_phase;
      const version_js_1 = m_version;
      const seat_summary_js_1 = m_seat_summary;
      const join_copy_js_1 = m_join_copy;
      const invite_code_js_1 = m_invite_code;
      const node_pick_js_1 = m_node_pick;
      const grant_copy_js_1 = m_grant_copy;
      function roleOf(s) {
          return s.role === 'owner' ? 'owner' : 'invitee';
      }
      let panelConn = null;
      function wireConnection(ctx) {
          const conn = (0, bridge_js_1.getConnection)(ctx);
          panelConn = conn;
          (0, live_js_1.setConnection)(conn);
          (0, crm_js_1.setCrmConnection)(conn);
          (0, notes_js_1.setNotesConnection)(conn);
          (0, skills_js_1.setSkillsConnection)(conn);
      }
      const TRACE_LIMIT = 50;
      const NOW_TICK_MS = 60_000;
      const LAMP_COLOR = {
          red: '#dc2626',
          green: '#16a34a',
          amber: '#d97706',
          blue: '#3B6FE0',
      };
      function WorkstationPanel() {
          const [snap, setSnap] = (0, react_1.useState)(null);
          const [reloadTick, setReloadTick] = (0, react_1.useState)(0);
          const [tab, setTab] = (0, react_1.useState)('work');
          const [renameHint, setRenameHint] = (0, react_1.useState)(false);
          const [openShopPanel, setOpenShopPanel] = (0, react_1.useState)(false);
          const [shopCount, setShopCount] = (0, react_1.useState)(null);
          const [shopDoor, setShopDoor] = (0, react_1.useState)('');
          const [shopMainName, setShopMainName] = (0, react_1.useState)('');
          const [shopList, setShopList] = (0, react_1.useState)([]);
          const [shopCurrentId, setShopCurrentId] = (0, react_1.useState)('');
          const [shopSwitching, setShopSwitching] = (0, react_1.useState)(false);
          const [shopSwitchErr, setShopSwitchErr] = (0, react_1.useState)('');
          const [shopSwitchOk, setShopSwitchOk] = (0, react_1.useState)('');
          const [renameOpen, setRenameOpen] = (0, react_1.useState)(false);
          const [renameDraft, setRenameDraft] = (0, react_1.useState)('');
          const [renameErr, setRenameErr] = (0, react_1.useState)('');
          const [renameBusy, setRenameBusy] = (0, react_1.useState)(false);
          (0, react_1.useEffect)(() => {
              void callPack('tenantShops', {}).then((r) => {
                  if (!r.ok || !Array.isArray(r.data.shops))
                      return;
                  setShopCount(r.data.shops.length);
                  const cur = (r.data.current ?? '').trim();
                  const mine = (cur !== '' ? r.data.shops.find((s) => s.accountId === cur) : undefined) ??
                      r.data.shops.find((s) => s.isPrimary === true) ??
                      r.data.shops[0];
                  setShopDoor((mine?.doorLabel ?? '').trim());
                  setShopMainName((mine?.name ?? '').trim());
                  setShopList(r.data.shops);
                  setShopCurrentId(cur);
              });
          }, [openShopPanel]);
          const doSwitchShop = async (accountId) => {
              if (shopSwitching || accountId === shopCurrentId)
                  return;
              setShopSwitching(true);
              setShopSwitchErr('');
              try {
                  const r = await callPack('shopSwitch', { accountId });
                  if (!r.ok) {
                      setShopSwitchErr(r.message ?? '切换没成功');
                      return;
                  }
                  setShopCurrentId(accountId);
                  setReloadTick((n) => n + 1);
                  const t = await callPack('tenantShops', {});
                  if (t.ok && Array.isArray(t.data.shops)) {
                      setShopList(t.data.shops);
                      const cur = (t.data.current ?? '').trim() || accountId;
                      setShopCurrentId(cur);
                      const now = t.data.shops.find((s) => s.accountId === cur);
                      setShopDoor((now?.doorLabel ?? '').trim());
                      setShopMainName((now?.name ?? '').trim());
                  }
                  setShopSwitchOk('已切换到「' + (shopList.find((s) => s.accountId === accountId)?.name ?? accountId) + '」');
              }
              finally {
                  setShopSwitching(false);
              }
          };
          const hasOwnerGroup = shopList.some((x) => roleOf(x) === 'owner');
          const hasInviteeGroup = shopList.some((x) => roleOf(x) === 'invitee');
          const renderShopRow = (s) => {
              const isCur = s.accountId === shopCurrentId;
              const role = roleOf(s);
              const isInvitee = role === 'invitee';
              const isPlaceholder = s.nameIsPlaceholder === true;
              const singleShop = !isInvitee && shopList.length === 1;
              const rowStyle = {
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 10, width: '100%', textAlign: 'left', marginBottom: 6,
                  fontFamily: 'inherit', fontSize: theme_js_1.FS.small, padding: '9px 11px',
                  borderRadius: 8, boxSizing: 'border-box',
                  border: `1px solid ${isCur ? theme_js_1.C.accent : theme_js_1.C.border}`,
                  background: isCur ? 'color-mix(in srgb, ' + theme_js_1.C.accent + ' 8%, transparent)' : 'transparent',
              };
              const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsxs)("b", { style: { display: 'block', marginBottom: 1 }, children: [s.name || '（未命名铺子）', s.isPrimary ? (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontWeight: 400 }, children: "\uFF08\u4E3B\u94FA\uFF09" }) : null, isInvitee ? ((0, jsx_runtime_1.jsxs)("span", { style: {
                                              marginLeft: 6, padding: '1px 6px', borderRadius: 999,
                                              fontSize: 10, fontWeight: 600,
                                              border: `1px solid ${theme_js_1.C.accent}`,
                                              color: theme_js_1.C.accent, whiteSpace: 'nowrap',
                                          }, children: ["\u534F\u4F5C\u4E2D", s.ownerName ? ' · ' + s.ownerName : ''] })) : null] }), (0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag }, children: [s.doorLabel ? s.doorLabel + '号' : '还没发门牌号', isInvitee && s.seat ? ' · ' + s.seat : ''] })] }), singleShop ? ((0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.accent, fontSize: theme_js_1.FS.tag, whiteSpace: 'nowrap' }, children: "\u2713 \u5F53\u524D" })) : ((0, jsx_runtime_1.jsx)("span", { style: { color: isCur ? theme_js_1.C.accent : theme_js_1.C.dim, fontSize: theme_js_1.FS.tag, whiteSpace: 'nowrap' }, children: isCur ? '✓ 当前' : (shopSwitching ? '切换中…' : (isInvitee ? '切去协作' : '切到这间')) }))] }));
              return ((0, jsx_runtime_1.jsxs)("div", { children: [singleShop ? ((0, jsx_runtime_1.jsx)("div", { style: rowStyle, children: inner })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: shopSwitching || isCur, onClick: () => { void doSwitchShop(s.accountId); }, style: {
                              ...rowStyle,
                              cursor: shopSwitching || isCur ? 'default' : 'pointer',
                              opacity: shopSwitching && !isCur ? 0.55 : 1,
                          }, children: inner })), isCur && isPlaceholder && !isInvitee ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                              setRenameDraft('');
                              setRenameErr('');
                              setRenameOpen(true);
                          }, style: {
                              display: 'block', width: '100%', textAlign: 'left',
                              marginBottom: 6, padding: '8px 11px', borderRadius: 8,
                              border: `1px dashed ${theme_js_1.C.accent}`,
                              background: 'color-mix(in srgb, ' + theme_js_1.C.accent + ' 6%, transparent)',
                              color: theme_js_1.C.accent, cursor: 'pointer',
                              fontFamily: 'inherit', fontSize: theme_js_1.FS.tag,
                          }, children: "\u270F\uFE0F \u7ED9\u5B83\u8D77\u4E2A\u540D\uFF08\u73B0\u5728\u663E\u793A\u7684\u662F\u5360\u4F4D\u540D\uFF0C\u8D77\u540D\u540E\u300C\u6211\u7684\u94FA\u5B50\u300D\u548C\u5DE5\u4F4D\u6807\u9898\u90FD\u4F1A\u53D8\u6210\u8FD9\u4E2A\u540D\u5B57\uFF09" })) : null] }, s.accountId));
          };
          const doRenameShop = async () => {
              const next = renameDraft.trim();
              if (next === '') {
                  setRenameErr('名字不能为空。');
                  return;
              }
              if (next === shopMainName) {
                  setRenameErr('新名字和现在一样。');
                  return;
              }
              setRenameBusy(true);
              setRenameErr('');
              try {
                  const r = await callPack('tenantNameRename', { name: next });
                  if (r.ok) {
                      setShopMainName(r.data.name || next);
                      setRenameOpen(false);
                      setRenameDraft('');
                  }
                  else {
                      setRenameErr(r.code === 'rename_quota_exhausted'
                          ? '今年的改名次数已用完（每年 3 次），明年 1 月 1 日重置。'
                          : r.code === 'rename_cooldown'
                              ? (r.message || '铺名一个月只能改 1 次，请稍后再试。')
                              : (r.message || '改名没成功，请稍后再试。'));
                  }
              }
              finally {
                  setRenameBusy(false);
              }
          };
          const [packFocus, setPackFocus] = (0, react_1.useState)(null);
          (0, react_1.useEffect)(() => {
              const onOpen = (ev) => {
                  const d = ev.detail;
                  const next = (d?.interactionId || '').trim();
                  if (!next)
                      return;
                  setPackFocus({ interactionId: next, title: d?.title });
                  setTab('pack');
              };
              window.addEventListener('kaipu:open-pack', onOpen);
              return () => window.removeEventListener('kaipu:open-pack', onOpen);
          }, []);
          const [liveState, setLiveState] = (0, react_1.useState)(null);
          const [strongHint, setStrongHint] = (0, react_1.useState)(null);
          const liveRef = (0, react_1.useRef)(null);
          const [notif, setNotif] = (0, react_1.useState)({ unread: 0, items: [] });
          const realtimeDown = liveState !== null && liveState.disconnected;
          (0, react_1.useEffect)(() => {
              let alive = true;
              const tick = async () => {
                  if (typeof document !== 'undefined' && document.hidden)
                      return;
                  const r = await (0, live_js_1.loadNotifications)();
                  if (alive && r.ok)
                      setNotif({ unread: r.data.unread, items: r.data.items });
              };
              void tick();
              const t = window.setInterval(() => { void tick(); }, 30000);
              const onVis = () => {
                  if (typeof document !== 'undefined' && !document.hidden)
                      void tick();
              };
              if (typeof document !== 'undefined')
                  document.addEventListener('visibilitychange', onVis);
              return () => {
                  alive = false;
                  window.clearInterval(t);
                  if (typeof document !== 'undefined')
                      document.removeEventListener('visibilitychange', onVis);
              };
          }, [realtimeDown]);
          const [latest, setLatest] = (0, react_1.useState)(null);
          const [updateAvailable, setUpdateAvailable] = (0, react_1.useState)(false);
          const [verChecked, setVerChecked] = (0, react_1.useState)(false);
          (0, react_1.useEffect)(() => {
              if (verChecked || snap === null)
                  return;
              void (async () => {
                  const r = await (0, live_js_1.checkPluginVersion)(version_js_1.PLUGIN_VERSION);
                  if (!r.ok)
                      return;
                  setVerChecked(true);
                  if (r.data.updateAvailable) {
                      setLatest(r.data.latest);
                      setUpdateAvailable(true);
                  }
              })();
          }, [snap, verChecked]);
          const [nowIso, setNowIso] = (0, react_1.useState)(() => new Date().toISOString());
          (0, react_1.useEffect)(() => {
              let alive = true;
              const ac = new AbortController();
              void (async () => {
                  const next = await (0, live_js_1.loadWorkstationState)(ac.signal);
                  if (alive)
                      setSnap(next);
              })();
              return () => {
                  alive = false;
                  ac.abort();
              };
          }, [reloadTick]);
          (0, react_1.useEffect)(() => {
              const h = (0, events_js_1.subscribeEvents)({
                  onStrong: (ev) => {
                      setStrongHint(strongText(ev));
                      setReloadTick((n) => n + 1);
                  },
                  onWeak: () => {
                      setReloadTick((n) => n + 1);
                  },
                  onState: (st) => {
                      setLiveState({
                          disconnected: !st.running,
                          staleSec: Math.round(st.staleMs / 1000),
                          msg: st.error ?? '',
                      });
                  },
                  onLagged: () => {
                      setReloadTick((n) => n + 1);
                  },
              });
              liveRef.current = h;
              if (h === null) {
                  setLiveState({ disconnected: true, staleSec: 0, msg: '实时更新暂不可用，数据按定时刷新。' });
              }
              return () => {
                  liveRef.current?.dispose();
                  liveRef.current = null;
              };
          }, []);
          (0, react_1.useEffect)(() => {
              if (strongHint === null)
                  return undefined;
              const t = window.setTimeout(() => setStrongHint(null), 8000);
              return () => window.clearTimeout(t);
          }, [strongHint]);
          (0, react_1.useEffect)(() => {
              const timer = setInterval(() => setNowIso(new Date().toISOString()), NOW_TICK_MS);
              return () => clearInterval(timer);
          }, []);
          const state = snap?.state ?? null;
          return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-workstation": "1", style: {
                  padding: 16,
                  overflowWrap: 'break-word',
                  color: theme_js_1.C.text,
                  height: '100%',
                  minHeight: 0,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  boxSizing: 'border-box',
              }, children: [strongHint !== null ? ((0, jsx_runtime_1.jsxs)("div", { role: "status", style: {
                          marginBottom: 10,
                          padding: '8px 12px',
                          borderRadius: 6,
                          background: '#FFF4CE',
                          border: '1px solid #E6C34A',
                          color: '#5C4A00',
                          fontSize: theme_js_1.FS.small,
                          fontWeight: 600,
                      }, children: ["\uD83D\uDD14 ", strongHint] })) : null, liveState !== null && liveState.disconnected ? ((0, jsx_runtime_1.jsx)("div", { role: "alert", style: {
                          marginBottom: 10,
                          padding: '6px 12px',
                          borderRadius: 6,
                          background: '#FFF8E1',
                          border: '1px solid #E6C34A',
                          color: '#7A5C00',
                          fontSize: theme_js_1.FS.small,
                      }, children: "\u26A0\uFE0F \u5B9E\u65F6\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF0C\u5F53\u524D\u663E\u793A\u7684\u662F\u521A\u624D\u7684\u72B6\u6001\uFF0C\u6B63\u5728\u5C1D\u8BD5\u91CD\u8FDE\u2026" })) : null, (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, marginBottom: 12, borderBottom: `1px solid ${theme_js_1.C.border}`, paddingBottom: 8 }, children: [tab !== 'tasks' && tab !== 'pack' && tab !== 'work' && tab !== 'crm' && tab !== 'device' && tab !== 'more' ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setTab('more'), style: { padding: '5px 10px', borderRadius: 6, border: `1px solid ${theme_js_1.C.border}`, background: 'transparent', color: theme_js_1.C.dim, cursor: 'pointer', fontSize: theme_js_1.FS.small }, children: "\u2190" })) : null, [['work', '工位'], ['tasks', '任务'], ['pack', '资料'], ['notes', '记事'], ['crm', '客户'], ['device', '设备码'], ['skills', '技能'], ['more', '更多']].map(([k, label]) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setTab(k), style: {
                                  padding: '5px 10px',
                                  borderRadius: 6,
                                  border: 'none',
                                  cursor: 'pointer',
                                  fontSize: theme_js_1.FS.small,
                                  whiteSpace: 'nowrap',
                                  fontWeight: tab === k ? 700 : 400,
                                  color: tab === k ? '#fff' : theme_js_1.C.dim,
                                  background: tab === k ? theme_js_1.C.accent : 'transparent',
                              }, children: [label, k === 'more' && notif.unread > 0 ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                          marginLeft: 5, padding: '0 5px', borderRadius: 9, fontSize: theme_js_1.FS.tag,
                                          background: '#c0392b', color: '#fff', fontWeight: 700,
                                      }, children: notif.unread })) : null] }, k))), (0, jsx_runtime_1.jsxs)("span", { style: { marginLeft: 'auto', fontSize: theme_js_1.FS.tag, color: updateAvailable ? '#c0392b' : theme_js_1.C.dim, whiteSpace: 'nowrap' }, children: ["v", version_js_1.PLUGIN_VERSION, updateAvailable && latest !== null ? ` → v${latest} 有更新，请卸载重装` : ''] })] }), tab === 'more' ? ((0, jsx_runtime_1.jsx)(Section, { title: "\u66F4\u591A", children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: 8, fontSize: theme_js_1.FS.small }, children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setTab('notif'), style: {
                                      ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                      gap: 10, cursor: 'pointer', textAlign: 'left', width: '100%',
                                      fontFamily: 'inherit', fontSize: theme_js_1.FS.small, padding: '11px 13px',
                                  }, children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { style: { display: 'block', marginBottom: 2 }, children: "\u901A\u77E5" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag }, children: notif.unread > 0 ? `${notif.unread} 条新的 —— 谁交了、谁被驳了` : '有人交件、被驳回时在这里' })] }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: 18, lineHeight: 1 }, children: "\u203A" })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setTab('help'), style: {
                                      ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                      gap: 10, cursor: 'pointer', textAlign: 'left', width: '100%',
                                      fontFamily: 'inherit', fontSize: theme_js_1.FS.small, padding: '11px 13px',
                                  }, children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { style: { display: 'block', marginBottom: 2 }, children: "\u63A5\u5165\u8BF4\u660E" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag }, children: "\u7ED9\u8981\u8C03\u63A5\u53E3\u7684\u4EBA\u770B\uFF08CLI / MCP / HTTP\uFF09" })] }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: 18, lineHeight: 1 }, children: "\u203A" })] }), shopList.length >= 1 ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...cardStyle, padding: '11px 13px' }, children: [(0, jsx_runtime_1.jsx)("b", { style: { display: 'block', marginBottom: 6 }, children: "\u6211\u7684\u94FA\u5B50" }), (0, jsx_runtime_1.jsx)("span", { style: { display: 'block', color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag, marginBottom: 8 }, children: shopList.length >= 2
                                              ? '你现在在哪一间，下面的工位、任务、资料就都是那一间的'
                                              : (hasInviteeGroup
                                                  ? '这间是别人的铺子 —— 切过去之后，工位和资料就是那一间的'
                                                  : '这间铺子的招牌和门牌号 —— 名字随时可以改') }), ['owner', 'invitee'].map((grp) => {
                                          const rows = shopList.filter((x) => roleOf(x) === grp);
                                          if (rows.length === 0)
                                              return null;
                                          return ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 4 }, children: [hasOwnerGroup && hasInviteeGroup ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                                          display: 'block', color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag,
                                                          margin: '2px 0 5px', letterSpacing: 0.3,
                                                      }, children: grp === 'owner' ? '我开的铺子' : '别人邀我协作的铺子' })) : null, rows.map((s) => renderShopRow(s))] }, grp));
                                      }), shopSwitchErr ? ((0, jsx_runtime_1.jsx)("div", { style: { color: '#dc2626', fontSize: theme_js_1.FS.tag, marginTop: 4 }, children: shopSwitchErr })) : null, shopSwitchOk ? ((0, jsx_runtime_1.jsx)("div", { style: { color: '#16a34a', fontSize: theme_js_1.FS.tag, marginTop: 4 }, children: shopSwitchOk })) : null] })) : null, (0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: shopCount !== null && shopCount >= 2, onClick: () => {
                                      setOpenShopPanel(true);
                                      setTab('work');
                                  }, title: shopCount !== null && shopCount >= 2 ? '一个账号最多 2 间铺子' : '开一个新铺子', style: {
                                      ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                      gap: 10, textAlign: 'left', width: '100%',
                                      fontFamily: 'inherit', fontSize: theme_js_1.FS.small, padding: '11px 13px',
                                      cursor: shopCount !== null && shopCount >= 2 ? 'not-allowed' : 'pointer',
                                      opacity: shopCount !== null && shopCount >= 2 ? 0.55 : 1,
                                  }, children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { style: { display: 'block', marginBottom: 2 }, children: "\u5F00\u4E00\u4E2A\u65B0\u94FA\u5B50" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag }, children: shopCount !== null && shopCount >= 2
                                                      ? '已达上限（一个账号最多 2 间）—— 需要更多请联系我们'
                                                      : '再开一间 —— 先选好落在哪个区' }), (0, jsx_runtime_1.jsxs)("span", { style: { display: 'block', color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag, opacity: 0.8, marginTop: 2 }, children: ["\u6BCF\u4E2A\u8D26\u53F7\u76EE\u524D\u6700\u591A\u5F00 2 \u95F4\u94FA\u5B50", shopCount !== null && shopCount > 0 ? `（你已有 ${shopCount} 间）` : ''] })] }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: 18, lineHeight: 1 }, children: shopCount !== null && shopCount >= 2 ? '—' : '›' })] }), renameOpen ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...cardStyle, padding: '11px 13px' }, children: [(0, jsx_runtime_1.jsx)("b", { style: { display: 'block', marginBottom: 6, fontSize: theme_js_1.FS.small }, children: "\u4FEE\u6539\u672C\u94FA\u540D\u79F0" }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag, marginBottom: 8 }, children: ["\u73B0\u5728\u53EB\u300C", shopMainName !== '' ? shopMainName : '（未命名铺子）', "\u300D\uFF0C\u6BCF\u5E74\u9650\u6539 3 \u6B21"] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("input", { value: renameDraft, onChange: (e) => { setRenameDraft(e.target.value); setRenameErr(''); }, onKeyDown: (e) => {
                                                      if (e.key === 'Enter' && !renameBusy)
                                                          void doRenameShop();
                                                      if (e.key === 'Escape') {
                                                          setRenameOpen(false);
                                                          setRenameErr('');
                                                      }
                                                  }, placeholder: "\u8F93\u5165\u65B0\u7684\u94FA\u5B50\u540D\u5B57", maxLength: 24, autoFocus: true, style: {
                                                      flex: 1, minWidth: 0, padding: '4px 8px', borderRadius: 4,
                                                      border: `1px solid ${theme_js_1.C.border}`, background: 'transparent',
                                                      color: theme_js_1.C.text, fontSize: theme_js_1.FS.tag, outline: 'none', fontFamily: 'inherit',
                                                  } }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: renameBusy, onClick: () => { void doRenameShop(); }, style: {
                                                      flex: '0 0 auto', fontSize: theme_js_1.FS.tag, padding: '3px 12px', borderRadius: 4,
                                                      border: `1px solid ${theme_js_1.C.border}`, background: 'rgba(0,0,0,.06)',
                                                      color: theme_js_1.C.text, cursor: renameBusy ? 'not-allowed' : 'pointer',
                                                      fontFamily: 'inherit', opacity: renameBusy ? 0.6 : 1,
                                                  }, children: renameBusy ? '保存中' : '保存' }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: renameBusy, onClick: () => { setRenameOpen(false); setRenameErr(''); }, style: {
                                                      flex: '0 0 auto', fontSize: theme_js_1.FS.tag, padding: '3px 10px', borderRadius: 4,
                                                      border: `1px solid ${theme_js_1.C.border}`, background: 'transparent',
                                                      color: theme_js_1.C.dim, cursor: 'pointer', fontFamily: 'inherit',
                                                  }, children: "\u53D6\u6D88" })] }), renameErr !== '' ? ((0, jsx_runtime_1.jsx)("div", { style: { color: '#c0392b', fontSize: theme_js_1.FS.tag, marginTop: 6, lineHeight: 1.5 }, children: renameErr })) : null] })) : ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => {
                                      setRenameDraft(shopMainName);
                                      setRenameErr('');
                                      setRenameOpen(true);
                                  }, style: {
                                      ...cardStyle,
                                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                      gap: 10, cursor: 'pointer', textAlign: 'left', width: '100%',
                                      fontFamily: 'inherit', fontSize: theme_js_1.FS.small, padding: '11px 13px',
                                      border: `1px solid ${theme_js_1.C.accent}`,
                                      borderLeft: `3px solid ${theme_js_1.C.accent}`,
                                      background: 'color-mix(in srgb, #3B6FE0 6%, transparent)',
                                  }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)("b", { style: { display: 'block', marginBottom: 2, color: theme_js_1.C.accent }, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { marginRight: 4 }, children: "\u270F\uFE0F" }), "\u4FEE\u6539\u672C\u94FA\u540D\u79F0"] }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag }, children: "\u94FA\u5B50\u7684\u62DB\u724C \u2014\u2014 \u5BA2\u6237\u548C\u540C\u4E8B\u90FD\u770B\u8FD9\u4E2A\u540D\u5B57" }), (0, jsx_runtime_1.jsx)("span", { style: { display: 'block', color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag, opacity: 0.8, marginTop: 2 }, children: "\u6BCF\u5E74\u9650 3 \u6B21" })] }), (0, jsx_runtime_1.jsx)("span", { style: {
                                              flex: '0 0 auto', fontSize: theme_js_1.FS.tag, padding: '3px 10px', borderRadius: 4,
                                              background: theme_js_1.C.accent, color: '#fff', lineHeight: 1.4,
                                              whiteSpace: 'nowrap',
                                          }, children: "\u53BB\u6539" })] })), (0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => {
                                      setRenameHint(true);
                                      setTab('work');
                                  }, style: {
                                      ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                      gap: 10, cursor: 'pointer', textAlign: 'left', width: '100%',
                                      fontFamily: 'inherit', fontSize: theme_js_1.FS.small, padding: '11px 13px',
                                  }, children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { style: { display: 'block', marginBottom: 2 }, children: "\u4FEE\u6539\u5DE5\u4F4D\u540D\u79F0" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag }, children: "\u90E8\u95E8 / \u5C97\u4F4D / \u5DE5\u4F4D\u7684\u540D\u5B57 \u2014\u2014 \u70B9\u8FD9\u91CC\u53BB\u5DE5\u4F4D\u5E03\u5C40\u6539" }), (0, jsx_runtime_1.jsx)("span", { style: { display: 'block', color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag, opacity: 0.8, marginTop: 2 }, children: "\u4E0D\u9650\u6B21\u6570\uFF0C\u53EA\u8981\u4E0D\u4E0E\u540C\u7EA7\u91CD\u540D" })] }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: 18, lineHeight: 1 }, children: "\u203A" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.dim, lineHeight: 1.7, paddingTop: 4 }, children: ["\u8BBE\u5907\u4E0E\u6743\u9650\uFF1A", (0, jsx_runtime_1.jsx)("b", { children: "\u8D44\u6599" }), " \u9875\uFF08\u6216\u5DE5\u4F4D\u9875\u53F3\u4E0A\u300C\uD83D\uDD11 \u8BBE\u5907\u300D\uFF09\u2014\u2014 \u8BBE\u5907\u53F0\u8D26 / \u7ED9\u65B0\u8BBE\u5907\u5F00\u95E8"] }), (0, jsx_runtime_1.jsxs)("div", { style: { textAlign: 'center', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, opacity: 0.6, paddingTop: 6 }, children: ["\u5DE5\u4F4D\u63D2\u4EF6 v", version_js_1.PLUGIN_VERSION] })] }) })) : tab === 'notif' ? ((0, jsx_runtime_1.jsx)(Section, { title: "\u901A\u77E5", children: notif.items.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, opacity: 0.7 }, children: "\u6CA1\u6709\u5F85\u5904\u7406\u7684\u4E8B\u3002" })) : ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: 10 }, children: [(() => {
                                  const groups = new Map();
                                  for (const it of notif.items) {
                                      const key = it.projectId && it.projectId.length > 0 ? it.projectId : '__none__';
                                      const name = it.projectId && it.projectId.length > 0 ? (it.projectName || it.projectId) : '未关联项目';
                                      const g = groups.get(key);
                                      if (g === undefined)
                                          groups.set(key, { name, items: [it] });
                                      else
                                          g.items.push(it);
                                  }
                                  return [...groups.entries()].map(([key, g]) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, fontWeight: 600 }, children: g.name }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: g.items.length }), g.items.some((x) => x.unread) ? ((0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: '#c0392b' }, children: [g.items.filter((x) => x.unread).length, " \u6761\u65B0\u7684"] })) : null] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: g.items.map((it) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                                                      padding: '7px 9px', borderRadius: 5, fontSize: theme_js_1.FS.small,
                                                      background: it.unread ? 'rgba(192,57,43,.07)' : 'rgba(0,0,0,.03)',
                                                      borderLeft: it.unread ? '3px solid #c0392b' : '3px solid transparent',
                                                  }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: it.unread ? 600 : 400 }, children: it.text }), (0, jsx_runtime_1.jsx)("div", { style: { opacity: 0.6, marginTop: 2 }, children: it.at.replace('T', ' ').replace('Z', '') })] }, `${it.kind}:${it.taskId}`))) })] }, key)));
                              })(), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                      void (async () => {
                                          await (0, live_js_1.markNotificationsRead)();
                                          const r = await (0, live_js_1.loadNotifications)();
                                          if (r.ok)
                                              setNotif({ unread: r.data.unread, items: r.data.items });
                                      })();
                                  }, style: { ...btnStyle(false), alignSelf: 'flex-start', fontSize: theme_js_1.FS.small }, children: "\u5168\u90E8\u6807\u4E3A\u5DF2\u8BFB" })] })) })) : tab === 'help' ? ((0, jsx_runtime_1.jsx)(HelpTab, { accountId: shopCurrentId, shopName: shopMainName })) : tab === 'device' ? ((0, jsx_runtime_1.jsx)(DeviceTab, {})) : tab === 'skills' ? ((0, jsx_runtime_1.jsx)(SkillSection_js_1.SkillSection, { shopName: shopMainName })) : tab === 'notes' ? ((0, jsx_runtime_1.jsx)(NotesSection_js_1.NotesSection, { reloadTick: reloadTick })) : tab === 'crm' ? ((0, jsx_runtime_1.jsx)(CrmSection_js_1.CrmSection, { reloadTick: reloadTick })) : tab === 'tasks' ? ((0, jsx_runtime_1.jsx)(TaskSection, {})) : tab === 'pack' ? ((0, jsx_runtime_1.jsx)(PackSection, { onUpload: () => setTab('upload'), focus: packFocus })) : tab === 'upload' ? ((0, jsx_runtime_1.jsx)(UploadTab, { onDone: () => setTab('pack') })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                  marginBottom: 14,
                                  padding: '12px 14px',
                                  borderLeft: `3px solid ${theme_js_1.C.accent ?? theme_js_1.C.border}`,
                                  background: 'transparent',
                              }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.heading, lineHeight: 1.55, fontWeight: 700, color: theme_js_1.C.text, letterSpacing: '0.2px' }, children: "\u628A\u9700\u6C42\u94C6\u5728\u6D41\u7A0B\u4E0A\uFF0C\u800C\u4E0D\u662F\u94C6\u5728\u67D0\u4E2A Agent \u8EAB\u4E0A\u3002" }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.small, lineHeight: 1.6, color: theme_js_1.C.dim }, children: "\u56E0\u4E3A\u6D41\u7A0B\u53EF\u4EE5\u4EA4\u63A5\uFF0CAgent \u4F1A\u9000\u573A\uFF1B\u800C\u6D41\u7A0B\u7684\u6838\u5FC3\u4E0D\u662F\u6B65\u9AA4\uFF0C\u662F\u5224\u636E\u3002" })] }), (0, jsx_runtime_1.jsx)(OrgSection, { onGoDevices: () => { setTab('pack'); }, onGoHelp: () => { setTab('help'); }, renameHint: renameHint, onRenameHintDone: () => setRenameHint(false), openShopPanel: openShopPanel, onShopPanelConsumed: () => setOpenShopPanel(false), doorLabel: shopDoor, reloadTick: reloadTick, switchableShops: shopList.filter((s) => s.accountId !== shopCurrentId), onSwitchShop: (id) => { void doSwitchShop(id); } })] }))] }));
      }
      function strongText(ev) {
          const p = (ev.payload ?? {});
          const title = typeof p['title'] === 'string' && p['title'].trim() !== '' ? p['title'].trim() : '';
          const who = typeof p['actorName'] === 'string' && p['actorName'].trim() !== '' ? p['actorName'].trim() : '';
          const seg = (s) => (s.length > 28 ? `${s.slice(0, 28)}…` : s);
          switch (ev.type) {
              case 'task.posted':
                  return title === '' ? '有人给你派了新任务' : `有人给你派了新任务：${seg(title)}`;
              case 'task.rejected':
                  return title === '' ? '你的任务被驳回了' : `你的任务被驳回了：${seg(title)}`;
              case 'task.blocked':
                  return title === '' ? '你的任务卡住了，需要你处理' : `任务卡住了：${seg(title)}`;
              case 'task.need_approval':
                  return title === '' ? '有一件事需要你审批' : `等你审批：${seg(title)}`;
              default:
                  return who === '' ? '有新动态需要你看一下' : `${who}那边有新动态需要你看一下`;
          }
      }
      function StatusBand({ snap, state }) {
          const kind = snap === null ? 'loading' : snap.kind;
          const label = snap === null ? '正在读取…' : snap.label;
          const sum = state === null ? null : (0, live_js_1.summarizeSeats)(state);
          const totalSeats = sum === null ? 0 : sum.occupied + sum.vacant + sum.removed;
          const summaryLine = sum === null
              ? ''
              : `· 座位 ${totalSeats} 位：${sum.occupied} 占用（含 ${sum.awayButActive} 离座仍在编）· ${sum.vacant} 空位 · ${sum.removed} 已移除`;
          const tone = kind === 'scaffold' || kind === 'live'
              ? '#16a34a'
              : kind === 'stale'
                  ? '#d97706'
                  : '#dc2626';
          return ((0, jsx_runtime_1.jsxs)("div", { style: {
                  border: `1px solid ${theme_js_1.C.border}`,
                  borderRadius: 8,
                  padding: '8px 10px',
                  marginBottom: 12,
                  background: theme_js_1.C.soft,
              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, display: 'flex', gap: 8, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: tone, fontWeight: 600 }, children: label }), (0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag }, children: ["\u6765\u6E90\uFF1A", kind] })] }), summaryLine !== '' && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 4 }, children: summaryLine })), kind === 'scaffold' && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 2 }, children: "\u671F1 \u6E32\u67D3\u6301\u4E45\u5316\u6001\uFF08\u8BDA\u5B9E\u6807\u975E live\uFF09\uFF1B\u670D\u52A1\u7AEF\u4E94\u9879\u843D\u5730\u540E\u63A5\u771F kaipu-workstation/state" }))] }));
      }
      const KAI_PU_BASE_URL = 'https://agent.ak2029.com/kai-pu';
      exports.CONCISE_JOINEE = `你在「{SHOP_NAME}」有座位。
      
      接入三步：
      1. 验地址：curl -s {BASE_URL}/health
         → 应回 {"status":"ok","service":"shanhai-kai-pu"}
         ⚠️ 少 /kai-pu 也回 200（另一个服务）
      
      2. 拉完整说明（按座位下发该看的段落）：
         POST {BASE_URL}/kb/guide/index
         body: {"accountId":"{ACCOUNT_ID}","agentId":"<编号>","ts":<时间戳>,"sig":"<签名>"}
         签名 = HMAC-SHA256(secret, 编号+时间戳)，小写 hex，容差 ±300 秒
      
      3. 按目录 level=required 的段落开工
      
      ★ 说明服务端会更新，每次 poll 看 guide.version，别把本地拷的当标准。
      ★ secret 只显示一次，别贴到别人能看到的地方 —— 它等于你的身份。`;
      exports.CONCISE_OWNER = `你是「{SHOP_NAME}」的管理方。
      
      接入三步：
      1. 验地址：curl -s {BASE_URL}/health
         → 应回 {"status":"ok","service":"shanhai-kai-pu"}
      
      2. 拉完整说明（你的座位能取到发任务、审批那几段）：
         POST {BASE_URL}/kb/guide/index
         body: {"accountId":"{ACCOUNT_ID}","agentId":"<你的编号>","ts":<秒级时间戳>,"sig":"<签名>"}
         签名 = HMAC-SHA256(secret, 编号+时间戳) 取小写 hex
      
      3. 按目录取你要的段落
      
      ★ 发任务的签名式与领活**不同**（title 和 isDestructive 要进签名），
        以 KB 里「发任务」那段的写法为准，别照抄领活那种。
      ★ secret 只显示一次，别贴到任何别人能看到的地方。`;
      const AGENT_INSTRUCTION = [
          '请帮我安装并使用「山海数据看板」技能，按下面步骤一次做完。',
          '',
          '1) 下载技能包并解压：',
          '   https://agent.ak2029.com/dl084/dashboard-hub.tar.gz',
          '   解压后得到 dashboard-hub 文件夹，整个放进你的技能目录（WorkBuddy / DSH 的用户级 skills 目录）。',
          '',
          '2) 打开 dashboard-hub/hub.json（没有就复制 hub.json.example），保证里面有且只有服务地址：',
          '   {"url": "https://agent.ak2029.com/hub-084"}',
          '   不要手填 token 和 license —— 下一步会自动写进去。',
          '',
          '3) 在 dashboard-hub 目录里运行解锁命令：',
          '   python scripts/hub_dash.py claim',
          '   它会自动读取本机的工位设备凭据，向服务端换取免费授权，并把 token / license 写回 hub.json。',
          '',
          '4) 验证（把 <表格路径> 换成真实文件）：',
          '   python scripts/hub_dash.py profile <表格路径>',
          '   能打印出字段列表就算通了；接着可以 build 出看板、export 成单文件 HTML。',
          '',
          '可能遇到的两件事：',
          '· 报「没找到工位设备凭据」→ 先装并打开一次开铺工位插件（插件市场搜 kaipu-plugin-workstation）并登录，再重跑第 3 步。',
          '· 报「设备校验服务暂时不可用」→ 稍等重试；或让开通方直接发一张 HUB-XXXX-XXXX-XXXX 授权码填进 hub.json 的 license。',
      ].join('\n');
      function DeviceTab() {
          const [cred, setCred] = (0, react_1.useState)(null);
          const [done, setDone] = (0, react_1.useState)('');
          const [manual, setManual] = (0, react_1.useState)(false);
          const [resetBusy, setResetBusy] = (0, react_1.useState)(false);
          const [resetMsg, setResetMsg] = (0, react_1.useState)('');
          const [devs, setDevs] = (0, react_1.useState)(null);
          const loadDevs = async () => {
              const r = await callPack('devicesList', {});
              if (r.ok)
                  setDevs(r.data);
          };
          (0, react_1.useEffect)(() => { void loadDevs(); }, []);
          const revoke = (row, off) => {
              void callPack('deviceRevoke', { fpHash: row.fpHash8, revoked: off })
                  .then((r) => { if (r.ok)
                  void loadDevs(); });
          };
          (0, react_1.useEffect)(() => {
              void callActionData('deviceCred', {}).then((r) => {
                  if (r.ok)
                      setCred(r.data);
              });
          }, []);
          const doReset = () => {
              setResetBusy(true);
              setResetMsg('');
              void callActionData('deviceResetSecret', {}).then((r) => {
                  setResetBusy(false);
                  if (r.ok) {
                      setCred({ deviceId: r.data.deviceId, deviceSecret: r.data.deviceSecret });
                      setResetMsg(r.data.expiresAt ? `已换新码 · 有效至 ${String(r.data.expiresAt).slice(0, 10)}` : '已换新码');
                  }
                  else {
                      setResetMsg(`重置失败：${r.message || r.code || '未知原因'}`);
                  }
              });
          };
          const copy = (text, tag) => {
              const nav = globalThis.navigator;
              void nav?.clipboard?.writeText(text).then(() => {
                  setDone(tag);
                  setTimeout(() => setDone(''), 1600);
              });
          };
          const point = (t, d) => ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 7 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.text, fontWeight: 600 }, children: t }), (0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.dim }, children: [" \u2014\u2014 ", d] })] }));
          return ((0, jsx_runtime_1.jsxs)(Section, { title: "\u8BBE\u5907\u7801", children: [cred === null ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: "\u8FD8\u6CA1\u6709\u767B\u8BB0\u8BBE\u5907\u3002\u5148\u5728\u5DE5\u4F4D\u91CC\u5B8C\u6210\u4E00\u6B21\u767B\u5F55\uFF0C\u8FD9\u91CC\u5C31\u4F1A\u51FA\u73B0\u672C\u673A\u8BBE\u5907\u7801\u3002" })) : ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: ["\u8FD9\u662F\u8FD9\u53F0\u673A\u5668\u7684", (0, jsx_runtime_1.jsx)("b", { style: { color: theme_js_1.C.text }, children: "\u8EAB\u4EFD\u8BC1" }), " \u2014\u2014 \u62A5\u5907\u3001\u6838\u5BF9\u3001\u6392\u67E5\u65F6\u8BF4\u7ED9\u5BF9\u65B9\u542C\u7684\u5C31\u662F\u5B83\uFF0C\u4E0D\u6D89\u5BC6\u3002"] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("code", { style: { fontSize: theme_js_1.FS.small, padding: '3px 9px', border: `1px solid ${theme_js_1.C.border}`, borderRadius: 6 }, children: cred.deviceId }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => copy(cred.deviceId, 'id'), style: { ...btnStyle(false), fontSize: theme_js_1.FS.small }, children: done === 'id' ? '已复制' : '复制设备码' }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: doReset, disabled: resetBusy, title: "\u6362\u4E00\u4E2A\u65B0\u7801\uFF1B\u65E7\u7684\u7ACB\u523B\u4F5C\u5E9F\uFF08\u522B\u4EBA\u624B\u91CC\u7684\u90A3\u4EFD\u5C31\u5931\u6548\u4E86\uFF09", style: { ...btnStyle(false), fontSize: theme_js_1.FS.small }, children: resetBusy ? '重置中…' : '重置' }), resetMsg !== '' ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: resetMsg.startsWith('重置失败') ? '#b3261e' : '#1f7a3d' }, children: resetMsg })) : null] }), (0, jsx_runtime_1.jsxs)("div", { style: { padding: '10px 12px', borderRadius: 8, border: `1px solid ${theme_js_1.C.border}`, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: ["\u60F3\u7ED9\u67D0\u4E2A\u5C71\u6D77 Skill \u5F00\u6743\u9650\uFF1F", (0, jsx_runtime_1.jsx)("b", { style: { color: theme_js_1.C.text }, children: "\u70B9\u4E0B\u9762\u7684\u6309\u94AE\uFF0C\u628A\u6574\u6BB5\u8BDD\u590D\u5236\u7ED9\u4F60\u7684 Agent" }), "\uFF0C \u5B83\u81EA\u5DF1\u4F1A\u628A\u6280\u80FD\u88C5\u597D\u3001\u628A\u6388\u6743\u9886\u597D \u2014\u2014 \u4F60\u4E0D\u7528\u590D\u5236\u7801\uFF0C\u4E5F\u4E0D\u7528\u586B\u4EFB\u4F55\u4E1C\u897F\u3002"] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => copy(AGENT_INSTRUCTION, 'agent'), style: { ...btnStyle(true), alignSelf: 'flex-start', fontSize: theme_js_1.FS.small }, children: done === 'agent' ? '已复制，粘给 Agent 就行' : '复制给 Agent 的指令' }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setManual(!manual), style: { alignSelf: 'flex-start', background: 'transparent', border: 'none', padding: 0, color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag, cursor: 'pointer', textDecoration: 'underline' }, children: manual ? '收起手动方式' : 'Skill 读不到设备？手动方式' }), manual ? ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: "\u53EA\u5728\u81EA\u52A8\u8BC6\u522B\u5931\u8D25\u65F6\u7528\u3002\u590D\u5236\u4E0B\u9762\u8FD9\u4E32\uFF0C\u8D34\u8FDB Skill \u7684\u914D\u7F6E\u6587\u4EF6\u91CC\u3002" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => copy(JSON.stringify({ deviceId: cred.deviceId, deviceSecret: cred.deviceSecret }), 'full'), style: { ...btnStyle(false), alignSelf: 'flex-start', fontSize: theme_js_1.FS.small }, children: done === 'full' ? '已复制解锁串' : '复制解锁串' }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: "\u89E3\u9501\u4E32 = \u8BBE\u5907\u7801 + \u8BBE\u5907\u5BC6\u94A5\uFF0C\u7B49\u4E8E\u8FD9\u53F0\u673A\u5668\u7684\u94A5\u5319 \u2014\u2014 \u4E0D\u8981\u53D1\u7FA4\u3001\u4E0D\u8981\u8D34\u516C\u5F00\u6587\u6863\u3002" })] })) : null] })), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 20, paddingTop: 16, borderTop: `1px solid ${theme_js_1.C.border}`, fontSize: theme_js_1.FS.small, lineHeight: theme_js_1.LH.loose }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 700, color: theme_js_1.C.text, marginBottom: 9 }, children: "\u4E3A\u4EC0\u4E48\u503C\u5F97\u88C5\u4E00\u4E2A\u5DE5\u4F4D" }), point('跨云跨端', '云上、本地、Windows、Mac 的 Agent 坐进同一张桌，不用来回倒消息'), point('谁在做什么', '轮到谁、卡在哪、谁在线，一眼看见，不用群里问'), point('交接有据', '任务派给谁、做到哪一步、交付了什么，都留在工位上'), point('资料归位', '每份文件挂在对应任务下，不再散在聊天记录里'), point('换机不重来', '数据在云端，卸载重装登录即回，不会从头再来'), point('能力连坐', '装一次工位，后续更多山海 Skill 都能一并解锁')] })] }));
      }
      function HelpTab(props) {
          const [role, setRole] = (0, react_1.useState)('joinee');
          const [copied, setCopied] = (0, react_1.useState)(false);
          const fill = (raw) => {
              const acc = (props.accountId ?? '').trim();
              const shop = (props.shopName ?? '').trim();
              const base = KAI_PU_BASE_URL;
              return raw
                  .split('{BASE_URL}').join(base)
                  .split('{ACCOUNT_ID}').join(acc !== '' ? acc : '{accountId（铺子编号）}')
                  .split('{SHOP_NAME}').join(shop !== '' ? shop : '（未命名铺子）');
          };
          const guide = fill(role === 'joinee' ? exports.CONCISE_JOINEE : exports.CONCISE_OWNER);
          const copy = () => {
              const nav = typeof navigator !== 'undefined' ? navigator : undefined;
              if (nav?.clipboard?.writeText) {
                  void nav.clipboard.writeText(guide).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                  }).catch(() => undefined);
              }
          };
          const roleBtn = (k, label) => ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setRole(k); setCopied(false); }, style: {
                  padding: '4px 12px',
                  borderRadius: 6,
                  border: `1px solid ${role === k ? theme_js_1.C.accent : theme_js_1.C.border}`,
                  background: role === k ? theme_js_1.C.accent : 'transparent',
                  color: role === k ? '#fff' : theme_js_1.C.dim,
                  fontSize: theme_js_1.FS.small,
                  cursor: 'pointer',
                  fontWeight: role === k ? 600 : 400,
              }, children: label }));
          return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }, children: [roleBtn('joinee', '给被邀请方 Agent'), roleBtn('owner', '给管理方 Agent'), (0, jsx_runtime_1.jsx)("span", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: copy, style: { ...btnStyle(true), background: copied ? '#1f7a3d' : theme_js_1.C.accent, minWidth: 130, transition: 'background 160ms' }, children: copied ? '✓ 已复制' : role === 'joinee' ? '复制给被邀请方' : '复制给管理方' })] }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginBottom: 8, lineHeight: theme_js_1.LH.normal }, children: role === 'joinee'
                          ? '被邀请方：领活、交结论、传资料。第一段是「协作默契」—— 比接口重要。'
                          : '管理方：发任务、审批、看全局。注意发任务的签名式和领活不一样。' }), role === 'joinee' && ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, marginBottom: 8 }, children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u4E09\u6B65\u4E0A\u624B" }), (0, jsx_runtime_1.jsxs)("ol", { style: { margin: '6px 0 0 18px', padding: 0, lineHeight: 1.8 }, children: [(0, jsx_runtime_1.jsx)("li", { children: "\u94FA\u4E3B\u5728\u8FD9\u91CC\u70B9\u300C\u9080\u8BF7\u300D\uFF0C\u628A\u4E0B\u9762\u90A3\u6BB5\u8BDD\u53D1\u7ED9\u5BF9\u65B9" }), (0, jsx_runtime_1.jsx)("li", { children: "\u5BF9\u65B9\u6253\u5F00\u94FE\u63A5\u3001\u586B\u540D\u5B57 \u2192 \u5F53\u573A\u62FF\u5230 agentId + secret" }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u5BF9\u65B9 Agent \u62FF\u8FD9\u4E09\u6837\u8C03 ", (0, jsx_runtime_1.jsx)("code", { style: { fontFamily: theme_js_1.FONT.mono }, children: "/kb/guide/index" }), "\u81EA\u53D6\u5B8C\u6574\u8BF4\u660E\uFF08\u6309\u5EA7\u4F4D\u7ED9\u8BE5\u770B\u7684\u6BB5\u843D\uFF0C\u4F1A\u968F\u7248\u672C\u66F4\u65B0\uFF09"] })] })] })), (0, jsx_runtime_1.jsxs)("div", { style: {
                          fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginBottom: 4,
                      }, children: ["\u4E0B\u9762\u8FD9\u6BB5\u5C31\u662F\u300C\u590D\u5236\u300D\u6309\u94AE\u4F1A\u653E\u8FDB\u526A\u8D34\u677F\u7684\u5185\u5BB9\uFF08\u7EA6 ", guide.length, " \u5B57\u7B26\uFF09\uFF1A"] }), (0, jsx_runtime_1.jsx)("pre", { style: {
                          fontSize: theme_js_1.FS.tag,
                          lineHeight: 1.55,
                          background: 'rgba(127,127,127,0.08)',
                          border: `1px solid ${theme_js_1.C.border}`,
                          borderRadius: 8,
                          padding: '10px 12px',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          maxHeight: 340,
                          overflowY: 'auto',
                          margin: 0,
                      }, children: guide }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 6, lineHeight: 1.6 }, children: "\u2605 \u5B8C\u6574\u8BF4\u660E\uFF08\u63A5\u53E3\u7EC6\u8282\u3001\u534F\u4F5C\u9ED8\u5951\u3001\u4E09\u4E2A\u5751\uFF09\u5728\u670D\u52A1\u7AEF\uFF0C\u5BF9\u65B9 Agent \u62C9\u53D6\u65F6\u6309\u5EA7\u4F4D\u4E0B\u53D1\u3002 \u6539\u8BF4\u660E\u4E0D\u7528\u518D\u53D1\u65B0\u7248\u3002" })] }));
      }
      function BallPanel({ state }) {
          return ((0, jsx_runtime_1.jsx)(Section, { title: "\u72B6\u6001\u9762\u677F \u00B7 \u591A\u7403", children: (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 8 }, children: state.balls.map((b) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          border: `1px solid ${theme_js_1.C.border}`,
                          borderRadius: 999,
                          padding: '4px 10px',
                          fontSize: theme_js_1.FS.small,
                      }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                  width: 10,
                                  height: 10,
                                  borderRadius: '50%',
                                  background: LAMP_COLOR[b.lamp],
                                  display: 'inline-block',
                              } }), (0, jsx_runtime_1.jsx)("span", { children: b.label }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag }, children: b.lamp })] }, b.id))) }) }));
      }
      function SeatSection({ state, now }) {
          return ((0, jsx_runtime_1.jsx)(Section, { title: "\u5EA7\u4F4D\uFF08\u542B\u7A7A\u4F4D \u00B7 \u9080\u8BF7\uFF09", children: (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: state.seats.map((s) => {
                      const text = (0, live_js_1.seatText)(s);
                      const isAway = s.status === 'occupied' && s.presence === 'away' && s.membershipActive;
                      const invite = s.invite;
                      const expired = invite !== undefined && (0, live_js_1.inviteExpired)(invite, now);
                      return ((0, jsx_runtime_1.jsxs)("div", { style: {
                              border: `1px solid ${theme_js_1.C.border}`,
                              borderRadius: 8,
                              padding: '6px 10px',
                              fontSize: theme_js_1.FS.small,
                          }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', gap: 8 }, children: [(0, jsx_runtime_1.jsx)("span", { children: s.label }), (0, jsx_runtime_1.jsx)("span", { style: { color: isAway ? '#d97706' : theme_js_1.C.dim }, children: text })] }), isAway && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: '#d97706', marginTop: 2 }, children: "\u79BB\u5EA7\u2260\u79FB\u9664\uFF1A\u5EA7\u4F4D\u4ECD\u5360\u7528\u3001\u7559\u75D5\u5728\uFF08presence=away \u4E0D\u63A8\u51FA membershipActive=false\uFF09" })), invite !== undefined && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 2 }, children: invite.used
                                      ? `✓ 邀请已被接受（${invite.toName} · ${invite.expiresAt.slice(11, 16)} 前有效）`
                                      : expired
                                          ? `邀请已失效（有效期至 ${invite.expiresAt.slice(11, 16)}）· 重新邀请`
                                          : `＋邀请「${invite.toName}」· 有效期至 ${invite.expiresAt.slice(11, 16)}` }))] }, s.id));
                  }) }) }));
      }
      function MemberColumns({ state }) {
          const { humans, agents } = (0, live_js_1.splitMembers)(state);
          return ((0, jsx_runtime_1.jsxs)(Section, { title: "\u6210\u5458 \u00B7 \u2463 \u4E24\u96C6\u5408\u5206\u5F00", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 10 }, children: [(0, jsx_runtime_1.jsx)(MemberCol, { heading: "\u534F\u4F5C\u65B9\uFF08\u4EBA\uFF09", members: humans, tone: "#3B6FE0" }), (0, jsx_runtime_1.jsx)(MemberCol, { heading: "\u8BA2\u9605\u8005\uFF08Agent\uFF09", members: agents, tone: "#6d28d9" })] }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 4 }, children: "\u4EBA\u7C7B\u534F\u4F5C\u65B9\u80FD\u5750\u5EA7\u4F4D\u3001\u4EA7\u751F\u7559\u75D5\uFF1BAgent \u8BA2\u9605\u4E8B\u4EF6\u6D41/\u88AB\u53EB\u9192\u2014\u2014\u4E24\u4E2A\u96C6\u5408\u4E0D\u6DF7\u5217\u3001\u4E0D\u4E92\u63A8\uFF1B\u9080\u8BF7\u53EA\u53D1\u4EBA\u3002" })] }));
      }
      function MemberCol({ heading, members, tone }) {
          return ((0, jsx_runtime_1.jsxs)("div", { style: { flex: 1, border: `1px solid ${theme_js_1.C.border}`, borderRadius: 8, padding: '6px 10px' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: tone, fontWeight: 600, marginBottom: 4 }, children: heading }), members.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\uFF08\u7A7A\uFF09" })) : (members.map((m) => ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small }, children: m.name }, m.id))))] }));
      }
      function RoundTimeline({ state }) {
          return ((0, jsx_runtime_1.jsx)(Section, { title: "\u8F6E\u6B21\u65F6\u95F4\u7EBF \u00B7 B3", children: (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: state.rounds.map((r) => ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, borderLeft: `3px solid ${theme_js_1.C.accent}`, paddingLeft: 8 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontWeight: 600 }, children: ["R", r.index, " \u00B7 ", r.at.slice(0, 10), " \u00B7 ", r.byName] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.dim }, children: [r.title, " \u2014\u2014 ", r.what] })] }, r.id))) }) }));
      }
      function TraceSection({ state }) {
          const [showAll, setShowAll] = (0, react_1.useState)(false);
          const overLimit = state.traces.length > TRACE_LIMIT;
          const visible = overLimit && !showAll ? state.traces.slice(0, TRACE_LIMIT) : state.traces;
          return ((0, jsx_runtime_1.jsxs)(Section, { title: "\u7559\u75D5\uFF08\u8C01 / \u4F55\u65F6 / \u4ECE\u54EA / \u662F\u5426\u534F\u4F5C\u65B9\uFF09", children: [(0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: visible.map((t) => ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, border: `1px solid ${theme_js_1.C.border}`, borderRadius: 8, padding: '6px 10px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600 }, children: t.actorName }), (0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag }, children: [t.at.slice(0, 16), " \u00B7 ", t.from === 'desktop' ? '桌面端' : '浏览器入口', " \u00B7", ' ', t.isCollaborator ? '协作方' : '非协作方', " \u00B7 ", t.actorKind === 'agent' ? 'Agent' : '人'] })] }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.dim, marginTop: 2 }, children: t.summary })] }, t.id))) }), overLimit && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setShowAll((v) => !v), style: {
                          marginTop: 6,
                          fontSize: theme_js_1.FS.tag,
                          color: theme_js_1.C.accent,
                          background: 'transparent',
                          border: `1px solid ${theme_js_1.C.border}`,
                          borderRadius: 6,
                          padding: '3px 8px',
                          cursor: 'pointer',
                      }, children: showAll ? `收起（只看最近 ${TRACE_LIMIT} 条）` : `展开全部（共 ${state.traces.length} 条 · 当前显示最近 ${TRACE_LIMIT} 条）` }))] }));
      }
      function EventStreamCard({ state }) {
          const a = state.async;
          return ((0, jsx_runtime_1.jsx)(Section, { title: "\u4E8B\u4EF6\u6D41 & \u7403\u8F6C\u79FB \u00B7 \u5F02\u6B65\u5BA1\u6838\u5E95\u5EA7", children: (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, border: `1px solid ${theme_js_1.C.border}`, borderRadius: 8, padding: '8px 10px' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 600, marginBottom: 4 }, children: "C \u53CC\u8F68\uFF08\u4E8B\u4EF6\u843D\u5E93\u672C\u4F53 + \u5916\u53D1\u53EB\u9192\u65C1\u8DEF\uFF09" }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.dim }, children: ["\u00B7 \u672C\u4F53\uFF1A", (0, jsx_runtime_1.jsx)("code", { style: { fontFamily: theme_js_1.FONT.mono }, children: "events" }), " \u8868\u843D\u5E93\uFF08\u7403\u8F6C\u79FB/\u5EA7\u4F4D\u53D8\u66F4/\u7559\u75D5\uFF09"] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.dim }, children: ["\u00B7 \u65C1\u8DEF\uFF1A\u843D\u5E93\u65F6\u5916\u53D1\u90AE\u4EF6/\u98DE\u4E66\u53EB\u9192\uFF08", (0, jsx_runtime_1.jsx)("code", { style: { fontFamily: theme_js_1.FONT.mono }, children: a.eventsSinceEndpoint }), " \u56DE\u5EA7\u62C9\uFF09"] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: '#d97706', marginTop: 4 }, children: ["\u2460 fail-open\uFF1A\u5916\u53D1\u53EB\u9192\u5931\u8D25\u4E0D\u5F71\u54CD\u843D\u5E93\uFF0C\u4F46\u4EE3\u4EF7\u987B\u660E\u793A \u2014\u2014 ", a.notifyCostNote] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.dim, marginTop: 4 }, children: ["\u901A\u77E5\u901A\u9053\uFF1A", a.notifyChannel, " \u00B7 fail-open=", String(a.notifyFailOpen)] }), (0, jsx_runtime_1.jsxs)("div", { style: { borderTop: `1px solid ${theme_js_1.C.border}`, marginTop: 6, paddingTop: 6, display: 'flex', flexDirection: 'column', gap: 3 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { color: '#dc2626' }, children: ["\uD83D\uDD34 \u5B9E\u65F6\u901A\u9053\uFF1A", state.channels.live.note] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: '#16a34a' }, children: ["\uD83D\uDFE2 \u5386\u53F2\u7559\u75D5\uFF1A\u56DE\u5EA7\u53EF replay\uFF08", state.channels.history.endpoint, "\uFF09"] })] })] }) }));
      }
      function DisciplineCard() {
          return ((0, jsx_runtime_1.jsx)(Section, { title: "\u8BBE\u8BA1\u7EAA\u5F8B \u00B7 \u56DB\u70B9\u5DF2\u5438\u6536", children: (0, jsx_runtime_1.jsxs)("ul", { style: { margin: 0, paddingLeft: 18, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2460 fail-open \u8981\u8BF4\u6E05\u4EE3\u4EF7\uFF08\u5916\u53D1\u5931\u8D25\u4E0D\u5F71\u54CD\u843D\u5E93\uFF0C\u4EE3\u4EF7\u5DF2\u660E\u793A\uFF09" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2461 \u9080\u8BF7\u5E26\u6709\u6548\u671F\uFF08invite.expiresAt\uFF0C\u8FC7\u671F\u4E0D\u5360\u5EA7\uFF09" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2462 \u79BB\u5EA7\u2260\u79FB\u9664\uFF08presence \u00D7 membershipActive \u662F\u4E24\u4E2A\u7EF4\u5EA6 \u2014\u2014 \u56DB\u6570\u5206\u8D26\uFF1Aoccupied \u542B away \u00B7 awayButActive \u2286 occupied \u00B7 \u79FB\u9664=\u91CA\u653E\u56DE\u7A7A\u4F4D\u6C60\uFF09" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2463 \u4EBA\u7C7B\u534F\u4F5C\u65B9 / Agent \u8BA2\u9605\u8005\u5206\u5F00\uFF08\u4E24\u4E2A\u96C6\u5408\uFF0C\u4E0D\u6DF7\u5217\uFF09" }), (0, jsx_runtime_1.jsx)("li", { children: "\u8FB9\u754C\uFF1A\u79BB\u5EA7\u2260\u8F9E\u9000/\u79FB\u9664\uFF08\u786C\u8FB9\u754C\uFF0C\u5224\u636E\u62E6\u622A\u81EA\u52A8\u6620\u5C04\uFF09" })] }) }));
      }
      function Unreadable({ kind, reason }) {
          const isLoading = kind === 'loading';
          const tone = kind === 'stale' ? '#d97706' : '#dc2626';
          return ((0, jsx_runtime_1.jsx)("div", { style: {
                  border: `1px solid ${theme_js_1.C.border}`,
                  borderRadius: 8,
                  padding: '14px 12px',
                  fontSize: theme_js_1.FS.small,
                  color: tone,
                  background: theme_js_1.C.soft,
              }, children: isLoading ? '正在读取工位数据…' : reason ?? '工位数据读不到' }));
      }
      function Section({ title, children }) {
          return ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 12 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, fontWeight: 600, marginBottom: 6 }, children: title }), children] }));
      }
      function TaskStatsBar(props) {
          const [counts, setCounts] = (0, react_1.useState)(null);
          const [byProj, setByProj] = (0, react_1.useState)(null);
          (0, react_1.useEffect)(() => {
              let alive = true;
              void (async () => {
                  const r = await (0, live_js_1.loadTasks)(true);
                  if (!alive || !r.ok)
                      return;
                  const m = {};
                  const pm = {};
                  for (const t of r.data.tasks) {
                      m[t.status] = (m[t.status] ?? 0) + 1;
                      const k = t.projectId || '__none__';
                      pm[k] = (pm[k] ?? 0) + 1;
                  }
                  setCounts(m);
                  const pr = await (0, live_js_1.loadProjects)();
                  if (!alive)
                      return;
                  if (pr.ok) {
                      const nameOf = (id) => id === '__none__' ? '未关联项目' : (pr.data.projects.find((p) => p.projectId === id)?.name ?? id);
                      setByProj(Object.entries(pm)
                          .map(([k, n]) => ({ name: nameOf(k), n }))
                          .sort((a, b) => b.n - a.n));
                  }
              })();
              return () => { alive = false; };
          }, [props.reloadTick]);
          if (counts === null)
              return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
          const g = (keys) => keys.reduce((n, k) => n + (counts[k] ?? 0), 0);
          const items = [
              { label: '待领', n: g(['posted', 'open']), color: '#8b95a5' },
              { label: '在手', n: g(['claimed', 'in_progress', 'blocked']), color: theme_js_1.C.accent },
              { label: '待审批', n: g(['submitted']), color: '#d97706' },
              { label: '已完成', n: g(['accepted', 'done']), color: '#1a7f37' },
              { label: '其他', n: g(['rejected', 'timeout', 'cancelled']), color: '#c2410c' },
          ];
          const total = items.reduce((n, x) => n + x.n, 0);
          return ((0, jsx_runtime_1.jsxs)("div", { style: {
                  ...cardStyle, marginTop: 8, padding: '8px 12px',
                  display: 'flex', flexDirection: 'column', gap: 6,
              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u4EFB\u52A1" }), items.map((it) => ((0, jsx_runtime_1.jsxs)("span", { style: { display: 'flex', alignItems: 'center', gap: 5, fontSize: theme_js_1.FS.small }, children: [(0, jsx_runtime_1.jsx)("span", { style: { width: 7, height: 7, borderRadius: 999, background: it.color, display: 'inline-block' } }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: it.label }), (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600, color: it.n > 0 ? theme_js_1.C.text : theme_js_1.C.dim }, children: it.n })] }, it.label))), (0, jsx_runtime_1.jsxs)("span", { style: { marginLeft: 'auto', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: ["\u5171 ", total, " \u6761"] })] }), byProj !== null && byProj.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', borderTop: `1px solid ${theme_js_1.C.border}`, paddingTop: 6 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u6309\u9879\u76EE" }), byProj.map((x) => ((0, jsx_runtime_1.jsxs)("span", { style: { display: 'flex', alignItems: 'center', gap: 5, fontSize: theme_js_1.FS.tag }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: x.name }), (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600, color: theme_js_1.C.text }, children: x.n })] }, x.name)))] })) : null] }));
      }
      function SeatSummaryRow({ seats }) {
          const [showMa, setShowMa] = (0, react_1.useState)(false);
          if (seats === null)
              return null;
          const counts = (0, seat_summary_js_1.countSeatTypes)(seats.map((s) => ({
              seat: s.seat,
              label: s.label,
              occupants: s.occupants,
              full: s.full,
          })));
          const maCount = counts.find((c) => c.key === 'management_assistant');
          const maHasPeople = maCount !== undefined && maCount.occupantsTotal > 0;
          return ((0, jsx_runtime_1.jsxs)("div", { style: {
                  display: 'flex', flexDirection: 'column', gap: 0,
                  padding: '4px 0', marginTop: 8,
                  border: `1px solid ${theme_js_1.C.border}`, borderRadius: 8, background: theme_js_1.C.soft,
                  overflow: 'hidden',
              }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                          padding: '6px 10px', borderBottom: `1px solid ${theme_js_1.C.border}`,
                          fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, fontWeight: 600,
                      }, children: (0, seat_summary_js_1.seatSummary)(counts) }), counts.map((c, i) => {
                      const isSig = c.key === 'signature';
                      const isMa = c.key === 'management_assistant';
                      const isEmpty = c.occupantsTotal === 0;
                      const right = (0, seat_summary_js_1.seatBadge)(c).slice(c.label.length).trim();
                      return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { onClick: isMa ? () => setShowMa((v) => !v) : undefined, style: {
                                      display: 'flex', alignItems: 'center', gap: 8,
                                      padding: '6px 10px',
                                      borderTop: i === 0 ? 'none' : `1px solid ${theme_js_1.C.border}`,
                                      fontSize: theme_js_1.FS.small,
                                      cursor: isMa ? 'pointer' : 'default',
                                      background: isMa && showMa ? 'rgba(200,136,31,0.06)' : 'transparent',
                                  }, title: isSig
                                      ? '山海签名位：平台专属效力锚点，不可邀请、不可更换'
                                      : c.holders.length > 0
                                          ? `${c.label}：${c.holders.join('、')}`
                                          : `${c.label}：空着`, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, minWidth: 22 }, children: isSig ? '—' : `#${i}` }), (0, jsx_runtime_1.jsx)("span", { style: {
                                              fontWeight: 600,
                                              color: isSig ? '#8e44ad' : (isEmpty ? theme_js_1.C.dim : theme_js_1.C.text),
                                              minWidth: 88,
                                          }, children: isSig ? '山海签名位' : c.label }), (0, jsx_runtime_1.jsx)("span", { style: {
                                              fontSize: theme_js_1.FS.tag,
                                              color: isEmpty && !isSig ? theme_js_1.C.dim : theme_js_1.C.text,
                                              fontWeight: isEmpty ? 400 : 600,
                                          }, children: right }), isMa ? ((0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 'auto', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: showMa ? '收起 ▴' : '功能介绍与指定 ▾' })) : null] }), isMa && showMa ? ((0, jsx_runtime_1.jsx)("div", { style: { borderTop: `1px solid ${theme_js_1.C.border}`, background: '#fff' }, children: (0, jsx_runtime_1.jsx)(ManagementGrantSection, { embedded: true }) })) : null] }, c.key));
                  })] }));
      }
      function OrgSection(props) {
          const door = (props.doorLabel ?? '').trim();
          const [tree, setTree] = (0, react_1.useState)(null);
          const [shopName, setShopName] = (0, react_1.useState)('');
          const [onboardSeen, setOnboardSeen] = (0, react_1.useState)(null);
          const [onboardDismissed, setOnboardDismissed] = (0, react_1.useState)(false);
          const [regions, setRegions] = (0, react_1.useState)(null);
          const [regionKey, setRegionKey] = (0, react_1.useState)('');
          const [myShops, setMyShops] = (0, react_1.useState)([]);
          const [myCurrentShopId, setMyCurrentShopId] = (0, react_1.useState)('');
          const [doorLabel, setDoorLabel] = (0, react_1.useState)('');
          const [seatList, setSeatList] = (0, react_1.useState)(null);
          const [err, setErr] = (0, react_1.useState)(null);
          const [busy, setBusy] = (0, react_1.useState)(false);
          const [draft, setDraft] = (0, react_1.useState)('');
          const [editing, setEditing] = (0, react_1.useState)(null);
          const [editName, setEditName] = (0, react_1.useState)('');
          const [inviting, setInviting] = (0, react_1.useState)(null);
          const [notice, setNotice] = (0, react_1.useState)(null);
          const [madeBy, setMadeBy] = (0, react_1.useState)({});
          const [clearing, setClearing] = (0, react_1.useState)(false);
          const [clearTxt, setClearTxt] = (0, react_1.useState)('');
          const [showJoin, setShowJoin] = (0, react_1.useState)(false);
          const [grantOpen, setGrantOpen] = (0, react_1.useState)(false);
          const refresh = async () => {
              const r = await (0, live_js_1.loadOrgTree)();
              if (r.ok) {
                  setTree(r.data);
                  setErr((prev) => (prev !== null && prev.source === 'action') ? prev : null);
              }
              else {
                  setErr({ code: r.code, message: r.message });
                  setTree(null);
              }
          };
          (0, react_1.useEffect)(() => {
              void refresh();
              void callPack('rolesSeats', {}).then((r) => {
                  if (r.ok)
                      setSeatList(Array.isArray(r.data.seats) ? r.data.seats : []);
              });
              void callPack('contextGet', {}).then((r) => {
                  if (r.ok) {
                      setShopName(r.data.shopName ?? '');
                      setOnboardSeen(r.data.onboardSeen === true);
                      setOnboardDismissed(r.data.onboardDismissed === true);
                  }
              });
              void callPack('tenantRegions', {}).then((r) => {
                  if (r.ok)
                      setRegions(Array.isArray(r.data.regions) ? r.data.regions : []);
              });
              void callPack('tenantShops', {}).then((r) => {
                  if (r.ok) {
                      setMyShops(Array.isArray(r.data.shops) ? r.data.shops : []);
                      setMyCurrentShopId((r.data.current ?? '').trim());
                  }
              });
          }, [props.reloadTick]);
          const kaipuCreate = async (name) => {
              const key = regionKey.trim();
              if (!key) {
                  setErr({ code: 'door_region_required', message: '请先选一个区，再创建铺子。',
                      source: 'action', title: '还没选区域' });
                  return;
              }
              const hit = (regions ?? []).find((r) => r.label === key);
              if (!hit) {
                  setErr({ code: 'door_region_invalid', message: '选中的区域不在可选清单里，请重新选择。',
                      source: 'action', title: '区域不对' });
                  return;
              }
              setDraft(name);
              void (async () => {
                  const r = await (0, live_js_1.createOrgNode)(name);
                  if (!r.ok)
                      setErr({ code: r.code, message: r.message });
                  await refresh();
                  if (r.ok) {
                      const d = await callPack('tenantDoorAssign', {
                          planet: hit.planet, country: hit.country, region: hit.region,
                      });
                      if (!d.ok) {
                          setErr({ code: d.code ?? 'door_assign_failed',
                              message: '铺子建好了，但门牌号没发出来：' + (d.message ?? '未知原因') +
                                  '。可以重新选一次区域再试。',
                              source: 'action', title: '门牌号还没发下来' });
                      }
                      else {
                          setDoorLabel(d.data.doorLabel ?? '');
                      }
                      props.onShopPanelConsumed?.();
                      const w = await callPack('contextPut', {
                          onboardSeen: true,
                          shopName: name.trim(),
                      });
                      if (w.ok) {
                          setOnboardSeen(w.data.onboardSeen === true);
                          setShopName(w.data.shopName ?? '');
                      }
                  }
              })();
          };
          const kaipuOpenShop = async (name) => {
              const key = regionKey.trim();
              if (!key) {
                  setErr({ code: 'door_region_required', message: '请先选一个区，再开铺子。',
                      source: 'action', title: '还没选区域' });
                  return;
              }
              const hit = (regions ?? []).find((r) => r.label === key);
              if (!hit) {
                  setErr({ code: 'door_region_invalid', message: '选中的区域不在可选清单里，请重新选择。',
                      source: 'action', title: '区域不对' });
                  return;
              }
              setBusy(true);
              try {
                  const r = await callPack('shopOpen', {
                      name: name.trim(),
                      planet: hit.planet, country: hit.country, region: hit.region,
                  });
                  if (!r.ok) {
                      const isLimit = (r.code ?? '') === 'shop_limit_reached';
                      setErr({
                          code: r.code ?? 'shop_open_failed',
                          message: r.message ?? '开铺没成功',
                          source: 'action',
                          title: isLimit ? '铺子数量到上限了' : '开铺没成功',
                      });
                  }
                  else {
                      setErr(null);
                      props.onShopPanelConsumed?.();
                      setNotice(`「${r.data.name}」开好了（${r.data.doorLabel}号）。`
                          + '到「更多 → 我的铺子」可以切换过去。');
                  }
                  await refresh();
              }
              finally {
                  setBusy(false);
              }
          };
          const run = async (fn) => {
              if (busy)
                  return;
              setBusy(true);
              try {
                  const r = await fn();
                  if (!r.ok) {
                      const code = r.code ?? 'error';
                      const title = code === 'deliverable_required' ? '这次交付不完整'
                          : code === 'deliverable_missing' ? '附件没找到'
                              : code === 'deliver_first' ? '这个工位还有没交付的任务'
                                  : code === 'needs_approval' ? '要铺主确认后才能领'
                                      : code === 'project_frozen' ? '项目已归档，改不了'
                                          : code === 'project_incomplete' ? '还有任务没完成'
                                              : code === 'project_not_frozen' ? '要先归档才能送审'
                                                  : '这个操作没成功';
                      setErr({ code, message: r.message ?? '操作失败', source: 'action', title });
                  }
                  else
                      setErr(null);
                  await refresh();
              }
              finally {
                  setBusy(false);
              }
          };
          const onAdd = () => {
              const name = draft.trim();
              if (name.length === 0)
                  return;
              void run(async () => {
                  const r = await (0, live_js_1.createOrgNode)(name);
                  if (r.ok)
                      setDraft('');
                  return r;
              });
          };
          const onRename = (nodeId) => {
              const name = editName.trim();
              if (name.length === 0) {
                  setEditing(null);
                  return;
              }
              void run(async () => {
                  const r = await (0, live_js_1.renameOrgNode)(nodeId, name);
                  if (r.ok)
                      setEditing(null);
                  return r;
              });
          };
          const onDelete = (node) => {
              if (editing !== `del:${node.node_id}`) {
                  setEditing(`del:${node.node_id}`);
                  return;
              }
              setEditing(null);
              void run(async () => (0, live_js_1.deleteOrgNode)(node.node_id));
          };
          const nodes = tree?.nodes ?? [];
          const roots = nodes.filter((n) => !n.parent_node_id);
          const childrenOf = (id) => nodes.filter((n) => n.parent_node_id === id);
          const leaves = (0, node_pick_js_1.seatNodesOf)(nodes, childrenOf);
          const rawGrid = leaves.length > 0 ? leaves : nodes;
          const seatKeyOf = (n) => {
              const k = n.seatKey;
              if (typeof k === 'string' && k.length > 0)
                  return k;
              if ((0, seat_summary_js_1.isAdvisorSeat)(n.seatKey, n.name))
                  return 'signature';
              return '';
          };
          const seatRank = (n) => {
              const i = seat_summary_js_1.SEAT_ORDER.indexOf(seatKeyOf(n));
              return i < 0 ? 999 : i;
          };
          const gridNodes = rawGrid.slice().sort((a, b) => seatRank(a) - seatRank(b));
          const firstRenameableId = gridNodes.find((n) => n.renameable !== false)?.node_id ?? null;
          (0, react_1.useEffect)(() => {
              if (props.renameHint !== true)
                  return undefined;
              const t = window.setTimeout(() => props.onRenameHintDone?.(), 3000);
              return () => window.clearTimeout(t);
          }, [props.renameHint]);
          const curShop = myShops.find((s) => s.accountId === myCurrentShopId);
          const shopTitleName = (() => {
              const real = (curShop?.name ?? '').trim();
              if (curShop) {
                  if (real !== '')
                      return real;
                  const lbl = (curShop.doorLabel ?? '').trim();
                  if (lbl !== '')
                      return lbl;
                  return '';
              }
              return (shopName ?? '').trim();
          })();
          return ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 12 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, fontWeight: 600 }, children: shopTitleName !== '' ? `${shopTitleName}的kaipu` : (onboardSeen !== null ? '我的kaipu' : '工位布局') }), door !== '' ? ((0, jsx_runtime_1.jsxs)("span", { style: {
                                  fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, padding: '1px 7px', borderRadius: 3,
                                  border: `1px solid ${theme_js_1.C.border}`, whiteSpace: 'nowrap',
                              }, title: "\u8FD9\u95F4\u94FA\u5B50\u7684\u95E8\u724C\u53F7", children: [door, "\u53F7"] })) : null, (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: nodes.length === 0 ? '' : (() => {
                                  const joined = nodes.reduce((n, node) => n + (node.holders ?? []).filter((h) => (h.agentId ?? '') !== '').length, 0);
                                  return joined > 0
                                      ? `已有 ${joined} 位 Agent 加入工位`
                                      : `10 个位置 · 已建 ${nodes.length} 个 · 还没有成员进来`;
                              })() }), (0, jsx_runtime_1.jsx)("span", { style: { flex: 1 } }), (props.switchableShops ?? []).length > 0 && props.onSwitchShop ? ((0, jsx_runtime_1.jsxs)("select", { value: "", onChange: (e) => {
                                  const id = e.target.value;
                                  if (id)
                                      props.onSwitchShop?.(id);
                              }, style: {
                                  ...btnStyle(false),
                                  maxWidth: 190,
                                  cursor: 'pointer',
                              }, title: `你还有 ${(props.switchableShops ?? []).length} 间铺可切换，选择要切过去的那一间`, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: `🏠 切换到其他铺子（${(props.switchableShops ?? []).length}）` }), (props.switchableShops ?? []).map((s) => ((0, jsx_runtime_1.jsx)("option", { value: s.accountId, children: `${s.name || s.accountId}${s.doorLabel ? `（${s.doorLabel}）` : ''}${roleOf(s) === 'owner' ? ' · 我的' : ' · 受邀'}` }, s.accountId)))] })) : null, (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setGrantOpen((v) => !v), style: btnStyle(grantOpen), title: "\u7BA1\u7406\u4F4D\u51FA\u5DEE/\u4F11\u5047\u65F6\uFF0C\u501F\u4E00\u6BB5\u4EE3\u7BA1\u6743\u7ED9\u67D0\u4F4D Agent", children: grantOpen ? '收起 ▴' : '👑 管理助理' }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void refresh(), disabled: busy, style: btnStyle(false), title: "\u91CD\u65B0\u8BFB\u53D6", children: "\u5237\u65B0" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                  setClearing((v) => !v);
                                  setClearTxt('');
                              }, disabled: busy, style: {
                                  padding: '5px 12px',
                                  borderRadius: 6,
                                  border: '1px solid #c0392b',
                                  background: 'transparent',
                                  color: '#c0392b',
                                  fontSize: theme_js_1.FS.small,
                                  cursor: 'pointer',
                              }, title: "\u8BA9\u6240\u6709 Agent \u79BB\u573A\uFF08\u5DE5\u4F4D\u4FDD\u7559\uFF0C\u51ED\u8BC1\u4F5C\u5E9F\uFF09", children: "\u4E00\u952E\u6E05\u573A" })] }), grantOpen && ((0, jsx_runtime_1.jsx)("div", { style: { ...cardStyle, marginBottom: 8 }, children: (0, jsx_runtime_1.jsx)(ManagementGrantSection, { embedded: true }) })), clearing && ((0, jsx_runtime_1.jsxs)("div", { style: {
                          border: '1px solid #c0392b',
                          borderRadius: 10,
                          padding: '10px 12px',
                          marginBottom: 10,
                          background: 'rgba(192,57,43,0.06)',
                          fontSize: theme_js_1.FS.small,
                          lineHeight: theme_js_1.LH.normal,
                      }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 600, color: '#c0392b', marginBottom: 4 }, children: "\u6E05\u573A\u662F\u6536\u5C3E\u52A8\u4F5C\uFF0C\u4E0D\u53EF\u9006" }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.dim, marginBottom: 8 }, children: ["\u5DE5\u4F4D\u672C\u8EAB\u4F1A\u4FDD\u7559\uFF08#1-#5 \u4E0D\u52A8\uFF09\uFF0C\u4EFB\u52A1\u548C\u8D44\u6599\u4E5F\u4E0D\u4F1A\u5220\uFF1B \u4F46\u6240\u6709 Agent \u4F1A\u79BB\u573A\uFF0C", (0, jsx_runtime_1.jsx)("strong", { children: "\u5B83\u4EEC\u7684\u5BC6\u94A5\u7ACB\u523B\u5931\u6548" }), "\u3002\u7559\u75D5\u4F1A\u8BB0\u8FDB\u53D8\u66F4\u65E5\u5FD7\u3002"] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("input", { value: clearTxt, onChange: (e) => setClearTxt(e.target.value), placeholder: "\u8F93\u5165 CLEAR \u786E\u8BA4", style: { flex: '1 1 160px', padding: '5px 7px', fontSize: theme_js_1.FS.small, borderRadius: 4, border: '1px solid rgba(0,0,0,.18)' } }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: busy || clearTxt.trim().toUpperCase() !== 'CLEAR', onClick: () => {
                                          setBusy(true);
                                          void (async () => {
                                              const r = await (0, live_js_1.clearAgents)();
                                              if (!r.ok)
                                                  setErr({ code: r.code, message: r.message });
                                              else {
                                                  setErr(null);
                                                  setClearing(false);
                                                  setClearTxt('');
                                              }
                                              await refresh();
                                              setBusy(false);
                                          })();
                                      }, style: {
                                          padding: '5px 12px',
                                          borderRadius: 6,
                                          border: 'none',
                                          background: clearTxt.trim().toUpperCase() === 'CLEAR' ? '#c0392b' : 'rgba(0,0,0,.15)',
                                          color: '#fff',
                                          fontSize: theme_js_1.FS.small,
                                          cursor: clearTxt.trim().toUpperCase() === 'CLEAR' ? 'pointer' : 'not-allowed',
                                      }, children: "\u786E\u8BA4\u6E05\u573A" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setClearing(false); setClearTxt(''); }, style: btnStyle(false), children: "\u53D6\u6D88" })] })] })), notice !== null ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                          border: `1px solid ${theme_js_1.C.border}`, borderRadius: 10, padding: '8px 10px', marginBottom: 8,
                          fontSize: theme_js_1.FS.small, color: '#1a7f37', background: 'rgba(26,127,55,0.06)',
                          display: 'flex', gap: 8, alignItems: 'flex-start',
                      }, children: [(0, jsx_runtime_1.jsxs)("span", { children: ["\u2713 ", notice] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setNotice(null), style: { ...btnStyle(false), marginLeft: 'auto', padding: '0 6px' }, children: "\u77E5\u9053\u4E86" })] })) : null, err !== null ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                          border: `1px solid ${theme_js_1.C.border}`,
                          borderRadius: 10,
                          padding: '12px 14px',
                          background: theme_js_1.C.soft,
                          fontSize: theme_js_1.FS.small,
                          color: err.code === 'not_configured' ? theme_js_1.C.dim : '#d97706',
                          lineHeight: theme_js_1.LH.normal,
                      }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 600, marginBottom: 4 }, children: err.code === 'not_configured' ? '工位还没接服务端' : '工位布局读不到' }), (0, jsx_runtime_1.jsx)("div", { children: err.message })] })) : tree === null ? ((0, jsx_runtime_1.jsx)("div", { style: { ...cardStyle, color: theme_js_1.C.dim, fontSize: theme_js_1.FS.small }, children: "\u6B63\u5728\u8BFB\u53D6\u5DE5\u4F4D\u5E03\u5C40\u2026" })) : roots.length === 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                                  gap: 8,
                                  marginTop: 8,
                                  position: 'relative',
                                  minHeight: 170,
                              }, children: [(() => {
                                      const cells = [];
                                      for (let i = 0; i < 10; i += 1) {
                                          const seatKey = seat_summary_js_1.SEAT_ORDER[i];
                                          if (seatKey !== undefined) {
                                              cells.push((0, jsx_runtime_1.jsx)(EmptySystemSeat, { seatKey: seatKey, label: seat_summary_js_1.SEAT_LABELS[seatKey] ?? seatKey, seatInfo: seatList === null ? undefined : seatList.find((x) => x.seat === seatKey), locked: seatKey === 'signature', onInvite: () => {
                                                      setTimeout(() => {
                                                          const el = document.getElementById('kaipu-join-card');
                                                          if (el)
                                                              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                      }, 60);
                                                  } }, `onboard-sysslot-${seatKey}`));
                                          }
                                          else {
                                              cells.push((0, jsx_runtime_1.jsx)(EmptySeat, { canAdd: false, busy: busy }, `onboard-empty-${i}`));
                                          }
                                      }
                                      return cells;
                                  })(), !onboardDismissed ? ((0, jsx_runtime_1.jsx)(KaipuOnboardOverlay, { busy: busy, regions: regions, regionKey: regionKey, onRegionChange: setRegionKey, onCreate: (name) => { void kaipuCreate(name); }, onClose: (persistDismiss) => {
                                          props.onShopPanelConsumed?.();
                                          if (persistDismiss === true) {
                                              setOnboardDismissed(true);
                                              void callPack('contextPut', { onboardDismissed: true })
                                                  .then((w) => {
                                                  if (w.ok)
                                                      setOnboardDismissed(w.data.onboardDismissed === true);
                                                  else
                                                      setOnboardDismissed(false);
                                              });
                                          }
                                      } })) : null] }), (0, jsx_runtime_1.jsx)(JoinCodeCard, { compact: true, onOpenGuide: props.onGoHelp })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(JoinCodeCard, { compact: true, onOpenGuide: props.onGoHelp }), (() => {
                              const containers = nodes.filter((n) => childrenOf(n.node_id).length > 0);
                              if (containers.length === 0)
                                  return null;
                              const seqs = containers
                                  .map((n) => n.seq)
                                  .filter((s) => typeof s === 'number')
                                  .sort((a, b) => a - b);
                              const head = seqs.length > 0 ? `#${seqs[0]}` : '';
                              const names = containers.map((n) => n.name).join('、');
                              return ((0, jsx_runtime_1.jsx)("div", { style: {
                                      marginTop: 8, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim,
                                      lineHeight: 1.6, padding: '6px 10px',
                                      background: theme_js_1.C.soft, borderRadius: suggest_theme_js_1.SR.ctrl,
                                  }, children: head !== ''
                                      ? `${head} 是组织负责人（${names}）—— 它是分组节点，不占工位号，也不坐人；下面每个位才是能坐人的工位。`
                                      : `「${names}」是分组节点，不占工位号、不坐人；下面每个位才是能坐人的工位。` }));
                          })(), (0, jsx_runtime_1.jsxs)("div", { style: {
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                                  gap: 8,
                                  marginTop: 8,
                                  position: 'relative',
                              }, children: [gridNodes.map((n) => ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(OrgNodeCard, { node: n, seatInfo: (() => {
                                                  if (seatList === null)
                                                      return undefined;
                                                  const k = (n.seatKey ?? '').length > 0
                                                      ? n.seatKey
                                                      : ((0, seat_summary_js_1.isAdvisorSeat)(n.name, n.name) ? 'signature' : '');
                                                  return k.length > 0 ? seatList.find((x) => x.seat === k) : undefined;
                                              })(), busy: busy, editing: editing, editName: editName, setEditName: setEditName, onStartRename: (node) => {
                                                  setEditing(node.node_id);
                                                  setEditName(node.name);
                                                  props.onRenameHintDone?.();
                                              }, renameHint: props.renameHint === true && firstRenameableId === n.node_id, onRename: onRename, onDelete: onDelete, onInvite: () => setInviting(inviting === n.node_id ? null : n.node_id), onEvict: (seat, agentId) => {
                                                  void (async () => {
                                                      const r = await (0, live_js_1.evictSeat)(seat, agentId);
                                                      if (!r.ok) {
                                                          const title = r.code === 'seat_vacant' ? '这个位置本来就空着'
                                                              : r.code === 'seat_protected' ? '系统内置位，不能请出'
                                                                  : '请出没成功';
                                                          setErr({ code: r.code, message: r.message, source: 'action', title });
                                                          return;
                                                      }
                                                      await refresh();
                                                      setNotice(`已请出 ${r.data.evicted.name || r.data.evicted.agentId}，这个位置现在空了`);
                                                  })();
                                              }, onResetKey: (agentId) => {
                                                  void (async () => {
                                                      const r = await (0, live_js_1.resetAgentKey)(agentId);
                                                      if (!r.ok) {
                                                          setErr({ code: r.code, message: r.message, source: 'action', title: '重置没成功' });
                                                          return;
                                                      }
                                                      await refresh();
                                                      setNotice(`已重置 ${agentId} 的连接：新钥匙在保险箱，它下次来领任务时自动取走（旧钥匙 ${r.data.graceHours ?? 24} 小时内仍可用）`);
                                                  })();
                                              }, inviteOpen: inviting === n.node_id }, n.node_id), inviting === n.node_id && ((0, jsx_runtime_1.jsx)("div", { style: { gridColumn: '1 / -1' }, children: (0, jsx_runtime_1.jsx)(InviteBar, { node: n, made: madeBy[n.node_id] ?? null, onMade: (v) => setMadeBy((prev) => ({ ...prev, [n.node_id]: v })) }) }))] }, `wrap-${n.node_id}`))), (() => {
                                      const missing = Math.max(0, 10 - gridNodes.length);
                                      const seated = new Set();
                                      for (const n of gridNodes) {
                                          const direct = (n.seatKey ?? '').trim();
                                          seated.add(direct.length > 0 ? direct : resolveSeatKeyByName(n.name));
                                      }
                                      const vacantSystem = seat_summary_js_1.SEAT_ORDER.filter((k) => !seated.has(k));
                                      const cells = [];
                                      for (let i = 0; i < missing; i += 1) {
                                          const seatKey = vacantSystem[i];
                                          if (seatKey !== undefined) {
                                              cells.push((0, jsx_runtime_1.jsx)(EmptySystemSeat, { seatKey: seatKey, label: seat_summary_js_1.SEAT_LABELS[seatKey] ?? seatKey, seatInfo: seatList === null ? undefined : seatList.find((x) => x.seat === seatKey), locked: seatKey === 'signature', onInvite: () => {
                                                      setTimeout(() => {
                                                          const el = document.getElementById('kaipu-join-card');
                                                          if (el)
                                                              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                      }, 60);
                                                  } }, `sysslot-${seatKey}`));
                                          }
                                          else {
                                              cells.push((0, jsx_runtime_1.jsx)(EmptySeat, { canAdd: i === vacantSystem.length, busy: busy, onAdd: (name) => {
                                                      setDraft(name);
                                                      void (async () => {
                                                          const r = await (0, live_js_1.createOrgNode)(name);
                                                          if (!r.ok)
                                                              setErr({ code: r.code, message: r.message });
                                                          await refresh();
                                                      })();
                                                  } }, `empty-${i}`));
                                          }
                                      }
                                      return cells;
                                  })(), props.openShopPanel === true ? ((0, jsx_runtime_1.jsx)(KaipuOnboardOverlay, { busy: busy, regions: regions, regionKey: regionKey, onRegionChange: setRegionKey, onCreate: (name) => { void kaipuOpenShop(name); }, onClose: () => props.onShopPanelConsumed?.(), allowDismiss: false })) : null] }), gridNodes.length > 10 ? ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 6 }, children: ["\u8FD8\u6709 ", gridNodes.length - 10, " \u4E2A\u4F4D\u7F6E\u672A\u663E\u793A\uFF08\u5148\u663E\u793A\u524D 10 \u4E2A\uFF09"] })) : null, (0, jsx_runtime_1.jsxs)("div", { style: {
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                                  gap: 8,
                                  marginTop: 8,
                              }, children: [SEAT_GUIDE.map((s) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                                          border: '1px solid #ebeef2',
                                          borderRadius: 10,
                                          padding: '8px 10px',
                                          minHeight: 78,
                                          background: 'rgba(0,0,0,0.012)',
                                          fontSize: theme_js_1.FS.tag,
                                          lineHeight: 1.55,
                                          display: 'flex',
                                          flexDirection: 'column',
                                          gap: 4,
                                      }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 5 }, children: [(0, jsx_runtime_1.jsx)("span", { children: s.icon }), (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600, fontSize: theme_js_1.FS.small, color: s.locked ? '#9b7cb8' : theme_js_1.C.dim }, children: s.name })] }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.faint, flex: 1 }, children: s.desc }), s.locked === true ? (0, jsx_runtime_1.jsx)("div", { style: { color: '#9b7cb8' }, children: "\uD83D\uDD12 \u4E0D\u53EF\u9080\u8BF7" }) : null] }, s.name))), (0, jsx_runtime_1.jsxs)("div", { style: {
                                          border: '1px solid #ebeef2',
                                          borderRadius: 10,
                                          padding: '8px 10px',
                                          minHeight: 78,
                                          background: 'rgba(0,0,0,0.012)',
                                          fontSize: theme_js_1.FS.tag,
                                          lineHeight: 1.55,
                                          color: theme_js_1.C.dim,
                                          display: 'flex',
                                          flexDirection: 'column',
                                          gap: 4,
                                      }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 600, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u7B7E\u540D\u5E76\u884C" }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1 }, children: ["\u7B2C\u4E09\u65B9\u7B7E\u81EA\u5DF1\u7684\u7ED3\u8BBA\uFF0C\u8BF7\u8BA9\u5B83\u5750", (0, jsx_runtime_1.jsx)("b", { children: "\u5BA1\u8BA1\u4F4D" }), "\u3001\u7528", (0, jsx_runtime_1.jsx)("b", { children: "\u81EA\u6709\u79C1\u94A5" }), "\uFF1B \u5C71\u6D77\u5728\u5176\u540E\u9644\u52A0\u300C\u8FC7\u7A0B\u51ED\u8BC1\u300D\u7684\u7B7E\u540D\u3002\u4E24\u6761\u5E76\u884C\u3001\u4E0D\u4E92\u76F8\u66FF\u4EE3\u3002"] })] })] }), (0, jsx_runtime_1.jsx)(TaskStatsBar, { reloadTick: props.reloadTick })] }))] }));
      }
      const LOCKED_SEAT_KEYS = new Set(['signature']);
      const INVITE_LAMPS = [
          { value: 'execution', label: '执行位', hint: '干活的人' },
          { value: 'audit', label: '审计位', hint: '负责审的人' },
          { value: 'management', label: '管理位', hint: '管秩序的人' },
          { value: 'strategy', label: '战略位', hint: '定方向的人（只能 1 位）' },
          { value: 'management_assistant', label: '管理助理位', hint: '临时代管的人（有时限）' },
      ];
      const SEAT_GUIDE = [
          { icon: '🧑‍💻', name: '执行位', desc: '干活的人（通常是你自带的 Agent 或我们的智囊团）。' },
          { icon: '⚖️', name: '审计位', desc: '负责挑毛病、做审查的人（可以是第三方机构，也可以是我们）。' },
          { icon: '👑', name: '管理位', desc: '负责建场地、发任务、管秩序的人（通常是你/铺主）。' },
          {
              icon: '💮',
              name: '签名位（平台专属）',
              desc: '山海的最后一道防线。它不负责干活，只负责在流程跑完后，为「过程未被篡改」盖上最终的效力印章。外来的 Agent 不能坐这个位子，否则就是冒充山海背书。',
              locked: true,
          },
      ];
      function InviteBar(props) {
          const { node, made, onMade } = props;
          const seatKey = (() => {
              const direct = node.seatKey ?? '';
              if (direct.length > 0)
                  return direct;
              const hit = INVITE_LAMPS.find((x) => x.label === node.name || node.name.startsWith(x.label));
              if (hit)
                  return hit.value;
              if ((0, seat_summary_js_1.isAdvisorSeat)(node.seatKey, node.name))
                  return 'signature';
              return 'execution';
          })();
          const locked = LOCKED_SEAT_KEYS.has(seatKey);
          const [lamp, setLamp] = (0, react_1.useState)(seatKey);
          const [note, setNote] = (0, react_1.useState)('');
          const [busy, setBusy] = (0, react_1.useState)(false);
          const [err, setErr] = (0, react_1.useState)(null);
          const [copied, setCopied] = (0, react_1.useState)(false);
          const [guideCopied2, setGuideCopied2] = (0, react_1.useState)(false);
          const create = async () => {
              if (locked) {
                  setErr('签名位不能发邀请 —— 它是山海不可替代的效力锚点，外部 Agent 不能入驻。要请对方干活，请选执行位 / 审计位 / 管理位。');
                  return;
              }
              setBusy(true);
              setErr(null);
              const r = await callPack('inviteCreate', {
                  lamp,
                  seat: node.name,
                  ...(note.length > 0 ? { note } : {}),
                  ttlDays: 7,
              });
              setBusy(false);
              if (!r.ok) {
                  setErr(`[${r.code}] ${r.message}`);
                  return;
              }
              const _url = String(r.data.url ?? r.data.path ?? r.data.code ?? '');
              try {
                  const box = JSON.parse(safeGet(SEAT_INVITE_URL_KEY) || '{}');
                  box[String(node.node_id)] = { url: _url, expiresAt: String(r.data.expiresAt ?? '') };
                  safeSet(SEAT_INVITE_URL_KEY, JSON.stringify(box));
              }
              catch { }
              onMade({ url: _url, expiresAt: r.data.expiresAt });
          };
          return ((0, jsx_runtime_1.jsxs)("div", { style: {
                  border: `1px solid ${theme_js_1.C.accent}`,
                  borderRadius: 10,
                  padding: '10px 12px',
                  background: theme_js_1.C.soft,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600 }, children: ["\u9080\u8BF7\u4EBA\u8FDB ", typeof node.seq === 'number' ? `#${node.seq} ` : '', "\u300C", node.name, "\u300D"] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("label", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u8FD9\u76CF\u706F" }), (0, jsx_runtime_1.jsx)("select", { value: lamp, onChange: (e) => setLamp(e.target.value), style: { padding: '4px 8px', borderRadius: 6, border: `1px solid ${theme_js_1.C.border}`, background: 'transparent', color: theme_js_1.C.text, fontSize: theme_js_1.FS.small }, children: INVITE_LAMPS.map((v) => ((0, jsx_runtime_1.jsx)("option", { value: v.value, children: v.label }, v.value))) }), (0, jsx_runtime_1.jsx)("input", { value: note, onChange: (e) => setNote(e.target.value), placeholder: "\u5907\u6CE8\uFF08\u53EF\u9009\uFF0C\u5982\uFF1A\u8BF7\u54CD\u77F3\u505A\u5BA1\u8BA1\uFF09", style: { flex: '1 1 220px', padding: '4px 8px', borderRadius: 6, border: `1px solid ${theme_js_1.C.border}`, background: 'transparent', color: theme_js_1.C.text, fontSize: theme_js_1.FS.small } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void create(), disabled: busy, style: btnStyle(true), children: busy ? '生成中…' : '生成邀请链接' })] }), err !== null && (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: '#b3261e' }, children: err }), made !== null && ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small }, children: [(0, jsx_runtime_1.jsx)("div", { style: { wordBreak: 'break-all', fontFamily: 'ui-monospace, monospace', padding: '6px 8px', borderRadius: 6, border: `1px solid ${theme_js_1.C.border}`, background: 'rgba(127,127,127,0.06)', userSelect: 'all' }, children: made.url }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.dim, marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsxs)("span", { children: ["\u6709\u6548\u671F\u81F3 ", made.expiresAt, " \u00B7 \u4E00\u6B21\u6027"] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                          const done = () => {
                                              setCopied(true);
                                              setTimeout(() => setCopied(false), 2000);
                                          };
                                          const nav = typeof navigator !== 'undefined' ? navigator : undefined;
                                          if (nav?.clipboard?.writeText) {
                                              void nav.clipboard.writeText(made.url).then(done).catch(() => {
                                                  window.getSelection()?.selectAllChildren(document.body);
                                                  setErr('剪贴板不可用，请手动选中上面的链接复制');
                                              });
                                          }
                                          else {
                                              setErr('剪贴板不可用，请手动选中上面的链接复制');
                                          }
                                      }, style: {
                                          ...btnStyle(true),
                                          background: copied ? '#1f7a3d' : theme_js_1.C.accent,
                                          transition: 'background 160ms',
                                          minWidth: 96,
                                      }, children: copied ? '✓ 已复制' : '复制链接' }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                          const done = () => {
                                              setGuideCopied2(true);
                                              setTimeout(() => setGuideCopied2(false), 2000);
                                          };
                                          const nav = typeof navigator !== 'undefined' ? navigator : undefined;
                                          if (nav?.clipboard?.writeText) {
                                              void nav.clipboard.writeText((0, join_copy_js_1.invitePitch)(made.url)).then(done).catch(() => {
                                                  setErr('剪贴板不可用，请手动选中上面的链接复制');
                                              });
                                          }
                                          else {
                                              setErr('剪贴板不可用，请手动选中上面的链接复制');
                                          }
                                      }, style: {
                                          ...btnStyle(false),
                                          background: guideCopied2 ? '#1f7a3d' : 'transparent',
                                          color: guideCopied2 ? '#fff' : theme_js_1.C.text,
                                          transition: 'background 160ms',
                                          minWidth: 112,
                                      }, children: guideCopied2 ? '✓ 已复制话术' : '复制邀请话术' })] })] }))] }));
      }
      function ProjectChip({ active, onClick, children, }) {
          return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, style: {
                  padding: '4px 10px', borderRadius: 999, cursor: 'pointer',
                  fontSize: theme_js_1.FS.tag, whiteSpace: 'nowrap', fontFamily: 'inherit',
                  border: `1px solid ${active ? '#1f2937' : theme_js_1.C.border}`,
                  background: active ? '#1f2937' : 'transparent',
                  color: active ? '#fff' : theme_js_1.C.dim,
              }, children: children }));
      }
      const cardStyle = {
          border: `1px solid ${theme_js_1.C.border}`,
          borderRadius: 10,
          padding: '12px 14px',
          background: theme_js_1.C.soft,
      };
      function btnStyle(primary) {
          return {
              padding: '6px 12px',
              borderRadius: 8,
              border: `1px solid ${primary ? 'transparent' : theme_js_1.C.border}`,
              background: primary ? theme_js_1.C.accent : 'transparent',
              color: primary ? '#ffffff' : theme_js_1.C.text,
              fontSize: theme_js_1.FS.small,
              cursor: 'pointer',
              opacity: 1,
          };
      }
      function OrgNodeCard(props) {
          const { node, busy, editing, editName, setEditName } = props;
          const isRenaming = editing === node.node_id;
          const isDeleting = editing === `del:${node.node_id}`;
          const kind = node.node_kind ?? 'role';
          const [hover, setHover] = (0, react_1.useState)(false);
          const seatCount = node.seat_count ?? 0;
          const seatVacantish = (() => {
              const info = props.seatInfo;
              if (info === undefined)
                  return undefined;
              if (typeof info.capacity === 'number' && info.capacity === 0)
                  return true;
              const occ = Array.isArray(info.occupants) ? info.occupants : [];
              if (occ.length > 0)
                  return false;
              return true;
          })();
          const occupied = (Array.isArray(node.holders) ? node.holders.length : 0) > 0;
          const holders = Array.isArray(node.holders) ? node.holders : [];
          const [copiedLink, setCopiedLink] = (0, react_1.useState)(false);
          const [inviteCopyErr, setInviteCopyErr] = (0, react_1.useState)(null);
          const [inviteCopyFallback, setInviteCopyFallback] = (0, react_1.useState)(null);
          const localInviteUrl = (() => {
              try {
                  const raw = window.localStorage.getItem('kaipu.seat.inviteUrl.v1');
                  const box = raw ? JSON.parse(raw) : {};
                  const rec = box[String(node.node_id)];
                  const u = String(rec?.url ?? '').trim();
                  if (u.length > 0)
                      return u;
              }
              catch { }
              return String((node.invited ?? {}).url ?? '').trim();
          })();
          const invitedLive = (() => {
              if (!(0, node_pick_js_1.showInvited)(holders ?? [], node.invited))
                  return false;
              if (localInviteUrl.length === 0)
                  return false;
              const exp = String((node.invited ?? {}).expiresAt ?? '').trim();
              if (exp.length === 0)
                  return true;
              const t = Date.parse(exp);
              if (Number.isNaN(t))
                  return true;
              return t > Date.now();
          })();
          const copyInviteLink = () => {
              const url = localInviteUrl;
              let expiresAt = '';
              try {
                  const box = JSON.parse(safeGet(SEAT_INVITE_URL_KEY) || '{}');
                  const rec = box[String(node.node_id)];
                  expiresAt = String(rec?.expiresAt ?? '');
              }
              catch {
                  expiresAt = '';
              }
              if (expiresAt.length === 0)
                  expiresAt = String((node.invited ?? {}).expiresAt ?? '');
              if (url.length === 0) {
                  setCopiedLink(false);
                  setInviteCopyErr('这位当前没有可复制的邀请链接（邀请已过期，或本机没有留下这张码的链接）。可以重新发一张邀请。');
                  return;
              }
              const day = expiresAt.slice(0, 10);
              const validLine = day.length === 10 ? `7 天内有效（到 ${day}），一个链接只能接一个人` : '7 天内有效，一个链接只能接一个人';
              const who = String(node.name ?? '').trim() || '这个工位';
              const msg = [
                  `邀请你加入山海铺子的「${who}」`,
                  '',
                  '打开这个链接接入：',
                  url,
                  '',
                  validLine,
                  '',
                  '接入后你就能在这里领活、交结论、传资料。',
                  '完整接入说明在服务端，用你的 agentId + secret 调 POST /kb/guide/index 自取',
                  '（按你的座位给该看的段落）。',
              ].join('\n');
              const nav = typeof navigator !== 'undefined' ? navigator : undefined;
              if (!nav?.clipboard?.writeText) {
                  setCopiedLink(false);
                  setInviteCopyErr('当前环境不允许写剪贴板（DSH 桌面端可能未授权）。请手动全选复制下面这段：');
                  setInviteCopyFallback(msg);
                  return;
              }
              void nav.clipboard.writeText(msg).then(() => {
                  setCopiedLink(true);
                  setInviteCopyErr(null);
                  setInviteCopyFallback(null);
                  setTimeout(() => setCopiedLink(false), 2000);
              }).catch(() => {
                  setCopiedLink(false);
                  setInviteCopyErr('复制被系统拒绝（可能未授予剪贴板权限）。请手动全选复制下面这段：');
                  setInviteCopyFallback(msg);
              });
          };
          const primaryHolder = holders[0];
          const extraHolders = holders.length > 1 ? holders.length - 1 : 0;
          const cardSeatKey = (node.seatKey ?? '').length > 0
              ? node.seatKey
              : ((0, seat_summary_js_1.isAdvisorSeat)(node.seatKey, node.name) ? 'signature' : '');
          const seatLocked = LOCKED_SEAT_KEYS.has(cardSeatKey);
          const [evictArm, setEvictArm] = (0, react_1.useState)(false);
          const [resetArm, setResetArm] = (0, react_1.useState)(false);
          return ((0, jsx_runtime_1.jsxs)("div", { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), style: {
                  border: `${occupied ? '1px solid' : '1px dashed'} ${hover || isRenaming ? theme_js_1.C.text : occupied ? theme_js_1.C.accent : theme_js_1.C.border}`,
                  borderRadius: 10,
                  padding: '10px 12px',
                  background: theme_js_1.C.soft,
                  transition: 'border-color 120ms',
                  minHeight: 78,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                  width: 6,
                                  height: 6,
                                  borderRadius: 999,
                                  background: kind === 'team' ? theme_js_1.C.text : theme_js_1.C.dim,
                                  flex: '0 0 auto',
                              } }), typeof node.seq === 'number' && ((0, jsx_runtime_1.jsxs)("span", { title: "\u5DE5\u4F4D\u7F16\u53F7\uFF08\u6C9F\u901A\u65F6\u8BF4\u8FD9\u4E2A\u53F7\uFF09", style: {
                                  flex: '0 0 auto',
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: theme_js_1.C.dim,
                                  border: `1px solid ${theme_js_1.C.border}`,
                                  borderRadius: 4,
                                  padding: '1px 4px',
                                  lineHeight: 1.2,
                              }, children: ["#", node.seq] })), (0, jsx_runtime_1.jsx)("span", { title: occupied ? `在座：${node.seat_count} 个席位` : '待配置', style: {
                                  flex: '0 0 auto',
                                  width: 22,
                                  height: 22,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 11,
                                  fontWeight: 700,
                                  lineHeight: 1,
                                  color: occupied ? '#fff' : theme_js_1.C.faint,
                                  background: occupied ? theme_js_1.C.accent : 'transparent',
                                  border: occupied ? 'none' : `1px dashed ${theme_js_1.C.faint}`,
                              }, children: holders.length > 0
                                  ? (holders[0]?.name || '?').slice(0, 1)
                                  : (0, node_pick_js_1.showInvited)(holders, node.invited)
                                      ? (node.invited?.invitedName || '邀').slice(0, 1)
                                      : occupied ? (node.name || '?').slice(0, 1) : '' }), holders.length > 0 ? (() => {
                              const st = (0, node_pick_js_1.joinStateOf)(holders[0] ?? {});
                              const dot = (0, node_pick_js_1.dotOf)(st);
                              return ((0, jsx_runtime_1.jsx)("span", { title: dot.title, style: {
                                      width: 7, height: 7, borderRadius: '50%', marginLeft: -4, marginTop: -10,
                                      background: dot.hollow ? 'transparent' : dot.color,
                                      border: dot.hollow ? `1px solid ${dot.color}` : '1px solid #fff',
                                  } }));
                          })() : null, holders.length > 0 && ((0, jsx_runtime_1.jsxs)("span", { style: {
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 4,
                                  fontSize: theme_js_1.FS.tag,
                                  color: theme_js_1.C.accent,
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap',
                                  minWidth: 0,
                                  overflow: 'hidden',
                              }, title: holders.map((h) => `${h.name}（${h.agentId}）`).join('、'), children: [(0, jsx_runtime_1.jsx)("span", { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }, children: primaryHolder?.name || '?' }), (0, notify_copy_js_1.extraHolderBadge)(holders.length).length > 0 ? ((0, jsx_runtime_1.jsx)("span", { title: `${(0, notify_copy_js_1.extraHolderTitle)(holders.length)}（把鼠标停在这行可看完整名单）`, style: {
                                          flex: '0 0 auto',
                                          marginLeft: 2,
                                          padding: '0 5px',
                                          borderRadius: 999,
                                          background: 'rgba(59,111,224,.14)',
                                          color: theme_js_1.C.accent,
                                          fontSize: 10,
                                          fontWeight: 700,
                                          lineHeight: '15px',
                                          letterSpacing: 0,
                                      }, children: (0, notify_copy_js_1.extraHolderBadge)(holders.length) })) : null, holders.some((h) => h.online === true) ? '' : '（离线）'] })), holders.length === 0 ? ((0, node_pick_js_1.showInvited)(holders, node.invited) ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                  fontSize: theme_js_1.FS.tag, fontWeight: 600, flex: 1, minWidth: 0,
                                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                  color: theme_js_1.C.dim, fontStyle: 'italic',
                              }, title: `邀请已发出（${node.invited?.invitedAt ?? '时间未记'}），人还没接入 —— 码用掉后会变成正常在册`, children: (0, node_pick_js_1.invitedLabel)(node.invited ?? {}) })) : (0, notify_copy_js_1.holderUnknownText)(holders.length, seatCount, seatVacantish).length > 0 ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                  fontSize: theme_js_1.FS.tag, fontWeight: 600, flex: 1, minWidth: 0,
                                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                  color: LAMP_COLOR.amber,
                              }, title: `这个位子占了 ${node.seat_count} 个席位，但没取到是谁 —— 点「刷新」再试一次；还不出来就是数据没同步。`, children: (0, notify_copy_js_1.holderUnknownText)(holders.length, seatCount, seatVacantish) })) : ((0, jsx_runtime_1.jsx)("span", { style: {
                                  fontSize: theme_js_1.FS.small, fontWeight: 600, flex: 1, minWidth: 0,
                                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                  color: theme_js_1.C.dim,
                              }, title: node.name, children: node.name }))) : ((0, jsx_runtime_1.jsx)("span", { style: { flex: 1 } }))] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                  fontSize: theme_js_1.FS.tag,
                                  color: theme_js_1.C.dim,
                                  padding: '1px 6px',
                                  borderRadius: 3,
                                  background: 'rgba(0,0,0,.045)',
                                  whiteSpace: 'nowrap',
                                  flex: '0 0 auto',
                                  maxWidth: 140,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                              }, title: `${node.name}${kind !== 'live' ? `（数据源：${kind}）` : ''}`, children: node.name }), !isRenaming && node.renameable === false ? ((0, jsx_runtime_1.jsx)("span", { title: "\u8FD9\u4E2A\u4F4D\u7F6E\u7531\u5E73\u53F0\u5E2D\u4F4D\u5360\u7528\uFF08\u4E0D\u53EF\u66FF\u6362\uFF09\uFF0C\u540D\u5B57\u4E0D\u80FD\u6539", style: { flex: '0 0 auto', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, whiteSpace: 'nowrap' }, children: "\u5E73\u53F0\u4F4D \u00B7 \u4E0D\u53EF\u6539\u540D" })) : null, isRenaming ? ((0, jsx_runtime_1.jsx)("input", { autoFocus: true, value: editName, onChange: (e) => setEditName(e.target.value), onKeyDown: (e) => {
                                  if (e.key === 'Enter')
                                      props.onRename(node.node_id);
                                  if (e.key === 'Escape')
                                      props.onStartRename({ ...node, name: '' });
                              }, style: {
                                  flex: 1,
                                  minWidth: 0,
                                  padding: '2px 6px',
                                  borderRadius: 4,
                                  border: `1px solid ${theme_js_1.C.border}`,
                                  background: 'transparent',
                                  color: theme_js_1.C.text,
                                  fontSize: theme_js_1.FS.tag,
                                  outline: 'none',
                              } })) : node.renameable === false ? null : ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => props.onStartRename(node), disabled: busy, style: {
                                  flex: '0 0 auto', fontSize: theme_js_1.FS.tag, padding: '1px 6px',
                                  borderRadius: 3,
                                  border: `1px solid ${props.renameHint === true ? theme_js_1.C.accent : theme_js_1.C.border}`,
                                  background: props.renameHint === true ? 'rgba(0,0,0,.06)' : 'transparent',
                                  color: props.renameHint === true ? theme_js_1.C.text : theme_js_1.C.faint,
                                  fontWeight: props.renameHint === true ? 600 : 400,
                                  cursor: 'pointer',
                              }, title: "\u6539\u8FD9\u4E2A\u5DE5\u4F4D\u7684\u540D\u5B57", children: "\u6539\u540D" }))] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', gap: 6, marginTop: 'auto', alignItems: 'center' }, children: isRenaming ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => props.onRename(node.node_id), disabled: busy, style: btnStyle(true), children: "\u5B58" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [node.undeletable ? ((0, jsx_runtime_1.jsx)("span", { title: node.undeletable, style: {
                                      fontSize: theme_js_1.FS.small,
                                      color: theme_js_1.C.faint,
                                      flex: 1,
                                      minWidth: 0,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                  }, children: node.undeletable })) : null, holders.length > 0 ? (evictArm ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setEvictArm(false); props.onEvict(holders[0]?.seat ?? '', holders[0]?.agentId ?? ''); }, disabled: busy, style: { ...btnStyle(false), background: '#c0392b', color: '#fff', border: 'none' }, title: "\u786E\u8BA4\u540E\u4ED6\u7684\u5BC6\u94A5\u7ACB\u523B\u4F5C\u5E9F", children: "\u786E\u8BA4\u8BF7\u51FA" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setEvictArm(false), disabled: busy, style: btnStyle(false), children: "\u53D6\u6D88" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setResetArm(true); }, disabled: busy, title: `${primaryHolder?.name || '这个 Agent'} 连不上工位时点这里：换一把新钥匙放进保险箱，它下次来领任务自己取走（不会当场断线）`, style: { ...btnStyle(false), border: '1px solid #2f6f4e', color: '#2f6f4e' }, children: "\uD83D\uDD11 \u91CD\u7F6E\u8FDE\u63A5" }), resetArm ? null : ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setEvictArm(true), disabled: busy, title: `请出 ${primaryHolder?.name || '?'}（凭证会作废，工位保留）${extraHolders > 0 ? `　⚠ 该位另有 ${extraHolders} 条在职记录（数据异常，请联系运维）` : ''}`, style: { ...btnStyle(false), border: '1px solid #c0392b', color: '#c0392b' }, children: "\u8BF7\u51FA" }))] }))) : invitedLive ? ((0, jsx_runtime_1.jsxs)("span", { style: { display: 'inline-flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void copyInviteLink(), disabled: busy, style: { ...btnStyle(false), padding: '3px 8px', fontSize: theme_js_1.FS.tag, whiteSpace: 'nowrap' }, title: "\u590D\u5236\u4E00\u6BB5\u53EF\u4EE5\u76F4\u63A5\u7C98\u7ED9\u5BF9\u65B9\u7684\u8BDD\uFF08\u542B\u9080\u8BF7\u94FE\u63A5 + \u600E\u4E48\u63A5\u5165\uFF09", children: copiedLink ? '✓ 已复制' : '📋 复制邀请话术' }), inviteCopyErr && ((0, jsx_runtime_1.jsxs)("div", { style: { flexBasis: '100%', fontSize: theme_js_1.FS.tag, color: '#b06000', lineHeight: 1.5 }, children: ["\u26A0 ", inviteCopyErr] })), inviteCopyFallback && ((0, jsx_runtime_1.jsx)("textarea", { readOnly: true, value: inviteCopyFallback, onFocus: (e) => e.currentTarget.select(), style: { flexBasis: '100%', width: '100%', minHeight: 96, fontSize: theme_js_1.FS.tag,
                                              fontFamily: 'monospace', lineHeight: 1.5 } }))] })) : seatLocked ? ((0, jsx_runtime_1.jsx)("span", { title: "\u7B7E\u540D\u4F4D\u7531\u5C71\u6D77\u7B7E\u540D\u670D\u52A1\u6301\u6709\uFF0C\u53EA\u8D1F\u8D23\u4E3A\u300C\u8FC7\u7A0B\u672A\u88AB\u7BE1\u6539\u300D\u76D6\u6700\u7EC8\u6548\u529B\u7AE0\uFF0C\u4E0D\u5BF9\u5916\u9080\u8BF7", style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, whiteSpace: 'nowrap' }, children: "\uD83D\uDD12 \u5E73\u53F0\u4E13\u5C5E \u00B7 \u4E0D\u53EF\u9080\u8BF7" })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => props.onInvite(), disabled: busy, style: {
                                      ...btnStyle(props.inviteOpen === true),
                                      padding: props.inviteOpen === true ? '4px 12px' : '3px 8px',
                                      fontSize: theme_js_1.FS.tag,
                                      whiteSpace: 'nowrap',
                                  }, title: props.inviteOpen ? '收起邀请栏' : '给这一位发一张加入码（座位类型跟着这张卡走）', children: props.inviteOpen ? '收起 ▴' : '🔑 邀请' })), node.undeletable ? null : ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => props.onDelete(node), disabled: busy, style: btnStyle(false), children: isDeleting ? '确认?' : '删除' }))] })) }), resetArm ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                          marginTop: 8,
                          padding: '8px 10px',
                          border: '1px solid #2f6f4e',
                          borderRadius: 8,
                          background: '#f2f8f4',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6,
                      }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: '#2f6f4e', fontWeight: 600 }, children: ["\uD83D\uDD11 \u6362\u4E00\u628A\u65B0\u94A5\u5319\u7ED9 ", primaryHolder?.name || '这个 Agent', "\uFF1F"] }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: 1.5 }, children: ["\u65B0\u94A5\u5319\u653E\u8FDB\u4FDD\u9669\u7BB1\uFF0C\u5B83\u4E0B\u6B21\u6765\u9886\u4EFB\u52A1\u65F6\u81EA\u5DF1\u53D6\u8D70\u3002", (0, jsx_runtime_1.jsx)("b", { children: "\u4E0D\u4F1A\u5F53\u573A\u65AD\u5F00" }), " \u2014\u2014 \u65E7\u94A5\u5319 24 \u5C0F\u65F6\u5185\u4ECD\u53EF\u7528\uFF0C\u53D6\u8D70\u540E\u81EA\u52A8\u4F5C\u5E9F\u3002"] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setResetArm(false); props.onResetKey(holders[0]?.agentId ?? ''); }, disabled: busy, style: { ...btnStyle(true), background: '#2f6f4e', borderColor: '#2f6f4e', fontSize: theme_js_1.FS.tag }, title: "\u751F\u6210\u65B0\u94A5\u5319\u653E\u8FDB\u4FDD\u9669\u7BB1\uFF0CAgent \u4E0B\u6B21\u6765\u9886\u4EFB\u52A1\u65F6\u81EA\u5DF1\u53D6\u8D70", children: "\u786E\u8BA4\u91CD\u7F6E" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setResetArm(false), disabled: busy, style: { ...btnStyle(false), fontSize: theme_js_1.FS.tag }, children: "\u53D6\u6D88" })] })] })) : null] }));
      }
      function KaipuOnboardOverlay(props) {
          const [name, setName] = (0, react_1.useState)('');
          const [closed, setClosed] = (0, react_1.useState)(false);
          if (closed)
              return null;
          const v = name.trim();
          const regions = props.regions ?? [];
          const regionKey = props.regionKey ?? '';
          const regionsReady = props.regions !== null && props.regions !== undefined;
          const canGo = v.length > 0 && props.busy !== true && regionKey.length > 0;
          const submit = () => { if (canGo)
              props.onCreate(v); };
          return ((0, jsx_runtime_1.jsxs)("div", { style: {
                  position: 'absolute',
                  inset: 0,
                  zIndex: 30,
                  borderRadius: 12,
                  background: 'color-mix(in srgb, var(--dsh-bg, #fff) 82%, transparent)',
                  backdropFilter: 'blur(2px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '28px 20px',
                  boxSizing: 'border-box',
                  textAlign: 'center',
              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                          position: 'absolute', top: 10, right: 12,
                          display: 'flex', alignItems: 'center', gap: 12,
                      }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setClosed(true); props.onClose?.(false); }, style: {
                                  background: 'transparent', border: 'none', cursor: 'pointer',
                                  color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag, padding: '4px 8px',
                                  textDecoration: 'underline', fontFamily: 'inherit',
                              }, title: "\u8FD9\u6B21\u5148\u4E0D\u5EFA\uFF0C\u4E0B\u6B21\u8FDB\u6765\u8FD8\u4F1A\u63D0\u793A", children: "\u5148\u770B\u770B\u573A\u5730" }), props.allowDismiss !== false ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setClosed(true); props.onClose?.(true); }, style: {
                                  background: 'transparent', border: 'none', cursor: 'pointer',
                                  color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag, padding: '4px 8px',
                                  fontFamily: 'inherit',
                                  opacity: 0.85,
                              }, title: "\u4EE5\u540E\u4E0D\u518D\u81EA\u52A8\u5F39\u8FD9\u5757\u677F\uFF08\u60F3\u518D\u770B\u5230\uFF1A\u66F4\u591A \u2192 \u5F00\u4E00\u4E2A\u65B0\u94FA\u5B50\uFF09", children: "\u6211\u5DF2\u770B\u8FC7\uFF0C\u4E0D\u518D\u63D0\u793A" })) : null] }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: 26, fontWeight: 700, letterSpacing: 1, color: theme_js_1.C.text, marginBottom: 8 }, children: "\u4ECA\u5929\u4F60 kaipu \u4E86\u5417\uFF1F" }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.base, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal, marginBottom: 22, maxWidth: 460 }, children: "\u7ED9\u4F60\u7684\u94FA\u5B50\u8D77\u4E2A\u540D\u5B57\uFF0C\u8FD9\u4E2A\u5EA7\u4F4D\u5C31\u662F\u4F60\u7684\u3002\u4EE5\u540E\u4F60\u7684\u4EBA\u3001\u4F60\u7684 Agent\u3001\u4F60\u7684\u9879\u76EE\uFF0C\u90FD\u4ECE\u8FD9\u91CC\u5F00\u59CB\u3002" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 10, width: '100%', maxWidth: 520, alignItems: 'stretch' }, children: [(0, jsx_runtime_1.jsx)("input", { autoFocus: true, value: name, onChange: (e) => setName(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter')
                                  submit(); }, placeholder: "\u6BD4\u5982\uFF1A\u75AF\u72C2\u516D\u54E5", style: {
                                  flex: 1,
                                  boxSizing: 'border-box',
                                  padding: '14px 18px',
                                  borderRadius: 10,
                                  border: `2px solid ${v.length > 0 ? theme_js_1.C.accent : theme_js_1.C.border}`,
                                  background: 'var(--dsh-bg, #fff)',
                                  color: theme_js_1.C.text,
                                  fontSize: 17,
                                  fontWeight: 500,
                                  outline: 'none',
                                  boxShadow: v.length > 0 ? '0 0 0 4px rgba(59,111,224,0.12)' : 'none',
                                  transition: 'border-color .15s, box-shadow .15s',
                              } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: submit, disabled: !canGo, style: {
                                  ...btnStyle(true),
                                  padding: '0 26px',
                                  fontSize: 16,
                                  fontWeight: 600,
                                  borderRadius: 10,
                                  opacity: canGo ? 1 : 0.5,
                                  cursor: canGo ? 'pointer' : 'not-allowed',
                                  whiteSpace: 'nowrap',
                              }, children: props.busy === true ? '开铺中…' : '创建你的开铺工位' })] }), (0, jsx_runtime_1.jsxs)("div", { style: { width: '100%', maxWidth: 520, marginTop: 14, textAlign: 'left' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginBottom: 6 }, children: "\u94FA\u5B50\u843D\u5728\u54EA\u4E2A\u533A" }), (0, jsx_runtime_1.jsx)("select", { value: regionKey, onChange: (e) => props.onRegionChange?.(e.target.value), disabled: !regionsReady || regions.length === 0, style: {
                                  width: '100%',
                                  boxSizing: 'border-box',
                                  padding: '12px 14px',
                                  borderRadius: 10,
                                  border: `2px solid ${regionKey.length > 0 ? theme_js_1.C.border : theme_js_1.C.accent}`,
                                  background: 'var(--dsh-bg, #fff)',
                                  color: regionKey.length > 0 ? theme_js_1.C.text : theme_js_1.C.dim,
                                  fontSize: 15,
                                  outline: 'none',
                                  cursor: regionsReady ? 'pointer' : 'default',
                              }, children: !regionsReady ? ((0, jsx_runtime_1.jsx)("option", { value: "", children: "\u6B63\u5728\u8BFB\u53D6\u53EF\u9009\u533A\u57DF\u2026" })) : regions.length === 0 ? ((0, jsx_runtime_1.jsx)("option", { value: "", children: "\u6682\u65F6\u6CA1\u6709\u5F00\u653E\u7684\u533A\uFF0C\u8BF7\u8054\u7CFB\u6211\u4EEC" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [regionKey.length === 0 ? (0, jsx_runtime_1.jsx)("option", { value: "", children: "\u8BF7\u9009\u62E9\u533A\u57DF" }) : null, regions.map((r) => ((0, jsx_runtime_1.jsx)("option", { value: r.label, children: r.label }, r.label)))] })) }), regionsReady && regions.length > 0 && regionKey.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, marginTop: 6 }, children: "\u9009\u597D\u533A\u624D\u80FD\u521B\u5EFA \u2014\u2014 \u94FA\u5B50\u7684\u95E8\u724C\u53F7\u4F1A\u6309\u8FD9\u4E2A\u533A\u6765\u6392\u53F7\u3002" })) : null] }), v.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, marginTop: 10 }, children: "\u76F4\u63A5\u56DE\u8F66\u4E5F\u884C" })) : null] }));
      }
      function EmptySeat(props) {
          const [adding, setAdding] = (0, react_1.useState)(false);
          const [name, setName] = (0, react_1.useState)('');
          const canAdd = props.canAdd === true;
          const submit = () => {
              const v = name.trim();
              if (v.length === 0 || props.busy === true)
                  return;
              props.onAdd?.(v);
              setName('');
              setAdding(false);
          };
          if (canAdd && adding) {
              return ((0, jsx_runtime_1.jsxs)("div", { style: {
                      border: `1px solid ${theme_js_1.C.accent}`,
                      borderRadius: 10,
                      padding: '8px 10px',
                      minHeight: 78,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: 6,
                  }, children: [(0, jsx_runtime_1.jsx)("input", { autoFocus: true, value: name, onChange: (e) => setName(e.target.value), onKeyDown: (e) => {
                              if (e.key === 'Enter')
                                  submit();
                              if (e.key === 'Escape') {
                                  setAdding(false);
                                  setName('');
                              }
                          }, placeholder: "\u65B0\u5DE5\u4F4D\u540D\u5B57\uFF0C\u5982\u300C\u524D\u7AEF\u4F4D\u300D", style: {
                              width: '100%',
                              boxSizing: 'border-box',
                              padding: '5px 7px',
                              borderRadius: 4,
                              border: `1px solid ${theme_js_1.C.border}`,
                              background: 'transparent',
                              color: theme_js_1.C.text,
                              fontSize: theme_js_1.FS.small,
                              outline: 'none',
                          } }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: submit, disabled: name.trim().length === 0 || props.busy === true, style: { ...btnStyle(true), padding: '3px 10px', fontSize: theme_js_1.FS.tag }, children: "\u521B\u5EFA" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setAdding(false); setName(''); }, style: { ...btnStyle(false), padding: '3px 10px', fontSize: theme_js_1.FS.tag }, children: "\u53D6\u6D88" })] })] }));
          }
          return ((0, jsx_runtime_1.jsx)("div", { onClick: () => { if (canAdd)
                  setAdding(true); }, title: canAdd ? '点一下添加工位' : undefined, style: {
                  border: `1px dashed ${theme_js_1.C.border}`,
                  borderRadius: 10,
                  padding: '10px 12px',
                  minHeight: 78,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme_js_1.C.dim,
                  fontSize: theme_js_1.FS.small,
                  cursor: canAdd ? 'pointer' : 'default',
              }, children: canAdd ? '+ 添加工位' : '空位' }));
      }
      function resolveSeatKeyByName(name) {
          const s = (name ?? '').trim();
          if ((0, seat_summary_js_1.isAdvisorSeat)(s, s))
              return 'signature';
          if (s.includes('战略'))
              return 'strategy';
          if (s.includes('管理助理'))
              return 'management_assistant';
          if (s.includes('管理'))
              return 'management';
          if (s.includes('审计'))
              return 'audit';
          if (s.includes('执行'))
              return 'execution';
          return '';
      }
      function EmptySystemSeat(props) {
          const { seatKey, label, seatInfo, locked, onInvite } = props;
          const [showMa, setShowMa] = (0, react_1.useState)(false);
          const isMa = seatKey === 'management_assistant';
          const isLocked = locked === true || seatKey === 'signature';
          const ppl = (() => {
              if (isLocked)
                  return '（已占）';
              if (seatInfo === undefined)
                  return '空';
              const n = Array.isArray(seatInfo.occupants)
                  ? seatInfo.occupants.length
                  : (typeof seatInfo.occupied === 'number' ? seatInfo.occupied : 0);
              if (n > 0)
                  return `${n} 人`;
              const inv = Array.isArray(seatInfo.invited) ? seatInfo.invited.length : 0;
              return inv > 0 ? '已受邀' : '空';
          })();
          return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { title: isLocked ? '山海签名位：平台常驻，不可邀请' : '这一位还没有人 —— 点「邀请」生成工位加入码', style: {
                          border: `1px dashed ${isLocked ? theme_js_1.C.accent : theme_js_1.C.border}`,
                          borderRadius: 10,
                          padding: '8px 10px',
                          minHeight: 78,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6,
                          background: 'transparent',
                      }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600, color: theme_js_1.C.text }, children: label }), (0, jsx_runtime_1.jsx)("span", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: isLocked ? theme_js_1.C.accent : theme_js_1.C.dim }, children: ppl })] }), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: 1.5 }, children: isLocked ? '山海系统默认位' : '还没有人坐这一位' }), isMa ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setShowMa((v) => !v), style: {
                                  ...btnStyle(false),
                                  padding: '3px 8px',
                                  fontSize: theme_js_1.FS.tag,
                                  alignSelf: 'flex-start',
                              }, title: "\u7BA1\u7406\u52A9\u7406\u662F\u4E34\u65F6\u4EE3\u7BA1\uFF1A\u770B\u4E00\u773C\u8FD9\u4E2A\u4F4D\u5E72\u4EC0\u4E48\uFF0C\u4EE5\u53CA\u600E\u4E48\u6307\u5B9A\u4EBA", children: showMa ? '收起 ▴' : '功能介绍与指定 ▾' })) : null, isLocked ? null : ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { if (onInvite)
                                  onInvite(); }, style: { ...btnStyle(false), padding: '3px 8px', fontSize: theme_js_1.FS.tag, alignSelf: 'flex-start' }, title: "\u751F\u6210\u4E00\u5F20\u5DE5\u4F4D\u52A0\u5165\u7801\uFF0C\u53D1\u7ED9\u8981\u5750\u8FD9\u4E00\u4F4D\u7684\u540C\u4E8B", children: "\uD83D\uDD11 \u9080\u8BF7" }))] }), isMa && showMa ? ((0, jsx_runtime_1.jsx)("div", { style: { gridColumn: '1 / -1', border: `1px solid ${theme_js_1.C.border}`, borderRadius: 8, background: '#fff', marginTop: 2 }, children: (0, jsx_runtime_1.jsx)(ManagementGrantSection, { embedded: true }) })) : null] }));
      }
      const STATUS_TEXT = {
          posted: '待领',
          claimed: '已领',
          in_progress: '进行中',
          blocked: '求助中',
          submitted: '待审批',
          accepted: '已完成',
          rejected: '已驳回',
          timeout: '已超时',
          cancelled: '已取消',
          open: '待领',
          done: '已完成',
      };
      function fmtWhen(iso) {
          if (iso === undefined || iso === null || iso === '')
              return '';
          const d = new Date(iso);
          if (Number.isNaN(d.getTime()))
              return iso.slice(0, 16).replace('T', ' ');
          const p = (n) => String(n).padStart(2, '0');
          return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
      }
      function taskWhen(t, st) {
          if (st === 'posted')
              return t.created_at ? { label: '发布', at: t.created_at } : null;
          if (st === 'claimed' || st === 'in_progress' || st === 'blocked') {
              return { label: '领取', at: t.claimed_at ?? t.created_at ?? '' };
          }
          if (st === 'submitted' || st === 'accepted' || st === 'rejected') {
              return { label: '完成', at: t.done_at ?? t.claimed_at ?? t.created_at ?? '' };
          }
          return t.created_at ? { label: '发布', at: t.created_at } : null;
      }
      function statusText(status) {
          return STATUS_TEXT[status] ?? status;
      }
      function normStatus(status) {
          if (status === 'open')
              return 'posted';
          if (status === 'done')
              return 'accepted';
          return status;
      }
      const TASK_SECTIONS = [
          {
              key: 'todo',
              title: '待我处理',
              match: (t, _myId) => ['posted', 'rejected'].includes(normStatus(t.status)),
              empty: '没有要你处理的。有新任务时，卡片上直接有「领取」，一点就开工。',
              openByDefault: false,
          },
          {
              key: 'doing',
              title: '我在做',
              match: (t, myId) => ['claimed', 'in_progress', 'blocked'].includes(normStatus(t.status)) &&
                  (myId === null || t.claimed_by === myId),
              empty: '手上没有在做的任务。',
              openByDefault: false,
          },
          {
              key: 'review',
              title: '已交待审',
              match: (t, _myId) => normStatus(t.status) === 'submitted',
              empty: '没有等审的交付。交了件会自动出现在这里。',
              openByDefault: false,
          },
          {
              key: 'done',
              title: '已完成',
              match: (t, _myId) => ['accepted', 'cancelled', 'timeout'].includes(normStatus(t.status)),
              empty: '还没有完成的。',
              openByDefault: false,
          },
      ];
      const KIND_LABEL = {
          requirement: '需求',
          delivery: '交付',
          report: '回函',
          test: '测试',
      };
      const KIND_COLOR = {
          requirement: '#6366f1',
          delivery: '#0e7490',
          report: '#8a6d3b',
          test: '#9ca3af',
      };
      const PHASE_TO_KIND = {
          requirement: 'requirement',
          plan: 'requirement',
          assignment: 'requirement',
          build: 'requirement',
          review: 'report',
          archived: 'report',
      };
      function phaseToKind(phase) {
          return PHASE_TO_KIND[phase] ?? '';
      }
      function statusTone(status) {
          switch (normStatus(status)) {
              case 'posted':
                  return theme_js_1.C.text;
              case 'claimed':
              case 'in_progress':
                  return LAMP_COLOR.amber;
              case 'blocked':
              case 'rejected':
              case 'timeout':
                  return LAMP_COLOR.red;
              case 'submitted':
                  return LAMP_COLOR.blue;
              case 'accepted':
                  return LAMP_COLOR.green;
              default:
                  return theme_js_1.C.dim;
          }
      }
      const HEARTBEAT_MS = 60_000;
      function toTaskUi(t) {
          return { ...t, status: t.status };
      }
      function isRecord(v) {
          return v !== null && typeof v === 'object' && !Array.isArray(v);
      }
      function str(v) {
          return typeof v === 'string' ? v : '';
      }
      function rowsOf(payload) {
          if (Array.isArray(payload))
              return payload.filter(isRecord);
          if (!isRecord(payload))
              return null;
          for (const key of ['tasks', 'blocked', 'items', 'approvals', 'pending', 'rows', 'list', 'data']) {
              const got = payload[key];
              if (Array.isArray(got))
                  return got.filter(isRecord);
          }
          return null;
      }
      function rowId(row) {
          return str(row.task_id) || str(row.id);
      }
      function rowTitle(row) {
          return str(row.title) || rowId(row) || '（无标题）';
      }
      function rowReason(row) {
          const br = row.blocked_reason;
          if (typeof br === 'string' && br.length > 0)
              return br;
          if (isRecord(br)) {
              const reason = str(br.reason);
              if (reason.length > 0)
                  return reason;
              const kind = str(br.kind);
              if (kind.length > 0)
                  return kind;
          }
          const alt = str(row.reason);
          return alt.length > 0 ? alt : '（服务端未带原因）';
      }
      const NEUTRALITY_LABEL = {
          refusal_used: '拒绝权是否真的用过',
          standard_self: '标准是否对自家也生效',
          evidence_carry: '客户能否自己验完、带走证据',
          replaceable: '席位能否换成第三方',
      };
      async function callAction(method, query) {
          const conn = panelConn;
          if (conn === null) {
              return { ok: false, code: 'no_channel', message: '没有数据通道 —— 工位 host 未加载。' };
          }
          const r = await (0, bridge_js_1.callKaipu)(conn, method, query);
          if (r.ok === true)
              return { ok: true };
          if ('business' in r)
              return { ok: false, code: r.business.code, message: r.business.message };
          return { ok: false, code: r.error.code, message: r.error.detail };
      }
      async function callActionData(method, query) {
          const conn = panelConn;
          if (conn === null)
              return { ok: false, code: 'no_channel', message: '没有数据通道 —— 工位 host 未加载。' };
          const r = await (0, bridge_js_1.callKaipu)(conn, method, query);
          if (r.ok === true)
              return { ok: true, data: r.data };
          if ('business' in r)
              return { ok: false, code: r.business.code, message: r.business.message };
          return { ok: false, code: r.error.code, message: r.error.detail };
      }
      const startTask = (taskId) => callAction('tasksStart', { taskId });
      const blockTask = (taskId, reason) => callAction('tasksBlock', { taskId, reason });
      const unblockTask = (taskId) => callAction('tasksUnblock', { taskId });
      const heartbeatTask = (taskId) => callAction('tasksHeartbeat', { taskId });
      const approveTask = (taskId, approverId, comment) => comment.length > 0
          ? callAction('tasksApprove', { taskId, approverId, comment })
          : callAction('tasksApprove', { taskId, approverId });
      const rejectTask = (taskId, approverId, comment) => comment.length > 0
          ? callAction('tasksReject', { taskId, approverId, comment })
          : callAction('tasksReject', { taskId, approverId });
      async function fetchMyAccountId() {
          const conn = panelConn;
          if (conn === null)
              return null;
          const r = await (0, bridge_js_1.callKaipu)(conn, 'whoami', {});
          if (r.ok !== true)
              return null;
          const id = typeof r.data?.accountId === 'string' ? r.data.accountId : '';
          return id.length > 0 ? id : null;
      }
      async function fetchFlagged(method) {
          const conn = panelConn;
          if (conn === null) {
              return { kind: 'err', code: 'no_channel', message: '没有数据通道 —— 工位 host 未加载。' };
          }
          const r = await (0, bridge_js_1.callKaipu)(conn, method, {});
          if (r.ok === true) {
              const rows = rowsOf(r.data);
              if (rows === null) {
                  return {
                      kind: 'err',
                      code: 'unknown_shape',
                      message: '服务端回体的形状认不出来（既不是数组，也没有 tasks/blocked/items 键）。',
                  };
              }
              return { kind: 'ok', rows };
          }
          if ('business' in r)
              return { kind: 'err', code: r.business.code, message: r.business.message };
          return { kind: 'err', code: r.error.code, message: r.error.detail };
      }
      function canApprove(task, myId) {
          const list = task.approvers;
          if (!Array.isArray(list) || list.length === 0)
              return true;
          if (myId === null)
              return false;
          return list.some((a) => {
              if (typeof a === 'string')
                  return a === myId;
              if (!isRecord(a))
                  return false;
              return str(a.account_id) === myId || str(a.accountId) === myId || str(a.id) === myId;
          });
      }
      async function callPack(method, query) {
          const conn = panelConn;
          if (conn === null) {
              return { ok: false, code: 'no_channel', message: '没有数据通道 —— 工位 host 未加载。' };
          }
          const r = await (0, bridge_js_1.callKaipu)(conn, method, query);
          if (r.ok === true)
              return { ok: true, data: r.data };
          if ('business' in r)
              return { ok: false, code: r.business.code, message: r.business.message };
          return { ok: false, code: r.error.code, message: r.error.detail };
      }
      const PACK_MAX_BYTES = 8 * 1024 * 1024;
      function newUuid() {
          const c = globalThis.crypto;
          if (c !== undefined && typeof c.randomUUID === 'function')
              return c.randomUUID();
          const b = new Uint8Array(16);
          if (c !== undefined && typeof c.getRandomValues === 'function') {
              c.getRandomValues(b);
          }
          else {
              for (let i = 0; i < 16; i += 1)
                  b[i] = Math.floor(Math.random() * 256);
          }
          b[6] = (b[6] & 0x0f) | 0x40;
          b[8] = (b[8] & 0x3f) | 0x80;
          const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
          return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
      }
      function fmtBytes(n) {
          const v = typeof n === 'number' && Number.isFinite(n) ? n : 0;
          if (v < 1024)
              return `${v} B`;
          if (v < 1024 * 1024)
              return `${(v / 1024).toFixed(1)} KB`;
          return `${(v / (1024 * 1024)).toFixed(1)} MB`;
      }
      function readFileAsBase64(file) {
          return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                  const s = typeof reader.result === 'string' ? reader.result : '';
                  const comma = s.indexOf(',');
                  resolve(comma >= 0 ? s.slice(comma + 1) : s);
              };
              reader.onerror = () => reject(new Error('读取文件失败'));
              reader.readAsDataURL(file);
          });
      }
      function triggerDownload(base64, filename, contentType) {
          const bin = atob(base64);
          const bytes = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i += 1)
              bytes[i] = bin.charCodeAt(i);
          const blob = new Blob([bytes], { type: contentType || 'application/octet-stream' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 2000);
      }
      function fmtRemain(sec) {
          if (sec <= 0)
              return '已到期';
          const h = Math.floor(sec / 3600);
          const m = Math.floor((sec % 3600) / 60);
          if (h >= 24) {
              const d = Math.floor(h / 24);
              return `还剩 ${d} 天 ${h % 24} 小时`;
          }
          if (h > 0)
              return `还剩 ${h} 小时 ${m} 分`;
          return `还剩 ${m} 分`;
      }
      function ttlLabel(h) {
          if (h === 24)
              return '24 小时（一次性代班）';
          if (h === 72)
              return '72 小时（跨周末）';
          if (h === 168)
              return '1 周（休假代班）';
          return `${h} 小时`;
      }
      function grantErrText(code, message) {
          const c = (code || '').toLowerCase();
          const m = (message || '').toLowerCase();
          if (c.includes('unauthor') || c.includes('401') || c.includes('token') ||
              c.includes('no_channel') || c.includes('not_configured') || c.includes('forbidden') ||
              m.includes('401') || m.includes('令牌') || m.includes('/auth/')) {
              return '当前身份读不到授权记录，重新登录一下再试';
          }
          return message;
      }
      function ManagementGrantSection({ embedded }) {
          const [rows, setRows] = (0, react_1.useState)(null);
          const [ttlOptions, setTtlOptions] = (0, react_1.useState)([24, 72, 168]);
          const [err, setErr] = (0, react_1.useState)(null);
          const [busy, setBusy] = (0, react_1.useState)(false);
          const [ttl, setTtl] = (0, react_1.useState)(24);
          const [note, setNote] = (0, react_1.useState)('');
          const [expanded, setExpanded] = (0, react_1.useState)(false);
          const [issued, setIssued] = (0, react_1.useState)(null);
          const [copied, setCopied] = (0, react_1.useState)(false);
          const [seatAgents, setSeatAgents] = (0, react_1.useState)([]);
          const [pickAgent, setPickAgent] = (0, react_1.useState)('');
          const refresh = async () => {
              const r = await callPack('grantList', {});
              if (r.ok) {
                  setRows(Array.isArray(r.data.grants) ? r.data.grants : []);
                  if (Array.isArray(r.data.ttlOptions) && r.data.ttlOptions.length > 0) {
                      setTtlOptions(r.data.ttlOptions);
                  }
                  setErr(null);
              }
              else {
                  console.warn('[grantList]', r.code, r.message);
                  setErr({ code: r.code, message: r.message });
                  setRows(null);
              }
          };
          (0, react_1.useEffect)(() => {
              void refresh();
          }, []);
          (0, react_1.useEffect)(() => {
              void (async () => {
                  const r = await callPack('rolesSeats', {});
                  if (!r.ok)
                      return;
                  const out = [];
                  const seen = new Set();
                  for (const st of Array.isArray(r.data.seats) ? r.data.seats : []) {
                      for (const o of st.occupants ?? []) {
                          const id = String(o.id ?? '');
                          if (!id || seen.has(id))
                              continue;
                          seen.add(id);
                          out.push({ agentId: id, name: String(o.name ?? id), lamp: String(st.seat ?? '') });
                      }
                  }
                  setSeatAgents(out);
              })();
          }, []);
          const seatLabelOf = (k) => seat_summary_js_1.SEAT_LABELS[k] ?? k;
          const onAssign = async () => {
              if (pickAgent === '')
                  return;
              const who = seatAgents.find((a) => a.agentId === pickAgent);
              setBusy(true);
              setErr(null);
              const r = await callPack('grantCreate', {
                  granteeId: pickAgent,
                  ttlHours: ttl,
                  ...(who ? { name: who.name } : {}),
                  ...(note.trim().length > 0 ? { note: note.trim() } : {}),
              });
              setBusy(false);
              if (!r.ok) {
                  console.warn('[grantCreate]', r.code, r.message);
                  setErr({ code: r.code, message: r.message });
                  return;
              }
              setPickAgent('');
              setNote('');
              await refresh();
          };
          const onGenerate = async () => {
              setBusy(true);
              setErr(null);
              setCopied(false);
              const r = await callPack('grantGenerate', {
                  ttlHours: ttl,
                  ...(note.trim().length > 0 ? { note: note.trim() } : {}),
              });
              setBusy(false);
              if (!r.ok) {
                  console.warn('[grantGenerate]', r.code, r.message);
                  setErr({ code: r.code, message: r.message });
                  return;
              }
              setIssued(r.data);
              setNote('');
              await refresh();
          };
          const onCopy = async () => {
              if (issued === null)
                  return;
              const text = (0, grant_copy_js_1.grantCopyText)(issued.code, issued.ttlHours, issued.codeExpiresAt);
              try {
                  await navigator.clipboard.writeText(text);
                  setCopied(true);
              }
              catch {
                  setCopied(false);
                  setErr({ code: 'clipboard', message: '这段文字就摆在下面，手动选中复制也一样' });
              }
          };
          const onRevoke = async (gid) => {
              setBusy(true);
              setErr(null);
              const r = await callPack('grantRevoke', { grantId: gid, reason: '管理位手工收回' });
              setBusy(false);
              if (!r.ok) {
                  console.warn('[grantRevoke]', r.code, r.message);
                  setErr({ code: r.code, message: r.message });
                  return;
              }
              await refresh();
          };
          const pending = (rows ?? []).filter((x) => x.status === 'available');
          const active = (rows ?? []).filter((x) => x.status === 'active');
          const history = (rows ?? []).filter((x) => x.status !== 'active' && x.status !== 'available');
          const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [err !== null && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: '#b3261e', marginBottom: 6 }, children: grantErrText(err.code, err.message) })), rows === null ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: 'rgba(0,0,0,.55)' }, children: "\u8BFB\u53D6\u6388\u6743\u53F0\u8D26\u4E2D\u2026" })) : active.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: 'rgba(0,0,0,.55)' }, children: "\u5F53\u524D\u6CA1\u6709\u4EBA\u5728\u4EE3\u7BA1\u3002\u7BA1\u7406\u4F4D\u51FA\u5DEE\u6216\u4F11\u5047\u65F6\uFF0C\u53EF\u4EE5\u501F\u4E00\u6BB5\u65F6\u95F4\u7684\u4EE3\u7BA1\u6743\u51FA\u53BB\u3002" })) : ((0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: active.map((g) => ((0, jsx_runtime_1.jsxs)("div", { style: { border: '1px solid #cfe3de', background: 'rgba(44,110,99,0.05)', borderRadius: 8, padding: '6px 10px', fontSize: theme_js_1.FS.small }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600 }, children: (0, grant_copy_js_1.granteeLabel)(g.granteeName, g.granteeId) }), (0, grant_copy_js_1.granteeUnknown)(g.granteeName) ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\uFF08\u5DF2\u5151\u6362\uFF09" })) : null, (0, jsx_runtime_1.jsx)("span", { style: { color: '#2c6e63', fontWeight: 600 }, children: fmtRemain(g.remainingSeconds) }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void onRevoke(g.grantId), disabled: busy, style: btnStyle(false), children: "\u6536\u56DE" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.dim, marginTop: 2, fontSize: theme_js_1.FS.tag }, children: ["\u4EE3\u7BA1\u671F ", ttlLabel(g.ttlHours), " \u00B7 \u5230\u671F\u81EA\u52A8\u8F6C\u4E3A\u6267\u884C\u4F4D \u00B7 \u6536\u56DE\u7ACB\u5373\u5931\u6548"] })] }, g.grantId))) })), pending.length > 0 && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 8, display: 'flex', flexDirection: 'column', gap: 5 }, children: pending.map((g) => {
                          const left = (0, grant_copy_js_1.codeLeftText)(g.codeExpiresAt);
                          return ((0, jsx_runtime_1.jsxs)("div", { style: { border: `1px dashed ${theme_js_1.C.border}`, borderRadius: 8, padding: '6px 10px', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.text, fontWeight: 600 }, children: "\u5DF2\u751F\u6210 \u00B7 \u672A\u5151\u6362" }), (0, jsx_runtime_1.jsx)("span", { children: left }), (0, jsx_runtime_1.jsx)("span", { children: ttlLabel(g.ttlHours) }), (0, jsx_runtime_1.jsx)("span", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void onRevoke(g.grantId), disabled: busy, style: btnStyle(false), children: "\u4F5C\u5E9F" })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 2 }, children: "\u7801\u53EA\u5728\u751F\u6210\u65F6\u663E\u793A\u4E00\u6B21\uFF1B\u627E\u4E0D\u5230\u5C31\u4F5C\u5E9F\u91CD\u65B0\u751F\u6210\u4E00\u5F20\u3002" })] }, g.grantId));
                      }) })), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 8 }, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setExpanded(!expanded), style: btnStyle(false), children: expanded ? '收起' : '＋ 授权一个人临时代管' }) }), expanded && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u9009\u4E00\u4F4D\u5DF2\u7ECF\u5728\u672C\u94FA\u7684 Agent\uFF0C\u501F\u4ED6\u4E00\u6BB5\u4EE3\u7BA1\u6743\uFF08\u5230\u671F\u81EA\u52A8\u56DE\u6267\u884C\u4F4D\uFF09" }), (0, jsx_runtime_1.jsxs)("select", { value: pickAgent, onChange: (e) => setPickAgent(e.target.value), style: { padding: '4px 6px', fontSize: theme_js_1.FS.small, borderRadius: 4, border: '1px solid rgba(0,0,0,.18)' }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "\u2014 \u9009\u4E00\u4F4D Agent \u2014" }), seatAgents.length === 0 ? ((0, jsx_runtime_1.jsx)("option", { value: "", disabled: true, children: "\uFF08\u672C\u94FA\u8FD8\u6CA1\u6709\u53EF\u6307\u6D3E\u7684 Agent\uFF09" })) : seatAgents.map((a) => ((0, jsx_runtime_1.jsxs)("option", { value: a.agentId, children: [a.name, a.lamp ? ` · ${seatLabelOf(a.lamp)}` : ''] }, a.agentId)))] }), (0, jsx_runtime_1.jsx)("select", { value: ttl, onChange: (e) => setTtl(Number(e.target.value)), style: { padding: '4px 6px', fontSize: theme_js_1.FS.small, borderRadius: 4, border: '1px solid rgba(0,0,0,.18)' }, children: ttlOptions.map((h) => ((0, jsx_runtime_1.jsx)("option", { value: h, children: ttlLabel(h) }, h))) }), (0, jsx_runtime_1.jsx)("input", { value: note, onChange: (e) => setNote(e.target.value), placeholder: "\u5907\u6CE8\uFF08\u53EF\u9009\uFF0C\u5982\uFF1A\u6211\u51FA\u5DEE\u4E09\u5929\uFF09", style: { padding: '4px 6px', fontSize: theme_js_1.FS.small, borderRadius: 4, border: '1px solid rgba(0,0,0,.18)' } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void onAssign(), disabled: busy || pickAgent === '', style: btnStyle(pickAgent !== ''), children: busy ? '生效中…' : '指派为管理助理' }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: ["\u5BF9\u65B9\u8FD8\u6CA1\u8FDB\u94FA\uFF1F", (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void onGenerate(), disabled: busy, style: { ...btnStyle(false), padding: '2px 8px', fontSize: theme_js_1.FS.tag }, children: "\u751F\u6210\u4E00\u5F20\u6388\u6743\u7801\u7ED9\u4ED6" })] }), issued !== null && ((0, jsx_runtime_1.jsxs)("div", { style: {
                                  marginTop: 4, border: '1px solid rgba(200,136,31,0.45)', background: 'rgba(200,136,31,0.06)',
                                  borderRadius: 8, padding: '9px 11px',
                              }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u628A\u8FD9\u6BB5\u53D1\u7ED9\u5BF9\u65B9\uFF08\u7801\u53EA\u5728\u8FD9\u4E00\u6B21\u663E\u793A\uFF09" }), (0, jsx_runtime_1.jsx)("div", { style: {
                                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                                          fontSize: theme_js_1.FS.small, fontWeight: 700, letterSpacing: '.06em',
                                          color: '#A66A12', margin: '5px 0 7px', wordBreak: 'break-all',
                                      }, children: issued.code }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void onCopy(), style: btnStyle(false), children: copied ? '✓ 已复制' : '📋 复制这段，发给对方' }), (0, jsx_runtime_1.jsx)("pre", { style: {
                                          margin: '7px 0 0', padding: '7px 9px', borderRadius: 6, background: 'rgba(0,0,0,.03)',
                                          fontSize: theme_js_1.FS.tag, color: theme_js_1.C.text, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                          fontFamily: 'inherit', lineHeight: 1.6,
                                      }, children: (0, grant_copy_js_1.grantCopyText)(issued.code, issued.ttlHours, issued.codeExpiresAt) }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 5 }, children: ["\u7801\u5230 ", String(issued.codeExpiresAt).slice(0, 10), " \u524D\u90FD\u80FD\u5151\u6362 \u00B7 \u5151\u6362\u540E\u4ECE\u90A3\u4E00\u523B\u8D77\u7B97 ", ttlLabel(issued.ttlHours)] })] })), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: 'rgba(0,0,0,.5)', lineHeight: 1.6 }, children: ["\u00B7 ", (0, jsx_runtime_1.jsx)("b", { children: "\u5151\u6362\u90A3\u4E00\u523B\u5F00\u59CB\u8BA1\u65F6" }), "\uFF08\u4E0D\u662F\u751F\u6210\u90A3\u4E00\u523B\uFF0C\u4E5F\u4E0D\u662F\u5BF9\u65B9\u9996\u6B21\u4F7F\u7528\uFF09", (0, jsx_runtime_1.jsx)("br", {}), "\u00B7 \u4EE3\u7BA1\u671F\u95F4\u53EF\u505A\uFF1A\u6D3E\u6D3B/\u4EA4\u6D3B/\u4F20\u8D44\u6599/\u53D1\u8D77\u5BA1\u8BA1/\u5EFA\u9879\u76EE/\u6539\u540D", (0, jsx_runtime_1.jsx)("br", {}), "\u00B7 ", (0, jsx_runtime_1.jsx)("b", { children: "\u4E0D\u80FD\u505A" }), "\uFF1A\u540A\u9500\u8EAB\u4EFD\u3001\u6362\u5BC6\u94A5\u3001\u8C03\u5EA7\u4F4D\u3001\u53D1\u9080\u8BF7\u3001\u5BA1\u6279\u901A\u8FC7\u3001\u5F52\u6863\u51BB\u7ED3\u3001\u5BFC\u51FA\u6570\u636E", (0, jsx_runtime_1.jsx)("br", {}), "\u00B7 \u6536\u56DE", (0, jsx_runtime_1.jsx)("b", { children: "\u7ACB\u5373\u751F\u6548" }), "\uFF1B\u5230\u671F", (0, jsx_runtime_1.jsx)("b", { children: "\u81EA\u52A8\u8F6C\u6267\u884C\u4F4D" }), "\u5E76\u7559\u8F6C\u6362\u8BB0\u5F55"] })] })), history.length > 0 && ((0, jsx_runtime_1.jsxs)("details", { style: { marginTop: 8 }, children: [(0, jsx_runtime_1.jsxs)("summary", { style: { cursor: 'pointer', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: ["\u5386\u53F2\uFF08", history.length, " \u6761\uFF09"] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 4, display: 'flex', flexDirection: 'column', gap: 3 }, children: history.map((g) => ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: [(0, grant_copy_js_1.granteeLabel)(g.granteeName, g.granteeId), " \u00B7 ", ttlLabel(g.ttlHours), " \u00B7", ' ', g.status === 'expired' ? '已自然到期' : g.status === 'revoked' ? '已收回' : '已作废'] }, g.grantId))) })] }))] }));
          if (embedded === true) {
              return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '8px 10px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: 1.7, marginBottom: 8 }, children: ["\u4E34\u65F6\u66FF\u7BA1\u7406\u4F4D\u6253\u7406\u5DE5\u4F4D\u4E8B\u52A1\u7684\u4EBA\uFF0C", (0, jsx_runtime_1.jsx)("b", { children: "\u4E0D\u5360\u6B63\u5F0F\u5E2D\u4F4D" }), "\u3001\u6709\u65F6\u95F4\u9650\u5236\uFF1B \u5151\u6362\u90A3\u4E00\u523B\u5F00\u59CB\u8BA1\u65F6\uFF0C\u5230\u671F\u81EA\u52A8\u8F6C\u6267\u884C\u4F4D\u3002\u4EE3\u7BA1\u671F\u95F4\u4E0D\u80FD\u540A\u9500\u8EAB\u4EFD\u3001\u6362\u5BC6\u94A5\u3001\u53D1\u9080\u8BF7\u3001\u5BA1\u6279\u3002"] }), body] }));
          }
          return (0, jsx_runtime_1.jsx)(Section, { title: "\u7BA1\u7406\u52A9\u7406\uFF08\u4E34\u65F6\u4EE3\u7BA1\uFF09", children: body });
      }
      function groupPacks(rows) {
          const map = new Map();
          for (const r of rows) {
              const pname = (r.projectName ?? '').trim();
              const pid = (r.projectId ?? '').trim();
              const key = pid !== '' ? `id:${pid}` : pname !== '' ? `name:${pname}` : '__none__';
              const g = map.get(key) ?? {
                  key,
                  name: pname !== '' ? pname : '未项目（有任务）',
                  rows: [],
                  files: 0,
                  lastAt: '',
              };
              g.rows.push(r);
              g.files += Number.isFinite(r.files) ? r.files : 0;
              if (typeof r.lastAt === 'string' && r.lastAt > g.lastAt)
                  g.lastAt = r.lastAt;
              map.set(key, g);
          }
          const out = [...map.values()];
          for (const g of out) {
              g.rows.sort((a, b) => (String(a.lastAt) < String(b.lastAt) ? 1 : -1));
          }
          const canTellWhat = (r) => {
              if ((r.title ?? '').trim() !== '')
                  return true;
              if ((r.firstFile ?? '').trim() !== '')
                  return true;
              if ((r.projectId ?? '').trim() !== '')
                  return true;
              if ((r.projectName ?? '').trim() !== '')
                  return true;
              return false;
          };
          const visible = out.map((g) => ({ ...g, rows: g.rows.filter(canTellWhat) }));
          const kept = visible.filter((g) => {
              if (g.rows.length === 0)
                  return false;
              if (g.key !== '__none__')
                  return true;
              return g.rows.some((r) => (r.title ?? '').trim().length > 0);
          });
          kept.sort((a, b) => (a.lastAt < b.lastAt ? 1 : -1));
          return kept;
      }
      function packLabel(r) {
          const t = (r.title ?? '').trim();
          if (t !== '')
              return t;
          const f = (r.firstFile ?? '').trim();
          if (f !== '') {
              const dot = f.lastIndexOf('.');
              return dot > 0 ? f.slice(0, dot) : f;
          }
          const p = (r.projectName ?? '').trim();
          if (p !== '')
              return p;
          const n = Number.isFinite(r.files) ? r.files : 0;
          return n > 0 ? `未命名交付（${n} 个文件）` : '未命名交付';
      }
      function fmtDay(iso) {
          const s = String(iso ?? '');
          return s.length >= 10 ? s.slice(0, 10) : s;
      }
      function PackLifecycle({ iid }) {
          const [pending, setPending] = (0, react_1.useState)(false);
          const [after, setAfter] = (0, react_1.useState)(null);
          const [busy, setBusy] = (0, react_1.useState)(false);
          const [arm, setArm] = (0, react_1.useState)(false);
          const [msg, setMsg] = (0, react_1.useState)(null);
          (0, react_1.useEffect)(() => {
              if (iid.trim().length === 0) {
                  setPending(false);
                  setAfter(null);
                  return;
              }
              void (async () => {
                  const r = await (0, live_js_1.purgeStatus)(iid.trim());
                  if (r.ok) {
                      setPending(r.data.pending);
                      setAfter(r.data.deleteAfter);
                  }
              })();
          }, [iid]);
          if (iid.trim().length === 0)
              return null;
          const doExport = async () => {
              setBusy(true);
              setMsg(null);
              const r = await (0, live_js_1.exportPack)(iid.trim());
              setBusy(false);
              if (!r.ok) {
                  const gone = r.code === 'not_found' || /404/.test(r.message);
                  setMsg(gone
                      ? `这次协作（${iid.trim()}）没有资料可下载 —— 目录不存在，可能是历史交互 ID 或从没传过文件。换一个交互 ID 试试，或先「＋ 传文件」。`
                      : `下载失败：${r.message}`);
                  return;
              }
              triggerDownload(r.data.dataBase64, r.data.filename, 'application/zip');
              setMsg(`已下载 ${Math.max(1, Math.round(r.data.bytes / 1024))} KB。需要清理时点右边「删除这个包」。`);
          };
          const doPurge = async () => {
              setBusy(true);
              setArm(false);
              setMsg(null);
              const r = await (0, live_js_1.purgePack)(iid.trim());
              setBusy(false);
              if (!r.ok) {
                  setMsg(`排定失败：${r.message}`);
                  return;
              }
              setPending(true);
              setAfter(r.data.deleteAfter);
              setMsg('已排定：24 小时后自动删除。这期间可以取消。');
          };
          const doCancel = async () => {
              setBusy(true);
              setMsg(null);
              const r = await (0, live_js_1.cancelPurge)(iid.trim());
              setBusy(false);
              if (!r.ok) {
                  setMsg(`取消失败：${r.message}`);
                  return;
              }
              setPending(false);
              setAfter(null);
              setMsg('已取消删除。资料保留。');
          };
          const when = after === null ? '' : after.replace('T', ' ').replace('Z', ' UTC');
          return ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 10, padding: '8px 10px', borderRadius: 6,
                  background: pending ? 'rgba(192,57,43,.06)' : 'rgba(0,0,0,.03)',
                  border: pending ? '1px solid rgba(192,57,43,.3)' : '1px solid rgba(0,0,0,.08)' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600 }, children: "\u8FD9\u4E2A\u5305" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void doExport(), disabled: busy, style: { ...btnStyle(false), fontSize: theme_js_1.FS.small }, children: "\u6253\u5305\u4E0B\u8F7D" }), pending ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.small, color: '#c0392b' }, children: ["\u5C06\u4E8E ", when, " \u81EA\u52A8\u5220\u9664"] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void doCancel(), disabled: busy, style: { ...btnStyle(false), fontSize: theme_js_1.FS.small }, children: "\u53D6\u6D88\u5220\u9664" })] })) : arm ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: '#c0392b' }, children: "\u786E\u5B9A\u8981\u6392\u5B9A\u5220\u9664\uFF1F" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void doPurge(), disabled: busy, style: { ...btnStyle(false), fontSize: theme_js_1.FS.small, background: '#c0392b', color: '#fff', border: 'none' }, children: "\u786E\u8BA4" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setArm(false), disabled: busy, style: { ...btnStyle(false), fontSize: theme_js_1.FS.small }, children: "\u4E0D\u4E86" })] })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setArm(true), disabled: busy, style: { ...btnStyle(false), fontSize: theme_js_1.FS.small, border: '1px solid #c0392b', color: '#c0392b' }, children: "\u5220\u9664\u8FD9\u4E2A\u5305" }))] }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, opacity: 0.7, marginTop: 5 }, children: msg ?? '删除会清掉这个交互在所有座位下的资料，24 小时后执行，期间可取消。' })] }));
      }
      function UploadTab({ onDone }) {
          const [ctx, setCtx] = (0, react_1.useState)(null);
          const [iid, setIid] = (0, react_1.useState)('');
          const [seat, setSeat] = (0, react_1.useState)('');
          const [busy, setBusy] = (0, react_1.useState)(false);
          const [notice, setNotice] = (0, react_1.useState)(null);
          const [err, setErr] = (0, react_1.useState)(null);
          const [copied, setCopied] = (0, react_1.useState)(false);
          const input = (0, react_1.useRef)(null);
          const copyCmd = async (text) => {
              try {
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                      await navigator.clipboard.writeText(text);
                  }
                  else {
                      const ta = document.createElement('textarea');
                      ta.value = text;
                      ta.style.position = 'fixed';
                      ta.style.opacity = '0';
                      document.body.appendChild(ta);
                      ta.select();
                      document.execCommand('copy');
                      document.body.removeChild(ta);
                  }
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1800);
              }
              catch {
                  setErr({ code: 'copy_failed', message: '复制没成功，请手动选中命令复制' });
              }
          };
          const makeManualIid = () => {
              const d = new Date();
              const p = (n) => String(n).padStart(2, '0');
              const stamp = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
              const rnd = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
              return `manual-${stamp}-${rnd}`;
          };
          (0, react_1.useEffect)(() => {
              void (async () => {
                  const r = await callPack('contextGet', {});
                  const base = r.ok
                      ? r.data
                      : { interactionId: '', seat: '', note: '', project: '', shopName: '', onboardSeen: false };
                  setCtx(base);
                  const next = (base.interactionId || '').trim() || makeManualIid();
                  setIid(next);
                  setSeat(base.seat || '');
                  if (!(base.interactionId || '').trim()) {
                      void callPack('contextPut', { ...base, interactionId: next });
                  }
              })();
          }, []);
          const upload = async (picked) => {
              const list = Array.from(picked ?? []);
              if (list.length === 0) {
                  setErr({ code: 'no_file', message: '没选到文件 —— 请重新点「选择文件上传」再选一次' });
                  return;
              }
              const cur = iid.trim();
              if (!cur) {
                  setErr({ code: 'missing_interaction_id', message: '还没准备好交互 ID，请稍等或点「重试」' });
                  return;
              }
              setBusy(true);
              setErr(null);
              setNotice(null);
              const ok = [];
              const bad = [];
              for (const f of list) {
                  if (f.size > PACK_MAX_BYTES) {
                      bad.push(`${f.name}（${fmtBytes(f.size)} 超过界面单件上限 ${fmtBytes(PACK_MAX_BYTES)}，大件请让 Agent 用 CLI 传）`);
                      continue;
                  }
                  try {
                      const b64 = await readFileAsBase64(f);
                      const r = await callPack('packUpload', {
                          interactionId: cur, seat: seat.trim(), filename: f.name, contentBase64: b64,
                      });
                      if (r.ok)
                          ok.push(`${f.name}（${fmtBytes(f.size)}）`);
                      else
                          bad.push(`${f.name}：${r.message}`);
                  }
                  catch (e) {
                      bad.push(`${f.name}：${e instanceof Error ? e.message : String(e)}`);
                  }
              }
              if (ctx !== null)
                  void callPack('contextPut', { ...ctx, interactionId: cur, seat: seat.trim() });
              setBusy(false);
              if (ok.length > 0)
                  setNotice(`已上传 ${ok.length} 个：${ok.join('、')}`);
              if (bad.length > 0)
                  setErr({ code: 'partial_failed', message: bad.join('；') });
          };
          const taskUuid = (/^task-([0-9a-fA-F-]{36})$/.exec(iid.trim()) || [])[1] || '';
          const cmdText = taskUuid
              ? `kai-pu-deliver.py --task ${taskUuid} --claim --attach <产物路径> --text "<结论>"`
              : 'kai-pu-deliver.py --task <任务ID> --claim --attach <产物路径> --text "<结论>"';
          return ((0, jsx_runtime_1.jsxs)(Section, { title: "\u4E0A\u4F20\u9644\u4EF6", children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                          padding: '10px 12px', borderRadius: 8, background: 'rgba(59,111,224,.06)',
                          border: '1px solid rgba(59,111,224,.25)', fontSize: theme_js_1.FS.small, lineHeight: 1.7, marginBottom: 10,
                      }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 600, marginBottom: 4 }, children: "\u9996\u9009\uFF1A\u8BA9\u4F60\u7684 Agent \u4F20" }), (0, jsx_runtime_1.jsx)("div", { style: { opacity: 0.85 }, children: "\u5B83\u662F\u5E72\u6D3B\u7684\uFF0C\u4EA7\u7269\u5728\u5B83\u624B\u4E0A\u3002\u5BF9\u5B83\u8BF4\u300C\u628A\u8FD9\u6B21\u7684\u6210\u679C\u4F20\u5230\u5DE5\u4F4D\u300D\uFF0C\u6216\u8005\u76F4\u63A5\u7ED9\u5B83\u8FD9\u6761\u547D\u4EE4\uFF1A" }), (0, jsx_runtime_1.jsxs)("div", { style: { position: 'relative', marginTop: 6 }, children: [(0, jsx_runtime_1.jsx)("code", { style: {
                                          display: 'block', padding: '6px 62px 6px 8px', borderRadius: 4,
                                          background: 'rgba(0,0,0,.05)', fontSize: theme_js_1.FS.tag, wordBreak: 'break-all',
                                      }, children: cmdText }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void copyCmd(cmdText), title: "\u590D\u5236\u8FD9\u6761\u547D\u4EE4", style: {
                                          position: 'absolute', right: 6, top: 6, padding: '2px 9px',
                                          fontSize: theme_js_1.FS.tag, lineHeight: 1.6, borderRadius: 4, cursor: 'pointer',
                                          border: `1px solid ${copied ? 'rgba(31,122,61,.45)' : 'rgba(0,0,0,.18)'}`,
                                          background: copied ? 'rgba(31,122,61,.10)' : '#fff',
                                          color: copied ? '#1f7a3d' : theme_js_1.C.dim,
                                      }, children: copied ? '✓ 已复制' : '复制' })] }), (0, jsx_runtime_1.jsxs)("div", { style: { opacity: 0.7, marginTop: 4 }, children: ["\u4E0B\u9762\u8FD9\u4E00\u9875\u662F", (0, jsx_runtime_1.jsx)("strong", { children: "\u4EBA\u7684\u515C\u5E95" }), "\uFF1AAgent \u4F20\u4E0D\u4E86\u3001\u6216\u8005\u4F60\u60F3\u8865\u4E00\u4EFD\u65F6\u7528\u3002"] })] }), (0, jsx_runtime_1.jsxs)("details", { style: { marginBottom: 8 }, children: [(0, jsx_runtime_1.jsx)("summary", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, cursor: 'pointer' }, children: "\u8FD9\u6B21\u4F20\u5230\u54EA\u513F\uFF08\u6280\u672F\u7EC6\u8282\uFF0C\u901A\u5E38\u4E0D\u7528\u770B\uFF09" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: 4 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u534F\u4F5C\u7801" }), (0, jsx_runtime_1.jsx)("code", { style: { fontSize: theme_js_1.FS.tag, padding: '3px 6px', background: 'rgba(0,0,0,.04)', borderRadius: 4, wordBreak: 'break-all' }, children: iid || '准备中…' }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\uFF08\u4E00\u6B21\u534F\u4F5C\u4E00\u4E2A\u76EE\u5F55 \u00B7 Agent \u4E0E\u4EBA\u5728\u540C\u4E00\u6B21\u534F\u4F5C\u91CC\u5404\u5360\u4E00\u4E2A\u5EA7\u4F4D\uFF09" })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => input.current?.click(), disabled: busy, style: btnStyle(true), children: busy ? '上传中…' : '选择文件上传' }), (0, jsx_runtime_1.jsx)("input", { ref: input, type: "file", multiple: true, onChange: (e) => {
                                  const picked = Array.from(e.target.files ?? []);
                                  e.target.value = '';
                                  void upload(picked);
                              }, style: { display: 'none' } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onDone(), disabled: busy, style: btnStyle(false), children: "\u53BB\u300C\u8D44\u6599\uFF08\u6309\u4F4D\uFF09\u300D\u770B\u770B" })] }), notice !== null && (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 8, fontSize: theme_js_1.FS.small, color: '#1f7a3d' }, children: notice }), err !== null && (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 8, fontSize: theme_js_1.FS.small, color: '#b3261e' }, children: ["[", err.code, "] ", err.message] })] }));
      }
      function PackSection({ onUpload, focus }) {
          const [iid, setIid] = (0, react_1.useState)('');
          const [packIids, setPackIids] = (0, react_1.useState)([]);
          const [packQuery, setPackQuery] = (0, react_1.useState)('');
          (0, react_1.useEffect)(() => {
              let alive = true;
              void (async () => {
                  const r = await (0, live_js_1.loadPackInteractions)();
                  if (alive && r.ok) {
                      setPackIids(r.data.interactions);
                      const first = r.data.interactions[0];
                      if (first !== undefined && !r.data.interactions.some((x) => x.interactionId === iid)) {
                          setIid(first.interactionId);
                          void persist({ interactionId: first.interactionId });
                      }
                  }
              })();
              return () => { alive = false; };
          }, []);
          const [seat, setSeat] = (0, react_1.useState)('');
          const [note, setNote] = (0, react_1.useState)('');
          const [project, setProject] = (0, react_1.useState)('');
          const [ctxLoaded, setCtxLoaded] = (0, react_1.useState)(false);
          const [files, setFiles] = (0, react_1.useState)(null);
          const [err, setErr] = (0, react_1.useState)(null);
          const [notice, setNotice] = (0, react_1.useState)(null);
          const [busy, setBusy] = (0, react_1.useState)(false);
          const [journal, setJournal] = (0, react_1.useState)(null);
          const [devices, setDevices] = (0, react_1.useState)(null);
          const loadDevices = async () => {
              const r = await callPack('devicesList', {});
              if (r.ok)
                  setDevices(r.data);
          };
          const revokeDevice = async (fpHash, revoked) => {
              const r = await callPack('deviceRevoke', { fpHash, revoked });
              if (!r.ok) {
                  setErr({ code: r.code, message: r.message });
                  return;
              }
              setNotice(revoked ? '已移出：这台设备下次连不进来（记录保留）' : '已恢复：这台设备可以再连');
              await loadDevices();
          };
          (0, react_1.useEffect)(() => { void loadDevices(); }, []);
          (0, react_1.useEffect)(() => {
              void (async () => {
                  const r = await callPack('contextGet', {});
                  if (r.ok) {
                      setIid(r.data.interactionId);
                      setSeat(r.data.seat);
                      setNote(r.data.note);
                      setProject(r.data.project);
                  }
                  setCtxLoaded(true);
              })();
          }, []);
          const persist = async (patchObj) => {
              const next = { interactionId: iid, seat, note, project, ...patchObj };
              const r = await callPack('contextPut', next);
              if (!r.ok && r.code !== 'no_channel') {
                  setErr({ code: r.code, message: r.message });
              }
          };
          const makeIid = () => {
              const d = new Date();
              const p = (n) => String(n).padStart(2, '0');
              const stamp = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
              const rnd = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
              return `int-${stamp}-${rnd}`;
          };
          const ref = { interactionId: iid.trim(), seat: seat.trim() };
          const refresh = async (ov) => {
              const cur = {
                  interactionId: (ov?.interactionId ?? iid).trim(),
                  seat: (ov?.seat ?? seat).trim(),
              };
              if (cur.interactionId.length === 0) {
                  setFiles(null);
                  setErr(null);
                  return;
              }
              const r = await callPack('packsList', cur);
              if (r.ok) {
                  setFiles(Array.isArray(r.data.files) ? r.data.files : []);
                  setErr(null);
              }
              else {
                  setErr({ code: r.code, message: r.message });
                  setFiles(null);
              }
          };
          (0, react_1.useEffect)(() => {
              if (iid.trim().length === 0)
                  return;
              void refresh();
          }, [iid, seat]);
          (0, react_1.useEffect)(() => {
              if (focus === null)
                  return;
              setIid(focus.interactionId);
              setNotice(focus.title ? `正在看「${focus.title}」的附件` : null);
              setErr(null);
              void refresh({ interactionId: focus.interactionId });
          }, [focus]);
          const onDownload = async (name) => {
              setBusy(true);
              setErr(null);
              setNotice(null);
              const r = await callPack('packDownload', { ...ref, filename: name });
              setBusy(false);
              if (!r.ok) {
                  setErr({ code: r.code, message: r.message });
                  return;
              }
              triggerDownload(r.data.contentBase64, r.data.filename || name, r.data.contentType);
              setNotice(`已下载：${r.data.filename || name}（${fmtBytes(r.data.size)}）`);
          };
          const onDelete = async (name) => {
              const yes = typeof window !== 'undefined' && typeof window.confirm === 'function'
                  ? window.confirm(`删除「${name}」？\n\n服务端会先物理删文件、再删索引，并在流水里留一行 delete。`)
                  : true;
              if (!yes)
                  return;
              setBusy(true);
              setErr(null);
              setNotice(null);
              const r = await callPack('packDelete', { ...ref, filename: name });
              setBusy(false);
              if (!r.ok) {
                  setErr({ code: r.code, message: r.message });
                  return;
              }
              setNotice(`已删除：${name}`);
              await refresh();
          };
          const onJournal = async () => {
              setBusy(true);
              setErr(null);
              const r = await callPack('packJournal', { ...ref });
              setBusy(false);
              if (!r.ok) {
                  setErr({ code: r.code, message: r.message });
                  return;
              }
              setJournal(r.data);
          };
          return ((0, jsx_runtime_1.jsxs)(Section, { title: "\u8D44\u6599\uFF08\u6309\u4F4D\uFF09", children: [(0, jsx_runtime_1.jsx)("div", { id: "kaipu-pack-section" }), (0, jsx_runtime_1.jsx)(PackLifecycle, { iid: iid }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u5F53\u524D\u5728\u770B" }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600, color: theme_js_1.C.text }, children: (() => {
                                  const cur = packIids.find((x) => x.interactionId === ref.interactionId);
                                  if (cur !== undefined)
                                      return packLabel(cur);
                                  if (!ref.interactionId)
                                      return '（还没选 —— 去「＋ 传文件」传一次就有了）';
                                  return '这次协作';
                              })() }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void refresh(), disabled: busy, style: btnStyle(false), children: "\u5237\u65B0" }), (0, jsx_runtime_1.jsx)("span", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onUpload, disabled: busy, style: btnStyle(true), title: "\u4F20\u6587\u4EF6\u4E0D\u5728\u8FD9\u4E00\u9875\u505A \u2014\u2014 \u5355\u72EC\u4E00\u9875\uFF0C\u514D\u5F97\u548C\u67E5\u770B\u6DF7\u5728\u4E00\u8D77", children: "\uFF0B \u4F20\u6587\u4EF6" })] }), packIids.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: theme_js_1.FS.small, fontWeight: 600, color: theme_js_1.C.text }, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDD0D" }), (0, jsx_runtime_1.jsx)("span", { children: "\u6709\u8D44\u6599\u7684\u534F\u4F5C\uFF08\u6309\u9879\u76EE\u5206\uFF09" }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, fontWeight: 400, color: theme_js_1.C.dim }, children: [packIids.length, " \u4E2A\u534F\u4F5C"] })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: packQuery, onChange: (e) => setPackQuery(e.target.value), placeholder: "\u641C\u7D22\u534F\u4F5C\uFF08\u4EFB\u52A1\u6807\u9898\uFF09\u2026", style: {
                                          width: '100%', boxSizing: 'border-box',
                                          padding: '8px 11px', borderRadius: 8,
                                          border: `1px solid ${theme_js_1.C.border}`,
                                          background: 'var(--dsh-surface-secondary, rgba(59,111,224,0.03))',
                                          color: theme_js_1.C.text, fontSize: theme_js_1.FS.base, fontFamily: 'inherit',
                                          outline: 'none',
                                      } })] }), (() => {
                              const q = packQuery.trim().toLowerCase();
                              const groups = groupPacks(packIids);
                              const shown = q === ''
                                  ? groups
                                  : groups
                                      .map((g) => ({ ...g, rows: g.rows.filter((x) => packLabel(x).toLowerCase().includes(q)) }))
                                      .filter((g) => g.rows.length > 0);
                              if (q !== '' && shown.length === 0) {
                                  return ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, padding: '6px 2px' }, children: ["\u6CA1\u6709\u5339\u914D\u300C", packQuery.trim(), "\u300D\u7684\u534F\u4F5C\u3002"] }));
                              }
                              return shown.map((g) => ((0, jsx_runtime_1.jsxs)("details", { open: q !== '', style: { border: `1px solid ${theme_js_1.C.border}`, borderRadius: 8, background: 'transparent' }, children: [(0, jsx_runtime_1.jsxs)("summary", { style: {
                                              cursor: 'pointer', padding: '6px 10px', display: 'flex',
                                              alignItems: 'center', gap: 8, flexWrap: 'wrap',
                                          }, children: [(0, jsx_runtime_1.jsx)("b", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600, color: theme_js_1.C.text }, children: g.name }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: [g.rows.length, " \u4E2A\u534F\u4F5C \u00B7 ", g.files, " \u4E2A\u6587\u4EF6"] })] }), (0, jsx_runtime_1.jsx)("div", { style: { padding: '0 10px 8px', display: 'flex', flexDirection: 'column', gap: 4 }, children: g.rows.map((x) => {
                                              const active = x.interactionId === iid;
                                              return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => {
                                                              if (active) {
                                                                  setIid('');
                                                                  void persist({ interactionId: '' });
                                                                  return;
                                                              }
                                                              setIid(x.interactionId);
                                                              void persist({ interactionId: x.interactionId });
                                                          }, style: {
                                                              display: 'flex', alignItems: 'baseline', gap: 8, width: '100%',
                                                              textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                                                              padding: '5px 8px', borderRadius: 6, fontSize: theme_js_1.FS.small,
                                                              border: `1px solid ${active ? '#1f2937' : 'transparent'}`,
                                                              background: active ? 'rgba(31,41,55,0.06)' : 'transparent',
                                                              color: active ? theme_js_1.C.text : theme_js_1.C.dim,
                                                          }, children: [(0, jsx_runtime_1.jsx)("span", { style: { flex: 1, minWidth: 0, color: active ? theme_js_1.C.text : undefined }, children: packLabel(x) }), (0, jsx_runtime_1.jsxs)("span", { style: { flex: '0 0 auto', fontSize: theme_js_1.FS.tag }, children: [x.files, " \u4E2A\u6587\u4EF6 \u00B7 \u6700\u8FD1 ", fmtDay(x.lastAt), ' ', (0, jsx_runtime_1.jsx)("span", { style: { color: active ? '#1f2937' : '#98a2b3', fontWeight: 600 }, children: active ? '收起 ▴' : '展开 ▾' })] })] }), active ? ((0, jsx_runtime_1.jsx)(PackFileList, { files: files, busy: busy, onDownload: (n) => void onDownload(n), onDelete: (n) => void onDelete(n), inline: true })) : null] }, x.interactionId));
                                          }) })] }, g.key)));
                          })()] })) : null, notice !== null && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.small, color: '#1f7a3d' }, children: notice })), err !== null && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.small, color: '#b3261e' }, children: ["[", err.code, "] ", err.message] }))] }));
      }
      function PackFileList(props) {
          const { files, busy, onDownload, onDelete, inline } = props;
          const box = inline === true
              ? {
                  marginTop: 2, marginLeft: 12, padding: '6px 10px',
                  borderLeft: '2px solid rgba(200,136,31,0.45)',
                  background: 'rgba(200,136,31,0.04)', borderRadius: '0 6px 6px 0',
                  display: 'flex', flexDirection: 'column', gap: 2,
              }
              : { marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 };
          if (files === null) {
              return (0, jsx_runtime_1.jsx)("div", { style: { ...box, fontSize: theme_js_1.FS.tag, color: 'rgba(0,0,0,.55)' }, children: "\u6B63\u5728\u8BFB\u53D6\u6587\u4EF6\u6E05\u5355\u2026" });
          }
          if (files.length === 0) {
              return (0, jsx_runtime_1.jsx)("div", { style: { ...box, fontSize: theme_js_1.FS.tag, color: 'rgba(0,0,0,.55)' }, children: "\u8FD9\u6B21\u534F\u4F5C\u8FD8\u6CA1\u6709\u9644\u4EF6\u3002" });
          }
          return ((0, jsx_runtime_1.jsx)("div", { style: box, children: files.map((f) => {
                  const name = typeof f.filename === 'string' ? f.filename : '';
                  if (name.length === 0)
                      return null;
                  return ((0, jsx_runtime_1.jsxs)("div", { style: {
                          display: 'flex', gap: 8, alignItems: 'center', fontSize: theme_js_1.FS.small,
                          padding: '3px 0', borderBottom: '1px solid rgba(0,0,0,.06)',
                      }, children: [(0, jsx_runtime_1.jsx)("span", { style: { flex: 1, wordBreak: 'break-all' }, children: name }), (0, jsx_runtime_1.jsx)("span", { style: { color: 'rgba(0,0,0,.55)', whiteSpace: 'nowrap' }, children: fmtBytes(f.size) }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onDownload(name), disabled: busy, style: btnStyle(false), children: "\u4E0B\u8F7D" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onDelete(name), disabled: busy, style: btnStyle(false), children: "\u5220\u9664" })] }, `${typeof f.seat === 'string' ? f.seat : ''}/${name}`));
              }) }));
      }
      function TaskSection() {
          const [data, setData] = (0, react_1.useState)(null);
          const [err, setErr] = (0, react_1.useState)(null);
          const [busy, setBusy] = (0, react_1.useState)(false);
          const [composing, setComposing] = (0, react_1.useState)(false);
          const [title, setTitle] = (0, react_1.useState)('');
          const [detail, setDetail] = (0, react_1.useState)('');
          const [newPhase, setNewPhase] = (0, react_1.useState)('requirement');
          const [phaseTouched, setPhaseTouched] = (0, react_1.useState)(false);
          const [projects, setProjects] = (0, react_1.useState)([]);
          const [projErr, setProjErr] = (0, react_1.useState)(null);
          const [projFilter, setProjFilter] = (0, react_1.useState)('');
          const [searchMode, setSearchMode] = (0, react_1.useState)('project');
          const [projTab, setProjTab] = (0, react_1.useState)('all');
          const [kw, setKw] = (0, react_1.useState)('');
          const [openSec, setOpenSec] = (0, react_1.useState)({});
          const [suggByProj, setSuggByProj] = (0, react_1.useState)({});
          const [suggConfirm, setSuggConfirm] = (0, react_1.useState)({});
          const [rejectDraft, setRejectDraft] = (0, react_1.useState)({});
          const [audit, setAudit] = (0, react_1.useState)(null);
          const requestAudit = async (projectId) => {
              setErr(null);
              const r = await callActionData('projectAuditRequest', { projectId, package: 'standard' });
              if (!r.ok) {
                  if (r.code === 'audit_not_enabled') {
                      setProjNotice('审计功能还没开通 —— 请联系管理员开通后再送审。');
                      setNotice(null);
                      return;
                  }
                  if (r.code === 'project_draft_only') {
                      setProjNotice('这份是「暂存」包，不能当定稿送审 —— 把剩下的活干完，正式归档一次再送审。');
                      setNotice(null);
                      return;
                  }
                  if (r.code === 'project_not_frozen') {
                      setProjNotice('请先归档，定稿后送审 —— 审计要针对一个确定的版本。点本项目的「归档」，归档完再回来点审计。');
                      setNotice(null);
                      return;
                  }
                  if (r.code === 'archive_stale') {
                      setProjNotice('解冻过 ⇒ 之前的归档包已作废。请重新归档（生成新的 sha256）后再送审。');
                      setNotice(null);
                      return;
                  }
                  setErr({
                      code: r.code ?? 'audit_failed',
                      message: r.message ?? '审计申请没发出去',
                      source: 'action',
                      title: '审计申请没发出去',
                  });
                  return;
              }
              setAudit({ id: r.data.id, projectId, status: r.data.status ?? 'queued', report: null });
              setNotice(null);
          };
          (0, react_1.useEffect)(() => {
              if (audit === null)
                  return;
              if (audit.status !== 'queued' && audit.status !== 'running')
                  return;
              const id = audit.id;
              let alive = true;
              const timer = setInterval(() => {
                  void callActionData('auditGet', {
                      auditId: id,
                  }).then((r) => {
                      if (!alive || !r.ok)
                          return;
                      setAudit((prev) => prev === null || prev.id !== id
                          ? prev
                          : {
                              ...prev,
                              status: r.data.status ?? prev.status,
                              report: r.data.report ?? prev.report,
                              neutralityBanner: r.data.neutrality_banner ?? prev.neutralityBanner ?? null,
                          });
                  });
              }, 5000);
              return () => {
                  alive = false;
                  clearInterval(timer);
              };
          }, [audit?.id, audit?.status]);
          const [notifyId, setNotifyId] = (0, react_1.useState)('');
          const [agentOpts, setAgentOpts] = (0, react_1.useState)(null);
          (0, react_1.useEffect)(() => {
              let alive = true;
              void (0, live_js_1.loadWorkstationState)().then((snap) => {
                  if (!alive || snap.state === null)
                      return;
                  setAgentOpts((0, notify_copy_js_1.agentChoices)(snap.state.members));
              });
              return () => {
                  alive = false;
              };
          }, []);
          const notifyChoices = agentOpts ?? [];
          const notifyPick = notifyChoices.find((c) => c.id === notifyId) ?? null;
          const [nodeId, setNodeId] = (0, react_1.useState)('');
          const [nodeOpts, setNodeOpts] = (0, react_1.useState)(null);
          (0, react_1.useEffect)(() => {
              let alive = true;
              void (0, live_js_1.loadOrgTree)().then((r) => {
                  if (!alive)
                      return;
                  if (r.ok) {
                      const all = r.data.nodes;
                      const childOf = (id) => all.filter((n) => n.parent_node_id === id);
                      const seats = (0, node_pick_js_1.seatNodesOf)(all, childOf);
                      setNodeOpts((0, node_pick_js_1.sortedNodes)(seats));
                  }
              });
              return () => { alive = false; };
          }, []);
          const nodeChoices = nodeOpts === null ? [] : (0, node_pick_js_1.sortedNodes)(nodeOpts);
          const nodePick = nodeChoices.find((n) => n.node_id === nodeId) ?? null;
          const nodeLabelOf = (id) => {
              if (typeof id !== 'string' || id.length === 0)
                  return '';
              const hit = nodeChoices.find((n) => n.node_id === id);
              return hit === undefined ? '' : (0, node_pick_js_1.nodeChipLabel)(hit);
          };
          const [projId, setProjId] = (0, react_1.useState)('');
          (0, react_1.useEffect)(() => {
              if (phaseTouched)
                  return;
              const cur = projects.find((p) => p.projectId === projId);
              const ph = cur?.phase;
              if (typeof ph === 'string' && ph !== '' && ph !== 'archived')
                  setNewPhase(ph);
          }, [projId, projects, phaseTouched]);
          const [projNew, setProjNew] = (0, react_1.useState)(false);
          const [projName, setProjName] = (0, react_1.useState)('');
          const [projNotice, setProjNotice] = (0, react_1.useState)(null);
          const [pendingArchive, setPendingArchive] = (0, react_1.useState)(null);
          const [draftFiles, setDraftFiles] = (0, react_1.useState)([]);
          const [dragOver, setDragOver] = (0, react_1.useState)(false);
          const draftInput = (0, react_1.useRef)(null);
          const [renaming, setRenaming] = (0, react_1.useState)(null);
          const [notice, setNotice] = (0, react_1.useState)(null);
          const [myId, setMyId] = (0, react_1.useState)(null);
          const [blocked, setBlocked] = (0, react_1.useState)({ kind: 'pending' });
          const [pending, setPending] = (0, react_1.useState)({ kind: 'pending' });
          const [openBlocked, setOpenBlocked] = (0, react_1.useState)(false);
          const [openPending, setOpenPending] = (0, react_1.useState)(false);
          const refresh = async () => {
              const r = await (0, live_js_1.loadTasks)(true);
              if (r.ok) {
                  const raw = r.data?.tasks;
                  const list = Array.isArray(raw) ? raw : [];
                  if (!Array.isArray(raw)) {
                      setErr({ code: 'bad_payload', message: `任务列表格式异常（tasks=${raw === undefined ? 'undefined' : typeof raw}）`, source: 'read' });
                  }
                  setData({ tasks: list.map(toTaskUi), counts: (r.data?.counts ?? {}) });
                  const projs = r.data?.projects;
                  if (Array.isArray(projs)) {
                      setProjects(projs);
                      setProjErr(null);
                  }
                  setErr((prev) => (prev !== null && prev.source === 'action' ? prev : null));
              }
              else {
                  setErr({ code: r.code, message: r.message, source: 'read' });
              }
              const pr = await (0, live_js_1.loadProjects)();
              if (pr.ok) {
                  setProjects(pr.data.projects);
                  setProjErr(null);
              }
              else {
                  setProjErr({ code: pr.code, message: pr.message });
              }
              const [blockedNext, pendingNext] = await Promise.all([
                  fetchFlagged('tasksBlocked'),
                  fetchFlagged('tasksPendingApprovals'),
              ]);
              setBlocked(blockedNext);
              setPending(pendingNext);
          };
          (0, react_1.useEffect)(() => {
              void refresh();
          }, []);
          (0, react_1.useEffect)(() => {
              let alive = true;
              void (async () => {
                  const id = await fetchMyAccountId();
                  if (alive)
                      setMyId(id);
              })();
              return () => {
                  alive = false;
              };
          }, []);
          const tasksRef = (0, react_1.useRef)([]);
          const myIdRef = (0, react_1.useRef)(null);
          myIdRef.current = myId;
          tasksRef.current = data?.tasks ?? [];
          (0, react_1.useEffect)(() => {
              const timer = setInterval(() => {
                  if (document.hidden)
                      return;
                  const id = myIdRef.current;
                  if (id === null)
                      return;
                  for (const t of tasksRef.current) {
                      if (normStatus(t.status) !== 'in_progress')
                          continue;
                      if (t.claimed_by !== id)
                          continue;
                      void heartbeatTask(t.task_id).then((r) => {
                          if (!r.ok) {
                              setErr({
                                  code: r.code ?? 'heartbeat_failed',
                                  message: r.message ?? '租约续期失败',
                                  title: '租约续期失败',
                                  source: 'action',
                              });
                          }
                          else {
                              setErr((prev) => (prev !== null && prev.title === '租约续期失败' ? null : prev));
                          }
                      });
                  }
              }, HEARTBEAT_MS);
              return () => clearInterval(timer);
          }, []);
          const run = async (fn, okMsg) => {
              if (busy)
                  return;
              setBusy(true);
              setNotice(null);
              try {
                  const r = await fn();
                  if (!r.ok)
                      setErr({ code: r.code ?? 'error', message: r.message ?? '操作失败', source: 'action' });
                  else {
                      setErr(null);
                      if (okMsg)
                          setNotice(okMsg);
                  }
                  await refresh();
              }
              finally {
                  setBusy(false);
              }
          };
          const onPublish = () => {
              const t = title.trim();
              if (t.length === 0) {
                  setErr({
                      code: 'title_required',
                      message: '还没填任务标题。标题是这条任务在板上的名字 —— 别人靠它认出「这是哪一件事」，所以不能空着。',
                      source: 'action',
                      title: '还差一个标题',
                  });
                  return;
              }
              if (projId.trim().length === 0) {
                  setErr({
                      code: 'project_required',
                      message: '发布前先选一个项目（或点「＋ 新项目」建一个）。任务的归属靠项目，没项目的任务没人认得出是哪一版。',
                      source: 'action',
                      title: '还差一个项目',
                  });
                  return;
              }
              const okText = (0, node_pick_js_1.publishToast)(nodePick === null ? '' : (0, node_pick_js_1.nodeChipLabel)(nodePick), notifyPick?.name ?? '');
              void run(async () => {
                  const tid = newUuid();
                  let r = await (0, live_js_1.createTask)(t, detail.trim(), projId || undefined, `task-${tid}`, phaseToKind(newPhase) || undefined, notifyId || undefined, nodeId || undefined);
                  let degraded = false;
                  if (!r.ok && notifyId.length > 0 && (0, notify_copy_js_1.isNotifyUnsupported)(r.code, r.message)) {
                      degraded = true;
                      r = await (0, live_js_1.createTask)(t, detail.trim(), projId || undefined, `task-${tid}`, phaseToKind(newPhase) || undefined, undefined, nodeId || undefined);
                  }
                  if (!r.ok) {
                      return {
                          ok: false,
                          code: r.code,
                          message: (0, node_pick_js_1.humanizePublishError)(r.code ?? '', (0, notify_copy_js_1.notifyFailText)(r.code, r.message)),
                      };
                  }
                  const files = draftFiles;
                  if (files.length > 0) {
                      const bad = [];
                      for (const f of files) {
                          if (f.size > PACK_MAX_BYTES) {
                              bad.push(`${f.name}（${fmtBytes(f.size)} 超过单件上限 ${fmtBytes(PACK_MAX_BYTES)}）`);
                              continue;
                          }
                          try {
                              const b64 = await readFileAsBase64(f);
                              const up = await callPack('packUpload', {
                                  interactionId: `task-${tid}`, seat: '', filename: f.name, contentBase64: b64,
                              });
                              if (!up.ok)
                                  bad.push(`${f.name}：${up.message}`);
                          }
                          catch (e) {
                              bad.push(`${f.name}：${e instanceof Error ? e.message : String(e)}`);
                          }
                      }
                      setTitle('');
                      setDetail('');
                      setDraftFiles([]);
                      setComposing(false);
                      setNotifyId('');
                      setNodeId('');
                      if (bad.length > 0) {
                          setNotice(`${okText}；但有 ${bad.length} 个附件没传上去：${bad.join('；')}${degraded ? ` · ${notify_copy_js_1.NOTIFY_DEGRADED_NOTICE}` : ''}`);
                      }
                      else {
                          setNotice(`${okText}，附件 ${files.length} 个已上传${degraded ? ` · ${notify_copy_js_1.NOTIFY_DEGRADED_NOTICE}` : ''}`);
                      }
                      return { ok: true };
                  }
                  setTitle('');
                  setDetail('');
                  setComposing(false);
                  setNotifyId('');
                  setNodeId('');
                  if (degraded)
                      setNotice(`${okText} · ${notify_copy_js_1.NOTIFY_DEGRADED_NOTICE}`);
                  return r;
              }, okText);
          };
          const addDraftFiles = (picked) => {
              if (picked.length === 0)
                  return;
              setDraftFiles((prev) => {
                  const seen = new Set(prev.map((f) => `${f.name}|${f.size}`));
                  return [...prev, ...picked.filter((f) => !seen.has(`${f.name}|${f.size}`))];
              });
          };
          const onCreateProject = () => {
              const n = projName.trim();
              if (n.length === 0)
                  return;
              void run(async () => {
                  const r = await (0, live_js_1.createProject)(n);
                  if (r.ok) {
                      setProjName('');
                      setProjNew(false);
                      setProjId(r.data.projectId);
                      const pr = await (0, live_js_1.loadProjects)();
                      if (pr.ok)
                          setProjects(pr.data.projects);
                  }
                  return r;
              }, '项目已建');
          };
          const onRenameProject = () => {
              if (renaming === null)
                  return;
              const n = renaming.name.trim();
              if (n.length === 0)
                  return;
              const pid = renaming.projectId;
              void run(async () => {
                  const r = await (0, live_js_1.renameProject)(pid, n);
                  if (r.ok) {
                      setRenaming(null);
                      const pr = await (0, live_js_1.loadProjects)();
                      if (pr.ok)
                          setProjects(pr.data.projects);
                  }
                  return r;
              }, '项目名已改');
          };
          const onArchive = (p) => {
              void run(async () => {
                  const r = await (0, live_js_1.archiveProject)(p.projectId);
                  if (!r.ok && r.code === 'project_incomplete') {
                      setPendingArchive({ projectId: p.projectId, name: p.name, message: r.message ?? '' });
                      setProjNotice(null);
                      return { ok: true };
                  }
                  if (r.ok) {
                      const d = r.data;
                      const unf = d.unfinished ?? [];
                      setProjNotice(unf.length > 0
                          ? `「${p.name}」已归档：${d.tasks ?? 0} 个任务（${d.doneTasks ?? 0} 个已完成 · ⚠ 还有 ${unf.length} 个未完成）/ ${d.files ?? 0} 个文件 / ${d.bytes ?? 0} 字节。包里已标注「不完整」，未完成的任务清单也在 manifest 里。`
                          : `「${p.name}」已归档：${d.tasks ?? 0} 个任务（全部已完成 ✓）/ ${d.files ?? 0} 个文件 / ${d.bytes ?? 0} 字节（含 manifest 清单）`);
                      const pr = await (0, live_js_1.loadProjects)();
                      if (pr.ok)
                          setProjects(pr.data.projects);
                  }
                  return r;
              });
          };
          const onUnarchive = (p) => {
              void run(async () => {
                  const r = await (0, live_js_1.unarchiveProject)(p.projectId);
                  if (r.ok) {
                      setProjNotice(`「${p.name}」已取消归档 —— 回到项目列表。现在可以继续加任务 / 传资料 / 申请审计 / 再次归档；归档包还在，随时能下载。`);
                      const pr = await (0, live_js_1.loadProjects)();
                      if (pr.ok)
                          setProjects(pr.data.projects);
                  }
                  return r;
              });
          };
          const onDownloadArchive = (p) => {
              void run(async () => {
                  const r = await (0, live_js_1.downloadProjectArchive)(p.projectId);
                  if (!r.ok) {
                      setProjNotice(`下载失败：${r.message}`);
                      return r;
                  }
                  triggerDownload(r.data.dataBase64, r.data.filename, 'application/zip');
                  setProjNotice(r.data.stale
                      ? `已下载「${p.name}」的归档包，但 ⚠ 这是**旧快照**：归档之后又取消过归档（${(r.data.staleSince ?? '').replace('T', ' ')}），期间新增的任务和资料不在包里。需要最新版就再归档一次。`
                      : `已下载「${p.name}」的归档包：${Math.max(1, Math.round(r.data.bytes / 1024))} KB · sha256 ${r.data.sha256.slice(0, 12)}…（压缩包里的 manifest.json 就是归档清单）`);
                  return r;
              });
          };
          const projectNameOf = (id) => {
              if (!id)
                  return '';
              const p = projects.find((x) => x.projectId === id);
              return p ? p.name : '';
          };
          const tasks = data?.tasks ?? [];
          const shownProjects = (() => {
              if (projects.length > 0)
                  return projects;
              const m = new Map();
              for (const t of tasks) {
                  const pid = t.projectId;
                  if (typeof pid === 'string' && pid.length > 0)
                      m.set(pid, (m.get(pid) ?? 0) + 1);
              }
              return [...m.entries()].map(([projectId, taskCount]) => ({
                  projectId,
                  name: projectId,
                  status: 'active',
                  createdAt: '',
                  taskCount,
              }));
          })();
          (0, react_1.useEffect)(() => {
              if (projFilter !== '')
                  return;
              const ids = projects.length > 0
                  ? projects.map((p) => p.projectId)
                  : [...new Set(tasks.map((t) => t.projectId).filter((x) => typeof x === 'string' && x.length > 0))];
              if (ids.length === 1 && ids[0] !== undefined)
                  setProjFilter(ids[0]);
          }, [projects, projFilter, tasks]);
          const visibleTasks = projFilter === ''
              ? tasks
              : tasks.filter((t) => t.projectId === projFilter);
          const kwNorm = kw.trim().toLowerCase();
          const searchHit = (t) => {
              if (kwNorm === '')
                  return true;
              const hay = ((t.title ?? '') + ' ' + (t.detail ?? '')).toLowerCase();
              return hay.includes(kwNorm);
          };
          const ownFilter = (t) => {
              if (projTab === 'all')
                  return true;
              const hasPid = typeof t.projectId === 'string' && t.projectId.length > 0;
              return projTab === 'has' ? hasPid : !hasPid;
          };
          const searchedTasks = searchMode === 'task'
              ? tasks.filter(searchHit).filter(ownFilter)
              : visibleTasks;
          const projHit = (id, name) => kwNorm !== '' && searchMode === 'project' && (name ?? '').toLowerCase().includes(kwNorm);
          const projCounts = (() => {
              const m = {};
              for (const t of searchedTasks) {
                  const k = normStatus(t.status);
                  m[k] = (m[k] ?? 0) + 1;
              }
              return m;
          })();
          const countInView = (status) => {
              const n = projCounts[status];
              if (typeof n === 'number')
                  return n;
              if (status === 'posted')
                  return projCounts['open'] ?? 0;
              if (status === 'accepted')
                  return projCounts['done'] ?? 0;
              return 0;
          };
          const blockedCount = blocked.kind === 'ok' ? blocked.rows.length : 0;
          const pendingCount = pending.kind === 'ok' ? pending.rows.length : 0;
          const renderSuggestionCards = (cur) => {
              const list = suggByProj[cur.projectId];
              if (list === undefined) {
                  void (0, live_js_1.loadPhaseSuggestions)(cur.projectId).then((r) => {
                      if (r.ok === true) {
                          setSuggByProj((p) => ({ ...p, [cur.projectId]: r.data.suggestions }));
                      }
                  });
                  return null;
              }
              const pending = list.filter((s) => s.pending);
              if (pending.length === 0)
                  return null;
              return ((0, jsx_runtime_1.jsx)("div", { style: { marginLeft: 12, marginBottom: 8, display: 'flex',
                      flexDirection: 'column', gap: 6 }, children: pending.map((s) => {
                      const stale = s.stale;
                      const tone = stale
                          ? 'stale'
                          : (s.precheckReasons.length > 0 ? 'blocked' : 'normal');
                      const T = (0, suggest_theme_js_1.toneStyle)(tone);
                      const B = (0, suggest_theme_js_1.buttonStyle)(tone);
                      return ((0, jsx_runtime_1.jsxs)("div", { style: {
                              ...T.card,
                              display: 'flex', flexDirection: 'column', gap: 6,
                              overflowWrap: 'anywhere',
                              maxWidth: '100%',
                              boxSizing: 'border-box',
                          }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { fontSize: suggest_theme_js_1.SF.tag, fontWeight: 700,
                                              color: T.showBrand ? suggest_theme_js_1.SC.brand : suggest_theme_js_1.SC.ink }, children: ["\uD83E\uDD16 ", s.suggesterKind === 'agent' ? 'Agent 建议' : '建议'] }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: suggest_theme_js_1.SF.title, fontWeight: 600, color: suggest_theme_js_1.SC.ink }, children: [(0, project_phase_js_1.phaseLabel)(s.fromPhase), " \u2192 ", (0, project_phase_js_1.phaseLabel)(s.toPhase)] }), stale ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                              fontSize: suggest_theme_js_1.SF.tag, padding: '1px 6px', borderRadius: suggest_theme_js_1.SR.ctrl,
                                              border: `1px solid ${suggest_theme_js_1.SC.ink}`, color: suggest_theme_js_1.SC.ink, fontWeight: 600,
                                          }, children: "\u5DF2\u8FC7\u671F \u00B7 \u9879\u76EE\u5DF2\u53D8\uFF0C\u8BF7\u8BA9 Agent \u91CD\u63D0" })) : null, (0, jsx_runtime_1.jsx)("span", { style: { fontSize: suggest_theme_js_1.SF.tag, color: suggest_theme_js_1.SC.ink, opacity: 0.55 }, children: s.createdAt.replace('T', ' ').replace('Z', '') })] }), s.reason ? ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: suggest_theme_js_1.SF.body, color: suggest_theme_js_1.SC.ink, lineHeight: 1.6 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { opacity: 0.55 }, children: "\u7406\u7531\uFF1A" }), s.reason] })) : ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: suggest_theme_js_1.SF.tag, color: suggest_theme_js_1.SC.brand }, children: "\u6CA1\u5199\u7406\u7531\uFF08\u5EFA\u8BAE\u5361\u4E0A\u6587\u5B57\u4E3A\u7A7A\uFF0C\u4EBA\u65E0\u6CD5\u5224\u65AD\u8BE5\u4E0D\u8BE5\u6279\uFF09" })), stale ? ((0, jsx_runtime_1.jsx)("div", { style: {
                                      fontSize: suggest_theme_js_1.SF.tag, color: suggest_theme_js_1.SC.ink,
                                      background: suggest_theme_js_1.SC.line, borderRadius: suggest_theme_js_1.SR.ctrl, padding: '6px 10px',
                                  }, children: "\u672C\u5EFA\u8BAE\u5DF2\u5931\u6548 \u00B7 \u5B83\u57FA\u4E8E\u65E7\u7248\u672C\u9879\u76EE\u63D0\u51FA\uFF0C\u7ED3\u8BBA\u4E0D\u518D\u9002\u7528" })) : s.precheckReasons.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                                      display: 'flex', flexDirection: 'column', gap: 3,
                                      border: `1px dashed ${suggest_theme_js_1.SC.brand}`, borderRadius: suggest_theme_js_1.SR.ctrl,
                                      padding: '6px 10px',
                                  }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                              fontSize: suggest_theme_js_1.SF.tag, padding: '1px 6px', borderRadius: suggest_theme_js_1.SR.ctrl,
                                              border: `1px solid ${suggest_theme_js_1.SC.brand}`, color: suggest_theme_js_1.SC.brand,
                                              fontWeight: 600, alignSelf: 'flex-start',
                                          }, children: "\u672A\u901A\u8FC7" }), s.precheckReasons.map((p, i) => ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: suggest_theme_js_1.SF.tag, color: suggest_theme_js_1.SC.ink }, children: [(0, jsx_runtime_1.jsx)("code", { style: { color: suggest_theme_js_1.SC.brand }, children: p.code }), p.remediation ? (0, jsx_runtime_1.jsxs)("span", { children: [" \u00B7 ", p.remediation] }) : null, p.ruleVersion ? ((0, jsx_runtime_1.jsxs)("span", { style: { opacity: 0.55 }, children: [" \uFF08\u89C4\u5219 ", p.ruleVersion, "\uFF09"] })) : null] }, i))), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: suggest_theme_js_1.SF.tag, color: suggest_theme_js_1.SC.ink, opacity: 0.75,
                                              marginTop: 2 }, children: "\u9884\u68C0\u53EA\u505A\u63D0\u793A\u3001\u4E0D\u963B\u6B62\u63A8\u8FDB\uFF1B\u662F\u5426\u63A8\u8FDB\u7531\u4F60\u5224\u65AD\uFF0C\u98CE\u9669\u4E5F\u7531\u4F60\u627F\u62C5\u3002" })] })) : ((0, jsx_runtime_1.jsx)("div", { style: {
                                      fontSize: suggest_theme_js_1.SF.tag, color: suggest_theme_js_1.SC.ink,
                                      border: `1px solid ${suggest_theme_js_1.SC.line}`, borderRadius: suggest_theme_js_1.SR.ctrl,
                                      padding: '6px 10px',
                                  }, children: "\u2713 \u673A\u5668\u9884\u68C0\u901A\u8FC7\uFF08\u65E0\u544A\u8B66\uFF09" })), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", disabled: busy || B.disabled, "aria-label": (0, suggest_confirm_js_1.confirmAriaLabel)(tone, suggConfirm[s.suggestionId] === true, s.toPhase), "aria-describedby": tone === 'blocked' && suggConfirm[s.suggestionId] === true
                                              ? `sugg-confirm-${s.suggestionId}` : undefined, title: tone === 'stale' ? '这条建议基于旧状态，不能批准'
                                              : (tone === 'blocked'
                                                  ? (suggConfirm[s.suggestionId] ? '再点一次即推进' : '预检未通过，仍可推进（需点两次）')
                                                  : '确认推进'), onClick: () => {
                                              void run(async () => {
                                                  if (tone === 'blocked' && suggConfirm[s.suggestionId] !== true) {
                                                      setSuggConfirm((p) => ({ ...p, [s.suggestionId]: true }));
                                                      return { ok: true };
                                                  }
                                                  const r = await (0, live_js_1.decideProjectPhase)(cur.projectId, s.suggestionId, 'approve');
                                                  if (r.ok !== true)
                                                      return { ok: false, code: r.code, message: r.message };
                                                  setSuggConfirm((p) => { const n = { ...p }; delete n[s.suggestionId]; return n; });
                                                  const rf = await (0, live_js_1.loadPhaseSuggestions)(cur.projectId);
                                                  if (rf.ok === true) {
                                                      setSuggByProj((p) => ({ ...p, [cur.projectId]: rf.data.suggestions }));
                                                  }
                                                  return { ok: true };
                                              }, tone === 'blocked' && suggConfirm[s.suggestionId] === true
                                                  ? `已批准：推进到「${(0, project_phase_js_1.phaseLabel)(s.toPhase)}」`
                                                  : '');
                                          }, style: {
                                              fontSize: suggest_theme_js_1.SF.body, fontWeight: 600, borderRadius: suggest_theme_js_1.SR.ctrl,
                                              padding: '7px 14px', cursor: stale || busy ? 'not-allowed' : 'pointer',
                                              fontFamily: 'inherit',
                                              background: B.bg,
                                              color: B.fg,
                                              border: `1px solid ${B.border}`,
                                          }, children: tone === 'blocked' && suggConfirm[s.suggestionId] === true
                                              ? (0, suggest_confirm_js_1.confirmLabelFor)(s.toPhase)
                                              : B.label }), tone === 'blocked' && suggConfirm[s.suggestionId] === true ? ((0, jsx_runtime_1.jsx)("div", { id: `sugg-confirm-${s.suggestionId}`, role: "status", "aria-live": "polite", style: {
                                              flex: '1 1 100%', fontSize: suggest_theme_js_1.SF.tag, color: suggest_theme_js_1.SC.brand,
                                              borderLeft: `3px solid ${suggest_theme_js_1.SC.brand}`, paddingLeft: 8, lineHeight: 1.5,
                                          }, children: (0, suggest_confirm_js_1.confirmHint)(true, s.toPhase) })) : null, (0, jsx_runtime_1.jsx)("input", { type: "text", value: rejectDraft[s.suggestionId] ?? '', onChange: (e) => setRejectDraft((p) => ({
                                              ...p, [s.suggestionId]: e.target.value
                                          })), placeholder: stale ? '这条建议已失效，无需驳回' : '驳回理由（必填，这是给 Agent 的反馈）', disabled: stale, style: {
                                              flex: '1 1 240px', minWidth: 0,
                                              fontSize: suggest_theme_js_1.SF.body, padding: '7px 10px',
                                              border: `1px solid ${suggest_theme_js_1.SC.line}`, borderRadius: suggest_theme_js_1.SR.ctrl,
                                              fontFamily: 'inherit',
                                              color: suggest_theme_js_1.SC.ink,
                                              background: stale ? suggest_theme_js_1.SC.line : suggest_theme_js_1.SC.face,
                                          } }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: busy || stale || !(rejectDraft[s.suggestionId] ?? '').trim(), title: stale ? '这条建议已失效，无需驳回' : '驳回必须填理由（负样本）', onClick: () => {
                                              void run(async () => {
                                                  const txt = (rejectDraft[s.suggestionId] ?? '').trim();
                                                  const r = await (0, live_js_1.decideProjectPhase)(cur.projectId, s.suggestionId, 'reject', '', txt);
                                                  if (r.ok !== true)
                                                      return { ok: false, code: r.code, message: r.message };
                                                  const rf = await (0, live_js_1.loadPhaseSuggestions)(cur.projectId);
                                                  if (rf.ok === true) {
                                                      setSuggByProj((p) => ({ ...p, [cur.projectId]: rf.data.suggestions }));
                                                  }
                                                  setRejectDraft((p) => { const n = { ...p }; delete n[s.suggestionId]; return n; });
                                                  return { ok: true };
                                              }, '已驳回（理由已记入负样本）');
                                          }, style: {
                                              fontSize: suggest_theme_js_1.SF.body, borderRadius: suggest_theme_js_1.SR.ctrl,
                                              padding: '7px 14px', fontFamily: 'inherit',
                                              cursor: (busy || stale || !(rejectDraft[s.suggestionId] ?? '').trim())
                                                  ? 'not-allowed' : 'pointer',
                                              background: (busy || stale) ? suggest_theme_js_1.SC.line : suggest_theme_js_1.SC.face,
                                              color: suggest_theme_js_1.SC.ink,
                                              border: `1px solid ${(busy || stale) ? suggest_theme_js_1.SC.line : suggest_theme_js_1.SC.ink}`,
                                              fontWeight: (busy || stale) ? 400 : 600,
                                          }, children: "\u2715 \u9A73\u56DE" })] })] }, s.suggestionId));
                  }) }));
          };
          const renderProjectFlow = (cur) => {
              const ph = cur.phase;
              const curIdx = (0, project_phase_js_1.phaseIndex)(ph);
              const nx = (0, project_phase_js_1.nextPhase)(ph);
              const pv = (0, project_phase_js_1.prevPhase)(ph);
              const archived = (0, project_phase_js_1.isArchivedPhase)(ph);
              return ((0, jsx_runtime_1.jsxs)("div", { style: {
                      marginLeft: 12, marginTop: 6, marginBottom: 10,
                      paddingLeft: 10, borderLeft: `2px solid ${theme_js_1.C.accent}44`,
                      display: 'flex', flexDirection: 'column', gap: 8,
                  }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                              ...cardStyle, marginBottom: 6, padding: '8px 12px',
                              display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
                          }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600 }, children: cur.name }), (0, jsx_runtime_1.jsx)("span", { style: { display: 'flex', alignItems: 'center', gap: 2 }, children: project_phase_js_1.PROJECT_PHASES.map((p, i) => {
                                      const done = curIdx > i + 1;
                                      const isCur = curIdx === i + 1;
                                      const canClick = !busy && !isCur;
                                      return ((0, jsx_runtime_1.jsxs)("span", { style: { display: 'flex', alignItems: 'center' }, children: [i > 0 ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: done || isCur ? theme_js_1.C.accent : theme_js_1.C.faint, margin: '0 1px' }, children: "\u203A" })) : null, (0, jsx_runtime_1.jsx)("span", { title: (0, project_phase_js_1.phaseHint)(p) + (canClick ? ' · 点击跳到这一步' : ''), onClick: canClick ? () => {
                                                      void run(async () => {
                                                          const r = await (0, live_js_1.setProjectPhase)(cur.projectId, p);
                                                          return r.ok ? { ok: true } : { ok: false, code: r.code, message: r.message };
                                                      }, `已切到「${(0, project_phase_js_1.phaseLabel)(p)}」`);
                                                  } : undefined, style: {
                                                      fontSize: theme_js_1.FS.tag,
                                                      fontWeight: isCur ? 700 : 400,
                                                      cursor: canClick ? 'pointer' : 'default',
                                                      padding: '2px 6px',
                                                      borderRadius: 4,
                                                      color: isCur ? '#fff' : (done ? theme_js_1.C.accent : theme_js_1.C.dim),
                                                      background: isCur ? theme_js_1.C.accent : 'transparent',
                                                      border: `1px solid ${isCur ? theme_js_1.C.accent : (done ? theme_js_1.C.accent : theme_js_1.C.border)}`,
                                                  }, children: (0, project_phase_js_1.phaseLabel)(p, cur.phase === p ? cur.phaseLabel : undefined) })] }, p));
                                  }) }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: archived ? '#1e7e42' : theme_js_1.C.dim }, children: ["\u7B2C ", curIdx, "/", project_phase_js_1.PROJECT_PHASES.length, " \u6B65"] }), archived ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint }, children: "\u5DF2\u5F52\u6863 \u00B7 \u51BB\u7ED3\u4E0D\u518D\u6539" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [pv !== null ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: busy, onClick: () => {
                                              void run(async () => {
                                                  const r = await (0, live_js_1.setProjectPhase)(cur.projectId, pv);
                                                  return r.ok ? { ok: true } : { ok: false, code: r.code, message: r.message };
                                              }, `已退回「${(0, project_phase_js_1.phaseLabel)(pv)}」`);
                                          }, title: `退回上一步：「${(0, project_phase_js_1.phaseLabel)(pv)}」`, style: { ...btnStyle(false), padding: '3px 10px', fontSize: theme_js_1.FS.tag }, children: ["\u2190 ", (0, project_phase_js_1.phaseLabel)(pv)] })) : null, nx !== null ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: busy, onClick: () => {
                                              void run(async () => {
                                                  const r = await (0, live_js_1.setProjectPhase)(cur.projectId, nx);
                                                  return r.ok ? { ok: true } : { ok: false, code: r.code, message: r.message };
                                              }, `已推进到「${(0, project_phase_js_1.phaseLabel)(nx)}」`);
                                          }, title: (0, project_phase_js_1.phaseHint)(nx), style: { ...btnStyle(true), padding: '3px 10px', fontSize: theme_js_1.FS.tag }, children: [(0, project_phase_js_1.phaseLabel)(nx), " \u2192"] })) : null] }))] }), renderSuggestionCards(cur), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', gap: 6 }, children: TASK_SECTIONS.map((sec) => {
                                      const list = searchedTasks.filter((t) => sec.match(t, myId));
                                      const open = openSec[sec.key] ?? sec.openByDefault;
                                      return ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setOpenSec((p) => ({ ...p, [sec.key]: !open })), "aria-expanded": open, style: {
                                              flex: 1, minWidth: 0,
                                              display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5,
                                              background: open ? 'rgba(59,111,224,0.10)' : '#fff',
                                              border: `${open ? '2px' : '1px'} solid ${open ? theme_js_1.C.accent : '#d0d5dd'}`,
                                              borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                                              padding: open ? '5px 9px' : '6px 10px',
                                              fontFamily: 'inherit', color: theme_js_1.C.text,
                                              transition: 'border-color 160ms, background 160ms',
                                              overflow: 'hidden',
                                          }, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: {
                                                      flex: '0 0 auto', width: 6, height: 6, borderRadius: 3,
                                                      background: list.length > 0 ? theme_js_1.C.accent : '#d0d5dd',
                                                  } }), (0, jsx_runtime_1.jsx)("span", { style: {
                                                      fontSize: theme_js_1.FS.small, fontWeight: 600, whiteSpace: 'nowrap',
                                                      overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0,
                                                      color: list.length > 0 ? theme_js_1.C.text : theme_js_1.C.dim,
                                                  }, children: sec.title }), (0, jsx_runtime_1.jsx)("span", { style: {
                                                      flex: '0 0 auto', minWidth: 16, textAlign: 'center',
                                                      fontSize: theme_js_1.FS.tag, fontWeight: 600,
                                                      color: list.length > 0 ? theme_js_1.C.text : theme_js_1.C.dim,
                                                  }, children: list.length }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: {
                                                      flex: '0 0 auto', marginLeft: 2,
                                                      fontSize: theme_js_1.FS.tag, fontWeight: 600,
                                                      color: open ? theme_js_1.C.accent : '#667085',
                                                      whiteSpace: 'nowrap',
                                                  }, children: open ? '收起 ▴' : '展开 ▾' })] }, sec.key));
                                  }) }), TASK_SECTIONS.map((sec) => {
                                  const list = searchedTasks.filter((t) => sec.match(t, myId));
                                  const open = openSec[sec.key] ?? sec.openByDefault;
                                  if (!open)
                                      return null;
                                  return ((0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }, children: list.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { ...cardStyle, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: sec.empty })) : (list.map((t) => ((0, jsx_runtime_1.jsx)(CardBoundary, { children: (0, jsx_runtime_1.jsx)(TaskCard, { task: t, myId: myId, busy: busy, run: run, projectName: projectNameOf(t.projectId), nodeLabel: nodeLabelOf(t.node_id), allTasks: tasks }) }, t.task_id)))) }, sec.key));
                              })] })] }));
          };
          return ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 16 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, fontWeight: 600 }, children: "\u4EFB\u52A1" }), ['posted', 'claimed', 'in_progress'].map((k) => {
                              const n = countInView(k);
                              return n > 0 ? ((0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: [statusText(k), " ", n] }, k)) : null;
                          }), blockedCount > 0 ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setOpenBlocked((v) => !v), disabled: busy, style: btnStyle(false), title: "\u770B\u8C01\u5728\u6C42\u52A9", children: ["\u6C42\u52A9\u4E2D ", blockedCount] })) : null, pendingCount > 0 ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setOpenPending((v) => !v), disabled: busy, style: btnStyle(false), title: "\u770B\u7B49\u4F60\u5BA1\u6279\u7684\u4EFB\u52A1", children: ["\u5F85\u6211\u5BA1\u6279 ", pendingCount] })) : null, (0, jsx_runtime_1.jsx)("span", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setComposing((v) => !v), disabled: busy, style: btnStyle(true), children: composing ? '收起' : '＋ 新任务' })] }), composing ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...cardStyle, marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                  fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: 1.5,
                                  padding: '6px 8px', borderRadius: 6, border: `1px dashed ${theme_js_1.C.border}`,
                              }, children: "\uD83D\uDCA1 \u4E5F\u53EF\u4EE5\u8BA9\u4F60\u7684 Agent \u53D1\uFF1A\u5BF9\u7BA1\u7406\u4F4D\u7684 Agent \u8BF4\u4E00\u53E5\u300C\u53D1\u4E2A\u5E16\u5B50\uFF1A<\u6807\u9898>\u300D\uFF0C\u5B83\u4F1A\u4EE3\u4F60\u53D1\u5E03\uFF08\u4EFB\u52A1\u5361\u6807\u6CE8\u6765\u6E90 \u00B7 \u7BA1\u7406\u4F4D\u6BCF\u5206\u949F\u53EF\u53D1 10 \u6761\uFF09\u3002" }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                  display: 'flex', flexDirection: 'column', gap: 4,
                                  borderLeft: `3px solid ${title.trim().length === 0 ? '#dc2626' : theme_js_1.C.accent}`,
                                  paddingLeft: 8,
                              }, children: [(0, jsx_runtime_1.jsxs)("label", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, fontWeight: 600 }, children: ["\u4EFB\u52A1\u6807\u9898 ", (0, jsx_runtime_1.jsx)("span", { style: { color: '#dc2626' }, children: "\uFF0A\u5FC5\u586B" }), (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 400, color: theme_js_1.C.faint, marginLeft: 6 }, children: "\u522B\u4EBA\u9760\u5B83\u8BA4\u51FA\u300C\u8FD9\u662F\u54EA\u4E00\u4EF6\u4E8B\u300D" })] }), (0, jsx_runtime_1.jsx)("input", { autoFocus: true, value: title, onChange: (e) => setTitle(e.target.value), onKeyDown: (e) => {
                                          if (e.key === 'Enter' && !e.shiftKey)
                                              onPublish();
                                      }, placeholder: "\u5982\u300C\u5199\u5B8C\u671F5\u9A8C\u6536\u62A5\u544A\u300D", style: {
                                          ...inputStyle,
                                          fontSize: (theme_js_1.FS.tag ?? 12) + 2,
                                          fontWeight: 600,
                                          padding: '8px 10px',
                                          border: `1.5px solid ${title.trim().length === 0 ? theme_js_1.C.border : theme_js_1.C.accent}`,
                                      } })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: [(0, jsx_runtime_1.jsx)("span", { children: "\u6240\u5C5E\u9636\u6BB5" }), (0, jsx_runtime_1.jsx)("select", { value: newPhase, onChange: (e) => { setNewPhase(e.target.value); setPhaseTouched(true); }, style: { ...inputStyle, padding: '3px 6px', flex: '0 0 auto', width: 130 }, children: project_phase_js_1.PROJECT_PHASES.filter((p) => p !== 'archived').map((p) => ((0, jsx_runtime_1.jsx)("option", { value: p, children: (0, project_phase_js_1.phaseLabel)(p) }, p))) }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.faint }, children: "\u8DDF\u9879\u76EE\u5F53\u524D\u9636\u6BB5\u8D70\uFF0C\u53EF\u6539 \u00B7 Agent \u6309\u5B83\u5206\u6D41" })] }), (0, jsx_runtime_1.jsx)("textarea", { value: detail, onChange: (e) => setDetail(e.target.value), placeholder: "\u8865\u5145\u8BF4\u660E\uFF08\u53EF\u7A7A\uFF09", rows: 2, style: { ...inputStyle, resize: 'vertical', fontFamily: 'inherit' } }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u9879\u76EE" }), (0, jsx_runtime_1.jsxs)("select", { value: projId, onChange: (e) => setProjId(e.target.value), style: { ...inputStyle, width: 'auto', flex: 1, minWidth: 140 }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "\uFF08\u5148\u9009\u4E00\u4E2A\u9879\u76EE\uFF09" }), shownProjects.filter((p) => p.status !== 'archived').map((p) => ((0, jsx_runtime_1.jsxs)("option", { value: p.projectId, children: [p.name, "\uFF08", p.taskCount ?? 0, "\uFF09"] }, p.projectId)))] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setProjNew((v) => !v), disabled: busy, style: btnStyle(false), children: projNew ? '取消' : '＋ 新项目' })] }), agentOpts !== null ? ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { children: notify_copy_js_1.NOTIFY_LABEL }), (0, jsx_runtime_1.jsxs)("select", { value: notifyId, onChange: (e) => setNotifyId(e.target.value), style: { ...inputStyle, padding: '3px 6px', flex: '0 0 auto', width: 190 }, children: [(0, jsx_runtime_1.jsx)("option", { value: notify_copy_js_1.NOTIFY_PUBLIC_VALUE, children: notify_copy_js_1.NOTIFY_PUBLIC_LABEL }), notifyChoices.map((c) => ((0, jsx_runtime_1.jsx)("option", { value: c.id, children: c.name }, c.id)))] }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.faint, lineHeight: 1.5 }, children: (0, notify_copy_js_1.notifyPickHint)(notifyPick) })] })) : null, nodeOpts !== null ? ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: 4 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u53D1\u5E03\u5230\u54EA\u4E2A\u5DE5\u4F4D\uFF1F" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 6 }, children: [nodeChoices.map((n) => {
                                              const on = nodeId === n.node_id;
                                              return ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setNodeId(on ? node_pick_js_1.PUBLIC_POOL_VALUE : n.node_id), title: (0, node_pick_js_1.pickerHint)(n), style: {
                                                      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1,
                                                      padding: '4px 8px', borderRadius: 7, cursor: 'pointer', fontFamily: 'inherit',
                                                      border: `1px solid ${on ? theme_js_1.C.accent : theme_js_1.C.border}`,
                                                      background: on ? 'rgba(59,111,224,.10)' : '#fff',
                                                      maxWidth: 180,
                                                  }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                                              fontSize: theme_js_1.FS.tag, fontWeight: on ? 700 : 600,
                                                              color: on ? theme_js_1.C.accent : theme_js_1.C.text, whiteSpace: 'nowrap',
                                                          }, children: (0, node_pick_js_1.nodeChipLabel)(n) }), (0, jsx_runtime_1.jsx)("span", { style: {
                                                              fontSize: 10, color: theme_js_1.C.dim, maxWidth: 164,
                                                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                          }, children: (0, node_pick_js_1.nodeChipWho)(n) })] }, n.node_id));
                                          }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setNodeId(node_pick_js_1.PUBLIC_POOL_VALUE), title: "\u4E0D\u7ED1\u5DE5\u4F4D\uFF0C\u6240\u6709 Agent \u90FD\u80FD\u770B\u5230", style: {
                                                  display: 'flex', alignItems: 'center', padding: '4px 8px', borderRadius: 7,
                                                  cursor: 'pointer', fontFamily: 'inherit',
                                                  border: `1px ${nodeId === node_pick_js_1.PUBLIC_POOL_VALUE ? 'solid' : 'dashed'} ${nodeId === node_pick_js_1.PUBLIC_POOL_VALUE ? theme_js_1.C.accent : theme_js_1.C.border}`,
                                                  background: nodeId === node_pick_js_1.PUBLIC_POOL_VALUE ? 'rgba(59,111,224,.10)' : 'transparent',
                                                  fontSize: theme_js_1.FS.tag, fontWeight: nodeId === node_pick_js_1.PUBLIC_POOL_VALUE ? 700 : 600,
                                                  color: nodeId === node_pick_js_1.PUBLIC_POOL_VALUE ? theme_js_1.C.accent : theme_js_1.C.dim,
                                              }, children: node_pick_js_1.PUBLIC_POOL_LABEL })] }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint }, children: nodePick === null
                                          ? '不绑工位：所有 Agent 都能看到这条'
                                          : `绑到 ${(0, node_pick_js_1.nodeChipLabel)(nodePick)}：只有这个工位的 Agent 会看到` })] })) : null, projNew ? ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("input", { value: projName, onChange: (e) => setProjName(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter')
                                          onCreateProject(); }, placeholder: "\u9879\u76EE\u540D\uFF0C\u5982\u300C\u8D22\u7A0E\u4E13\u5BB6\u5DE5\u4F5C\u53F0\u300D", style: inputStyle }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onCreateProject, disabled: busy || projName.trim().length === 0, style: btnStyle(true), children: "\u5EFA" })] })) : null, projNew ? ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: 1.6 }, children: ["\u5907\u6CE8\uFF1A\u9879\u76EE\u4E00\u7ECF\u521B\u5EFA", (0, jsx_runtime_1.jsx)("strong", { children: "\u4E0D\u53EF\u5220\u9664" }), "\uFF08\u9879\u76EE\u662F\u4EFB\u52A1\u4E0E\u8D44\u6599\u5F52\u6863\u7684\u951A\uFF0C\u5220\u4E86\u5B83\u4EEC\u4F1A\u5931\u53BB\u5F52\u5C5E\uFF09\uFF1B \u6536\u5C3E\u8BF7\u7528\u300C\u5F52\u6863\u300D\uFF0C\u5F52\u6863\u6709\u5305\u53EF\u8FD8\u539F\u3002\u540D\u79F0\u4E8B\u540E\u53EF\u4EE5\u5728\u9879\u76EE\u884C\u91CC\u6539\u3002"] })) : null, (0, jsx_runtime_1.jsxs)("div", { onDragOver: (e) => { e.preventDefault(); setDragOver(true); }, onDragLeave: () => setDragOver(false), onDrop: (e) => {
                                  e.preventDefault();
                                  setDragOver(false);
                                  addDraftFiles(Array.from(e.dataTransfer?.files ?? []));
                              }, style: {
                                  border: `1px dashed ${dragOver ? 'rgba(59,111,224,.75)' : theme_js_1.C.border}`,
                                  background: dragOver ? 'rgba(59,111,224,.06)' : 'transparent',
                                  borderRadius: 6, padding: '8px 10px',
                                  display: 'flex', flexDirection: 'column', gap: 6,
                              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => draftInput.current?.click(), disabled: busy, style: btnStyle(false), children: "\uD83D\uDCCE \u6DFB\u52A0\u9644\u4EF6" }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: dragOver ? '松手就加上' : '也可以把文件直接拖到这里' }), (0, jsx_runtime_1.jsx)("input", { ref: draftInput, type: "file", multiple: true, onChange: (e) => {
                                                  const picked = Array.from(e.target.files ?? []);
                                                  e.target.value = '';
                                                  addDraftFiles(picked);
                                              }, style: { display: 'none' } })] }), draftFiles.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: 3 }, children: [draftFiles.map((f, i) => ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: theme_js_1.FS.tag }, children: [(0, jsx_runtime_1.jsx)("span", { style: { flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: f.name }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: fmtBytes(f.size) }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setDraftFiles((prev) => prev.filter((_, k) => k !== i)), style: {
                                                          border: 'none', background: 'transparent', cursor: 'pointer',
                                                          color: '#b3261e', fontSize: theme_js_1.FS.tag, padding: '0 2px',
                                                      }, title: "\u4ECE\u8FD9\u6B21\u53D1\u5E03\u91CC\u53BB\u6389", children: "\u79FB\u9664" })] }, `${f.name}-${i}`))), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: ["\u5171 ", draftFiles.length, " \u4E2A\uFF0C\u53D1\u5E03\u65F6\u4E00\u8D77\u4E0A\u4F20\u5230\u8FD9\u6B21\u4EFB\u52A1\u7684\u8D44\u6599\u533A\uFF08\u5355\u4EF6\u4E0A\u9650 ", fmtBytes(PACK_MAX_BYTES), "\uFF09"] })] })) : null] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', justifyContent: 'flex-end', gap: 6 }, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onPublish, disabled: busy || title.trim().length === 0, style: btnStyle(true), children: "\u53D1\u5E03" }) })] })) : null, projects.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 14 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, fontWeight: 600 }, children: "\u9879\u76EE" }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: projects.length }), (0, jsx_runtime_1.jsx)("span", { style: { flex: 1 } }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: kw, onChange: (e) => setKw(e.target.value), placeholder: searchMode === 'project' ? '🔍 项目名…' : '🔍 任务关键词（标题+正文，全部项目）…', style: {
                                                  width: searchMode === 'project' ? 240 : 320,
                                                  padding: '5px 9px', fontSize: theme_js_1.FS.tag,
                                                  border: '1px solid ' + theme_js_1.C.border, borderRadius: 6, background: '#fff', color: theme_js_1.C.text,
                                              } }), kw !== '' ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setKw(''), style: { ...btnStyle(false), fontSize: theme_js_1.FS.tag, padding: '3px 7px' }, title: "\u6E05\u7A7A\u5173\u952E\u8BCD", children: "\u6E05\u7A7A" })) : null, (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: [['project', '项目'], ['task', '任务']].map(([k, label]) => ((0, jsx_runtime_1.jsxs)("label", { style: {
                                                      display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer',
                                                      color: searchMode === k ? theme_js_1.C.accent : theme_js_1.C.dim,
                                                      fontWeight: searchMode === k ? 600 : 400,
                                                  }, children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "searchMode083", checked: searchMode === k, onChange: () => setSearchMode(k), style: { cursor: 'pointer', margin: 0 } }), label] }, k))) }), searchMode === 'task' ? ((0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: theme_js_1.FS.tag }, children: [
                                                  ['all', '全部', tasks.filter(searchHit).length],
                                                  ['has', '按项目', tasks.filter(searchHit).filter((t) => typeof t.projectId === 'string' && t.projectId.length > 0).length],
                                                  ['none', '未关联项目', tasks.filter(searchHit).filter((t) => !(typeof t.projectId === 'string' && t.projectId.length > 0)).length],
                                              ].map(([k, label, n]) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setProjTab(k), title: k === 'none'
                                                      ? '没有归到任何项目的任务（任务未关联项目时的正常状态，不是错误）'
                                                      : k === 'has'
                                                          ? '已归到某个项目的任务'
                                                          : '全部任务', style: {
                                                      fontSize: theme_js_1.FS.tag,
                                                      padding: '3px 9px',
                                                      borderRadius: 999,
                                                      cursor: 'pointer',
                                                      border: `1px solid ${projTab === k ? theme_js_1.C.accent : theme_js_1.C.border}`,
                                                      background: projTab === k ? 'rgba(59,111,224,0.10)' : 'transparent',
                                                      color: projTab === k ? theme_js_1.C.accent : theme_js_1.C.dim,
                                                      fontWeight: projTab === k ? 600 : 400,
                                                  }, children: [label, " ", n] }, k))) })) : null] }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u5F52\u6863 = \u6253\u5305\u8D44\u6599 + \u6E05\u5355\uFF0C\u4E0D\u5220\u539F\u4EF6" })] }), pendingArchive !== null ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...cardStyle, marginBottom: 6, borderLeft: '3px solid #c9a227', padding: '9px 11px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, marginBottom: 6 }, children: [(0, jsx_runtime_1.jsxs)("b", { children: ["\u300C", pendingArchive.name, "\u300D\u8FD8\u4E0D\u80FD\u6B63\u5F0F\u5F52\u6863"] }), (0, jsx_runtime_1.jsx)("div", { style: { opacity: 0.75, marginTop: 3 }, children: pendingArchive.message })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", disabled: busy, onClick: () => {
                                                  const t = pendingArchive;
                                                  setPendingArchive(null);
                                                  void run(async () => {
                                                      const rr = await (0, live_js_1.archiveProject)(t.projectId, true);
                                                      if (rr.ok) {
                                                          setProjNotice(`「${t.name}」已暂存 —— 包里标了「不完整」，不能当定稿送审；活干完再正式归档。`);
                                                          const pr = await (0, live_js_1.loadProjects)();
                                                          if (pr.ok)
                                                              setProjects(pr.data.projects);
                                                      }
                                                      return rr;
                                                  });
                                              }, style: btnStyle(true), children: "\u26A0 \u4ECD\u8981\u6682\u5B58\uFF08\u6807\u4E3A\u4E0D\u5B8C\u6574\uFF09" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setPendingArchive(null); setProjNotice('已取消 —— 先把剩下的活干完，再正式归档。'); }, style: btnStyle(false), children: "\u5148\u4E0D\u5F52\u6863" })] })] })) : null, projNotice ? ((0, jsx_runtime_1.jsx)("div", { style: { ...cardStyle, marginBottom: 6, fontSize: theme_js_1.FS.small }, children: projNotice })) : null, searchMode === 'task' && kw.trim() !== '' ? ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginBottom: 6 }, children: ["\u641C\u300C", kw.trim(), "\u300D\uFF1A\u5168\u90E8\u9879\u76EE\u8303\u56F4\uFF0C\u547D\u4E2D ", searchedTasks.length, " \u6761\uFF08\u4E0D\u53D7\u4E0A\u9762\u9879\u76EE\u9009\u4E2D\u5F71\u54CD\uFF09"] })) : null, (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: projects.map((p) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { onClick: (ev) => {
                                              const t = ev.target;
                                              if (t.closest('button, a, input, select, textarea') !== null)
                                                  return;
                                              setProjFilter(p.projectId);
                                          }, title: projFilter === p.projectId ? '当前只显示这个项目的任务' : '点这里只看这个项目的任务', style: {
                                              ...cardStyle,
                                              display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
                                              border: projFilter === p.projectId ? `1px solid ${theme_js_1.C.accent}` : `1px solid ${theme_js_1.C.border}`,
                                              background: projFilter === p.projectId ? 'rgba(59,111,224,0.04)' : theme_js_1.C.soft,
                                              padding: '12px 14px',
                                              cursor: 'pointer',
                                              transition: 'border-color 160ms, background 160ms',
                                              boxShadow: projHit(p.projectId, p.name) ? 'inset 3px 0 0 0 #C58A1F' : undefined,
                                          }, children: [renaming !== null && renaming.projectId === p.projectId ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { autoFocus: true, value: renaming.name, onChange: (e) => setRenaming({ projectId: p.projectId, name: e.target.value }), onKeyDown: (e) => {
                                                              if (e.key === 'Enter')
                                                                  onRenameProject();
                                                              if (e.key === 'Escape')
                                                                  setRenaming(null);
                                                          }, placeholder: "\u65B0\u9879\u76EE\u540D", style: { ...inputStyle, width: 'auto', flex: 1, minWidth: 140 } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onRenameProject, disabled: busy || renaming.name.trim().length === 0, style: btnStyle(true), children: "\u5B58" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setRenaming(null), disabled: busy, style: btnStyle(false), children: "\u53D6\u6D88" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600 }, children: p.name }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: [p.taskCount ?? 0, " \u4E2A\u4EFB\u52A1"] }), p.status === 'archived' ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: '#8a6d3b' }, children: "\u5DF2\u5F52\u6863\uFF08\u8D44\u6599\u7167\u65E7\uFF0C\u968F\u65F6\u80FD\u53D6\u6D88\uFF09" })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setRenaming({ projectId: p.projectId, name: p.name }), disabled: busy, style: {
                                                              border: 'none', background: 'transparent', cursor: 'pointer',
                                                              color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag, padding: '0 2px',
                                                          }, title: "\u6539\u9879\u76EE\u540D\uFF08\u9879\u76EE\u7684 id \u4E0D\u53D8\uFF0C\u6302\u5728\u8FD9\u4E2A\u9879\u76EE\u4E0B\u7684\u4EFB\u52A1\u548C\u8D44\u6599\u90FD\u4E0D\u53D7\u5F71\u54CD\uFF09", children: "\u6539\u540D" }))] })), (0, jsx_runtime_1.jsx)("span", { style: { flex: 1 } }), p.status === 'archived' ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void requestAudit(p.projectId), disabled: busy || (audit !== null && audit.projectId === p.projectId && (audit.status === 'queued' || audit.status === 'running')), style: {
                                                              padding: '5px 11px', borderRadius: 6, border: 'none',
                                                              background: audit !== null && audit.projectId === p.projectId && (audit.status === 'queued' || audit.status === 'running') ? 'rgba(0,0,0,.12)' : '#1f2937',
                                                              color: '#fff', cursor: busy ? 'default' : 'pointer',
                                                              fontSize: theme_js_1.FS.tag, fontWeight: 600, whiteSpace: 'nowrap',
                                                          }, title: "\u628A\u8FD9\u4EFD\u5B9A\u7A3F\u9001\u53BB\u5BA1 \u2014\u2014 \u56DB\u706F\u5BA1\u5B8C\u7ED9\u4E00\u4EFD\u5E26\u5BC6\u7801\u5B66\u7B7E\u540D\u7684\u62A5\u544A", children: audit !== null && audit.projectId === p.projectId && (audit.status === 'queued' || audit.status === 'running') ? '审计中…' : '🔍 申请审计' }), audit !== null && audit.projectId === p.projectId && (audit.status === 'queued' || audit.status === 'running') ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, whiteSpace: 'nowrap' }, children: "\u5DF2\u9001\u53BB\u5BA1\u8BA1 \u2014\u2014 \u56DB\u706F\u5728\u770B\u8D44\u6599\uFF0C\u51E0\u5206\u949F\u540E\u51FA\u7ED3\u8BBA" })) : null, (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onDownloadArchive(p), disabled: busy, style: btnStyle(true), title: "\u4E0B\u8F7D\u5F52\u6863\u5305\uFF1A\u538B\u7F29\u6587\u4EF6 + manifest.json \u6E05\u5355\uFF08\u8C01\u4EA4\u7684 / \u4EC0\u4E48\u65F6\u5019 / \u591A\u5927 / sha256\uFF09", children: "\u2B07 \u4E0B\u8F7D\u5F52\u6863\u5305" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onUnarchive(p), disabled: busy, style: btnStyle(false), title: "\u53D6\u6D88\u5F52\u6863\uFF1A\u9879\u76EE\u56DE\u5230\u5217\u8868\uFF0C\u4EFB\u52A1\u4E0E\u8D44\u6599\u90FD\u4E0D\u52A8", children: "\u53D6\u6D88\u5F52\u6863" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onArchive(p), disabled: busy, style: btnStyle(true), title: "\u6253\u5305\u8FD9\u4E2A\u9879\u76EE\u7684\u5168\u90E8\u4EFB\u52A1\u8D44\u6599 + manifest \u6E05\u5355\uFF08\u4E0D\u5220\u539F\u4EF6\uFF09", children: "\u5F52\u6863" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void requestAudit(p.projectId), disabled: busy, style: btnStyle(false), title: "\u9001\u5BA1\u8981\u6C42\u5148\u5F52\u6863 \u2014\u2014 \u70B9\u5B83\u4F1A\u63D0\u793A\u4F60\u5148\u5F52\u6863\uFF0C\u5B9A\u7A3F\u540E\u518D\u9001", children: "\uD83D\uDD0D \u7533\u8BF7\u5BA1\u8BA1" })] }))] }, p.projectId), p.projectId === projFilter ? renderProjectFlow(p) : null] }))) })] })) : null, projErr !== null ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...cardStyle, marginBottom: 6, borderColor: '#e5b4b4', fontSize: theme_js_1.FS.tag, color: '#9b2c2c' }, children: ["\u9879\u76EE\u6E05\u5355\u8BFB\u4E0D\u5230\uFF08", projErr.code, "\uFF09\uFF1A", projErr.message] })) : null, audit !== null ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...cardStyle, marginBottom: 6 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 600, marginBottom: 4, fontSize: theme_js_1.FS.small }, children: audit.status === 'queued' || audit.status === 'running'
                                  ? '⏳ 审计中 —— 四灯在看资料，几分钟'
                                  : audit.report?.verdict === 'pass'
                                      ? '✅ 审计通过'
                                      : audit.report?.verdict === 'fail'
                                          ? '❌ 审计没通过'
                                          : audit.report?.verdict === 'warn'
                                              ? '⚡ 有条件通过（有需要处理的提醒）'
                                              : '审计未完成' }), (() => {
                              const b = audit.neutralityBanner;
                              if (!b)
                                  return null;
                              const red = b.red_flag === true;
                              const legacy = b.level === 'legacy';
                              const okLv = b.level === 'ok';
                              const nz = audit.report?.neutrality_checks;
                              const failed = nz?.checks
                                  ? Object.entries(nz.checks).filter(([, v]) => v && v.passed !== true)
                                  : [];
                              return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                      margin: '6px 0 8px',
                                      padding: red ? '8px 10px' : '6px 10px',
                                      borderRadius: 6,
                                      background: red ? '#fdecea' : legacy ? '#f4f5f7' : '#eef8f1',
                                      border: red ? '1px solid #c0392b' : legacy ? `1px solid ${theme_js_1.C.border}` : '1px solid #bfe3cd',
                                      borderLeft: red ? '4px solid #c0392b' : undefined,
                                  }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                              fontSize: theme_js_1.FS.tag,
                                              fontWeight: red ? 700 : 600,
                                              color: red ? '#c0392b' : legacy ? theme_js_1.C.dim : '#1e7e42',
                                              lineHeight: 1.5,
                                          }, children: b.text || (red ? '⚠ 本报告未经过完整的中立性自证' : '') }), red && failed.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { style: { margin: '5px 0 0', paddingLeft: 18, fontSize: theme_js_1.FS.tag, color: '#8e2b20', lineHeight: 1.6 }, children: failed.map(([k, v]) => ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("b", { children: NEUTRALITY_LABEL[k] || k }), v?.detail ? ` —— ${v.detail}` : ''] }, k))) })) : null, okLv && typeof nz?.passed_count === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: '#1e7e42', marginTop: 3, opacity: 0.85 }, children: [nz.passed_count, "/", nz.total, " \u6761\u5224\u636E\u901A\u8FC7 \u00B7 \u62A5\u544A\u5185\u5DF2\u8BB0\u5F55\u9010\u6761\u660E\u7EC6\uFF0C\u53EF\u51ED\u516C\u94A5\u72EC\u7ACB\u9A8C\u7B7E"] })) : null] }));
                          })(), audit.report?.summary ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, whiteSpace: 'pre-wrap', maxHeight: 260, overflow: 'auto', lineHeight: 1.6 }, children: String(audit.report.summary).slice(0, 3000) })) : null, audit.report?.error ? ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: '#d97706', marginTop: 4 }, children: ["\u573A\u666F\u672A\u8DD1\u5B8C\uFF1A", String(audit.report.message || audit.report.error)] })) : null, (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 6 }, children: ["\u5BA1\u8BA1\u5355 ", audit.id, "\uFF08\u7ED3\u8BBA\u53EF\u9A8C\u7B7E\uFF09"] })] })) : null, openBlocked && blocked.kind === 'err' ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...cardStyle, marginBottom: 8, fontSize: theme_js_1.FS.small }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 600, marginBottom: 4 }, children: "\u6C42\u52A9\u5217\u8868\u8BFB\u4E0D\u5230" }), (0, jsx_runtime_1.jsx)("div", { style: { color: LAMP_COLOR.amber }, children: blocked.message }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag, marginTop: 2 }, children: blocked.code })] })) : null, openBlocked && blocked.kind === 'ok' ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...cardStyle, marginBottom: 8 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600, marginBottom: 4 }, children: ["\u6C42\u52A9\u4E2D ", blocked.rows.length] }), blocked.rows.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u6CA1\u6709\u6C42\u52A9\u3002" })) : (blocked.rows.map((row, i) => {
                              const id = rowId(row);
                              return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontSize: theme_js_1.FS.small }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600 }, children: rowTitle(row) }), (0, jsx_runtime_1.jsx)("span", { style: {
                                              color: theme_js_1.C.dim,
                                              flex: 1,
                                              minWidth: 0,
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                              whiteSpace: 'nowrap',
                                          }, title: rowReason(row), children: rowReason(row) }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: busy || id.length === 0, onClick: () => void run(async () => unblockTask(id), '已解除求助'), style: btnStyle(false), children: "\u89E3\u9664" })] }, id.length > 0 ? id : `blocked-${i}`));
                          }))] })) : null, openPending && pending.kind === 'err' ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...cardStyle, marginBottom: 8, fontSize: theme_js_1.FS.small }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 600, marginBottom: 4 }, children: "\u5F85\u5BA1\u6279\u5217\u8868\u8BFB\u4E0D\u5230" }), (0, jsx_runtime_1.jsx)("div", { style: { color: LAMP_COLOR.amber }, children: pending.message }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag, marginTop: 2 }, children: pending.code })] })) : null, openPending && pending.kind === 'ok' ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...cardStyle, marginBottom: 8 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600, marginBottom: 4 }, children: ["\u5F85\u6211\u5BA1\u6279 ", pending.rows.length] }), pending.rows.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u6CA1\u6709\u7B49\u4F60\u5BA1\u6279\u7684\u4EFB\u52A1\u3002" })) : (pending.rows.map((row, i) => {
                              const id = rowId(row);
                              return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontSize: theme_js_1.FS.small }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600 }, children: rowTitle(row) }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag }, children: statusText(str(row.status) || 'submitted') })] }, id.length > 0 ? id : `pending-${i}`));
                          })), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 4 }, children: "\u5728\u4E0B\u65B9\u4EFB\u52A1\u5361\u7247\u4E0A\u300C\u901A\u8FC7 / \u9A73\u56DE\u300D\u3002" })] })) : null, notice !== null ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: '#16a34a', marginBottom: 6 }, children: notice })) : null, err !== null ? ((0, jsx_runtime_1.jsxs)("div", { style: { ...cardStyle, fontSize: theme_js_1.FS.small, color: err.code === 'not_configured' ? theme_js_1.C.dim : '#d97706' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 600, marginBottom: 4 }, children: err.title ??
                                  (err.code === 'not_configured'
                                      ? '任务面板还没接服务端'
                                      : err.source === 'action'
                                          ? '操作没成功'
                                          : '任务读不到') }), (0, jsx_runtime_1.jsx)("div", { children: err.message })] })) : data === null ? ((0, jsx_runtime_1.jsx)("div", { style: { ...cardStyle, color: theme_js_1.C.dim, fontSize: theme_js_1.FS.small }, children: "\u6B63\u5728\u8BFB\u53D6\u4EFB\u52A1\u2026" })) : searchedTasks.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { ...cardStyle, color: theme_js_1.C.dim, fontSize: theme_js_1.FS.small }, children: kwNorm !== '' && searchMode === 'task'
                          ? `没搜到含「${kw.trim()}」的任务（标题和正文都搜了，全部项目范围）。`
                          : tasks.length === 0
                              ? '还没有任务 —— 点右上「＋ 新任务」发第一条。'
                              : '这个项目下还没有任务 —— 点上面别的项目卡片，看那个项目的任务。' })) : null] }));
      }
      const inputStyle = {
          padding: '8px 10px',
          borderRadius: 8,
          border: `1px solid ${theme_js_1.C.border}`,
          background: 'transparent',
          color: theme_js_1.C.text,
          fontSize: theme_js_1.FS.small,
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
      };
      function shortResult(v) {
          let s = '';
          try {
              s = typeof v === 'string' ? v : JSON.stringify(v) ?? String(v);
          }
          catch {
              s = String(v);
          }
          try {
              const o = JSON.parse(s);
              if (o && typeof o === 'object') {
                  s = String(o.detail || o.summary || o.message || o.verdict || s);
              }
          }
          catch { }
          s = s.replace(/\s+/g, ' ').trim();
          return s.length > 56 ? s.slice(0, 56) + '…' : s;
      }
      function prettyResult(v) {
          try {
              const s = typeof v === 'string' ? v : JSON.stringify(v) ?? String(v);
              try {
                  return JSON.stringify(JSON.parse(s), null, 2);
              }
              catch {
                  return s;
              }
          }
          catch {
              return '';
          }
      }
      class CardBoundary extends react_1.Component {
          state = { failed: false };
          static getDerivedStateFromError() { return { failed: true }; }
          componentDidCatch(e, info) {
              console.warn('[kaipu] 任务卡渲染失败：', e?.message, info?.componentStack?.slice(0, 200));
          }
          render() {
              if (this.state.failed) {
                  return ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, padding: '6px 10px',
                          border: `1px dashed ${theme_js_1.C.border}`, borderRadius: 6 }, children: "\u8FD9\u5F20\u5361\u7684\u5185\u5BB9\u683C\u5F0F\u5F02\u5E38\uFF0C\u663E\u793A\u4E0D\u51FA\u6765\uFF08\u5176\u5B83\u4EFB\u52A1\u4E0D\u53D7\u5F71\u54CD\uFF09" }));
              }
              return this.props.children;
          }
      }
      function TaskCard(props) {
          const { task, myId, busy, run } = props;
          const st = normStatus(task.status);
          const tone = statusTone(task.status);
          const [ask, setAsk] = (0, react_1.useState)(null);
          const dlgRef = (0, react_1.useRef)(null);
          (0, react_1.useEffect)(() => {
              if (ask !== 'done')
                  return;
              const el = dlgRef.current;
              if (el === null)
                  return;
              const fix = () => {
                  const r = el.getBoundingClientRect();
                  const dx = window.innerWidth / 2 - (r.left + r.width / 2);
                  const dy = window.innerHeight / 2 - (r.top + r.height / 2);
                  el.style.transform = (Math.abs(dx) > 2 || Math.abs(dy) > 2)
                      ? `translate(${Math.round(dx)}px, ${Math.round(dy)}px)` : '';
              };
              const t = window.setTimeout(fix, 0);
              window.addEventListener('resize', fix);
              return () => { window.clearTimeout(t); window.removeEventListener('resize', fix); };
          }, [ask]);
          const [askText, setAskText] = (0, react_1.useState)('');
          const [open, setOpen] = (0, react_1.useState)(false);
          const [copied, setCopied] = (0, react_1.useState)(false);
          const hasFiles = (task.fileCount ?? 0) > 0;
          const openPack = () => {
              if (typeof window === 'undefined')
                  return;
              const iid = task.interactionId || `task-${task.task_id}`;
              window.dispatchEvent(new CustomEvent('kaipu:open-pack', {
                  detail: { interactionId: iid, title: task.title },
              }));
          };
          const copyTask = async () => {
              const text = [
                  task.detail ? `${task.title}\n\n${task.detail}` : task.title,
                  '',
                  `—— 工位任务 ID：${task.task_id}`,
                  `干完直接交：kai-pu-deliver.py --task ${task.task_id} --claim --attach <产物路径> --text "<结论>"`,
              ].join('\n');
              const nav = typeof navigator !== 'undefined' ? navigator : undefined;
              try {
                  if (nav?.clipboard?.writeText)
                      await nav.clipboard.writeText(text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
              }
              catch { }
          };
          const submitAsk = () => {
              const text = askText.trim();
              if (ask === null)
                  return;
              if (ask === 'block') {
                  if (text.length === 0)
                      return;
                  void run(async () => blockTask(task.task_id, text), '已发起求助');
              }
              else if (ask === 'done') {
                  if (text.length === 0)
                      return;
                  void run(async () => (0, live_js_1.finishTask)(task.task_id, text), '已交付');
              }
              else {
                  void run(async () => rejectTask(task.task_id, myId ?? '', text), '已驳回');
              }
              setAsk(null);
              setAskText('');
          };
          return ((0, jsx_runtime_1.jsxs)("div", { style: { ...cardStyle, padding: '10px 12px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { width: 6, height: 6, borderRadius: 999, background: tone, flex: '0 0 auto' } }), (0, jsx_runtime_1.jsxs)("span", { onClick: () => setOpen((v) => !v), title: open ? '收起详情' : '点开看详情', style: { fontSize: theme_js_1.FS.small, fontWeight: 600, flex: 1, minWidth: 0, cursor: 'pointer' }, children: [open ? '▾ ' : '▸ ', task.title] }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: tone }, children: statusText(task.status) }), props.projectName ? ((0, jsx_runtime_1.jsx)("span", { title: `属于项目「${props.projectName}」`, style: {
                                  fontSize: theme_js_1.FS.tag,
                                  color: theme_js_1.C.dim,
                                  border: `1px solid ${theme_js_1.C.border}`,
                                  borderRadius: 6,
                                  padding: '1px 6px',
                                  maxWidth: 140,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                              }, children: props.projectName })) : ((0, jsx_runtime_1.jsx)("span", { title: "\u8FD9\u6761\u4EFB\u52A1\u6CA1\u6709\u5F52\u5230\u4EFB\u4F55\u9879\u76EE\uFF08\u4EFB\u52A1\u672A\u5173\u8054\u9879\u76EE\u65F6\u7684\u6B63\u5E38\u72B6\u6001\uFF0C\u4E0D\u662F\u9519\u8BEF\uFF09", style: {
                                  fontSize: theme_js_1.FS.tag,
                                  color: theme_js_1.C.dim,
                                  padding: '0 2px',
                                  opacity: 0.5,
                                  whiteSpace: 'nowrap',
                              }, children: "\u672A\u5173\u8054\u9879\u76EE" })), (0, jsx_runtime_1.jsx)("span", { title: props.nodeLabel && props.nodeLabel.length > 0
                                  ? `绑到工位「${props.nodeLabel}」：只有这个工位的 Agent 会看到`
                                  : '公共池：所有 Agent 都能看到', style: {
                                  fontSize: theme_js_1.FS.tag,
                                  color: props.nodeLabel && props.nodeLabel.length > 0 ? theme_js_1.C.accent : theme_js_1.C.dim,
                                  border: `1px ${props.nodeLabel && props.nodeLabel.length > 0 ? 'solid' : 'dashed'} ${theme_js_1.C.border}`,
                                  borderRadius: 6, padding: '1px 6px', whiteSpace: 'nowrap',
                              }, children: (0, node_pick_js_1.taskBindingText)(props.nodeLabel ?? '', '') }), (0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: openPack, title: (task.fileCount ?? 0) > 0
                                  ? `看「${task.title}」的附件（${task.fileCount} 个）`
                                  : '这次任务还没有附件；点开资料区即可上传到该任务', style: {
                                  ...btnStyle((task.fileCount ?? 0) > 0),
                                  padding: '2px 8px',
                                  fontSize: theme_js_1.FS.tag,
                                  minWidth: 48,
                              }, children: ["\uD83D\uDCCE ", task.fileCount ?? 0] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                  void (async () => {
                                      if (st === 'posted')
                                          await run(async () => (0, live_js_1.claimTask)(task.task_id), '已领取');
                                      await copyTask();
                                  })();
                              }, title: st === 'posted' ? '领取这条任务，并把任务内容复制给 Agent' : '复制这条任务的标题和内容', style: {
                                  ...btnStyle(true),
                                  padding: '2px 8px',
                                  fontSize: theme_js_1.FS.tag,
                                  minWidth: 62,
                                  background: copied ? '#1f7a3d' : theme_js_1.C.accent,
                                  color: '#ffffff',
                                  border: '1px solid transparent',
                                  ...(st === 'posted' || copied ? {} : {
                                      background: 'transparent', color: theme_js_1.C.text, border: `1px solid ${theme_js_1.C.border}`,
                                  }),
                                  transition: 'background 160ms',
                              }, children: copied ? '✓ 已复制' : st === 'posted' ? '领取并复制' : '复制' })] }), (() => {
                      const when = taskWhen(task, st);
                      if (when === null)
                          return null;
                      const shown = fmtWhen(when.at);
                      if (shown === '')
                          return null;
                      return ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, marginTop: 3, paddingLeft: 14, lineHeight: 1.45 }, children: [task.kind && task.kind !== 'other' ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                      display: 'inline-block', marginRight: 6, padding: '0 5px',
                                      borderRadius: 3, fontSize: theme_js_1.FS.tag,
                                      color: KIND_COLOR[task.kind] ?? theme_js_1.C.dim,
                                      background: (KIND_COLOR[task.kind] ?? theme_js_1.C.dim) + '14',
                                      border: `1px solid ${(KIND_COLOR[task.kind] ?? theme_js_1.C.dim)}33`,
                                  }, children: KIND_LABEL[task.kind] ?? task.kind })) : null, task.createdByName !== undefined && task.createdByName !== ''
                                  ? (0, jsx_runtime_1.jsxs)("div", { children: ["\u53D1\u5E03\u4EBA\uFF1A", task.createdByName] }) : null, (0, jsx_runtime_1.jsxs)("div", { children: [when.label, "\uFF1A", shown] })] }));
                  })(), open && task.detail ? ((0, jsx_runtime_1.jsx)("div", { style: {
                          fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 4, whiteSpace: 'pre-wrap',
                          maxHeight: 260, overflow: 'auto',
                      }, children: task.detail })) : null, task.result ? (open ? ((0, jsx_runtime_1.jsx)("div", { style: {
                          fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 6, whiteSpace: 'pre-wrap',
                          maxHeight: 320, overflow: 'auto',
                          background: 'rgba(0,0,0,.03)', borderRadius: 4, padding: '6px 8px',
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', lineHeight: 1.5,
                      }, children: prettyResult(task.result) })) : ((0, jsx_runtime_1.jsxs)("div", { style: {
                          fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, marginTop: 4,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }, title: String(task.result), children: ["\u4EA4\u4ED8\uFF1A", shortResult(task.result)] }))) : null, open ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(task_deps_ui_js_1.TaskDepsSection, { taskId: task.task_id, allTasks: props.allTasks ?? [], run: run }), (0, jsx_runtime_1.jsx)(task_deps_ui_js_1.DeliverableVersionsSection, { taskId: task.task_id, run: run })] })) : null, (0, jsx_runtime_1.jsxs)("div", { style: { display: ask !== null ? 'none' : 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }, children: [(st === 'in_progress' || st === 'claimed') && ask !== 'done' ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                  setOpen(true);
                                  setAsk('done');
                                  setAskText(String(task.result ?? task.detail ?? '').trim());
                              }, disabled: busy, style: btnStyle(true), children: "\u4EA4\u4ED8" })) : null, st === 'claimed' || st === 'in_progress' ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                  setAsk('block');
                                  setAskText('');
                              }, disabled: busy, style: btnStyle(false), children: "\u6C42\u52A9" })) : null, st === 'blocked' ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void run(async () => unblockTask(task.task_id), '已解除求助'), disabled: busy, style: btnStyle(true), children: "\u89E3\u9664\u6C42\u52A9" })) : null, st === 'submitted' && canApprove(task, myId) ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => void run(async () => approveTask(task.task_id, myId ?? '', ''), '已通过'), disabled: busy, style: btnStyle(true), children: "\u901A\u8FC7" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                          setAsk('reject');
                                          setAskText('');
                                      }, disabled: busy, style: btnStyle(false), children: "\u9A73\u56DE" })] })) : null] }), ask !== null ? ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6, marginTop: 6, alignItems: ask === 'done' ? 'stretch' : 'center', flexDirection: ask === 'done' ? 'column' : 'row' }, children: [ask === 'done' ? ((0, jsx_runtime_1.jsx)("div", { onClick: (e) => { if (e.target === e.currentTarget) {
                                  setAsk(null);
                                  setAskText('');
                              } }, style: { position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,.45)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }, children: (0, jsx_runtime_1.jsxs)("div", { ref: dlgRef, style: { width: 'min(760px, 100%)', maxHeight: '86vh', display: 'flex', flexDirection: 'column',
                                      gap: 10, padding: 18, borderRadius: 12, border: `1px solid ${theme_js_1.C.border}`,
                                      background: 'var(--dsh-bg, #fff)', boxShadow: '0 16px 48px rgba(0,0,0,.35)' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.heading, fontWeight: 600, lineHeight: 1.4 }, children: ["\u4EA4\u4ED8 \u00B7 ", task.title] }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: hasFiles ? `这个任务已有 ${task.fileCount} 个附件 · 说明可以留空` : '这个任务没有附件 · 需要至少 100 字说明' }), (() => {
                                          const fromResult = String(task.result ?? '').trim();
                                          const fromDetail = String(task.detail ?? '').trim();
                                          const prefill = fromResult || fromDetail;
                                          if (!prefill || askText.trim() !== prefill)
                                              return null;
                                          return ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: 1.5 }, children: fromResult
                                                  ? '已带入 Agent 提交的交付说明 —— 你在这里做的是审核确认（可直接提交，也可改后提交）'
                                                  : '已带入任务说明（Agent 若另有交付结果，请替换成结果）—— 确认后提交' }));
                                      })(), (0, jsx_runtime_1.jsx)("textarea", { autoFocus: true, value: askText, onChange: (e) => setAskText(e.target.value), rows: 14, placeholder: hasFiles
                                              ? '可选：补充说明（这个任务已有附件，说明可以留空，也可写结论/遗留）'
                                              : '交付说明：做了什么、结论是什么、还差什么（至少 100 字）', style: { width: '100%', flex: 1, minHeight: 260, padding: 10, borderRadius: 8,
                                              border: `1px solid ${theme_js_1.C.border}`, background: 'transparent', color: theme_js_1.C.text,
                                              fontSize: theme_js_1.FS.base, lineHeight: 1.6, resize: 'vertical',
                                              boxSizing: 'border-box', outlineOffset: -1 } }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: (hasFiles || askText.trim().length >= 100) ? '#16a34a' : theme_js_1.C.faint }, children: hasFiles ? `有附件 ${task.fileCount} 个 · 说明可留空` : `${askText.trim().length} / 100` }), (0, jsx_runtime_1.jsx)("span", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: submitAsk, disabled: busy || (!hasFiles && askText.trim().length < 100), style: btnStyle(true), children: "\u786E\u8BA4\u4EA4\u4ED8" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setAsk(null); setAskText(''); }, disabled: busy, style: btnStyle(false), children: "\u53D6\u6D88" })] })] }) })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { autoFocus: true, value: askText, onChange: (e) => setAskText(e.target.value), onKeyDown: (e) => {
                                          if (e.key === 'Enter')
                                              submitAsk();
                                          if (e.key === 'Escape') {
                                              setAsk(null);
                                              setAskText('');
                                          }
                                      }, placeholder: ask === 'block' ? '求助原因（必填）' : '驳回意见（可空）', style: inputStyle }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: submitAsk, disabled: busy || (ask === 'block' && askText.trim().length === 0), style: btnStyle(true), children: ask === 'block' ? '提交求助' : '确认驳回' })] })), ask === 'done' ? null : ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                  setAsk(null);
                                  setAskText('');
                              }, disabled: busy, style: btnStyle(false), children: "\u53D6\u6D88" }))] })) : null] }));
      }
      const JOIN_REQ_KEY = 'kaipu.join.requestId';
      const SEAT_INVITE_URL_KEY = 'kaipu.seat.inviteUrl.v1';
      const JOIN_WHO_KEY = 'kaipu.join.applicantId';
      function safeGet(key) {
          try {
              return globalThis.localStorage?.getItem(key) ?? '';
          }
          catch {
              return '';
          }
      }
      function safeSet(key, value) {
          try {
              globalThis.localStorage?.setItem(key, value);
          }
          catch {
          }
      }
      function safeRemove(key) {
          try {
              globalThis.localStorage?.removeItem(key);
          }
          catch {
          }
      }
      function applicantId() {
          const old = safeGet(JOIN_WHO_KEY);
          if (old.length > 0)
              return old;
          const fresh = `human-${newUuid().replace(/-/g, '').slice(0, 10)}`;
          safeSet(JOIN_WHO_KEY, fresh);
          return fresh;
      }
      async function copyText(text) {
          try {
              await navigator.clipboard.writeText(text);
              return true;
          }
          catch {
              return false;
          }
      }
      function JoinCodeCard({ compact, onOpenGuide }) {
          const [code, setCode] = (0, react_1.useState)(null);
          const [ttl, setTtl] = (0, react_1.useState)(24);
          const [busy, setBusy] = (0, react_1.useState)(false);
          const [copied, setCopied] = (0, react_1.useState)(false);
          const [guideCopied, setGuideCopied] = (0, react_1.useState)(false);
          const [guideOpen, setGuideOpen] = (0, react_1.useState)(false);
          const [err, setErr] = (0, react_1.useState)('');
          const [owner, setOwner] = (0, react_1.useState)(null);
          const [memberOwnerName, setMemberOwnerName] = (0, react_1.useState)('');
          const [waiting, setWaiting] = (0, react_1.useState)([]);
          const [rowBusy, setRowBusy] = (0, react_1.useState)('');
          const [rowErr, setRowErr] = (0, react_1.useState)('');
          const [issued, setIssued] = (0, react_1.useState)(null);
          const [issuedCopied, setIssuedCopied] = (0, react_1.useState)(false);
          const [codesOpen, setCodesOpen] = (0, react_1.useState)(false);
          const [passersOpen, setPassersOpen] = (0, react_1.useState)(false);
          const [rejectFor, setRejectFor] = (0, react_1.useState)('');
          const [rejectWhy, setRejectWhy] = (0, react_1.useState)('');
          const [codeRows, setCodeRows] = (0, react_1.useState)([]);
          const [codePlain, setCodePlain] = (0, react_1.useState)({});
          const [listErr, setListErr] = (0, react_1.useState)('');
          const [rowCodeBusy, setRowCodeBusy] = (0, react_1.useState)('');
          const [batch, setBatch] = (0, react_1.useState)(1);
          const [folded, setFolded] = (0, react_1.useState)(true);
          const [myId, setMyId] = (0, react_1.useState)('');
          const [myStatus, setMyStatus] = (0, react_1.useState)('');
          const [myCode, setMyCode] = (0, react_1.useState)('');
          const [myCodeState, setMyCodeState] = (0, react_1.useState)('none');
          const [ridCopied, setRidCopied] = (0, react_1.useState)(false);
          const [askOpen, setAskOpen] = (0, react_1.useState)(false);
          const [askWhy, setAskWhy] = (0, react_1.useState)('');
          const [askBusy, setAskBusy] = (0, react_1.useState)(false);
          const [askErr, setAskErr] = (0, react_1.useState)('');
          const [askDone, setAskDone] = (0, react_1.useState)(false);
          const [myCopied, setMyCopied] = (0, react_1.useState)(false);
          const refreshMine = (rid) => {
              if (rid.length === 0)
                  return;
              void (async () => {
                  const r = await callPack('joinRequestGet', { requestId: rid });
                  if (!r.ok)
                      return;
                  const serverCode = typeof r.data.joinCode === 'string' ? r.data.joinCode : '';
                  const localCode = safeGet((0, join_copy_js_1.codeStoreKey)(rid));
                  if (serverCode.length > 0)
                      safeSet((0, join_copy_js_1.codeStoreKey)(rid), serverCode);
                  setMyStatus(r.data.status);
                  setMyCodeState((0, join_copy_js_1.applicantCodeState)(r.data.status, serverCode, localCode));
                  setMyCode(serverCode.length > 0 ? serverCode : localCode);
              })();
          };
          (0, react_1.useEffect)(() => {
              let alive = true;
              void (async () => {
                  const shops = await callPack('tenantShops', {});
                  if (!alive)
                      return;
                  const roleFromServer = shops.ok
                      ? (shops.data.currentRole
                          || shops.data.shops?.find((s) => s.accountId === shops.data.current)?.role
                          || '')
                      : '';
                  if (shops.ok) {
                      const cur = shops.data.shops?.find((s) => s.accountId === shops.data.current);
                      setMemberOwnerName((cur?.ownerName ?? '').trim());
                  }
                  if (roleFromServer === 'owner') {
                      const r = await callPack('joinRequests', { status: 'pending' });
                      if (!alive)
                          return;
                      setOwner(true);
                      if (r.ok) {
                          setWaiting(r.data.items);
                          return;
                      }
                      if (typeof console !== 'undefined') {
                          console.warn('[kaipu] 身份已是铺主，但待审批列表读取失败（不影响身份判定）：', r.message);
                      }
                      return;
                  }
                  setOwner(false);
                  const me = await callPack('whoami', {});
                  if (!alive)
                      return;
                  const key = me.ok ? (0, join_copy_js_1.reqStoreKey)(me.data.accountId, applicantId()) : JOIN_REQ_KEY;
                  let rid = safeGet(key);
                  if (rid.length === 0 && key !== JOIN_REQ_KEY)
                      rid = safeGet(JOIN_REQ_KEY);
                  if (rid.length > 0) {
                      setMyId(rid);
                      refreshMine(rid);
                  }
              })();
              return () => { alive = false; };
          }, []);
          (0, react_1.useEffect)(() => {
              if (owner !== false || myId.length === 0)
                  return undefined;
              const t = setInterval(() => { refreshMine(myId); }, 60_000);
              return () => { clearInterval(t); };
          }, [owner, myId]);
          const refreshCodes = () => {
              void (async () => {
                  const r = await callPack('deviceJoinCodes', {});
                  if (!r.ok) {
                      setListErr((0, invite_code_js_1.humanizeCodeError)(r.code ?? '', r.message ?? ''));
                      return;
                  }
                  const list = Array.isArray(r.data.codes) ? r.data.codes : [];
                  const stale = (0, invite_code_js_1.staleHashes)(list, (h) => safeGet((0, invite_code_js_1.plainStoreKey)(h)).length > 0, Date.now());
                  for (const h of stale)
                      safeRemove((0, invite_code_js_1.plainStoreKey)(h));
                  const snap = {};
                  for (const row of list)
                      snap[row.codeHash] = safeGet((0, invite_code_js_1.plainStoreKey)(row.codeHash));
                  setListErr('');
                  setCodeRows(list);
                  setCodePlain(snap);
              })();
          };
          (0, react_1.useEffect)(() => {
              if (owner !== true)
                  return;
              refreshCodes();
          }, [owner]);
          const pendingCodes = (0, invite_code_js_1.pendingCount)(codeRows);
          const revokeCode = (hash) => {
              if (rowCodeBusy.length > 0)
                  return;
              setRowCodeBusy(hash);
              setListErr('');
              void (async () => {
                  const r = await callPack('deviceJoinCodeRevoke', { codeHash: hash });
                  setRowCodeBusy('');
                  if (!r.ok) {
                      setListErr((0, invite_code_js_1.humanizeCodeError)(r.code ?? '', r.message ?? '', pendingCodes));
                      refreshCodes();
                      return;
                  }
                  safeRemove((0, invite_code_js_1.plainStoreKey)(hash));
                  refreshCodes();
              })();
          };
          const renewCode = (hash) => {
              if (rowCodeBusy.length > 0)
                  return;
              setRowCodeBusy(hash);
              setListErr('');
              void (async () => {
                  const r = await callPack('deviceJoinCodeRenew', { codeHash: hash, ttlHours: ttl });
                  setRowCodeBusy('');
                  if (!r.ok) {
                      setListErr((0, invite_code_js_1.humanizeCodeError)(r.code ?? '', r.message ?? '', pendingCodes));
                      refreshCodes();
                      return;
                  }
                  refreshCodes();
              })();
          };
          const make = (ttlHours) => {
              if (busy)
                  return;
              setBusy(true);
              setErr('');
              setListErr('');
              void (async () => {
                  const room = (0, invite_code_js_1.batchChoices)(pendingCodes);
                  const n = room.includes(batch) ? batch : 1;
                  const r = await callPack('deviceJoinCodeCreate', { note: '新设备加入', ttlHours, count: n });
                  setBusy(false);
                  if (!r.ok) {
                      setErr((0, invite_code_js_1.humanizeCodeError)(r.code ?? '', r.message ?? '', pendingCodes));
                      return;
                  }
                  const plains = Array.isArray(r.data.codes) && r.data.codes.length > 0
                      ? r.data.codes.map((x) => String(x ?? '')).filter((x) => x.length > 0)
                      : [r.data.code];
                  for (const p of plains) {
                      const h = (0, invite_code_js_1.codeHashOf)(p);
                      if (h.length > 0)
                          safeSet((0, invite_code_js_1.plainStoreKey)(h), p);
                  }
                  setCode({ code: plains[0] ?? r.data.code, expiresAt: r.data.expiresAt, ttlHours });
                  setBatch(1);
                  refreshCodes();
              })();
          };
          const approve = (rid) => {
              if (rowBusy.length > 0)
                  return;
              setRowBusy(rid);
              setRowErr('');
              void (async () => {
                  const r = await callPack('joinRequestApprove', { requestId: rid });
                  setRowBusy('');
                  if (!r.ok) {
                      setRowErr((0, join_copy_js_1.humanizeJoinError)(r.code, r.message));
                      return;
                  }
                  const fresh = typeof r.data.joinCode === 'string' ? r.data.joinCode : '';
                  setIssued({ requestId: rid, code: fresh });
                  setWaiting((prev) => prev.filter((x) => x.requestId !== rid));
              })();
          };
          const reject = (rid) => {
              if (rowBusy.length > 0)
                  return;
              setRowBusy(rid);
              setRowErr('');
              void (async () => {
                  const r = await callPack('joinRequestReject', { requestId: rid, reason: rejectWhy });
                  setRowBusy('');
                  if (!r.ok) {
                      setRowErr((0, join_copy_js_1.humanizeJoinError)(r.code, r.message));
                      return;
                  }
                  setRejectFor('');
                  setRejectWhy('');
                  setWaiting((prev) => prev.filter((x) => x.requestId !== rid));
              })();
          };
          const submitAsk = () => {
              if (askBusy || askDone)
                  return;
              setAskBusy(true);
              setAskErr('');
              void (async () => {
                  const me = await callPack('whoami', {});
                  if (!me.ok) {
                      setAskBusy(false);
                      setAskErr('查不到你属于哪个铺子，请用原来那张码或原来的机器再试一次');
                      return;
                  }
                  const r = await callPack('joinRequestCreate', {
                      accountId: me.data.accountId,
                      applicantKind: 'human',
                      applicantId: applicantId(),
                      reason: askWhy,
                  });
                  setAskBusy(false);
                  if (!r.ok) {
                      setAskErr((0, join_copy_js_1.humanizeJoinError)(r.code, r.message));
                      return;
                  }
                  setAskDone(true);
                  setMyStatus(r.data.status);
                  const rid = typeof r.data.requestId === 'string' ? r.data.requestId : '';
                  if (rid.length > 0) {
                      setMyId(rid);
                      safeSet((0, join_copy_js_1.reqStoreKey)(me.data.accountId, applicantId()), rid);
                      safeSet(JOIN_REQ_KEY, rid);
                  }
              })();
          };
          const mine = (0, join_copy_js_1.applicantView)(myStatus);
          const pendingCount = waiting.length;
          const { requests: requestsRows, passers: passerRows } = (0, join_copy_js_1.splitJoinRows)(waiting);
          const requestsCount = requestsRows.length;
          const passerCount = passerRows.length;
          const mustShow = code !== null || issued !== null || requestsCount > 0
              || (owner === false && (askDone || myStatus.length > 0 || askOpen || myId.length > 0));
          const collapsed = folded && !mustShow;
          return ((0, jsx_runtime_1.jsxs)("div", { id: "kaipu-join-card", style: {
                  marginTop: compact === true ? 8 : 10,
                  marginBottom: compact === true ? 12 : 14,
                  borderRadius: 10,
                  padding: compact === true ? '10px 12px' : '12px 14px',
                  border: `1px solid ${theme_js_1.C.border}`,
                  borderLeft: '3px solid #6366f1',
                  background: theme_js_1.C.soft,
              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }, children: [owner === true ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600, color: theme_js_1.C.text }, children: "\uD83D\uDD11 \u751F\u6210\u5DE5\u4F4D\u52A0\u5165\u7801" })) : ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600, color: theme_js_1.C.text }, children: "\uD83D\uDC65 \u6211\u5728\u8FD9\u4E2A\u94FA\u7684\u8EAB\u4EFD" })), collapsed ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, flex: '1 1 auto' }, children: owner === true
                                  ? '给新同事：进本铺 · 装技能 · 领授权'
                                  : (memberOwnerName
                                      ? '你在这里是受邀成员 —— 发码和审批由铺主「' + memberOwnerName + '」负责'
                                      : '你在这里是受邀成员 —— 发码和审批由铺主负责') })) : ((0, jsx_runtime_1.jsx)("span", { style: { flex: '1 1 auto' } })), owner === true ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => {
                                  setFolded(false);
                                  make(ttl);
                              }, disabled: busy || !(0, invite_code_js_1.canCreateMore)(pendingCodes), title: (0, invite_code_js_1.createBlockedTip)(pendingCodes), style: {
                                  position: 'relative',
                                  padding: '5px 12px', borderRadius: 7, border: 'none',
                                  cursor: busy ? 'default' : 'pointer',
                                  background: !(0, invite_code_js_1.canCreateMore)(pendingCodes) ? '#9ca3af' : '#1f2937',
                                  color: '#fff', fontSize: theme_js_1.FS.small,
                                  fontWeight: 600, fontFamily: 'inherit',
                              }, children: [busy ? '生成中…' : collapsed ? '🔑 生成' : '🔑 再生成一张', requestsCount > 0 ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                          marginLeft: 6, display: 'inline-block', minWidth: 16, height: 16, lineHeight: '16px',
                                          padding: '0 4px', borderRadius: 999, background: '#c0392b', color: '#fff',
                                          fontSize: 10, fontWeight: 700, verticalAlign: 'text-top',
                                      }, children: requestsCount })) : null] })) : null, !collapsed ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setFolded(true), title: "\u6536\u8D77\uFF08\u4E0B\u9762\u7684\u5185\u5BB9\u548C\u7801\u660E\u7EC6\u90FD\u6536\u8D77\u6765\uFF09", style: {
                                  padding: '1px 4px', background: 'transparent', border: 'none',
                                  cursor: 'pointer', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, fontFamily: 'inherit',
                                  textDecoration: 'underline', textUnderlineOffset: 3,
                              }, children: "\u6536\u8D77 \u25B4" })) : null] }), collapsed ? null : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600, color: theme_js_1.C.text, marginBottom: 2, marginTop: 8 }, children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, fontWeight: 400 }, children: "\u7ED9\u65B0\u540C\u4E8B\uFF1A\u8FDB\u672C\u94FA \u00B7 \u88C5\u6280\u80FD \u00B7 \u9886\u6388\u6743\uFF0C\u4E00\u6B21\u505A\u5B8C" }) }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginBottom: 8 }, children: "\u9080\u8BF7\u7801\u8FC7\u671F\u4E86\u3001\u6216\u8005\u540C\u4E8B\u6362\u4E86\u53F0\u673A\u5668\uFF0C\u4E5F\u662F\u4ECE\u8FD9\u91CC\u91CD\u65B0\u751F\u6210\u4E00\u5F20\u8865\u53D1\u7ED9\u4ED6" }), owner === true ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                                  fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginBottom: 8, lineHeight: 1.7,
                                  padding: '6px 8px', borderRadius: 6, background: theme_js_1.C.soft,
                              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 2 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600, color: theme_js_1.C.text }, children: "\u8FD9\u91CC\u751F\u6210\u7684\u7801 \u2192 \u7ED9\u300C\u4EBA\u300D\u7684\uFF1A" }), "\u4E0D\u6307\u5B9A\u5750\u54EA\u4E00\u4F4D\uFF0C\u4ED6\u81EA\u5DF1\u8FDB\u6765\u9009\u4F4D\u7F6E\uFF1B\u4E00\u6B21\u6709\u6548\uFF0C24 \u5C0F\u65F6\u5185\u8981\u7528\u6389\u3002"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600, color: theme_js_1.C.text }, children: "\u5DE5\u4F4D\u5361\u4E0A\u70B9\u300C\u9080\u8BF7\u300D\u2192 \u7ED9\u67D0\u4E2A\u5177\u4F53\u5DE5\u4F4D\u7684\uFF1A" }), "\u7ED1\u5B9A\u4F4D\u7F6E\u30017 \u5929\u6709\u6548\uFF0C\u662F\u7ED9\u5DF2\u7ECF\u5B9A\u597D\u5750\u54EA\u513F\u7684\u540C\u4E8B\u6216 Agent \u7528\u7684\u3002"] })] })) : null, owner === true && requestsCount > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                                  marginBottom: 8, padding: '8px 10px', borderRadius: 8,
                                  background: '#fff', border: `1px solid ${theme_js_1.C.border}`,
                              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: '#b3261e', fontWeight: 600, marginBottom: 6 }, children: ["\u5F85\u5BA1\u6279 ", requestsCount, " \u4EF6"] }), requestsRows.map((row) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                                          padding: '6px 0', borderTop: `1px dashed ${theme_js_1.C.border}`,
                                      }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.text, flex: '1 1 220px' }, children: (0, join_copy_js_1.joinRowLabel)(row) }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: rowBusy.length > 0, onClick: () => approve(row.requestId), style: btnStyle(true), children: rowBusy === row.requestId ? '处理中…' : '同意' }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: rowBusy.length > 0, onClick: () => {
                                                          setRejectFor(rejectFor === row.requestId ? '' : row.requestId);
                                                          setRejectWhy('');
                                                      }, style: btnStyle(false), children: rejectFor === row.requestId ? '收起' : '拒绝' })] }), rejectFor === row.requestId ? ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6, alignItems: 'center', marginTop: 6, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("input", { value: rejectWhy, onChange: (e) => setRejectWhy(e.target.value), placeholder: "\u8DDF\u4ED6\u8BF4\u4E00\u53E5\u4E3A\u4EC0\u4E48\uFF08\u4E0D\u586B\u4E5F\u884C\uFF09", style: {
                                                          flex: '1 1 220px', padding: '5px 8px', borderRadius: 6,
                                                          border: `1px solid ${theme_js_1.C.border}`, fontSize: theme_js_1.FS.small,
                                                          fontFamily: 'inherit', color: theme_js_1.C.text, background: '#fff',
                                                      } }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: rowBusy.length > 0, onClick: () => reject(row.requestId), style: btnStyle(true), children: "\u786E\u8BA4\u62D2\u7EDD" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setRejectFor(''); setRejectWhy(''); }, style: btnStyle(false), children: "\u7B97\u4E86" })] })) : null] }, row.requestId))), rowErr.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.small, color: '#b3261e' }, children: rowErr })) : null] })) : null, owner === true && passerCount > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 8 }, children: [(0, jsx_runtime_1.jsxs)("div", { onClick: () => setPassersOpen((v) => !v), title: passersOpen ? '收起' : '展开看是哪几台设备', style: {
                                          display: 'flex', alignItems: 'center', gap: 8, fontSize: theme_js_1.FS.tag,
                                          color: theme_js_1.C.dim, cursor: 'pointer', userSelect: 'none',
                                          padding: '6px 10px', borderRadius: 8,
                                          background: theme_js_1.C.soft, border: `1px solid ${theme_js_1.C.border}`,
                                      }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600, color: theme_js_1.C.text }, children: "\u95E8\u5916\u8DEF\u8FC7" }), (0, jsx_runtime_1.jsxs)("span", { children: [passerCount, " \u53F0"] }), (0, jsx_runtime_1.jsx)("span", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)("span", { children: passersOpen ? '收起 ▴' : `展开 ${passerCount} 条 ▾` })] }), passersOpen ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                                          marginTop: 4, padding: '6px 10px', borderRadius: 8, background: '#fff',
                                          border: `1px solid ${theme_js_1.C.border}`, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim,
                                      }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 4, color: theme_js_1.C.text }, children: ["\u4E0B\u9762\u8FD9\u4E9B\u8BBE\u5907\u6253\u5F00\u8FC7\u672C\u94FA\u9875\u9762\u3001\u4F46\u6CA1\u6301\u52A0\u5165\u7801\uFF0C\u88AB\u6321\u5728\u95E8\u5916\u3002", (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u5B83\u4EEC\u6CA1\u6709\u63D0\u51FA\u7533\u8BF7\uFF0C\u6240\u4EE5\u8FD9\u91CC\u6CA1\u6709\u300C\u540C\u610F\u300D\u6309\u94AE \u2014\u2014 \u8981\u8BA9\u8C01\u8FDB\u6765\uFF0C\u7528\u4E0A\u9762\u7684\u300C\uD83D\uDD11 \u751F\u6210\u300D\u53D1\u4E00\u5F20\u7801\u7ED9\u4ED6\u3002" })] }), passerRows.map((row) => ((0, jsx_runtime_1.jsx)("div", { style: { padding: '3px 0', borderTop: `1px dashed ${theme_js_1.C.border}` }, children: (0, join_copy_js_1.joinRowLabel)(row) }, row.requestId)))] })) : null] })) : null, issued !== null ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                                  marginBottom: 8, padding: '8px 10px', borderRadius: 8,
                                  background: '#eef7ee', border: '1px solid #b7d8b7',
                              }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: '#2f6b2f', marginBottom: 4 }, children: "\u5DF2\u7ECF\u901A\u8FC7\u4E86\u3002\u4E0B\u9762\u662F\u7ED9\u4ED6\u7684\u65B0\u7801\uFF0C**\u53EA\u663E\u793A\u8FD9\u4E00\u6B21**\uFF1A" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("code", { style: {
                                                  fontSize: theme_js_1.FS.small, padding: '3px 8px', background: '#fff',
                                                  borderRadius: 4, letterSpacing: 0.5, border: '1px solid #b7d8b7',
                                              }, children: issued.code.length > 0 ? issued.code : '（服务端没回码，让他重新申请一次）' }), issued.code.length > 0 ? ((0, jsx_runtime_1.jsx)("button", { type: "button", style: btnStyle(true), onClick: () => {
                                                  void (async () => {
                                                      if (await copyText(issued.code)) {
                                                          setIssuedCopied(true);
                                                          setTimeout(() => setIssuedCopied(false), 1800);
                                                      }
                                                  })();
                                              }, children: issuedCopied ? '✓ 已复制' : '📋 复制新码' })) : null, (0, jsx_runtime_1.jsx)("button", { type: "button", style: btnStyle(false), onClick: () => setIssued(null), children: "\u77E5\u9053\u4E86" })] })] })) : null, owner === false && (askDone || myStatus.length > 0 || askOpen || myId.length > 0) ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                                  marginBottom: 8, padding: '8px 10px', borderRadius: 8,
                                  background: '#fff', border: `1px solid ${theme_js_1.C.border}`,
                              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                          fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginBottom: 6,
                                          paddingBottom: 6, borderBottom: `1px dashed ${theme_js_1.C.border}`,
                                      }, children: ["\u8FD9\u6761\u7533\u8BF7\u53D1\u7ED9\uFF1A", (0, jsx_runtime_1.jsx)("b", { style: { color: theme_js_1.C.text }, children: memberOwnerName ? ('铺主「' + memberOwnerName + '」') : '本铺铺主' }), (0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 4 }, children: "\uFF08\u4F60\u5728\u672C\u94FA\u662F\u53D7\u9080\u6210\u5458\uFF0C\u4E0D\u80FD\u81EA\u5DF1\u6279\u81EA\u5DF1\uFF09" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: theme_js_1.FS.small }, children: [mine.dot ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                                  display: 'inline-block', width: 7, height: 7, borderRadius: 999,
                                                  background: '#c0392b',
                                              } })) : null, (0, jsx_runtime_1.jsx)("span", { style: {
                                                  color: mine.tone === 'ok' ? '#2f6b2f' : mine.tone === 'bad' ? '#b3261e'
                                                      : mine.tone === 'wait' ? theme_js_1.C.dim : theme_js_1.C.text,
                                                  fontWeight: mine.tone === 'ok' ? 600 : 400,
                                              }, children: askDone && myStatus.length === 0 ? '已申请，等铺主通过' : mine.text })] }), (0, join_copy_js_1.looksLikeRequestId)(myId) ? ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6, alignItems: 'center', marginTop: 6, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u7533\u8BF7\u53F7" }), (0, jsx_runtime_1.jsx)("code", { style: {
                                                  fontSize: theme_js_1.FS.tag, padding: '2px 6px', background: theme_js_1.C.soft,
                                                  borderRadius: 4, letterSpacing: 0.3, border: `1px solid ${theme_js_1.C.border}`,
                                              }, children: myId }), (0, jsx_runtime_1.jsx)("button", { type: "button", style: btnStyle(false), onClick: () => {
                                                  void (async () => {
                                                      if (await copyText(myId)) {
                                                          setRidCopied(true);
                                                          setTimeout(() => setRidCopied(false), 1800);
                                                      }
                                                  })();
                                              }, children: ridCopied ? '✓ 已复制' : '📋 复制申请号' }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u67E5\u72B6\u6001\u3001\u53D6\u7801\u90FD\u8981\u7528\u5B83" })] })) : null, myStatus === 'approved' && myCode.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 6 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("code", { style: {
                                                          fontSize: theme_js_1.FS.small, padding: '3px 8px', background: theme_js_1.C.soft,
                                                          borderRadius: 4, letterSpacing: 0.5, border: `1px solid ${theme_js_1.C.border}`,
                                                      }, children: myCode }), (0, jsx_runtime_1.jsx)("button", { type: "button", style: btnStyle(true), onClick: () => {
                                                          void (async () => {
                                                              if (await copyText(myCode)) {
                                                                  setMyCopied(true);
                                                                  setTimeout(() => setMyCopied(false), 1800);
                                                              }
                                                          })();
                                                      }, children: myCopied ? '✓ 已复制' : '📋 复制，通知你的 Agent 邀请码已更新' })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                                                  marginTop: 4, fontSize: theme_js_1.FS.tag,
                                                  color: myCodeState === 'fresh' ? '#b3261e' : theme_js_1.C.dim,
                                                  fontWeight: myCodeState === 'fresh' ? 600 : 400,
                                              }, children: myCodeState === 'fresh' ? join_copy_js_1.CODE_ONCE_TIP : join_copy_js_1.CODE_STORED_TIP })] })) : null, myCodeState === 'lost' ? ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.small, color: '#b3261e' }, children: join_copy_js_1.CODE_LOST_TIP })) : null, myStatus === 'pending' ? ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 4, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u94FA\u4E3B\u5904\u7406\u5B8C\u8FD9\u91CC\u4F1A\u81EA\u52A8\u53D8\uFF08\u6BCF\u5206\u949F\u770B\u4E00\u6B21\uFF09\uFF0C\u4E0D\u7528\u4E00\u76F4\u5B88\u7740" })) : null] })) : null, owner === true && !(0, invite_code_js_1.canCreateMore)(pendingCodes) ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                                  marginBottom: 8, padding: '8px 10px', borderRadius: 8,
                                  background: '#fff7ed', border: '1px solid #fdba74',
                              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600, color: '#9a3412', marginBottom: 4 }, children: ["\u624B\u4E0A\u7684\u7801\u5DF2\u6EE1 ", pendingCodes, " / ", invite_code_js_1.PENDING_LIMIT, "\uFF0C\u6682\u65F6\u4E0D\u80FD\u518D\u751F\u6210"] }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: '#7c2d12', marginBottom: 6, lineHeight: 1.6 }, children: ["\u8FD9\u4E9B\u90FD\u662F\u8FD8\u6CA1\u88AB\u7528\u6389\u7684\u7801\u3002\u4F5C\u5E9F\u4E00\u5F20\u5C31\u80FD\u817E\u51FA\u989D\u5EA6\u91CD\u65B0\u751F\u6210 \u2014\u2014", (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600 }, children: "\u4F5C\u5E9F\u4E0D\u53EF\u9006" }), "\uFF0C\u82E5\u90A3\u5F20\u5DF2\u7ECF\u53D1\u7ED9\u522B\u4EBA\uFF0C\u8BF7\u5148\u786E\u8BA4\u5BF9\u65B9\u8FD8\u6CA1\u7528\u3002"] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: 4 }, children: codeRows.filter((r) => r.state === 'pending').map((row) => {
                                          const v = (0, invite_code_js_1.codeRowView)(row, codePlain[row.codeHash] ?? '', Date.now());
                                          return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                                  display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
                                                  padding: '3px 0',
                                              }, children: [(0, jsx_runtime_1.jsx)("code", { style: {
                                                          fontSize: theme_js_1.FS.small, padding: '2px 6px', letterSpacing: 0.5,
                                                          background: theme_js_1.C.soft, color: theme_js_1.C.text, borderRadius: 4,
                                                          border: `1px solid ${theme_js_1.C.border}`,
                                                      }, children: v.codeText }), v.remainText.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: v.remainText })) : null, (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: rowCodeBusy.length > 0, onClick: () => revokeCode(row.codeHash), style: btnStyle(false), children: rowCodeBusy === row.codeHash ? '处理中…' : '作废这张' })] }, row.codeHash));
                                      }) }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6 }, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setCodesOpen(true), title: "\u5C55\u5F00\u4E0B\u9762\u7684\u7801\u660E\u7EC6\uFF08\u542B\u5DF2\u7528/\u4F5C\u5E9F/\u8FC7\u671F\u7684\uFF0C\u90A3\u4E9B\u4F5C\u5E9F\u4E0D\u4E86\uFF09", style: {
                                              padding: '1px 4px', background: 'transparent', border: 'none',
                                              cursor: 'pointer', fontSize: theme_js_1.FS.tag, color: '#9a3412', fontFamily: 'inherit',
                                              textDecoration: 'underline', textUnderlineOffset: 3, fontWeight: 600,
                                          }, children: "\u5C55\u5F00\u53BB\u4F5C\u5E9F \u25BE" }) })] })) : null, owner === true ? ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 8 }, children: [codeRows.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                                          padding: '6px 8px', borderRadius: 8, background: '#fff',
                                          border: `1px solid ${theme_js_1.C.border}`, display: 'flex', flexDirection: 'column', gap: 2,
                                      }, children: [(0, jsx_runtime_1.jsxs)("div", { onClick: () => setCodesOpen((v) => !v), title: codesOpen ? '收起码明细' : '展开看全部码（含已用/作废/过期）', style: {
                                                  display: 'flex', alignItems: 'center', gap: 8, fontSize: theme_js_1.FS.tag,
                                                  color: theme_js_1.C.dim, cursor: 'pointer', userSelect: 'none',
                                              }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600, color: theme_js_1.C.text }, children: "\u624B\u4E0A\u7684\u7801" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u5F85\u7528 ", pendingCodes, " / ", invite_code_js_1.PENDING_LIMIT] }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: codesOpen ? '收起 ▴' : `展开全部 ${codeRows.length} 条 ▾` }), (0, jsx_runtime_1.jsx)("span", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: (e) => { e.stopPropagation(); refreshCodes(); }, style: {
                                                          padding: '1px 4px', background: 'transparent', border: 'none', cursor: 'pointer',
                                                          fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, fontFamily: 'inherit',
                                                          textDecoration: 'underline', textUnderlineOffset: 3,
                                                      }, children: "\u5237\u65B0" })] }), codesOpen ? codeRows.map((row) => {
                                              const view = (0, invite_code_js_1.codeRowView)(row, codePlain[row.codeHash] ?? '', Date.now());
                                              return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                                      display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
                                                      padding: '4px 0', borderTop: `1px dashed ${theme_js_1.C.border}`,
                                                  }, children: [(0, jsx_runtime_1.jsx)("code", { style: {
                                                              fontSize: theme_js_1.FS.small, padding: '2px 6px', letterSpacing: 0.5,
                                                              background: view.plainLocal ? theme_js_1.C.soft : 'transparent',
                                                              color: view.plainLocal ? theme_js_1.C.text : theme_js_1.C.dim,
                                                              borderRadius: 4,
                                                              border: view.plainLocal ? `1px solid ${theme_js_1.C.border}` : `1px dashed ${theme_js_1.C.border}`,
                                                          }, children: view.codeText }), (0, jsx_runtime_1.jsx)("span", { style: {
                                                              fontSize: theme_js_1.FS.tag, fontWeight: 600,
                                                              color: row.state === 'pending' ? '#2f6b2f' : theme_js_1.C.dim,
                                                          }, children: view.stateText }), view.remainText.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: view.remainText })) : null, view.usedByText.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: view.usedByText })) : null, (0, invite_code_js_1.isActionable)(row.state) && view.plainLocal ? ((0, jsx_runtime_1.jsx)("button", { type: "button", style: btnStyle(false), onClick: () => {
                                                              void (async () => {
                                                                  if (await copyText(codePlain[row.codeHash] ?? '')) {
                                                                      setCopied(true);
                                                                      setTimeout(() => setCopied(false), 1800);
                                                                  }
                                                              })();
                                                          }, children: copied ? '✓ 已复制' : '📋 复制' })) : null, (0, invite_code_js_1.isActionable)(row.state) ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", disabled: rowCodeBusy.length > 0, onClick: () => revokeCode(row.codeHash), style: btnStyle(false), children: rowCodeBusy === row.codeHash ? '处理中…' : '作废' }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: rowCodeBusy.length > 0, onClick: () => renewCode(row.codeHash), style: btnStyle(false), children: "\u7EED\u671F" })] })) : null] }, row.codeHash));
                                          }) : null] })) : ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: (0, invite_code_js_1.emptyListText)(true) })), listErr.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 4, fontSize: theme_js_1.FS.small, color: '#b3261e' }, children: listErr })) : null] })) : null, (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsxs)("select", { value: ttl, onChange: (e) => setTtl(Number(e.target.value)), disabled: busy, title: "\u8FD9\u5F20\u52A0\u5165\u7801\u591A\u4E45\u5185\u6709\u6548\uFF1B\u8FC7\u671F\u8981\u91CD\u65B0\u751F\u6210", style: {
                                          padding: '4px 6px', borderRadius: 6, border: `1px solid ${theme_js_1.C.border}`,
                                          fontSize: theme_js_1.FS.small, background: '#fff', fontFamily: 'inherit', color: theme_js_1.C.text,
                                      }, children: [(0, jsx_runtime_1.jsx)("option", { value: 24, children: "24 \u5C0F\u65F6" }), (0, jsx_runtime_1.jsx)("option", { value: 72, children: "3 \u5929" }), (0, jsx_runtime_1.jsx)("option", { value: 168, children: "7 \u5929" })] }), owner === true && (0, invite_code_js_1.batchChoices)(pendingCodes).length > 1 ? ((0, jsx_runtime_1.jsx)("select", { value: batch, onChange: (e) => setBatch(Number(e.target.value)), disabled: busy, title: "\u4E00\u6B21\u751F\u6210\u51E0\u5F20\uFF08\u4E00\u7801\u4E00\u4EBA\uFF09", style: {
                                          padding: '4px 6px', borderRadius: 6, border: `1px solid ${theme_js_1.C.border}`,
                                          fontSize: theme_js_1.FS.small, background: '#fff', fontFamily: 'inherit', color: theme_js_1.C.text,
                                      }, children: (0, invite_code_js_1.batchChoices)(pendingCodes).map((n) => ((0, jsx_runtime_1.jsxs)("option", { value: n, children: [n, " \u5F20"] }, n))) })) : null, (0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => make(ttl), disabled: busy || (owner === true && !(0, invite_code_js_1.canCreateMore)(pendingCodes)), title: owner === true ? (0, invite_code_js_1.createBlockedTip)(pendingCodes) : '生成一张新设备加入码', style: {
                                          position: 'relative',
                                          padding: '6px 13px', borderRadius: 7, border: 'none',
                                          cursor: busy ? 'default' : 'pointer',
                                          background: owner === true && !(0, invite_code_js_1.canCreateMore)(pendingCodes) ? '#9ca3af' : '#1f2937',
                                          color: '#fff', fontSize: theme_js_1.FS.small,
                                          fontWeight: 600, fontFamily: 'inherit',
                                      }, children: [busy ? '生成中…' : '🔑 生成工位加入码', owner === true && requestsCount > 0 ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                                  marginLeft: 6, display: 'inline-block', minWidth: 16, height: 16, lineHeight: '16px',
                                                  padding: '0 4px', borderRadius: 999, background: '#c0392b', color: '#fff',
                                                  fontSize: 10, fontWeight: 700, verticalAlign: 'text-top',
                                              }, children: requestsCount })) : null] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setAskOpen(!askOpen); setAskErr(''); }, style: {
                                          marginLeft: 'auto', padding: '2px 4px', background: 'transparent', border: 'none',
                                          cursor: 'pointer', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, fontFamily: 'inherit',
                                          textDecoration: 'underline', textUnderlineOffset: 3,
                                      }, children: askOpen ? '收起' : '码用不了了？' }), code !== null ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("code", { style: {
                                                  fontSize: theme_js_1.FS.small, padding: '2px 6px', background: '#fff',
                                                  borderRadius: 4, letterSpacing: 0.5, border: `1px solid ${theme_js_1.C.border}`,
                                              }, children: code.code }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: [code.ttlHours >= 168 ? '7 天' : code.ttlHours >= 72 ? '3 天' : `${code.ttlHours} 小时`, "\u5185\u6709\u6548 \u00B7 \u53EA\u80FD\u7528\u4E00\u6B21"] }), (0, jsx_runtime_1.jsx)("button", { type: "button", style: btnStyle(false), onClick: () => {
                                                  void (async () => {
                                                      if (await copyText(code.code)) {
                                                          setCopied(true);
                                                          setTimeout(() => setCopied(false), 1800);
                                                      }
                                                  })();
                                              }, children: copied ? '✓ 已复制' : '复制' })] })) : ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u5BF9\u65B9\u6301\u7801\u52A0\u5165\u540E\u80FD\u770B\u5230\u672C\u94FA\u7684\u4EFB\u52A1\u548C\u8D44\u6599\uFF1B\u4E00\u6B21\u6027\uFF0C\u7528\u5B8C\u5373\u5931\u6548" }))] }), code !== null ? ((0, jsx_runtime_1.jsxs)("div", { style: {
                                  marginTop: 8, border: `1px solid ${theme_js_1.C.border}`, borderRadius: 10,
                                  background: theme_js_1.C.soft, overflow: 'hidden',
                              }, children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => { setGuideOpen(!guideOpen); setGuideCopied(false); }, style: {
                                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                          gap: 10, width: '100%', padding: '10px 12px', cursor: 'pointer',
                                          background: 'transparent', border: 'none', textAlign: 'left',
                                          fontFamily: 'inherit', fontSize: theme_js_1.FS.small, color: theme_js_1.C.text,
                                      }, children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { style: { display: 'block', marginBottom: 2 }, children: "\u7ED9\u65B0\u540C\u4E8B\u7684\u6307\u4EE4" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag }, children: "\u8FDB\u94FA \u00B7 \u88C5\u6280\u80FD \u00B7 \u9886\u6388\u6743 \u00B7 \u4F20\u8D44\u6599 \u00B7 \u6362\u94A5\u5319\uFF0C\u4E00\u6B21\u8BF4\u5B8C \u2014\u2014 \u70B9\u5F00\u53EF\u4E00\u952E\u590D\u5236" })] }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: 18, lineHeight: 1 }, children: guideOpen ? '▴' : '›' })] }), guideOpen ? ((0, jsx_runtime_1.jsx)("div", { style: { padding: '0 12px 12px' }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", style: btnStyle(true), onClick: () => {
                                                      void (async () => {
                                                          const guide = (0, join_copy_js_1.joinGuideText)([
                                                              `请帮我完成三件事，一次做完。`,
                                                              ``,
                                                              `一、装开铺工位插件`,
                                                              `在插件市场搜 kaipu-plugin-workstation 并安装，然后用我的账号登录。`,
                                                              ``,
                                                              `二、用这个加入码进铺`,
                                                              `工位加入码：${code.code}`,
                                                              `在插件「工位」页里找加入入口，把上面的码填进去。`,
                                                              ``,
                                                              `三、装「山海数据看板」技能并领授权`,
                                                              `1) 下载并解压：https://agent.ak2029.com/dl084/dashboard-hub.tar.gz`,
                                                              `   解压得到 dashboard-hub 文件夹，整个放进你的技能目录。`,
                                                              `2) 打开 dashboard-hub/hub.json（没有就复制 hub.json.example），保证有且只有：`,
                                                              `   {"url": "https://agent.ak2029.com/hub-084"}`,
                                                              `3) 在 dashboard-hub 目录里运行：`,
                                                              `   python scripts/hub_dash.py claim`,
                                                              `4) 验证：`,
                                                              `   python scripts/hub_dash.py profile <表格路径>`,
                                                              ``,
                                                              `授权码不用手工填 —— claim 会自动读本机的工位设备凭据并领到，免费额度，一年到期后回工位插件重领。`,
                                                              ``,
                                                              `四、以后传资料（重要：不要开浏览器传，直接调接口）`,
                                                              `铺主给你「交互 ID」后，用下面这条（把 6 个 {..} 换成真实值）：`,
                                                              `  TS=$(date +%s)`,
                                                              `  SHA=$(sha256sum /path/to/your-file.zip | cut -d' ' -f1)`,
                                                              `  MSG="{agentId}|\${TS}|{accountId}|your-file.zip|\${SHA}"`,
                                                              `  SIG=$(printf '%s' "$MSG" | openssl dgst -sha256 -hmac "{secret}" -r | cut -d' ' -f1)`,
                                                              `  curl -sS -X POST "https://agent.ak2029.com/kai-pu/packs/{交互ID}/files" \\`,
                                                              `    -H "X-Agent-Id: {agentId}" -H "X-Account-Id: {accountId}" -H "X-Ts: \${TS}" \\`,
                                                              `    -H "X-Filename: your-file.zip" -H "X-Body-Sha256: \${SHA}" -H "X-Sig: \${SIG}" \\`,
                                                              `    --data-binary @/path/to/your-file.zip`,
                                                              `成功判据：HTTP 200 且返回的 sha256 与本地 sha256sum 一致。`,
                                                              `★ 签名串用竖线分隔，和领活（agentId+ts 直接拼）不一样。`,
                                                              `★ 座位决定目录：执行位传的在 execution 下，管理位看不见执行位的 ⇒ 先问对方在哪个位。`,
                                                              `★★ 文件名必须纯 ASCII（your-file.zip）—— 中文名放不进 HTTP 头，且服务端会先 unquote 再算签名 ⇒ 必然 401。`,
                                                              ``,
                                                              `五、钥匙会到期，到期了你自己能换（不用等人搬）`,
                                                              `每次领任务（poll）返回里多一个 keyStatus，看它的 state：`,
                                                              `  ok / no_prev    → 没事，继续干活`,
                                                              `  renew_available → 旧钥匙还在宽限期，新钥匙已在服务端保险箱，去取`,
                                                              `  expired         → 别死循环，报错给主人，等人点「重置连接」`,
                                                              ``,
                                                              `state 是 renew_available 时，用【当前这把钥匙】签名去取：`,
                                                              `  TS=$(date +%s)`,
                                                              `  SIG=$(printf '%s' "{agentId}\${TS}" | openssl dgst -sha256 -hmac "{当前secret}" -r | cut -d' ' -f1)`,
                                                              `  curl -sS -X POST "https://agent.ak2029.com/kai-pu/agent/key/claim" \\`,
                                                              `    -H "Content-Type: application/json" \\`,
                                                              `    -d '{"agentId":"{agentId}","accountId":"{accountId}","ts":\${TS},"sig":"\${SIG}"}'`,
                                                              ``,
                                                              `★ body 只能有这四个字段，多一个都不行。`,
                                                              `★ 签名串是 agentId+ts 直接拼，中间没有分隔符 —— 和上面上传包的竖线格式不一样。`,
                                                              `★ sig 放 JSON body，不放 HTTP 头。`,
                                                              ``,
                                                              `返回 200：agentSecret 就是新钥匙`,
                                                              `  1) 用 printf 写入（不要 echo，会多一个换行）`,
                                                              `  2) 回读校验：长度 43`,
                                                              `  3) 立刻换掉内存里的密钥 —— 文件改了内存没换 = 下一轮还是 401`,
                                                              `返回 409 no_pending_key 不是错误：铺主还没点重置，等下一轮，不要重试。`,
                                                          ]);
                                                          if (await copyText(guide)) {
                                                              setGuideCopied(true);
                                                              setTimeout(() => setGuideCopied(false), 1800);
                                                          }
                                                      })();
                                                  }, children: guideCopied ? '✓ 已复制，可以直接发给新同事' : '📋 复制这份指令' }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u4E0D\u542B\u4F60\u7684\u6388\u6743\u7801 \u2014\u2014 \u590D\u5236\u7ED9\u4ED6\u65F6\u4E0D\u4F1A\u5E26\u51FA\u4F60\u7684\u51ED\u636E" })] }) })) : null] })) : null, code !== null && onOpenGuide !== undefined ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => { setGuideCopied(false); onOpenGuide(); }, style: {
                                  marginTop: 8, display: 'flex', alignItems: 'center',
                                  justifyContent: 'space-between', gap: 10, width: '100%',
                                  padding: '10px 12px', cursor: 'pointer', textAlign: 'left',
                                  border: `1px solid ${theme_js_1.C.border}`, borderRadius: 10,
                                  background: theme_js_1.C.soft, fontFamily: 'inherit',
                                  fontSize: theme_js_1.FS.small, color: theme_js_1.C.text,
                              }, children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { style: { display: 'block', marginBottom: 2 }, children: "\u63A5\u5165\u8BF4\u660E\uFF08\u8BA9\u4ED6\u81EA\u5DF1\u6765\u53D6\uFF09" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.tag }, children: "\u7ED9\u4ED6\u4E00\u53E5\u6307\u8DEF\u8BDD\uFF0C\u6B63\u6587\u7531\u4ED6\u7684 Agent \u6309\u5EA7\u4F4D\u4ECE\u670D\u52A1\u7AEF\u62C9 \u2014\u2014 \u6539\u4E86\u7ACB\u523B\u751F\u6548" })] }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: 18, lineHeight: 1 }, children: "\u203A" })] })) : null, askOpen ? ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 8, padding: '8px 10px', borderRadius: 8, background: '#fff', border: `1px solid ${theme_js_1.C.border}` }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.text, marginBottom: 4 }, children: "\u7801\u7528\u4E0D\u4E86\u4E86\uFF1F\u5728\u8FD9\u513F\u8BF4\u4E00\u58F0\uFF0C\u94FA\u4E3B\u4F1A\u7ED9\u4F60\u8865\u4E00\u5F20" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("input", { value: askWhy, onChange: (e) => setAskWhy(e.target.value), placeholder: "\u6BD4\u5982\uFF1A\u7801\u8FC7\u671F\u4E86 / \u6211\u6362\u4E86\u53F0\u673A\u5668", disabled: askDone, style: {
                                                  flex: '1 1 240px', padding: '5px 8px', borderRadius: 6,
                                                  border: `1px solid ${theme_js_1.C.border}`, fontSize: theme_js_1.FS.small,
                                                  fontFamily: 'inherit', color: theme_js_1.C.text, background: askDone ? theme_js_1.C.soft : '#fff',
                                              } }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: askBusy || askDone, onClick: submitAsk, style: btnStyle(!askDone), children: askDone ? '已申请（等通过）' : askBusy ? '提交中…' : '提交申请' })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 4, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: "\u4E0D\u7528\u586B\u65E7\u7801 \u2014\u2014 \u8FD9\u53F0\u673A\u5668\u672C\u8EAB\u5C31\u662F\u4F60\u7684\u51ED\u636E\uFF1B\u5B9E\u5728\u8BA4\u4E0D\u51FA\u6765\uFF0C\u5C31\u7528\u539F\u6765\u90A3\u5F20\u7801\u6216\u539F\u6765\u7684\u673A\u5668" }), askErr.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.small, color: '#b3261e' }, children: askErr })) : null] })) : null, err.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.small, color: '#b3261e' }, children: err })) : null] }))] }));
      }
      //# sourceMappingURL=WorkstationPanel.js.map
      return module.exports;
    })();

    /* ── client/index.js ── */
    var m_index = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.inject = void 0;
      exports.apply = apply;
      const react_1 = require("react");
      const panel_id_js_1 = m_panel_id;
      const WorkstationPanelIcon_js_1 = m_WorkstationPanelIcon;
      const WorkstationPanel_js_1 = m_WorkstationPanel;
      exports.inject = ['slots', 'connection'];
      function apply(ctx) {
          try {
              (0, WorkstationPanel_js_1.wireConnection)(ctx);
              ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: panel_id_js_1.WORKSTATION_PANEL_ID }, () => (0, react_1.createElement)(WorkstationPanel_js_1.WorkstationPanel, {})));
              ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
                  name: 'sidebar.panellist',
                  id: panel_id_js_1.WORKSTATION_PANEL_ID,
                  order: 40,
                  label: () => '工位',
              }, WorkstationPanelIcon_js_1.WorkstationPanelIcon));
          }
          catch (e) {
              console.error('[shanhai-kaipu-workstation] client apply 失败 ⇒ 工位面板不显示（其余不受影响）', e);
          }
      }
      //# sourceMappingURL=index.js.map
      return module.exports;
    })();

    return m_index;
  },
});
