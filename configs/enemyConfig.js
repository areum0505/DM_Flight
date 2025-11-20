const ENEMY_STATS = {

  /********* 몹 유형별 스펙 설정 *********/

  /** 초반부 몹 설정 **/
  earlyNormal_simple: {
    size: 30,
    health: 1,
    speed: 1,
    color: [200, 100, 255], // Light Blue
    shootInterval: 60, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  earlyNormal_tank: {
    size: 30,
    health: 1,
    speed: 2,
    color: [125, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  earlyNormal_special: {
    size: 30,
    health: 1,
    speed: 1,
    color: [200, 200, 0], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  earlyNormal_flock: {
    size: 30,
    health: 1,
    speed: 1,
    color: [200, 120, 50], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  earlyNamed_flock: {
    size: 30,
    health: 1,
    speed: 1,
    color: [50, 0, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },
  
  /** 중반부 몹 설정 **/

  midNormal_simple: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  midNormal_tank: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  midNormal_special: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  midNormal_flock: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },
  
  midNamed_simple: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  midNamed_special: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  /** 후반부 몹 설정 **/

  endNormal_simple: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  endNormal_tank: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  endNormal_special: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  endNormal_flock: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  endNamed_special_1: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  endNamed_special_2: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  },

  endNamed_tank: {
    size: 30,
    health: 1,
    speed: 2,
    color: [200, 200, 255], // Light Blue
    shootInterval: 120, // 120프레임마다 발사 (2초)
    bulletSpeed: 4,
    points: 100,
    ultimateGauge: 10,
  }

};

const early_ENEMY_TYPES = [
    'earlyNormal_simple',
    'earlyNormal_tank',
    'earlyNormal_special',
    'earlyNormal_flock',
    'earlyNamed_flock'
];

const mid_ENEMY_TYPES = [
    'midNormal_simple',
    'midNormal_tank',
    'midNormal_special',
    'midNormal_flock',
    'midNamed_simple',
    'midNamed_flock'
];

const end_ENEMY_TYPES = [
    'endNamed_simple',
    'endNamed_tank',
    'endNamed_special',
    'endNamed_flock',
    'endNamed_special_1',
    'endNamed_special_2',
    'endNamed_tank'
];

const early_randomEnemyType = early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)];
const mid_randomEnemyType = mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)];
const end_randomEnemyType = end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)];
