export interface SeatLike {
    seat?: string;
    label?: string;
    occupants?: Array<{
        name?: string;
    }> | undefined;
    full?: boolean | undefined;
}
export interface SeatTypeCount {
    key: string;
    label: string;
    total: number;
    occupied: number;
    occupantsTotal: number;
    vacant: number;
    holders: string[];
}
export declare const SEAT_LABELS: Readonly<Record<string, string>>;
export declare function isAdvisorSeat(seatKey: string | undefined, name: string | undefined): boolean;
export declare const SEAT_ORDER: ReadonlyArray<string>;
export declare function countSeatTypes(seats: ReadonlyArray<SeatLike>): SeatTypeCount[];
export declare function resolveSeatKey(s: SeatLike): string;
export declare function seatSummary(counts: ReadonlyArray<SeatTypeCount>): string;
export declare function seatBadge(c: SeatTypeCount): string;
//# sourceMappingURL=seat-summary.d.ts.map