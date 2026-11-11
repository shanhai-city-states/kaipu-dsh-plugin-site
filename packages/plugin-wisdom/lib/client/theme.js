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