class GameScene {
  constructor(sceneManager, ASSETS) { // Added ASSETS
    this.sceneManager = sceneManager;
    this.ASSETS = ASSETS; // Store ASSETS if needed
  }
  onEnter() { console.log("GameScene 진입!"); }
  draw() {
    background(0, 50, 0); fill(255); textStyle(NORMAL); textSize(30); text('게임 플레이 중...', width/2, height/2);
    textSize(16); text('Press ESC to go back to Menu', width / 2, height / 2 + 40);
  }
  handleInput(keyCode) { if (keyCode === ESCAPE) { this.sceneManager.goTo('start'); } }
}
