/**
 * Utilitários para a lógica de votação
 */
import { Candidate } from '../types/candidateTypes';
import { useCallback, useRef, useState } from 'react';
import { candidates } from './candidatesData';

/**
 * Encontra um candidato pelo número
 */
export const findCandidateByNumber = (
  candidatesList: Candidate[], 
  num1: string, 
  num2: string
): Candidate | null => {
  if (!num1 || !num2) return null;
  
  const candidateNumber = `${num1}${num2}`;
  const candidate = candidatesList.find(c => c.numero === candidateNumber);
  
  if (candidate) {
    return candidate;
  } else {
    return { name: 'Voto Nulo', image: '' };
  }
};

/**
 * Tipos de estado de votação
 */
export type VotingState = 'ongoing' | 'blank' | 'finished';

/**
 * Interface para o estado da urna
 */
export interface UrnaState {
  num1: string;
  num2: string;
  votedCandidate: Candidate | null;
  votingState: VotingState;
}

/**
 * Formata os dados do candidato para exibição
 */
export const formatCandidateInfo = (candidate: Candidate): string => {
  if (!candidate) return '';
  
  return `${candidate.name} - ${candidate.partido || ''}`;
};

/**
 * Processa o clique em um botão numérico
 */
export const processNumericButtonClick = (
  value: string,
  num1: string,
  num2: string,
  candidatesList: Candidate[]
): {
  newNum1: string;
  newNum2: string;
  candidate: Candidate | null;
} => {
  let newNum1 = num1;
  let newNum2 = num2;
  
  if (num1 === '') {
    newNum1 = value;
  } else if (num2 === '') {
    newNum2 = value;
  }
  
  // Mostrar dados do candidato ao digitar o número
  let candidate = null;
  if (newNum1 && newNum2) {
    const candidateNumber = `${newNum1}${newNum2}`;
    candidate = candidatesList.find(c => c.numero === candidateNumber) || { name: 'Voto Nulo', image: '' };
  }
  
  return { newNum1, newNum2, candidate };
};

/**
 * Processa o voto em branco e atualiza o estado
 * @param stateSetters - Funções para atualizar o estado
 */
/**
 * Processa o voto em branco
 */
export const processWhiteVote = (): {
  num1: string;
  num2: string;
  votingState: VotingState;
  candidate: Candidate;
} => {
  return {
    num1: '',
    num2: '',
    votingState: 'blank',
    candidate: { name: 'Branco', image: '' }
  };
};

/**
 * Reinicia o estado de votação
 */
export const correctVote = (): {
  num1: string;
  num2: string;
  votingState: VotingState;
  candidate: Candidate | null;
} => {
  return {
    num1: '',
    num2: '',
    votingState: 'ongoing',
    candidate: null
  };
};

/**
 * Valores dos botões numéricos da urna
 */
export const BUTTON_VALUES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// Hook personalizado para gerenciar o estado da votação
export const useVotingSystem = () => {
  // Estados da urna
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [votedCandidate, setVotedCandidate] = useState<Candidate | null>(null);
  const [votingState, setVotingState] = useState<VotingState>('ongoing');
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Função para lidar com o clique em botões numéricos
  const handleNumericButtonClick = useCallback((buttonValue: string) => {
    if (votingState !== 'ongoing') return;

    const { newNum1, newNum2, candidate } = processNumericButtonClick(
      buttonValue,
      num1,
      num2,
      candidates
    );

    setNum1(newNum1);
    setNum2(newNum2);
    setVotedCandidate(candidate);
  }, [num1, num2, votingState]);

  // Função para lidar com voto em branco
  const handleWhiteVote = useCallback(() => {
    if (votingState === 'finished') return;

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    const { num1, num2, votingState: nextState, candidate } = processWhiteVote();
    setNum1(num1);
    setNum2(num2);
    setVotingState(nextState);
    setVotedCandidate(candidate);
  }, [votingState]);

  // Função para corrigir o voto
  const handleCorrectVote = useCallback(() => {
    if (votingState === 'finished') return;

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    const { num1, num2, votingState: nextState, candidate } = correctVote();
    setNum1(num1);
    setNum2(num2);
    setVotingState(nextState);
    setVotedCandidate(candidate);
  }, [votingState]);

  // Função para confirmar o voto
  const handleConfirmVote = useCallback(() => {
    if (votingState === 'finished') return;

    const hasTwoDigits = Boolean(num1 && num2);

    // Confirma se:
    // - voto em branco, OU
    // - digitou 2 dígitos (candidato válido ou NULO)
    if (votingState === 'blank' || hasTwoDigits) {
      setVotingState('finished');

      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = setTimeout(() => {
        setNum1('');
        setNum2('');
        setVotedCandidate(null);
        setVotingState('ongoing');
        resetTimerRef.current = null;
      }, 3000);
    }
  }, [num1, num2, votingState]);

  return {
    // Estados
    num1,
    num2,
    votedCandidate,
    votingState,
    
    // Actions
    handleNumericButtonClick,
    handleWhiteVote,
    handleCorrectVote,
    handleConfirmVote
  };
}; 