class Enemy {
  constructor(x, y, type, ASSETS) {
    const stats = ENEMY_STATS[type];
    this.x = x;
    this.y = y;
    this.type = type;
    this.ASSETS = ASSETS; // Store ASSETS object
    this.size = stats.size;
    this.health = stats.health;
    this.speed = stats.speed;
    this.color = stats.color;
    this.shootInterval = stats.shootInterval;
    this.bulletSpeed = stats.bulletSpeed;
    this.points = stats.points;
    this.ultimateGauge = stats.ultimateGauge;
    this.hitEffectTimer = 0;
  }

  update(enemyBullets) { // Removed enemyBulletImage from parameter
    this.move();
    if (this.shootInterval && frameCount % this.shootInterval === 0) {
      this.shoot(enemyBullets);
    }
    if (this.hitEffectTimer > 0) {
      this.hitEffectTimer--;
    }
  }

  // 아래 방향으로 이동
  move() {
    this.y += this.speed;
  }

  shoot(enemyBullets) { // Removed enemyBulletImage from parameter
    if (this.bulletSpeed) {
      enemyBullets.push(new Bullet(this.x, this.y, 'enemy', this.ASSETS.enemyBulletImage, null, null, this.bulletSpeed));
    }
  }

  triggerHitEffect() {
    this.hitEffectTimer = CONFIG.HIT_EFFECT_DURATION;
  }

  // 총알에 맞았을 때 호출될 함수
  takeDamage() {
    this.triggerHitEffect();
    this.health--;
  }

  // 적 그리기
  draw() {
    fill(this.color);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);

    if (this.hitEffectTimer > 0) {
      fill(255, 0, 0, 100); // Semi-transparent red
      rect(this.x, this.y, this.size, this.size);
    }
  }
}