
class CarrierShield extends Boss {
  constructor(x, y, ASSETS) {
    const stats = BOSS_STATS.CARRIER_SHIELD;
    super(x, y, stats.HEALTH, stats.WIDTH); 
    this.ASSETS = ASSETS; 
    this.width = stats.WIDTH;
    this.height = stats.HEIGHT;

    this.isVulnerable = false;
    this.turrets = [];
    this.turretPositions = [
      // Top Center turret
      { x: 0, y: -20 },
      // triangle formation below turret
      { x: 0, y: 90 },
      { x: -75, y: 230 },
      { x: 75, y: 230 },
    ];
    
    this.turretPositions.forEach((pos, index) => {
      const isAttackable = index === 0; // 첫 번째 포탑만 초기에 공격 가능
      // The initial y position of the turret will be calculated based on the boss's initial y
      this.turrets.push(new CarrierTurret(this.x + pos.x, this.y + pos.y, this, index, isAttackable, this.ASSETS));
    });

    this.attackCooldown = stats.ATTACK_COOLDOWN;
    this.lastAttackFrame = 0;
    this.speed = stats.SPEED;
    this.direction = createVector(this.speed, 0);
    this.isDefeated = false;
  }

  update(player, enemyBullets) {
    super.update(player, enemyBullets);
    this.move();

    let allTurretsDestroyed = true;
    for (let i = 0; i < this.turrets.length; i++) {
      const turret = this.turrets[i];
      // 보스를 따라 포탑 위치를 계속 업데이트
      turret.x = this.x + this.turretPositions[i].x;
      turret.y = this.y + this.turretPositions[i].y;
      turret.update(player, enemyBullets);
      
      if (turret.health > 0) {
        allTurretsDestroyed = false;
      }
    }

    // 모든 포탑이 파괴되면 보스가 공격 가능 상태가 됨
    if (allTurretsDestroyed && !this.isVulnerable) {
      this.isVulnerable = true;
      this.lastAttackFrame = frameCount; // 본체 공격 타이머 초기화
    }

    // 등장 애니메이션이 끝나고, 공격 가능 상태일 때만 보스가 공격
    if (!this.isIntro && this.isVulnerable && frameCount - this.lastAttackFrame > this.attackCooldown) {
      this.shoot(player, enemyBullets);
      this.lastAttackFrame = frameCount;
    }
    
    if (this.health <= 0 && !this.isDefeated) {
        this.isDefeated = true;
        this.ASSETS.sounds.enemyExplosion.play();
        this.onDeath(enemyBullets, player);
    }
  }
    
  onDeath(enemyBullets, player) {
    // 빠른 유도 미사일 5발 발사
    for (let i = 0; i < 5; i++) {
        const bullet = new Bullet(this.x, this.y, 'homing', this.ASSETS.homingBulletImage, null, player, 7);
        enemyBullets.push(bullet);
    }
  }

  move() {
    // 캐리어는 고정되어 움직이지 않음.
  }

  shoot(player, enemyBullets) {
    const angleToPlayer = atan2(player.y - this.y, player.x - this.x);
    for (let i = -1; i <= 1; i++) {
      const angle = angleToPlayer + i * 0.2;
      const vel = p5.Vector.fromAngle(angle, 4);
      const bullet = new Bullet(this.x, this.y, 'default', this.ASSETS.bossBulletImage, vel);
      enemyBullets.push(bullet);
    }
  }
  
  onTurretDestroyed(enemyBullets, player) {
    // 빠른 유도 미사일 2발 발사
    for (let i = 0; i < 2; i++) {
        const bullet = new Bullet(this.x, this.y, 'homing', this.ASSETS.homingBulletImage, null, player, 7);
        enemyBullets.push(bullet);
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    if (this.hitEffectTimer > 0) {
      tint(255, 0, 0, 150); // Apply red tint
    }
    image(this.ASSETS.carrierShieldImage, 0, 0, this.width, this.height);
    noTint(); // Reset tint
    pop();

    this.turrets.forEach(turret => turret.draw());
  }

  isHit(bullet, enemyBullets, player) {
    // 보스가 직접 공격받는 상태일 때
    if (this.isVulnerable) {
      if (bullet.x > this.x - this.width / 2 && bullet.x < this.x + this.width / 2 &&
          bullet.y > this.y - this.height / 2 && bullet.y < this.y + this.height / 2) {
        this.health--;
        this.triggerHitEffect();
        return true;
      }
    } else { // 포탑을 먼저 파괴해야 할 때
      for (const turret of this.turrets) {
        if (turret.isHit(bullet, enemyBullets, player)) {
          return true;
        }
      }
    }
    return false;
  }
}

class CarrierTurret {
  constructor(x, y, boss, index, isAttackable = false, ASSETS) { 
    const turretStats = BOSS_STATS.CARRIER_SHIELD.TURRETS;
    this.x = x;
    this.y = y;
    this.size = turretStats.SIZE;
    this.health = turretStats.HEALTH;
    this.boss = boss;
    this.index = index;
    this.isAttackable = isAttackable;
    this.ASSETS = ASSETS; 
    this.hitEffectTimer = 0;
    
    this.laserInfo = {
      isCharging: false,
      chargeStartFrame: 0,
      chargeDuration: 60, // 60프레임 기준 1초
      targetAngle: 0,
    };
    this.lastShotFrame = 0;
    this.shootInterval = turretStats.SHOOT_INTERVAL;
  }

  triggerHitEffect() {
    this.hitEffectTimer = CONFIG.HIT_EFFECT_DURATION;
  }

  update(player, enemyBullets) {
    if (this.hitEffectTimer > 0) {
      this.hitEffectTimer--;
    }

    if (this.health > 0 && this.isAttackable && !this.boss.isIntro) {
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
    const bullet = new Bullet(this.x, this.y, 'laser', this.ASSETS.enemyBulletImage, vel);
    enemyBullets.push(bullet);
  }

  draw() {
    push();
    imageMode(CENTER);
    if (this.hitEffectTimer > 0) {
      tint(255, 0, 0, 150); // Apply red tint
    }

    if (this.health > 0) {
      if (this.isAttackable) {
        image(this.ASSETS.carrierShieldTurretEnabledImage, this.x, this.y, this.size, this.size);
      } else {
        image(this.ASSETS.carrierShieldTurretImage, this.x, this.y, this.size, this.size);
      }
    } else {
      image(this.ASSETS.carrierShieldTurretDestroyedImage, this.x, this.y, this.size, this.size);
    }
    noTint(); // Reset tint
    pop();

    if (this.laserInfo.isCharging && this.health > 0) { // 포탑이 활성화된 경우에만 레이저 충전
      push();
      stroke(255, 0, 0, 150);
      strokeWeight(5);
      translate(this.x, this.y);
      rotate(this.laserInfo.targetAngle);
      line(0, 0, width * 1.5, 0);
      pop();
    }
  }

  isHit(bullet, enemyBullets, player) {
    if (this.isAttackable && this.health > 0 && dist(bullet.x, bullet.y, this.x, this.y) < this.size / 2) {
      this.health--;
      this.triggerHitEffect();
      if (this.health <= 0) {
        this.ASSETS.sounds.enemyExplosion.play();
        this.boss.onTurretDestroyed(enemyBullets, player);
        // 다음 포탑 활성화
        const nextTurretIndex = this.index + 1;
        if (nextTurretIndex < this.boss.turrets.length) {
          this.boss.turrets[nextTurretIndex].isAttackable = true;
        }
      }
      return true;
    }
    return false;
  }
}
