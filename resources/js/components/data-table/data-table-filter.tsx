import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface DataTableFilterProps {
    globalFilterValue: string;
    handleFilterChange: (value: string) => void;
    clearFilter: () => void;
}

export function DataTableFilter({ globalFilterValue, handleFilterChange, clearFilter }: DataTableFilterProps) {
    return (
        <div className="relative">
            <Input
                placeholder="Search all columns..."
                value={globalFilterValue}
                onChange={(event) => handleFilterChange(event.target.value)}
                className="max-w-sm pr-10"
            />
            {globalFilterValue && (
                <Button variant="ghost" size="sm" className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent" onClick={clearFilter}>
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}
