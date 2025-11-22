import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import GameHeader from '@/components/GameHeader';
import Terminal from '@/components/ConsoleTerminal';
import GameCanvas from '@/components/GameCanvas';
import InstructionsModal from '@/components/InstructionsModal';

type FirewallRule = {
  blockedIp: string | null;
};

function destroyPacket(packet: Phaser.GameObjects.Container) {
  packet.list.forEach((obj: any) => obj.destroy?.());
  const bodySprite = packet.getData('bodySprite') as Phaser.Physics.Arcade.Sprite;
  if (bodySprite) bodySprite.destroy();
  packet.destroy();
}

class MainScene extends Phaser.Scene {
  firewalls: Array<Phaser.GameObjects.Container | null>;
  firewallRules: FirewallRule[];
  router: Phaser.GameObjects.Ellipse | null;
  routesX: number[];
  packetGroup: Phaser.Physics.Arcade.Group | null;
  spawnTimer: Phaser.Time.TimerEvent | null;
  targetIp: string;

  constructor(targetIp: string) {
    super({ key: 'MainScene' });
    this.firewalls = [null, null, null];
    this.firewallRules = [{ blockedIp: null }, { blockedIp: null }, { blockedIp: null }];
    this.router = null;
    this.routesX = [150, 275, 400];
    this.packetGroup = null;
    this.spawnTimer = null;
    this.targetIp = targetIp;
  }

  preload() {}

  create() {
    this.add.rectangle(325, 275, 550, 550, 0x041028);

    for (let i = 0; i < 3; i++) {
      const x = this.routesX[i] + 50;
      const line = this.add.line(0, 0, x, 0, x, 480, 0x085f63).setLineWidth(2, 2);
      line.setOrigin(0, 0);
    }

    this.add.rectangle(325, 510, 280, 50, 0x2c3e50);
    this.add.ellipse(325, 535, 280, 30, 0x1c364d, 1);
    this.router = this.add.ellipse(325, 485, 280, 30, 0x294e6e, 1).setStrokeStyle(2, 0x7f8c8d);

    this.packetGroup = this.physics.add.group();

    this.physics.add.overlap(this.packetGroup, this.router, (packetObj: any) => {
      const packet = packetObj as Phaser.GameObjects.Container;
      const ip = packet.getData('ip') as string;
      const routeIndex = packet.getData('route') as number;
      const rule = this.firewallRules[routeIndex];
      if (rule && rule.blockedIp && rule.blockedIp === ip) {
        destroyPacket(packet);
        (this.scene as any).events.emit('packetBlocked', ip);
        return;
      }
      destroyPacket(packet);
      (this.scene as any).events.emit('packetDelivered', ip);
    });

    this.spawnTimer = this.time.addEvent({
      delay: 2000,
      callback: this.spawnPacket,
      callbackScope: this,
      loop: true,
    });

    this.input.on('gameobjectdown', (_pointer: any, obj: any) => {
      const container = obj as Phaser.GameObjects.Container;
      if (!container) return;
      const ip = container.getData('ip') as string;
      (this.scene as any).events.emit('packetClicked', ip);
    });

    this.events.on('update', this.checkFirewallCollisions, this);
  }

  update(_time: number, _delta: number) {
    this.packetGroup?.getChildren().forEach((child) => {
      const packet = child as Phaser.GameObjects.Container;
      const body = packet.getData('bodySprite') as Phaser.Physics.Arcade.Sprite;
      body.setVelocity(0, 40);
      packet.y = body.y;
      packet.x = body.x;
    });
  }

  checkFirewallCollisions() {
    if (!this.packetGroup) return;

    const toDestroy: Phaser.GameObjects.Container[] = [];

    this.packetGroup.children.each((child) => {
      const packet = child as Phaser.GameObjects.Container;
      if (!packet.active) return true;

      const routeIndex = packet.getData('route') as number;
      const firewall = this.firewalls[routeIndex];
      const rule = this.firewallRules[routeIndex];

      if (firewall && rule?.blockedIp) {
        const fx = firewall.x;
        const fy = firewall.y;

        if (Math.abs(packet.x - fx) < 12 && packet.y > fy - 20) {
          const ip = packet.getData('ip') as string;
          if (ip === rule.blockedIp) {
            toDestroy.push(packet);
            if (this.events) {
              this.events.emit('packetBlocked', ip);
            }
          }
        }
      }

      return true;
    });

    toDestroy.forEach(destroyPacket);
  }

