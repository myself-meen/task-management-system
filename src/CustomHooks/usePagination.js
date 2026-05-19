import { useState, useEffect, useMemo } from 'react';

export function usePagination(data = [], defaultItemsPerPage = 5) {
  const safeData = data || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerPage(4);
      } else if (width < 1024) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(7);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return safeData.slice(startIndex, startIndex + itemsPerPage);
  }, [safeData, currentPage, itemsPerPage]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return { currentPage, totalPages, currentData, handlePrev, handleNext };
}