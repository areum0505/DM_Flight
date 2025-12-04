class TransitionEffect {
  constructor(transitionImage) {
    this.transitionImage = transitionImage;
    this.y = -height; // Start above the canvas
    this.speed = 30; // Adjust speed as needed
    this.finished = false;
  }

  update() {
    if (!this.finished) {
      this.y += this.speed;
      // If the top of the image has moved past the bottom of the canvas, it's finished
      if (this.y >= height) { 
        this.finished = true;
      }
    }
  }

  draw() {
    if (!this.finished) {
      push();
      imageMode(CORNER);
      image(this.transitionImage, 0, this.y, width, height);
      pop();
    }
  }

  isFinished() {
    return this.finished;
  }

  reset() {
    this.y = -height;
    this.finished = false;
  }
}
