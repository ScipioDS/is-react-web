import { Button } from '@/components/ui/button';
import { WifiOff, Trophy, RotateCw } from 'lucide-react';
import type { FC } from 'react';

type GameOverModalProps = {
  score: number;
  onRestart: () => void;
};

const GameOverModal: FC<GameOverModalProps> = ({ score, onRestart }) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onRestart}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-xl shadow-xl max-w-md w-full mx-4 p-6 flex flex-col items-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-rose-600/10 rounded-full p-4 flex items-center justify-center">
          <WifiOff className="w-10 h-10 text-rose-500" />
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-rose-500 text-center">Game Over</h2>

        <div className="bg-slate-950 border border-slate-700 rounded-lg py-4 px-6 flex flex-col items-center gap-1 w-full text-center">
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Final Score</span>
          </div>
          <span className="text-2xl font-bold text-amber-400">{score}</span>
        </div>

        <Button
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg shadow-sm transition-colors"
        >
          <RotateCw className="w-4 h-4" />
          Restart Game
        </Button>

        <p className="text-xs text-slate-400 text-center mt-2">Take a deep breath and try again!</p>
      </div>
    </div>
  );
};

export default GameOverModal;
