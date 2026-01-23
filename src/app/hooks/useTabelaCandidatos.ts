import { useMemo, useState } from 'react';
import { candidates } from '../utils/candidatesData';
import { getPaginatedCandidates } from '../utils/paginationUtils';
import type { UseTabelaCandidatosResult } from '../types/TabelaCandidatosTypes';

export const useTabelaCandidatos = (): UseTabelaCandidatosResult => {
  const [currentPage, setCurrentPage] = useState(1);

  const { currentItems: currentCandidates, totalPages } = useMemo(() => {
    return getPaginatedCandidates(candidates, currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    totalPages,
    currentCandidates,
    handlePageChange,
  };
};

 