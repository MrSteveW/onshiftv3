import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import type { CreateDutyProps, Duty } from 'types';
import { AvailableColumn } from '@/components/AvailableColumn';
import { TaskSlot } from '@/components/TaskSlot';

export default function AssigningOneDuty({
    date,
    staff,
    tasks,
}: CreateDutyProps) {
    // Initial setup of stateful duties by mapping through staff
    const initialSetup: Duty[] =
        staff?.map((staffmember) => ({
            id: staffmember.id,
            staffmember_id: staffmember.id,
            task_id: null, // Initially unassigned
            dutydate: date,
        })) || [];

    const [duties, setDuties] = useState<Duty[]>(initialSetup);

    // Update duties when date, staff, or tasks change
    useEffect(() => {
        const newDuties: Duty[] =
            staff?.map((staffmember) => ({
                id: staffmember.id,
                staffmember_id: staffmember.id,
                task_id: null, // Reset to unassigned when props change
                dutydate: date,
            })) || [];
        setDuties(newDuties);
    }, [date, staff, tasks]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const dutyId = active.id as number;
        const newTaskId = over.id === 'unassigned' ? null : (over.id as number);

        // Following spreads existing duty and updates task_id
        setDuties((prevDuties) => {
            return prevDuties.map((duty) => {
                if (duty.id === dutyId) {
                    return {
                        ...duty,
                        task_id: newTaskId,
                    };
                }
                return duty;
            });
        });
    }, []);

    const handleSave = () => {
        // Filter out duties that have task assignments and remove React-only id
        const dutiesForLaravel = duties
            .filter((duty) => duty.task_id !== null) // Only save assigned duties
            .map((duty) => ({
                staffmember_id: duty.staffmember_id,
                task_id: duty.task_id,
                dutydate: duty.dutydate,
                // Exclude the React id
            }));

        // Submit via Inertia
        router.post('/duties', {
            duties: dutiesForLaravel,
        });
    };

    return (
        <>
            {/* <pre className="w-full max-w-full overflow-hidden text-sm break-words whitespace-pre-wrap">{JSON.stringify(duties)}</pre> */}
            {/* BUTTONS */}
            <div className="flex items-center justify-start gap-x-6">
                <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Save
                </button>

                <a
                    href="/duties"
                    className="text-sm/6 font-semibold text-white"
                >
                    Cancel
                </a>
            </div>

            <DndContext onDragEnd={handleDragEnd}>
                <div className="flex gap-8 p-4">
                    {/* Available Column for unassigned staff */}
                    <AvailableColumn
                        duties={duties
                            .filter((duty) => duty.task_id === null)
                            .map((duty) => ({
                                ...duty,
                                staffmember: staff?.find(
                                    (s) => s.id === duty.staffmember_id,
                                )!,
                                task: null as any,
                            }))}
                    />

                    {/* Task Slots */}
                    {tasks?.map((task) => {
                        const assignedDuty = duties.find(
                            (duty) => duty.task_id === task.id,
                        );
                        const dutyWithStaffmember = assignedDuty
                            ? {
                                  ...assignedDuty,
                                  staffmember: staff?.find(
                                      (s) =>
                                          s.id === assignedDuty.staffmember_id,
                                  )!,
                                  task: task,
                              }
                            : null;
                        return (
                            <TaskSlot
                                key={task.id}
                                task={task}
                                duty={dutyWithStaffmember}
                            />
                        );
                    })}
                </div>
            </DndContext>
        </>
    );
}
