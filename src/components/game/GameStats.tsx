import React from 'react';
import { Trophy, Heart, Zap, Bomb, Swords } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface GameStatsProps {
  score: number;
  health: number;
  maxHealth?: number;
  currentWeapon?: 'laser' | 'explosive' | 'melee';
  onWeaponChange?: (weapon: 'laser' | 'explosive' | 'melee') => void;
}

export function GameStats({
  score,
  health,
  maxHealth = 10,
  currentWeapon = 'laser',
  onWeaponChange,
}: GameStatsProps) {
  const { t } = useTranslation();
  const [showWeaponSelector, setShowWeaponSelector] = React.useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <Card className="border-game-blue/30 bg-card/95 backdrop-blur shadow-lg">
          <CardContent className="p-2 sm:p-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-game-blue/20 border border-game-blue/30 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-game-blue" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-sans leading-none mb-0.5">
                  {t('game.score')}
                </p>
                <p className="text-base sm:text-lg font-bold font-sans leading-none">{score}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-game-green/30 bg-card/95 backdrop-blur shadow-lg flex-1 sm:flex-none">
          <CardContent className="p-2 sm:p-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-game-green/20 border border-game-green/30 flex items-center justify-center">
                <Heart className="w-5 h-5 text-game-green" />
              </div>
              <div className="flex-1 min-w-[120px] sm:min-w-[140px]">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-sans leading-none">
                    {t('game.health')}
                  </p>
                  <span className="text-xs sm:text-sm font-bold font-sans leading-none">
                    {health}/{maxHealth}
                  </span>
                </div>
                <Progress
                  value={(health / maxHealth) * 100}
                  className="h-2.5"
                  indicatorClassName="bg-game-green"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:hidden">
        <Card className="border-border/50 bg-card/95 backdrop-blur shadow-lg">
          <CardContent className="p-2">
            <div className="flex gap-1.5">
              <button
                onClick={() => onWeaponChange?.('laser')}
                className={`flex-1 py-2 px-3 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  currentWeapon === 'laser'
                    ? 'bg-game-green/20 text-game-green border-2 border-game-green/50 shadow-lg shadow-game-green/20'
                    : 'bg-muted/30 text-muted-foreground border-2 border-transparent hover:bg-muted/50'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">{t('weapons.laser')}</span>
              </button>
              <button
                onClick={() => onWeaponChange?.('explosive')}
                className={`flex-1 py-2 px-3 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  currentWeapon === 'explosive'
                    ? 'bg-game-red/20 text-game-red border-2 border-game-red/50 shadow-lg shadow-game-red/20'
                    : 'bg-muted/30 text-muted-foreground border-2 border-transparent hover:bg-muted/50'
                }`}
              >
                <Bomb className="w-4 h-4" />
                <span className="hidden sm:inline">{t('weapons.explosive')}</span>
              </button>
              <button
                onClick={() => onWeaponChange?.('melee')}
                className={`flex-1 py-2 px-3 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  currentWeapon === 'melee'
                    ? 'bg-game-yellow/20 text-game-yellow border-2 border-game-yellow/50 shadow-lg shadow-game-yellow/20'
                    : 'bg-muted/30 text-muted-foreground border-2 border-transparent hover:bg-muted/50'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span className="hidden sm:inline">{t('weapons.melee')}</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
