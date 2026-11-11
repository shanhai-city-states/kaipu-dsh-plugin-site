export declare const SC: {
    readonly ink: "#1B1F24";
    readonly face: "#FFFFFF";
    readonly line: "#E3E6EA";
    readonly brand: "#C2410C";
    readonly blue: "#3B6FE0";
};
export declare const SC_ACCENT: "#3B6FE0";
export declare const SR: {
    readonly card: 10;
    readonly ctrl: 6;
};
export declare const SF: {
    readonly title: 15;
    readonly body: 13;
    readonly tag: 11;
};
export declare const SP: {
    readonly card: 14;
    readonly block: 10;
};
export type SuggestTone = 'normal' | 'blocked' | 'stale';
type CSS = Record<string, string | number>;
export declare function buttonStyle(tone: SuggestTone): {
    bg: string;
    fg: string;
    border: string;
    label: string;
    disabled: boolean;
};
export declare function toneStyle(tone: SuggestTone): {
    card: CSS;
    showBrand: boolean;
};
export {};
//# sourceMappingURL=suggest-theme.d.ts.map