"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = void 0;
exports.apply = apply;
const react_1 = require("react");
const panel_id_js_1 = require("./panel-id.js");
const WorkstationPanelIcon_js_1 = require("./WorkstationPanelIcon.js");
const WorkstationPanel_js_1 = require("./WorkstationPanel.js");
exports.inject = ['slots', 'connection'];
function apply(ctx) {
    try {
        (0, WorkstationPanel_js_1.wireConnection)(ctx);
        ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: panel_id_js_1.WORKSTATION_PANEL_ID }, () => (0, react_1.createElement)(WorkstationPanel_js_1.WorkstationPanel, {})));
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
            name: 'sidebar.panellist',
            id: panel_id_js_1.WORKSTATION_PANEL_ID,
            order: 40,
            label: () => '工位',
        }, WorkstationPanelIcon_js_1.WorkstationPanelIcon));
    }
    catch (e) {
        console.error('[shanhai-kaipu-workstation] client apply 失败 ⇒ 工位面板不显示（其余不受影响）', e);
    }
}
//# sourceMappingURL=index.js.map