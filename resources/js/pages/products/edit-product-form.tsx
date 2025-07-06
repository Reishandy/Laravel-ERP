import ProductForm from '@/pages/products/product-form';
import { Product } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode, useEffect } from 'react';

interface EditProductFormProps {
    product: Product;
    children?: ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

type EditProductForm = {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: File | null;
    remove_image?: boolean;
};

export default function EditProductForm({ product, children, open, setOpen }: EditProductFormProps) {
    const { data, setData, post, processing, errors } = useForm<Required<EditProductForm>>({
        name: product.name,
        description: product.description || '',
        price: product.price,
        quantity: product.quantity,
        image: null,
        remove_image: false,
    });

    useEffect(() => {
        setData({
            name: product.name,
            description: product.description || '',
            price: product.price,
            quantity: product.quantity,
            image: null,
            remove_image: false,
        });
    }, [product]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.update', product.product_number), {
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                setOpen(false);
                setData({
                    name: '',
                    description: '',
                    price: 0,
                    quantity: 0,
                    image: null,
                    remove_image: false,
                });
            },
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
