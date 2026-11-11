"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SP = exports.SF = exports.SR = exports.SC_ACCENT = exports.SC = void 0;
exports.buttonStyle = buttonStyle;
exports.toneStyle = toneStyle;
exports.SC = {
    ink: '#1B1F24',
    face: '#FFFFFF',
    line: '#E3E6EA',
    brand: '#C2410C',
    blue: '#3B6FE0',
};
exports.SC_ACCENT = '#3B6FE0';
exports.SR = {
    card: 10,
    ctrl: 6,
};
exports.SF = {
    title: 15,
    body: 13,
    tag: 11,
};
exports.SP = {
    card: 14,
    block: 10,
};
function buttonStyle(tone) {
    if (tone === 'stale') {
        return {
            bg: exports.SC.line,
            fg: exports.SC.ink,
            border: exports.SC.line,
            label: '✓ 确认推进',
            disabled: true,
        };
    }
    if (tone === 'blocked') {
        return {
            bg: exports.SC.face,
            fg: exports.SC.blue,
            border: exports.SC.blue,
            label: '⚠ 仍要推进',
            disabled: false,
        };
    }
    return {
        bg: exports.SC.blue,
        fg: exports.SC.face,
        border: exports.SC.blue,
        label: '✓ 确认推进',
        disabled: false,
    };
}
function toneStyle(tone) {
    if (tone === 'stale') {
        return {
            card: {
                border: `1px dashed ${exports.SC.ink}`,
                background: exports.SC.face,
                borderRadius: exports.SR.card,
                padding: exports.SP.card,
            },
            showBrand: false,
        };
    }
    if (tone === 'blocked') {
        return {
            card: {
                border: `1px solid ${exports.SC.line}`,
                borderLeft: `3px solid ${exports.SC.brand}`,
                background: exports.SC.face,
                borderRadius: exports.SR.card,
                padding: exports.SP.card,
            },
            showBrand: true,
        };
    }
    return {
        card: {
            border: `1px solid ${exports.SC.line}`,
            background: exports.SC.face,
            borderRadius: exports.SR.card,
            padding: exports.SP.card,
        },
        showBrand: false,
    };
}
//# sourceMappingURL=suggest-theme.js.map