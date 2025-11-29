class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = CONFIG.PLAYER.SIZE;

    // CONFIG의 값을 플레이어의 초기 능력치로 복사
    this.speed = CONFIG.PLAYER.SPEED;
    this.health = CONFIG.PLAYER.HEALTH;
    this.shootInterval = CONFIG.PLAYER.SHOOT_INTERVAL;
    this.bulletSpeed = CONFIG.BULLET.SPEED;
    this.weaponLevel = 1;

    // Invincibility
    this.isInvincible = false;
    this.invincibilityDuration = 90; // 1.5 seconds at 60fps
    this.invincibilityEndTime = 0;
  }

  move() {
    // Handle invincibility timeout
    if (this.isInvincible && frameCount > this.invincibilityEndTime) {
      this.isInvincible = false;
    }

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    this.x = constrain(this.x, this.size / 2, width - this.size / 2); // 주어진 값이 특정 범위 내에 있도록 제한하는 함수
  }

  shoot(bullets) {
    bullets.push(new Bullet(this.x, this.y, 'default', null, null, -this.bulletSpeed));
  }

  takeDamage() {
    if (this.isInvincible) {
      return;
    }

    this.health--;
    this.isInvincible = true;
    this.invincibilityEndTime = frameCount + this.invincibilityDuration;
  }

  draw() {
    // Blinking effect when invincible
    if (this.isInvincible && frameCount % 10 < 5) {
      return; // Skip drawing every few frames to create a blink effect
    }

    fill(0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
