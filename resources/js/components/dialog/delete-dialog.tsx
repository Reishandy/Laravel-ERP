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
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { FormEventHandler, ReactNode, useState } from 'react';
import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';

interface DeleteDialogProps {
    title?: string;
    description?: string;
    trigger: ReactNode;
    onDelete: FormEventHandler;
    processing: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function DeleteDialog({
    title = 'Do you want to delete this entry?',
    description = 'This action will permanently delete the entry and cannot be undone.',
    trigger,
    onDelete,
    processing,
    open,
    setOpen,
}: DeleteDialogProps) {
    const isDesktop = useMediaQuery('(min-width: 640px)');

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="destructive" onClick={onDelete} disabled={processing}>
                                {processing && <Ring size="14" stroke="2" speed="2.5" color="gray" />}
                                Delete
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="destructive" onClick={onDelete} disabled={processing}>
                            {processing && <Ring size="14" stroke="2" speed="2.5" color="gray" />}
                            Delete
                        </Button>
                    </DrawerClose>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
