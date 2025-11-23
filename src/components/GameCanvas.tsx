import type { RefObject } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface GameCanvasProps {
  gameRef: RefObject<HTMLDivElement | null>;
}

export default function GameCanvas({ gameRef }: GameCanvasProps) {
  return (
    <Card
      className="flex-1 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 shadow-2xl"
      style={{ height: 650 }}
    >
      <CardContent className="p-2 h-full flex items-center justify-center">
        <div ref={gameRef} className="rounded-lg overflow-hidden w-full h-full" />
      </CardContent>
    </Card>
  );
}
