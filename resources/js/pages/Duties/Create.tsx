import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import AssigningDuties from '@/components/AssigningDuties';
import AppLayout from '@/layouts/app-layout';
import type { User, Task } from '@/types';

import 'react-date-picker/dist/DatePicker.css';

interface CreateDutyProps {
    users?: User[];
    tasks?: Task[];
}

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
                <div className="">
                    <DatePicker onChange={setDate} value={date} />
                </div>

                <AssigningDuties
                    date={formattedDate}
                    users={users}
                    tasks={tasks}
                />
                {/* {duties && <AssigningDuties initialDuties={duties} />} */}
            </div>
        </AppLayout>
    );
}
