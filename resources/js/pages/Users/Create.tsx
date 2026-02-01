import { useForm, Head } from '@inertiajs/react';
import { FormField } from '@/components/FormField';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        password: '',
        grade: '',
        role: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <AppLayout>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <FormField
                            label="Name"
                            id="name"
                            value={data.name}
                            error={errors.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <FormField
                            label="Email"
                            id="email"
                            value={data.email}
                            error={errors.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <FormField
                            label="Password"
                            id="password"
                            type="password"
                            value={data.password}
                            error={errors.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            required
                        />

                        <FormField
                            label="Grade"
                            id="grade"
                            value={data.grade}
                            error={errors.grade}
                            onChange={(e) => setData('grade', e.target.value)}
                            required
                        />
                        <FormField
                            label="Role"
                            id="role"
                            value={data.role}
                            error={errors.role}
                            onChange={(e) => setData('role', e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-6 flex gap-x-6">
                        <button
                            disabled={processing}
                            className="rounded bg-indigo-500 p-2 text-white"
                        >
                            {processing ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
