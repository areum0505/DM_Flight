const WAVES = [

  /********* 초반부: 0 ~ 7,200프레임 (2분) *********/
  ...(() => {
    const arr = [];
    for (let frameCount = 60; frameCount <= 7200; frameCount++) {
      if (frameCount % 300 === 0) {
        arr.push({
          triggerFrame: frameCount,
          enemies: [
            { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: 0.1, y: -50 },
            { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: 0.3, y: -50 },
            { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: 0.5, y: -50 },
            { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: 0.7, y: -50 },
            { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: 0.9, y: -50 }
          ]
        });
      }
    }
    return arr;
  })(),

  /********* 중반부 1: 7,200 ~ 10,800프레임 (1분) *********/
  ...(() => {
    const arr = [];
    for (let frameCount = 7200; frameCount <= 10800; frameCount++) {
      if (frameCount % 420 === 0) {
        arr.push({
          triggerFrame: frameCount,
          enemies: [
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.2, y: -50 },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.4, y: -50 },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.6, y: -50 },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.8, y: -50 }
          ]
        });
      }
    }
    return arr;
  })(),

  // Boss Battle 1 (Overlord)
  {
    triggerFrame: 10800,
    type: 'BOSS',
    bossType: 'OVERLOAD'
  },

  /********* 중반부 2: 10,800 ~ 14,400프레임 (1분) *********/
  ...(() => {
    const arr = [];
    // 보스 클리어 후 타이머가 10800부터 다시 시작되므로, 여기서부터 웨이브를 배치합니다.
    for (let frameCount = 10800; frameCount <= 14400; frameCount++) {
      if (frameCount % 400 === 0) {
        arr.push({
          triggerFrame: frameCount,
          enemies: [
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.1, y: -50 },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.3, y: -50 },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.5, y: -50 },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.7, y: -50 },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.9, y: -50 }
          ]
        });
      }
    }
    return arr;
  })(),

  // Boss Battle 2 (Carrier Shield)
  {
    triggerFrame: 14400,
    type: 'BOSS',
    bossType: 'CARRIER_SHIELD'
  },

  /********* 후반부: 14,400 ~ 18,000프레임 *********/
  ...(() => {
    const arr = [];
    for (let frameCount = 14400; frameCount <= 18000; frameCount++) {
      if (frameCount % 480 === 0) {
        arr.push({
          triggerFrame: frameCount,
          enemies: [
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: 0.1, y: -50 },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: 0.3, y: -50 },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: 0.5, y: -50 },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: 0.7, y: -50 },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: 0.7, y: -50 },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: 0.7, y: -50 },
            { type: end_ENEMY_TYPES[Math.floor(Math.random() * end_ENEMY_TYPES.length)], x: 0.9, y: -50 }
          ]
        });
      }
    }
    return arr;
  })()

];
