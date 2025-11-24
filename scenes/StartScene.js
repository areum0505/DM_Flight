let sceneManager;

// 캔버스 크기
const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 640;

// 색상 정의
const COLOR_BG_DARK = '#1f283c'; // 내부 진한 배경색
const COLOR_NEON_BLUE = '#00f2ff'; // 외곽 네온 테두리

const COLOR_BLUE = '#4FA4F3'; 
const COLOR_PREVIEW_BG = '#2c3e50'; // 미리보기 영역 배경색
const COLOR_PREVIEW_BORDER = '#557a95'; // 미리보기 영역 테두리 색상
const COLOR_BLACK = '#000000';

// 버튼 색상
const COLOR_RED_BTN_BASE = '#e74c3c';
const COLOR_RED_BTN_TEXT = '#FFFFFF';
const COLOR_BLUE_BTN_BASE = '#3498db';
const COLOR_BLUE_BTN_TEXT = '#FFFFFF';
const COLOR_BUTTON_BORDER = '#2c3e50';

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  pixelDensity(1); 

  sceneManager = new SceneManager();
  sceneManager.add('start', new StartScene(sceneManager));
  sceneManager.add('game', new GameScene(sceneManager)); 
  sceneManager.add('tutorial', new TutorialScene(sceneManager)); 
  sceneManager.add('options', new OptionsScene(sceneManager)); 

  sceneManager.goTo('start');
  textAlign(CENTER, CENTER);
  textSize(16);
  noSmooth();
}

function draw() {
  sceneManager.draw();
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

class SceneManager {
    constructor() {
        this.scenes = {};
        this.currentScene = null;
    }

    add(sceneName, scene) {
        this.scenes[sceneName] = scene;
    }

    goTo(sceneName) {
        if (this.scenes[sceneName]) {
            this.currentScene = this.scenes[sceneName];
            cursor(ARROW); 
            if (this.currentScene.onEnter) {
              this.currentScene.onEnter();
            }
        } else {
            console.error(`씬 '${sceneName}'을(를) 찾을 수 없습니다.`);
        }
    }

    draw() {
        if (this.currentScene) {
            this.currentScene.draw();
        }
    }

    handleInput(keyCode) {
        if (this.currentScene && this.currentScene.handleInput) {
            this.currentScene.handleInput(keyCode);
        }
    }

    handleMousePressed() {
        if (this.currentScene && this.currentScene.handleMousePressed) {
            this.currentScene.handleMousePressed();
        }
    }

    handleMouseMoved() {
        if (this.currentScene && this.currentScene.handleMouseMoved) {
            this.currentScene.handleMouseMoved();
        }
    }
}

/*Start Scene */
class StartScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    
    // 버튼 설정
    const btnW = 140; // 버튼 너비 (글자 길이에 맞춰 약간 늘림)
    const btnH = 50; 
    const btnGap = 15;

    this.buttons = {
      start: {
        // 화면 중앙 하단 배치
        x: (CANVAS_WIDTH - btnW) / 2,
        y: 400, w: btnW, h: btnH,
        label: 'GAME START',
        baseColor: COLOR_RED_BTN_BASE, textColor: COLOR_RED_BTN_TEXT,
        targetScene: 'game'
      },
      tutorial: {
        // GAME START 버튼 아래
        x: (CANVAS_WIDTH - btnW) / 2,
        y: 400 + btnH + btnGap, w: btnW, h: btnH,
        label: 'TUTORIAL',
        baseColor: COLOR_BLUE_BTN_BASE, textColor: COLOR_BLUE_BTN_TEXT,
        targetScene: 'tutorial'
      },
      options: {
        // TUTORIAL 버튼 아래
        x: (CANVAS_WIDTH - btnW) / 2, 
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
    // 1. 배경 및 테두리
    background(COLOR_BG_DARK);
    stroke(COLOR_NEON_BLUE);
    strokeWeight(4);
    noFill();
    rect(2, 2, width - 4, height - 4); 

    // 2. 타이틀 (숭실대 로고 색상 느낌)
    noStroke();
    fill(COLOR_BLUE); 
    textStyle(BOLD);
    textSize(38); 
    text('DM FLIGHT', width / 2, 80); 

    // 3. 중앙 이미지 들어갈 공간 (Placeholder)
    fill(COLOR_PREVIEW_BG);
    stroke(COLOR_PREVIEW_BORDER);
    strokeWeight(2);
    rectMode(CENTER); 
    // 위치와 크기 조정
    rect(width / 2, 240, 300, 180, 5); 
    
    // 공간 표시 텍스트
    noStroke();
    fill(150);
    textStyle(NORMAL);
    textSize(14);
    text('[ Image Placeholder ]', width / 2, 240);

    rectMode(CORNER); 

    // 5. 버튼들 그리기
    this._drawButton(this.buttons.start);
    this._drawButton(this.buttons.tutorial);
    this._drawButton(this.buttons.options);
  }

  handleInput(keyCode) {
    if (keyCode === 32) { // SPACE
      this.sceneManager.goTo('game');
    }
  }

  /* --- Helper Methods for UI Interaction --- */
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
    textStyle(BOLD); // 글씨 굵게
    textSize(14);    // 글씨 크기 14
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

/* --- 기타 씬 클래스 --- */
class GameScene {
  constructor(sceneManager) { this.sceneManager = sceneManager; }
  onEnter() { console.log("GameScene 진입!"); }
  draw() {
    background(0, 50, 0); fill(255); textStyle(NORMAL); textSize(30); text('게임 플레이 중...', width/2, height/2);
    textSize(16); text('Press ESC to go back to Menu', width / 2, height / 2 + 40);
  }
  handleInput(keyCode) { if (keyCode === ESCAPE) { this.sceneManager.goTo('start'); } }
}

class TutorialScene {
  constructor(sceneManager) { this.sceneManager = sceneManager; }
  onEnter() { console.log("TutorialScene 진입!"); }
  draw() {
    background(0, 0, 50); fill(255); textStyle(NORMAL); textSize(30); text('튜토리얼 화면', width/2, height/2);
    textSize(16); text('Press ESC to go back to Menu', width / 2, height / 2 + 40);
  }
  handleInput(keyCode) { if (keyCode === ESCAPE) { this.sceneManager.goTo('start'); } }
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