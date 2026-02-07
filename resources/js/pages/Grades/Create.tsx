import { Head } from '@inertiajs/react';
import GradeForm from '@/components/GradeForm';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
    return (
        <AppLayout>
            <Head title="New Grade" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <GradeForm action="/grades" method="post" />
            </div>
        </AppLayout>
    );
}
