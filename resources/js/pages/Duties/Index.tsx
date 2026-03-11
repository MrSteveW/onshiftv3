import type { EventContentArg, EventSourceFuncArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DutyEditDialog from '@/components/DutyEditDialog';
import DutyIndexCard from '@/components/DutyIndexCard';
import AppLayout from '@/layouts/app-layout';
import { jsonFetch } from '@/lib/api';
import { mapToDutyEvent } from '@/lib/mapToDutyEvent';
import type { DutyEvent } from '@/types.ts';

export default function Index() {
    const [selectedEvent, setSelectedEvent] = useState<DutyEvent | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    function handleEventSelect(dutyEvent: DutyEvent) {
        setSelectedEvent(dutyEvent);
        setIsDialogOpen(true);
    }

    return (
        <AppLayout>
            <Head title="Duties" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    dayHeaderFormat={{ weekday: 'long' }}
                    initialView="dayGridWeek"
                    weekNumberCalculation={'ISO'}
                    events={async (fetchInfo: EventSourceFuncArg) => {
                        const duties: DutyEvent[] = await jsonFetch(
                            `/duties?start=${fetchInfo.startStr}&end=${fetchInfo.endStr}`,
                        );
                        return duties;
                    }}
                    eventContent={(arg: EventContentArg) => (
                        <DutyIndexCard
                            dutyEvent={mapToDutyEvent(arg)}
                            handleEventSelect={handleEventSelect}
                        />
                    )}
                />
                {selectedEvent && (
                    <DutyEditDialog
                        dutyEvent={selectedEvent}
                        isDialogOpen={isDialogOpen}
                        onClose={setIsDialogOpen}
                    />
                )}
            </div>
        </AppLayout>
    );
}
