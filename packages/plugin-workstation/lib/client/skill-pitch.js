"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildInstallPitch = buildInstallPitch;
exports.blockedReasonText = blockedReasonText;
function buildInstallPitch(input) {
    const NL = '\n';
    const shop = (input.shopName ?? '').trim();
    const where = shop.length > 0 ? `「${shop}」这个铺子` : '我这个铺子';
    if (input.installed === true) {
        const v = (input.installedVersion ?? '').trim();
        return [
            `帮我确认一下「${input.name}」这个技能在我${where}里的状态。`,
            '',
            '它已经装过了，我不是要重装 —— 重装会覆盖现有授权，装完反而不能用。',
            '',
            '请帮我确认三件事，然后告诉我结果：',
            `1. 技能标识是不是 ${input.skillId}`,
            v.length > 0 ? `2. 当前版本是不是 ${v}` : '2. 当前装的是哪个版本',
            '3. 能不能正常跑一次',
            '',
            '如果版本不对或者跑不起来，停下来告诉我原因，不要自己删了重装。',
        ].join(NL);
    }
    return [
        `帮我安装「${input.name}」这个技能到${where}。`,
        '',
        `技能标识：${input.skillId}`,
        `它是干什么的：${input.summary}`,
        '',
        '安装的时候注意：',
        '1. 只装这一个，不要顺手把别的也装上；',
        '2. 装完看一眼结果，装失败了就停下来告诉我原因，不要反复重试；',
        '3. 如果提示已经装过，不要覆盖 —— 先告诉我它现在是什么版本。',
        '',
        '装完告诉我：装好了没有、版本是多少、有没有报错。',
    ].join(NL);
}
function blockedReasonText(reasons) {
    if (reasons.length === 0)
        return '';
    if (reasons.some((r) => r.includes('建设中') || r.includes('尚无实物'))) {
        return '这个技能还在建设中，暂时不能安装。';
    }
    if (reasons.some((r) => r.includes('manifest'))) {
        return '安装包还在准备中，暂时不能安装。';
    }
    return '这个技能暂时不能安装。';
}
//# sourceMappingURL=skill-pitch.js.map