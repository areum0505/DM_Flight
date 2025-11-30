class SceneManager {
  constructor() {
    this.scenes = {
      start: new StartScene(this),
      game: new GameScene(this),
      gameOver: new GameOverScene(this),
      gameClear: new GameClearScene(this),
    };
    this.currentScene = this.scenes.start; // 시작은 'start' 씬
  }

  // 씬 전환
  goTo(sceneName) {
    this.currentScene = this.scenes[sceneName];
  }

  draw() {
    this.currentScene.draw();
  }

  handleInput(keyCode) {
    this.currentScene.handleInput(keyCode);
  }
}