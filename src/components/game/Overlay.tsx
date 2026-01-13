import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type OverlayProps = {
  isGameOver: boolean;
  score: number;
  onRestart: () => void;
};

export function Overlay({ isGameOver, score, onRestart }: OverlayProps) {
  const { t } = useTranslation();

  if (!isGameOver) return null;

  return (
    <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center rounded-lg p-4">
      <Card className="border-game-red/40 bg-card/95 backdrop-blur shadow-xl w-full max-w-md">
        <CardHeader className="text-center pb-3 sm:pb-4 pt-4 sm:pt-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-game-red font-sans">
            {t('game.gameOver')}
          </CardTitle>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 font-sans">
            {t('game.finalScore')}: {score}
          </p>
        </CardHeader>
        <CardContent className="flex justify-center pb-4 sm:pb-6">
          <Button
            onClick={onRestart}
            variant="outline"
            size="lg"
            className="gap-2 font-sans border-game-yellow/50 text-game-yellow hover:bg-game-yellow/10"
          >
            <RotateCcw className="w-4 h-4" />
            {t('game.playAgain')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
