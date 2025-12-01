
class CarrierShield extends Boss {
  constructor(x, y, ASSETS) {
    const stats = BOSS_STATS.CARRIER_SHIELD;
    super(x, y, stats.HEALTH, stats.WIDTH); // Pass width as size for now
    this.ASSETS = ASSETS; // Store ASSETS
    this.width = stats.WIDTH;
    this.height = stats.HEIGHT;

    this.isVulnerable = false;
    this.turrets = [];
    this.turretPositions = [
      { x: -this.width * 0.3, y: 0 },
      { x: this.width * 0.3, y: 0 },
      { x: -this.width * 0.15, y: this.height * 0.25 },
      { x: this.width * 0.15, y: this.height * 0.25 },
    ];
    
    this.turretPositions.forEach((pos, index) => {
      const isAttackable = index === 0;
      this.turrets.push(new CarrierTurret(this.x + pos.x, this.y + pos.y, this, index, isAttackable, this.ASSETS));
    });

    this.attackCooldown = stats.ATTACK_COOLDOWN;
    this.lastAttackFrame = 0;
    this.speed = stats.SPEED;
    this.direction = createVector(this.speed, 0);
    this.isDefeated = false;
    this.y = this.height / 2; // Set initial y position
  }

  update(player, enemyBullets) {
    this.move();

    // Turret updates
    let allTurretsDestroyed = true;
    for (let i = 0; i < this.turrets.length; i++) {
      const turret = this.turrets[i];
      if (turret.health > 0) {
        allTurretsDestroyed = false;
        turret.update(player, enemyBullets);
      }
    }

    if (allTurretsDestroyed && !this.isVulnerable) {
      this.isVulnerable = true;
      this.lastAttackFrame = frameCount; // Reset attack timer for main body
    }

    // Main body attack
    if (this.isVulnerable && frameCount - this.lastAttackFrame > this.attackCooldown) {
      this.shoot(player, enemyBullets);
      this.lastAttackFrame = frameCount;
    }
    
    if (this.health <= 0 && !this.isDefeated) {
        this.isDefeated = true;
        this.onDeath(enemyBullets, player);
    }
  }
    
  onDeath(enemyBullets, player) {
    // Fires 5 fast homing missiles
    for (let i = 0; i < 5; i++) {
        const bullet = new Bullet(this.x, this.y, 'homing', this.ASSETS.enemyBulletImage, null, player, 7);
        enemyBullets.push(bullet);
    }
  }

  move() {
    // The carrier is stationary.
  }

  shoot(player, enemyBullets) {
    const angleToPlayer = atan2(player.y - this.y, player.x - this.x);
    for (let i = -1; i <= 1; i++) {
      const angle = angleToPlayer + i * 0.2;
      const vel = p5.Vector.fromAngle(angle, 4);
      const bullet = new Bullet(this.x, this.y, 'default', this.ASSETS.enemyBulletImage, vel);
      enemyBullets.push(bullet);
    }
  }
  
  onTurretDestroyed(enemyBullets, player) {
    // Fires 2 fast homing missiles
    for (let i = 0; i < 2; i++) {
        const bullet = new Bullet(this.x, this.y, 'homing', this.ASSETS.enemyBulletImage, null, player, 7);
        enemyBullets.push(bullet);
    }
  }

  draw() {
    push();
    // Main Body
    fill(this.isVulnerable ? '#ff6347' : '#808080');
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.health, this.x, this.y);
    pop();

    // Turrets
    this.turrets.forEach(turret => turret.draw());
  }

  isHit(bullet, enemyBullets, player) {
    if (this.isVulnerable) {
      if (bullet.x > this.x - this.width / 2 && bullet.x < this.x + this.width / 2 &&
          bullet.y > this.y - this.height / 2 && bullet.y < this.y + this.height / 2) {
        this.health--;
        return true;
      }
    } else {
      for (let i = 0; i < this.turrets.length; i++) {
        const turret = this.turrets[i];
        if (turret.isAttackable && turret.health > 0 && dist(bullet.x, bullet.y, turret.x, turret.y) < turret.size / 2) {
          turret.health--;
          if (turret.health <= 0) {
            this.onTurretDestroyed(enemyBullets, player);
            // Activate next turret
            if (i + 1 < this.turrets.length) {
              this.turrets[i + 1].isAttackable = true;
            }
          }
          return true;
        }
      }
    }
    return false;
  }
}

class CarrierTurret {
  constructor(x, y, boss, index, isAttackable = false, ASSETS) { // Accept ASSETS
    const turretStats = BOSS_STATS.CARRIER_SHIELD.TURRETS;
    this.x = x;
    this.y = y;
    this.size = turretStats.SIZE;
    this.health = turretStats.HEALTH;
    this.boss = boss;
    this.index = index;
    this.isAttackable = isAttackable;
    this.ASSETS = ASSETS; // Store ASSETS
    
    this.laserInfo = {
      isCharging: false,
      chargeStartFrame: 0,
      chargeDuration: 60, // 1 second at 60 FPS
      targetAngle: 0,
    };
    this.lastShotFrame = 0;
    this.shootInterval = turretStats.SHOOT_INTERVAL;
  }

  update(player, enemyBullets) {
    if (this.health > 0 && this.isAttackable) {
      if (this.laserInfo.isCharging) {
        if (frameCount - this.laserInfo.chargeStartFrame > this.laserInfo.chargeDuration) {
          this.fireLaser(enemyBullets);
          this.laserInfo.isCharging = false;
          this.lastShotFrame = frameCount;
        }
      } else if (frameCount - this.lastShotFrame > this.shootInterval) {
        this.prepareLaser(player);
      }
    }
  }

  prepareLaser(player) {
    this.laserInfo.isCharging = true;
    this.laserInfo.chargeStartFrame = frameCount;
    this.laserInfo.targetAngle = atan2(player.y - this.y, player.x - this.x);
  }

  fireLaser(enemyBullets) {
    const vel = p5.Vector.fromAngle(this.laserInfo.targetAngle, 10);
    const bullet = new Bullet(this.x, this.y, 'laser', this.ASSETS.enemyBulletImage, vel); // Pass enemyBulletImage
    enemyBullets.push(bullet);
  }

  draw() {
    if (this.health > 0) {
      push();
      if (this.isAttackable) {
        fill('#add8e6'); // Light blue for attackable
      } else {
        fill('#a9a9a9'); // Dark gray for non-attackable
      }
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);

      fill(0);
      textAlign(CENTER, CENTER);
      textSize(14);
      text(this.health, this.x, this.y);
      pop();

      if (this.laserInfo.isCharging) {
        push();
        stroke(255, 0, 0, 150);
        strokeWeight(2);
        translate(this.x, this.y);
        rotate(this.laserInfo.targetAngle);
        line(0, 0, width, 0); // Draw a line across the screen
        pop();
      }
    }
  }
}
