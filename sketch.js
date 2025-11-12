let sceneManager;

function setup() {
  createCanvas(CONFIG.CANVAS.WIDTH, CONFIG.CANVAS.HEIGHT);
  sceneManager = new SceneManager();
}

function draw() {
  background(255);
  sceneManager.draw(); // 현재 씬에게 그리기를 위임
}

function keyPressed() {
  sceneManager.handleInput(keyCode); // 현재 씬에게 키 입력을 위임
}