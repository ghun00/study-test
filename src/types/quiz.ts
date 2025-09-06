export type OutcomeType = 'stamina' | 'routine' | 'focus' | 'overload';

export interface QuizOption {
  key: string;
  label: string;
  weights: Partial<Record<OutcomeType, number>>;
}

export interface QuizQuestion {
  id: string;
  title: string;
  options: QuizOption[];
}

export interface QuizAnswer {
  questionId: string;
  selectedOption: string;
}

export interface QuizScores {
  stamina: number;
  routine: number;
  focus: number;
  overload: number;
}

export interface Lead {
  id?: string;
  name?: string;
  phone: string;
  email?: string;
  outcome?: OutcomeType;
  created_at?: string;
}

export interface QuizResponse {
  id?: string;
  lead_id?: string;
  answers: QuizAnswer[];
  scores: QuizScores;
  created_at?: string;
}

export interface OutcomeContent {
  headline: string;
  problem: string;
  solutions: string[];
  academySolution: string;
  ctaText: string;
  academyManagement: {
    title: string;
    methods: string[];
    measurements: string;
  };
}
