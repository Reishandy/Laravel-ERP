import { DataTable } from '@/components/data-table/data-table';
import Heading from '@/components/heading';
import PriceCell from '@/components/price-cell';
import TimestampCell from '@/components/timestamp-cell';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import AddSaleForm from '@/pages/sales/add-sale-form';
import DeleteSaleForm from '@/pages/sales/delete-sale-form';
import EditSaleForm from '@/pages/sales/edit-sale-form';
import { type BreadcrumbItem, Customer, Product, Sale } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Download, Plus, SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ChangeStatusForm from '@/pages/sales/change-status-form';

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
    flash: {
        success?: string;
        error?: string;
        description?: string;
        timestamp?: string;
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
    const { app, flash } = usePage<SalesPageProps>().props;

    const [selectedSale, setSelectedSale] = useState<Entry | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const openEditDialog = (sale: Entry) => {
        setSelectedSale(sale);
        setEditDialogOpen(true);
    };

    useEffect(() => {
        if (show) {
            router.visit('/sales', {
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
                const sale = row.original;

                return <ChangeStatusForm sale={sale} />;
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const sale = row.original;

                return (
                    <div className="flex flex-row items-center justify-center gap-x-2">
                        <SquarePen className="size-5 cursor-pointer text-primary hover:text-primary/70" onClick={() => openEditDialog(sale)} />
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

                {selectedSale && (
                    <EditSaleForm sale={selectedSale} products={products} customers={customers} open={editDialogOpen} setOpen={setEditDialogOpen} />
                )}
            </div>
        </AppLayout>
    );
}
