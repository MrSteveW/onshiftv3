import { Head } from '@inertiajs/react';
import DeleteAction from '@/components/DeleteAction';
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
                <div className="rounded-lg bg-red-300 p-2">
                    <div className="my-2">Danger zone</div>
                    <DeleteAction
                        url={`/grades/${grade.id}`}
                        name={grade.name}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
