class Overload extends Boss {
  constructor(x, y, ASSETS) {
    const stats = BOSS_STATS.OVERLOAD;
    super(x, y, stats.HEALTH, max(stats.WIDTH, stats.HEIGHT)); 
    this.ASSETS = ASSETS; 
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
    super.update(player, enemyBullets);

    // 보스를 따라 포탑 위치를 계속 업데이트
    for (let i = 0; i < this.turrets.length; i++) {
      const turret = this.turrets[i];
      turret.x = this.x + this.turretPositions[i].x;
      turret.y = this.y + this.turretPositions[i].y;
      turret.update(player, enemyBullets);
    }

    // 등장 애니메이션 중에는 공격 로직을 실행하지 않음
    if (this.isIntro) {
        return;
    }

    // 1페이즈: 포탑 공격
    if (this.phase === 1) {
      // 모든 포탑이 파괴되면 2페이즈로 전환
      if (this.turrets.every(t => t.health <= 0)) {
        this.phase = 2;
        this.isVulnerable = true;
        this.lastAttackFrame = frameCount;
        this.fireGiantBullets(3, player, enemyBullets);
      }
    } else if (this.phase === 2) { // 2페이즈: 본체 돌진 공격
      if (this.chargeInfo.isCharging) {
        this.executeCharge();
      } else {
        // 일정 시간마다 돌진 공격 준비
        if (frameCount - this.lastAttackFrame > this.attackCooldown * 2) {
          this.prepareCharge(player);
          this.lastAttackFrame = frameCount;
        }
      }
    }
    
    // 1페이즈에서 주기적으로 거대 총알 발사
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
        const bullet = new Bullet(this.x, this.y, 'default', this.ASSETS.bossBulletImage, vel, null, undefined, 30); // Pass size 30
        enemyBullets.push(bullet);
    }
  }

  prepareCharge(player) {
    this.chargeInfo.isCharging = true;
    this.chargeInfo.targetX = player.x;
    // 플레이어 위치를 기준으로 화면 상단에서 다시 나타나 돌진
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
    if (this.hitEffectTimer > 0) {
      tint(255, 0, 0, 150); // Apply red tint
    }
    image(this.ASSETS.overloadBossImage, 0, 0, this.width, this.height);
    noTint(); // Reset tint
    pop();

    this.turrets.forEach(turret => turret.draw());
  }

  isHit(bullet, enemyBullets, player) {
    if (this.isVulnerable) {
      const bulletRadius = bullet.size / 2 || 5; 
      if (
        bullet.x + bulletRadius > this.x - this.width / 2 &&
        bullet.x - bulletRadius < this.x + this.width / 2 &&
        bullet.y + bulletRadius > this.y - this.height / 2 &&
        bullet.y - bulletRadius < this.y + this.height / 2
      ) {
        this.health--;
        this.triggerHitEffect(); // Trigger hit effect
        if (this.health <= 0) {
            this.isDefeated = true;
            this.ASSETS.sounds.enemyExplosion.play();
        }
        return true;
      }
    } else {
      for (const turret of this.turrets) {
        if (turret.isHit(bullet)) {
          return true;
        }
      }
    }
    return false;
  }
}

class Turret {
  constructor(x, y, boss, ASSETS) { 
    const turretStats = BOSS_STATS.OVERLOAD.TURRETS;
    this.x = x;
    this.y = y;
    this.size = turretStats.SIZE;
    this.health = turretStats.HEALTH;
    this.boss = boss;
    this.ASSETS = ASSETS; 
    this.lastShotFrame = 0;
    this.shootInterval = turretStats.SHOOT_INTERVAL;
    this.hitEffectTimer = 0;
  }

  triggerHitEffect() {
    this.hitEffectTimer = CONFIG.HIT_EFFECT_DURATION;
  }

  update(player, enemyBullets) {
    if (this.hitEffectTimer > 0) {
      this.hitEffectTimer--;
    }
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
      const bullet = new Bullet(this.x, this.y, 'default', this.ASSETS.bossBulletImage, vel); 
      enemyBullets.push(bullet);
    }
  }

  draw() {
    push();
    imageMode(CENTER);
    if (this.hitEffectTimer > 0) {
      tint(255, 0, 0, 150); // Apply red tint
    }
    if (this.health > 0) {
      image(this.ASSETS.overloadTurretImage, this.x, this.y, this.size, this.size);
    } else {
      image(this.ASSETS.overloadTurretDestroyedImage, this.x, this.y, this.size, this.size);
    }
    noTint(); // Reset tint
    pop();
  }

  isHit(bullet) {
    if (this.health > 0 && dist(bullet.x, bullet.y, this.x, this.y) < this.size / 2) {
      this.health--;
      this.triggerHitEffect();
      if (this.health === 0) {
        this.ASSETS.sounds.enemyExplosion.play();
      }
      return true;
    }
    return false;
  }
}