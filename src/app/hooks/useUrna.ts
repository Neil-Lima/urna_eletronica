import { useVotingSystem } from '../utils/votingUtils';
import type { UseVotingSystemResult } from '../types/UrnaTypes';

export const useUrna = (): UseVotingSystemResult => {
  return useVotingSystem();
};

 