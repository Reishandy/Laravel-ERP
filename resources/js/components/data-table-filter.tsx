import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface DataTableFilterProps {
    filterableColumns: { value: string; label: string }[];
    selectedColumn: string;
    setSelectedColumn: (value: string) => void;
    currentFilterValue: string;
    handleFilterChange: (value: string) => void;
    clearFilter: () => void;
}

export function DataTableFilter({
    filterableColumns,
    selectedColumn,
    setSelectedColumn,
    currentFilterValue,
    handleFilterChange,
    clearFilter,
}: DataTableFilterProps) {
    const getPlaceholderText = () => {
        const selectedColumnData = filterableColumns.find((col) => col.value === selectedColumn);
        return `Filter ${selectedColumnData?.label.toLowerCase()}...`;
    };

    return (
        <div className="flex items-center space-x-2">
            <Select value={selectedColumn} onValueChange={setSelectedColumn}>
                <SelectTrigger className="w-48">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {filterableColumns.map((column) => (
                        <SelectItem key={column.value} value={column.value}>
                            {column.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="relative">
                <Input
                    placeholder={getPlaceholderText()}
                    value={currentFilterValue}
                    onChange={(event) => handleFilterChange(event.target.value)}
                    className="max-w-sm pr-10"
                />
                {currentFilterValue && (
                    <Button variant="ghost" size="sm" className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent" onClick={clearFilter}>
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
