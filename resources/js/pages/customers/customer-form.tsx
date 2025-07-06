import FormDialog from '@/components/dialog/form-dialog';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, ReactNode } from 'react';

interface CustomerFormProps {
    data: {
        name: string;
        email: string;
        avatar?: File | null;
        type: 'individual' | 'business';
    };
    setData: (key: string, value: unknown) => void;
    processing: boolean;
    errors: {
        name?: string;
        email?: string;
        avatar?: string;
        type?: string;
    };
    submit: FormEventHandler;
    trigger: ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;

    [key: string]: unknown;
}

export default function CustomerForm({ data, setData, processing, errors, submit, trigger, open, setOpen }: CustomerFormProps) {
    return (
        <form>
            <FormDialog
                title="Add New Customer"
                description="Fill in the details below to add a new customer to your database."
                trigger={trigger}
                formContent={
                    <div className="flex flex-col gap-y-4 p-4 sm:p-0">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Customer name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="Customer email"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="avatar">Avatar (Optional)</Label>
                            <Input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('avatar', e.target.files ? e.target.files[0] : null)}
                                disabled={processing}
                            />
                            <InputError message={errors.avatar} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>
                            <Select
                                value={data.type}
                                onValueChange={(value) => setData('type', value)}
                                disabled={processing}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select customer type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel className="text-muted-foreground">Type</SelectLabel>
                                        <SelectItem value="individual">Individual</SelectItem>
                                        <SelectItem value="business">Business</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.type} />
                        </div>
                    </div>
                }
                formButton={
                    <Button disabled={processing} onClick={submit}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Save Customer
                    </Button>
                }
                open={open}
                setOpen={setOpen}
            />
        </form>
    );
}
