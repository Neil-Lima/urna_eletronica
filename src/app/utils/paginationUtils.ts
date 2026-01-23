/**
 * Utilitários para paginação
 */
import { Candidate } from '../types/candidateTypes';

/**
 * Configuração de paginação
 */
export const ITEMS_PER_PAGE = 3;

/**
 * Calcula os dados necessários para paginação
 * @param items - Itens a serem paginados
 * @param currentPage - Página atual
 * @param itemsPerPage - Itens por página
 */
export const calculatePagination = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number = ITEMS_PER_PAGE
) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return {
    currentItems,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
  };
};

/**
 * Obtém candidatos paginados
 * @param candidates - Array de candidatos
 * @param currentPage - Página atual
 */
export const getPaginatedCandidates = (
  candidates: Candidate[],
  currentPage: number
) => {
  return calculatePagination(candidates, currentPage, ITEMS_PER_PAGE);
}; 