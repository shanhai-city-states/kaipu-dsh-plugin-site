export function summarizeSeats(state) {
    let occupied = 0;
    let vacant = 0;
    let awayButActive = 0;
    let removed = 0;
    for (const s of state.seats) {
        if (!s.membershipActive) {
            removed++;
            continue;
        }
        if (s.status === 'vacant') {
            vacant++;
            continue;
        }
        occupied++;
        if (s.presence === 'away')
            awayButActive++;
    }
    return { occupied, vacant, awayButActive, removed };
}
export function seatText(seat) {
    if (seat.status === 'vacant')
        return '空位 · 可邀请';
    return seat.presence === 'away' ? '离座 · 留痕在' : '在场';
}
export function inviteExpired(invite, now) {
    if (invite.used)
        return false;
    return new Date(invite.expiresAt).getTime() <= new Date(now).getTime();
}
export function splitMembers(state) {
    const humans = [];
    const agents = [];
    for (const m of state.members) {
        if (m.kind === 'agent')
            agents.push(m);
        else
            humans.push(m);
    }
    return { humans, agents };
}
export function assertSeatMemberConsistency(state) {
    const issues = [];
    const membersById = new Map(state.members.map((m) => [m.id, m]));
    for (const s of state.seats) {
        if (s.status === 'vacant' && s.presence !== null) {
            issues.push({ code: 'vacant_with_presence', detail: `座位 ${s.id} 是空位，却带 presence=${String(s.presence)}` });
        }
        if (s.status === 'occupied' && s.presence === null) {
            issues.push({ code: 'occupied_without_presence', detail: `座位 ${s.id} 已占用，却没有在场态` });
        }
        if (s.status === 'occupied' && !s.membershipActive) {
            issues.push({ code: 'occupied_but_removed', detail: `座位 ${s.id} 既占用又已移除（移除必须释放座位）` });
        }
        if (!s.membershipActive && s.status !== 'vacant') {
            issues.push({ code: 'removed_not_released', detail: `座位 ${s.id} 已移除但 status=${s.status}（移除=释放回空位池）` });
        }
        if (s.status === 'occupied') {
            if (s.holderId === undefined) {
                issues.push({ code: 'occupied_without_holder', detail: `座位 ${s.id} 已占用，但没有 holderId` });
                continue;
            }
            const m = membersById.get(s.holderId);
            if (m === undefined) {
                issues.push({ code: 'holder_missing', detail: `座位 ${s.id} 的 holderId=${s.holderId} 不在 members 里` });
                continue;
            }
            if (m.presence !== s.presence) {
                issues.push({
                    code: 'presence_drift',
                    detail: `座位 ${s.id} presence=${String(s.presence)}，成员 ${m.id} 快照=${m.presence}（以座位为准）`,
                });
            }
            if (m.membershipActive !== s.membershipActive) {
                issues.push({
                    code: 'membership_drift',
                    detail: `座位 ${s.id} membershipActive=${String(s.membershipActive)}，成员 ${m.id} 快照=${String(m.membershipActive)}（以座位为准）`,
                });
            }
            if (m.seatId !== undefined && m.seatId !== s.id) {
                issues.push({ code: 'seat_pointer_drift', detail: `成员 ${m.id} 的 seatId=${m.seatId}，但持有座位 ${s.id}` });
            }
        }
    }
    for (const m of state.members) {
        if (m.seatId === undefined)
            continue;
        if (!state.seats.some((s) => s.id === m.seatId)) {
            issues.push({ code: 'member_seat_missing', detail: `成员 ${m.id} 的 seatId=${m.seatId} 不存在` });
        }
    }
    return { ok: issues.length === 0, issues };
}
export function checkedWorkstationState(projectId) {
    const state = scaffoldState(projectId);
    const check = assertSeatMemberConsistency(state);
    if (!check.ok) {
        throw new Error(`工位状态不自洽（${check.issues.length} 处）：${check.issues.map((i) => `${i.code} — ${i.detail}`).join('；')}`);
    }
    return state;
}
export function scaffoldState(projectId = 'proj_083c_demo') {
    const members = [
        { id: 'm_kai', name: '发起人', kind: 'human', seatId: 's1', presence: 'present', membershipActive: true },
        { id: 'm_zhou', name: '协作方甲', kind: 'human', seatId: 's2', presence: 'present', membershipActive: true },
        { id: 'm_yue', name: '协作方乙', kind: 'human', seatId: 's3', presence: 'present', membershipActive: true },
        { id: 'm_gu', name: '协作方丙', kind: 'human', seatId: 's4', presence: 'away', membershipActive: true },
    ];
    const invite = {
        id: 'inv_demo_a',
        seatId: 's5',
        toName: '新协作方',
        toKind: 'human',
        issuedAt: '2026-10-09T22:00:00+08:00',
        expiresAt: '2026-10-10T12:00:00+08:00',
        used: false,
    };
    const seats = [
        { id: 's1', label: '发起人位', status: 'occupied', holderId: 'm_kai', presence: 'present', membershipActive: true },
        { id: 's2', label: '协作方甲位', status: 'occupied', holderId: 'm_zhou', presence: 'present', membershipActive: true },
        { id: 's3', label: '协作方乙位', status: 'occupied', holderId: 'm_yue', presence: 'present', membershipActive: true },
        { id: 's4', label: '协作方丙位', status: 'occupied', holderId: 'm_gu', presence: 'away', membershipActive: true },
        { id: 's5', label: '空位', status: 'vacant', presence: null, membershipActive: true, invite },
    ];
    return {
        projectId,
        name: '山海·开铺 · 工位（演示）',
        accountId: 'acct_shanhai',
        source: 'scaffold',
        members,
        seats,
        balls: [
            { id: 'b1', label: '需求定案', lamp: 'red', holderSeatId: 's1', roundId: 'r3' },
            { id: 'b2', label: '契约对齐', lamp: 'green', holderSeatId: 's2' },
            { id: 'b3', label: '发布面', lamp: 'amber', holderSeatId: 's3' },
        ],
        rounds: [
            { id: 'r0', index: 0, title: '立项 · 工位插件骨架', at: '2026-10-09T20:15:00+08:00', byName: '发起人', what: '复核结论，门牌号 shanhai-kaipu-workstation / order 40 定' },
            { id: 'r1', index: 1, title: '面板注册约定对齐', at: '2026-10-09T20:43:00+08:00', byName: '协作方乙', what: 'panelId 同族 / order 礼仪 / slot 成对 + label 是函数 / package.json 形制' },
            { id: 'r2', index: 2, title: '期0 双灯审毕', at: '2026-10-09T21:37:00+08:00', byName: '协作方乙', what: '四条地基独立复现全成立，可进期1' },
            { id: 'r3', index: 3, title: 'v0.4-A/B 确认 · 开期1', at: '2026-10-09T23:00:00+08:00', byName: '发起人', what: '布局字段拍板，渲染持久化态；设计纪律四点已吸收' },
        ],
        traces: [
            {
                id: 't1', kind: 'seat', actorId: 'm_gu', actorName: '协作方丙', actorKind: 'human',
                at: '2026-10-09T22:30:00+08:00', from: 'desktop', isCollaborator: true,
                summary: '离座（presence=away），留痕在，座位仍占用——离座≠移除',
            },
            {
                id: 't2', kind: 'ball', actorId: 'm_zhou', actorName: '协作方甲', actorKind: 'human',
                at: '2026-10-09T22:40:00+08:00', from: 'desktop', isCollaborator: true,
                summary: '持球「契约对齐」(green) 落座 s2',
            },
            {
                id: 't3', kind: 'round', actorId: 'm_kai', actorName: '发起人', actorKind: 'human',
                at: '2026-10-09T23:00:00+08:00', from: 'desktop', isCollaborator: true,
                summary: '开期1：状态面板+座位+轮次 B3+留痕+事件流底座（渲染持久化态）',
            },
            {
                id: 't4', kind: 'formal', actorId: 'm_zhou', actorName: '协作方甲', actorKind: 'human',
                at: '2026-10-09T23:05:00+08:00', from: 'desktop', isCollaborator: true,
                summary: '拟正式件 → 邮件草稿（发送/正本归邮件，工位不直发）',
            },
        ],
        async: {
            dualTrack: true,
            notifyChannel: 'email',
            notifyFailOpen: true,
            notifyCostNote: '外发叫醒失败不影响 events 落库；代价=人类协作方需回座拉 events?since= 才补阅（不实时推送）',
            eventsSinceEndpoint: 'GET /projects/{id}/events?since=',
        },
        channels: {
            live: {
                visible: 'present_only',
                note: '🔴 实时通道：不在座位收不到实时消息/流（承设计纪律）',
            },
            history: {
                replayable: true,
                endpoint: 'GET /projects/{id}/events?since=',
            },
        },
    };
}
//# sourceMappingURL=workstation-state.js.map