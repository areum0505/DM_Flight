const GameState = {
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER'
};

class GameScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.player = new Player(width / 2, height - (CONFIG.PLAYER.SIZE + 20));
    this.bullets = [];
    this.enemyBullets = [];
    this.enemies = [];

    this.spawnManager = new SpawnManager();
    this.boss = null;

    this.state = GameState.PLAYING;
    this.spawnManager.loadWaves(WAVES);
  }

  draw() {
    this.player.draw();
    this.bullets.forEach(b => b.draw());
    this.enemyBullets.forEach(b => b.draw());
    this.enemies.forEach(e => e.draw());
    if (this.boss) this.boss.draw();

    this.drawHealthUI();
    this.update();

    // Draw Frame Count (Last to ensure visibility)
    push();
    fill(0);
    textSize(12);
    textAlign(LEFT, TOP);
    text(`Frame: ${frameCount}`, 10, 50);
    pop();
  }

  drawHealthUI() {
    noStroke();
    fill(255, 105, 180);
    for (let i = 0; i < this.player.health; i++) {
      rect(20 + (i * 30), 20, 25, 25);
    }
  }

  update() {
    this.player.move();
    this.handleBullets();
    this.handleEnemies();
    this.handleShooting();
    this.updateGameState();

    this.spawnManager.update(this.enemies, this);
    if (this.boss) this.boss.update(this.player, this.enemyBullets);

    this.checkCollisions();

    if (this.player.health <= 0) {
      this.sceneManager.goTo('gameOver');
    }
  }

  startBossBattle(bossType) {
    if (bossType === 'OVERLOAD') {
      this.boss = new Overload(width / 2, 150);
    } else if (bossType === 'CARRIER_SHIELD') {
      this.boss = new CarrierShield(width / 2, 150);
    } else if (bossType === 'CANYON_ROCKER') {
      this.boss = new CanyonRocker(width / 2, 100);
      this.player.x = width / 2;
    }
  }

  updateGameState() {
    // Check boss death
    if (this.boss && this.boss.health <= 0) {
      this.boss = null;
      this.spawnManager.resume();
    }

    if (this.spawnManager.isComplete() && !this.boss && this.enemies.length === 0) {
      // Game Clear logic could go here
      console.log("Game Clear!");
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
      this.enemies[i].update(this.enemyBullets);
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
        if (this.isColliding(this.bullets[i], this.enemies[j])) {
          this.enemies[j].takeDamage();
          if (this.enemies[j].health <= 0) this.enemies.splice(j, 1);
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
      if (this.isCollidingCircles(this.player, this.enemyBullets[i])) {
        this.player.takeDamage();
        this.enemyBullets.splice(i, 1);
      }
    }

    // Player vs Enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      if (this.isColliding(this.player, this.enemies[i])) {
        this.player.takeDamage();
        this.enemies.splice(i, 1);
      }
    }

    // Player vs Boss
    if (this.boss && this.isColliding(this.player, this.boss)) {
      this.player.takeDamage();
    }
  }

  isColliding(circle, rect) {
    const circleDistance = { x: abs(circle.x - rect.x), y: abs(circle.y - rect.y) };
    if (circleDistance.x > (rect.size / 2 + circle.size / 2)) return false;
    if (circleDistance.y > (rect.size / 2 + circle.size / 2)) return false;
    if (circleDistance.x <= (rect.size / 2)) return true;
    if (circleDistance.y <= (rect.size / 2)) return true;
    const cornerDistance_sq = pow(circleDistance.x - rect.size / 2, 2) + pow(circleDistance.y - rect.size / 2, 2);
    return (cornerDistance_sq <= pow(circle.size / 2, 2));
  }

  isCollidingCircles(circle1, circle2) {
    return dist(circle1.x, circle1.y, circle2.x, circle2.y) < (circle1.size / 2 + circle2.size / 2);
  }

  handleInput(keyCode) { }
}
