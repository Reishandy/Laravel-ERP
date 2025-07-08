import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LucideIcon, TrendingUp } from 'lucide-react';
import { router } from '@inertiajs/react';

interface TopCardItem {
    id: string;
    name: string;
    badge?: {
        text: string;
        variant?: 'default' | 'destructive' | 'outline' | 'secondary';
    };
    value: string | number;
    link: string;
}

interface TopCardProps {
    title: string;
    caption?: string;
    items: TopCardItem[];
    icon?: LucideIcon;
    idLabel?: string;
    nameLabel?: string;
    valueLabel?: string;
}

export default function TopCard({
    title,
    caption,
    items,
    icon: Icon = TrendingUp,
    idLabel = 'ID',
    nameLabel = 'Product',
    valueLabel = 'Sold',
}: TopCardProps) {
    return (
        <Card className="size-full min-w-0 justify-center rounded-2xl border-0 bg-sidebar shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <CardContent className="p-8">
                <div className="flex flex-col gap-y-6">
                    <div className="flex flex-col items-center gap-2">
                        <Icon className="text-primary" size={24} />
                        <span className="text-center text-lg font-bold">{title}</span>
                    </div>
                    <Table>
                        {caption && <TableCaption>{caption}</TableCaption>}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">{idLabel}</TableHead>
                                <TableHead>{nameLabel}</TableHead>
                                <TableHead className="text-end">{valueLabel}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow
                                    key={item.id}
                                    onClick={() => {
                                        router.visit(item.link);
                                    }}
                                    className="transition hover:bg-secondary/30 cursor-pointer"
                                >
                                    <TableCell className="text-center font-semibold">{item.id}</TableCell>
                                    <TableCell>
                                        {item.name}
                                        {item.badge && (
                                            <Badge className="ml-2" variant={item.badge.variant || 'default'}>
                                                {item.badge.text}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-end font-bold">{item.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
