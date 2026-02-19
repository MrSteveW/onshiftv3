import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import AssigningDuties from '@/components/AssigningDuties';
import AppLayout from '@/layouts/app-layout';
import type { AssignableUser, Task } from '@/types';

import 'react-date-picker/dist/DatePicker.css';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CreateDutyProps {
    users?: AssignableUser[];
    tasks?: Task[];
}

export default function Create({ users, tasks }: CreateDutyProps) {
    const [date, setDate] = useState<Value>(new Date());

    const handleDateChange = (value: Value) => {
        setDate(value);
    };

    const formatDate = (val: Value): string => {
        if (val instanceof Date) {
            return val.toISOString().split('T')[0];
        }
        return new Date().toISOString().split('T')[0];
    };

    const formattedDate = formatDate(date);

    return (
        <AppLayout>
            <Head title="Duties" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="">
                    <DatePicker
                        onChange={handleDateChange}
                        value={date}
                        clearIcon={null}
                    />
                </div>

                <AssigningDuties
                    date={formattedDate}
                    users={users}
                    tasks={tasks}
                />
            </div>
        </AppLayout>
    );
}
