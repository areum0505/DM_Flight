/********* 스펙 상세 *********/

const HP_very_low = 1
const HP_low = 3
const HP_medium = 5
const HP_high = 7
const HP_very_high = 10
const HP_infinite = 10000

// const ATK_very_low = 1
// const ATK_low = 2
// const ATK_medium = 3
// const ATK_high = 4
// const ATK_very_high = 5

const SPD_very_low = 0.5
const SPD_low = 0.7
const SPD_medium = 1
const SPD_high = 1.25
const SPD_very_high = 1.5

const ShootSPD_low = 180
const ShootSPD_normal = 150
const ShootSPD_fast = 100
const ShootSPD_very_fast = 50

const bulletSpeed_low = 0.5
const bulletSpeed_normal = 2
const bulletSpeed_fast = 3



/********* 몹 유형별 스펙 설정 *********/

const ENEMY_STATS = {

  /** 초반부 몹 설정 **/
  earlyNormal_simple: {
    size: 15,
    health: HP_very_low,
    speed: SPD_medium,
    color: [200, 100, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  earlyNormal_tank: {
    size: 30,
    health: HP_medium,
    speed: SPD_very_low,
    color: [125, 200, 255],
    shootInterval: ShootSPD_very_fast,
    bulletSpeed: bulletSpeed_low,
    points: 100,
    ultimateGauge: 10,
  },

  earlyNormal_special: {
    size: 30,
    health: HP_medium,
    speed: SPD_low,
    color: [200, 200, 0],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  earlyNormal_flock: { //*********** 보충 필요
    size: 30,
    health: HP_very_low,
    speed: SPD_low,
    color: [200, 120, 50],
    points: 100,
    ultimateGauge: 10,
  },

  earlyNamed_flock: { //*********** 보충 필요
    size: 30,
    health: HP_low,
    speed: SPD_high,
    color: [50, 0, 255],
    points: 100,
    ultimateGauge: 10,
  },
  
  /** 중반부 몹 설정 **/

  midNormal_simple: {
    size: 30,
    health: HP_low,
    speed: SPD_medium,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  midNormal_tank: { //*********** 보충 필요
    size: 30,
    health: HP_very_low,
    speed: SPD_very_low,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal, 
    bulletSpeed: bulletSpeed_low,
    points: 100,
    ultimateGauge: 10,
  },

  midNormal_special: { //*********** 보충 필요
    size: 30,
    health: HP_medium,
    speed: SPD_high,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  midNormal_flock: { //*********** 보충 필요
    size: 30,
    health: HP_very_low,
    speed: SPD_very_high,
    color: [200, 200, 255],
    points: 100,
    ultimateGauge: 10,
  },
  
  midNamed_simple: {
    size: 30,
    health: HP_medium,
    speed: SPD_low,
    color: [200, 200, 255],
    shootInterval: ShootSPD_very_fast,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  midNamed_special: { //*********** 보충 필요
    size: 30,
    health: HP_medium,
    speed: SPD_high,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  /** 후반부 몹 설정 **/

  endNormal_simple: { //*********** 보충 필요
    size: 30,
    health: HP_medium,
    speed: SPD_medium,
    color: [200, 200, 255],
    shootInterval: ShootSPD_fast,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  endNormal_tank: { //*********** 보충 필요
    size: 30,
    health: HP_high,
    speed: SPD_very_low,
    color: [200, 200, 255],
    points: 100,
    ultimateGauge: 10,
  },

  endNormal_special: { //*********** 보충 필요
    size: 30,
    health: HP_medium,
    speed: SPD_medium,
    color: [200, 200, 255],
    shootInterval: ShootSPD_fast,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  endNormal_flock: { //*********** 보충 필요
    size: 30,
    health: HP_very_low,
    speed: SPD_very_high,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  endNamed_special_1: { //*********** 보충 필요
    size: 30,
    health: HP_infinite,
    speed: SPD_very_low,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_low,
    points: 100,
    ultimateGauge: 10,
  },

  endNamed_special_2: { //*********** 보충 필요
    size: 30,
    health: HP_high,
    speed: SPD_medium,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  endNamed_tank: { //*********** 보충 필요
    size: 30,
    health: HP_very_high,
    speed: SPD_low,
    color: [200, 200, 255],
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
