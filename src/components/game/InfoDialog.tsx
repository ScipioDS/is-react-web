import React from 'react';
import { Info, Shield, Trophy, Zap, Bomb, Swords } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface InfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoDialog({ isOpen, onClose }: InfoDialogProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-border/50 bg-card/95 backdrop-blur shadow-xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-border/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-sans font-bold flex items-center gap-2">
              <Info className="w-5 h-5 text-game-blue" />
              {t('game.howToPlay')}
            </CardTitle>
            <Button onClick={onClose} variant="ghost" size="sm" className="h-8 w-8 p-0">
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold font-sans mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-game-yellow" />
              {t('info.objective.title')}
            </h3>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed">
              {t('info.objective.description')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-sans mb-3">{t('info.controls.title')}</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex gap-1 mt-0.5">
                    <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">W</Badge>
                    <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">A</Badge>
                    <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">S</Badge>
                    <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">D</Badge>
                  </div>
                  <div>
                    <p className="font-semibold font-sans text-foreground mb-1">{t('info.controls.movement')}</p>
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                      {t('info.controls.movementDesc')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-mono">
                  {t('info.controls.clickHold')}
                </Badge>
                <span className="text-muted-foreground font-sans">
                  {t('info.controls.clickHoldDesc')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-mono">
                  {t('info.controls.autoFire')}
                </Badge>
                <span className="text-muted-foreground font-sans">
                  {t('info.controls.autoFireDesc')}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold font-sans">{t('info.weapons.title')}</h3>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 border border-border/50">
                <Badge variant="outline" className="font-mono text-xs">
                  Tab
                </Badge>
                <span className="text-xs text-muted-foreground font-sans">{t('info.weapons.switchHint')}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-game-green/10 border border-game-green/30">
                <Zap className="w-5 h-5 text-game-green mt-0.5" />
                <div>
                  <p className="font-semibold font-sans text-sm">{t('info.weapons.laser.name')}</p>
                  <p className="text-xs text-muted-foreground font-sans">
                    {t('info.weapons.laser.description')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-game-red/10 border border-game-red/30">
                <Bomb className="w-5 h-5 text-game-red mt-0.5" />
                <div>
                  <p className="font-semibold font-sans text-sm">{t('info.weapons.explosive.name')}</p>
                  <p className="text-xs text-muted-foreground font-sans">
                    {t('info.weapons.explosive.description')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-game-yellow/10 border border-game-yellow/30">
                <Swords className="w-5 h-5 text-game-yellow mt-0.5" />
                <div>
                  <p className="font-semibold font-sans text-sm">{t('info.weapons.melee.name')}</p>
                  <p className="text-xs text-muted-foreground font-sans">
                    {t('info.weapons.melee.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-sans mb-2 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-game-blue" />
              {t('info.quiz.title')}
            </h3>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed">
              {t('info.quiz.description')}
            </p>
          </div>

          <div className="pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground font-sans text-center">
              {t('info.goodLuck')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
