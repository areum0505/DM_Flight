class Boss {
  constructor(x, y, health, size) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.size = size;
  }

  update(player, enemyBullets) {
    // 각 보스 클래스에서 구체적인 로직을 구현해야 합니다.
    console.error("Update method must be implemented by subclass");
  }

  draw() {
    // 각 보스 클래스에서 구체적인 로직을 구현해야 합니다.
    console.error("Draw method must be implemented by subclass");
  }

  isHit(bullet, enemyBullets, player) {
    // 각 보스 클래스에서 구체적인 로직을 구현해야 합니다.
    console.error("isHit method must be implemented by subclass");
    return false;
  }
}