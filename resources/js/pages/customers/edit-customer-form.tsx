import CustomerForm from '@/pages/customers/customer-form';
import { Customer } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode, useEffect } from 'react';

interface EditCustomerFormProps {
    customer: Customer;
    children?: ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

type EditCustomerForm = {
    name: string;
    email: string;
    avatar?: File | null;
    type: string;
};

export default function EditCustomerForm({ customer, children, open, setOpen }: EditCustomerFormProps) {
    const { data, setData, post, processing, errors } = useForm<Required<EditCustomerForm>>({
        name: customer.name,
        email: customer.email,
        avatar: null,
        type: customer.type,
    });

    useEffect(() => {
        setData({
            name: customer.name,
            email: customer.email,
            avatar: null,
            type: customer.type,
        });
    }, [customer]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('customers.update', customer.customer_number), {
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                setOpen(false);
                setData({
                    name: '',
                    email: '',
                    avatar: null,
                    type: 'individual',
                });
            },
        });
    };

    return (
        <CustomerForm
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
