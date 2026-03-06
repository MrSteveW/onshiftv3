import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import ShiftPatternForm from '@/components/ShiftPatternForm';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
}

type CreateProps = {
    users: User[];
    totalDays: number;
};

export default function Create({ users, totalDays }: CreateProps) {
    const { post, processing, errors } = useForm({ shiftArray: [] });

    return (
        <AppLayout>
            <Head title="Shift Patterns" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <ShiftPatternForm
                    users={users}
                    totalDays={totalDays}
                    onSubmit={(shiftArray) =>
                        post(
                            route('shift-pattern.store', {
                                data: { shiftArray },
                            }),
                        )
                    }
                    errors={errors}
                />
            </div>
        </AppLayout>
    );
}
