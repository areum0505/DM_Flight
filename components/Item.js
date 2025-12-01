class Item {
  constructor(x, y, type, image) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.image = image;
    this.size = 20; // Default size, can be overridden
    this.velocity = createVector(0, 2); // Falls downwards
  }

  move() {
    this.y += this.velocity.y;
  }

  draw() {
    image(this.image, this.x, this.y, this.size, this.size);
  }

  isOffScreen() {
    return this.y > height;
  }
}