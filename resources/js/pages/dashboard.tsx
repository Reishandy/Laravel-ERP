import { Chart, ChartCard } from '@/components/dashboard/chart-card';
import DataTableCard from '@/components/dashboard/data-table-card';
import HighlightCard from '@/components/dashboard/highlight-card';
import TopCard from '@/components/dashboard/top-card';
import { DataTable } from '@/components/data-table/data-table';
import PriceCell from '@/components/price-cell';
import TimestampCell from '@/components/timestamp-cell';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useInitials } from '@/hooks/use-initials';
import { useMediaQuery } from '@/hooks/use-media-query';
import AppLayout from '@/layouts/app-layout';
import { Entry } from '@/pages/sales';
import { type BreadcrumbItem, Product } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { VariantProps } from 'class-variance-authority';
import { AlertCircle, DollarSign, Package, User } from 'lucide-react';

interface Highlight {
    current: number;
    previous: number;
    trend: string;
    trend_direction: 'up' | 'down';
}

interface TopItem {
    id: string;
    name: string;
    value: number | string;
    link: string;
}

interface DashboardProps {
    app: {
        locale: string;
        currency: string;
        timezone: string;
    };
    sales: Entry[];
    products: Product[];
    revenue: Highlight;
    sales_count: Highlight;
    customers_count: Highlight;
    products_count: Highlight;
    top_products: {
        date: string;
        items: TopItem[];
    };
    top_customers: {
        date: string;
        items: TopItem[];
    };
    chart_data: Chart[];

    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    sales,
    products,
    revenue,
    sales_count,
    customers_count,
    products_count,
    top_products,
    top_customers,
    chart_data,
}: DashboardProps) {
    const { app } = usePage<DashboardProps>().props;
    const getInitials = useInitials();
    const shouldReduce = useMediaQuery('(max-width: 850px)');

    const currencyFormatter = (value: number): string => {
        return new Intl.NumberFormat(app.locale, {
            style: 'currency',
            currency: app.currency,
        }).format(value);
    };

    const productsColumns: ColumnDef<Product>[] = [
        {
            id: 'product_number',
            accessorKey: 'product_number',
            header: () => <div className="text-center">ID</div>,
            cell: ({ row }) => {
                const product_number: string = row.getValue('product_number');

                return (
                    <div className="text-center">
                        <Button variant="link" asChild>
                            <Link href={route('products.show', product_number)}>{product_number}</Link>
                        </Button>
                    </div>
                );
            },
        },
        {
            id: 'name',
            accessorKey: 'name',
            header: () => <div className="pl-4 text-start">Product</div>,
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <div className="flex flex-row items-center justify-start gap-x-2 pl-4">
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
            id: 'quantity',
            accessorKey: 'quantity',
            header: () => <div className="mr-4 text-center">Quantity</div>,
            cell: ({ row }) => {
                const quantity: number = row.getValue('quantity');
                const getVariantByQuantity = (quantity: number): VariantProps<typeof badgeVariants>['variant'] => {
                    if (quantity <= 5) return 'destructive';
                    if (quantity <= 20) return 'secondary';
                    return 'outline';
                };

                return (
                    <div className="mr-4 flex flex-row items-center justify-end gap-x-2">
                        <Badge variant={getVariantByQuantity(quantity)} className="text-md w-full font-bold">
                            {quantity}
                        </Badge>
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
    ];

    const salesColumns: ColumnDef<Entry>[] = [
        {
            id: 'sale_number',
            accessorKey: 'sale_number',
            header: () => <div className="text-center">ID</div>,
            cell: ({ row }) => {
                const sale_number: string = row.getValue('sale_number');

                return (
                    <div className="text-center">
                        <Button variant="link" asChild>
                            <Link href={route('sales.show', sale_number)}>{sale_number}</Link>
                        </Button>
                    </div>
                );
            },
        },
        {
            id: 'product.name',
            accessorKey: 'product.name',
            header: () => <div className="pl-4 text-start">Product</div>,
            cell: ({ row }) => {
                const product = row.original.product;
                return (
                    <div className="flex flex-row items-center justify-start gap-x-2 pl-4">
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
            id: 'customer.name',
            accessorKey: 'customer.name',
            header: () => <div className="pl-4 text-left">Customer</div>,
            cell: ({ row }) => {
                return <div className="text-start font-medium">{row.getValue('customer.name')}</div>;
            },
        },
        {
            id: 'total_price',
            accessorKey: 'total_price',
            header: () => <div className="text-center">Total</div>,
            cell: ({ row }) => {
                const price_at_sale = row.original.price_at_sale;
                const current_price = row.original.product.price;
                const quantity: number = row.original.quantity;
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
    ];

    const reducedProductsColumns = productsColumns.filter((column) => column.id !== 'updated_at');

    const reducedSalesColumns = salesColumns.filter((column) => column.id !== 'created_at' && column.id !== 'customer.name');
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="grid-auto-rows grid h-full gap-4 p-4">
                <div className="row-span-1 flex h-fit flex-col gap-4 lg:row-span-1 2xl:flex-row">
                    <div className="flex w-full flex-col gap-4 lg:flex-row 2xl:flex-row">
                        <HighlightCard
                            title="Total revenue this month"
                            value={currencyFormatter(revenue.current)}
                            trend={revenue.trend}
                            trendDirection={revenue.trend_direction}
                            description={`Trending ${revenue.trend_direction} this month`}
                            comparisonText={`Last month was ${currencyFormatter(revenue.previous)}`}
                        />
                        <HighlightCard
                            title="Total sales this month"
                            value={sales_count.current}
                            trend={sales_count.trend}
                            trendDirection={sales_count.trend_direction}
                            description={`Trending ${sales_count.trend_direction} this month`}
                            comparisonText={`Last month was ${sales_count.previous}`}
                        />
                    </div>

                    <div className="flex w-full flex-col gap-4 lg:flex-row 2xl:flex-row">
                        <HighlightCard
                            title="New customers this month"
                            value={customers_count.current}
                            trend={customers_count.trend}
                            trendDirection={customers_count.trend_direction}
                            description={`Trending ${customers_count.trend_direction} this month`}
                            comparisonText={`Last month was ${customers_count.previous}`}
                        />
                        <HighlightCard
                            title="New products this month"
                            value={products_count.current}
                            trend={products_count.trend}
                            trendDirection={products_count.trend_direction}
                            description={`Trending ${products_count.trend_direction} this month`}
                            comparisonText={`Last month was ${products_count.previous}`}
                        />
                    </div>
                </div>

                <div className="row-span-1 2xl:row-span-2">
                    <div className="grid size-full grid-rows-2 gap-4 lg:grid-rows-3 2xl:grid-cols-4 2xl:grid-rows-2">
                        <div className="lg:row-span-2 2xl:col-span-3 2xl:row-span-3">
                            <ChartCard chart_data={chart_data} />
                        </div>
                        <div className="flex size-full flex-col gap-4 lg:flex-row 2xl:row-span-3 2xl:flex-col">
                            <TopCard
                                title="Top Product Sales This Month"
                                caption={`Most sold products in ${top_products.date}`}
                                nameLabel="Product"
                                valueLabel="Sold"
                                items={top_products.items.map((item) => ({
                                    ...item,
                                    link: `/products/${item.id}`,
                                }))}
                                icon={Package}
                            />
                            <TopCard
                                title="Top Customers This Month"
                                caption={`Most active customers in ${top_customers.date}`}
                                nameLabel="Customer"
                                valueLabel="Purchases"
                                items={top_customers.items.map((item) => ({
                                    ...item,
                                    link: `/customers/${item.id}`,
                                }))}
                                icon={User}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 2xl:row-span-1 2xl:flex-row">
                    <DataTableCard
                        icon={<AlertCircle className="h-5 w-5 text-destructive" />}
                        title="Low Stock Alert"
                        description="Products with 5 or fewer items in inventory"
                        bgClass="bg-destructive/50"
                    >
                        <DataTable
                            columns={shouldReduce ? reducedProductsColumns : productsColumns}
                            data={products.filter((product) => product.quantity <= 5)}
                            useFilter={false}
                            usePagination={false}
                        />
                    </DataTableCard>
                    <DataTableCard
                        icon={<DollarSign className="h-5 w-5 text-primary" />}
                        title="Latest Sales"
                        description="Most recent transactions"
                        bgClass="bg-sidebar"
                    >
                        <DataTable columns={shouldReduce ? reducedSalesColumns : salesColumns} data={sales} useFilter={false} usePagination={false} />
                    </DataTableCard>
                </div>
            </div>
        </AppLayout>
    );
}
