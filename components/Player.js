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
  }

  move() {
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
    this.health--;
  }

  draw() {
    fill(0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}