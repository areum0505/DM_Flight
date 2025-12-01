class Coin extends Item {
  constructor(x, y, image) {
    super(x, y, 'coin', image);
    this.value = 1; // Score value
  }
}
