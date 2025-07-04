import Heading from '@/components/heading';
import ActionButtons from '@/components/heading-button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Sale } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales',
        href: '/sales',
    },
];

export const columns: ColumnDef<Sale>[] = [
    {
        accessorKey: "product.name",
        header: "Product",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "price_at_sale",
        header: "Price at Sale",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "customer.name",
        header: "Customer",
    },
    {
        accessorKey: "customer.email",
        header: "Contact",
    },
]
const exportSalesToPDF = () => {
    // TODO: maybe just use form and handle it via PHP
    // TODO: dont forget success feedback
}

// TODO: Replace with actual data
const sales: Sale[] = [
    {
        id: 1,
        product_id: 101,
        customer_id: 201,
        quantity: 2,
        price_at_sale: 29.99,
        status: "success",
        product: {
            id: 101,
            name: "Wireless Headphones",
            description: "High-quality wireless headphones with noise cancellation",
            price: 29.99,
            stock: 15,
            created_at: "2024-01-10T10:00:00Z",
            updated_at: "2024-01-15T14:30:00Z"
        },
        customer: {
            id: 201,
            name: "John Doe",
            email: "john.doe@example.com",
            type: "individual",
            created_at: "2024-01-05T09:15:00Z",
            updated_at: "2024-01-05T09:15:00Z"
        },
        created_at: "2024-01-20T15:30:00Z",
        updated_at: "2024-01-20T15:30:00Z"
    },
    {
        id: 2,
        product_id: 102,
        customer_id: 202,
        quantity: 5,
        price_at_sale: 15.50,
        status: "processing",
        product: {
            id: 102,
            name: "USB Cable",
            description: "Premium USB-C charging cable",
            price: 15.50,
            stock: 50,
            created_at: "2024-01-08T11:20:00Z",
            updated_at: "2024-01-12T16:45:00Z"
        },
        customer: {
            id: 202,
            name: "Tech Solutions Inc",
            email: "orders@techsolutions.com",
            type: "company",
            company: "Tech Solutions Inc",
            created_at: "2024-01-03T08:30:00Z",
            updated_at: "2024-01-18T10:15:00Z"
        },
        created_at: "2024-01-21T09:45:00Z",
        updated_at: "2024-01-21T11:20:00Z"
    },
    {
        id: 3,
        product_id: 103,
        customer_id: 203,
        quantity: 1,
        price_at_sale: 89.99,
        status: "pending",
        product: {
            id: 103,
            name: "Smart Watch",
            description: "Fitness tracking smartwatch with heart rate monitor",
            price: 89.99,
            stock: 8,
            created_at: "2024-01-12T14:00:00Z",
            updated_at: "2024-01-19T12:30:00Z"
        },
        customer: {
            id: 203,
            name: "Sarah Johnson",
            email: "sarah.johnson@gmail.com",
            type: "individual",
            created_at: "2024-01-15T13:20:00Z",
            updated_at: "2024-01-15T13:20:00Z"
        },
        created_at: "2024-01-22T14:15:00Z",
        updated_at: "2024-01-22T14:15:00Z"
    },
    {
        id: 4,
        product_id: 104,
        customer_id: 204,
        quantity: 3,
        price_at_sale: 45.00,
        status: "failed",
        product: {
            id: 104,
            name: "Bluetooth Speaker",
            description: "Portable wireless speaker with deep bass",
            price: 45.00,
            stock: 12,
            created_at: "2024-01-09T16:30:00Z",
            updated_at: "2024-01-14T09:45:00Z"
        },
        customer: {
            id: 204,
            name: "Global Retail Corp",
            email: "purchasing@globalretail.com",
            type: "company",
            company: "Global Retail Corp",
            created_at: "2024-01-01T10:00:00Z",
            updated_at: "2024-01-20T15:30:00Z"
        },
        created_at: "2024-01-23T11:00:00Z",
        updated_at: "2024-01-23T11:00:00Z"
    }
];

export default function Sales() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />

            <div className="m-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8">
                    <Heading title="Sales" description="Manage your sales transactions and records." />

                    <ActionButtons onExport={exportSalesToPDF} addHref="#" />
                </div>

                <div>

                </div>
            </div>
        </AppLayout>
    );
}
