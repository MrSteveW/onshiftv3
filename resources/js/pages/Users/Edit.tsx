import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/auth/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import type { User } from '@/types';

interface Props {
    user: User;
}

export default function Edit({ user }: Props) {
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>{JSON.stringify(user)}</div>
                <Form
                    action={`/users/${user.id}`}
                    method="patch"
                    // resetOnSuccess={['password']}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <input
                                type="hidden"
                                name="id"
                                id="id"
                                defaultValue={user.id}
                            />
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        required
                                        autoFocus
                                        defaultValue={user.name}
                                        autoComplete="off"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        defaultValue={user.email}
                                        autoComplete="new-email"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="grade">Grade</Label>
                                    <Input
                                        id="grade"
                                        type="text"
                                        name="grade"
                                        required
                                        defaultValue={user.grade}
                                        autoComplete="off"
                                    />
                                    <InputError message={errors.grade} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Input
                                        id="role"
                                        type="text"
                                        name="role"
                                        required
                                        defaultValue={user.role}
                                        autoComplete="off"
                                    />
                                    <InputError message={errors.role} />
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-4 w-full"
                                    disabled={processing}
                                    data-test="create-user-button"
                                >
                                    {processing && <Spinner />}
                                    Update user
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
