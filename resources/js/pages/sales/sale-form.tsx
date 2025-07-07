import { ComboBox } from '@/components/combo-box';
import FormDialog from '@/components/dialog/form-dialog';
import InputError from '@/components/input-error';
import QuickAdd from '@/components/quick-add';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select-dialog';
import { Customer, Product } from '@/types';
import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';
import { FormEventHandler, ReactNode } from 'react';

interface SaleFormProps {
    products: Product[];
    customers: Customer[];
    data: {
        product_number: string;
        customer_number: string;
        quantity: number;
        status: 'pending' | 'processing' | 'completed';
    };
    setData: (key: string, value: unknown) => void;
    processing: boolean;
    errors: {
        product_number?: string;
        customer_number?: string;
        quantity?: string;
        status?: string;
    };
    submit: FormEventHandler;
    trigger: ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;

    [key: string]: unknown;
}

export default function SaleForm({ products, customers, data, setData, processing, errors, submit, trigger, open, setOpen }: SaleFormProps) {
    const productOptions = products.map((product) => ({
        value: product.product_number,
        label: `${product.product_number} - ${product.name}`,
    }));

    const customerOptions = customers.map((customer) => ({
        value: customer.customer_number,
        label: `${customer.customer_number} - ${customer.name}`,
    }));

    return (
        <form>
            <FormDialog
                title="Add New Sale"
                description="Fill in the details to create a new sale."
                trigger={trigger}
                formContent={
                    <div className="flex flex-col gap-y-4 p-4 sm:p-0">
                        <div className="grid gap-2">
                            <Label htmlFor="product">Product</Label>
                            <ComboBox
                                label={'product'}
                                datas={productOptions}
                                onChange={(value) => setData('product_number', value)}
                                value={data.product_number}
                            />
                            <InputError message={errors.product_number} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="customer">Customer</Label>
                            <ComboBox
                                label={'customer'}
                                datas={customerOptions}
                                onChange={(value) => setData('customer_number', value)}
                                value={data.customer_number}
                            />
                            <InputError message={errors.customer_number} />
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

                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={data.status} onValueChange={(value) => setData('status', value)} disabled={processing}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel className="text-muted-foreground">Status</SelectLabel>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                    </div>
                }
                formButton={
                    <Button disabled={processing} onClick={submit}>
                        {processing && <Ring size="14" stroke="2" speed="2.5" color="gray" />}
                        Save Sale
                    </Button>
                }
                open={open}
                setOpen={setOpen}
            />
        </form>
    );
}
