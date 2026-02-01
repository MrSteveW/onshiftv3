import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import AppLayout from '@/layouts/app-layout';
import { TaskSlot } from '@/components/TaskSlot';

interface Staffmember {
    id: number;
    name: string;
    role: string;
    date_started: string;
    date_ended?: string | null;
    deleted_at?: string | null;
}

interface Task {
    id: number;
    name: string;
    deleted_at?: string | null;
}

interface Duty {
    id: number;
    staffmember_id: number;
    task_id: number;
    dutydate: string;
    shift_type?: string | null;
    hours?: number | null;
    staffmember: Staffmember;
    task: Task;
}

interface Props {
    tasks: Task[];
    duties?: Duty[];
    selectedDate?: string | null;
    errors?: Record<string, string>;
}

export default function Index({
    tasks,
    duties = [],
    selectedDate,
    errors,
}: Props) {
    const [date, setDate] = useState<Date | null>(
        selectedDate ? new Date(selectedDate) : null,
    );
    const [selectedDuties, setSelectedDuties] = useState<Duty[]>(duties);

    useEffect(() => {
        setSelectedDuties(duties);
    }, [duties]);

    const formatDateForQuery = (date: Date): string => {
        return date.toISOString().split('T')[0];
    };

    // Handle date picker change - immediately trigger Laravel request
    const handleDateChange = (newDate: Date | null) => {
        setDate(newDate);

        if (newDate) {
            const formattedDate = formatDateForQuery(newDate);

            // Clear duties immediately
            setSelectedDuties([]);

            // Trigger partial reload with query parameter
            router.get(
                '/duties',
                { date: formattedDate },
                {
                    only: ['duties', 'selectedDate', 'errors'],
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        } else {
            // If date is cleared, show empty state
            setSelectedDuties([]);
            router.get(
                '/duties',
                {},
                {
                    only: ['duties', 'selectedDate', 'errors'],
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }
    };

    return (
        <AppLayout>
            <Head title="Duties" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DatePicker onChange={handleDateChange} value={date} />

                {/* Error handling */}
                {errors?.date && (
                    <div className="mt-2 text-red-500">
                        Error: {errors.date}
                    </div>
                )}

                <div>
                    {/* <h1>Listing duties {selectedDate ? `for ${selectedDate}` : ''}:</h1>

                {selectedDuties.map((duty: Duty) => (
                    <div key={duty.id} className="flex flex-row p-2 text-start">
                        <div className="px-2">{duty.dutydate} </div>
                        <div className="px-2">
                            {duty.staffmember.name} ({duty.staffmember.role}){' '}
                        </div>
                        <div>{duty.task.name}</div>
                    </div>
                ))} */}
                </div>
                <div>
                    {tasks.map((task) => {
                        // Find duties assigned to this specific task on selected date
                        const assignedDuties = duties.filter(
                            (duty) => duty.task_id === task.id,
                        );

                        return (
                            <TaskSlot
                                key={task.id}
                                task={task}
                                duties={assignedDuties} // Could be empty array if no assignments
                            />
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
