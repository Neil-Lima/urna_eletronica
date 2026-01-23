/**
 * Tipos relacionados aos candidatos da urna eletrônica
 */

export interface Candidate {
  name: string;
  image: string;
  idade?: number;
  partido?: string;
  numero?: string;
}

export interface CandidatesMap {
  [key: string]: Candidate;
} 