  spawnPacket() {
    const route = Phaser.Math.Between(0, 2);
    const startX = this.routesX[route] + 50;
    const startY = -20;

    const currentTargetIp = this.targetIp;
    const isMalicious = Math.random() < 1 / 3;
    const ip = isMalicious ? currentTargetIp : generateRandomIp();
    const isTargetIp = ip === currentTargetIp;
    const textColor = isTargetIp ? '#ff0000' : '#00ff00';

    const container = this.add.container(startX, startY);
    const packetBox = this.add.rectangle(0, 0, 24, 24, 0x333333).setStrokeStyle(2, 0x666666);
    container.add(packetBox);

    const ipText = this.add
      .text(0, -28, ip, { fontSize: '12px', color: textColor, fontStyle: 'bold' })
      .setOrigin(0.5);
    container.add(ipText);

    const bodySprite = this.physics.add.sprite(startX, startY, '');
    container.setData('bodySprite', bodySprite);
    container.setData('ip', ip);
    container.setData('route', route);
    container.setData('malicious', ip === currentTargetIp);

    container.update = () => {
      container.x = bodySprite.x;
      container.y = bodySprite.y;
    };

    this.packetGroup?.add(container as any);
  }
}

function generateRandomIp() {
  return `${Phaser.Math.Between(10, 223)}.${Phaser.Math.Between(0, 255)}.${Phaser.Math.Between(
    0,
    255,
  )}.${Phaser.Math.Between(1, 254)}`;
}

