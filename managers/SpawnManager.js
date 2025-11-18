class SpawnManager {
  constructor() {
    this.waves = [];
    this.currentWaveIndex = 0;
    this.lastFrameCount = 0;
    this.active = false;
  }

  loadWaves(waveData) {
    this.waves = waveData;
    this.currentWaveIndex = 0;
    this.lastFrameCount = frameCount;
    this.active = true;
  }

  update(enemies) {
    if (!this.active || this.isComplete()) {
      return;
    }

    const currentWave = this.waves[this.currentWaveIndex];
    if (frameCount - this.lastFrameCount >= currentWave.triggerFrame) {
      for (const enemyData of currentWave.enemies) {
        const xPos = enemyData.x * width;
        const yPos = enemyData.y;
        enemies.push(new Enemy(xPos, yPos, enemyData.type));
      }
      this.currentWaveIndex++;
    }
  }

  isComplete() {
    return this.currentWaveIndex >= this.waves.length;
  }

  stop() {
    this.active = false;
  }
}
