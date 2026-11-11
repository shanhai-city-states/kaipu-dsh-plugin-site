import { type ConnectionHandle } from './bridge.js';
export interface Note {
    note_id: string;
    title: string;
    detail: string;
    dueAt: string;
    remindAt: string;
    priority: 'high' | 'normal' | 'low' | string;
    status: 'open' | 'done' | string;
    tags: string;
    created_at: string;
    updated_at: string;
    done_at: string;
}
export interface NoteStats {
    open: number;
    done: number;
    overdue: number;
    today: number;
}
export interface NotesHealth {
    ok: boolean;
    module: string;
    version: string;
    ready: boolean;
    encrypted: boolean;
    storage: 'cloud' | 'local-only' | string;
    storePath: string;
}
export declare function setNotesConnection(conn: ConnectionHandle | null): void;
export declare function notesHealth(): Promise<NotesHealth>;
export declare function notesStats(): Promise<NoteStats>;
export declare function notesList(query: {
    status?: string;
    priority?: string;
    q?: string;
    dueBefore?: string;
    limit?: number;
}): Promise<{
    items: Note[];
    total: number;
}>;
export declare function noteCreate(body: {
    title: string;
    detail?: string;
    dueAt?: string;
    remindAt?: string;
    priority?: string;
    tags?: string[];
}): Promise<Note>;
export declare function noteUpdate(nid: string, body: Record<string, unknown>): Promise<Note>;
export declare function noteToggle(nid: string): Promise<Note>;
export declare function noteDelete(nid: string): Promise<boolean>;
export declare function humanDue(dueAt: string, today: string): {
    text: string;
    tone: 'overdue' | 'today' | 'soon' | 'later' | 'none';
};
export declare function dayGap(a: string, b: string): number;
export declare function todayStr(d?: Date): string;
export declare function parseTags(tags: string): string[];
export declare const PRIORITY_LABEL: Record<string, string>;
export declare const PRIORITY_COLOR: Record<string, string>;
//# sourceMappingURL=notes.d.ts.map