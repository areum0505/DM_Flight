class GameClearScene {
    constructor(sceneManager, ASSETS) {
        this.sceneManager = sceneManager;
        this.ASSETS = ASSETS; // Store ASSETS for consistency
        this.credits = [
            'GAME CLEAR!',
            '',
            'Director: Gemini',
            'Lead Developer: Gemini',
            'Art Design: Gemini',
            'Sound Design: Gemini',
            'Special Thanks: User',
            '',
            '',
            'Press SPACE to return to title.'
        ];
        this.creditsY = height + 30;
        this.scrollSpeed = 1.5;
    }

    draw() {
        background(0); // Black background for credits
        fill(255);
        textAlign(CENTER, CENTER);
        
        for (let i = 0; i < this.credits.length; i++) {
            const yPos = this.creditsY + i * 40;
            if (i === 0) {
                textSize(50);
                fill(28, 227, 125);
            } else {
                textSize(24);
                fill(255);
            }
            text(this.credits[i], width / 2, yPos);
        }

        this.creditsY -= this.scrollSpeed;

        // Reset scene when credits are done
        if (this.creditsY < -this.credits.length * 40) {
            this.resetScene();
        }
    }

    handleInput(keyCode) {
        if (keyCode === 32) { // SPACE
            this.resetScene();
        }
    }

    resetScene() {
        // To ensure a fresh start, we can reinstantiate the game scene
        this.sceneManager.scenes.game = new GameScene(this.sceneManager, this.sceneManager.ASSETS); // Pass ASSETS here
        this.sceneManager.goTo('start'); // Go to start scene
        this.creditsY = height + 30; // Reset credits position for next time
    }
}
