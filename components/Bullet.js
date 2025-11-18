class Bullet {
  constructor(x, y, speed, vel = null) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = CONFIG.BULLET.SIZE;
    this.vel = vel;
  }

  move() {
    if (this.vel) {
      this.x += this.vel.x;
      this.y += this.vel.y;
    } else {
      this.y += this.speed;
    }
  }

  draw() {
    fill(255, 204, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}