import { usePage } from '@inertiajs/react';
import TimeSelect from '@/components/TimeSelect';
import { Label } from '@/components/ui/label';
import type { TimeOptions } from '@/types';
import type { ShiftTypeOption } from '@/types';

interface ShiftDay {
    user_id: number | '';
    day: number;
    shift_type: string;
    start_time: string;
    end_time: string;
}

interface Props {
    day: ShiftDay;
    index: number;
    onChange: (index: number, field: string, value: string) => void;
    errors: {
        shift_type?: string;
        start_time?: string;
        end_time?: string;
    };
}

export default function ShiftPatternCard({
    day,
    index,
    onChange,
    errors,
}: Props) {
    // Use Inertia Page Props to get timeOptions and ShiftTypeOptions
    const { timeOptions } = usePage().props as unknown as {
        timeOptions: TimeOptions;
    };
    const { shiftTypeOptions } = usePage().props as unknown as {
        shiftTypeOptions: ShiftTypeOption[];
    };

    // Changes shift_type field and changes start & end time selections
    const handleShiftTypeChange = (value: string) => {
        const selected = shiftTypeOptions.find((opt) => opt.value === value);

        onChange(index, 'shift_type', value);

        if (selected && value !== 'Off') {
            onChange(index, 'start_time', selected.start_time ?? '');
            onChange(index, 'end_time', selected.end_time ?? '');
        } else {
            onChange(index, 'start_time', '');
            onChange(index, 'end_time', '');
        }
    };

    return (
        <div className="w-50 border bg-amber-50 p-2">
            <h3>Day {day.day}</h3>

            {/* Select Shift Type */}
            <select
                value={day.shift_type}
                onChange={(e) => handleShiftTypeChange(e.target.value)}
            >
                {shiftTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {errors.shift_type && <p>{errors.shift_type}</p>}

            {/* Conditionally render Start Time & End Time */}
            {day.shift_type !== 'Off' && (
                <>
                    <div className="w-30">
                        <Label>Start time</Label>
                        <TimeSelect
                            name="start_time"
                            value={day.start_time}
                            options={timeOptions}
                            onChange={(v) => onChange(index, 'start_time', v)}
                        />
                        {errors.start_time && <p>{errors.start_time}</p>}
                    </div>
                    <div className="w-30">
                        <Label>End time</Label>
                        <TimeSelect
                            name="end_time"
                            value={day.end_time}
                            options={timeOptions}
                            onChange={(v) => onChange(index, 'end_time', v)}
                        />
                        {errors.end_time && <p>{errors.end_time}</p>}
                    </div>
                </>
            )}
        </div>
    );
}
