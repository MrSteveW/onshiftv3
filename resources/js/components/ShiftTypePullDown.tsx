import type { ShiftTypeOption } from '@/types';

export default function ShiftTypePullDown() {
    const { shiftTypeOptions } = usePage().props as unknown as {
        shiftTypeOptions: ShiftTypeOption[];
    };

    return (
        <select
            value={day.shift_type}
            onChange={(e) => onChange(index, 'shift_type', e.target.value)}
        >
            {shiftTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}
