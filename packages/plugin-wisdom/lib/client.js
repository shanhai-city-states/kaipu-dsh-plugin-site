/* 山海·开铺 · client bundle · @shanhai/kaipu-wisdom-team
 * 由 tools/build-client.mjs 生成 —— 请勿手改。
 * 模块 7 个（按依赖序）· 宿主外部模块 2 个：react/jsx-runtime, react
 */
window.__ModuleLoader__.load({
  id: "@shanhai/kaipu-wisdom-team",
  factory: function (require) {
    'use strict';

    /* ── client/panel-id.js ── */
    var m_panel_id = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WISDOM_PANEL_ID = void 0;
      /** ★ 智囊团面板 id —— 唯一出处（`main.key` 与 `sidebar.panellist.id` 必须相等） */
      exports.WISDOM_PANEL_ID = 'shanhai-kaipu-wisdom';
      //# sourceMappingURL=panel-id.js.map
      return module.exports;
    })();

    /* ── client/bridge.js ── */
    var m_bridge = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      /**
       * 山海·开铺 · 智囊团插件 · client half —— 宿主通道（data channel）
       * =====================================================================
       * 面板**不直连服务端域名**，而是经**宿主网关**调 host half：
       *
       *   浏览器(client)  --connection.rpc.call('/api','kaipu/listScenes',{args:{query}})-->
       *   DSH 网关（同源 · 已鉴权）  --> 场地插件的 host half（Node）  --fetch--> kai-pu
       *
       * ══════════════════════════════════════════════════════════════════
       * ★★★ 本文件是**架构抉择的落点**，请先读这一段
       * ══════════════════════════════════════════════════════════════════
       *
       * **问题**：智囊团面板要读 `/scenes`，但两包**互不 import**
       * （解耦判据会 FAIL）。那数据从哪来？三条路：
       *
       *   | 选项 | 做法 | 判定 |
       *   |:--|:--|:--|
       *   | ① 智囊团**自己起一份 host remote** | 在自家 `src/index.ts` 里 `new` 一个 service | ❌ **不可行** |
       *   | ② 智囊团 client **调同一个网关端点**（**本文件即此**） | 只经 `connection` 服务发 rpc | ✅ **采用** |
       *   | ③ 等场地插件**暴露一个 cordis 服务**给智囊团用 | 需要场地配合 | ⏸ 过度设计（现在不需要） |
       *
       * **为什么 ① 不可行（技术硬约束，不是偏好）**：
       *   `TypertRemoteService` 的第 2 个构造参数就是**命名空间**（场地侧是 `'kaipu'`）。
       *   DSH 的网关按命名空间挂载 ⇒ **同一个 ns 只能挂一个 service**。
       *   智囊团若也 `super(ctx, 'kaipu')`，要么**覆盖**场地的通道（则场地挂掉），
       *   要么被拒（则智囊团挂掉）—— 两种结果都违反「摘掉智囊团，场地仍完整可用」。
       *
       * **为什么 ② 是正解 —— 关键是把「约束管的是什么」读准**：
       *
       *   > 约束的原文边界是「两包的 **client half 互不 import**」、
       *   > 「只通过**契约**通信」—— 它管的是**源码依赖**与**模块图**，
       *   > **不是"两组前端代码不能访问同一个网关"**。
       *
       *   `REMOTE_NS = 'kaipu'` 是**网关命名空间的字符串**，是**契约面**（wire），
       *   不是包边界。智囊团拼出 `'kaipu/listScenes'` 这个字符串去调，
       *   **既不 import 场地的任何源码，也不进它的模块图** ⇒ 约束完好。
       *
       *   ★ 一个可以自检的类比：两个第三方插件都能调同一个 HTTP API，
       *     这不叫"它们互相依赖"。**依赖 = import，不是 = 调同一个地址。**
       *
       * **★ 这条选择的代价，如实标出来（不许悄悄藏）**：
       *   · 端点名字符串现在**有第三处副本**（场地 host、场地 client、本文件）
       *     ⇒ 靠配套的桥接检查脚本 D 组**扩到三处对账**看护（已改）。
       *   · 智囊团**依赖场地插件在场**（端点由它注册）。这与上面的约束冲突吗？
       *     **不冲突，且这正是设计意图** —— 见下。
       *
       * **★★ 这两条约束为什么不受影响（这一条最要紧，别读错）**：
       *
       *   · 「可摘除」要求的是「**摘掉智囊团** ⇒ 场地仍完整可用」—— 方向是**智囊团→场地**，
       *     **没有**反过来要求"摘掉场地 ⇒ 智囊团仍能用"。
       *     （场地是**基座**，智囊团是**配套面板**，README 原文就写着"配套侧边面板"。）
       *   · 「零内置」要求的是「**场地**零内置可跑」——场地自己不带 Agent 也能起，
       *     这件事**与智囊团读不读得到数据无关**。
       *   · ⇒ 所以"**智囊团需要场地在场**"是**正常且预期**的形态。
       *     但**表现方式必须诚实**：场地不在 / 通道不通时，智囊团面板
       *     必须**如实说"通道不可用"或"读不到"**，**绝不默默显成"5 个灯位全待接入"**
       *     —— 那是把"我没读到"伪装成"你这里没人"，**编造了一个不存在的事实**。
       *     （这条与场地侧 `live.ts` 的"绝不悄悄回落 mock"是同一条价值取向。）
       *
       * ══════════════════════════════════════════════════════════════════
       * ★★ 调用形态的两个硬细节（从场地侧逐字照搬，不是"参考"）
       * ══════════════════════════════════════════════════════════════════
       *   ① **`payload.args` 必须是对象、不是数组**，且键名 = host 方法的**参数名**：
       *        `{ args: { query: { … } } }`  ✅
       *   ② **`call()` 的返回已经剥过一层信封**：拿到的直接是 `result`。
       *   ★ 两层 `ok` 必须分清（网关层 / 业务层），否则错误会"串层" ——
       *     把 `gateway/bad-request` 当业务错误码去查文案表 ⇒ 查不到 ⇒ 显成"未知错误"。
       *
       * ⚠️ **为什么本文件不 import 场地的 `bridge.ts`**：那是源码 import ⇒ 判据 FAIL。
       *    这里是**同形状的重写**（约 60 行），不是 `import`。两者的**行为必须一致**，
       *    由配套的桥接检查脚本比对两处的 `REMOTE_NS` / `REMOTE_CHANNEL` 常量值。
       */
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ENDPOINTS = exports.CONNECTION_SERVICE = exports.REMOTE_CHANNEL = exports.REMOTE_NS = void 0;
      exports.endpointOf = endpointOf;
      exports.getConnection = getConnection;
      exports.callKaipu = callKaipu;
      /* ══════════════════════════════════════════════════════════════════
         ★★ 端点常量：本文件与场地侧 host/client **各有一份**，判据强制三处一致
         ══════════════════════════════════════════════════════════════════
       * 为什么不共用一个文件：两端 tsconfig 的 module 格式不同（host ESM / client CJS），
       * 编到同一路径会**互相覆盖**；而 host 运行时又不能用契约包（构建期依赖，用户机上没有）。
       * ⇒ 按本仓一贯做法：**各写一份 + 机器看护**（不靠记性）。
       *
       * ★ 端点字符串写错 = "点了没反应"（不报错、不白屏、面板就是没数据）
       *   ⇒ 一致性**必须有机器看护**，这正是配套的桥接检查脚本的 D 组。
       */
      /**
       * remote 命名空间。
       * ★★ 注意语义：这是**网关逻辑命名空间**（由**场地插件**注册），
       *   **不是**"智囊团在调场地插件"。见文件头那段架构说明。
       */
      exports.REMOTE_NS = 'kaipu';
      /** 调用通道（宿主网关的逻辑通道名）—— ★ 永不进真实 URL */
      exports.REMOTE_CHANNEL = '/api';
      /** 宿主网关服务键（DSH 的 wire root 服务） */
      exports.CONNECTION_SERVICE = 'connection';
      /**
       * ★★ 智囊团**只用这两个端点** —— 这份清单**故意写窄**。
       *
       * 为什么窄：智囊团只做"这群谋士（组织与资历）"，**不看运行过程**
       * （那是场地面板 `RightPane` 的活）。⇒ 它只需要"有哪些场景 / 谁在灯位上"。
       * `startRun` / `pollRun` **不要** —— 智囊团不发起会商（发起在地面板）。
       *
       * ★ 这条窄清单本身就是一条**设计纪律**：若哪天有人想在这里加 `startRun`，
       *   他应该先回答"智囊团为什么要发起会商"—— 大概率答案是"不该"。
       */
      exports.ENDPOINTS = {
          /** 接没接上（第一件要知道的事）。★ 用它拿 `server.baseUrl` / 数据源状态 */
          status: 'status',
          /** 场景目录（灯位数据的**唯一来源**：`scenes[].lamps`） */
          listScenes: 'listScenes',
          /** 执行方目录（灯位**状态判定**的唯一来源：`agents[].status`） */
          listAgents: 'listAgents',
      };
      /** 拼出客户端要调的完整端点：`kaipu/listScenes` */
      function endpointOf(method) {
          return `${exports.REMOTE_NS}/${method}`;
      }
      /**
       * 从 cordis ctx 取 `connection`。
       * ★ 两种取法都试（实测不同版本/装配时序表现不一致）⇒ **取到哪个用哪个，不要赌**。
       * ★ 取不到**不抛**：返回 null，由面板显示"通道不可用"，而不是让面板炸掉。
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
       * @param conn   connection 服务
       * @param method host 方法名（**不带**命名空间）
       * @param query  业务参数（host 方法第一个参数的实参）
       * @param signal 取消信号（**可选**）
       */
      async function callKaipu(conn, method, query, signal) {
          const payload = { args: { query } }; // ★ 见文件头 ①
          let raw;
          try {
              raw = await conn.rpc.call(exports.REMOTE_CHANNEL, endpointOf(method), payload, signal);
          }
          catch (e) {
              const detail = e instanceof Error ? e.message : String(e);
              // ★★ HTTP 404 不是「连不上」—— 网关**应答了**，只是说"没有这条路由"。
              //   本项目里 404 有**两个来源**，别混：
              //
              //   ① **网关无此命名空间**（`kaipu` 上没有 service 注册）
              //      —— 典型：场地插件未安装/未加载成功 ⇒ 这里归 gateway/not_found ⇒ `stale`，
              //      出路文案指"查插件装载"。**这是本 catch 块要处理的那一种。**
              //   ② **URL 拼串错**（如报文里出现 `/api/kaipu/status` —— `api` 是通道名、
              //      `kaipu` 是命名空间，**都不该出现在 HTTP URL 里**）⇒ 那是**我方客户端 bug**，
              //      症状同样是 404，但出路是"改 baseUrl/拼串"，**不是查插件**。
              //   ⇒ 分不清就按 ① 报（fail-closed：宁可提示"查装载"，也不谎报"接上了"）；
              //     若发现 detail 里带 `/api/` 段（②的指纹），说明是我方拼串问题，别赖服务端。
              //
              //   真机验收抓到的形状（2026-10-06）：
              //   connection client 把网关 404 抛成 "transport failure for /api/kaipu/status: HTTP 404"。
              if (/\b404\b/.test(detail)) {
                  return { ok: false, error: { kind: 'gateway', code: 'not_found', detail } };
              }
              return {
                  ok: false,
                  error: { kind: 'unreachable', code: 'transport', detail },
              };
          }
          const gw = raw;
          if (gw === null || typeof gw !== 'object') {
              return { ok: false, error: { kind: 'gateway', code: 'bad_result', detail: '网关返回体为空' } };
          }
          if (gw.ok !== true) {
              // ★★ 网关**另一种** 404 形状（服务端指南 v2 §三「404 有两种」实测形态）：
              //   宿主网关路径不存在时回的是 `{success:false, message:"路径不存在: /api/kaipu/status"}`
              //   —— 注意它用的是 **`success`/`message`**，与上面声明的 `ok`/`error` **不是同一套键**。
              //   若不识别，`gw.error?.code` 取到 undefined ⇒ 归成 `code:'gateway'` ⇒
              //   `looksLikeMissingEndpoint` 匹配不上 ⇒ 落到 `unreachable`「未连上」、
              //   原因只剩泛泛的"网关调用失败"，**出路指错方向**（该查接入地址却让人查网络）。
              //   ⇒ 这里按 v2 的纪律补一条：**先问"这个串是谁拼的"**，认出来就归 not_found。
              const anyGw = gw;
              const gwMsg = anyGw.message ?? anyGw.error?.message ?? '';
              if (anyGw.success === false || /路径不存在/.test(gwMsg)) {
                  return { ok: false, error: { kind: 'gateway', code: 'not_found', detail: gwMsg || '路径不存在' } };
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

    /* ── client/live.js ── */
    var m_live = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.setConnection = setConnection;
      exports.hasConnection = hasConnection;
      exports.loadLive = loadLive;
      exports.lampText = lampText;
      exports.summarize = summarize;
      exports.summaryText = summaryText;
      const bridge_js_1 = m_bridge;
      /* ══════════════════════════════════════════════════════════════════
         一、连接句柄（模块级单例 —— 由 `index.ts` 的 apply 注入）
         ══════════════════════════════════════════════════════════════════
       * ★ 为什么放模块级：面板组件在 slot 里渲染，**拿不到插件的 cordis ctx**。
       *   `apply()` 时取到 connection 存这里，面板读这里 —— 与场地侧同款做法。
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
       * `status` 的收敛规则 —— ★★ **不编 `disabled`**。
       *
       * 与场地侧 `toAgentStatus` **同一条取向**（那是被真服务端实测抓出来修的）：
       *   · `disabled` = 某人把这位子**关掉了**（一个确定的决定）
       *   · `pending`  = 这位子**还没人接**（正常态）
       *   两者给用户的下一步动作完全不同（"去问为什么关掉" vs "去接入"）。
       *
       * ⇒ 契约外的未知值**归 `pending`**（"状态未明"最接近实情），
       *   **不归 `disabled`** —— 那是在断言"有人关掉了它"，而我们并不知道。
       *   一句话：**宁可说不知道，不可编原因。**
       */
      function toRawStatus(s) {
          if (s === 'enabled')
              return 'enabled';
          if (s === 'disabled')
              return 'disabled';
          return 'pending';
      }
      /**
       * ★★ 归一化：一个原始灯位 → `LampSeat`。**这是本文件唯一的判定入口。**
       *
       * 判定链（顺序不能颠倒）：
       *   ① 该 lamp 的 `agentId`
       *      · 为 null / undefined ⇒ `vacant`
       *   ② 该 id 在 `/agents` 里查不到 ⇒ `vacant`（**fail-closed**：无法证明有人）
       *   ③ 查到了，看它的 `status`
       *      · `pending`  ⇒ `registered`（有人，未上线）
       *      · `disabled` ⇒ `registered`（有人，被关掉）—— 行文案同期不区分，提示里如实写
       *      · `enabled`  ⇒ `ready`
       *
       * ★ 为什么 `disabled` 不进 `ready`：`ready` 在界面上的意思是"这个位子**能干活**"。
       *   被停用的 Agent 显然不能 ⇒ 绝不进。
       *   为什么也不进 `vacant`：`vacant` 的意思是"**这个位子空着**"，
       *   而被停用的位子是"**有人占着、但被关掉了**" —— 说成"空着"就是**编事实**。
       */
      function normalizeLamp(lamp, agentId, agentName, byId) {
          if (agentId === null) {
              return { lamp, state: 'vacant', agentId: null, agentName: null, rawStatus: null, scenes: [] };
          }
          const a = byId.get(agentId);
          if (a === undefined) {
              // 查不到 ⇒ 无法证明这个位子有人 ⇒ vacant（fail-closed）
              // ★ 但**保留原始 agentId 到调用方日志**是没必要的（不上屏）—— 界面显"待接入"即可
              return { lamp, state: 'vacant', agentId: null, agentName: null, rawStatus: null, scenes: [] };
          }
          const state = a.status === 'enabled' ? 'ready' : 'registered';
          return {
              lamp,
              state,
              agentId: a.id,
              // ★ 显示名**优先用灯位自己给的**（服务端可能按场景定制），退回 Agent 卡片的 name
              agentName: agentName ?? a.name ?? a.id,
              rawStatus: a.status,
              scenes: [],
          };
      }
      /**
       * 从一个场景里取出「灯位名 × agentId × agentName」三元组。
       *
       * ★ 为什么要吃**两种形状**（对象数组 / 字符串数组）：
       *   服务端 2026-10-06 已按契约 §23.3 升格为对象数组，并**同时**给 `lampNames`
       *   （老形状 · 逐字相同）⇒ 两种都可能出现。
       *
       * ⚠️ 字符串形状**没有 agentId** ⇒ 只能当"一个纯维度名"处理
       *   （即视作 `agentId: null`）。**不靠 role 猜执行方** ——
       *   场地侧在这条上踩过坑（`mapLamps` 靠 role 猜，服务端改形状后静默退化成"全部待接入"，
       *   而那次的**结果碰巧是对的**，所以没被发现）。
       *   ⇒ 智囊团这边**直接不猜**：字符串形状 = 该场景只是列了维度名，无执行方信息。
       */
      function lampTriplesOf(s) {
          const out = [];
          const raw = s.lamps;
          if (Array.isArray(raw)) {
              for (const item of raw) {
                  if (typeof item === 'string') {
                      if (item !== '')
                          out.push({ lamp: item, agentId: null, agentName: null });
                      continue;
                  }
                  if (item === null || typeof item !== 'object')
                      continue;
                  const lamp = typeof item.lamp === 'string' ? item.lamp : '';
                  if (lamp === '')
                      continue;
                  out.push({
                      lamp,
                      agentId: typeof item.agentId === 'string' && item.agentId !== '' ? item.agentId : null,
                      agentName: typeof item.agentName === 'string' && item.agentName !== '' ? item.agentName : null,
                  });
              }
              return out;
          }
          // 老形状：只有维度名
          if (Array.isArray(s.lampNames)) {
              for (const n of s.lampNames) {
                  if (typeof n === 'string' && n !== '')
                      out.push({ lamp: n, agentId: null, agentName: null });
              }
          }
          return out;
      }
      /**
       * 把「场景列表 + 执行方列表」归一成**灯位清单**。
       *
       * ★★ 合并策略：**以灯位名去重，跨场景合并**。
       *
       *   为什么按名字合并：**同一个维度名在多场景里出现是常态**
       *   （实测：`战略维度` 出现在 `multi-dim-review`，很可能将来也出现在别的场景）。
       *   而智囊团问的是"**这个位子上是谁**" —— 同名的位子就是同一个位子。
       *
       *   ⚠️ **一个必须说清的边界**：若服务端在不同场景给**同名灯位配了不同 agentId**，
       *   本实现以**最后一个**为准（Map 覆盖），并且**不报错**。
       *   ⇒ 这是有意的吗？**不是** —— 这是"现在拿不到证据"时的**最简处理**。
       *     已登记为待确认（见下方 `OPEN`），并**由探针看护**：
       *     探针会断言"同名灯位在多场景里的 agentId 一致"，一旦不一致就 FAIL。
       *     ★ 那条断言现在**可能因为数据里只有 1 个场景用到该灯位而恒真** ——
       *       所以它标为"**暂不构成证据**"，等真有跨场景同名的样本才升级为硬判据。
       */
      function buildLamps(scenes, agents) {
          const byId = new Map();
          for (const a of agents)
              byId.set(a.id, a);
          const lamps = new Map();
          const sceneOf = new Map();
          for (const s of scenes) {
              const label = typeof s.label === 'string' && s.label !== '' ? s.label : s.scene;
              for (const t of lampTriplesOf(s)) {
                  lamps.set(t.lamp, normalizeLamp(t.lamp, t.agentId, t.agentName, byId));
                  const list = sceneOf.get(t.lamp) ?? [];
                  if (!list.includes(label))
                      list.push(label);
                  sceneOf.set(t.lamp, list);
              }
          }
          // §四 反查：把"服务于哪些场景"贴回每个灯位（★ 空数组 = 反查不到，界面不编场景名）
          for (const [name, l] of lamps) {
              lamps.set(name, { ...l, scenes: sceneOf.get(name) ?? [] });
          }
          return [...lamps.values()];
      }
      /* ══════════════════════════════════════════════════════════════════
         五、加载
         ══════════════════════════════════════════════════════════════════ */
      const p = (r) => r.ok === true ? '' : 'business' in r ? r.business.message : r.error.detail;
      /**
       * ★★ 读不到 ⇒ 返回**空 + 原因**，**绝不填演示数据**。
       *
       * 这条是场地侧被 `live-probe --expect=unreachable` **当场抓到的真缺陷**
       * （第一版失败分支写 `{ ...mockSnapshot(), kind:'unreachable' }` ⇒
       *  界面出现最坏组合：**状态条说「未接入」，左边却摆着 5 个演示场景**）。
       * ⇒ 现在一律返回空列表，原因写在状态带里。
       *
       * ★ 另外：这里的文案是**上屏文本**，不许带 markdown 记号
       *   （场地侧第一版把 `**…**` 直接印在了界面上）。
       */
      function offlineSnapshot(kind, label, reason) {
          return { kind, label, reason, lamps: [], scenes: [], server: null };
      }
      /**
       * 判断一个失败**是不是"端点不存在"** —— 这是 `stale` 态的触发条件。
       *
       * ★ 为什么要专门识别它：端点不存在 = **场地插件不在场**（或没加载成功），
       *   这是**环境问题**，与"服务端连不上"是两件不同的事，
       *   用户的下一步动作也不同（去查插件装载 vs 去查网络/地址）。
       *
       * ★ 判据来源：网关层（第 1 层）的 `error.code`。
       *   ⚠️ 具体的码名由 DSH 网关定义，我这里**按"包含/等于"宽容匹配**，
       *   因为**锁死一个精确码名**的风险是把未来网关改名误判成"服务端故障"——
       *   而那个误判方向会让用户去查错的地方。
       *   若匹配不上 ⇒ 退回 `unreachable`（**更宽的那一类**，不会漏报问题）。
       */
      function looksLikeMissingEndpoint(err) {
          if (err.kind !== 'gateway')
              return false;
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
      /** 读真服务端。**任何一步失败都如实返回，不回落到 mock** */
      async function loadLive(signal) {
          if (connection === null) {
              return offlineSnapshot('no_channel', '通道不可用', '没取到宿主的数据通道。这是环境问题，不是服务端故障。');
          }
          /* ── ① 先问"接没接上" ── */
          const st = await (0, bridge_js_1.callKaipu)(connection, 'status', {}, signal);
          if (st.ok !== true) {
              // ★ 这一步失败最常见的原因**不是**服务端挂了，而是**场地插件不在场**（端点未注册）
              if (!('business' in st) && looksLikeMissingEndpoint(st.error)) {
                  // ★ 但 404 有两个来源（见 bridge.ts 与**服务端指南 v2 §三「404 有两种」**）：
                  //   先看是否带"我方拼串"指纹 —— 报文里出现 `/api/<ns>/…` 段，或宿主网关那句
                  //   「路径不存在: …」（`api` 是通道名、`kaipu` 是命名空间，**都不该进 HTTP URL**），
                  //   那是我方接入地址/拼串的问题，出路**不是**查插件装载。如实分开说。
                  const ownBug = /\/api\//.test(st.error.detail) || /路径不存在/.test(st.error.detail);
                  return offlineSnapshot('stale', '灯位数据读不到', ownBug
                      ? '接入地址不对 —— 数据通道没有被正确寻址（路径里混入了内部通道段），请核对「开铺」场地插件的接入地址配置。'
                      : '数据通道未就绪 —— 灯位数据由「开铺」场地插件提供，它可能未安装或未加载成功。');
              }
              return offlineSnapshot('unreachable', '未连上', p(st));
          }
          if (!st.data.connected) {
              return offlineSnapshot('unreachable', '未接入（本地模式）', '还没配接入地址。填上服务端地址即可接入 —— 未接入不是故障。');
          }
          /* ── ② 取灯位原料（场景 + 执行方） ── */
          const [sc, ag] = await Promise.all([
              (0, bridge_js_1.callKaipu)(connection, 'listScenes', {}, signal),
              (0, bridge_js_1.callKaipu)(connection, 'listAgents', {}, signal),
          ]);
          if (sc.ok !== true) {
              if (!('business' in sc) && looksLikeMissingEndpoint(sc.error)) {
                  return offlineSnapshot('stale', '灯位数据读不到', '读场景失败：数据通道未就绪。');
              }
              return offlineSnapshot('unreachable', '读场景失败', p(sc));
          }
          if (ag.ok !== true) {
              if (!('business' in ag) && looksLikeMissingEndpoint(ag.error)) {
                  return offlineSnapshot('stale', '灯位数据读不到', '读执行方失败：数据通道未就绪。');
              }
              return offlineSnapshot('unreachable', '读执行方失败', p(ag));
          }
          const agents = (ag.data.agents ?? []).map((a) => ({
              id: a.id,
              slug: a.id,
              name: a.name ?? a.id,
              role: '',
              capabilities: [],
              skillSummary: '',
              status: toRawStatus(a.status),
              version: 0,
          }));
          const scenes = sc.data.scenes ?? [];
          return {
              kind: 'live',
              label: '已接入',
              reason: null,
              lamps: buildLamps(scenes, agents),
              scenes: scenes.map((s) => ({
                  label: typeof s.label === 'string' && s.label !== '' ? s.label : s.scene,
                  lamps: lampTriplesOf(s).map((t) => t.lamp),
              })),
              server: { baseUrl: st.data.baseUrl, accountId: st.data.accountId },
          };
      }
      /**
       * ★ 灯位行的**状态文案**。
       *
       * | state | 文案 | 依据 |
       * |:--|:--|:--|
       * | `vacant` | 「待接入」 | 位子空着 |
       * | `registered` | 「待接入」 | ★ **Q1=a** —— 保守，与 vacant 同形 |
       * | `ready` | 「已就绪」 | 在位可用 |
       *
       * ★★ **为什么这个纯函数住在 `live.ts`（数据层）而不是 `WisdomPanel.tsx`（界面层）**：
       *   判据要断言"Q1=a 的两面同时成立"：
       *     · 行文案上 `vacant` 与 `registered` **同形**
       *     · 汇总文案上两者**不同形**
       *   若它住在 tsx 里，判据 import 产物时会**连带 require react**
       *   ⇒ 判据要么起浏览器（慢、样本受限），要么 mock 一个 react（**测的是 mock**）。
       *   ⇒ 放这里，判据能**直接调真函数**。
       *
       *   ★ 这是一条**可推广的分层纪律**：
       *     **"可被断言的纯逻辑"不放在需要框架运行时的文件里。**
       *     它与本项目"判据必须调被测代码本身"那条纪律是配套的 ——
       *     光有"要测真代码"的意愿，若代码住在框架文件里，最后还是只能 mock。
       */
      function lampText(seat) {
          return seat.state === 'ready' ? '已就绪' : '待接入';
      }
      /**
       * 汇总。★ 纯函数，便于单独断言（判据会喂构造样本）。
       *
       * ★ 三条不变式（断言用，写完代码立刻自查一遍）：
       *   · `vacant + registered + ready === total`
       *   · 各值 >= 0
       *   · 空数组 ⇒ 全 0（**不是**"5 个待接入"—— 那要靠 `kind !== 'live'` 区分，见文件头）
       */
      function summarize(lamps) {
          let vacant = 0;
          let registered = 0;
          let ready = 0;
          for (const l of lamps) {
              if (l.state === 'vacant')
                  vacant++;
              else if (l.state === 'registered')
                  registered++;
              else
                  ready++;
          }
          return { total: lamps.length, vacant, registered, ready };
      }
      /**
       * ★ 状态带的**文案** —— 独立成纯函数，因为它是该裁定的**可断言面**。
       *
       * 形态：`已接入 · 5 灯位 · 5 已登记待启用`
       *   · 有 `ready` 时加 `N 在位`
       *   · 有 `vacant` 时加 `N 未登记`（**橙** —— 那是真的"还缺人"）
       *   · 全空（total=0 且 live）⇒ `暂无灯位`（★ 与"5 个待接入"**绝不同形**）
       *
       * ★★ 为什么 `registered` 与 `vacant` **都要显**（不能只显一个）：
       *   裁定要求"内部区分"，那就要**两句话都在场**才有"区分"可言。
       *   只显一个 = 没区分。
       */
      function summaryText(s) {
          if (s.total === 0)
              return '暂无灯位';
          const parts = [`${s.total} 灯位`];
          if (s.ready > 0)
              parts.push(`${s.ready} 在位`);
          if (s.registered > 0)
              parts.push(`${s.registered} 已登记待启用`);
          if (s.vacant > 0)
              parts.push(`${s.vacant} 未登记`);
          return parts.join(' · ');
      }
      /* ══════════════════════════════════════════════════════════════════
         ★ 待确认（OPEN）—— 本轮**不擅自定**的点，记在这里免得忘
         ══════════════════════════════════════════════════════════════════
       *
       * · **`disabled` 的行文案**：本轮只裁了 `pending`。
       *   `disabled` 现在归入 `registered`，行文案同期显「待接入」，
       *   只在悬停提示里如实写「已停用」。
       *   ⇒ 若需要对它独立的行文案（如「已停用」），那是一次**新口径裁定**。
       *   ⚠️ 风险等级：低（当前真服务端 `disabled` 读数为 0）。
       *
       * · **同名灯位跨场景配不同 agentId**：现以**最后出现的**为准。
       *   探针有一条软断言看护（暂不构成证据，见 `buildLamps` 注释）。
       *   ⇒ 若真出现这种数据，需要一次**语义裁定**（同名灯位到底是不是同一个位子）。
       *
       * · **Q2（5 条灯是否共享同一 host Agent）**：★★ 待服务端一句话。
       *   ⇒ 本文件的数据结构**对这个答案不敏感**（`LampSeat` 逐灯位独立表达），
       *     区别只在**界面措辞**："一体五面" vs "五个空位"。
       *     ⇒ 答了之后**改一处文案**，不动结构（这正是已承诺的降级行为）。
       */
      //# sourceMappingURL=live.js.map
      return module.exports;
    })();

    /* ── client/theme.js ── */
    var m_theme = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.VACANT = exports.LH = exports.FS = exports.FONT = exports.C = exports.TONE_BG = void 0;
      /* ── 判定色：实底 + 白字（理由见场地侧同名注释，此处不重复） ── */
      exports.TONE_BG = {
          pass: '#16a34a',
          conditional: '#d97706',
          reject: '#dc2626',
          refuse: '#6d28d9',
      };
      /**
       * 中性色 —— 三级色阶：主体（text）→ 说明（dim）→ 元信息（faint）。
       * ★ 层级靠**色阶**做、不靠字号：字号一动，中文的行高与折行都会跟着变。
       */
      exports.C = {
          border: 'var(--dsh-border, #e5e5e5)',
          text: 'var(--dsh-text, inherit)',
          dim: 'var(--dsh-text-secondary, #8a8a8a)',
          faint: 'var(--dsh-text-tertiary, color-mix(in srgb, currentColor 45%, transparent))',
          soft: 'var(--dsh-surface-secondary, rgba(127,127,127,0.08))',
          accent: '#3B6FE0',
      };
      exports.FONT = {
          /** 数字 / ID 用等宽，避免抖动 */
          mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      };
      /** 字号阶梯（与场地侧同值；用 px 不用 rem —— 根字号不由我们控制） */
      exports.FS = {
          tag: 12,
          small: 13,
          base: 14,
          title: 15,
          heading: 17,
      };
      /** 行高：中文需要比英文松一点才不挤 */
      exports.LH = {
          tight: 1.6,
          normal: 1.8,
          loose: 2,
      };
      /**
       * ★ 状态带上「待接入」用的橙 —— **与 `TONE_BG.conditional` 同值**。
       *
       * 为什么要单独起名：它的语义**不是判定**（conditional 是"有条件通过"这个判定档），
       * 而是"**这里还缺人**"。两者恰好同色是**视觉经济**（橙=需要注意），
       * 但**语义不同** ⇒ 起两个名字，将来若要给"缺人"换色，改一处不影响判定体系。
       */
      exports.VACANT = '#d97706';
      //# sourceMappingURL=theme.js.map
      return module.exports;
    })();

    /* ── client/WisdomPanel.js ── */
    var m_WisdomPanel = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WisdomPanel = WisdomPanel;
      exports.wireConnection = wireConnection;
      const jsx_runtime_1 = require("react/jsx-runtime");
      /**
       * 山海·开铺 · 智囊团插件 · 面板（四区会商视图）
       * =====================================================================
       * 定位：**一群谋士（会商量的组织）**，不是"一组专家（能力的集合）"。
       *
       * ══════════════════════════════════════════════════════════════════
       * ★★ 与场地面板的分工（已确认）
       * ══════════════════════════════════════════════════════════════════
       *
       * 我读场地插件 `RightPane.tsx` 时发现：**"会商"这件事，场地插件已经渲染得很完整了**
       * （`RoundBlock` 有第 N 轮 + 回炉理由，`LampRow` 有维度 + 执行方 + 判定 + 耗时）。
       * ⇒ 若本面板把同一份数据再渲染一遍，就是"**两个面板、同一件事**"：
       *   用户会问"我该看哪个"，且两处都要跟着契约改（维护双份）。
       *
       * ⇒ **切法是「同一批数据的两个时间尺度」**：
       *
       *   | 面板 | 问的问题 | 时间尺度 |
       *   |:--|:--|:--|
       *   | 场地 `RightPane` | 「**这一次**会商跑到哪了」 | 一场（面向过程） |
       *   | 智囊团（本文件） | 「**这群谋士**是谁 · 服务哪些场子」 | 跨场（面向组织） |
       *
       * ★ **所以本面板不显示判定 / 耗时 / 轮次** —— 那些是场地面板的活。
       *
       * ══════════════════════════════════════════════════════════════════
       * ★★ 四区（设计稿 · 可开工 4/5 区）
       * ══════════════════════════════════════════════════════════════════
       *   ① 状态带    —— 接没接上 / 几个灯位 / **已登记 vs 未登记**（状态带区分的落点）
       *   ② 灯位一览  —— ★ 核心区：这里的"人"是谁（判定**只认 agentId**）
       *   ③ 场景归属  —— 这几位服务于哪些场景（复用 `scenes[].lamps` 反查）
       *   ④ 会商履历  —— ⏸ **只占位**（数据源未知）
       *
       * ★★ **空态是一等公民**：现在真实数据就是 **5/5 待接入**
       *   ⇒ "空态"**不是边缘情况，而是当前的主要状态**。
       *   它是「场地零内置可跑」的**用户可见面**，措辞要**正向且诚实**：
       *   不是"我们还没装好"（那是我们的问题），而是"**位子给你留着了**"（这是场地的承诺）。
       */
      const react_1 = require("react");
      const bridge_js_1 = m_bridge;
      const live_js_1 = m_live;
      const theme_js_1 = m_theme;
      function WisdomPanel() {
          const [snap, setSnap] = (0, react_1.useState)(null);
          /**
           * ★ 取一次快照。
           *
           * ⚠️ 本插件**不做"改用演示数据"按钮**（场地侧有）。
           *   为什么不做：场地面板那个按钮是为了**设计评审**（便于设计评审看界面）。
           *   智囊团的空态**本身就是当前真实状态**（5/5 待接入）⇒ 不需要编演示数据
           *   来"演示空态"—— 编了反而**掩盖了真实的空态长什么样**。
           *   ★ 若将来评审需要，再加不迟；现在加就是**多一个能说谎的入口**。
           */
          (0, react_1.useEffect)(() => {
              let alive = true;
              const ac = new AbortController();
              void (async () => {
                  const next = await (0, live_js_1.loadLive)(ac.signal);
                  if (alive)
                      setSnap(next);
              })();
              return () => {
                  alive = false;
                  ac.abort();
              };
          }, []);
          const lamps = (0, react_1.useMemo)(() => snap?.lamps ?? [], [snap]);
          const sum = (0, react_1.useMemo)(() => (0, live_js_1.summarize)(lamps), [lamps]);
          return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-wisdom": "1", style: { padding: 16, overflowWrap: 'break-word', color: theme_js_1.C.text }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.heading, fontWeight: 600, marginBottom: 10 }, children: "\u667A\u56CA\u56E2" }), (0, jsx_runtime_1.jsx)(StatusBand, { snap: snap, sum: sum }), snap !== null && snap.kind !== 'live' ? ((0, jsx_runtime_1.jsx)(Unreadable, { kind: snap.kind, reason: snap.reason })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(LampSection, { lamps: lamps, loading: snap === null }), (0, jsx_runtime_1.jsx)(SceneSection, { scenes: snap?.scenes ?? [], loading: snap === null })] })), (0, jsx_runtime_1.jsx)(HistorySection, {})] }));
      }
      /* ══════════════════════════════════════════════════════════════════
         ① 状态带（一行 · 不占高度）
         ══════════════════════════════════════════════════════════════════ */
      /**
       * ★★ 「状态带内部区分已登记/未登记」的**唯一落点**。
       *
       * 形态：`已接入 · 5 灯位 · 5 已登记待启用`
       *
       * ★ 为什么把"已登记/未登记"提到**第一行**：
       *   这是「场地零内置可跑」的**用户可见面**，现在实测 5/5 都不是 `ready`
       *   ⇒ 这件事**不该藏在下滑区**，第一眼就要看到。
       *
       * ★ 数据源状态**三态显式**（`live` 外都带原因），**绝不悄悄回落**。
       */
      function StatusBand({ snap, sum }) {
          const kind = snap === null ? 'loading' : snap.kind;
          const label = snap === null ? '正在读取…' : snap.label;
          return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-wisdom-band": kind, style: {
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 8,
                  flexWrap: 'wrap',
                  paddingBottom: 10,
                  borderBottom: `1px solid ${theme_js_1.C.border}`,
                  fontSize: theme_js_1.FS.small,
                  lineHeight: theme_js_1.LH.normal,
              }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: kind === 'live' ? theme_js_1.C.dim : theme_js_1.VACANT }, children: label }), snap !== null && snap.kind === 'live' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_js_1.C.faint }, children: "\u00B7" }), (0, jsx_runtime_1.jsx)("span", { "data-kaipu-wisdom-summary": "1", style: { color: theme_js_1.C.text }, children: (0, live_js_1.summaryText)(sum) })] }))] }));
      }
      /* ══════════════════════════════════════════════════════════════════
         ② 灯位一览（核心区）
         ══════════════════════════════════════════════════════════════════ */
      /** 网格形状（发起人 2026-10-06 定：一组 5 个灯位一行，预留大概 4-5 组 ⇒ 取上沿 5 行；要调改这两个常量即可） */
      const LAMP_COLS = 5;
      const LAMP_ROWS = 5;
      function LampSection({ lamps, loading }) {
          return ((0, jsx_runtime_1.jsxs)("section", { style: { marginTop: 14 }, children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\u706F\u4F4D" }), loading ? ((0, jsx_runtime_1.jsx)(Hint, { children: "\u6B63\u5728\u8BFB\u53D6\u2026" })) : lamps.length === 0 ? (
                  /* ★ 零灯位 ≠ "5 个待接入"。措辞必须分开：
                       - 零灯位 = 这个铺子**还没配灯组**（去配）
                       - 全待接入 = 灯组配好了，**人还没来**（去接人） */
                  (0, jsx_runtime_1.jsx)(Hint, { children: "\u8FD9\u4E2A\u94FA\u5B50\u8FD8\u6CA1\u6709\u706F\u4F4D\u3002\u706F\u7EC4\u7531\u573A\u666F\u5B9A\u4E49\u51B3\u5B9A\u3002" })) : ((0, jsx_runtime_1.jsx)(LampGrid, { lamps: lamps })), !loading && lamps.length > 0 && lamps.every((l) => l.state !== 'ready') && (0, jsx_runtime_1.jsx)(VacantNote, { lamps: lamps })] }));
      }
      /**
       * 灯位网格：**真灯位在前，占位补足到 `LAMP_COLS × LAMP_ROWS`**。
       *
       * ★★ 占位（`ReservedSlot`）是发起人点名的"预留灯位"—— 它把「位子给你留着了」
       *   从一句话变成**看得见的格子**。但它必须与真灯位**在判据层可分**：
       *   真灯位挂 `data-kaipu-wisdom-lamp`，占位挂 `data-kaipu-wisdom-slot="reserved"`
       *   —— 探针（`wisdom-view-probe.mjs`）数的是前者，占位混进去会把
       *   "至少渲染 1 个灯位行"和逐态断言全部污染。
       */
      function LampGrid({ lamps }) {
          const reserved = Math.max(0, LAMP_COLS * LAMP_ROWS - lamps.length);
          return ((0, jsx_runtime_1.jsxs)("div", { style: {
                  marginTop: 6,
                  display: 'grid',
                  gridTemplateColumns: `repeat(${String(LAMP_COLS)}, minmax(0, 1fr))`,
                  gap: 8,
              }, children: [lamps.map((l) => ((0, jsx_runtime_1.jsx)(LampCard, { seat: l }, l.lamp))), Array.from({ length: reserved }, (_, i) => ((0, jsx_runtime_1.jsx)(ReservedSlot, {}, `reserved-${String(i)}`)))] }));
      }
      /**
       * 一个灯位一张卡（原为一行；2026-10-06 起改网格卡，锚点与文案纪律**原样保留**）。
       *
       * ★★ **判定只认 `agentId`**（契约 §23.3 权威字段）——
       *   即使服务端把 `agentName` 写成 `(待接入)`，界面也不会"看起来对、其实错"。
       *
       * ★★ 状态文案**故意不区分 `vacant` / `registered`**（两者都显「待接入」）：
       *   区分发生在**状态带的汇总层** —— 见 `StatusBand` 与 `live.ts` 的 `LampState` 注释。
       *
       * ★★ 状态**紧贴灯名**（发起人 2026-10-06：别甩到行尾）——
       *   原一行式布局里状态用 `marginLeft:auto` 推到最右，灯一多名字与状态就分离了；
       *   卡片式天然上下相邻，这个问题消失。
       */
      function LampCard({ seat }) {
          const ready = seat.state === 'ready';
          const tip = lampTip(seat);
          return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-wisdom-lamp": seat.lamp, "data-kaipu-wisdom-lamp-state": seat.state, title: tip, "aria-label": `${seat.lamp}，${lampAria(seat)}`, style: {
                  padding: '8px 10px',
                  border: `1px solid ${theme_js_1.C.border}`,
                  borderLeft: `3px solid ${ready ? theme_js_1.C.accent : theme_js_1.VACANT}`,
                  borderRadius: 4,
                  // ★ 只有 `ready` 是满色；`vacant`/`registered` 不淡化（那是**正常态**，不是"坏了"）
                  cursor: tip === '' ? 'default' : 'help',
                  minWidth: 0,
              }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.base, color: theme_js_1.C.text, overflowWrap: 'break-word' }, children: seat.lamp }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 2 }, children: (0, jsx_runtime_1.jsx)("span", { "data-kaipu-wisdom-lamp-text": "1", style: { fontSize: theme_js_1.FS.tag, color: ready ? theme_js_1.C.dim : theme_js_1.VACANT }, children: (0, live_js_1.lampText)(seat) }) }), seat.agentId !== null && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 2, fontSize: theme_js_1.FS.tag, color: theme_js_1.C.faint, fontFamily: theme_js_1.FONT.mono, overflowWrap: 'break-word' }, children: seat.agentId }))] }));
      }
      /**
       * 预留灯位（虚线卡）—— **不是灯位**，只是"这里的格子留着"。
       * ⚠️ 不挂 `data-kaipu-wisdom-lamp`（见 `LampGrid` 注释）· `aria-hidden`：屏幕阅读器不读空位。
       */
      function ReservedSlot() {
          return ((0, jsx_runtime_1.jsx)("div", { "data-kaipu-wisdom-slot": "reserved", "aria-hidden": "true", style: {
                  padding: '8px 10px',
                  border: `1px dashed ${theme_js_1.C.border}`,
                  borderRadius: 4,
                  color: theme_js_1.C.faint,
                  fontSize: theme_js_1.FS.tag,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 0,
              }, children: "\u9884\u7559" }));
      }
      /**
       * 悬停提示 —— ★ **如实写**，不因为行文案合并了就把事实也合并掉。
       *
       * ★ 为什么这里要写出 `pending` / `disabled` 的区别：
       *   行文案为了保守合并成「待接入」，那是**给"扫一眼"的人看的**；
       *   而悬停是**给"想弄清楚"的人看的** —— 对他**不许说假话**。
       *   ⇒ `registered` 的提示必须说清"**有人了，但还没上线**"，
       *     否则行文案的保守就变成了**信息删失**。
       *
       * ★ 用原生 `title` 而不是自绘浮层（承场地侧理由）：面板挂在宿主容器里，
       *   容器常带 `overflow` 裁剪 ⇒ 自绘浮层会被裁掉；`title` 零 JS、不会被裁、
       *   屏幕阅读器会当 accessible description 读。
       *
       * ⚠️⚠️ **`title` 是纯文本，不渲染 markdown** ⇒ 文案里**不许有 `**` / `_` 之类记号**
       *   —— 它们会被**原样显示**（用户看到一串星号）。
       *   这不是洁癖：场地侧第一版就把 `**…**` 直接印在了界面上，属于同一类错
       *   （"上屏文本不许带 markdown 记号"是 `live.ts` 已立的纪律）。
       *   ⇒ 要强调就用中文标点（「」），不要用星号。
       */
      function lampTip(seat) {
          const parts = [];
          if (seat.state === 'vacant') {
              parts.push('这个位子还没有人接。');
          }
          else if (seat.state === 'registered') {
              // ★ 不合并：把"有人了"这个事实说出来
              parts.push(seat.rawStatus === 'disabled'
                  ? '这个位子有人，但当前被停用。'
                  : '这个位子已登记，但还没有上线。');
          }
          else {
              parts.push('这个位子已就绪。');
          }
          if (seat.agentId !== null)
              parts.push(`执行方：${seat.agentId}`);
          if (seat.scenes.length > 0)
              parts.push(`服务于：${seat.scenes.join(' · ')}`);
          return parts.join('\n');
      }
      function lampAria(seat) {
          if (seat.state === 'ready')
              return `${seat.agentId ?? ''} 已就绪`.trim();
          if (seat.state === 'registered')
              return '已登记待启用';
          return '待接入';
      }
      /**
       * ★★ 空态的正向表达 —— **本面板最重要的一句文案**。
       *
       * 取向：这是「场地零内置可跑」的正向表达 ——
       * **不是"我们还没装好"（那是我们的问题），而是"位子给你留着了"（这是场地的承诺）**。
       * 对齐总体定位：**"场地"是我们做的，"谁来"是客户定的。**
       *
       * ⚠️ **Q4 的纠结已落地**（Q4 归发起人拍，选了"两句分开说"的写法 ——
       *   即下面前两句；因为那既是诚实的、也是正向的）。
       *   ★ 但这里**没有**写第三句"内置谋士（山海智囊团）也在这个位子上，尚未入场"。
       *     为什么不写：**Q2 还没答**（5 条灯是否共享同一 host Agent）。
       *     若 Q2 答"共享" ⇒ 加那句成立；若答"各自独立" ⇒ 那句话是**错的**。
       *     ⇒ 在 Q2 落地前**只写不依赖 Q2 的两句**（这是已承诺的降级行为：
       *       不确定处不编，答了改一处文案，不动结构）。
       */
      function VacantNote({ lamps }) {
          const allVacant = lamps.every((l) => l.state === 'vacant');
          return ((0, jsx_runtime_1.jsxs)("div", { "data-kaipu-wisdom-vacant": allVacant ? 'all' : 'partial', style: { marginTop: 10, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.loose }, children: [(0, jsx_runtime_1.jsx)("div", { children: "\u8FD9\u7FA4\u8C0B\u58EB\u8FD8\u6CA1\u5230\u4F4D\u3002" }), (0, jsx_runtime_1.jsx)("div", { children: "\u706F\u4F4D\u5DF2\u5907\u597D\uFF0C\u8C01\u6765\u5750\u7531\u4F60\u5B9A\u3002" })] }));
      }
      /* ══════════════════════════════════════════════════════════════════
         ③ 场景归属
         ══════════════════════════════════════════════════════════════════ */
      /**
       * ★ 这一区的价值：它回答了"**这群谋士是给哪些场子用的**" ——
       *   场地面板**回答不了**这个问题（它只看一场）。**这就是"纵深"的第一个落点。**
       */
      function SceneSection({ scenes, loading }) {
          return ((0, jsx_runtime_1.jsxs)("section", { style: { marginTop: 16 }, children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\u670D\u52A1\u4E8E\u6B64\u5904\u7684\u573A\u666F" }), loading ? ((0, jsx_runtime_1.jsx)(Hint, { children: "\u6B63\u5728\u8BFB\u53D6\u2026" })) : scenes.length === 0 ? ((0, jsx_runtime_1.jsx)(Hint, { children: "\u8FD8\u6CA1\u6709\u53EF\u7528\u573A\u666F\u3002" })) : ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6 }, children: scenes.map((s) => ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '4px 0', fontSize: theme_js_1.FS.small, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.text }, children: ["\u00B7 ", s.label] }), s.lamps.length > 0 && ((0, jsx_runtime_1.jsxs)("span", { style: { color: theme_js_1.C.faint }, children: ["\u3000", s.lamps.join(' / ')] }))] }, s.label))) }))] }));
      }
      /* ══════════════════════════════════════════════════════════════════
         ④ 会商履历（⏸ 只占位 · 数据源未知）
         ══════════════════════════════════════════════════════════════════ */
      /**
       * ★★ **本期只画框**——数据源未知（P1 清单里**找不到**跨场会商记录的读口；
       *   `/roles/changes` 是**席位变更**，`/scene/{id}/run` 是**当次** SSE）。
       *
       * ★ 为什么不偷偷省掉它：若省掉，将来补上时**这一区无位置可插**，
       *   只能重排整个面板（那才是真返工）。**先占位、后填肉**是成本最低的做法。
       *
       * ★ 而且——**"暂无记录"本身是诚实的**：它没说"没有会商发生过"，
       *   只说"**这里还没有记录可看**"。句子里带出下一句，让用户知道不是他的问题。
       */
      function HistorySection() {
          return ((0, jsx_runtime_1.jsxs)("section", { "data-kaipu-wisdom-history": "placeholder", style: { marginTop: 16 }, children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\u4F1A\u5546\u5C65\u5386" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: [(0, jsx_runtime_1.jsx)("div", { children: "\u6682\u65E0\u8BB0\u5F55" }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.faint }, children: "\u8DE8\u573A\u4F1A\u5546\u8BB0\u5F55\u9700\u8981\u670D\u52A1\u7AEF\u63D0\u4F9B\uFF0C\u672C\u7248\u672C\u6682\u672A\u63A5\u5165\u3002" })] })] }));
      }
      /* ══════════════════════════════════════════════════════════════════
         小件
         ══════════════════════════════════════════════════════════════════ */
      function SectionTitle({ children }) {
          return ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: theme_js_1.FS.title, fontWeight: 600, color: theme_js_1.C.text }, children: children }));
      }
      function Hint({ children }) {
          return (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 6, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.normal }, children: children });
      }
      /**
       * ★★ **读不到**时的那一屏 —— 与"空态"**绝不同形**。
       *
       * 为什么必须独立成组件（而不是复用 `VacantNote`）：
       *   两者的**用户下一步动作完全不同** ——
       *     · 空态（`live` + 全 vacant）⇒ "**去接 Agent**"（用户自己的活）
       *     · 读不到（`stale`/`unreachable`/`no_channel`）⇒ "**去查通道/地址/插件**"（环境问题）
       *   用同一屏糊过去 = **把"我读不到"伪装成"你这里没人"** ——
       *   那是**编造了一个不存在的事实**，与"`pending` 被误显成「已停用」"是同一类错。
       *
       * ★ 措辞纪律：`stale`（通道未就绪）与 `unreachable`（连不上）**要分开说**，
       *   因为出路不同（查插件装载 vs 查地址/网络）。
       */
      function Unreadable({ kind, reason }) {
          return ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 14 }, children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\u706F\u4F4D" }), (0, jsx_runtime_1.jsxs)("div", { "data-kaipu-wisdom-unreadable": kind, style: { marginTop: 6, fontSize: theme_js_1.FS.small, color: theme_js_1.C.dim, lineHeight: theme_js_1.LH.loose }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.VACANT }, children: "\u8BFB\u4E0D\u5230\u706F\u4F4D\u6570\u636E\u3002" }), reason !== null && (0, jsx_runtime_1.jsx)("div", { children: reason }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_js_1.C.faint }, children: "\u8FD9\u4E0D\u4EE3\u8868\u706F\u4F4D\u662F\u7A7A\u7684 \u2014\u2014 \u53EA\u662F\u8FD9\u4E00\u4FA7\u6CA1\u80FD\u8BFB\u5230\u3002" })] })] }));
      }
      /* ══════════════════════════════════════════════════════════════════
         入口接线：★ 与场地侧**同款**，但**不 import 它的任何东西**
         ══════════════════════════════════════════════════════════════════
      
         ⚠️ 本模块在 `apply()` 里被调用一次。为什么把 `setConnection` 放这里
         而不是 `index.ts`：`index.ts` 是**接线层**，它不该知道"数据层怎么存句柄"。
         ⇒ 提供一个 `wireConnection(ctx)` 出口，让接线层只表达意图。
      */
      function wireConnection(ctx) {
          (0, live_js_1.setConnection)((0, bridge_js_1.getConnection)(ctx));
      }
      //# sourceMappingURL=WisdomPanel.js.map
      return module.exports;
    })();

    /* ── client/WisdomPanelIcon.js ── */
    var m_WisdomPanelIcon = (function () {
      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WisdomPanelIcon = WisdomPanelIcon;
      /**
       * 山海·开铺 · 智囊团插件 · 侧边栏图标（骨架）
       * ★ 座位是 list：注册时**必须**给 `id`，否则 apply 抛错 ⇒ 整站白屏。
       */
      const react_1 = require("react");
      function WisdomPanelIcon() {
          return (0, react_1.createElement)('span', { 'aria-label': '智囊团', title: '智囊团', style: { display: 'inline-flex' } }, (0, react_1.createElement)('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true }, 
          // 三盏灯围坐会商（Step 4 再定稿视觉）
          (0, react_1.createElement)('circle', { cx: 12, cy: 6.5, r: 2, stroke: 'currentColor', strokeWidth: 1.6 }), (0, react_1.createElement)('circle', { cx: 6.5, cy: 16.5, r: 2, stroke: 'currentColor', strokeWidth: 1.6 }), (0, react_1.createElement)('circle', { cx: 17.5, cy: 16.5, r: 2, stroke: 'currentColor', strokeWidth: 1.6 })));
      }
      //# sourceMappingURL=WisdomPanelIcon.js.map
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
      /**
       * 山海·开铺 · 智囊团插件 · client half
       * =====================================================================
       * ★ 与场地插件**同构但独立**：自己一个侧边栏入口、自己一个 main 面板。
       *   两者**互不 import**。
       *
       * ★ 两条 inject 是两套词表：package.json 填**包名**，这里填**服务名**。
       * ★ 面板成对注册：`main.key` == `sidebar.panellist.id`。
       * ★ list 座位**必须给 `id`**：漏了 ⇒ 整站白屏。
       *
       * ── ★★ 本轮（Step 4）新增：`connection` 注入 ────────────────────
       *
       * 智囊团面板要读灯位数据，走的是**宿主网关**（与场地侧同一条物理通道）。
       * 取 `connection` 的取法与场地侧**逐字一致**（宽松取两种形态、取不到不抛）。
       *
       * ★ 为什么不共用一份 `getConnection`：那是**源码 import** ⇒ 判据 FAIL。
       *   这里是同形状重写（`bridge.ts` 里约 20 行），**行为必须一致**，
       *   由配套的桥接检查脚本的 A 组比对 `REMOTE_NS` / `REMOTE_CHANNEL` 常量。
       *
       * ★ 取不到 connection **不能炸**：`wireConnection` 存 null，面板显示"通道不可用"。
       *   这是**环境问题**，不是业务错误 —— 见 `live.ts` 文件头。
       */
      const react_1 = require("react");
      const panel_id_js_1 = m_panel_id;
      const WisdomPanel_js_1 = m_WisdomPanel;
      const WisdomPanelIcon_js_1 = m_WisdomPanelIcon;
      /**
       * ★ 服务名（不是包名）。
       *   · `slots`      —— 由 ui-renderer 提供（面板注册用）
       *   · `connection` —— 由 `@deepseek-ai/dsh-client-connection` 提供（**数据通道**）
       *
       * ⚠️ `connection` 是**新增**的（Step 1 骨架时没有）——
       *   ⇒ `package.json` 的 `dsh.client.inject`（**包名**词表）也要同步加
       *     `@deepseek-ai/dsh-client-connection`，**两处都要**（漏一处 = 取不到服务）。
       *     这是踩过的坑：两套词表填反了会卡在 "waiting for services"。
       */
      exports.inject = ['slots', 'connection'];
      function apply(ctx) {
          // ── ⓪ 取数据通道（★ 取不到也不炸：面板会显示"通道不可用"）──
          //   取出入口在 WisdomPanel 里（`wireConnection`）——
          //   接线层只表达意图，不必知道"数据层把句柄存在哪"。
          (0, WisdomPanel_js_1.wireConnection)(ctx);
          ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: panel_id_js_1.WISDOM_PANEL_ID }, () => (0, react_1.createElement)(WisdomPanel_js_1.WisdomPanel, {})));
          ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
              name: 'sidebar.panellist',
              id: panel_id_js_1.WISDOM_PANEL_ID, // ★ 必须 == main 的 key
              order: 35, // ★ 排在场地插件（order 30）之后 —— 场地是核心，智囊团可选
              label: () => '智囊团', // ★ 必须是函数
          }, WisdomPanelIcon_js_1.WisdomPanelIcon));
      }
      //# sourceMappingURL=index.js.map
      return module.exports;
    })();

    return m_index;
  },
});
