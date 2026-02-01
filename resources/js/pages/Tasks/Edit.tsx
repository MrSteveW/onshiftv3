import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ArchiveButton from '@/components/ArchiveButton';

interface Task {
    id: number;
    name: string;
}

interface Props {
    task: Task;
}

export default function Edit({ task }: Props) {
    const { data, setData, patch, processing } = useForm({
        name: task.name,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/tasks/${task.id}`);
    };

    return (
        <AppLayout>
            <Head title="Staff" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-white/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm/6 font-medium text-white"
                                    >
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="off"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            required
                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-6 flex items-center justify-start gap-x-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Save
                        </button>

                        <a
                            href={`/tasks/${task.id}`}
                            className="text-sm/6 font-semibold text-white"
                        >
                            Cancel
                        </a>

                        <ArchiveButton
                            url={`/tasks/${task.id}`}
                            confirmMessage="Are you sure you want to archive this?"
                            disabled={processing}
                            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                        >
                            Archive
                        </ArchiveButton>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
