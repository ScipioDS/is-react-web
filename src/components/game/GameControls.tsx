import React from 'react';
import { Play, Pause, RotateCcw, Crosshair } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface GameControlsProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onRestart: () => void;
}

export function GameControls({ isPaused, onTogglePause, onRestart }: GameControlsProps) {
  const { t } = useTranslation();

  return (
    <Card className="border-border/30 bg-card/95 backdrop-blur shadow-lg">
      <CardContent className="p-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-3">
            <Button
              onClick={onTogglePause}
              variant="outline"
              size="default"
              className="gap-2 font-sans border-game-yellow/50 text-game-yellow hover:bg-game-yellow/10"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  {t('game.resume')}
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  {t('game.pause')}
                </>
              )}
            </Button>

            <Button
              onClick={onRestart}
              variant="outline"
              size="default"
              className="gap-2 font-sans border-game-red/50 text-game-red hover:bg-game-red/10"
            >
              <RotateCcw className="w-4 h-4" />
              {t('game.restart')}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
            <Crosshair className="w-4 h-4" />
            <span>{t('game.controlsHint')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
