import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stafftesty',
        href: dashboard().url,
    },
];

export default function StaffTesty() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="StaffTesty" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    HI THERE STEVE
                </div>
            </div>
        </AppLayout>
    );
}
