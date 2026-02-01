import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-800 text-white">
            <nav className="h-10 bg-slate-400 p-2">
                <Link href="/" className="hover:text-slate-800 hover:underline">
                    Home
                </Link>
                <> | </>
                <Link
                    href="/staff"
                    className="hover:text-slate-800 hover:underline"
                >
                    Staff
                </Link>
                <> | </>
                <Link
                    href="/tasks"
                    className="hover:text-slate-800 hover:underline"
                >
                    Tasks
                </Link>
                <> | </>
                <Link
                    href="/duties"
                    className="hover:text-slate-800 hover:underline"
                >
                    Duties{' '}
                </Link>
                <> | </>
                <Link
                    href="/duties/create"
                    className="hover:text-slate-800 hover:underline"
                >
                    Assign{' '}
                </Link>
            </nav>
            <div className="p-2">{children}</div>
        </div>
    );
}
