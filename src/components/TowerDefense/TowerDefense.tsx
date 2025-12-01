import React, { useEffect, useRef } from 'react';
import { QuizPopup } from "./QuizPopup";
import { RewardPopup } from "./RewardPopup";
import Phaser from 'phaser';

const TowerDefenseGame = () => {
    const gameRef = useRef(null);
    const phaserGameRef = useRef(null);
    const [showQuiz, setShowQuiz] = React.useState(false);
    const [showReward, setShowReward] = React.useState(false);
    const [quizQuestion, setQuizQuestion] = React.useState("Is Phaser great for game development?");
    const [availableRewards, setAvailableRewards] = React.useState<string[]>([]);
    const [paused, setPaused] = React.useState(false);

    const togglePause = () => {
        if (!phaserGameRef.current) return;
        const scene = phaserGameRef.current.scene.keys["GameScene"];
        if (paused) {
            scene.scene.resume();
        } else {
            scene.scene.pause();
        }
        setPaused(!paused);
    };

    const selectRandomRewards = (): string[] => {
        const allRewards = ['faster_autofire', 'powerful_attack', 'health_boost', 'area_attack_radius', 'area_attack_power'];
        const shuffled = allRewards.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 2);
    };

    const handleQuizAnswer = (answer: any) => {
        setShowQuiz(false);

        if (phaserGameRef.current) {
            const scene: any = phaserGameRef.current.scene.keys["GameScene"];

            if (answer) {
                // Correct answer - show reward selection
                const rewards = selectRandomRewards();
                setAvailableRewards(rewards);
                setShowReward(true);
                // Keep game paused while selecting reward
            } else {
                // Wrong answer - resume game immediately
                scene.scene.resume();
                scene.quizShown = false;
                setPaused(false);
            }
        }

        console.log("Quiz answer:", answer);
    };

    const handleRewardSelect = (reward: string) => {
        setShowReward(false);

        if (phaserGameRef.current) {
            const scene: any = phaserGameRef.current.scene.keys["GameScene"];

            // Apply reward effects
            switch (reward) {
                case 'faster_autofire':
                    scene.autoShootDelay = Math.max(100, scene.autoShootDelay * 0.6);
                    console.log("Reward: Faster Autofire! New delay:", scene.autoShootDelay);
                    break;
                case 'powerful_attack':
                    scene.turretStrength *= 2;
                    console.log("Reward: Powerful Attack! Turret strength:", scene.turretStrength);
                    break;
                case 'health_boost':
                    scene.health = Math.min(scene.health + 1, 10);
                    console.log("Reward: Health Boost! Health:", scene.health);
                    break;
                case 'area_attack_radius':
                    scene.areaAttackRadius = Math.min(scene.areaAttackRadius + 30, 200);
                    console.log("Reward: Area Attack Radius+! New radius:", scene.areaAttackRadius);
                    break;
                case 'area_attack_power':
                    scene.areaAttackPower += 1;
                    console.log("Reward: Area Attack Power+! New power:", scene.areaAttackPower);
                    break;
            }

            scene.scene.resume();
            scene.quizShown = false;
            setPaused(false);
        }
    };

    const showQuizPopup = () => {
        if (!phaserGameRef.current) return;
        const scene = phaserGameRef.current.scene.keys["GameScene"];
        scene.scene.pause();
        setPaused(true);
        setShowQuiz(true);
    };

    useEffect(() => {
        class GameScene extends Phaser.Scene {
            private turret: any;
            private turretBarrel: any;
            private balls: any;
            private lasers: any;
            private score: number
            private scoreText: any;
            private useMouse: boolean
            private mouseShootEvent: any;
            private quizShown: boolean
            private health: number
            private level: number
            private progressBar: any;
            private progressBarBG: any;
            private spawnEvent: any;
            private autoShootEvent: any;
            private gameOverText: any;
            private finalScoreText: any;
            private retryButton: any;
            private isGameOver: boolean;
            private enemyHealth: number;
            private turretStrength: number;
            public autoShootDelay: number; // Made public for external access
            public areaAttackRadius: number;
            public areaAttackPower: number;
            public areaAttackEvent: any;
            public areaAttacks: any;

            constructor() {
                super('GameScene');
            }

            init(){
                this.turret = null;
                this.turretBarrel = null;
                this.balls = null;
                this.lasers = null;
                this.score = 0;
                this.scoreText = null;
                this.useMouse = false;
                this.mouseShootEvent = null;
                this.quizShown = false;
                this.health = 1;
                this.level = 0;
                this.enemyHealth = 3;
                this.turretStrength = 1;
                this.isGameOver = false;
                this.autoShootDelay = 500; // Initial autofire delay
                this.areaAttackRadius = 80;
                this.areaAttackPower = 1;
            }

            // Preload graphics
            preload(){
                // Background
                this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

                // Grid pattern for background
                const graphics = this.add.graphics();
                graphics.lineStyle(1, 0x16213e, 0.3);
                for (let i = 0; i < 800; i += 40) {
                    graphics.lineBetween(i, 0, i, 600);
                }
                for (let i = 0; i < 600; i += 40) {
                    graphics.lineBetween(0, i, 800, i);
                }

                // Create turret base (circle)
                const turretBase = this.add.circle(400, 300, 30, 0x0f3460);
                turretBase.setStrokeStyle(3, 0x16213e);

                // Create turret barrel (rectangle)
                this.turretBarrel = this.add.rectangle(400, 300, 50, 15, 0xe94560);
                this.turretBarrel.setOrigin(0, 0.5);

                // Create groups
                this.balls = this.physics.add.group();
                this.lasers = this.physics.add.group();

                // Progress bar
                this.progressBar = this.add.graphics();
                this.progressBarBG = this.add.graphics();

                this.progressBarBG.lineStyle(2, 0xffffff);
                this.progressBarBG.strokeRect(300, 570, 200, 20);
            }

            // Initialize listeners and events
            create() {
                // Score
                this.scoreText = this.add.text(16, 16, 'Score: 0', {
                    fontSize: '24px',
                    fill: '#fff',
                    fontFamily: 'Arial'
                });

                // Spawn balls periodically
                this.spawnEvent = this.time.addEvent({
                    delay: 1500,
                    callback: this.spawnBall,
                    callbackScope: this,
                    loop: true
                });

                // Auto-shooting event
                this.autoShootEvent = this.time.addEvent({
                    delay: this.autoShootDelay,
                    callback: this.shootLaserAuto,
                    callbackScope: this,
                    loop: true
                });

                // Area attack event (fires every 3 seconds)
                this.areaAttackEvent = this.time.addEvent({
                    delay: 3000,
                    callback: this.triggerAreaAttack,
                    callbackScope: this,
                    loop: true
                });

                // Check collisions
                this.physics.add.overlap(
                    this.lasers,
                    this.balls,
                    this.hitBall,
                    null,
                    this
                );

                this.input.on('pointerdown', (pointer: any) => {
                    console.log('pointerdown', pointer);

                    if (!this.useMouse) {
                        this.useMouse = true;
                        if (this.autoShootEvent) {
                            this.autoShootEvent.paused = true; // Pause auto-shoot
                        }
                    }

                    if (!this.mouseShootEvent) {
                        this.mouseShootEvent = this.time.addEvent({
                            delay: 150, // Fire every 150ms (adjust as needed)
                            loop: true,
                            callback: () => {
                                if (this.useMouse) {
                                    this.shootLaserMouse(pointer.worldX, pointer.worldY);
                                }
                            }
                        });
                    }
                });

                window.addEventListener("mouseup", () => {
                    this.useMouse = false;
                    if (this.mouseShootEvent) {
                        this.mouseShootEvent.remove();
                        this.mouseShootEvent = null;
                        if (this.autoShootEvent) {
                            this.autoShootEvent.paused = false;
                        }
                    }
                });


                // Game Over overlay (hidden at start)
                this.gameOverText = this.add.text(400, 250, 'GAME OVER', {
                    fontSize: '48px',
                    fill: '#ff4d4d',
                    fontFamily: 'Arial'
                }).setOrigin(0.5).setVisible(false);

                this.finalScoreText = this.add.text(400, 320, '', {
                    fontSize: '28px',
                    fill: '#fff',
                    fontFamily: 'Arial'
                }).setOrigin(0.5).setVisible(false);

                // Retry button (hidden at start)
                this.retryButton = this.add.text(400, 380, 'RETRY', {
                    fontSize: '32px',
                    fill: '#00ff00',
                    fontFamily: 'Arial',
                    backgroundColor: '#000',
                    padding: { left: 20, right: 20, top: 10, bottom: 10 }
                })
                    .setOrigin(0.5)
                    .setInteractive({ useHandCursor: true })
                    .setVisible(false);

                this.retryButton.on('pointerdown', () => {
                    this.scene.restart();
                });
            }

            spawnBall() {
                const side = Phaser.Math.Between(0, 3);
                let x, y;

                // Spawn from random side
                switch(side) {
                    case 0:
                        x = Phaser.Math.Between(0, 800);
                        y = -20;
                        break;
                    case 1:
                        x = 820;
                        y = Phaser.Math.Between(0, 600);
                        break;
                    case 2:
                        x = Phaser.Math.Between(0, 800);
                        y = 620;
                        break;
                    case 3:
                        x = -20;
                        y = Phaser.Math.Between(0, 600);
                        break;
                }

                const ball = this.add.circle(x, y, 15, 0xff6b6b);
                ball.setStrokeStyle(2, 0xff5252);
                this.physics.add.existing(ball);

                // Add health to ball
                ball.setData('health', this.enemyHealth);
                ball.setData('maxHealth', 3);

                this.balls.add(ball);

                // Move toward center
                this.physics.moveToObject(ball, { x: 400, y: 300 }, 100);
            }

            shootLaserAuto() {
                // Only auto-fire if not using mouse control
                if (this.useMouse) return;
                const ballsArray = this.balls.getChildren();
                if (ballsArray.length === 0) return;
                let nearest = null, minDist = Infinity;
                ballsArray.forEach(ball => {
                    const dist = Phaser.Math.Distance.Between(400, 300, ball.x, ball.y);
                    if (dist < minDist) { minDist = dist; nearest = ball; }
                });
                if (nearest) {
                    this.shootLaserTo(nearest.x, nearest.y);
                }
            }

            shootLaserMouse(mouseX: any, mouseY: any) {
                // Turret aims and fires toward mouse position
                this.shootLaserTo(mouseX, mouseY);
            }

            shootLaserTo(targetX: any, targetY: any) {
                const angle = Phaser.Math.Angle.Between(400, 300, targetX, targetY);
                this.turretBarrel.rotation = angle;
                const laser = this.add.rectangle(400, 300, 30, 4, 0x00ff00);
                laser.setOrigin(0, 0.5);
                laser.rotation = angle;
                this.physics.add.existing(laser);
                this.lasers.add(laser);
                const speed = 400;
                laser.body.setVelocity(
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                );
                this.time.delayedCall(2000, () => {
                    if (laser && laser.active) {
                        laser.destroy();
                    }
                });
            }


            triggerAreaAttack() {
                // Create area attack at center with transparent sphere visual
                const areaAttack = this.add.circle(400, 300, this.areaAttackRadius, 0x6366f1, 0.2);
                areaAttack.setStrokeStyle(3, 0x6366f1);

                // Store attack data
                areaAttack.setData('radius', this.areaAttackRadius);
                areaAttack.setData('power', this.areaAttackPower);
                areaAttack.setData('createdAt', this.time.now);

                // Deal damage to all balls in radius
                this.damageEnemiesInArea(400, 300, this.areaAttackRadius, this.areaAttackPower);

                // Visual feedback - expand and fade out
                this.tweens.add({
                    targets: areaAttack,
                    radius: this.areaAttackRadius * 1.5,
                    alpha: 0,
                    duration: 400,
                    ease: 'Quad.easeOut',
                    onComplete: () => {
                        areaAttack.destroy();
                    }
                });
            }

            damageEnemiesInArea(x: number, y: number, radius: number, damage: number) {
                const ballsArray = this.balls.getChildren();
                ballsArray.forEach((ball: any) => {
                    const dist = Phaser.Math.Distance.Between(x, y, ball.x, ball.y);
                    if (dist < radius) {
                        // Create mini explosion effect
                        const particles = this.add.particles(ball.x, ball.y, {
                            speed: { min: 40, max: 120 },
                            scale: { start: 0.6, end: 0 },
                            blendMode: 'ADD',
                            lifespan: 250,
                            tint: 0x6366f1,
                            quantity: 6,
                            emitting: false
                        });
                        particles.explode();
                        this.time.delayedCall(300, () => particles.destroy());

                        // Deal damage
                        let health = ball.getData('health');
                        health -= damage;

                        if (health <= 0) {
                            ball.destroy();
                            this.score += 10;
                            this.scoreText.setText('Score: ' + this.score);
                        } else {
                            ball.setData('health', health);
                        }
                    }
                });
            }

            hitBall(laser, ball) {
                // Explosion effect
                const particles = this.add.particles(ball.x, ball.y, {
                    speed: { min: 50, max: 150 },
                    scale: { start: 0.8, end: 0 },
                    blendMode: 'ADD',
                    lifespan: 300,
                    tint: 0xff6b6b,
                    quantity: 8,
                    emitting: false
                });
                particles.explode();
                let health = ball.getData('health');
                health -= this.turretStrength;

                if (health <= 0) {
                    laser.destroy();
                    ball.destroy();

                    this.score += 10;
                    this.scoreText.setText('Score: ' + this.score);
                } else {
                    laser.destroy();
                    ball.setData('health', health);
                }
                // Clean up particles
                this.time.delayedCall(500, () => particles.destroy());
            }

            update() {
                this.updateProgressBar();

                if(Math.floor(this.score / 100) > this.level) {
                    console.log(this.score / 100)
                    this.level += 1;
                    this.enemyHealth *= 2;
                    this.spawnEvent.delay = Math.max(500, this.spawnEvent.delay - 200);

                    if (this.level % 10 === 0) {
                        for (let i = 0; i < 5; i++) {
                            this.spawnBall();
                        }
                    }

                    if (!this.quizShown) {
                        this.quizShown = true;
                        showQuizPopup();
                    }
                }

                // Destroy balls that reach the center
                this.balls.getChildren().forEach(ball => {
                    const dist = Phaser.Math.Distance.Between(400, 300, ball.x, ball.y);
                    if (dist < 40) {
                        this.health -= 1;
                        if (this.health <= 0) {
                            this.endGame();
                            return;
                        }

                        ball.destroy();
                    }
                });

                // Destroy lasers that go off screen
                this.lasers.getChildren().forEach(laser => {
                    if (laser.x < -50 || laser.x > 850 || laser.y < -50 || laser.y > 650) {
                        laser.destroy();
                    }
                });
            }

            endGame() {
                // Stop physics movement
                this.physics.world.pause();

                // Pause timers / events so nothing spawns or auto-shoots
                if (this.spawnEvent) this.spawnEvent.paused = true;
                if (this.autoShootEvent) this.autoShootEvent.paused = true;
                if (this.mouseShootEvent) {
                    this.mouseShootEvent.remove();
                    this.mouseShootEvent = null;
                }

                // Stop active velocities on groups (optional, for visual freeze)
                this.balls.getChildren().forEach(ball => {
                    if (ball.body) {
                        ball.body.setVelocity(0, 0);
                        ball.body.moves = false;
                    }
                });
                this.lasers.getChildren().forEach(laser => {
                    if (laser.body) {
                        laser.body.setVelocity(0, 0);
                        laser.body.moves = false;
                    }
                });

                // Mark game over so update() can early-return if you want
                this.isGameOver = true;

                // Show UI (keep scene running so pointer works)
                this.gameOverText.setVisible(true);
                this.finalScoreText.setText('Final Score: ' + this.score);
                this.finalScoreText.setVisible(true);
                this.retryButton.setVisible(true);

                // Ensure input remains enabled so retry button can receive clicks
                this.input.enabled = true;
            }

            updateProgressBar() {
                // Score inside the current level (0–99)
                const scoreInsideLevel = this.score % 100;
                const percent = scoreInsideLevel / 100;

                this.progressBar.clear();
                this.progressBar.fillStyle(0x00ff00, 1);
                this.progressBar.fillRect(300, 570, 200 * percent, 20);
            }
        }

        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameRef.current,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            scene: [GameScene],
            backgroundColor: '#1a1a2e'
        };

        phaserGameRef.current = new Phaser.Game(config);

        return () => {
            if (phaserGameRef.current) {
                phaserGameRef.current.destroy(true);
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 relative">
            {/* Pause button and title */}
            <button
                onClick={togglePause}
                className="mb-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg"
            >
                {paused ? "Resume" : "Pause"}
            </button>
            <div className="mb-4 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">Turret Defense</h1>
                <p className="text-gray-400">
                    The turret automatically targets and shoots incoming balls!
                </p>
            </div>

            {/* Phaser canvas container */}
            <div
                ref={gameRef}
                className="border-4 border-gray-700 rounded-lg shadow-2xl relative"
                style={{ position: 'relative', zIndex: 1 }}
            />

            {/* Quiz popup overlay */}
            {showQuiz && (
                <QuizPopup
                    question={quizQuestion}
                    onAnswer={handleQuizAnswer}
                />
            )}

            {/* Reward popup overlay */}
            {showReward && (
                <RewardPopup
                    rewards={availableRewards}
                    onSelect={handleRewardSelect}
                />
            )}
        </div>
    );
};

export default TowerDefenseGame;
