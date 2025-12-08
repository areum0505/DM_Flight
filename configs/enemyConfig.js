/********* 스펙 상세 *********/

const HP_very_low = 2
const HP_low = 4
const HP_medium = 6
const HP_high = 8
const HP_very_high = 10
const HP_infinite = 10000

const SPD_very_low = 0.5
const SPD_low = 0.7
const SPD_medium = 1
const SPD_high = 1.25
const SPD_very_high = 1.5

const ShootSPD_low = 145
const ShootSPD_normal = 120
const ShootSPD_fast = 105
const ShootSPD_very_fast = 90

const bulletSpeed_low = 2
const bulletSpeed_normal = 2.5
const bulletSpeed_fast = 3



/********* 몹 유형별 스펙 설정 *********/

const ENEMY_STATS = {

  /** 초반부 몹 설정 **/
  earlyNormal_simple: {
    size: 25,
    health: HP_very_low,
    speed: SPD_medium,
    color: [255, 0, 0], // red
    shootInterval: ShootSPD_low,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  earlyNormal_tank: {
    size: 25,
    health: HP_medium,
    speed: SPD_very_low,
    color: [255, 150, 0], // orange
    shootInterval: ShootSPD_fast,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  earlyNormal_special: {
    size: 25,
    health: HP_medium,
    speed: SPD_low,
    color: [255, 255, 0], // yellow
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_fast,
    points: 100,
    ultimateGauge: 10,
  },

  earlyNormal_flock: { //*********** 보충 필요
    size: 25,
    health: HP_very_low,
    speed: SPD_low,
    color: [0, 255, 0], // green
    shootInterval: ShootSPD_low, // Added default
    bulletSpeed: bulletSpeed_normal, // Added default
    points: 100,
    ultimateGauge: 10,
  },

  earlyNamed_flock: { //*********** 보충 필요
    size: 25,
    health: HP_low,
    speed: SPD_high,
    color: [0, 0, 255], // blue
    shootInterval: ShootSPD_fast, // Added default
    bulletSpeed: bulletSpeed_fast, // Added default
    points: 100,
    ultimateGauge: 10,
  },

  /** 중반부 몹 설정 **/

  midNormal_simple: {
    size: 25,
    health: HP_low,
    speed: SPD_medium,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  midNormal_tank: { //*********** 보충 필요
    size: 25,
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
    size: 25,
    health: HP_very_low,
    speed: SPD_very_high,
    color: [200, 200, 255],
    shootInterval: ShootSPD_fast, // Added default
    bulletSpeed: bulletSpeed_fast, // Added default
    points: 100,
    ultimateGauge: 10,
  },

  midNamed_simple: {
    size: 25,
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

  midNamed_flock: { // Added missing type
    size: 25,
    health: HP_low,
    speed: SPD_very_high,
    color: [100, 100, 255],
    shootInterval: ShootSPD_fast,
    bulletSpeed: bulletSpeed_fast,
    points: 100,
    ultimateGauge: 10,
  },

  /** 후반부 몹 설정 **/

  endNormal_simple: { //*********** 보충 필요
    size: 25,
    health: HP_medium,
    speed: SPD_medium,
    color: [200, 200, 255],
    shootInterval: ShootSPD_fast,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  endNormal_tank: { //*********** 보충 필요
    size: 25,
    health: HP_high,
    speed: SPD_very_low,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal, // Added default
    bulletSpeed: bulletSpeed_low, // Added default
    points: 100,
    ultimateGauge: 10,
  },

  endNormal_special: { //*********** 보충 필요
    size: 25,
    health: HP_medium,
    speed: SPD_medium,
    color: [200, 200, 255],
    shootInterval: ShootSPD_fast,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  endNormal_flock: { //*********** 보충 필요
    size: 25,
    health: HP_very_low,
    speed: SPD_very_high,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  endNamed_simple: {  //*********** 보충 필요
    size: 30,
    health: HP_medium,
    speed: SPD_medium,
    color: [200, 200, 255],
    shootInterval: ShootSPD_fast,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  endNamed_tank: { //*********** 보충 필요
    size: 25,
    health: HP_very_high,
    speed: SPD_low,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_low,
    points: 100,
    ultimateGauge: 10,
  },

  endNamed_special: { //*********** 보충 필요
    size: 25,
    health: HP_medium,
    speed: SPD_medium,
    color: [200, 200, 255],
    shootInterval: ShootSPD_fast,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  endNamed_flock: { //*********** 보충 필요
    size: 25,
    health: HP_very_low,
    speed: SPD_very_high,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  },

  endNamed_special_1: { //*********** 보충 필요
    size: 25,
    health: HP_infinite,
    speed: SPD_very_low,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_low,
    points: 100,
    ultimateGauge: 10,
  },

  endNamed_special_2: { //*********** 보충 필요
    size: 25,
    health: HP_high,
    speed: SPD_medium,
    color: [200, 200, 255],
    shootInterval: ShootSPD_normal,
    bulletSpeed: bulletSpeed_normal,
    points: 100,
    ultimateGauge: 10,
  }
};

// 초반부 몹 유형 배열
const early_ENEMY_TYPES = [
  'earlyNormal_simple',
  'earlyNormal_tank',
  'earlyNormal_special',
  'earlyNormal_flock',
  'earlyNamed_flock'
];

// 중반부 몹 유형 배열
const mid_ENEMY_TYPES = [
  'midNormal_simple',
  'midNormal_tank',
  'midNormal_special',
  'midNormal_flock',
  'midNamed_simple',
  'midNamed_flock'
];

// 후반부 몹 유형 배열
const end_ENEMY_TYPES = [
  'endNamed_simple',
  'endNamed_special',
  'endNamed_flock',
  'endNamed_special_1',
  'endNamed_special_2',
  'endNamed_tank'
];

// Random enemy type selections for each stage
const early_randomEnemyType = early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)];
const mid_randomEnemyType = mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)];
const end_randomEnemyType = end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)];
