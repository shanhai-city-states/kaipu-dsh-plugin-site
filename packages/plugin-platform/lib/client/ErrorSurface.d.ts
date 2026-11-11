/**
 * 山海·开铺 · 场地插件 · 错误面（把 `code` 翻译成用户语言）
 * =====================================================================
 * ★★ 客户端纪律（契约 `errors.json` envelope）：
 *      **不把原始错误直出给用户**；一律按 `code` 翻译。
 *      `code` 不在表内 ⇒ 兜底文案 + 上报（**不许把裸 code 印给用户**）。
 *   ⇒ 本组件的可见文字**只来自 `translateError()`**，任何人都不许在这里写技术报错。
 *     裸 code 只出现在 `data-kaipu-*` 属性里（给判据用，不给用户看）。
 *
 * ★★ 还有一类不是"错误"，是"该走另一条路"（契约 `clientAction`）：
 *      · `duplicate_request` ⇒ **不弹错**，按 `detail.poll` 切到查询接口
 *      · `not_checked_in`    ⇒ 显示「该场景需进场」，不是普通报错
 *    这两种**不能用错误样式**渲染 —— 用红框弹一个"已经在跑了"是不对的：
 *    用户没做错任何事，他只需要被送到正确的页面。
 */
import type { ReactElement } from 'react';
export interface ErrorSurfaceProps {
    code: string;
    detail?: Record<string, unknown> | undefined;
    onDismiss: () => void;
}
export declare function ErrorSurface({ code, detail, onDismiss }: ErrorSurfaceProps): ReactElement;
//# sourceMappingURL=ErrorSurface.d.ts.map