
// 색상 정의 (전역 사용)
const COLOR_BG_DARK = '#1f283c'; 
const COLOR_NEON_BLUE = '#00f2ff'; 
const COLOR_BLUE = '#4FA4F3'; 
const COLOR_SSU_BLUE = '#4FA4F3'; // Tutorial.js
const COLOR_PREVIEW_BG = '#2c3e50'; 
const COLOR_PREVIEW_BORDER = '#557a95'; 
const COLOR_BLACK = '#000000';
const COLOR_WHITE = '#FFFFFF';
const COLOR_TEXT_GRAY = '#bdc3c7';

// 게임 오브젝트 색상
const COLOR_BULLET = '#f1c40f'; 
const COLOR_ENEMY = '#e74c3c'; 

// 버튼 색상
const COLOR_RED_BTN_BASE = '#e74c3c';
const COLOR_RED_BTN_TEXT = '#FFFFFF';
const COLOR_BLUE_BTN_BASE = '#3498db';
const COLOR_BLUE_BTN_TEXT = '#FFFFFF';
const COLOR_BUTTON_BORDER = '#2c3e50';

function setup() {
  pixelDensity(1); 
  textSize(16);
  noSmooth();
}

function keyPressed() {
  sceneManager.handleInput(keyCode);
}

function mousePressed() {
  if (sceneManager.currentScene && sceneManager.currentScene.handleMousePressed) {
    sceneManager.currentScene.handleMousePressed();
  }
}

function mouseMoved() {
  if (sceneManager.currentScene && sceneManager.currentScene.handleMouseMoved) {
    sceneManager.currentScene.handleMouseMoved();
  } else {
    cursor(ARROW);
  }
}

/* ==========================================================================
   [PART 2] START SCENE (메인 화면)
   - 나중에 'StartScene.js'로 분리하세요.
   ========================================================================== */

class StartScene {
  constructor(sceneManager, ASSETS) {
    this.sceneManager = sceneManager;

    const btnW = 140; 
    const btnH = 50; 
    const btnGap = 15;

    this.buttons = {
      start: {
        x: (CONFIG.CANVAS.WIDTH - btnW) / 2,
        y: 400, w: btnW, h: btnH,
        label: 'GAME START',
        baseColor: COLOR_RED_BTN_BASE, textColor: COLOR_RED_BTN_TEXT,
        targetScene: 'game'
      },
      tutorial: {
        x: (CONFIG.CANVAS.WIDTH - btnW) / 2,
        y: 400 + btnH + btnGap, w: btnW, h: btnH,
        label: 'TUTORIAL',
        baseColor: COLOR_BLUE_BTN_BASE, textColor: COLOR_BLUE_BTN_TEXT,
        targetScene: 'tutorial'
      },
      options: {
        x: (CONFIG.CANVAS.WIDTH - btnW) / 2, 
        y: 400 + (btnH + btnGap) * 2, w: btnW, h: btnH,
        label: 'SETTINGS',
        baseColor: COLOR_BLUE_BTN_BASE, textColor: COLOR_BLUE_BTN_TEXT,
        targetScene: 'options' 
      }
    };
  }

  onEnter() {
    cursor(ARROW);
  }

  draw() {
    textAlign(CENTER, CENTER);
    
    background(COLOR_BG_DARK);
    stroke(COLOR_NEON_BLUE);
    strokeWeight(4);
    noFill();
    rect(2, 2, width - 4, height - 4); 

    noStroke();
    fill(COLOR_BLUE); 
    textStyle(BOLD);
    textSize(38); 
    text('DM FLIGHT', width / 2, 80); 

    fill(COLOR_PREVIEW_BG);
    stroke(COLOR_PREVIEW_BORDER);
    strokeWeight(2);
    rectMode(CENTER); 
    rect(width / 2, 240, 300, 180, 5); 
    
    noStroke();
    fill(150);
    textStyle(NORMAL);
    textSize(14);
    text('[ Image Placeholder ]', width / 2, 240);

    rectMode(CORNER); 

    this._drawButton(this.buttons.start);
    this._drawButton(this.buttons.tutorial);
    this._drawButton(this.buttons.options);

    this.ASSETS = ASSETS; 
  }


