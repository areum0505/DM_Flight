class Overload extends Boss {
  constructor(x, y, ASSETS) {
    const stats = BOSS_STATS.OVERLOAD;
    super(x, y, stats.HEALTH, max(stats.WIDTH, stats.HEIGHT)); // Pass max of width/height to base Boss constructor
    this.ASSETS = ASSETS; // Store ASSETS
    this.width = stats.WIDTH;
    this.height = stats.HEIGHT;

    this.isDefeated = false;
    this.isVulnerable = false;
    this.phase = 1;
    this.turrets = [];
    this.turretPositions = [
      // Bottom row
      { x: -75, y: 55 },
      { x: 75, y: 55 },
      // Top row
      { x: -35, y: -45 },
      { x: 35, y: -45 },
    ];

    this.turretPositions.forEach(pos => {
      this.turrets.push(new Turret(this.x + pos.x, this.y + pos.y, this, this.ASSETS));
    });

    this.attackCooldown = stats.ATTACK_COOLDOWN;
    this.lastAttackFrame = 0;
    this.chargeInfo = {
      isCharging: false,
      targetX: 0,
      speed: stats.CHARGE_SPEED,
      angle: 0
    };
  }

  update(player, enemyBullets) {
    if (this.phase === 1) {
      this.turrets.forEach(turret => turret.update(player, enemyBullets));
      if (this.turrets.every(t => t.health <= 0)) {
        this.phase = 2;
        this.isVulnerable = true;
        this.lastAttackFrame = frameCount;
        this.fireGiantBullets(3, player, enemyBullets);
      }
    } else if (this.phase === 2) {
      if (this.chargeInfo.isCharging) {
        this.executeCharge();
      } else {
        if (frameCount - this.lastAttackFrame > this.attackCooldown * 2) {
          this.prepareCharge(player);
          this.lastAttackFrame = frameCount;
        }
      }
    }
    
    if (this.phase === 1 && frameCount - this.lastAttackFrame > this.attackCooldown) {
        this.fireGiantBullets(1, player, enemyBullets);
        this.lastAttackFrame = frameCount;
    }
  }
    
  fireGiantBullets(count, player, enemyBullets) {
    const angleToPlayer = atan2(player.y - this.y, player.x - this.x);
    for (let i = 0; i < count; i++) {
        const angle = angleToPlayer + (i - floor(count/2)) * 0.2;
        const vel = p5.Vector.fromAngle(angle, 4);
        const bullet = new Bullet(this.x, this.y, 'default', this.ASSETS.enemyBulletImage, vel); // Pass enemyBulletImage
        bullet.size = 30;
        enemyBullets.push(bullet);
    }
  }

  prepareCharge(player) {
    this.chargeInfo.isCharging = true;
    this.chargeInfo.targetX = player.x;
    this.x = this.chargeInfo.targetX;
    this.y = -this.size;
    this.chargeInfo.angle = 0;
  }

  executeCharge() {
    this.y += this.chargeInfo.speed;
    this.chargeInfo.angle += 20;
    if (this.y > height + this.size) {
      this.chargeInfo.isCharging = false;
      this.y = 150;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    if (this.chargeInfo.isCharging) {
        rotate(radians(this.chargeInfo.angle));
    }
    imageMode(CENTER);
    image(this.ASSETS.overloadBossImage, 0, 0, this.width, this.height);
    
    // 체력 표시
    // fill(255);
    // textAlign(CENTER, CENTER);
    // textSize(20);
    // text(this.health, 0, 0);
    pop();

    this.turrets.forEach(turret => turret.draw());
  }

  isHit(bullet, enemyBullets, player) {
    if (this.isVulnerable) {
      const bulletRadius = bullet.size / 2 || 5; // Default bullet size if not defined
      if (
        bullet.x + bulletRadius > this.x - this.width / 2 &&
        bullet.x - bulletRadius < this.x + this.width / 2 &&
        bullet.y + bulletRadius > this.y - this.height / 2 &&
        bullet.y - bulletRadius < this.y + this.height / 2
      ) {
        this.health--;
        if (this.health <= 0) {
            this.isDefeated = true;
        }
        return true;
      }
    } else {
      for (const turret of this.turrets) {
        if (turret.health > 0 && dist(bullet.x, bullet.y, turret.x, turret.y) < turret.size / 2) {
          turret.health--;
          return true;
        }
      }
    }
    return false;
  }
}

class Turret {
  constructor(x, y, boss, ASSETS) { // Accept ASSETS
    const turretStats = BOSS_STATS.OVERLOAD.TURRETS;
    this.x = x;
    this.y = y;
    this.size = turretStats.SIZE;
    this.health = turretStats.HEALTH;
    this.boss = boss;
    this.ASSETS = ASSETS; // Store ASSETS
    this.lastShotFrame = 0;
    this.shootInterval = turretStats.SHOOT_INTERVAL;
  }

  update(player, enemyBullets) {
    if (this.health > 0 && frameCount - this.lastShotFrame > this.shootInterval) {
      this.shoot(player, enemyBullets);
      this.lastShotFrame = frameCount;
    }
  }

  shoot(player, enemyBullets) {
    const angleToPlayer = atan2(player.y - this.y, player.x - this.x);
    for (let i = -1; i <= 1; i++) {
      const angle = angleToPlayer + i * 0.25;
      const vel = p5.Vector.fromAngle(angle, 5);
      const bullet = new Bullet(this.x, this.y, 'default', this.ASSETS.enemyBulletImage, vel); // Pass enemyBulletImage
      enemyBullets.push(bullet);
    }
  }

  draw() {
    imageMode(CENTER);
    if (this.health > 0) {
      image(this.ASSETS.overloadTurretImage, this.x, this.y, this.size, this.size);

      // 체력 표시
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(14);
      text(this.health, this.x, this.y);
    } else {
      image(this.ASSETS.overloadTurretDestroyedImage, this.x, this.y, this.size, this.size);
    }
  }
}