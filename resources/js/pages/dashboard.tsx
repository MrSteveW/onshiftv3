import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>Well done</div>
            </div>
        </AppLayout>
    );
}
