import { Form, Link } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/auth/input-error';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { User, EmployeeData } from '@/types';

type UserFormProps = {
    action: string;
    method: 'post' | 'patch';
    roles: string[];
    initialData?: User;
};

export default function UserForm({
    roles,
    action,
    method,
    initialData,
}: UserFormProps) {
    const [selectedRole, setSelectedRole] = useState<string>(
        (initialData?.role as string) ?? '',
    );
    return (
        <div>
            <Form
                action={action}
                method={method}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="flex w-full border bg-gray-50 p-5">
                                <div className="mx-4 grid w-1/4 gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        required
                                        autoFocus
                                        autoComplete="off"
                                        defaultValue={initialData?.name}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="mx-4 grid w-1/4 gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoComplete="new-email"
                                        defaultValue={initialData?.email}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {method === 'post' ? (
                                    <div className="grid w-1/4 gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            autoComplete="new-password"
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                ) : (
                                    <></>
                                )}

                                <div className="mx-4 grid gap-2">
                                    <Label htmlFor="role">Role</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">
                                                {selectedRole ||
                                                    'Select access'}
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent>
                                            <DropdownMenuRadioGroup
                                                value={selectedRole}
                                                onValueChange={setSelectedRole}
                                            >
                                                {roles.map((role) => (
                                                    <DropdownMenuRadioItem
                                                        key={role}
                                                        value={role}
                                                    >
                                                        {role}
                                                    </DropdownMenuRadioItem>
                                                ))}
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <input
                                        type="hidden"
                                        name="role"
                                        value={selectedRole}
                                    />
                                    <InputError message={errors.role} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="grade">Grade</Label>
                                <Input
                                    id="grade"
                                    type="text"
                                    name="grade"
                                    required
                                    autoComplete="off"
                                    defaultValue={
                                        (initialData?.employee as EmployeeData)
                                            ?.grade ?? ''
                                    }
                                />
                                <InputError message={errors.grade} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="training">Training</Label>
                                <Input
                                    id="training"
                                    type="text"
                                    name="training"
                                    autoComplete="off"
                                    defaultValue={
                                        (initialData?.employee as EmployeeData)
                                            ?.training ?? ''
                                    }
                                />
                                <InputError message={errors.training} />
                            </div>

                            <div className="m-4 flex flex-row items-center">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    data-test="create-user-button"
                                >
                                    {processing && <Spinner />}
                                    {method === 'post'
                                        ? 'Add user'
                                        : 'Edit user'}
                                </Button>

                                <Button variant="outline" disabled={processing}>
                                    <Link href="/users">Cancel</Link>
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}
