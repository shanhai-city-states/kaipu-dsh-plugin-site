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