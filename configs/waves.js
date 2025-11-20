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



  /********* 초반부: 0 ~ 7,200프레임 *********/
  {
    // 웨이브 0: 게임 시작 후 5초 뒤
    // frameCount: 로 조건 걸어서 루프 (%frameCount 로 원하는 프레임 단위로 실행 조건)
    triggerFrame: 60,
    enemies: [
      { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: 0.1, y: -50 },
      { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: 0.3, y: -50 },
      { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: 0.5, y: -50 },
      { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: 0.7, y: -50 },
      { type: early_ENEMY_TYPES[Math.floor(Math.random() * early_ENEMY_TYPES.length)], x: 0.9, y: -50 }
    ]
  },
  {
    // 웨이브 1
    triggerFrame: 100,
    enemies: [
      { type: early_randomEnemyType, x: 0.1, y: -50 },
      { type: early_randomEnemyType, x: 0.1, y: -50 },
      { type: early_randomEnemyType, x: 0.1, y: -50 },
      { type: early_randomEnemyType, x: 0.1, y: -50 },
      { type: early_randomEnemyType, x: 0.1, y: -50 }
    ]
  },
  {
    // 웨이브 2
    triggerFrame: 120,
    enemies: [
      { type: early_randomEnemyType, x: 0.1, y: -50 },
      { type: early_randomEnemyType, x: 0.1, y: -50 },
      { type: early_randomEnemyType, x: 0.1, y: -50 },
      { type: early_randomEnemyType, x: 0.1, y: -50 },
      { type: early_randomEnemyType, x: 0.1, y: -50 }
    ]
  },
  {
    // 웨이브 3
    triggerFrame: 1200,
    enemies: [
      { type: early_randomEnemyType, x: 0.1, y: -50 },
      { type: early_randomEnemyType, x: 0.1, y: -50 },
      { type: early_randomEnemyType, x: 0.1, y: -50 },
      { type: early_randomEnemyType, x: 0.1, y: -50 },
      { type: early_randomEnemyType, x: 0.1, y: -50 }
    ]
  }


];


