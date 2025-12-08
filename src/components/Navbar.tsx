import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ShieldCheck, Target, Heart, Trophy, Copy, Info, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  targetIp: string;
  score: number;
  health: number;
  onShowInstructions: () => void;
}

export default function Navbar({ targetIp, score, health, onShowInstructions }: NavbarProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(targetIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <TooltipProvider>
      <nav className="w-full bg-slate-900/95 border-b border-slate-700/50 shadow-lg backdrop-blur-sm relative overflow-visible z-10">
        <div className="absolute left-0 top-0 bottom-0 w-80 overflow-hidden pointer-events-none">
          <div
            className="absolute animate-grid-move opacity-10"
            style={{
              width: 'calc(100% + 30px)',
              height: 'calc(100% + 30px)',
              top: '-30px',
              left: '-30px',
              backgroundSize: '30px 30px',
              backgroundImage: `
              linear-gradient(to right, rgba(96, 165, 250, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(34, 211, 238, 0.4) 1px, transparent 1px)
            `,
            }}
          ></div>
          {/* Fade out gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-slate-900/95"></div>
        </div>

        <div className="flex items-center justify-between px-6 py-3 relative z-10">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
              Network Defense
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-red-400" />
              <span className="text-xs text-slate-400 font-medium">Target:</span>
              <Badge
                variant="destructive"
                className="text-sm px-2 py-0.5 font-mono bg-red-900/50 text-red-300 border-red-700/50"
              >
                {targetIp}
              </Badge>
              <Tooltip open={copied}>
                <TooltipTrigger asChild>
                  <Button onClick={copyToClipboard} variant="ghost" size="icon" className="h-7 w-7">
                    <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-cyan-400 transition-colors" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Copied!</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Score */}
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-400 font-medium">Score:</span>
              <Badge
                variant="default"
                className="text-sm px-2 py-0.5 bg-amber-900/50 text-amber-300 border-amber-700/50"
              >
                {score}
              </Badge>
            </div>

            {/* Health */}
            <div className="flex items-center gap-2">
              <Heart className={`w-4 h-4 ${health > 5 ? 'text-rose-400' : 'text-red-500'}`} />
              <span className="text-xs text-slate-400 font-medium">Health:</span>
              <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    health > 5 ? 'bg-emerald-400' : 'bg-red-500 animate-pulse'
                  }`}
                  style={{ width: `${(health / 10) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-300 font-mono w-8">{health * 10}%</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button
              onClick={onShowInstructions}
              variant="outline"
              size="sm"
              className="text-xs border-slate-600 hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              How to Play
            </Button>
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}
