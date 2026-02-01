import { useForm } from '@inertiajs/react';

interface DeleteButtonProps {
    url: string;
    confirmMessage?: string;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
}

export default function ArchiveButton({
    url,
    confirmMessage = 'Are you sure you want to archive this?',
    className = '',
    children,
    disabled = false,
}: DeleteButtonProps) {
    const { delete: destroy, processing } = useForm({});

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        if (confirm(confirmMessage)) {
            destroy(url);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={disabled || processing}
            className={className}
        >
            {children}
        </button>
    );
}
