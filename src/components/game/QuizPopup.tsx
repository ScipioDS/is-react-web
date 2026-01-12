import { Check, X, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizPopupProps } from '@/components/game/types';
import { useState, useEffect } from 'react';

export const QuizPopup = ({ question, onAnswer }: QuizPopupProps) => {
  const { t } = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState(question.answers);

  useEffect(() => {
    const shuffled = [...question.answers].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [question]);

  const handleAnswerClick = (optionIndex: number, correct: boolean) => {
    setSelectedAnswer(optionIndex);
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 z-50 animate-fade-in">
      <Card className="w-full max-w-md border-game-blue/40 bg-card/95 backdrop-blur shadow-xl animate-scale-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center pb-3 pt-4 sm:pb-4 sm:pt-6">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-game-blue/20 border-2 border-game-blue/40 flex items-center justify-center mb-3 sm:mb-4">
            <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-game-blue" />
          </div>
          <CardTitle className="text-lg sm:text-xl font-sans font-bold text-foreground">
            {t('quiz.title')}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-6 pb-4 sm:pb-6 px-4 sm:px-6">
          <p className="text-center text-sm sm:text-base text-foreground/90 leading-relaxed font-sans break-words whitespace-normal">
            {question.question}
          </p>

          <div className="flex flex-col gap-3">
            {shuffledAnswers.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(index, option.isTrue)}
                variant="outline"
                size="lg"
                disabled={showFeedback}
                className={`w-full justify-between gap-2 font-sans break-words whitespace-normal text-left h-auto min-h-[2.5rem] py-3 ${
                  showFeedback && selectedAnswer === index
                    ? option.isTrue
                      ? 'border-game-green bg-game-green/10'
                      : 'border-game-red bg-game-red/10'
                    : ''
                }`}
              >
                <span className="break-words">{option.answer}</span>
                {showFeedback && selectedAnswer === index && (
                  <span
                    className={`font-bold text-sm ml-2 flex items-center gap-1 ${
                      option.isTrue ? 'text-game-green' : 'text-game-red'
                    }`}
                  >
                    {option.isTrue ? (
                      <>
                        <Check className="w-4 h-4" /> {t('quiz.correct')}
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4" /> {t('quiz.wrong')}
                      </>
                    )}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
