import { Form, Link } from '@inertiajs/react';
import InputError from '@/components/auth/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { Task } from '@/types';

type TaskFormProps = {
    action: string;
    method: 'post' | 'patch';
    initialData?: Task;
};

export default function GradeForm({
    action,
    method,
    initialData,
}: TaskFormProps) {
    return (
        <div>
            <Form
                action={action}
                method={method}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="flex w-full flex-col rounded-lg border bg-gray-50 p-5">
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
                                <div className="m-4 flex flex-row items-center">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        data-test="create-grade-button"
                                    >
                                        {processing && <Spinner />}
                                        {method === 'post'
                                            ? 'Add grade'
                                            : 'Edit grade'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        disabled={processing}
                                    >
                                        <Link href="/grades">Cancel</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}
