const ENEMY_STATS = {
  earlyNormal1: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },
  small: {
    size: 30,
    health: 1,
    speed: 1.5,
    color: [255, 100, 100], // Light Red
  },
  medium: {
    size: 50,
    health: 3,
    speed: 1,
    color: [255, 0, 0], // Red
  },
  large: {
    size: 70,
    health: 5,
    speed: 0.7,
    color: [150, 0, 0], // Dark Red
  },
};
