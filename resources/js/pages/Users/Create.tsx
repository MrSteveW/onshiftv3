import { Head } from '@inertiajs/react';
import UserForm from '@/components/user/UserForm';
import AppLayout from '@/layouts/app-layout';

type CreateProps = {
    roles: string[];
};

export default function Create({ roles }: CreateProps) {
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <UserForm roles={roles} action="/users" method="post" />
            </div>
        </AppLayout>
    );
}
