import type { EventApi, EventContentArg } from '@fullcalendar/core';

interface IndexCardProps {
    dutyInfo: EventContentArg;
    // handleEventSelect: (event: EventApi) => void;
}

export default function DutyIndexCard({ dutyInfo }: IndexCardProps) {
    return (
        <div className="m-2 w-full border">
            {/* <div className="text-xs">{JSON.stringify(dutyInfo)}</div> */}
            <div className="flex">
                <div className="">{dutyInfo.event.title}</div>
                <div className="">{dutyInfo.event.extendedProps.grade}</div>
            </div>
            <div className="flex">
                <div>
                    <div>{dutyInfo?.event?.extendedProps.start_time}</div>
                </div>
                <div>:</div>
                <div>{dutyInfo?.event?.extendedProps.end_time}</div>
            </div>
        </div>
    );
}
