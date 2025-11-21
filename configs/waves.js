const WAVES = [
  /********* 자동 생성된 웨이브: 0 ~ 7,200프레임 *********/
  ...(() => {
    const arr1 = [];
    for (let frameCount = 60; frameCount <= 7200; frameCount++) {
      if (frameCount % 300 === 0) {
        arr1.push({
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
    return arr1;
  })(),

  /********* 중반부: 7,200 ~ 14,400프레임 *********/
  ...(() => {
    const arr2 = [];
    for (let frameCount = 7200; frameCount <= 14400; frameCount++) {
      if (frameCount % 420 === 0) {
        arr2.push({
          triggerFrame: frameCount,
          enemies: [
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.1, y: -50 },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.3, y: -50 },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.5, y: -50 },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.7, y: -50 },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.7, y: -50 },
            { type: mid_ENEMY_TYPES[Math.floor(Math.random() * mid_ENEMY_TYPES.length)], x: 0.9, y: -50 }
          ]
        });
      }
    }
    return arr2;
  })(),

  /********* 후반부: 14,400 ~ 18,000프레임 *********/
  ...(() => {
    const arr3 = [];
    for (let frameCount = 14400; frameCount <= 18000; frameCount++) {
      if (frameCount % 480 === 0) {
        arr3.push({
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
    return arr3;
  })()

];
