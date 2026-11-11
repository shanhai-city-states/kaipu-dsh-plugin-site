import { type ConnectionHandle } from './bridge.js';
export interface WorkshopEvent {
    seq: number;
    type: string;
    ts: number;
    actor: string;
    seat: string;
    payload: unknown;
}
export interface EventsHead {
    running: boolean;
    error: string | null;
    lastSeq: number;
    lastBeatAt: number;
    lagged: boolean;
}
export interface EventsPoll extends EventsHead {
    events: WorkshopEvent[];
    next: number;
}
export type TintLevel = 'strong' | 'weak' | 'silent';
export declare function levelOf(type: string): TintLevel;
export declare const POLL_STRONG_MS = 3000;
export declare const POLL_WEAK_MS = 10000;
export declare const POLL_SILENT_MS = 15000;
export declare const POLL_HIDDEN_MS = 30000;
export declare const POLL_OFFLINE_MS = 30000;
export declare const PUMP_REVIVE_AFTER = 2;
export declare const PUMP_REVIVE_MAX = 5;
export declare const PUMP_EXHAUSTED_TEXT = "\u5B9E\u65F6\u8FDE\u63A5\u65E0\u6CD5\u81EA\u52A8\u6062\u590D\uFF0C\u8BF7\u91CD\u5F00\u9762\u677F\u3002";
export declare const SSE_WATCHDOG_MS = 35000;
export declare const SSE_IDLE_TIMEOUT_MS = 35000;
export declare function pollIntervalFor(strongest: TintLevel, visible: boolean): number;
export declare class LatestOnly {
    private applied;
    next(): number;
    private seq;
    accept(seq: number): boolean;
    get current(): number;
}
export interface EventStreamState {
    running: boolean;
    staleMs: number;
    error: string | null;
    lagged: boolean;
    strongest: TintLevel;
}
export interface EventStreamHandlers {
    onStrong?: (ev: WorkshopEvent) => void;
    onWeak?: (ev: WorkshopEvent) => void;
    onState?: (st: EventStreamState) => void;
    onLagged?: () => void;
}
export interface EventStreamHandle {
    kick: () => Promise<void>;
    dispose: () => void;
}
export declare function openEventStream(conn: ConnectionHandle, handlers: EventStreamHandlers): EventStreamHandle;
export declare function onVisibilityChange(cb: (visible: boolean) => void): () => void;
export declare function subscribeEvents(handlers: EventStreamHandlers): EventStreamHandle | null;
//# sourceMappingURL=events.d.ts.map