import SaleForm from '@/components/form/sale-form';
import { Customer, Product } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode, useEffect } from 'react';
import { Entry } from '@/pages/sales/index';

interface AddSaleFormProps {
    products: Product[];
    customers: Customer[];
    sale: Entry;
    children?: ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

type AddSaleForm = {
    product_number: string;
    customer_number: string;
    quantity: number;
    status: 'pending' | 'processing' | 'completed';
};

export default function AddSaleForm({ products, customers, sale, children, open, setOpen }: AddSaleFormProps) {
    const { data, setData, post, processing, errors } = useForm<Required<AddSaleForm>>({
        product_number: sale.product.product_number,
        customer_number: sale.customer.customer_number,
        quantity: sale.quantity,
        status: sale.status,
    });

    useEffect(() => {
        setData({
            product_number: sale.product.product_number,
            customer_number: sale.customer.customer_number,
            quantity: sale.quantity,
            status: sale.status,
        });
    }, [sale]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('sales.update', sale.sale_number), {
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
