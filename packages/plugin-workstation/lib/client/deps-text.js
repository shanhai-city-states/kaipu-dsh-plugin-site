"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depStatusLabel = depStatusLabel;
exports.depLine = depLine;
exports.depsHeadline = depsHeadline;
exports.pickDepCandidates = pickDepCandidates;
exports.versionLine = versionLine;
exports.versionHint = versionHint;
const ST_LABEL = {
    posted: '待领',
    claimed: '已领',
    in_progress: '在干',
    done: '已交',
    accepted: '已通过',
    rejected: '被驳回',
    blocked: '求助中',
};
function depStatusLabel(status) {
    const s = (status ?? '').trim();
    if (s === '')
        return '状态不明';
    return ST_LABEL[s] ?? s;
}
function depLine(d) {
    const title = (d.title ?? '').trim() || (d.id ?? '').trim() || '未命名任务';
    return `${title}（${depStatusLabel(d.status)}）`;
}
function depsHeadline(d) {
    const on = d.dependsOn.length;
    const bl = d.blocks.length;
    if (on === 0 && bl === 0)
        return '无依赖';
    if (d.claimable && on === 0)
        return `能领${bl > 0 ? ` · 我挡着 ${bl} 件` : ''}`;
    if (!d.claimable) {
        const n = d.unmet > 0 ? d.unmet : on;
        return `还不能领 · 等 ${n} 件前置交付`;
    }
    return `能领${bl > 0 ? ` · 我挡着 ${bl} 件` : ''}`;
}
function pickDepCandidates(selfId, all, deps) {
    const have = new Set(deps.dependsOn.map((d) => d.id));
    const blocksMe = new Set(deps.blocks.map((d) => d.id));
    return all
        .filter((t) => t.task_id !== selfId)
        .filter((t) => !have.has(t.task_id))
        .filter((t) => !blocksMe.has(t.task_id))
        .map((t) => ({ id: t.task_id, title: t.title || t.task_id }));
}
function versionLine(dl) {
    const n = dl.count;
    if (n === 0)
        return '无交付';
    const fv = dl.finalVersion;
    const max = dl.versions.length > 0 ? Math.max(...dl.versions) : 0;
    const tail = fv > 0 && fv < max ? ` · 最终 v${fv}（不是最新那稿）` : fv > 0 ? ` · 最终 v${fv}` : '';
    return `交付 ${n} 稿${tail}`;
}
function versionHint(dl) {
    const max = dl.versions.length > 0 ? Math.max(...dl.versions) : 0;
    if (dl.finalVersion > 0 && dl.finalVersion < max) {
        return `v${max} 交上去后发现有问题，已回退到 v${dl.finalVersion} —— 对外算数的是 v${dl.finalVersion}。`;
    }
    if (dl.count === 1)
        return '只有一稿。';
    return `v${max} 是最新，也是最终稿。`;
}
//# sourceMappingURL=deps-text.js.map