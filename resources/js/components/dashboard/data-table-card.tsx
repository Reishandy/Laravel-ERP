import { ReactNode } from 'react';

interface DataTableCardProps {
    icon: ReactNode;
    title: string;
    description?: string;
    borderClass?: string;
    bgClass?: string;
    children: ReactNode;
}

export default function DataTableCard({
    icon,
    title,
    description,
    borderClass = 'border-primary/20',
    bgClass = 'bg-primary/5 dark:bg-primary/10',
    children,
}: DataTableCardProps) {
    return (
        <div className={`flex size-full flex-col rounded-2xl border ${borderClass} ${bgClass} p-6`}>
            <div className="mb-4 flex items-center justify-center gap-2">
                {icon}
                <h3 className="text-xl font-bold tracking-tight">{title}</h3>
            </div>
            {description && <div className="mb-4 text-center text-sm text-muted-foreground">{description}</div>}
            <div className="rounded-lg bg-background/80 p-2 backdrop-blur-sm">{children}</div>
        </div>
    );
}
