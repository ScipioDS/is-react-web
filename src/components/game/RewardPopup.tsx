import { type ReactNode } from 'react';
import { Zap, Heart, Target, Sparkles, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RewardPopupProps = {
  rewards: string[];
  onSelect: (reward: string) => void;
};

export const RewardPopup = ({ rewards, onSelect }: RewardPopupProps) => {
  const { t } = useTranslation();

  const rewardConfig: Record<string, { icon: ReactNode; label: string; description: string }> = {
    faster_autofire: {
      icon: <Zap className="w-5 h-5" />,
      label: t('rewards.fasterAutofire'),
      description: t('rewards.fasterAutofireDesc'),
    },
    power_attack: {
      icon: <Sparkles className="w-5 h-5" />,
      label: t('rewards.powerAttack'),
      description: t('rewards.powerAttackDesc'),
    },
    health_boost: {
      icon: <Heart className="w-5 h-5" />,
      label: t('rewards.healthBoost'),
      description: t('rewards.healthBoostDesc'),
    },
    area_attack_radius: {
      icon: <Target className="w-5 h-5" />,
      label: t('rewards.areaRadius'),
      description: t('rewards.areaRadiusDesc'),
    },
    area_attack_power: {
      icon: <Sparkles className="w-5 h-5" />,
      label: t('rewards.areaPower'),
      description: t('rewards.areaPowerDesc'),
    },
  };

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 z-50 animate-fade-in">
      <Card className="w-full max-w-md border-game-yellow/40 bg-card/95 backdrop-blur shadow-xl animate-scale-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center pb-3 pt-6 sm:pb-4 sm:pt-8">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-game-yellow/20 border-2 border-game-yellow/40 flex items-center justify-center mb-3 sm:mb-4">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-game-yellow" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-sans font-bold text-game-yellow">
            {t('rewards.correct')}
          </CardTitle>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 font-sans">
            {t('rewards.choose')}
          </p>
        </CardHeader>

        <CardContent className="space-y-2 sm:space-y-3 pb-6 sm:pb-8 px-4 sm:px-6">
          {rewards.map((reward, index) => {
            const config = rewardConfig[reward] || {
              icon: <Sparkles className="w-5 h-5" />,
              label: reward,
              description: t('rewards.specialUpgrade'),
            };

            return (
              <Button
                key={index}
                onClick={() => onSelect(reward)}
                variant="outline"
                size="lg"
                className="w-full justify-start gap-3 sm:gap-4 h-auto py-3 sm:py-4 font-sans border-border/50 hover:border-game-yellow/50 hover:bg-game-yellow/10 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-game-yellow/20 border border-game-yellow/30 flex items-center justify-center shrink-0 text-game-yellow">
                  {config.icon}
                </div>
                <div className="text-left">
                  <div className="text-sm sm:text-base font-bold text-foreground">
                    {config.label}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground font-normal">
                    {config.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
