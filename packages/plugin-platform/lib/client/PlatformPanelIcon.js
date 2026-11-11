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