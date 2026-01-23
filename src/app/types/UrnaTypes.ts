import type { Candidate } from './candidateTypes';

export type VotingState = 'ongoing' | 'blank' | 'finished';

export interface UseVotingSystemResult {
  num1: string;
  num2: string;
  votedCandidate: Candidate | null;
  votingState: VotingState;
  handleNumericButtonClick: (buttonValue: string) => void;
  handleWhiteVote: () => void;
  handleCorrectVote: () => void;
  handleConfirmVote: () => void;
}

 