import SaleForm from '@/pages/sales/sale-form';
import { Customer, Product } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode, useState } from 'react';

interface AddSaleFormProps {
    products: Product[];
    customers: Customer[];
    children: ReactNode;
}

type AddSaleForm = {
    product_number: string;
    customer_number: string;
    quantity: number;
    status: 'pending' | 'processing' | 'completed';
};

export default function AddSaleForm({ products, customers, children }: AddSaleFormProps) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm<Required<AddSaleForm>>({
        product_number: '',
        customer_number: '',
        quantity: 1,
        status: 'pending',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('sales.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                setData({
                    product_number: '',
                    customer_number: '',
                    quantity: 1,
                    status: 'pending',
                });
            }
        });
    };

    return (
        <SaleForm
            products={products}
            customers={customers}
            data={data}
            setData={setData}
            processing={processing}
            errors={errors}
            submit={submit}
            trigger={children}
            open={open}
            setOpen={setOpen}
        />
    );
}
