import ProductForm from '@/pages/products/product-form';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode, useState } from 'react';

interface AddProductFormProps {
    children: ReactNode;
}

type AddProductForm = {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: File | null;
};

export default function AddProductForm({ children }: AddProductFormProps) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm<Required<AddProductForm>>({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setOpen(false);
                setData({
                    name: '',
                    description: '',
                    price: 0,
                    quantity: 0,
                    image: null,
                });
            }
        });
    };

    return (
        <ProductForm
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
