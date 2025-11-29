class CanyonRocker extends Boss {
  constructor(x, y) {
    const stats = BOSS_STATS.CANYON_ROCKER;
    super(x, y, stats.HEALTH, stats.SIZE);

    this.phase = 1;
    this.isVulnerable = true;
    this.attackCooldown = stats.ATTACK_COOLDOWN;
    this.lastAttackFrame = 0;
    this.phase2StartTime = 0;

    // 1페이즈: 협곡
    this.canyon = {
      leftPath: [],
      rightPath: [],
      width: 150,
      pathWidth: 250, // Path for the player, initially wider
      segmentLength: 10 // Length of each segment in the canyon path
    };
    this.canyonY = 0;
    this.canyonScrollSpeed = 3; // Speed at which the canyon scrolls
  }

  update(player, enemyBullets) {
    // 페이즈 전환
    if (this.health <= this.maxHealth / 2 && this.phase === 1) {
      this.phase = 2;
      this.isVulnerable = false;
      this.phase2StartTime = frameCount; // Record the start time of phase 2
      console.log("Canyon Rocker: Phase 2 initiated. Boss is invincible.");
    }

    // Canyon scrolling and generation
    this.canyonY += this.canyonScrollSpeed;
    this.generateCanyon(this.phase === 2);

    if (this.phase === 1) {
      // 공격과 협곡 생성 패턴
      if (frameCount - this.lastAttackFrame > this.attackCooldown) {
        this.lastAttackFrame = frameCount;
      }
    } else if (this.phase === 2) {
      // 무적 상태 잠시 유지
      if (!this.isVulnerable && frameCount > this.phase2StartTime + 120) {
        this.isVulnerable = true;
      }
    }

    // 협곡과 플레이어 충돌 처리
    this.checkCanyonCollision(player);
  }

  // 협곡 생성
  generateCanyon(isPhase2 = false) {
    this.canyon.leftPath = [];
    this.canyon.rightPath = [];
    this.canyon.pathWidth = isPhase2 ? 280 : 350; // Wider for phase 1
    let centerX = width / 2;

    for (let y = 0; y <= height; y += this.canyon.segmentLength) {
      let noiseY = y + this.canyonY;
      let xOffset =
        sin(noiseY * (isPhase2 ? 0.015 : 0.01)) * (isPhase2 ? 150 : 100);
      this.canyon.leftPath.push({
        x: centerX + xOffset - this.canyon.pathWidth / 2,
        y: y
      });
      this.canyon.rightPath.push({
        x: centerX + xOffset + this.canyon.pathWidth / 2,
        y: y
      });
    }
  }

  // 협곡과 플레이어 충돌
  checkCanyonCollision(player) {
    let playerSegmentIndex = Math.floor(player.y / this.canyon.segmentLength);
    if (
      playerSegmentIndex < 0 ||
      playerSegmentIndex >= this.canyon.leftPath.length
    )
      return;

    const left_pt = this.canyon.leftPath[playerSegmentIndex];
    const right_pt = this.canyon.rightPath[playerSegmentIndex];

    if (
      player.x - player.size / 2 < left_pt.x ||
      player.x + player.size / 2 > right_pt.x
    ) {
      player.takeDamage();
    }
  }

  draw() {
    this.drawCanyon();

    // 보스 본체
    push();
    translate(this.x, this.y);

    let bossColor;
    if (this.phase === 1) {
      bossColor = "#8B4513"; // Phase 1 color
    } else { // Phase 2
      bossColor = "#654321"; // Phase 2 color (darker)
    }

    // If invulnerable (briefly at the start of Phase 2), make it gray
    if (!this.isVulnerable) {
      bossColor = "#808080"; // Gray color for invulnerability
    }

    fill(bossColor);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.health, 0, 0);
    pop();
  }

  drawCanyon() {
    fill(101, 67, 33); // Brown color for the walls
    noStroke();

    // Left wall
    beginShape();
    vertex(0, 0);
    for (const p of this.canyon.leftPath) {
      vertex(p.x, p.y);
    }
    vertex(0, height);
    endShape(CLOSE);

    // Right wall
    beginShape();
    vertex(width, 0);
    for (const p of this.canyon.rightPath) {
      vertex(p.x, p.y);
    }
    vertex(width, height);
    endShape(CLOSE);
  }

  isHit(bullet) {
    if (!this.isVulnerable) return false;

    const halfSize = this.size / 2;
    if (
      bullet.x > this.x - halfSize &&
      bullet.x < this.x + halfSize &&
      bullet.y > this.y - halfSize &&
      bullet.y < this.y + halfSize
    ) {
      this.health--;
      return true;
    }

    return false;
  }
}

