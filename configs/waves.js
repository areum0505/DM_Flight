const WAVES = [

  // /********* 초반부: 0 ~ 7,200프레임 *********/
  // {
  //   // 웨이브 0: 게임 시작 후 1.5초 뒤
  //   triggerFrame: 90,
  //   enemies: [
  //     { type: 'earlyNormal_simple', x: 0.1, y: -50 },
  //     { type: 'earlyNormal_simple', x: 0.4, y: -50 },
  //     { type: 'earlyNormal_simple', x: 0.6, y: -50 },
  //     { type: 'earlyNormal_simple', x: 0.7, y: -50 },
  //     { type: 'earlyNormal_simple', x: 0.9, y: -50 },
  //   ]
  // },
  // {
  //   // 웨이브 1
  //   triggerFrame: 600,
  //   enemies: [
  //     { type: 'earlyNormal_simple', x: 0.1, y: -50 },
  //     { type: 'earlyNormal_simple', x: 0.1, y: -50 },
  //     { type: 'earlyNormal_simple', x: 0.1, y: -50 },
  //     { type: 'earlyNormal_tank', x: 0.2, y: -50 },
  //     { type: 'earlyNormal_tank', x: 0.2, y: -50 },
  //   ]
  // },
  // {
  //   // 웨이브 2
  //   triggerFrame: 900,
  //   enemies: [
  //     { type: 'earlyNormal_simple', x: 0.1, y: -50 },
  //     { type: 'earlyNormal_simple', x: 0.1, y: -50 },
  //     { type: 'earlyNormal_simple', x: 0.1, y: -50 },
  //     { type: 'earlyNormal_tank', x: 0.2, y: -50 },
  //     { type: 'earlyNormal_special', x: 0.3, y: -100 },
  //     { type: 'earlyNormal_special', x: 0.3, y: -100 },
  //   ]
  // },
  // {
  //   // 웨이브 3
  //   triggerFrame: 1200,
  //   enemies: [
  //     { type: 'large', x: 0.5, y: -50 },
  //     { type: 'medium', x: 0.2, y: -150 },
  //     { type: 'medium', x: 0.8, y: -150 },
  //   ]
  // }

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


