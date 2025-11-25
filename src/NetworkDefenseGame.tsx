import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import Navbar from '@/components/Navbar';
import Terminal from '@/components/Terminal';
import GameCanvas from '@/components/Canvas';
import InstructionsModal from '@/components/InstructionsModal';
import GameOverModal from './components/GameOverModal';

type FirewallRule = {
  blockedIp: string | null;
};

function destroyPacket(packet: Phaser.GameObjects.Container) {
  console.log('destroyPacket called');
  packet.list.forEach((obj: any) => obj.destroy?.());
  const bodySprite = packet.getData('bodySprite') as Phaser.Physics.Arcade.Sprite;
  console.log('bodySprite:', bodySprite);
  if (bodySprite) {
    bodySprite.destroy();
    console.log('bodySprite destroyed');
  }
  packet.destroy();
  console.log('packet container destroyed');
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

    const routerBody = this.add.rectangle(325, 510, 280, 60, 0x000000, 0);
    this.physics.add.existing(routerBody, true);

    this.packetGroup = this.physics.add.group();

    this.physics.add.overlap(this.packetGroup, routerBody, (obj1: any, obj2: any) => {
      console.log('COLLISION DETECTED!');

      const bodySprite = (obj1.type === 'Sprite' ? obj1 : obj2) as Phaser.Physics.Arcade.Sprite;
      console.log('bodySprite type:', bodySprite.type, bodySprite.constructor.name);

      const packet = bodySprite.getData('parentContainer') as Phaser.GameObjects.Container;
      console.log('Retrieved packet:', packet);

      if (!packet) {
        console.log('No packet container found');
        return;
      }

      const ip = packet.getData('ip');
      const routeIndex = packet.getData('route');
      const rule = this.firewallRules[routeIndex];
      const isMalicious = packet.getData('malicious');
      console.log('Collision details:', { ip, isMalicious, hasRule: !!rule });

      if (rule && rule.blockedIp === ip) {
        console.log('Packet blocked by firewall');
        destroyPacket(packet);
        this.events.emit('packetBlocked', ip);
        return;
      }

      destroyPacket(packet);
      console.log('Packet reached router:', { ip, isMalicious });
      if (isMalicious) {
        console.log('Emitting packetDelivered with malicious=true');
        this.events.emit('packetDelivered', ip, true);
      } else {
        this.events.emit('packetSafe', ip);
      }
    }); // Spawn packets loop
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
      if (!ip) return;
      this.events.emit('packetClicked', ip);
    });

    this.events.on('update', this.checkFirewallCollisions, this);
  }

  update(_time: number, _delta: number) {
    this.packetGroup?.getChildren().forEach((child) => {
      const body = child as Phaser.Physics.Arcade.Sprite;
      body.setVelocityY(40);
      const packet = body.getData('parentContainer') as Phaser.GameObjects.Container;
      if (packet) {
        packet.x = body.x;
        packet.y = body.y;

        if (body.y > 500 && body.y < 520) {
          console.log('Packet near router:', {
            y: body.y,
            bodyWidth: body.body?.width,
            bodyHeight: body.body?.height,
          });
        }
      }
    });
  }

  checkFirewallCollisions() {
    if (!this.packetGroup) return;

    const toDestroy: Phaser.GameObjects.Container[] = [];

    this.packetGroup.children.each((child) => {
      const bodySprite = child as Phaser.Physics.Arcade.Sprite;
      const packet = bodySprite.getData('parentContainer') as Phaser.GameObjects.Container;
      if (!packet || !packet.active) return true;

      const routeIndex = packet.getData('route') as number;
      const firewall = this.firewalls[routeIndex];
      const rule = this.firewallRules[routeIndex];
      const isMalicious = packet.getData('malicious') as boolean;

      if (firewall && rule?.blockedIp) {
        const fx = firewall.x;
        const fy = firewall.y;

        if (Math.abs(packet.x - fx) < 12 && packet.y > fy - 20) {
          const ip = packet.getData('ip') as string;
          if (ip === rule.blockedIp) {
            toDestroy.push(packet);
            if (this.events) {
              this.events.emit('packetBlocked', ip);
              if (isMalicious) {
                this.events.emit('packetBlockedMalicious', ip);
              }
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
    const isMalicious = Math.random() < 1 / 4;
    const ip = isMalicious ? currentTargetIp : generateRandomIp();
    const isTargetIp = ip === currentTargetIp;
    const textColor = isTargetIp ? '#ff0000' : '#00ff00';
    const boxColor = isTargetIp ? 0x660000 : 0x006600;
    const boxColorLight = isTargetIp ? 0x990000 : 0x009900;

    const container = this.add.container(startX, startY);

    const packetShadow = this.add.rectangle(2, 2, 24, 24, 0x000000, 0.3);
    const packetBack = this.add.rectangle(1, 1, 24, 24, boxColor);
    const packetBox = this.add
      .rectangle(0, 0, 24, 24, boxColorLight)
      .setStrokeStyle(2, 0xffffff, 0.3);

    container.add(packetShadow);
    container.add(packetBack);
    container.add(packetBox);

    container.setSize(24, 24);
    container.setInteractive();
    this.input.setDraggable(container, false);

    const ipText = this.add
      .text(0, -28, ip, { fontSize: '12px', color: textColor, fontStyle: 'bold' })
      .setOrigin(0.5);
    container.add(ipText);

    const bodySprite = this.physics.add.sprite(startX, startY, '');
    bodySprite.setDisplaySize(24, 24);
    bodySprite.body.setSize(24, 24);
    bodySprite.setData('parentContainer', container);
    container.setData('bodySprite', bodySprite);
    container.setData('ip', ip);
    container.setData('route', route);
    container.setData('malicious', ip === currentTargetIp);

    this.packetGroup?.add(bodySprite);
  }
}

function generateRandomIp() {
  return `${Phaser.Math.Between(10, 223)}.${Phaser.Math.Between(0, 255)}.${Phaser.Math.Between(
    0,
    255,
  )}.${Phaser.Math.Between(1, 254)}`;
}

const NetworkDefenseGame = () => {
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
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const scheduleNextChange = () => {
      const delay = (8 + Math.random() * 15) * 1000;
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

      const onPacketDelivered = (ip: string, isMalicious: boolean) => {
        console.log('onPacketDelivered called:', { ip, isMalicious });
        if (!isMalicious) return;
        console.log('Health before:', health);
        setHealth((h) => {
          console.log('setHealth callback, current health:', h);
          const nh = h - 1;

          if (nh <= 0) {
            phaserRef.current?.destroy(true);
            phaserRef.current = null;

            setGameOver(true);
          }

          return nh;
        });
      };

      const onPacketClicked = (ip: string) => {
        setConsoleInput((prev) => prev + ' ' + ip.trim());
      };

      const waitForScene = setInterval(() => {
        const s = phaserRef.current?.scene.getScene('MainScene') as any | null;
        if (s) {
          s.events.on('packetBlocked', onPacketBlocked);
          s.events.on('packetClicked', onPacketClicked);
          s.events.on('packetDelivered', (ip: string, isMalicious: boolean) =>
            onPacketDelivered(ip, isMalicious),
          );
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

  function restartGame() {
    setGameOver(false);
    setHealth(10);
    setScore(0);
    setConsoleHistory([
      { type: 'output', text: 'Network Defense Firewall Control System v1.0' },
      { type: 'output', text: 'Type "help" for available commands' },
    ]);

    const newIp = generateRandomIp();
    setTargetIp(newIp);

    setTimeout(() => {
      if (!gameRef.current) return;

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 550,
        height: 550,
        parent: gameRef.current,
        physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 0 }, debug: false } },
        scene: new MainScene(newIp),
        backgroundColor: '#041028',
        scale: { mode: Phaser.Scale.RESIZE, width: '100%', height: '100%' },
      };

      phaserRef.current = new Phaser.Game(config);

      const onPacketBlocked = () => {
        setScore((s) => s + 1);
      };

      const onPacketDelivered = (_ip: string, isMalicious: boolean) => {
        if (!isMalicious) return;
        setHealth((h) => {
          const nh = h - 1;
          if (nh <= 0) {
            phaserRef.current?.destroy(true);
            phaserRef.current = null;
            setGameOver(true);
          }
          return nh;
        });
      };

      const onPacketClicked = (ip: string) => {
        setConsoleInput((prev) => {
          const trimmed = prev.trim();
          if (trimmed === '') {
            return `firewall route1 ${ip}`;
          }
          return `${trimmed} ${ip}`;
        });
      };

      const waitForScene = setInterval(() => {
        const s = phaserRef.current?.scene.getScene('MainScene') as any | null;
        if (s) {
          s.events.on('packetBlocked', onPacketBlocked);
          s.events.on('packetClicked', onPacketClicked);
          s.events.on('packetDelivered', onPacketDelivered);
          clearInterval(waitForScene);
        }
      }, 100);
    }, 50);
  }

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

  return (
    <div className="h-screen w-screen flex flex-col bg-linear-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <Navbar
        targetIp={targetIp}
        score={score}
        health={health}
        onShowInstructions={() => setShowInstructions(true)}
      />

      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className="flex gap-3 items-start w-full h-full"
          style={{ maxWidth: '1400px', maxHeight: 'calc(100vh - 80px)' }}
        >
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

      {gameOver && <GameOverModal score={score} onRestart={restartGame} />}
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
    </div>
  );
};

export default NetworkDefenseGame;
