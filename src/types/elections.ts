
export interface Candidate {
  id: string;
  name: string;
  position: string;
  description: string;
  photoUrl: string;
}

export interface Vote {
  userId: string;
  president: string | null;
  vicePresident: string | null;
  culturalSecretary: string | null;
  sportsSecretary: string | null;
  ladiesRepresentative: string | null;
  timestamp: Date;
}

export type CandidatePosition = 'president' | 'vicePresident' | 'culturalSecretary' | 'sportsSecretary' | 'ladiesRepresentative';

export interface PositionResults {
  position: string;
  candidates: {
    id: string;
    name: string;
    votes: number;
  }[];
}
