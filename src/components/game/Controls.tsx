import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Crosshair } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type ControlsProps = {
  isPaused: boolean;
  onTogglePause: () => void;
  onRestart: () => void;
  onMobileMove?: (direction: 'up' | 'down' | 'left' | 'right', isPressed: boolean) => void;
};

export function Controls({ isPaused, onTogglePause, onRestart, onMobileMove }: ControlsProps) {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);
  const isDraggingJoystick = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleJoystickMove = (clientX: number, clientY: number) => {
    if (!joystickRef.current || !isDraggingJoystick.current) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;

    const maxDistance = 40;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > maxDistance) {
      deltaX = (deltaX / distance) * maxDistance;
      deltaY = (deltaY / distance) * maxDistance;
    }

    setJoystickPosition({ x: deltaX, y: deltaY });

    if (!onMobileMove) return;

    const threshold = 15;
    onMobileMove('up', deltaY < -threshold);
    onMobileMove('down', deltaY > threshold);
    onMobileMove('left', deltaX < -threshold);
    onMobileMove('right', deltaX > threshold);
  };

  const handleJoystickStart = (e: TouchEvent | MouseEvent) => {
    e.stopPropagation();
    isDraggingJoystick.current = true;
    setJoystickActive(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    handleJoystickMove(clientX, clientY);
  };

  const handleJoystickEnd = () => {
    isDraggingJoystick.current = false;
    setJoystickActive(false);
    setJoystickPosition({ x: 0, y: 0 });
    if (onMobileMove) {
      onMobileMove('up', false);
      onMobileMove('down', false);
      onMobileMove('left', false);
      onMobileMove('right', false);
    }
  };

  useEffect(() => {
    if (!joystickActive) return;

    const handleMove = (e: TouchEvent | MouseEvent) => {
      if (!isDraggingJoystick.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      handleJoystickMove(clientX, clientY);
    };

    const handleEnd = () => {
      if (isDraggingJoystick.current) {
        handleJoystickEnd();
      }
    };

    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    return () => {
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
    };
  }, [joystickActive, handleJoystickMove, handleJoystickEnd]);

  return (
    <Card className="border-border/30 bg-card/95 backdrop-blur shadow-lg">
      <CardContent className="p-2 sm:p-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={onTogglePause}
              variant="outline"
              size="default"
              className="gap-2 font-sans border-game-yellow/50 text-game-yellow hover:bg-game-yellow/10 flex-1 sm:flex-none"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">{t('game.resume')}</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">{t('game.pause')}</span>
                </>
              )}
            </Button>

            <Button
              onClick={onRestart}
              variant="outline"
              size="default"
              className="gap-2 font-sans border-game-red/50 text-game-red hover:bg-game-red/10 flex-1 sm:flex-none"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-xs sm:text-sm">{t('game.restart')}</span>
            </Button>
          </div>

          {isMobile && onMobileMove && (
            <div className="flex items-center justify-center">
              <div
                ref={joystickRef}
                className="relative w-32 h-32 rounded-full bg-card/50 border-2 border-game-blue/30 flex items-center justify-center"
                onTouchStart={handleJoystickStart}
                onMouseDown={handleJoystickStart}
                aria-label="Movement joystick"
              >
                <div className="absolute w-24 h-24 rounded-full border border-game-blue/20" />
                <div className="absolute w-16 h-16 rounded-full border border-game-blue/15" />
                <div className="absolute w-8 h-8 rounded-full border border-game-blue/10" />

                <div
                  className="absolute w-12 h-12 rounded-full bg-game-blue/40 border-2 border-game-blue shadow-lg transition-transform pointer-events-none"
                  style={{
                    transform: `translate(${joystickPosition.x}px, ${joystickPosition.y}px)`,
                    boxShadow: joystickActive
                      ? '0 0 20px rgba(96, 165, 250, 0.5)'
                      : '0 0 10px rgba(96, 165, 250, 0.3)',
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-game-blue/60 to-game-blue/30" />
                </div>
              </div>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground font-sans">
            <Crosshair className="w-4 h-4" />
            <span>{t('game.controlsHint')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
