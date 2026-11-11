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
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import type { Context } from '@deepseek-ai/cordis';
import type { AccountView, AgentView, CapabilitiesPayload, OpenShopDirQuery, OpenShopDirResult, ReadShopTextQuery, ReadShopTextResult, RemoteResult, RemoveShopFileQuery, SceneRunEvent, ScenesPayload, ShopFilesPayload, StatusPayload, WriteShopFilesQuery, WriteShopFilesResult } from '@shanhai/kaipu-contract';
/** 网关的取消参数形状。★ 参数名必须叫 `signal`（网关靠参数名识别并把它从 wire 剥掉） */
export interface CancelSignal {
    readonly aborted: boolean;
}
/** 最小 fetch 形状（运行时由 Node 18+ 全局提供） */
export interface HttpResponseLike {
    readonly status: number;
    text(): Promise<string>;
}
export type FetchLike = (url: string, init: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    signal?: unknown;
}) => Promise<HttpResponseLike>;
export interface StreamReaderLike {
    read(): Promise<{
        done: boolean;
        value?: Uint8Array;
    }>;
    cancel?(): Promise<void>;
}
export interface StreamingResponseLike {
    readonly status: number;
    text(): Promise<string>;
    /** 流式响应体。★ 可能是 `null`（服务端没给 body）—— 调用方必须处理 */
    readonly body?: {
        getReader(): StreamReaderLike;
    } | null;
}
export type FetchStreamLike = (url: string, init: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    signal?: unknown;
}) => Promise<StreamingResponseLike>;
/** remote 命名空间。★ 必须与 client `bridge.ts` 里的同值（判据看护） */
export declare const REMOTE_NS = "kaipu";
/** 取令牌提前量：到期前这么多秒就续（避免"刚好过期"竞态） */
export declare const TOKEN_RENEW_MARGIN_SEC = 60;
export interface KaipuServiceConfig {
    /** 服务端基址。**空 = 本地/未接入模式**（不是故障） */
    baseUrl?: string;
    /** 铺子名（契约里叫 `account_id`） */
    accountId?: string;
    /** 设备指纹（≥8 位）。不配则本机推导；再不行走兜底常量 */
    fingerprint?: string;
    /** 取令牌时自报的客户端版本 */
    clientVersion?: string;
    /** 单次请求超时（毫秒） */
    timeoutMs?: number;
}
/** 空入参（有些端点不需要参数；**仍要有一个 query**，见约束 ③） */
/** `kaipu/createInvite` 的入参 —— 请谁进、进哪个灯位、多久有效 */
export interface CreateInviteQuery {
    lamp: string;
    seat?: string;
    note?: string;
    ttlDays?: number;
}
/**
 * `kaipu/createInvite` 的回执。
 * ★ `url` = 可直接发给对方的完整链接（`.../kai-pu/invite/<code>`）；
 *   `code` 一次性、带有效期，判据全在服务端。
 */
export interface CreateInvitePayload {
    code: string;
    url: string;
    path: string;
    lamp: string;
    expiresAt: string;
    ttlDays: number;
}
/** `kaipu/assignSeat` 的入参 —— 改哪个位、换成谁 */
export interface AssignSeatQuery {
    seat: string;
    holderId: string;
    holderName: string;
    reason?: string;
}
/**
 * `kaipu/assignSeat` 的回执。
 * ★ `holder.id` / `holder.name` 在 `type==='external'` 时**服务端会遮蔽成空串**
 *   （防跨租户回显真名）⇒ 界面不要拿它当「改名成功」的证据，刷新后看 seatHolders。
 */
export interface AssignSeatPayload {
    seat: string;
    holder: {
        type: string;
        id: string;
        name: string;
    };
    logged: boolean;
}
export interface EmptyQuery {
    [k: string]: never;
}
/**
 * `kaipu/runScene` 的入参（契约 §3.4 `POST /scene/{id}/run`）。
 *
 * ★ `sceneId` 单列：契约里它是**路径参数**，其余才是请求体 —— 拆在这里合并，
 *   客户端只需记一个形状。
 * ★ 其余字段全部可选：契约里它们都是可选的，**不得由我们补默认值**
 *   （编一个 `outputLevel` 会让服务端按没被要求的档位跑）。
 */
