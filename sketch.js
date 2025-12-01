let sceneManager;
let ASSETS = {}; // Global ASSETS object

function preload() {
  ASSETS.backgrounds = {
    start: loadImage('ui/images/background/background_early.jpeg'),
    mid: loadImage('ui/images/background/background_mid.jpeg'),
    end: loadImage('ui/images/background/background_late.jpeg')
  };

  ASSETS.items = {
    coin: loadImage('ui/images/item/item_coin.png'),
    health: loadImage('ui/images/item/item_health.png'), // This is for the item itself
    powerup: loadImage('ui/images/item/item_powerup.png')
  };

  ASSETS.playerImage = loadImage('ui/images/player/player.png');
  ASSETS.playerBulletImage = loadImage('ui/images/player/bullet.png');
  ASSETS.enemyBulletImage = loadImage('ui/images/enemy/bullet.png');
  ASSETS.heartImage = loadImage('ui/images/item/item_health.png'); // Load for UI display

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
  sceneManager = new SceneManager(ASSETS);
  textAlign(CENTER, CENTER); 
  textSize(16);             
  noSmooth();               
}

function draw() {
  sceneManager.draw();
}

function keyPressed() {
  sceneManager.handleInput(keyCode);
}

function mousePressed() {
  if (sceneManager.currentScene && sceneManager.currentScene.handleMousePressed) {
    sceneManager.currentScene.handleMousePressed();
  }
}

function mouseMoved() {
  if (sceneManager.currentScene && sceneManager.currentScene.handleMouseMoved) {
    sceneManager.currentScene.handleMouseMoved();
  } else {
    cursor(ARROW);
  }
}