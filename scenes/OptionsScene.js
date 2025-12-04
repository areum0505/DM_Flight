class OptionsScene {
  constructor(sceneManager, ASSETS) { // Added ASSETS
    this.sceneManager = sceneManager;
    this.ASSETS = ASSETS; // Store ASSETS if needed
  }
  onEnter() { console.log("OptionsScene 진입!"); }
  draw() {
    background(50, 0, 0); fill(255); textStyle(NORMAL); textSize(30); text('설정 화면', width/2, height/2);
    textSize(16); text('Press ESC to go back to Menu', width / 2, height / 2 + 40);
  }
  handleInput(keyCode) { if (keyCode === ESCAPE) { this.sceneManager.goTo('start'); } }
  handleMouseMoved() {
    cursor(ARROW); // Default behavior
  }
}
