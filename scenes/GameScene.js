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
    this.reset();
  }

  reset() {
    this.player = new Player(width / 2, height - (CONFIG.PLAYER.SIZE + 20), this.ASSETS);
    this.bullets = [];
    this.enemyBullets = [];
    this.enemies = [];
    this.items = [];
    this.score = 0;

    this.spawnManager = new SpawnManager(this.ASSETS);
    this.boss = null;

    this.state = GameState.PLAYING;
    this.spawnManager.loadWaves(WAVES);

    // Reset transition effect on game reset
    this.transitionEffect = null;
    this.lastBackgroundState = null;
  }

  draw() {
    background(0); // Explicitly clear the canvas each frame
    imageMode(CORNER); // Ensure background images are drawn from the top-left corner
    this.drawBackground();

    this.items.forEach(i => i.draw());
    this.player.draw();
    this.bullets.forEach(b => b.draw());
    this.enemyBullets.forEach(b => b.draw());
    this.enemies.forEach(e => e.draw());
    if (this.boss) this.boss.draw();

    this.drawHealthUI();
    this.drawScore();
    this.update();

    // Draw transition effect if active
    if (this.transitionEffect) {
      this.transitionEffect.update();
      this.transitionEffect.draw();
      if (this.transitionEffect.isFinished()) {
        this.transitionEffect = null; // Clear effect when finished
      }
    }

    // Draw Frame Count (Last to ensure visibility)
    // push();
    // fill(0);
    // textSize(12);
    // textAlign(LEFT, TOP);
    // text(`Frame: ${this.spawnManager.waveTimer}`, 10, 50);
    // pop();
  }

  update() {
    this.player.move();
    this.handleBullets();
    this.handleEnemies();
    this.handleShooting();
    this.updateItems();
    this.updateGameState();

    this.spawnManager.update(this.enemies, this);
    if (this.boss) this.boss.update(this.player, this.enemyBullets, this.ASSETS.enemyBulletImage);

    this.checkCollisions();
    this.checkItemCollisions();

    if (this.player.health <= 0) {
      this.sceneManager.goTo('gameOver');
    }
  }

  drawBackground() {
    const timer = this.spawnManager.waveTimer;
    let currentBackground;
    let currentBackgroundState;

    if (timer < 900) {
      currentBackground = this.ASSETS.backgrounds.start;
      currentBackgroundState = 'start';
    } else if (timer >= 900 && timer < 2700) {
      currentBackground = this.ASSETS.backgrounds.mid;
      currentBackgroundState = 'mid';
    } else {
      currentBackground = this.ASSETS.backgrounds.end;
      currentBackgroundState = 'end';
    }

    image(currentBackground, 0, 0, width, height);

    // Trigger transition when background state changes
    if (this.lastBackgroundState !== null && this.lastBackgroundState !== currentBackgroundState) {
      if (!this.transitionEffect) { // Only create if not already active
        this.transitionEffect = new TransitionEffect(this.ASSETS.backgrounds.transition);
      }
    }
    this.lastBackgroundState = currentBackgroundState;
  }

  drawHealthUI() {
    for (let i = 0; i < this.player.health; i++) {
      push();
      imageMode(CENTER); // Use CENTER mode for consistent image positioning
      image(this.ASSETS.heartImage, 35 + (i * 30), 32, 25, 25); // Position and size the hearts
      pop();
    }
  }

  drawScore() {
    fill(0);
    textSize(20);
    textAlign(RIGHT, TOP);
    text(`Score: ${this.score}`, width - 20, 20);
  }

  updateItems() {
    for (let i = this.items.length - 1; i >= 0; i--) {
      this.items[i].move();
      if (this.items[i].isOffScreen()) {
        this.items.splice(i, 1);
      }
    }
  }

  spawnItems(deadEnemy) {
    const { x, y, type } = deadEnemy;

    // Health pack spawn (3% chance)
    if (random() < 0.03) {
      this.items.push(new HealthItem(x, y, this.ASSETS.items.health));
      return; // Only spawn one item type at a time
    }

    // Power-up spawn (3% chance)
    if (random() < 0.03) {
      this.items.push(new PowerUpItem(x, y, this.ASSETS.items.powerup));
      return; // Only spawn one item type at a time
    }

    // Coin spawn
    const timer = this.spawnManager.waveTimer;
    let coinChance;
    if (timer < 900) coinChance = 0.7;
    else if (timer < 2700) coinChance = 0.5;
    else coinChance = 0.4;

    if (random() < coinChance) {
      let coinCount = 0;
      if (type.includes('Normal')) coinCount = 1;
      else if (type.includes('Named')) coinCount = 3;

      for (let i = 0; i < coinCount; i++) {
        // Spawn coins with a slight random offset
        const offsetX = x + random(-15, 15);
        const offsetY = y + random(-15, 15);
        this.items.push(new Coin(offsetX, offsetY, this.ASSETS.items.coin));
      }
    }
  }

  startBossBattle(bossType) {
    if (bossType === 'OVERLOAD') {
      this.boss = new Overload(width / 2, 150, this.ASSETS);
    } else if (bossType === 'CARRIER_SHIELD') {
      this.boss = new CarrierShield(width / 2, 150, this.ASSETS);
    } else if (bossType === 'CANYON_ROCKER') {
      this.boss = new CanyonRocker(width / 2, 100, this.ASSETS);
    } else if (bossType === 'OMEGA_SYSTEM') {
      this.boss = new OmegaSystem(this, width / 2, 100, this.ASSETS);
    }
  }

  updateGameState() {
    if (this.boss && this.boss.isDefeated) {      
      if (this.boss instanceof OmegaSystem) {
        this.boss = null;
        this.sceneManager.goTo('gameClear');
      } else {
        this.boss = null;
        this.spawnManager.resume();
      }
      return; 
    }

    if (this.spawnManager.isComplete() && !this.boss && this.enemies.length === 0) {

    }
  }

  handleBullets() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].move();
      if (this.bullets[i].y < 0) this.bullets.splice(i, 1);
    }
    for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
      this.enemyBullets[i].move();
      if (this.enemyBullets[i].y > height) this.enemyBullets.splice(i, 1);
    }
  }

  handleEnemies() {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      this.enemies[i].update(this.enemyBullets, this.ASSETS.enemyBulletImage);
      if (this.enemies[i].y > height + this.enemies[i].size) {
        this.enemies.splice(i, 1);
      }
    }
  }

  handleShooting() {
    if (frameCount % this.player.shootInterval === 0) {
      this.player.shoot(this.bullets);
    }
  }

  checkCollisions() {
    // Player bullets vs Enemies
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        if (this.isCollidingCircles(this.bullets[i], this.enemies[j])) {
          this.enemies[j].takeDamage();
          if (this.enemies[j].health <= 0) {
            this.spawnItems(this.enemies[j]); // Spawn items
            this.enemies.splice(j, 1);
          }
          this.bullets.splice(i, 1);
          break;
        }
      }
    }

    // Player bullets vs Boss
    if (this.boss) {
      for (let i = this.bullets.length - 1; i >= 0; i--) {
        if (this.boss.isHit(this.bullets[i], this.enemyBullets, this.player)) {
          this.bullets.splice(i, 1);
          break;
        }
      }
    }

    // Enemy bullets vs Player
    for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
      if (this.isCollidingRectCircle(this.player, this.enemyBullets[i])) {
        this.player.takeDamage();
        this.enemyBullets.splice(i, 1);
      }
    }

    // Player vs Enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      if (this.isCollidingRectCircle(this.player, this.enemies[i])) {
        this.player.takeDamage();
        this.enemies.splice(i, 1);
      }
    }

    // Player vs Boss
    if (this.boss && this.isCollidingRectCircle(this.player, this.boss)) {
      this.player.takeDamage();
    }
  }
  
  checkItemCollisions() {
      for (let i = this.items.length - 1; i >= 0; i--) {
          const item = this.items[i];
          if (this.isCollidingRectCircle(this.player, item)) {
              // Apply item effect
              switch(item.type) {
                  case 'coin':
                      this.score += item.value;
                      break;
                  case 'health':
                      if (this.player.health < CONFIG.PLAYER.HEALTH) {
                          this.player.health += item.healthValue;
                      }
                      break;
                  case 'powerup':
                      this.player.increasePower();
                      break;
              }
              // Remove item
              this.items.splice(i, 1);
          }
      }
  }

  isCollidingCircles(circle1, circle2) {
    return dist(circle1.x, circle1.y, circle2.x, circle2.y) < (circle1.size / 2 + circle2.size / 2);
  }

  isCollidingRectCircle(rect, circle) {
    // Find the closest point on the rect to the center of the circle
    const closestX = constrain(circle.x, rect.x - rect.width / 2, rect.x + rect.width / 2);
    const closestY = constrain(circle.y, rect.y - rect.height / 2, rect.y + rect.height / 2);

    // Calculate the distance between the closest point and the circle's center
    const distance = dist(circle.x, circle.y, closestX, closestY);

    // If the distance is less than the circle's radius, they are colliding
    return distance < circle.size / 2;
  }

  handleInput(keyCode) { }

  handleMousePressed() {
    // GameScene likely doesn't have custom mouse pressed logic, or it's handled by internal components.
    // For now, an empty method to prevent errors.
  }

  handleMouseMoved() {
    // GameScene likely doesn't have custom mouse movement, so default to arrow
    cursor(ARROW);
  }
}