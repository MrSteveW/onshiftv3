import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

export default function DeleteUserAction({
    url,
    name,
}: {
    url: string;
    name: string;
}) {
    const handleDelete = () => {
        router.delete(url);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Archive</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm archive</DialogTitle>
                    <DialogDescription>
                        Do you wish to archive {name}?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDelete}>
                        Confirm Archive
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
