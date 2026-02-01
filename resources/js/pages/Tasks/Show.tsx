import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Staffmember {
    id: number;
    name: string;
}

interface Props {
    task: Staffmember;
}

export default function Show({ task }: Props) {
    return (
        <AppLayout>
            <Head title="Staff" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>{task.name}</div>
                <div className="my-3">
                    <a
                        href={`/tasks/${task.id}/edit`}
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Edit
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}
