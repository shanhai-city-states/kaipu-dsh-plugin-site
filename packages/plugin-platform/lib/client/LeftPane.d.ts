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
import { type ReactElement } from 'react';
import type { AgentCard, SceneCard, SceneCategory, SceneRecommendation } from '@shanhai/kaipu-contract';
export interface LeftPaneProps {
    agents: readonly AgentCard[];
    scenes: readonly SceneCard[];
    categories: readonly SceneCategoryRow[];
    recommendations: readonly SceneRecommendation[];
    selected: string | null;
    onSelect: (scene: string) => void;
    /**
     * ★★ 这一块**渲染在哪儿**（2026-10-08）—— 决定根节点挂哪个判据锚点。
     *
     *   · `'left'`（默认）= 宽屏左栏 ⇒ `data-kaipu-left`
     *   · `'picker'`      = 窄屏顶部的「场景」折叠条 ⇒ `data-kaipu-scene-picker-body`
     *
     * ★★ 为什么**不能共用一个锚点**（这不是洁癖，是判据正确性问题）：
     *   探针要断一条**反向**断言 ——「窄屏下左栏不在（`[data-kaipu-left]` 为 null）」，
     *   它是"窄屏确实折了左栏"的证明。若窄屏那份也挂 `data-kaipu-left`，
     *   这条断言就**永远为假**（恒红）；而如果谁图省事把它改成 `>= 1`，
     *   它就变成**恒真** —— 两种都不再是判据。
     *   ⇒ 位置是**两个不同的东西**，锚点就该是两个不同的名字。
     *
     * ★ 复用同一个组件而不是各写一套：一块内容两处渲染，
     *   免得"窄屏那份"慢慢长歪（少一个推荐位、少一个「待接入 N」都没人发现）。
     */
    where?: 'left' | 'picker';
    /**
     * ★★ 把「场景」这块**提到最前**（2026-10-08 · 拍板 §一）。
     *
     * 只给**窄屏折叠条**用（`NarrowScenePicker` 传 `true`），宽屏**不动**：
     *   · 窄屏那条折叠条的本职就是"选场景"（它为什么存在，见"窄屏入口"那次）。
     *     而实测（100）：框高 320 / 内容高 585，**场景列表起点 341px > 框高**
     *     ⇒ 点开折叠条，"要选的东西整个在第一屏之外" —— 得先滚过执行方与推荐位。
     *   · 宽屏**不改**：那里左栏常驻、内容高 659 < 视口 769（富余 110，本来不用滚），
     *     而「该怎么选」是**选的依据**，移到最后就变成"选完才看到" ——
     *     那是取舍不是优化（100 §六 反方已如实摆给发起人）。
     * ⇒ 同一份内容、**两种顺序**，由这一位开关决定；行为差异写在这里，不靠读的人猜。
     */
    sceneFirst?: boolean;
}
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
export declare function SceneCurrent({ scenes, selected, }: {
    scenes: readonly SceneCard[];
    selected: string | null;
}): ReactElement;
/**
 * 契约 `SceneCategory` + **服务端实测多给的两个字段**（差异单已登记，契约变更由出件方发起）。
 *   · `scenes` —— 该分类下的场景 key 列表（★ 分组**优先用它**，见 `groupScenes`）
 *   · `count`  —— 成员数（与 `scenes.length` 应当一致；不一致时以 `scenes` 为准）
 */
export type SceneCategoryRow = SceneCategory & {
    scenes?: readonly string[];
    count?: number;
};
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
export declare function groupScenes(scenes: readonly SceneCard[], categories: readonly SceneCategoryRow[]): {
    groups: {
        key: string;
        label: string;
        intent: string;
        scenes: SceneCard[];
    }[];
    unclassified: SceneCard[];
};
export declare function LeftPane({ agents, scenes, categories, recommendations, selected, onSelect, where, sceneFirst, }: LeftPaneProps): ReactElement;
//# sourceMappingURL=LeftPane.d.ts.map