import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import ActionButtons from '@/components/heading-button';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Customer, Product, Sale } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { VariantProps } from 'class-variance-authority';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales',
        href: '/sales',
    },
];

const exportSalesToPDF = () => {
    // TODO: maybe just use form and handle it via PHP
    // TODO: dont forget success feedback
};

// TODO: Replace with actual data
const data: Entry[] = [
    {
        id: 1,
        sale_number: 'S-0001',
        product_id: 101,
        customer_id: 201,
        quantity: 2,
        price_at_sale: 100000,
        total: 200000,
        status: 'success',
        product: {
            id: 101,
            product_number: 'P-0001',
            user_id: '1',
            name: 'Wireless Headphones',
            description: 'High-quality wireless headphones with noise cancellation',
            price: 100000,
            stock: 15,
            created_at: '2024-01-10T10:00:00Z',
            updated_at: '2024-01-15T14:30:00Z',
        },
        customer: {
            id: 201,
            customer_number: 'C-0001',
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
        sale_number: 'S-0002',
        product_id: 102,
        customer_id: 202,
        quantity: 5,
        price_at_sale: 30000,
        total: 150000,
        status: 'processing',
        product: {
            id: 102,
            product_number: 'P-0002',
            user_id: '1',
            name: 'USB Cable',
            description: 'Premium USB-C charging cable',
            price: 30000,
            stock: 50,
            created_at: '2024-01-08T11:20:00Z',
            updated_at: '2024-01-12T16:45:00Z',
        },
        customer: {
            id: 202,
            customer_number: 'C-0002',
            user_id: 1,
            name: 'Tech Solutions Inc',
            email: 'orders@techsolutions.com',
            type: 'company',
            company: 'Tech Solutions Inc',
            created_at: '2024-01-03T08:30:00Z',
            updated_at: '2024-01-18T10:15:00Z',
        },
        created_at: '2024-01-21T09:45:00Z',
        updated_at: '2024-01-21T11:20:00Z',
    },
    {
        id: 3,
        sale_number: 'S-0003',
        product_id: 103,
        customer_id: 203,
        quantity: 1,
        price_at_sale: 350000,
        total: 350000,
        status: 'pending',
        product: {
            id: 103,
            product_number: 'P-0003',
            user_id: '1',
            name: 'Smart Watch',
            description: 'Fitness tracking smartwatch with heart rate monitor',
            price: 350000,
            stock: 8,
            created_at: '2024-01-12T14:00:00Z',
            updated_at: '2024-01-19T12:30:00Z',
        },
        customer: {
            id: 203,
            customer_number: 'C-0003',
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
        sale_number: 'S-0004',
        product_id: 104,
        customer_id: 204,
        quantity: 3,
        price_at_sale: 270000,
        total: 810000,
        status: 'failed',
        product: {
            id: 104,
            product_number: 'P-0004',
            user_id: '1',
            name: 'Bluetooth Speaker',
            description: 'Portable wireless speaker with deep bass',
            price: 270000,
            stock: 12,
            created_at: '2024-01-09T16:30:00Z',
            updated_at: '2024-01-14T09:45:00Z',
        },
        customer: {
            id: 204,
            customer_number: 'C-0004',
            user_id: 1,
            name: 'Global Retail Corp',
            email: 'purchasing@globalretail.com',
            type: 'company',
            company: 'Global Retail Corp',
            created_at: '2024-01-01T10:00:00Z',
            updated_at: '2024-01-20T15:30:00Z',
        },
        created_at: '2024-01-23T11:00:00Z',
        updated_at: '2024-01-23T11:00:00Z',
    },
];

interface Entry extends Sale {
    product: Product
    customer: Customer
}


interface PageProps {
    app: {
        locale: string;
        currency: string;
    };

    [key: string]: unknown;
}

export default function Sales() {
    const { app } = usePage<PageProps>().props;

    const columns: ColumnDef<Sale>[] = [
        {
            accessorKey: 'sale_number',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Sale ID
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'product',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Product
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const product: Product = row.getValue('product');
                return <Button variant="link" asChild>
                    <Link href="#">{product.product_number} - {product.name}</Link>
                </Button>;
            },
        },
        {
            accessorKey: 'quantity',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Quantity
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return <div className="text-center">{row.getValue('quantity')}</div>;
            },
        },
        {
            accessorKey: 'total',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Total
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const total = parseFloat(row.getValue('total'));
                const formatted = new Intl.NumberFormat(app.locale, {
                    style: 'currency',
                    currency: app.currency,
                }).format(total);

                return <div className="text-center font-medium">{formatted}</div>;
            },
        },
        {
            accessorKey: 'status',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Status
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const status: "pending" | "processing" | "success" | "failed" = row.getValue("status");
                const variantMap: Record<Sale['status'], VariantProps<typeof badgeVariants>['variant']> = {
                    pending: 'outline',
                    processing: 'secondary',
                    success: 'default',
                    failed: 'destructive',
                };

                return (
                    <div className="flex flex-row items-center justify-start gap-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel><span className="font-bold">Change status</span></DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {/* TODO: proper button and icon*/}
                                <DropdownMenuItem>Pending</DropdownMenuItem>
                                <DropdownMenuItem>Processing</DropdownMenuItem>
                                <DropdownMenuItem>Success</DropdownMenuItem>
                                <DropdownMenuItem>Failed</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Badge variant={variantMap[status]} className="capitalize">
                            {status}
                        </Badge>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            cell: () => {
                return (
                    <div className="flex flex-row items-center justify-center gap-x-2">
                        {/* TODO: proper button icon*/}
                        {/* TODO: details will contain all stuff like customer, price at sale, etc*/}
                        <Button>Details</Button>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />

            <div className="m-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                    <Heading title="Sales" description="Manage your sales transactions and records." />

                    <ActionButtons onExport={exportSalesToPDF} addHref="#" />
                </div>

                <div>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </AppLayout>
    );
}
