import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface DataTableSortProps {
    sortableColumns: { value: string; label: string }[];
    selectedSortColumn: string;
    setSelectedSortColumn: (value: string) => void;
    sortDirection: 'asc' | 'desc';
    setSortDirection: (value: 'asc' | 'desc') => void;
    handleSortChange: (column: string, direction: 'asc' | 'desc') => void;
    clearSort: () => void;
}

export function DataTableSort({
    sortableColumns,
    selectedSortColumn,
    setSelectedSortColumn,
    sortDirection,
    setSortDirection,
    handleSortChange,
    clearSort,
}: DataTableSortProps) {
    return (
        <div className="flex items-center space-x-2">
            <Select
                value={selectedSortColumn}
                onValueChange={(value) => {
                    setSelectedSortColumn(value);
                    handleSortChange(value, sortDirection);
                }}
            >
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                    {sortableColumns.map((column) => (
                        <SelectItem key={column.value} value={column.value}>
                            {column.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={sortDirection}
                onValueChange={(value: 'asc' | 'desc') => {
                    setSortDirection(value);
                    if (selectedSortColumn) {
                        handleSortChange(selectedSortColumn, value);
                    }
                }}
            >
                <SelectTrigger className="w-32">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
            </Select>

            {selectedSortColumn && (
                <Button variant="ghost" size="sm" onClick={clearSort}>
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}
