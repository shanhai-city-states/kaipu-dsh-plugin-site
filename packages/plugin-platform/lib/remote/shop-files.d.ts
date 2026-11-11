/**
 * 山海·开铺 · 场地插件 · 铺子资料目录（host 侧本地文件层）
 * =====================================================================
 * 只干一件事：把「用户自己的资料」落在**本机一个可查的目录**里。
 * 它不发任何 HTTP，也不碰会商运行的后台泵 —— 与网侧完全解耦。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 为什么是「目录」而不是「一张表」
 * ══════════════════════════════════════════════════════════════════
 * 资料本来就长在文件系统上：用户拖进来的是文件，拿出去的也是文件。
 * 为它在本地再建一份索引表，只会多出**第二事实源**，而两份必然漂移：
 * 文件被手工删了、表还在 ⇒ 界面显示一个点不开的文件，且没人知道谁是对的。
 * ⇒ **目录即事实源**：`readdir` 读到的就是真的，没有对账问题。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 数据根：DSH home 下的插件私有数据区
 * ══════════════════════════════════════════════════════════════════
 *   <DSH_HOME>/plugins-data/kaipu-platform/shops/<shopKey>/
 *     ├── 待审材料/   ← 用户放进来「要审的东西」
 *     ├── 审校报告/   ← 运行产生的结论
 *     └── 草稿/       ← 断网也照样能写的东西
 *
 * ★ 为什么挂 `plugins-data/`：本仓的装机工具把它定为**插件私有数据区**，
 *   并配了一条纪律 —— **卸载只删代码、数据保留**（`tools/plugin.mjs`
 *   的 uninstall 会显式打印"数据保留"）。
 *   ⇒ 用户的资料放在这里，装卸/升级插件都不会把它带走。
 *
 * ★ `DSH_HOME` 的取法**照抄底座的默认值**（`process.env.DSH_HOME ?? ~/.dsh`），
 *   不自造一个路径 —— 换机器、换 profile 才不会断。
 * ★ 允许 `KAI_SHOP_DATA_ROOT` 显式覆盖（多实例并行 / 测试隔离用）。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 隔离：按「铺子」分目录 + 路径收敛，**不假设宿主替我们做了隔离**
 * ══════════════════════════════════════════════════════════════════
 * `shopKey` 由接入身份派生 ⇒ 换一个接入地址，就是一个**物理上不同的目录**，
 * 天然不串味。任何写/删/读的路径都要过 `isPathInShop()` 收敛
 * （`..` 穿越、跨铺子、绝对路径一律拒），**fail-closed**。
 *
 * ★ 为什么不把"隔离"寄托在宿主身上：宿主提供的是**进程与 profile** 级别的
 *   隔离，而"这个文件属于哪个铺子"是**业务语义**，只有我们定义得了。
 *   ⇒ 自己这道闸门必须有，且必须能被打出来（配套探针会喂穿越样本断言拒绝）。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 零依赖取内置模块（本文件跑在 host，但不引 `@types/node`）
 * ══════════════════════════════════════════════════════════════════
 * host 侧 tsconfig 是 `"types": []` —— 这是**故意的**（防误用 window / DOM）。
 * 代价是 `node:fs` 的类型拿不到，所以这里照本仓既有做法：
 * 用 `process.getBuiltinModule()` 取真身 + **手写最小形状**。
 * ⇒ 类型安全靠我们自己维护，收益是**不为一个 mkdir 拖进整套 node 类型**。
 */
import type { ShopFileEntry, ShopSubdir } from '@shanhai/kaipu-contract';
/**
 * 三个固定子目录。
 *
 * ★★ 为什么这里**又写了一份**（契约包里也有一份同值的）：
 *   host half 不能从契约包 import **值**（见文件头那条约束），而两端 tsconfig
 *   的 module 格式不同又不能共用一个源文件 ⇒ 只能各写一份。
 *   这与本仓 `REMOTE_NS` 的两份是同一个模式，**同由判据强制一致**
 *   （发布前由机检保证两处一致）。
 *   ⇒ 改一处漏一处 = 判据 FAIL，不会静默漂移。
 */
