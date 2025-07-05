import { DataTableFilter } from '@/components/data-table/data-table-filter';
import { DataTableSort } from '@/components/data-table/data-table-sort';
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
import * as React from 'react';

interface FilterableColumn {
    value: string;
    label: string;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterableColumns: FilterableColumn[];
    sortableColumns: FilterableColumn[];
}

export function DataTable<TData, TValue>({ columns, data, filterableColumns, sortableColumns }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [selectedColumn, setSelectedColumn] = React.useState<string>(filterableColumns[0]?.value || '');
    const [selectedSortColumn, setSelectedSortColumn] = React.useState<string>('');
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

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

    const handleSortChange = (columnId: string, direction: 'asc' | 'desc') => {
        setSorting([{ id: columnId, desc: direction === 'desc' }]);
    };

    const clearSort = () => {
        setSorting([]);
        setSelectedSortColumn('');
    };

    return (
        <div>
            <div className="flex flex-col justify-between gap-y-2 pb-4 lg:flex-row lg:items-center lg:gap-y-0">
                {/* Filter */}
                <DataTableFilter
                    filterableColumns={filterableColumns}
                    selectedColumn={selectedColumn}
                    setSelectedColumn={setSelectedColumn}
                    currentFilterValue={currentFilterValue}
                    handleFilterChange={handleFilterChange}
                    clearFilter={clearFilter}
                />

                {/* Sort */}
                <DataTableSort
                    sortableColumns={sortableColumns}
                    selectedSortColumn={selectedSortColumn}
                    setSelectedSortColumn={setSelectedSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    handleSortChange={handleSortChange}
                    clearSort={clearSort}
                />
            </div>

            {/* Table */}
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
