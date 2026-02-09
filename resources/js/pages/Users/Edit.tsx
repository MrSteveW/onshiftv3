import { Head } from '@inertiajs/react';
import DeleteAction from '@/components/DeleteAction';
import UserForm from '@/components/UserForm';
import AppLayout from '@/layouts/app-layout';
import type { UserType, GradePropsType } from '@/types';

interface Props {
    user: UserType;
    roles: string[];
    grades: GradePropsType[];
}

export default function Edit({ user, roles, grades }: Props) {
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <UserForm
                    roles={roles}
                    grades={grades}
                    action={`/users/${user.id}`}
                    method="patch"
                    initialData={user}
                />

                <div className="rounded-lg bg-red-300 p-2">
                    <div className="my-2">Danger zone</div>
                    <DeleteAction url={`/users/${user.id}`} name={user.name} />
                </div>
            </div>
        </AppLayout>
    );
}
