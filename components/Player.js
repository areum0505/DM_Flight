class Player {
  constructor(x, y, ASSETS) {
    this.x = x;
    this.y = y;
    this.ASSETS = ASSETS; // Store ASSETS object
    this.width = 40;
    this.height = 60;

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
    this.x = constrain(this.x, this.width / 2, width - this.width / 2); // 주어진 값이 특정 범위 내에 있도록 제한하는 함수
  }

  shoot(bullets) {
    if (this.weaponLevel <= 5) {
      // Logic for levels 1-5: Parallel spread
      const spreadWidth = (this.weaponLevel - 1) * 10;
      const startX = this.x - spreadWidth / 2;

      for (let i = 0; i < this.weaponLevel; i++) {
        const bulletX = this.weaponLevel === 1 ? this.x : startX + i * 10;
        bullets.push(new Bullet(bulletX, this.y - this.height / 2, 'player', this.ASSETS.playerBulletImage, null, null, -this.bulletSpeed));
      }
    } else {
      // Logic for levels 6+: Mixed parallel and diagonal spread
      
      // Fire the first 5 parallel bullets
      const baseWeaponLevel = 5;
      const spreadWidth = (baseWeaponLevel - 1) * 10;
      const startX = this.x - spreadWidth / 2;
      for (let i = 0; i < baseWeaponLevel; i++) {
        const bulletX = baseWeaponLevel === 1 ? this.x : startX + i * 10;
        bullets.push(new Bullet(bulletX, this.y - this.height / 2, 'player', this.ASSETS.playerBulletImage, null, null, -this.bulletSpeed));
      }

      // Fire the additional diagonal bullets
      const diagonalBulletsCount = this.weaponLevel - baseWeaponLevel;
      if (diagonalBulletsCount > 0) {
        const totalDiagonalSpreadAngle = PI / 2; // Increased to 90 degrees total spread
        const initialAngle = -PI / 2 - totalDiagonalSpreadAngle / 2; // Starting from top-left of spread
        
        for (let i = 0; i < diagonalBulletsCount; i++) {
          let angle;
          if (diagonalBulletsCount === 1) {
            angle = -PI / 2; // Straight up if only one diagonal bullet
          } else {
            angle = initialAngle + (i / (diagonalBulletsCount - 1)) * totalDiagonalSpreadAngle;
          }
          const vel = p5.Vector.fromAngle(angle, this.bulletSpeed);
          bullets.push(new Bullet(this.x, this.y - this.height / 2, 'player', this.ASSETS.playerBulletImage, vel, null, null));
        }
      }
    }
  }

  increasePower() {
    this.weaponLevel++;
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

    push();
    imageMode(CENTER);
    image(this.ASSETS.playerImage, this.x, this.y, this.width, this.height);
    pop();
  }
}
