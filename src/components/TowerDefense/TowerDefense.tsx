import React, { useEffect, useRef } from 'react';
import {QuizPopup} from "./QuizPopup";
import Phaser from 'phaser';

const TowerDefenseGame = () => {
    const gameRef = useRef(null);
    const phaserGameRef = useRef(null);
    const [showQuiz, setShowQuiz] = React.useState(false);
    const [quizQuestion, setQuizQuestion] = React.useState("Is Phaser great for game development?");
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

    const handleQuizAnswer = (answer: any) => {
        setShowQuiz(false);

        if (phaserGameRef.current) {
            const scene: any = phaserGameRef.current.scene.keys["GameScene"];
            scene.scene.resume();
            scene.quizShown = false; // allow another quiz later if desired

            if (answer) {
                scene.score += 5; // reward for correct answer
            }
        }

        setPaused(false);
        console.log("Quiz answer:", answer);
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
            constructor() {
                super('GameScene');
                this.turret = null;
                this.turretBarrel = null;
                this.balls = null;
                this.lasers = null;
                this.score = 0;
                this.scoreText = null;
                this.useMouse = false;
                this.mouseShootEvent = null;
                this.quizShown = false; // NEW
                this.level = 0;
            }

            create() {
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

                const progressBar = this.add.graphics();
                progressBar.fillStyle(0x00ff00, 1);
                progressBar.fillRect(300, 570, 200, 20);
                progressBar.lineStyle(2, 0xffffff);
                progressBar.strokeRect(300, 570, 200, 20);

                // Score
                this.scoreText = this.add.text(16, 16, 'Score: 0', {
                    fontSize: '24px',
                    fill: '#fff',
                    fontFamily: 'Arial'
                });

                // Spawn balls periodically
                this.time.addEvent({
                    delay: 1500,
                    callback: this.spawnBall,
                    callbackScope: this,
                    loop: true
                });

                // Auto-shoot
                this.time.addEvent({
                    delay: 500,
                    callback: this.shootLaserAuto,
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
                    // // On every click (if mouse mode), shoot toward mouse
                    // if (this.useMouse) {
                    //     this.shootLaserMouse(pointer.worldX, pointer.worldY);
                    // }
                });

                this.input.on('pointerup' , () => {
                   if (this.useMouse) {
                          this.useMouse = false;

                   }
                    if (this.mouseShootEvent) {
                        this.mouseShootEvent.remove();
                        this.mouseShootEvent = null;
                    }
                });
            }

            spawnBall() {
                const side = Phaser.Math.Between(0, 3);
                let x, y;

                // Spawn from random side
                switch(side) {
                    case 0: // top
                        x = Phaser.Math.Between(0, 800);
                        y = -20;
                        break;
                    case 1: // right
                        x = 820;
                        y = Phaser.Math.Between(0, 600);
                        break;
                    case 2: // bottom
                        x = Phaser.Math.Between(0, 800);
                        y = 620;
                        break;
                    case 3: // left
                        x = -20;
                        y = Phaser.Math.Between(0, 600);
                        break;
                }

                const ball = this.add.circle(x, y, 15, 0xff6b6b);
                ball.setStrokeStyle(2, 0xff5252);
                this.physics.add.existing(ball);

                // Add health to ball
                ball.setData('health', 3);
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

            shootLaserMouse(mouseX, mouseY) {
                // Turret aims and fires toward mouse position
                this.shootLaserTo(mouseX, mouseY);
            }

            shootLaserTo(targetX, targetY) {
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
                health -= 1;

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
                if(Math.floor(this.score / 100) > this.level) {
                    console.log(this.score / 100)
                    this.level += 1;
                    if (!this.quizShown) {
                        this.quizShown = true;
                        showQuizPopup();       // uses closure to call React
                    }
                }

                // Destroy balls that reach the center
                this.balls.getChildren().forEach(ball => {
                    const dist = Phaser.Math.Distance.Between(400, 300, ball.x, ball.y);
                    if (dist < 40) {
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
        </div>
    );

};

export default TowerDefenseGame;