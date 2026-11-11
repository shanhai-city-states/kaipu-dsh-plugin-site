import { type ReactElement } from 'react';
export declare function TaskDepsSection({ taskId, allTasks, run, }: {
    taskId: string;
    allTasks: Array<{
        task_id: string;
        title: string;
        status: string;
    }>;
    run: (fn: () => Promise<{
        ok: boolean;
        code?: string;
        message?: string;
    }>, okMsg?: string) => Promise<void>;
}): ReactElement;
export declare function DeliverableVersionsSection({ taskId, run, }: {
    taskId: string;
    run: (fn: () => Promise<{
        ok: boolean;
        code?: string;
        message?: string;
    }>, okMsg?: string) => Promise<void>;
}): ReactElement;
//# sourceMappingURL=task-deps-ui.d.ts.map