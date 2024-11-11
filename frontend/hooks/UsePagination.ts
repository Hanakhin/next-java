import {useState, useMemo, useCallback} from 'react';

interface UsePaginationProps<T> {
    items: T[];
    itemsPerPage: number;
}

const usePagination = <T>({ items, itemsPerPage }: UsePaginationProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [items, currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const resetPagination = useCallback(() => {
        setCurrentPage(1);
    }, []);

    return { currentItems, currentPage, totalPages, handlePageChange, resetPagination };
};

export default usePagination;