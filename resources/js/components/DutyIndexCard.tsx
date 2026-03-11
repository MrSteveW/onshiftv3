import type { DutyEvent } from '@/types.ts';

interface IndexCardProps {
    dutyEvent: DutyEvent;
    handleEventSelect: (dutyEvent: DutyEvent) => void;
}

export default function DutyIndexCard({
    dutyEvent,
    handleEventSelect,
}: IndexCardProps) {
    return (
        <div
            onClick={() => handleEventSelect(dutyEvent)}
            className="m-2 w-full border"
        >
            {/* <div className="text-xs">{JSON.stringify(dutyEvent)}</div> */}
            <div className="flex">
                <div className="">{dutyEvent.name}</div>
                <div className="">{dutyEvent.grade}</div>
            </div>
            <div className="flex">
                <div>
                    <div>{dutyEvent?.start_time}</div>
                </div>
                <div>:</div>
                <div>{dutyEvent?.end_time}</div>
            </div>
        </div>
    );
}
