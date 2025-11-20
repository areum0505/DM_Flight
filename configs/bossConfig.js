const BOSS_STATS = {
  OVERLOAD: {
    HEALTH: 3, // 50
    SIZE: 100,
    TURRETS: {
      HEALTH: 1, // 25
      SIZE: 40,
      SHOOT_INTERVAL: 90, // 1.5초
    },
    ATTACK_COOLDOWN: 120, // 2초
    CHARGE_SPEED: 15,
  },
  CARRIER_SHIELD: {
    HEALTH: 5,
    WIDTH: 420, // 600 * 0.7
    HEIGHT: 200, // 800 / 4
    ATTACK_COOLDOWN: 90, // 1.5초
    TURRETS: {
      HEALTH: 3,
      SIZE: 40,
      SHOOT_INTERVAL: 180, // 3초
    },
  }
};
