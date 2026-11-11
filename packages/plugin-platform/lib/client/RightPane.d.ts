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
import { type ReactElement } from 'react';
import type { SceneCard } from '@shanhai/kaipu-contract';
import { type RunView } from './run-reducer.js';
/** 一次运行的输入（契约 §3.4 的 `target` / `content`） */
export interface RunInput {
    target: string;
    content: string;
}
export interface RightPaneProps {
    scene: SceneCard | null;
    run: RunView;
    /** 数据来源标签。mock 时**必须**给（见 mock/data.ts 纪律 3） */
    sourceLabel: string | null;
    /**
     * ★ 是否演示数据。**必须与 `sourceLabel` 分开**（2026-10-05 接线时立的）：
     *   接上真服务端后 `sourceLabel` 变成「真服务端」（**也非 null**），
     *   若还拿它判断"是不是演示"，界面会对着真服务端说
     *   「面板尚未接入服务端；下面每条判定都来自本地演示序列」—— **当着真的说假的**。
     */
    isMock: boolean;
    onStop: () => void;
    /** ★ 发起运行（真服务端路径）。`null` = 当前不可发起（演示模式 / 通道不可用） */
    onStart: ((input: RunInput) => void) | null;
    /** 运行是否进行中（用于禁用重复发起） */
    running: boolean;
    /** 运行失败时的**原文**（不翻译、不吞） */
    runError: string | null;
    /** 报告是否已签名。未接入服务端 ⇒ 恒 false ⇒ 必须显示约束 ① */
    signed: boolean;
    /** 当前触发的错误码（演示用；接真服务端后由请求失败驱动） */
    errorCode: string | null;
    onFireError: (code: string) => void;
    onClearError: () => void;
    /**
     * ★ 跳回「铺子资料」页签（真服务端路径下，运行视图里给一个返回入口）。
     *   与顶部页签是**同一动作**的两处入口：页签负责"全局切"，这里负责"填完东西顺手回去取更多"。
     *   为什么必要：从铺子资料「填入待审内容」会把人带**过来**（见 PlatformPanel.placeFill），
     *   那么"带过来之后想再取一份"就该有路回去，否则单程。
     */
    onGoShop: () => void;
    /**
     * ★ 空态时**代替**那句通用引导的说明（`null` = 用默认引导）。
     *
     * 为什么要它：`scene === null` 有**三种完全不同的原因**，用户要做的事也不同 ——
     *   · 还没选（给引导）
     *   · 正在读（给"稍候"）
     *   · **读不到**（给原因 + 出路）
     * 用同一句"先从左边挑一场场景"糊过去，是把"读失败"伪装成"你还没操作"。
     */
    lead: string | null;
    /**
     * ★ 来自铺子资料的「填入待审内容」信号。
     *   `seq` 递增 ⇒ **每次都算一次新填入**（两次填同一份文件时文本没变，
     *   只认文本就永远不会触发第二次）。
     */
    fill: {
        text: string;
        name: string;
        seq: number;
    } | null;
    /**
     * ★ 从铺子资料点「开始运行」过来的一次性信号（`0` = 没有这一趟）。
     *   见 `PlatformPanel.focusSeq`：跨页之后要把**发起区本身**送到视野中间，
     *   不是"切回操作台"就算到了。
     */
    focusSeq: number;
    /** 信号已消费（清零）—— 它是**一次性**的，留着会反复把人拖过来 */
    onFocusConsumed: () => void;
    /**
     * ★★ 左栏若不可见，**为什么**（`null` = 可见）。见 `PlatformPanel` 的 `leftHidden`。
     *
     * 为什么空态需要知道这件事：挑场景的入口**不在右边**。而"左栏不在"有**两种**
     * 不同的原因，**出路也不一样**：
     *   · `'collapsed'` 用户收起 ⇒ 点顶部「展开场景栏」（那个按钮在）
     *   · `'narrow'`    容器太窄 ⇒ 把窗口拉宽（这时**没有**那个按钮 —— 窄屏不给开关）
     * 原来空态写死"先从左边挑一场「场景」"⇒ **在那一刻它是与事实不符的话**。
     */
    leftHidden: 'collapsed' | 'narrow' | null;
}
export declare function RightPane({ scene, run, sourceLabel, isMock, onStop, onStart, running, runError, signed, errorCode, onFireError, onClearError, onGoShop, lead, leftHidden, fill, focusSeq, onFocusConsumed, }: RightPaneProps): ReactElement;
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
export declare function ActionBar({ run, scene, isMock, canStart, leftHidden, queryRootRef, }: {
    run: RunView;
    scene: SceneCard | null;
    isMock: boolean;
    /** 真服务端路径才有真实发起表单（演示/通道不可用时没有可填的落点） */
    canStart: boolean;
    /**
     * ★★ 左栏状态**三态**，不能拍成布尔（2026-10-17 · Codex 验收 P2 订正）。
     *
     * 第一版把它压成 `leftHidden !== null` ⇒ `collapsed`（用户宽屏收起）与
     * `narrow`（容器太窄）被当成同一回事，都提示"点顶部的「场景」"。
     * 但 `PlatformPanel` **只在 narrow 时**才渲染顶部那条折叠条 ⇒
     * **宽屏收起时顶部什么都没有**，那句话是**指路指空**（用户照着点只会扑空）。
     * ⇒ 三态分开，各指各的真实出口（与 `NoScenePicked` 的 `guide` 同一口径）。
     */
    leftHidden: 'collapsed' | 'narrow' | null;
    /**
     * ★★ 查询根的 **ref**（2026-10-17 · Codex 验收 P2「全局查询可能定位另一个面板」）。
     *
     * ── 第一版为什么还不算修好（Codex 第二轮指出的）──────────────────────────
     *   第一版写的是：
     *     `scope?.querySelector(sel) ?? document.querySelector(sel)`
     *   ⇒ **只要本面板里查不到，就退化为全文档查询** —— 而注释写的是
     *     "容器还没挂载时才退化" ⇒ **又是一次注释比事实好看**（与本文件上一处同病）。
     *   多实例下真实后果：本实例没有 summary（比如还没跑完），另一个实例有
     *   ⇒ 点「查看本次结论」会**跳到别人的结论**。这比"不动"更糟（它会撒谎）。
     *
     * ── 现在的口径（无兜底）────────────────────────────────────────────────
     *   ① `queryRootRef.current === null` ⇒ 直接 return（没有本面板容器，就不定位）
     *   ② 本面板内查不到目标 ⇒ 直接 return（**宁可不动，也不跳去别的实例**）
     *   ⇒ **不存在任何全局回退路径**。
     *   ★ 为什么不担心"容器没挂载导致点不动"：那颗按钮本身长在本容器里，
     *     容器没挂载时用户根本点不到它 —— 这个"退化"没有真实场景。
     */
    queryRootRef?: {
        current: HTMLElement | null;
    };
}): ReactElement | null;
//# sourceMappingURL=RightPane.d.ts.map