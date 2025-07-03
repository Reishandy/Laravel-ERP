import Heading from '@/components/heading';
import ActionButtons from '@/components/heading-button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales',
        href: '/sales',
    },
];

const exportSalesToPDF = () => {
    // TODO: maybe just use form and handle it via PHP
    // TODO: dont forget success feedback
}

export default function Sales() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />

            <div className="m-8">
                <div className="flex flex-row items-center justify-between mb-8">
                    <Heading title="Sales" description="Manage your sales transactions and records." />

                    <ActionButtons onExport={exportSalesToPDF} addHref="#" />
                </div>
            </div>
        </AppLayout>
    );
}
