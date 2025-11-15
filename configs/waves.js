const WAVES = [
  {
    // 웨이브 0: earlyNormal1 테스트
    triggerFrame: 120,
    enemies: [
      { type: 'earlyNormal1', x: 0.1, y: -50 },
      { type: 'earlyNormal1', x: 0.3, y: -50 },
      { type: 'earlyNormal1', x: 0.5, y: -50 },
      { type: 'earlyNormal1', x: 0.7, y: -50 },
      { type: 'earlyNormal1', x: 0.9, y: -50 },
    ]
  },
  {
    // 웨이브 1: 게임 시작 후 3초 뒤 (180프레임)
    triggerFrame: 180,
    enemies: [
      { type: 'small', x: 0.2, y: -50 },
      { type: 'small', x: 0.8, y: -50 },
    ]
  },
  {
    // 웨이브 2: 게임 시작 후 5초 뒤 (300프레임)
    triggerFrame: 300,
    enemies: [
      { type: 'medium', x: 0.5, y: -50 },
      { type: 'small', x: 0.3, y: -100 },
      { type: 'small', x: 0.7, y: -100 },
    ]
  },
  {
    // 웨이브 3: 게임 시작 후 8초 뒤 (480프레임)
    triggerFrame: 480,
    enemies: [
      // 나중에 다른 종류의 적(예: 'FastEnemy')도 추가 가능
      { type: 'large', x: 0.5, y: -50 },
      { type: 'medium', x: 0.2, y: -150 },
      { type: 'medium', x: 0.8, y: -150 },
    ]
  }
];
