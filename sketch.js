let sceneManager;
let backgroundImages = {};

function preload() {
  backgroundImages.start = loadImage('ui/images/background/background_early.jpeg');
  backgroundImages.mid = loadImage('ui/images/background/background_mid.jpeg');
  backgroundImages.end = loadImage('ui/images/background/background_late.jpeg');
}

function setup() {
  createCanvas(CONFIG.CANVAS.WIDTH, CONFIG.CANVAS.HEIGHT);
  sceneManager = new SceneManager(backgroundImages);
}

function draw() {
  // background(255); // GameScene에서 배경을 그리도록 제거
  sceneManager.draw(); // 현재 씬에게 그리기를 위임
}

function keyPressed() {
  sceneManager.handleInput(keyCode); // 현재 씬에게 키 입력을 위임
}