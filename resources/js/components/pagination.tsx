import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { router } from '@inertiajs/react';

interface PaginationProps {
    from: number;
    to: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

export function Pagination({ from, to, total, links }: PaginationProps) {
    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(url, {}, { preserveState: true });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between mt-6 gap-y-4 lg:gap-y-0">
            <div className="text-sm">
                Showing {from} to {to} of {total} results
            </div>
            <div className="flex items-center gap-x-1">
                {links.map((link, index) => (
                    <Button
                        key={index}
                        variant={link.active ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handlePageChange(link.url)}
                        disabled={link.active}
                        className="min-w-[20px]"
                    >
                        {link.label === '&laquo; Previous' ? (
                            <ChevronLeft className="h-4 w-4" />
                        ) : link.label === 'Next &raquo;' ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        )}
                    </Button>
                ))}
            </div>
        </div>
    );
}
