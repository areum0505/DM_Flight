const GameState = {
  LEVEL_1: 'LEVEL_1',
  LEVEL_2: 'LEVEL_2',
  BOSS_1: 'BOSS_1',
  LEVEL_3: 'LEVEL_3',
  BOSS_2: 'BOSS_2',
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

    this.state = GameState.LEVEL_1;
    this.spawnManager.loadWaves(LEVEL1_WAVES);
  }

  draw() {
    this.player.draw();
    this.bullets.forEach(b => b.draw());
    this.enemyBullets.forEach(b => b.draw());
    this.enemies.forEach(e => e.draw());
    if (this.boss) this.boss.draw();
    
    this.drawHealthUI();
    this.update();
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
    
    this.spawnManager.update(this.enemies);
    if (this.boss) this.boss.update(this.player, this.enemyBullets);

    this.checkCollisions();

    if (this.player.health <= 0) {
      this.sceneManager.goTo('gameOver');
    }
  }

  updateGameState() {
    switch (this.state) {
      case GameState.LEVEL_1:
        if (this.spawnManager.isComplete()) {
          this.state = GameState.LEVEL_2;
          this.spawnManager.loadWaves(LEVEL2_WAVES);
        }
        break;
      case GameState.LEVEL_2:
        if (this.spawnManager.isComplete()) {
          this.state = GameState.BOSS_1;
          this.spawnManager.stop();
          this.boss = new Overload(width / 2, 150);
        }
        break;
      case GameState.BOSS_1:
        if (this.boss && this.boss.health <= 0) {
          this.boss = null;
          this.state = GameState.LEVEL_3;
          this.spawnManager.loadWaves(LEVEL3_WAVES);
        }
        break;
      case GameState.LEVEL_3:
        if (this.spawnManager.isComplete()) {
          this.state = GameState.BOSS_2;
          this.spawnManager.stop();
          // 임시로 같은 보스를 다시 생성합니다.
          // 나중에 새로운 보스 클래스로 교체할 수 있습니다.
          this.boss = new Overload(width / 2, 150); 
        }
        break;
      case GameState.BOSS_2:
        if (this.boss && this.boss.health <= 0) {
          this.boss = null;
          // 모든 레벨 클리어! 다음 단계(예: 무한 모드, 게임 클리어 씬)를 여기에 추가
          console.log("Game Clear!");
          // 일단은 더 이상 진행하지 않도록 spawnManager를 멈춥니다.
          this.spawnManager.stop();
        }
        break;
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
        if (this.boss.isHit(this.bullets[i])) {
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

  handleInput(keyCode) {}
}
