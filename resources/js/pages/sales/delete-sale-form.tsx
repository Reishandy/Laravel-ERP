import { DeleteDialog } from '@/components/dialog/delete-dialog';
import { Sale } from '@/types';
import { useForm } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface DeleteSaleFormProps {
    sale: Sale;
}

type EditSaleForm = {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: File | null;
};

export default function DeleteSaleForm({ sale }: DeleteSaleFormProps) {
    const [open, setOpen] = useState(false);
    const { delete: destroy, processing } = useForm<Required<EditSaleForm>>();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('sales.destroy', sale.sale_number), {
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <DeleteDialog
            title={`Delete "${sale.name}"?`}
            description={`Are you sure you want to delete ${sale.sale_number} "${sale.name}"? This action cannot be undone. Related sales will not be deleted. The stock will be updated accordingly.`}
            trigger={<Trash className="size-5 cursor-pointer text-destructive hover:text-destructive/70" />}
            onDelete={submit}
            processing={processing}
            open={open}
            setOpen={setOpen}
        />
    );
}
