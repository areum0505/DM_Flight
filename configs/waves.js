// 게임 진행 흐름: 초반부 > 중간보스1 (OVERLOAD) > 중반부1 > 중간보스2 (CARRIER_SHIELD) > 중반부2 > 중간보스3 (CANYON_ROCKER) > 후반부 > 최종보스 (OMEGA_SYSTEM)

const Ypos = -20;

const WAVES = [

  /********* 초반부 *********/
  ...(() => {
    const arr = [];
    for (let frameCount = CONFIG.PHASES.EARLY_START; frameCount < CONFIG.PHASES.EARLY_END; frameCount++) {
      if (frameCount % 300 === 0) {
        arr.push({
          triggerFrame: frameCount,
          enemies: [
            { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos }
          ]
        });
      }
    }
    return arr;
  })(),

  // 중간 보스 1 (OVERLOAD)
  {
    triggerFrame: CONFIG.PHASES.EARLY_END,
    type: 'BOSS',
    bossType: 'OVERLOAD'
  },

  /********* 중반부 1 *********/
  ...(() => {
    const arr = [];
    for (let frameCount = CONFIG.PHASES.MID_START; frameCount < CONFIG.PHASES.MID_1_END; frameCount++) {
      if (frameCount % 350 === 0) {
        arr.push({
          triggerFrame: frameCount,
          enemies: [
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos }
          ]
        });
      }
    }
    return arr;
  })(),

  // 중간 보스 2 (CARRIER_SHIELD)
  {
    triggerFrame: CONFIG.PHASES.MID_1_END,
    type: 'BOSS',
    bossType: 'CARRIER_SHIELD'
  },

  /********* 중반부 2 *********/
  ...(() => {
    const arr = [];
    for (let frameCount = CONFIG.PHASES.MID_1_END; frameCount < CONFIG.PHASES.MID_END; frameCount++) {
      if (frameCount % 350 === 0) {
        arr.push({
          triggerFrame: frameCount,
          enemies: [
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos }
          ]
        });
      }
    }
    return arr;
  })(),

  // 후반 보스 1 (CANYON_ROCKER)
  {
    triggerFrame: CONFIG.PHASES.MID_END,
    type: 'BOSS',
    bossType: 'CANYON_ROCKER'
  },

  /********* 후반부 *********/
  ...(() => {
    const arr = [];
    for (let frameCount = CONFIG.PHASES.LATE_START; frameCount < CONFIG.PHASES.LATE_END; frameCount++) {
      if (frameCount % 380 === 0) {
        arr.push({
          triggerFrame: frameCount,
          enemies: [
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos }
          ]
        });
      }
    }
    return arr;
  })(),

  // 최종 보스 (OMEGA_SYSTEM)
  {
    triggerFrame: CONFIG.PHASES.LATE_END,
    type: 'BOSS',
    bossType: 'OMEGA_SYSTEM'
  }

];
