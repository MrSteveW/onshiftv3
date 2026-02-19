import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { router, Link } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AvailableColumn } from '@/components/AvailableColumn';
import { TaskSlot } from '@/components/TaskSlot';
import { Button } from '@/components/ui/button';
import type { Task, Duty, AssignableUser } from '@/types';

interface AssigningDutiesProps {
    users?: AssignableUser[];
    tasks?: Task[];
    date: string;
}

export default function AssigningDuties({
    date,
    users,
    tasks,
}: AssigningDutiesProps) {
    // Use useMemo to create initial duties only when dependencies actually change
    const initialDuties = useMemo(() => {
        return (
            users?.map((user) => ({
                id: user.id,
                user_id: user.id,
                task_id: null,
                dutydate: date,
            })) || []
        );
    }, [date, users]);

    const [duties, setDuties] = useState<Duty[]>(initialDuties);

    useEffect(() => {
        setDuties(initialDuties);
    }, [initialDuties]);

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
        const dutiesToSave = duties
            .filter((duty) => duty.task_id !== null) // Only save assigned duties
            .map((duty) => ({
                user_id: duty.user_id,
                task_id: duty.task_id,
                dutydate: duty.dutydate,
            }));
        router.post('/duties', {
            duties: dutiesToSave,
        });
    };

    const getUserDetails = useCallback(
        (userId: number): { name: string; grade: string } => {
            const user = users?.find((user) => user.id === userId);
            return {
                name: user?.name || 'Unknown',
                grade: user?.grade || '',
            };
        },
        [users],
    );

    // Get unassigned duties (memoized for performance)
    const unassignedDuties = useMemo(
        () => duties.filter((duty) => duty.task_id === null),
        [duties],
    );

    return (
        <>
            <div className="flex items-center justify-start gap-x-6 bg-blue-100">
                <Button type="button" onClick={handleSave}>
                    Save
                </Button>

                <Button variant="outline">
                    <Link href="/duties/create">Cancel</Link>
                </Button>
            </div>

            <DndContext onDragEnd={handleDragEnd}>
                <div className="flex gap-8 p-4">
                    <AvailableColumn
                        duties={unassignedDuties}
                        getUserDetails={getUserDetails}
                    />

                    {/* Task Slots */}
                    {tasks?.map((task) => {
                        const assignedDuty = duties.find(
                            (duty) => duty.task_id === task.id,
                        );
                        return (
                            <TaskSlot
                                key={task.id}
                                task={task}
                                duty={assignedDuty}
                                getUserDetails={getUserDetails}
                            />
                        );
                    })}
                </div>
            </DndContext>
        </>
    );
}
