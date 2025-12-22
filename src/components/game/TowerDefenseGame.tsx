/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
// Imports
import React, { useEffect, useRef } from 'react';
import { QuizPopup } from './QuizPopup';
import { RewardPopup } from './RewardPopup';
import { InfoDialog } from './InfoDialog';
import { WeaponWheel } from './WeaponWheel';
import { GameOverlay } from './GameOverlay';
import { GameStats } from './GameStats';
import { GameControls } from './GameControls';
import { GameHeader } from './GameHeader';
import { LanguageSelector } from './LanguageSelector';
import Phaser from 'phaser';
import { Card, CardContent } from '@/components/ui/card';
import {QuizQuestion} from "@/components/game/QuizModels.ts";
import {useTranslation} from "react-i18next";
import {quizzesAL} from "@/components/game/quiz/quizSQ.ts";
import {quizzesMK} from "@/components/game/quiz/quizMK.ts";
import {shuffle} from "@/components/game/helpers/shuffle.tsx";

const quizzesByLanguage: Record<string, QuizQuestion[]> = {
  en: quizzesAL,
  mk: quizzesMK,
};

const TowerDefenseGame = () => {
  const { i18n } = useTranslation();

  const [quizQuestions, setQuizQuestions] = React.useState<QuizQuestion[]>(
      shuffle(quizzesByLanguage[i18n.language] || quizzesAL)
  );
  const [currentQuizIndex, setCurrentQuizIndex] = React.useState(0);

  React.useEffect(() => {
    const randomized = shuffle(quizzesByLanguage[i18n.language] || quizzesAL);
    setQuizQuestions(randomized);
    setCurrentQuizIndex(0);
  }, [i18n.language]);

  const gameRef = useRef<HTMLDivElement | null>(null);
  const phaserGameRef = useRef<any>(null);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [showReward, setShowReward] = React.useState(false);
  const [availableRewards, setAvailableRewards] = React.useState<string[]>([]);
  const [paused, setPaused] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [health, setHealth] = React.useState(3);
  const [gameOver, setGameOver] = React.useState(false);
  const [currentWeapon, setCurrentWeapon] = React.useState<'laser' | 'explosive' | 'melee'>(
    'laser',
  );
  const [showWeaponWheel, setShowWeaponWheel] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);

  // Event Handlers
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
      if (currentQuizIndex < quizQuestions.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
      } else {
        setCurrentQuizIndex(0);
      }
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
      scene.quizShown = false;
    }
    setPaused(false);
  };

  useEffect(() => {
    // Phaser GameScene Class
    class GameScene extends Phaser.Scene {
      // Scene Properties
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
      currentWeapon: 'laser' | 'explosive' | 'melee' = 'laser';
      tabKey: any;
      explosions: any;
      meleeAttacks: any;
      lastMeleeTime = 0;
      meleeCooldown = 800;

      constructor() {
        super('GameScene');
      }

      // Scene Lifecycle Methods
      preload() {}

      create() {
        this.cameras.main.setBounds(-10000, -10000, 20000, 20000);
        this.physics.world.setBounds(-10000, -10000, 20000, 20000);

        // Dark background that follows camera
        const bg = this.add.rectangle(0, 0, 20000, 20000, 0x0a0f14);
        bg.setOrigin(0.5, 0.5);
        bg.setScrollFactor(0);
        const obstacles = this.add.group();
        for (let i = 0; i < 500; i++) {
          const x = Phaser.Math.Between(-5000, 5000);
          const y = Phaser.Math.Between(-5000, 5000);
          const size = Phaser.Math.Between(15, 40);
          const shape = Phaser.Math.Between(0, 2);

          if (shape === 0) {
            const rock = this.add.circle(x, y, size, 0x1e293b, 0.5);
            obstacles.add(rock);
          } else if (shape === 1) {
            const square = this.add.rectangle(x, y, size, size, 0x334155, 0.4);
            square.rotation = Phaser.Math.FloatBetween(0, Math.PI);
            obstacles.add(square);
          } else {
            const triangle = this.add.triangle(x, y, 0, 0, size, 0, size / 2, size, 0x475569, 0.3);
            triangle.rotation = Phaser.Math.FloatBetween(0, Math.PI * 2);
            obstacles.add(triangle);
          }
        }

        this.gridGraphics = this.add.graphics();
        this.gridGraphics.setDepth(-1);
        const centerGlow = this.add.circle(0, 0, 120, 0xeab308, 0.03);
        this.tweens.add({
          targets: centerGlow,
          alpha: { from: 0.03, to: 0.08 },
          duration: 2000,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut',
        });

        this.turretBase = this.add.container(0, 0);
        const shadow = this.add.circle(0, 2, 42, 0x000000, 0.3);
        this.turretBase.add(shadow);

        const base1 = this.add.circle(0, 0, 40, 0x1e293b);
        this.turretBase.add(base1);

        const base2 = this.add.circle(0, 0, 34, 0x475569);
        this.turretBase.add(base2);

        const base3 = this.add.circle(0, 0, 28, 0x334155);
        this.turretBase.add(base3);

        const base4 = this.add.circle(0, 0, 22, 0xeab308);
        this.turretBase.add(base4);

        const base5 = this.add.circle(0, 0, 16, 0x0a0f14);
        this.turretBase.add(base5);
        const highlight = this.add.circle(-6, -6, 10, 0x64748b, 0.4);
        this.turretBase.add(highlight);

        this.turretBarrel = this.add.rectangle(0, 0, 60, 12, 0xeab308);
        this.turretBarrel.setOrigin(0, 0.5);
        this.turretBase.add(this.turretBarrel);
        const barrelShadow = this.add.rectangle(0, 1, 60, 8, 0x000000, 0.3);
        barrelShadow.setOrigin(0, 0.5);
        this.turretBase.add(barrelShadow);
        this.turretBase.sendToBack(barrelShadow);
        this.wasd = {
          W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
          A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
          S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
          D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };
        this.tabKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.tabKey.on('down', () => {
          setShowWeaponWheel(true);
        });
        this.tabKey.on('up', () => {
          setShowWeaponWheel(false);
        });
        this.cameras.main.startFollow(this.turretBase, true, 0.1, 0.1);

        this.balls = this.physics.add.group();
        this.lasers = this.physics.add.group();
        this.explosions = this.physics.add.group();
        this.meleeAttacks = this.physics.add.group();

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

        this.physics.add.overlap(
            this.explosions,
            this.balls,
            (rocket: any, ball: any) => {
              this.explode(rocket.x, rocket.y);
              const core = rocket.getData('core');
              const glow = rocket.getData('glow');
              const highlight = rocket.getData('highlight');
              if (core) core.destroy();
              if (glow) glow.destroy();
              if (highlight) highlight.destroy();
              rocket.destroy();
            },
            undefined as any,
            this,
        );

        this.physics.add.overlap(
            this.lasers,
            this.balls,
            (laser: any, ball: any) => {
              this.hitBall(laser, ball);
            },
            undefined as any,
            this,
        );

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
        const ball = this.add.circle(x, y, 18, 0xef4444);
        const innerBall = this.add.circle(x, y, 14, 0xff6b6b);
        const coreBall = this.add.circle(x, y, 9, 0xff8787);
        const highlight = this.add.circle(x - 4, y - 4, 5, 0xffa5a5, 0.7);
        const glow = this.add.circle(x, y, 26, 0xef4444, 0.2);
        const shadow = this.add.circle(x + 2, y + 2, 18, 0x000000, 0.3);

        this.physics.add.existing(ball);
        ball.setData('health', this.enemyHealth);
        ball.setData('glow', glow);
        ball.setData('inner', innerBall);
        ball.setData('core', coreBall);
        ball.setData('highlight', highlight);
        ball.setData('shadow', shadow);
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

        if (this.currentWeapon === 'laser') {
          const laserGlow = this.add.rectangle(turretX, turretY, 40, 8, 0x22c55e, 0.3);
          const laser = this.add.rectangle(turretX, turretY, 38, 6, 0x22c55e);
          const laserCore = this.add.rectangle(turretX, turretY, 38, 3, 0x86efac);
          laserGlow.setOrigin(0, 0.5);
          laser.setOrigin(0, 0.5);
          laserCore.setOrigin(0, 0.5);
          laserGlow.rotation = angle;
          laser.rotation = angle;
          laserCore.rotation = angle;

          this.physics.add.existing(laser);
          this.lasers.add(laser);
          laser.setData('core', laserCore);
          laser.setData('glow', laserGlow);
          const speed = 450;
          (laser.body as any).setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
          this.time.delayedCall(2000, () => {
            if (laser.active) {
              laser.destroy();
              laserCore.destroy();
              laserGlow.destroy();
            }
          });
        } else if (this.currentWeapon === 'explosive') {
          const rocketGlow = this.add.circle(turretX, turretY, 14, 0xff6b35, 0.4);
          const rocket = this.add.circle(turretX, turretY, 10, 0xff6b35);
          const rocketCore = this.add.circle(turretX, turretY, 6, 0xffaa00);
          const rocketHighlight = this.add.circle(turretX - 2, turretY - 2, 3, 0xffdd88, 0.8);

          this.physics.add.existing(rocket);
          this.explosions.add(rocket);
          rocket.setData('core', rocketCore);
          rocket.setData('glow', rocketGlow);
          rocket.setData('highlight', rocketHighlight);
          rocket.setData('angle', angle);
          const speed = 320;
          (rocket.body as any).setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
          this.time.addEvent({
            delay: 50,
            repeat: 60,
            callback: () => {
              if (rocket.active) {
                const smoke = this.add.circle(rocket.x, rocket.y, 4, 0x64748b, 0.4);
                this.tweens.add({
                  targets: smoke,
                  alpha: 0,
                  scale: 2,
                  duration: 500,
                  onComplete: () => smoke.destroy(),
                });
              }
            },
          });

          this.time.delayedCall(3000, () => {
            if (rocket.active) {
              this.explode(rocket.x, rocket.y);
              rocket.destroy();
              rocketCore.destroy();
              rocketGlow.destroy();
              rocketHighlight.destroy();
            }
          });
        } else if (this.currentWeapon === 'melee') {
          const currentTime = this.time.now;
          if (currentTime - this.lastMeleeTime < this.meleeCooldown) {
            return;
          }
          this.lastMeleeTime = currentTime;
          const meleeRange = 90;
          const meleeArc1 = this.add.arc(
            turretX,
            turretY,
            meleeRange,
            Phaser.Math.RadToDeg(angle) - 40,
            Phaser.Math.RadToDeg(angle) + 40,
            false,
            0xeab308,
            0.4,
          );
          meleeArc1.setStrokeStyle(12, 0xfbbf24, 0.8);

          const meleeArc2 = this.add.arc(
            turretX,
            turretY,
            meleeRange - 15,
            Phaser.Math.RadToDeg(angle) - 35,
            Phaser.Math.RadToDeg(angle) + 35,
            false,
            0xfbbf24,
            0.6,
          );
          meleeArc2.setStrokeStyle(8, 0xfde047, 1);

          this.meleeAttacks.add(meleeArc1);
          this.meleeAttacks.add(meleeArc2);
          this.tweens.add({
            targets: [meleeArc1, meleeArc2],
            alpha: { from: 0.9, to: 0 },
            scaleX: { from: 0.8, to: 1.4 },
            scaleY: { from: 0.8, to: 1.4 },
            duration: 250,
            ease: 'Power2',
            onComplete: () => {
              meleeArc1.destroy();
              meleeArc2.destroy();
            },
          });
          this.balls.getChildren().forEach((ball: any) => {
            const dist = Phaser.Math.Distance.Between(turretX, turretY, ball.x, ball.y);
            if (dist < meleeRange) {
              const health = this.damageBall(3, ball);
              if (health <= 0) {
                const glow = ball.getData('glow');
                const inner = ball.getData('inner');
                const core = ball.getData('core');
                const highlight = ball.getData('highlight');
                const shadow = ball.getData('shadow');
                if (glow) glow.destroy();
                if (inner) inner.destroy();
                if (core) core.destroy();
                if (highlight) highlight.destroy();
                if (shadow) shadow.destroy();
                ball.destroy();
                this.score += 10;
                setScore(this.score);
              } else {
                ball.setData('health', health);
              }
            }
          });
        }
      }

      explode(x: number, y: number) {
        const explosion = this.add.circle(x, y, 10, 0xff6b35);
        const explosionOuter = this.add.circle(x, y, 15, 0xff6b35, 0.5);

        this.tweens.add({
          targets: [explosion, explosionOuter],
          scaleX: { from: 1, to: 5.5 },
          scaleY: { from: 1, to: 5.5 },
          alpha: { from: 1, to: 0 },
          duration: 400,
          onComplete: () => {
            explosion.destroy();
            explosionOuter.destroy();
          },
        });
        const explosionRadius = 140;
        this.balls.getChildren().forEach((ball: any) => {
          const dist = Phaser.Math.Distance.Between(x, y, ball.x, ball.y);
          if (dist < explosionRadius) {
            const health = this.damageBall(1.5, ball);
            if (health <= 0) {
              const glow = ball.getData('glow');
              const inner = ball.getData('inner');
              const core = ball.getData('core');
              const highlight = ball.getData('highlight');
              const shadow = ball.getData('shadow');
              if (glow) glow.destroy();
              if (inner) inner.destroy();
              if (core) core.destroy();
              if (highlight) highlight.destroy();
              if (shadow) shadow.destroy();
              ball.destroy();
              this.score += 10;
              setScore(this.score);
            } else {
              ball.setData('health', health);
            }
          }
        });
      }

      hitBall(laser: any, ball: any) {
        const health = this.damageBall(1, ball);
        if (health <= 0) {
          const laserCore = laser.getData('core');
          const laserGlow = laser.getData('glow');
          if (laserCore) laserCore.destroy();
          if (laserGlow) laserGlow.destroy();
          laser.destroy();
          const glow = ball.getData('glow');
          const inner = ball.getData('inner');
          const core = ball.getData('core');
          const highlight = ball.getData('highlight');
          const shadow = ball.getData('shadow');
          if (glow) glow.destroy();
          if (inner) inner.destroy();
          if (core) core.destroy();
          if (highlight) highlight.destroy();
          if (shadow) shadow.destroy();
          ball.destroy();
          this.score += 10;
          setScore(this.score);
        } else {
          ball.setData('health', health);
        }
      }

      damageBall(multiplier: number, ball: any): number {
        const damage = this.turretStrength * multiplier;
        let health = ball.getData('health') || 1;
        health -= damage;

        // Create floating damage text
        const damageText = this.add.text(ball.x, ball.y - 30, `-${damage}`, {
          fontSize: '20px',
          color: '#ff6b6b',
          fontStyle: 'bold',
          stroke: '#000000',
          strokeThickness: 3,
        });
        damageText.setOrigin(0.5, 0.5);

        // Animate the damage text
        this.tweens.add({
          targets: damageText,
          y: damageText.y - 40,
          alpha: { from: 1, to: 0 },
          duration: 800,
          ease: 'Power2',
          onComplete: () => {
            damageText.destroy();
          },
        });

        return health;
      }

      update() {
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
        this.gridGraphics.clear();

        const cam = this.cameras.main;
        const gridSize = 50;
        const startX = Math.floor((cam.scrollX - 100) / gridSize) * gridSize;
        const endX = Math.ceil((cam.scrollX + cam.width + 100) / gridSize) * gridSize;
        const startY = Math.floor((cam.scrollY - 100) / gridSize) * gridSize;
        const endY = Math.ceil((cam.scrollY + cam.height + 100) / gridSize) * gridSize;
        this.gridGraphics.lineStyle(1, 0x1e293b, 0.3);
        for (let x = startX; x <= endX; x += gridSize) {
          this.gridGraphics.lineBetween(x, startY, x, endY);
        }
        for (let y = startY; y <= endY; y += gridSize) {
          this.gridGraphics.lineBetween(startX, y, endX, y);
        }
        this.gridGraphics.lineStyle(2, 0x334155, 0.4);
        for (let x = startX; x <= endX; x += gridSize * 5) {
          this.gridGraphics.lineBetween(x, startY, x, endY);
        }
        for (let y = startY; y <= endY; y += gridSize * 5) {
          this.gridGraphics.lineBetween(startX, y, endX, y);
        }
        this.gridGraphics.fillStyle(0x475569, 0.5);
        for (let x = startX; x <= endX; x += gridSize) {
          for (let y = startY; y <= endY; y += gridSize) {
            this.gridGraphics.fillCircle(x, y, 1.5);
          }
        }
        this.balls.getChildren().forEach((ball: any) => {
          const glow = ball.getData('glow');
          const inner = ball.getData('inner');
          const core = ball.getData('core');
          const highlight = ball.getData('highlight');
          const shadow = ball.getData('shadow');

          if (glow) {
            glow.x = ball.x;
            glow.y = ball.y;
          }
          if (inner) {
            inner.x = ball.x;
            inner.y = ball.y;
          }
          if (core) {
            core.x = ball.x;
            core.y = ball.y;
          }
          if (highlight) {
            highlight.x = ball.x - 4;
            highlight.y = ball.y - 4;
          }
          if (shadow) {
            shadow.x = ball.x + 2;
            shadow.y = ball.y + 2;
          }
          if (!ball.getData('hitCenter')) {
            const body = ball.body as Phaser.Physics.Arcade.Body;
            if (body) {
              const angle = Phaser.Math.Angle.Between(
                ball.x,
                ball.y,
                this.turretBase.x,
                this.turretBase.y,
              );
              const speed = 100;
              body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
            }
          }
        });
        this.lasers.getChildren().forEach((laser: any) => {
          const core = laser.getData('core');
          const glow = laser.getData('glow');
          if (core) {
            core.x = laser.x;
            core.y = laser.y;
          }
          if (glow) {
            glow.x = laser.x;
            glow.y = laser.y;
          }
        });
        this.explosions.getChildren().forEach((rocket: any) => {
          const core = rocket.getData('core');
          const glow = rocket.getData('glow');
          const highlight = rocket.getData('highlight');
          if (core) {
            core.x = rocket.x;
            core.y = rocket.y;
          }
          if (glow) {
            glow.x = rocket.x;
            glow.y = rocket.y;
          }
          if (highlight) {
            highlight.x = rocket.x - 2;
            highlight.y = rocket.y - 2;
          }
        });
        this.balls.getChildren().forEach((ball: any) => {
          const distance = Phaser.Math.Distance.Between(
            ball.x,
            ball.y,
            this.turretBase.x,
            this.turretBase.y,
          );
          if (distance < 40 && !ball.getData('hitCenter')) {
            ball.setData('hitCenter', true);
            const ballGlow = ball.getData('glow');
            const ballInner = ball.getData('inner');
            const ballCore = ball.getData('core');
            const ballHighlight = ball.getData('highlight');
            const ballShadow = ball.getData('shadow');
            if (ballGlow) ballGlow.destroy();
            if (ballInner) ballInner.destroy();
            if (ballCore) ballCore.destroy();
            if (ballHighlight) ballHighlight.destroy();
            if (ballShadow) ballShadow.destroy();
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
          console.log(this.level)
          this.enemyHealth *= 2;
          if (!this.quizShown) {
            this.quizShown = true;
            showQuizPopup();
          }
        }
      }
    }

    // Phaser Configuration
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

  // Component Render
  return (
    <div className="h-screen w-full bg-background text-foreground flex items-center justify-center p-3 overflow-hidden relative">
      <div className="absolute top-3 left-3 z-50">
        <LanguageSelector />
      </div>
      <div className="w-full max-w-6xl h-full flex flex-col gap-3">
        <GameStats score={score} health={health} maxHealth={10} />
        <Card
          className="border-border/50 bg-card/95 backdrop-blur shadow-lg relative"
          style={{ flexGrow: 1, minHeight: 0 }}
        >
          <GameHeader isPaused={paused} onInfoClick={() => setShowInfo(true)} />
          <CardContent className="p-4" style={{ height: 'calc(100% - 50px)' }}>
            <div
              ref={gameRef}
              className="bg-game-dark rounded-lg overflow-hidden border border-border/50 shadow-xl w-full h-full"
            />

            <GameOverlay isGameOver={gameOver} score={score} onRestart={handleRestart} />
            <WeaponWheel
              isOpen={showWeaponWheel}
              currentWeapon={currentWeapon}
              onWeaponSelect={(weapon) => {
                setCurrentWeapon(weapon);
                if (phaserGameRef.current) {
                  const scene = phaserGameRef.current.scene.keys['GameScene'];
                  scene.currentWeapon = weapon;
                }
              }}
            />
          </CardContent>
        </Card>

        <GameControls isPaused={paused} onTogglePause={togglePause} onRestart={handleRestart} />
      </div>

      {showQuiz && (
          <QuizPopup
              question={quizQuestions[currentQuizIndex]}
              onAnswer={handleQuizAnswer}
          />
      )}
      {showReward && <RewardPopup rewards={availableRewards} onSelect={handleRewardSelect} />}

      <InfoDialog isOpen={showInfo} onClose={() => setShowInfo(false)} />
    </div>
  );
};

export default TowerDefenseGame;
