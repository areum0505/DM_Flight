class Bullet {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = CONFIG.BULLET.SIZE;
  }

  move() {
    this.y += this.speed;
  }

  draw() {
    fill(255, 204, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}