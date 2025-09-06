import { QuizAnswer, QuizScores, OutcomeType } from '@/types/quiz';
import { QUIZ_QUESTIONS, PRIORITY_ORDER } from './constants';

export function calculateScores(answers: QuizAnswer[]): QuizScores {
  const scores: QuizScores = {
    stamina: 0,
    routine: 0,
    focus: 0,
    overload: 0
  };

  answers.forEach(answer => {
    const question = QUIZ_QUESTIONS.find(q => q.id === answer.questionId);
    if (!question) return;

    const selectedOption = question.options.find(opt => opt.key === answer.selectedOption);
    if (!selectedOption) return;

    // 각 유형별 점수 누적
    Object.entries(selectedOption.weights).forEach(([type, weight]) => {
      if (weight && type in scores) {
        scores[type as OutcomeType] += weight;
      }
    });
  });

  return scores;
}

export function determineOutcome(scores: QuizScores): OutcomeType {
  const maxScore = Math.max(...Object.values(scores));
  const topTypes = Object.entries(scores)
    .filter(([, score]) => score === maxScore)
    .map(([type]) => type as OutcomeType);

  // 동점 시 우선순위에 따라 결정
  for (const priorityType of PRIORITY_ORDER) {
    if (topTypes.includes(priorityType)) {
      return priorityType;
    }
  }

  // fallback
  return topTypes[0] || 'stamina';
}
