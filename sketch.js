let sceneManager;
let backgroundImages = {};
let itemImages = {};
let playerImage;
let playerBulletImage;

let enemyBulletImage;

function preload() {
  backgroundImages.start = loadImage('ui/images/background/background_early.jpeg');
  backgroundImages.mid = loadImage('ui/images/background/background_mid.jpeg');
  backgroundImages.end = loadImage('ui/images/background/background_late.jpeg');

  itemImages.coin = loadImage('ui/images/item/item_coin.png');
  itemImages.health = loadImage('ui/images/item/item_health.png');
  itemImages.powerup = loadImage('ui/images/item/item_powerup.png');

  playerImage = loadImage('ui/images/player/player.png');
  playerBulletImage = loadImage('ui/images/player/bullet.png');
  enemyBulletImage = loadImage('ui/images/enemy/bullet.png');
}

function setup() {
  createCanvas(CONFIG.CANVAS.WIDTH, CONFIG.CANVAS.HEIGHT);
  sceneManager = new SceneManager(backgroundImages, itemImages, playerImage, playerBulletImage, enemyBulletImage);
}

function draw() {
  // background(255); // GameScene에서 배경을 그리도록 제거
  sceneManager.draw(); // 현재 씬에게 그리기를 위임
}

function keyPressed() {
  sceneManager.handleInput(keyCode); // 현재 씬에게 키 입력을 위임
}