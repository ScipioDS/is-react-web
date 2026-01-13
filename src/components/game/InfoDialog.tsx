import React from 'react';
import { Info, Shield, Trophy, Zap, Bomb, Swords, Package, BarChart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type InfoDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onReady?: () => void;
  isFirstVisit?: boolean;
};

export function InfoDialog({ isOpen, onClose, onReady, isFirstVisit = false }: InfoDialogProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-border/50 bg-card/95 backdrop-blur shadow-xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-border/30 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl font-sans font-bold flex items-center gap-2">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-game-blue" />
              {t('game.howToPlay')}
            </CardTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-lg sm:text-xl"
              aria-label="Close dialog"
            >
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold font-sans mb-2 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-game-yellow" />
              {t('info.objective.title')}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
              {t('info.objective.description')}
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold font-sans mb-2 sm:mb-3">
              {t('info.controls.title')}
            </h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="p-2 sm:p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <div className="flex gap-1 mt-0.5">
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5"
                    >
                      W
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5"
                    >
                      A
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5"
                    >
                      S
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5"
                    >
                      D
                    </Badge>
                  </div>
                  <div>
                    <p className="font-semibold font-sans text-foreground mb-1 text-xs sm:text-sm">
                      {t('info.controls.movement')}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-sans leading-relaxed">
                      {t('info.controls.movementDesc')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <Badge variant="outline" className="font-mono text-[10px] sm:text-xs">
                  {t('info.controls.clickHold')}
                </Badge>
                <span className="text-muted-foreground font-sans text-xs sm:text-sm">
                  {t('info.controls.clickHoldDesc')}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <Badge variant="outline" className="font-mono text-[10px] sm:text-xs">
                  {t('info.controls.autoFire')}
                </Badge>
                <span className="text-muted-foreground font-sans text-xs sm:text-sm">
                  {t('info.controls.autoFireDesc')}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2 sm:mb-3">
              <h3 className="text-base sm:text-lg font-semibold font-sans">
                {t('info.weapons.title')}
              </h3>
              <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-muted/50 border border-border/50">
                <Badge variant="outline" className="font-mono text-[10px] sm:text-xs">
                  Tab
                </Badge>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-sans">
                  {t('info.weapons.switchHint')}
                </span>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-game-green/10 border border-game-green/30">
                <Zap className="w-5 h-5 text-game-green mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold font-sans text-sm">
                      {t('info.weapons.laser.name')}
                    </p>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      35 {t('stats.ammo')}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-sans">
                    {t('info.weapons.laser.description')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-game-red/10 border border-game-red/30">
                <Bomb className="w-5 h-5 text-game-red mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold font-sans text-sm">
                      {t('info.weapons.explosive.name')}
                    </p>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      40 {t('stats.ammo')}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-sans">
                    {t('info.weapons.explosive.description')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-game-yellow/10 border border-game-yellow/30">
                <Swords className="w-5 h-5 text-game-yellow mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold font-sans text-sm">
                      {t('info.weapons.melee.name')}
                    </p>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      5 {t('stats.ammo')}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-sans">
                    {t('info.weapons.melee.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold font-sans mb-2 flex items-center gap-2">
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-game-yellow" />
              {t('stats.ammo')}
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
              <p>
                {t('info.ammo.perWeapon', {
                  defaultValue:
                    'Each weapon has its own ammunition pool. Laser has 35 rounds, Explosive has 70 rounds, and Melee has 5 strikes. Each shot consumes 1 ammo from the current weapon.',
                })}
              </p>
              <p>
                {t('info.ammo.regeneration', {
                  defaultValue:
                    "Ammo regenerates automatically at 10 per second, but only when you haven't fired for 3 seconds.",
                })}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold font-sans mb-2 flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-game-blue" />
              {t('info.quiz.title')}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
              {t('info.quiz.description2', {
                defaultValue:
                  "Every 150 points, you'll face a quiz question. Answer correctly to choose powerful upgrades including increased damage, health restoration, ammo boost, and improved abilities!",
              })}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed mt-2 flex items-center gap-2">
              <BarChart className="w-4 h-4 text-game-yellow" />
              <span>
                {t('stats.level')} {t('info.quiz.levelNote')}
              </span>
            </p>
          </div>

          <div className="pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground font-sans text-center mb-4">
              {t('info.goodLuck')}
            </p>
            {isFirstVisit && onReady ? (
              <div className="flex justify-center">
                <Button
                  onClick={onReady}
                  size="lg"
                  className="bg-game-green hover:bg-game-green/90 text-white font-semibold"
                >
                  {t('info.imReady')}
                </Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <Button
                  onClick={onClose}
                  size="lg"
                  className="bg-game-blue hover:bg-game-blue/90 text-white font-semibold"
                >
                  {t('info.iUnderstand')}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
