/**
 * 山海·开铺 · 场地插件 · host 侧数据通道（Typert Remote / SRC 模式）
 * =====================================================================
 * 面板（client half）经 `connection.rpc.call('/api', 'kaipu/<method>', …)` 调到这里。
 * 本类只**声明**端点，descriptor 由 DSH Gateway 的 SRC 反射在**运行时**生成
 * ⇒ 本包零构建产物（不需要 tsdown / zod 代码生成）。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 三条硬约束（违反其一，整个 Gateway 直接抛错，**不是**静默不生效）
 * ══════════════════════════════════════════════════════════════════
 * （承 `src/remote/service.ts` 的实测结论，逐字照搬纪律）
 *
 * ① **参数名必须能被正则反射**
 *    Gateway 直接读 `Function.prototype.toString()` 的源码文本，逐参数匹配
 *    `/^[$A-Z_a-z][$\w]*$/`：
 *      `listScenes(query: XxxQuery, signal?: CancelSignal)` → "query,signal" ✅
 *      `listScenes(query = {}, signal?)`                    → "query={}"     ❌
 *    ⇒ **绝对禁止给参数写默认值**。类型注解与 `?` 会被编译器剥掉，安全。
 *
 * ② **`signal` 必须是最后一个参数**，否则报
 *    `SRC cancellation parameter signal must be the final parameter`。
 *
 * ③ **业务参数一律从 `query` 里取**，不要新增第二、第三个业务参数
 *    （每个业务参数都会变成 wire 上一个独立字段，客户端要按名传）。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 本文件与 `@shanhai/kaipu-contract` **零运行时耦合**（这是故意的）
 * ══════════════════════════════════════════════════════════════════
 * host half **不经打包**（tsc 直出 `lib/index.js`），所以它的裸 import 必须能在
 * **用户机的 profile** 里解析得到 —— 而 `@shanhai/kaipu-contract` 是**构建期**
 * 依赖（见根 README §二·补 留意1），**不在**用户机上。
 * ⇒ 若本文件 import 它，发布出去就是一条**解析不到的裸 import**（用户端直接挂）。
 *
 * ⇒ 因此**错误文案的翻译留在客户端**（client bundle 已把契约内联，
 *   `translateError` / `isReroutableError` 都在那边，判据也在那边）。
 *   本文件只回**机器可读的 `code`** + 一句**仅供诊断、不上屏**的原文。
 *   ——契约那条「不把原始错误直出给用户」的纪律，落点在客户端，不在这里。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 凭据（deviceToken）只活在**本进程内存**里
 * ══════════════════════════════════════════════════════════════════
 * 浏览器**永不持有** deviceToken：
 *   · 它在本类实例字段里，到期前 `TOKEN_RENEW_MARGIN_SEC` 秒自动续；
 *   · 不落盘、不进日志、不进任何返回值（`status` 只回"接没接上"，不回凭据）。
 * ⇒ 这正是"插件不直连服务端域名"这条纪律的**收益**，不是负担。
 */
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
// ★ SSE 分帧与「帧 → 事件」映射：**抽到零依赖的兄弟模块**（2026-10-06）。
//   相对 import 且它自己不 import 任何运行时依赖 ⇒ host half「不经打包、裸 import 可解析」
//   这条约束不受影响。这样判据也能直接 import 它来喂帧断言（由配套探针脚本）。
import { frameToEvent, parseSseFrame } from './sse-frame.js';
import { PLUGIN_VERSION } from './version.js';
// ★ 铺子资料（本地文件层）：**不打包、不发 HTTP** 的纯本机实现。
//   与上面那批网络端点性质不同 —— 它在 `shop-files.ts` 里自成一层，
//   本文件只负责把它接到 wire 上（注册端点 + 把结果折进统一信封）。
import { SHOP_SUBDIRS, ensureShop, isShopSubdir, listShopFiles as listShopDir, openShopDir as openShopDirOf, readShopTextFile as readShopText, removeShopFile as removeShopEntry, writeShopFiles as writeShopEntries, } from './shop-files.js';
/* ── ★★ 下面两条常量在 client 侧**各有一份** ──────────────────────
 * 为什么不共用：两端 tsconfig 的 module 格式不同（host ESM / client CJS），
 * 编到同一路径会**互相覆盖**（实测症状：`does not provide an export named 'REMOTE_NS'`）。
 * 而 host 运行时又不能用契约包（构建期依赖，用户机上没有）。
 * ⇒ 两端各写一份 + **判据强制一致**（配套的桥接检查脚本）
 *   直接扫**编译产物**，改一边漏一边就 FAIL。
 */
/** remote 命名空间。★ 必须与 client `bridge.ts` 里的同值（判据看护） */
export const REMOTE_NS = 'kaipu';
/** 取令牌提前量：到期前这么多秒就续（避免"刚好过期"竞态） */
export const TOKEN_RENEW_MARGIN_SEC = 60;
/* ══════════════════════════════════════════════════════════════════
   二、小工具（★ 一律用"宽松形状"，不引 `node:` / DOM 类型）
   ══════════════════════════════════════════════════════════════════ */
/** 取全局 fetch（Node 18+ 提供）。取不到就回 null，由调用方报清楚 */
function getFetch() {
    const f = globalThis.fetch;
    return typeof f === 'function' ? f : null;
}
/** 取 `TextDecoder`（SSE 字节流解码用）。取不到就回 null，由调用方报清楚 */
function getTextDecoder() {
    const t = globalThis.TextDecoder;
    return typeof t === 'function' ? t : null;
}
function getAbortController() {
    const a = globalThis.AbortController;
    return typeof a === 'function' ? a : null;
}
/** 取环境变量（同款"宽松签名"，不引 @types/node） */
function envOf() {
    const p = globalThis.process;
    return p?.env ?? {};
}
/**
 * FNV-1a（32 位）—— **不是密码学哈希**，只用来做"同机稳定"的指纹。
 * 为什么要它：本仓 host 侧 tsconfig 是 `types: []`，引 `node:crypto` 就要拉
 * 一整套 Node 类型；而指纹的用途只是「同一台机器固定不变」，不是安全强度。
 * ⇒ 用 8 个不同种子各跑一遍，拼成 64 位十六进制（比 32 位抗碰撞得多，够用）。
 */
