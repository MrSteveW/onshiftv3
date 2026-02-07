import { Head } from '@inertiajs/react';
import GradeForm from '@/components/GradeForm';
import AppLayout from '@/layouts/app-layout';
import type { Grade } from '@/types';

interface EditProps {
    grade: Grade;
}

export default function Edit({ grade }: EditProps) {
    return (
        <AppLayout>
            <Head title="Grade edit" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <GradeForm
                    action={`/grades/${grade.id}`}
                    method="patch"
                    initialData={grade}
                />
            </div>
        </AppLayout>
    );
}
