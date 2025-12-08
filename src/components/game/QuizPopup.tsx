import { Check, X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizPopupProps {
  question: string;
  onAnswer: (correct: boolean) => void;
}

export const QuizPopup = ({ question, onAnswer }: QuizPopupProps) => {
  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
      <Card className="w-full max-w-md border-game-blue/40 bg-card/95 backdrop-blur shadow-xl animate-scale-in">
        <CardHeader className="text-center pb-4 pt-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-game-blue/20 border-2 border-game-blue/40 flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-game-blue" />
          </div>
          <CardTitle className="text-xl font-sans font-bold text-foreground">Quick Quiz!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pb-6">
          <p className="text-center text-base text-foreground/90 leading-relaxed font-sans">
            {question}
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => onAnswer(true)}
              variant="outline"
              size="lg"
              className="min-w-[130px] gap-2 font-sans border-game-green/50 text-game-green hover:bg-game-green/10 hover:border-game-green"
            >
              <Check className="w-5 h-5" />
              True
            </Button>
            <Button
              onClick={() => onAnswer(false)}
              variant="outline"
              size="lg"
              className="min-w-[130px] gap-2 font-sans border-game-red/50 text-game-red hover:bg-game-red/10 hover:border-game-red"
            >
              <X className="w-5 h-5" />
              False
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
