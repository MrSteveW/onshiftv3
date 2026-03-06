import { useForm, Link } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import InputError from '@/components/auth/input-error';
import ShiftPatternCard from '@/components/ShiftPatternCard';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';

interface ShiftUser {
    id: number;
    name: string;
}

interface ShiftPatternProps {
    users: ShiftUser[];
    totalDays: number;
    onSubmit: (shiftArray: ShiftDay[]) => void;
    initialData?: ShiftUser[];
}

export default function ShiftPatternForm({
    users,
    totalDays,
    onSubmit,
    initialData,
}: ShiftPatternProps) {
    const [selectedUser, setSelectedUser] = useState<number>();

    const initialShifts = Array.from({ length: totalDays }, (_, i) => ({
        user_id: '' as number | '',
        day: i + 1,
        shift_type: 'Off',
        start_time: '',
        end_time: '',
    }));

    const [shiftArray, setShiftArray] = useState(initialShifts);

    const { data, setData, post, processing, errors } = useForm({
        shiftArray: initialShifts,
    });

    const handleDayChange = useCallback(
        (dayIndex: number, field: string, value: string) => {
            setShiftArray((prev) => {
                const updated = prev.map((d, i) =>
                    i === dayIndex ? { ...d, [field]: value } : d,
                );
                return updated;
            });
        },
        [],
    );

    const handleUserChange = (v: string) => {
        const id = parseInt(v, 10);
        setSelectedUser(id);
        setShiftArray((prev) =>
            prev.map((shift) => ({ ...shift, user_id: id })),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(shiftArray);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-6">
                <div className="text-xs">{JSON.stringify(shiftArray)}</div>
                <div className="flex w-full border bg-gray-50 p-5">
                    <div className="flex w-30 flex-col gap-2">
                        <Label>Select user</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    {users.find(
                                        (user) => user.id === selectedUser,
                                    )?.name || 'Select User'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuRadioGroup
                                    value={selectedUser?.toString()}
                                    onValueChange={handleUserChange}
                                >
                                    {users.map((user) => (
                                        <DropdownMenuRadioItem
                                            key={user.id}
                                            value={user.id.toString()}
                                        >
                                            {user.name}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <InputError message={errors.user_id} />
                    </div>
                </div>

                <div className="flex flex-col gap-2 border bg-gray-200">
                    {!selectedUser
                        ? ''
                        : shiftArray.map((day, index) => (
                              <ShiftPatternCard
                                  key={day.day}
                                  day={day}
                                  index={index}
                                  onChange={handleDayChange}
                                  errors={{
                                      shift_type:
                                          errors[
                                              `shiftArray.${index}.shift_type`
                                          ],
                                      start_time:
                                          errors[
                                              `shiftArray.${index}.start_time`
                                          ],
                                      end_time:
                                          errors[
                                              `shiftArray.${index}.end_time`
                                          ],
                                  }}
                              />
                          ))}
                </div>

                <div className="m-4 flex flex-row items-center">
                    <Button type="submit" disabled={processing}>
                        Save
                    </Button>
                    <Button variant="outline">
                        <Link href="/shiftpatterns">Cancel</Link>
                    </Button>
                </div>
            </div>
        </form>
    );
}
