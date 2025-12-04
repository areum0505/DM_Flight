const Boss_HP_low = 25;
const Boss_HP_medium = 40;
const Boss_HP_high = 50;
const Boss_HP_very_high = 70;
const Boss_HP_extreme = 85;

const Boss_ATTACK_COOLDOWN_slow = 120;
const Boss_ATTACK_COOLDOWN_normal = 100;
const Boss_ATTACK_COOLDOWN_fast = 85;

const BOSS_STATS = {
  OVERLOAD: { // 중간 보스 1 - 오버로드
    HEALTH: Boss_HP_medium,
    WIDTH: 300,
    HEIGHT: 200,
    ATTACK_COOLDOWN: Boss_ATTACK_COOLDOWN_slow,
    CHARGE_SPEED: 15,

    TURRETS: {
      HEALTH: Boss_HP_low,
      SIZE: 40,
      SHOOT_INTERVAL: Boss_ATTACK_COOLDOWN_normal,
    },
  },


  CARRIER_SHIELD: { // 중간 보스 2 - 캐리어 쉴드
    HEALTH: Boss_HP_high,
    WIDTH: 400,
    HEIGHT: 700,
    ATTACK_COOLDOWN: Boss_ATTACK_COOLDOWN_fast,
    TURRETS: {
      HEALTH: Boss_HP_medium,
      SIZE: 95,
      SHOOT_INTERVAL: Boss_ATTACK_COOLDOWN_normal,
    },
  },


  CANYON_ROCKER: { // 후반 보스 1 - 캐니언 록커
    HEALTH: Boss_HP_extreme,
    WIDTH: 200,
    HEIGHT: 150,
    ATTACK_COOLDOWN: Boss_ATTACK_COOLDOWN_normal,
  },


  OMEGA_SYSTEM: { // 후반 보스 2 - 오메가 시스템
    WIDTH: 170,
    HEIGHT: 170,
    SIZE: 170,
    HEALTH: Boss_HP_extreme,
    
    SMALL_PLANE_HEALTH: Boss_HP_high,
    SMALL_PLANE_SIZE: 20, // Added for consistency
    
    SHIELD_HEALTH: Boss_HP_very_high,
  }
};
