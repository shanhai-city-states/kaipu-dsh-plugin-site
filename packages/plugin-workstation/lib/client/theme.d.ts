import type { VerdictTone } from '@shanhai/kaipu-contract';
export declare const TONE_BG: Record<VerdictTone, string>;
export declare const C: {
    readonly border: "var(--dsh-border, #e5e5e5)";
    readonly text: "var(--dsh-text, inherit)";
    readonly dim: "var(--dsh-text-secondary, #8a8a8a)";
    readonly faint: "var(--dsh-text-tertiary, color-mix(in srgb, currentColor 45%, transparent))";
    readonly soft: "var(--dsh-surface-secondary, rgba(127,127,127,0.08))";
    readonly accent: "#3B6FE0";
};
export declare const FONT: {
    readonly mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
};
export declare const FS: {
    readonly tag: 12;
    readonly small: 13;
    readonly base: 14;
    readonly title: 15;
    readonly heading: 17;
};
export declare const LH: {
    readonly tight: 1.6;
    readonly normal: 1.8;
    readonly loose: 2;
};
//# sourceMappingURL=theme.d.ts.map