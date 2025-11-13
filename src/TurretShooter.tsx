import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const TurretShooter = () => {
    const gameRef = useRef<HTMLDivElement>(null);
    const phaserGameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        if (phaserGameRef.current) return;

        class GameScene extends Phaser.Scene {
            private turret: any;
            private bullets: any;
            private lastFired: number;
            private fireRate: number;
            private cursors: any;
            private spaceKey: any;

            constructor() {
                super({ key: 'GameScene' });
                this.turret = null;
                this.bullets = null;
                this.lastFired = 0;
                this.fireRate = 250;
            }

            preload() {
                // Create graphics for turret and bullets
                this.createGraphics();
            }

            createGraphics() {
                // Create turret base graphic
                const baseGraphics = this.add.graphics();
                baseGraphics.fillStyle(0x4a5568, 1);
                baseGraphics.fillRect(0, 0, 60, 40);
                baseGraphics.generateTexture('turretBase', 60, 40);
                baseGraphics.destroy();

                // Create turret barrel graphic
                const barrelGraphics = this.add.graphics();
                barrelGraphics.fillStyle(0x2d3748, 1);
                barrelGraphics.fillRect(0, 0, 15, 50);
                barrelGraphics.generateTexture('turretBarrel', 15, 50);
                barrelGraphics.destroy();

                // Create bullet graphic
                const bulletGraphics = this.add.graphics();
                bulletGraphics.fillStyle(0xfbbf24, 1);
                bulletGraphics.fillCircle(5, 5, 5);
                bulletGraphics.generateTexture('bullet', 10, 10);
                bulletGraphics.destroy();
            }

            create() {
                // Add background
                this.add.rectangle(400, 300, 800, 600, 0x1e293b);

                // Create bullet group
                this.bullets = this.physics.add.group({
                    defaultKey: 'bullet',
                    maxSize: 30
                });

                // Create turret at bottom center
                this.turret = this.add.container(400, 550);

                const base = this.add.image(0, 0, 'turretBase');
                const barrel = this.add.image(0, -35, 'turretBarrel');
                barrel.setOrigin(0.5, 1);

                this.turret.add([base, barrel]);
                this.turret.barrel = barrel;

                // Input handling
                this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
                    const angle = Phaser.Math.Angle.Between(
                        this.turret.x,
                        this.turret.y,
                        pointer.x,
                        pointer.y
                    );
                    this.turret.barrel.rotation = angle + Math.PI / 2;
                });

                this.input.on('pointerdown', () => {
                    this.shootBullet();
                });

                // Add keyboard controls (arrow keys to move, space to shoot)
                // @ts-ignore
                this.cursors = this.input.keyboard.createCursorKeys();
                // @ts-ignore
                this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

                // Instructions
                this.add.text(400, 30, 'Move mouse to aim • Click or SPACE to shoot', {
                    fontSize: '18px',
                    color: '#fff',
                    fontFamily: 'Arial'
                }).setOrigin(0.5);

                this.add.text(400, 60, 'Arrow keys to move turret', {
                    fontSize: '14px',
                    color: '#94a3b8',
                    fontFamily: 'Arial'
                }).setOrigin(0.5);
            }

            update(time: number) {
                // Move turret with arrow keys
                if (this.cursors.left.isDown) {
                    this.turret.x = Math.max(50, this.turret.x - 5);
                } else if (this.cursors.right.isDown) {
                    this.turret.x = Math.min(750, this.turret.x + 5);
                }

                // Shoot with spacebar
                if (this.spaceKey.isDown && time > this.lastFired) {
                    this.shootBullet();
                    this.lastFired = time + this.fireRate;
                }

                // Update bullets
                this.bullets.children.entries.forEach((bullet: any) => {
                    if (bullet.active && (bullet.y < 0 || bullet.x < 0 || bullet.x > 800)) {
                        bullet.setActive(false);
                        bullet.setVisible(false);
                    }
                });
            }

            shootBullet() {
                const bullet = this.bullets.get(this.turret.x, this.turret.y - 40);

                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);

                    const angle = this.turret.barrel.rotation - Math.PI / 2;
                    const speed = 500;

                    bullet.body.velocity.x = Math.cos(angle) * speed;
                    bullet.body.velocity.y = Math.sin(angle) * speed;

                    // Add bullet trail effect
                    const trail = this.add.circle(bullet.x, bullet.y, 3, 0xfef3c7, 0.5);
                    this.tweens.add({
                        targets: trail,
                        alpha: 0,
                        scale: 0,
                        duration: 300,
                        onComplete: () => trail.destroy()
                    });
                }
            }
        }

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameRef.current!,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { x: 0, y: 0 },
                    debug: false
                }
            },
            scene: GameScene,
            backgroundColor: '#1e293b'
        };

        phaserGameRef.current = new Phaser.Game(config);

        return () => {
            if (phaserGameRef.current) {
                phaserGameRef.current.destroy(true);
                phaserGameRef.current = null;
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="mb-4 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">Turret Shooter</h1>
                <p className="text-gray-400">Aim with your mouse and click to fire!</p>
            </div>
            <div
                ref={gameRef}
                className="border-4 border-gray-700 rounded-lg shadow-2xl"
            />
        </div>
    );
};

export default TurretShooter;