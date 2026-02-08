import { Head } from '@inertiajs/react';
import DeleteAction from '@/components/DeleteAction';
import TaskForm from '@/components/TaskForm';
import AppLayout from '@/layouts/app-layout';
import type { Task } from '@/types';

interface EditProps {
    task: Task;
}

export default function Edit({ task }: EditProps) {
    return (
        <AppLayout>
            <Head title="Task edit" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <TaskForm
                    action={`/tasks/${task.id}`}
                    method="patch"
                    initialData={task}
                />
                <div className="rounded-lg bg-red-300 p-2">
                    <div className="my-2">Danger zone</div>
                    <DeleteAction url={`/tasks/${task.id}`} name={task.name} />
                </div>
            </div>
        </AppLayout>
    );
}
