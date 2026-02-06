import { Head } from '@inertiajs/react';
import UserForm from '@/components/user/UserForm';
import AppLayout from '@/layouts/app-layout';
import type { User } from '@/types';

interface Props {
    user: User;
    roles: string[];
}

export default function Edit({ user, roles }: Props) {
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <UserForm
                    roles={roles}
                    action={`/users/${user.id}`}
                    method="patch"
                    initialData={user}
                />
            </div>
        </AppLayout>
    );
}