export declare const SHOP_SUBDIRS: readonly ShopSubdir[];
/** 单文件上限（base64 走一元通道，太大就不是"拖一下"的场景了） */
export declare const MAX_FILE_BYTES: number;
/** 读回文本时的上限 —— 超了**截断并如实标注**，不假装读全 */
export declare const MAX_TEXT_BYTES: number;
/**
 * 铺子资料的数据根（`…/shops` 的上级 = 插件的私有数据区）。
 * 优先级：显式覆盖 → `DSH_HOME` → `~/.dsh`（与底座默认值一致）。
 */
export declare function pluginDataRoot(): string;
/** `…/shops` 目录（各铺子目录的父级） */
export declare function shopsRoot(): string;
/**
 * 铺子 key —— 由接入身份派生的**目录名**。
 *
 * ★ 规则：能直接用作目录名就直用（人可读，用户打开文件管理器能认出来）；
 *   凡是需要转义的一律加**内容哈希后缀**，避免两种身份被折叠成一个目录：
 *     `A/B` 与 `A-B` 若都转义成 `a-b` ⇒ 两个铺子会共用目录（串味）。
 *   ⇒ 加了哈希，它们必然分叉。
 * ★ 统一小写：本客户端跑在 Windows 上，文件系统**不区分大小写**，
 *   不全小写的话 `ABC` 与 `abc` 会落进同一个目录。
 */
export declare function shopKeyOf(accountId: string): string;
/** 某个铺子（某个子目录）的绝对路径 */
export declare function shopDirOf(accountId: string, sub: ShopSubdir): string;
/**
 * `target` 是否落在 `root` **之内**（含 root 本身）。
 *
 * ★★ 为什么不用"字符串前缀"比较：`…\shop` 与 `…\shop-evil` 只差一个分隔符，
 *   前缀比较会把后者判成"在里面"。⇒ 用 `relative()` 逐段判更稳。
 * ★ 逐段查 `..` 而不是 `startsWith('..')`：`..foo` 是**合法文件名**，
 *   用前缀判会把它误杀。
 * ★ 大小写：Windows 路径不区分大小写 ⇒ 比较前统一小写（否则同一路径被判越界）。
 *   只影响比较，不影响返回的真实路径。
 */
export declare function isPathInShop(shopRoot: string, target: string): boolean;
/** 一个子目录名是否合法（**只有**那三个固定的） */
export declare function isShopSubdir(v: unknown): v is ShopSubdir;
/**
 * 把用户给的文件名收敛成一个**安全的单段文件名**。
 * 返回 `null` = 这个名字不能用。
 *
 * ★ 这里做的是**防御性剥离**（只取最后一段），**不是"替用户改名"**：
 *   浏览器拖放给的 `File.name` 本来就是**纯文件名**（不含目录），
 *   正常路径下这一步不改变任何东西。
 *   但接口层可能被喂 `..\..\x` 这类名字 —— 那是**越界尝试**，
 *   剥离后它只剩 `x`，落点仍在抽屉里。**拦的是路径，不是名字。**
 * ★ 真正非法的名字（空 / `.` / `..` / 含保留字符 / 以点或空格结尾）**明确拒绝**，
 *   并由调用方**逐个报出原因**，不静默换成别的名字 ——
 *   用户找不到自己那份文件时，最怕的是没人告诉他。
 */
export declare function safeFileName(input: string): string | null;
/** 能否读成文本（按扩展名白名单） */
export declare function isReadableText(name: string): boolean;
export type ShopResult<T> = {
    ok: true;
    value: T;
} | {
    ok: false;
    code: string;
    error: string;
};
/** 确保三个抽屉都在。★ 幂等：每次调用都补齐，用户手工删了也会回来 */
export declare function ensureShop(accountId: string): ShopResult<{
    root: string;
    shopKey: string;
}>;
/**
 * 列出一个抽屉里的文件。
 * ★ 不跟随符号链接（`isSymbolicLink()` 直接跳过）：链接可以指向铺子外面，
 *   跟随它等于把上面那道收敛闸门绕过去。这里不需要它，就不开这个口子。
 */
