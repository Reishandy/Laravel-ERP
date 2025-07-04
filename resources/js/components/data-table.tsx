import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { X } from 'lucide-react';
import * as React from 'react';

interface FilterableColumn {
    value: string;
    label: string;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterableColumns?: FilterableColumn[];
}

export function DataTable<TData, TValue>({ columns, data, filterableColumns = [] }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [selectedColumn, setSelectedColumn] = React.useState<string>(filterableColumns[0]?.value || '');
    const [selectedSortColumn, setSelectedSortColumn] = React.useState<string>('');
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

    const sortableColumns = columns
        .filter((col) => col.accessorKey || col.accessorFn)
        .map((col) => ({
            value: (col.accessorKey as string) || (col.id as string),
            label: typeof col.header === 'string' ? col.header : (col.id as string),
        }));

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    const currentFilterValue = (table.getColumn(selectedColumn)?.getFilterValue() as string) ?? '';

    const handleFilterChange = (value: string) => {
        table.getColumn(selectedColumn)?.setFilterValue(value);
    };

    const clearFilter = () => {
        table.getColumn(selectedColumn)?.setFilterValue('');
    };

    const getPlaceholderText = () => {
        const selectedColumnData = filterableColumns.find((col) => col.value === selectedColumn);
        return `Filter ${selectedColumnData?.label.toLowerCase()}...`;
    };

    const handleSortChange = (columnId: string, direction: 'asc' | 'desc') => {
        setSorting([{ id: columnId, desc: direction === 'desc' }]);
    };

    const clearSort = () => {
        setSorting([]);
        setSelectedSortColumn('');
    };

    return (
        <div>
            <div className="flex flex-row items-center justify-between pb-4">
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
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={clearFilter}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
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
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
