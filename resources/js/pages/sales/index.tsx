import { DataTable } from '@/components/data-table/data-table';
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
import { DeleteDialog } from '@/components/dialog/delete-dialog';

interface Entry extends Sale {
    product: Product;
    customer: Customer;
}

interface SalesPageProps {
    app: {
        locale: string;
        currency: string;
    };

    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales',
        href: '/sales',
    },
];

const exportSales = () => {
    // TODO: export to CSV
};

// TODO: Replace with actual data
// TODO: make sure to add the product and customer data to the Sale model
const data: Entry[] = [
    {
        id: 1,
        sale_number: 1,
        user_id: 1,
        product_id: 101,
        customer_id: 201,
        quantity: 2,
        price_at_sale: 120000,
        total_price: 240000,
        status: 'completed',
        product: {
            id: 101,
            product_number: 1,
            user_id: '1',
            name: 'Wireless Headphones',
            description: 'High-quality wireless headphones with noise cancellation',
            price: 100000,
            quantity: 15,
            created_at: '2024-01-10T10:00:00Z',
            updated_at: '2024-01-15T14:30:00Z',
        },
        customer: {
            id: 201,
            customer_number: 1,
            user_id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            type: 'individual',
            created_at: '2024-01-05T09:15:00Z',
            updated_at: '2024-01-05T09:15:00Z',
        },
        created_at: '2024-01-20T15:30:00Z',
        updated_at: '2024-01-20T15:30:00Z',
    },
    {
        id: 2,
        sale_number: 2,
        user_id: 1,
        product_id: 102,
        customer_id: 202,
        quantity: 5,
        price_at_sale: 30000,
        total_price: 150000,
        status: 'processing',
        product: {
            id: 102,
            product_number: 2,
            user_id: '1',
            name: 'USB Cable',
            description: 'Premium USB-C charging cable',
            price: 30000,
            quantity: 50,
            created_at: '2024-01-08T11:20:00Z',
            updated_at: '2024-01-12T16:45:00Z',
        },
        customer: {
            id: 202,
            customer_number: 2,
            user_id: 1,
            name: 'Tech Solutions Inc',
            email: 'orders@techsolutions.com',
            type: 'business',
            created_at: '2024-01-03T08:30:00Z',
            updated_at: '2024-01-18T10:15:00Z',
        },
        created_at: '2024-01-21T09:45:00Z',
        updated_at: '2024-01-21T11:20:00Z',
    },
    {
        id: 3,
        sale_number: 3,
        user_id: 1,
        product_number: 103,
        customer_number: 203,
        quantity: 1,
        price_at_sale: 350000,
        total_price: 350000,
        status: 'pending',
        product: {
            id: 103,
            product_number: 3,
            user_id: '1',
            name: 'Smart Watch',
            description: 'Fitness tracking smartwatch with heart rate monitor',
            price: 350000,
            quantity: 8,
            created_at: '2024-01-12T14:00:00Z',
            updated_at: '2024-01-19T12:30:00Z',
        },
        customer: {
            id: 203,
            customer_number: 3,
            user_id: 1,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@gmail.com',
            type: 'individual',
            created_at: '2024-01-15T13:20:00Z',
            updated_at: '2024-01-15T13:20:00Z',
        },
        created_at: '2024-01-22T14:15:00Z',
        updated_at: '2024-01-22T14:15:00Z',
    },
    {
        id: 4,
        sale_number: 4,
        user_id: 1,
        product_number: 104,
        customer_number: 204,
        quantity: 3,
        price_at_sale: 270000,
        total_price: 810000,
        status: 'completed',
        product: {
            id: 104,
            product_number: 4,
            user_id: '1',
            name: 'Bluetooth Speaker',
            description: 'Portable wireless speaker with deep bass',
            price: 270000,
            quantity: 12,
            created_at: '2024-01-09T16:30:00Z',
            updated_at: '2024-01-14T09:45:00Z',
        },
        customer: {
            id: 204,
            customer_number: 4,
            user_id: 1,
            name: 'Global Retail Corp',
            email: 'purchasing@globalretail.com',
            type: 'business',
            created_at: '2024-01-01T10:00:00Z',
            updated_at: '2024-01-20T15:30:00Z',
        },
        created_at: '2024-01-23T11:00:00Z',
        updated_at: '2024-01-23T11:00:00Z',
    },
];

export default function Sales() {
    const { app } = usePage<SalesPageProps>().props;

    const columns: ColumnDef<Entry>[] = [
        {
            id: 'sale_number',
            accessorKey: 'sale_number',
            header: () => <div className="text-center">ID</div>,
            cell: ({ row }) => {
                return <div className="text-center">{`S-${String(row.getValue('sale_number')).padStart(5, '0')}`}</div>;
            },
        },
        {
            id: 'product.name_and_number',
            accessorKey: 'product.name_and_number',
            header: () => <div className="pl-4 text-left">Product</div>,
            accessorFn: (row) => `P-${String(row.product.product_number).padStart(5, '0')}` + ' - ' + row.product.name,
            cell: ({ row }) => {
                return (
                    <Button variant="link" asChild>
                        <Link href="#">{row.getValue('product.name_and_number')}</Link>
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
                        {total_price !== price * quantity ? (
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
                        <Link href="#">{row.getValue('customer.name')}</Link>
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
                            <Badge variant={variantMap[status]} className="w-full capitalize">
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
            cell: () => {
                return (
                    <div className="flex flex-row items-center justify-center gap-x-2">
                        <Info className="size-5 cursor-pointer text-primary hover:text-primary/70" />
                        <SquarePen className="size-5 cursor-pointer text-primary hover:text-primary/70" />

                        <DeleteDialog
                            trigger={<Trash className="size-5 cursor-pointer text-destructive hover:text-destructive/70" />}
                            onDelete={() => {alert('Delete action triggered');} /* TODO: Implement delete action */}
                        />
                    </div>
                );
            },
        },
    ];

    const filterableColumns = [
        { value: 'product.name_and_number', label: 'Product' },
        { value: 'customer.name', label: 'Customer' },
        { value: 'status', label: 'Status' },
        { value: 'sale_number', label: 'ID' },
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

                    <ActionButtons onExport={exportSales} addHref="#" />
                </div>

                <div>
                    <DataTable columns={columns} data={data} filterableColumns={filterableColumns} sortableColumns={sortableColumns} />
                </div>
            </div>
        </AppLayout>
    );
}
