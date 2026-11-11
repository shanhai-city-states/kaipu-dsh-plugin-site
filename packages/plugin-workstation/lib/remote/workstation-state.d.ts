import type { Invite, Member, Seat, WorkstationState } from '@shanhai/kaipu-contract';
export declare function summarizeSeats(state: WorkstationState): {
    occupied: number;
    vacant: number;
    awayButActive: number;
    removed: number;
};
export declare function seatText(seat: Seat): string;
export declare function inviteExpired(invite: Invite, now: string): boolean;
export declare function splitMembers(state: WorkstationState): {
    humans: Member[];
    agents: Member[];
};
export interface ConsistencyIssue {
    code: string;
    detail: string;
}
export declare function assertSeatMemberConsistency(state: WorkstationState): {
    ok: boolean;
    issues: ConsistencyIssue[];
};
export declare function checkedWorkstationState(projectId?: string): WorkstationState;
export declare function scaffoldState(projectId?: string): WorkstationState;
//# sourceMappingURL=workstation-state.d.ts.map