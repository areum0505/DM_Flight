class SpawnManager {
  constructor(ASSETS) {
    this.ASSETS = ASSETS; // Store ASSETS
    this.waves = [];
    this.currentWaveIndex = 0;
    this.waveTimer = 0;
    this.active = false;
  }

  loadWaves(waveData) {
    this.waves = waveData;
    this.currentWaveIndex = 0;
    this.waveTimer = 0;
    this.active = true;
  }

  update(enemies, scene) {
    if (!this.active) {
      return;
    }

    this.waveTimer++;

    // Check if we have more waves to process
    if (this.currentWaveIndex < this.waves.length) {
      const currentWave = this.waves[this.currentWaveIndex];

      if (this.waveTimer >= currentWave.triggerFrame) {

        if (currentWave.type === 'BOSS') {
          this.active = false; // Pause spawning
          if (scene && scene.startBossBattle) {
            scene.startBossBattle(currentWave.bossType);
          }
          this.currentWaveIndex++;
          return;
        }

        if (currentWave.enemies) {
          for (const enemyData of currentWave.enemies) {
            const xPos = enemyData.x * width;
            const yPos = enemyData.y;
            enemies.push(new Enemy(xPos, yPos, enemyData.type, this.ASSETS)); // Pass ASSETS
          }
        }
        this.currentWaveIndex++;
      }
    } else {

    }
  }

  isComplete() {
    return this.currentWaveIndex >= this.waves.length;
  }

  stop() {
    this.active = false;
  }

  resume() {
    this.active = true;
  }
}
