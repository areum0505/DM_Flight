const Boss_HP_low = 15;
const Boss_HP_medium = 20;
const Boss_HP_high = 35;
const Boss_HP_very_high = 50;
const Boss_HP_extreme = 70;

const Boss_ATTACK_COOLDOWN_slow = 180;
const Boss_ATTACK_COOLDOWN_normal = 150;
const Boss_ATTACK_COOLDOWN_fast = 100;

const BOSS_STATS = {
  OVERLOAD: { // 중간 보스 1 - 오버로드
    HEALTH: Boss_HP_medium,
    SIZE: 100,
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
    WIDTH: 420,
    HEIGHT: 200,
    ATTACK_COOLDOWN: Boss_ATTACK_COOLDOWN_slow,

    TURRETS: {
      HEALTH: Boss_HP_medium,
      SIZE: 40,
      SHOOT_INTERVAL: Boss_ATTACK_COOLDOWN_normal,
    },
  },


  CANYON_ROCKER: { // 후반 보스 1 - 캐니언 록커
    HEALTH: Boss_HP_very_high,
    SIZE: 120,
    ATTACK_COOLDOWN: Boss_ATTACK_COOLDOWN_normal,
  },


  OMEGA_SYSTEM: { // 후반 보스 2 - 오메가 시스템
    HEALTH: Boss_HP_extreme,
    SIZE: 150, // Added for consistency with Boss constructor
    WIDTH: 150,
    HEIGHT: 150,

    SMALL_PLANE_HEALTH: Boss_HP_medium,
    SMALL_PLANE_SIZE: 20, // Added for consistency
    
    SHIELD_HEALTH: Boss_HP_high,
  }
};
