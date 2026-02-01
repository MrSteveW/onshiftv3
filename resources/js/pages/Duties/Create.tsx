import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import AssigningOneDuty from '@/components/AssigningOneDuty';
import AppLayout from '@/layouts/app-layout';
import type { CreateDutyProps } from 'types';

import 'react-date-picker/dist/DatePicker.css';

export default function Create({ users, tasks }: CreateDutyProps) {
    const [date, setDate] = useState<Date>(new Date());

    const formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0];
    };
    const formattedDate = formatDate(date);
    return (
        <AppLayout>
            <Head title="Duties" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DatePicker onChange={setDate} value={date} />
                <AssigningOneDuty
                    date={formattedDate}
                    users={users}
                    tasks={tasks}
                />
                {/* {duties && <AssigningDuties initialDuties={duties} />} */}
            </div>
        </AppLayout>
    );
}