  handleMousePressed() {
    for (let key in this.buttons) {
      const btn = this.buttons[key];
      if (this._isMouseOver(btn)) {
        if (btn.targetScene) {
          this.sceneManager.goTo(btn.targetScene);
        } else {
          alert(`'${btn.label}' 클릭!`);
        }
        break;
      }
    }
  }

  handleMouseMoved() {
    let cursorChanged = false;
    for (let key in this.buttons) {
      const btn = this.buttons[key];
      if (this._isMouseOver(btn)) {
        cursor(HAND);
        cursorChanged = true;
        break;
      }
    }
    if (!cursorChanged) {
      cursor(ARROW);
    }
  }

  _drawButton(btn) {
    let currentFillColor = btn.baseColor;
    if (this._isMouseOver(btn)) {
      currentFillColor = lerpColor(color(btn.baseColor), color(COLOR_BLACK), 0.2); 
    }
    
    fill(currentFillColor);
    stroke(COLOR_BUTTON_BORDER); 
    strokeWeight(2);
    rect(btn.x, btn.y, btn.w, btn.h, 5); 

    fill(btn.textColor);
    noStroke();
    textStyle(BOLD); 
    textSize(14);    
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  }

  _isMouseOver(btn) {
    return (
      mouseX > btn.x &&
      mouseX < btn.x + btn.w &&
      mouseY > btn.y &&
      mouseY < btn.y + btn.h
    );
  }
}


/* ==========================================================================
   [PART 3] TUTORIAL SCENE (튜토리얼 기능 구현)
   - 나중에 'Tutorial.js'로 분리하세요.
   ========================================================================== */

class TutorialScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    
    this.playerX = CONFIG.CANVAS.WIDTH / 2;
    this.playerY = CANVAS_HEIGHT * 0.75;
    this.speed = 5;

    this.bullets = [];
    this.enemies = [];
    this.lastShotTime = 0;
    this.shootDelay = 200; 
  }

  onEnter() {
    console.log("TutorialScene 진입!");
    this.playerX = CONFIG.CANVAS.WIDTH / 2;
    this.bullets = []; 
    this.spawnEnemies(); 
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
    background(COLOR_BG_DARK);
    
    // 테두리
    stroke(COLOR_NEON_BLUE);
    strokeWeight(4);
    noFill();
    rect(2, 2, width - 4, height - 4);

    // 상단 제목
    noStroke();
    fill(COLOR_BLUE); 
    textStyle(BOLD);
    textSize(32);
    text('TUTORIAL', width / 2, 60);

    // 설명 텍스트
    fill(COLOR_WHITE);
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
        fill(COLOR_BULLET);
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

        fill(COLOR_ENEMY);
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
        fill(COLOR_WHITE);
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
    fill(COLOR_BLUE);
    triangle(
      this.playerX, this.playerY - 20, 
      this.playerX - 15, this.playerY + 20, 
      this.playerX + 15, this.playerY + 20
    );
    fill('#e67e22');
    rect(this.playerX - 5, this.playerY + 20, 4, 10);
    rect(this.playerX + 1, this.playerY + 20, 4, 10);

    // 하단 안내
    fill(COLOR_TEXT_GRAY);
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

class OptionsScene {
  constructor(sceneManager) { this.sceneManager = sceneManager; }
  onEnter() { console.log("OptionsScene 진입!"); }
  draw() {
    background(50, 0, 0); fill(255); textStyle(NORMAL); textSize(30); text('설정 화면', width/2, height/2);
    textSize(16); text('Press ESC to go back to Menu', width / 2, height / 2 + 40);
  }
  handleInput(keyCode) { if (keyCode === ESCAPE) { this.sceneManager.goTo('start'); } }
}