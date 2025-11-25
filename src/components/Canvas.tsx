import type { RefObject } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network } from 'lucide-react';

interface GameCanvasProps {
  gameRef: RefObject<HTMLDivElement | null>;
}

export default function GameCanvas({ gameRef }: GameCanvasProps) {
  return (
    <Card
      className="flex-1 bg-linear-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 shadow-2xl flex flex-col"
      style={{ height: 650 }}
    >
      <CardHeader className="py-2 border-b rounded-t-md bg-slate-800 border-slate-700/50">
        <CardTitle className="flex items-center gap-2 justify-center">
          <Network className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold  text-slate-200 uppercase tracking-wide">
            Network Monitor
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 flex-1 flex items-center justify-center">
        <div ref={gameRef} className="rounded-lg overflow-hidden w-full h-full" />
      </CardContent>
    </Card>
  );
}
