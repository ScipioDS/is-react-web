import { Zap, Heart, Target, Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RewardPopupProps {
  rewards: string[];
  onSelect: (reward: string) => void;
}

const rewardConfig: Record<string, { icon: React.ReactNode; label: string; description: string }> =
  {
    faster_autofire: {
      icon: <Zap className="w-5 h-5" />,
      label: 'Faster Autofire',
      description: 'Increase fire rate',
    },
    power_attack: {
      icon: <Sparkles className="w-5 h-5" />,
      label: 'Power Attack',
      description: 'Double turret damage',
    },
    health_boost: {
      icon: <Heart className="w-5 h-5" />,
      label: 'Health Boost',
      description: '+1 Health point',
    },
    area_attack_radius: {
      icon: <Target className="w-5 h-5" />,
      label: 'Area Radius+',
      description: 'Larger attack area',
    },
    area_attack_power: {
      icon: <Sparkles className="w-5 h-5" />,
      label: 'Area Power+',
      description: 'Stronger area attacks',
    },
  };

export const RewardPopup = ({ rewards, onSelect }: RewardPopupProps) => {
  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
      <Card className="w-full max-w-md border-game-yellow/40 bg-card/95 backdrop-blur shadow-xl animate-scale-in">
        <CardHeader className="text-center pb-4 pt-8">
          <div className="mx-auto w-20 h-20 rounded-full bg-game-yellow/20 border-2 border-game-yellow/40 flex items-center justify-center mb-4">
            <Trophy className="w-10 h-10 text-game-yellow" />
          </div>
          <CardTitle className="text-2xl font-sans font-bold text-game-yellow">Correct!</CardTitle>
          <p className="text-muted-foreground mt-2 font-sans">Choose your reward</p>
        </CardHeader>

        <CardContent className="space-y-3 pb-8">
          {rewards.map((reward, index) => {
            const config = rewardConfig[reward] || {
              icon: <Sparkles className="w-5 h-5" />,
              label: reward,
              description: 'Special upgrade',
            };

            return (
              <Button
                key={index}
                onClick={() => onSelect(reward)}
                variant="outline"
                size="lg"
                className="w-full justify-start gap-4 h-auto py-4 font-sans border-border/50 hover:border-game-yellow/50 hover:bg-game-yellow/10 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-game-yellow/20 border border-game-yellow/30 flex items-center justify-center shrink-0 text-game-yellow">
                  {config.icon}
                </div>
                <div className="text-left">
                  <div className="font-bold text-foreground">{config.label}</div>
                  <div className="text-xs text-muted-foreground font-normal">
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
