import { DataTable } from '@/components/data-table/data-table';
import Heading from '@/components/heading';
import TimestampCell from '@/components/timestamp-cell';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import AddCustomerForm from '@/pages/customers/add-customer-form';
import DeleteCustomerForm from '@/pages/customers/delete-customer-form';
import { type BreadcrumbItem, Customer } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { VariantProps } from 'class-variance-authority';
import { Download, Plus, SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditCustomerForm from './edit-customer-form';
import { toast } from 'sonner';

interface CustomersPageProps {
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
    }
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
    const { app, flash } = usePage<CustomersPageProps>().props;
    const getInitials = useInitials();

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const openEditDialog = (customer: Customer) => {
        setSelectedCustomer(customer);
        setEditDialogOpen(true);
    };

    useEffect(() => {
        if (show) {
            router.visit('/customers', {
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
                const customer = row.original;
                return (
                    <div className="flex flex-row items-center gap-x-2">
                        <Avatar className="h-8 w-8 overflow-hidden">
                            <AvatarImage src={customer.avatar? `/storage/${customer.avatar}` : undefined} alt={customer.name} />
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(customer.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-start font-medium">{customer.name}</div>
                    </div>
                );
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
                const customer = row.original;

                return (
                    <div className="flex flex-row items-center justify-center gap-x-2">
                        <SquarePen className="size-5 cursor-pointer text-primary hover:text-primary/70" onClick={() => openEditDialog(customer)} />
                        <DeleteCustomerForm customer={customer} />
                    </div>
                );
            },
        },
    ];

    const sortableColumns = [
        { value: 'customer_number', label: 'ID' },
        { value: 'name', label: 'Customer Name' },
        { value: 'email', label: 'Contact' },
        { value: 'type', label: 'Type' },
        { value: 'updated_at', label: 'Last Updated' },
        { value: 'actions', label: 'Actions' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />

            <div className="m-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                    <Heading title="Customers" description="Manage your customers and their details." />

                    <div className="flex flex-row items-center gap-x-4 sm:justify-center">
                        <AddCustomerForm>
                            <Button className="flex items-center gap-x-2">
                                <Plus className="size-5" />
                                Add New
                            </Button>
                        </AddCustomerForm>

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
                    <DataTable columns={columns} data={customers} sortableColumns={sortableColumns} show={show} />
                </div>

                {selectedCustomer && <EditCustomerForm customer={selectedCustomer} open={editDialogOpen} setOpen={setEditDialogOpen} />}
            </div>
        </AppLayout>
    );
}
