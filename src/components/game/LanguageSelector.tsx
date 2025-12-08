import React from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-card/95 border border-border/50 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
          <Languages className="w-3.5 h-3.5" />
          <span className="text-xs font-sans">{i18n.language === 'mk' ? 'МК' : 'SQ'}</span>
          <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[140px]">
        <DropdownMenuItem 
          onClick={() => changeLanguage('mk')}
          className="text-sm font-sans cursor-pointer"
        >
          Македонски (МК)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('sq')}
          className="text-sm font-sans cursor-pointer"
        >
          Shqip (SQ)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
