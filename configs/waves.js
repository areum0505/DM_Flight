const LEVEL1_WAVES = [
  {
    triggerFrame: 60,
    enemies: [
      { type: 'small', x: 0.2, y: -50 },
      { type: 'small', x: 0.8, y: -50 },
    ]
  },
  {
    triggerFrame: 180,
    enemies: [
      { type: 'small', x: 0.4, y: -50 },
      { type: 'small', x: 0.6, y: -50 },
    ]
  }
];

const LEVEL2_WAVES = [
  {
    triggerFrame: 60,
    enemies: [
      { type: 'medium', x: 0.5, y: -50 },
    ]
  },
  {
    triggerFrame: 180,
    enemies: [
      { type: 'medium', x: 0.3, y: -50 },
      { type: 'medium', x: 0.7, y: -50 },
      { type: 'small', x: 0.5, y: -100 },
    ]
  }
];

const LEVEL3_WAVES = [
  {
    triggerFrame: 120,
    enemies: [
      { type: 'large', x: 0.5, y: -50 },
    ]
  },
  {
    triggerFrame: 240,
    enemies: [
      { type: 'earlyNormal1', x: 0.1, y: -50 },
      { type: 'earlyNormal1', x: 0.3, y: -50 },
      { type: 'earlyNormal1', x: 0.5, y: -50 },
      { type: 'earlyNormal1', x: 0.7, y: -50 },
      { type: 'earlyNormal1', x: 0.9, y: -50 },
    ]
  },
  {
    triggerFrame: 400,
    enemies: [
      { type: 'medium', x: 0.2, y: -50 },
      { type: 'medium', x: 0.8, y: -50 },
      { type: 'large', x: 0.5, y: -120 },
    ]
  }
];

