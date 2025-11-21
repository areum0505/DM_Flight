class Bullet {
  constructor(x, y, type = 'default', vel = null, target = null, speed = CONFIG.BULLET.SPEED) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = CONFIG.BULLET.SIZE;
    this.vel = vel;
    this.target = target;
    this.speed = speed;
    this.homingDuration = 60; // Homing for 1 second
    this.creationTime = frameCount;
    this.color = color(255, 204, 0); // Default yellow

    if (this.type === 'laser') {
      this.size = 60;
    }
    if (this.type === 'homing') {
      this.size = 15; // Larger size
      this.color = color(148, 0, 211); // Purple color
    }

    if (this.type === 'homing' && this.target) {
      const angle = atan2(this.target.y - this.y, this.target.x - this.x);
      this.vel = p5.Vector.fromAngle(angle, this.speed);
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
    if (this.type === 'laser') {
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