export default function NetworkDefenseGame() {
  const gameRef = useRef<HTMLDivElement | null>(null);
  const phaserRef = useRef<Phaser.Game | null>(null);
  const consoleEndRef = useRef<HTMLDivElement | null>(null);
  const [targetIp, setTargetIp] = useState<string>(generateRandomIp());
  const [health, setHealth] = useState<number>(10);
  const [score, setScore] = useState<number>(0);
  const [consoleInput, setConsoleInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [consoleHistory, setConsoleHistory] = useState<
    Array<{ type: 'command' | 'output' | 'error'; text: string }>
  >([
    { type: 'output', text: 'Network Defense Firewall Control System v1.0' },
    { type: 'output', text: 'Type "help" for available commands' },
  ]);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  useEffect(() => {
    const scheduleNextChange = () => {
      const delay = (5 + Math.random() * 10) * 1000;
      return setTimeout(() => {
        const newIp = generateRandomIp();
        setTargetIp(newIp);
        setConsoleHistory((prev) => [
          ...prev,
          { type: 'output', text: `⚠️  New malicious IP detected: ${newIp}` },
        ]);
        scheduleNextChange();
      }, delay);
    };

    const timerId = scheduleNextChange();
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const scene = phaserRef.current?.scene.getScene('MainScene') as any;
    if (!scene) return;
    scene.targetIp = targetIp;
  }, [targetIp]);

  useEffect(() => {
    if (phaserRef.current) return;

    const timer = setTimeout(() => {
      if (!gameRef.current) return;

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 550,
        height: 550,
        parent: gameRef.current,
        physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 0 }, debug: false } },
        scene: new MainScene(targetIp),
        backgroundColor: '#041028',
        scale: {
          mode: Phaser.Scale.RESIZE,
          width: '100%',
          height: '100%',
        },
      };

      phaserRef.current = new Phaser.Game(config);

      const onPacketBlocked = () => {
        setScore((s) => s + 1);
      };

      const onPacketDelivered = () => {
        setHealth((h) => {
          const nh = h - 1;
          if (nh <= 0) {
            alert('Router has been compromised — Game Over\nYour score: ' + score);
            window.location.reload();
          }
          return nh;
        });
      };

      const onPacketClicked = (ip: string) => {
        setConsoleInput(`firewall route1 ${ip}`);
      };

      const waitForScene = setInterval(() => {
        const s = phaserRef.current?.scene.getScene('MainScene') as any | null;
        if (s) {
          s.events.on('packetBlocked', onPacketBlocked);
          s.events.on('packetDelivered', onPacketDelivered);
          s.events.on('packetClicked', onPacketClicked);
          clearInterval(waitForScene);
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        phaserRef.current?.destroy(true);
        phaserRef.current = null;
        clearInterval(waitForScene);
      };
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  function executeCommand(cmd: string) {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    setConsoleHistory((prev) => [...prev, { type: 'command', text: `$ ${trimmed}` }]);

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();

    if (command === 'help') {
      setConsoleHistory((prev) => [
        ...prev,
        { type: 'output', text: 'Available commands:' },
        { type: 'output', text: '  firewall <route> <ip> - Toggle firewall rule for route (1-3)' },
        { type: 'output', text: '  firewall prune - Remove all firewall rules' },
        { type: 'output', text: '  clear - Clear console history' },
      ]);
    } else if (command === 'clear') {
      setConsoleHistory([]);
    } else if (command === 'firewall') {
      const route = parts[1]?.toLowerCase();
      const ip = parts[2];

      if (route === 'prune') {
        const scene = phaserRef.current?.scene.getScene('MainScene') as any | null;
        if (!scene) {
          setConsoleHistory((prev) => [...prev, { type: 'error', text: 'Game not initialized' }]);
          return;
        }

        let removedCount = 0;
        for (let i = 0; i < 3; i++) {
          if (scene.firewalls[i]) {
            scene.firewalls[i].destroy();
            scene.firewalls[i] = null;
            scene.firewallRules[i] = { blockedIp: null };
            removedCount++;
          }
        }

        setConsoleHistory((prev) => [
          ...prev,
          {
            type: 'output',
            text: `Removed ${removedCount} firewall rule${removedCount !== 1 ? 's' : ''}`,
          },
        ]);
        return;
      }

      if (!route || !ip) {
        setConsoleHistory((prev) => [
          ...prev,
          { type: 'error', text: 'Usage: firewall <route> <ip>' },
          { type: 'error', text: 'Example: firewall route1 192.168.1.100' },
        ]);
        return;
      }

      const routeMatch = route.match(/route(\d)/);
      if (!routeMatch) {
        setConsoleHistory((prev) => [
          ...prev,
          { type: 'error', text: 'Invalid route. Use: route1, route2, or route3' },
        ]);
        return;
      }

      const routeIndex = parseInt(routeMatch[1]) - 1;
      if (routeIndex < 0 || routeIndex > 2) {
        setConsoleHistory((prev) => [...prev, { type: 'error', text: 'Route must be 1, 2, or 3' }]);
        return;
      }

      const scene = phaserRef.current?.scene.getScene('MainScene') as any | null;
      if (!scene) {
        setConsoleHistory((prev) => [...prev, { type: 'error', text: 'Game not initialized' }]);
        return;
      }

      if (scene.firewalls[routeIndex] && scene.firewallRules[routeIndex].blockedIp === ip) {
        scene.firewalls[routeIndex].destroy();
        scene.firewalls[routeIndex] = null;
        scene.firewallRules[routeIndex] = { blockedIp: null };
        setConsoleHistory((prev) => [
          ...prev,
          { type: 'output', text: `Firewall rule removed from ${route}` },
        ]);
      } else {
        if (scene.firewalls[routeIndex]) {
          scene.firewalls[routeIndex].destroy();
        }
        const x = scene.routesX[routeIndex] + 50;
        const rect = scene.add.rectangle(0, 0, 110, 26, 0xcc5500).setStrokeStyle(2, 0xff7722);
        const text = scene.add
          .text(0, 0, ip, {
            fontSize: '11px',
            color: '#ffffff',
            fontStyle: 'bold',
          })
          .setOrigin(0.5);
        const container = scene.add.container(x, 420, [rect, text]);
        scene.firewalls[routeIndex] = container;
        scene.firewallRules[routeIndex] = { blockedIp: ip };
        setConsoleHistory((prev) => [
          ...prev,
          { type: 'output', text: `Firewall rule applied to ${route}: blocking ${ip}` },
        ]);
      }
    } else {
      setConsoleHistory((prev) => [
        ...prev,
        { type: 'error', text: `Unknown command: ${command}` },
        { type: 'output', text: 'Type "help" for available commands' },
      ]);
    }
  }

  function handleConsoleSubmit(e: React.FormEvent) {
    e.preventDefault();
    executeCommand(consoleInput);
    setConsoleInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const newIndex =
        historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setConsoleInput(commandHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setConsoleInput('');
      } else {
        setHistoryIndex(newIndex);
        setConsoleInput(commandHistory[newIndex]);
      }
    }
  }

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleHistory]);

  function newTarget() {
    const ip = generateRandomIp();
    setTargetIp(ip);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden p-4">
      <div
        className="flex flex-col gap-3 w-full h-full"
        style={{ maxWidth: '1400px', maxHeight: '90vh' }}
      >
        <GameHeader
          targetIp={targetIp}
          score={score}
          health={health}
          onNewTarget={newTarget}
          onShowInstructions={() => setShowInstructions(true)}
        />

        <div className="flex-1 flex gap-3 items-start">
          <Terminal
            consoleHistory={consoleHistory}
            consoleInput={consoleInput}
            consoleEndRef={consoleEndRef}
            onInputChange={setConsoleInput}
            onSubmit={handleConsoleSubmit}
            onKeyDown={handleKeyDown}
          />

          <GameCanvas gameRef={gameRef} />
        </div>
      </div>

      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
    </div>
  );
}
