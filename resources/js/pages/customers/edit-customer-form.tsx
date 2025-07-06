import CustomerForm from '@/pages/customers/customer-form';
import { Customer } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

interface AddCustomerFormProps {
    customer: Customer;
    children: ReactNode;
}

type AddCustomerForm = {
    name: string;
    email: string;
    avatar?: File | null;
    type: 'individual' | 'business';
};

export default function AddCustomerForm({ customer, children }: AddCustomerFormProps) {
    const { data, setData, post, processing, errors } = useForm<Required<AddCustomerForm>>({
        name: customer.name,
        email: customer.email,
        avatar: null,
        type: customer.type,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
        });
    };

    return <CustomerForm data={data} setData={setData} processing={processing} errors={errors} submit={submit} trigger={children} />;
}
