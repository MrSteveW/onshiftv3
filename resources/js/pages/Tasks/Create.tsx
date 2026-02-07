import { Head } from '@inertiajs/react';
import TaskForm from '@/components/TaskForm';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Tasks" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <TaskForm action="/tasks" method="post" />
            </div>
        </AppLayout>
    );
}
