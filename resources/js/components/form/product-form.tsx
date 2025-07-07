import { usePage } from '@inertiajs/react';
import FormDialog from '@/components/dialog/form-dialog';
import { Button } from '@/components/ui/button';
import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import QuickAdd from '@/components/quick-add';
import { FormEventHandler, ReactNode } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface ProductFormProps {
    app?: {
        locale: string;
        currency: string;
    };
    data: {
        name: string;
        description: string;
        price: number;
        quantity: number;
        image?: File | null;
        remove_image?: boolean;
    };
    setData: (key: string, value: unknown) => void;
    processing: boolean;
    errors: {
        name?: string;
        description?: string;
        price?: string;
        quantity?: string;
        image?: string;
        remove_image?: string;
    };
    submit: FormEventHandler;
    trigger: ReactNode;
    open: boolean
    setOpen: (open: boolean) => void;

    [key: string]: unknown;
}

export default function ProductForm({ data, setData, processing, errors, submit, trigger, open, setOpen }: ProductFormProps) {
    const { app } = usePage<ProductFormProps>().props;

    return (
        <form>
            <FormDialog
                title="Add New Product"
                description="Fill in the details below to add a new product to your inventory."
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
                                placeholder="Product name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                required
                                autoComplete="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                disabled={processing}
                                placeholder="Product description"
                                className="max-h-10 overflow-y-auto sm:max-h-64"
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Image (optional)</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                disabled={processing || data.remove_image}
                            />
                            <InputError message={errors.image} />
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remove_image"
                                name="remove_image"
                                checked={data.remove_image}
                                onClick={() => {
                                    setData('image', null);
                                    setData('remove_image', !data.remove_image);
                                }}
                                tabIndex={3}
                            />
                            <Label htmlFor="remove_image">Remove image</Label>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="price">Price</Label>
                            <div className="flex flex-row items-center gap-x-2">
                                {app?.currency && <span>{app?.currency}</span>}
                                <Input
                                    id="price"
                                    type="number"
                                    required
                                    autoComplete="price"
                                    value={data.price === 0 ? '' : data.price}
                                    onChange={(e) => {
                                        const value = e.target.value === '' ? 0 : Number(e.target.value);
                                        setData('price', value);
                                    }}
                                    disabled={processing}
                                    placeholder="0"
                                    className="no-number-arrows"
                                />
                            </div>
                            <InputError message={errors.price} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <QuickAdd setData={setData} number={data.quantity} processing={processing}>
                                <Input
                                    id="quantity"
                                    type="number"
                                    required
                                    autoComplete="quantity"
                                    value={data.quantity === 0 ? '' : data.quantity}
                                    onChange={(e) => {
                                        const value = e.target.value === '' ? 0 : Number(e.target.value);
                                        setData('quantity', value);
                                    }}
                                    disabled={processing}
                                    placeholder="0"
                                    className="no-number-arrows mx-1 flex-1"
                                />
                            </QuickAdd>
                            <InputError message={errors.quantity} />
                        </div>
                    </div>
                }
                formButton={
                    <Button disabled={processing} onClick={submit}>
                        {processing && <Ring size="14" stroke="2" speed="2.5" color="gray" />}
                        Save Product
                    </Button>
                }
                open={open}
                setOpen={setOpen}
            />
        </form>
    );
}
