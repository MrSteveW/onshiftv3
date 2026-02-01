import { useDraggable } from '@dnd-kit/core';
import type { Duty } from 'types';

type DutyCardProps = {
    duty: Duty;
};

export function DutyCard({ duty }: DutyCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: duty.id,
    });

    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
          }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
            style={style}
        >
            <h3 className="font-medium text-neutral-100">
                {duty.staffmember.name}
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
                {duty.staffmember.role}
            </p>
        </div>
    );
}
