import { DataTable } from '@/components/data-table/data-table';
import { DeleteDialog } from '@/components/dialog/delete-dialog';
import Heading from '@/components/heading';
import ActionButtons from '@/components/heading-button';
import { Badge, badgeVariants } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Customer } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Info, SquarePen, Trash } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';

interface CustomersPageProps {
    app: {
        locale: string;
        currency: string;
    };
    customers: Customer[];
    show?: string;

    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/customers',
    },
];

export default function Customers({ customers, show }: CustomersPageProps) {
    const columns: ColumnDef<Customer>[] = [
        {
            id: 'customer_number',
            accessorKey: 'customer_number',
            header: () => <div className="text-center">ID</div>,
            cell: ({ row }) => {
                return <div className="text-center">{row.getValue('customer_number')}</div>;
            },
        },
        {
            id: 'name',
            accessorKey: 'name',
            header: () => <div className="text-start">Customer Name</div>,
            cell: ({ row }) => {
                return <div className="text-start font-medium">{row.getValue('name')}</div>;
            },
        },
        {
            id: 'email',
            accessorKey: 'email',
            header: () => <div className="text-start">Contact</div>,
            cell: ({ row }) => {
                return <div className="text-start font-medium">{row.getValue('email')}</div>;
            },
        },
        {
            id: 'type',
            accessorKey: 'type',
            header: () => <div className="text-center">Type</div>,
            cell: ({ row }) => {
                const type: 'individual' | 'business' = row.getValue('type');
                const variantMap: Record<Customer['type'], VariantProps<typeof badgeVariants>['variant']> = {
                    individual: 'secondary',
                    business: 'default',
                };

                return (
                    <div className="flex flex-row items-center justify-end gap-x-2">
                        <div className="w-full">
                            <Badge variant={variantMap[type]} className="text-md w-full font-medium capitalize">
                                {type}
                            </Badge>
                        </div>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            cell: () => {
                return (
                    <div className="flex flex-row items-center justify-center gap-x-2">
                        <SquarePen className="size-5 cursor-pointer text-primary hover:text-primary/70" />
                        <DeleteDialog
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
        { value: 'customer_number', label: 'ID' },
        { value: 'name', label: 'Customer Name' },
        { value: 'price', label: 'Price' },
        { value: 'quantity', label: 'Quantity' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />

            <div className="m-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                    <Heading title="Customers" description="Manage your customers and their details." />

                    <ActionButtons
                        onExport={() => {
                            /*TODO*/
                        }}
                        addHref="#"
                    />
                </div>

                <div>
                    <DataTable columns={columns} data={customers} sortableColumns={sortableColumns} show={show} />
                </div>
            </div>
        </AppLayout>
    );
}
