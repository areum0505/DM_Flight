
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
      const isAttackable = index === 0;
      this.turrets.push(new CarrierTurret(this.x + pos.x, this.y + pos.y, this, index, isAttackable, this.ASSETS));
    });

    this.attackCooldown = stats.ATTACK_COOLDOWN;
    this.lastAttackFrame = 0;
    this.speed = stats.SPEED;
    this.direction = createVector(this.speed, 0);
    this.isDefeated = false;
    this.y = y; // GameScene에서 전달된 y좌표 사용
    if (this.y === undefined) { // y값이 전달되지 않았을 경우의 예비처리 (현재 구조에선 발생하지 않음)
      this.y = this.height / 2;
    }
  }

  update(player, enemyBullets) {
    this.move();


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
      this.lastAttackFrame = frameCount; // 본체 공격 타이머 초기화
    }


    if (this.isVulnerable && frameCount - this.lastAttackFrame > this.attackCooldown) {
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
        const bullet = new Bullet(this.x, this.y, 'homing', this.ASSETS.enemyBulletImage, null, player, 7);
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
      const bullet = new Bullet(this.x, this.y, 'default', this.ASSETS.enemyBulletImage, vel);
      enemyBullets.push(bullet);
    }
  }
  
  onTurretDestroyed(enemyBullets, player) {
    // 빠른 유도 미사일 2발 발사
    for (let i = 0; i < 2; i++) {
        const bullet = new Bullet(this.x, this.y, 'homing', this.ASSETS.enemyBulletImage, null, player, 7);
        enemyBullets.push(bullet);
    }
  }

  draw() {
    push();
    imageMode(CENTER);
    image(this.ASSETS.carrierShieldImage, this.x, this.y, this.width, this.height);
    
    // 체력 표시
    //fill(255);
    // textAlign(CENTER, CENTER);
    // textSize(20);
    // text(this.health, this.x, this.y);
    pop();

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
            this.ASSETS.sounds.enemyExplosion.play();
            this.onTurretDestroyed(enemyBullets, player);
            // 다음 포탑 활성화
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
    
    this.laserInfo = {
      isCharging: false,
      chargeStartFrame: 0,
      chargeDuration: 60, // 60프레임 기준 1초
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
    const bullet = new Bullet(this.x, this.y, 'laser', this.ASSETS.enemyBulletImage, vel);
    enemyBullets.push(bullet);
  }

  draw() {
    push();
    imageMode(CENTER);

    if (this.health > 0) {
      if (this.isAttackable) {
        image(this.ASSETS.carrierShieldTurretEnabledImage, this.x, this.y, this.size, this.size);
      } else {
        image(this.ASSETS.carrierShieldTurretImage, this.x, this.y, this.size, this.size);
      }
      
      // 체력 표시
      fill(0);
      // textAlign(CENTER, CENTER);
      // textSize(14);
      // text(this.health, this.x, this.y);
    } else {
      image(this.ASSETS.carrierShieldTurretDestroyedImage, this.x, this.y, this.size, this.size);
    }
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
}
