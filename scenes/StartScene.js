class StartScene {
  constructor(sceneManager, ASSETS) {
    this.sceneManager = sceneManager;
    this.ASSETS = ASSETS; // Store ASSETS for consistency
  }

  draw() {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(50);
    text('DM FLIGHT', width / 2, height / 2 - 50);
    textSize(20);
    text('Press SPACE to Start', width / 2, height / 2 + 20);
  }

  handleInput(keyCode) {
    if (keyCode === 32) { // SPACE
      this.sceneManager.goTo('game'); // 'game' 씬으로 전환 요청
    }
  }
}