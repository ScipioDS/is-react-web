import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Shield, Target, Heart, Trophy, Server, AlertTriangle } from 'lucide-react';

type FirewallRule = {
  blockedIp: string | null;
};

export default function NetworkDefenseGame() {
  const gameRef = useRef<HTMLDivElement | null>(null);
  const phaserRef = useRef<Phaser.Game | null>(null);
  const [targetIp, setTargetIp] = useState<string>(generateRandomIp());
  const [health, setHealth] = useState<number>(10);
  const [score, setScore] = useState<number>(0);
  const [selectedRoute, setSelectedRoute] = useState<number>(1);
  const [blockIpInput, setBlockIpInput] = useState<string>('');

  useEffect(() => {
    if (phaserRef.current) return;

    class MainScene extends Phaser.Scene {
      firewalls: Array<Phaser.GameObjects.Rectangle | null>;
      firewallRules: FirewallRule[];
      router: Phaser.GameObjects.Rectangle | null;
      routesX: number[];
      packetGroup: Phaser.Physics.Arcade.Group | null;
      spawnTimer: Phaser.Time.TimerEvent | null;
      targetIp: string;

      constructor() {
        super({ key: 'MainScene' });
        this.firewalls = [null, null, null];
        this.firewallRules = [{ blockedIp: null }, { blockedIp: null }, { blockedIp: null }];
        this.router = null;
        this.routesX = [160, 400, 640];
        this.packetGroup = null;
        this.spawnTimer = null;
        this.targetIp = targetIp; // initialize with React state
      }

      preload() {}

      create() {
        this.add.rectangle(400, 300, 800, 600, 0x041028);

        const title = this.add.text(16, 8, 'Network Defense — Protect from malicious IP', {
          fontSize: '16px',
          color: '#bfefff',
        });

        // Draw 3 route lines
        for (let i = 0; i < 3; i++) {
          const x = this.routesX[i];
          const line = this.add.line(0, 0, x, 0, x, 520, 0x085f63).setLineWidth(2, 2);
          line.setOrigin(0, 0);
        }

        // Router at bottom
        this.router = this.add.rectangle(400, 560, 220, 60, 0x123b4a).setStrokeStyle(4, 0x00eaff);
        this.add.text(400, 560, 'ROUTER', { fontSize: '18px', color: '#00eaff' }).setOrigin(0.5);

        // Group for packets (physics)
        this.packetGroup = this.physics.add.group();

        // Collision detection: packets hitting router
        this.physics.add.overlap(
          this.packetGroup,
          this.router,
          (packetObj: any, routerObj: any) => {
            const packet = packetObj as Phaser.GameObjects.Container & {
              ipText?: Phaser.GameObjects.Text;
            };
            const ip = packet.getData('ip') as string;
            // check firewall on route
            const routeIndex = packet.getData('route') as number;
            const rule = this.firewallRules[routeIndex];
            if (rule && rule.blockedIp && rule.blockedIp === ip) {
              // Should have been blocked earlier but just in case
              destroyPacket(packet);
              this.scene.get('MainScene');
              (this.scene as any).events.emit('packetBlocked', ip);
              return;
            }

            destroyPacket(packet);
            (this.scene as any).events.emit('packetDelivered', ip);
          },
        );

        // Spawn packets periodically
        this.spawnTimer = this.time.addEvent({
          delay: 800,
          callback: this.spawnPacket,
          callbackScope: this,
          loop: true,
        });

        // clicking a packet selects its IP (fires event)
        this.input.on('gameobjectdown', (pointer: any, obj: any) => {
          const container = obj as Phaser.GameObjects.Container;
          if (!container) return;
          const ip = container.getData('ip') as string;
          (this.scene as any).events.emit('packetClicked', ip);
        });

        // firewall collision zone detection: create invisible rectangles where firewalls would be and check overlap manually each tick
        this.events.on('update', this.checkFirewallCollisions, this);
      }

      update(time: number, delta: number) {
        this.packetGroup?.getChildren().forEach((child) => {
          const packet = child as Phaser.GameObjects.Container;
          const body = packet.getData('bodySprite') as Phaser.Physics.Arcade.Sprite;
          body.setVelocity(0, 120); // adjust speed
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

          return true; // required by Phaser Set.each()
        });

        toDestroy.forEach(destroyPacket);
      }

      spawnPacket() {
        const route = Phaser.Math.Between(0, 2);
        const startX = this.routesX[route];
        const startY = -20;

        // 1/3 chance to spawn the target IP
        const ip = Math.random() < 1 / 3 ? this.targetIp : generateRandomIp();

        const circle = this.add.circle(0, 0, 12, 0x00ff99).setStrokeStyle(2, 0x003f2f);
        const ipText = this.add
          .text(0, -18, ip, { fontSize: '12px', color: '#00ffd1' })
          .setOrigin(0.5);

        const container = this.add.container(startX, startY, [circle, ipText]);

        // Physics workaround: invisible body
        const bodySprite = this.physics.add.sprite(startX, startY, '');
        container.setData('bodySprite', bodySprite);
        container.setData('ip', ip);
        container.setData('route', route);

        this.packetGroup?.add(container as any);
      }
    }

    function destroyPacket(packet: Phaser.GameObjects.Container) {
      try {
        // Destroy text and circle
        packet.list.forEach((obj: any) => obj.destroy?.());
      } catch (e) {}

      // Destroy the physics body if exists
      const bodySprite = packet.getData('bodySprite') as Phaser.Physics.Arcade.Sprite;
      if (bodySprite) {
        bodySprite.destroy();
      }

      // Finally, destroy the container itself
      packet.destroy();
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 620,
      parent: gameRef.current || undefined,
      physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 0 }, debug: false } },
      scene: MainScene,
      backgroundColor: '#041028',
    };

    phaserRef.current = new Phaser.Game(config);

    // Hook up events to React via Phaser events
    const onPacketBlocked = (ip: string) => {
      setScore((s) => s + 1); // React state updates safely
    };

    const onPacketDelivered = (ip: string) => {
      setHealth((h) => {
        const nh = h - 1;
        if (nh <= 0) {
          alert('Router has been compromised — Game Over\nYour score: ' + score);
          window.location.reload(); // optionally reset Phaser manually
        }
        return nh;
      });
    };

    const onPacketClicked = (ip: string) => {
      setBlockIpInput(ip);
    };

    // Wait for scene to be created
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
      phaserRef.current?.destroy(true);
      phaserRef.current = null;
      clearInterval(waitForScene);
    };
  }, []);

  useEffect(() => {
    // keep React state targetIp fresh in the scene
    const interval = setInterval(() => {
      // noop - scene reads generated IPs for packets itself
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function placeFirewallOnRoute(routeIndex: number) {
    const scene = phaserRef.current?.scene.getScene('MainScene') as any | null;
    if (!scene) return;
    // remove if exists
    if (scene.firewalls[routeIndex]) {
      scene.firewalls[routeIndex].destroy();
      scene.firewalls[routeIndex] = null;
      scene.firewallRules[routeIndex] = { blockedIp: null };
      return;
    }
    const x = scene.routesX[routeIndex];
    const rect = scene.add.rectangle(x, 360, 110, 26, 0x001a1a).setStrokeStyle(2, 0x00eaff);
    scene.firewalls[routeIndex] = rect;
    scene.firewallRules[routeIndex] = { blockedIp: blockIpInput || null };
  }

  function applyRuleToRoute(routeIndex: number) {
    const scene = phaserRef.current?.scene.getScene('MainScene') as any | null;
    if (!scene) return;
    scene.firewallRules[routeIndex] = { blockedIp: blockIpInput || null };
    // if firewall not placed yet, place it
    if (!scene.firewalls[routeIndex]) {
      placeFirewallOnRoute(routeIndex);
    }
  }

  function newTarget() {
    const ip = generateRandomIp();
    setTargetIp(ip);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      <div className="flex flex-row gap-4 items-center justify-center max-w-[90vw] max-h-[90vh]">
        {/* Game Canvas */}
        <Card className="flex-shrink-0 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 shadow-2xl">
          <CardContent className="p-0">
            <div
              ref={gameRef}
              style={{ width: 600, height: 500 }}
              className="rounded-lg overflow-hidden"
            />
          </CardContent>
        </Card>

        {/* Control Panel */}
        <div className="flex flex-col gap-3 w-80 max-h-[500px] overflow-y-auto pr-2">
          {/* Target IP Card */}
          <Card className="bg-gradient-to-br from-red-950/80 to-red-900/40 border-red-800/50 shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-100 text-xl">
                <Target className="w-6 h-6 text-red-400" />
                Malicious Target IP
              </CardTitle>
              <CardDescription className="text-red-200/80">
                Block this IP to protect your router
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 p-4 bg-black/30 rounded-lg border border-red-800/30">
                <Badge
                  variant="destructive"
                  className="text-lg px-5 py-2.5 font-mono shadow-lg bg-red-600 hover:bg-red-700"
                >
                  {targetIp}
                </Badge>
              </div>
              <Button
                onClick={() => newTarget()}
                variant="outline"
                className="w-full border-red-700/50 hover:bg-red-900/30 hover:border-red-600 transition-all"
                size="default"
              >
                <AlertTriangle className="w-4 h-4" />
                Generate New Target
              </Button>
            </CardContent>
          </Card>

          {/* Game Stats Card */}
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/70 border-slate-700/50 shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-slate-100 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Game Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 rounded-lg border border-amber-800/30 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-full">
                    <Trophy className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-base font-semibold text-slate-200">Score</span>
                </div>
                <Badge
                  variant="secondary"
                  className="text-lg px-4 py-1.5 bg-amber-500/20 text-amber-300 border-amber-600/30 shadow-md"
                >
                  {score}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-900/20 to-red-900/20 rounded-lg border border-rose-800/30 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-500/20 rounded-full">
                    <Heart
                      className={`w-5 h-5 ${
                        health > 5 ? 'text-rose-400' : 'text-red-500 animate-pulse'
                      }`}
                    />
                  </div>
                  <span className="text-base font-semibold text-slate-200">Router Health</span>
                </div>
                <Badge
                  variant={health > 5 ? 'default' : 'destructive'}
                  className={`text-lg px-4 py-1.5 shadow-md ${
                    health > 5
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-600/30'
                      : 'bg-red-600 text-white animate-pulse'
                  }`}
                >
                  {health}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Firewall Controls Card */}
          <Card className="bg-gradient-to-br from-cyan-950/80 to-blue-950/60 border-cyan-800/50 shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-cyan-100 text-xl">
                <Shield className="w-6 h-6 text-cyan-400" />
                Firewall Controls
              </CardTitle>
              <CardDescription className="text-cyan-200/70">
                Configure route protection rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-cyan-100 flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Select Route
                </label>
                <select
                  value={selectedRoute}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedRoute(Number(e.target.value))
                  }
                  className="flex h-11 w-full rounded-md border border-cyan-700/50 bg-slate-900/70 px-3 py-2 text-sm text-cyan-50 shadow-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 transition-all"
                >
                  <option value={1} className="bg-slate-900">
                    🛣️ Route 1 (Left)
                  </option>
                  <option value={2} className="bg-slate-900">
                    🛣️ Route 2 (Center)
                  </option>
                  <option value={3} className="bg-slate-900">
                    🛣️ Route 3 (Right)
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-cyan-100 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Block IP Address
                </label>
                <Input
                  value={blockIpInput}
                  onChange={(e) => setBlockIpInput(e.target.value)}
                  placeholder="e.g. 192.168.1.100"
                  className="bg-slate-900/70 border-cyan-700/50 text-cyan-50 font-mono text-base h-11 shadow-md focus-visible:ring-cyan-500"
                />
                <p className="text-xs text-cyan-300/70 flex items-center gap-1">
                  <span className="text-lg">💡</span>
                  <span>Tip: Click a packet in the game to auto-fill its IP</span>
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => applyRuleToRoute(selectedRoute - 1)}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg transition-all text-base h-11"
                >
                  <Shield className="w-4 h-4" />
                  Apply Rule
                </Button>
                <Button
                  onClick={() => placeFirewallOnRoute(selectedRoute - 1)}
                  variant="outline"
                  className="flex-1 border-cyan-600/50 hover:bg-cyan-900/30 hover:border-cyan-500 shadow-md transition-all text-base h-11"
                >
                  <Server className="w-4 h-4" />
                  Toggle
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instructions Card */}
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/70 border-slate-700/50 shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-slate-100 flex items-center gap-2">
                <span className="text-xl">📖</span>
                How to Play
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <p className="flex gap-2">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span>
                    Packets with random IP addresses flow down three routes toward your router.
                  </span>
                </p>
                <p className="flex gap-2">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span>
                    Place <span className="text-cyan-300 font-semibold">firewalls</span> on routes
                    and configure them to block the target malicious IP.
                  </span>
                </p>
                <p className="flex gap-2">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span>
                    <span className="text-amber-300 font-semibold">Blocked packets</span> increase
                    your score. Packets reaching the router{' '}
                    <span className="text-red-400 font-semibold">reduce health</span>.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function generateRandomIp() {
  return `${Phaser.Math.Between(10, 223)}.${Phaser.Math.Between(0, 255)}.${Phaser.Math.Between(
    0,
    255,
  )}.${Phaser.Math.Between(1, 254)}`;
}
