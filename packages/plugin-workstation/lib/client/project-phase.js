"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROJECT_PHASES = void 0;
exports.phaseIndex = phaseIndex;
exports.phaseLabel = phaseLabel;
exports.phaseHint = phaseHint;
exports.phaseBar = phaseBar;
exports.nextPhase = nextPhase;
exports.prevPhase = prevPhase;
exports.isArchivedPhase = isArchivedPhase;
exports.PROJECT_PHASES = [
    'requirement',
    'plan',
    'assignment',
    'build',
    'review',
    'archived',
];
const PHASE_LABEL = {
    requirement: '立需求',
    plan: '出计划书',
    assignment: '分工',
    build: '施工',
    review: '验收',
    archived: '归档',
};
const PHASE_DELIVERABLE = {
    requirement: '需求确认书：要做成什么样、什么不做',
    plan: '开发计划书：怎么做、分几期、多大代价',
    assignment: '分工方案：谁干哪件（任务依赖在这里定）',
    build: '交付物：干出来的东西',
    review: '验收结论：通过 / 有条件通过 / 打回',
    archived: '归档包：定稿资料 + 清单，冻结不再改',
};
function phaseIndex(phase) {
    const p = (phase ?? '').trim();
    const i = exports.PROJECT_PHASES.indexOf(p);
    return i < 0 ? 0 : i + 1;
}
function phaseLabel(phase, serverLabel) {
    const p = (phase ?? '').trim();
    if (p === '')
        return '未知阶段';
    const given = (serverLabel ?? '').trim();
    if (given.length > 0)
        return given;
    return PHASE_LABEL[p] ?? p;
}
function phaseHint(phase) {
    const p = (phase ?? '').trim();
    const i = phaseIndex(p);
    if (i === 0)
        return `未知阶段（${p || '空'}）—— 不在六阶之内`;
    const what = PHASE_DELIVERABLE[p] ?? '';
    return `第 ${i}/${exports.PROJECT_PHASES.length} 步：${PHASE_LABEL[p] ?? p}${what ? ' · 这步要交：' + what : ''}`;
}
function phaseBar(phase) {
    const i = phaseIndex(phase);
    if (i === 0)
        return '？'.repeat(exports.PROJECT_PHASES.length);
    return '●'.repeat(i) + '○'.repeat(exports.PROJECT_PHASES.length - i);
}
function nextPhase(phase) {
    const i = phaseIndex(phase);
    if (i === 0 || i >= exports.PROJECT_PHASES.length)
        return null;
    return exports.PROJECT_PHASES[i] ?? null;
}
function prevPhase(phase) {
    const i = phaseIndex(phase);
    if (i <= 1)
        return null;
    return exports.PROJECT_PHASES[i - 2] ?? null;
}
function isArchivedPhase(phase) {
    return (phase ?? '').trim() === 'archived';
}
//# sourceMappingURL=project-phase.js.map