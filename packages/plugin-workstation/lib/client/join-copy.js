"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JOIN_GUIDE_SECTION = exports.REQ_ID_KEEP_LINE = exports.CODE_LOST_TIP = exports.CODE_STORED_TIP = exports.CODE_ONCE_TIP = exports.JOIN_CODE_KEY_PREFIX = exports.JOIN_REQ_KEY_PREFIX = void 0;
exports.humanizeJoinError = humanizeJoinError;
exports.invitePitch = invitePitch;
exports.containsInternalCode = containsInternalCode;
exports.isPasserbyRow = isPasserbyRow;
exports.splitJoinRows = splitJoinRows;
exports.joinRowLabel = joinRowLabel;
exports.applicantView = applicantView;
exports.looksLikeRequestId = looksLikeRequestId;
exports.reqStoreKey = reqStoreKey;
exports.codeStoreKey = codeStoreKey;
exports.applicantCodeState = applicantCodeState;
exports.joinGuideText = joinGuideText;
const JOIN_ERROR_TEXT = {
    no_credential: '查不到你的身份，请用原来那张码或原来的机器再试一次',
    account_not_found: '找不到这个铺子，确认一下铺号有没有打错',
    duplicate_pending: '你已经申请过一次了，还在等铺主处理，不用重复提交',
    not_owner: '这条申请只有铺主能处理',
    not_applicant: '这条申请不是你提的，看不到结果',
    already_decided: '这条申请已经处理过了，刷新一下看结果',
    expired: '这条申请放太久，已经自动作废了，重新申请一次就行',
    not_found: '铺子那边的服务还没更新，过一会儿再试',
    denied: '这次提交没被受理，确认一下码和机器对不对',
};
function humanizeJoinError(code, serverMessage) {
    const k = (code ?? '').trim();
    const hit = JOIN_ERROR_TEXT[k];
    if (hit !== undefined)
        return hit;
    const msg = (serverMessage ?? '').trim();
    if (msg.length > 0 && !containsInternalCode(msg))
        return msg;
    return '这次没提交成功，过一会儿再试一次';
}
function invitePitch(url) {
    return [
        '我邀请你进我的工位（山海·开铺 kaipu）。',
        '',
        '你可以直接把下面这段发给你的 Agent，或者自己打开也行：',
        url,
        '',
        '· 链接一次性、有效期内可用，别人打不开也用不了。',
        '· 打开后按页面提示装好「工位」插件，用你的账号登录即可。',
        '· 进去后你会看到分给你的位子，有活会在「任务」页出现。',
    ].join('\n');
}
const INTERNAL_CODE_RE = /\b(no_credential|not_owner|not_applicant|already_decided|duplicate_pending|account_not_found|missing_[a-z_]+|bad_[a-z_]+)\b/;
const INTERNAL_PATH_RE = /\/(join|packs|grants|devices|auth)\/[A-Za-z0-9_{}/-]*/;
const INTERNAL_ORG_RE = new RegExp('(\\u5c71\\u6d77\\u57ce\\u90a6|\\u57ce\\u90a6)');
function containsInternalCode(text) {
    return INTERNAL_CODE_RE.test(text) || INTERNAL_PATH_RE.test(text) || INTERNAL_ORG_RE.test(text);
}
function isPasserbyRow(row) {
    const reason = (row.reason ?? '').trim();
    return reason.includes('自动登记');
}
function splitJoinRows(rows) {
    const requests = [];
    const passers = [];
    for (const r of rows) {
        if (isPasserbyRow(r))
            passers.push(r);
        else
            requests.push(r);
    }
    return { requests, passers };
}
function joinRowLabel(row) {
    const parts = [];
    const node = (row.nodeId ?? '').trim();
    const seat = (row.seat ?? '').trim();
    if (node.length > 0)
        parts.push(node.startsWith('工位') ? node : `工位 ${node}`);
    else if (seat.length > 0)
        parts.push(seat);
    const name = (row.applicantName ?? '').trim();
    const tag = (row.deviceTag ?? '').trim();
    if (name.length > 0) {
        parts.push(tag.length > 0 ? `${name}（设备 ${tag}）` : name);
    }
    else {
        parts.push(row.applicantKind === 'agent' ? '(Agent)' : '(未署名)');
    }
    const reason = (row.reason ?? '').trim();
    if (reason.length > 0)
        parts.push(reason);
    else
        parts.push(row.applicantKind === 'agent' ? 'Agent 申请补发' : '申请补发加入码');
    return parts.join(' · ');
}
function applicantView(status) {
    const s = (status ?? '').trim();
    if (s === 'pending') {
        return { text: '已申请，等铺主通过', tone: 'wait', dot: false, canRetry: false };
    }
    if (s === 'approved') {
        return { text: '铺主通过了，新码在下面 —— 复制给 Agent 就能继续干活', tone: 'ok', dot: true, canRetry: false };
    }
    if (s === 'rejected') {
        return { text: '铺主拒绝了这次申请', tone: 'bad', dot: false, canRetry: true };
    }
    if (s === 'expired') {
        return { text: '这条申请放太久作废了，重新申请一次', tone: 'bad', dot: true, canRetry: true };
    }
    return { text: '', tone: 'plain', dot: false, canRetry: false };
}
exports.JOIN_REQ_KEY_PREFIX = 'kaipu.join.requestId';
exports.JOIN_CODE_KEY_PREFIX = 'kaipu.join.code';
function looksLikeRequestId(v) {
    return typeof v === 'string' && /^jr_[A-Za-z0-9_-]{4,}$/.test(v.trim());
}
function reqStoreKey(accountId, appId) {
    const a = (accountId ?? '').trim();
    const b = (appId ?? '').trim();
    if (a.length === 0 || b.length === 0)
        return exports.JOIN_REQ_KEY_PREFIX;
    return `${exports.JOIN_REQ_KEY_PREFIX}.${a}.${b}`;
}
function codeStoreKey(requestId) {
    return `${exports.JOIN_CODE_KEY_PREFIX}.${(requestId ?? '').trim()}`;
}
function applicantCodeState(status, serverCode, localCode) {
    const sv = (serverCode ?? '').trim();
    if (sv.length > 0)
        return 'fresh';
    const s = (status ?? '').trim();
    if (s !== 'approved')
        return 'none';
    const lc = (localCode ?? '').trim();
    if (lc.length > 0)
        return 'stored';
    return 'lost';
}
exports.CODE_ONCE_TIP = '这张码只显示一次，请现在复制（关掉就找不回来了）';
exports.CODE_STORED_TIP = '这张码已经存在本机，服务端只回一次明文，再查不会重复给';
exports.CODE_LOST_TIP = '这张码已经取过了，本机没存下来。请找铺主再补一张';
exports.REQ_ID_KEEP_LINE = '★ 提交成功后请把 requestId 抄下来，查状态和取码都要用它。';
exports.JOIN_GUIDE_SECTION = [
    '',
    '五、钥匙（密钥）会到期，到期了你自己能换 —— 不用等人搬',
    '',
    '每次领任务（poll）的返回里会多一个 keyStatus 字段，看它的 state：',
    '',
    '  ok / no_prev      → 没事，继续干活',
    '  renew_available   → 旧钥匙还在宽限期，新钥匙已经在服务端保险箱，去取',
    '  expired           → 旧钥匙过期且没有新钥匙 ⇒ 别死循环，报错给人，等人点重置',
    '',
    'state 是 renew_available 时，用【当前这把钥匙】签名，调这个接口取新钥匙：',
    '',
    '  TS=$(date +%s)',
    '  SIG=$(printf \'%s\' "{你的agentId}${TS}" | openssl dgst -sha256 -hmac "{当前secret}" -r | cut -d\' \' -f1)',
    '  curl -sS -X POST "https://agent.ak2029.com/kai-pu/agent/key/claim" \\',
    '    -H "Content-Type: application/json" \\',
    '    -d "{\\"agentId\\":\\"{你的agentId}\\",\\"accountId\\":\\"{铺ID}\\",\\"ts\\":${TS},\\"sig\\":\\"${SIG}\\"}"',
    '',
    '★ body 只能有这四个字段（agentId / accountId / ts / sig），多一个都不行。',
    '★ 签名串是 agentId+ts 直接拼，中间没有任何分隔符 —— 和上传包（竖线分隔）不一样。',
    '★ sig 放 JSON body，不要放 HTTP 头（X-Agent-Id 那套是上传包的格式，用在这必然 401）。',
    '',
    '返回 200 时，里面的 agentSecret 就是新钥匙：',
    '  1) 用 printf 写入（不要用 echo，会多一个换行变成 44 字节）',
    '  2) 写完回读校验：长度 43，sha256 前 16 位应与返回值一致',
    '  3) **立刻把内存里的密钥换掉**（守护进程发 SIGHUP 重载，脚本就直接改指向）',
    '     文件改了但内存没换 = 下一轮还是 401，而且人会以为已经换好了',
    '',
    '返回 409 no_pending_key 不是错误 —— 说明铺主还没点「重置连接」，',
    '保险箱里暂时没新钥匙。等下一轮再看，**不要重试同一个请求**。',
    '',
    '密钥从哪来：铺主在工位点「🔑 重置连接」，新钥匙自动放进服务端保险箱，',
    '你上面这一步就是把它取走。取走那一刻旧钥匙立即作废（宽限期是给这一步留的窗口）。',
    '',
    '六、如果你发现邀请码失效了（报错 401 / 403 / 码已用过）',
    '',
    '先分两件事：钥匙坏了，还是码坏了。',
    '  · poll 返回 401 且拿不到 keyStatus ⇒ 钥匙不对（先核 sha256 长度 43 对不对）',
    '  · 码已用过 / 码过期 ⇒ 码坏了，走下面的补发流程',
    '',
    '补发不要死循环重试，也不要干等。立刻申请：',
    '',
    '  curl -sS -X POST "https://agent.ak2029.com/kai-pu/join/request" \\',
    '    -H "Content-Type: application/json" \\',
    '    -d \'{"accountId":"{你的铺ID}","joinCode":"{旧码}","applicantKind":"agent","applicantId":"{你的agentId}","reason":"邀请码过期，无法提交交付物"}\'',
    '',
    exports.REQ_ID_KEEP_LINE,
    '',
    '拿到 201 后，请告诉你的主人这句话：',
    '  「邀请码已过期，我已经申请补发，等铺主通过后我会拿到新码。」',
    '',
    '然后每 5 分钟查一次：',
    '  curl -sS "https://agent.ak2029.com/kai-pu/join/request/{requestId}"',
    '',
    '当 status 变成 approved，返回里的 joinCode 就是新码，用它继续干活。',
];
function joinGuideText(baseLines) {
    return [...baseLines, ...exports.JOIN_GUIDE_SECTION].join('\n');
}
//# sourceMappingURL=join-copy.js.map