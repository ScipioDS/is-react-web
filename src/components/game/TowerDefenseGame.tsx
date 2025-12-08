/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { QuizPopup } from './QuizPopup';
import { RewardPopup } from './RewardPopup';
import Phaser from 'phaser';
import { Play, Pause, RotateCcw, Shield, Heart, Trophy, Crosshair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const TowerDefenseGame = () => {
  const gameRef = useRef<HTMLDivElement | null>(null);
  const phaserGameRef = useRef<any>(null);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [showReward, setShowReward] = React.useState(false);
  const [availableRewards, setAvailableRewards] = React.useState<string[]>([]);
  const [paused, setPaused] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [health, setHealth] = React.useState(3);
  const [gameOver, setGameOver] = React.useState(false);

  const togglePause = () => {
    if (!phaserGameRef.current) return;
    const scene = phaserGameRef.current.scene.keys['GameScene'];
    if (paused) {
      scene.scene.resume();
      setPaused(false);
    } else {
      scene.scene.pause();
      setPaused(true);
    }
  };

  const showQuizPopup = () => {
    if (!phaserGameRef.current) return;
    const scene = phaserGameRef.current.scene.keys['GameScene'];
    scene.scene.pause();
    setPaused(true);
    setShowQuiz(true);
  };

  const handleQuizAnswer = (correct: boolean) => {
    setShowQuiz(false);
    if (!phaserGameRef.current) return;
    const scene = phaserGameRef.current.scene.keys['GameScene'];
    if (correct) {
      const rewards = ['power_attack', 'health_boost', 'area_attack_radius', 'area_attack_power'];
      const choices = [] as string[];
      while (choices.length < 2 && rewards.length > 0) {
        const i = Math.floor(Math.random() * rewards.length);
        choices.push(rewards.splice(i, 1)[0]);
      }
      setAvailableRewards(choices);
      setShowReward(true);
    } else {
      scene.scene.resume();
      setPaused(false);
    }
  };

  const handleRewardSelect = (reward: string) => {
    if (!phaserGameRef.current) return;
    const scene = phaserGameRef.current.scene.keys['GameScene'];
    switch (reward) {
      case 'power_attack':
        if (scene) {
          scene.turretStrength = (scene.turretStrength || 1) * 2;
        }
        break;
      case 'health_boost':
        if (scene) {
          scene.health = Math.min((scene.health || 0) + 1, 10);
          setHealth(scene.health);
        }
        break;
      case 'area_attack_radius':
        if (scene) {
          scene.areaAttackRadius = Math.min((scene.areaAttackRadius || 0) + 30, 200);
        }
        break;
      case 'area_attack_power':
        if (scene) {
          scene.areaAttackPower = (scene.areaAttackPower || 0) + 1;
        }
        break;
      default:
        break;
    }

    setShowReward(false);
    if (scene) {
      scene.scene.resume();
    }
    setPaused(false);
  };

  useEffect(() => {
    class GameScene extends Phaser.Scene {
      turretBarrel: any;
      balls: any;
      lasers: any;
      score = 0;
      scoreText: any;
      useMouse = false;
      mouseShootEvent: any = null;
      quizShown = false;
      health = 3;
      level = 0;
      progressBar: any;
      progressBarBG: any;
      spawnEvent: any;
      autoShootEvent: any;
      gameOverText: any;
      finalScoreText: any;
      retryButton: any;
      enemyHealth = 3;
      turretStrength = 1;
      autoShootDelay = 500;
      areaAttackRadius = 80;
      areaAttackPower = 1;
      cursors: any;
      wasd: any;
      cameraSpeed = 300;
      gridGraphics: any;
      turretBase: any;

      constructor() {
        super('GameScene');
      }

      preload() {}

      create() {
        // Set camera bounds to allow infinite scrolling
        this.cameras.main.setBounds(-10000, -10000, 20000, 20000);
        this.physics.world.setBounds(-10000, -10000, 20000, 20000);

        // Dark background that follows camera
        const bg = this.add.rectangle(0, 0, 20000, 20000, 0x0a0f14);
        bg.setOrigin(0.5, 0.5);
        bg.setScrollFactor(0);

        // Add scattered visual elements for movement feedback
        const obstacles = this.add.group();
        for (let i = 0; i < 100; i++) {
          const x = Phaser.Math.Between(-5000, 5000);
          const y = Phaser.Math.Between(-5000, 5000);
          const size = Phaser.Math.Between(15, 40);
          const shape = Phaser.Math.Between(0, 2);

          if (shape === 0) {
            // Rocks/debris
            const rock = this.add.circle(x, y, size, 0x1e293b, 0.6);
            obstacles.add(rock);
          } else if (shape === 1) {
            // Square debris
            const square = this.add.rectangle(x, y, size, size, 0x334155, 0.5);
            square.rotation = Phaser.Math.FloatBetween(0, Math.PI);
            obstacles.add(square);
          } else {
            // Triangle markers
            const triangle = this.add.triangle(x, y, 0, 0, size, 0, size / 2, size, 0x475569, 0.4);
            triangle.rotation = Phaser.Math.FloatBetween(0, Math.PI * 2);
            obstacles.add(triangle);
          }
        }

        // Create grid graphics that will be redrawn each frame
        this.gridGraphics = this.add.graphics();
        this.gridGraphics.setDepth(-1);

        // Center glow effect at turret position
        const centerGlow = this.add.circle(0, 0, 120, 0xeab308, 0.03);
        this.tweens.add({
          targets: centerGlow,
          alpha: { from: 0.03, to: 0.08 },
          duration: 2000,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut',
        });

        // Turret base - stays at center (0, 0)
        this.turretBase = this.add.container(0, 0);
        const base1 = this.add.circle(0, 0, 38, 0x1e293b);
        const base2 = this.add.circle(0, 0, 32, 0x334155);
        const base3 = this.add.circle(0, 0, 22, 0xeab308);
        const base4 = this.add.circle(0, 0, 18, 0x0a0f14);
        this.turretBase.add([base1, base2, base3, base4]);

        // Turret barrel - cleaner
        this.turretBarrel = this.add.rectangle(0, 0, 55, 10, 0xeab308);
        this.turretBarrel.setOrigin(0, 0.5);
        this.turretBase.add(this.turretBarrel);

        // Setup WASD controls
        this.wasd = {
          W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
          A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
          S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
          D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };

        // Camera follows the turret base
        this.cameras.main.startFollow(this.turretBase, true, 0.1, 0.1);

        this.balls = this.physics.add.group();
        this.lasers = this.physics.add.group();

        this.spawnEvent = this.time.addEvent({
          delay: 1500,
          callback: this.spawnBall,
          callbackScope: this,
          loop: true,
        });

        this.autoShootEvent = this.time.addEvent({
          delay: this.autoShootDelay,
          callback: this.shootLaserAuto,
          callbackScope: this,
          loop: true,
        });

        this.physics.add.overlap(this.lasers, this.balls, this.hitBall, undefined as any, this);

        this.input.on('pointerdown', (pointer: any) => {
          if (!this.useMouse) {
            this.useMouse = true;
            if (this.autoShootEvent) this.autoShootEvent.paused = true;
          }
          if (!this.mouseShootEvent) {
            this.mouseShootEvent = this.time.addEvent({
              delay: 150,
              loop: true,
              callback: () => this.shootLaserMouse(pointer.worldX, pointer.worldY),
            });
          }
        });

        window.addEventListener('mouseup', () => {
          this.useMouse = false;
          if (this.mouseShootEvent) {
            this.mouseShootEvent.remove();
            this.mouseShootEvent = null;
            if (this.autoShootEvent) this.autoShootEvent.paused = false;
          }
        });
      }

      spawnBall() {
        const turretX = this.turretBase.x;
        const turretY = this.turretBase.y;
        const side = Phaser.Math.Between(0, 3);
        const spawnDistance = 400;
        let x = 0,
          y = 0;
        switch (side) {
          case 0:
            x = turretX + Phaser.Math.Between(-spawnDistance, spawnDistance);
            y = turretY - spawnDistance;
            break;
          case 1:
            x = turretX + spawnDistance;
            y = turretY + Phaser.Math.Between(-spawnDistance, spawnDistance);
            break;
          case 2:
            x = turretX + Phaser.Math.Between(-spawnDistance, spawnDistance);
            y = turretY + spawnDistance;
            break;
          case 3:
            x = turretX - spawnDistance;
            y = turretY + Phaser.Math.Between(-spawnDistance, spawnDistance);
            break;
        }

        // Create enemy with cleaner design
        const ball = this.add.circle(x, y, 16, 0xef4444);
        const innerBall = this.add.circle(x, y, 12, 0xff6b6b);
        const glow = this.add.circle(x, y, 24, 0xef4444, 0.25);

        this.physics.add.existing(ball);
        ball.setData('health', this.enemyHealth);
        ball.setData('glow', glow);
        ball.setData('inner', innerBall);
        this.balls.add(ball);
        this.physics.moveToObject(ball, { x: turretX, y: turretY }, 100);
      }

      shootLaserAuto() {
        if (this.useMouse) return;
        const children = this.balls.getChildren();
        if (!children.length) return;
        let nearest: any = null;
        let min = Infinity;
        const turretX = this.turretBase.x;
        const turretY = this.turretBase.y;
        children.forEach((b: any) => {
          const d = Phaser.Math.Distance.Between(turretX, turretY, b.x, b.y);
          if (d < min) {
            min = d;
            nearest = b;
          }
        });
        if (nearest) this.shootLaserTo(nearest.x, nearest.y);
      }

      shootLaserMouse(mx: number, my: number) {
        this.shootLaserTo(mx, my);
      }

      shootLaserTo(tx: number, ty: number) {
        const turretX = this.turretBase.x;
        const turretY = this.turretBase.y;
        const angle = Phaser.Math.Angle.Between(turretX, turretY, tx, ty);
        this.turretBarrel.rotation = angle;

        // Cleaner green laser
        const laser = this.add.rectangle(turretX, turretY, 35, 5, 0x22c55e);
        const laserCore = this.add.rectangle(turretX, turretY, 35, 3, 0x4ade80);
        laser.setOrigin(0, 0.5);
        laserCore.setOrigin(0, 0.5);
        laser.rotation = angle;
        laserCore.rotation = angle;

        this.physics.add.existing(laser);
        this.lasers.add(laser);
        laser.setData('core', laserCore);
        const speed = 420;
        (laser.body as any).setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
        this.time.delayedCall(2000, () => {
          laser.destroy();
          laserCore.destroy();
        });
      }

      hitBall(laser: any, ball: any) {
        let health = ball.getData('health') || 1;
        health -= this.turretStrength;
        if (health <= 0) {
          const laserCore = laser.getData('core');
          if (laserCore) laserCore.destroy();
          laser.destroy();
          const glow = ball.getData('glow');
          const inner = ball.getData('inner');
          if (glow) glow.destroy();
          if (inner) inner.destroy();
          ball.destroy();
          this.score += 10;
          setScore(this.score);
        } else {
          const laserCore = laser.getData('core');
          if (laserCore) laserCore.destroy();
          laser.destroy();
          ball.setData('health', health);
        }
      }

      update() {
        // Handle WASD movement
        const speed = this.cameraSpeed;
        if (this.wasd.W.isDown) {
          this.turretBase.y -= speed * 0.016;
        }
        if (this.wasd.S.isDown) {
          this.turretBase.y += speed * 0.016;
        }
        if (this.wasd.A.isDown) {
          this.turretBase.x -= speed * 0.016;
        }
        if (this.wasd.D.isDown) {
          this.turretBase.x += speed * 0.016;
        }

        // Draw infinite grid based on camera position
        this.gridGraphics.clear();
        this.gridGraphics.lineStyle(0.5, 0x1e293b, 0.2);

        const cam = this.cameras.main;
        const gridSize = 50;
        const startX = Math.floor((cam.scrollX - 100) / gridSize) * gridSize;
        const endX = Math.ceil((cam.scrollX + cam.width + 100) / gridSize) * gridSize;
        const startY = Math.floor((cam.scrollY - 100) / gridSize) * gridSize;
        const endY = Math.ceil((cam.scrollY + cam.height + 100) / gridSize) * gridSize;

        for (let x = startX; x <= endX; x += gridSize) {
          this.gridGraphics.lineBetween(x, startY, x, endY);
        }
        for (let y = startY; y <= endY; y += gridSize) {
          this.gridGraphics.lineBetween(startX, y, endX, y);
        }

        // Update glow and inner ball positions, check collision with center
        this.balls.getChildren().forEach((ball: any) => {
          const glow = ball.getData('glow');
          const inner = ball.getData('inner');
          if (glow) {
            glow.x = ball.x;
            glow.y = ball.y;
          }
          if (inner) {
            inner.x = ball.x;
            inner.y = ball.y;
          }
          // Update laser cores
        });
        this.lasers.getChildren().forEach((laser: any) => {
          const core = laser.getData('core');
          if (core) {
            core.x = laser.x;
            core.y = laser.y;
          }
        });

        // Check ball collisions with turret
        this.balls.getChildren().forEach((ball: any) => {
          // Check if ball reached turret center
          const distance = Phaser.Math.Distance.Between(
            ball.x,
            ball.y,
            this.turretBase.x,
            this.turretBase.y,
          );
          if (distance < 40 && !ball.getData('hitCenter')) {
            ball.setData('hitCenter', true);
            const ballGlow = ball.getData('glow');
            if (ballGlow) ballGlow.destroy();
            ball.destroy();
            this.health -= 1;
            setHealth(this.health);
            if (this.health <= 0) {
              this.scene.pause();
              setGameOver(true);
            }
          }
        });

        if (Math.floor(this.score / 100) > this.level) {
          this.level += 1;
          this.enemyHealth *= 2;
          if (!this.quizShown) {
            this.quizShown = true;
            showQuizPopup();
          }
        }
      }
    }

    const config = {
      type: Phaser.WEBGL,
      width: 800,
      height: 600,
      parent: gameRef.current || undefined,
      physics: { default: 'arcade', arcade: { debug: false } },
      scene: [GameScene],
      backgroundColor: '#0f1419',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
      },
      render: {
        antialias: true,
        pixelArt: false,
        roundPixels: false,
      },
    };

    phaserGameRef.current = new Phaser.Game(config);

    return () => {
      if (phaserGameRef.current) phaserGameRef.current.destroy(true);
    };
  }, []);

  const handleRestart = () => {
    if (phaserGameRef.current) {
      const scene = phaserGameRef.current.scene.keys['GameScene'];
      scene.scene.restart();
      setPaused(false);
      setScore(0);
      setHealth(3);
      setGameOver(false);
    }
  };

  return (
    <div className="h-screen w-full bg-background text-foreground flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-5xl space-y-4">
        {/* Header Stats */}
        <div className="flex items-center justify-between gap-4">
          <Card className="flex-1 border-game-yellow/30 bg-card/95 backdrop-blur shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-game-yellow/20 border border-game-yellow/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-game-yellow" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-sans">Game Mode</p>
                  <p className="text-sm font-semibold font-sans">Turret Defense</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-game-blue/30 bg-card/95 backdrop-blur shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-game-blue/20 border border-game-blue/30 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-game-blue" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-sans">Score</p>
                  <p className="text-lg font-bold font-sans">{score}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 border-game-green/30 bg-card/95 backdrop-blur shadow-lg">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-game-green/20 border border-game-green/30 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-game-green" />
                    </div>
                    <p className="text-xs text-muted-foreground font-sans">Health</p>
                  </div>
                  <p className="text-sm font-bold font-sans text-game-green">{health}/10</p>
                </div>
                <Progress
                  value={(health / 10) * 100}
                  className="h-2 bg-muted"
                  indicatorClassName="bg-game-green"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Canvas */}
        <Card
          className="border-border/50 bg-card/95 backdrop-blur shadow-lg relative"
          style={{ flexGrow: 1, minHeight: 0 }}
        >
          <CardContent className="p-4 h-full">
            <div
              ref={gameRef}
              className="bg-game-dark rounded-lg overflow-hidden border border-border/50 shadow-xl w-full h-full"
            />

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center rounded-lg">
                <Card className="border-game-red/40 bg-card/95 backdrop-blur shadow-xl">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-3xl font-bold text-game-red font-sans">
                      Game Over
                    </CardTitle>
                    <p className="text-muted-foreground mt-2 font-sans">Final Score: {score}</p>
                  </CardHeader>
                  <CardContent className="flex justify-center pb-6">
                    <Button
                      onClick={handleRestart}
                      variant="outline"
                      size="lg"
                      className="gap-2 font-sans border-game-yellow/50 text-game-yellow hover:bg-game-yellow/10"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Play Again
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Controls - Combined into one card */}
        <Card className="border-border/30 bg-card/95 backdrop-blur shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-3">
                <Button
                  onClick={togglePause}
                  variant="outline"
                  size="default"
                  className="gap-2 font-sans border-game-yellow/50 text-game-yellow hover:bg-game-yellow/10"
                >
                  {paused ? (
                    <>
                      <Play className="w-4 h-4" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleRestart}
                  variant="outline"
                  size="default"
                  className="gap-2 font-sans border-game-red/50 text-game-red hover:bg-game-red/10"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
                <Crosshair className="w-4 h-4" />
                <span>WASD to move • Click & hold to aim manually • Auto-shoot enabled</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showQuiz && (
        <QuizPopup question="Is Phaser great for game development?" onAnswer={handleQuizAnswer} />
      )}
      {showReward && <RewardPopup rewards={availableRewards} onSelect={handleRewardSelect} />}
    </div>
  );
};

export default TowerDefenseGame;
