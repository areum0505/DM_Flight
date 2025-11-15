class Enemy {
  constructor(x, y, type) {
    const stats = ENEMY_STATS[type];
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = stats.size;
    this.health = stats.health;
    this.speed = stats.speed;
    this.color = stats.color;
    this.shootInterval = stats.shootInterval;
    this.bulletSpeed = stats.bulletSpeed;
    this.points = stats.points;
    this.ultimateGauge = stats.ultimateGauge;
  }

  update(enemyBullets) {
    this.move();
    if (this.shootInterval && frameCount % this.shootInterval === 0) {
      this.shoot(enemyBullets);
    }
  }

  // 아래 방향으로 이동
  move() {
    this.y += this.speed;
  }

  shoot(enemyBullets) {
    if (this.bulletSpeed) {
      enemyBullets.push(new Bullet(this.x, this.y, this.bulletSpeed));
    }
  }

  // 총알에 맞았을 때 호출될 함수
  takeDamage() {
    this.health--;
  }

  // 적 그리기
  draw() {
    fill(this.color);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
  }
}