class GameOverScene {
    constructor(sceneManager, ASSETS) {
        this.sceneManager = sceneManager;
        this.ASSETS = ASSETS; // Store ASSETS for consistency
    }

    draw() {
        background(this.ASSETS.colors.BG_DARK); // Added this
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(50);
        text('GAME OVER', width / 2, height / 2 - 50);
        
        fill(0);
        textSize(20);
        text('Press SPACE to Restart', width / 2, height / 2 + 20);
    }

    handleInput(keyCode) {
        if (keyCode === 32) { // SPACE
            this.sceneManager.goTo('start'); // 시작 씬으로 전환
        }
    }
}