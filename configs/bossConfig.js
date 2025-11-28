const Boss_HP_medium = 50;
const Boss_HP_high = 100;
const Boss_HP_very_high = 150;

const Boss_SPD_low = 1;

const Boss_shootInterval_slow = 180; // 3초
const Boss_shootInterval_normal = 120; // 2초
const Boss_shootInterval_fast = 60; // 1초

const BOSS_STATS = {
  OVERLOAD: { // 중간 보스 1 - 오버로드
    HEALTH: 3, // 50
    SIZE: 100,
    ATTACK_COOLDOWN: 120, // 2초
    CHARGE_SPEED: 15,

    TURRETS: {
      HEALTH: 30, // 25
      SIZE: 40,
      SHOOT_INTERVAL: 90, // 1.5초
    },

  },
  CARRIER_SHIELD: { // 중간 보스 2 - 캐리어 쉴드
    HEALTH: 5,
    WIDTH: 420, // 600 * 0.7
    HEIGHT: 200, // 800 / 4
    ATTACK_COOLDOWN: 90, // 1.5초

    TURRETS: {
      HEALTH: 3,
      SIZE: 40,
      SHOOT_INTERVAL: 180, // 3초
    },
  },
  CANYON_ROCKER: { // 후반 보스 1 - 캐니언 록커
    HEALTH: 100,
    SIZE: 120,
    ATTACK_COOLDOWN: 180, // 3초
  }
};
