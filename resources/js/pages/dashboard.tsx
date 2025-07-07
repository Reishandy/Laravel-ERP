import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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

            <div className="grid h-full gap-4 p-8 sm:grid-rows-4">
                <div className="flex size-full flex-col gap-4 sm:row-span-1 xl:flex-row">
                    <div className="flex size-full flex-col gap-4 sm:flex-row xl:flex-row">
                        <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="flex size-full flex-col gap-4 sm:flex-row xl:flex-row">
                        <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="row-span-2">
                    <div className="grid size-full grid-rows-2 gap-4 sm:grid-rows-4 xl:grid-cols-4 xl:grid-rows-2">
                        <div className="flex size-full flex-col gap-4 sm:flex-row xl:row-span-3 xl:flex-col">
                            <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                        <div className="sm:row-span-3 xl:col-span-3">
                            <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    </div>
                </div>
                <div className="row-span-1 flex flex-col gap-4 sm:flex-row">
                    <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
