"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LH = exports.FS = exports.FONT = exports.C = exports.TONE_BG = void 0;
exports.TONE_BG = {
    pass: '#16a34a',
    conditional: '#d97706',
    reject: '#dc2626',
    refuse: '#6d28d9',
};
exports.C = {
    border: 'var(--dsh-border, #e5e5e5)',
    text: 'var(--dsh-text, inherit)',
    dim: 'var(--dsh-text-secondary, #8a8a8a)',
    faint: 'var(--dsh-text-tertiary, color-mix(in srgb, currentColor 45%, transparent))',
    soft: 'var(--dsh-surface-secondary, rgba(127,127,127,0.08))',
    accent: '#3B6FE0',
};
exports.FONT = {
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
};
exports.FS = {
    tag: 12,
    small: 13,
    base: 14,
    title: 15,
    heading: 17,
};
exports.LH = {
    tight: 1.6,
    normal: 1.8,
    loose: 2,
};
//# sourceMappingURL=theme.js.map