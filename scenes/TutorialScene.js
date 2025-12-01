

class TutorialScene {
  constructor(sceneManager, ASSETS) {
    this.sceneManager = sceneManager;
    this.ASSETS = ASSETS;
    
    this.playerX = CONFIG.CANVAS.WIDTH / 2;
    this.playerY = CONFIG.CANVAS.HEIGHT * 0.75;
    this.speed = 5;

    this.bullets = [];
    this.enemies = [];
    this.lastShotTime = 0;
    this.spawnEnemies(); // Moved here
    this.shootDelay = 200; 
  }

  onEnter() {
    this.playerX = CONFIG.CANVAS.WIDTH / 2;
    this.bullets = [];
    this.enemies = []; // Ensure enemies are cleared
    this.lastShotTime = 0; // Reset shot timer
    this.spawnEnemies(); // Keep here for re-entering
    cursor(ARROW);
  }

  spawnEnemies() {
    this.enemies = [];
    for (let i = 0; i < 3; i++) {
        this.enemies.push({
            x: CONFIG.CANVAS.WIDTH * 0.25 * (i + 1),
            y: 150,
            size: 40,
            active: true
        });
    }
  }

  draw() {
    background(this.ASSETS.colors.BG_DARK);
    
    // 테두리
    stroke(this.ASSETS.colors.NEON_BLUE);
    strokeWeight(4);
    noFill();
    rect(2, 2, width - 4, height - 4);

    // 상단 제목
    noStroke();
    fill(this.ASSETS.colors.BLUE); 
    textStyle(BOLD);
    textSize(32);
    text('TUTORIAL', width / 2, 60);

    // 설명 텍스트
    fill(this.ASSETS.colors.WHITE);
    textStyle(NORMAL);
    textSize(16);
    text("방향키[◀ ▶]: 이동", width / 2, 100);
    text("공격: 자동 발사", width / 2, 125);

    // 1. 이동
    if (keyIsDown(LEFT_ARROW)) {
      this.playerX -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.playerX += this.speed;
    }
    this.playerX = constrain(this.playerX, 30, width - 30);

    // 2. 자동 발사
    if (millis() - this.lastShotTime > this.shootDelay) {
        this.shoot();
        this.lastShotTime = millis();
    }

    // 3. 총알
    for (let i = this.bullets.length - 1; i >= 0; i--) {
        let b = this.bullets[i];
        b.y -= 10; 
        fill(this.ASSETS.colors.BULLET);
        noStroke();
        rect(b.x - 2, b.y, 4, 10);
        
        if (b.y < 0) {
            this.bullets.splice(i, 1);
        }
    }

    // 4. 적 업데이트 및 충돌
    let activeEnemiesCount = 0;
    for (let i = 0; i < this.enemies.length; i++) {
        let e = this.enemies[i];
        if (!e.active) continue;
        
        activeEnemiesCount++;

        fill(this.ASSETS.colors.ENEMY);
        stroke(0);
        strokeWeight(1);
        rectMode(CENTER);
        rect(e.x, e.y, e.size, e.size, 5);
        rectMode(CORNER);

        // 충돌 체크
        for (let j = this.bullets.length - 1; j >= 0; j--) {
            let b = this.bullets[j];
            if (dist(b.x, b.y, e.x, e.y) < e.size / 2 + 5) {
                e.active = false; 
                this.bullets.splice(j, 1); 
                break;
            }
        }
    }
    // 5. 완료 메시지
    if (activeEnemiesCount === 0) {
        fill(this.ASSETS.colors.WHITE);
        textStyle(BOLD);
        textSize(24);
        text("MISSION COMPLETE!", width / 2, height / 2);
        
        textStyle(NORMAL);
        textSize(14);
        if (frameCount % 60 < 40) {
            text("Press [R] to Reset Enemies", width / 2, height / 2 + 40);
        }
    }

    // 6. 플레이어
    noStroke();
    fill(this.ASSETS.colors.BLUE);
    triangle(
      this.playerX, this.playerY - 20, 
      this.playerX - 15, this.playerY + 20, 
      this.playerX + 15, this.playerY + 20
    );
    fill('#e67e22');
    rect(this.playerX - 5, this.playerY + 20, 4, 10);
    rect(this.playerX + 1, this.playerY + 20, 4, 10);

    // 하단 안내
    fill(this.ASSETS.colors.TEXT_GRAY);
    textStyle(NORMAL);
    textSize(14);
    text("Press [ESC] to Menu", width / 2, height - 30);
  }

  shoot() {
      this.bullets.push({
          x: this.playerX,
          y: this.playerY - 20
      });
  }

  handleInput(keyCode) {
    if (keyCode === ESCAPE) {
      this.sceneManager.goTo('start'); 
    } else if (keyCode === 82) { // R Key
        this.spawnEnemies(); 
    }
  }
}
