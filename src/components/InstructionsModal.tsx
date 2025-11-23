import { Button } from '@/components/ui/button';
import {
  BookOpen,
  ShieldCheck,
  XCircle,
  ThumbsUp,
  CheckCircle,
  Cpu,
  MousePointer,
  AlertTriangle,
} from 'lucide-react';

interface InstructionsModalProps {
  onClose: () => void;
}

export default function InstructionsModal({ onClose }: InstructionsModalProps) {
  const steps = [
    {
      title: 'Goal',
      description:
        'Protect your router from malicious packets while allowing safe traffic through.',
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      color: 'bg-cyan-800/30',
    },
    {
      title: 'Malicious Packets',
      description: 'Red IP addresses match the target IP at the top. Block them!',
      icon: <XCircle className="w-5 h-5 text-red-400" />,
      color: 'bg-red-800/30',
    },
    {
      title: 'Safe Packets',
      description: 'Green IP addresses are harmless. Let them pass.',
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
      color: 'bg-green-800/30',
    },
    {
      title: 'Using Firewalls',
      description: (
        <>
          Type commands in the console:
          <ul className="list-disc list-inside mt-1 pl-5 space-y-1 text-xs">
            <li>
              <code className="bg-slate-800/50 px-2 py-0.5 rounded font-mono">
                firewall route1 192.168.1.100
              </code>{' '}
              - Block IP on route 1
            </li>
            <li>
              <code className="bg-slate-800/50 px-2 py-0.5 rounded font-mono">help</code> - Show
              available commands
            </li>
            <li>
              <code className="bg-slate-800/50 px-2 py-0.5 rounded font-mono">clear</code> - Clear
              console
            </li>
          </ul>
        </>
      ),
      icon: <Cpu className="w-5 h-5 text-yellow-400" />,
      color: 'bg-yellow-800/20',
    },
    {
      title: 'Click Packets',
      description: 'Click a packet to auto-fill its IP into the console.',
      icon: <MousePointer className="w-5 h-5 text-blue-400" />,
      color: 'bg-blue-800/20',
    },
    {
      title: 'Warning',
      description:
        'If a malicious packet reaches the router, you lose health. Game over at 0 health!',
      icon: <AlertTriangle className="w-5 h-5 text-red-300" />,
      color: 'bg-red-900/20',
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-slate-900/95 border border-slate-700 rounded-xl p-6 max-w-3xl mx-4 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-cyan-400" />
          <h2 className="text-2xl font-bold">How to Play</h2>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-lg ${step.color} border border-slate-700 shadow-sm`}
            >
              <div className="shrink-0">{step.icon}</div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-100">{step.title}</span>
                <span className="text-slate-300 text-sm">{step.description}</span>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-6 bg-linear-to-r from-blue-600 to-blue-600 hover:from-cyan-600 via-blue-600 hover:to-blue-600 shadow-lg"
        >
          <ThumbsUp className="w-4 h-4" />
          Got It
        </Button>
      </div>
    </div>
  );
}
