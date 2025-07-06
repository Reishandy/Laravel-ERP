import SaleForm from '@/pages/sales/sale-form';
import { Customer, Product } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode, useState } from 'react';
import { Entry } from '@/pages/sales/index';

interface AddSaleFormProps {
    products: Product[];
    customers: Customer[];
    sale: Entry;
    children: ReactNode;
}

type AddSaleForm = {
    product_number: string;
    customer_number: string;
    quantity: number;
    status: 'pending' | 'processing' | 'completed';
};

export default function AddSaleForm({ products, customers, sale, children }: AddSaleFormProps) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm<Required<AddSaleForm>>({
        product_number: sale.product.product_number,
        customer_number: sale.customer.customer_number,
        quantity: sale.quantity,
        status: sale.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('sales.store'), {
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => setOpen(false),
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
