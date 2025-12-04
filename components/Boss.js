class Boss {
  constructor(x, y, health, size) {
    this.x = x;
    this.y = -300; // 보스 등장 애니메이션 시작 위치 (화면 밖)
    this.targetY = y; // 보스의 최종 y 위치
    this.health = health;
    this.maxHealth = health;
    this.size = size;
    this.isIntro = true; // 보스 등장 애니메이션 진행 상태
    this.hitEffectTimer = 0; // 피격 효과 타이머
  }

  // 피격 효과를 발동시키는 메소드
  triggerHitEffect() {
    this.hitEffectTimer = CONFIG.HIT_EFFECT_DURATION;
  }

  updateIntroAnimation() {
    if (this.isIntro) {
      // 지정된 속도로 아래로 이동
      this.y += 4; 
      // 목표 위치에 도달하면 애니메이션 종료
      if (this.y >= this.targetY) {
        this.y = this.targetY;
        this.isIntro = false;
      }
    }
  }

  update(player, enemyBullets, enemies) {
    this.updateIntroAnimation();
    if (this.hitEffectTimer > 0) {
      this.hitEffectTimer--;
    }
  }

  draw() {
    // 각 보스 클래스에서 구체적인 로직을 구현해야 합니다.
    console.error("Draw method must be implemented by subclass");
  }

  isHit(bullet, enemyBullets, player) {
    // 각 보스 클래스에서 구체적인 로직을 구현해야 합니다.
    console.error("isHit method must be implemented by subclass");
    return false;
  }
}