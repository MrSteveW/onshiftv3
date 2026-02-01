import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function FormField({ label, error, id, ...props }) {
    return (
        <div className="sm:col-span-3">
            <Label
                htmlFor={id}
                className="block text-sm font-medium text-black"
            >
                {label}
            </Label>
            <div className="mt-2">
                <Input id={id} {...props} />
                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            </div>
        </div>
    );
}
