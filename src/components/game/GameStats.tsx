import React from 'react';
import { Shield, Trophy, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface GameStatsProps {
  score: number;
  health: number;
  maxHealth?: number;
}

export function GameStats({ score, health, maxHealth = 10 }: GameStatsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="backdrop-blur shadow-lg">
          <div className="flex items-center justify-center">
            <img
                src="/mksafenetlogo-white.svg"
                alt="Game Logo"
                className="h-10 w-auto"
            />
          </div>
      </div>

      <Card className="flex-1 border-game-yellow/30 bg-card/95 backdrop-blur shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-game-yellow/20 border border-game-yellow/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-game-yellow" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-sans">{t('game.gameMode')}</p>
              <p className="text-sm font-bold font-sans">{t('game.survival')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-game-blue/30 bg-card/95 backdrop-blur shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-game-blue/20 border border-game-blue/30 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-game-blue" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-sans">{t('game.score')}</p>
              <p className="text-sm font-bold font-sans">{score}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 border-game-green/30 bg-card/95 backdrop-blur shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-game-green/20 border border-game-green/30 flex items-center justify-center">
              <Heart className="w-5 h-5 text-game-green" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-sans mb-1">{t('game.health')}</p>
              <div className="flex items-center gap-2">
                <Progress
                  value={(health / maxHealth) * 100}
                  className="h-2 flex-1"
                  indicatorClassName="bg-game-green"
                />
                <span className="text-xs font-bold font-sans min-w-[2.5rem]">
                  {health}/{maxHealth}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
