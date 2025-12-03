class SpawnManager {
  constructor(ASSETS) {
    this.ASSETS = ASSETS; // Store ASSETS
    this.waves = [];
    this.currentWaveIndex = 0;
    this.waveTimer = 0;
    this.active = false;
    this.currentMusic = null; // Track the currently playing music
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
        this.manageMusic(currentWave); // Manage music for the new wave/boss

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

  manageMusic(wave) {
    const frame = wave.triggerFrame;
    let musicToPlay = null;

    if (wave.type === 'BOSS') {
        switch (wave.bossType) {
            case 'OVERLOAD':
                musicToPlay = this.ASSETS.music.midBoss1;
                break;
            case 'CARRIER_SHIELD':
                musicToPlay = this.ASSETS.music.midBoss2;
                break;
            case 'CANYON_ROCKER':
                musicToPlay = this.ASSETS.music.finalBoss1;
                break;
            case 'OMEGA_SYSTEM':
                musicToPlay = this.ASSETS.music.finalBoss2;
                break;
        }
    } else {
        // Wave music based on frame triggers
        // The trigger frames are from the config: 900, 1800, 2700, 3600
        if (frame < 900) {
            musicToPlay = this.ASSETS.music.earlyWave;
        } else if (frame >= 900 && frame < 1800) {
            musicToPlay = this.ASSETS.music.midWave1;
        } else if (frame >= 1800 && frame < 2700) {
            musicToPlay = this.ASSETS.music.midWave2;
        } else if (frame >= 2700 && frame < 3600) {
            musicToPlay = this.ASSETS.music.finalWave;
        }
    }
    this.playMusic(musicToPlay);
  }

  playMusic(musicTrack) {
    if (musicTrack && this.currentMusic !== musicTrack) {
        if (this.currentMusic && this.currentMusic.isPlaying()) {
            this.currentMusic.stop();
        }
        this.currentMusic = musicTrack;
        this.currentMusic.loop();
    }
  }

  stopAllMusic() {
    if (this.currentMusic && this.currentMusic.isPlaying()) {
      this.currentMusic.stop();
    }
    this.currentMusic = null;
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
