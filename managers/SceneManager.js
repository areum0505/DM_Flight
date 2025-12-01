class SceneManager {
  constructor(ASSETS) {
    this.ASSETS = ASSETS; // Store ASSETS globally for the manager and scenes
    try {
      this.scenes = {
        start: new StartScene(this, ASSETS),
        game: new GameScene(this, ASSETS),
        tutorial: new TutorialScene(this, ASSETS),
        options: new OptionsScene(this, ASSETS),
        gameOver: new GameOverScene(this, ASSETS),
        gameClear: new GameClearScene(this, ASSETS),
      };
    } catch (error) {
      console.error("Error instantiating a scene in SceneManager constructor:", error);
    }
    this.currentScene = this.scenes.start; // 시작은 'start' 씬
  }

  // 씬 전환
  goTo(sceneName) {
    if (sceneName === 'game') {
      // Re-instantiate the GameScene to ensure a fresh start
      this.scenes.game = new GameScene(this, this.ASSETS);
    }
    this.currentScene = this.scenes[sceneName];
  }

  draw() {
    this.currentScene.draw();
  }

  handleInput(keyCode) {
    this.currentScene.handleInput(keyCode);
  }
}