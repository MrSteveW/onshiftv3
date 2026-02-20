import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface ShiftPattern {
    id: number;
    user: string;
    status: string;
    start_time: string;
    end_time: string;
}

interface Day {
    number: number;
    name: string;
}

interface Props {
    shiftpatterns: ShiftPattern[];
    days: Day[];
}

export default function Index({ shiftpatterns, days }: Props) {
    return (
        <AppLayout>
            <Head title="Tasks" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>See all shift patterns</div>
                <div>{JSON.stringify(shiftpatterns)}</div>
                <div className="relative h-[calc(100vh-160px)] w-1/2 overflow-y-auto">
                    <div className="sticky top-0 z-10 grid grid-cols-[1fr_1fr_1fr] border-b bg-amber-200 pb-2 font-bold">
                        <div>Day number</div>
                        <div>Day name</div>
                        <div>Adam</div>
                    </div>
                    {days.map((day) => (
                        <div
                            key={day.number}
                            className="grid grid-cols-[1fr_1fr_1fr] bg-green-300"
                        >
                            <div>{day.number}</div>
                            <div>{day.name}</div>
                        </div>
                    ))}

                    {shiftpatterns.map((shiftpattern) => (
                        <div
                            key={shiftpattern.id}
                            className="items-center py-1.5 transition-colors hover:bg-slate-100"
                        >
                            <div className="text-lg">
                                {shiftpattern.user_name}
                            </div>
                            <div className="text-lg">
                                {shiftpattern.day_number}
                            </div>
                            <div className="text-lg">
                                {shiftpattern.day_name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
