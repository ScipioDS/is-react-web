import React from 'react';
import { Shield, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GameHeaderProps {
  isPaused: boolean;
  onInfoClick: () => void;
}

export function GameHeader({ isPaused, onInfoClick }: GameHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="px-4 pt-3 pb-2 border-b border-border/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-game-yellow" />
          <h3 className="text-sm font-semibold font-sans text-foreground">{t('game.title')}</h3>
          <Badge
            variant="outline"
            className={`text-xs font-sans border-border/50 ${
              isPaused ? 'text-muted-foreground' : 'text-game-green'
            }`}
          >
            {isPaused ? t('game.paused') : t('game.active')}
          </Badge>
        </div>
        <Button onClick={onInfoClick} variant="ghost" size="sm" className="h-7 w-7 p-0">
          <Info className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
