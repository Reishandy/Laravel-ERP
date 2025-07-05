import { Button } from '@/components/ui/button';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import { RowModel } from '@tanstack/react-table';
import { useState, useEffect } from 'react';

interface Pagination {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
    getPageCount: () => number;
    getState: () => {
        pagination: {
            pageIndex: number;
            pageSize: number;
        };
    };
    getFilteredRowModel: () => RowModel<any>;
    setPageIndex: (index: number) => void;
    previousPage: () => void;
    nextPage: () => void;
    getCanPreviousPage: () => boolean;
    getCanNextPage: () => boolean;
}

interface DataTablePaginationProps {
    pagination: Pagination;
}

export default function DataTablePagination({ pagination }: DataTablePaginationProps) {
    const windowSize = useWindowSize();
    const totalPages = pagination.getPageCount();
    const currentPage = pagination.getState().pagination.pageIndex;
    const pages = [];

    let leadingPages = 2;
    let trailingPages = 2;
    let surroundingPages = 2;

    if (windowSize.width < 640) {
        leadingPages = 0;
        trailingPages = 0;
        surroundingPages = 1;
    }

    return (
        <div className="mt-6 flex flex-col items-center justify-between gap-y-4 lg:flex-row lg:gap-y-0">
            <div className="text-sm">
                Showing {pagination.getState().pagination.pageIndex * pagination.getState().pagination.pageSize + 1} to{' '}
                {Math.min(
                    (pagination.getState().pagination.pageIndex + 1) * pagination.getState().pagination.pageSize,
                    pagination.getFilteredRowModel().rows.length,
                )}{' '}
                of {pagination.getFilteredRowModel().rows.length} results
            </div>
            <div className="flex items-center gap-x-1">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => pagination.setPageIndex(0)}
                    disabled={!pagination.getCanPreviousPage()}
                    className="min-w-[20px]"
                >
                    <ChevronFirst className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => pagination.previousPage()}
                    disabled={!pagination.getCanPreviousPage()}
                    className="min-w-[20px]"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {(() => {
                    // Add leading pages
                    for (let i = 0; i < Math.min(leadingPages, totalPages); i++) {
                        pages.push(
                            <Button
                                key={i}
                                variant={currentPage === i ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => pagination.setPageIndex(i)}
                                disabled={currentPage === i}
                                className="min-w-[20px]"
                            >
                                {i + 1}
                            </Button>,
                        );
                    }

                    // Add ellipsis after leading pages if there's a gap
                    if (currentPage - surroundingPages > leadingPages) {
                        pages.push(
                            <Button key="ellipsis1" variant="ghost" size="sm" disabled className="min-w-[20px] cursor-default">
                                ...
                            </Button>,
                        );
                    }

                    // Add pages around current page (if not already included in leading/trailing pages)
                    const startMiddle = Math.max(leadingPages, currentPage - surroundingPages);
                    const endMiddle = Math.min(totalPages - trailingPages - 1, currentPage + surroundingPages);

                    for (let i = startMiddle; i <= endMiddle; i++) {
                        if (i < totalPages - trailingPages && i >= leadingPages) {
                            pages.push(
                                <Button
                                    key={i}
                                    variant={currentPage === i ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => pagination.setPageIndex(i)}
                                    disabled={currentPage === i}
                                    className="min-w-[20px]"
                                >
                                    {i + 1}
                                </Button>,
                            );
                        }
                    }

                    // Add ellipsis before trailing pages if there's a gap
                    if (currentPage + surroundingPages < totalPages - trailingPages - 1) {
                        pages.push(
                            <Button key="ellipsis2" variant="ghost" size="sm" disabled className="min-w-[20px] cursor-default">
                                ...
                            </Button>,
                        );
                    }

                    // Add trailing pages
                    for (let i = Math.max(leadingPages, totalPages - trailingPages); i < totalPages; i++) {
                        pages.push(
                            <Button
                                key={i}
                                variant={currentPage === i ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => pagination.setPageIndex(i)}
                                disabled={currentPage === i}
                                className="min-w-[20px]"
                            >
                                {i + 1}
                            </Button>,
                        );
                    }

                    return pages;
                })()}

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => pagination.nextPage()}
                    disabled={!pagination.getCanNextPage()}
                    className="min-w-[20px]"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => pagination.setPageIndex(pagination.getPageCount() - 1)}
                    disabled={!pagination.getCanNextPage()}
                    className="min-w-[20px]"
                >
                    <ChevronLast className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}
