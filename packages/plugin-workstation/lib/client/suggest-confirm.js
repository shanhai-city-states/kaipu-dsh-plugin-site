"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIrreversibleStep = isIrreversibleStep;
exports.confirmLabel = confirmLabel;
exports.confirmLabelIrreversible = confirmLabelIrreversible;
exports.confirmLabelFor = confirmLabelFor;
exports.confirmHint = confirmHint;
exports.confirmAriaLabel = confirmAriaLabel;
const project_phase_js_1 = require("./project-phase.js");
const IRREVERSIBLE_TO = new Set(['review', 'archived']);
function isIrreversibleStep(toPhase) {
    return IRREVERSIBLE_TO.has((toPhase ?? '').trim());
}
function confirmLabel(toPhase) {
    const p = (0, project_phase_js_1.phaseLabel)(toPhase);
    return `⚠ 再点一次：推进到「${p}」`;
}
function confirmLabelIrreversible(toPhase) {
    const p = (0, project_phase_js_1.phaseLabel)(toPhase);
    return `⚠ 不可逆：推进到「${p}」`;
}
function confirmLabelFor(toPhase) {
    return isIrreversibleStep(toPhase) ? confirmLabelIrreversible(toPhase) : confirmLabel(toPhase);
}
function confirmHint(armed, toPhase) {
    if (!armed)
        return '';
    const p = (0, project_phase_js_1.phaseLabel)(toPhase);
    if (isIrreversibleStep(toPhase)) {
        return `已确认一次。再点一次将推进到「${p}」，并记录为人工覆盖；归档后不可再改。`;
    }
    return `已确认一次。再点一次将推进到「${p}」，并记录为人工覆盖。`;
}
function confirmAriaLabel(tone, armed, toPhase) {
    const p = (0, project_phase_js_1.phaseLabel)(toPhase);
    if (tone === 'stale')
        return `这条建议已失效，不能推进到「${p}」`;
    if (tone === 'normal')
        return `确认推进到「${p}」`;
    return armed
        ? `再按一次确认推进到「${p}」（需按两次，第二次才生效）`
        : `预检未通过，仍要推进到「${p}」（需按两次）`;
}
//# sourceMappingURL=suggest-confirm.js.map