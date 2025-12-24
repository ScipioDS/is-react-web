export interface AnswerOption {
    answer: string;
    isTrue: boolean;
}

export interface QuizQuestion {
    question: string;
    answers: AnswerOption[]; // expect 3 items
}

export interface QuizPopupProps {
    question: QuizQuestion;
    onAnswer: (correct: boolean) => void;
}