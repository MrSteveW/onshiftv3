import { Head } from '@inertiajs/react';
import TaskForm from '@/components/TaskForm';
import AppLayout from '@/layouts/app-layout';
import type { Task } from '@/types';

interface EditProps {
    task: Task;
}

export default function Edit({ task }: EditProps) {
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <TaskForm
                    action={`/task/${task.id}`}
                    method="patch"
                    initialData={task}
                />
            </div>
        </AppLayout>
    );
}
