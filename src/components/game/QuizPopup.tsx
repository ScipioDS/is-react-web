import { Check, X, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {QuizPopupProps} from "@/components/game/QuizModels.ts";

export const QuizPopup = ({ question, onAnswer }: QuizPopupProps) => {
  const { t } = useTranslation();

  return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
        <Card className="w-full max-w-md border-game-blue/40 bg-card/95 backdrop-blur shadow-xl animate-scale-in">
          <CardHeader className="text-center pb-4 pt-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-game-blue/20 border-2 border-game-blue/40 flex items-center justify-center mb-4">
              <HelpCircle className="w-8 h-8 text-game-blue" />
            </div>
            <CardTitle className="text-xl font-sans font-bold text-foreground">
              {t('quiz.title')}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 pb-6">
            <p className="text-center text-base text-foreground/90 leading-relaxed font-sans">
              {question.question}
            </p>

            <div className="flex flex-col gap-3">
              {question.answers.map((option, index) => (
                  <Button
                      key={index}
                      onClick={() => onAnswer(option.isTrue)}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start gap-2 font-sans"
                  >
                    <span>{option.answer}</span>
                  </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
};
