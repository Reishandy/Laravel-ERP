import { DataTable } from '@/components/data-table/data-table';
import { DeleteDialog } from '@/components/dialog/delete-dialog';
import Heading from '@/components/heading';
import ActionButtons from '@/components/heading-button';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Customer, Product, Sale } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { VariantProps } from 'class-variance-authority';
import { Info, MoreHorizontal, SquarePen, Trash } from 'lucide-react';

interface Entry extends Sale {
    product: Product;
    customer: Customer;
}

interface SalesPageProps {
    app: {
        locale: string;
        currency: string;
    };
    sales: Entry[];
    show?: string;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales',
        href: '/sales',
    },
];

export default function Sales({ sales, show }: SalesPageProps) {
    const { app } = usePage<SalesPageProps>().props;

    const selectedSale = show ? sales.find((sale) => sale.sale_number === show) : undefined;

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
                const price: number = row.original.product.price;
                const quantity: number = row.getValue('quantity');
                const total_price = parseFloat(row.getValue('total_price'));
                const formatted = new Intl.NumberFormat(app.locale, {
                    style: 'currency',
                    currency: app.currency,
                }).format(total_price);

                return (
                    <div className="text-center font-medium">
                        {total_price !== Math.round((price * quantity + Number.EPSILON) * 100) / 100 ? (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span>
                                        {formatted}
                                        <span className="text-xl">*</span>
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Product price has changed since sale.</p>
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <span>{formatted}</span>
                        )}
                    </div>
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
                                <DropdownMenuLabel>
                                    <span className="font-bold">Change status</span>
                                </DropdownMenuLabel>
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
                        <Info className="size-5 cursor-pointer text-primary hover:text-primary/70" />
                        <SquarePen className="size-5 cursor-pointer text-primary hover:text-primary/70" />

                        <DeleteDialog
                            title="Delete Sale"
                            description={`Are you sure you want to delete the sale with ID "${sale.sale_number}"? This action cannot be undone.`}
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
        { value: 'sale_number', label: 'ID' },
        { value: 'product.name_and_number', label: 'Product' },
        { value: 'customer.name', label: 'Customer' },
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

                    <ActionButtons
                        onExport={() => {
                            /*TODO*/
                        }}
                        addHref="#"
                    />
                </div>

                {/*TODO: replace with show details dialog*/}
                {/*TODO: make sure to handle not exist properly*/}
                {selectedSale && (
                    <div className="mb-4">
                        <Badge variant="default" className="capitalize">
                            {selectedSale?.sale_number}
                        </Badge>
                    </div>
                )}

                <div>
                    <DataTable columns={columns} data={sales} sortableColumns={sortableColumns} />
                </div>
            </div>
        </AppLayout>
    );
}
