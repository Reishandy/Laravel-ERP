import { Sale } from '@/types';
import { router } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { Badge, badgeVariants } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';

interface ChangeStatusFormProps {
    sale: Sale;
}

export default function ChangeStatusForm({ sale }: ChangeStatusFormProps) {
    const handleChangeStatus = (status: 'pending' | 'processing' | 'completed') => {
        router.post(route('sales.status', sale.sale_number), { status }, {
            preserveScroll: true,
        });
    };

    const variantMap: Record<Sale['status'], VariantProps<typeof badgeVariants>['variant']> = {
        pending: 'outline',
        processing: 'secondary',
        completed: 'default',
    };

    return (
        <div className="flex flex-row items-center justify-end gap-x-2">
            <div className="w-full">
                <Badge
                    variant={variantMap[sale.status]}
                    className="text-md w-full font-medium capitalize"
                >
                    {sale.status}
                </Badge>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer" asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="text-muted-foreground">Change Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer"
                        disabled={sale.status === 'pending'}
                        onClick={() => handleChangeStatus('pending')}
                    >
                        Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        disabled={sale.status === 'processing'}
                        onClick={() => handleChangeStatus('processing')}
                    >
                        Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        disabled={sale.status === 'completed'}
                        onClick={() => handleChangeStatus('completed')}
                    >
                        Completed
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
