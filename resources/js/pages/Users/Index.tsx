import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    grade: string;
}

interface Props {
    users: User[];
}

export default function Index({ users }: Props) {
    return (
        <AppLayout>
            <Head title="Users Index" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="my-3">
                    <a
                        href="/users/create"
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Create
                    </a>
                </div>
                <div>
                    {users.map((user) => (
                        <Link
                            href={`/users/${user.id}`}
                            className="hover:text-slate-300 hover:underline"
                        >
                            <div key={user.id} className="flex flex-row p-2">
                                <div className="text-lg">{user.name} </div>
                                <> | </>
                                <div className="text-lg"> {user.grade}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