function fnv1a64(input) {
    let out = '';
    for (const seed of [0x811c9dc5, 0x01000193, 0x9e3779b9, 0x85ebca6b, 0xc2b2ae35, 0x27d4eb2f, 0x165667b1, 0xd3a2646c]) {
        let h = seed >>> 0;
        for (let i = 0; i < input.length; i++) {
            h ^= input.charCodeAt(i);
            h = Math.imul(h, 0x01000193) >>> 0;
        }
        out += h.toString(16).padStart(8, '0');
    }
    return out.slice(0, 32); // 32 位十六进制，契约要求 ≥8 位
}
/** 本机推导：拿得到稳定字段就推，拿不到回 null（**不编**） */
function deriveFingerprint() {
    const env = envOf();
    const parts = [
        env['COMPUTERNAME'] ?? env['HOSTNAME'] ?? '',
        env['USERNAME'] ?? env['USER'] ?? '',
        env['USERDOMAIN'] ?? env['USERDNSDOMAIN'] ?? '',
    ].filter((s) => s !== '');
    return parts.length === 0 ? null : `kaipu-${fnv1a64(parts.join('|'))}`;
}
/** 兜底指纹：**固定值** + 由 `status.fingerprintSource='fallback'` 明示（不许悄悄用） */
const FALLBACK_FINGERPRINT = 'kaipu-fallback-0000000000000000000000000000';
/** 最小超时器（不引 @types/node；`setTimeout` 在 Node 与浏览器都有） */
function timer(ms) {
    const g = globalThis;
    let handle = null;
    let done = () => { };
    const promise = new Promise((res) => {
        done = res;
        handle = g.setTimeout?.(() => res('timeout'), ms) ?? null;
    });
    return { promise, cancel: () => { g.clearTimeout?.(handle); done('timeout'); } };
}
/* ★★ SSE 分帧 ＋「帧 → 事件」的映射已抽到 **`./sse-frame.js`**（2026-10-06）。
 *
 *   为什么抽：那段代码的注释写着"**纯函数，便于单独断言**"，可它是 class 的 `private`
 *   —— **根本断言不了**。而"流内 `error` 帧"这个输入在真服务端上**很难自然发生**
 *   （正常路径不发），想验证它只能**造一帧喂进去**。
 *   ⇒ 抽成零依赖模块后，判据可直接 import 编译产物来喂帧。
 */
/**
 * 「这个取消信号说取消了吗」。
 *
 * ★★ 为什么值得单开一个函数（不是为了好看）：
 *   `CancelSignal.aborted` 是 `readonly boolean`。若在同一个函数体里先写
 *   `if (signal?.aborted === true) return`，TS 会**就地收窄**成 `false`，
 *   于是后面循环里再写 `=== true` 就报
 *     `TS2367: types 'false | undefined' and 'true' have no overlap` ——
 *   一个**纯类型层面的**假错误，会逼人把正确的取消检查删掉。
 *   参数在新函数里是全新作用域，收窄不会跨过来。
 *
 * ★ 另记一条事实（决定"轮询取消"值不值得做）：本仓只声明了 `{ aborted }`，
 *   **没有** `addEventListener`。所以这里只能**取快照**，不是订阅。
 *   ⇒ 真正的取消路径是**消费者侧 `break`**：客户端不再 `for await` ⇒
 *     Gateway 关流 ⇒ 本 generator 被 `return()` ⇒ `finally` 里 `reader.cancel()`。
 *     循环里那句检查只是"顺手早退"，**不是**取消的保证。
 */
