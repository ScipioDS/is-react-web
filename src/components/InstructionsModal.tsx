import { Button } from '@/components/ui/button';

interface InstructionsModalProps {
  onClose: () => void;
}

export default function InstructionsModal({ onClose }: InstructionsModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-slate-900/95 border border-slate-700 rounded-lg p-6 max-w-2xl mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">📖 How to Play</h2>
        <div className="space-y-3 text-slate-200 text-sm">
          <p>
            <strong className="text-cyan-300">Goal:</strong> Protect your router from malicious
            packets while allowing safe traffic through.
          </p>
          <p>
            <strong className="text-cyan-300">Malicious Packets:</strong> Red IP addresses match the
            target IP shown at the top. Block them!
          </p>
          <p>
            <strong className="text-cyan-300">Safe Packets:</strong> Green IP addresses are
            harmless. Let them pass.
          </p>
          <p>
            <strong className="text-cyan-300">Using Firewalls:</strong> Type commands in the
            console:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>
              <code className="bg-black/40 px-2 py-0.5 rounded text-xs">
                firewall route1 192.168.1.100
              </code>{' '}
              - Block IP on route 1
            </li>
            <li>
              <code className="bg-black/40 px-2 py-0.5 rounded text-xs">help</code> - Show available
              commands
            </li>
            <li>
              <code className="bg-black/40 px-2 py-0.5 rounded text-xs">clear</code> - Clear console
            </li>
          </ul>
          <p>
            <strong className="text-cyan-300">Click Packets:</strong> Click on a packet to auto-fill
            its IP into the console.
          </p>
          <p>
            <strong className="text-red-400">Warning:</strong> If a malicious packet reaches the
            router, you lose health. Game over at 0 health!
          </p>
        </div>
        <Button
          onClick={onClose}
          className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
        >
          Got it!
        </Button>
      </div>
    </div>
  );
}
