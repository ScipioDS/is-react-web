import { Button } from '@/components/ui/button';
import { WifiOff, Trophy, RotateCw, AlertCircle } from 'lucide-react';
import type { FC } from 'react';

type GameOverModalProps = {
  score: number;
  onRestart: () => void;
};

const GameOverModal: FC<GameOverModalProps> = ({ score, onRestart }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onRestart}
    >
      <div
        className="bg-slate-900 rounded-xl border border-slate-700 shadow-2xl p-8 max-w-md w-full mx-4 flex flex-col items-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <WifiOff className="w-12 h-12 text-rose-500 animate-pulse" />
        <h2 className="text-4xl font-extrabold text-rose-500 mb-2 text-center">Game Over</h2>

        <div className="bg-slate-950 border border-slate-700 rounded-lg py-4 px-8 mb-6 text-center flex flex-col items-center gap-2">
          <p className="text-md text-slate-400 flex items-center gap-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            Final Score
          </p>
          <p className="text-3xl font-bold text-amber-400">{score}</p>
        </div>

        <Button
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-semibold"
        >
          <RotateCw className="w-4 h-4" />
          Restart Game
        </Button>
      </div>
    </div>
  );
};

export default GameOverModal;
