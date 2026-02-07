import { Head } from '@inertiajs/react';
import UserForm from '@/components/user/UserForm';
import AppLayout from '@/layouts/app-layout';
import type { UserType, GradePropsType } from '@/types';

interface Props {
    user: UserType;
    roles: string[];
    grades: GradePropsType;
}

export default function Edit({ user, roles, grades }: Props) {
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>{JSON.stringify(user)}</div>
                <UserForm
                    roles={roles}
                    grades={grades}
                    action={`/users/${user.id}`}
                    method="patch"
                    initialData={user}
                />
            </div>
        </AppLayout>
    );
}
