import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
                        <CardType1Prototype />
                        <CardType1Prototype />
                    </div>
                    <div className="flex w-full flex-col gap-4 lg:flex-row 2xl:flex-row">
                        <CardType1Prototype />
                        <CardType1Prototype />
                    </div>
                </div>

                <div className="row-span-3">
                    <div className="grid size-full grid-rows-2 gap-4 lg:grid-rows-4 2xl:grid-cols-4 2xl:grid-rows-2">
                        <div className="lg:row-span-3 2xl:col-span-3">
                            <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                        <div className="flex size-full flex-col gap-4 lg:flex-row 2xl:row-span-3 2xl:flex-col">
                            <CardType2Prototype />
                            <CardType2Prototype />
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

function CardType1Prototype() {
    return (
        // border-0 bg-gradient-to-bl from-sidebar via-secondary to-sidebar
        <Card className="h-fit w-full justify-center rounded-2xl bg-sidebar shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <CardContent className="p-8">
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-row items-baseline justify-between">
                        <span className="text-lg text-muted-foreground">Total revenue</span>
                        <Badge variant="secondary">
                            <TrendingUp /> +20%
                        </Badge>
                    </div>
                    <span className="text-4xl font-black break-all 2xl:text-2xl">Rp. 12.890.000.000,00</span>
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

function CardType2Prototype() {
    return (
        <Card className="size-full justify-center rounded-2xl border-0 bg-sidebar shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <CardContent className="p-8">
                <div className="flex flex-col gap-y-6">
                    <div className="flex flex-col items-center gap-2">
                        <TrendingUp className="text-primary" size={32} />
                        <span className="text-center text-xl font-bold">Top Product Sales This Month</span>
                    </div>
                    <Table>
                        <TableCaption>Most sold products in June 2024</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">ID</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-end">Sold</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="transition hover:bg-secondary/30">
                                <TableCell className="text-center font-semibold">P-01234</TableCell>
                                <TableCell>
                                    Washing Machine{' '}
                                    <Badge className="ml-2" variant="default">
                                        Top
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-end font-bold">20</TableCell>
                            </TableRow>
                            <TableRow className="transition hover:bg-secondary/30">
                                <TableCell className="text-center font-semibold">P-05678</TableCell>
                                <TableCell>Refrigerator</TableCell>
                                <TableCell className="text-end font-bold">15</TableCell>
                            </TableRow>
                            <TableRow className="transition hover:bg-secondary/30">
                                <TableCell className="text-center font-semibold">P-09876</TableCell>
                                <TableCell>Microwave</TableCell>
                                <TableCell className="text-end font-bold">10</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