export interface RunSceneQuery {
    /** 场景 id（契约路径参数 `{id}`） */
    sceneId: string;
    /** 幂等键。契约要求由客户端生成 uuid（同一 `requestId` 重复提交 ⇒ `duplicate_request`） */
    requestId?: string;
    target?: string;
    content?: string;
    /** 裁剪参与灯次（承 `run_when`） */
    dims?: string[];
    /** P2 起用（外部 Agent 进场） */
    externalAgents?: {
        agentId: string;
        seat: string;
    }[];
    outputLevel?: 'light' | 'standard' | 'strict';
}
/** `kaipu/pollRun` 入参 */
export interface PollRunQuery {
    /** `startRun` 回的 runId */
    runId: string;
    /** 从第几个事件起取（= 上次响应里的 `next`） */
    from?: number;
}
/** `kaipu/pollRun` 出参（★ 三个字段缺一不可：增量 + 游标 + 终态） */
export interface RunPoll {
    /** `from` 之后的**增量**事件 */
    events: SceneRunEvent[];
    /** 下次该从哪取 */
    next: number;
    /** 泵是否已经收工（不管成功还是失败） */
    done: boolean;
    /** 泵失败的原因（**原文**，未翻译）；正常跑完是 `null` */
    error: string | null;
}
export declare class KaipuRemoteService extends TypertRemoteService {
    private readonly cfg;
    /** ★ 指纹来源要**可查**（兜底值不许冒充真实指纹，见 status 出参） */
    private readonly fingerprint;
    private readonly fingerprintSource;
    /** ★★ 凭据：只在本进程内存；不落盘、不进日志、不进任何返回值 */
    private token;
    private tokenExpiresAt;
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
    private readonly runs;
    /** 运行会话保留上限：超了**先删最旧的**（`startRun` 开始新一场时顺便清理） */
    private static readonly RUN_KEEP;
    constructor(ctx: Context, cfg?: KaipuServiceConfig);
    private get baseUrl();
    private get connected();
    private get accountId();
    /**
     * 一次带超时的 HTTP 调用。
     * ★ **不抛异常**：网络类错误一律折算成 `{ ok:false, code:'network', error }` ——
     *   面板最怕的是"一个 fetch 抛出去把整个 apply 链带崩"。
     */
    private http;
    private static isErr;
    /** 解析服务端的统一错误体 `{ error: { code, message } }` */
    private static parseErr;
    /**
     * 取令牌（幂等 + 到期自动续）。
     *   · 契约：`POST /auth/device {fingerprint, clientVersion, account_id}` → `{deviceToken, expiresIn, …}`
     *   · 响应里 `is_new_device` / `device_mismatch(403)` / `not_found(404)` 的处理见 §四 出参说明
     */
    private ensureToken;
    /**
     * 带令牌 GET（★ 401 只重试**一次**：先当"令牌过期"续一次，再不行就如实上报）
     */
    private authedGet;
    /**
     * 带令牌 POST（★ 401 只重试**一次**，与 `authedGet` 同款）
     *
     * ★ 为什么需要它：此前 host 侧只有 GET 一条带令牌通道 ⇒ 席位改派这类写操作
     *   即使后端 `POST /roles/assign` 早就绪，界面也发不出请求（实测症状：
     *   「可改」标签点不动、没有任何请求出网）。写通道必须与读通道并列存在。
     */
    private authedPost;
    /**
     * `kaipu/assignSeat` —— **改席位**（执行位 / 审计位可改；管理位、签名位服务端会拒）
     *
     * ★ 服务端才是判据所在，客户端**不要**自己预判能不能改：
     *   · 签名位 ⇒ 403 `seat_immutable`「签名这件事，只能我来。」
     *   · 执行位与审计位由同一实体兼任 ⇒ 409 `seat_conflict`「干活的和审账的，不能是同一个人。」
     *   ⇒ 把这两条话原样交给用户看，比在前端猜规则可靠。
     */
    assignSeat(query: AssignSeatQuery, signal?: CancelSignal): Promise<RemoteResult<AssignSeatPayload>>;
    /**
     * `kaipu/createInvite` —— **生成邀请链接，请别人的 Agent 进场**。
     *
     * ★ 为什么这个必须做到客户端：功能早在服务端（`POST /invites`），但没有入口 ⇒
     *   用户只能手工提请求。「功能在、入口不在」和「没做」在用户那边是同一件事。
     * ★ 邀请码一次性、随机、带有效期 —— 判据全在服务端，前端只负责发起与展示。
     */
    createInvite(query: CreateInviteQuery, signal?: CancelSignal): Promise<RemoteResult<CreateInvitePayload>>;
    /**
     * `kaipu/status` —— **面板第一件要知道的事：接没接上**。
     *
     * ★ 为什么它是第一个端点：`connected:false` 是**正常状态**（本地模式），
     *   不是故障。把它做成一个显式出参，面板才能"如实说本地模式"，
     *   而不是靠"请求失败"去猜 —— 失败与未接入在界面上必须能区分。
     */
    status(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<StatusPayload>>;
    /** `kaipu/connect` —— 取令牌 + `/me`（铺子身份 / 能力位 / 时间基准）。**兼心跳** */
    connect(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<AccountView>>;
    /** `kaipu/listAgents` —— Agent 卡片（★ 响应可能为空数组：那是"零接入"，不是错误） */
    listAgents(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<{
        agents: AgentView[];
        accountId?: string;
    }>>;
    /** `kaipu/listScenes` —— 场景清单 + `#17` 的 `categories` / `recommendations` */
    listScenes(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<ScenesPayload>>;
    /** `kaipu/capabilities` —— 能力边界（`cannot` 段**必须完整展示**） */
    capabilities(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<CapabilitiesPayload>>;
    /** 把本地层的结果折进 wire 的统一信封 */
    private wrapShop;
    /**
     * `kaipu/listShopFiles` —— 三个抽屉一次列全（外加数据根，供界面如实展示）。
     * ★ 一次全给而不是按抽屉逐个查：只有三个抽屉，用户一眼看完比三次往返强。
     */
    listShopFiles(query: EmptyQuery, signal?: CancelSignal): Promise<RemoteResult<ShopFilesPayload>>;
    /** `kaipu/writeShopFiles` —— 拖放进来的文件落盘（内容 base64） */
    writeShopFiles(query: WriteShopFilesQuery, signal?: CancelSignal): Promise<RemoteResult<WriteShopFilesResult>>;
    /** `kaipu/removeShopFile` —— 删一个文件（★ 一个动作对应一个文件） */
    removeShopFile(query: RemoveShopFileQuery, signal?: CancelSignal): Promise<RemoteResult<{
        name: string;
    }>>;
    /** `kaipu/readShopTextFile` —— 读回文本（供"填进待审内容"） */
    readShopTextFile(query: ReadShopTextQuery, signal?: CancelSignal): Promise<RemoteResult<ReadShopTextResult>>;
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
    openShopDir(query: OpenShopDirQuery, signal?: CancelSignal): Promise<RemoteResult<OpenShopDirResult>>;
    /**
     * `kaipu/startRun` —— 起一场运行。
     *
     * ★ **不阻塞**：立刻回 `runId`，读 SSE 的活在后台泵（`pump`）里做，
     *   事件累积进 `this.runs`；客户端用 `pollRun` 取增量。
     *   为什么不在这里 `await` 到跑完：一场多轮场景可能几分钟，
     *   一元 RPC 有 15s 超时 ⇒ 必然断（见 `runs` 字段那段取舍说明）。
     */
    startRun(query: RunSceneQuery, signal?: CancelSignal): Promise<RemoteResult<{
        runId: string;
    }>>;
    /**
     * `kaipu/pollRun` —— 取**增量**事件（从 `from` 起）。
     * ★ 返回 `next`（下次该从哪取）而不是让客户端自己数长度 ——
     *   客户端数长度会在"服务端先返回错误再补事件"这类时序下算错。
     */
    pollRun(query: PollRunQuery, signal?: CancelSignal): Promise<RemoteResult<RunPoll>>;
    /**
     * 后台把服务端的 SSE 读干，事件累积进会话。
     * ★ 出错**记进 `error` 而不是丢**：客户端轮询时要如实看到"为什么没跑完"。
     * ★ 即使客户端已不再轮询，本泵也会**把这一场读完** ——
     *   服务端仍在算完并落 `lamp_runs`（契约 R5），我方不该提前松手。
     */
    private pump;
    /** 会话表满了就**先删最旧的**（按开始时间）—— 只清内存，不影响服务端 */
    private gcRuns;
    /**
     * 读服务端的 SSE，产出契约事件（泵的取数器）。
     * ★ 只做"接流 + 分帧 + 校验"，不含任何渲染判断。
     * ★ 保留 `async generator` 形态：这样它**可以被直接 `for await` 断言**
     *   （不经 RPC），接线出问题时能一步定位是"读"坏了还是"传"坏了。
     */
    private readRunEvents;
}
//# sourceMappingURL=service.d.ts.map