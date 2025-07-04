import { DataTable } from '@/components/data-table/data-table';
import { DeleteDialog } from '@/components/dialog/delete-dialog';
import Heading from '@/components/heading';
import ActionButtons from '@/components/heading-button';
import { Badge, badgeVariants } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Product } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { VariantProps } from 'class-variance-authority';
import { SquarePen, Trash } from 'lucide-react';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

interface ProductsPageProps {
    app: {
        locale: string;
        currency: string;
    };
    products: Product[];
    show?: string;

    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: '/products',
    },
];

export default function Products({ products, show }: ProductsPageProps) {
    const { app } = usePage<ProductsPageProps>().props;
    const getInitials = useInitials();

    useEffect(() => {
        if (show) {
            router.visit('/products', {
                replace: true,
                preserveScroll: true,
                preserveState: true
            });
        }
    }, [show]);

    const columns: ColumnDef<Product>[] = [
        {
            id: 'product_number',
            accessorKey: 'product_number',
            header: () => <div className="text-center">ID</div>,
            cell: ({ row }) => {
                return <div className="text-center">{row.getValue('product_number')}</div>;
            },
        },
        {
            id: 'name',
            accessorKey: 'name',
            header: () => <div className="text-left">Product Name</div>,
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <div className="flex flex-row items-center gap-x-2">
                        <Avatar className="h-8 w-8 overflow-hidden">
                            <AvatarImage src={'/storage/' + product.image} alt={product.name} />
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(product.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-start font-medium">{product.name}</div>
                    </div>
                );
            },
        },
        {
            id: 'description',
            accessorKey: 'description',
            header: () => <div className="text-left">Product Description</div>,
            cell: ({ row }) => {
                return (
                    <div className="max-w-xs text-start font-medium break-words whitespace-pre-line sm:max-w-md md:max-w-lg">
                        {row.getValue('description')}
                    </div>
                );
            },
        },
        {
            id: 'price',
            accessorKey: 'price',
            header: () => <div className="text-end">Price</div>,
            cell: ({ row }) => {
                const price = parseFloat(row.getValue('price'));
                const formatted = new Intl.NumberFormat(app.locale, {
                    style: 'currency',
                    currency: app.currency,
                }).format(price);

                return <div className="text-end font-medium">{formatted}</div>;
            },
        },
        {
            id: 'quantity',
            accessorKey: 'quantity',
            header: () => <div className="ml-4 text-center">Quantity</div>,
            cell: ({ row }) => {
                const quantity: number = row.getValue('quantity');
                const getVariantByQuantity = (quantity: number): VariantProps<typeof badgeVariants>['variant'] => {
                    if (quantity <= 5) return 'destructive';
                    if (quantity <= 20) return 'secondary';
                    return 'outline';
                };

                return (
                    <div className="ml-4 flex flex-row items-center justify-end gap-x-2">
                        <div className="w-full">
                            <Badge variant={getVariantByQuantity(quantity)} className="text-md w-full font-bold">
                                {quantity}
                            </Badge>
                        </div>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const product = row.original;

                return (
                    <div className="flex flex-row items-center justify-center gap-x-2">
                        <SquarePen className="size-5 cursor-pointer text-primary hover:text-primary/70" />
                        <DeleteDialog
                            title={`Delete "${product.name}"?`}
                            description={`Are you sure you want to delete ${product.product_number} "${product.name}"? This action cannot be undone. Related sales will not be deleted.`}
                            trigger={<Trash className="size-5 cursor-pointer text-destructive hover:text-destructive/70" />}
                            onDelete={
                                () => {
                                    alert('Delete action triggered');
                                } /* TODO: Implement delete action */
                            }
                        />
                    </div>
                );
            },
        },
    ];

    const sortableColumns = [
        { value: 'product_number', label: 'ID' },
        { value: 'name', label: 'Product Name' },
        { value: 'price', label: 'Price' },
        { value: 'quantity', label: 'Quantity' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />

            <div className="m-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                    <Heading title="Inventory" description="Manage your products and inventory." />

                    <ActionButtons
                        onExport={() => {
                            /*TODO*/
                        }}
                        addHref="#"
                    />
                </div>

                <div>
                    <DataTable columns={columns} data={products} sortableColumns={sortableColumns} show={show} />
                </div>
            </div>
        </AppLayout>
    );
}
