import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import type { CreateDutyProps, Duty } from 'types';
import { AvailableColumn } from '@/components/AvailableColumn';
import { TaskSlot } from '@/components/TaskSlot';

export default function AssigningOneDuty({
    date,
    users,
    tasks,
}: CreateDutyProps) {
    // Initial setup of stateful duties by mapping through users
    const initialSetup: Duty[] =
        users?.map((user) => ({
            id: user.id,
            user_id: user.id,
            task_id: null, // Initially unassigned
            dutydate: date,
        })) || [];

    const [duties, setDuties] = useState<Duty[]>(initialSetup);

    // Update duties when date, users, or tasks change
    useEffect(() => {
        const newDuties: Duty[] =
            users?.map((user) => ({
                id: user.id,
                user_id: user.id,
                task_id: null, // Reset to unassigned when props change
                dutydate: date,
            })) || [];
        setDuties(newDuties);
    }, [date, users, tasks]);

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
                user_id: duty.user_id,
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
                    {/* Available Column for unassigned users */}
                    <AvailableColumn
                        duties={duties
                            .filter((duty) => duty.task_id === null)
                            .map((duty) => ({
                                ...duty,
                                user: users?.find(
                                    (s) => s.id === duty.user_id,
                                )!,
                                task: null as any,
                            }))}
                    />

                    {/* Task Slots */}
                    {tasks?.map((task) => {
                        const assignedDuty = duties.find(
                            (duty) => duty.task_id === task.id,
                        );
                        const dutyWithUser = assignedDuty
                            ? {
                                  ...assignedDuty,
                                  user: users?.find(
                                      (s) => s.id === assignedDuty.user_id,
                                  )!,
                                  task: task,
                              }
                            : null;
                        return (
                            <TaskSlot
                                key={task.id}
                                task={task}
                                duty={dutyWithUser}
                            />
                        );
                    })}
                </div>
            </DndContext>
        </>
    );
}
