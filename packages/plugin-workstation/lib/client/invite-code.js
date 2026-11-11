"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODE_STORE_PREFIX = exports.PENDING_LIMIT = void 0;
exports.plainStoreKey = plainStoreKey;
exports.sha256Hex = sha256Hex;
exports.codeHashOf = codeHashOf;
exports.stateLabel = stateLabel;
exports.isActionable = isActionable;
exports.remainingText = remainingText;
exports.codeTextOf = codeTextOf;
exports.usedByText = usedByText;
exports.pendingCount = pendingCount;
exports.canCreateMore = canCreateMore;
exports.createBlockedTip = createBlockedTip;
exports.batchChoices = batchChoices;
exports.staleHashes = staleHashes;
exports.humanizeCodeError = humanizeCodeError;
exports.codeRowView = codeRowView;
exports.emptyListText = emptyListText;
exports.PENDING_LIMIT = 3;
exports.CODE_STORE_PREFIX = 'kaipu.joinCode.plain.';
function plainStoreKey(hash) {
    return exports.CODE_STORE_PREFIX + hash;
}
const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];
function rotr(x, n) {
    return ((x >>> n) | (x << (32 - n))) >>> 0;
}
function sha256Hex(input) {
    const bytes = [];
    for (let i = 0; i < input.length; i += 1) {
        const c = input.charCodeAt(i);
        if (c < 0x80)
            bytes.push(c);
        else if (c < 0x800)
            bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
        else if (c >= 0xd800 && c <= 0xdbff) {
            const next = input.charCodeAt(i + 1);
            const cp = 0x10000 + ((c - 0xd800) << 10) + (next - 0xdc00);
            i += 1;
            bytes.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
        }
        else
            bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    }
    const bitLen = bytes.length * 8;
    bytes.push(0x80);
    while (bytes.length % 64 !== 56)
        bytes.push(0);
    const hi = Math.floor(bitLen / 0x100000000);
    const lo = bitLen >>> 0;
    bytes.push((hi >>> 24) & 0xff, (hi >>> 16) & 0xff, (hi >>> 8) & 0xff, hi & 0xff);
    bytes.push((lo >>> 24) & 0xff, (lo >>> 16) & 0xff, (lo >>> 8) & 0xff, lo & 0xff);
    let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
    let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
    const w = new Array(64);
    for (let off = 0; off < bytes.length; off += 64) {
        for (let i = 0; i < 16; i += 1) {
            const j = off + i * 4;
            w[i] = ((bytes[j] ?? 0) << 24) | ((bytes[j + 1] ?? 0) << 16) | ((bytes[j + 2] ?? 0) << 8) | (bytes[j + 3] ?? 0);
        }
        for (let i = 16; i < 64; i += 1) {
            const w15 = w[i - 15];
            const w2 = w[i - 2];
            const s0 = (rotr(w15, 7) ^ rotr(w15, 18) ^ (w15 >>> 3)) >>> 0;
            const s1 = (rotr(w2, 17) ^ rotr(w2, 19) ^ (w2 >>> 10)) >>> 0;
            w[i] = ((w[i - 16] + s0 + w[i - 7] + s1) >>> 0);
        }
        let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, hh = h7;
        for (let i = 0; i < 64; i += 1) {
            const S1 = (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) >>> 0;
            const ch = ((e & f) ^ (~e & g)) >>> 0;
            const t1 = (hh + S1 + ch + K[i] + w[i]) >>> 0;
            const S0 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) >>> 0;
            const maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0;
            const t2 = (S0 + maj) >>> 0;
            hh = g;
            g = f;
            f = e;
            e = (d + t1) >>> 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) >>> 0;
        }
        h0 = (h0 + a) >>> 0;
        h1 = (h1 + b) >>> 0;
        h2 = (h2 + c) >>> 0;
        h3 = (h3 + d) >>> 0;
        h4 = (h4 + e) >>> 0;
        h5 = (h5 + f) >>> 0;
        h6 = (h6 + g) >>> 0;
        h7 = (h7 + hh) >>> 0;
    }
    return [h0, h1, h2, h3, h4, h5, h6, h7].map((x) => x.toString(16).padStart(8, '0')).join('');
}
function codeHashOf(plain) {
    return sha256Hex(plain.trim()).slice(0, 12);
}
function stateLabel(state) {
    switch (state) {
        case 'pending': return '待用';
        case 'used': return '已用';
        case 'expired': return '已过期';
        case 'revoked': return '已作废';
        default: return state.length > 0 ? `状态未知（${state}）` : '状态未知';
    }
}
function isActionable(state) {
    return state === 'pending';
}
function remainingText(expiresAt, nowMs) {
    const t = Date.parse(expiresAt);
    if (!Number.isFinite(t))
        return '有效期读不出来';
    const ms = t - nowMs;
    if (ms <= 0)
        return '已过期';
    const min = Math.floor(ms / 60000);
    if (min < 60)
        return `还剩 ${Math.max(1, min)} 分钟`;
    const hour = Math.floor(min / 60);
    if (hour < 24)
        return `还剩 ${hour} 小时 ${min % 60} 分`;
    const day = Math.floor(hour / 24);
    return `还剩 ${day} 天 ${hour % 24} 小时`;
}
function codeTextOf(hash, plain) {
    const p = (plain ?? '').trim();
    if (p.length > 0)
        return p;
    return hash.length > 0 ? '已生成 · 明文未保存在本机' : '（缺 codeHash）';
}
function usedByText(row) {
    if (row.state !== 'used')
        return '';
    const who = (row.usedBy ?? '').trim();
    return who.length > 0 ? `被 ${who} 用掉` : '已用（服务端没记是谁）';
}
function pendingCount(rows) {
    let n = 0;
    for (const r of rows)
        if (r.state === 'pending')
            n += 1;
    return n;
}
function canCreateMore(pending) {
    return pending < exports.PENDING_LIMIT;
}
function createBlockedTip(pending) {
    return canCreateMore(pending) ? '' : `先作废不用的，或等它们过期（现在手上 ${pending} 张没用过）`;
}
function batchChoices(pending) {
    const room = Math.max(1, exports.PENDING_LIMIT - pending);
    const top = Math.min(exports.PENDING_LIMIT, room);
    const out = [];
    for (let i = 1; i <= top; i += 1)
        out.push(i);
    return out;
}
function staleHashes(rows, hasPlain, nowMs) {
    const out = [];
    for (const r of rows) {
        const h = (r.codeHash ?? '').trim();
        if (h.length === 0 || !hasPlain(h))
            continue;
        const expiredByTime = r.state === 'pending' && Date.parse(r.expiresAt) <= nowMs;
        if (r.state === 'used' || r.state === 'revoked' || r.state === 'expired' || expiredByTime) {
            out.push(h);
        }
    }
    return out;
}
function humanizeCodeError(code, message, pending) {
    switch (code) {
        case 'too_many_pending_codes':
            return typeof pending === 'number' && pending > 0
                ? `手上还有 ${pending} 张没用过的码，先作废不用的`
                : '手上没用过的码已经满了，先作废不用的';
        case 'code_not_revocable':
            return '这张码已经用过或过期了，作废不了';
        case 'code_not_renewable':
            return '这张码已经用过或作废了，续不了期';
        case 'code_not_found':
            return '找不到这张码（可能刚被清理），刷新一下再看';
        case 'owner_only':
        case 'not_owner':
            return '只有铺主能管理邀请码';
        case 'unauthorized':
        case 'login_required':
            return '这台机器还没进本铺，先用加入码进来';
        default: {
            const m = (message ?? '').trim();
            return m.length > 0 ? m : '操作没成功，稍后再试一次';
        }
    }
}
function codeRowView(row, plain, nowMs) {
    const p = (plain ?? '').trim();
    return {
        codeText: codeTextOf(row.codeHash, p),
        stateText: stateLabel(row.state),
        remainText: isActionable(row.state) ? remainingText(row.expiresAt, nowMs) : '',
        actionable: isActionable(row.state),
        usedByText: usedByText(row),
        plainLocal: p.length > 0,
    };
}
function emptyListText(owner) {
    return owner ? '还没有生成过加入码 —— 点上面「生成」给新同事发一张' : '';
}
//# sourceMappingURL=invite-code.js.map