class FallingRock {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = 2.5; // Falling speed
    this.color = color(128, 128, 128); // Gray color for rocks
  }

  move() {
    this.y += this.speed;
  }

  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
