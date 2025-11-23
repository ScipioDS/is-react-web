import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Heart, Trophy, ShieldCheck, Copy, BarChart2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GameHeaderProps {
  targetIp: string;
  score: number;
  health: number;
  onShowInstructions: () => void;
}

export default function GameHeader({
  targetIp,
  score,
  health,
  onShowInstructions,
}: GameHeaderProps) {
  const [scoreGlow, setScoreGlow] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (score === 0) return;
    setScoreGlow(true);
    const timer = setTimeout(() => setScoreGlow(false), 500);
    return () => clearTimeout(timer);
  }, [score]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(targetIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <Card className="relative overflow-hidden border-0 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-500 to-blue-600 opacity-40"></div>
          <div
            className="absolute animate-grid-move"
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
        </div>

        <CardContent className="relative p-6 flex flex-col items-center gap-3">
          <ShieldCheck className="w-12 h-12 text-white drop-shadow-lg" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 drop-shadow-lg animate-text-glow text-center">
            Network Defense
          </h1>
          <Button
            onClick={onShowInstructions}
            variant="outline"
            size="sm"
            className="mt-2 text-xs border-white/30 w-full flex items-center justify-center gap-2"
          >
            How to Play
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-950/40 to-red-900/20 border-red-800/50 shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2 flex items-left justify-between mb-3">
          <CardTitle className="text-sm text-red-100 flex items-center gap-2 font-semibold">
            <Target className="w-4 h-4 text-red-400" />
            Target IP
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between relative">
            <Badge
              variant="destructive"
              className="text-base px-3 py-1 font-mono shadow-md bg-red-700/20 text-red-300 border-red-600/30 flex items-center justify-center"
            >
              {targetIp}
            </Badge>

            <Button
              onClick={copyToClipboard}
              variant="ghost"
              size="icon"
              className="p-1 hover:bg-red-800/30 relative"
            >
              <Copy className="w-4 h-4 text-red-300 hover:text-red-200 transition-colors" />
              {copied && (
                <span className="absolute -top-8 text-xs text-white bg-black/70 rounded whitespace-nowrap">
                  Copied!
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/90 border-slate-700/50 shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2 flex items-left justify-between mb-3">
          <CardTitle className="text-sm text-slate-100 flex items-center gap-2 font-semibold">
            <BarChart2 className="w-4 h-4 text-green-400" />
            Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-xs text-slate-300">Score</span>
            </div>
            <Badge
              variant="default"
              className={`text-base px-3 py-1 shadow-md bg-amber-500/20 text-amber-300 border-amber-600/30 flex items-center justify-center transition-all duration-300 ${
                scoreGlow ? 'animate-pulse scale-110' : ''
              }`}
            >
              {score}
            </Badge>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart
                  className={`w-5 h-5 mb-2 ${health > 5 ? 'text-rose-400' : 'text-red-500'}`}
                />
                <span className="text-xs text-slate-300">Health</span>
              </div>
              <span className="text-xs text-slate-300 font-mono">{health * 10}%</span>
            </div>
            <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-4 rounded-full transition-all duration-300 ${
                  health > 5 ? 'bg-emerald-400' : 'bg-red-500 animate-pulse'
                }`}
                style={{ width: `${(health / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