export declare function listShopFiles(accountId: string, sub: ShopSubdir): ShopResult<ShopFileEntry[]>;
/** 写入一批文件（内容为 base64）。★ 逐文件报结果，不搞"整体成败" */
export declare function writeShopFiles(accountId: string, sub: ShopSubdir, files: readonly {
    name: string;
    base64: string;
}[]): ShopResult<{
    written: {
        name: string;
        size: number;
    }[];
    failed: {
        name: string;
        error: string;
    }[];
}>;
/** 删一个文件。★ 不给"整目录清空"这种口子 —— 一个动作对应一个文件 */
export declare function removeShopFile(accountId: string, sub: ShopSubdir, name: string): ShopResult<null>;
/** 读回一个文本文件（供"填入待审内容"这类动作）。超长**截断并标注** */
export declare function readShopTextFile(accountId: string, sub: ShopSubdir, name: string): ShopResult<{
    name: string;
    text: string;
    size: number;
    truncated: boolean;
}>;
/**
 * 在系统文件管理器里打开**铺子资料目录**（界面上「存在本机：…」旁边那个按钮）。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 为什么在 host 做，而不是让桌面壳（Tauri command）去做
 * ══════════════════════════════════════════════════════════════════
 *   壳那条路**实测走不通**：报 `Command open_local_path not allowed by ACL`
 *   —— Tauri v2 的 ACL 默认**只给 bundled 页面** Tauri API 权限，
 *   而插件界面是**侧车提供的 http 页面**（属 remote source）。
 *   ⇒ 放 host，三条理由：
 *     ① host 本来就是**本地运行时**，"打开本机目录"是它的本职
 *     ② **浏览器版也能用**（不依赖桌面壳的存在）
 *     ③ 复用现成的 RPC 通道 —— 零新机制
 *   （早先那处 `openPath` —— 同款做法；差别在两处"更严"，见下一条。
 *     ★ 只留先例名，**不写它的仓内路径**：本仓的消毒判据把内部路径与业务标识
 *       一律算作 FAIL，而"某仓的某个文件"这种信息对读这段注释毫无必要。）
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 两处比那个先例**更严**（不是照抄，是收紧）
 * ══════════════════════════════════════════════════════════════════
 *   ① **只接受枚举 `sub`，不接受路径**：那边收 `path` 再 `resolve()` 收敛；
 *      这里**路径一律由 host 自己算** ⇒ 外面**根本传不进任意路径**。
 *   ② 与其它铺子资料端点同口径：**不看接入状态** —— 本机操作，
 *      断网 / 未接入服务端时照常可用（两者不是一回事）。
 *
 * ══════════════════════════════════════════════════════════════════
 * ★★ 两个必须照做的细节（都是别人踩出来的，不照做就出"看不见的错"）
 * ══════════════════════════════════════════════════════════════════
 *   · **必须 `path.resolve()` 规范化**：Windows 的 `explorer.exe` **不认正斜杠**。
 *     实测表现：传正斜杠它**不报错**，而是**默默打开「文档」** ——
 *     看起来成功了，其实打开了错的地方，**比报错更难发现**。
 *   · **以参数传路径、不经 shell**：`spawn(cmd, args)` 不经过命令解释器 ⇒ 无法注入；
 *     对比 `exec('explorer ' + path)` 是典型注入面 ⇒ 所以这里**只要 `spawn`**。
 *
 * ★ 语义边界：这是**打开目录**，不是"用默认程序打开某个文件"。
 *   后者是"我们替你执行了一份内容"，含义完全不同 —— 本函数只开目录。
 */
export declare function openShopDir(accountId: string, sub: string | undefined): ShopResult<{
    opened: boolean;
    path: string;
    opener: string;
}>;
//# sourceMappingURL=shop-files.d.ts.map