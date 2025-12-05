class StartScene {
  constructor(sceneManager, ASSETS) {
    this.sceneManager = sceneManager;
    this.ASSETS = ASSETS;

    const btnW = 180; 
    const btnH = 60; 
    const btnGap = 20;

    this.buttons = {
      start: {
        x: (CONFIG.CANVAS.WIDTH - btnW) / 2,
        y: 450, w: btnW, h: btnH,
        label: 'GAME START',
        baseColor: this.ASSETS.colors.RED_BTN_BASE, textColor: this.ASSETS.colors.RED_BTN_TEXT,
        targetScene: 'game'
      },
      tutorial: {
        x: (CONFIG.CANVAS.WIDTH - btnW) / 2,
        y: 450 + btnH + btnGap, w: btnW, h: btnH,
        label: 'TUTORIAL',
        baseColor: this.ASSETS.colors.BLUE_BTN_BASE, textColor: this.ASSETS.colors.BLUE_BTN_TEXT,
        targetScene: 'tutorial'
      },
      options: {
        x: (CONFIG.CANVAS.WIDTH - btnW) / 2, 
        y: 450 + (btnH + btnGap) * 2, w: btnW, h: btnH,
        label: 'SETTINGS',
        baseColor: this.ASSETS.colors.BLUE_BTN_BASE, textColor: this.ASSETS.colors.BLUE_BTN_TEXT,
        targetScene: 'options' 
      }
    };
  }

  onEnter() {
    cursor(ARROW);
  }

  draw() {
    textAlign(CENTER, CENTER);
    
    background(this.ASSETS.colors.BG_DARK);
    stroke(this.ASSETS.colors.NEON_BLUE);
    strokeWeight(4);
    noFill();
    rect(2, 2, width - 4, height - 4); 

    imageMode(CENTER);
    image(this.ASSETS.backgrounds.gameTitle, width / 2, 90);

    image(this.ASSETS.backgrounds.main, width / 2, 270, 350, 210);
    rectMode(CORNER); 

    this._drawButton(this.buttons.start);
    this._drawButton(this.buttons.tutorial);
    this._drawButton(this.buttons.options);


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

  handleInput(keyCode) {
    if (keyCode === 32) { // SPACE
      this.sceneManager.goTo('game');
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
      currentFillColor = lerpColor(color(btn.baseColor), color(this.ASSETS.colors.BLACK), 0.2); 
    }
    
    fill(currentFillColor);
    stroke(this.ASSETS.colors.BUTTON_BORDER); 
    strokeWeight(2);
    rect(btn.x, btn.y, btn.w, btn.h, 5); 

    fill(btn.textColor);
    noStroke();
    textStyle(BOLD); 
    textSize(18);    
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