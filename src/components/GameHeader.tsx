import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Heart, Trophy, AlertTriangle } from 'lucide-react';

interface GameHeaderProps {
  targetIp: string;
  score: number;
  health: number;
  onNewTarget: () => void;
  onShowInstructions: () => void;
}

export default function GameHeader({
  targetIp,
  score,
  health,
  onNewTarget,
  onShowInstructions,
}: GameHeaderProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/70 border-slate-700/50 shadow-xl backdrop-blur-sm">
        <CardContent className="p-4">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            🛡️ Network Defense
          </h1>
          <Button
            onClick={onShowInstructions}
            variant="outline"
            size="sm"
            className="mt-2 text-xs border-slate-600 hover:bg-slate-800"
          >
            📖 How to Play
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-950/80 to-red-900/40 border-red-800/50 shadow-xl backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-red-100 text-sm">
            <Target className="w-4 h-4 text-red-400" />
            Malicious IP
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Badge
            variant="destructive"
            className="text-base px-3 py-1.5 font-mono shadow-lg bg-red-600 hover:bg-red-700"
          >
            {targetIp}
          </Badge>
          <Button
            onClick={onNewTarget}
            variant="outline"
            size="sm"
            className="w-full border-red-700/50 hover:bg-red-900/30 text-xs"
          >
            <AlertTriangle className="w-3 h-3" />
            New Target
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/70 border-slate-700/50 shadow-xl backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-100">Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-300">Score</span>
            </div>
            <Badge
              variant="default"
              className="text-base px-3 py-1 shadow-md bg-amber-500/20 text-amber-300 border-amber-600/30"
            >
              {score}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className={`w-4 h-4 ${health > 5 ? 'text-rose-400' : 'text-red-500'}`} />
              <span className="text-xs text-slate-300">Health</span>
            </div>
            <Badge
              variant={health > 5 ? 'default' : 'destructive'}
              className={`text-base px-3 py-1 shadow-md ${
                health > 5
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-600/30'
                  : 'bg-red-600 text-white animate-pulse'
              }`}
            >
              {health}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
