import { DataTable } from '@/components/data-table/data-table';
import Heading from '@/components/heading';
import TimestampCell from '@/components/timestamp-cell';
import PriceCell from '@/components/price-cell';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import AddSaleForm from '@/pages/sales/add-sale-form';
import DeleteSaleForm from '@/pages/sales/delete-sale-form';
import EditSaleForm from '@/pages/sales/edit-sale-form';
import { type BreadcrumbItem, Customer, Product, Sale } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { VariantProps } from 'class-variance-authority';
import { Download, MoreHorizontal, Plus, SquarePen } from 'lucide-react';
import { useEffect } from 'react';

export interface Entry extends Sale {
    product: Product;
    customer: Customer;
}

interface SalesPageProps {
    app: {
        locale: string;
        currency: string;
        timezone: string;
    };
    sales: Entry[];
    products: Product[];
    customers: Customer[];
    show?: string;

    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales',
        href: '/sales',
    },
];

export default function Sales({ sales, products, customers, show }: SalesPageProps) {
    const { app } = usePage<SalesPageProps>().props;

    useEffect(() => {
        if (show) {
            router.visit('/sales', {
                replace: true,
                preserveScroll: true,
                preserveState: true,
            });
        }
    }, [show]);

    const columns: ColumnDef<Entry>[] = [
        {
            id: 'sale_number',
            accessorKey: 'sale_number',
            header: () => <div className="text-center">ID</div>,
            cell: ({ row }) => {
                return <div className="text-center">{row.getValue('sale_number')}</div>;
            },
        },
        {
            id: 'product.name_and_number',
            accessorKey: 'product.name_and_number',
            header: () => <div className="pl-4 text-left">Product</div>,
            accessorFn: (row) => row.product.product_number + ' - ' + row.product.name,
            cell: ({ row }) => {
                return (
                    <Button variant="link" asChild>
                        <Link href={route('products.show', row.original.product.product_number)}>{row.getValue('product.name_and_number')}</Link>
                    </Button>
                );
            },
        },
        {
            id: 'quantity',
            accessorKey: 'quantity',
            header: () => <div className="text-center">Quantity</div>,
            cell: ({ row }) => {
                return <div className="text-center font-bold">{row.getValue('quantity')}</div>;
            },
        },
        {
            id: 'total_price',
            accessorKey: 'total_price',
            header: () => <div className="text-center">Total</div>,
            cell: ({ row }) => {
                const price_at_sale = row.original.price_at_sale;
                const current_price = row.original.product.price;
                const quantity: number = row.getValue('quantity');
                const total_price = parseFloat(row.getValue('total_price'));

                return (
                    <PriceCell
                        totalPrice={total_price}
                        priceAtSale={price_at_sale}
                        currentPrice={current_price}
                        quantity={quantity}
                        locale={app.locale}
                        currency={app.currency}
                    />
                );
            },
        },
        {
            id: 'customer.name',
            accessorKey: 'customer.name',
            header: () => <div className="pl-4 text-left">Customer</div>,
            cell: ({ row }) => {
                return (
                    <Button variant="link" asChild>
                        <Link href={route('customers.show', row.original.customer.customer_number)}>{row.getValue('customer.name')}</Link>
                    </Button>
                );
            },
        },
        {
            id: 'created_at',
            accessorKey: 'created_at',
            header: () => <div className="text-center">Sale Time</div>,
            cell: ({ row }) => {
                return (
                    <TimestampCell
                        primaryDate={row.getValue('created_at')}
                        secondaryDate={row.original.updated_at}
                        locale={app.locale}
                        timezone={app.timezone}
                        primaryLabel="Created at"
                        secondaryLabel="Last updated"
                    />
                );
            },
        },
        {
            id: 'status',
            accessorKey: 'status',
            header: () => <div className="text-center">Status</div>,
            cell: ({ row }) => {
                const status: 'pending' | 'processing' | 'completed' = row.getValue('status');
                const variantMap: Record<Sale['status'], VariantProps<typeof badgeVariants>['variant']> = {
                    pending: 'outline',
                    processing: 'secondary',
                    completed: 'default',
                };

                return (
                    <div className="flex flex-row items-center justify-end gap-x-2">
                        <div className="w-full">
                            <Badge variant={variantMap[status]} className="text-md w-full font-medium capitalize">
                                {status}
                            </Badge>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="cursor-pointer" asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel className="text-muted-foreground">Change Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {/* TODO: onclick function*/}
                                <DropdownMenuItem className="cursor-pointer" disabled={status === 'pending'}>
                                    Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" disabled={status === 'processing'}>
                                    Processing
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" disabled={status === 'completed'}>
                                    Completed
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const sale = row.original;

                return (
                    <div className="flex flex-row items-center justify-center gap-x-2">
                        <EditSaleForm sale={sale} products={products} customers={customers}>
                            <SquarePen className="size-5 cursor-pointer text-primary hover:text-primary/70" />
                        </EditSaleForm>

                        <DeleteSaleForm sale={sale} />
                    </div>
                );
            },
        },
    ];

    const sortableColumns = [
        { value: 'sale_number', label: 'ID' },
        { value: 'product.name_and_number', label: 'Product' },
        { value: 'customer.name', label: 'Customer' },
        { value: 'created_at', label: 'Sale Time' },
        { value: 'quantity', label: 'Quantity' },
        { value: 'total_price', label: 'Total' },
        { value: 'status', label: 'Status' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />

            <div className="m-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                    <Heading title="Sales" description="Manage your sales transactions and records." />

                    <div className="flex flex-row items-center gap-x-4 sm:justify-center">
                        <AddSaleForm products={products} customers={customers}>
                            <Button className="flex items-center gap-x-2">
                                <Plus className="size-5" />
                                Add New
                            </Button>
                        </AddSaleForm>

                        <Button
                            variant="ghost"
                            onClick={() => {
                                alert('TODO');
                            }}
                            className="flex items-center gap-x-2"
                        >
                            <Download className="size-5" />
                            Export
                        </Button>
                    </div>
                </div>

                <div>
                    <DataTable columns={columns} data={sales} sortableColumns={sortableColumns} show={show} />
                </div>
            </div>
        </AppLayout>
    );
}
