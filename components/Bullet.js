class Bullet {
  constructor(x, y, type = 'default', bulletImage = null, vel = null, target = null, speed = CONFIG.BULLET.SPEED, bulletSize = CONFIG.BULLET.SIZE) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.bulletImage = bulletImage; // Store the image
    this.size = bulletSize;
    this.width = 10; // Default width for image drawing
    this.height = 20; // Default height for image drawing
    this.vel = vel;
    this.target = target;
    this.speed = speed;
    this.damage = CONFIG.BULLET.DAMAGE; // Added damage property
    this.homingDuration = 60; // Homing for 1 second
    this.creationTime = frameCount;
    this.color = color(255, 204, 0); // Default yellow

    if (this.type === 'laser') {
      this.size = 60;
    } else if (this.type === 'homing') {
      this.size = 40; // Increased size for homing bullets
      this.color = color(148, 0, 211); // Purple color
    } else if (this.type === 'player' || this.type === 'enemy') {
      this.size = 10; // Revert to original collision size
    }
  }

  move() {
    if (this.type === 'homing' && this.target) {
      if (frameCount < this.creationTime + this.homingDuration) {
        const angle = atan2(this.target.y - this.y, this.target.x - this.x);
        this.vel = p5.Vector.fromAngle(angle, this.speed);
      }
    }

    if (this.vel) {
      this.x += this.vel.x;
      this.y += this.vel.y;
    } else {
      this.y += this.speed;
    }
  }

  draw() {
    // Boss bullets use this.size for dimensions
    if ((this.type === 'default' || this.type === 'homing') && this.bulletImage) {
      push();
      imageMode(CENTER);
      image(this.bulletImage, this.x, this.y, this.size, this.size);
      pop();
    } 
    // Player and normal enemy bullets use fixed width/height
    else if ((this.type === 'player' || this.type === 'enemy') && this.bulletImage) {
      push();
      imageMode(CENTER);
      image(this.bulletImage, this.x, this.y, this.width, this.height);
      pop();
    }
    else if (this.type === 'laser') {
      push();
      stroke(255, 0, 0);
      strokeWeight(4);
      if (this.vel) {
        line(this.x, this.y, this.x - this.vel.x * 10, this.y - this.vel.y * 10);
      } else {
        line(this.x, this.y, this.x, this.y - 10);
      }
      pop();
    } else {
      fill(this.color);
      noStroke();
      ellipse(this.x, this.y, this.size);
    }
  }
}