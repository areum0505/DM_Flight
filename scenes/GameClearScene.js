class GameClearScene {
    constructor(sceneManager, ASSETS) {
        this.sceneManager = sceneManager;
        this.ASSETS = ASSETS;
        this.credits = []; // Initially empty, populated in onEnter
        this.creditsY = height + 30;
        this.scrollSpeed = 1.5;
        this.returnToTitleText = 'Press SPACE to return to title.';
        this.renderedCreditsHeight = 0; // To keep track of the total height of rendered credits
    }

    onEnter(gameStats) {
        // Reset credits array and scroll position
        this.credits = [];
        this.creditsY = height + 30;
        this.renderedCreditsHeight = 0;

        // 1. Add game stats if available
        if (gameStats) {
            this.credits.push(
                'Game Clear!',
                '--- Result ---',
                //`Score: ${gameStats.score}`,
                `Coins: ${gameStats.coins}`,
                `Enemy Kill: ${gameStats.enemiesDefeated}`,
                `Play Time: ${gameStats.playTime}`
            );
        }

        // 2. Add the main credits content
        this.credits.push(
            '숭실대학교 디지털미디어학과 학생의 결과물입니다.',
            '20251672 김아름',
            '20250000 백경민',
            '20250000 이재영',
            '',
            '--- 기획 ---',
            '게임 시작 및 튜토리얼 화면 : 이재영',
            '게임 플레이 흐름 및 밸런싱 : 백경민',
            '게임 종료 화면 : 김아름',
            '몹 유형별 능력치 기획 : 백경민',
            '체력 및 아이템 시스템 기획 : 백경민',
            '사운드/연출 포인트 기획 : 이재영',
            '',
            '--- 개발 ---',
            '설계 및 기본적인 기능 개발 : 김아름',
            '게임 시작 화면 구현 : 이재영',
            '튜토리얼 화면 구현 : 이재영',
            '일반몹 설계 및 스폰 로직 구현 : 백경민',
            '보스몹 구현 : 김아름',
            'QA 및 밸런스 조정 : 백경민',
            '',
            '--- 디자인 ---',
            '배경 이미지 : 백경민',
            '일반몹 및 보스몹 : 백경민',
            '플레이어 전투기 : 이재영',
            '기타 UI 및 디자인 보충 : 백경민',
            '',
            '--- AI 협업 내용 ---',
            '해당 게임은 AI의 도움을 받아 제작되었습니다.',
            '코드 내 AI 사용 비율: 70%',
            '디자인 : 70%',
            '일반몹 및 보스몹 이미지 생성',
            '사운드 : 70%',
            '효과음 생성',
            '',
            '--- 저작권 ---',
            '시작화면 배경 음악 : ',
            '초반부 배경 음악 : ',
            '중간 보스 1 배경 음악 : ',
            '중반부 1 배경 음악 : ',
            '중간 보스 2 배경 음악 : ',
            '중반부 2 배경 음악 : ',
            '후반 보스 1 배경 음악 : ',
            '후반부 배경 음악 : ',
            '후반 보스 2 배경 음악 : ',
            '게임 오버 배경 음악 : ',
            '게임 클리어 배경 음악 : ',
            '몹 처치 사운드 : ',
            '아이템 획득 사운드 : ',
            '몹 처치 사운드 : ',
            '스테이지 클리어 사운드 : ',
            '',
            '--- 개발 세부 정보 ---',
            'Foundation: p5.js',
            'Structure: preload(), setup(), draw()',
            'Rendering: createCanvas(), noSmooth(), strokeWeight(), drawingContext',
            'Shape: rect(), ellipse(), line(), beginShape(), vertex(), endShape(), rectMode()',
            'Color: background(), fill(), stroke(), noStroke(), color(), tint(), noTint()',
            'Typography: text(), textSize(), textAlign()',
            'Image: image(), loadImage(), imageMode()',
            'Transform: push(), pop(), translate()',
            'Environment: width, height, frameCount, pixelDensity(), cursor()',
            'Math: random(), constrain(), map(), max(), sin(), atan2(), p5.Vector',
            'IO: loadSound(), sound.play(), keyCode, mouseX, mouseY',
            'Events: keyPressed(), keyIsDown(), mouseIsPressed, mousePressed(), mouseMoved(), userStartAudio()',
            'DOM: 해당 없음',
            'Data: 해당 없음',
            '3D: 해당 없음',
            'Constants: CLOSE, PI, ARROW',
        );
    }

    draw() {
        background(0); // Black background
        textAlign(CENTER, CENTER);
        
        const safeZoneY = height - 70; // Define a safe area at the bottom, giving more margin
        let currentY = this.creditsY; // Start drawing from the current scroll position
        this.renderedCreditsHeight = 0; // Reset for each draw cycle

        for (let i = 0; i < this.credits.length; i++) {
            let size = 24;
            let clr = color(255); // Default to white
            let lineHeight = 30; // Default line height

            if (this.credits[i] === 'Game Clear!') {
                size = 50;
                clr = color(28, 227, 125); // Green
                lineHeight = 60;
            } else if (this.credits[i].startsWith('---')) {
                size = 28;
                clr = color(this.ASSETS.colors.NEON_BLUE);
                lineHeight = 36;
            }

            textSize(size);
            fill(clr);

            const textMaxWidth = width * 0.7; // 70% of canvas width for text
            const newY = this.drawWrappedText(this.credits[i], width / 2, currentY, textMaxWidth, lineHeight, safeZoneY);
            
            this.renderedCreditsHeight += (newY - currentY); // Add the height taken by this credit block
            currentY = newY; // Update currentY for the next credit item
        }

        this.creditsY -= this.scrollSpeed;

        // Reset scene when credits have scrolled past the top
        if (this.creditsY < -this.renderedCreditsHeight) {
            this.resetScene();
        }

        // Draw fixed text
        textSize(22);
        fill(255, 0, 0);
        text(this.returnToTitleText, width / 2, height - 40);
    }

    // Helper function to draw wrapped text and respect a safe zone
    drawWrappedText(txt, x, y, maxWidth, lineHeight, safeZoneY) {
        let words = txt.split(' ');
        let line = '';
        let currentY = y;

        // Do not process text that is already completely out of view (top)
        // or completely in the safe zone (bottom)
        if (y > safeZoneY) {
            return y;
        }

        for (let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            let testWidth = textWidth(testLine);
            if (testWidth > maxWidth && n > 0) {
                // Only draw the line if it's above the safe zone
                if (currentY < safeZoneY) {
                    text(line, x, currentY);
                }
                line = words[n] + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        
        // Draw the last line if it's above the safe zone
        if (currentY < safeZoneY) {
            text(line, x, currentY);
        }
        
        return currentY + lineHeight; // Return the y position for the next block
    }

    handleInput(keyCode) {
        if (keyCode === 32) { // SPACE
            this.resetScene();
        }
    }

    resetScene() {
        this.sceneManager.goTo('start');
    }
}
