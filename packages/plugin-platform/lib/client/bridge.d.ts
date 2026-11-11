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
/** remote 命名空间。★ 必须与 host 侧 `service.ts` 的 `REMOTE_NS` 同值（判据看护） */
export declare const REMOTE_NS = "kaipu";
/** 调用通道（宿主网关的逻辑通道名） */
export declare const REMOTE_CHANNEL = "/api";
/** 宿主网关服务键（DSH 的 wire root 服务） */
export declare const CONNECTION_SERVICE = "connection";
/** 端点方法名 —— ★ 必须与 host 侧 `@Remote('<name>')` 逐字一致（判据看护） */
export declare const ENDPOINTS: {
    /** 接没接上（第一件要知道的事） */
    readonly status: "status";
    /** 取令牌 + `/me`（兼心跳） */
    readonly connect: "connect";
    readonly listAgents: "listAgents";
    readonly listScenes: "listScenes";
    readonly capabilities: "capabilities";
    /**
     * ★ 改席位（执行位 / 审计位）—— 写通道。
     *   host 侧 `assignSeat` → `POST /roles/assign`；服务端才是判据所在
     *   （签名位 403 / 执行与审计同一实体 409），前端不要自己预判。
     */
    readonly assignSeat: "assignSeat";
    /**
     * ★ 生成邀请链接 —— 和 `assignSeat` 同类：**写通道**。
     *   用户点「邀请协作方」⇒ host `createInvite` ⇒ `POST /invites`。
     */
    readonly createInvite: "createInvite";
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
    readonly startRun: "startRun";
    readonly pollRun: "pollRun";
    /**
     * ★★ 铺子资料（**本机文件**，不走网）—— 与上面那批的性质不同：
     *   它们不发请求、不需要接入地址、**断网照常可用**。
     *   ⇒ 界面上"未接入服务端"时它们照常工作，两者不该互相牵连。
     */
    readonly listShopFiles: "listShopFiles";
    readonly writeShopFiles: "writeShopFiles";
    readonly removeShopFile: "removeShopFile";
    readonly readShopTextFile: "readShopTextFile";
    /**
     * ★ 在系统文件管理器里打开铺子目录（2026-10-06）。
     *   ★★ 参数**只有 `sub`（可选枚举）**、**没有 `path`** —— 路径由 host 自己算，
     *   外面传不进任意路径（比早先那处 `openPath` 更严）。理由见 host 侧
     *   `shop-files.ts` 的 `openShopDir` 长注。
     */
    readonly openShopDir: "openShopDir";
};
export type EndpointName = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];
/** 拼出客户端要调的完整端点：`kaipu/listScenes` */
export declare function endpointOf(method: EndpointName): string;
/** DSH 客户端 connection 服务的最小形状 */
export interface ConnectionHandle {
    rpc?: {
        call(channel: string, endpoint: string, payload: unknown, signal?: unknown): Promise<unknown>;
    };
}
/** 依赖取用的最小 ctx 形状（cordis 的两种取法：`ctx.get(name)` / `ctx.name`） */
export interface ClientCtxLike {
    get?: (name: string) => unknown;
}
/**
 * 从 cordis ctx 取 `connection`。
 *
 * ★ 为什么两种取法都试：实测过 `ctx.get('connection')` 与 `ctx.connection`
 *   在不同版本/不同装配时序下表现不一致 —— **取到哪个用哪个**，不要赌。
 * ★ 取不到**不抛**：返回 null，由调用方显示"未接入"，而不是让面板炸掉。
 */
export declare function getConnection(ctx: ClientCtxLike): ConnectionHandle | null;
/** 业务信封（与 host 侧 `RemoteResult<T>` 同形；这里**不 import**，只按形状收敛） */
export interface BridgeError {
    kind: 'gateway' | 'unreachable';
    /** 机器可读（网关层的码，**不是**业务错误码） */
    code: string;
    /** 诊断用原文（★ **不上屏**） */
    detail: string;
}
export type BridgeResult<T> = {
    ok: true;
    data: T;
} | {
    ok: false;
    error: BridgeError;
} | {
    ok: false;
    business: BusinessErr;
};
/** host 侧业务错（第 2 层）—— 这一层才带契约的业务 `code` */
export interface BusinessErr {
    code: string;
    /** host 已翻译过一次；客户端**仍要按 code 再翻一次**（以契约文案为准） */
    message: string;
}
/**
 * 调一个 host 端点。
 *
 * @param conn  connection 服务
 * @param method host 方法名（**不带**命名空间）
 * @param query 业务参数（host 方法第一个参数的实参）
 * @param signal 取消信号（**可选**；host 侧已被剥掉，这里只是本地取消）
 */
export declare function callKaipu<T>(conn: ConnectionHandle, method: EndpointName, query: Record<string, unknown>, signal?: AbortSignal): Promise<BridgeResult<T>>;
//# sourceMappingURL=bridge.d.ts.map