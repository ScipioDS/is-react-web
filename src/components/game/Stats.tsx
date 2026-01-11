import { useState } from 'react';
import { Trophy, Heart, Zap, Bomb, Swords, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type StatsProps = {
  score: number;
  health: number;
  maxHealth?: number;
  laserAmmo?: number;
  explosiveAmmo?: number;
  meleeAmmo?: number;
  maxLaserAmmo?: number;
  maxExplosiveAmmo?: number;
  maxMeleeAmmo?: number;
  currentWeapon?: 'laser' | 'explosive' | 'melee';
  onWeaponChange?: (weapon: 'laser' | 'explosive' | 'melee') => void;
};

export function Stats({
  score,
  health,
  maxHealth = 10,
  laserAmmo = 35,
  explosiveAmmo = 40,
  meleeAmmo = 5,
  maxLaserAmmo = 35,
  maxExplosiveAmmo = 40,
  maxMeleeAmmo = 5,
  currentWeapon = 'laser',
  onWeaponChange,
}: StatsProps) {
  const { t } = useTranslation();
  const [showWeaponSelector, setShowWeaponSelector] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
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

        <Card className="border-game-yellow/30 bg-card/95 backdrop-blur shadow-lg w-full sm:min-w-[280px] sm:w-auto">
          <CardContent className="p-2 sm:p-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-game-yellow/20 border border-game-yellow/30 flex items-center justify-center flex-shrink-0">
                <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-game-yellow" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground font-sans leading-none mb-1">
                  {t('stats.ammo')}
                </p>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="flex-1 min-w-0">
                    <div
                      className={`flex items-center gap-0.5 sm:gap-1 px-1 py-0.5 sm:px-1.5 sm:py-1 rounded ${
                        currentWeapon === 'laser'
                          ? 'bg-game-green/30 border border-game-green'
                          : 'bg-game-green/10'
                      }`}
                    >
                      <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-game-green flex-shrink-0" />
                      <span className="text-[8px] sm:text-[9px] font-bold font-sans leading-none whitespace-nowrap">
                        {laserAmmo}/{maxLaserAmmo}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className={`flex items-center gap-0.5 sm:gap-1 px-1 py-0.5 sm:px-1.5 sm:py-1 rounded ${
                        currentWeapon === 'explosive'
                          ? 'bg-game-red/30 border border-game-red'
                          : 'bg-game-red/10'
                      }`}
                    >
                      <Bomb className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-game-red flex-shrink-0" />
                      <span className="text-[8px] sm:text-[9px] font-bold font-sans leading-none whitespace-nowrap">
                        {explosiveAmmo}/{maxExplosiveAmmo}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className={`flex items-center gap-0.5 sm:gap-1 px-1 py-0.5 sm:px-1.5 sm:py-1 rounded ${
                        currentWeapon === 'melee'
                          ? 'bg-game-yellow/30 border border-game-yellow'
                          : 'bg-game-yellow/10'
                      }`}
                    >
                      <Swords className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-game-yellow flex-shrink-0" />
                      <span className="text-[8px] sm:text-[9px] font-bold font-sans leading-none whitespace-nowrap">
                        {meleeAmmo}/{maxMeleeAmmo}
                      </span>
                    </div>
                  </div>
                </div>
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
