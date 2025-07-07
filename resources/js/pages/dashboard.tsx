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

            <div className="grid h-full gap-4 p-8 lg:grid-rows-4">
                <div className="flex flex-col gap-4 lg:row-span-1 2xl:flex-row">
                    <div className="flex size-full flex-col gap-4 lg:flex-row 2xl:flex-row">
                        <CardType1Prototype />
                        <CardType1Prototype />
                    </div>
                    <div className="flex size-full flex-col gap-4 lg:flex-row 2xl:flex-row">
                        <CardType1Prototype />
                        <CardType1Prototype />
                    </div>
                </div>

                <div className="row-span-2">
                    <div className="grid size-full grid-rows-2 gap-4 lg:grid-rows-4 2xl:grid-cols-4 2xl:grid-rows-2">
                        <div className="lg:row-span-3 2xl:col-span-3">
                            <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                        <div className="flex size-full flex-col gap-4 lg:flex-row 2xl:row-span-3 2xl:flex-col">
                            <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    </div>
                </div>

                <div className="row-span-1 flex flex-col gap-4 lg:flex-row">
                    <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}

function CardType1Prototype() {
    return (
        <Card className="min-w-0 size-full justify-center bg-gradient-to-bl from-sidebar via-secondary to-sidebar rounded-2xl shadow-lg transition-transform hover:scale-105 hover:shadow-2xl border-0">
            <CardContent className="p-8">
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-row items-baseline justify-between">
                        <span className="text-lg text-muted-foreground">Total revenue</span>
                        <Badge variant="secondary">
                            <TrendingUp /> +20%
                        </Badge>
                    </div>
                    <span className="text-4xl 2xl:text-2xl font-black break-all">Rp. 12.890.000.000,00</span>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col gap-y-1">
                    <span className="text-md text-muted-foreground flex flex-row gap-x-2">Trending up this month <TrendingUp /></span>
                    <span className="text-sm text-muted-foreground">Last month was $2.000.000,00</span>
                </div>
            </CardFooter>
        </Card>
    )
}
