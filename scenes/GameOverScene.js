class GameOverScene {
    constructor(sceneManager, ASSETS) {
        this.sceneManager = sceneManager;
        this.ASSETS = ASSETS; // Store ASSETS for consistency
    }

    draw() {
        background(this.ASSETS.colors.BG_DARK); // 배경색
        image(this.ASSETS.logo, 20, 20, 50, 50); // 좌측 상단에 로고 표시
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(50);
        text('GAME OVER', width / 2, height / 2 - 50);
        
        fill(255);
        textSize(20);
        text('Press SPACE to return to title.', width / 2, height / 2 + 20);
    }

    handleInput(keyCode) {
        if (keyCode === 32) { // SPACE
            this.sceneManager.goTo('start'); // 시작 씬으로 전환
        }
    }
}