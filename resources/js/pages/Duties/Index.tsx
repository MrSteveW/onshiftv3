import type { EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Head } from '@inertiajs/react';
import DutyIndexCard from '@/components/DutyIndexCard';
import AppLayout from '@/layouts/app-layout';
import { jsonFetch } from '@/lib/api';

interface DutiesType {
    duties?: EventsDataType[] | null;
}

export default function Index() {
    return (
        <AppLayout>
            <Head title="Duties" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    dayHeaderFormat={{ weekday: 'long' }}
                    initialView="dayGridWeek"
                    weekNumberCalculation={'ISO'}
                    events={(duties) =>
                        jsonFetch(
                            `/duties?start=${duties.startStr}&end=${duties.endStr}`,
                        )
                    }
                    eventContent={(arg: EventContentArg) => (
                        <DutyIndexCard
                            dutyInfo={arg}
                            // handleEventSelect={handleEventSelect}
                        />
                    )}
                />
            </div>
        </AppLayout>
    );
}
