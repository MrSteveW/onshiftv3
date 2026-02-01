import { useDroppable } from '@dnd-kit/core';
import { memo } from 'react';
import { DutyCard } from '@/components/DutyCard';
import type { Duty } from 'types';

type ColumnProps = {
    duties: Duty[];
};

// React.memo prevents re-render if props haven't changed
export const AvailableColumn = memo(function Column({ duties }: ColumnProps) {
    const { setNodeRef } = useDroppable({
        id: 'unassigned',
    });

    return (
        <div className="flex h-screen w-80 flex-col rounded-lg bg-blue-700 p-4">
            <h2 className="mb-4 font-semibold text-neutral-100">
                Available staff
            </h2>
            <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
                {duties.map((duty) => {
                    return <DutyCard key={duty.id} duty={duty} />;
                })}
            </div>
        </div>
    );
});
