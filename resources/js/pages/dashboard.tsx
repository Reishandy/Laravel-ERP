import HighlightCard from '@/components/dashboard/highlight-card';
import TopCard from '@/components/dashboard/top-card';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="grid h-full gap-4 p-8 lg:grid-rows-5">
                <div className="row-span-1 flex flex-col gap-4 lg:row-span-1 2xl:flex-row">
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

                <div className="row-span-3">
                    <div className="grid size-full grid-rows-2 gap-4 lg:grid-rows-3 2xl:grid-cols-4 2xl:grid-rows-2">
                        <div className="lg:row-span-2 2xl:col-span-3 2xl:row-span-3">
                            <CardType3Prototype />
                        </div>
                        <div className="flex size-full flex-col gap-4 lg:flex-row 2xl:row-span-3 2xl:flex-col">
                            <TopCard
                                title="Top Product Sales This Month"
                                caption="Most sold products in June 2024"
                                items={[
                                    { id: 'P-01234', name: 'Washing Machine', badge: { text: 'Top' }, value: 20 },
                                    { id: 'P-05678', name: 'Refrigerator', value: 15 },
                                    { id: 'P-09876', name: 'Microwave', value: 10 },
                                ]}
                            />
                            <TopCard
                                title="Top Customers This Month"
                                caption="Most active customers in June 2024"
                                items={[
                                    { id: 'C-001', name: 'John Doe', badge: { text: 'Top' }, value: 5 },
                                    { id: 'C-002', name: 'Jane Smith', value: 3 },
                                    { id: 'C-003', name: 'Alice Johnson', value: 2 },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <div className="row-span-2 flex flex-col gap-4 lg:flex-row">
                    <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
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
