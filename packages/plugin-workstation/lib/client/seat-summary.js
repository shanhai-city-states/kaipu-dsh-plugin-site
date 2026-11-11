"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEAT_ORDER = exports.SEAT_LABELS = void 0;
exports.isAdvisorSeat = isAdvisorSeat;
exports.countSeatTypes = countSeatTypes;
exports.resolveSeatKey = resolveSeatKey;
exports.seatSummary = seatSummary;
exports.seatBadge = seatBadge;
exports.SEAT_LABELS = {
    execution: '执行位',
    audit: '审计位',
    management: '管理位',
    strategy: '战略位',
    signature: '山海顾问位',
    management_assistant: '管理助理位',
};
const ADVISOR_SEAT_NAMES = [
    '山海顾问位',
    '签名位',
];
function isAdvisorSeat(seatKey, name) {
    const key = (seatKey ?? '').trim();
    if (key !== '')
        return key === 'signature';
    const n = (name ?? '').trim();
    if (n === '')
        return false;
    if (ADVISOR_SEAT_NAMES.some((x) => n === x || n.includes(x)))
        return true;
    return n.includes('签名');
}
exports.SEAT_ORDER = [
    'signature',
    'strategy',
    'management',
    'audit',
    'execution',
];
function countSeatTypes(seats) {
    const map = new Map();
    for (const s of seats) {
        const key = resolveSeatKey(s);
        const cur = map.get(key) ?? {
            key,
            label: exports.SEAT_LABELS[key] ?? (typeof s.label === 'string' && s.label.trim().length > 0 ? s.label.trim() : key),
            total: 0,
            occupied: 0,
            occupantsTotal: 0,
            vacant: 0,
            holders: [],
        };
        cur.total += 1;
        const names = holderNames(s);
        if (names.length > 0) {
            cur.occupied += 1;
            cur.occupantsTotal += names.length;
            for (const n of names)
                if (!cur.holders.includes(n))
                    cur.holders.push(n);
        }
        else {
            cur.vacant += 1;
        }
        map.set(key, cur);
    }
    const out = Array.from(map.values());
    out.sort((a, b) => {
        const ia = exports.SEAT_ORDER.indexOf(a.key);
        const ib = exports.SEAT_ORDER.indexOf(b.key);
        return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
    });
    return out;
}
function holderNames(s) {
    const names = [];
    if (Array.isArray(s.occupants)) {
        for (const o of s.occupants) {
            const n = typeof o?.name === 'string' ? o.name.trim() : '';
            if (n.length > 0 && !names.includes(n))
                names.push(n);
        }
    }
    return names;
}
function resolveSeatKey(s) {
    const raw = typeof s.seat === 'string' ? s.seat.trim().toLowerCase() : '';
    if (raw.length > 0 && exports.SEAT_LABELS[raw] !== undefined)
        return raw;
    if (raw.length > 0)
        return raw;
    const label = typeof s.label === 'string' ? s.label : '';
    for (const k of Object.keys(exports.SEAT_LABELS)) {
        const name = exports.SEAT_LABELS[k];
        if (name !== undefined && label.includes(name))
            return k;
    }
    if (label.includes('签名'))
        return 'signature';
    return 'unknown';
}
function seatSummary(counts) {
    const total = counts.reduce((n, c) => n + c.total, 0);
    const people = counts.reduce((n, c) => (c.key === 'signature' ? n : n + c.occupantsTotal), 0);
    const vac = counts.reduce((n, c) => (c.key === 'signature' ? n : n + c.vacant), 0);
    if (total === 0)
        return '还没有建工位';
    return `${total} 个位 · ${people} 人已坐 · ${vac} 个空`;
}
function seatBadge(c) {
    if (c.key === 'signature')
        return `${c.label} （已占）`;
    if (c.occupantsTotal === 0)
        return `${c.label} 空`;
    return `${c.label} ${c.occupantsTotal} 人`;
}
//# sourceMappingURL=seat-summary.js.map