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
}

function setup() {
  createCanvas(CONFIG.CANVAS.WIDTH, CONFIG.CANVAS.HEIGHT);
  sceneManager = new SceneManager(ASSETS);
}

function draw() {
  // background(255); // GameScene에서 배경을 그리도록 제거
  sceneManager.draw(); // 현재 씬에게 그리기를 위임
}

function keyPressed() {
  sceneManager.handleInput(keyCode); // 현재 씬에게 키 입력을 위임
}