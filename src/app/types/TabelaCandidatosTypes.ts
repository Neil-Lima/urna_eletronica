import type { Candidate } from './candidateTypes';

export interface UseTabelaCandidatosResult {
  currentPage: number;
  totalPages: number;
  currentCandidates: Candidate[];
  handlePageChange: (pageNumber: number) => void;
}

 