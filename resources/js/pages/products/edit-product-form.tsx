import ProductForm from '@/pages/products/product-form';
import { Product } from '@/types';
import { useForm } from '@inertiajs/react';
import { ReactNode, FormEventHandler } from 'react';

interface EditProductFormProps {
    product: Product;
    children: ReactNode;
}

type EditProductForm = {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: File | null;
};

export default function EditProductForm({ product, children }: EditProductFormProps) {
    const { data, setData, post, processing, errors } = useForm<Required<EditProductForm>>({
        name: product.name,
        description: product.description || '',
        price: product.price,
        quantity: product.quantity,
        image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.update', product.product_number), {
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
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
        />
    );
}
