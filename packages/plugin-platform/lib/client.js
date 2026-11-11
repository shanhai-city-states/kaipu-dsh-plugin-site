/* 山海·开铺 · client bundle · @shanhai/kaipu-platform
 * 由 tools/build-client.mjs 生成 —— 请勿手改。
 * 模块 26 个（按依赖序）· 宿主外部模块 2 个：react/jsx-runtime, react
 */
window.__ModuleLoader__.load({
  id: "@shanhai/kaipu-platform",
  factory: function (require) {
    'use strict';

    /* ── client/Brand.js ── */
    var m_Brand = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.KaipuBrandName = KaipuBrandName;
      const jsx_runtime_1 = require("react/jsx-runtime");
      /**
       * 坐在宿主 `sidebar.brand.name` 座位上的品牌名。
       *
       * ★ 交接面：座位 owner props 是空的（`SidebarBrandNameOwnerProps` 没有字段）
       *   ⇒ 本组件**不接 props**。宿主自己负责把它套进 `.brandIdentity > .brandName`。
       * ★ `data-kaipu-brand` 是给真机判据用的结构锚点 —— 判据断"侧边栏那个座位上
       *   坐着的是我们"，靠这个锚点找，不靠满页找四个字。
       */
      function KaipuBrandName() {
          return ((0, jsx_runtime_1.jsx)("span", { "data-kaipu-brand": "1", style: {
                  display: 'block',
                  width: '100%',
                  fontSize: 13,
                  lineHeight: '24px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
              }, children: '山海 · 开铺' }));
      }
      //# sourceMappingURL=Brand.js.map
      return module.exports;
    })();

    /* ── client/bridge.js ── */
    var m_bridge = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      /**
       * 山海·开铺 · 场地插件 · client half —— 宿主通道（data channel）
       * =====================================================================
       * 面板**不直连服务端域名**，而是经**宿主网关**调本插件的 host half：
       *
       *   浏览器(client)  --connection.rpc.call('/api','kaipu/<m>',{args:{query}})-->
       *   DSH 网关（同源 · 已鉴权）  --> host half（Node）  --fetch--> kai-pu 服务端
       *
       * ★★ 为什么必须这样（两条，缺一都不成立）：
       *   ① **技术上**：`kai-pu` 不发任何 `access-control-*` 头、预检 `OPTIONS` 回 **501**
       *      （2026-10-05 实测）⇒ 浏览器跨源直连必被拦，带 `Authorization` 还会触发预检。
       *   ② **纪律上**：仓 README §四「插件不直连模型/服务端域名（一切走宿主适配层）」。
       *   ★ 附带收益：**`deviceToken` 只活在 host 进程内存里，浏览器永不持有凭据**。
       *
       * ══════════════════════════════════════════════════════════════════
       * ★★ 调用形态的两个硬细节（实测踩出来的，逐字照搬）
       * ══════════════════════════════════════════════════════════════════
       *   ① **`payload.args` 必须是对象、不是数组**，且键名 = host 方法的**参数名**。
       *      我们的 host 签名是 `listScenes(query, signal?)`，`signal` 被识别为取消参数
       *      并**从 wire 上剥掉** ⇒ 业务参数只剩 `query`：
       *        `{ args: { query: { … } } }`  ✅
       *        `{ args: [ … ] }`             ❌ 数组
       *        `{ args: { q: { … } } }`      ❌ 键名不对
       *      （`type` / `rpcId` 由 `rpc.call` 自己包，这里不要写。）
       *   ② **`call()` 的返回已经剥过一层信封**：拿到的直接是 `result`，不是
       *      `{type,rpcId,result}`。见下 §二 的两层 `ok` 说明。
       */
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ENDPOINTS = exports.CONNECTION_SERVICE = exports.REMOTE_CHANNEL = exports.REMOTE_NS = void 0;
      exports.endpointOf = endpointOf;
      exports.getConnection = getConnection;
      exports.callKaipu = callKaipu;
      /* ══════════════════════════════════════════════════════════════════
         ★★ 端点常量：**本文件与 host 侧各有一份，判据强制一致**
         ══════════════════════════════════════════════════════════════════
       * 为什么不共用一个文件：两端 tsconfig 的 module 格式不同（host ESM / client CJS），
       * 编到同一路径会**互相覆盖** —— 2026-10-05 实测踩到，症状是 host 侧报
       *   `The requested module '../shared/*.js' does not provide an export named 'REMOTE_NS'`
       * （后写的 CJS 产物把 ESM 产物冲掉了，而 DSH 只给一句泛泛的 "failed to import"）。
       * 而让 host 运行时依赖契约包也不行（契约是**构建期**依赖，用户机上没有）。
       *
       * ⇒ 按本仓一贯做法：**两端各写一份 + 判据**（不靠记性）——
       *   配套的桥接检查脚本直接扫**编译产物**，比对命名空间与端点名，
       *   改一边漏一边就 FAIL。
       *
       * ★ 端点字符串是 `'<命名空间>/<方法名>'`，写错就是"点了没反应"（不报错、
       *   不白屏、面板就是没数据）—— 所以这个一致性**必须有机器看护**。
       */
      /** remote 命名空间。★ 必须与 host 侧 `service.ts` 的 `REMOTE_NS` 同值（判据看护） */
      exports.REMOTE_NS = 'kaipu';
      /** 调用通道（宿主网关的逻辑通道名） */
      exports.REMOTE_CHANNEL = '/api';
      /** 宿主网关服务键（DSH 的 wire root 服务） */
      exports.CONNECTION_SERVICE = 'connection';
      /** 端点方法名 —— ★ 必须与 host 侧 `@Remote('<name>')` 逐字一致（判据看护） */
      exports.ENDPOINTS = {
          /** 接没接上（第一件要知道的事） */
          status: 'status',
          /** 取令牌 + `/me`（兼心跳） */
          connect: 'connect',
          listAgents: 'listAgents',
          listScenes: 'listScenes',
          capabilities: 'capabilities',
          /**
           * ★ 改席位（执行位 / 审计位）—— 写通道。
           *   host 侧 `assignSeat` → `POST /roles/assign`；服务端才是判据所在
           *   （签名位 403 / 执行与审计同一实体 409），前端不要自己预判。
           */
          assignSeat: 'assignSeat',
          /**
           * ★ 生成邀请链接 —— 和 `assignSeat` 同类：**写通道**。
           *   用户点「邀请协作方」⇒ host `createInvite` ⇒ `POST /invites`。
           */
          createInvite: 'createInvite',
          /**
           * 契约 §3.4 的运行 —— **两个一元端点**（不是流式）。
           * ★★ 为什么不是 `@Remote({ mode: 'stream' })`（2026-10-05 实测后定的）：
           *   浏览器侧唯一的非一元通道 `connection.rpc.open` **不存在**
           *   （DSH 源码：`Browser transports omit this method; API Gateway owns their WebSocket mux.`），
           *   而 `ctx.remote.<ns>.<method>()` 需要 namespace 被装配 ——
           *   那由 DSH 的 `api/remotes` client 用**硬编码内部包清单**完成，**第三方插件不在内**。
           *   ⇒ 改走"host 后台读 SSE + 客户端轮询增量"：
           *     `startRun` 立刻回 `runId`，`pollRun` 取增量（≈300ms 一轮）。
           *   详细取舍见 host 侧 `service.ts` 的 `runs` 字段长注。
           */
          startRun: 'startRun',
          pollRun: 'pollRun',
          /**
           * ★★ 铺子资料（**本机文件**，不走网）—— 与上面那批的性质不同：
           *   它们不发请求、不需要接入地址、**断网照常可用**。
           *   ⇒ 界面上"未接入服务端"时它们照常工作，两者不该互相牵连。
           */
          listShopFiles: 'listShopFiles',
          writeShopFiles: 'writeShopFiles',
          removeShopFile: 'removeShopFile',
          readShopTextFile: 'readShopTextFile',
          /**
           * ★ 在系统文件管理器里打开铺子目录（2026-10-06）。
           *   ★★ 参数**只有 `sub`（可选枚举）**、**没有 `path`** —— 路径由 host 自己算，
           *   外面传不进任意路径（比早先那处 `openPath` 更严）。理由见 host 侧
           *   `shop-files.ts` 的 `openShopDir` 长注。
           */
          openShopDir: 'openShopDir',
      };
      /** 拼出客户端要调的完整端点：`kaipu/listScenes` */
      function endpointOf(method) {
          return `${exports.REMOTE_NS}/${method}`;
      }
      /**
       * 从 cordis ctx 取 `connection`。
       *
       * ★ 为什么两种取法都试：实测过 `ctx.get('connection')` 与 `ctx.connection`
       *   在不同版本/不同装配时序下表现不一致 —— **取到哪个用哪个**，不要赌。
       * ★ 取不到**不抛**：返回 null，由调用方显示"未接入"，而不是让面板炸掉。
       */
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
      /**
       * 调一个 host 端点。
       *
       * @param conn  connection 服务
       * @param method host 方法名（**不带**命名空间）
       * @param query 业务参数（host 方法第一个参数的实参）
       * @param signal 取消信号（**可选**；host 侧已被剥掉，这里只是本地取消）
       */
      async function callKaipu(conn, method, query, signal) {
          const payload = { args: { query } }; // ★ 见文件头 ①
          let raw;
          try {
              raw = await conn.rpc.call(exports.REMOTE_CHANNEL, endpointOf(method), payload, signal);
          }
          catch (e) {
              return {
                  ok: false,
                  error: { kind: 'unreachable', code: 'transport', detail: e instanceof Error ? e.message : String(e) },
              };
          }
          const gw = raw;
          if (gw === null || typeof gw !== 'object') {
              return { ok: false, error: { kind: 'gateway', code: 'bad_result', detail: '网关返回体为空' } };
          }
          if (gw.ok !== true) {
              return {
                  ok: false,
                  error: {
                      kind: 'gateway',
                      code: gw.error?.code ?? 'gateway',
                      detail: gw.error?.message ?? '网关调用失败',
                  },
              };
          }
          // 第 2 层：`value` 就是 host 方法的返回值（业务信封）
          const v = gw.value;
          if (v === null || typeof v !== 'object') {
              return { ok: false, error: { kind: 'gateway', code: 'empty_value', detail: 'host 方法没有返回值' } };
          }
          if (v.ok !== true) {
              return {
                  ok: false,
                  business: {
                      code: typeof v.code === 'string' ? v.code : 'unknown',
                      message: typeof v.error === 'string' ? v.error : '服务端没有说明原因',
                  },
              };
          }
          return { ok: true, data: v.data };
      }
      //# sourceMappingURL=bridge.js.map
      return module.exports;
    })();

    /* ── client/mock/data.js ── */
    var m_data = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MOCK_ERROR_DETAIL = exports.MOCK_SEAT_CHANGES = exports.MOCK_SIGNATURE = exports.MOCK_RUNS = exports.MOCK_SCENE_RECOMMENDATIONS = exports.MOCK_SCENE_CATEGORIES = exports.MOCK_SCENES = exports.MOCK_AGENTS = exports.DATA_SOURCE_LABEL = void 0;
      exports.seatChangesOf = seatChangesOf;
      exports.errorDetailOf = errorDetailOf;
      /** ★ 数据来源标签 —— 面板必须显示它（纪律 3） */
      exports.DATA_SOURCE_LABEL = '演示数据（mock）';
      /* ─────────────────────────── GET /agents ─────────────────────────── */
      exports.MOCK_AGENTS = [
          {
              id: 'ag-1001',
              slug: 'subject-verifier',
              name: '主体核验方',
              // ★ 契约 v1.4 §3.1：`role` 的值域 = **灯名**（示例 `"role": "匠灯", "lamp": "匠灯"`），
              //   不是"执行/审计"这类**我方自编的角色词**。
              //   ⇒ 它同时是 `live.ts` 老形状兜底（`role === lamp` 匹配）的**唯一依据**，
              //     填错不会报错，只会**静默失配**。
              role: '智灯',
              capabilities: ['证照核验', '主体一致性'],
              skillSummary: '核验证照与主体信息是否一致。',
              status: 'enabled',
              version: 3,
          },
          {
              id: 'ag-1002',
              slug: 'duty-confirmer',
              name: '权责确认方',
              role: '匠灯',
              capabilities: ['权责边界', '签署留痕'],
              skillSummary: '确认权责边界并留存签署痕迹。',
              status: 'enabled',
              version: 2,
          },
          {
              id: 'ag-1003',
              slug: 'trail-auditor',
              name: '留痕审计方',
              role: '戒灯',
              capabilities: ['过程留痕', '完整性检查'],
              skillSummary: '检查过程留痕是否完整、可追溯。',
              status: 'enabled',
              version: 5,
          },
          {
              id: 'ag-1004',
              slug: 'conflict-screener',
              name: '利益冲突筛查方',
              role: '仁灯',
              capabilities: ['关联关系筛查'],
              skillSummary: '筛查关联关系与利益冲突。',
              // ★ `disabled` ⇒ 界面灰显「已停用」且**不许点**。
              //   契约（models.ts）写明：返回全部（含 disabled）是为了让用户看见"被关掉了" ——
              //   看不见的话，用户会以为是自己出错。
              status: 'disabled',
              version: 1,
          },
          {
              /**
               * ★★ `pending`（占地未接入）—— 契约 **v1.3 §23.4** 新增的合法值。
               *
               * 为什么演示数据必须有这一条（2026-10-05 补）：
               *   它是真服务端**空铺的常态**（实测 `GET /agents` 回 `{id:"zhinangtuan",
               *   status:"pending", name:"(待接入)", role:"综合维度", capabilities:[]}`）。
               *   而演示数据原先只有 `enabled` / `disabled` 两态 ⇒ **三态里的那一态在演示态看不到**，
               *   判据也就只能断两态。
               *
               * ★ 字段刻意**照真实占位条目来**：`capabilities: []` · `skillSummary: ''` · `version: 0`
               *   （服务端不给这三个）—— 界面与提示文案**必须能容忍"没有内容"**，
               *   而不是让 `vundefined` 或"｜"露到屏幕上。
               */
              id: 'ag-1005',
              slug: 'pending-slot',
              name: '(待接入)',
              /**
               * ★★ 2026-10-07 灯名对齐时**特意保留**了这一处的 `综合维度` —— 它不是漏改，是真值。
               *
               * 三个来源都指向同一个字面量：
               *   ① **真服务端实测**（2026-10-05）：`GET /agents` 的占位条目
               *      `{id:"zhinangtuan", status:"pending", name:"(待接入)", role:"综合维度", …}`；
               *   ② 契约 **v1.4 §22.1**：`round_start` 样例明写
               *      `data: { "round": 1, "reason": "首轮", "lamps": ["综合维度"] }`
               *      并注明「★ light-review **单灯场景的真实名**（不属四灯内置场景）」；
               *   ③ 同一份契约 §22.3 的 `start.lamps` = `[…]`（实现侧真跑读数）。
               *
               * ★★ 所以「`lamp` 一定是灯名」是**错的归纳**：
               *   多灯内置场景用**灯名**，**单灯场景**用**场景特定的名**。
               *   ⇒ 「把演示数据里所有非灯名一律改成灯名」会**改错**这一处。
               *   这正是"**值以权威件为准，不按我对规律的记忆改**"的一个具体落点。
               */
              role: '综合维度',
              capabilities: [],
              skillSummary: '',
              status: 'pending',
              version: 0,
          },
      ];
      /* ─────────────────────────── GET /scenes ─────────────────────────── */
      exports.MOCK_SCENES = [
          {
              scene: 'opening-audit',
              label: '开铺审计 · 标准',
              version: '1.1',
              lamps: [
                  // ★ 四盏灯的顺序与 v1.4 §3.3 内置场景 `["智灯","匠灯","戒灯","仁灯"]` **逐字一致**
                  // ★★ 2026-10-08 补 `duty`/`dutyNote` —— **这两个字段是契约 v1.5 §3.3 已有的**
                  //    （我方类型与 mock 此前都没跟上，属"契约有、我方缺"）。职责值**逐字取契约样例**，
                  //    不自己编：契约注明「`duty` 权威源 = 官网 `.t-role`」。
                  { lamp: '智灯', agentId: 'ag-1001', agentName: '主体核验方', duty: '拆局推演', dutyNote: '看眼前的路怎么走' },
                  { lamp: '匠灯', agentId: 'ag-1002', agentName: '权责确认方', duty: '工程落地与系统维护', dutyNote: '把图纸砌成城墙' },
                  { lamp: '戒灯', agentId: 'ag-1003', agentName: '留痕审计方', duty: '风险推演与预警', dutyNote: '先看哪里会塌' },
                  // ★★ `agentId: null` ⇒ **该灯尚未接入执行方** ⇒ 界面显「待接入」。
                  //    这是「场地零内置可跑」的用户可见面，**当一等公民做**，不是异常态。
                  { lamp: '仁灯', agentId: null, agentName: null, duty: '人味校准', dutyNote: '这条路，人走得下去吗' },
              ],
              loopPolicy: { maxLoop: 2, maxGlobalLoops: 4 },
              requiresExternal: false,
              // ★ 形状按契约 v1.3 §23.3（**数组**，每项 {seat, holderType, holderId, holderName}）
              //   —— 原先是「对象 + 三个固定键」的早期推测，契约落纸后改回契约形状。
              // ★★ 2026-10-08 补至 **4 项**：契约 v1.5 §23.3 明写「`seatHolders` **已落地（各场景 4 项）**」
              //    ⇒ 我方原 2 项**与现状不符**，这里补 management / signature。
              // ★ 同时订正 `holderType` 值域：`builtin` = 平台内建的**备选承担方**（智囊团/第三方审计/管理方）；
              //    `platform` = **平台自身提供的服务位 —— 契约注明"当前仅签名位"**
              //    ⇒ `execution` / `audit` 原写 `platform` **用错档**，改回 `builtin`。
              seatHolders: [
                  { seat: 'execution', holderType: 'builtin', holderId: 'ag-1001', holderName: '主体核验方' },
                  { seat: 'audit', holderType: 'builtin', holderId: 'ag-1003', holderName: '留痕审计方' },
                  // ★ 管理位取**契约 `seats.json` 的默认值**（「山海管理方（候选）」是**默认/示例**，
                  //   不是固定值 —— 发起人 2026-10-08 明确：管理位可以是项目主持人，也可以是委托方自己）。
                  { seat: 'management', holderType: 'builtin', holderId: 'shanhai-mgmt', holderName: '山海管理方（候选）' },
                  { seat: 'signature', holderType: 'platform', holderId: 'shanhai-signer', holderName: '山海签名服务' },
              ],
              description: '标准开铺审计：四个审核面会商，最高 2 轮回炉。',
              category: 'standard_review',
          },
          {
              scene: 'dry-run',
              label: '复核演练 · 全场未接入',
              version: '0.9',
              lamps: [
                  { lamp: '智灯', agentId: null, agentName: null, duty: '拆局推演', dutyNote: '看眼前的路怎么走' },
                  { lamp: '匠灯', agentId: null, agentName: null, duty: '工程落地与系统维护', dutyNote: '把图纸砌成城墙' },
                  { lamp: '戒灯', agentId: null, agentName: null, duty: '风险推演与预警', dutyNote: '先看哪里会塌' },
              ],
              loopPolicy: { maxLoop: 1, maxGlobalLoops: 1 },
              requiresExternal: false,
              // ★★ 2026-10-08 补 4 项（契约 v1.5 §23.3「各场景 4 项」）。
              //   ★ 这一场是「场地零内置可跑」的可见面 ⇒ 三个可替换位**全 `none`**（真的没人），
              //     唯独**签名位是平台自身服务**（`platform`）—— 它不依赖任何执行方接入，
              //     这正是"场地本身仍可用"的落点。
              seatHolders: [
                  { seat: 'execution', holderType: 'none', holderId: '', holderName: '（未指派）' },
                  { seat: 'audit', holderType: 'none', holderId: '', holderName: '（未指派）' },
                  { seat: 'management', holderType: 'none', holderId: '', holderName: '（未指派）' },
                  { seat: 'signature', holderType: 'platform', holderId: 'shanhai-signer', holderName: '山海签名服务' },
              ],
              description: '★ 场地零内置可跑的用户可见面：一个执行方都没有时，界面全是「待接入」；场地本身仍可用。',
              category: 'daily_selfcheck',
          },
          {
              scene: 'reservation-audit',
              label: '预约核验 · 需外部预约',
              version: '1.0',
              lamps: [
                  { lamp: '智灯', agentId: 'ag-1001', agentName: '主体核验方', duty: '拆局推演', dutyNote: '看眼前的路怎么走' },
                  { lamp: '戒灯', agentId: 'ag-1003', agentName: '留痕审计方', duty: '风险推演与预警', dutyNote: '先看哪里会塌' },
                  { lamp: '仁灯', agentId: null, agentName: null, duty: '人味校准', dutyNote: '这条路，人走得下去吗' },
              ],
              loopPolicy: { maxLoop: 1, maxGlobalLoops: 2 },
              // true ⇒ `run` 需带 `reservationId`；无有效预约 ⇒ 409 not_checked_in
              requiresExternal: true,
              seatHolders: [
                  { seat: 'execution', holderType: 'builtin', holderId: 'ag-1001', holderName: '主体核验方' },
                  { seat: 'audit', holderType: 'builtin', holderId: 'ag-1003', holderName: '留痕审计方' },
                  // ★ `holderType: 'none'` ⇒ **该执行位无人**（契约 §23.3 三值之一）——
                  //   与"待接入"同源但落在**执行位**这一层（原先 mock 写的是字符串「（未指派）」，
                  //   那是把"没人"编码进了名字里；契约给了它一个**类型值**，就该用它）。
                  { seat: 'management', holderType: 'none', holderId: '', holderName: '（未指派）' },
                  // ★★ 2026-10-08 补第 4 项（契约 v1.5 §23.3「各场景 4 项」）
                  { seat: 'signature', holderType: 'platform', holderId: 'shanhai-signer', holderName: '山海签名服务' },
              ],
              description: '带外部预约的核验场景：运行前须有有效预约。',
              category: 'standard_review',
          },
          {
              scene: 'material-precheck',
              label: '资料预检',
              version: '1.2',
              lamps: [
                  // ★ 这一场的执行方是「主体核验方」(ag-1001) 与「留痕审计方」(ag-1003) ——
                  //   按全局映射分别是**智灯**与**戒灯**（灯名跟着 agent 走，不跟着场景走）。
                  { lamp: '智灯', agentId: 'ag-1001', agentName: '主体核验方', duty: '拆局推演', dutyNote: '看眼前的路怎么走' },
                  { lamp: '戒灯', agentId: 'ag-1003', agentName: '留痕审计方', duty: '风险推演与预警', dutyNote: '先看哪里会塌' },
              ],
              loopPolicy: { maxLoop: 1, maxGlobalLoops: 1 },
              requiresExternal: false,
              // ★★ 2026-10-08 补 4 项（契约 v1.5 §23.3「各场景 4 项」）。
              //   ★★ 管理位**刻意用 `external` + 客户方的人** —— 发起人 2026-10-08 明确：
              //      「管理位不一定姓山海，可以是项目主持人，也可以是委托方自己」。
              //      ⇒ 演示数据要**把这个形态真的演出来**，否则界面上永远只看得到平台默认值，
              //        那条口径就只落在文档里、落不到屏幕上。
              seatHolders: [
                  { seat: 'execution', holderType: 'builtin', holderId: 'ag-1001', holderName: '主体核验方' },
                  { seat: 'audit', holderType: 'builtin', holderId: 'ag-1003', holderName: '留痕审计方' },
                  { seat: 'management', holderType: 'external', holderId: 'client-pm-1', holderName: '项目主持人' },
                  { seat: 'signature', holderType: 'platform', holderId: 'shanhai-signer', holderName: '山海签名服务' },
              ],
              description: '进件前的资料预检：不齐直接拒收，不收费。',
              category: 'daily_selfcheck',
          },
          {
              scene: 'opening-audit-live',
              label: '开铺审计 · 进行中',
              version: '1.1',
              lamps: [
                  { lamp: '智灯', agentId: 'ag-1001', agentName: '主体核验方', duty: '拆局推演', dutyNote: '看眼前的路怎么走' },
                  { lamp: '匠灯', agentId: 'ag-1002', agentName: '权责确认方', duty: '工程落地与系统维护', dutyNote: '把图纸砌成城墙' },
                  { lamp: '戒灯', agentId: 'ag-1003', agentName: '留痕审计方', duty: '风险推演与预警', dutyNote: '先看哪里会塌' },
              ],
              loopPolicy: { maxLoop: 2, maxGlobalLoops: 4 },
              requiresExternal: false,
              // ★★ 2026-10-08 补 4 项（契约 v1.5 §23.3「各场景 4 项」）—— 与 `opening-audit` 同一场景的快照
              seatHolders: [
                  { seat: 'execution', holderType: 'builtin', holderId: 'ag-1001', holderName: '主体核验方' },
                  { seat: 'audit', holderType: 'builtin', holderId: 'ag-1003', holderName: '留痕审计方' },
                  { seat: 'management', holderType: 'builtin', holderId: 'shanhai-mgmt', holderName: '山海管理方（候选）' },
                  { seat: 'signature', holderType: 'platform', holderId: 'shanhai-signer', holderName: '山海签名服务' },
              ],
              description: '同一场景的"跑到一半"快照：用于演示客户端断开时的措辞。',
              // ★★ **刻意留空** —— 契约 #17「未归类不藏」：有场景却没归类 ⇒ 界面必须
              //    **单列「未归类」如实展示**。留空一个就是为了让这条被演示到、被断言到。
              category: '',
          },
      ];
      /* ─────────────── GET /scenes 新增两段（契约变更 #17 · 纯追加）─────────────── */
      /*
       * ★★ 这两段是本轮新消费的（设计答复「**消费**」）。
       *   目的（他的原话）：**让客户先认出场合，而不是先学术语**。
       *
       * ★ 严格遵守他给的三条约束：
       *   1. `when` 是**「对什么场合推荐」**，不是「高频/热门」⇒ 界面上**不许**出现
       *      「热门 / 多数人 / 大家都在用」类措辞（**没有统计依据，写了就是编**）。
       *   2. **空分类不出**：某分类一个场景都没有 ⇒ 响应里就不会有它
       *      ⇒ 客户端**按响应渲染，不自己判空**。所以这份 fixtures 里
       *      `categories` 只列**真有场景的**两个（daily_selfcheck / standard_review）——
       *      刻意不放 `content_creation` / `tech_dev` / `project_eval` / `custom`。
       *   3. **未归类不藏**：`opening-audit-live` 的 `category` 留空 ⇒ 界面必须单列「未归类」。
       */
      exports.MOCK_SCENE_CATEGORIES = [
          {
              key: 'daily_selfcheck',
              label: '日常自查',
              intent: '东西已经写好了/做好了，想有人先帮我看一眼',
          },
          {
              key: 'standard_review',
              label: '标准审查',
              intent: '要正式过一遍，出个能拿出去的结论',
          },
      ];
      exports.MOCK_SCENE_RECOMMENDATIONS = [
          {
              key: 'quick_check',
              label: '快速看一眼',
              when: '就一个东西，想快点知道有没有硬伤',
              outputLevel: 'light',
          },
          {
              key: 'full_review',
              label: '完整会商',
              when: '重要的事，想几个审核面一起看',
              outputLevel: 'standard',
          },
      ];
      /* ───────────────── POST /scene/{id}/run 的事件序列 ───────────────── */
      /*
       * ★ 顺序严格按契约 sse-events.json：
       *   start → (round_start → lamp_start/lamp_delta×N/lamp_done → round_done)+ → summary → usage → done
       *
       * ★ `start.lamps` = **本次实际参与**的维度（`dims` 裁剪后的结果）——
       *   所以被裁掉的那**一个审核面**不出现在这里，它只会出现在 `summary.skippedDims`。
       */
      const AT = '2026-10-05T12:00:00+08:00';
      /** ① 开铺审计 · 标准 —— ★ 两轮（第 2 轮是回炉）+ 一个审核面被裁剪 + 一个待接入 */
      const RUN_OPENING_AUDIT = [
          { event: 'start', requestId: 'req-mock-0001', scene: 'opening-audit', lamps: ['智灯', '匠灯', '戒灯'], serverTime: AT },
          { event: 'round_start', round: 1, reason: '首轮' },
          { event: 'lamp_start', round: 1, lamp: '智灯', agent: '主体核验方' },
          { event: 'lamp_delta', round: 1, lamp: '智灯', text: '比对营业执照与主体信息…' },
          { event: 'lamp_delta', round: 1, lamp: '智灯', text: '经营范围一栏与申请书不一致。' },
          { event: 'lamp_done', round: 1, lamp: '智灯', verdict: '⚡有条件', detail: '证照影像缺一页，需补件后复核。', latencyMs: 1840 },
          { event: 'lamp_start', round: 1, lamp: '匠灯', agent: '权责确认方' },
          { event: 'lamp_delta', round: 1, lamp: '匠灯', text: '核对签署人与权责边界…' },
          { event: 'lamp_done', round: 1, lamp: '匠灯', verdict: '✅通过', detail: '签署人与权责边界一致。', latencyMs: 1210 },
          { event: 'lamp_start', round: 1, lamp: '戒灯', agent: '留痕审计方' },
          { event: 'lamp_delta', round: 1, lamp: '戒灯', text: '逐条核对过程留痕…' },
          { event: 'lamp_done', round: 1, lamp: '戒灯', verdict: '✅通过', detail: '留痕完整、可追溯。', latencyMs: 960 },
          { event: 'round_done', round: 1, verdict: '⚡有条件' },
          // ★★ 回炉（契约变更 #2）：R2 要求界面按「第 N 轮」分段、**不合并成一条流水**
          { event: 'round_start', round: 2, reason: '⚡有条件回炉' },
          { event: 'lamp_start', round: 2, lamp: '智灯', agent: '主体核验方' },
          { event: 'lamp_delta', round: 2, lamp: '智灯', text: '补件已收到，重新核验…' },
          { event: 'lamp_done', round: 2, lamp: '智灯', verdict: '✅通过', detail: '补件核验通过。', latencyMs: 1420 },
          { event: 'lamp_start', round: 2, lamp: '匠灯', agent: '权责确认方' },
          { event: 'lamp_delta', round: 2, lamp: '匠灯', text: '复核权责边界（第 2 轮）…' },
          { event: 'lamp_done', round: 2, lamp: '匠灯', verdict: '✅通过', detail: '复核通过。', latencyMs: 880 },
          { event: 'lamp_start', round: 2, lamp: '戒灯', agent: '留痕审计方' },
          { event: 'lamp_delta', round: 2, lamp: '戒灯', text: '复核留痕（第 2 轮）…' },
          { event: 'lamp_done', round: 2, lamp: '戒灯', verdict: '✅通过', detail: '复核通过。', latencyMs: 740 },
          { event: 'round_done', round: 2, verdict: '✅通过' },
          {
              event: 'summary',
              verdict: '✅通过',
              conditions: ['补件已核验（第 2 轮）'],
              round: 2,
              participatedDims: ['智灯', '匠灯', '戒灯'],
              // ★ 契约 #4：报告**不能**给出"审全了"的错觉 ⇒ 这一项必须在报告里可见
              skippedDims: ['仁灯'],
          },
          { event: 'usage', tokensIn: 12840, tokensOut: 3160, credits: 12, balanceAfter: 488 },
          { event: 'done', finishReason: 'completed' },
      ];
      /** ② 预约核验 · 需外部预约 —— ★ 覆盖 ❌驳回（abort） */
      const RUN_RESERVATION = [
          { event: 'start', requestId: 'req-mock-0002', scene: 'reservation-audit', lamps: ['智灯', '戒灯'], serverTime: AT },
          { event: 'round_start', round: 1, reason: '首轮' },
          { event: 'lamp_start', round: 1, lamp: '智灯', agent: '主体核验方' },
          { event: 'lamp_delta', round: 1, lamp: '智灯', text: '核验预约单与主体信息…' },
          { event: 'lamp_done', round: 1, lamp: '智灯', verdict: '❌驳回', detail: '预约单主体与申请主体不一致。', latencyMs: 1560 },
          { event: 'lamp_start', round: 1, lamp: '戒灯', agent: '留痕审计方' },
          { event: 'lamp_delta', round: 1, lamp: '戒灯', text: '中止前留痕已封存。' },
          { event: 'lamp_done', round: 1, lamp: '戒灯', verdict: '❌驳回', detail: '随主判定一并中止。', latencyMs: 520 },
          { event: 'round_done', round: 1, verdict: '❌驳回' },
          {
              event: 'summary',
              verdict: '❌驳回',
              conditions: [],
              round: 1,
              participatedDims: ['智灯', '戒灯'],
              skippedDims: ['仁灯'],
          },
          { event: 'usage', tokensIn: 5240, tokensOut: 1180, credits: 5, balanceAfter: 483 },
          { event: 'done', finishReason: 'aborted' },
      ];
      /** ③ 资料预检 —— ★ 覆盖 ⛔拒收（不收费） */
      const RUN_PRECHECK = [
          { event: 'start', requestId: 'req-mock-0003', scene: 'material-precheck', lamps: ['智灯', '戒灯'], serverTime: AT },
          { event: 'round_start', round: 1, reason: '首轮' },
          { event: 'lamp_start', round: 1, lamp: '智灯', agent: '主体核验方' },
          { event: 'lamp_delta', round: 1, lamp: '智灯', text: '逐项核对进件材料清单…' },
          { event: 'lamp_done', round: 1, lamp: '智灯', verdict: '✅通过', detail: '材料齐备。', latencyMs: 640 },
          { event: 'lamp_start', round: 1, lamp: '戒灯', agent: '留痕审计方' },
          { event: 'lamp_delta', round: 1, lamp: '戒灯', text: '检查留痕链…发现断点。' },
          { event: 'lamp_done', round: 1, lamp: '戒灯', verdict: '⛔拒收', detail: '留痕链存在断点，不予受理。', latencyMs: 700 },
          { event: 'round_done', round: 1, verdict: '⛔拒收' },
          {
              event: 'summary',
              verdict: '⛔拒收',
              conditions: [],
              round: 1,
              participatedDims: ['智灯', '戒灯'],
              skippedDims: [],
          },
          // ★ 契约：「⛔拒收 ⇒ 不收费」⇒ credits = 0，且余额不动。
          { event: 'usage', tokensIn: 3120, tokensOut: 620, credits: 0, balanceAfter: 483 },
          { event: 'done', finishReason: 'refused' },
      ];
      /**
       * ④ 开铺审计 · 进行中 —— **只到第 1 轮中段就断**。
       * 用途：界面处于 `running`，可演示 R5「断开 = 已停止接收（不写已取消）」。
       */
      const RUN_LIVE = [
          { event: 'start', requestId: 'req-mock-0004', scene: 'opening-audit-live', lamps: ['智灯', '匠灯', '戒灯'], serverTime: AT },
          { event: 'round_start', round: 1, reason: '首轮' },
          { event: 'lamp_start', round: 1, lamp: '智灯', agent: '主体核验方' },
          { event: 'lamp_delta', round: 1, lamp: '智灯', text: '比对营业执照与主体信息…' },
          { event: 'lamp_done', round: 1, lamp: '智灯', verdict: '✅通过', detail: '主体信息一致。', latencyMs: 1320 },
          { event: 'lamp_start', round: 1, lamp: '匠灯', agent: '权责确认方' },
          { event: 'lamp_delta', round: 1, lamp: '匠灯', text: '核对签署人与权责边界…' },
          // ← 事件到此为止：仍在 running
      ];
      /** scene → 事件序列。**没有条目的场景 = 未运行**（不是错误态）。 */
      exports.MOCK_RUNS = {
          'opening-audit': RUN_OPENING_AUDIT,
          'reservation-audit': RUN_RESERVATION,
          'material-precheck': RUN_PRECHECK,
          'opening-audit-live': RUN_LIVE,
      };
      /* ────────────────── 三条必须显示的约束（对应的数据） ────────────────── */
      /**
       * ★ 约束 ①：报告**无签名** ⇒ 界面必须醒目提示。
       *
       * 这里**恒为 `null`（未签名）**，而且是**刻意的**：
       * 签名只能由服务端给出，而演示数据根本不来自服务端 ——
       * 显示"已签名"就是撒谎（官方 `contributing.md`：呈现也不能夸大）。
       * 如实显示未签名，既符合事实，也顺手把"这是演示数据"再说清一遍。
       */
      exports.MOCK_SIGNATURE = null;
      exports.MOCK_SEAT_CHANGES = {
          'opening-audit': [
              {
                  seat: '执行位',
                  from: '（空）',
                  to: '主体核验方',
                  reason: '首次接入',
                  at: '2026-10-01 10:12',
                  by: '铺主',
              },
              {
                  seat: '执行位',
                  from: '主体核验方',
                  to: '权责确认方',
                  reason: '原执行方连续两次超时，改由权责确认方承担',
                  at: '2026-10-03 16:40',
                  by: '铺主',
              },
          ],
          'reservation-audit': [
              {
                  seat: '审计位',
                  from: '（空）',
                  to: '留痕审计方',
                  reason: '首次接入',
                  at: '2026-10-02 09:05',
                  by: '铺主',
              },
          ],
      };
      /** 没有变更记录的场景返回空数组（**不是错误态**，界面显「尚无变更记录」） */
      function seatChangesOf(scene) {
          return exports.MOCK_SEAT_CHANGES[scene] ?? [];
      }
      /**
       * 错误的 `detail`（**只有两个"另走一条路"的码需要**）。
       *
       * ★★ 为什么必须有这张表：契约里那两个码的 `clientAction` 是「**按 `detail.poll` 切到查询接口**」
       *    「按 `detail.requiresExternal` 显示该场景需进场」「带 `availableAt` 就必须一并显示」。
       *    **没有 detail 就没有出路** —— 界面只能干说一句"这一单已经在跑了，别急"，用户仍然什么也做不了。
       *    （这是 Step 7 实测抓到的真实缺口：第一版接线漏了 detail。）
       *
       * 形状照抄契约的 `detailShape` 字段：
       *   duplicate_request → { "state": "running", "poll": "/scene/run/{requestId}" }
       *   not_checked_in    → { "requiresExternal": true, "availableAt": "<ISO8601>" }
       *
       * ★ `availableAt` 用**固定值**（确定性纪律）：判据要能断言到具体字面量。
       *   日期取了一个明确的时间点，避免"跑的时候刚好跨天"导致断言飘。
       */
      exports.MOCK_ERROR_DETAIL = {
          duplicate_request: { state: 'running', poll: '/scene/run/req-mock-0001' },
          not_checked_in: { requiresExternal: true, availableAt: '2026-10-06T09:30:00+08:00' },
      };
      function errorDetailOf(code) {
          return code === null ? undefined : exports.MOCK_ERROR_DETAIL[code];
      }
      //# sourceMappingURL=data.js.map
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
      exports.currentConnection = currentConnection;
      exports.mockSnapshot = mockSnapshot;
      exports.decideSceneCache = decideSceneCache;
      exports.loadLive = loadLive;
      const bridge_js_1 = m_bridge;
      const data_js_1 = m_data;
      /* ══════════════════════════════════════════════════════════════════
         一、连接句柄（模块级单例 —— 由 `index.ts` 的 apply 注入）
         ══════════════════════════════════════════════════════════════════
       * ★ 为什么放模块级：面板组件在 slot 里渲染，**拿不到插件的 cordis ctx**。
       *   `apply()` 时取到 connection 存这里，面板读这里 —— 同款做法。
       * ★ 未注入（取不到 connection 服务）时保持 null：面板显示"通道不可用"，
       *   这是**环境问题**，不是业务错误，措辞要分开。
       */
      let connection = null;
      function setConnection(conn) {
          connection = conn;
      }
      function hasConnection() {
          return connection !== null;
      }
      /**
       * 取当前的通道句柄。
       *
       * ★ 为什么要开这个口子：`run.ts`（发起运行）走的是**同一条一元通道**
       *   （host 后台读 SSE、客户端轮询增量，见其文件头），它需要自己发请求 ——
       *   而连接是 `index.ts` 在 apply 期注入到**本模块**的。
       *   与其把连接再存一份（两个落点必然漂移），不如从唯一的持有者这里取。
       */
      function currentConnection() {
          return connection;
      }
      /** 演示数据快照（面板的"设计评审"模式） */
      function mockSnapshot() {
          return {
              kind: 'mock',
              label: data_js_1.DATA_SOURCE_LABEL,
              reason: null,
              server: null,
              agents: [...data_js_1.MOCK_AGENTS],
              scenes: [...data_js_1.MOCK_SCENES],
              categories: data_js_1.MOCK_SCENE_CATEGORIES.map((c) => ({ ...c })),
              recommendations: data_js_1.MOCK_SCENE_RECOMMENDATIONS.map((r) => ({ ...r })),
              /**
               * ★ 演示数据**不走服务端** ⇒ 缓存机制在此**不适用**。
               * ★ 但**不能**把它标成 `basis: 'absent'` —— 那会把两种东西混为一谈：
               *   · `absent` = **服务端还没给依据**（是个待办，会变）
               *   · 这里的 `null` = **本快照根本不来自己服务端**（是设计如此，不会变）
               * ⇒ 用 `'n/a'` 单独表达第三态，免得将来有人看着演示态的 `absent` 去追服务端。
               */
              cache: { hit: false, basis: 'n/a', updatedAt: null, staleReason: '演示数据不过网，缓存机制不适用' },
              account: null,
          };
      }
      /* ══════════════════════════════════════════════════════════════════
         三、形状映射（服务端实测形状 → 面板/契约形状）
      
         ★★ 纪律（2026-10-06 立 · 来源是我方自己踩的一个 bug · 已被对方采纳为方法论）：
      
           「**兼容读法能防崩，不能防错** —— 凡提供兼容/兜底路径的字段，
             必须同时给一条『**陌生形状必须报错**』的判据。」
      
         为什么会有这条：`mapLamps` 曾期望字符串数组、靠 `role` 猜执行方；
         服务端改回对象数组后，它把**对象**当 key 查表，恒 `undefined`
         ⇒ **静默退化成"全部待接入"**。而**那次结果碰巧是对的**（真服务端确实全待接入）
         ⇒ **没有任何判据发现它**。
         ⇒ 「不崩」不等于「对」：**静默吸收陌生形状，等于把错误藏起来**。
      
         ★ 下方是**本文件的兜底点清单**。
           **每加一处兜底，必须在同一行注明「谁看护它」** —— 没有看护的兜底 = 下一个 mapLamps。
      
         | 兜底点 | 陌生/缺失输入怎么办 | 谁看护 |
         |:--|:--|:--|
         | `toAgentStatus` | 未知值 → `pending`（静默） | ✅ 漂移探针：`agents[].status 取值都在契约内` |
         | `toOutputLevel` | 未知值 → `null`（**静默丢弃**） | ✅ 漂移探针：`recommendations[].outputLevel 值域` |
         | `toSceneCard.category` | 缺失 → `''` | ✅ 同探针：`每个 scene.category 非空` |
         | `mapLamps` | 形状联合 ＋ 查不到 id ⇒ 待接入 | ✅ **类型收紧（编译期即判据）** ＋ 同源断言 |
         | `loopPolicy ?? 1` / `version ?? 0` | 缺失 → 默认值 | ⚠️ **尚未配判据（已知缺口）** |
      
         ⚠️ 已知缺口如实记：`loopPolicy` / `version` 的默认值**没有判据看护**。
           风险等级低（缺省不改变语义、界面也不会因此说谎），但**按上面的纪律应当补** ——
           写在这里，免得下次又想不起来。
         ══════════════════════════════════════════════════════════════════ */
      /**
       * 维度 → 执行方。★ **归一化的唯一入口**。
       *
       * ★★ 归一化成什么：**"这个执行位没有真人接"一律表达为 `agentId: null`**。
       *   理由：表达只有一种，界面层就不必知道"占位 id"这回事 ——
       *   `LeftPane` 的「待接入 N」就是 `agentId === null` 的计数，**它不需要改**。
       *
       * ★★ 2026-10-06 重写（原实现**方向是错的**，只是碰巧没出事）：
       *
       *   旧签名 `mapLamps(lamps: readonly string[], …)` 期望**字符串数组**，
       *   靠 `/agents[].role` 与 lamp 名精确匹配来**猜**执行方。
       *   而服务端已按契约 §23.3 把 `lamps` 升格成**对象数组** ⇒ 旧代码把**对象**当 key 查表，
       *   恒 `undefined` ⇒ 整个场景退化成"全部待接入"。
       *
       *   ★ 那次的**结果碰巧是对的**（真服务端当前确实每个执行位都待接入），所以没被发现。
       *     但**方向是错的**：一旦有真 Agent 接入，它**仍会报「待接入」** ——
       *     用户看到"这场戏缺人"，而实际不缺。
       *   ⇒ 教训：**"双兼容读法"能防崩，不能防错**。吃到陌生形状时**必须走对分支**，
       *     不能"不崩就算过"。
       *
       *   现在有两个**权威字段**（不必再猜）：
       *     · `lamps[].agentId` —— 与 `lamp_start.agent` 同源
       *     · `/agents[].status` —— `pending` ⇒ 占位条目（占地未接入）
       *
       * ★ `disabled` 在这条里算什么：**不算"待接入"**（那是"有人关掉了"，另一回事）。
       *   但**也不该当成可用执行方**。这里只在"**有没有真人接**"这一个维度上判定，
       *   「已停用」由左栏的三态显示单独表达 —— 两件事分开表达，不互相顶替。
       */
      function mapLamps(lamps, agents) {
          const byId = new Map();
          for (const a of agents)
              byId.set(a.id, a);
          return lamps.map((raw) => {
              // ── 新形状（对象 · 契约 §23.3）⇒ `agentId` 是**权威** ──
              if (typeof raw !== 'string') {
                  const id = raw.agentId ?? null;
                  const a = id === null ? undefined : byId.get(id);
                  // 查不到该 id ⇒ 按待接入（**fail-closed**：宁可说"还没接入"，
                  // 不可说"已接入" —— 后者会让人以为这一个审核面已经审过了）
                  const vacant = id === null || a === undefined || a.status === 'pending';
                  return {
                      lamp: raw.lamp,
                      // ★ 占位 id **不往界面传**：收敛成 null（见函数头）
                      agentId: vacant ? null : id,
                      agentName: vacant ? null : (raw.agentName ?? a?.name ?? null),
                  };
              }
              // ── 老形状（字符串）⇒ 只能靠 role 猜（最后兜底；对方给的 `lampNames` 走这条） ──
              const hit = agents.find((x) => x.role === raw);
              if (hit === undefined || hit.status === 'pending') {
                  return { lamp: raw, agentId: null, agentName: null };
              }
              return { lamp: raw, agentId: hit.id, agentName: hit.name };
          });
      }
      function toSceneCard(s, agents) {
          return {
              scene: s.scene,
              label: s.label,
              version: s.version,
              lamps: mapLamps(s.lamps, agents),
              loopPolicy: {
                  maxLoop: s.loopPolicy.maxLoop ?? 1,
                  maxGlobalLoops: s.loopPolicy.maxGlobalLoops ?? 1,
              },
              requiresExternal: s.requiresExternal === true,
              // ★ 2026-10-06 新增字段：执行位承担方快照（服务端按契约 §23.3 开始下发）
              ...(s.seatHolders === undefined ? {} : { seatHolders: s.seatHolders.map((h) => ({ ...h })) }),
              ...(s.description === undefined ? {} : { description: s.description }),
              // ★ 对方已把 `/scenes` 改成**三处同源回落**（YAML → 归属表 → 兜底）
              //   ⇒ 空串**已消除**（2026-10-06 实测）；这里保留 `?? ''` 只是**类型容错**，不是预期。
              category: s.category ?? '',
          };
      }
      /**
       * `status` 的收敛规则。
       *
       * ★★ 2026-10-05 修订（原为"未知值一律当 `disabled`"的 fail-closed）——
       *   契约 v1.3 §23.4 **新增了 `'pending'`**（占地未接入）⇒ 它**不再"未知"**。
       *   而旧的 fail-closed 会把占位条目报成「已停用」，**这不是保守，是编造事实**：
       *     · `disabled` = 某人把这位子**关掉了**（一个确定的决定）
       *     · `pending`  = 这位子**还没人接**（正常态）
       *   两者给用户的下一步动作完全不同（"去问为什么关掉" vs "去接入"）。
       *   ⇒ 真服务端实测（`status="pending"`）当场抓到过这条，见后续收执件。
       *
       * ★ 三个**契约内**取值各归其位（并集：§3.1 的 enabled/disabled ＋ §23.4 的 pending）。
       *
       * ★ 契约外的未知值怎么办 —— 仍要有个兜底，但**归到哪**要讲理：
       *   不归 `disabled`（那是在断言"有人关掉了它"，而我们并不知道）；
       *   归 `pending`（"这位子有、状态未明"最接近实情，且**不编造一个决定**）。
       *   —— 与"未签名报告必须醒目""读不到就说读不到"同一条价值取向：**宁可说不知道，不可编原因**。
       */
      function toAgentStatus(s) {
          if (s === 'enabled')
              return 'enabled';
          if (s === 'disabled')
              return 'disabled';
          // `pending` ＋ 任何未知取值 ⇒ 都按"未接入"处理（见上：宁可说不知道，不可编原因）
          return 'pending';
      }
      /** 同理：`outputLevel` 契约只有 light/standard/strict 三个取值，其余**宁可丢掉**也不编 */
      const OUTPUT_LEVELS = new Set(['light', 'standard', 'strict']);
      function toOutputLevel(s) {
          return OUTPUT_LEVELS.has(s) ? s : null;
      }
      function toAgentCard(a) {
          return {
              id: a.id,
              // 契约里 `slug` 是必填；服务端没给时回落到 `id`（`slug` 不面向用户，界面上用的是 name）
              slug: a.slug ?? a.id,
              name: a.name,
              role: a.role,
              capabilities: a.capabilities ?? [],
              skillSummary: a.skillSummary ?? '',
              status: toAgentStatus(a.status),
              version: a.version ?? 0,
          };
      }
      /**
       * 分类 → 契约形状。
       * ★ 服务端多给的 `scenes` / `count` **一并带上**（`LeftPane` 会优先用它，见文件头 ①）。
       *   这里不写进契约类型，只作为**运行时附加字段**透传 —— 契约变更由出件方发起。
       */
      function toCategories(cats) {
          return cats.map((c) => ({
              key: c.key,
              label: c.label,
              intent: c.intent ?? '',
              ...(Array.isArray(c.scenes) ? { scenes: [...c.scenes] } : {}),
              ...(typeof c.count === 'number' ? { count: c.count } : {}),
          }));
      }
      function toRecommendations(recs) {
          const out = [];
          for (const r of recs) {
              // ★ 两道过滤都是 **fail-closed**（宁可少显示，也不编）：
              //   ① 服务端标了 `available: false` 的不推荐；
              //   ② `outputLevel` 不在契约三取值内的**整条丢掉** —— 契约里它是必填，
              //      而编一个档位会让用户按错的档位去理解（比不显示更坏）。
              if (r.available === false)
                  continue;
              const lv = r.outputLevel === undefined ? null : toOutputLevel(r.outputLevel);
              if (lv === null)
                  continue;
              out.push({
                  key: r.key,
                  label: r.label,
                  when: r.when ?? '',
                  outputLevel: lv,
                  ...(Array.isArray(r.availableScenarios) && r.availableScenarios.length > 0
                      ? { scenarios: [...r.availableScenarios] }
                      : {}),
              });
          }
          return out;
      }
      /* ══════════════════════════════════════════════════════════════════
         四、加载
         ══════════════════════════════════════════════════════════════════ */
      const p = (r) => r.ok === true ? '' : 'business' in r ? r.business.message : r.error.detail;
      /**
       * ★★ 流程清单的**上一次成功结果**（缓存本体）· 2026-10-07 新增
       *
       * 存在**模块作用域**：一次会话里面板会反复取快照（切场景、重连、点刷新…），
       *   缓存的寿命应当**跟着会话**，不该跟着某一次调用。
       * ⚠️ 它是**内存态**（刷新页面即空）—— 这正合适：v2 要求的是"同一会话内不重复重建"，
       *   **不是**持久化缓存（持久化会带来"跨版本读到旧形状"的新风险，本仓吃过这类的亏）。
       */
      let scenesCache = null;
      /**
       * ★★ 连不上时**返回"空 + 原因"，绝不填演示数据**。
       *
       * 这条是 2026-10-05 被 `live-probe --expect=unreachable` **当场抓到的真缺陷**：
       *   第一版实现里，几个失败分支都写成 `{ ...mockSnapshot(), kind: 'unreachable', … }`
       *   —— 于是界面出现最坏的一种组合：
       *     **状态条说「未接入」，左边却摆着 5 个演示场景**。
       *   那正是我这套设计要防的东西：**看起来是对的**。用户会以为那是他铺子里的流程。
       *   ⇒ 现在失败一律返回**空列表**（原因写在状态条里），演示数据只能由用户
       *     **显式点按钮**获得。
       *
       * ★ 另外：这里的文案是**上屏文本**，不许带 markdown 记号（第一版把 `**…**`
       *   直接印在了界面上 —— 同一批修掉的）。
       */
      function offlineSnapshot(kind, label, reason) {
          /**
           * ★★ **连不上 ⇒ 把流程缓存作废**（2026-10-07 加 · 与上面那条同源：宁可重拉，不可过期）。
           * 为什么必须在这里清（而不是在调用方）：本函数是**所有失败分支的唯一出口** ——
           *   清在这里，就**不可能漏**；清在调用方，就总有一天漏一处。
           * ★ 这正是"**把纪律放在唯一的必经之道上**"。
           */
          scenesCache = null;
          return {
              kind,
              label,
              reason,
              server: null,
              agents: [],
              scenes: [],
              categories: [],
              recommendations: [],
              /**
               * ★ 读不到服务端 ⇒ 缓存状态也是空（`basis: null`）。
               * ★★ 并**顺手清掉流程缓存** —— 这一条**要紧**：
               *   若不清，下次恢复连接时可能拿"断网前的缓存"去比对一个**中间已经变过的清单**
               *   （我们没看见那段变化）⇒ 会**静默显示过期清单**。
               *   ⇒ **连不上时把缓存作废**，是"宁可重拉，不可过期"。
               */
              cache: { hit: false, basis: null, updatedAt: null, staleReason: null },
              account: null,
          };
      }
      /**
       * ★★ 流程清单缓存的**判定**（纯函数 · 2026-10-07）
       *
       * ★★ 为什么抽成纯函数：这套判定的**真实触发条件今天根本到不了** ——
       *   服务端还没下发 `updatedAt` ⇒ 线上永远走 `basis: 'absent'` 那一支。
       *   ⇒ 若把逻辑埋在 `liveFromServer` 里，**"命中缓存"这条路径将永远没人验过**，
       *     等对方落了 `updatedAt` 那天，第一次真跑就是它在线上第一次执行。
       *   ★ 这违反我方纪律：**"该判的东西变了"要能被判**，而不能靠"它看起来对"。
       *   ⇒ 抽出来 ⇒ 四支都能被**独立喂入**验一遍（`tools/probe/scene-cache-test.mjs`）。
       *
       * @param input.updatedAt  本次响应顶层 `updatedAt`（`null` = 服务端没给）
       * @param input.agentsSig  本次执行方清单的签名
       * @param input.cached     上次成功的缓存（`null` = 没有）
       * @returns 决定：`hit` 表示**复用 cached 的三份清单**；`store` 表示**要不要写入缓存**
       */
      function decideSceneCache(input) {
          const { updatedAt, agentsSig, cached } = input;
          // ── ① 依据缺失 ⇒ 机制不生效 ⇒ 全量重建，且**不写缓存**（写了也无从比对）──
          if (updatedAt === null) {
              return { hit: false, basis: 'absent', staleReason: null, store: false };
          }
          // 首次（没有可比的缓存）⇒ 重建 + 存档
          if (cached === null) {
              return { hit: false, basis: 'updatedAt', staleReason: null, store: true };
          }
          // ── ② 依据变了 ⇒ 重建 + 刷新存档 ──
          if (cached.updatedAt !== updatedAt) {
              return { hit: false, basis: 'updatedAt', staleReason: null, store: true };
          }
          // ── ★ 依据没变，但执行方变了 ⇒ **不许命中**（卡片里的执行方名会过期）──
          if (cached.agentsSig !== agentsSig) {
              return {
                  hit: false,
                  basis: 'updatedAt',
                  staleReason: '流程清单未变，但执行方清单变了 —— 卡片里的执行方名会过期，故重建',
                  store: true,
              };
          }
          // ── ③ 依据没变、执行方也没变 ⇒ 命中 ──
          return { hit: true, basis: 'updatedAt', staleReason: null, store: false };
      }
      /** 读真服务端。**任何一步失败都如实返回，不回落到 mock**（见上） */
      async function loadLive(signal) {
          if (connection === null) {
              return offlineSnapshot('no_channel', '通道不可用', '没取到宿主的数据通道（connection 服务）。这是环境问题，不是服务端故障。');
          }
          const st = await (0, bridge_js_1.callKaipu)(connection, 'status', {}, signal);
          if (st.ok !== true) {
              return offlineSnapshot('unreachable', '未连上', p(st));
          }
          if (!st.data.connected) {
              return offlineSnapshot('unreachable', '未接入（本地模式）', '本插件还没配接入地址。填上服务端地址即可接入 —— 未接入不是故障。');
          }
          if (st.data.authError !== undefined) {
              return offlineSnapshot('unreachable', '接入异常', st.data.authError);
          }
          const [sc, ag, me] = await Promise.all([
              (0, bridge_js_1.callKaipu)(connection, 'listScenes', {}, signal),
              (0, bridge_js_1.callKaipu)(connection, 'listAgents', {}, signal),
              (0, bridge_js_1.callKaipu)(connection, 'connect', {}, signal),
          ]);
          if (sc.ok !== true)
              return offlineSnapshot('unreachable', '读流程失败', p(sc));
          if (ag.ok !== true)
              return offlineSnapshot('unreachable', '读执行方失败', p(ag));
          const agents = ag.data.agents ?? [];
          /**
           * ★★ 流程清单的缓存判定（2026-10-07 · 对应该验收项）
           *
           * 规则（照 v2 §4.1 的字面）：**首次全量拉**；之后拿响应顶层 `updatedAt` 比对，
           *   **不同则重拉、相同则用缓存**。
           *
           * ⚠️ 一个必须讲清的前提：**没有 `ETag` ⇒ 无法免掉这次请求**
           *   （v2 明确"不做 ETag / Cache-Control，顶层 `updatedAt` 足够"）。
           *   ⇒ 所以这里的"用缓存"= **复用已构造好的卡片**（省掉重建与下游重渲染），
           *     **不是**省掉网络请求 —— 这一点不能含糊，否则会被理解成"离线也能用"。
           */
          const rawUpdatedAt = sc.data.updatedAt;
          const updatedAt = typeof rawUpdatedAt === 'string' && rawUpdatedAt !== '' ? rawUpdatedAt : null;
          const agentsSig = agents.map((a) => `${a.id}|${a.name}|${a.status}`).join(',');
          // ★ 判定交给纯函数（可被独立验；见 decideSceneCache 的注释）
          const decision = decideSceneCache({ updatedAt, agentsSig, cached: scenesCache });
          let scenes;
          let categories;
          let recommendations;
          if (decision.hit && scenesCache !== null) {
              // ── ③ 命中 ⇒ 复用缓存的三份清单 ──
              scenes = scenesCache.scenes;
              categories = scenesCache.categories;
              recommendations = scenesCache.recommendations;
          }
          else {
              // ── ①/②/执行方变了 ⇒ 全量重建 ──
              scenes = (sc.data.scenes ?? []).map((s) => toSceneCard(s, agents));
              categories = toCategories(sc.data.categories ?? []);
              recommendations = toRecommendations(sc.data.recommendations ?? []);
              // ★ 依据缺失时**不写缓存**（`store === false`）—— 没有比对依据的存档是**假缓存**
              if (decision.store && updatedAt !== null) {
                  scenesCache = { updatedAt, agentsSig, scenes, categories, recommendations };
              }
              else if (updatedAt === null) {
                  // ★ 依据都没了 ⇒ 旧缓存**不可信**（我们无从知道它之后变没变过）⇒ 作废
                  scenesCache = null;
              }
          }
          const cacheState = {
              hit: decision.hit,
              basis: decision.basis,
              updatedAt,
              staleReason: decision.staleReason,
          };
          return {
              kind: 'live',
              label: '真服务端',
              reason: null,
              server: {
                  baseUrl: st.data.baseUrl,
                  accountId: st.data.accountId,
                  serverTime: st.data.serverTime ?? null,
                  serverVersion: st.data.serverVersion ?? null,
                  agentsLoaded: st.data.agentsLoaded ?? null,
                  tenants: st.data.tenants ?? null,
                  fingerprintSource: st.data.fingerprintSource,
                  authError: null,
              },
              agents: agents.map(toAgentCard),
              scenes,
              categories,
              recommendations,
              cache: cacheState,
              account: me.ok === true
                  ? {
                      name: me.data.name ?? '',
                      plan: me.data.plan ?? '',
                      features: me.data.features ?? {},
                      creditsNote: me.data.creditsNote ?? null,
                  }
                  : null,
          };
      }
      //# sourceMappingURL=live.js.map
      return module.exports;
    })();

    /* ── client/panel-id.js ── */
    var m_panel_id = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PANEL_ID = void 0;
      /**
       * ★ 面板 id —— **唯一出处**。
       * `sidebar.panellist` 的 `id` 与 `main` 的 `key` **必须是同一个值**，
       * 所以抽成常量，避免两处手抄写歪。
       */
      exports.PANEL_ID = 'shanhai-kaipu';
      //# sourceMappingURL=panel-id.js.map
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
      /** 面板里用到的中性色 —— 一律走 DSH 的 CSS 变量，跟随宿主主题 */
      exports.C = {
          border: 'var(--dsh-border, #e5e5e5)',
          text: 'var(--dsh-text, inherit)',
          dim: 'var(--dsh-text-secondary, #8a8a8a)',
          /**
           * 第五级：**知道就行、不必读**的信息 —— 版本号 · 耗时 · 单位 · 计数。
           *
           * ★ 为什么还要再淡一档（"信息量太大、不够清晰"反馈）：
           *   原来 `v3` `0 ms` `3 轮` 这些都走 `dim`，而 `dim` 同时也是**副标题、说明、
           *   分类 intent** 用的色 ⇒ **五类信息同一个亮度**，眼睛没有落点，
           *   一屏读下来像"每句都同等重要"。
           *   ⇒ 把"元信息"独立成第三档，让**主体（名字）→ 说明（dim）→ 元信息（faint）**
           *     拉开三层，是这次"提高清晰度"的落点。（层级靠\*\*色阶\*\*做，不靠字号 ——
           *     字号一动，中文的行高与折行都会跟着变。）
           * ★ 写法：优先取宿主的第三档变量；宿主没定义时用 `color-mix` 把当前色稀释掉
           *   （Chromium 111+ 支持）。不用写死 rgba —— 面板要同时活在浅底与深底两种壳里。
           */
          faint: 'var(--dsh-text-tertiary, color-mix(in srgb, currentColor 45%, transparent))',
          soft: 'var(--dsh-surface-secondary, rgba(127,127,127,0.08))',
          accent: '#3B6FE0',
      };
      exports.FONT = {
          /** 数字/ID 用等宽，避免抖动 */
          mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      };
      /**
       * ★★ 字号阶梯（2026-10-05 统一放大一档）。
       *
       * 为什么要收成一个阶梯、而不是各处随手写数字：
       *   1. 面板是**嵌在宿主里的一个区域**，宿主正文本身在 13~14px；面板里再写 10/11px
       *      就成了"脚注"，第一眼读不到重点 —— 这正是"第一眼不知道怎么用"的一半原因。
       *   2. 分散写死 ⇒ 要整体调大时得满文件找数字，**必然漏几处**，改了半大不小更难看。
       *   3. 判据探针断的是**文案字面量**（"第 2 轮"/"未参与审核面"…），与字号无关 ⇒
       *      改阶梯不会打破任何一条断言。
       *
       * 用 px 而不是 rem/em：面板由宿主注入父子结构，`root` 字号不由我们控制，
       * 用相对单位会让同一份代码在两种壳里差出一档（踩过）。
       */
      exports.FS = {
          /** 标签、时间戳、等宽数字、脚手按钮 */
          tag: 12,
          /** 次要说明、副标题、变更记录明细 */
          small: 13,
          /** 正文：维度行、错误说明、空态说明 */
          base: 14,
          /** 区块标题：轮次、场景名、执行方名 */
          title: 15,
          /** 主标题：面板名、场景大标题 */
          heading: 17,
      };
      /** 行高：中文需要比英文松一点才不挤 */
      exports.LH = {
          tight: 1.6,
          normal: 1.8,
          loose: 2,
      };
      //# sourceMappingURL=theme.js.map
      return module.exports;
    })();

    /* ── client/Intro.js ── */
    var m_Intro = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PanelHead = PanelHead;
      exports.Intro = Intro;
      const jsx_runtime_1 = require("react/jsx-runtime");
      const theme_js_1 = m_theme;
      /* ★ 2026-10-08：`open` / `onJumpToIntro` / `onJumpToShelf` 三个 prop 与
         `HEAD_BTN` 外观常量**已随两个跳转按钮一并删除** ——
         「铺子资料 / 怎么用」成了页签，标题栏只剩"主标 + 数据源 + 切换数据源"。 */
      /**
       * 常驻标题栏：一句话说清这是什么 + 当前数据源 + 切换数据源。
       *
       * ★ 左栏的收起/展开开关**不在这里** —— 它是**分隔线上的把手**（见 PlatformPanel）。
       *   放标题栏的话，用户每次都得把鼠标甩到顶上再甩回来（设计评审指出）。
       */
      function PanelHead({ source, onUseMock, mockActive }) {
          return ((0, jsx_runtime_1.jsxs)("header", { "data-kaipu-head": "1", style: {
                  flex: '0 0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  borderBottom: `1px solid ${theme_js_1.C.border}`,
                  flexWrap: 'wrap',
              }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.heading }, children: "\u5C71\u6D77 \u00B7 \u5F00\u94FA" }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u5F00\u94FA\u5BA1\u8BA1\u7684\u8FD0\u884C\u53F0" }), (0, jsx_runtime_1.jsx)("span", { "data-kaipu-source-label": "1", "data-kaipu-source-mock": mockActive ? '1' : '0', style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: source }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "\u5207\u6362\u6570\u636E\u6E90", "aria-pressed": mockActive, onClick: onUseMock, style: {
                          fontSize: theme_js_1.FS.tag,
                          padding: '3px 10px',
                          border: `1px solid ${theme_js_1.C.border}`,
                          borderRadius: 4,
                          background: mockActive ? theme_js_1.C.soft : 'transparent',
                          color: 'inherit',
                          cursor: 'pointer',
                          font: 'inherit',
                      }, children: mockActive ? '用真服务端' : '用演示数据' })] }));
      }
      /**
       * 「怎么用」页：三步 + 四个词 + 判定图例。**整页即内容**（2026-10-08）。
       *
       * ★★ 为什么不再有「收起」（定稿）
       *   旧版它是右栏顶部一张**默认展开的卡**，必须给个「收起」免得每次挡路。
       *   现在它独占一个页签：**点页签本身就是"我要看用法"** ——
       *   整页即内容，没有"挡不挡路"的问题，也就不需要开合。
       *   ⇒ `onCollapse` prop 与 `data-kaipu-intro-collapse` 锚点一并删除。
       * ★ 锚点 `data-kaipu-intro` 保留（判据认它）。
       *
       * ★★ 2026-10-08 补丁：三步里的「左栏」「右栏」各加前缀「**在操作台的**」。
       *
       *   为什么必须加（不是措辞润色，是**位置指代失去了参照系**）：
       *     「左栏 / 右栏」是**相对位置** —— 相对的是**操作台那一页**。
       *     分页之前「怎么用」长在操作台右栏里，读者**就站在操作台上**，
       *     "左栏"不言自明。分页之后它成了**独立页签**：读者点进来时，
       *     操作台已经不在屏幕上，此时"左栏"指向**屏幕上不存在的东西**。
       *   ⇒ 一句话补参照系：**在操作台的**左栏 / 右栏。
       *
       *   ★ 只加前缀，**不动句子其余部分** —— 三步的动作、右侧的解释一字未改。
       *   ★★ 2026-10-08 · 同一窗口补齐：**第三步也加**（发起人当场追加）——
       *     「拉到最底看「本次结论」」→「**在操作台**拉到最底看「本次结论」」。
       *     理由同前两条（位置指代要带参照系）；它不指某个"栏"，故前缀直接接在动词前。
       *   ★ 判据同步**升级**（不是放松）：老写法 `includes('左栏选一场')` 是**子串** ——
       *     前缀被删它照样绿（恰好在这次改动上"不会失败"）。现改为三条**完整句**断言，
       *     去掉前缀即变红。三条的理由与取舍写在探针里那三条的注释上。
       */
      function Intro() {
          return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-intro": "1", style: {
                  margin: '12px 12px 0',
                  padding: '12px 14px',
                  border: `1px solid ${theme_js_1.C.border}`,
                  borderLeft: `3px solid ${theme_js_1.C.accent}`,
                  background: 'rgba(59,111,224,0.05)',
                  fontSize: theme_js_1.FS.base,
                  lineHeight: theme_js_1.LH.normal,
              }, children: [(0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 10 }, children: (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, flex: '1 1 auto', minWidth: 0 }, children: "\u7B2C\u4E00\u6B21\u7528\uFF1F\u770B\u8FD9\u4E09\u6B65\u5C31\u591F" }) }), (0, jsx_runtime_1.jsxs)("ol", { style: { margin: '8px 0 0', paddingLeft: 20, paddingRight: 4 }, children: [(0, jsx_runtime_1.jsxs)("li", { style: { overflowWrap: 'break-word' }, children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u5728\u64CD\u4F5C\u53F0\u7684\u5DE6\u680F\u9009\u4E00\u573A\u300C\u573A\u666F\u300D" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u3000\u4E00\u573A\u573A\u666F = \u4E00\u6B21\u56FA\u5B9A\u7684\u4F1A\u5546\u6D41\u7A0B\uFF08\u51E0\u4E2A\u5BA1\u6838\u9762\u4E00\u8D77\u5BA1\uFF09\u3002" })] }), (0, jsx_runtime_1.jsxs)("li", { style: { overflowWrap: 'break-word' }, children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u5728\u64CD\u4F5C\u53F0\u7684\u53F3\u680F\u4ECE\u4E0A\u5F80\u4E0B\u770B\u300C\u7B2C N \u8F6E\u300D" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u3000\u6BCF\u8F6E\u91CC\u6BCF\u4E2A\u5BA1\u6838\u9762\u5404\u7ED9\u4E00\u4E2A\u5224\u5B9A\uFF1B\u88AB\u56DE\u7089\u7684\u4F1A\u53E6\u8D77\u4E00\u8F6E\u3002" })] }), (0, jsx_runtime_1.jsxs)("li", { style: { overflowWrap: 'break-word' }, children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u5728\u64CD\u4F5C\u53F0\u62C9\u5230\u6700\u5E95\u770B\u300C\u672C\u6B21\u7ED3\u8BBA\u300D" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u2605\u300C\u672A\u53C2\u4E0E\u5BA1\u6838\u9762\u300D\u4E00\u5B9A\u8981\u770B \u2014\u2014 \u5B83\u8BF4\u660E\u8FD9\u4E00\u8D9F\u5230\u5E95\u6CA1\u5BA1\u54EA\u4E9B\uFF0C\u62A5\u544A\u4E0D\u4F1A\u7ED9\u4F60\"\u5BA1\u5168\u4E86\"\u7684\u9519\u89C9\u3002" })] })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 12, fontSize: theme_js_1.FS.title }, children: "\u56DB\u4E2A\u8BCD\uFF0C\u4E00\u773C\u5BF9\u4E0A" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 6 }, children: [(0, jsx_runtime_1.jsx)(Term, { k: "\u6267\u884C\u65B9", v: "\u5DF2\u63A5\u5165\u7684\u6267\u884C\u65B9\u53CA\u5176\u72B6\u6001\u3002\u7070\u6389\u7684\u662F\u88AB\u6709\u610F\u5173\u6389\u7684\uFF0C\u4E0D\u662F\u574F\u4E86\u3002" }), (0, jsx_runtime_1.jsx)(Term, { k: "\u573A\u666F", v: "\u4E00\u6B21\u4F1A\u5546\u6D41\u7A0B\u7684\u56FA\u5B9A\u914D\u7F6E\uFF1A\u5BA1\u54EA\u51E0\u4E2A\u5BA1\u6838\u9762\u3001\u6700\u591A\u56DE\u7089\u51E0\u8F6E\u3002" }), (0, jsx_runtime_1.jsx)(Term, { k: "\u5BA1\u6838\u9762", v: "\u4E00\u4E2A\u5BA1\u67E5\u89D2\u5EA6\uFF0C\u4F8B\u5982\u300C\u667A\u706F\u300D\u300C\u5320\u706F\u300D\u3002\u5177\u4F53\u662F\u54EA\u51E0\u4E2A\uFF0C\u4EE5\u8FD9\u4E00\u573A\u7684\u914D\u7F6E\u4E3A\u51C6\u3002" }), (0, jsx_runtime_1.jsx)(Term, { k: "\u5F85\u63A5\u5165", v: "\u8FD9\u4E2A\u5BA1\u6838\u9762\u8FD8\u6CA1\u6709\u6267\u884C\u65B9\u3002\u8FD9\u4E0D\u662F\u6545\u969C \u2014\u2014 \u573A\u5730\u4E0D\u5185\u7F6E\u4EFB\u4F55\u300C\u5FC5\u987B\u6709\u7684\u300D\u6267\u884C\u65B9\u3002" })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 12, fontSize: theme_js_1.FS.title }, children: "\u5224\u5B9A\u957F\u4EC0\u4E48\u6837" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }, children: [(0, jsx_runtime_1.jsx)(Legend, { tone: theme_js_1.TONE_BG.pass, word: "\u2705\u901A\u8FC7", note: "\u76F4\u63A5\u8FC7" }), (0, jsx_runtime_1.jsx)(Legend, { tone: theme_js_1.TONE_BG.conditional, word: "\u26A1\u6709\u6761\u4EF6", note: "\u8865\u4EF6\u540E\u53EF\u8FC7\uFF0C\u901A\u5E38\u4F1A\u89E6\u53D1\u56DE\u7089" }), (0, jsx_runtime_1.jsx)(Legend, { tone: theme_js_1.TONE_BG.reject, word: "\u274C\u9A73\u56DE", note: "\u8FD9\u4E00\u8F6E\u7684\u7ED3\u8BBA\u4E0D\u901A\u8FC7" }), (0, jsx_runtime_1.jsx)(Legend, { tone: theme_js_1.TONE_BG.refuse, word: "\u26D4\u62D2\u6536", note: "\u8FDB\u4EF6\u524D\u5C31\u9000\u56DE\uFF0C\u4E0D\u6536\u8D39" })] })] }));
      }
      function Term({ k, v }) {
          return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 10, marginTop: 3 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { flex: '0 0 auto', width: 62, color: theme_js_1.C.text }, children: k }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: v })] }));
      }
      /** 图例一律**实底徽标**，与运行视图里的判定徽标同色 —— 让人把颜色和词对上。 */
      function Legend({ tone, word, note }) {
          return ((0, jsx_runtime_1.jsxs)("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                          display: 'inline-block',
                          padding: '1px 7px',
                          borderRadius: 3,
                          background: tone,
                          color: '#fff',
                          fontSize: theme_js_1.FS.tag,
                          lineHeight: '18px',
                          whiteSpace: 'nowrap',
                      }, children: word }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, fontSize: theme_js_1.FS.small }, children: note })] }));
      }
      //# sourceMappingURL=Intro.js.map
      return module.exports;
    })();

    /* ── client/LeftPane.js ── */
    var m_LeftPane = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SceneCurrent = SceneCurrent;
      exports.groupScenes = groupScenes;
      exports.LeftPane = LeftPane;
      const jsx_runtime_1 = require("react/jsx-runtime");
      /**
       * 山海·开铺 · 场地插件 · 左栏 = **总台**
       * =====================================================================
       * 三段：**执行方**（Agent 卡片）+ **场景**（按分类分组）+ **推荐**。
       *
       * ★ 两条"用户可见面"的硬要求（都在这里落）：
       *   1. `AgentCard.status` ⇒ **三态**（2026-10-05 修：原以为两态）：
       *        · `disabled` **灰显「已停用」且不许点** —— 契约 §3.1 写明要返回全部（含 disabled）
       *          就是为了让人**看见被关掉了**，看不见的话，用户会以为是自己出错。
       *        · `pending`  **显「待接入」、不灰显** —— 契约 v1.3 §23.4 新增：占地未接入（正常态）。
       *          ★ 它**不是** `disabled`：前者"还没人接"、后者"有人关掉了"，
       *          下一步动作完全不同（去接入 vs 去问为什么）。**混了就是编事实。**
       *   2. `SceneLamp.agentId === null` ⇒ 该维度**待接入**。这里在场景卡片上显示
       *      「待接入 N」，让"这场戏缺人"在**进场景之前**就看得见。
       *
       * ★★ 契约变更 #17（本轮新消费）：场景**按分类分组** + 顶部**推荐位**。
       *   目的：**让客户先认出场合，而不是先学术语**。
       *   三条纪律（他给的，逐条落在这里）：
       *     · `when` = 「**适合什么场合**」⇒ 界面上**禁止**出现「热门 / 多数人 /
       *       大家都在用」类措辞（**没有统计依据，写了就是编**）；
       *     · **空分类不出** ⇒ 按响应渲染，不自己判空；
       *     · **未归类不藏** ⇒ 有场景却没归类，**单列「未归类」如实展示**。
       */
      const react_1 = require("react");
      const theme_js_1 = m_theme;
      /**
       * ★★ 左栏**卡片语言**（2026-10-18 · 发起人：「这个卡片密度合适…其他的也按照这个思路走」）。
       *
       * 一处定义、四处引用（执行方卡 / 场景卡 / 推荐卡 / 空态卡）——
       * 卡片化最容易翻车的地方不是"每张卡好不好看"，而是**几张卡的圆角/缩进/内边距各差 1px**，
       * 一排下来就是"歪"。所以宽度、缩进、内边距、描边、圆角全部收在这里，一个数都不外泄。
       *
       * ★ `width: calc(100% - 20px)` + `margin: 0 10px` + `boxSizing: border-box`
       *   ⇒ 卡片两侧各留 10px，总宽恒等于栏宽（260px 档不会顶出横向滚动条）。
       * ★ 圆角 10：与参照件的卡片同档；再大就变成"气泡"，在 260px 里显胖。
       */
      const CARD = {
          boxSizing: 'border-box',
          width: 'calc(100% - 20px)',
          margin: '6px 10px 0',
          padding: '8px 11px',
          border: `1px solid ${theme_js_1.C.border}`,
          borderRadius: 10,
      };
      /**
       * 「当前是哪一场」—— 收起态下的**唯一**坐标（2026-10-08 · 拍板 §一 加的那条）。
       *
       * ★★ 原文：「选完自动收起之后，当前选中项要留在折叠条上可见。不能选完就消失。」
       *   ⇒ 这件事在**两个地方**都要成立（这正是本条要求"宽屏也一致"的落法）：
       *     · 窄屏 ⇒ 折叠条的 `summary`（收起时只看得到这一行）
       *     · 宽屏 ⇒ 左栏「场景」小节标题行（分类可能被折叠，光靠行高亮不够稳）
       *
       * ★★ 两处**共用同一个锚点** `data-kaipu-scene-current` —— 这次是**对的**，
       *   与 `where` 那两条锚点为什么必须分开并不矛盾：
       *     · `data-kaipu-left` / `data-kaipu-scene-picker-body` 争的是"**左栏在不在**"
       *       （反向断言要断"窄屏下它不在"）⇒ 共用必假。
       *     · 本锚点争的是"**当前所选有没有被显示出来**"，而两处**永远不会同时在页面上**
       *       （窄屏不渲染左栏、宽屏不渲染折叠条）⇒ 任何宽度下它恰好出现**一次**，
       *       判据只需读"那一个"，反而更干净。
       *   ★ 这条区别（"同时存在与否"）才是判断"能不能共用锚点"的依据，
       *     不是"锚点名字看起来像不像"。
       */
      function SceneCurrent({ scenes, selected, }) {
          const current = scenes.find((s) => s.scene === selected) ?? null;
          return ((0, jsx_runtime_1.jsx)("span", { "data-kaipu-scene-current": "1", style: { color: theme_js_1.C.text }, children: current === null ? '（未选）' : current.label }));
      }
      /**
       * 分组（**纯函数** —— 便于判据直接断言分组结果，而不只看渲染出来的样子）。
       *
       * ★★ 权威顺序（2026-10-05 联调实测后定的）：**`categories[].scenes` 优先**，
       *   其次才是单场景自述的 `scene.category`，两者都没有 ⇒ 未归类。
       *
       *   为什么不能只看 `scene.category`（实测反例）：
       *     真服务端 `GET /scenes` 里，`multi-dim-review` **一边被列入
       *     `categories[standard_review].scenes`（count=1），一边自己的 `category` 是空串**。
       *     ⇒ 只看 `scene.category` 的后果：那个场景被塞进「未归类」，而「标准审查」
       *       这一组因为**组内空**被下面的 `filter` 滤掉 ⇒ **整组消失**。
       *   ⇒ 规则：**冗余字段打架时，取信息量大的那个，并保证"内容不丢"**。
       *     （这条已作为差异单提请对方明确权威字段；在那之前，本读法两种形态都成立。）
       */
      function groupScenes(scenes, categories) {
          // ① 显式成员表：scene → 分类 key（后写覆盖先写，但正常不会有重复）
          const declared = new Map();
          for (const c of categories)
              for (const s of c.scenes ?? [])
                  declared.set(s, c.key);
          const groups = categories.map((c) => ({ key: c.key, label: c.label, intent: c.intent, scenes: [] }));
          const byKey = new Map(groups.map((g) => [g.key, g]));
          const unclassified = [];
          for (const s of scenes) {
              const key = declared.get(s.scene) ?? (s.category ?? '');
              const g = key === '' ? undefined : byKey.get(key);
              if (g === undefined)
                  unclassified.push(s);
              else
                  g.scenes.push(s);
          }
          return { groups: groups.filter((g) => g.scenes.length > 0), unclassified };
      }
      function LeftPane({ agents, scenes, categories, recommendations, selected, onSelect, where = 'left', sceneFirst = false, }) {
          const { groups, unclassified } = groupScenes(scenes, categories);
          const pendingAgents = agents.filter((agent) => agent.status === 'pending').length;
          const disabledAgents = agents.filter((agent) => agent.status === 'disabled').length;
          /**
           * ── 三块各自成块，再按 `sceneFirst` 决定顺序（2026-10-08 · 107「方案 D」）──
           * ★ 为什么拆成变量而不是写三遍 JSX：写三遍就是**三份内容**，改一处必漏另一处。
           *   这里拆的是**顺序与容器**，内容只有一份。
           */
          const agentsBlock = ((0, jsx_runtime_1.jsx)(PaneBlock, { id: "agents", 
              // ★★ 双向对齐：界面加括注，对齐介绍「Agent 目录」。
              //   显示文案带括注，判据锚点仍用 `sectValue="执行方"`（解耦，探针零改）。
              title: "\u6267\u884C\u65B9\uFF08Agent \u76EE\u5F55\uFF09", sectValue: "\u6267\u884C\u65B9", icon: "\uD83D\uDCC2", hint: "\u5DF2\u63A5\u5165\u7684\u6267\u884C\u65B9\u53CA\u5176\u72B6\u6001\u3002\u6807\u300C\u5F85\u63A5\u5165\u300D\u7684\u8FD8\u6CA1\u4EBA\u63A5\uFF0C\u7070\u6389\u7684\u662F\u88AB\u5173\u6389\u4E86\u3002", 
              // ★ 收起态也要能一眼看出"有几家"（同收起点写着当前是哪一场的口径）
              aside: (0, jsx_runtime_1.jsxs)("span", { "data-kaipu-agent-summary": "1", style: { color: theme_js_1.C.dim, overflowWrap: 'anywhere' }, children: ["\uFF08", agents.length, pendingAgents > 0 && ` · ${pendingAgents} 待接入`, disabledAgents > 0 && ` · ${disabledAgents} 已停用`, agents.length === 0 && ' · 待接入', "\uFF09"] }), 
              // 初始收起让位于场景；PaneBlock 的用户展开状态不随数据刷新重置。
              defaultOpen: false, children: agents.length === 0 ? (
              /**
               * ★★ 空态也走卡片语言（2026-10-18）：**虚线**描边 ——
               *   同样是"一块有边界的东西"，但虚线说的是"这里还空着"，
               *   与实线卡片的"这里坐着一个"形成对照。比一行裸文字更能说明"该往这儿放东西"。
               */
              (0, jsx_runtime_1.jsx)("div", { "data-kaipu-agent-empty": "1", style: {
                      ...CARD,
                      border: `1px dashed ${theme_js_1.C.border}`,
                      background: 'transparent',
                      fontSize: theme_js_1.FS.tag,
                      color: theme_js_1.C.dim,
                      lineHeight: 1.6,
                  }, children: "\u672C\u94FA\u5C1A\u672A\u63A5\u5165\u4EFB\u4F55\u6267\u884C\u65B9\uFF08\u5F85\u63A5\u5165\uFF09\u2014\u2014 \u573A\u5730\u7167\u5E38\u53EF\u7528\uFF0C\u63A5\u5165\u540E\u6B64\u5904\u4F1A\u5217\u51FA\u5404 Agent \u53CA\u5176\u72B6\u6001\u3002" })) : (agents.map((a) => (0, jsx_runtime_1.jsx)(AgentRow, { agent: a }, a.id))) }));
          /* ★ 推荐位：**说「适合什么场合」，不说「热门」** —— 后者需要统计依据 */
          const recommendBlock = recommendations.length > 0 && ((0, jsx_runtime_1.jsx)(PaneBlock, { id: "recommend", title: "\u8BE5\u600E\u4E48\u9009", icon: "\uD83D\uDCC2", hint: "\u6309\u573A\u5408\u63D0\u4F9B\u9009\u62E9\u53C2\u8003\u3002\u8BF7\u6839\u636E\u9002\u7528\u8BF4\u660E\uFF0C\u5728\u300C\u573A\u666F\u300D\u4E2D\u9009\u62E9\uFF1B\u63A8\u8350\u540D\u79F0\u4E0D\u4E00\u5B9A\u4E0E\u573A\u666F\u540C\u540D\u3002", aside: (0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.dim }, children: ["\uFF08", recommendations.length, "\uFF09"] }), defaultOpen: false, children: (0, jsx_runtime_1.jsx)("div", { "data-kaipu-recommend": "1", children: recommendations.map((r) => ((0, jsx_runtime_1.jsxs)("div", { style: CARD, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, fontWeight: 600 }, children: r.label }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 2, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: 1.6 }, children: ["\u9002\u5408\uFF1A", r.when] })] }, r.key))) }) }));
          const scenesBlock = ((0, jsx_runtime_1.jsxs)(PaneBlock, { id: "scenes", title: "\u573A\u666F", icon: "\uD83D\uDCC2", hint: "\u9009\u4E00\u573A\uFF0C\u53F3\u4FA7\u770B\u5B83\u7684\u8FD0\u884C\u4E0E\u7ED3\u8BBA\u3002", 
              /**
               * ★★ 宽屏：在「场景」标题行显示**当前是哪一场**（§一"确保宽屏也一致"）。
               *   ★ 为什么仅 `where === 'left'`：窄屏那份由折叠条 `summary` 显示
               *     （`SceneCurrent` 的注释里写了"两处永远不会同时出现"）——
               *     展开区里再显示一次就是同一句话在同一屏出现两遍。
               */
              aside: where === 'left' ? (0, jsx_runtime_1.jsx)(SceneCurrent, { scenes: scenes, selected: selected }) : undefined, 
              /**
               * ★★ **场景块默认展开**（`107` 方案 D）——
               *   它是左栏的本职（"选一场"）；另两块收起是为了**把空间让给它**。
               */
              defaultOpen: true, children: [groups.map((g, gi) => ((0, jsx_runtime_1.jsx)(CategoryGroup, { group: g, first: gi === 0, selected: selected, onSelect: onSelect }, g.key))), unclassified.length > 0 && (
                  /**
                   * ★ 与上面分类**同款组名形态**（2026-10-18 统一）：名称 + 数量 pill。
                   *   `borderTop` 保留 —— 它隔的是"分类区 vs 非分类区"（语义边界），不是同类兄弟。
                   */
                  (0, jsx_runtime_1.jsxs)("div", { "data-kaipu-category": "__unclassified__", style: { borderTop: `1px solid ${theme_js_1.C.border}`, marginTop: 8, paddingTop: 2 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { padding: '6px 12px 2px' }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', columnGap: 6 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, fontWeight: 600, color: theme_js_1.C.text }, children: "\u672A\u5F52\u7C7B" }), (0, jsx_runtime_1.jsx)("span", { style: {
                                              fontSize: theme_js_1.FS.tag,
                                              lineHeight: '16px',
                                              padding: '0 6px',
                                              borderRadius: 999,
                                              background: theme_js_1.C.soft,
                                              color: theme_js_1.C.dim,
                                              flex: '0 0 auto',
                                          }, children: unclassified.length }), (0, jsx_runtime_1.jsx)("span", { title: "\u5951\u7EA6 #17\u300C\u672A\u5F52\u7C7B\u4E0D\u85CF\u300D\uFF1A\u8FD8\u6CA1\u5F52\u5230\u67D0\u4E2A\u573A\u5408\u7684\u573A\u666F\uFF0C\u5982\u5B9E\u5217\u51FA\uFF0C\u4E0D\u585E\u8FDB\u522B\u7684\u7EC4\u3002", "aria-hidden": "true", style: { marginLeft: 'auto', flex: '0 0 auto', color: theme_js_1.C.faint, cursor: 'help' }, children: "\u24D8" })] }) }), unclassified.map((s) => ((0, jsx_runtime_1.jsx)(SceneRow, { scene: s, active: s.scene === selected, onSelect: onSelect }, s.scene)))] }))] }));
          return (
          // ★ `data-kaipu-left` = 左栏的**判据锚点**。
          //   为什么不靠文案断言（2026-10-05 修 `panel-probe` 时立的教训）：
          //   探针原来找的是字符串「场景 / 运行记录」—— 那是**旧版面板的文案**，
          //   面板改版后判据**却一直没人发现**（它只是在报"左栏未渲染"，
          //   看起来像界面坏了，实际是判据自己过期了）。
          //   ⇒ 锚在**结构**上，文案怎么改都不会误报。
          //   ★★ 窄屏那份（`where='picker'`）**不挂这个锚点**，改挂
          //      `data-kaipu-scene-picker-body` —— 理由见 Props 里那一段（判据正确性）。
          (0, jsx_runtime_1.jsx)("div", { ...(where === 'picker' ? { 'data-kaipu-scene-picker-body': '1' } : { 'data-kaipu-left': '1' }), style: { padding: '12px 0 18px' }, children: sceneFirst ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [scenesBlock, agentsBlock, recommendBlock] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [agentsBlock, recommendBlock, scenesBlock] })) }));
      }
      /**
       * ★★ **三块折叠容器**（2026-10-08 · `107` · 方案 D）。
       *
       * ══════════════════════════════════════════════════════════════════
       * 它解决什么（实测支撑，不是观感）
       * ══════════════════════════════════════════════════════════════════
       *   左栏三块 = 执行方(235) + 该怎么选(111) + 场景(299+分类)。
       *   「想看全部场景」（分类全展开）时内容高 **909px**，而常见窗高下可用只有 649~869
       *   ⇒ **任何常见窗口都要滚**（连 1000 高的窗口也要滚 40px）。
       *   把参考两块收成标题行 ⇒ 内容高 **618px** ⇒ 窗高 ≥740 就不用滚。
       *
       * ★★ 为什么"可多开"而不是"互斥单开"（同一批实测）：
       *   · 互斥：点开一块 ⇒ 另一块**被收走**，场景标题还**上移 112px**（想回头看要重新点回来）
       *   · 多开：点开一块 ⇒ 另一块只是**往下挪**，**内容仍在原位**
       *   ⇒ 收益完全相同（都拿到 618px），但互斥多付"位置跳动 + 内容消失"。
       *
       * ★★ 三条实现要点（每条都对着一处会出事的场景）：
       *   ① **顺序：块在前、分类在后** —— 场景块里**还有一层**分类折叠。
       *      若分类默认收起，手风琴下"看场景"要**两次点击**（先点块、再点分类）。
       *      本方案把分类改成**默认展开**（见下面 `CategoryGroup`），首屏 0 次点击就能选场。
       *   ② **`open` 走 state（受控）** ，但**只在用户动作里改**（`onToggle`）——
       *      这样"数据刷新不会把它弹回去"这条性质**仍然成立**（state 不受数据变化影响）。
       *      ★ 与 `103` 窄屏折叠条同款做法。
       *   ③ **`data-kaipu-sect` 锚点不动**：标题仍是 `SectionTitle`，只是被搬进 `<summary>`。
       *      判据认的是这个名字 ⇒ 换父级不改锚点名（本仓纪律：锚点锚结构，不锚层级）。
       */
      function PaneBlock({ id, title, hint, icon, aside, defaultOpen, divider = false, sectValue, children, }) {
          const [open, setOpen] = (0, react_1.useState)(defaultOpen);
          return ((0, jsx_runtime_1.jsxs)("details", { "data-kaipu-block": id, open: open, 
              // ★ 只在用户动作里改 state（见上面要点 ②）；程序化赋值也会到这里，但值相同 ⇒ 无副作用
              onToggle: (e) => setOpen(e.currentTarget.open), style: {
                  padding: 0,
                  ...(divider ? { borderTop: `1px solid ${theme_js_1.C.border}` } : {}),
              }, children: [(0, jsx_runtime_1.jsx)("summary", { style: { listStyle: 'none', cursor: 'pointer' }, title: open ? undefined : hint, children: (0, jsx_runtime_1.jsx)(SectionTitle, { icon: icon, hint: hint, hintVisible: open, aside: aside, chevron: open ? '▾' : '▸', sectValue: sectValue, children: title }) }), (0, jsx_runtime_1.jsx)("div", { style: { paddingBottom: 6 }, children: children })] }));
      }
      /**
       * **场景分类一组**（2026-10-08 · `107` 从 `LeftPane` 里抽出来 —— 因为要挂 hook）。
       *
       * ★★ 为什么抽组件：它需要 `ref` + 挂载时设一次 `open`（见下），而 hook **不能写在 map 循环里**。
       *
       * ══════════════════════════════════════════════════════════════════
       * ★★ 默认**展开**（`107` 改 · 原来是默认收起）
       * ══════════════════════════════════════════════════════════════════
       *   实测（107）：3 个分类默认收起 ⇒ **5 个场景行里只有 2 个可见**
       *   ⇒ 左栏的本职是"选一场"，而"要选的那些场"**一半藏在折叠里**，要先点分类。
       *   ★ 空间本来就够：场景块可用 618px（`107` 方案 D 下），放得下"分类全展开"的内容。
       *   ⇒ 与 `107` 的三块折叠配合：**外层三块可折（参考收起）＋ 内层分类默认展开**，
       *     首屏 0 次点击就能直接选场。
       *
       * ★★ 为什么用 `ref` + **空依赖** effect 设 `open`（而不是写 `<details open>`）：
       *   写 `open` 属性会被 React 当**受控属性**、**每次渲染都设回去** ⇒
       *   用户手动折上之后，下一个数据刷新就把它弹开（本仓 `RoundBlock` 那条注释记过同款坑）。
       *   空依赖 effect ⇒ 只在**挂载那一瞬**设一次，之后交给浏览器；
       *   `key` 稳定（`g.key`）⇒ 数据刷新复用同一节点 ⇒ **用户折上的状态留得住**。
       *
       * ★ 分类**可折叠**这件事本身保留（它是"一页预览"的能力，不是缺陷）：
       *   折起来仍能看到 分类名 · `intent`（客户视角的一句话）· 数量。
       */
      function CategoryGroup({ group, first, selected, onSelect, }) {
          const ref = (0, react_1.useRef)(null);
          /**
           * ★★ 只为**画折叠符号**而存在（2026-10-18 卡片化）。
           *   ⚠️ 它**不参与** `open` 属性 —— `<details>` 仍是"浏览器自己管开合"，
           *   这一位只跟着 `onToggle` 记一下当前是开着还是合着，好把 `▾` 画成 `▸`。
           *   若拿它去写 `open={open}`，就退化成受控属性 ⇒ 用户手动折上后，
           *   下一次数据刷新会被 React 设回去（本仓 `RoundBlock` 那条注释记过同款坑）。
           */
          const [open, setOpen] = (0, react_1.useState)(true);
          (0, react_1.useEffect)(() => {
              const el = ref.current;
              if (el !== null)
                  el.open = true;
          }, []);
          return (
          /**
           * ★★ V3（2026-10-07 发起人指出"日常自查与标准审查之间多了一根横线"）：
           *   **撤掉分类之间的分隔线，改用留白。**
           *
           * 为什么撤（实测读数，不是感觉）：
           *   真服务端数据下「场景」区只有 **2 个分类**、每个 1 个场景
           *   ⇒ 这一区里同时存在 **3 条横线**（小节标题那条 + 分类间那条 + 未归类那条），
           *     而横线要隔开的内容总共才 4 行 —— **线比内容还密**。
           *   ⇒ 分隔线是"组多到肉眼分不开"时才需要的工具；这里组少，留白足够。
           *   ★ 只撤**分类之间**那条：`未归类` 上方那条**保留** ——
           *     两者性质不同：前者隔"同类兄弟"，后者隔"分类区 vs 非分类区"（是个语义边界）。
           *
           * ★★★ 2026-10-18 卡片化后**留白加大到 8px**（原 4px）：
           *   场景行变成卡片后，卡片自身有描边 ⇒ 组与组之间若还只有 4px，
           *   上一组的最后一张卡与下一组的组名会"粘"在一起，看着像同一组。
           */
          (0, jsx_runtime_1.jsxs)("details", { ref: ref, "data-kaipu-category": group.key, onToggle: (e) => setOpen(e.currentTarget.open), style: { padding: 0, ...(first ? {} : { marginTop: 8 }) }, children: [(0, jsx_runtime_1.jsx)("summary", { style: { listStyle: 'none', cursor: 'pointer', padding: '6px 12px 2px' }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', columnGap: 6, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, fontWeight: 600, color: theme_js_1.C.text }, children: group.label }), (0, jsx_runtime_1.jsx)("span", { style: {
                                      fontSize: theme_js_1.FS.tag,
                                      lineHeight: '16px',
                                      padding: '0 6px',
                                      borderRadius: 999,
                                      background: theme_js_1.C.soft,
                                      color: theme_js_1.C.dim,
                                      flex: '0 0 auto',
                                  }, children: group.scenes.length }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { marginLeft: 'auto', fontSize: 10, color: theme_js_1.C.faint, flex: '0 0 auto' }, children: open ? '▾' : '▸' })] }) }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, padding: '0 12px 2px', lineHeight: 1.6 }, children: group.intent }), group.scenes.map((s) => ((0, jsx_runtime_1.jsx)(SceneRow, { scene: s, active: s.scene === selected, onSelect: onSelect }, s.scene)))] }));
      }
      /**
       * ★ 区块标题带一句人话副标题。
       *   原因：左栏原本只有「执行方」「场景」两个词 ——
       *   对第一次打开面板的人来说，这是两个**没有谓语的标签**，不知道点了会发生什么。
       *
       * ★ `divider`（"左栏不如右栏清晰"反馈后加）：
       *   给**大区之间**画一条上分隔线。右栏是靠每个轮次块的 `borderTop` 分开的，
       *   左栏原来只有 padding —— 字号放大之后，**光靠留白已经分不出"这是新的一区"**。
       *   第一个区（执行方）不画线：面板顶部本来就有留白，再画一条会显脏。
       */
      function SectionTitle({ children, hint, divider = false, icon, aside, chevron, 
      /**
       * ★★ 对齐 ADR「文案改，锚点不改」：锚点值**解耦**自显示文案。
       *   显示 `children` 可带括注（如「执行方（Agent 目录）」），而判据锚点
       *   `data-kaipu-sect` 仍用 `sectValue`（如「执行方」）—— 改界面文案时探针零改。
       *   不传则回退到 `children`（其余两块沿用旧锚点值，行为不变）。
       */
      sectValue, hintVisible = true, }) {
          return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-sect": sectValue ?? children, style: {
                  padding: '12px 14px 6px',
                  ...(divider ? { borderTop: `1px solid ${theme_js_1.C.border}` } : {}),
              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                          display: 'flex',
                          alignItems: 'baseline',
                          columnGap: 8,
                          /**
                           * ★★★ 标题行**放不下就换行**（2026-10-17 · 发起人反馈「执行方（Agent 目录）后面换行」）。
                           *
                           * ── 改前的实测（260px 最窄档）──────────────────────────────────
                           *   标题行实测高 **35px**（340px 档只有 19px）——
                           *   因为 flex **不换行**，标题被压缩到 138px 宽、**自己内部折成两行**，
                           *   而右侧摘要 `（5 · 1 待接入 · 1 已停用）` 还挤在同一行旁边。
                           *   ⇒ 一行里同时出现"标题折行"和"摘要并列"两种形态，看着就乱。
                           *
                           * ── 修法：自适应，不是硬换行 ────────────────────────────────────
                           *   加 `flexWrap` + `rowGap`：宽档（340/420）放得下 ⇒ 仍是**一行**（不白占高度）；
                           *   窄档（260）放不下 ⇒ **摘要整块落到第二行**，标题不再被压缩折行。
                           *   ★ 为什么不做成"永远两行"：那会让 340/420 档白白多占 19px，
                           *     而 107 方案 D 的初衷正是**把高度让给场景**。能省就省。
                           */
                          flexWrap: 'wrap',
                          rowGap: 2,
                          fontSize: theme_js_1.FS.small,
                          letterSpacing: 0.8,
                          color: theme_js_1.C.text,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                      }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { minWidth: 0 }, children: [icon !== undefined && ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { marginRight: 5, letterSpacing: 0 }, children: icon })), children] }), aside !== undefined && ((0, jsx_runtime_1.jsx)("span", { style: { minWidth: 0, fontSize: theme_js_1.FS.small, fontWeight: 400, letterSpacing: 0, overflowWrap: 'break-word' }, children: aside })), chevron !== undefined && ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { marginLeft: 'auto', color: theme_js_1.C.faint, letterSpacing: 0, flex: '0 0 auto' }, children: chevron }))] }), hintVisible && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 2, lineHeight: 1.6 }, children: hint }))] }));
      }
      /**
       * 执行方一行 → **一张卡片**（2026-10-18 · 发起人点名参照外部卡片式工作台：「卡片式最清晰简洁」）。
       *
       * ══════════════════════════════════════════════════════════════════
       * ★★ 参照件：一张外部卡片式工作台的 `expert-card`（参照件来源见内部施工记录 003 期）──
       *   白底（透明，跟随宿主）+ 1px 圆角边框 + 头行（色块 logo + 名称 + 右上角标签）
       *   + 一行元信息。它的「清晰」来自三件事，逐件搬过来：
       *     ① **每条信息有自己的边界**（卡片框）—— 不再是一列无边界的行，扫读有落点；
       *     ② **头行三件套**（logo 块 / 名称 / 状态标签）—— 状态从"行尾小字"变成
       *        右上角**徽标**，一眼可辨；
       *     ③ **信息分层不变**：名称（主体）> role（判断依据，留在外面）> 其余（悬停）。
       *
       * ★★ 判据锚点一个没动（判据全依赖它们）：
       *   `data-kaipu-agent` / `data-kaipu-agent-status` 仍在**外层根节点**上；
       *   `data-kaipu-agent-state` 仍在**那个只装状态文本的节点**上 ——
       *   它必须继续单独占一格：占位条目的**名字本身就是「(待接入)」**，
       *   断"行内含待接入"会被名字蒙对（2026-10-05 写这条判据时当场发现的坑）。
       *
       * ★ 可见文本纪律（探针 ⑧ 段）：卡片可见文本 ≤30 字符、role（灯名）必须可见、
       *   三态状态必须可见 —— 卡片化**只换容器，不换信息量**；skillSummary/能力/版本
       *   仍然全部收进 `title` 悬停（信息不丢，判据照断）。
       */
      function AgentRow({ agent }) {
          /**
           * ★★ 三态，**不是两态**（2026-10-05 真服务端实测后修）。
           *
           *   · `enabled` 已接入可用
           *   · `pending` **占地未接入** —— 契约 v1.3 §23.4 新增的合法值
           *   · `disabled` 被有意关掉
           *
           * ★ 为什么必须分开：`pending` 与 `disabled` 是**两件不同的事实** ——
           *   前者"这个位子还没人接"（正常态、下一步是去接入），
           *   后者"有人把它关掉了"（下一步是去问为什么）。
           *   把 `pending` 显示成「已停用」**不是保守，是编了一个不存在的决定**。
           */
          const off = agent.status === 'disabled';
          const pend = agent.status === 'pending';
          // 悬停提示：把收起来的东西**一字不改**地放进去（不概括、不缩写 —— 概括就等于改内容）
          // ★ 占位条目**没有 `skillSummary`**（实测：`role="综合维度"` · `caps=[]`）
          //   ⇒ 空的时候不要留一个光秃秃的"｜"，那看着像加载失败。
          const desc = agent.skillSummary.trim() === '' ? agent.role : `${agent.role}｜${agent.skillSummary}`;
          const tip = [
              desc,
              agent.capabilities.length > 0 ? `能力：${agent.capabilities.join(' · ')}` : '',
              off
                  ? `版本 v${agent.version}｜已停用`
                  : pend
                      ? '占地未接入 —— 这个执行位已备好，但还没有 Agent 接进来'
                      : `版本 v${agent.version}`,
          ]
              .filter((x) => x !== '')
              .join('\n');
          const statusText = off ? '已停用' : pend ? '待接入' : `v${agent.version}`;
          const ariaText = off
              ? `${agent.name}（已停用）`
              : pend
                  ? `${agent.name}（此执行位待接入 Agent）`
                  : `${agent.name}，${agent.role}，v${agent.version}`;
          return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-agent": agent.id, "data-kaipu-agent-status": agent.status, title: tip, "aria-label": ariaText, style: {
                  ...CARD,
                  // ★ 只有 `disabled` 淡化：`pending` 是**正常态**（等接入），不该看起来像"坏了"
                  opacity: off ? 0.55 : 1,
                  cursor: 'help',
              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: {
                                  flex: '0 0 22px',
                                  width: 22,
                                  height: 22,
                                  borderRadius: 7,
                                  background: theme_js_1.C.soft,
                                  color: off ? theme_js_1.C.faint : '#A66A12',
                                  fontSize: 11,
                                  fontWeight: 600,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                              }, children: agent.name.slice(0, 1) }), (0, jsx_runtime_1.jsx)("span", { style: {
                                  fontSize: theme_js_1.FS.title,
                                  fontWeight: 600,
                                  color: off ? theme_js_1.C.dim : theme_js_1.C.text,
                                  // 长名字允许在任意处断（窄档下不撑破），但不许把徽标挤走
                                  minWidth: 0,
                                  overflowWrap: 'anywhere',
                              }, children: agent.name }), (0, jsx_runtime_1.jsx)("span", { "data-kaipu-agent-state": "1", style: {
                                  marginLeft: 'auto',
                                  flex: '0 0 auto',
                                  fontSize: theme_js_1.FS.tag,
                                  lineHeight: '16px',
                                  padding: '1px 7px',
                                  borderRadius: 999,
                                  background: theme_js_1.C.soft,
                                  color: pend ? '#b45309' : theme_js_1.C.dim,
                              }, children: statusText })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 2, paddingLeft: 30, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: 1.55 }, children: agent.role })] }));
      }
      /**
       * 场景一行 → **一张可选卡片**（2026-10-18 · 与执行方卡片同批改造）。
       *
       * ★★ 参照件仍是那张外部卡片式工作台：卡片 = 圆角边框 + 内边距，选中态**整卡高亮**。
       *   改前是"左边 2px 色线 + 浅底"的行形态 —— 行与行之间没有边界，
       *   与执行方区块排在一起时"两列文字墙"分不出谁是谁；卡片化后每场有自己的框。
       *
       * ★ 选中色用**暖金**（#C8881F 系，与「点亮第一盏灯」/ 主行动暖金同一色系），
       *   不用导航蓝 `C.accent` —— 选场是这场合的**核心动作**，不是页签导航；
       *   且灯栏夜话改版已把"品牌暖金=灯火"钉死，选中一张卡 = "点亮这一场"，语义顺的。
       *
       * ★★ 结构纪律（探针 ①.1 换场判据依赖）：仍是 `<button>` + `aria-pressed` +
       *   `aria-label`（场景名）—— 探针靠 `[data-kaipu-left] button[aria-pressed]`
       *   找到所有场景并逐个点击，形态怎么改这三样不能丢。
       */
      function SceneRow({ scene, active, onSelect, }) {
          // ★ 待接入计数 = `agentId === null` 的维度数 —— 进场景**之前**就能看见"这场戏缺人"
          const pending = scene.lamps.filter((l) => l.agentId === null).length;
          return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": scene.label, "aria-pressed": active, onClick: () => onSelect(scene.scene), style: {
                  ...CARD,
                  // ★ 按钮默认居中：必须显式左对齐（否则卡片里每行文字都会居中）
                  display: 'block',
                  textAlign: 'left',
                  // ★ 选中态：品牌暖金边 + 极浅暖底（与 Agent 卡的灰边中性态区分开）
                  border: `1px solid ${active ? '#C8881F' : theme_js_1.C.border}`,
                  background: active ? 'rgba(200,136,31,0.08)' : 'transparent',
                  color: theme_js_1.C.text,
                  cursor: 'pointer',
                  font: 'inherit',
              }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, fontWeight: active ? 600 : 500 }, children: scene.label }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 10, marginTop: 3, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsxs)(Chip, { children: [scene.lamps.length, " \u4E2A\u5BA1\u6838\u9762"] }), pending > 0 && (0, jsx_runtime_1.jsxs)(Chip, { tone: "#b45309", children: ["\u5F85\u63A5\u5165 ", pending] }), scene.requiresExternal && (0, jsx_runtime_1.jsx)(Chip, { tone: "#6d28d9", children: "\u9700\u9884\u7EA6" })] })] }));
      }
      function Chip({ children, tone }) {
          return (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: tone ?? theme_js_1.C.dim }, children: children });
      }
      //# sourceMappingURL=LeftPane.js.map
      return module.exports;
    })();

    /* ── @shanhai/kaipu-contract/generated.js ── */
    var m_generated = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      /**
       * ★★★ 机器生成文件 —— 不要手改 ★★★
       *
       * 来源：contracts/v1.1/{errors,sse-events,features,seats}.json
       * 生成：node tools/gen-contract.mjs
       * 校验：node tools/gen-contract.mjs --check   （有漂移即失败）
       *
       * 改契约的正确姿势：改 JSON → 重跑生成 → 提差异单（★ 不单方改契约）。
       */
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SEAT_INVARIANTS = exports.SEATS = exports.FEATURE_DISCIPLINE = exports.WISDOM_TEAM_READ_RULE = exports.FEATURE_FLAGS = exports.SSE_RECOVERY = exports.SSE_RENDER_RULES = exports.SSE_VERDICTS = exports.SSE_EVENTS = exports.SSE_EVENT_ORDER = exports.ERROR_ENVELOPE_NOTE = exports.ERROR_FALLBACK = exports.ERROR_CODES = exports.CONTRACT_VERSION = void 0;
      /** 契约版本（对账依据：认版本号，不认"我记得是这样的"） */
      exports.CONTRACT_VERSION = "v1.1";
      /* ═══════════════ 错误码（errors.json）═══════════════ */
      /** 错误码总表。★ 单一事实源，不要在别处再写一份。 */
      exports.ERROR_CODES = [
          {
              "http": 400,
              "code": "invalid_request",
              "when": "参数缺失 / 格式错",
              "uiText": "差了个东西，我没看明白。回头检查下再发。",
              "textSource": "svc-012 §2.1（原拟稿见 cli-007 §2.3）",
              "textAuthor": "cli",
              "textStatus": "confirmed",
              "why": "svc-012 §2.1：「✅ 认可 · 一字不改」。"
          },
          {
              "http": 401,
              "code": "unauthorized",
              "when": "无 / 过期 / 非法 token",
              "uiText": "你的通行证不管用了，重新领一张就好。",
              "textSource": "svc-012 §2.1",
              "textAuthor": "svc",
              "textStatus": "confirmed",
              "why": "★ 原拟稿写「过期了」，只覆盖一种成因；401 的三种成因是【无 / 过期 / 非法令牌】。只写「过期」，用户在「令牌被判非法」时会按过期去理解、反复重领还是失败 —— 文案与实际成因不符 = 让人白试。（svc-012 §2.1 定稿）"
          },
          {
              "http": 402,
              "code": "insufficient_credits",
              "when": "余额不足",
              "uiText": "场地费不够了，充一点再来。",
              "textSource": "cli-001 §6.3",
              "textStatus": "confirmed"
          },
          {
              "http": 403,
              "code": "expert_forbidden",
              "when": "无该专家权益",
              "uiText": "这位不在你的铺子名单里。",
              "textSource": "cli-001 §6.3",
              "textStatus": "confirmed"
          },
          {
              "http": 403,
              "code": "agent_forbidden",
              "when": "无该 Agent 权益",
              "uiText": "这位不在你的铺子名单里。",
              "textSource": "cli-001 §6.3",
              "textStatus": "confirmed"
          },
          {
              "http": 403,
              "code": "seat_immutable",
              "when": "试图更换签名位",
              "uiText": "签名这件事，只能我来。",
              "textSource": "cli-001 §6.3",
              "textStatus": "confirmed"
          },
          {
              "http": 404,
              "code": "not_found",
              "when": "对象不存在",
              "uiText": "没找到这个铺子，看看名字对不对？",
              "textSource": "cli-001 §6.3",
              "textStatus": "confirmed"
          },
          {
              "http": 409,
              "code": "duplicate_request",
              "when": "幂等：同 requestId 重复提交",
              "uiText": "这一单已经在跑了，别急。",
              "textSource": "cli-001 §6.3",
              "textStatus": "confirmed",
              "detailShape": "{ \"state\": \"running\", \"poll\": \"/scene/run/{requestId}\" }",
              "clientAction": "不弹错。按 detail.poll 直接切到查询接口。"
          },
          {
              "http": 409,
              "code": "not_checked_in",
              "when": "requiresExternal 场景无有效预约",
              "uiText": "还没到进场时间。到了我提醒你。",
              "textSource": "cli-001 §6.3",
              "textStatus": "confirmed",
              "detailShape": "{ \"requiresExternal\": true, \"availableAt\": \"<ISO8601 可进场时点>\" }",
              "clientAction": "按 detail.requiresExternal 显示『该场景需进场』，不是普通报错。★ 若带 availableAt，必须一并显示——它是用户的『出路』（何时能进场），只说不给时点等于没说。"
          },
          {
              "http": 409,
              "code": "seat_conflict",
              "when": "同一实体兼任执行位 + 审计位",
              "uiText": "干活的和审账的，不能是同一个人。",
              "textSource": "cli-001 §6.3",
              "textStatus": "confirmed"
          },
          {
              "http": 422,
              "code": "reservation_expired",
              "when": "过期不候",
              "uiText": "这场的门关了，是因为有下一场在等。再约一场吧，不用重新填。",
              "textSource": "cli-001 §6.3",
              "textStatus": "confirmed"
          },
          {
              "http": 426,
              "code": "upgrade_required",
              "when": "客户端版本过低",
              "uiText": "这个版本的台子旧了，升一下再进。",
              "textSource": "svc-006 §二 #8",
              "textStatus": "confirmed"
          },
          {
              "http": 429,
              "code": "rate_limited",
              "when": "超限流",
              "uiText": "有点挤，缓一缓再进。",
              "textSource": "cli-001 §6.3",
              "textStatus": "confirmed"
          },
          {
              "http": 500,
              "code": "server_error",
              "when": "服务端异常（5xx）",
              "uiText": "场地这边打了个喷嚏，我们看看。你的东西没丢。",
              "textSource": "cli-001 §6.3",
              "textStatus": "confirmed"
          }
      ];
      /** ★ code 不在表内时的兜底文案（客户端纪律：不许把裸 code 印给用户） */
      exports.ERROR_FALLBACK = {
          "uiText": "场地这边有点不对劲，我们看一下。你的东西没丢。",
          "alsoReport": true
      };
      exports.ERROR_ENVELOPE_NOTE = "客户端【不得】把原始错误直出给用户；一律按 code 翻译。code 不在本表内 ⇒ 兜底文案 + 上报（不许把裸 code 印给用户）。";
      /* ═══════════════ SSE 事件（sse-events.json）═══════════════ */
      exports.SSE_EVENT_ORDER = "start → (round_start → lamp_start/lamp_delta/lamp_done×N → round_done)+ → summary → usage → done";
      exports.SSE_EVENTS = [
          {
              "event": "start",
              "fields": {
                  "requestId": "string",
                  "scene": "string",
                  "lamps": "string[]",
                  "serverTime": "iso8601"
              },
              "note": "lamps 为本次实际参与维度（dims 裁剪后的结果）"
          },
          {
              "event": "round_start",
              "isNew": "004 #2",
              "fields": {
                  "round": "number",
                  "reason": "string"
              },
              "note": "reason 例：'首轮' / '⚡有条件回炉'"
          },
          {
              "event": "lamp_start",
              "fields": {
                  "round": "number",
                  "lamp": "string",
                  "agent": "string"
              },
              "note": "round 为 004 #2 新增（兜底判据）"
          },
          {
              "event": "lamp_delta",
              "fields": {
                  "round": "number",
                  "lamp": "string",
                  "text": "string"
              },
              "note": "流式增量；按 (round, lamp) 归组渲染"
          },
          {
              "event": "lamp_done",
              "fields": {
                  "round": "number",
                  "lamp": "string",
                  "verdict": "Verdict",
                  "detail": "string",
                  "latencyMs": "number"
              }
          },
          {
              "event": "round_done",
              "isNew": "004 #2",
              "fields": {
                  "round": "number",
                  "verdict": "Verdict"
              }
          },
          {
              "event": "summary",
              "fields": {
                  "verdict": "Verdict",
                  "conditions": "string[]",
                  "round": "number",
                  "participatedDims": "string[]",
                  "skippedDims": "string[]"
              },
              "note": "★ participatedDims / skippedDims 为 004 #4 新增。报告体同步固定带『本次参与维度 / 未参与维度 / 裁剪依据』—— ★ 报告不能给出『审全了』的错觉。"
          },
          {
              "event": "usage",
              "fields": {
                  "tokensIn": "number",
                  "tokensOut": "number",
                  "credits": "number",
                  "balanceAfter": "number"
              },
              "note": "★ 唯一可信计费口径。客户端不得自行计算。"
          },
          {
              "event": "done",
              "fields": {
                  "finishReason": "string"
              }
          }
      ];
      exports.SSE_VERDICTS = [
          {
              "value": "✅通过",
              "tone": "pass"
          },
          {
              "value": "⚡有条件",
              "tone": "conditional",
              "triggers": "回炉（goto）"
          },
          {
              "value": "❌驳回",
              "tone": "reject",
              "triggers": "abort"
          },
          {
              "value": "⛔拒收",
              "tone": "refuse",
              "triggers": "abort · 不收费"
          }
      ];
      /** 渲染规则（客户端界面纪律，逐条可自查） */
      exports.SSE_RENDER_RULES = [
          {
              "id": "R1",
              "rule": "归组键 = (round, lamp)；round_start 为主、round 字段为兜底"
          },
          {
              "id": "R2",
              "rule": "界面按『第 N 轮』分段，回炉可见（不合并成一条流水）"
          },
          {
              "id": "R3",
              "rule": "四类判定必须可区分且可见 —— 流程透明是卖点，不是装饰"
          },
          {
              "id": "R4",
              "rule": "★ dims 裁剪后，尾部固定显示『参与维度 / 未参与维度』，不做成可折叠的次要信息"
          },
          {
              "id": "R5",
              "rule": "★ 断开 = 『已停止接收』，不写『已取消』（服务端仍在算完并落 lamp_runs）"
          },
          {
              "id": "R6",
              "rule": "轮数由服务端 loopPolicy 决定，客户端不得推断；outputLevel 只影响输出详略"
          }
      ];
      exports.SSE_RECOVERY = {
          "endpoint": "GET /scene/run/{requestId}",
          "isNew": "004 #5",
          "clientAction": "本地库持久化 requestId 列表；进页先查，state=done 直接渲染结果（不重连 SSE），state=running 则续订阅。★『过程透明是卖点』——刷新不能丢过程。"
      };
      /* ═══════════════ features 六位（features.json）═══════════════ */
      exports.FEATURE_FLAGS = [
          {
              "key": "agentProfile",
              "meaning": "Agent 档案管理",
              "p1Default": true,
              "controls": "档案入口显隐"
          },
          {
              "key": "wisdomTeam",
              "aliasOf": "expertTeam",
              "meaning": "智囊团（组团）",
              "p1Default": true,
              "controls": "智囊团入口显隐"
          },
          {
              "key": "expertTeam",
              "deprecatedInFavorOf": "wisdomTeam",
              "meaning": "（旧名，同值并存）",
              "p1Default": true
          },
          {
              "key": "customScenes",
              "meaning": "自定义场景",
              "p1Default": true,
              "controls": "C-8 入口"
          },
          {
              "key": "roleSeats",
              "meaning": "三位指派（执行/审计/管理）",
              "p1Default": true,
              "controls": "C-6 入口"
          },
          {
              "key": "reportSign",
              "meaning": "报告签名",
              "p1Default": true,
              "controls": "C-5 验签展示"
          },
          {
              "key": "promptPreview",
              "meaning": "提示词预览",
              "p1Default": false,
              "controls": "★ 敏感面默认关 · 客户端不实现"
          }
      ];
      /** ★ 智囊团开关的唯一读法：wisdomTeam ?? expertTeam（契约 #16） */
      exports.WISDOM_TEAM_READ_RULE = "wisdomTeam ?? expertTeam —— 命名评审定后删任一字段都是改一行（契约增补 #16）";
      exports.FEATURE_DISCIPLINE = [
          "★ features.* 是【功能可见性开关】，不是【权限】。真权限在服务端判，客户端只按它控制显隐。",
          "★ 不许把 features 当安全边界用 —— 把它当权限 = 前端绕过 = 安全事故。",
          "★ promptPreview 默认 false 且客户端不实现（属『藏实现』面，N-2 邻域）。即便服务端开了也不做界面。"
      ];
      /* ═══════════════ 角色位（seats.json）═══════════════ */
      exports.SEATS = [
          {
              "seat": "execution",
              "label": "执行位",
              "defaultHolder": "山海智囊团",
              "replaceable": true,
              "replaceableWith": [
                  "客户自带 Agent",
                  "第三方 Agent"
              ],
              "noImplicitIntervention": true
          },
          {
              "seat": "audit",
              "label": "审计位",
              "defaultHolder": "山海第三方审计（备选）",
              "replaceable": true,
              "replaceableWith": [
                  "客户指定审计方",
                  "第三方审计机构"
              ],
              "noImplicitIntervention": true
          },
          {
              "seat": "management",
              "label": "管理位",
              "defaultHolder": "山海管理方（候选）",
              "replaceable": true,
              "replaceableWith": [
                  "客户自任",
                  "第三方"
              ],
              "noImplicitIntervention": true,
              "note": "权限面最重 ⇒ 接入必须带四要素：身份 / 权责 / 留痕 / 可撤销（响石三道锁）"
          },
          {
              "seat": "signature",
              "label": "签名位",
              "defaultHolder": "山海（平台）",
              "replaceable": false,
              "uiRule": "★ 界面必须显示『不可更改』并说明原因 —— 签名不是服务，是担保。",
              "errorOnAttempt": "403 seat_immutable"
          }
      ];
      exports.SEAT_INVARIANTS = {
          "INV-18": "执行位/审计位/管理位可替换：任一位置换成第三方 ⇒ 流程仍可完整跑通",
          "INV-19": "签名位不可替换：客户端无法指定自己为签名方；报告签名恒由服务端",
          "G3": "三个可替换位替换后，我方不做隐式干预（界面上不得出现『山海建议/提醒』类干预痕迹）"
      };
      //# sourceMappingURL=generated.js.map
      return module.exports;
    })();

    /* ── @shanhai/kaipu-contract/errors.js ── */
    var m_errors = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.translateError = translateError;
      exports.hasUiText = hasUiText;
      exports.isReroutableError = isReroutableError;
      exports.extractErrorCode = extractErrorCode;
      exports.duplicatePollPath = duplicatePollPath;
      /**
       * 山海·开铺 · 契约层 · 错误码与翻译
       * =====================================================================
       * ★ 客户端纪律：
       *     **不把原始错误直出给用户**；一律按 `code` 翻译成用户语言。
       *     `code` 不在表内 ⇒ 兜底文案 + 上报（**不许把裸 code 印给用户**）。
       *
       * 表来自 `./generated.js`（由 `contracts/v1.1/errors.json` 生成）。
       * ★ 新增/修改文案 ⇒ 改 JSON + 重跑 `node tools/gen-contract.mjs`，**不要改这里**。
       */
      const generated_js_1 = m_generated;
      const UI_TEXT = Object.fromEntries(
      // `as const` 保住元组形状 —— 否则 map 推断成 string[][]，Object.fromEntries 不接
      generated_js_1.ERROR_CODES.map((e) => [e.code, e.uiText]));
      /** `code` ⇒ 用户可见文案。未收录 ⇒ 兜底文案。 */
      function translateError(code) {
          if (code !== undefined && UI_TEXT[code] !== undefined)
              return UI_TEXT[code];
          return generated_js_1.ERROR_FALLBACK.uiText;
      }
      /**
       * 这个 `code` 在 §8.2 文案表里**有没有译法**。
       *
       * ★ 为什么单独导出（2026-10-06 加）：流内 `error` 事件要区分两种情形 ——
       *   · **有译法** ⇒ 用契约口径的译法（统一口径）
       *   · **没有**   ⇒ 如实显示服务端给的 `message`，并**标记「未收录」**
       *     ★ 且**不许自己补一条文案**：§8.2 由对方维护，**发现缺口要报，不单方补**。
       *
       * ★ 为什么不能只看 `translateError` 的返回值分辨：它对两种情况**都返回字符串**
       *   （未收录时返回兜底文案，看上去像"翻译过了"）。
       *   —— 这正是本项目反复踩的那类形态：**兼容路径把"没收录"吸收掉了，外面看不出来**。
       */
      function hasUiText(code) {
          return UI_TEXT[code] !== undefined;
      }
      /** 是否是需要"另走一条路"而不是弹错的码（客户端据此切换行为）。 */
      function isReroutableError(code) {
          return code === 'duplicate_request' || code === 'not_checked_in';
      }
      /**
       * 从任意响应体里安全提取 `code`。
       * ★ 容错：契约未落地 / 代理返回 HTML / 空体 —— 一律返回 undefined 而不抛。
       */
      function extractErrorCode(body) {
          if (typeof body !== 'object' || body === null)
              return undefined;
          const err = body.error;
          if (typeof err !== 'object' || err === null)
              return undefined;
          return typeof err.code === 'string' ? err.code : undefined;
      }
      /** `duplicate_request` 附带的轮询地址（客户端据此切到查询接口，不弹错）。 */
      function duplicatePollPath(detail) {
          if (typeof detail !== 'object' || detail === null)
              return undefined;
          const poll = detail['poll'];
          return typeof poll === 'string' ? poll : undefined;
      }
      //# sourceMappingURL=errors.js.map
      return module.exports;
    })();

    /* ── @shanhai/kaipu-contract/sse.js ── */
    var m_sse = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      /**
       * 山海·开铺 · 契约层 · SSE 事件（POST /scene/{id}/run）
       * =====================================================================
       * ★★ 本文件是**全场最容易出错的地方**，两条纪律写在这里：
       *
       *   1) **归组键 = (round, lamp)**。
       *      `round_start` / `round_done` 给**流程语义**（界面画"第 N 轮"分段）；
       *      每个 `lamp_*` **自带 `round`** 作**兜底** ——
       *      即便漏接了 `round_start`，也不会把第 2 轮的 `lamp_delta` 串进第 1 轮。
       *      ★ 依据：004 Q5「关键状态不能只有一个来源」（契约变更 #2）。
       *      003 教训同源：**只靠一个信号判断状态，迟早在并发/丢包下串台**。
       *
       *   2) **断开 ≠ 取消**。
       *      客户端断开 SSE = "客户端不再接收"，**服务端仍在算完并落 `lamp_runs`**。
       *      ⇒ 界面写「**已停止接收**」，**不写「已取消」**（004 Q8）。
       */
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SSE_EVENT = exports.VERDICT_TONE = void 0;
      exports.lampKey = lampKey;
      exports.VERDICT_TONE = {
          '✅通过': 'pass',
          '⚡有条件': 'conditional',
          '❌驳回': 'reject',
          '⛔拒收': 'refuse',
      };
      /** 事件名（与契约逐字一致，不要在这些位置写字面量） */
      exports.SSE_EVENT = {
          start: 'start',
          roundStart: 'round_start',
          lampStart: 'lamp_start',
          lampDelta: 'lamp_delta',
          lampDone: 'lamp_done',
          roundDone: 'round_done',
          summary: 'summary',
          usage: 'usage',
          error: 'error',
          done: 'done',
      };
      /** 归组键：**必须**用 (round, lamp)，不要只用 lamp。 */
      function lampKey(round, lamp) {
          return `${round}\u0000${lamp}`;
      }
      //# sourceMappingURL=sse.js.map
      return module.exports;
    })();

    /* ── @shanhai/kaipu-contract/models.js ── */
    var m_models = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      /**
       * 山海·开铺 · 契约层 · 接口形状（I-3）
       * =====================================================================
       * ★ 只放**契约里有的**字段。服务端内部实现、我方 Agent 资产
       *   （skill 全文 / memory / 内部 prompt）**永远不进这些类型**（INV-9 / CN-1）。
       */
      Object.defineProperty(exports, "__esModule", { value: true });
      //# sourceMappingURL=models.js.map
      return module.exports;
    })();

    /* ── @shanhai/kaipu-contract/account.js ── */
    var m_account = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      /**
       * 山海·开铺 · 契约层 · 鉴权与账户（契约 #1 / #2 —— ★ P0 解封项）
       * =====================================================================
       * 背景：004 Q1 —— 契约正本本来就有这两个接口，但客户端摘编漏了，
       *       导致"第 1 天自证接对了"跑不通。出具方已认错并补进 v1.1。
       *
       * ★ 客户端纪律（三条，写死在类型注释里）：
       *   1) `deviceToken` **只存内存**，不落盘。
       *   2) `serverTime` 是**本会话唯一时间基准** —— 算法：
       *      `offset = serverTime - Date.now()`，之后所有倒计时都用
       *      "服务端时间 + offset" 显示。**客户端不自己判定时间**。
       *   3) `features` 是**功能可见性开关，不是权限**。真权限在服务端判；
       *      **不许把它当安全边界用**（前端绕过 = 安全事故）。
       */
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isWisdomTeamEnabled = isWisdomTeamEnabled;
      exports.serverTimeOffset = serverTimeOffset;
      /**
       * ★ 智囊团开关读法 —— **唯一入口**。
       * 不要在别处直接写 `features.expertTeam`（改名时要改多处）。
       */
      function isWisdomTeamEnabled(features) {
          if (features === undefined)
              return false;
          return features.wisdomTeam ?? features.expertTeam ?? false;
      }
      /** 计算服务端时间偏移（毫秒）。之后用 `Date.now() + offset` 显示服务端时间。 */
      function serverTimeOffset(serverTime, now = Date.now()) {
          const t = Date.parse(serverTime);
          return Number.isNaN(t) ? 0 : t - now;
      }
      //# sourceMappingURL=account.js.map
      return module.exports;
    })();

    /* ── @shanhai/kaipu-contract/wire.js ── */
    var m_wire = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      /**
       * 山海·开铺 · 服务端响应形状（wire）—— host 出参 + client 消费
       * =====================================================================
       * ★ 为什么放**契约包**（而不是插件仓自己的 src/shared/）：
       *   这些形状**本来就是这个服务端的响应形状**，契约包正是它们该待的地方。
       *   更要紧的是**工程原因**（2026-10-05 实测踩出来的）：
       *
       *   插件的 host half 与 client half **不能共用同一个源文件** ——
       *   两边 tsconfig 的 module 格式不同（host = ESM，client = CommonJS），
       *   编到同一路径会**互相覆盖**。症状：host 侧报
       *     `The requested module '../shared/wire.js' does not provide an export named 'REMOTE_NS'`
       *   （后写的 CJS 产物把 ESM 产物冲掉了）。
       *
       *   而契约包**恰好已经有现成的双态产物机制**：
       *     · `lib/`     = ESM  → 给 host half
       *     · `lib-cjs/` = CJS  → 给 `tools/build-client.mjs` 内联进 client bundle
       *   ⇒ 复用这套机制，比新造一套正确。
       *
       * ★★ 但有一条**必须守住**（否则发布出去就挂）：
       *   host half **不经打包**（tsc 直出），它的裸 import 必须在**用户机的 profile** 里
       *   解析得到。而 `@shanhai/kaipu-contract` 是**构建期依赖**，用户机上**没有**。
       *   ⇒ 所以 **host half 只能 `import type`**（类型被 tsc 擦除，不产生运行时依赖）。
       *      **一旦有人在 host half 里从这个包 import 一个「值」，发布包就会解析失败。**
       *   ⇒ 这条由发布前机检看护（它会扫编译产物里的裸 import）。
       *
       * ★ 形状来源：以**实测的服务端响应**为准（2026-10-05），不以后来回忆为准。
       *   已发现与我方 `contracts/v1.1/*.json` 不一致处（`lamps` 是字符串数组、
       *   `categories[]` 多带 `scenes`/`count`、`scenes[].category` 与 `categories[].scenes`
       *   互相矛盾）—— 都按**实测形状**声明，并已登记差异单，**未单方改契约**。
       */
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SHOP_SUBDIRS = void 0;
      /* ══════════════════════════════════════════════════════════════════
         一之二、铺子资料（**本机目录**，同样不是服务端契约）
         ══════════════════════════════════════════════════════════════════ */
      /**
       * 铺子资料的三个子目录 —— **固定三个，不许用户自建**。
       *
       * ★ 为什么固定：分类一旦自由，同一个人第二次进来就会用另一种分法，
       *   三个月后自己也找不到东西。三个抽屉够用，且每个都有明确的去处。
       * ★ 目录名用**界面语言**（不是 `uploads`/`reports`）：用户会直接在
       *   文件管理器里看到它们，看得懂比"工程上规范"更要紧。
       */
      exports.SHOP_SUBDIRS = ['待审材料', '审校报告', '草稿'];
      //# sourceMappingURL=wire.js.map
      return module.exports;
    })();

    /* ── @shanhai/kaipu-contract/workstation.js ── */
    var m_workstation = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      /**
       * 山海·开铺 · 工位插件 · 契约层类型（期1）
       * =====================================================================
       * ★ 本文件是「工位持久化态」wire 形状的唯一出处（host 出参 / client 消费，
       *   两端都从这里 `import type`，不各写一份 —— 否则 host/client 必然漂移）。
       *
       * ★ 设计纪律四点 + 硬边界的落点都标在类型上：
       *   - ① fail-open 代价          → AsyncReviewBasis.notifyFailOpen + notifyCostNote
       *   - ② 邀请带有效期            → Invite.expiresAt（ISO8601，过期不占座）
       *   - ③ 离座≠移除                → Seat.presence × Seat.membershipActive
       *   - ④ 人类协作方/Agent 分开    → Member.kind / Trace.actorKind
       *
       * ★★ 权威源方向（写死，不要反着读）：
       *   **`Seat` 是权威源，`Member` 的 `presence` / `membershipActive` 是快照。**
       *   座面渲染、汇总计数、不变量判定一律以 `Seat` 为准；`Member` 上那两个字段只用于
       *   「按人查」的读路径，**不得**成为第二个可独立写入的权威。
       *   两侧不一致由 host 纯函数 `assertSeatMemberConsistency()` 判出（判据脚本会跑）。
       *
       * ★ 非法态（类型层不禁，靠不变量 + 判据拦）：
       *   · `status:'occupied'` 且 `membershipActive:false` —— 既占着座又说不是成员
       *   · `status:'vacant'` 且 `presence` 非 null    —— 空位却有在场状态
       *   · `membershipActive:false` 且 `status` 非 vacant —— 移除未释放座位
       *   ⇒ 一句话：**移除 = 释放回空位池**（`status:'vacant'` + `presence:null` + `membershipActive:false`）；
       *     「曾有成员被移除」这件事落 trace，不靠座位残留态表达。
       */
      Object.defineProperty(exports, "__esModule", { value: true });
      //# sourceMappingURL=workstation.js.map
      return module.exports;
    })();

    /* ── @shanhai/kaipu-contract/index.js ── */
    var m_index = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() { return m[k]; } };
          }
          Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
      }));
      var __exportStar = (this && this.__exportStar) || function(m, exports) {
          for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      /**
       * 山海·开铺 · 契约层 · 入口
       * =====================================================================
       * ★ 本包是全仓**契约类型的唯一出处**。任何插件都从这里 import，
       *   不许在自己包内另行定义错误码 / SSE 事件名 / 形状（否则必然漂移）。
       *
       * 分层：
       *   · `./generated.js` —— ★ **机器生成**，来自 `contracts/v1.1/*.json`。
       *                         手改会被 `gen-contract.mjs --check` 抓出来。
       *   · `./errors.js`    —— 错误码翻译（客户端纪律：不直出原始错误）
       *   · `./sse.js`       —— SSE 事件的判别联合（discriminated union）
       *   · `./models.js`    —— 接口形状（/agents /scenes /scene/run /reservations）
       *   · `./account.js`   —— /auth/device · /me（含 features 读法）
       */
      __exportStar(m_generated, exports);
      __exportStar(m_errors, exports);
      __exportStar(m_sse, exports);
      __exportStar(m_models, exports);
      __exportStar(m_account, exports);
      __exportStar(m_wire, exports);
      __exportStar(m_workstation, exports);
      //# sourceMappingURL=index.js.map
      return module.exports;
    })();

    /* ── client/copy.js ── */
    var m_copy = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CONSTRAINTS = void 0;
      /**
       * 山海·开铺 · 场地插件 · 界面文案（**契约外**的三句）
       * =====================================================================
       * 来源：`契约 §6.4「三条必须显示的约束」`。
       *
       * ★★ 为什么放在客户端、而不是契约层：
       *   契约的改动要**提差异单**（本仓纪律：不单方改契约）。这三句目前尚未进契约
       *   ⇒ 由客户端本地持有，并在注释里标明出处。
       *   建议下一版契约把它们收进去（否则每个客户端都要各自抄一份 —— 正是漂移的起点）。
       *
       * ★ 这三条是**必须显示**的，不是"可选提示"：
       *   报告没签名却看着像正式件、角色位换了人却查不到、过期了却像被惩罚 ——
       *   这三件事都会直接损害"报告拿得出去"这个卖点。
       */
      exports.CONSTRAINTS = {
          /**
           * ① 报告**无签名** ⇒ 必须显示（契约 §6.4 三条约束之一）。
           *
           * ★★ 改版：**语气从「警告」改为「预告」**。
           *   旧版「此报告未签名，不具备对外效力」是**红框 + 判定口吻**，
           *   第一眼像"我搞砸了"；而它只是**还没接入签名服务**这一正常态。
           *   ⇒ 改成「尚未点亮签名灯 / 接入签名服务后即可对外出具」——
           *     既仍**如实告知"当前还不能对外出具"**（约束义务没丢），
           *     又把"等待"做成期待，而不是把"未完成"做成错误。
           *   ★ 视觉配套见 `RightPane.tsx` 的 `UnsignedBanner`：红框 → 暖金左侧线。
           */
          unsignedReport: '🪔 报告尚未点亮签名灯',
          unsignedReportWhy: '接入签名服务后，本报告即可对外出具。',
          /** ② 角色位**变更** ⇒ 显示变更记录 + 原因（可追溯） */
          seatChangeTitle: '角色位变更记录',
          seatChangeEmpty: '尚无变更记录。',
          /** ③ **超时释放** ⇒ 过期不候 · 可重新预约（不惩罚首次） */
          expiry: '过期不候 · 可重新预约',
          expiryWhy: '首次过期不受惩罚：重新预约即可，不用重新填。',
      };
      //# sourceMappingURL=copy.js.map
      return module.exports;
    })();

    /* ── client/ErrorSurface.js ── */
    var m_ErrorSurface = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ErrorSurface = ErrorSurface;
      const jsx_runtime_1 = require("react/jsx-runtime");
      const kaipu_contract_1 = m_index;
      const copy_js_1 = m_copy;
      const theme_js_1 = m_theme;
      function ErrorSurface({ code, detail, onDismiss }) {
          // ★ 契约点名的两个"另走一条路"的码
          if ((0, kaipu_contract_1.isReroutableError)(code))
              return (0, jsx_runtime_1.jsx)(Reroute, { code: code, detail: detail, onDismiss: onDismiss });
          const text = (0, kaipu_contract_1.translateError)(code);
          const isExpiry = code === 'reservation_expired';
          return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-error": code, style: {
                  marginTop: 12,
                  padding: '10px 12px',
                  border: `1px solid ${theme_js_1.C.border}`,
                  borderLeft: '3px solid #dc2626',
                  background: 'rgba(220,38,38,0.06)',
              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'flex-start', gap: 10 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.normal }, children: text }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onDismiss, style: { ...ghost, marginLeft: 'auto' }, children: "\u77E5\u9053\u4E86" })] }), isExpiry && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 8 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.base, color: '#b45309' }, children: copy_js_1.CONSTRAINTS.expiry }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 3, lineHeight: theme_js_1.LH.normal }, children: copy_js_1.CONSTRAINTS.expiryWhy }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onDismiss, style: { ...ghost, marginTop: 8 }, children: "\u91CD\u65B0\u9884\u7EA6\uFF08\u4E0D\u7528\u91CD\u65B0\u586B\uFF09" })] }))] }));
      }
      /** `duplicate_request` / `not_checked_in` ⇒ **不是错误**，是"该走另一条路"。 */
      function Reroute({ code, detail, onDismiss, }) {
          const text = (0, kaipu_contract_1.translateError)(code);
          const poll = (0, kaipu_contract_1.duplicatePollPath)(detail);
          const requiresExternal = detail?.['requiresExternal'] === true;
          const availableAt = formatAt(detail?.['availableAt']);
          return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-reroute": code, ...(poll === undefined ? {} : { 'data-kaipu-poll': poll }), ...(availableAt === null ? {} : { 'data-kaipu-available-at': availableAt }), style: {
                  marginTop: 12,
                  padding: '10px 12px',
                  border: `1px solid ${theme_js_1.C.border}`,
                  borderLeft: `3px solid ${theme_js_1.C.accent}`,
                  background: 'rgba(59,111,224,0.06)',
              }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.normal }, children: text }), poll !== undefined && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 8 }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onDismiss, style: ghost, children: "\u67E5\u770B\u8FD9\u6B21\u8FD0\u884C" }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginLeft: 10 }, children: "\uFF08\u5207\u5230\u67E5\u8BE2\u63A5\u53E3\uFF0C\u4E0D\u91CD\u590D\u63D0\u4EA4\uFF09" })] })), requiresExternal && ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 6, lineHeight: theme_js_1.LH.normal }, children: ["\u8BE5\u573A\u666F\u9700\u8FDB\u573A\uFF1A\u6709\u6709\u6548\u9884\u7EA6\u540E\u624D\u53EF\u8FD0\u884C\uFF08\u8FD9\u4E0D\u662F\u6545\u969C\uFF09\u3002", availableAt !== null && ((0, jsx_runtime_1.jsxs)("span", { children: [' ', "\u53EF\u8FDB\u573A\u65F6\u70B9\uFF1A", (0, jsx_runtime_1.jsx)("strong", { "data-kaipu-available-text": "1", children: availableAt })] }))] }))] }));
      }
      /**
       * ISO8601 → 本地可读时点。**读不懂就返回 null**（不显示，不抛）。
       *
       * ★★ 只做「格式化绝对时点」，**不做「还剩多久」** —— 这是契约纪律，不是偷懒：
       *   服务端给的是**绝对时点**（`availableAt`），而倒计时的**基准**必须由服务端给
       *   （契约原文：`windowRemainingSec` 服务端给，客户端不自己算基准）。
       *   ⇒ 一旦我自己 `Date.now()` 相减，客户端时钟偏差就会变成一个**看起来像真的**的错数字。
       */
      function formatAt(iso) {
          if (typeof iso !== 'string')
              return null;
          const t = Date.parse(iso);
          if (Number.isNaN(t))
              return null;
          const d = new Date(t);
          const p = (n) => String(n).padStart(2, '0');
          return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
      }
      const ghost = {
          fontSize: theme_js_1.FS.small,
          padding: '4px 12px',
          border: `1px solid ${theme_js_1.C.border}`,
          borderRadius: 4,
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer',
          font: 'inherit',
      };
      //# sourceMappingURL=ErrorSurface.js.map
      return module.exports;
    })();

    /* ── client/run-reducer.js ── */
    var m_run_reducer = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DIMS_FOOTER = exports.STOPPED_EXPLAIN = exports.STATUS_TEXT = exports.EMPTY_RUN = void 0;
      exports.reduceRun = reduceRun;
      exports.toneOf = toneOf;
      /**
       * 山海·开铺 · 场地插件 · **运行归约器**（纯函数）
       * =====================================================================
       * 输入一串契约 SSE 事件，输出**只与渲染有关**的视图状态。
       *
       * ★★ 为什么单独一个模块、而且是纯函数
       *
       *   契约里最容易出错的正是这一步（`sse.ts` 的注释把它叫"全场最容易出错的地方"）。
       *   把它做成**纯函数**以后：
       *     · 事件从哪来（mock / 真 SSE / 断线补拉）**与本模块无关** —— 换来源不改它；
       *     · 可被单测/探针直接喂事件断言结果，不需要起浏览器。
       *   ⇒ 这正是"一个服务只做一件事"的落法：**归约只做归约**。
       *
       * ★★ 三条契约硬约束（逐条对应 sse-events.json 的 renderRules）
       *
       *   [R1] 归组键 = **(round, lamp)**，不是 `lamp`。
       *        `round_start`/`round_done` 给流程语义；每个 `lamp_*` **自带 round** 作兜底。
       *        ⇒ 即便漏接 `round_start`，也**不会**把第 2 轮的 delta 串进第 1 轮。
       *   [R2] 按「第 N 轮」**分段**，回炉可见 —— 不合并成一条流水。
       *   [R6] 轮数**由服务端 `loopPolicy` 决定，客户端不得推断**。
       *        ⇒ 本模块**只反映事件里说的**，永不自己造一个轮次
       *          （所以"兜底"只兜"分组"，不兜"编造第几轮"）。
       *
       * ★ 另有一条不属于本模块但必须记住：[R5] 断开 ≠ 取消。
       *   断开只改**客户端的接收状态**（`status: 'stopped'`），
       *   服务端的最终判定仍以 `summary` 为准 —— 两者分开存，界面才不会说出"已取消"。
       */
      const kaipu_contract_1 = m_index;
      exports.EMPTY_RUN = {
          requestId: null,
          scene: null,
          serverTime: null,
          status: 'idle',
          participated: [],
          rounds: [],
          summary: null,
          usage: null,
          finishReason: null,
          errors: [],
      };
      /**
       * 归约。
       * @param events   契约事件序列（mock / 真 SSE 均可）
       * @param stopped  客户端是否已停止接收（由 UI 传入 —— 它不属于事件流，见 R5）
       */
      function reduceRun(events, stopped = false) {
          const view = { ...exports.EMPTY_RUN, participated: [], rounds: [] };
          /** ★ 归组键必须 (round, lamp) —— 见 R1 */
          const lampIndex = new Map();
          const roundIndex = new Map();
          /** 取或建某一轮的分段。`fromLampEvent` = 该分段是**兜底**出来的（没见着 round_start）。 */
          const ensureRound = (round, reason, fromLampEvent = false) => {
              const hit = roundIndex.get(round);
              if (hit !== undefined)
                  return hit;
              const created = {
                  round,
                  /**
                   * ★★ 「没有 reason」有**两种**，必须说成两句不同的话（2026-10-05 抓到的真缺陷）：
                   *   · `fromLampEvent` ⇒ 压根**没收到 `round_start`**（那是我们的兜底分组）
                   *   · 否则           ⇒ **收到了 `round_start`，但服务端没给 `reason`**
                   * 原来一律写成"（未收到轮次开始事件）" ⇒ 服务端明明发了却说没收到，
                   * **那是错误陈述** —— 比不显示更坏。
                   * （触发背景：服务端 2026-10-05 补发了 `round_start`，但它的 data 是
                   *  `{round, lamps}`，**没有** §3.4 里的 `reason` ⇒ 这条立刻显形。）
                   */
                  reason: reason ?? (fromLampEvent ? '（未收到轮次开始事件）' : '（服务端未给本轮说明）'),
                  // ★ 兜底分组才算 degraded；"收到了但没给说明"**不是** degraded，是服务端少给一个字段
                  degraded: fromLampEvent,
                  lamps: [],
                  verdict: null,
              };
              roundIndex.set(round, created);
              view.rounds.push(created);
              return created;
          };
          const ensureLamp = (round, lamp, agent) => {
              const key = (0, kaipu_contract_1.lampKey)(round, lamp); // ← ★ 契约提供的键构造，不许本地拼字符串
              const hit = lampIndex.get(key);
              if (hit !== undefined) {
                  if (agent !== null && hit.agent === null)
                      hit.agent = agent;
                  return hit;
              }
              const created = { lamp, agent, lines: [], verdict: null, detail: '', latencyMs: null, started: false };
              lampIndex.set(key, created);
              ensureRound(round, null, true).lamps.push(created);
              return created;
          };
          for (const e of events) {
              switch (e.event) {
                  case 'start': {
                      view.requestId = e.requestId;
                      view.scene = e.scene;
                      /**
                       * ★★ 服务器时刻 —— 契约 §3.4 的 `start` 里就有它。
                       *
                       * ★ 取值方式与下面 `usage` 那一段**同款**（`e as unknown as Record<string, unknown>`
                       *   + `typeof` 判型）：契约类型若没收这个字段，也**不该**在这层编一个值出来。
                       *   拿不到就 `null` ⇒ 界面不显示那一行（不是显示个本地时刻顶上）。
                       */
                      const st = e;
                      view.serverTime =
                          typeof st['serverTime'] === 'string' && st['serverTime'] !== '' ? st['serverTime'] : null;
                      view.participated = [...e.lamps];
                      break;
                  }
                  case 'round_start': {
                      ensureRound(e.round, e.reason);
                      break;
                  }
                  case 'lamp_start': {
                      // ★ 2026-11-09：标记「已开工」⇒ 界面据此显示「正在深度核查」，
                      //   与「真·待接入」（started=false 且 verdict=null）区分开。
                      ensureLamp(e.round, e.lamp, e.agent).started = true;
                      break;
                  }
                  case 'lamp_delta': {
                      // ★ 收到流式文本也是「已开工」的硬证据（有些链路先 delta 后 start）
                      const dl = ensureLamp(e.round, e.lamp, null);
                      dl.started = true;
                      dl.lines.push(e.text);
                      break;
                  }
                  case 'lamp_done': {
                      const l = ensureLamp(e.round, e.lamp, null);
                      l.verdict = e.verdict;
                      l.detail = e.detail;
                      l.latencyMs = e.latencyMs;
                      break;
                  }
                  case 'round_done': {
                      ensureRound(e.round, null, true).verdict = e.verdict;
                      break;
                  }
                  case 'summary': {
                      // ★ `conditions` 契约里是必填；服务端给了就给，没给就空数组（不编内容）
                      const conditions = Array.isArray(e.conditions) ? [...e.conditions] : [];
                      // ★★ 维度信息：**服务端给没给**是两件事，必须分开记（见 SummaryView.dimsReported）
                      const hasDims = Array.isArray(e.participatedDims) && Array.isArray(e.skippedDims);
                      view.summary = {
                          verdict: e.verdict,
                          conditions,
                          round: typeof e.round === 'number' ? e.round : 1,
                          participatedDims: Array.isArray(e.participatedDims) ? [...e.participatedDims] : [],
                          skippedDims: Array.isArray(e.skippedDims) ? [...e.skippedDims] : [],
                          dimsReported: hasDims,
                      };
                      break;
                  }
                  case 'usage': {
                      // ★ 契约：usage 是**唯一可信计费口径**，客户端不得自行计算 ⇒ 原样存、原样显示
                      //   ★ 兜底只用 `typeof` 判型（**不填 0**）：没有的数就让它"没有"，
                      //     界面才可能如实说"未提供"。编一个 0 = 替服务端撒谎。
                      const u = e;
                      view.usage = {
                          tokensIn: typeof u['tokensIn'] === 'number' ? u['tokensIn'] : 0,
                          tokensOut: typeof u['tokensOut'] === 'number' ? u['tokensOut'] : 0,
                          credits: typeof u['credits'] === 'number' ? u['credits'] : 0,
                          balanceAfter: typeof u['balanceAfter'] === 'number' ? u['balanceAfter'] : null,
                          note: typeof u['note'] === 'string' && u['note'] !== '' ? u['note'] : null,
                      };
                      break;
                  }
                  case 'done': {
                      view.finishReason = e.finishReason;
                      break;
                  }
                  /**
                   * ★★ 流内 `error`（契约 §3.4 · 2026-10-06 补）。
                   *
                   * ★ **不改 `status`**：收到它**不代表这次运行结束了**（契约示例里它排在 `done` 之前）
                   *   ⇒ 不能在这里把 status 置成 `done`/失败 —— 那是**替服务端下结论**。
                   *   若服务端之后真不发 `done`，流结束时的"提前结束"检查会**如实说出来**。
                   * ★ **按到达顺序留着**（可能是多条）：同一次运行里不同阶段各报一条是合理的，
                   *   合并/去重都会丢掉"发生过几次"这个信息。
                   */
                  case 'error': {
                      view.errors = [
                          ...view.errors,
                          {
                              code: typeof e.code === 'string' ? e.code : '',
                              message: typeof e.message === 'string' ? e.message : '',
                          },
                      ];
                      break;
                  }
              }
          }
          view.status = view.requestId === null ? 'idle' : (stopped ? 'stopped' : (view.finishReason === null ? 'running' : 'done'));
          return view;
      }
      /* ─────────────────────────── 渲染辅助（纯函数） ─────────────────────────── */
      /**
       * 判定 → 配色档位。
       *
       * ★★ **未知判定必须回 `null`（中性灰），不能回 `undefined`** —— 2026-10-05 联调实测抓到的真洞：
       *   服务端已在发**契约里没有的第五类判定 `⚪未接入`**（`agents` 表为空时，维度无执行方）。
       *   原实现是 `VERDICT_TONE[verdict]`：
       *     · 类型上 `Record<Verdict, VerdictTone>` 让 TS 以为**永远有值**（类型在说谎）
       *     · 运行时未知键得 `undefined` ⇒ 下游 `tone === null ? 灰 : TONE_BG[undefined]` 走后者
       *       ⇒ `background: undefined` ⇒ **徽标没有底色**，而"兜底那行"永远到不了
       *   ⇒ **兜底写了但不可达 = 没有兜底**。这里 `?? null` 把它接上。
       *   （这也是"第三道闸门·客户端不渲染未授权/未知取值"的落点。）
       */
      function toneOf(verdict) {
          if (verdict === null)
              return null;
          return kaipu_contract_1.VERDICT_TONE[verdict] ?? null;
      }
      exports.STATUS_TEXT = {
          idle: '尚未运行',
          running: '运行中',
          // ★ R5：断开 = **已停止接收**。契约明文禁止写「已取消」——
          //   因为服务端仍在算完并落 lamp_runs，写"已取消"就是在说一件没发生的事。
          stopped: '已停止接收',
          done: '已完成',
      };
      exports.STOPPED_EXPLAIN = '已停止接收 —— 服务端仍在算完并落 lamp_runs；最终判定以服务端报告为准。';
      /**
       * ★★★ 对外措辞：「审核面」——**内部叫灯次，对外叫审核面**（2026-10-07 定）
       *
       * 依据：已定口径（发起人 2026-10-07 采纳：
       *   「改，全换审核面」）。原措辞是「维度」，问题有三：
       *     ① **「维度」不是给客户看的词** —— 客户看到"维度"不知道指的是什么；
       *     ② 契约里已经叫「灯次」、灯名是「智灯/匠灯/戒灯/仁灯/文灯」，
       *        **内部术语已经够多，界面不该再加一个"维度"**；
       *     ③ 「审核面」直接告诉客户"**这是审的一个面**"，且与「灯」不冲突（一盏灯负责一个审核面）。
       *
       * ★★ 口径一句话：**内部叫灯次，对外叫审核面。一个面向施工，一个面向客户。**
       *
       * ⚠️⚠️ **改的范围边界**（很容易"改过头"，所以写死在这里）：
       *   只改**我们自己写的界面文案**（labels / 说明句 / 术语条目）。
       *   **不改下列两类** —— 它们不是我们的措辞，客户看到什么由服务端决定：
       *     · **契约字段名**（`dims` / `participatedDims` / `run_when` / `dim` 等）——
       *       它们是与服务端见面的**接口词汇**，改了就是改契约（本仓纪律：不单方改契约）；
       *     · **服务端下发的数据值**（如 `/agents[].role` 的值「综合维度」、
       *       `RecommendationView.when` 的值）—— 客户端**原样显示**，改 mock 只会让
       *       mock 与服务端不一致（`live.ts` 就是靠 `role === 灯名` 精确匹配找执行方的）。
       *   ⇒ 判别的问法：**这句话是谁写的？** 我们写的 ⇒ 改；服务端给的 ⇒ 不动。
       *
       * ⚠️ 改这些字符串会**连带**改 `tools/probe/run-view-probe.mjs` 里几条锚文本的断言
       *   （它们正是断"R4 尾部那两行在不在"）。那些断言是**有意锚文案**的 ——
       *   见该文件品牌名那条注释里对"什么时候该锚文案"的判别。
       */
      exports.DIMS_FOOTER = {
          participated: '本次参与审核面',
          skipped: '未参与审核面',
          basis: '裁剪依据',
      };
      //# sourceMappingURL=run-reducer.js.map
      return module.exports;
    })();

    /* ── client/RightPane.js ── */
    var m_RightPane = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RightPane = RightPane;
      exports.ActionBar = ActionBar;
      const jsx_runtime_1 = require("react/jsx-runtime");
      /**
       * 山海·开铺 · 场地插件 · 右栏 = **运行视图 / 报告**
       * =====================================================================
       * 契约 `sse-events.json` 的 renderRules 就是这一栏的验收标准，逐条落点写在这里：
       *
       *   [R2] 按「**第 N 轮**」**分段**（不合并成一条流水）—— 回炉必须看得见
       *   [R3] 四类判定可区分且可见（实底徽标，见 theme.ts）
       *   [R4] ★ dims 裁剪后，尾部**固定**显示「本次参与审核面 / 未参与审核面 / 裁剪依据」，
       *        且**不得做成可折叠的次要信息**。
       *        ★ 2026-10-05 起本栏**允许折叠**（"一页预览"：折轮次过程），
       *          但**那两块口径永远不进折叠** —— 判据沿它们的**祖先链**断言
       *          "不在任何 details 里"（对准契约原文）。
       *          ⚠️ 原注释写的是"整栏没有折叠控件"，那是**比契约更严**的自我约束，
       *             会把一个正当需求挡在门外 ⇒ 已按原文改写。
       *   [R5] 断开 = 「**已停止接收**」，不写「已取消」
       *
       * ★ 另一条来自契约的"不许做的事"：`usage` 是**唯一可信计费口径**，
       *   这一栏**只显示**它，不做任何二次计算（不"估算"、不"按 token 折算"）。
       */
      const react_1 = require("react");
      const kaipu_contract_1 = m_index;
      const copy_js_1 = m_copy;
      const ErrorSurface_js_1 = m_ErrorSurface;
      const data_js_1 = m_data;
      const run_reducer_js_1 = m_run_reducer;
      const theme_js_1 = m_theme;
      function RightPane({ scene, run, sourceLabel, isMock, onStop, onStart, running, runError, signed, errorCode, onFireError, onClearError, onGoShop, lead, leftHidden, fill, focusSeq, onFocusConsumed, }) {
          // ★ 空态也要能回答"去哪儿挑场景" ⇒ 把原因带下去
          if (scene === null)
              return (0, jsx_runtime_1.jsx)(NoScenePicked, { lead: lead, leftHidden: leftHidden });
          // ★ 一个执行方都没有 ⇒ 这不是错误，是"场地本来就是空的"这一**正常状态**
          //   （零内置执行方也能把场地跑起来）。措辞要让用户知道接下来做什么，而不是以为坏了。
          const inbound = scene.lamps.filter((l) => l.agentId !== null).length;
          return (
          // `overflowWrap` 兜底：面板可能被挂进很窄的挂载点，长 ID / 长英文串要有地方断
          (0, jsx_runtime_1.jsxs)("div", { style: { padding: 14, overflowWrap: 'break-word' }, children: [(0, jsx_runtime_1.jsx)(Header, { scene: scene, run: run, onStop: onStop }), isMock && sourceLabel !== null && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 10, fontSize: theme_js_1.FS.small, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsx)(Badge, { bg: "#6b7280", children: sourceLabel }), (0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.dim }, children: [' ', "\u2014\u2014 \u9762\u677F\u5C1A\u672A\u63A5\u5165\u670D\u52A1\u7AEF\uFF1B\u4E0B\u9762\u6BCF\u6761\u5224\u5B9A\u90FD\u6765\u81EA\u672C\u5730\u6F14\u793A\u5E8F\u5217\uFF0C\u4E0D\u662F\u771F\u5B9E\u8FD0\u884C\u7ED3\u679C\u3002"] })] })), !signed && (0, jsx_runtime_1.jsx)(UnsignedBanner, {}), errorCode !== null && ((0, jsx_runtime_1.jsx)(ErrorSurface_js_1.ErrorSurface, { code: errorCode, detail: (0, data_js_1.errorDetailOf)(errorCode), onDismiss: onClearError })), inbound === 0 && (0, jsx_runtime_1.jsx)(ZeroInbound, { scene: scene }), run.status === 'stopped' && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 12, fontSize: theme_js_1.FS.base, color: '#b45309', lineHeight: theme_js_1.LH.normal }, children: run_reducer_js_1.STOPPED_EXPLAIN })), runError !== null && ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-run-error": "1", style: {
                          marginTop: 12,
                          padding: '10px 12px',
                          border: '1px solid #fca5a5',
                          borderLeft: '3px solid #dc2626',
                          background: 'rgba(220,38,38,0.05)',
                          fontSize: theme_js_1.FS.base,
                          lineHeight: theme_js_1.LH.normal,
                      }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: '#dc2626' }, children: "\u8FD9\u6B21\u8FD0\u884C\u6CA1\u80FD\u8DD1\u8D77\u6765\u3002" }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 3 }, children: ["\u670D\u52A1\u7AEF\u7684\u8BF4\u660E\uFF1A", runError] })] })), run.status === 'idle' && (onStart !== null && !isMock
                      ? ((0, jsx_runtime_1.jsx)(StartRunForm, { onStart: onStart, running: running, sceneLabel: scene.label, noneInbound: inbound === 0, onGoShop: onGoShop, fill: fill, focusSeq: focusSeq, onFocusConsumed: onFocusConsumed }))
                      : (0, jsx_runtime_1.jsx)(Note, { children: "\u8BE5\u573A\u666F\u5C1A\u672A\u8FD0\u884C\u3002" })), run.errors.length > 0 && (0, jsx_runtime_1.jsx)(RunErrorsBlock, { errors: run.errors }), run.rounds.map((r) => ((0, jsx_runtime_1.jsx)(RoundBlock, { round: r }, r.round))), run.summary !== null && (0, jsx_runtime_1.jsx)(SummaryBlock, { summary: run.summary, finishReason: run.finishReason }), run.usage !== null && (0, jsx_runtime_1.jsx)(UsageBlock, { usage: run.usage }), (0, jsx_runtime_1.jsx)(SeatChangeBlock, { records: (0, data_js_1.seatChangesOf)(scene.scene) }), isMock && (0, jsx_runtime_1.jsx)(DemoErrorHarness, { active: errorCode, onFire: onFireError })] }));
      }
      /* ─────────────────── 发起运行（真服务端路径）─────────────────── */
      /**
       * 往上找**真正在滚动**的那个容器。
       *
       * ★ 为什么"往上找"而不是拿某个写死的 ref：主滚动容器属于装配层
       *   （`PlatformPanel` 里那块 `overflowY: 'auto'`），发起区自己够不着；
       *   写死 ref 就要把 ref 一路传下来，多一层套管就多一处会断的地方。
       * ★ 判据是"`overflowY` 可滚 **且** scrollHeight 真超出 clientHeight" ——
       *   只看 `overflow` 会挑出一个"样式写着能滚、其实内容没超"的祖先，滚了等于没滚。
       */
      function nearestScroller(el) {
          let p = el.parentElement;
          while (p !== null) {
              const oy = getComputedStyle(p).overflowY;
              if ((oy === 'auto' || oy === 'scroll') && p.scrollHeight > p.clientHeight + 1)
                  return p;
              p = p.parentElement;
          }
          return null;
      }
      /** 让 `el` 在容器 `box` 里**居中**所需的 scrollTop */
      function centerTop(box, el) {
          const b = box.getBoundingClientRect();
          const e = el.getBoundingClientRect();
          // ★ 元素比容器还高时"居中"没意义（上下沿都在视野外）⇒ 退回到"顶对齐"，至少头在这里
          const delta = e.height >= b.height ? e.top - b.top : e.top - b.top - (b.height - e.height) / 2;
          return Math.max(0, Math.min(box.scrollHeight - box.clientHeight, box.scrollTop + delta));
      }
      /**
       * ★★ 平滑滚到 `want`，并**只在"没起步"时**补一次瞬移 —— 返回兜底定时器句柄。
       *
       * ══════════════════════════════════════════════════════════════════
       * ★★ 为什么兜底判据是"**位置变没变**"，不是"**到没到目标**"
       * ══════════════════════════════════════════════════════════════════
       * 两种判据都写着"400ms 后补一枪"，但语义完全不同：
       *
       *   · 「**没到目标**就补」⇒ 用户在这 400ms 里**自己滚了**，就把他**拽回**目标位置。
       *     它在 `101`（跨页切过来居中）那个场景没问题 —— 刚切页，用户不可能同时在自己滚。
       *   · 「**没起步**就补」⇒ 只有当"滚动位置与发起时**一模一样**"才补。
       *     那说明平滑那一路**压根没起步**（本仓老账：**页面不可见时平滑滚动是空操作，且不报错**）；
       *     只要位置动过一点（无论去的是目标还是用户自己的方向）就不插手。
       *
       * ⇒ 本函数现在也服务于「**点开某一轮**」这种**高频、用户正在读**的场景（`104`）：
       *   那里"抢用户滚动"的代价大得多（他可能正滚着往下看第 2 轮）。
       *   ⇒ 统一用"没起步就补"，两处都受益；`101` 原来的语义**被这条严格覆盖**（它那边同样满足）。
       *
       * ★ `onSettle` 在两种结局后都会回调（"已经到位"与"补完瞬移"）—— 调用方据此消费一次性信号。
       */
      function smoothScrollTo(box, want, onSettle) {
          const start = box.scrollTop;
          if (Math.abs(want - start) <= 1) {
              onSettle?.();
              return null;
          }
          box.scrollTo({ top: want, behavior: 'smooth' });
          return window.setTimeout(() => {
              if (Math.abs(box.scrollTop - start) <= 1)
                  box.scrollTop = want;
              onSettle?.();
          }, 400);
      }
      /**
       * ★★ 「展开之后把被展开的东西落到视野中央」的**门控阈值**（`104`）。
       *
       * 语义：**只有当"展开后确有内容在视野外（> 这个像素数）"才滚**；否则一动不动。
       *
       * ★★ 为什么必须有门控（实测反例，不是洁癖）：
       *   同一轮次块，容器 `scrollTop=268` 时它**只差 13px 就全看得见**，
       *   而"居中"要跳 **220px** —— **用户点一下，页面猛挪，什么都没多看到**。
       *   ★ 要害是：**居中要跳的距离与"你还有多少看不见"无关**（另一个样本：差 108px 却跳 315px）。
       *   ★ 它与 `100` 里给"自动收缩"判**不做**的那条代价同族（位置不稳定 ⇒ 想再点第二次得重新找），
       *     只是量级更大（那边 347px，这边最大 817px）。
       *
       * ★ 取值 24px ≈ 半行中文（`FS.base` 14 × 行高 1.8 ≈ 25）——
       *   "差半行以上才算真看不见"，差半行以内不值得动页面。
       */
      const EXPAND_CENTER_MIN_HIDDEN = 24;
      /**
       * 「上一次点击 summary」的**有效期**（毫秒）—— 窗口内到来的 `toggle` 才算"用户点的"。
       *
       * ★ 取值 300ms 的依据：点击与 `toggle` 派发之间是**同一轮任务队列**（浏览器在默认动作
       *   改变 `open` 后排队派发），实测在几十毫秒内 ⇒ 300ms 余量充足。
       * ★ 取太长的代价：把"用户上一下点过的残留"当成这一次（误滚）；
       *   取太短的代价：`toggle` 还没派发到、窗口就过期了（该滚的没滚）。
       *   两头都不好，所以取"远大于实际间隔、远小于人的下一次动作"。
       */
      const USER_CLICK_WINDOW_MS = 300;
      /**
       * ★ 为什么"发起运行"要有输入框，而不是一个按钮直接跑：
       *   契约 §3.4 的 `content` 是**待审内容** —— 没有它，这一场审的就是空。
       *   给一个能填的表单是**诚实**的；给一个直接跑的按钮会把
       *   "我们没内容可审" 伪装成 "场地在正常工作"（**看起来是对的**，最坏的一类）。
       *
       * ★ 按钮的禁用判据：`content` 为空 ⇒ 禁用。**不替用户编一段占位内容**。
       */
      function StartRunForm({ onStart, running, sceneLabel, noneInbound, fill, onGoShop, focusSeq, onFocusConsumed, }) {
          const [target, setTarget] = (0, react_1.useState)('');
          const [content, setContent] = (0, react_1.useState)('');
          const ready = content.trim() !== '' && !running;
          const boxRef = (0, react_1.useRef)(null);
          /** 居中滚动的兜底定时器（★ 为什么不放 effect cleanup —— 见下面那段注释） */
          const scrollTimer = (0, react_1.useRef)(null);
          /**
           * ★★ 从铺子资料填入待审内容 —— 依赖的是 `seq`（**事件**），不是 `text`（**值**）。
           *
           * 为什么必须这样：用户可能连着两次用**同一份**文件 —— 文本逐字没变，
           * 若拿文本当依赖，第二次就不会触发，而用户会觉得"点了没反应"。
           *
           * ★ 只写 `content`，**不碰 `target`**：`target` 是"这一场审的是什么"的名字，
           *   由用户自己起；文件名未必等于他想给这一场起的名字，
           *   顺手覆盖它 = 替他做了一个他没做的决定。
           */
          (0, react_1.useEffect)(() => {
              if (fill === null)
                  return;
              setContent(fill.text);
          }, [fill]);
          /**
           * ★★ 从铺子资料点「开始运行」过来 ⇒ 把自己滚到**视野正中间**（2026-10-08 · 101）。
           *
           * 为什么必须滚：这一栏上面压着「这场谁来审 / 要过哪几面」那一整块，
           *   发起区常常在第一屏之外 ⇒ 只切页签，人到了却看不见它（"点了没反应"体感）。
           *
           * ★★ 为什么**不是** `scrollIntoView`：它会连带滚动**外层窗口**（宿主页面），
           *   把宿主自己的布局也拽动 —— 这一层不该碰别人的滚动位置。
           *   ⇒ 只动**自己那个**滚动容器的 `scrollTop`（`nearestScroller` 认出来的）。
           *
           * ★★ 延时兜底这条路径**不能用 effect 自己的 cleanup 收** —— 那是个坑：
           *   消费信号会改 `focusSeq` ⇒ effect 重跑 ⇒ cleanup 先执行 ⇒ **把兜底定时器当场掐掉**
           *   （只剩平滑那一路，而它恰恰是可能一动不动的那一路）。
           *   ⇒ 定时器存 ref，只在**本组件真的卸载**时清（下面那个空依赖的 effect）。
           *   ★ 滚动本身走共用的 `smoothScrollTo`（`104` 起两处共用，兜底判据统一为"**没起步**就补"）。
           */
          (0, react_1.useEffect)(() => {
              if (focusSeq === 0)
                  return;
              const el = boxRef.current;
              const box = el === null ? null : nearestScroller(el);
              // 没有可滚的容器 ⇒ 它本来就在视野里，没有"目标位"可去；信号照样算已消费
              if (el === null || box === null) {
                  onFocusConsumed();
                  return;
              }
              scrollTimer.current = smoothScrollTo(box, centerTop(box, el), onFocusConsumed);
          }, [focusSeq, onFocusConsumed]);
          /** 卸载时把还没落的定时器收掉（★ 只收卸载这一次，不参与上面那条链路） */
          (0, react_1.useEffect)(() => () => {
              if (scrollTimer.current !== null)
                  window.clearTimeout(scrollTimer.current);
          }, []);
          const inputStyle = {
              width: '100%',
              boxSizing: 'border-box',
              fontSize: theme_js_1.FS.small,
              fontFamily: 'inherit',
              padding: '6px 8px',
              border: `1px solid ${theme_js_1.C.border}`,
              borderRadius: 4,
              background: 'transparent',
              color: 'inherit',
              resize: 'vertical',
          };
          return ((0, jsx_runtime_1.jsxs)("section", { ref: boxRef, "data-kaipu-start": "1", style: { marginTop: 14 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: "\u8BE5\u573A\u666F\u5C1A\u672A\u8FD0\u884C\u3002\u586B\u597D\u8981\u5BA1\u7684\u4E1C\u897F\uFF0C\u518D\u53D1\u8D77 \u2014\u2014 \u8DD1\u8D77\u6765\u540E\u8FD9\u91CC\u4F1A\u9010\u4E2A\u5BA1\u6838\u9762\u663E\u793A\u8FDB\u5C55\u3002" }), fill !== null && ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-fill-card": "1", style: {
                          marginTop: 10,
                          padding: '10px 12px',
                          border: `1px solid ${theme_js_1.C.border}`,
                          borderRadius: 6,
                          background: theme_js_1.C.soft,
                          textAlign: 'center',
                      }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u5DF2\u4ECE\u94FA\u5B50\u8D44\u6599\u5E26\u5165\u5F85\u5BA1\u5185\u5BB9" }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 3, fontSize: theme_js_1.FS.base, color: theme_js_1.C.text, wordBreak: 'break-all' }, children: fill.name }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 4, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, maxHeight: 46, overflow: 'hidden', lineHeight: theme_js_1.LH.normal }, children: fill.text.length > 120 ? `${fill.text.slice(0, 120)}…` : fill.text })] })), noneInbound && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 8, fontSize: theme_js_1.FS.small, color: '#b45309', lineHeight: theme_js_1.LH.normal }, children: "\u8FD9\u4E00\u573A\u7684\u5BA1\u6838\u9762\u76EE\u524D\u90FD\u8FD8\u6CA1\u6709\u63A5\u5165\u6267\u884C\u65B9\u3002\u73B0\u5728\u4E5F\u80FD\u53D1\u8D77\uFF0C\u4F46\u7ED3\u8BBA\u5927\u6982\u7387\u662F\u300C\u672A\u63A5\u5165\u300D\uFF08\u4E0D\u662F\u6545\u969C\uFF09\u3002" })), (0, jsx_runtime_1.jsxs)("label", { style: { display: 'block', marginTop: 10, fontSize: theme_js_1.FS.small }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u5BA1\u7684\u662F\u4EC0\u4E48\uFF08\u9009\u586B\uFF09" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: target, onChange: (e) => setTarget(e.target.value), placeholder: "\u4F8B\uFF1AXX \u65B9\u6848\u4E66 v3", style: { ...inputStyle, marginTop: 4 } })] }), (0, jsx_runtime_1.jsxs)("label", { style: { display: 'block', marginTop: 8, fontSize: theme_js_1.FS.small }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u5F85\u5BA1\u5185\u5BB9\uFF08\u5FC5\u586B\uFF09" }), (0, jsx_runtime_1.jsx)("textarea", { value: content, onChange: (e) => setContent(e.target.value), rows: 6, placeholder: `粘进来就行。这一场会用「${sceneLabel}」的流程来审。`, style: { ...inputStyle, marginTop: 4, lineHeight: theme_js_1.LH.normal } })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginTop: 8 }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", disabled: !ready, 
                              // ★ 防连点第二道：真跑着就绝不再发（第一个属性 disabled 是视觉层，
                              //   这里才是行为层 —— `disabled` 在合成事件重入 / 程序化 .click() 时
                              //   不保证拦截；重复发起 = 两路 SSE 抢同一视图 + 服务端 503）
                              onClick: () => {
                                  if (running)
                                      return;
                                  onStart({ target: target.trim(), content });
                              }, style: {
                                  fontSize: theme_js_1.FS.small,
                                  padding: '5px 14px',
                                  border: `1px solid ${ready ? '#c69a3c' : theme_js_1.C.border}`,
                                  borderRadius: 4,
                                  background: ready ? '#c69a3c' : 'transparent',
                                  color: ready ? '#2b1d00' : theme_js_1.C.dim,
                                  fontWeight: ready ? 600 : 400,
                                  cursor: ready ? 'pointer' : 'not-allowed',
                                  font: 'inherit',
                              }, children: running ? '质检进行中…' : '开始运行' }), (0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-goshop": "1", onClick: onGoShop, style: {
                                  fontSize: theme_js_1.FS.small,
                                  padding: '5px 14px',
                                  border: `1px solid ${theme_js_1.C.border}`,
                                  borderRadius: 4,
                                  background: 'transparent',
                                  color: theme_js_1.C.dim,
                                  cursor: 'pointer',
                                  font: 'inherit',
                              }, children: "\u94FA\u5B50\u8D44\u6599" }), !ready && !running && content.trim() === '' && ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: "\u8BF7\u5148\u586B\u5199\u5F85\u5BA1\u5185\u5BB9" }))] })] }));
      }
      /* ─────────────────────── 还没选场景 ─────────────────────── */
      /**
       * ★ 空态**不给一句"从左侧选一个场景"就完事** ——
       *   那时用户还不知道"场景"是什么、选了会怎样。
       *   空态是唯一"用户一定会停在这里想一下"的位置，所以把三句话放在这最划算。
       */
      function NoScenePicked({ lead, leftHidden, }) {
          // ★ 有 lead ⇒ 说明"没场景"是**外部原因**（正在读 / 读不到），先如实说清它
          if (lead !== null) {
              return (0, jsx_runtime_1.jsx)("div", { style: { padding: 20, fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.loose }, children: lead });
          }
          /**
           * ★★ 指引必须**指得着**（2026-10-05 修；2026-10-08 再修一次）。
           *
           * 原来写死"先从左边挑一场「场景」"—— 但左栏可能**被用户收起**、或被窄容器**挤掉**，
           * 那两种情况下左边**什么都没有**：用户照着做只会扑空，
           * 然后怀疑是自己不会用（**界面说了不成立的话，比不说更糟**）。
           * ★ 三种情况**出路不同**，所以必须分开说：
           *   · 可见     ⇒ 指左栏
           *   · 用户收起 ⇒ 指顶部那条分隔线上的把手（它在）
           *   · 容器太窄 ⇒ 指顶部那条「场景」折叠条（它在）
           *
           * ★★ 改的那一条（`'narrow'`）：原文是「把窗口拉宽一些」——
           *   那是把**功能缺失说成用户限制**：窄屏下用户本来就该能干活，
           *   让他去拉窗口 = 承认"这儿你用不了"。
           *   ⇒ 现在窄屏有 `NarrowScenePicker` 兜着，指引就**指得着**了。
           *   ★ 顺带说清一个容易误判的点：这条文案**在窄屏下几乎不会出现** ——
           *     `selected` 会自动选中第一场，`scene !== null` ⇒ 走不到空态。
           *     它是"场景列表为空 / 切数据源的一瞬"的兜底。但**兜底文案也必须是真的**：
           *     写一句"去拉宽窗口"，在真出现的那一次就是**假话**。
           *
           * `data-kaipu-lead` 是判据锚点：让"指引与左栏状态一致"这件事**可被断言**。
           */
          const guide = leftHidden === null
              ? '先从左边挑一场「场景」'
              : leftHidden === 'collapsed'
                  ? '点顶部的「展开场景栏」，再挑一场「场景」'
                  : '窗口太窄放不下场景栏 —— 点顶部的「场景」，再挑一场';
          return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: 20, fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.loose }, children: [(0, jsx_runtime_1.jsx)("div", { "data-kaipu-gist": "1", style: { fontSize: theme_js_1.FS.heading, lineHeight: theme_js_1.LH.normal }, children: "\u9009\u4E00\u573A\uFF0C\u628A\u4F60\u624B\u5934\u7684\u4E1C\u897F\u653E\u8FDB\u6765\u5BA1\u4E00\u5BA1\u3002\u5BA1\u5B8C\u7ED9\u4F60\u4E00\u4EFD\u5E26\u7B7E\u7684\u62A5\u544A\u3002" }), (0, jsx_runtime_1.jsx)("div", { "data-kaipu-lead": leftHidden ?? 'visible', style: { marginTop: 10, color: theme_js_1.C.dim }, children: guide })] }));
      }
      /* ─────────────────────── 约束 ①：未签名 ───────────────────────
       *
       * ★★ 改版：**红框 → 暖金提示框**。
       *
       * 旧版是 `border/左边线` 全红 + 红字，形如「报错台」；而"未签名"只是
       * **还没接入签名服务**这一正常态，不是故障。⇒ 视觉改暖金（左侧线 + 米色底），
       * 文案改「预告」语气（见 `copy.ts` 的 `unsignedReport*` 注释）。
       * 约束义务**没丢**：仍醒目显示"当前还不能对外出具"，只是不再像在指责用户。
       * ★ 配色走固定暖金色（不随宿主主题变量）：与旧版红框同策略——
       *   锚点 `data-kaipu-unsigned="1"` 保留，探针可继续认。
       */
      function UnsignedBanner() {
          return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-unsigned": "1", style: {
                  marginTop: 12,
                  padding: '10px 12px',
                  border: '1px solid #d8b863',
                  borderLeft: '4px solid #c69a3c',
                  background: 'rgba(214,180,92,0.12)',
              }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.base, fontWeight: 600, color: '#9c7a2e' }, children: copy_js_1.CONSTRAINTS.unsignedReport }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 4, lineHeight: theme_js_1.LH.normal }, children: copy_js_1.CONSTRAINTS.unsignedReportWhy })] }));
      }
      /* ─────────────── 流内 error（契约 §3.4 · 2026-10-06 补 · B 组）─────────────── */
      /**
       * 流内 `error` 事件。
       *
       * ★★ 它长成这样，是被"**它与请求失败不是一回事**"决定的：
       *   · 请求失败（HTTP 层）⇒ 运行**没跑起来** ⇒ `ErrorSurface`：**可关闭**的提示
       *   · 流内 `error`        ⇒ 运行**跑起来了**   ⇒ **不可关闭**（它不是提示，是记录）
       *   ⇒ 所以这里**没有「知道了」按钮**，也**不打断**下面的轮次与结论 ——
       *     那是 `ErrorSurface` 的职责，不是这条的。
       *
       * ★ 文案来源两条路（**都不直出裸码**）：
       *   ① `code` 在 §8.2 表里 ⇒ 用**契约译法**（口径统一）
       *   ② 未收录 ⇒ 显示**服务端原话** ＋ 标记「未收录」
       *      ★ **不自己补一条文案**：§8.2 由对方维护 —— 缺口**要报，不单方补**。
       *      ★ 裸码只进 `data-kaipu-*` 属性（给判据），**不进可见文本**（同 `ErrorSurface` 的纪律）。
       */
      function RunErrorsBlock({ errors }) {
          return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-run-errors": errors.length, style: {
                  marginTop: 12,
                  padding: '10px 12px',
                  border: `1px solid ${theme_js_1.C.border}`,
                  borderLeft: '3px solid #b45309',
                  background: 'rgba(180,83,9,0.05)',
              }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: '#b45309', lineHeight: theme_js_1.LH.normal }, children: ["\u8FD0\u884C\u4E2D\u6536\u5230\u670D\u52A1\u7AEF\u7684 ", errors.length, " \u6761\u9519\u8BEF\u3002\u8FD9\u6B21\u8FD0\u884C\u4ECD\u5728\u7EE7\u7EED \u2014\u2014 \u9519\u8BEF\u662F\u8FC7\u7A0B\u8BB0\u5F55\uFF0C\u4E0D\u4EE3\u8868\u5B83\u4E2D\u65AD\u4E86\u3002"] }), errors.map((e, i) => {
                      const known = (0, kaipu_contract_1.hasUiText)(e.code);
                      const text = known
                          ? (0, kaipu_contract_1.translateError)(e.code)
                          : e.message !== ''
                              ? e.message
                              : '服务端报告了一条错误，但没有给出说明。';
                      return ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsx)("span", { children: text }), !known && ((0, jsx_runtime_1.jsx)("span", { "data-kaipu-unlisted-code": e.code, style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginLeft: 6 }, children: "\uFF08\u8FD9\u6761\u7684\u8BF4\u660E\u8FD8\u6CA1\u6536\u5F55\uFF0C\u5DF2\u6309\u670D\u52A1\u7AEF\u539F\u8BDD\u663E\u793A\uFF1B\u6211\u65B9\u4F1A\u62A5\u7ED9\u5BF9\u65B9\u8865\uFF0C\u4E0D\u81EA\u884C\u4EE3\u5199\uFF09" }))] }, `${e.code}\u0000${i}`));
                  })] }));
      }
      /* ─────────────────── 约束 ②：角色位变更留痕 ─────────────────── */
      function SeatChangeBlock({ records }) {
          return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-seatlog": "1", style: { marginTop: 18, borderTop: `1px solid ${theme_js_1.C.border}`, paddingTop: 12 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title }, children: copy_js_1.CONSTRAINTS.seatChangeTitle }), records.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 6 }, children: copy_js_1.CONSTRAINTS.seatChangeEmpty })) : ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 8 }, children: records.map((r) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                              fontSize: theme_js_1.FS.small,
                              lineHeight: theme_js_1.LH.normal,
                              borderLeft: `1px solid ${theme_js_1.C.border}`,
                              paddingLeft: 10,
                              marginBottom: 6,
                          }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: r.at }), " \u00B7 ", r.seat, "\uFF1A", r.from, " \u2192 ", (0, jsx_runtime_1.jsx)("strong", { children: r.to })] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.dim }, children: ["\u539F\u56E0\uFF1A", r.reason, " \u00B7 \u64CD\u4F5C\uFF1A", r.by] })] }, `${r.seat}|${r.at}`))) }))] }));
      }
      /* ─────────────── 演示脚手：错误码全走一遍 ─────────────── */
      /**
       * ★ 这是**演示脚手**，不是产品界面 —— 所以它只在 `sourceLabel !== null`（mock 模式）时出现。
       *
       * 为什么需要它：Step 7 要证明的是「14 条码都接到了**真实渲染路径**上」，
       *   而不是"文案表里写了 14 条"。一个能逐个触发、并让判据逐条断言的入口，
       *   比"我读了一遍表"强得多 —— 后者无法被证伪。
       *
       * ★★ 2026-10-05 收进 `<details>`（默认**收起**）：
       *   它自己写着"产品界面里没有这一块"，却在演示态占了 **181px**（实测，全栏第二高）——
       *   一块**非产品**的调试入口比正片还显眼，是"信息量太大"里最不该占位的那个。
       *   收起来以后：想复现错误路径的人点一下就能用，不想看的人**永远不用看见它**。
       *   ★ 判据不受影响：收起时按钮仍在 DOM 里（且 `copy-probe` 的 `fire()` 会**先展开**再点，
       *     见该文件）—— 但"能点到"这件事**必须由探针自己保证**，不能指望巧合约等于可见。
       */
      function DemoErrorHarness({ active, onFire }) {
          return ((0, jsx_runtime_1.jsxs)("details", { "data-kaipu-harness": "1", style: { marginTop: 20, borderTop: `1px dashed ${theme_js_1.C.border}`, paddingTop: 10 }, children: [(0, jsx_runtime_1.jsxs)("summary", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, cursor: 'pointer', lineHeight: theme_js_1.LH.normal }, children: ["\u6F14\u793A\u811A\u624B \u00B7 \u9519\u8BEF\u8DEF\u5F84\uFF08", kaipu_contract_1.ERROR_CODES.length, " \u6761\u7801 \u00B7 \u70B9\u5F00\u9010\u4E2A\u89E6\u53D1\uFF1B\u4EA7\u54C1\u754C\u9762\u91CC\u6CA1\u6709\u8FD9\u4E00\u5757\uFF09"] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }, children: kaipu_contract_1.ERROR_CODES.map((e) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": active === e.code, onClick: () => onFire(e.code), style: {
                              fontSize: theme_js_1.FS.tag,
                              fontFamily: theme_js_1.FONT.mono,
                              padding: '3px 7px',
                              border: `1px solid ${theme_js_1.C.border}`,
                              borderRadius: 3,
                              background: active === e.code ? theme_js_1.C.soft : 'transparent',
                              color: 'inherit',
                              cursor: 'pointer',
                          }, children: e.code }, e.code))) })] }));
      }
      /* ───────────────────────────── 头部 ───────────────────────────── */
      function Header({ scene, run, onStop }) {
          return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.heading }, children: scene.label }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint }, children: ["v", scene.version] }), run.requestId !== null && ((0, jsx_runtime_1.jsx)("span", { "data-kaipu-request-id": "1", title: run.requestId, style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, fontFamily: theme_js_1.FONT.mono }, children: shortId(run.requestId) })), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: run_reducer_js_1.STATUS_TEXT[run.status] }), run.summary !== null && (0, jsx_runtime_1.jsx)(VerdictBadge, { verdict: run.summary.verdict }), run.status === 'running' && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onStop, style: ghostButton, children: "\u505C\u6B62\u63A5\u6536" }))] }));
      }
      /**
       * 长 ID 的缩略显示（请求号 · 审计号）。
       *
       * ★ 只缩**长到影响阅读的**（UUID = 36 字符），短 ID（`req-mock-0001`）原样显示 ——
       *   对所有 ID 一律截断反而会让人认不出它是什么。
       * ★ 全值挂在 `title` 上 ⇒ **信息没丢，只是不在第一眼占位**。
       *   （"缩略显示"与"删掉"的区别就在这里，别滑过去。）
       */
      function shortId(id) {
          return id.length <= 20 ? id : `${id.slice(0, 8)}…`;
      }
      /* ─────────────────── 行动带（A1 · 2026-10-17）─────────────────── */
      /**
       * ★★★ 右栏行动带 —— **分状态**告诉用户"现在该做什么"。
       *
       * ── 为什么它必须存在（2026-10-17 实测出来的缺口）────────────────────────────
       *   `PlatformPanel` 在 `selected` 失效时会**自动回落到第一场**（那个 `useEffect`，
       *   PlatformPanel.tsx:289）⇒ **只要列表非空，`NoScenePicked` 空态几乎永远不显示**
       *   ⇒ 那段已定案的空态文案「选一场，把你手头的东西放进来审一审」事实上**被架空了**。
       *   用户真正看到的第一屏是：场景名 + 一大块配置 + 未签名提示 + 未接入说明，
       *   **却没有一句指向"下一步"**。这一带就是补这一句。
       *
       * ── 分支规则（**只说真话，不编进度**）──────────────────────────────────────
       * | 状态 | 显示 |
       * |:--|:--|
       * | `idle` + 可发起 | 「已选：{场景}。粘贴待审内容，或从铺子资料带入。」+ 定位按钮 |
       * | `idle` + 演示模式 | 「选择场景，查看演示过程。」（**不挂定位按钮** ——
       *   演示模式没有真实发起表单，按了是假入口） |
       * | `running` | 「正在运行，下面逐轮更新。」（**不给进度条/百分比/剩余时间**） |
       * | `stopped` | 「已停止接收」+ 指路下方已有结论（若有） |
       * | `summary` 到达 | 追加「查看本次结论 ↓」按钮 |
       * | 异常 | **不覆盖**上列任何一条 —— 下面的 `runError` / `ErrorSurface` 原文照出 |
       *
       * ★ 为什么 `summary` 之前**不挂**结论按钮：那时还没有结论，挂一个点不动的按钮
       *   比不挂更糟（同"禁用态只靠颜色"的问题）。
       *
       * ── 定位怎么做的 ───────────────────────────────────────────────────────────
       *   复用本文件既有的 `nearestScroller` + `smoothScrollTo`（StartRunForm 与
       *   `expandAndCenter` 两处同款），**只滚面板自己的滚动容器**。
       *   ★ 不用 `scrollIntoView`：它会连带滚动宿主页面，把别人的布局也拽动（踩过）。
       *   ★ 滚完**移键盘焦点**到目标标题：只用鼠标点完，用户 Tab 一下会跳回别处。
       */
      function ActionBar({ run, scene, isMock, canStart, leftHidden, queryRootRef, }) {
          /** 两个定位目标：表单在 `data-kaipu-start`，结论块在 `data-kaipu-summary` */
          const jumpTo = (0, react_1.useCallback)((anchor) => {
              const sel = anchor === 'start' ? '[data-kaipu-start]' : '[data-kaipu-summary]';
              // ★ 只在本面板容器内查；没有容器 / 没有目标 ⇒ 什么都不做（**不跨实例兜底**）
              const scope = queryRootRef?.current ?? null;
              if (scope === null)
                  return;
              const host = scope.querySelector(sel);
              if (host === null)
                  return;
              const box = nearestScroller(host);
              // 没有可滚容器 ⇒ 它本来就在视野里，没有"目标位"可去（与 StartRunForm 同款判据）
              if (box !== null)
                  smoothScrollTo(box, centerTop(box, host));
              // 焦点跟随：只用鼠标点完，Tab 会跳回别处 ⇒ 把焦点落在目标上
              if (!host.hasAttribute('tabindex'))
                  host.setAttribute('tabindex', '-1');
              host.focus({ preventScroll: true });
          }, [queryRootRef]);
          const idle = run.status === 'idle';
          const running = run.status === 'running';
          const stopped = run.status === 'stopped';
          /**
           * ★★ `done` 必须显式覆盖（2026-10-17 实测补漏）。
           *
           * `RunStatus` 是**四值**：`idle | running | stopped | done`（见 `run-reducer.ts`）。
           * 第一版只写了前三个 ⇒ **跑完之后行动带只剩一个「查看本次结论 ↓」按钮、没有一句主体文案**，
           * 看起来像"话被吞了"。这是实测点开一次运行才发现的 —— 光看代码很容易漏。
           */
          const done = run.status === 'done';
          const hasSummary = run.summary !== null;
          // 没有可指认的状态 ⇒ 不渲染这一带（不做"其实没有"的空壳）
          if (!idle && !running && !stopped && !done && !hasSummary)
              return null;
          // 没有场景 ⇒ 没有"已选 X"可说（此时右栏本身在走空态，这一带不出来抢话）
          if (scene === null)
              return null;
          const sceneName = scene.label;
          /**
           * ★★ 「换一场去哪」**按三态各指各的**（2026-10-17 · Codex 验收 P2 订正）。
           *
           * `nearestScroller` / 上面那套只负责滚动；这里负责**指路是否指得着**：
           *   · `null`      ⇒ 左栏在场，什么都不用说（就在左边）
           *   · `collapsed` ⇒ 左栏是**用户自己收起的**，出口是**侧边那条把手**（宽屏**没有**顶部折叠条）
           *   · `narrow`    ⇒ 容器太窄、左栏压根不渲染，出口才是**顶部折叠条**
           * ★ 第一版把后两者合并、一律写"点顶部的「场景」" ⇒ 宽屏收起时**指路指空**。
           *   与 `NoScenePicked.guide` 保持同一口径（那里早就分了三态，这里当时没跟上）。
           */
          const switchHint = leftHidden === null
              ? null
              : leftHidden === 'collapsed'
                  ? '换一场：点左侧那条「展开场景栏」的把手。'
                  : '换一场：点顶部的「场景」。';
          return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-actionbar": "1", style: {
                  margin: '0 14px',
                  padding: '8px 11px',
                  border: `1px solid ${theme_js_1.C.border}`,
                  borderLeft: `3px solid ${running ? '#d97706' : theme_js_1.C.accent}`,
                  background: theme_js_1.C.soft,
                  fontSize: theme_js_1.FS.small,
                  lineHeight: theme_js_1.LH.normal,
              }, children: [idle && ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.text }, children: canStart ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u5DF2\u9009\uFF1A", (0, jsx_runtime_1.jsx)("b", { children: sceneName }), "\u3002\u7C98\u8D34\u5F85\u5BA1\u5185\u5BB9\uFF0C\u6216\u4ECE\u94FA\u5B50\u8D44\u6599\u5E26\u5165\u3002", switchHint !== null && (0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.dim }, children: ["\u3000", switchHint] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u5DF2\u9009\uFF1A", (0, jsx_runtime_1.jsx)("b", { children: sceneName }), "\u3002\u9009\u62E9\u573A\u666F\uFF0C\u67E5\u770B\u6F14\u793A\u8FC7\u7A0B\u3002"] })) })), running && ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.text }, children: "\u6B63\u5728\u8FD0\u884C\u3002\u4E0B\u9762\u6309\u300C\u7B2C N \u8F6E\u300D\u9010\u8F6E\u66F4\u65B0 \u2014\u2014 \u73B0\u5728\u8BFB\u5230\u7684\u90FD\u662F\u5DF2\u53D1\u751F\u7684\u4E8B\u3002" })), stopped && ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.text }, children: "\u5DF2\u505C\u6B62\u63A5\u6536\u3002\u670D\u52A1\u7AEF\u4ECD\u5728\u628A\u5B83\u7B97\u5B8C \u2014\u2014 \u4E0B\u9762\u5DF2\u6709\u7684\u8F6E\u6B21\u4E0E\u7ED3\u8BBA\u4ECD\u7136\u4F5C\u6570\u3002" })), done && !stopped && ((0, jsx_runtime_1.jsxs)("div", { style: { color: theme_js_1.C.text }, children: ["\u8FD9\u4E00\u8D9F\u8DD1\u5B8C\u4E86\u3002\u5F80\u4E0B\u770B", (0, jsx_runtime_1.jsx)("b", { children: "\u672C\u6B21\u7ED3\u8BBA" }), " \u2014\u2014 \u7279\u522B\u7559\u610F\u300C\u672A\u53C2\u4E0E\u5BA1\u6838\u9762\u300D\u90A3\u4E00\u680F\u3002"] })), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 10px', marginTop: 6 }, children: [idle && canStart && ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-jump-fill": "1", onClick: () => jumpTo('start'), style: {
                                  fontSize: theme_js_1.FS.small,
                                  padding: '3px 10px',
                                  border: `1px solid ${theme_js_1.C.border}`,
                                  borderRadius: 4,
                                  background: 'transparent',
                                  color: theme_js_1.C.accent,
                                  cursor: 'pointer',
                                  font: 'inherit',
                              }, children: "\u586B\u5199\u5F85\u5BA1\u5185\u5BB9 \u2193" })), hasSummary && ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-jump-summary": "1", onClick: () => jumpTo('summary'), style: {
                                  fontSize: theme_js_1.FS.small,
                                  padding: '3px 10px',
                                  border: `1px solid ${theme_js_1.C.border}`,
                                  borderRadius: 4,
                                  background: 'transparent',
                                  color: theme_js_1.C.accent,
                                  cursor: 'pointer',
                                  font: 'inherit',
                              }, children: "\u67E5\u770B\u672C\u6B21\u7ED3\u8BBA \u2193" }))] })] }));
      }
      /* ─────────────────── 空场（用户可见面）─────────────────── */
      function ZeroInbound({ scene }) {
          return ((0, jsx_runtime_1.jsx)("div", { style: {
                  marginTop: 12,
                  padding: '11px 13px',
                  border: `1px solid ${theme_js_1.C.border}`,
                  borderLeft: '3px solid #d97706',
                  fontSize: theme_js_1.FS.base,
                  lineHeight: theme_js_1.LH.normal,
              }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsxs)("span", { children: ["\u8BE5\u573A\u666F\u7684 ", scene.lamps.length, " \u4E2A\u5BA1\u6838\u9762\u5168\u90E8\u5F85\u63A5\u5165\u6267\u884C\u65B9\u3002"] }), (0, jsx_runtime_1.jsx)("span", { title: "\u8FD9\u4E0D\u662F\u6545\u969C\uFF1A\u573A\u5730\u4E0D\u5185\u7F6E\u4EFB\u4F55\u300C\u5FC5\u987B\u6709\u7684\u300D\u6267\u884C\u65B9\u3002\u63A5\u5165\u6267\u884C\u65B9\u540E\u672C\u573A\u666F\u5373\u53EF\u8FD0\u884C\uFF1B\u5728\u6B64\u4E4B\u524D\uFF0C\u573A\u5730\u672C\u8EAB\u4ECD\u7136\u53EF\u7528\uFF08\u53EF\u67E5\u770B\u3001\u53EF\u914D\u7F6E\uFF09\u3002", "aria-label": "\u4E3A\u4EC0\u4E48\u4E0D\u662F\u6545\u969C", style: {
                              fontSize: theme_js_1.FS.tag,
                              color: theme_js_1.C.dim,
                              cursor: 'help',
                              borderBottom: `1px dotted ${theme_js_1.C.dim}`,
                          }, children: "?" })] }) }));
      }
      /* ───────── B 组「运行事实」**不在这里**（2026-10-06）─────────
       *
       * 本文件渲染的整块 DOM 就是 `data-kaipu-run` —— 运行视图的**判据边界**
       * （见 `PlatformPanel` 的注释）。而 B 组是**新增的展示内容**。
       *
       * ⇒ 那节口径：「**新增锚点必须在 `data-kaipu-run` 之外**（`data-kaipu-process`）」
       *   ⇒ 它渲染在 `PlatformPanel.tsx` 的 `ProcessFacts`，**物理落在运行视图之外**。
       *
       * ★ 为什么不靠"读文本时排除"（那是我方第一版做法，已废弃）：
       *   排除是**减法**，减法只在"探针记得减"时成立 —— 换一个人写判据、或换一个探针，
       *   污染立刻回来。**先隔离，再展示**（回函原文）说的就是别把正确性押在判据的自律上。
       */
      /* ─────────────────────── 逐轮分段（R2）─────────────────────── */
      /**
       * 逐轮分段（R2）。
       *
       * ★★ 折叠的**边界**（为"一页预览"加的，逐条对应契约）：
       *
       *   折进去的：**每个维度的过程内容**（`lamp_delta` 流式文本 + `detail` + 耗时行）
       *   留在外面的：**轮次号 · reason（回炉原因）· 本轮判定 · 各审核面判定缩略**
       *
       *   为什么这样切 —— 契约有两条硬约束，折错了就违约：
       *     · **R2**「回炉**必须看得见**」⇒ 折起来后 `第 2 轮 · ⚡有条件回炉` 仍在标题行上，看得见；
       *     · **R3**「四类判定**可区分且可见**」⇒ 判定徽标与**各审核面判定缩略**都留在标题行，
       *       折起来也一眼看出"谁过了谁没过"。**把判定折进去 = 让人必须点开才知道结论 = 不可见。**
       *
       *   ★ `<details>` **非受控**（不传 `open`）—— 两个原因：
       *     ① 默认折叠（"一页预览"）；
       *     ② React 不管 `open` ⇒ 用户手动展开后，事件继续到达、组件重渲染**不会把它弹回去**。
       *        （若做成受控，每来一个 SSE 事件就会把用户展开的那一节重新折上，那是灾难。
       *         同理，探针里 `d.open = true` 设上去就保持，不会被 React 重置。）
       */
      function RoundBlock({ round }) {
          /** 各审核面判定的**缩略串** —— 折起来也要能一眼看出这一轮的结论分布 */
          const decided = round.lamps.filter((l) => l.verdict !== null);
          /**
           * ★★ **默认展开，但保持"非受控"**（2026-10-06「A 组默认展开」）
           *
           * 为什么**不能**直接写 `<details open>`：
           *   React 会把 `open` 当**受控属性**、**每次渲染都设回去** ⇒ 用户（或探针）
           *   把它折上之后，**下一个 SSE 事件到达就被重新弹开**。
           *   本组件每 ≈300ms 就随轮询增量重渲染一次 ⇒ 症状会非常明显（折不动）。
           *
           * 用 ref + **空依赖** useEffect ⇒ 只在**挂载那一瞬**设一次，之后交给浏览器管：
           *   · 新出现的轮次 ⇒ 默认可见（这就是 A 组的诉求）
           *   · 用户折上 ⇒ **留得住**（重渲染不弹回）
           *   · 探针 `collapseAll()` 仍能把它折上 ⇒「折叠边界」那组断言照旧成立
           *     （其中「折起来时判定仍可见」是 R3 的关键落点，不能因此失效）
           */
          const ref = (0, react_1.useRef)(null);
          /**
           * ★★ 「这一下是人点的」的时间戳 —— `toggle` 回调据此判断该不该滚（见 `onToggle` 守则 ②）。
           *   `0` = 从没点过 ⇒ 任何程序化开合都不会被当成用户操作。
           */
          const clickedAt = (0, react_1.useRef)(0);
          /** 展开后居中的兜底定时器（同 `StartRunForm`：存 ref、只在卸载时清） */
          const scrollTimer = (0, react_1.useRef)(null);
          (0, react_1.useEffect)(() => {
              const el = ref.current;
              if (el !== null)
                  el.open = true;
          }, []);
          /**
           * ★★ 「点开这一轮 ⇒ 把它落到视野中间」（2026-10-08 · 104 落地）。
           *
           * ══════════════════════════════════════════════════════════════════
           * 它修的是什么（实测，不是观感）
           * ══════════════════════════════════════════════════════════════════
           *   一轮展开态 315px / 折叠态 43px ⇒ 展开出来 **+272px**。
           *   而用户往往是**在这一轮标题停在容器底部时**点开它
           *   （实测起始 `scrollTop=0` 时块有 **281px 在视野外，全在下边**）
           *   ⇒ **展开出来的内容一个像素都看不见**，且现状 `scrollTop 0 → 0`（一动不动）。
           *
           * ══════════════════════════════════════════════════════════════════
           * ★★ 三条守则（每条都对着一个会出事的场景）
           * ══════════════════════════════════════════════════════════════════
           *   ① **折叠不滚**：折叠是内容变少，不会造成"看不见"；这时滚反而把用户推离他正在读的位置。
           *   ② ★★ **只有"用户点的"才滚** —— 见下面 `clickedAt` 那段的理由（这条最要紧）。
           *   ③ ★★ **门控**：块已经基本在视野里（视野外 ≤ `EXPAND_CENTER_MIN_HIDDEN`）就一动不动。
           *      理由见那个常量的注释（实测反例：只差 13px 却要跳 220px）。
           */
          const onToggle = (e) => {
              const el = e.currentTarget;
              if (!el.open)
                  return; // ①
              if (Date.now() - clickedAt.current > USER_CLICK_WINDOW_MS)
                  return; // ②
              const box = nearestScroller(el);
              if (box === null)
                  return;
              const b = box.getBoundingClientRect();
              const r = el.getBoundingClientRect();
              const hidden = Math.max(0, b.top - r.top) + Math.max(0, r.bottom - b.bottom);
              if (hidden <= EXPAND_CENTER_MIN_HIDDEN)
                  return; // ③
              scrollTimer.current = smoothScrollTo(box, centerTop(box, el));
          };
          /** 卸载时把还没落的兜底定时器收掉（与 `StartRunForm` 同款做法） */
          (0, react_1.useEffect)(() => () => {
              if (scrollTimer.current !== null)
                  window.clearTimeout(scrollTimer.current);
          }, []);
          return ((0, jsx_runtime_1.jsxs)("details", { ref: ref, "data-kaipu-round": round.round, onToggle: onToggle, style: { marginTop: 14, borderTop: `1px solid ${theme_js_1.C.border}`, paddingTop: 6 }, children: [(0, jsx_runtime_1.jsxs)("summary", { onClick: () => { clickedAt.current = Date.now(); }, style: { cursor: 'pointer', padding: '2px 0', lineHeight: theme_js_1.LH.loose }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.title }, children: ["\u7B2C ", round.round, " \u8F6E"] }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginLeft: 10 }, children: round.reason }), round.verdict !== null && (0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 10 }, children: (0, jsx_runtime_1.jsx)(VerdictBadge, { verdict: round.verdict }) }), round.degraded && ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: '#b45309', marginLeft: 10 }, children: "\uFF08\u672A\u6536\u5230\u8F6E\u6B21\u5F00\u59CB\u4E8B\u4EF6\uFF0C\u6309\u4E8B\u4EF6\u81EA\u5E26 round \u515C\u5E95\u5206\u7EC4\uFF09" })), decided.length > 0 && ((0, jsx_runtime_1.jsx)("span", { "data-kaipu-round-verdicts": "1", style: { fontSize: theme_js_1.FS.tag, marginLeft: 10 }, children: decided.map((l, i) => ((0, jsx_runtime_1.jsxs)("span", { children: [i > 0 && (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.faint }, children: " \u00B7 " }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.faint }, children: l.lamp }), ' ', (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.text, fontWeight: 600 }, children: l.verdict ?? '' })] }, l.lamp))) }))] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, borderLeft: `1px solid ${theme_js_1.C.border}`, paddingLeft: 12 }, children: round.lamps.map((l) => ((0, jsx_runtime_1.jsx)(LampRow, { lamp: l }, `${round.round}\u0000${l.lamp}`))) })] }));
      }
      function LampRow({ lamp }) {
          // ★ `agent === null` ⇒ 该维度尚未接入执行方 ⇒ 必须显「待接入」（一等公民）
          const pending = lamp.agent === null;
          // ★★ 2026-11-09 阿开拍板（乙案配套）：三态必须分得开，不许把「正在干活」画成「没接入」
          //   · pending                         ⇒ 真·待接入（没人接这盏灯）
          //   · started && verdict===null        ⇒ **正在深度核查**（灯在干活，还没答完）
          //   · verdict!==null                   ⇒ 已有结论
          //   为什么必须有第三态：文灯用 deepseek-v4-pro 跑完整 rubric 需 **222.4 秒**（实测）。
          //   阿开定「宁可慢一点，不能假一点」⇒ 超时提到 600s、**不换 Flash**；
          //   但等 3-4 分钟必须让用户看见原因，否则客户以为系统卡死。
          const running = !pending && lamp.started && lamp.verdict === null;
          return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '7px 0' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.base }, children: lamp.lamp }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: pending ? '#d97706' : theme_js_1.C.dim }, children: pending ? '待接入' : lamp.agent }), running && ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: '#3B6FE0' }, children: "\u6B63\u5728\u6DF1\u5EA6\u6838\u67E5\u5408\u89C4\u98CE\u9669\uFF0C\u9884\u8BA1\u9700\u8981 2-3 \u5206\u949F\uFF0C\u8BF7\u7A0D\u5019\u2026" })), lamp.verdict !== null && (0, jsx_runtime_1.jsx)(VerdictBadge, { verdict: lamp.verdict }), lamp.latencyMs !== null && (
                          // ★ 耗时是"元信息"⇒ 用最淡一档（faint）：它要能查到，但**不该和维度名抢注意力**
                          (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, fontFamily: theme_js_1.FONT.mono, marginLeft: 'auto' }, children: [lamp.latencyMs, " ms"] }))] }), lamp.lines.length > 0 && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 3, lineHeight: theme_js_1.LH.normal }, children: lamp.lines.join(' ') })), lamp.detail !== '' && (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.base, marginTop: 3, lineHeight: theme_js_1.LH.normal }, children: lamp.detail })] }));
      }
      /* ───────────── 报告体：审核面口径（R4）+ 用量 ───────────── */
      function SummaryBlock({ summary, finishReason }) {
          return (
          // ★★ `data-kaipu-summary`（2026-10-17 · Codex 提案 §6 方案B）：行动带「查看本次结论 ↓」
          //   的滚动目标。★ **不是**复用 `data-kaipu-gist` —— 那个锚点在 `NoScenePicked`
          //   空态里（"选一场，把你手头的东西…"），拿它当目标会跳到空态而不是结论。
          //   落点选**块的根**而非内层，滚到块首比滚到内层某行好读。
          (0, jsx_runtime_1.jsxs)("section", { "data-kaipu-summary": "1", style: { marginTop: 18, borderTop: `1px solid ${theme_js_1.C.border}`, paddingTop: 12 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.title }, children: "\u672C\u6B21\u7ED3\u8BBA" }), (0, jsx_runtime_1.jsx)(VerdictBadge, { verdict: summary.verdict }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim }, children: ["\u5171 ", summary.round, " \u8F6E \u00B7 ", finishReason ?? '—'] })] }), summary.conditions.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, marginTop: 6 }, children: ["\u9644\u52A0\u6761\u4EF6\uFF1A", summary.conditions.join('；')] })), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 12, padding: '10px 12px', background: theme_js_1.C.soft, fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.loose }, children: summary.dimsReported ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(DimLine, { label: run_reducer_js_1.DIMS_FOOTER.participated, items: summary.participatedDims }), (0, jsx_runtime_1.jsx)(DimLine, { label: run_reducer_js_1.DIMS_FOOTER.skipped, items: summary.skippedDims, tone: "#b45309" }), (0, jsx_runtime_1.jsx)(DimLine, { label: run_reducer_js_1.DIMS_FOOTER.basis, items: ['dim / run_when 裁剪（请求方指定，客户端不推断）'] })] })) : ((0, jsx_runtime_1.jsx)("div", { "data-kaipu-dims-missing": "1", style: { color: '#b45309' }, children: "\u670D\u52A1\u7AEF\u8FD9\u6B21\u6CA1\u6709\u7ED9\u5BA1\u6838\u9762\u4FE1\u606F\uFF0C\u56E0\u6B64\u300C\u672A\u53C2\u4E0E\u5BA1\u6838\u9762\u300D\u65E0\u4ECE\u5224\u65AD\u3002 \u8FD9\u4EFD\u7ED3\u8BBA\u4E0D\u8DB3\u4EE5\u8BF4\u660E\u300C\u8BE5\u5BA1\u7684\u90FD\u5BA1\u4E86\u300D\u2014\u2014 \u8BF7\u4EE5\u670D\u52A1\u7AEF\u62A5\u544A\u4E3A\u51C6\u3002" })) })] }));
      }
      function DimLine({ label, items, tone }) {
          return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 10 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, minWidth: 94, flex: '0 0 auto' }, children: label }), (0, jsx_runtime_1.jsx)("span", { style: { color: tone ?? theme_js_1.C.text, minWidth: 0, overflowWrap: 'break-word' }, children: items.length === 0 ? '（无）' : items.join('、') })] }));
      }
      function UsageBlock({ usage }) {
          return ((0, jsx_runtime_1.jsxs)("section", { style: { marginTop: 14, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, fontFamily: theme_js_1.FONT.mono }, children: [(0, jsx_runtime_1.jsxs)("div", { children: ["tokens ", usage.tokensIn, " in / ", usage.tokensOut, " out \u00B7 credits ", usage.credits, " \u00B7 balance", ' ', usage.balanceAfter === null ? '未提供' : usage.balanceAfter] }), usage.note !== null && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 3, fontFamily: 'inherit', color: theme_js_1.C.dim }, children: usage.note }))] }));
      }
      /* ─────────────────────────── 小件 ─────────────────────────── */
      function VerdictBadge({ verdict }) {
          const tone = (0, run_reducer_js_1.toneOf)(verdict);
          return (0, jsx_runtime_1.jsx)(Badge, { bg: tone === null ? '#6b7280' : theme_js_1.TONE_BG[tone], children: verdict });
      }
      function Badge({ children, bg }) {
          return ((0, jsx_runtime_1.jsx)("span", { style: {
                  display: 'inline-block',
                  padding: '1px 7px',
                  borderRadius: 3,
                  background: bg,
                  color: '#fff',
                  fontSize: theme_js_1.FS.tag,
                  lineHeight: '18px',
                  whiteSpace: 'nowrap',
              }, children: children }));
      }
      function Note({ children }) {
          return ((0, jsx_runtime_1.jsx)("div", { style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 160,
                  color: theme_js_1.C.dim,
                  fontSize: theme_js_1.FS.base,
              }, children: children }));
      }
      const ghostButton = {
          marginLeft: 'auto',
          fontSize: theme_js_1.FS.small,
          padding: '4px 12px',
          border: `1px solid ${theme_js_1.C.border}`,
          borderRadius: 4,
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer',
          font: 'inherit',
      };
      //# sourceMappingURL=RightPane.js.map
      return module.exports;
    })();

    /* ── client/ShopShelf.js ── */
    var m_ShopShelf = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ShopShelf = ShopShelf;
      const jsx_runtime_1 = require("react/jsx-runtime");
      /**
       * 山海·开铺 · 场地插件 · client half —— **铺子资料**（本机目录）
       * =====================================================================
       * 用户自己的资料放在哪儿、放进去了什么、怎么拿出来用 —— 这一块只回答这三个问题。
       *
       * ══════════════════════════════════════════════════════════════════
       * ★★ 为什么它**自取数据**，不从面板快照那条链上拿
       * ══════════════════════════════════════════════════════════════════
       * 它读写的是**本机目录**，与"接没接上服务端"毫无关系。
       * 若把它挂到快照链上，就会出现最荒唐的一种状态：
       *   **未接入服务端 ⇒ 连自己的文件都看不见了**。
       * ⇒ 它自己经 `currentConnection()` 调 host（与本仓 `run.ts` 同款做法），
       *   自成一体：服务端挂了、演示模式下，它**照常工作**。
       *
       * ══════════════════════════════════════════════════════════════════
       * ★★ 为什么把「数据根路径」摆在界面上
       * ══════════════════════════════════════════════════════════════════
       * 用户有权知道自己的东西存在哪里 —— 能自己去打开、去备份、去拷走。
       * "我们知道但不告诉你"是这一层最不该有的姿态。
       * ⇒ 路径以小字常驻，配一个「复制」。
       *
       * ══════════════════════════════════════════════════════════════════
       * ★★ 拖放的**两处** `preventDefault` 都是必须的（少一处就废）
       * ══════════════════════════════════════════════════════════════════
       *   · `onDragOver` 不拦 ⇒ 浏览器**不认这是落点**，`drop` 根本不触发；
       *   · `onDrop`     不拦 ⇒ 浏览器会「导航到该文件」，**整个页面被换掉**。
       * 两者症状完全不同，但都会被当成"拖放没做"。写在这里省下一次排查。
       */
      const react_1 = require("react");
      const kaipu_contract_1 = m_index;
      const bridge_js_1 = m_bridge;
      const live_js_1 = m_live;
      const theme_js_1 = m_theme;
      /* ─────────────────────── 小工具 ─────────────────────── */
      function fmtSize(n) {
          if (n < 1024)
              return `${String(n)} B`;
          if (n < 1024 * 1024)
              return `${(n / 1024).toFixed(1)} KB`;
          return `${(n / 1024 / 1024).toFixed(1)} MB`;
      }
      function fmtTime(ms) {
          const d = new Date(ms);
          const p = (x) => String(x).padStart(2, '0');
          return `${String(d.getFullYear())}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
      }
      /**
       * `ArrayBuffer` → base64。
       * ★ 分块拼串：`String.fromCharCode(...bytes)` 一次摊开几 MB 会**爆栈**
       *   （`Maximum call stack size exceeded`）—— 而拖进来的文件经常不止几百 KB。
       */
      function toBase64(buf) {
          const bytes = new Uint8Array(buf);
          const CHUNK = 0x8000;
          let bin = '';
          for (let i = 0; i < bytes.length; i += CHUNK) {
              bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
          }
          return btoa(bin);
      }
      /**
       * ★★ 三个抽屉**一次性全列**（一次调用拿全部，不是三次往返）：
       *   抽屉只有三个，用户一眼看完比"点一下等一次"强。
       */
      function ShopShelf({ onFill, onGoRun, open, onToggleOpen, }) {
          const [payload, setPayload] = (0, react_1.useState)(null);
          /** 读失败的原因（★ 与"读到了但是空的"必须分开表达） */
          const [loadErr, setLoadErr] = (0, react_1.useState)(null);
          /** 正在做什么（上传/删除/读取时的提示）。`null` = 空闲 */
          const [busy, setBusy] = (0, react_1.useState)(null);
          /** 本次动作的结果提示（成功与失败都往这里写，**如实说**） */
          const [note, setNote] = (0, react_1.useState)(null);
          /** 当前被拖到哪个抽屉上方（高亮用） */
          const [over, setOver] = (0, react_1.useState)(null);
          /** 「开始运行」按钮的悬停态（inline style 写不了 `:hover`，用它换色） */
          const [runHover, setRunHover] = (0, react_1.useState)(false);
          /* ★ 折叠状态**不在这里** —— 它由装配层持有（见 ShopShelfProps.open 的注释）。
             这里只留"正在忙什么/提示什么"这类**本块私有**的状态。 */
          const reload = (0, react_1.useCallback)(async () => {
              const conn = (0, live_js_1.currentConnection)();
              if (conn === null) {
                  setLoadErr('没取到宿主的数据通道，这一块暂时读不了。这是环境问题，不是文件坏了。');
                  return;
              }
              const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.listShopFiles, {});
              if (r.ok === true) {
                  setPayload(r.data);
                  setLoadErr(null);
              }
              else {
                  setLoadErr('business' in r ? r.business.message : r.error.detail);
              }
          }, []);
          (0, react_1.useEffect)(() => {
              void reload();
          }, [reload]);
          /**
           * 打开系统文件管理器（2026-10-06）。
           *
           * ★ 本机操作，与"接没接上服务端"无关 —— 未接入时它**照常可用**
           *   （与这一层其它能力同一条口径：没接入服务端从来不是"自己不能用"的理由）。
           *
           * ★★ 措辞是「**已请**系统打开」，**不是「已打开」** —— host 只回"已发起"，
           *   文件管理器窗口是否真的弹出，这一层无法确证。
           *   说"已打开"就是在陈述一件没被验证的事。
           *
           * ★ 打不开时**降级到「复制」那条路**，并把原因如实说出来 ——
           *   用户永远留着"自己拿路径去资源管理器打开"的出路，不会卡死在这儿。
           */
          const openDir = (0, react_1.useCallback)(async () => {
              const conn = (0, live_js_1.currentConnection)();
              if (conn === null) {
                  setNote('这个环境打不开文件管理器（没取到宿主通道）—— 用「复制」把路径粘到资源管理器里打开即可。');
                  return;
              }
              setNote(null);
              const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.openShopDir, {});
              if (r.ok === true) {
                  setNote(`已请系统打开：${r.data.path}`);
              }
              else {
                  const why = 'business' in r ? r.business.message : r.error.detail;
                  setNote(`打不开文件管理器（${why}）—— 用「复制」把路径粘到资源管理器里打开即可。`);
              }
          }, []);
          /* ── 放进文件 ── */
          const put = (0, react_1.useCallback)(async (sub, list) => {
              const conn = (0, live_js_1.currentConnection)();
              if (conn === null || list === null || list.length === 0)
                  return;
              const picked = Array.from(list);
              setBusy(`正在放进「${sub}」（${String(picked.length)} 个）…`);
              setNote(null);
              try {
                  const files = [];
                  for (const f of picked) {
                      // ★ 逐个读，读完才发一次请求 —— 请求体是**一元**的（一次调用一次响应）
                      files.push({ name: f.name, base64: toBase64(await f.arrayBuffer()) });
                  }
                  const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.writeShopFiles, { sub, files });
                  if (r.ok === true) {
                      const { written, failed } = r.data;
                      const okPart = written.length > 0 ? `放进去了 ${String(written.length)} 个` : '';
                      // ★ 失败的**逐个列出来**（含原因），不折成"部分成功"一句空话
                      const badPart = failed.map((f) => `${f.name}：${f.error}`).join('；');
                      setNote([okPart, badPart].filter((s) => s !== '').join(' ｜ ') || '没有文件被放进');
                  }
                  else {
                      setNote(`没能放进去：${'business' in r ? r.business.message : r.error.detail}`);
                  }
              }
              catch (e) {
                  setNote(`没能放进去：${e instanceof Error ? e.message : String(e)}`);
              }
              finally {
                  setBusy(null);
                  setOver(null);
                  await reload();
              }
          }, [reload]);
          /* ── 删除 ── */
          const drop = (0, react_1.useCallback)(async (sub, name) => {
              const conn = (0, live_js_1.currentConnection)();
              if (conn === null)
                  return;
              setBusy(`正在删除 ${name}…`);
              setNote(null);
              try {
                  const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.removeShopFile, { sub, name });
                  setNote(r.ok === true ? `已删除 ${name}` : `没删掉：${'business' in r ? r.business.message : r.error.detail}`);
              }
              finally {
                  setBusy(null);
                  await reload();
              }
          }, [reload]);
          /* ── 读成文本（填入待审内容） ── */
          const pick = (0, react_1.useCallback)(async (sub, name) => {
              const conn = (0, live_js_1.currentConnection)();
              if (conn === null || onFill === null)
                  return;
              setBusy(`正在读 ${name}…`);
              setNote(null);
              try {
                  const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.readShopTextFile, { sub, name });
                  if (r.ok === true) {
                      onFill(r.data.text, name);
                      setNote(r.data.truncated
                          ? `已填入待审内容（★ 这份文件较大，只读回了前 ${fmtSize(r.data.text.length)} —— 完整文件仍在抽屉里）`
                          : `已填入待审内容（${fmtSize(r.data.size)}）`);
                  }
                  else {
                      setNote('business' in r ? r.business.message : r.error.detail);
                  }
              }
              finally {
                  setBusy(null);
              }
          }, [onFill]);
          const files = payload?.files ?? [];
          const bySub = (sub) => files.filter((f) => f.sub === sub);
          /* ── 读不到时：**如实说**，且不摆出"空抽屉"的样子骗人 ── */
          if (loadErr !== null) {
              return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-shop": "1", style: { marginTop: 16, padding: '0 14px', fontSize: theme_js_1.FS.small, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.dim }, children: "\u94FA\u5B50\u8D44\u6599" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 4, color: '#b45309' }, children: ["\u8FD9\u4E00\u5757\u6682\u65F6\u8BFB\u4E0D\u4E86\uFF1A", loadErr] })] }));
          }
          return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-shop": "1", style: { marginTop: 16, padding: '0 14px', fontSize: theme_js_1.FS.small, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 8 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u94FA\u5B50\u8D44\u6599" }), (0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-shop-toggle": "1", "aria-label": open ? '收起铺子资料' : '展开铺子资料', "aria-expanded": open, onClick: onToggleOpen, style: {
                                  marginLeft: 'auto',
                                  fontSize: theme_js_1.FS.small,
                                  padding: '1px 8px',
                                  border: `1px solid ${theme_js_1.C.border}`,
                                  borderRadius: 4,
                                  background: 'transparent',
                                  color: theme_js_1.C.dim,
                                  cursor: 'pointer',
                                  font: 'inherit',
                              }, children: open ? '收起' : '展开' })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 4, color: theme_js_1.C.text }, children: "\u8FD9\u4E09\u4E2A\u62BD\u5C49\u5C31\u662F\u300C\u4F60\u81EA\u5DF1\u7684\u8D44\u6599\u300D\u2014\u2014\u5B83\u4EEC\u5B58\u5728\u672C\u673A\uFF0C\u4E0D\u968F\u63D2\u4EF6\u88C5\u5378\u800C\u6D88\u5931\u3002" }), onGoRun !== null && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u4E1C\u897F\u653E\u597D\u4E86\u5C31\uFF1A" }), (0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-shop-run": "1", onClick: onGoRun, onMouseEnter: () => setRunHover(true), onMouseLeave: () => setRunHover(false), style: {
                                  fontSize: theme_js_1.FS.small,
                                  padding: '4px 14px',
                                  borderRadius: 6,
                                  // ★★ 暖金「灯火」用色 —— **与 SeatLampPanel 的「点亮第一盏灯」逐字同一套**
                                  //   （`#C8881F` 描边 / `rgba(200,136,31,0.12)` 底 / `#A66A12` 字，见 `DESIGN.md` §5）。
                                  //   ★ 为什么不另调一个色：同一个面板里"暖金"已经锚定为**可以开始做事**的意思，
                                  //     再造一个相近色只会让人以为它们是两种状态（本项目踩过："同一件事两处各说各话"）。
                                  //   ★ 为什么加个 `▸`：这一页有三个抽屉、一行说明、一串小按钮，
                                  //     纯文字按钮在这一堆里**没有落点**；一个随开始/停止语境通用的三角
                                  //     足以让人一眼看到"这一步是往前走的"，又不至于像彩色大按钮那样抢戏。
                                  border: `1px solid ${runHover ? '#A66A12' : '#C8881F'}`,
                                  background: runHover ? 'rgba(200,136,31,0.20)' : 'rgba(200,136,31,0.12)',
                                  color: '#A66A12',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap',
                                  transition: 'background 120ms ease, border-color 120ms ease',
                                  // ⚠️⚠️ `font` 是**简写属性**，会把上面写好的 `fontSize` / `fontWeight`
                                  //   **一并重置**。本项目原来把它写在字号字重**之后** ⇒ 那两行全部失效
                                  //   （2026-10-08 用 CDP 读 computed style 当场读到 `fontWeight: 400`，
                                  //     而代码里写的是 600 —— 光看代码永远发现不了）。
                                  //   ⇒ 简写放**最后**，再补上想加的覆盖。
                                  font: 'inherit',
                                  fontWeight: 600,
                              }, children: "\u25B8 \u5F00\u59CB\u8FD0\u884C" }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\uFF08\u56DE\u5230\u64CD\u4F5C\u53F0\uFF0C\u53D1\u8D77\u533A\u4F1A\u5728\u6B63\u4E2D\u95F4\uFF09" })] })), !open ? null : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [payload !== null && payload.root !== '' && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 4, color: theme_js_1.C.dim, wordBreak: 'break-all' }, children: ["\u5B58\u5728\u672C\u673A\uFF1A", payload.root, (0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-shop-opendir": "1", onClick: () => {
                                          void openDir();
                                      }, style: {
                                          marginLeft: 6,
                                          fontSize: theme_js_1.FS.small,
                                          padding: '0 6px',
                                          border: `1px solid ${theme_js_1.C.border}`,
                                          borderRadius: 4,
                                          background: 'transparent',
                                          color: theme_js_1.C.text,
                                          cursor: 'pointer',
                                          font: 'inherit',
                                          whiteSpace: 'nowrap',
                                      }, children: "\u6253\u5F00\u76EE\u5F55" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                          void navigator.clipboard?.writeText(payload.root);
                                          setNote('路径已复制');
                                      }, style: {
                                          marginLeft: 4,
                                          fontSize: theme_js_1.FS.small,
                                          padding: '0 6px',
                                          border: `1px solid ${theme_js_1.C.border}`,
                                          borderRadius: 4,
                                          background: 'transparent',
                                          color: theme_js_1.C.dim,
                                          cursor: 'pointer',
                                          font: 'inherit',
                                          whiteSpace: 'nowrap',
                                      }, children: "\u590D\u5236" })] })), payload?.unavailable !== undefined && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 4, color: '#b45309' }, children: ["\u6709\u4E00\u5904\u8BFB\u4E0D\u4E86\uFF1A", payload.unavailable] })), busy !== null && (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, color: theme_js_1.C.dim }, children: busy }), note !== null && (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, color: theme_js_1.C.dim }, children: note }), kaipu_contract_1.SHOP_SUBDIRS.map((sub) => {
                              const rows = bySub(sub);
                              const hot = over === sub;
                              return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-shop-drawers": sub, 
                                  // ★★ 两处 preventDefault 缺一不可（见文件头）
                                  onDragOver: (e) => {
                                      e.preventDefault();
                                      if (over !== sub)
                                          setOver(sub);
                                  }, onDragLeave: () => {
                                      if (over === sub)
                                          setOver(null);
                                  }, onDrop: (e) => {
                                      e.preventDefault();
                                      void put(sub, e.dataTransfer?.files ?? null);
                                  }, style: {
                                      marginTop: 8,
                                      padding: '8px 10px',
                                      border: `1px ${hot ? 'dashed' : 'solid'} ${hot ? '#2563eb' : theme_js_1.C.border}`,
                                      borderRadius: 4,
                                      background: hot ? 'rgba(37,99,235,0.06)' : 'transparent',
                                  }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("span", { children: sub }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: rows.length > 0 ? `${String(rows.length)} 个` : '' }), (0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 'auto', color: theme_js_1.C.dim }, children: "\u62D6\u6587\u4EF6\u5230\u8FD9\u91CC" })] }), rows.length === 0 && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 3, color: theme_js_1.C.dim }, children: sub === '待审材料'
                                              ? '要审的东西放这儿 —— 拖进来就行。'
                                              : sub === '审校报告'
                                                  ? '这里放审过之后留下的结论。'
                                                  : '断网也照样能写的东西放这儿。' })), rows.map((f) => ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 5, display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { wordBreak: 'break-all' }, children: f.name }), (0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.dim }, children: [fmtSize(f.size), " \u00B7 ", fmtTime(f.mtimeMs)] }), (0, jsx_runtime_1.jsxs)("span", { style: { marginLeft: 'auto', display: 'flex', gap: 4 }, children: [f.readable && onFill !== null && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                                              void pick(f.sub, f.name);
                                                          }, style: {
                                                              fontSize: theme_js_1.FS.small,
                                                              padding: '0 6px',
                                                              border: `1px solid ${theme_js_1.C.border}`,
                                                              borderRadius: 4,
                                                              background: 'transparent',
                                                              color: 'inherit',
                                                              cursor: 'pointer',
                                                              font: 'inherit',
                                                          }, children: "\u586B\u5165\u5F85\u5BA1\u5185\u5BB9" })), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                                              void drop(f.sub, f.name);
                                                          }, style: {
                                                              fontSize: theme_js_1.FS.small,
                                                              padding: '0 6px',
                                                              border: `1px solid ${theme_js_1.C.border}`,
                                                              borderRadius: 4,
                                                              background: 'transparent',
                                                              color: theme_js_1.C.dim,
                                                              cursor: 'pointer',
                                                              font: 'inherit',
                                                          }, children: "\u5220\u9664" })] })] }, f.name)))] }, sub));
                          })] }))] }));
      }
      //# sourceMappingURL=ShopShelf.js.map
      return module.exports;
    })();

    /* ── client/SeatLampPanel.js ── */
    var m_SeatLampPanel = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SeatLampPanel = SeatLampPanel;
      const jsx_runtime_1 = require("react/jsx-runtime");
      /**
       * 山海·开铺 · 场地插件 · 左栏之外的**第二块展示面**：「这场谁来审」+「要过哪几面」
       * =====================================================================
       * 回答两个用户在**发起之前**就该知道的问题：
       *   · **这场谁来审** —— 执行 / 审计 / 管理 / 签名 四个位，当前各自由谁承担；
       *   · **要过哪几面** —— 这场有几个审核面，每个面管什么。
       *
       * ★ 设计稿（位与灯分开画 · v2.1/v2.2 口径）。发起人 2026-10-08 定稿认可。
       *
       * ══════════════════════════════════════════════════════════════════
       * ★★ 为什么这块**必须**长在 `[data-kaipu-run]` **之外**（不是审美，是判据）
       * ══════════════════════════════════════════════════════════════════
       * 探针有一条 R4 断言：「被裁剪的审核面（`仁灯`）在**报告**里可见」——
       * 它读的正是 `[data-kaipu-run]` 区块**内**的文本。
       * 而本块按设计就会列出**全部审核面**（含 `仁灯`）。
       * ⇒ 若把本块塞进运行视图，那条断言会**恒真**：不管报告里有没有仁灯，
       *   它都能在灯栏里找到「仁灯」两个字。**一个不会失败的断言等于没有断言。**
       * ★ 这不是"判据写得不好"，而是**新内容越过了判据边界**。那节口径的原话：
       *   「**先隔离，再展示**」，且「**新增锚点必须在 `data-kaipu-run` 之外**」。
       * ★ 同类先例：`ProcessFacts`（`data-kaipu-process`）与 `Intro` 卡都照此处理。
       *
       * ══════════════════════════════════════════════════════════════════
       * ★ 两个取数口径（**权威源已钉死 = `GET /roles/seats`**）
       * ══════════════════════════════════════════════════════════════════
       *   · **位名**（执行位/审计位/…）：★ 钉死以 `/roles/seats[].label`（租户级配置）为准。
       *     **当前我方不接该端点** —— 因为服务端明确「你不必现在改：
       *     `seatHolders[]` 保留 ⇒ 你现状可不动」，并建议 **v1.6 落地后再新接 `/roles/seats`**。
       *     ⇒ 现在用常量 `SEAT_LABEL` 把 key 译成中文（同义兜底；v1.6 后改为读 `label`）。
       *     ★ **重要实测**：`seatHolders[]` 是**租户级数据在 N 个场景里的 N 份拷贝**，
       *       根本不跟场景走 —— 所以位栏本质是「**本开铺**由谁审」，不是「这场戏谁来审」。
       *   · **承担方名**：一律取 `holderName`（**不硬编码「山海」**）—— 发起人 2026-10-08 明确
       *     「管理位不一定姓山海，可以是**项目主持人**，也可以是**委托方自己**」；
       *     已钉死：**管理位由铺主（委托方）指派**，值域 `builtin/client/none`。
       *     `holderType === 'none'`、或响应里根本没这一位 ⇒ 如实显示「没人 / 未登记」，
       *     **不替它编一个名字**（编了就是编事实）。
       *   · **位行带「可改 / 不可改 / 🔒 锁死」纯展示标签（非控件）**：已确认
       *     **P1 期客户端无自助改入口** —— 所以这只是**把既定政策标出来**（谁有资格改这个位），
       *     **不是**一个可点控件。样式用淡色纯文本（与灯栏「待接入」同款），不画边框、不挂
       *     `cursor:pointer`，避免被读成"这里能改"。政策依据见 `SEAT_EDITABLE` 注释与文件末注释。
       */
      const react_1 = require("react");
      const bridge_js_1 = m_bridge;
      const live_js_1 = m_live;
      const theme_js_1 = m_theme;
      /**
       * ★★ 四个位的**固定顺序与位名** —— 这是本文件里唯一"可能要改"的一处。
       *
       * **为什么用常量而不是"有什么画什么"**：
       *   契约 v1.5 §23.3 说 `seatHolders`「各场景 4 项」，但**万一**某场景少一项，
       *   "少一项"与"这一位没人"是**两件不同的事**（前者是响应缺字段，后者是 `holderType:'none'`）。
       *   ⇒ 以契约的**四席为准**逐位渲染，缺的落「未登记」兜底 ——
       *     两者在界面上**看得出来**，不会糊成一句"没人"。
       *
       * **为什么现在是常量（而不是取 `/roles/seats[].label`）**：
       *   已钉死**权威源 = `GET /roles/seats`**，但同时也明确
       *   「**你不必现在改**：`seatHolders[]` 保留 ⇒ 你现状可不动；等 v1.6 落地后建议新接 `/roles/seats`」。
       *   ⇒ 现在仍用常量译 `seat` key 的位名（同义兜底，因 `seatHolders[]` 无 `label` 字段）。
       *   **将来切换点（唯一一处）**：v1.6 落地后，把 `SEAT_LABEL` 换成从 `/roles/seats[].label` 读，
       *   **行形态一行都不用动**；取数从 `scene.seatHolders` 改为一次拉 `/roles/seats`（租户级、可缓存）。
       *
       * ★ `seat` 取值域（实测四席）来自契约 `seats.json`，不是自编。
       */
      /* ★ 2026-10-23（083 单 G-4 · 星月）：**签名位挪到 1 号位**。
       *   为什么是它排第一：签名是审计流程的**最后一环**，也是整条链的出口 ——
       *   用户在这一排里先看到「签没签」，才明白前面四个位在为什么服务。
       *   ★ 顺序是「流程顺序」，不是「权限大小」，所以不写"级别"含义。 */
      const SEAT_ORDER = ['signature', 'execution', 'audit', 'management'];
      /* ★ 2026-10-23（G-4）：**签名位不进邀请抽屉**。
       *   抽屉干的事是「请个人来坐这个位」；签名位是契约层结构性锁死、
       *   由系统在送审闭环里落章 —— 它出现在「邀请谁」的勾选清单里，
       *   就是「标了锁死却还能邀请」的语义打架（星月原文：语义矛盾）。
       *   ⇒ 抽屉只列可请人的位，签名位不出现；它在位栏里照常显示状态。 */
      const INVITE_SEATS = SEAT_ORDER.filter((s) => s !== 'signature');
      /* ★ 2026-10-23（G-4）：签名位**不单独给按钮** —— 用户只点「申请送审」。
       *   状态只有两种说法：「⛨ 山海已签」/「⛨ 待签」。
       *   为什么不像别的位那样写「未指派」：签名方不是一个"座位上的同事"，
       *   是场地底座，人不需要去指派它，只需要知道「签了 / 还没签」。 */
      function signatureLabel(h) {
          const signed = h !== undefined && h.holderType !== 'none' && h.holderName.trim() !== '';
          return signed ? '⛨ 山海已签' : '⛨ 待签';
      }
      const SEAT_LABEL = {
          execution: '执行位',
          audit: '审计位',
          management: '管理位',
          signature: '签名位',
      };
      /**
       * ★ 每个位「谁有资格改」的既定政策（**纯展示标签用，不控制任何行为**）。
       *
       * 依据：定案「P1 阶段客户**只能改执行位与审计位**，管理位与签名位不可改。」
       *   · 执行位 / 审计位 ⇒ `可改`：这两位在 P1 就是可重派的（由管理位/铺主指派），
       *     标「可改」= 陈述"这个位允许被改"这一事实，**不暗示界面上有按钮**。
       *   · 管理位 ⇒ `不可改`：定案说客户不能自助改；但它**由铺主指派**（已钉死），
       *     本质是"指派给谁"的问题，不是"锁死"——故用「不可改」而非「锁死」。
       *   · 签名位 ⇒ `🔒 锁死`：契约层**结构性不可改**（签名身份是场地底座的硬约束），
       *     不是策略层的"暂不许"，故用「锁死」标其性质。
       *
       * ★ 这三类标签**都是纯文本**（淡色、无边框、无 pointer），刻意**不做成控件** ——
       *   避免"标了可改却点不动"这类界面说了不成立的话。政策若随 v1.6 / P2.5 调整，只改这一个常量。
       */
      const SEAT_EDITABLE = {
          execution: true,
          audit: true,
          management: false,
          signature: false,
      };
      /** 位行右侧的「可改性」标签（纯展示，非控件）。 */
      function editLabelOf(seat) {
          if (SEAT_EDITABLE[seat] === true)
              return '可改';
          return seat === 'signature' ? '🔒 锁死' : '不可改';
      }
      /**
       * ★ 承担方名 —— 三种"没有人"必须**分开说**，不能糊成一句：
       *   · 响应里没这一位     ⇒ 「未登记」（**是数据缺口**，该去问服务端）
       *   · `holderType:'none'` ⇒ 「未指派」（**是事实**：这个位现在没人）
       *   · `none` 但有名字     ⇒ 仍按 `holderType` 判 —— 名字是服务端给的标签，位置状态以类型为准
       *   ★ 空名字（`''`）也归「未指派」：界面上不能出现一个**光秃秃的空格**当人名。
       */
      function holderLabel(h) {
          if (h === undefined)
              return { text: '（未登记）', muted: true };
          if (h.holderType === 'none' || h.holderName.trim() === '')
              return { text: '（未指派）', muted: true };
          return { text: h.holderName, muted: false };
      }
      function SeatLampPanel({ scene }) {
          // ★★ Hooks 必须在 early return **之前**（React 规则：条件返回后不能再挂 hooks）
          // ── 指派已有执行方（能力保留，入口收进邀请抽屉 —— 2026-10-18 发起人裁定）──
          const [editing, setEditing] = (0, react_1.useState)(null);
          const [cands, setCands] = (0, react_1.useState)([]);
          const [busy, setBusy] = (0, react_1.useState)(false);
          const [note, setNote] = (0, react_1.useState)(null);
          // ── ★ 邀请协作方 · **抽屉式**（2026-10-18 · 发起人重画了交互）──────────────
          //   原来是两处入口：行内「可改」按钮（点开=换已有执行方）+ 标题行「＋邀请协作方」
          //   （点开=小表单选灯位）。发起人反馈：行内「可改」点开没意义；他想象中的形态是
          //   —— 点「邀请」→ **抽屉**里把四个位摆出来（位名 + 当前承担方 + 可改性），
          //   **勾选**可改的位 → 生成邀请链接。
          //   ⇒ 按他画的改：行内按钮撤掉（恢复纯文本标签），邀请入口只剩一个，
          //     抽屉里"看位 → 勾位 → 出链接"一条线走完。
          const [inviting, setInviting] = (0, react_1.useState)(false);
          /** 勾选了哪些位（只有 `可改` 的位可勾；默认全勾 —— 打开后一步就能生成） */
          const [picked, setPicked] = (0, react_1.useState)([]);
          const [invNote, setInvNote] = (0, react_1.useState)('');
          const [invBusy, setInvBusy] = (0, react_1.useState)(false);
          const [invErr, setInvErr] = (0, react_1.useState)(null);
          const [invResults, setInvResults] = (0, react_1.useState)([]);
          /**
           * 抽屉里的「生成邀请链接」：对**每个勾选的位**各生成一条一次性链接。
           * ★ `seat` 走勾选值（execution/audit…）；`lamp` 取该场景**第一个待接入**的审核面
           *   （全接入则退第一个）—— 对方 Agent 接进来先补"缺人"的那面，这是最自然的落位。
           * ★ 有效期、一次性消费、码的随机性全在服务端；前端只负责发起与展示。
           */
          const doInvitePicked = (0, react_1.useCallback)(async () => {
              const conn = (0, live_js_1.currentConnection)();
              if (!conn) {
                  setInvErr('还没接上服务端，发不了邀请。');
                  return;
              }
              if (picked.length === 0) {
                  setInvErr('先勾选要请人的位。');
                  return;
              }
              const lamp = scene?.lamps?.find((l) => l.agentId === null)?.lamp ?? scene?.lamps?.[0]?.lamp ?? '';
              if (lamp === '') {
                  setInvErr('这一场还没有可接入的审核面。');
                  return;
              }
              setInvBusy(true);
              setInvErr(null);
              const got = [];
              for (const seat of picked) {
                  const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.createInvite, {
                      lamp,
                      seat,
                      note: invNote,
                      ttlDays: 7,
                  });
                  if (r.ok === true) {
                      got.push({ seat, url: String(r.data.url ?? ''), expiresAt: String(r.data.expiresAt ?? '') });
                  }
                  else {
                      setInvErr('business' in r ? r.business.message : r.error.detail);
                      break;
                  }
              }
              setInvBusy(false);
              if (got.length > 0)
                  setInvResults(got);
          }, [picked, invNote, scene]);
          /**
           * 点「可改」→ 拉可选执行方。
           * ★ 候选来自 `GET /agents`（本铺 + 平台级），**不在前端硬编码** ——
           *   谁有资格当执行方是服务端的事实，不是界面常量。
           */
          const openEditor = (0, react_1.useCallback)(async (seat) => {
              setNote(null);
              setCands([]);
              setEditing((cur) => (cur === seat ? null : seat));
              const conn = (0, live_js_1.currentConnection)();
              if (!conn) {
                  setNote('还没接上服务端，改不了。');
                  return;
              }
              const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.listAgents, {});
              if (r.ok === true) {
                  const list = (r.data.agents ?? [])
                      .filter((a) => typeof a.id === 'string' && a.id !== '')
                      .map((a) => ({ id: String(a.id), name: String(a.name ?? a.id) }));
                  setCands(list);
                  if (list.length === 0)
                      setNote('这个开铺里还没有可以指派的执行方。');
              }
              else {
                  setNote('读不到可选执行方。');
              }
          }, []);
          const doAssign = (0, react_1.useCallback)(async (seat, id, name) => {
              const conn = (0, live_js_1.currentConnection)();
              if (!conn) {
                  setNote('还没接上服务端，改不了。');
                  return;
              }
              setBusy(true);
              const r = await (0, bridge_js_1.callKaipu)(conn, bridge_js_1.ENDPOINTS.assignSeat, { seat, holderId: id, holderName: name, reason: '' });
              setBusy(false);
              if (r.ok === true) {
                  setEditing(null);
                  setNote(`已改成「${name}」—— 重新打开面板即可看到。`);
              }
              else {
                  // ★ 服务端的话原样给用户看（签名位 403 / 兼任 409 都在这里出）
                  setNote('business' in r ? r.business.message : r.error.detail);
              }
          }, []);
          // ★ 没选场景 ⇒ 什么都不画（与 `ProcessFacts` 同款：不占位、不留空壳）
          if (scene === null)
              return null;
          const holders = new Map((scene.seatHolders ?? []).map((h) => [h.seat, h]));
          return (
          // ★ `data-kaipu-seatlamp` = 本块的**判据锚点**，探针据此断言"它在 run 之外"
          (0, jsx_runtime_1.jsxs)("section", { "data-kaipu-seatlamp": "1", style: { padding: '14px 14px 0' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, fontWeight: 500, color: theme_js_1.C.text }, children: scene.label }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 2, lineHeight: theme_js_1.LH.tight }, children: "\u53D1\u8D77\u4E4B\u524D\u5148\u770B\u6E05\u4E24\u4EF6\u4E8B\uFF1A\u8C01\u5728\u5E2E\u4F60\u505A\uFF0C\u4EE5\u53CA\u8981\u8FC7\u54EA\u51E0\u9762\u3002" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 12 }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: ["\u89D2\u8272\u4F4D \u00B7 \u672C\u5F00\u94FA\u8C01\u6765\u5BA1 \u00B7 ", SEAT_ORDER.length, " \u4E2A\u4F4D"] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                  const next = !inviting;
                                  setInviting(next);
                                  setInvErr(null);
                                  setInvResults([]);
                                  setEditing(null);
                                  // ★ 打开抽屉 ⇒ 默认把两个可改位勾上 —— "打开 → 生成"两步走完；
                                  //   不想请某一位就取消勾选（勾选权仍在用户手里）
                                  setPicked(next ? SEAT_ORDER.filter((k) => SEAT_EDITABLE[k] === true) : []);
                              }, style: {
                                  marginLeft: 'auto', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, background: 'none',
                                  border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline',
                              }, children: inviting ? '收起' : '＋ 邀请协作方' })] }), inviting ? ((0, jsx_runtime_1.jsxs)("div", { style: { border: `1px solid ${theme_js_1.C.border}`, borderRadius: 8, padding: '9px 11px', marginTop: 6 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginBottom: 4 }, children: "\u52FE\u9009\u8981\u8BF7\u4EBA\u5750\u7684\u4F4D\uFF0C\u751F\u6210\u4E00\u6B21\u6027\u9080\u8BF7\u94FE\u63A5 \u2014\u2014 \u5BF9\u65B9\u6253\u5F00\u5C31\u80FD\u63A5\u5165\u3002" }), INVITE_SEATS.map((k) => {
                              const { text, muted } = holderLabel(holders.get(k));
                              const editable = SEAT_EDITABLE[k] === true;
                              const checked = picked.includes(k);
                              return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }, children: [editable ? ((0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: checked, onChange: (e) => setPicked((cur) => (e.target.checked ? [...cur, k] : cur.filter((s) => s !== k))), style: { flex: '0 0 auto', margin: 0, accentColor: '#C8881F' } })) : (
                                      // ★ 占位对齐：不可改的位没有勾选框，但留同样宽的空位 —— 四行左缘齐
                                      (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { flex: '0 0 13px' } })), (0, jsx_runtime_1.jsx)("span", { style: { flex: '0 0 44px', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: SEAT_LABEL[k] ?? k }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: muted ? theme_js_1.C.dim : theme_js_1.C.text, minWidth: 0 }, children: text }), (0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 'auto', flex: '0 0 auto', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: editLabelOf(k) })] }, k));
                          }), invResults.length === 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { value: invNote, onChange: (e) => setInvNote(e.target.value), placeholder: "\u7ED9\u5BF9\u65B9\u7559\u4E00\u53E5\u8BDD\uFF08\u53EF\u9009\uFF09", style: {
                                          width: '100%', boxSizing: 'border-box', fontSize: theme_js_1.FS.tag, padding: '4px 7px',
                                          border: `1px solid ${theme_js_1.C.border}`, borderRadius: 4, marginTop: 4, fontFamily: 'inherit',
                                      } }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: invBusy || picked.length === 0, onClick: () => void doInvitePicked(), style: {
                                          width: '100%', marginTop: 7, padding: '7px 12px', borderRadius: 6,
                                          border: `1px solid ${picked.length === 0 || invBusy ? theme_js_1.C.border : '#C8881F'}`,
                                          background: picked.length === 0 || invBusy ? 'transparent' : 'rgba(200,136,31,0.12)',
                                          color: picked.length === 0 || invBusy ? theme_js_1.C.dim : '#A66A12',
                                          cursor: picked.length === 0 || invBusy ? 'default' : 'pointer',
                                          font: 'inherit', fontSize: theme_js_1.FS.small, fontWeight: 600,
                                      }, children: invBusy ? '生成中…' : picked.length === 0 ? '先勾选上面的位' : `生成邀请链接（${picked.length} 位）` })] })), invResults.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 6, marginBottom: 3, lineHeight: 1.6 }, children: "\u53D1\u7ED9\u8981\u8BF7\u7684\u90A3\u4F4D\uFF08\u4EBA\u6216\u4ED6\u7684 Agent\uFF09\u00B7 7 \u5929\u6709\u6548 \u00B7 \u4E00\u4E2A\u94FE\u63A5\u53EA\u80FD\u63A5\u4E00\u4E2A\u4F4D" }), invResults.map((r) => ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6, alignItems: 'center', marginTop: 4, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { flex: '0 0 44px', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: SEAT_LABEL[r.seat] ?? r.seat }), (0, jsx_runtime_1.jsx)("input", { readOnly: true, value: r.url, onFocus: (e) => e.currentTarget.select(), style: {
                                                  flex: '1 1 160px', minWidth: 0, fontSize: theme_js_1.FS.tag, padding: '3px 6px',
                                                  border: `1px solid ${theme_js_1.C.border}`, borderRadius: 3, fontFamily: 'inherit',
                                              } }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                                  void navigator.clipboard?.writeText(r.url);
                                              }, style: { flex: '0 0 auto', fontSize: theme_js_1.FS.tag, padding: '2px 8px', cursor: 'pointer' }, children: "\u590D\u5236" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                                  const who = SEAT_LABEL[r.seat] ?? r.seat;
                                                  const msg = [
                                                      `邀请你担任「${who}」`,
                                                      '',
                                                      `打开这个链接接入（7 天有效，一个链接只能接一个人）：`,
                                                      r.url,
                                                      '',
                                                      `接入后你就能在这里领活、交结论、传资料。`,
                                                      `完整接入说明在服务端，用你的 agentId + secret 调`,
                                                      `POST /kb/guide/index 自取（按你的座位给该看的段落）。`,
                                                  ].join('\n');
                                                  void navigator.clipboard?.writeText(msg);
                                              }, title: "\u590D\u5236\u4E00\u6BB5\u53EF\u4EE5\u76F4\u63A5\u7C98\u7ED9\u5BF9\u65B9\u7684\u8BDD\uFF08\u542B\u8BF4\u660E\uFF09", style: { flex: '0 0 auto', fontSize: theme_js_1.FS.tag, padding: '2px 8px', cursor: 'pointer' }, children: "\u590D\u5236\u6574\u6BB5\u8BDD" })] }, r.seat))), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 4 }, children: ["\u6709\u6548\u671F\u81F3 ", invResults[0]?.expiresAt ?? '—', (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                                  setInvResults([]);
                                                  setPicked(SEAT_ORDER.filter((k) => SEAT_EDITABLE[k] === true));
                                              }, style: {
                                                  marginLeft: 10, fontSize: theme_js_1.FS.tag, background: 'none', border: 'none',
                                                  color: theme_js_1.C.dim, cursor: 'pointer', textDecoration: 'underline', padding: 0,
                                              }, children: "\u518D\u53D1\u4E00\u6279" })] })] })), invErr !== null && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: '#b45309', marginTop: 5, lineHeight: theme_js_1.LH.tight }, children: invErr }))] })) : null, (0, jsx_runtime_1.jsxs)("div", { "data-kaipu-seats": "1", style: { border: `1px solid ${theme_js_1.C.border}`, borderRadius: 4, padding: '3px 10px', marginTop: 4 }, children: [SEAT_ORDER.map((k) => {
                              const { text, muted } = holderLabel(holders.get(k));
                              const editable = SEAT_EDITABLE[k] === true;
                              /* ★ 2026-10-23（G-4）：签名位不按「未登记/未指派」说 —— 它不是座位，是底座。
                                 状态只有两种：⛨ 山海已签 / ⛨ 待签。 */
                              const isSig = k === 'signature';
                              return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 8, padding: '3px 0' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { flex: '0 0 44px', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: SEAT_LABEL[k] ?? k }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.small, color: muted ? theme_js_1.C.dim : theme_js_1.C.text }, children: isSig ? '' : text }), (0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 'auto', fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: isSig ? signatureLabel(holders.get(k)) : editLabelOf(k) })] }), inviting && editable && editing === k && cands.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { padding: '2px 0 8px 13px' }, children: cands.map((a) => ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: busy, onClick: () => void doAssign(k, a.id, a.name), style: {
                                                  display: 'block', width: '100%', textAlign: 'left', fontSize: theme_js_1.FS.small,
                                                  color: theme_js_1.C.text, background: 'none', border: `1px solid ${theme_js_1.C.border}`,
                                                  borderRadius: 3, padding: '3px 8px', marginTop: 4,
                                                  cursor: busy ? 'default' : 'pointer',
                                              }, children: a.name }, a.id))) })) : null] }, k));
                          }), note !== null ? ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, padding: '4px 0 2px' }, children: note })) : null] }), inviting && picked.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginTop: 5, display: 'flex', gap: 6, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)("span", { children: "\u4E0D\u662F\u8BF7\u65B0\u4EBA\uFF0C\u662F\u628A\u4F4D\u5B50\u6362\u7ED9\u5DF2\u6709\u6267\u884C\u65B9\uFF1F" }), picked.filter((k) => SEAT_EDITABLE[k] === true).map((k) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => void openEditor(k), style: {
                                  fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, background: 'none', border: 'none', padding: 0,
                                  cursor: 'pointer', textDecoration: 'underline', font: 'inherit',
                              }, children: ["\u6307\u6D3E", SEAT_LABEL[k] ?? k] }, k)))] })), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 12, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim }, children: ["\u80FD\u529B\u8FB9\u754C \u00B7 \u8981\u8FC7\u54EA\u51E0\u9762 \u00B7 ", scene.lamps.length, " \u4E2A\u5BA1\u6838\u9762"] }), (0, jsx_runtime_1.jsxs)("div", { "data-kaipu-lamps": "1", style: { border: `1px solid ${theme_js_1.C.border}`, borderRadius: 4, padding: '12px 10px 10px', marginTop: 4 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', justifyContent: 'space-around', gap: 6 }, children: scene.lamps.map((l, i) => {
                                  const lit = l.agentId !== null;
                                  // ★ hover 说明：把 duty 短名 + dutyNote 长说明 + 连接状态**收进 title**，
                                  //   页面本身只留"灯笼 + 名字 + 状态"三层安静信息。
                                  const tip = [
                                      l.lamp,
                                      l.duty !== undefined && l.duty !== '' ? `· ${l.duty}` : '',
                                      l.dutyNote !== undefined && l.dutyNote !== '' ? `（${l.dutyNote}）` : '',
                                      lit ? '已接入执行方' : '尚未接入执行方 —— 这不是故障，接入后即可点亮',
                                  ]
                                      .filter(Boolean)
                                      .join(' ');
                                  // ★★ 2026-10-08 发起人点题「参考灯笼🏮好看一些」：把圆点做成**小灯笼**。
                                  //   画法对齐《山海城邦 · 视觉设计文档》（DESIGN.md §5）：
                                  //   「圆角灯体 + 暖金径向光晕 + 朱砂灯帽 + 火苗」，色板取品牌四色：
                                  //     · 暖金 gold #C8881F —— 灯体 / 光晕
                                  //     · 朱砂 cinnabar #A8351A —— 灯帽（点睛）
                                  //     · 宣纸米 #F7F4EC / 松烟墨 #1A1A1A —— 高光核心 / 暗字
                                  //   · 未接入 ⇒ 灯帽与灯体一律**褪成灰**、无光晕（安静，不抢眼、不像报错）；
                                  //   · 已接入 ⇒ 朱砂灯帽 + 暖金径向灯体（核心近米白 = 火苗）+ 暖金光晕。
                                  const capColor = lit ? '#A8351A' : '#C9C2B4'; // 灯帽：朱砂 / 灰
                                  return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-lamp": "1", title: tip, style: {
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'center',
                                          gap: 3,
                                          minWidth: 0,
                                          flex: '1 1 0',
                                      }, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { width: 9, height: 3, borderRadius: 1.5, background: capColor } }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: {
                                                  width: 21,
                                                  height: 26,
                                                  borderRadius: '50%',
                                                  boxSizing: 'border-box',
                                                  border: lit ? '1px solid #A66A12' : '1.5px solid #C9C2B4',
                                                  background: lit
                                                      ? 'radial-gradient(circle at 50% 36%, #FFF6DA 0%, #F0BE55 36%, #C8881F 70%, #A66A12 100%)'
                                                      : 'rgba(26,26,26,0.05)',
                                                  boxShadow: lit
                                                      ? '0 0 9px 2px rgba(200,136,31,0.55), inset 0 0 3px rgba(255,246,218,0.7)'
                                                      : 'none',
                                              } }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { width: 4, height: 4, borderRadius: '50%', background: capColor } }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.text, lineHeight: 1.3, textAlign: 'center', marginTop: 3 }, children: l.lamp }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, lineHeight: 1.3 }, children: lit ? '已接入' : '待接入' })] }, `${l.lamp}-${String(i)}`));
                              }) }), (0, jsx_runtime_1.jsx)(LightFirstButton, {})] })] }));
      }
      /*
       * ★★ 「🪔 点亮第一盏灯」—— 给面板一个**出口**（夜话 2026-10-08）。
       *
       * 页面原来全在解释状态、没有告诉用户"现在该做什么"。这个主按钮把
       * "待接入"从**状态**变成**动作**：点下去 = 去选执行方。
       *
       * ★★ 为什么点击只展开一段**说明**、不直接开"选择执行方"：
       *   定案 + 服务端口径钉死 ——P1 期客户端**无自助改入口**，
       *   执行位/审计位由铺主指派、管理位/签名位结构性不可改。⇒ "选择执行方"这个动作
       *   **在当前版本不存在**。若把按钮做成"点了跳去一个不存在的 picker"，就是本仓明令禁止的
       *   "点了没反应的承诺"。⇒ 如实展开去向（接入服务端后由铺主在管理方界面指派，P2.5），
       *   既给了出口，又没编一条假的流程。
       *   ★ 锚点 `data-kaipu-light-first="1"` 供探针断言"出口存在"。
       */
      function LightFirstButton() {
          const [open, setOpen] = (0, react_1.useState)(false);
          return ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 12 }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-light-first": "1", "aria-expanded": open, onClick: () => setOpen((v) => !v), style: {
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: 6,
                          // ★ 色对齐《山海城邦 · 视觉设计文档》暖金 gold #C8881F（"灯火"用色）
                          border: '1px solid #C8881F',
                          background: 'rgba(200,136,31,0.12)',
                          color: '#A66A12',
                          cursor: 'pointer',
                          // ⚠️⚠️ `font` 是**简写属性**，会重置 `fontSize` / `fontWeight`。
                          //   本行原来写在它俩**之前** ⇒ 那两行**一直没生效**（2026-10-08 用 CDP 读
                          //   computed style 才发现：代码写 600，实读 400 —— 光看代码看不出来）。
                          //   ⇒ 简写放**最后**，再补要覆盖的。
                          font: 'inherit',
                          fontSize: theme_js_1.FS.base,
                          fontWeight: 600,
                      }, children: "\uD83E\uDE94 \u70B9\u4EAE\u7B2C\u4E00\u76CF\u706F" }), open && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 8, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: "\u300C\u9009\u62E9\u6267\u884C\u65B9\u300D\u5C06\u5728\u63A5\u5165\u670D\u52A1\u7AEF\u540E\u3001\u7531\u94FA\u4E3B\u5728\u7BA1\u7406\u65B9\u754C\u9762\u6307\u6D3E\uFF08P2.5\uFF09\u3002\u5F53\u524D\u672C\u5730\u6F14\u793A\u6A21\u5F0F\u6682\u4E0D\u5F00\u653E\u6B64\u5165\u53E3 \u2014\u2014 \u4E94\u76CF\u706F\u4F1A\u5728\u63A5\u5165\u540E\u9010\u4E00\u4EAE\u8D77\u3002" }))] }));
      }
      //# sourceMappingURL=SeatLampPanel.js.map
      return module.exports;
    })();

    /* ── client/run.js ── */
    var m_run = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.startRun = startRun;
      const bridge_js_1 = m_bridge;
      const live_js_1 = m_live;
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
      return module.exports;
    })();

    /* ── client/PlatformPanel.js ── */
    var m_PlatformPanel = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PlatformPanel = PlatformPanel;
      const jsx_runtime_1 = require("react/jsx-runtime");
      /**
       * 山海·开铺 · 场地插件 · 主面板
       * =====================================================================
       * ★ 布局：**顶部四页签 + 下方主区**（2026-10-08 由"左总台 + 右运行视图"升级）。
       *
       *   页签：① 操作台 ② 铺子资料 ③ 管理方 ④ 怎么用 —— 顺序「做 → 我的东西 → 管理 → 帮助」。
       *
       *   ★★ 为什么把「铺子资料」「怎么用」从右栏内容流里提拔成页签：
       *     这两块**本来就在 `data-kaipu-run` 之外**（判据边界的纪律），
       *     只能靠顶部两个跳转按钮 + 滚一屏抵达 ⇒ 想放/取一份文件得先滚一两屏。
       *     页签让"去哪儿"变成**一步**，且跨页不丢上下文（`fill` 信号抬在本层）。
       *     ⇒ 随之作废的零件一并删除：`jumpSeq` / `introSeq` 两个递增信号、
       *       两个滚动 effect（含"页面不可见时平滑滚动不推进"的兜底）、`nearestScroller`、
       *       `shelfRef` / `scrollerRef` —— **删干净，别留一个只在注释里活着的名字**。
       *
       * ★ 操作台内仍是**左右分栏**（插件形态决定，不是审美偏好）：
       *   插件面板**天然是"嵌在宿主里的一个区域"**，不是全屏应用 ——
       *   它可能挂在侧边栏（很窄）/ 主区域（很宽）/ 悬停卡（更窄）。
       *   ⇒ 左右分栏 + 弹性伸缩是唯一天然适配三档的布局。
       *   ★★ 后来补一处（实测所得）：容器 < 640 时左右分栏**根本分不了** ⇒
       *      左栏收掉，改由顶部的 `NarrowScenePicker` 承载"挑一场场景"这个动作。
       *      折掉的是**左栏这个形态**，不是**这个动作**（见 `NARROW_BREAKPOINT` 注释）。
       *
       * ★★ 断点看**容器宽度**，不看窗口宽度。
       *   早先的教训：面板可能被塞进很窄的挂载点，用 `window.innerWidth` 判断必然误判。
       *   ⇒ 用 ResizeObserver 量自己。
       *
       * ── 本文件只做四件事 ──────────────────────────────────────────────
       *   ① 量宽度 → 决定折不折左栏；② 取数据快照（真服务端 / 演示）；
       *   ③ 持有"选哪个场景 / 停在哪个页签 / 是否已停止接收"；④ 组装。
       *
       * ★★ 数据源**必须是显式状态**（2026-10-05 接真接口时立的）——
       *   `live` / `mock`（人工选的）/ `unreachable`（真连不上）三者严格分开。
       *   **绝不在连不上时悄悄回落 mock**：那会让用户以为在看真结果，
       *   其实在看演示数据 —— 这是比"白屏"更坏的一类错（**看起来是对的**）。
       *   连不上就**如实说连不上**，并给一个**显式的**"改用演示数据看看"按钮。
       */
      const react_1 = require("react");
      const Intro_js_1 = m_Intro;
      const LeftPane_js_1 = m_LeftPane;
      const RightPane_js_1 = m_RightPane;
      const ShopShelf_js_1 = m_ShopShelf;
      const SeatLampPanel_js_1 = m_SeatLampPanel;
      const live_js_1 = m_live;
      const data_js_1 = m_data;
      const run_js_1 = m_run;
      const run_reducer_js_1 = m_run_reducer;
      const theme_js_1 = m_theme;
      /**
       * 窄于此宽度 ⇒ 折叠左栏（只留右工作区）。
       * ★ 2026-10-05 随字号一起从 560 提到 640：字号放大一档后，240px 的左栏装不下
       *   「主体核验 · 执行 · 核验证照与主体信息是否一致」这类行，会挤成两三行。
       *   左栏同步加宽到 260 ⇒ 折叠阈值必须跟着抬，否则"看起来够宽但左栏已经挤爆"。
       *
       * ★★ 2026-10-08：折了左栏 ≠ 折了"选场景"这件事。
       *
       *   评估**实测**发现的真缺口（不是推演）：容器 < 640 时，
       *   左栏与把手**都不渲染** ⇒ 面板 544px 宽时，用户**一个选场景的入口都没有**。
       *   而 `selected` 会自动回落到第一个场景，界面**看起来一切正常** ——
       *   他只会发现自己**换不了场**，且不知道去哪儿换。
       *   ⇒ 折掉的是"左栏这个形态"，不是"挑一场场景"这个动作。
       *     下面 `NarrowScenePicker` 就是窄屏下承载这个动作的东西。
       *
       *   ★ 为什么不是"把左栏也渲染出来挤一挤"：260px 塞进 544px 的面板里，
       *     右侧只剩 284px —— 报告那种块结构（判定行 + 说明 + 角色位）会被折成
       *     一行几个字，**读不动**。那种"看起来还在"比"明确收起来 + 给个入口"更坏。
       */
      const NARROW_BREAKPOINT = 640;
      /**
       * ★★ 左栏宽度**档位**（2026-10-08 · `109` 评估 → 拍板「做 C+D」）。
       *
       * ── 为什么加宽就能拿到"内容不挤"，而不必把内容搬到右栏 ──
       * `109` 实测（真改样式再量，不推算）：
       *   三块内容合计 **840px（左栏 260）→ 673px（左栏 420）＝ −167px**；
       *   而把同样三块**搬到主区 887px** 量出来的也是 **−167px** —— **一模一样**。
       *   原因：内容高度由**文本换行**决定，而换行在 **420px 时就已经不再发生**
       *   （再加宽到 500px，读数仍是 673，**到顶了**）。
       * ⇒ 「同样收益，选代价最低的那条路」（原话）：**加宽能拿到的，不搬内容去拿**。
       *
       * ── 为什么是档位而不是"一个更宽的常量" ──
       * 加宽**不是免费的**：它吃掉的是主区宽度（420 时主区从 887 → 727，−160px）。
       * 而"多宽才合适"取决于用户当下在干什么（挑场景 vs 读报告）——
       * 这是**用户当场就知道、我们猜不出来**的事 ⇒ 给他一个开关，而不是替他定一个数。
       * ★ 也**不做拖拽改宽**：拖拽要挂 pointermove + 落盘宽度，而本仓 client half
       *   不引 CSS 文件、状态不持久化（刷新即回默认）⇒ 拖出来的宽度**一刷新就丢**，
       *   那比"点两下换档"更让人恼火。
       *
       * ── ★★ 与上面 `NARROW_BREAKPOINT` 那段注释的关系（别读成矛盾）──
       * 那一段讲的是**压窄**左栏没用（235px 内容高不变、215px 反而涨）；
       * 这一档讲的是**加宽**左栏 —— **方向相反**，是两件事：
       *   · 想让**右栏**变宽 ⇒ 只有**收起左栏**一条路（0 或 260，没有中间地带）；
       *   · 想让**左栏自己不挤** ⇒ 就是这里的加宽（代价是右栏变窄）。
       * ★ 而"窄窗挤"的真正门槛在**窗高**（`107` 实测：窗高 ≈700 才开始滚），
       *   与左栏宽无关 ⇒ 所以本档位**不是**为解决窄窗而加，是为"内容设计施展不开"加的。
       */
      const LEFT_WIDTHS = [260, 340, 420];
      /**
       * 当前容器宽下，左栏**最多**能加到第几档。
       *
       * ★ 为什么要有这个上限：左栏「加宽」= 主区变窄。容器只有 700px 时给左栏 420
       *   ⇒ 报告区只剩 267px，块结构（判定行 + 说明 + 角色位）会折成一行几个字
       *   —— `NARROW_BREAKPOINT` 那段注释已经判过：那种「看起来还在」**比收起来更坏**。
       * ★ 取**一半**作上限（而不是别的比例）：半个面板给"选"，半个给"看"，
       *   在任何容器宽下都留下**与左栏等宽以上**的阅读区。
       * ★ 容器宽未知（首帧 / 无 `ResizeObserver`）时**不设限** —— 宁可让它加宽，
       *   也不要在拿不到尺寸时把一个用户主动点的动作**静默吃掉**（点不动还不说原因，最恼人）。
       */
      const maxWidthIdxFor = (hostW) => {
          if (hostW <= 0)
              return LEFT_WIDTHS.length - 1;
          let i = LEFT_WIDTHS.length - 1;
          while (i > 0 && (LEFT_WIDTHS[i] ?? 0) > hostW / 2)
              i -= 1;
          return i;
      };
      /** 默认档 = 260（老行为原样）—— 加宽是**用户主动选**的，不是新的默认 */
      const LEFT_WIDTH_DEFAULT_IDX = 0;
      /**
       * 下一档是哪个（到顶就**回绕**到最窄一档）。
       * ★ 为什么回绕而不是"到顶就不动"：不回绕的话，用户在 420 上再点一下**什么都不会发生**
       *   —— 点了没反应、又没说明，是本项目反复判过的那类最坏交互（"假承诺"和"按不动的按钮"同族）。
       *   回绕至少让"这一点有反馈"，且 260 本来就是他要的那个常见态，绕回去不算绕远。
       * ★ 抽成**模块级纯函数**（不写在 JSX 里）：可以单独断言 —— 见 `tools/probe/run-view-probe.mjs` ⑦.2 段。
       */
      const nextWidthIdx = (idx, cap) => (idx + 1 > cap ? 0 : idx + 1);
      /** 未运行的场景共用这一个空数组 —— 避免每次渲染都新建（否则 useMemo 每次失效） */
      const NO_EVENTS = [];
      const NO_SCENES = [];
      function PlatformPanel() {
          const hostRef = (0, react_1.useRef)(null);
          const [narrow, setNarrow] = (0, react_1.useState)(false);
          const [pref, setPref] = (0, react_1.useState)('auto');
          /** `null` = 还在读（首帧）—— 这与"读失败"是两件事，界面措辞要分开 */
          const [snap, setSnap] = (0, react_1.useState)(null);
          const [selected, setSelected] = (0, react_1.useState)(null);
          /** ★ 客户端是否已停止接收（R5）。它**不属于事件流**，所以单独一个状态。 */
          const [stopped, setStopped] = (0, react_1.useState)(false);
          /**
           * 当前触发的错误码。
           * ★ 现在由演示脚手驱动；接真服务端后改由**请求失败**驱动 ——
           *   中间那层（ErrorSurface）不用改，它只认 code。
           */
          const [errorCode, setErrorCode] = (0, react_1.useState)(null);
          /**
           * ★★ 左栏（场景栏）是否展开 —— 为"横向空间还给内容"后加。
           *
           * **为什么值得给（实测，不是感觉）**：收起后右栏宽 432 → **693px（+60%）**、
           * **最长一行 364 → 485px（+33%）** ⇒ 阅读舒适度是真实提升。
           *
           * **但它不是"一屏看完"的灵药（别过度承诺）**：同一次实测里右栏内容高只降 **16%**
           * （849 → 710px，**仍是 1.57 屏**）—— 因为右栏高度的大头是**块结构**
           * （结论 / 角色位 / 未签名 / 逐轮，多为契约"不许折"），**不是"窄列换行"**。
           * ⇒ 它的价值是**把"暂时不看的 34% 横向空间"还给内容**，不是消灭滚动。
           *
           * ★ 顺带否掉了一条"零代价"的替代路：**压窄左栏没用**。实测 235px 时内容高不变（641px），
           *   再往下压到 215px **内容反而涨到 680px**（开始换行挤）—— 净亏。
           *   所以"让右栏变宽"只有**收起**这一条路（0px 或 255px，没有中间地带）。
           *
           * ★ 默认**展开**：选择场景是第一步；一进来就把入口藏起来，等于让人先找门。
           */
          const [leftOpen, setLeftOpen] = (0, react_1.useState)(true);
          /**
           * ★★ 左栏宽度档位（`LEFT_WIDTHS` 的下标）—— 见那段常量的注释。
           * ★ 默认 `0`（260px）= **老行为原样**；加宽必须由用户主动点。
           * ★ 不持久化：刷新回默认（与 `leftOpen` / `view` 同一口径 —— 都是"当场的选择"）。
           */
          const [widthIdx, setWidthIdx] = (0, react_1.useState)(LEFT_WIDTH_DEFAULT_IDX);
          /**
           * ★ 容器宽（`hostRef` 量到的）—— **只给"左栏最多能加到第几档"当依据**。
           * ★ 与 `narrow` 同一个 `ResizeObserver` 里更新，不额外挂一个观察者。
           */
          const [hostW, setHostW] = (0, react_1.useState)(0);
          /**
           * ★★ 顶部「页签」：**操作台 / 铺子资料 / 管理方 / 怎么用**（2026-10-08 定型）。
           *
           * 顺序「做 → 我的东西 → 管理 → 帮助」（发起人拍板）：
           *   操作台 = 干活看结果的地方 · 铺子资料 = 自己的东西 · 管理方 = 另一类使用者 · 怎么用 = 帮助。
           *
           * ★ 为什么是页签（不是抽屉/不是内联折叠）：这四件事**互不从属** ——
           *   把它们平级，比"塞进一个视图里的可折叠段落"更诚实，
           *   也不会污染 `data-kaipu-run` 的判据边界（见那节）。
           *
           * ★★ 默认停在「操作台」：绝大多数第一眼是来看运行结果的。
           * ★★ 红线：客户端**零管理能力**（契约三条不可破 ③）——
           *   管理方页签是**占位 + 指路**，不承载任何真管理逻辑；
           *   真动作（发起开铺 / 指派执行方）在接入场地服务端后的「管理方界面」做（P2.5）。
           */
          const [view, setView] = (0, react_1.useState)('console');
          /**
           * ★ 用户**看过**「怎么用」没有 —— 只服务"页签上的小蓝点"（首访可发现保底）。
           * ★ 用 state 不用 ref：它参与渲染（点要消失）。★ **不持久化**：页签是导航，跨挂载记忆无意义。
           */
          const [helpSeen, setHelpSeen] = (0, react_1.useState)(false);
          /** 切页签 + 记"看过用法"。★ 收在一处，免得漏记 —— 漏了就一直挂个蓝点。 */
          const switchView = (v) => {
              if (v === 'help')
                  setHelpSeen(true);
              setView(v);
          };
          /**
           * ★★ 「从铺子资料填入待审内容」= 一条**单向信号**，不是一个值。
           *
           * 为什么带 `seq`：两次填的可能是**同一份文件、同一段文本** ——
           * 用值本身做依赖，第二次就不会触发（React 认为没变化）。
           * 递增序号让"又一次填入"这件事**每次都成立**。
           *
           * ★★ 为什么状态放在这一层（分页之后这条更关键）：
           *   铺子资料**已经是另一个页签**，而"待审内容"输入框在**操作台页** ——
           *   两者隔着一整页。信号必须抬到**共同祖先**（本层），
           *   并在填入时把页签**切回操作台**（见 `placeFill`），这样"填入"之后
           *   用户立刻看到内容落进了输入框，而不是"填了但不知道填到哪去了"。
           */
          const [fill, setFill] = (0, react_1.useState)(null);
          /* ── ★ 真运行的三个状态（2026-10-05 接 SSE 时加）────────────────────
           * 它们**只在真服务端路径下**有意义；演示模式的 events 走 `MOCK_RUNS`。
           * ★ `runEvents` 累积的是**真收到的事件**（按到达顺序）—— reducer 是纯函数，
           *   所以"边到边渲染"就是"数组长一点就重算一次"，没有额外的状态机。
           */
          const [runEvents, setRunEvents] = (0, react_1.useState)(NO_EVENTS);
          const [running, setRunning] = (0, react_1.useState)(false);
          /** 运行失败的**原文**（不翻译、不吞）—— 与 `errorCode`（契约错误码→山海语言）是两件事 */
          const [runError, setRunError] = (0, react_1.useState)(null);
          /** 当前这条流的句柄。★ 用 ref 不用 state：它**不参与渲染**，改它不该触发重绘 */
          const sessionRef = (0, react_1.useRef)(null);
          (0, react_1.useEffect)(() => {
              const el = hostRef.current;
              if (el === null)
                  return;
              // 拿不到 ResizeObserver（极老壳 / 测试环境）⇒ 保持默认宽布局，不炸。
              if (typeof ResizeObserver === 'undefined')
                  return;
              const ro = new ResizeObserver((entries) => {
                  const w = entries[0]?.contentRect.width ?? 0;
                  if (w > 0) {
                      setNarrow(w < NARROW_BREAKPOINT);
                      setHostW(w);
                  }
              });
              ro.observe(el);
              return () => ro.disconnect();
          }, []);
          /* ── 取快照（★ 换数据源 = 重新取，不"就地换标签"）────────────────── */
          (0, react_1.useEffect)(() => {
              let alive = true;
              const ac = new AbortController();
              void (async () => {
                  const next = pref === 'mock' ? (0, live_js_1.mockSnapshot)() : await (0, live_js_1.loadLive)(ac.signal);
                  if (alive)
                      setSnap(next);
              })();
              return () => {
                  alive = false;
                  ac.abort();
              };
          }, [pref]);
          const scenes = snap?.scenes ?? NO_SCENES;
          const agents = (0, react_1.useMemo)(() => snap?.agents ?? [], [snap]);
          const categories = (0, react_1.useMemo)(() => snap?.categories ?? [], [snap]);
          const recommendations = (0, react_1.useMemo)(() => snap?.recommendations ?? [], [snap]);
          const isMock = snap?.kind === 'mock';
          /* ── 首帧后自动选中第一个场景（★ 真服务的场景 id 与演示数据不同，不能写死）──
           *
           * ★★ 判据是「选中项**在当前场景列表里找不到**」就重选，**不是** `selected === null`。
           *
           * 为什么必须这样（2026-10-05 被"探针连跑"当场抓到）：
           *   切数据源（演示 ↔ 真服务端）时，两个来源的 scene id **不一样**
           *   （演示是 `opening-audit`，真服务端是 `light-review`）。
           *   只认 `null` 的话，旧的 `selected` 会**悬空**：`scenes.find(...)` 找不到 ⇒
           *   右栏掉进空态，显示「先从左边挑一场场景」——**而用户什么也没做错**，
           *   看起来像"数据没了"。
           *   ⇒ 现在：选中项失效就自动回落到第一个。
           */
          (0, react_1.useEffect)(() => {
              const exists = selected !== null && scenes.some((s) => s.scene === selected);
              if (!exists && scenes.length > 0)
                  setSelected(scenes[0]?.scene ?? null);
          }, [scenes, selected]);
          const scene = (0, react_1.useMemo)(() => scenes.find((s) => s.scene === selected) ?? null, [scenes, selected]);
          /**
           * ★★ 事件从哪来 —— 两条路**显式分开**，绝不"读不到就回落演示"：
           *   · `mock` ⇒ `MOCK_RUNS`（人工选的演示序列）
           *   · 真服务端 ⇒ `runEvents`（**本次运行真收到的事件**）
           *   没跑过就是**空**（界面如实说"该场景尚未运行"并给开始按钮），
           *   而不是摆一串谁也没跑过的判定。
           */
          const events = (0, react_1.useMemo)(() => (isMock ? (selected === null ? NO_EVENTS : (data_js_1.MOCK_RUNS[selected] ?? NO_EVENTS)) : runEvents), [isMock, selected, runEvents]);
          const run = (0, react_1.useMemo)(() => (0, run_reducer_js_1.reduceRun)(events, stopped), [events, stopped]);
          const pick = (id) => {
              // 换场景 = 新的一次运行 ⇒ 上一次的流、事件、"已停止接收"与错误**都不该带过来**
              sessionRef.current?.stop();
              sessionRef.current = null;
              setRunning(false);
              setRunEvents(NO_EVENTS);
              setSelected(id);
              setStopped(false);
              setErrorCode(null);
              setRunError(null);
          };
          /** ★ 发起一次真运行（契约 §3.4）。只有真服务端路径能发起 —— 演示模式没有可跑的东西 */
          const start = (input) => {
              if (selected === null)
                  return;
              // 同一场景重复点：先把上一条停掉，别让两条流抢同一个视图
              sessionRef.current?.stop();
              setRunEvents(NO_EVENTS);
              setStopped(false);
              setRunError(null);
              setRunning(true);
              sessionRef.current = (0, run_js_1.startRun)({
                  sceneId: selected,
                  ...(input.target === '' ? {} : { target: input.target }),
                  content: input.content,
              }, {
                  onEvent: (e) => setRunEvents((prev) => [...prev, e]),
                  onError: (message) => setRunError(message),
                  onEnd: () => {
                      setRunning(false);
                      sessionRef.current = null;
                  },
              });
          };
          /**
           * ★ 停止接收（R5）：**只停客户端这一侧**。措辞与解释见 `run-reducer` 的 `STOPPED_EXPLAIN` ——
           *   服务端仍在算完并落 `lamp_runs`，所以**不写"已取消"**。
           */
          const stop = () => {
              sessionRef.current?.stop();
              sessionRef.current = null;
              setRunning(false);
              setStopped(true);
          };
          /** 面板卸载 ⇒ 停掉还在跑的流（不留下一个没人消费的订阅） */
          (0, react_1.useEffect)(() => () => {
              sessionRef.current?.stop();
              sessionRef.current = null;
          }, []);
          /**
           * ★★ 从铺子资料「填入待审内容」→ **排信号 + 切回操作台**（跨页不丢上下文）。
           *
           * 为什么切回去：待审内容输入框在**操作台页**的右栏 (§运行视图)。
           *   只把信号排上而人还停在铺子资料页 ⇒ 他看见的只有一句"已填入"，
           *   却看不到填到哪儿了（这正是"跨页丢上下文"）。
           *   ⇒ 填入 = 送他去该去的地方（同 `Intro` 那条教训：**导航的意图不该被吃掉**）。
           */
          const placeFill = (text, name) => {
              setFill((prev) => ({ text, name, seq: (prev?.seq ?? 0) + 1 }));
              setView('console');
          };
          /**
           * ★★ 「从铺子资料点开始运行」= 切到操作台 **+ 把发起区送到正中间**（2026-10-08 · 101）。
           *
           * ★ 为什么**两件事**都要做、只切页签不够：
           *   操作台那一页，发起区**不在第一屏**（上面压着「这场谁来审 / 要过哪几面」那一整块）。
           *   只 `setView('console')` 的话，人是过去了，但看见的是"上面那一块"，
           *   发起区还在视野外 ⇒ 和"点了没反应"体感一样 —— **导航到了，落点没到**。
           *
           * ★★ 为什么用 `focusSeq`（**事件**）而不是一个 `focused` 布尔：
           *   与 `fill` 同一条理由 —— 用户可能**连着两次**从铺子资料点过来。
           *   布尔值第二次还是 `true`，那一趟就"没换过"（⇒ 不会再滚一次）。
           *   递增序号让"又一次要去发起区"这件事**每次都成立**。
           *
           * ★ 为什么配 `onFocusConsumed`（用完即清零）：它是**一次性**信号，不是状态。
           *   留着不清零 ⇒ 用户只想在两页之间来回切一次，也会被反复拖到发起区
           *   （替他做了一个"你一定想发起"的决定）。
           */
          const [focusSeq, setFocusSeq] = (0, react_1.useState)(0);
          /**
           * ★ `useCallback` 不是顺手加的 —— 这个回调进了 `StartRunForm` 一条 effect 的**依赖**。
           *   每次渲染换个新身份 ⇒ effect 每次渲染都重跑 ⇒ 滚了又滚。
           */
          const consumeFocus = (0, react_1.useCallback)(() => setFocusSeq(0), []);
          const goRun = () => {
              setFocusSeq((n) => n + 1);
              setView('console');
          };
          /**
           * ★ 铺子资料那颗「开始运行」什么时候在 —— **它指向的那一屏真的存在才算**。
           *
           * 三个条件缺一不可，各自否决掉一种"给了却跑不了"：
           *   · `isMock`        —— 演示模式没有可跑的服务端（`onStart` 就是 `null`）
           *   · `scene === null`—— 没有选中的场次 ⇒ 操作台那一屏是空态，不是发起区
           *   · `run.status ≠ idle` —— 这一场**已经跑过** ⇒ 操作台给的是报告，不是发起区
           * ⇒ 与 `onFill` 同一条口径：**没有落点就不给按钮**（见 `ShopShelfProps.onGoRun`）。
           */
          const canGoRun = !isMock && scene !== null && run.status === 'idle';
          /**
           * ★★ 主区滚动容器（四页共用那一块）—— 给"换场回顶"用（2026-10-08 · 104）。
           * ★ 为什么这次**重新**挂 ref（当年特意去掉过）：用途不同 ——
           *   当年是给"滚动导航"用（页签化后已废），现在是给"换场回顶"用，读它的只有下面那一条 effect。
           */
          const mainRef = (0, react_1.useRef)(null);
          /**
           * ★★ 换场之后，把主区**滚回顶部**（2026-10-08 · 104 实测发现的问题）。
           *
           * ══════════════════════════════════════════════════════════════════
           * 它修的是什么
           * ══════════════════════════════════════════════════════════════════
           *   换场**不会**重置滚动位置。实测（两个**都长**的场景互切）：`scrollTop 500 → 500`
           *   ⇒ 用户看到的是**新报告的中段** —— **既看不到场景名，也看不到报告开头**，
           *   而"换一场"恰恰就是"我要看这一场"的意思。
           *
           * ★★ 这个缺陷**差一点被漏掉**（记在这里，因为它是个方法论样本）：
           *   换到**短**场景时读数是 892 → 76、1055 → 154，**看起来像"自动回顶了"**。
           *   那不是复位 —— 是浏览器把超范围的 `scrollTop` **夹到新内容的上限**。
           *   只有拿**两个都长**的场景各量一次，才看得出位置是**原样带过去**的。
           *   ⇒ 教训：一个读数与预期一致时，先问"它是被什么机制做成的"；
           *     "被夹紧 / 被裁掉 / 被兜底"这类**被动结果**只在当前样本上成立。
           *
           * ══════════════════════════════════════════════════════════════════
           * ★ 目标值为什么是"顶部"而不是"中间"（发起人原话是中间，2026-10-08 定为顶部）
           * ══════════════════════════════════════════════════════════════════
           *   新报告是一份**新东西**，从头读才成立；"居中"会让**第一屏少看一半**。
           *   发起人拍板原话：「换场后置顶合适，等于从换场标题开始往下自然展开」。
           *
           * ★ 依赖里为什么有 `snap` 而不只是 `selected`：切数据源时**若 id 恰好没变**，
           *   内容也是整个换了（本地演示 ↔ 真服务端）⇒ 同样该回顶。
           *   `snap` 只在 `pref` 变化时被替换 ⇒ 它变动 = 数据源换了。
           *   （★ 首次加载时 `snap` 从 `null` 变成对象、`selected` 从 `null` 变成第一场 —— 也会跑一次；
           *     那时 `scrollTop` 本来就是 0，置 0 是空操作。）
           *
           * ★ 为什么**不等 DOM 更新完**就直接置 0：回顶的目标值与内容高度无关（就是 0），
           *   不必像"居中"那样先量布局 ⇒ 不存在"读到旧的几何"的问题。
           */
          (0, react_1.useEffect)(() => {
              const el = mainRef.current;
              if (el !== null)
                  el.scrollTop = 0;
          }, [selected, snap]);
          const isLoading = snap === null;
          /**
           * ★★ 左栏不可见时，**原因**是什么（`null` = 可见）。
           *
           *   · `'narrow'`    —— **容器太窄**塞不下（< `NARROW_BREAKPOINT`）
           *   · `'collapsed'` —— **用户主动收起**
           *
           * ★ 为什么必须分清原因、不能只给一个 `leftVisible` 布尔：
           *   **两者的出路不一样** ——
           *     · 用户收起 ⇒ 出路是「点顶部的展开按钮」（那个按钮**在**）
           *     · 容器太窄 ⇒ 出路是**顶部的「场景」折叠条**（后来才加；在此之前是"把窗口拉宽"——
           *       那等于告诉用户"你没法在这儿干活"，是把缺失说成限制）
           *   ⇒ 用一个布尔就把两种出路说成同一种，会**让人去按一个不存在的按钮**。
           *     （同 `live.ts` 那条纪律：读不到要**如实说原因 + 给出路**，别糊一句通用话。）
           */
          const leftHidden = narrow ? 'narrow' : leftOpen ? null : 'collapsed';
          /* ── 左栏宽度档位（`LEFT_WIDTHS`）的落地 ────────────────────────────
           * `cap` 随**容器实时宽**变（窗口改大小 ⇒ 可加的上限跟着变），
           * 所以这里不能缓存 —— 每次渲染重算，它是纯算术，比挂 memo 便宜。
           */
          const widthCap = maxWidthIdxFor(hostW);
          // ★ 用一个**钳过**的下标：窗口变窄后，原来选中的 420 可能已超上限 ⇒ 自动回落，
          //   否则会出现"左栏比允许的更宽"（那条上限就成了摆设）。
          const safeWidthIdx = Math.min(widthIdx, widthCap);
          const leftWidth = LEFT_WIDTHS[safeWidthIdx] ?? 260;
          const cycleWidth = () => setWidthIdx(nextWidthIdx(safeWidthIdx, widthCap));
          return ((0, jsx_runtime_1.jsxs)("div", { ref: hostRef, style: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }, children: [(0, jsx_runtime_1.jsx)(Intro_js_1.PanelHead, { source: snap === null ? '正在读取…' : snap.label, onUseMock: () => setPref((p) => (p === 'mock' ? 'auto' : 'mock')), mockActive: isMock }), (0, jsx_runtime_1.jsx)(SourceBanner, { snap: snap, onUseMock: () => setPref('mock') }), (0, jsx_runtime_1.jsx)(TabBar, { view: view, onSwitch: switchView, showHelpNew: isMock && !helpSeen }), view === 'console' && narrow && ((0, jsx_runtime_1.jsx)(NarrowScenePicker, { agents: agents, scenes: scenes, categories: categories, recommendations: recommendations, selected: selected, onSelect: pick })), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flex: '1 1 auto', minHeight: 0 }, children: [view === 'console' && leftHidden === null && ((0, jsx_runtime_1.jsx)("aside", { "data-kaipu-left-w": String(leftWidth), style: {
                                  width: leftWidth,
                                  // ★ 160ms 过渡：宽度是**用户点出来的**，一下子跳过去会让人怀疑"是不是点错了"。
                                  //   用 `width` 而不是 `flex-basis` —— 我们给的是固定宽（`flex:'0 0 auto'`）。
                                  transition: 'width 160ms ease',
                                  flex: '0 0 auto',
                                  // ★ 右边界线**不在这里画** —— 交给下面那个把手承担（见它的注释）
                                  //   两边都画会变成"双线"（把手自身也有 borderRight）
                                  overflowY: 'auto',
                              }, children: (0, jsx_runtime_1.jsx)(LeftPane_js_1.LeftPane, { agents: agents, scenes: scenes, categories: categories, recommendations: recommendations, selected: selected, onSelect: pick }) })), view === 'console' && narrow === false && ((0, jsx_runtime_1.jsxs)("div", { style: {
                                  flex: '0 0 auto',
                                  width: 13,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  // ★ 那条分隔线由**这一层**承担（原来在那颗按钮上；两个按钮各画一条会断开）
                                  borderRight: `1px solid ${theme_js_1.C.border}`,
                              }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-left-toggle": "1", "aria-label": leftOpen ? '收起场景栏' : '展开场景栏', "aria-expanded": leftOpen, onClick: () => setLeftOpen((v) => !v), title: leftOpen ? '收起场景栏（把横向空间让给右边）' : '展开场景栏', style: {
                                          flex: '0 0 auto',
                                          height: 44,
                                          padding: 0,
                                          border: 'none',
                                          background: 'transparent',
                                          color: theme_js_1.C.faint,
                                          cursor: 'pointer',
                                          font: 'inherit',
                                          fontSize: theme_js_1.FS.tag,
                                          lineHeight: 1,
                                      }, children: leftOpen ? '‹' : '›' }), leftOpen && ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-kaipu-left-widen": "1", "data-kaipu-left-width": String(leftWidth), "aria-label": `切换场景栏宽度（当前 ${leftWidth}px）`, onClick: cycleWidth, title: `切换场景栏宽度（当前 ${leftWidth}px → 点一下 ${LEFT_WIDTHS[nextWidthIdx(safeWidthIdx, widthCap)] ?? 260}px）`, style: {
                                          flex: '1 1 auto',
                                          // ★ 顺序有讲究：`border` 简写放**前**、`borderTop` 放**后**
                                          //   —— 反过来的话简写会把 borderTop 一起重置成 none（本仓踩过 `font:'inherit'` 那个同款坑）。
                                          border: 'none',
                                          // ★ 不做 hover 变色（同上）；但给一条淡淡的**上边界**，
                                          //   让人看出"上半个和下半个是两个东西"，不必悬停才发现
                                          borderTop: `1px solid ${theme_js_1.C.border}`,
                                          background: 'transparent',
                                          color: theme_js_1.C.faint,
                                          cursor: 'pointer',
                                          font: 'inherit',
                                          fontSize: theme_js_1.FS.tag,
                                          lineHeight: 1,
                                      }, children: "\u21D4" }))] })), (0, jsx_runtime_1.jsxs)("section", { ref: mainRef, style: { flex: '1 1 auto', minWidth: 0, overflowY: 'auto' }, children: [view === 'manage' && (0, jsx_runtime_1.jsx)(ManagePlaceholder, {}), view === 'shop' && (0, jsx_runtime_1.jsx)(ShopPage, { onFill: isMock ? null : placeFill, onGoRun: canGoRun ? goRun : null }), view === 'help' && (0, jsx_runtime_1.jsx)(HelpPage, {}), view === 'console' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ProcessFacts, { run: run }), (0, jsx_runtime_1.jsx)(SeatLampPanel_js_1.SeatLampPanel, { scene: scene }), (0, jsx_runtime_1.jsx)(RightPane_js_1.ActionBar, { run: run, scene: scene, isMock: isMock, canStart: !isMock, leftHidden: leftHidden, queryRootRef: mainRef }), (0, jsx_runtime_1.jsx)("div", { "data-kaipu-run": "1", children: (0, jsx_runtime_1.jsx)(RightPane_js_1.RightPane, { scene: scene, run: run, sourceLabel: snap?.label ?? null, isMock: isMock, 
                                                  // ★ 空态要说清"去哪儿挑场景" ⇒ 得知道左栏在不在、以及**为什么不在**
                                                  //   （"用户收起"与"容器太窄"出路不同，见 leftHidden 注释）
                                                  leftHidden: leftHidden, onStop: stop, 
                                                  // ★ 演示模式不给"开始运行"（没有可跑的服务端）；真服务端才给
                                                  onStart: isMock ? null : start, running: running, runError: runError, signed: isMock ? data_js_1.MOCK_SIGNATURE !== null : false, errorCode: errorCode, onFireError: setErrorCode, onClearError: () => setErrorCode(null), 
                                                  // ★ 运行视图里给一个回铺子资料的入口（与顶部页签同源）
                                                  onGoShop: () => switchView('shop'), 
                                                  // ★ 从铺子资料填入待审内容的信号（见上面 `fill` 的注释）
                                                  fill: fill, 
                                                  // ★ 从铺子资料点「开始运行」过来的信号（见 `focusSeq` 的注释）：
                                                  //   切回来之后把发起区**滚到正中间**，不是"过去了就算到了"
                                                  focusSeq: focusSeq, onFocusConsumed: consumeFocus, lead: isLoading
                                                      ? '正在读取…'
                                                      : scenes.length === 0
                                                          ? snap?.reason ?? '这个铺子还没有可用的流程。'
                                                          : null }) })] }))] })] })] }));
      }
      /**
       * 数据源状态条。
       *
       * ★★ 只在**需要解释**的时候出现（`live` 时不占位置）：
       *   · `unreachable` / `no_channel` ⇒ **必须说清为什么**，并给"改用演示数据"的出路
       *   · `mock` ⇒ 明示"这是演示数据"（纪律 3）
       *
       * ★ 连不上时**保持数据区为空**，不偷偷填 mock —— 见文件头那段。
       */
      function SourceBanner({ snap, onUseMock }) {
          if (snap === null || snap.kind === 'live')
              return null;
          const bad = snap.kind === 'unreachable' || snap.kind === 'no_channel';
          return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-source": snap.kind, style: {
                  padding: '8px 14px',
                  borderBottom: `1px solid ${theme_js_1.C.border}`,
                  background: bad ? 'rgba(220,38,38,0.05)' : 'rgba(107,114,128,0.06)',
                  fontSize: theme_js_1.FS.small,
                  lineHeight: 1.7,
              }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: bad ? '#dc2626' : theme_js_1.C.dim }, children: snap.label }), snap.reason !== null && (0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.dim }, children: ["\u3000", snap.reason] }), bad && ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "\u6539\u7528\u6F14\u793A\u6570\u636E", onClick: onUseMock, style: {
                          marginLeft: 10,
                          fontSize: theme_js_1.FS.tag,
                          padding: '2px 9px',
                          border: `1px solid ${theme_js_1.C.border}`,
                          borderRadius: 4,
                          background: 'transparent',
                          color: 'inherit',
                          cursor: 'pointer',
                          font: 'inherit',
                      }, children: "\u6539\u7528\u6F14\u793A\u6570\u636E\u770B\u770B" }))] }));
      }
      /* ───────────── 过程概览（B 组 · 2026-10-06）───────────── */
      /**
       * 本次运行的**事实**：什么场景、本场跑了哪些审核面、轮次怎么走、服务端什么时候跑的。
       *
       * ★★ 为什么单开一块
       *
       *   这几行**全是 `start` / `round_*` 事件里本来就有的东西**，之前**一个都没显示**
       *   ⇒ "这一场到底审了哪几个审核面、回了几次炉"，只能靠往下的灯行一个个去数。
       *
       * ★★ 为什么它**长在**本文件（装配层）、而不是 `RightPane`（运行视图）
       *
       *   ① 它**不是**运行视图的一部分：运行视图是"这一场审到了什么"，
       *      本块是"这一场**跑了些什么**"的概览 —— 两件事。
       *   ② **判据边界**：`RightPane` 渲染出的整块 DOM 就是 `data-kaipu-run`，
       *      而那节口径明写「新增锚点必须在 `data-kaipu-run` **之外**」。
       *      本块的「轮次走向」一行**含判定词**（`第 1 轮 ✅通过`）——
       *      若留在边界内，探针那些"运行视图里出现了 ✅通过"的断言会被**这一行**喂饱，
       *      而它要验的是**判定与口径面**真的在。
       *      ⇒ **物理隔离**（`data-kaipu-process`），而不是让判据自己记得做减法。
       *      ★ 我方第一版正是"探针读文本时排除 `[data-kaipu-facts]`" —— 已废弃：
       *        减法只在"读的人记得减"时成立，换个人写判据污染立刻回来。
       *        **先隔离，再展示**（回函原文）就是这个意思。
       *
       * ★★ 为什么轮次只给**结构**、不给**时刻**（诚实说明，不是省事）
       *
       *   事件流里**没有到达时刻**（契约 §3.4 的事件不带时间戳，`serverTime` 只在 `start` 那一处），
       *   而 `reduceRun` 是**纯函数** —— 它不能在内部拿 `Date.now()`
       *   （那样同一个事件序列会产出不同结果，判据与单测当场失真）。
       *   ⇒ 这里只排**结构**：第几轮 → 判定 → 下一轮（**回炉因此看得见**）。
       *     **不编**一个本地时刻去冒充"每轮是什么时候跑的"。
       */
      function ProcessFacts({ run }) {
          // ★ 没跑过就没有"过程"可概览 —— 不摆一个空壳（空壳会被读成"跑了但什么都没有"）
          if (run.status === 'idle')
              return null;
          const rows = [];
          if (run.scene !== null && run.scene !== '')
              rows.push({ label: '场景', value: run.scene });
          if (run.participated.length > 0) {
              rows.push({ label: '本场审核面', value: run.participated.join('、') });
          }
          if (run.rounds.length > 0) {
              // ★ 只排结构（轮次号 + 判定），**不带时刻** —— 原因见上面那段
              rows.push({
                  label: '轮次走向',
                  value: run.rounds
                      .map((r) => (r.verdict === null ? `第 ${r.round} 轮` : `第 ${r.round} 轮 ${r.verdict}`))
                      .join(' → '),
              });
          }
          if (run.serverTime !== null)
              rows.push({ label: '服务端时刻', value: run.serverTime });
          if (rows.length === 0)
              return null;
          return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-process": "1", style: {
                  marginTop: 12,
                  padding: '8px 10px',
                  background: theme_js_1.C.soft,
                  fontSize: theme_js_1.FS.small,
                  lineHeight: theme_js_1.LH.loose,
              }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.small, fontWeight: 600, color: theme_js_1.C.text, marginBottom: 3 }, children: "\u591A Agent \u4F1A\u5546\u8109\u7EDC" }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.tag, color: theme_js_1.C.dim, marginBottom: 3 }, children: "\u672C\u6B21\u8FD0\u884C \u00B7 \u8FC7\u7A0B\u6982\u89C8\uFF08\u9010\u8F6E\u5224\u5B9A\u4E0E\u56DE\u7089\u8D70\u5411\uFF09" }), rows.map((r) => ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 10 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim, minWidth: 68, flex: '0 0 auto' }, children: r.label }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.text, minWidth: 0, overflowWrap: 'break-word' }, children: r.value })] }, r.label)))] }));
      }
      /* ───────────── 顶部页签：操作台 / 铺子资料 / 管理方 / 怎么用（2026-10-08）───────────── */
      /**
       * ★★ 顶部页签栏 —— 四个页签，**顺序即 `tabs` 数组顺序**（做 → 我的东西 → 管理 → 帮助）。
       *
       * 设计决定（逐条有理由）：
       *   1. **四个并列 tab，不用抽屉**：这四件事互不从属，平级才诚实。
       *   2. **激活态用底部 3px 蓝线**（`C.accent`），不用暖金 —— 暖金是"签名灯/主行动"的语义色，
       *      页签是**导航**性质，避免"看起来像主 CTA"。
       *   3. **不持久化选择**：页签是导航，不该跨挂载记忆（同 `Intro` 不写 localStorage 的纪律）。
       *   4. ★ 锚点 `data-kaipu-tab={id}`（`console` / `shop` / `manage` / `help`）——
       *      **判据切页签靠它，不靠中文文案**（文案会改，锚点不会）。
       *   5. ★ **首访可发现保底**：演示模式下「怎么用」挂一个小蓝点，**看过即消** ——
       *      引导从"右栏顶上一张卡"变成"一个页签"之后，第一眼的人不一定会去点它。
       *      看没看过（`helpSeen`）由装配层持有：**页签是导航，不跨挂载记忆**（同第 3 条）。
       *      非演示模式不挂 —— 那种人手里已有一份别人给的接入凭据，不是"第一次看"。
       */
      function TabBar({ view, onSwitch, showHelpNew, }) {
          const tabs = [
              { id: 'console', label: '操作台' },
              { id: 'shop', label: '铺子资料' },
              { id: 'manage', label: '管理方' },
              { id: 'help', label: '怎么用' },
          ];
          return ((0, jsx_runtime_1.jsx)("nav", { "data-kaipu-tabs": "1", role: "tablist", "aria-label": "\u89C6\u56FE\u5207\u6362", style: {
                  flex: '0 0 auto',
                  display: 'flex',
                  gap: 4,
                  padding: '0 12px',
                  borderBottom: `1px solid ${theme_js_1.C.border}`,
                  background: theme_js_1.C.soft,
              }, children: tabs.map((t) => {
                  const active = view === t.id;
                  return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "tab", "data-kaipu-tab": t.id, "aria-selected": active, onClick: () => onSwitch(t.id), style: {
                          fontSize: theme_js_1.FS.base,
                          padding: '9px 14px',
                          border: 'none',
                          borderBottom: active ? `3px solid ${theme_js_1.C.accent}` : '3px solid transparent',
                          background: 'transparent',
                          color: active ? theme_js_1.C.text : theme_js_1.C.dim,
                          cursor: 'pointer',
                          font: 'inherit',
                          marginBottom: -1,
                      }, children: [t.label, t.id === 'help' && showHelpNew && ((0, jsx_runtime_1.jsx)("span", { "data-kaipu-tab-new": "help", "aria-label": "\u8FD8\u6CA1\u770B\u8FC7", style: {
                                  display: 'inline-block',
                                  width: 6,
                                  height: 6,
                                  marginLeft: 5,
                                  borderRadius: 3,
                                  background: theme_js_1.C.accent,
                                  verticalAlign: 'super',
                              } }))] }, t.id));
              }) }));
      }
      /**
       * ★★ 窄屏的「选场景」折叠条（2026-10-08）。
       *
       * ── 它补的是什么（不是"优化"，是补一个缺）────────────────────────────
       *   评估实测：容器 < 640 时左栏与把手**都不渲染** ⇒ 544px 宽的面板里
       *   用户**没有任何选场景的入口**。而 `selected` 会自动选中第一场，
       *   界面看起来一切正常 —— 他只会发现自己**换不了场**，也不知道该去哪儿换。
       *
       * ── 三个设计决定 ───────────────────────────────────────────────────
       *   1. ★ **内容复用 `LeftPane` 本体**（`where="picker"`），不新写一份场景列表。
       *      左栏不只有场景：还有「执行方」（谁被接进这场戏 / 谁待接入）与
       *      「该怎么选」（推荐位）。只给一个场景下拉，等于在窄屏下**把这两块删掉**；
       *      而另写一份窄屏版，两份会各自长歪（少一个「待接入 N」都没人发现）。
       *   2. ★ **默认收起**（`<details>` 不带 `open`）：窄屏本来就矮，
       *      常驻展开会把运行视图挤下去。收起态只占一行，且那一行**写着当前是哪一场** ——
       *      不看也知道自己站在哪儿（`data-kaipu-scene-current`）。
       *   3. ★ **用原生 `<details>`**，不自绘抽屉/浮层：面板挂在宿主容器里，
       *      容器常带 `overflow` 裁剪，自绘浮层会被裁掉还得自己处理定位/键盘/触屏；
       *      原生 `<details>` 零 JS、键盘可用、不会被裁（同左栏分类折叠的取舍）。
       *
       * ── 锚点 ───────────────────────────────────────────────────────────
       *   `data-kaipu-scene-picker` = 折叠条本身（探针断"窄屏有它、宽屏没有它"）
       *   `data-kaipu-scene-picker-body` = 展开后的那份内容（由 `LeftPane` 挂）
       *   ★ 两者与宽屏的 `data-kaipu-left` **严格分开** ——
       *     共用一个名字会让"窄屏下左栏不在"那条反向断言当场失效。理由见 `LeftPaneProps.where`。
       *
       * ★ 展开区给 `maxHeight` + 自己滚：场景多时（真服务端可能十几场）
       *   不让它把整页顶下去 —— 它是个**选择器**，不是页面主体。
       */
      function NarrowScenePicker({ agents, scenes, categories, recommendations, selected, onSelect, }) {
          /**
           * ★★ 展开态**由这里持有**（2026-10-08 · 拍板 §一）。
           *
           * 为什么从"原生非受控"改成受控：拍板要一条新行为 ——
           *   **选完一场就自动收起**（选场景是这个框唯一的本职，选完就该把屏幕还给运行视图）。
           *   非受控的 `<details>` 做不到"程序化收起"。
           *
           * ★★ 但**必须保住非受控当初要的那条性质**：「数据刷新不会把它弹回去」。
           *   受控写法天然满足 —— `open` 只在**用户动作**里变（下面两处），
           *   数据换代（切数据源 / 快照重取）不碰它。
           *   ⇒ 换句话说：改用受控是**为了加一条新行为**，不是为了放松旧性质。
           */
          const [open, setOpen] = (0, react_1.useState)(false);
          /**
           * ★ 选一场 = 换场 + **顺手收起**（拍板 §一）。
           * ★ 不把 `onSelect` 直接透给 `LeftPane`：那样就得改 `LeftPane` 的签名去接一个
           *   "选完之后干什么"的回调 —— 而"选完收起"是**折叠条自己的事**（左栏常驻，无所谓收起）。
           *   在装配层包一层，语义留在它该在的地方。
           */
          const pickAndFold = (scene) => {
              onSelect(scene);
              setOpen(false);
          };
          return ((0, jsx_runtime_1.jsxs)("details", { "data-kaipu-scene-picker": "1", open: open, onToggle: (e) => setOpen(e.currentTarget.open), style: { flex: '0 0 auto', borderBottom: `1px solid ${theme_js_1.C.border}`, background: theme_js_1.C.soft }, children: [(0, jsx_runtime_1.jsxs)("summary", { style: {
                          padding: '7px 14px',
                          cursor: 'pointer',
                          fontSize: theme_js_1.FS.small,
                          lineHeight: 1.7,
                          // ★ 摘要行不许被长场景名撑破容器（窄屏本来就窄）
                          overflowWrap: 'break-word',
                      }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.dim }, children: "\u573A\u666F" }), (0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 8 }, children: (0, jsx_runtime_1.jsx)(LeftPane_js_1.SceneCurrent, { scenes: scenes, selected: selected }) }), (0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 8, color: theme_js_1.C.faint }, children: open ? '点收起' : '点开换一场' })] }), (0, jsx_runtime_1.jsx)("div", { style: { maxHeight: 320, overflowY: 'auto', borderTop: `1px solid ${theme_js_1.C.border}` }, children: (0, jsx_runtime_1.jsx)(LeftPane_js_1.LeftPane, { agents: agents, scenes: scenes, categories: categories, recommendations: recommendations, selected: selected, onSelect: pickAndFold, where: "picker", 
                          // ★ 场景前置（拍板 §一）：这个框的本职就是选场景 ——
                          //   而实测框高 320 / 场景列表起点 341px，不前置就得先滚过执行方与推荐位（100 §六）。
                          sceneFirst: true }) })] }));
      }
      /**
       * 「铺子资料」页 —— 整页即 `ShopShelf`。
       *
       * ★ 折叠态**由本页自持**（`open`）：`ShopShelf` 自身不持有折叠状态
       *   （它当年把状态抬给装配层，是为了让"顶部跳转按钮"和"抽屉自己"说的是同一件事；
       *    现在跳转按钮没了，本页就是那个装配层 ⇒ 状态落在本页最自然）。
       * ★ 默认展开：这是"我自己的东西"放哪儿 —— 藏起来会让人以为这儿根本没这一块。
       */
      function ShopPage({ onFill, onGoRun, }) {
          const [open, setOpen] = (0, react_1.useState)(true);
          return ((0, jsx_runtime_1.jsx)("div", { style: { padding: '4px 0 24px' }, children: (0, jsx_runtime_1.jsx)(ShopShelf_js_1.ShopShelf, { onFill: onFill, onGoRun: onGoRun, open: open, onToggleOpen: () => setOpen((v) => !v) }) }));
      }
      /**
       * 「怎么用」页 —— 整页即 `Intro`。
       *
       * ★ 与旧版（右栏顶部一张可展开/收起的卡）的区别：**去掉「收起」按钮，整页即内容** ——
       *   页签本身就是"我来学用法"的意图表达，再让人先"展开"一次是多余的动作。
       * ★ 锚点 `data-kaipu-intro` 保留（判据认它）。
       */
      function HelpPage() {
          return ((0, jsx_runtime_1.jsx)("div", { style: { padding: '4px 0 24px' }, children: (0, jsx_runtime_1.jsx)(Intro_js_1.Intro, {}) }));
      }
      /**
       * 管理方页签 · 占位 + 指路（2026-10-08 · 发起人定「发起开铺默认是管理方」）。
       *
       * ★★ 它**不是**管理功能：客户端零管理能力（红线 ③）。这里只做两件事：
       *   ① 把"管理方是谁、他主持什么"讲清楚 —— 对齐「发起开铺默认是管理方」的决策：
       *      主动研究过开铺、知道流程的人主持会商，握手成本最低、流程最顺。
       *   ② 指路到服务端管理方界面（P2.5）—— 真动作（发起开铺 / 指派执行方）在那边做，
       *      本地演示模式不开此入口（如实说"暂不开放"，不伪造 picker）。
       *
       * ★★ 落在 `[data-kaipu-run]` **之外**：整个页签切换走运行视图，结构上够不着判据边界
       *   （「先隔离，再展示」的本意 —— 不是靠判据自己记得排除）。
       */
      function ManagePlaceholder() {
          return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-manage": "1", style: {
                  margin: '14px 12px',
                  padding: '16px 18px',
                  border: `1px solid ${theme_js_1.C.border}`,
                  borderRadius: 8,
                  background: theme_js_1.C.soft,
              }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title }, children: "\uD83E\uDE94 \u7BA1\u7406\u65B9 \u00B7 \u5F00\u94FA\u4E3B\u6301" }), (0, jsx_runtime_1.jsxs)("p", { style: { margin: '10px 0 0', fontSize: theme_js_1.FS.base, lineHeight: theme_js_1.LH.normal, color: theme_js_1.C.text }, children: ["\u9ED8\u8BA4\u7531", (0, jsx_runtime_1.jsx)("b", { children: "\u53D1\u8D77\u5F00\u94FA\u7684\u4EBA\uFF08\u7BA1\u7406\u65B9\uFF09" }), "\u4E3B\u6301\u4F1A\u5546\u6D41\u7A0B\u3002\u4ED6\u901A\u5E38\u5DF2\u4E3B\u52A8\u7814\u7A76\u8FC7\u5F00\u94FA\u3001\u77E5\u9053\u6D41\u7A0B\uFF0C\u63E1\u624B\u6210\u672C\u6700\u4F4E\u3001\u6D41\u7A0B\u6700\u987A\u3002"] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 12, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.loose }, children: "\u7BA1\u7406\u65B9\u7684\u52A8\u4F5C\uFF08\u5747\u5728\u573A\u5730\u670D\u52A1\u7AEF\u7684\u7BA1\u7406\u65B9\u754C\u9762\u64CD\u4F5C\uFF0CP2.5\uFF09\uFF1A" }), (0, jsx_runtime_1.jsxs)("ul", { style: { margin: '6px 0 0', paddingLeft: 20, fontSize: theme_js_1.FS.base, color: theme_js_1.C.text, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsx)("li", { children: "\u53D1\u8D77\u5F00\u94FA\uFF08\u5EFA\u4E00\u573A\u573A\u666F / \u4F1A\u5546\u6D41\u7A0B\uFF09" }), (0, jsx_runtime_1.jsx)("li", { children: "\u6307\u6D3E\u6267\u884C\u65B9\uFF08\u6267\u884C\u4F4D \u00B7 \u5BA1\u8BA1\u4F4D\uFF09" }), (0, jsx_runtime_1.jsx)("li", { children: "\u8C03\u6574\u89D2\u8272\u4F4D\uFF08\u53D8\u66F4\u7559\u75D5\uFF0C\u53EF\u8FFD\u6EAF\uFF09" })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                          marginTop: 14,
                          padding: '8px 12px',
                          border: `1px dashed ${theme_js_1.C.border}`,
                          borderRadius: 6,
                          fontSize: theme_js_1.FS.small,
                          color: theme_js_1.C.dim,
                          lineHeight: theme_js_1.LH.loose,
                      }, children: "\u7BA1\u7406\u65B9\u529F\u80FD\u5C1A\u672A\u5F00\u653E \u2014\u2014 \u5F85\u95E8\u7981 068 \u63A5\u5165\u540E\u843D\u5730\uFF08P2.5\uFF09\u3002\u53D1\u8D77\u5F00\u94FA\u3001\u6307\u6D3E\u6267\u884C\u65B9\u7B49\u52A8\u4F5C\uFF0C \u5747\u9700\u5728\u573A\u5730\u65B9\u7684\u7BA1\u7406\u65B9\u754C\u9762\u5B8C\u6210\uFF1B\u8FD9\u91CC\u4E0D\u63D0\u4F9B\u4EFB\u4F55\u64CD\u4F5C\u5165\u53E3\u3002" })] }));
      }
      //# sourceMappingURL=PlatformPanel.js.map
      return module.exports;
    })();

    /* ── client/PlatformPanelIcon.js ── */
    var m_PlatformPanelIcon = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PlatformPanelIcon = PlatformPanelIcon;
      /**
       * 山海·开铺 · 场地插件 · 侧边栏图标（骨架）
       * ★ 座位是 list：注册时**必须**给 `id`，否则 apply 抛错 ⇒ 整站白屏。
       */
      const react_1 = require("react");
      function PlatformPanelIcon() {
          return (0, react_1.createElement)('span', { 'aria-label': '开铺', title: '开铺', style: { display: 'inline-flex' } }, (0, react_1.createElement)('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true }, 
          // 一盏灯 / 一个铺面的极简记号（Step 4 再定稿视觉）
          (0, react_1.createElement)('path', {
              d: 'M4 10h16M6 10v9h12v-9M9 19v-5h6v5',
              stroke: 'currentColor',
              strokeWidth: 1.6,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
          })));
      }
      //# sourceMappingURL=PlatformPanelIcon.js.map
      return module.exports;
    })();

    /* ── client/index.js ── */
    var m_index_2 = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.inject = void 0;
      exports.apply = apply;
      /**
       * 山海·开铺 · 场地插件 · client half
       * =====================================================================
       * 这一半在**浏览器侧**（DSH web shell 里），往 UI 的 slot 树注册界面。
       * 与 `../index.ts`（host half）是两半，**通过 rpc 见面**，不共享内存。
       *
       * ── ★★ 两条 inject 是两套词表（最贵的坑之一）──────────────
       *
       *   · `package.json` 的 `dsh.client.inject` = **模块图边**（boot 顺序）→ 填**包名**
       *   · 本文件导出的 `inject`                   = **cordis 服务依赖**   → 填**服务名**
       *
       *   早先把包名填进本文件的 inject，结果卡在
       *     `pending (waiting for services: @deepseek-ai/dsh-client-ui-renderer, …)`
       *   侧边栏图标根本出不来。⇒ **别犯第二次。**
       *
       * ── ★★ 面板必须成对注册──────────────────────────────────────
       *
       *   · `sidebar.panellist`（list）：`id` + `order` + **`label` 必须是函数**
       *   · `main`（keyed）：`key` **必须等于** 上面那个 `id`
       *   两者靠同一个字符串对上号，写错就是「点了没反应」。
       *
       * ── ★★ list 座位漏 `id` ⇒ 整站白屏─────────────────────────
       *
       *   实测：`sidebar.session.row.leading` 漏 `id` ⇒ apply 阶段抛错
       *   ⇒ 整个 client bundle 加载失败 ⇒ **整站白屏**。list 座位**必须**给 `id`。
       */
      const react_1 = require("react");
      const Brand_js_1 = m_Brand;
      const bridge_js_1 = m_bridge;
      const live_js_1 = m_live;
      const panel_id_js_1 = m_panel_id;
      const PlatformPanel_js_1 = m_PlatformPanel;
      const PlatformPanelIcon_js_1 = m_PlatformPanelIcon;
      /**
       * ★ 服务名（不是包名）。
       *   · `slots`      —— 由 ui-renderer 提供（面板注册用）
       *   · `connection` —— 由 `@deepseek-ai/dsh-client-connection` 提供（**数据通道**；
       *     面板经它调本插件 host half，见 `bridge.ts` 文件头）
       *
       * ★★ 这里**曾经加过** `'remote'`（为了走流式端点），2026-10-05 **撤掉了**，原因记在这：
       *   加了 `'remote'` 之后确实能拿到 `ctx.remote`（键：`ctx/name/ownerCtx/connection/
       *   namespaces/hostFacts/streams/events/mutations`），**但里面没有 `kaipu`** ——
       *   DSH 侧装配 namespace 的那份清单是**硬编码的内部包清单**
       *   （逐个 `import '@deepseek-ai/xxx/remote'` 再 `ctx.remote.$mount(...)`），
       *   **第三方插件不在其中**，namespace 不会自动来。
       *   ⇒ 运行改走一元通道（`startRun` + `pollRun`），`remote` 也就不需要了。
       *   ★ 留这条注释是因为"加 inject 拿 remote"是一条**看起来最自然、实际走不通**的路，
       *     下一个人很可能再试一次。
       */
      exports.inject = ['slots', 'connection'];
      function apply(ctx) {
          // ── ⓪ 取数据通道（★ 取不到也不能炸：面板会显示"通道不可用"，见 live.ts）──
          (0, live_js_1.setConnection)((0, bridge_js_1.getConnection)(ctx));
          // ── ① 主区域面板（keyed slot）──────────────────────────────
          ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: panel_id_js_1.PANEL_ID }, () => (0, react_1.createElement)(PlatformPanel_js_1.PlatformPanel, {})));
          // ── ② 侧边栏图标（list slot · ★ id/order/label 三件套缺一不可）──
          ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
              name: 'sidebar.panellist',
              id: panel_id_js_1.PANEL_ID, // ★ 必须 == 上面 main 的 key
              /**
               * ★★ `order` 的取值不是审美，是**位置礼仪**（2026-10-05 实测后改）。
               *
               * 宿主 `sidebar` 的排序规则（实测自行为）：
               *   `.sort((a, b) => a.order - b.order)`  —— 升序，**同值看注册顺序**。
               *
               * 宿主内置项的 order 区间（实测自各包注册处）：
               *   · `ui-plugin-manager`（插件）  0
               *   · `ui-schedule`（任务）        10
               *   · `ui-agent-preset`            20
               *
               * ★ 原来我写 `0` —— 与宿主「插件」**同值**，实测结果是我的按钮**排在它前面**：
               *     `… 全局面板 | 开铺 | 插件 | 智囊团 …`
               *   这不是"我们更重要"，而是**打乱了宿主既有用户的位置记忆**（插件按钮是宿主自带的，
               *   用户已经形成肌肉记忆；第三方插件插到它前面，等于替宿主改了布局）。
               *
               * ⇒ **第三方插件一律排在宿主内置项之后**：取 **> 20** 的值。用 30 留出空隙，
               *   后来者要插在中间也有位置（这是"给后人留位"的取值，不是随手写的）。
               */
              order: 30,
              // ★ label 是**函数**：sidebar 读取时调用。传字符串不报错但会显示成 "[object]"。
              label: () => '开铺',
          }, PlatformPanelIcon_js_1.PlatformPanelIcon));
          // ── ③ 宿主侧边栏的**品牌名**（2026-10-07 加 · 发起人点题）──────────
          //
          // 座位 `sidebar.brand.name` 是宿主**公开**的品牌位（官方自己的品牌插件
          // 就是它的示例占用者）⇒ 占它是"坐席位"，不是改宿主源码。
          // ★ 只占 name、不占 mark：图形标继续用宿主原生那条鱼（发起人：头像先不动）。
          // ★ 完整的理由 / 字号依据 / 为什么必须兜底 —— 全在 `Brand.tsx` 文件头。
          ctx.slots.inject('sidebar.brand.name', () => {
              try {
                  return ctx.slots.register({ name: 'sidebar.brand.name' }, Brand_js_1.KaipuBrandName);
              }
              catch {
                  // ★★ 这一格已经被坐了（宿主是 official 构建时，官方品牌插件先到）。
                  //   座位类型是 **single** —— 同优先级重复注册会 **throw**，
                  //   而 apply() 抛错 ⇒ 整个 client bundle 加载失败 ⇒ **整站白屏**。
                  //   ⇒ 让给它，静默退回宿主原生名。**不争**（同 order:30 那条的姿态）。
                  return () => { };
              }
          });
      }
      //# sourceMappingURL=index.js.map
      return module.exports;
    })();

    return m_index_2;
  },
});