function isAborted(sig) {
    return sig !== undefined && sig.aborted;
}
let KaipuRemoteService = (() => {
    let _classSuper = TypertRemoteService;
    let _instanceExtraInitializers = [];
    let _assignSeat_decorators;
    let _createInvite_decorators;
    let _status_decorators;
    let _connect_decorators;
    let _listAgents_decorators;
    let _listScenes_decorators;
    let _capabilities_decorators;
    let _listShopFiles_decorators;
    let _writeShopFiles_decorators;
    let _removeShopFile_decorators;
    let _readShopTextFile_decorators;
    let _openShopDir_decorators;
    let _startRun_decorators;
    let _pollRun_decorators;
    return class KaipuRemoteService extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _assignSeat_decorators = [Remote('assignSeat')];
            _createInvite_decorators = [Remote('createInvite')];
            _status_decorators = [Remote('status')];
            _connect_decorators = [Remote('connect')];
            _listAgents_decorators = [Remote('listAgents')];
            _listScenes_decorators = [Remote('listScenes')];
            _capabilities_decorators = [Remote('capabilities')];
            _listShopFiles_decorators = [Remote('listShopFiles')];
            _writeShopFiles_decorators = [Remote('writeShopFiles')];
            _removeShopFile_decorators = [Remote('removeShopFile')];
            _readShopTextFile_decorators = [Remote('readShopTextFile')];
            _openShopDir_decorators = [Remote('openShopDir')];
            _startRun_decorators = [Remote('startRun')];
            _pollRun_decorators = [Remote('pollRun')];
            __esDecorate(this, null, _assignSeat_decorators, { kind: "method", name: "assignSeat", static: false, private: false, access: { has: obj => "assignSeat" in obj, get: obj => obj.assignSeat }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createInvite_decorators, { kind: "method", name: "createInvite", static: false, private: false, access: { has: obj => "createInvite" in obj, get: obj => obj.createInvite }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _status_decorators, { kind: "method", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _connect_decorators, { kind: "method", name: "connect", static: false, private: false, access: { has: obj => "connect" in obj, get: obj => obj.connect }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listAgents_decorators, { kind: "method", name: "listAgents", static: false, private: false, access: { has: obj => "listAgents" in obj, get: obj => obj.listAgents }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listScenes_decorators, { kind: "method", name: "listScenes", static: false, private: false, access: { has: obj => "listScenes" in obj, get: obj => obj.listScenes }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _capabilities_decorators, { kind: "method", name: "capabilities", static: false, private: false, access: { has: obj => "capabilities" in obj, get: obj => obj.capabilities }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listShopFiles_decorators, { kind: "method", name: "listShopFiles", static: false, private: false, access: { has: obj => "listShopFiles" in obj, get: obj => obj.listShopFiles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _writeShopFiles_decorators, { kind: "method", name: "writeShopFiles", static: false, private: false, access: { has: obj => "writeShopFiles" in obj, get: obj => obj.writeShopFiles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _removeShopFile_decorators, { kind: "method", name: "removeShopFile", static: false, private: false, access: { has: obj => "removeShopFile" in obj, get: obj => obj.removeShopFile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _readShopTextFile_decorators, { kind: "method", name: "readShopTextFile", static: false, private: false, access: { has: obj => "readShopTextFile" in obj, get: obj => obj.readShopTextFile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _openShopDir_decorators, { kind: "method", name: "openShopDir", static: false, private: false, access: { has: obj => "openShopDir" in obj, get: obj => obj.openShopDir }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _startRun_decorators, { kind: "method", name: "startRun", static: false, private: false, access: { has: obj => "startRun" in obj, get: obj => obj.startRun }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _pollRun_decorators, { kind: "method", name: "pollRun", static: false, private: false, access: { has: obj => "pollRun" in obj, get: obj => obj.pollRun }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        cfg = __runInitializers(this, _instanceExtraInitializers);
        /** ★ 指纹来源要**可查**（兜底值不许冒充真实指纹，见 status 出参） */
        fingerprint;
        fingerprintSource;
        /** ★★ 凭据：只在本进程内存；不落盘、不进日志、不进任何返回值 */
        token = null;
        tokenExpiresAt = 0; // unix 秒
        /**
         * ★★ 运行会话表（`startRun` / `pollRun` / `stopRun` 三件套的后端）。
         *
         * ══════════════════════════════════════════════════════════════════
         * 为什么是"后台泵 + 轮询"，而不是一条真流
         * ══════════════════════════════════════════════════════════════════
         * 契约 §3.4 的 SSE 本该用**流式**端点接（`@Remote({ mode: 'stream' })`），
         * 但 **2026-10-05 实测证明第三方插件拿不到流式入口**：
         *
         *   · 浏览器侧的 `connection.rpc.open`（唯一的一元之外的通道）**不存在** ——
         *     DSH 源码原话：`Browser transports omit this method; API Gateway owns their WebSocket mux.`
         *   · 页面里能用的是 `ctx.remote.<namespace>.<method>(query, signal)`（返回 `AsyncIterable`），
         *     但要先有那个 namespace —— **而它不会自动来**：
         *     DSH 侧装配 namespace 的那份清单是**硬编码的内部包清单**
         *     （逐个 `import '@deepseek-ai/dsh-xxx/remote'` 再 `ctx.remote.$mount(...)`），
         *     **第三方插件不在其中**。
         *   · 自挂载要自造 `InvocationDescriptor`（含全局 id / codec / 参数表）——
         *     那是**构建期代码生成**的产物，而本仓的定位恰恰是"零构建产物"。
         *
         * ⇒ **取舍**：用"host 后台读完 SSE + client 轮询增量"——走的是一元通道
         *   （已经跑通的 `kaipu/status|listScenes|…`），零新机制、可测、可控。
         *   **代价只有延迟**（一个轮询周期 ≈ 300ms），而契约要的"逐灯 + 判定可见"
         *   并不要求亚秒级实时 ⇒ 这个代价是划得来的。
         *   **如实记**：这不是契约想要的形态，是**宿主能力边界**下的最优解；
         *   若将来 DSH 给第三方开放流式入口，这里应改回 stream（届时删掉本表）。
         */
        runs = new Map();
        /** 运行会话保留上限：超了**先删最旧的**（`startRun` 开始新一场时顺便清理） */
        static RUN_KEEP = 20;
        constructor(ctx, cfg = {}) {
            super(ctx, REMOTE_NS);
            this.cfg = cfg;
            const configured = typeof cfg.fingerprint === 'string' ? cfg.fingerprint.trim() : '';
            if (configured.length >= 8) {
                this.fingerprint = configured;
                this.fingerprintSource = 'config';
            }
            else {
                const derived = deriveFingerprint();
                if (derived !== null) {
                    this.fingerprint = derived;
                    this.fingerprintSource = 'derived';
                }
                else {
                    this.fingerprint = FALLBACK_FINGERPRINT;
                    this.fingerprintSource = 'fallback';
                }
            }
        }
        /* ───────────────────────── 内部：HTTP ───────────────────────── */
        get baseUrl() {
            const b = typeof this.cfg.baseUrl === 'string' ? this.cfg.baseUrl.trim() : '';
            return b.replace(/\/+$/u, '');
        }
        get connected() {
            return this.baseUrl !== '';
        }
        get accountId() {
            const a = typeof this.cfg.accountId === 'string' ? this.cfg.accountId.trim() : '';
            return a === '' ? 'cli-trial' : a;
        }
        /**
         * 一次带超时的 HTTP 调用。
         * ★ **不抛异常**：网络类错误一律折算成 `{ ok:false, code:'network', error }` ——
         *   面板最怕的是"一个 fetch 抛出去把整个 apply 链带崩"。
         */
        async http(method, path, body, signal) {
            const fetchFn = getFetch();
            if (fetchFn === null) {
                return { ok: false, kind: 'error', code: 'no_fetch', error: '本环境没有 fetch，无法访问服务端' };
            }
            if (!this.connected) {
                return { ok: false, kind: 'error', code: 'not_connected', error: '尚未配置接入地址（本地模式）' };
            }
            if (signal?.aborted === true) {
                return { ok: false, kind: 'denied', code: 'aborted', error: '已取消' };
            }
            const headers = { 'Accept': 'application/json' };
            if (body !== undefined)
                headers['Content-Type'] = 'application/json';
            if (this.token !== null)
                headers['Authorization'] = `Bearer ${this.token}`;
            headers['X-Client-Version'] = this.cfg.clientVersion ?? PLUGIN_VERSION;
            headers['X-Device-Fingerprint'] = this.fingerprint;
            const t = timer(this.cfg.timeoutMs ?? 15000);
            try {
                const res = await Promise.race([
                    fetchFn(`${this.baseUrl}${path}`, {
                        method,
                        headers,
                        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
                    }),
                    t.promise.then(() => {
                        throw new Error('TIMEOUT');
                    }),
                ]);
                return { status: res.status, text: await res.text() };
            }
            catch (e) {
                const msg = e instanceof Error ? e.message : String(e);
                return {
                    ok: false,
                    kind: 'error',
                    code: msg === 'TIMEOUT' ? 'timeout' : 'network',
                    error: msg === 'TIMEOUT' ? '服务端没有及时回应' : `连不上服务端：${msg}`,
                };
            }
            finally {
                t.cancel();
            }
        }
        static isErr(v) {
            return typeof v === 'object' && v !== null && 'ok' in v && v.ok === false;
        }
        /** 解析服务端的统一错误体 `{ error: { code, message } }` */
        static parseErr(text) {
            try {
                const j = JSON.parse(text);
                const code = typeof j.error?.code === 'string' ? j.error.code : '';
                const message = typeof j.error?.message === 'string' ? j.error.message : '';
                return code === '' ? null : { code, message };
            }
            catch {
                return null;
            }
        }
        /**
         * 取令牌（幂等 + 到期自动续）。
         *   · 契约：`POST /auth/device {fingerprint, clientVersion, account_id}` → `{deviceToken, expiresIn, …}`
         *   · 响应里 `is_new_device` / `device_mismatch(403)` / `not_found(404)` 的处理见 §四 出参说明
         */
        async ensureToken(signal) {
            const nowSec = Math.floor(Date.now() / 1000);
            if (this.token !== null && nowSec < this.tokenExpiresAt - TOKEN_RENEW_MARGIN_SEC) {
                return { ok: true, data: this.token };
            }
            const r = await this.http('POST', '/auth/device', {
                fingerprint: this.fingerprint,
                clientVersion: this.cfg.clientVersion ?? PLUGIN_VERSION,
                account_id: this.accountId,
            }, signal);
            if (KaipuRemoteService.isErr(r))
                return r;
            if (r.status !== 200) {
                const parsed = KaipuRemoteService.parseErr(r.text);
                return {
                    ok: false,
                    kind: 'error',
                    code: parsed?.code ?? `http_${r.status}`,
                    error: parsed?.message ?? `取令牌失败（HTTP ${r.status}）`,
                };
            }
            let token = '';
            let expiresIn = 0;
            try {
                const j = JSON.parse(r.text);
                token = typeof j.deviceToken === 'string' ? j.deviceToken : '';
                expiresIn = typeof j.expiresIn === 'number' && j.expiresIn > 0 ? j.expiresIn : 0;
            }
            catch {
                return { ok: false, kind: 'error', code: 'bad_json', error: '取令牌的响应读不懂' };
            }
            if (token === '') {
                return { ok: false, kind: 'error', code: 'no_token', error: '服务端没有回令牌' };
            }
            this.token = token;
            this.tokenExpiresAt = expiresIn > 0 ? nowSec + expiresIn : nowSec + 3600;
            return { ok: true, data: token };
        }
        /**
         * 带令牌 GET（★ 401 只重试**一次**：先当"令牌过期"续一次，再不行就如实上报）
         */
        async authedGet(path, signal) {
            for (let attempt = 0; attempt < 2; attempt++) {
                const tk = await this.ensureToken(signal);
                if (tk.ok !== true)
                    return tk;
                const r = await this.http('GET', path, undefined, signal);
                if (KaipuRemoteService.isErr(r))
                    return r;
                if (r.status === 401 && attempt === 0) {
                    this.token = null; // 令牌被判无效 ⇒ 丢掉，下一轮重取
                    this.tokenExpiresAt = 0;
                    continue;
                }
                if (r.status !== 200) {
                    const parsed = KaipuRemoteService.parseErr(r.text);
                    return {
                        ok: false,
                        kind: 'error',
                        code: parsed?.code ?? `http_${r.status}`,
                        error: parsed?.message ?? `读取失败（HTTP ${r.status}）`,
                    };
                }
                try {
                    return { ok: true, data: JSON.parse(r.text) };
                }
                catch {
                    return { ok: false, kind: 'error', code: 'bad_json', error: '响应读不懂（不是 JSON）' };
                }
            }
            return { ok: false, kind: 'error', code: 'unauthorized', error: '通行证不管用了，重新领一张。' };
        }
        /* ═══════════════════════ 四、端点（wire: kaipu/<method>） ═══════════════════════ */
        /**
         * 带令牌 POST（★ 401 只重试**一次**，与 `authedGet` 同款）
         *
         * ★ 为什么需要它：此前 host 侧只有 GET 一条带令牌通道 ⇒ 席位改派这类写操作
         *   即使后端 `POST /roles/assign` 早就绪，界面也发不出请求（实测症状：
         *   「可改」标签点不动、没有任何请求出网）。写通道必须与读通道并列存在。
         */
        async authedPost(path, body, signal) {
            for (let attempt = 0; attempt < 2; attempt++) {
                const tk = await this.ensureToken(signal);
                if (tk.ok !== true)
                    return tk;
                const r = await this.http('POST', path, body, signal);
                if (KaipuRemoteService.isErr(r))
                    return r;
                if (r.status === 401 && attempt === 0) {
                    this.token = null; // 令牌被判无效 ⇒ 丢掉，下一轮重取
                    this.tokenExpiresAt = 0;
                    continue;
                }
                if (r.status !== 200) {
                    const parsed = KaipuRemoteService.parseErr(r.text);
                    return {
                        ok: false,
                        kind: 'error',
                        code: parsed?.code ?? `http_${r.status}`,
                        error: parsed?.message ?? `写入失败（HTTP ${r.status}）`,
                    };
                }
                try {
                    return { ok: true, data: JSON.parse(r.text) };
                }
                catch {
                    return { ok: false, kind: 'error', code: 'bad_json', error: '响应读不懂（不是 JSON）' };
                }
            }
            return { ok: false, kind: 'error', code: 'unauthorized', error: '通行证不管用了，重新领一张。' };
        }
        /**
         * `kaipu/assignSeat` —— **改席位**（执行位 / 审计位可改；管理位、签名位服务端会拒）
         *
         * ★ 服务端才是判据所在，客户端**不要**自己预判能不能改：
         *   · 签名位 ⇒ 403 `seat_immutable`「签名这件事，只能我来。」
         *   · 执行位与审计位由同一实体兼任 ⇒ 409 `seat_conflict`「干活的和审账的，不能是同一个人。」
         *   ⇒ 把这两条话原样交给用户看，比在前端猜规则可靠。
         */
        async assignSeat(query, signal) {
            return this.authedPost('/roles/assign', {
                seat: query.seat,
                holderId: query.holderId,
                holderName: query.holderName,
                reason: query.reason ?? '',
            }, signal);
        }
        /**
         * `kaipu/createInvite` —— **生成邀请链接，请别人的 Agent 进场**。
         *
         * ★ 为什么这个必须做到客户端：功能早在服务端（`POST /invites`），但没有入口 ⇒
         *   用户只能手工提请求。「功能在、入口不在」和「没做」在用户那边是同一件事。
         * ★ 邀请码一次性、随机、带有效期 —— 判据全在服务端，前端只负责发起与展示。
         */
        async createInvite(query, signal) {
            return this.authedPost('/invites', {
                lamp: query.lamp,
                seat: query.seat ?? '',
                note: query.note ?? '',
                ttlDays: query.ttlDays ?? 7,
            }, signal);
        }
        /**
         * `kaipu/status` —— **面板第一件要知道的事：接没接上**。
         *
         * ★ 为什么它是第一个端点：`connected:false` 是**正常状态**（本地模式），
         *   不是故障。把它做成一个显式出参，面板才能"如实说本地模式"，
         *   而不是靠"请求失败"去猜 —— 失败与未接入在界面上必须能区分。
         */
        async status(query, signal) {
            void query;
            const base = {
                connected: this.connected,
                baseUrl: this.baseUrl,
                accountId: this.accountId,
                fingerprintSource: this.fingerprintSource,
            };
            if (!this.connected)
                return { ok: true, data: base };
            if (signal?.aborted === true)
                return { ok: false, kind: 'denied', code: 'aborted', error: '已取消' };
            const h = await this.http('GET', '/health', undefined, signal);
            if (KaipuRemoteService.isErr(h))
                return { ok: true, data: { ...base, authError: h.error } };
            if (h.status !== 200) {
                return { ok: true, data: { ...base, authError: `存活探针 HTTP ${h.status}` } };
            }
            let health = {};
            try {
                health = JSON.parse(h.text);
            }
            catch {
                return { ok: true, data: { ...base, authError: '存活探针的响应读不懂' } };
            }
            // 存活之外还探一次"能不能取到令牌"——这才是"接上了"的完整判据
            const tk = await this.ensureToken(signal);
            return {
                ok: true,
                data: {
                    ...base,
                    ...(health.version === undefined ? {} : { serverVersion: health.version }),
                    ...(health.serverTime === undefined ? {} : { serverTime: health.serverTime }),
                    ...(health.agentsLoaded === undefined ? {} : { agentsLoaded: health.agentsLoaded }),
                    ...(health.tenants === undefined ? {} : { tenants: health.tenants }),
                    ...(tk.ok === true ? {} : { authError: tk.error }),
                },
            };
        }
        /** `kaipu/connect` —— 取令牌 + `/me`（铺子身份 / 能力位 / 时间基准）。**兼心跳** */
        async connect(query, signal) {
            void query;
            return this.authedGet('/me', signal);
        }
        /** `kaipu/listAgents` —— Agent 卡片（★ 响应可能为空数组：那是"零接入"，不是错误） */
        async listAgents(query, signal) {
            void query;
            return this.authedGet('/agents', signal);
        }
        /** `kaipu/listScenes` —— 场景清单 + `#17` 的 `categories` / `recommendations` */
        async listScenes(query, signal) {
            void query;
            return this.authedGet('/scenes', signal);
        }
        /** `kaipu/capabilities` —— 能力边界（`cannot` 段**必须完整展示**） */
        async capabilities(query, signal) {
            void query;
            return this.authedGet('/capabilities', signal);
        }
        /* ═══════════════ 四之二、铺子资料（**本机文件**，不走网） ═══════════════
      
         * ★★ 这一批与上面那批的性质**根本不同**，别混着看：
         *   · 上面那批：把服务端的响应搬回来（要令牌、要 baseUrl、会超时）
         *   · 这一批：读写**本机一个目录**（不发请求、不需要接入、断网照常可用）
         *   ⇒ 所以它们**不看 `this.connected`** —— "没接入服务端"从来不是
         *     "自己不能存东西"的理由。把两者绑在一起是一类很常见的错。
         *
         * ★ 这一批的"铺子"由 `this.accountId` 派生（接入身份 ⇒ 目录名）：
         *   换一个接入地址，就是一个物理上不同的目录，天然不串味。
         *   未配置时它有个非空兜底（见 `accountId` getter），所以这一层**永远可用**。
         */
        /** 把本地层的结果折进 wire 的统一信封 */
        wrapShop(r) {
            return r.ok
                ? { ok: true, data: r.value }
                : // ★ `kind:'error'` 而不是 `'denied'`：这是**本机操作失败**（含"文件名不合法"
                    //   这类用户可纠正的原因），不是"服务端拒绝了你的身份"。两者在界面上该有不同出路。
                    { ok: false, kind: 'error', code: r.code, error: r.error };
        }
        /**
         * `kaipu/listShopFiles` —— 三个抽屉一次列全（外加数据根，供界面如实展示）。
         * ★ 一次全给而不是按抽屉逐个查：只有三个抽屉，用户一眼看完比三次往返强。
         */
        async listShopFiles(query, signal) {
            void query;
            void signal;
            const accountId = this.accountId;
            const ensured = ensureShop(accountId);
            if (!ensured.ok) {
                // ★ 本地不可用 ⇒ **如实说**，且把 root 一起给出去（用户仍能自己去那个目录看）
                return {
                    ok: true,
                    data: {
                        root: '',
                        shopKey: '',
                        subdirs: SHOP_SUBDIRS,
                        files: [],
                        unavailable: ensured.error,
                    },
                };
            }
            const files = [];
            for (const sub of SHOP_SUBDIRS) {
                const r = listShopDir(accountId, sub);
                if (!r.ok) {
                    return {
                        ok: true,
                        data: {
                            root: ensured.value.root,
                            shopKey: ensured.value.shopKey,
                            subdirs: SHOP_SUBDIRS,
                            files,
                            unavailable: `${sub}：${r.error}`,
                        },
                    };
                }
                files.push(...r.value);
            }
            return {
                ok: true,
                data: {
                    root: ensured.value.root,
                    shopKey: ensured.value.shopKey,
                    subdirs: SHOP_SUBDIRS,
                    files,
                },
            };
        }
        /** `kaipu/writeShopFiles` —— 拖放进来的文件落盘（内容 base64） */
        async writeShopFiles(query, signal) {
            void signal;
            if (!isShopSubdir(query?.sub)) {
                return { ok: false, kind: 'error', code: 'bad-subdir', error: '没有这个抽屉' };
            }
            const list = Array.isArray(query.files) ? query.files : [];
            if (list.length === 0) {
                return { ok: false, kind: 'error', code: 'empty', error: '没有收到文件' };
            }
            return this.wrapShop(writeShopEntries(this.accountId, query.sub, list));
        }
        /** `kaipu/removeShopFile` —— 删一个文件（★ 一个动作对应一个文件） */
        async removeShopFile(query, signal) {
            void signal;
            if (!isShopSubdir(query?.sub)) {
                return { ok: false, kind: 'error', code: 'bad-subdir', error: '没有这个抽屉' };
            }
            const r = removeShopEntry(this.accountId, query.sub, String(query.name ?? ''));
            return r.ok ? { ok: true, data: { name: String(query.name ?? '') } } : this.wrapShop(r);
        }
        /** `kaipu/readShopTextFile` —— 读回文本（供"填进待审内容"） */
        async readShopTextFile(query, signal) {
            void signal;
            if (!isShopSubdir(query?.sub)) {
                return { ok: false, kind: 'error', code: 'bad-subdir', error: '没有这个抽屉' };
            }
            return this.wrapShop(readShopText(this.accountId, query.sub, String(query.name ?? '')));
        }
        /**
         * `kaipu/openShopDir` —— 在系统文件管理器里打开铺子资料目录（2026-10-06）。
         *
         * ★★ 参数**只有 `sub`（可选枚举）**，**没有 `path`** —— 路径由 host 侧自己算。
         *   这是比先例（早先那处 `openPath` 收路径再收敛）**更严**的一处：
         *   外面**根本传不进任意路径**，穿越 / 越界在设计上就不存在。
         *
         * ★ 与其它铺子资料端点同口径：**不看 `this.connected`** —— 本机操作，
         *   未接入服务端时照常可用。
         */
        async openShopDir(query, signal) {
            // ★ 与其它铺子资料端点同口径：本机操作，`signal` 不参与判断 ——
            //   `void` 掉，保持签名形态与兄弟端点一致（参数名必须能被正则反射）
            void signal;
            // ★ wire 上来的一律当**不可信**：先用 `isShopSubdir` 收敛，再交给本地层
            const raw = typeof query?.sub === 'string' ? query.sub : '';
            if (raw !== '' && !isShopSubdir(raw)) {
                return { ok: false, kind: 'error', code: 'bad-subdir', error: '没有这个抽屉' };
            }
            return this.wrapShop(openShopDirOf(this.accountId, raw === '' ? undefined : raw));
        }
        /* ═══════════════ 五、★ 流式端点（SSE · 契约 §3.4） ═══════════════
      
         * ★★ 形态取舍：**不是流式端点，而是「后台泵 + 轮询」**（原因见 `runs` 字段那段长注）——
         *
         *   契约 §3.4 的 `POST /scene/{id}/run` 是 **SSE**，价值在"逐灯 + 判定可见"
         *   （§十 对接清单 #2）。最自然的接法是 `@Remote({ mode: 'stream' })`，
         *   但 **2026-10-05 实测证明第三方插件拿不到浏览器侧的流式入口** ⇒ 退回本形态：
         *     · 裸 SSE 仍在 **host** 进程里读（`readRunEvents`，与本文件此前写法一致）
         *     · 读出来的事件由**后台泵**累积进 `this.runs`
         *     · 客户端用 `pollRun` 取**增量**（≈300ms 一个周期）
         *   ⇒ 契约要的"逐灯可见"能满足；**损失的只是实时性的量级**，不是有无。
         *
         * ★★ fail-closed 三处（本端点的全部"不做"）：
         *   ① **契约外的事件名 ⇒ 不产出**（不编造一个我们看不懂的事件去渲染）
         *   ② **`data` 不是 JSON / 不是对象 ⇒ 跳过该帧**（不炸整条流，也不塞半个对象）
         *   ③ **`lamp_*` 缺 `round` ⇒ 填流内最近一次 `round_start` 的值**（不编新轮次）
         *      —— 契约 §3.4 示例里 `lamp_*` 确实不带 `round`（变更 #2 才要求加），
         *      所以这不是防御性洁癖，是**实测会遇到的形态**。
         *
         * ★ 未闭环项（如实记，不假装）：契约 §3.4 的 `error` 事件**不在**
         *   `SceneRunEvent` 判别联合里（我方契约包 `sse.ts` 缺这一支）。
         *   ⇒ 本端点把 `error` 帧**转成抛出**（带服务端原文 message），客户端 catch 后
         *     如实显示"运行中断 + 服务端说明"，**不冒充成功**。
         *   ⇒ 待办：把 `error` 补进契约包类型（改的是"我方类型漏了契约已有的事件"，
         *     不是单方改形状），并让 reducer / 界面按 `code` 走 §8.2 文案表。
         */
        /**
         * `kaipu/startRun` —— 起一场运行。
         *
         * ★ **不阻塞**：立刻回 `runId`，读 SSE 的活在后台泵（`pump`）里做，
         *   事件累积进 `this.runs`；客户端用 `pollRun` 取增量。
         *   为什么不在这里 `await` 到跑完：一场多轮场景可能几分钟，
         *   一元 RPC 有 15s 超时 ⇒ 必然断（见 `runs` 字段那段取舍说明）。
         */
        async startRun(query, signal) {
            if (isAborted(signal)) {
                return { ok: false, kind: 'denied', code: 'aborted', error: '已取消' };
            }
            const sceneId = typeof query.sceneId === 'string' ? query.sceneId.trim() : '';
            if (sceneId === '') {
                return { ok: false, kind: 'error', code: 'bad_request', error: '没有指定要跑的场景（sceneId 为空）' };
            }
            if (!this.connected) {
                return { ok: false, kind: 'error', code: 'not_connected', error: '尚未配置接入地址（本地模式）' };
            }
            this.gcRuns();
            const runId = `run-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
            this.runs.set(runId, { events: [], done: false, error: null, startedAt: Date.now() });
            // ★ **故意不 await**：让它自己跑完，客户端靠 pollRun 取（失败也会被泵记进 error）
            void this.pump(runId, query);
            return { ok: true, data: { runId } };
        }
        /**
         * `kaipu/pollRun` —— 取**增量**事件（从 `from` 起）。
         * ★ 返回 `next`（下次该从哪取）而不是让客户端自己数长度 ——
         *   客户端数长度会在"服务端先返回错误再补事件"这类时序下算错。
         */
        async pollRun(query, signal) {
            void signal;
            const runId = typeof query.runId === 'string' ? query.runId : '';
            const rec = this.runs.get(runId);
            if (rec === undefined) {
                return {
                    ok: false,
                    kind: 'error',
                    code: 'not_found',
                    error: '这次运行的记录已经不在宿主内存里了（可能已被清理，或宿主重启过）。',
                };
            }
            const from = typeof query.from === 'number' && query.from >= 0 ? Math.floor(query.from) : 0;
            return {
                ok: true,
                data: {
                    events: rec.events.slice(from),
                    next: rec.events.length,
                    done: rec.done,
                    error: rec.error,
                },
            };
        }
        /* ── 内部：后台泵 + 会话清理 ── */
        /**
         * 后台把服务端的 SSE 读干，事件累积进会话。
         * ★ 出错**记进 `error` 而不是丢**：客户端轮询时要如实看到"为什么没跑完"。
         * ★ 即使客户端已不再轮询，本泵也会**把这一场读完** ——
         *   服务端仍在算完并落 `lamp_runs`（契约 R5），我方不该提前松手。
         */
        async pump(runId, query) {
            const rec = this.runs.get(runId);
            if (rec === undefined)
                return;
            try {
                for await (const ev of this.readRunEvents(query, undefined)) {
                    rec.events.push(ev);
                }
            }
            catch (e) {
                rec.error = e instanceof Error ? e.message : String(e);
            }
            finally {
                rec.done = true;
            }
        }
        /** 会话表满了就**先删最旧的**（按开始时间）—— 只清内存，不影响服务端 */
        gcRuns() {
            while (this.runs.size >= KaipuRemoteService.RUN_KEEP) {
                let oldestKey = null;
                let oldestAt = Number.POSITIVE_INFINITY;
                for (const [key, value] of this.runs) {
                    if (value.startedAt < oldestAt) {
                        oldestAt = value.startedAt;
                        oldestKey = key;
                    }
                }
                if (oldestKey === null)
                    break;
                this.runs.delete(oldestKey);
            }
        }
        /**
         * 读服务端的 SSE，产出契约事件（泵的取数器）。
         * ★ 只做"接流 + 分帧 + 校验"，不含任何渲染判断。
         * ★ 保留 `async generator` 形态：这样它**可以被直接 `for await` 断言**
         *   （不经 RPC），接线出问题时能一步定位是"读"坏了还是"传"坏了。
         */
        async *readRunEvents(query, signal) {
            const fetchFn = getFetch();
            if (fetchFn === null)
                throw new Error('本环境没有 fetch，无法发起运行');
            if (!this.connected)
                throw new Error('尚未配置接入地址（本地模式）');
            const sceneId = typeof query.sceneId === 'string' ? query.sceneId.trim() : '';
            if (sceneId === '')
                throw new Error('没有指定要跑的场景（sceneId 为空）');
            if (isAborted(signal))
                return;
            const tk = await this.ensureToken(signal);
            if (tk.ok !== true)
                throw new Error(tk.error);
            /**
             * ★ 取消桥接：`CancelSignal` 在本仓只声明了 `{ aborted }`（**没有事件**），
             *   所以取消只能**轮询** —— 在每次 `read()` 返回后检查，够了：
             *   每次 `read()` 都会在下一个事件到达时返回，最坏延迟 = 一个事件的间隔。
             */
            const headers = {
                Accept: 'text/event-stream',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tk.data}`,
                'X-Client-Version': this.cfg.clientVersion ?? PLUGIN_VERSION,
                'X-Device-Fingerprint': this.fingerprint,
            };
            const payload = {};
            if (query.requestId !== undefined)
                payload['requestId'] = query.requestId;
            if (query.target !== undefined)
                payload['target'] = query.target;
            if (query.content !== undefined)
                payload['content'] = query.content;
            if (Array.isArray(query.dims))
                payload['dims'] = query.dims;
            if (Array.isArray(query.externalAgents))
                payload['externalAgents'] = query.externalAgents;
            if (query.outputLevel !== undefined)
                payload['outputLevel'] = query.outputLevel;
            // ★ 不走 `this.http()`：那条路有 15s 超时（对长流是错的），且它只 `text()` 整读
            const fetchStream = fetchFn;
            const url = `${this.baseUrl}/scene/${encodeURIComponent(sceneId)}/run`;
            let res;
            try {
                res = await fetchStream(url, { method: 'POST', headers, body: JSON.stringify(payload) });
            }
            catch (e) {
                throw new Error(`连不上服务端：${e instanceof Error ? e.message : String(e)}`);
            }
            if (res.status !== 200) {
                let text = '';
                try {
                    text = await res.text();
                }
                catch {
                    // 读错误体失败不影响"HTTP 状态"这个事实，继续如实报状态
                }
                const parsed = KaipuRemoteService.parseErr(text);
                throw new Error(parsed === null ? `运行请求失败（HTTP ${res.status}）` : `${parsed.message}（${parsed.code}）`);
            }
            const streamBody = res.body;
            if (streamBody === null || streamBody === undefined) {
                throw new Error('服务端没有返回事件流（body 为空）');
            }
            const Reader = getTextDecoder();
            if (Reader === null)
                throw new Error('本环境没有 TextDecoder，读不了事件流');
            const reader = streamBody.getReader();
            const dec = new Reader('utf-8');
            /** ★ 归一化行尾后再找空行 —— `\r\n\r\n` 用 `indexOf('\n\n')` 是找不到的 */
            let buf = '';
            let curRound = 1;
            let sawDone = false;
            try {
                for (;;) {
                    if (isAborted(signal))
                        break;
                    const chunk = await reader.read();
                    if (chunk.done)
                        break;
                    if (chunk.value === undefined)
                        continue;
                    buf = (buf + dec.decode(chunk.value, { stream: true })).replace(/\r\n/gu, '\n');
                    let cut = buf.indexOf('\n\n');
                    while (cut >= 0) {
                        const frame = buf.slice(0, cut);
                        buf = buf.slice(cut + 2);
                        const out = frameToEvent(parseSseFrame(frame), curRound);
                        if (out === null) {
                            cut = buf.indexOf('\n\n');
                            continue;
                        }
                        if (out.kind === 'round')
                            curRound = out.round;
                        // ★ 2026-10-06：这里原来有一句 `if (out.kind === 'error') throw …` ——
                        //   它把**流内的 error 事件**当成了"这次运行挂了"（抛出让上层走失败路径）。
                        //   现在 `error` 走普通事件通路（见 `frameToEvent` 注释），**不再抛**：
                        //   它是运行记录的一部分，由界面如实显示，**不打断**视图。
                        if (out.event.event === 'done')
                            sawDone = true;
                        yield out.event;
                        cut = buf.indexOf('\n\n');
                    }
                }
                // ★ 收尾：服务端可能直接关连接，**最后一帧没有结尾空行** ⇒ 必须再解一次
                buf += dec.decode();
                const tail = parseSseFrame(buf);
                if (tail !== null) {
                    const out = frameToEvent(tail, curRound);
                    if (out !== null) {
                        if (out.event.event === 'done')
                            sawDone = true;
                        yield out.event;
                    }
                }
                // ★ 流结束却没见 `done` ⇒ **如实说出来**，不让界面把"断了"当成"跑完了"
                if (!sawDone && !isAborted(signal)) {
                    throw new Error('事件流提前结束（没有收到 done）');
                }
            }
            finally {
                try {
                    await reader.cancel?.();
                }
                catch {
                    // 取消失败不影响已 yield 的事件；这里不掩盖真正的错误
                }
            }
        }
    };
})();
export { KaipuRemoteService };
//# sourceMappingURL=service.js.map