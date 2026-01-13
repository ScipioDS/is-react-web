export type AnswerOption = {
  answer: string;
  isTrue: boolean;
};

export type QuizQuestion = {
  question: string;
  answers: AnswerOption[];
};

export type QuizPopupProps = {
  question: QuizQuestion;
  onAnswer: (correct: boolean) => void;
};

export type Weapon = 'laser' | 'explosive' | 'melee';
