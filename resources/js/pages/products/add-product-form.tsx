import FormDialog from '@/components/dialog/form-dialog';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, Plus } from 'lucide-react';
import { FormEventHandler } from 'react';

interface AddProductFormProps {
    app: {
        locale: string;
        currency: string;
    };

    [key: string]: unknown;
}

type AddProductForm = {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: File | null;
};

export default function AddProductForm() {
    const { app } = usePage<AddProductFormProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm<Required<AddProductForm>>({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        alert(data);
        console.log(data);
        // post(route('register'), {
        //     forceFormData: true
        // });
        // TODO: Implement the post request to add a new product
    };

    return (
        <form>
            <FormDialog
                title="Add New Product"
                description="Fill in the details below to add a new product to your inventory."
                trigger={
                    <Button className="flex items-center gap-x-2">
                        <Plus className="size-5" />
                        Add New
                    </Button>
                }
                formContent={
                    <div className="p-4 sm:p-0">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Full name"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                    </div>
                }
                formButton={
                    <Button tabIndex={1} disabled={processing} onClick={submit}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Save Product
                    </Button>
                }
            />
        </form>
    );
}
