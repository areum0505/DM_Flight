// 게임 진행 흐름: 초반부 > 중간보스1 (OVERLOAD) > 중반부1 > 중간보스2 (CARRIER_SHIELD) > 중반부2 > 중간보스3 (CANYON_ROCKER) > 후반부 > 최종보스 (OMEGA_SYSTEM)

const Ypos = -50;

const WAVES = [

  /********* 초반부: 0 ~ 7,200프레임 (2분) *********/
  ...(() => {
    const arr = [];
    //for (let frameCount = 0; frameCount <= 7200; frameCount++) {
    for (let frameCount = 0; frameCount <= 900; frameCount++) {
      if (frameCount % 350 === 0) {
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

  // Boss Battle 1
  {
    //triggerFrame: 7200,
    triggerFrame: 900,
    type: 'BOSS',
    bossType: 'OVERLOAD'  
    },

  /********* 중반부 1: 7,200 ~ 10,800프레임 (1분) *********/
  ...(() => {
    const arr = [];
    //for (let frameCount = 7200; frameCount <= 10800; frameCount++) {
    for (let frameCount = 900; frameCount <= 1800; frameCount++) {
      if (frameCount % 350 === 0) {
        arr.push({
          triggerFrame: frameCount,
          enemies: [
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

  // Boss Battle 2
  {
    //triggerFrame: 10800,
    triggerFrame: 1800,
    type: 'BOSS',
    bossType: 'CARRIER_SHIELD'
  },

  /********* 중반부 2: 10,800 ~ 14,400프레임 (1분) *********/
  ...(() => {
    const arr = [];
    // 보스 클리어 후 타이머가 10800부터 다시 시작되므로, 여기서부터 웨이브를 배치합니다.
    //for (let frameCount = 10800; frameCount <= 14400; frameCount++) {
    for (let frameCount = 1800; frameCount <= 2700; frameCount++) {
      if (frameCount % 350 === 0) {
        arr.push({
          triggerFrame: frameCount,
          enemies: [
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: Math.random() * 0.9 + 0.1, y: Ypos },
          ]
        });
      }
    }
    return arr;
  })(),

  // Boss Battle 3
  {
    //triggerFrame: 14400,
    triggerFrame: 2700,
    type: 'BOSS',
    bossType: 'CANYON_ROCKER'
  },

  /********* 후반부: 14,400 ~ 18,000프레임 *********/
  ...(() => {
    const arr = [];
    //for (let frameCount = 14400; frameCount <= 18000; frameCount++) {
    for (let frameCount = 2700; frameCount <= 3600; frameCount++) {
      if (frameCount % 500 === 0) {
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
          ]
        });
      }
    }
    return arr;
  })(),

  // Final Boss
  {
    //triggerFrame: 18000,
    triggerFrame: 3600,
    type: 'BOSS',
    bossType: 'OMEGA_SYSTEM'
  }

];
