import { useEffect, useRef, useState } from 'react';
import { QuizPopup } from './QuizPopup';
import { RewardPopup } from './RewardPopup';
import { InfoDialog } from './InfoDialog';
import { WeaponWheel } from './WeaponWheel';
import { Overlay } from './Overlay';
import { Stats } from './Stats';
import { Controls } from './Controls';
import { Header } from './Header';
import Phaser from 'phaser';
import { GameConfig } from '@/engine/consts/config';
import GameScene, { EnemyStats, PlayerStats } from '@/engine/gameScene';
import { Card, CardContent } from '@/components/ui/card';
import { QuizQuestion, Weapon } from '@/components/game/types';
import { useTranslation } from 'react-i18next';
import { User, Target, Zap as Power, Crosshair, Heart, Gauge, Flame, BarChart } from 'lucide-react';
import { questionsAL } from '@/components/game/quiz/quizSQ.ts';
import { questionsMK } from '@/components/game/quiz/quizMK.ts';
import { shuffle } from '@/components/game/helpers/shuffle.tsx';

const quizzesByLanguage: Record<string, QuizQuestion[]> = {
  en: questionsAL,
  mk: questionsMK,
};

const TowerDefenseGame = () => {
  const { i18n, t } = useTranslation();

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(
    shuffle(quizzesByLanguage[i18n.language] || questionsAL),
  );
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  useEffect(() => {
    const randomized = shuffle(quizzesByLanguage[i18n.language] || questionsAL);
    setQuizQuestions(randomized);
    setCurrentQuizIndex(0);
  }, [i18n.language]);

  const gameRef = useRef<HTMLDivElement | null>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [availableRewards, setAvailableRewards] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [laserAmmo, setLaserAmmo] = useState<number>(GameConfig.MAX_LASER_AMMO);
  const [explosiveAmmo, setExplosiveAmmo] = useState<number>(GameConfig.MAX_EXPLOSIVE_AMMO);
  const [meleeAmmo, setMeleeAmmo] = useState<number>(GameConfig.MAX_MELEE_AMMO);
  const maxLaserAmmo = GameConfig.MAX_LASER_AMMO;
  const maxExplosiveAmmo = GameConfig.MAX_EXPLOSIVE_AMMO;
  const maxMeleeAmmo = GameConfig.MAX_MELEE_AMMO;
  const [currentWeapon, setCurrentWeapon] = useState<Weapon>('laser');
  const [showWeaponWheel, setShowWeaponWheel] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    turretStrength: GameConfig.STARTING_TURRET_STRENGTH,
    areaAttackRadius: GameConfig.STARTING_AREA_ATTACK_RADIUS,
    areaAttackPower: GameConfig.STARTING_AREA_ATTACK_POWER,
    cameraSpeed: GameConfig.STARTING_CAMERA_SPEED,
  });
  const [enemyStats, setEnemyStats] = useState<EnemyStats>({
    health: GameConfig.STARTING_ENEMY_HEALTH,
    speed: GameConfig.ENEMY_BASE_SPEED,
    level: 0,
  });

  useEffect(() => {
    const hasVisited = localStorage.getItem('tower-defense-visited');
    if (!hasVisited) {
      setIsFirstVisit(true);
      setShowInfo(true);
      setPaused(true);
    }
  }, []);

  const handleReady = () => {
    localStorage.setItem('tower-defense-visited', 'true');
    setShowInfo(false);
    setIsFirstVisit(false);
    if (phaserGameRef.current) {
      const scene = phaserGameRef.current.scene.keys['GameScene'] as GameScene;
      scene.scene.resume();
      setPaused(false);
    }
  };

  const togglePause = () => {
    if (!phaserGameRef.current) return;
    const scene = phaserGameRef.current.scene.keys['GameScene'] as GameScene;
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
    const scene = phaserGameRef.current.scene.keys['GameScene'] as GameScene;
    scene.scene.pause();
    setPaused(true);
    setShowQuiz(true);
  };

  const handleQuizAnswer = (correct: boolean) => {
    setShowQuiz(false);
    if (!phaserGameRef.current) return;
    const scene = phaserGameRef.current.scene.keys['GameScene'] as GameScene;

    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setCurrentQuizIndex(0);
    }

    if (correct) {
      const rewards = [
        'power_attack',
        'health_boost',
        'speedBoost',
        'area_attack_radius',
        'area_attack_power',
        'ammo_boost',
      ];
      const choices = [] as string[];
      while (choices.length < 2 && rewards.length > 0) {
        const i = Math.floor(Math.random() * rewards.length);
        choices.push(rewards.splice(i, 1)[0]);
      }
      setAvailableRewards(choices);
      setShowReward(true);
    } else {
      scene.scene.resume();
      scene.quizShown = false;
      setPaused(false);
    }
  };

  const handleRewardSelect = (reward: string) => {
    if (!phaserGameRef.current) return;
    const scene = phaserGameRef.current.scene.keys['GameScene'] as GameScene;
    switch (reward) {
      case 'power_attack':
        if (scene) {
          scene.turretStrength = (scene.turretStrength || 1) * 2;
          setPlayerStats((prev) => ({ ...prev, turretStrength: scene.turretStrength }));
        }
        break;
      case 'health_boost':
        if (scene) {
          scene.health = Math.min(scene.health + 1, 10);
          setHealth(scene.health);
        }
        break;
      case 'speedBoost':
        if (scene) {
          scene.cameraSpeed = Math.min((scene.cameraSpeed || 300) * 1.3, 600);
          setPlayerStats((prev) => ({ ...prev, cameraSpeed: scene.cameraSpeed }));
        }
        break;
      case 'area_attack_radius':
        if (scene) {
          scene.areaAttackRadius = Math.min((scene.areaAttackRadius || 0) + 30, 200);
          setPlayerStats((prev) => ({ ...prev, areaAttackRadius: scene.areaAttackRadius }));
        }
        break;
      case 'area_attack_power':
        if (scene) {
          scene.areaAttackPower = (scene.areaAttackPower || 0) + 1;
          setPlayerStats((prev) => ({ ...prev, areaAttackPower: scene.areaAttackPower }));
        }
        break;
      case 'ammo_boost':
        if (scene) {
          scene.laserAmmo = Math.min(scene.maxLaserAmmo, (scene.laserAmmo || 0) + 5);
          scene.explosiveAmmo = Math.min(scene.maxExplosiveAmmo, (scene.explosiveAmmo || 0) + 7);
          scene.meleeAmmo = Math.min(scene.maxMeleeAmmo, (scene.meleeAmmo || 0) + 1);
          setLaserAmmo(scene.laserAmmo);
          setExplosiveAmmo(scene.explosiveAmmo);
          setMeleeAmmo(scene.meleeAmmo);
          scene.hooks.setLaserAmmo?.(scene.laserAmmo);
          scene.hooks.setExplosiveAmmo?.(scene.explosiveAmmo);
          scene.hooks.setMeleeAmmo?.(scene.meleeAmmo);
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
    const gameScene = new GameScene({
      setScore: (score: number) => setScore(score),
      setLaserAmmo: (amt: number) => setLaserAmmo(amt),
      setExplosiveAmmo: (amt: number) => setExplosiveAmmo(amt),
      setMeleeAmmo: (amt: number) => setMeleeAmmo(amt),
      setHealth: (h: number) => setHealth(h),
      setGameOver: (v: boolean) => setGameOver(v),
      setEnemyStats: (s) => setEnemyStats(s),
      setPlayerStats: (s) => setPlayerStats(s),
      showQuizPopup,
      setShowWeaponWheel: (v: boolean) => setShowWeaponWheel(v),
      setPaused: (v: boolean) => setPaused(v),
    });

    const config = {
      type: Phaser.WEBGL,
      width: 800,
      height: 600,
      parent: gameRef.current || undefined,
      physics: { default: 'arcade', arcade: { debug: false } },
      scene: [gameScene],
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
        roundPixels: true,
        transparent: false,
        clearBeforeRender: true,
        powerPreference: 'high-performance',
      },
      fps: {
        target: 60,
        forceSetTimeOut: false,
      },
    };

    phaserGameRef.current = new Phaser.Game(config);

    return () => {
      if (phaserGameRef.current) phaserGameRef.current.destroy(true);
    };
  }, []);

  const handleRestart = () => {
    if (phaserGameRef.current) {
      const scene = phaserGameRef.current.scene.keys['GameScene'] as GameScene;

      scene.health = GameConfig.STARTING_HEALTH;
      scene.score = GameConfig.STARTING_SCORE;
      scene.level = GameConfig.STARTING_LEVEL;
      scene.laserAmmo = GameConfig.MAX_LASER_AMMO;
      scene.explosiveAmmo = GameConfig.MAX_EXPLOSIVE_AMMO;
      scene.meleeAmmo = GameConfig.MAX_MELEE_AMMO;
      scene.enemyHealth = GameConfig.STARTING_ENEMY_HEALTH;
      scene.turretStrength = GameConfig.STARTING_TURRET_STRENGTH;
      scene.areaAttackRadius = GameConfig.STARTING_AREA_ATTACK_RADIUS;
      scene.areaAttackPower = GameConfig.STARTING_AREA_ATTACK_POWER;
      scene.cameraSpeed = GameConfig.STARTING_CAMERA_SPEED;
      scene.quizShown = false;
      scene.scene.restart();
      setPaused(false);
      setScore(0);
      setHealth(10);
      setLaserAmmo(GameConfig.MAX_LASER_AMMO);
      setExplosiveAmmo(GameConfig.MAX_EXPLOSIVE_AMMO);
      setMeleeAmmo(GameConfig.MAX_MELEE_AMMO);
      setGameOver(false);
      setPlayerStats({
        turretStrength: GameConfig.STARTING_TURRET_STRENGTH,
        areaAttackRadius: GameConfig.STARTING_AREA_ATTACK_RADIUS,
        areaAttackPower: GameConfig.STARTING_AREA_ATTACK_POWER,
        cameraSpeed: GameConfig.STARTING_CAMERA_SPEED,
      });
      setEnemyStats({
        health: GameConfig.STARTING_ENEMY_HEALTH,
        speed: GameConfig.ENEMY_BASE_SPEED,
        level: 0,
      });
    }
  };

  return (
    <div className="h-screen w-full bg-background text-foreground flex items-center justify-center p-2 sm:p-3 overflow-hidden relative">
      <div className="w-full max-w-7xl h-full flex flex-col gap-2 sm:gap-3">
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
          <div className="lg:w-64 lg:shrink-0">
            <div className="backdrop-blur shadow-lg px-2 py-1 rounded-md">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <img
                  src="/mksafenetlogo-white.svg"
                  alt="MKSafeNet Logo"
                  className="h-8 sm:h-10 lg:h-12 w-auto"
                />
                <img
                  src="/finkilogo.png"
                  alt="Finki Logo"
                  className="h-10 sm:h-12 lg:h-16 w-auto"
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Stats
              score={score}
              health={health}
              maxHealth={10}
              laserAmmo={laserAmmo}
              explosiveAmmo={explosiveAmmo}
              meleeAmmo={meleeAmmo}
              maxLaserAmmo={maxLaserAmmo}
              maxExplosiveAmmo={maxExplosiveAmmo}
              maxMeleeAmmo={maxMeleeAmmo}
              currentWeapon={currentWeapon}
              onWeaponChange={(weapon) => {
                setCurrentWeapon(weapon);
                if (phaserGameRef.current) {
                  const scene = phaserGameRef.current.scene.keys['GameScene'] as GameScene;
                  scene.currentWeapon = weapon;
                }
              }}
            />
          </div>
        </div>
        <div className="flex-1 flex gap-2 sm:gap-3 min-h-0">
          <div className="hidden lg:flex flex-col gap-2 sm:gap-3 w-64 shrink-0">
            <Card className="border-border/50 bg-card/95 backdrop-blur shadow-lg">
              <CardContent className="p-3">
                <h3 className="text-sm font-bold font-sans mb-3 flex items-center gap-2 text-foreground">
                  <User className="w-4 h-4 text-game-blue" />
                  {t('stats.playerStats')}
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-2 rounded bg-muted/20 border border-border/30">
                    <div className="flex items-center gap-2">
                      <Power className="w-3.5 h-3.5 text-game-yellow" />
                      <span className="text-muted-foreground">{t('stats.turretPower')}</span>
                    </div>
                    <span className="font-bold text-foreground">{playerStats.turretStrength}x</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-muted/20 border border-border/30">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-3.5 h-3.5 text-game-blue" />
                      <span className="text-muted-foreground">{t('stats.moveSpeed')}</span>
                    </div>
                    <span className="font-bold text-foreground">
                      {Math.round(playerStats.cameraSpeed)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-muted/20 border border-border/30">
                    <div className="flex items-center gap-2">
                      <Target className="w-3.5 h-3.5 text-game-red" />
                      <span className="text-muted-foreground">{t('stats.explosionRadius')}</span>
                    </div>
                    <span className="font-bold text-foreground">
                      {playerStats.areaAttackRadius}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-muted/20 border border-border/30">
                    <div className="flex items-center gap-2">
                      <Flame className="w-3.5 h-3.5 text-game-red" />
                      <span className="text-muted-foreground">{t('stats.explosionPower')}</span>
                    </div>
                    <span className="font-bold text-foreground">
                      {playerStats.areaAttackPower}x
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/95 backdrop-blur shadow-lg">
              <CardContent className="p-3">
                <h3 className="text-sm font-bold font-sans mb-3 flex items-center gap-2 text-foreground">
                  <Crosshair className="w-4 h-4 text-game-red" />
                  {t('stats.enemyStats')}
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-2 rounded bg-muted/20 border border-border/30">
                    <div className="flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5 text-game-green" />
                      <span className="text-muted-foreground">{t('stats.health')}</span>
                    </div>
                    <span className="font-bold text-foreground">
                      {enemyStats.health.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-muted/20 border border-border/30">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-3.5 h-3.5 text-game-blue" />
                      <span className="text-muted-foreground">{t('stats.speed')}</span>
                    </div>
                    <span className="font-bold text-foreground">{enemyStats.speed}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-muted/20 border border-border/30">
                    <div className="flex items-center gap-2">
                      <BarChart className="w-3.5 h-3.5 text-game-yellow" />
                      <span className="text-muted-foreground">{t('stats.level')}</span>
                    </div>
                    <span className="font-bold text-foreground">{enemyStats.level}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 flex flex-col gap-2 sm:gap-3 min-w-0">
            <Card
              className="border-border/50 bg-card/95 backdrop-blur shadow-lg relative flex-1"
              style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}
            >
              <Header isPaused={paused} onInfoClick={() => setShowInfo(true)} />
              <CardContent
                className="p-1 sm:p-2 lg:p-4 flex-1"
                style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}
              >
                <div
                  ref={gameRef}
                  className="bg-game-dark rounded-lg overflow-hidden border border-border/50 shadow-xl w-full h-full"
                  style={{ aspectRatio: '4/3', maxHeight: '100%', margin: '0 auto' }}
                />

                <Overlay isGameOver={gameOver} score={score} onRestart={handleRestart} />
                <WeaponWheel
                  isOpen={showWeaponWheel}
                  currentWeapon={currentWeapon}
                  onWeaponSelect={(weapon) => {
                    setCurrentWeapon(weapon);
                    if (phaserGameRef.current) {
                      const scene = phaserGameRef.current.scene.keys['GameScene'] as GameScene;
                      scene.currentWeapon = weapon;
                    }
                  }}
                />
              </CardContent>
            </Card>

            <Controls
              isPaused={paused}
              onTogglePause={togglePause}
              onRestart={handleRestart}
              onMobileMove={(direction, isPressed) => {
                if (phaserGameRef.current) {
                  const scene = phaserGameRef.current.scene.keys['GameScene'] as GameScene;
                  if (scene && scene.mobileControls) {
                    scene.mobileControls[direction] = isPressed;
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {showQuiz && (
        <QuizPopup question={quizQuestions[currentQuizIndex]} onAnswer={handleQuizAnswer} />
      )}
      {showReward && <RewardPopup rewards={availableRewards} onSelect={handleRewardSelect} />}

      <InfoDialog
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        onReady={handleReady}
        isFirstVisit={isFirstVisit}
      />
    </div>
  );
};

export default TowerDefenseGame;
