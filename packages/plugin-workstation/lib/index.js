import { WorkstationRemoteService } from './remote/service.js';
export const name = 'shanhai-kaipu-workstation';
export function apply(ctx, config = {}) {
    ctx.logger?.info(`[${name}] 工位插件已加载（${config.baseUrl ? '已接服务端 ' + config.baseUrl : '本地只读态（未配 baseUrl）'}）`);
    try {
        new WorkstationRemoteService(ctx, config);
        ctx.logger?.info(`[${name}] ✓ 数据通道已注册（remote namespace=kaipu-workstation；` +
            `status / state / orgTree / orgNodeCreate / orgNodePatch / orgNodeDelete）`);
    }
    catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        ctx.logger?.warn(`[${name}] ⚠ 数据通道注册失败：${msg}（面板将显示未接入）`);
    }
}
//# sourceMappingURL=index.js.map