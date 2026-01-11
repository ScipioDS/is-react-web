import React from 'react';
import { Zap, Bomb, Swords } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WeaponWheelProps {
  isOpen: boolean;
  currentWeapon: 'laser' | 'explosive' | 'melee';
  onWeaponSelect: (weapon: 'laser' | 'explosive' | 'melee') => void;
}

export function WeaponWheel({ isOpen, currentWeapon, onWeaponSelect }: WeaponWheelProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-xs sm:text-sm text-muted-foreground font-sans mb-1">
              {t('game.selectWeapon')}
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-sans">
              {t('game.releaseTab')}
            </p>
          </div>
        </div>

        <button
          onClick={() => onWeaponSelect('laser')}
          onMouseEnter={() => onWeaponSelect('laser')}
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 transition-all ${
            currentWeapon === 'laser'
              ? 'border-game-green bg-game-green/20 scale-110'
              : 'border-border/50 bg-card/95 hover:border-game-green/50'
          } backdrop-blur flex flex-col items-center justify-center gap-1`}
        >
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-game-green" />
          <span className="text-[10px] sm:text-xs font-sans font-semibold">
            {t('weapons.laser')}
          </span>
        </button>

        <button
          onClick={() => onWeaponSelect('explosive')}
          onMouseEnter={() => onWeaponSelect('explosive')}
          className={`absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 transition-all ${
            currentWeapon === 'explosive'
              ? 'border-game-red bg-game-red/20 scale-110'
              : 'border-border/50 bg-card/95 hover:border-game-red/50'
          } backdrop-blur flex flex-col items-center justify-center gap-1`}
        >
          <Bomb className="w-5 h-5 sm:w-6 sm:h-6 text-game-red" />
          <span className="text-[10px] sm:text-xs font-sans font-semibold">
            {t('weapons.explosive')}
          </span>
        </button>

        <button
          onClick={() => onWeaponSelect('melee')}
          onMouseEnter={() => onWeaponSelect('melee')}
          className={`absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 transition-all ${
            currentWeapon === 'melee'
              ? 'border-game-yellow bg-game-yellow/20 scale-110'
              : 'border-border/50 bg-card/95 hover:border-game-yellow/50'
          } backdrop-blur flex flex-col items-center justify-center gap-1`}
        >
          <Swords className="w-5 h-5 sm:w-6 sm:h-6 text-game-yellow" />
          <span className="text-[10px] sm:text-xs font-sans font-semibold">
            {t('weapons.melee')}
          </span>
        </button>
      </div>
    </div>
  );
}
