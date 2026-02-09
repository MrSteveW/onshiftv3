import { Head } from '@inertiajs/react';
import UserForm from '@/components/UserForm';
import AppLayout from '@/layouts/app-layout';
import type { GradeType } from '@/types';

type CreateProps = {
    roles: string[];
    grades: GradeType[];
};

export default function Create({ roles, grades }: CreateProps) {
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <UserForm
                    roles={roles}
                    grades={grades}
                    action="/users"
                    method="post"
                />
            </div>
        </AppLayout>
    );
}
