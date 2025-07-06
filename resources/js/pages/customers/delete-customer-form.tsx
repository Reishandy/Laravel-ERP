import { DeleteDialog } from '@/components/dialog/delete-dialog';
import { Customer } from '@/types';
import { useForm } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface DeleteCustomerFormProps {
    customer: Customer;
}

type EditCustomerForm = {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: File | null;
};

export default function DeleteCustomerForm({ customer }: DeleteCustomerFormProps) {
    const [open, setOpen] = useState(false);
    const { delete: destroy, processing } = useForm<Required<EditCustomerForm>>();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('customers.destroy', customer.customer_number), {
            preserveScroll: true,

            forceFormData: true,
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <DeleteDialog
            title={`Delete "${customer.name}"?`}
            description={`Are you sure you want to delete ${customer.customer_number} "${customer.name}"? This action cannot be undone. Related sales will not be deleted.`}
            trigger={<Trash className="size-5 cursor-pointer text-destructive hover:text-destructive/70" />}
            onDelete={submit}
            processing={processing}
            open={open}
            setOpen={setOpen}
        />
    );
}
