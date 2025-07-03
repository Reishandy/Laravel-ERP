import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales',
        href: '/sales',
    },
];

export default function Sales() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />

        </AppLayout>
    );
}
