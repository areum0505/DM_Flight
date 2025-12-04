class CanyonRocker extends Boss {
  constructor(x, y, ASSETS) {
    const stats = BOSS_STATS.CANYON_ROCKER;
    super(x, y, stats.HEALTH, max(stats.WIDTH, stats.HEIGHT));
    this.ASSETS = ASSETS;
    this.width = stats.WIDTH;
    this.height = stats.HEIGHT;

    this.isDefeated = false;
    this.phase = 1; // 현재 보스 페이즈 (1 또는 2)
    this.isVulnerable = true; // 현재 무적 상태 여부 (true: 피격 가능, false: 무적)
    this.phase2StartTime = 0; // 2페이즈 시작 시간 (프레임)
    this.widthAtTransitionStart = 0; // 2페이즈 전환 시작 시의 협곡 너비

    // 인트로 애니메이션 관련
    this.isIntroAnimation = true; // 인트로 애니메이션 진행 상태
    this.battleStartTime = frameCount; // 전투 시작 시간 (프레임)

    // 낙석 공격 관련
    this.lastRockfallFrame = 0; // 마지막 낙석 공격 시간 (프레임)

    // 협곡 관련 데이터
    this.canyon = {
      leftPath: [], // 협곡 왼쪽 벽의 경로 점들
      rightPath: [], // 협곡 오른쪽 벽의 경로 점들
      pathWidth: width, // 플레이어가 지나갈 수 있는 길의 너비
      segmentLength: 10 // 협곡 곡선을 구성하는 선분의 길이 (작을수록 부드러움)
    };
    this.canyonY = 0; // 협곡의 Y축 스크롤 위치
    this.canyonScrollSpeed = 2; // 협곡 스크롤 속도
  }

  update(player, enemyBullets) {
    // 페이즈 전환 로직
    if (this.health <= this.maxHealth / 2 && this.phase === 1) {
      this.phase = 2;
      this.isVulnerable = false;
      this.phase2StartTime = frameCount;
      this.widthAtTransitionStart = this.canyon.pathWidth; // 전환 직전의 너비를 저장
      console.log("Canyon Rocker: Phase 2 initiated. Boss is invincible.");
    }

    // 협곡 너비 관리 로직
    const phase1Width = 350; // 1페이즈 길 너비
    const phase2Width = 245; // 2페이즈 길 너비 (1페이즈의 70%)
    const introDuration = 300; // 인트로 애니메이션 지속 시간 (5초)
    const transitionDuration = 300; // 2페이즈 전환 애니메이션 지속 시간 (5초)

    if (this.isIntroAnimation) {
        // 인트로 애니메이션: 화면 전체 너비에서 1페이즈 너비로 서서히 좁아짐
        const timeSinceBattleStart = frameCount - this.battleStartTime;
        if (timeSinceBattleStart < introDuration) {
            this.canyon.pathWidth = map(timeSinceBattleStart, 0, introDuration, width, phase1Width);
        } else {
            this.isIntroAnimation = false;
            this.canyon.pathWidth = phase1Width;
        }
    } else if (this.phase === 1) {
      this.canyon.pathWidth = phase1Width;
    } else {
      // 2페이즈 전환: 1페이즈 너비에서 2페이즈 너비로 서서히 좁아짐
      const timeSincePhase2Start = frameCount - this.phase2StartTime;
      if (timeSincePhase2Start >= 0 && timeSincePhase2Start < transitionDuration) {
        this.canyon.pathWidth = map(timeSincePhase2Start, 0, transitionDuration, this.widthAtTransitionStart, phase2Width);
      } else {
        this.canyon.pathWidth = phase2Width;
      }
    }

    // 협곡 스크롤 및 경로 생성
    this.canyonY += this.canyonScrollSpeed;
    this.generateCanyon(this.phase === 2);

    // 낙석 공격 로직 (인트로 중에는 실행 안함)
    if (!this.isIntroAnimation) {
      const currentRockfallCooldown = this.phase === 1 ? 135 : 70; // 현재 낙석 공격 주기
      if (frameCount - this.lastRockfallFrame > currentRockfallCooldown) {
          this.lastRockfallFrame = frameCount;
          this.rockfallAttack(enemyBullets);
      }
    }

    // 2페이즈 특정 로직
    if (this.phase === 2) {
      // 2페이즈 시작 시 잠시 무적
      if (!this.isVulnerable && frameCount > this.phase2StartTime + 120) {
        this.isVulnerable = true;
      }
    }

    // 플레이어와 협곡 충돌 확인
    this.checkCanyonCollision(player);
  }

  rockfallAttack(enemyBullets) {
    const rockSize = this.phase === 1 ? 20 : 30;
    const rockX = random(width);
    const rock = new FallingRock(rockX, 0, rockSize, this.ASSETS);
    enemyBullets.push(rock);
  }

  generateCanyon(isPhase2 = false) {
    this.canyon.leftPath = [];
    this.canyon.rightPath = [];
    
    let centerX = width / 2;

    // 흔들림 속도(frequency) 점진적 전환 로직
    let frequency; // 최종적으로 사용할 흔들림 속도
    const phase1Freq = 0.01; // 1페이즈 흔들림 속도
    const phase2Freq = 0.01; // 2페이즈 흔들림 속도
    const transitionDuration = 300; // 전환 시간 (너비 전환과 동일)

    if (isPhase2) {
        const timeSincePhase2Start = frameCount - this.phase2StartTime;
        if (timeSincePhase2Start >= 0 && timeSincePhase2Start < transitionDuration) {
            // 1페이즈 속도에서 2페이즈 속도로 서서히 변경
            frequency = map(timeSincePhase2Start, 0, transitionDuration, phase1Freq, phase2Freq);
        } else {
            frequency = phase2Freq;
        }
    } else {
        frequency = phase1Freq;
    }

    for (let y = 0; y <= height; y += this.canyon.segmentLength) {
      let noiseY = y + this.canyonY;
      let xOffset = sin(noiseY * frequency) * 125; // 협곡 중심의 X축 이동량
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
    // 이 메소드는 이제 보스 본체만 그립니다.
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.ASSETS.canyonRockerImage, 0, 0, this.width, this.height);

    // 체력 표시
    // fill(255);
    // textAlign(CENTER, CENTER);
    // textSize(20);
    // text(this.health, 0, 0);
    pop();
  }

  drawCanyon() {
    noStroke(); // 벽에는 외곽선이 없어야 함

    // 왼쪽 벽
    drawingContext.save();
    
    beginShape();
    vertex(0, 0);
    for (const p of this.canyon.leftPath) {
      vertex(p.x, p.y);
    }
    vertex(0, height);
    endShape(CLOSE);
    
    drawingContext.clip(); 
    
    const img = this.ASSETS.canyonRockerWallImage;
    if (img && img.width > 0 && img.height > 0) {
      const stepY = img.height * 0.7; // 70% 겹치기
      const startY = (this.canyonY % stepY) - stepY;
      let rowCounter = 0;

      for (let y = startY; y < height; y += stepY) {
        const isOddRow = (Math.floor(this.canyonY / stepY) + rowCounter) % 2 !== 0;
        const xOffset = isOddRow ? -img.width / 2 : 0;
        
        for (let x = xOffset; x < width; x += img.width) {
          image(img, x, y);
        }
        rowCounter++;
      }
    }
    
    drawingContext.restore();

    // 오른쪽 벽
    drawingContext.save();

    beginShape();
    vertex(width, 0);
    for (const p of this.canyon.rightPath) {
      vertex(p.x, p.y);
    }
    vertex(width, height);
    endShape(CLOSE);

    drawingContext.clip();

    if (img && img.width > 0 && img.height > 0) {
      const stepY = img.height * 0.7; // 70% 겹치기
      const startY = (this.canyonY % stepY) - stepY;
      let rowCounter = 0;

      for (let y = startY; y < height; y += stepY) {
        const isOddRow = (Math.floor(this.canyonY / stepY) + rowCounter) % 2 !== 0;
        const xOffset = isOddRow ? -img.width / 2 : 0;
        
        for (let x = xOffset; x < width; x += img.width) {
          image(img, x, y);
        }
        rowCounter++;
      }
    }

    drawingContext.restore();
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
      if (this.health <= 0) {
          this.isDefeated = true;
          this.ASSETS.sounds.enemyExplosion.play();
      }
      return true;
    }

    return false;
  }
}
