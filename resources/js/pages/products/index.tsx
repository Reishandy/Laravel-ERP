import { DataTable } from '@/components/data-table/data-table';
import Heading from '@/components/heading';
import TimestampCell from '@/components/timestamp-cell';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import AddProductForm from '@/pages/products/add-product-form';
import DeleteProductForm from '@/pages/products/delete-product-form';
import EditProductForm from '@/pages/products/edit-product-form';
import { type BreadcrumbItem, Product } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { VariantProps } from 'class-variance-authority';
import { Download, Plus, SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface ProductsPageProps {
    app: {
        locale: string;
        currency: string;
        timezone: string;
    };
    flash: {
        success?: string;
        error?: string;
        description?: string;
        timestamp?: string;
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
    const { app, flash } = usePage<ProductsPageProps>().props;
    const getInitials = useInitials();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const openEditDialog = (product: Product) => {
        setSelectedProduct(product);
        setEditDialogOpen(true);
    };

    useEffect(() => {
        if (show) {
            router.visit('/products', {
                replace: true,
                preserveScroll: true,
                preserveState: true,
            });
        }
    }, [show]);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                description: flash.description,
            });
        }

        if (flash.error) {
            toast.error(flash.error, {
                description: flash.description,
            });
        }
    }, [flash.success, flash.error, flash.description, flash.timestamp]);

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
                            <AvatarImage src={product.image ? `/storage/${product.image}` : undefined} alt={product.name} />
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
                        <Badge variant={getVariantByQuantity(quantity)} className="text-md w-full font-bold">
                            {quantity}
                        </Badge>
                    </div>
                );
            },
        },
        {
            id: 'sales_count',
            accessorKey: 'sales_count',
            header: () => <div className="text-center">Sold</div>,
            cell: ({ row }) => {
                return <div className="text-center">{row.getValue('sales_count')}</div>;
            },
        },
        {
            id: 'updated_at',
            accessorKey: 'updated_at',
            header: () => <div className="text-center">Last Updated</div>,
            cell: ({ row }) => {
                return (
                    <TimestampCell
                        primaryDate={row.getValue('updated_at')}
                        secondaryDate={row.original.created_at}
                        locale={app.locale}
                        timezone={app.timezone}
                        primaryLabel="Last updated"
                        secondaryLabel="Created at"
                    />
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const product = row.original;

                return (
                    <div className="flex flex-row items-center justify-center gap-x-2">
                        <SquarePen className="size-5 cursor-pointer text-primary hover:text-primary/70 active:scale-95 transition-transform duration-300" onClick={() => openEditDialog(product)} />
                        <DeleteProductForm product={product} />
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
        { value: 'sales_count', label: 'Sold' },
        { value: 'updated_at', label: 'Last Updated' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />

            <div className="p-4">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                    <Heading title="Inventory" description="Manage your products and inventory." />

                    <div className="flex flex-row items-center gap-x-4 sm:justify-center">
                        <AddProductForm>
                            <Button className="flex items-center gap-x-2">
                                <Plus className="size-5" />
                                Add New
                            </Button>
                        </AddProductForm>

                        <Button variant="ghost" asChild>
                            <a href={route('export', { type: 'products' })} download target="_blank" rel="noopener" className="flex items-center gap-x-2">
                                <Download className="size-5" />
                                Export
                            </a>
                        </Button>
                    </div>
                </div>

                <div>
                    <DataTable columns={columns} data={products} sortableColumns={sortableColumns} show={show} />
                </div>

                {selectedProduct && <EditProductForm product={selectedProduct} open={editDialogOpen} setOpen={setEditDialogOpen} />}
            </div>
        </AppLayout>
    );
}
