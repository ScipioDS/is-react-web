import React from 'react';
import { Shield, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageSelector } from './LanguageSelector';

interface GameHeaderProps {
  isPaused: boolean;
  onInfoClick: () => void;
}

export function GameHeader({ isPaused, onInfoClick }: GameHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="px-3 sm:px-4 pt-2 sm:pt-3 pb-1.5 sm:pb-2 border-b border-border/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-game-yellow" />
          <h3 className="text-xs sm:text-sm font-semibold font-sans text-foreground">
            {t('game.title')}
          </h3>
          <Badge
            variant="outline"
            className={`text-[10px] sm:text-xs font-sans border-border/50 ${
              isPaused ? 'text-muted-foreground' : 'text-game-green'
            }`}
          >
            {isPaused ? t('game.paused') : t('game.active')}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Button
            onClick={onInfoClick}
            variant="ghost"
            size="sm"
            className="h-6 sm:h-7 px-2 gap-1.5"
            aria-label="Show game information"
          >
            <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs hidden sm:inline">{t('game.howToPlay')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
