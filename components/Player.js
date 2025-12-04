class Player {
  constructor(x, y, ASSETS) {
    this.x = x;
    this.y = y;
    this.ASSETS = ASSETS;
    this.width = 40;
    this.height = 60;

    // CONFIG의 값을 플레이어의 초기 능력치로 설정
    this.speed = CONFIG.PLAYER.SPEED;
    this.health = CONFIG.PLAYER.HEALTH;
    this.shootInterval = CONFIG.PLAYER.SHOOT_INTERVAL;
    this.bulletSpeed = CONFIG.BULLET.SPEED;
    this.weaponLevel = 1;

    // 피격 후 무적 상태 관리
    this.isInvincible = false; // 현재 무적 상태 여부
    this.invincibilityDuration = 60; // 무적 지속 시간 (1초)
    this.invincibilityEndTime = 0; // 무적 종료 시간 (프레임)
  }

  move() {
    // 무적 시간이 끝나면 무적 상태 해제
    if (this.isInvincible && frameCount > this.invincibilityEndTime) {
      this.isInvincible = false;
    }

    // 키보드 입력에 따라 좌우로 이동
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    // 플레이어가 화면 밖으로 나가지 않도록 위치를 제한
    this.x = constrain(this.x, this.width / 2, width - this.width / 2);
  }

  shoot(bullets) {
    // 무기 레벨 1-5: 평행하게 나가는 총알 개수 증가
    if (this.weaponLevel <= 5) {
      const spreadWidth = (this.weaponLevel - 1) * 10;
      const startX = this.x - spreadWidth / 2;

      for (let i = 0; i < this.weaponLevel; i++) {
        const bulletX = this.weaponLevel === 1 ? this.x : startX + i * 10;
        bullets.push(new Bullet(bulletX, this.y - this.height / 2, 'player', this.ASSETS.playerBulletImage, null, null, -this.bulletSpeed));
      }
    } else {
      // 무기 레벨 6 이상: 5개의 평행 총알 + 대각선으로 나가는 총알 추가
      
      // 5개의 기본 평행 총알 발사
      const baseWeaponLevel = 5;
      const spreadWidth = (baseWeaponLevel - 1) * 10;
      const startX = this.x - spreadWidth / 2;
      for (let i = 0; i < baseWeaponLevel; i++) {
        const bulletX = baseWeaponLevel === 1 ? this.x : startX + i * 10;
        bullets.push(new Bullet(bulletX, this.y - this.height / 2, 'player', this.ASSETS.playerBulletImage, null, null, -this.bulletSpeed));
      }

      // 추가 대각선 총알 발사
      const diagonalBulletsCount = this.weaponLevel - baseWeaponLevel;
      if (diagonalBulletsCount > 0) {
        const totalDiagonalSpreadAngle = PI / 2; // 90도 범위로 발사
        const initialAngle = -PI / 2 - totalDiagonalSpreadAngle / 2;
        
        for (let i = 0; i < diagonalBulletsCount; i++) {
          let angle;
          if (diagonalBulletsCount === 1) {
            angle = -PI / 2; // 1개일 경우 정면으로 발사
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
    // 무적 상태일 때는 데미지를 입지 않음
    if (this.isInvincible) {
      return;
    }

    this.health--;
    // 피격 후 일정 시간 동안 무적 상태로 전환
    this.isInvincible = true;
    this.invincibilityEndTime = frameCount + this.invincibilityDuration;
  }

  draw() {
    // 무적 상태일 때 깜빡이는 효과
    if (this.isInvincible && frameCount % 10 < 5) {
      return; // 일정 프레임마다 그리지 않아 깜빡이는 것처럼 보이게 함
    }

    push();
    imageMode(CENTER);
    image(this.ASSETS.playerImage, this.x, this.y, this.width, this.height);
    pop();
  }
}
