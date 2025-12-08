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
            enemies.push(new Enemy(xPos, yPos, enemyData.type, this.ASSETS, this.ASSETS.enemies[enemyData.type])); // Pass ASSETS
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
        // Wave music based on phase triggers
        if (frame < CONFIG.PHASES.EARLY_END) {
            musicToPlay = this.ASSETS.music.earlyWave;
        } else if (frame >= CONFIG.PHASES.EARLY_END && frame < CONFIG.PHASES.MID_1_END) {
            musicToPlay = this.ASSETS.music.midWave1;
        } else if (frame >= CONFIG.PHASES.MID_1_END && frame < CONFIG.PHASES.MID_END) {
            musicToPlay = this.ASSETS.music.midWave2;
        } else if (frame >= CONFIG.PHASES.MID_END) {
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
        
        // Fade in new music to avoid overlap with sound effects
        this.currentMusic.setVolume(0);
        this.currentMusic.loop();
        this.currentMusic.setVolume(1, 2); // Fade up to full volume over 2 seconds
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
