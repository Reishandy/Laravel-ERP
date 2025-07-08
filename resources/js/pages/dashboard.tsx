import DataTableCard from '@/components/dashboard/data-table-card';
import HighlightCard from '@/components/dashboard/highlight-card';
import TopCard from '@/components/dashboard/top-card';
import { DataTable } from '@/components/data-table/data-table';
import PriceCell from '@/components/price-cell';
import TimestampCell from '@/components/timestamp-cell';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import { useMediaQuery } from '@/hooks/use-media-query';
import AppLayout from '@/layouts/app-layout';
import { Entry } from '@/pages/sales';
import { type BreadcrumbItem, Product } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { VariantProps } from 'class-variance-authority';
import { AlertCircle, DollarSign, TrendingUp } from 'lucide-react';

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

    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ sales, products }: DashboardProps) {
    const { app } = usePage<DashboardProps>().props;
    const getInitials = useInitials();
    const shouldReduce = useMediaQuery('(max-width: 850px)');
    const isBareMinimum = useMediaQuery('(max-width: 490px)');

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
                        {!isBareMinimum && (
                            <Avatar className="h-8 w-8 overflow-hidden">
                                <AvatarImage src={product.image ? `/storage/${product.image}` : undefined} alt={product.name} />
                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                    {getInitials(product.name)}
                                </AvatarFallback>
                            </Avatar>
                        )}
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
                        {!isBareMinimum && (
                            <Avatar className="h-8 w-8 overflow-hidden">
                                <AvatarImage src={product.image ? `/storage/${product.image}` : undefined} alt={product.name} />
                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                    {getInitials(product.name)}
                                </AvatarFallback>
                            </Avatar>
                        )}
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

    const bareMinimumProductsColumns = reducedProductsColumns.filter((column) => column.id !== 'product_number');

    const bareMinimumSalesColumns = reducedSalesColumns.filter((column) => column.id !== 'sale_number');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="grid h-full gap-4 p-4 grid-auto-rows">
                <div className="row-span-1 flex h-fit flex-col gap-4 lg:row-span-1 2xl:flex-row">
                    <div className="flex w-full flex-col gap-4 lg:flex-row 2xl:flex-row">
                        <HighlightCard
                            title="Total revenue"
                            value="$54.000,00"
                            trend="+20%"
                            trendDirection="up"
                            description="Trending up this month"
                            comparisonText="Last month was $45.000,00"
                            valueSize="lg" // TODO: Check if the value exceeds 8 letters, then use 'sm' size
                        />
                        <HighlightCard
                            title="Total sales"
                            value="300"
                            trend="+20%"
                            trendDirection="up"
                            description="Trending up this month"
                            comparisonText="Last month was 250"
                            valueSize="lg"
                        />
                    </div>

                    <div className="flex w-full flex-col gap-4 lg:flex-row 2xl:flex-row">
                        <HighlightCard
                            title="Total customers"
                            value="120"
                            trend="+10%"
                            trendDirection="up"
                            description="Increasing this month"
                            comparisonText="Last month was 110"
                            valueSize="lg"
                        />
                        <HighlightCard
                            title="Total products"
                            value="90"
                            trend="-10%"
                            trendDirection="down"
                            description="Decreasing this month"
                            comparisonText="Last month was 100"
                            valueSize="lg"
                        />
                    </div>
                </div>

                <div className="row-span-1 2xl:row-span-2">
                    <div className="grid size-full grid-rows-2 gap-4 lg:grid-rows-3 2xl:grid-cols-4 2xl:grid-rows-2">
                        <div className="lg:row-span-2 2xl:col-span-3 2xl:row-span-3">
                            <CardType3Prototype />
                        </div>
                        <div className="flex size-full flex-col gap-4 lg:flex-row 2xl:row-span-3 2xl:flex-col">
                            <TopCard
                                title="Top Product Sales This Month"
                                caption="Most sold products in June 2024"
                                items={[
                                    {
                                        id: 'P-01234',
                                        name: 'Washing Machine',
                                        value: 20,
                                        link: '/products/C-00001',
                                    },
                                    { id: 'P-05678', name: 'Refrigerator', value: 15, link: '/products/C-00001' },
                                    { id: 'P-09876', name: 'Microwave', value: 10, link: '/products/C-00001' },
                                ]}
                            />
                            <TopCard
                                title="Top Customers This Month"
                                caption="Most active customers in June 2024"
                                nameLabel="Customer"
                                valueLabel="Total"
                                items={[
                                    {
                                        id: 'C-00001',
                                        name: 'John Doe',
                                        value: 5,
                                        link: '/customers/C-00001',
                                    },
                                    { id: 'C-00002', name: 'Jane Smith', value: 3, link: '/customers/C-00002' },
                                    { id: 'C-00003', name: 'Alice Johnson', value: 2, link: '/customers/C-00003' },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 2xl:row-span-1 2xl:flex-row">
                    <DataTableCard
                        icon={<DollarSign className="h-5 w-5 text-primary" />}
                        title="Latest Sales"
                        description="Most recent transactions"
                        borderClass="border-primary/20"
                        bgClass="bg-primary/5 dark:bg-primary/10"
                    >
                        <DataTable
                            columns={isBareMinimum ? bareMinimumSalesColumns : shouldReduce ? reducedSalesColumns : salesColumns}
                            data={sales}
                            useFilter={false}
                            usePagination={false}
                        />
                    </DataTableCard>

                    <DataTableCard
                        icon={<AlertCircle className="h-5 w-5 text-destructive" />}
                        title="Lowest Stock Products"
                        description="Products with 5 or fewer items in inventory"
                        borderClass="border-destructive/20"
                        bgClass="bg-destructive/5 dark:bg-destructive/10"
                    >
                        <DataTable
                            columns={isBareMinimum ? bareMinimumProductsColumns : shouldReduce ? reducedProductsColumns : productsColumns}
                            data={products.filter((product) => product.quantity <= 5)}
                            useFilter={false}
                            usePagination={false}
                        />
                    </DataTableCard>
                </div>
            </div>
        </AppLayout>
    );
}

function CardType3Prototype() {
    return (
        // border-0 bg-gradient-to-bl from-sidebar via-secondary to-sidebar
        <Card className="size-full min-w-0 justify-center rounded-2xl bg-sidebar shadow-lg transition-transform hover:shadow-2xl">
            <CardContent className="p-8">
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-row items-baseline justify-between">
                        <span className="text-lg text-muted-foreground">Total revenue</span>
                        <Badge variant="secondary">
                            <TrendingUp /> +20%
                        </Badge>
                    </div>
                    <span className="text-3xl font-black break-all 2xl:text-2xl">Rp. 12.890.000.000,00</span>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col gap-y-1">
                    <span className="text-md flex flex-row gap-x-2 text-muted-foreground">
                        Trending up this month <TrendingUp />
                    </span>
                    <span className="text-sm text-muted-foreground">Last month was $2.000.000,00</span>
                </div>
            </CardFooter>
        </Card>
    );
}
