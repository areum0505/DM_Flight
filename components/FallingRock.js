class FallingRock {
  constructor(x, y, size, ASSETS) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = 2.5; // 낙하 속도
    this.ASSETS = ASSETS;
  }

  move() {
    this.y += this.speed;
  }

  draw() {
    imageMode(CENTER);
    image(this.ASSETS.canyonRockerRockImage, this.x, this.y, this.size, this.size);
  }
}
