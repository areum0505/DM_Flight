class GameScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.player = new Player(width / 2, height - (CONFIG.PLAYER.SIZE + 20));
    this.bullets = [];
    this.enemyBullets = [];
    this.enemies = [];
    
    // SpawnManager 인스턴스 생성
    this.spawnManager = new SpawnManager();
  }

  draw() {
    // 모든 게임 요소 그리기
    this.player.draw();
    this.bullets.forEach(b => b.draw());
    this.enemyBullets.forEach(b => b.draw());
    this.enemies.forEach(e => e.draw());
    
    this.drawHealthUI(); // 체력 UI 그리기

    // 게임 로직 업데이트
    this.update();
  }

  drawHealthUI() {
    noStroke();
    fill(255, 105, 180); // 분홍색
    for (let i = 0; i < this.player.health; i++) {
      rect(20 + (i * 30), 20, 25, 25);
    }
  }
  
  update() {
    this.player.move();

    // 플레이어 총알 이동 및 화면 밖 총알 제거
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].move();
      if (this.bullets[i].y < 0) {
        this.bullets.splice(i, 1);
      }
    }

    // 적 총알 이동 및 화면 밖 총알 제거
    for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
      this.enemyBullets[i].move();
      if (this.enemyBullets[i].y > height) {
        this.enemyBullets.splice(i, 1);
      }
    }

    // 적 이동 및 화면 밖 적 제거
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      this.enemies[i].update(this.enemyBullets);
      if (this.enemies[i].y > height + this.enemies[i].size) {
        this.enemies.splice(i, 1);
      }
    }

    // 기본 공격 (자동 발사)
    if (frameCount % this.player.shootInterval === 0) {
      this.player.shoot(this.bullets);
    }

    // SpawnManager를 통해 새로운 적 생성
    this.spawnManager.update(this.enemies);

    // 충돌 판정
    this.checkCollisions();

    // 게임 오버 확인
    if (this.player.health <= 0) {
      this.sceneManager.goTo('gameOver');
    }
  }

  checkCollisions() {
    // 플레이어 총알과 적의 충돌
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const bullet = this.bullets[i];
        const enemy = this.enemies[j];

        if (this.isColliding(bullet, enemy)) {
          this.bullets.splice(i, 1);
          enemy.takeDamage();

          if (enemy.health <= 0) {
            this.enemies.splice(j, 1);
          }
          break; 
        }
      }
    }

    // 적 총알과 플레이어의 충돌
    for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
      const bullet = this.enemyBullets[i];
      if (this.isCollidingCircles(this.player, bullet)) {
        this.enemyBullets.splice(i, 1);
        this.player.takeDamage();
      }
    }

    // 플레이어와 적의 충돌
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      if (this.isColliding(this.player, enemy)) {
        this.enemies.splice(i, 1); // 적 제거
        this.player.takeDamage();   // 플레이어 체력 감소
      }
    }
  }

  // 원과 사각형의 충돌 판정 헬퍼 함수
  isColliding(circle, rect) {
    const circleDistance = {
      x: abs(circle.x - rect.x),
      y: abs(circle.y - rect.y)
    };

    if (circleDistance.x > (rect.size / 2 + circle.size / 2)) { return false; }
    if (circleDistance.y > (rect.size / 2 + circle.size / 2)) { return false; }

    if (circleDistance.x <= (rect.size / 2)) { return true; }
    if (circleDistance.y <= (rect.size / 2)) { return true; }

    const cornerDistance_sq = pow(circleDistance.x - rect.size / 2, 2) +
                               pow(circleDistance.y - rect.size / 2, 2);

    return (cornerDistance_sq <= pow(circle.size / 2, 2));
  }

  // 원과 원의 충돌 판정 헬퍼 함수
  isCollidingCircles(circle1, circle2) {
    const distance = dist(circle1.x, circle1.y, circle2.x, circle2.y);
    return distance < (circle1.size / 2 + circle2.size / 2);
  }

  handleInput(keyCode) {
    // 키 입력 (일시정지 등)
  }
}