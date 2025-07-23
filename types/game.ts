export interface Clue {
  id: string;
  text: string;
  type: 'positive' | 'negative' | 'exclusive';
}

export interface Category {
  id: string;
  name: string;
  items: string[];
}

export interface Case {
  id: string;
  title: string;
  description: string;
  story: string;
  categories: Category[];
  clues: Clue[];
  solution: Record<string, Record<string, boolean>>;
  difficulty: 'easy' | 'medium' | 'hard';
  isPremium: boolean;
  timeLimit?: number; // in minutes
  maxHints: number;
}

export interface GameState {
  currentCase: Case | null;
  grid: Record<string, Record<string, boolean | null>>;
  hintsUsed: number;
  timeElapsed: number;
  isCompleted: boolean;
  isSolved: boolean;
}

export interface PlayerProgress {
  casesCompleted: string[];
  totalScore: number;
  hintsUsedTotal: number;
  averageTime: number;
}