import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { DutyEvent } from '@/types.ts';

interface DialogProps {
    dutyEvent: DutyEvent;
    isDialogOpen: boolean;
    onClose: (open: boolean) => void;
}

export default function DutyEditDialog({
    dutyEvent,
    isDialogOpen,
    onClose,
}: DialogProps) {
    return (
        <Dialog open={isDialogOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-150">
                <form>
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            Duty: {dutyEvent.name} {''} {''}
                            {dutyEvent.start
                                .substring(0, 10)
                                .split('-')
                                .reverse()
                                .join('-')}
                        </DialogTitle>
                    </DialogHeader>

                    <div>{JSON.stringify(dutyEvent)}</div>
                    {/* NAME */}
                    <div className="grid grid-cols-4 items-center">
                        <Label htmlFor="name" className="text-2xl">
                            Notes
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="notes"
                                name="notes"
                                autoComplete="off"
                                required
                                value={dutyEvent.notes}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <button type="submit" className="">
                            Save
                        </button>

                        <DialogClose asChild>
                            <button type="button" className="">
                                Close
                            </button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
