import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { UserRoundPen } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
    grade: string;
    role: string;
}

interface Props {
    users: User[];
}

export default function Index({ users }: Props) {
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="my-3">
                    <a
                        href="/users/create"
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        + User
                    </a>
                </div>
                {/* Display */}
                <div className="w-1/2">
                    <div className="grid grid-cols-[2fr_2fr_2fr_1fr] items-center border-b pb-2 font-bold">
                        <div>Name</div>
                        <div>Grade</div>
                        <div>Role</div>
                        <div></div>
                    </div>
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="grid grid-cols-[2fr_2fr_2fr_1fr] items-center py-1.5 transition-colors hover:bg-slate-50"
                        >
                            <div className="text-lg">{user.name} </div>
                            <div className="text-lg">{user.grade}</div>
                            <div className="text-lg">{user.role}</div>
                            <Link
                                href={`/users/${user.id}/edit`}
                                className="hover:text-slate-300 hover:underline"
                            >
                                <UserRoundPen />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
