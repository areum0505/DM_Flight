let sceneManager;
let ASSETS = {}; // Global ASSETS object
let audioStarted = false;

function preload() {
  ASSETS.backgrounds = {
    start: loadImage('assets/images/background/background_early.jpeg'),
    mid: loadImage('assets/images/background/background_mid.jpeg'),
    end: loadImage('assets/images/background/background_late.jpeg'),
    main: loadImage('assets/images/background/main.png'),
    transition: loadImage('assets/images/background/change.png'), // Added this line
    gameTitle: loadImage('assets/images/background/game_title.png')
  };

  ASSETS.items = {
    coin: loadImage('assets/images/item/item_coin.png'),
    health: loadImage('assets/images/item/item_health.png'),
    powerup: loadImage('assets/images/item/item_powerup.png')
  };

  ASSETS.logo = loadImage('assets/images/logo.png');

  ASSETS.enemies = {};
  for (const enemyType in ENEMY_STATS) {
    ASSETS.enemies[enemyType] = loadImage(`assets/images/enemy/${enemyType}.png`);
  }

  ASSETS.playerImage = loadImage('assets/images/player/player.png');
  ASSETS.playerBulletImage = loadImage('assets/images/player/bullet.png');
  ASSETS.enemyBulletImage = loadImage('assets/images/enemy/bullet.png');
  ASSETS.bossBulletImage = loadImage('assets/images/boss/bullet.png'); 
  ASSETS.homingBulletImage = loadImage('assets/images/boss/homing.png'); 
  ASSETS.heartImage = loadImage('assets/images/item/item_health.png'); 

  // Overload Boss Images
  ASSETS.overloadBossImage = loadImage('assets/images/boss/Overload.png');
  ASSETS.overloadTurretImage = loadImage('assets/images/boss/Overload_turret.png');
  ASSETS.overloadTurretDestroyedImage = loadImage('assets/images/boss/Overload_turret_destroyed.png');

  // CarrierShield Boss Images
  ASSETS.carrierShieldImage = loadImage('assets/images/boss/CarrierShield.png');
  ASSETS.carrierShieldTurretImage = loadImage('assets/images/boss/CarrierShield_turret.png');
  ASSETS.carrierShieldTurretDestroyedImage = loadImage('assets/images/boss/CarrierShield_turret_destroyed.png');
  ASSETS.carrierShieldTurretEnabledImage = loadImage('assets/images/boss/CarrierShield_turret_enabled.png');

  // CanyonRocker Boss Images
  ASSETS.canyonRockerImage = loadImage('assets/images/boss/CanyonRocker.png');
  ASSETS.canyonRockerWallImage = loadImage('assets/images/boss/CanyonRocker_wall.png');
  ASSETS.canyonRockerRockImage = loadImage('assets/images/boss/CanyonRocker_rock.png');

  // OmegaSystem Boss Images
  ASSETS.omegaSystemBossImage = loadImage('assets/images/boss/OmegaSystem.png');
  ASSETS.omegaSystemLaserImage = loadImage('assets/images/boss/OmegaSystem_laser.png');
  ASSETS.omegaSystemSmallPlaneImage = loadImage('assets/images/boss/OmegaSystem_smallPlane.png');

  ASSETS.backgroundMusic = loadSound('assets/sounds/StartGame.mp3');

  ASSETS.sounds = {
    stageClear: loadSound('assets/sounds/StageClear.mp3'),
    gameOver: loadSound('assets/sounds/Gameover.wav'),
    gameClear: loadSound('assets/sounds/EndingCredit.mp3'),
    getItem: loadSound('assets/sounds/GetItem.mp3'),
    shoot: loadSound('assets/sounds/ShootSound.mp3'),
    enemyExplosion: loadSound('assets/sounds/EnemyExplosion.wav'),
  };

  ASSETS.music = {
    earlyWave: loadSound('assets/sounds/EarlyWave.mp3'),
    midBoss1: loadSound('assets/sounds/MidBoss1.mp3'),
    midWave1: loadSound('assets/sounds/MidWave1.mp3'),
    midBoss2: loadSound('assets/sounds/MidBoss2.mp3'),
    midWave2: loadSound('assets/sounds/MidWave2.mp3'),
    finalBoss1: loadSound('assets/sounds/FinalBoss1.mp3'),
    finalWave: loadSound('assets/sounds/FinalWave.mp3'),
    finalBoss2: loadSound('assets/sounds/FinalBoss2.mp3'),
  };

  // Move color definitions into ASSETS.colors
  ASSETS.colors = {
    BG_DARK: '#1f283c',
    NEON_BLUE: '#00f2ff',
    BLUE: '#4FA4F3',
    SSU_BLUE: '#4FA4F3',
    PREVIEW_BG: '#2c3e50',
    PREVIEW_BORDER: '#557a95',
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    TEXT_GRAY: '#bdc3c7',

    BULLET: '#f1c40f',
    ENEMY: '#e74c3c',

    RED_BTN_BASE: '#e74c3c',
    RED_BTN_TEXT: '#FFFFFF',
    BLUE_BTN_BASE: '#3498db',
    BLUE_BTN_TEXT: '#FFFFFF',
    BUTTON_BORDER: '#2c3e50'
  };
}

function setup() {
  createCanvas(CONFIG.CANVAS.WIDTH, CONFIG.CANVAS.HEIGHT);
  pixelDensity(1);

  // Add try-catch block for sceneManager initialization
  try {
    sceneManager = new SceneManager(ASSETS);

  } catch (error) {

    // Optionally display an error message on screen
    // textSize(20);
    // fill(255, 0, 0);
    // text("Error: SceneManager failed to initialize. Check console.", width / 2, height / 2);
    // noLoop(); // Stop draw loop if critical error
  }

  textAlign(CENTER, CENTER);
  textSize(16);
  noSmooth();
}

function draw() {
  // Check if sceneManager is valid before using it
  if (sceneManager) {
    sceneManager.draw();
  } else {
    // Fallback if sceneManager is not initialized
    background(0); // Black background
    fill(255, 0, 0); // Red text
    textSize(20);
    text("Error: Game not initialized. Check console.", width / 2, height / 2);
  }
}

function keyPressed() {
  // Check if sceneManager is valid
  if (sceneManager && sceneManager.handleInput) {
    sceneManager.handleInput(keyCode);
  } else {

  }
}

function mousePressed() {
  if (!audioStarted) {
    userStartAudio();
    audioStarted = true;
  }

  if (!sceneManager) {

    return;
  }
  if (!sceneManager.currentScene) {

    return;
  }
  if (typeof sceneManager.currentScene.handleMousePressed !== 'function') {

    return;
  }
  sceneManager.currentScene.handleMousePressed();
}

function mouseMoved() {
  if (!sceneManager) {

    cursor(ARROW);
    return;
  }
  if (!sceneManager.currentScene) {

    cursor(ARROW);
    return;
  }
  if (typeof sceneManager.currentScene.handleMouseMoved !== 'function') {

    cursor(ARROW);
    return;
  }
  sceneManager.currentScene.handleMouseMoved();
}
