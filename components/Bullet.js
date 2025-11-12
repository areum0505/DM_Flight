class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = CONFIG.BULLET.SPEED;
    this.size = CONFIG.BULLET.SIZE;
  }

  move() {
    this.y -= this.speed;
  }

  draw() {
    fill(255, 204, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}