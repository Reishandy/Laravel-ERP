import { DeleteDialog } from '@/components/dialog/delete-dialog';
import { Product } from '@/types';
import { useForm } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface DeleteProductFormProps {
    product: Product;
}

type EditProductForm = {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: File | null;
};

export default function DeleteProductForm({ product }: DeleteProductFormProps) {
    const [open, setOpen] = useState(false);
    const { delete: destroy, processing } = useForm<Required<EditProductForm>>();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('products.destroy', product.product_number), {
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <DeleteDialog
            title={`Delete "${product.name}"?`}
            description={`Are you sure you want to delete ${product.product_number} "${product.name}"? This action cannot be undone. Related sales will not be deleted.`}
            trigger={<Trash className="size-5 cursor-pointer text-destructive hover:text-destructive/70" />}
            onDelete={submit}
            processing={processing}
            open={open}
            setOpen={setOpen}
        />
    );
}
