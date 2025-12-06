const GameState = {
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER'
};

class GameScene {
  constructor(sceneManager, ASSETS) {
    this.sceneManager = sceneManager;
    this.ASSETS = ASSETS; // Store ASSETS object
    this.transitionEffect = null; // Initialize transition effect
    this.lastBackgroundState = null; // Track last background state
    this.startTime = 0; // Initialize startTime
    this.reset();
  }

  reset() {
    this.player = new Player(width / 2, height - (CONFIG.PLAYER.SIZE + 20), this.ASSETS);
    this.bullets = [];
    this.enemyBullets = [];
    this.items = [];
    this.score = 0;
    this.coinsCollected = 0;
    this.enemiesDefeated = 0;
    this.startTime = millis(); // Set start time when game resets

    this.spawnManager = new SpawnManager(this.ASSETS);
    this.boss = null;

    this.state = GameState.PLAYING;
    this.spawnManager.loadWaves(WAVES);

    // Reset transition effect on game reset
    this.transitionEffect = null;
    this.lastBackgroundState = null;
  }

  // ... (rest of the class) ...

  updateGameState() {
    if (this.boss && this.boss.isDefeated) {
      this.enemiesDefeated++;
      if (this.boss instanceof OmegaSystem) {
        this.boss = null;
        let elapsedTime = millis() - this.startTime;
        const gameStats = {
          score: this.score,
          coins: this.coinsCollected,
          enemiesDefeated: this.enemiesDefeated,
          playTime: this._formatTime(elapsedTime), // Add playTime to gameStats
        };
        this.sceneManager.goTo('gameClear', gameStats);
      } else {
        this.boss = null;
        this.spawnManager.resume();
      }
      return; 
    }

    if (this.spawnManager.isComplete() && !this.boss && this.enemies.length === 0) {

    }
  }

  // Helper function to format time (milliseconds to MM:SS)
  _formatTime(milliseconds) {
      let totalSeconds = floor(milliseconds / 1000);
      let minutes = floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;

      let formattedMinutes = str(minutes).padStart(2, '0');
      let formattedSeconds = str(seconds).padStart(2, '0');

      return `${formattedMinutes}:${formattedSeconds}`;
  }
}
