/**
 * Utilitários para a lógica de votação
 */
import { Candidate } from '../types/candidateTypes';
import { Dispatch, SetStateAction, useState, useCallback } from 'react';
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
 * Interface para os setters de estado da urna
 */
export interface UrnaStateSetters {
  setNum1: Dispatch<SetStateAction<string>>;
  setNum2: Dispatch<SetStateAction<string>>;
  setVotedCandidate: Dispatch<SetStateAction<Candidate | null>>;
  setVotingState: Dispatch<SetStateAction<VotingState>>;
}

/**
 * Formata os dados do candidato para exibição
 */
export const formatCandidateInfo = (candidate: Candidate): string => {
  if (!candidate) return '';
  
  return `${candidate.name} - ${candidate.partido || ''}`;
};

/**
 * Processa o clique em um botão numérico e atualiza o estado
 * @param value - Valor do botão pressionado
 * @param state - Estado atual da urna
 * @param stateSetters - Funções para atualizar o estado
 * @param candidatesList - Lista de candidatos
 */
export const handleNumericButtonClick = (
  value: string,
  state: UrnaState,
  stateSetters: UrnaStateSetters,
  candidatesList: Candidate[]
): void => {
  const { newNum1, newNum2, candidate } = processNumericButtonClick(value, state.num1, state.num2, candidatesList);
  stateSetters.setNum1(newNum1);
  stateSetters.setNum2(newNum2);
  if (candidate) {
    stateSetters.setVotedCandidate(candidate);
  }
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
export const handleWhiteVote = (stateSetters: UrnaStateSetters): void => {
  const { num1, num2, votingState, candidate } = processWhiteVote();
  stateSetters.setNum1(num1);
  stateSetters.setNum2(num2);
  stateSetters.setVotingState(votingState);
  stateSetters.setVotedCandidate(candidate);
};

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
 * Processa a correção do voto e atualiza o estado
 * @param stateSetters - Funções para atualizar o estado
 */
export const handleCorrectVote = (stateSetters: UrnaStateSetters): void => {
  const { num1, num2, votingState, candidate } = correctVote();
  stateSetters.setNum1(num1);
  stateSetters.setNum2(num2);
  stateSetters.setVotingState(votingState);
  stateSetters.setVotedCandidate(candidate);
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
 * Confirma o voto e atualiza o estado
 * @param stateSetters - Funções para atualizar o estado
 */
export const handleConfirmVote = (stateSetters: UrnaStateSetters): void => {
  stateSetters.setVotingState('finished');
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

  // Função para lidar com o clique em botões numéricos
  const handleNumericButtonClick = useCallback((buttonValue: string) => {
    // Se a votação já foi finalizada ou está em branco, não faz nada
    if (votingState === 'finished' || votingState === 'blank') {
      return;
    }

    // Se o primeiro dígito ainda não foi preenchido
    if (num1 === '') {
      setNum1(buttonValue);
      return;
    }

    // Se o segundo dígito ainda não foi preenchido
    if (num2 === '') {
      setNum2(buttonValue);
      
      // Verifica se existe candidato com esse número
      const candidateNumber = num1 + buttonValue;
      const foundCandidate = candidates.find(c => c.numero === candidateNumber);
      
      if (foundCandidate) {
        setVotedCandidate(foundCandidate);
      } else {
        // Candidato não encontrado
        setVotedCandidate(null);
      }
    }
  }, [num1, num2, votingState]);

  // Função para lidar com voto em branco
  const handleWhiteVote = useCallback(() => {
    // Se a votação já foi finalizada, não faz nada
    if (votingState === 'finished') {
      return;
    }

    // Limpa os números e o candidato selecionado
    setNum1('');
    setNum2('');
    setVotedCandidate(null);
    setVotingState('blank');
  }, [votingState]);

  // Função para corrigir o voto
  const handleCorrectVote = useCallback(() => {
    // Se a votação já foi finalizada, não faz nada
    if (votingState === 'finished') {
      return;
    }

    // Limpa os números e o candidato selecionado
    setNum1('');
    setNum2('');
    setVotedCandidate(null);
    setVotingState('ongoing');
  }, [votingState]);

  // Função para confirmar o voto
  const handleConfirmVote = useCallback(() => {
    // Se a votação já foi finalizada, não faz nada
    if (votingState === 'finished') {
      return;
    }

    // Para confirmar o voto, deve ter um candidato selecionado ou estar em branco
    if (votedCandidate || votingState === 'blank') {
      // Aqui você poderia adicionar lógica para salvar o voto em algum lugar
      // Por exemplo, enviar para um backend
      
      // Finaliza a votação
      setVotingState('finished');
      
      // Limpa os dados após um tempo
      setTimeout(() => {
        // Reset para uma nova votação
        setNum1('');
        setNum2('');
        setVotedCandidate(null);
        setVotingState('ongoing');
      }, 3000);
    }
  }, [votedCandidate, votingState]);

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