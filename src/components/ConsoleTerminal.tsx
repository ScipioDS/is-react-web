import type { RefObject, FormEvent, KeyboardEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ConsoleTerminalProps {
  consoleHistory: Array<{ type: 'command' | 'output' | 'error'; text: string }>;
  consoleInput: string;
  consoleEndRef: RefObject<HTMLDivElement | null>;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

export default function Terminal({
  consoleHistory,
  consoleInput,
  consoleEndRef,
  onInputChange,
  onSubmit,
  onKeyDown,
}: ConsoleTerminalProps) {
  return (
    <Card
      className="flex-1 bg-slate-900/95 border-slate-700/50 shadow-xl backdrop-blur-sm font-mono flex flex-col"
      style={{ height: 650 }}
    >
      <CardHeader className="pb-2 border-b border-slate-700/50">
        <CardTitle className="flex items-center gap-2 text-slate-200 text-xs">
          <span className="text-slate-400">root@firewall:~#</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 flex-1 flex flex-col overflow-hidden">
        <div className="space-y-2 flex-1 flex flex-col min-h-0">
          <div className="bg-black/60 rounded border border-slate-700/30 p-3 flex-1 overflow-y-auto text-xs min-h-0">
            {consoleHistory.map((entry, i) => (
              <div
                key={i}
                className={`${
                  entry.type === 'command'
                    ? 'text-white font-bold'
                    : entry.type === 'error'
                    ? 'text-red-400'
                    : 'text-slate-300'
                }`}
              >
                {entry.text}
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 items-center shrink-0">
            <span className="text-slate-400 text-sm">$</span>
            <Input
              value={consoleInput}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="firewall route1 192.168.1.100"
              className="flex-1 bg-black/40 border-slate-700/50 text-white font-mono text-sm h-9 focus:border-slate-500 placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
