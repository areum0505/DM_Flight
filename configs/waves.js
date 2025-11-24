const Ypos = -50;

const WAVES = [

  /********* 초반부: 0 ~ 7,200프레임 (2분) *********/
  ...(() => {
    const arr = [];
    //for (let frameCount = 0; frameCount <= 7200; frameCount++) {
    for (let frameCount = 0; frameCount <= 1200; frameCount++) {
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

  // Boss Battle 1 (Overlord)
  {
    //triggerFrame: 7200,
    triggerFrame: 1200,
    type: 'BOSS',
    bossType: 'OVERLOAD'
  },

  /********* 중반부 1: 7,200 ~ 10,800프레임 (1분) *********/
  ...(() => {
    const arr = [];
    //for (let frameCount = 7200; frameCount <= 10800; frameCount++) {
    for (let frameCount = 1200; frameCount <= 10800; frameCount++) {
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

  // Boss Battle 2 (Carrier Shield)
  {
    triggerFrame: 10800,
    type: 'BOSS',
    bossType: 'CARRIER_SHIELD'
  },

  /********* 중반부 2: 10,800 ~ 14,400프레임 (1분) *********/
  ...(() => {
    const arr = [];
    // 보스 클리어 후 타이머가 10800부터 다시 시작되므로, 여기서부터 웨이브를 배치합니다.
    for (let frameCount = 10800; frameCount <= 14400; frameCount++) {
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

  /********* 후반부: 14,400 ~ 18,000프레임 *********/
  ...(() => {
    const arr = [];
    for (let frameCount = 14400; frameCount <= 18000; frameCount++) {
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
  })()

];
