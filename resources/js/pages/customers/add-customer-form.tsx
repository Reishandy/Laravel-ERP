import CustomerForm from '@/pages/customers/customer-form';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode, useState } from 'react';

interface AddCustomerFormProps {
    children: ReactNode;
}

type AddCustomerForm = {
    name: string;
    email: string;
    avatar?: File | null;
    type: 'individual' | 'business';
};

export default function AddCustomerForm({ children }: AddCustomerFormProps) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm<Required<AddCustomerForm>>({
        name: '',
        email: '',
        avatar: null,
        type: 'individual',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('customers.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setOpen(false)
                setData({
                    name: '',
                    email: '',
                    avatar: null,
                    type: 'individual',
                });
            }
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
