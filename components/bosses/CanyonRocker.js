class CanyonRocker extends Boss {
  constructor(x, y) {
    const stats = BOSS_STATS.CANYON_ROCKER;
    super(x, y, stats.HEALTH, stats.SIZE);

    this.phase = 1;
    this.isVulnerable = true;
    this.attackCooldown = stats.ATTACK_COOLDOWN;
    this.lastAttackFrame = 0;

    // 1페이즈: 협곡
    this.canyon = {
      leftPath: [],
      rightPath: [],
      width: 150,
      pathWidth: 250, // Path for the player, initially wider
      segmentLength: 20 // Length of each segment in the canyon path
    };
    this.canyonY = 0;
    this.canyonScrollSpeed = 1; // Speed at which the canyon scrolls
  }

  update(player, enemyBullets) {
    // 페이즈 전환
    if (this.health <= this.maxHealth / 2 && this.phase === 1) {
      this.phase = 2;
      this.isVulnerable = false;
      console.log("Canyon Rocker: Phase 2 initiated. Boss is invincible.");
      // 잠시 후 다시 isVulnerable = true;
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
      if (!this.isVulnerable && frameCount > this.lastAttackFrame + 120) {
        this.isVulnerable = true;
      }
    }

    // 협곡과 플레이어 충돌 처리
    this.checkCanyonCollision(player);
  }

  // 1페이즈 협곡 생성
  generateCanyon(isPhase2 = false) {
    this.canyon.leftPath = [];
    this.canyon.rightPath = [];
    this.canyon.pathWidth = isPhase2 ? 150 : 250; // Wider for phase 1
    let centerX = width / 2;

    for (let y = 0; y <= height; y += this.canyon.segmentLength) {
      let noiseY = y + this.canyonY;
      let xOffset =
        noise(noiseY * (isPhase2 ? 0.02 : 0.01)) * (isPhase2 ? 200 : 100) -
        (isPhase2 ? 100 : 50);
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
    fill(this.isVulnerable ? "#8B4513" : "#654321"); // 갈색, 무적일 때 더 진한 갈색
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.health, 0, 0);
    pop();
  }

  drawCanyon() {
    stroke(101, 67, 33); // Darker brown
    strokeWeight(this.canyon.width);
    noFill();

    // left wall
    beginShape();
    this.canyon.leftPath.forEach(p => {
      vertex(p.x - this.canyon.width / 2, p.y);
    });
    endShape();

    // right wall
    beginShape();
    this.canyon.rightPath.forEach(p => {
      vertex(p.x + this.canyon.width / 2, p.y);
    });
    endShape();
  }

  isHit(bullet) {
    if (!this.isVulnerable) return false;

    if (dist(bullet.x, bullet.y, this.x, this.y) < this.size / 2) {
      this.health--;
      return true;
    }

    return false;
  }
}

