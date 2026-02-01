import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Staff {
    id: number;
    name: string;
    role: string;
}

interface Props {
    staff: Staff[];
}

export default function Index({ staff }: Props) {
    return (
        <AppLayout>
            <Head title="Staff" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="my-3">
                    <a
                        href="/staff/create"
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Create
                    </a>
                </div>
                <div>
                    {staff.map((member) => (
                        <Link
                            href={`/staff/${member.id}`}
                            className="hover:text-slate-300 hover:underline"
                        >
                            <div key={member.id} className="flex flex-row p-2">
                                <div className="text-lg">{member.name} </div>
                                <> | </>
                                <div className="text-lg"> {member.role}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
