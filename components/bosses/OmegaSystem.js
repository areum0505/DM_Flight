

class OmegaSystem extends Boss {
    constructor(game, x, y) {
        const stats = BOSS_STATS.OMEGA_SYSTEM;
        super(x, y, stats.HEALTH, stats.SIZE); // Boss constructor expects health and size

        this.game = game; // Re-assign this.game
        this.width = stats.WIDTH; // Keep width/height for rectangle drawing and laser
        this.height = stats.HEIGHT; // Keep width/height for rectangle drawing and laser
        this.color = 'purple';
        this.phase = 1;
        this.isDefeated = false;

        // Burst attack properties
        this.burstAttacks = [];
        this.burstDelay = 10; // 10 frames delay between bursts

        // Phase 1: Small planes
        this.smallPlanes = [];
        this.numSmallPlanes = 5;
        this.smallPlaneHealth = stats.SMALL_PLANE_HEALTH; // Use config value
        this.smallPlaneSpeed = 2;
        this.smallPlaneFireRate = 60; // frames
        this.smallPlaneBulletSpeed = 7;
        this.smallPlaneRadius = 100; // Radius around the main body
        this.smallPlaneAngle = 0; // Starting angle for positioning
        this.smallPlaneSize = stats.SMALL_PLANE_SIZE;

        // Phase 2: Shield and enemy spawning
        this.shieldHealth = stats.SHIELD_HEALTH;
        this.shieldActive = false;
        this.enemySpawnTimer = 0;
        this.enemySpawnInterval = 5 * 60; // 5 seconds * 60 frames/sec

        // Phase 3: Main body attacks
        this.mainBodyFireRate = 30; // frames
        this.mainBodyBulletSpeed = 8;
        this.laserTimer = 0;
        this.laserInterval = 7 * 60; // 7 seconds * 60 frames/sec (shorter cycle)
        this.laserDuration = 60; // frames laser is visible
        this.laserWarningDuration = 120; // 2 seconds for warning
        this.laserState = 'IDLE'; // IDLE, WARNING, FIRING
        this.laserTargetY = 0;
        this.maxHealth = stats.HEALTH; // Set maxHealth for health bar mapping

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

    update() {
        if (this.isDefeated) return;

        this.updateBurstAttacks();

        switch (this.phase) {
            case 1:
                this.updatePhase1();
                break;
            case 2:
                this.updatePhase2();
                break;
            case 3:
                this.updatePhase3();
                break;
        }

        // Check for phase transitions
        if (this.phase === 1 && this.smallPlanes.every(p => !p.active)) {
            this.phase = 2;
            this.startPhase2();
        }
    }

    updatePhase1() {
        // this.smallPlaneAngle += 0.01; // This was for all planes, now handled individually

        this.smallPlanes.forEach(plane => {
            if (!plane.active) return;

            // Orbit the main body
            plane.angle += 0.03; // Each plane orbits individually
            plane.x = this.x + this.smallPlaneRadius * cos(plane.angle);
            plane.y = this.y + this.smallPlaneRadius * sin(plane.angle);

            // Firing
            plane.fireTimer--;
            if (plane.fireTimer <= 0) {
                // Direction towards player
                const angleToPlayer = atan2(this.game.player.y - plane.y, this.game.player.x - plane.x);
                const vx = this.smallPlaneBulletSpeed * cos(angleToPlayer);
                const vy = this.smallPlaneBulletSpeed * sin(angleToPlayer);
                this.game.enemyBullets.push(new Bullet(plane.x, plane.y, 'enemy', createVector(vx, vy), null, this.smallPlaneBulletSpeed));
                plane.fireTimer = this.smallPlaneFireRate;
            }
        });
    }

    startPhase2() {
        this.shieldActive = true;
        this.health = this.shieldHealth; // Main body health becomes shield health
        this.maxHealth = this.shieldHealth; // Update max health for health bar
        this.enemySpawnTimer = this.enemySpawnInterval; // Start spawning enemies immediately
        this.spawnPhase2Enemies(); // Spawn enemies immediately when phase 2 starts
    }

    updatePhase2() {
        if (!this.shieldActive) return;

        this.enemySpawnTimer--;
        if (this.enemySpawnTimer <= 0) {
            this.spawnPhase2Enemies(); // Spawn enemies when timer runs out
            this.enemySpawnTimer = this.enemySpawnInterval;
        }
    }

    spawnPhase2Enemies() {
        const allEnemyTypes = Object.keys(ENEMY_STATS);
        const namedEnemyTypes = allEnemyTypes.filter(type => type.includes('Named'));

        // Spawn two named enemies
        for (let i = 0; i < 2; i++) {
            if (namedEnemyTypes.length > 0) {
                const randomType = namedEnemyTypes[Math.floor(Math.random() * namedEnemyTypes.length)];
                const xPos = Math.random() * width;
                const yPos = 0;
                this.game.enemies.push(new Enemy(xPos, yPos, randomType));
            }
        }
    }

    startPhase3() {
        this.health = BOSS_STATS.OMEGA_SYSTEM.HEALTH; // Restore full health for main body phase 3
        this.maxHealth = BOSS_STATS.OMEGA_SYSTEM.HEALTH; // Update max health for health bar
        this.laserState = 'IDLE';
        this.laserTimer = this.laserInterval; // Start cooldown for the first laser
    }

    updatePhase3() {
        // Main body firing
        if (frameCount % this.mainBodyFireRate === 0) {
            const randomOffset = random(-PI / 12, PI / 12); // Random offset from -15 to +15 degrees
            for (let i = 0; i < 5; i++) {
                const angle = map(i, 0, 4, -PI / 6 + randomOffset, PI / 6 + randomOffset); // Spread over 30 degrees with random offset
                const vx = this.mainBodyBulletSpeed * sin(angle);
                const vy = this.mainBodyBulletSpeed * cos(angle);
                this.game.enemyBullets.push(new Bullet(this.x, this.y + this.height / 2, 'enemy', createVector(vx, vy), null, this.mainBodyBulletSpeed));
            }
        }

        // Laser attack state machine
        switch (this.laserState) {
            case 'IDLE':
                this.laserTimer--;
                if (this.laserTimer <= 0) {
                    this.laserState = 'WARNING';
                    this.laserTimer = this.laserWarningDuration;
                    this.laserTargetY = this.game.player.y;
                    this.createLaserSegment();
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
                this.handleLaserCollision();
                if (this.laserTimer <= 0) {
                    this.laserState = 'IDLE';
                    this.laserTimer = this.laserInterval;
                }
                break;
        }
    }

    handleLaserCollision() {
        const player = this.game.player;
        const laserY = this.laserTargetY;
        const laserHeight = 40; // Increased laser height

        // Correctly check for overlap between player circle and laser rect
        if (Math.abs(player.y - laserY) < player.size / 2 + laserHeight / 2) {
            // Check if player is horizontally inside the damaging parts of the laser
            // Player is safe if they are behind the blaster visually (original single laser doesn't have blaster visual offset)
            // Removed: if (player.x + player.size / 2 < 40) return;

            if (player.x - player.size / 2 < this.laserGapPosition || player.x + player.size / 2 > this.laserGapPosition + this.laserGapWidth) {
                if (!player.isInvincible) {
                    player.takeDamage();
                }
            }
        }
    }

    updateBurstAttacks() {
        for (let i = this.burstAttacks.length - 1; i >= 0; i--) {
            const attack = this.burstAttacks[i];
            attack.timer--;

            if (attack.timer <= 0) {
                // Fire one burst
                for (let j = 0; j < 10; j++) { // 10 directions
                    const angle = (TWO_PI / 10) * j;
                    const vx = 4 * cos(angle); // Speed 4
                    const vy = 4 * sin(angle);
                    this.game.enemyBullets.push(new Bullet(attack.x, attack.y, 'enemy', createVector(vx, vy), null, 4));
                }

                attack.burstsLeft--;
                if (attack.burstsLeft <= 0) {
                    // This attack is finished, remove it
                    this.burstAttacks.splice(i, 1);
                } else {
                    // Reset timer for the next burst
                    attack.timer = this.burstDelay;
                }
            }
        }
    }

    createLaserSegment() {
        // Determine the gap in the laser
        this.laserGapPosition = random(width / 4, width * 3 / 4); // Random x position for the gap
        this.laserGapWidth = this.game.player.size * 3.75; // Make gap 1.5x wider for player
    }

    takeDamage(amount) {
        if (this.isDefeated) return;

        this.health -= amount;

        if (this.health <= 0) {
            if (this.phase === 3) {
                this.health = 0;
                this.isDefeated = true;
                // Note: The game over / win condition is handled by GameScene
            } else if (this.phase === 2) {
                // Shield broken, transition to phase 3 immediately
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
                    // Using dist for circle-circle collision
                    if (plane.active && dist(bullet.x, bullet.y, plane.x, plane.y) < (bullet.size / 2 + plane.size / 2)) {
                        plane.health -= bullet.damage;
                        if (plane.health <= 0) {
                            plane.active = false;
                            // Add a new burst attack request
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
                // Using dist for circle-circle collision
                if (this.shieldActive && dist(bullet.x, bullet.y, this.x, this.y) < (bullet.size / 2 + this.size / 2)) {
                    this.takeDamage(bullet.damage);
                    hit = true;
                }
                break;
            case 3:
                // Using dist for circle-circle collision
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

        // Draw main body
        fill(this.color);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height); // Use this.width/height for drawing the rectangle

        // Draw phase-specific elements
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

        // Display numerical health
        push(); // Isolate text style
        fill(255); // White text
        textSize(16);
        textAlign(CENTER, CENTER);
        // Calculate total health considering active small planes in Phase 1
        let currentDisplayHealth = this.health;
        let maxDisplayHealth = this.maxHealth;
        if (this.phase === 1) {
            currentDisplayHealth = this.smallPlanes.reduce((sum, plane) => sum + (plane.active ? plane.health : 0), 0);
            maxDisplayHealth = this.numSmallPlanes * this.smallPlaneHealth;
            text(`Phase 1: ${floor(currentDisplayHealth)} / ${maxDisplayHealth}`, this.x, this.y); // Centered vertically
        } else if (this.phase === 2) {
            text(`Shield: ${floor(currentDisplayHealth)} / ${maxDisplayHealth}`, this.x, this.y); // Centered vertically
        } else { // Phase 3
            text(`Health: ${floor(currentDisplayHealth)} / ${maxDisplayHealth}`, this.x, this.y); // Centered vertically
        }
        pop(); // Restore previous style


    }

    drawPhase1() {
        this.smallPlanes.forEach(plane => {
            if (!plane.active) return;
            fill(200, 200, 0);
            ellipse(plane.x, plane.y, plane.size, plane.size);

            // Display numerical health for small planes
            push(); // Isolate text style
            fill(255); // White text
            textSize(12);
            textAlign(CENTER, CENTER);
            text(floor(plane.health), plane.x, plane.y); // Centered vertically
            pop(); // Restore previous style
        });
    }

    drawPhase2() {
        if (this.shieldActive) {
            noFill();
            stroke(0, 0, 255, 150);
            strokeWeight(5);
            ellipse(this.x, this.y, this.size * 1.2, this.size * 1.2); // Use this.size for shield
            noStroke();
        }
    }

    drawPhase3() {
        // Switch to corner mode for laser drawing to simplify coordinates
        rectMode(CORNER); 
        if (this.laserState === 'WARNING') {
            const warningHeight = map(this.laserTimer, this.laserWarningDuration, 0, 80, 10);
            fill(255, 255, 0, 100); // Yellow, semi-transparent
            noStroke();
            // Draw rects with y-center at laserTargetY
            rect(0, this.laserTargetY - warningHeight / 2, this.laserGapPosition, warningHeight);
            rect(this.laserGapPosition + this.laserGapWidth, this.laserTargetY - warningHeight / 2, width - (this.laserGapPosition + this.laserGapWidth), warningHeight);
        } else if (this.laserState === 'FIRING') {
            const laserHeight = 40; // Increased laser height
            fill(255, 0, 0, 150);
            noStroke();
            // Draw rects with y-center at laserTargetY
            rect(0, this.laserTargetY - laserHeight / 2, this.laserGapPosition, laserHeight);
            rect(this.laserGapPosition + this.laserGapWidth, this.laserTargetY - laserHeight / 2, width - (this.laserGapPosition + this.laserGapWidth), laserHeight);
        }
    }
}
