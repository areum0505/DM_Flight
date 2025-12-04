class OmegaSystem extends Boss {
    constructor(x, y, ASSETS) {
        const stats = BOSS_STATS.OMEGA_SYSTEM;
        super(x, y, stats.HEALTH, stats.SIZE);
        this.ASSETS = ASSETS;

        this.width = stats.WIDTH; // 사각형 및 레이저 렌더링에 사용할 너비
        this.height = stats.HEIGHT; // 사각형 및 레이저 렌더링에 사용할 높이
        this.color = 'purple';
        this.phase = 1;
        this.isDefeated = false;

        // 파열 공격 속성
        this.burstAttacks = [];
        this.burstDelay = 10; // 파열 간 10프레임 지연

        // 1페이즈: 소형 비행기
        this.smallPlanes = [];
        this.numSmallPlanes = 5;
        this.smallPlaneHealth = stats.SMALL_PLANE_HEALTH;
        this.smallPlaneSpeed = 2;
        this.smallPlaneFireRate = 60;
        this.smallPlaneBulletSpeed = 7;
        this.smallPlaneRadius = 100; // 본체 주변 회전 반경
        this.smallPlaneAngle = 0; // 초기 배치 각도
        this.smallPlaneSize = stats.SMALL_PLANE_SIZE;

        // 2페이즈: 보호막 및 적 생성
        this.shieldHealth = stats.SHIELD_HEALTH;
        this.shieldActive = false;
        this.enemySpawnTimer = 0;
        this.enemySpawnInterval = 5 * 60; // 5초 * 60fps

        // 3페이즈: 본체 공격
        this.mainBodyFireRate = 60;
        this.mainBodyBulletSpeed = 8;
        this.laserTimer = 0;
        this.laserInterval = 5 * 60; // 5초 * 60fps (주기 단축)
        this.laserDuration = 60; // 레이저 지속 시간 (프레임)
        this.laserWarningDuration = 120; // 레이저 경고 시간 (2초)
        this.laserState = 'IDLE'; // 레이저 상태: IDLE, WARNING, FIRING
        this.laserTargetY = 0;
        this.maxHealth = stats.HEALTH; // 체력바 표시를 위한 최대 체력 설정

        this.initPhase1();
    }

    initPhase1() {
        for (let i = 0; i < this.numSmallPlanes; i++) {
            const angle = (TWO_PI / this.numSmallPlanes) * i;
            this.smallPlanes.push({
                x: this.x + this.smallPlaneRadius * cos(angle),
                y: this.y + this.smallPlaneRadius * sin(angle),
                health: this.smallPlaneHealth,
                angle: angle,
                fireTimer: random(this.smallPlaneFireRate),
                active: true,
                size: this.smallPlaneSize,
            });
        }
    }

    update(player, enemyBullets, enemies) {
        super.update(player, enemyBullets, enemies);
        if (this.isDefeated) return;

        // 보스 등장 애니메이션 중에는 소형 비행기 위치만 업데이트
        if (this.phase === 1) {
            this.smallPlanes.forEach(plane => {
                if (!plane.active) return;
    
                // 각 비행기가 개별적으로 본체 주변을 공전
                plane.angle += 0.03;
                plane.x = this.x + this.smallPlaneRadius * cos(plane.angle);
                plane.y = this.y + this.smallPlaneRadius * sin(plane.angle);
            });
        }
        
        // 등장 애니메이션 중에는 공격 로직을 실행하지 않음
        if (this.isIntro) {
            return;
        }

        this.updateBurstAttacks(enemyBullets);

        switch (this.phase) {
            case 1:
                this.updatePhase1(player, enemyBullets);
                break;
            case 2:
                this.updatePhase2(enemies);
                break;
            case 3:
                this.updatePhase3(player, enemyBullets);
                break;
        }

        // 1페이즈 -> 2페이즈 전환 검사
        if (this.phase === 1 && this.smallPlanes.every(p => !p.active)) {
            this.phase = 2;
            this.startPhase2(enemies);
        }
    }

    updatePhase1(player, enemyBullets) {
        this.smallPlanes.forEach(plane => {
            if (!plane.active) return;

            // Firing logic is now separated from position updates
            plane.fireTimer--;
            if (plane.fireTimer <= 0) {
                            // Fires towards the player
                            const angleToPlayer = atan2(player.y - plane.y, player.x - this.x);
                            const vx = this.smallPlaneBulletSpeed * cos(angleToPlayer);
                            const vy = this.smallPlaneBulletSpeed * sin(angleToPlayer);
                            enemyBullets.push(new Bullet(plane.x, plane.y, 'enemy', this.ASSETS.bossBulletImage, createVector(vx, vy), null, this.smallPlaneBulletSpeed));
                            plane.fireTimer = this.smallPlaneFireRate;            }
        });
    }

    startPhase2(enemies) {
        this.shieldActive = true;
        this.health = this.shieldHealth; // 본체 체력이 보호막 체력이 됨
        this.maxHealth = this.shieldHealth; // 체력바를 위한 최대 체력 업데이트
        this.enemySpawnTimer = this.enemySpawnInterval; // 즉시 적 생성 시작
        this.spawnPhase2Enemies(enemies);
    }

    updatePhase2(enemies) {
        if (!this.shieldActive) return;

        this.enemySpawnTimer--;
        if (this.enemySpawnTimer <= 0) {
            this.spawnPhase2Enemies(enemies); // 타이머 종료 시 적 생성
            this.enemySpawnTimer = this.enemySpawnInterval;
        }
    }

    spawnPhase2Enemies(enemies) {
        const allEnemyTypes = Object.keys(ENEMY_STATS);
        const namedEnemyTypes = allEnemyTypes.filter(type => type.includes('Named'));

        // 네임드 적 2기 생성
        for (let i = 0; i < 2; i++) {
            if (namedEnemyTypes.length > 0) {
                const randomType = namedEnemyTypes[Math.floor(Math.random() * namedEnemyTypes.length)];
                const xPos = Math.random() * width;
                const yPos = 0;
                enemies.push(new Enemy(xPos, yPos, randomType, this.ASSETS));
            }
        }
    }

    startPhase3() {
        this.health = BOSS_STATS.OMEGA_SYSTEM.HEALTH; // 3페이즈를 위해 본체 체력 전체 회복
        this.maxHealth = BOSS_STATS.OMEGA_SYSTEM.HEALTH; // 체력바를 위한 최대 체력 업데이트
        this.laserState = 'IDLE';
        this.laserTimer = 0; // 즉시 첫 레이저 발사 시작
    }

    updatePhase3(player, enemyBullets) {
        // 본체 다방향 공격
        if (frameCount % this.mainBodyFireRate === 0) {
            const randomOffset = random(-PI / 12, PI / 12); // -15도에서 +15도 사이의 무작위 오프셋
            for (let i = 0; i < 5; i++) {
                const angle = map(i, 0, 4, -PI / 6 + randomOffset, PI / 6 + randomOffset); // 무작위 오프셋으로 30도에 걸쳐 분산
                const vx = this.mainBodyBulletSpeed * sin(angle);
                const vy = this.mainBodyBulletSpeed * cos(angle);
                enemyBullets.push(new Bullet(this.x, this.y + this.height / 2, 'enemy', this.ASSETS.bossBulletImage, createVector(vx, vy), null, this.mainBodyBulletSpeed));
            }
        }

        // 레이저 공격 상태 머신
        switch (this.laserState) {
            case 'IDLE':
                this.laserTimer--;
                if (this.laserTimer <= 0) {
                    this.laserState = 'WARNING';
                    this.laserTimer = this.laserWarningDuration;
                    this.laserTargetY = player.y;
                    this.createLaserSegment(player);
                }
                break;
            case 'WARNING':
                this.laserTimer--;
                if (this.laserTimer <= 0) {
                    this.laserState = 'FIRING';
                    this.laserTimer = this.laserDuration;
                }
                break;
            case 'FIRING':
                this.laserTimer--;
                this.handleLaserCollision(player);
                if (this.laserTimer <= 0) {
                    this.laserState = 'IDLE';
                    this.laserTimer = this.laserInterval;
                }
                break;
        }
    }

    handleLaserCollision(player) {
        const laserY = this.laserTargetY;
        const laserHeight = 40; // 레이저 높이

        // 플레이어와 레이저 사각형 간의 충돌을 정확히 확인
        if (Math.abs(player.y - laserY) < player.width / 2 + laserHeight / 2) {
            // 플레이어가 레이저의 공격 범위(틈 외부)에 있는지 확인
            if (player.x < this.laserGapStart || player.x > this.laserGapEnd) {
                if (!player.isInvincible) {
                    player.takeDamage();
                }
            }
        }
    }

    updateBurstAttacks(enemyBullets) {
        for (let i = this.burstAttacks.length - 1; i >= 0; i--) {
            const attack = this.burstAttacks[i];
            attack.timer--;

            if (attack.timer <= 0) {
                // 10방향으로 파열 공격 1회 발사
                for (let j = 0; j < 10; j++) {
                    const angle = (TWO_PI / 10) * j;
                    const vx = 4 * cos(angle); // 속도 4
                    const vy = 4 * sin(angle);
                    enemyBullets.push(new Bullet(attack.x, attack.y, 'enemy', this.ASSETS.bossBulletImage, createVector(vx, vy), null, 4));
                }

                attack.burstsLeft--;
                if (attack.burstsLeft <= 0) {
                    this.burstAttacks.splice(i, 1); // 공격 종료, 목록에서 제거
                } else {
                    attack.timer = this.burstDelay; // 다음 파열을 위해 타이머 리셋
                }
            }
        }
    }

    createLaserSegment(player) {
        // 레이저의 안전한 틈(gap) 결정
        const gapWidth = player.width * 3.75; // 플레이어보다 3.75배 넓은 틈 생성
        const gapCenter = random(gapWidth / 2 + 20, width - (gapWidth / 2 + 20)); // 틈이 화면 안에 완전히 생성되도록 보장

        this.laserGapStart = gapCenter - gapWidth / 2;
        this.laserGapEnd = gapCenter + gapWidth / 2;
    }

    takeDamage(amount) {
        if (this.isDefeated) return;

        this.health -= amount;

        if (this.health <= 0) {
            if (this.phase === 3) {
                this.health = 0;
                this.isDefeated = true;
                this.ASSETS.sounds.enemyExplosion.play();
                // 참고: 게임 오버/클리어 조건은 GameScene에서 처리
            } else if (this.phase === 2) {
                // 보호막 파괴, 즉시 3페이즈로 전환
                this.ASSETS.sounds.enemyExplosion.play();
                this.shieldActive = false;
                this.phase = 3;
                this.startPhase3();
            }
        }
    }

    isHit(bullet, enemyBullets, player) {
        let hit = false;
        if (this.isDefeated) return false;

        switch (this.phase) {
            case 1:
                for (let i = this.smallPlanes.length - 1; i >= 0; i--) {
                    const plane = this.smallPlanes[i];
                    // 원-원 충돌 감지를 위해 dist 사용
                    if (plane.active && dist(bullet.x, bullet.y, plane.x, plane.y) < (bullet.size / 2 + plane.size / 2)) {
                        plane.health -= bullet.damage;
                        if (plane.health <= 0) {
                            plane.active = false;
                            this.ASSETS.sounds.enemyExplosion.play();
                            // 소형 비행기 파괴 시 파열 공격 요청 추가
                            this.burstAttacks.push({
                                burstsLeft: 4,
                                timer: 0,
                                x: plane.x,
                                y: plane.y
                            });
                        }
                        hit = true;
                        break;
                    }
                }
                break;
            case 2:
                // 원-원 충돌 감지를 위해 dist 사용
                if (this.shieldActive && dist(bullet.x, bullet.y, this.x, this.y) < (bullet.size / 2 + this.size / 2)) {
                    this.takeDamage(bullet.damage);
                    hit = true;
                }
                break;
            case 3:
                // 원-원 충돌 감지를 위해 dist 사용
                if (dist(bullet.x, bullet.y, this.x, this.y) < (bullet.size / 2 + this.size / 2)) {
                    this.takeDamage(bullet.damage);
                    hit = true;
                }
                break;
        }
        return hit;
    }

    draw() {
        if (this.isDefeated) return;

        // 본체 그리기
        imageMode(CENTER);
        image(this.ASSETS.omegaSystemBossImage, this.x, this.y, this.width, this.height);

        // 페이즈별 요소 그리기
        switch (this.phase) {
            case 1:
                this.drawPhase1();
                break;
            case 2:
                this.drawPhase2();
                break;
            case 3:
                this.drawPhase3();
                break;
        }

        push(); // 텍스트 스타일 분리
        fill(255);
        textSize(16);
        textAlign(CENTER, CENTER);
        // 1페이즈의 경우, 활성화된 소형 비행기들의 체력을 합산하여 표시
        let currentDisplayHealth = this.health;
        let maxDisplayHealth = this.maxHealth;
        if (this.phase === 1) {
            currentDisplayHealth = this.smallPlanes.reduce((sum, plane) => sum + (plane.active ? plane.health : 0), 0);
            maxDisplayHealth = this.numSmallPlanes * this.smallPlaneHealth;
            text(`Phase 1: ${floor(currentDisplayHealth)} / ${maxDisplayHealth}`, this.x, this.y);
        } else if (this.phase === 2) {
            text(`Shield: ${floor(currentDisplayHealth)} / ${maxDisplayHealth}`, this.x, this.y);
        } else { // Phase 3
            text(`Health: ${floor(currentDisplayHealth)} / ${maxDisplayHealth}`, this.x, this.y);
        }
        pop(); // 이전 스타일 복원
    }

    drawPhase1() {
        this.smallPlanes.forEach(plane => {
            if (!plane.active) return;
            imageMode(CENTER);
            image(this.ASSETS.omegaSystemSmallPlaneImage, plane.x, plane.y, plane.size, plane.size);
        });
    }

    drawPhase2() {
        if (this.shieldActive) {
            noFill();
            stroke(0, 0, 255, 150);
            strokeWeight(5);
            ellipse(this.x, this.y, this.size * 1.2, this.size * 1.2); // 보호막에 this.size 사용
            noStroke();
        }
    }

    drawPhase3() {
        // 레이저 그리기를 위해 좌표계를 CORNER 모드로 전환
        rectMode(CORNER); 
        if (this.laserState === 'WARNING') {
            const warningHeight = map(this.laserTimer, this.laserWarningDuration, 0, 80, 10);
            fill(255, 255, 0, 100);
            noStroke();
            // laserTargetY를 y축 중심으로 하는 사각형 그리기
            rect(0, this.laserTargetY - warningHeight / 2, this.laserGapStart, warningHeight);
            rect(this.laserGapEnd, this.laserTargetY - warningHeight / 2, width - this.laserGapEnd, warningHeight);
            
            imageMode(CENTER);
            image(this.ASSETS.omegaSystemLaserImage, 0, this.laserTargetY, 50, 50); // 왼쪽 끝에 고정
            image(this.ASSETS.omegaSystemLaserImage, width, this.laserTargetY, 50, 50); // 오른쪽 끝에 고정

        } else if (this.laserState === 'FIRING') {
            const laserHeight = 40; // 레이저 높이
            fill(255, 0, 0, 150);
            noStroke();
            // laserTargetY를 y축 중심으로 하는 사각형 그리기
            rect(0, this.laserTargetY - laserHeight / 2, this.laserGapStart, laserHeight);
            rect(this.laserGapEnd, this.laserTargetY - laserHeight / 2, width - this.laserGapEnd, laserHeight);
            
            imageMode(CENTER);
            image(this.ASSETS.omegaSystemLaserImage, 0, this.laserTargetY, 50, 50); // 왼쪽 끝에 고정
            image(this.ASSETS.omegaSystemLaserImage, width, this.laserTargetY, 50, 50); // 오른쪽 끝에 고정
        }
    }
}