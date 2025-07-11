import { ReactNode } from 'react';

interface DataTableCardProps {
    icon: ReactNode;
    title: string;
    description?: string;
    bgClass?: string;
    children: ReactNode;
}

export default function DataTableCard({ icon, title, description, bgClass = 'bg-sidebar', children }: DataTableCardProps) {
    return (
        <div
            style={{ maxWidth: 'calc(100vw - 40px)' }}
            className={`flex size-full flex-col rounded-2xl ${bgClass} p-6 duration-300 hover:scale-103 hover:shadow-2xl`}
        >
            <div className="mb-4 flex items-center justify-center gap-2">
                {icon}
                <h3 className="text-xl font-bold tracking-tight">{title}</h3>
            </div>
            {description && <div className="mb-4 text-center text-sm text-muted-foreground">{description}</div>}
            <div className="rounded-lg bg-background p-2 backdrop-blur-sm">{children}</div>
        </div>
    );
}
