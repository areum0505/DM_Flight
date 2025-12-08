const CONFIG = {
  CANVAS: {
    WIDTH: 600,
    HEIGHT: 800,
  },
  PLAYER: {
    SIZE: 30,
    SPEED: 7,
    HEALTH: 5, // 플레이어 초기 체력
    SHOOT_INTERVAL: 6,
  },
  BULLET: {
    SIZE: 20,
    SPEED: 10,
    DAMAGE: 1, // 총알 기본 데미지
  },
  HIT_EFFECT_DURATION: 3, // 피격 효과 지속 시간 (프레임)
  // 게임 진행 단계별 시간 설정 (프레임 단위, 1초 = 60프레임)
  PHASES: {},
};

// 테스트용 시간 설정 사용 여부 (true: 테스트용, false: 실제 플레이용)
const USE_TEST_TIMINGS = false;
const TEST_PHASE_DURATION = 20 * 60; // 테스트용 단계별 지속 시간 (20초)

if (USE_TEST_TIMINGS) {
  // 테스트용 시간 설정
  CONFIG.PHASES.EARLY_END = TEST_PHASE_DURATION;        // 초반부 종료 프레임
  CONFIG.PHASES.MID_END = TEST_PHASE_DURATION * 2;    // 중반부 종료 프레임
  CONFIG.PHASES.LATE_END = TEST_PHASE_DURATION * 3;   // 후반부 종료 프레임
} else {
  // 실제 플레이용 시간 설정
  CONFIG.PHASES.EARLY_END = 7200;
  CONFIG.PHASES.MID_END = 14400;
  CONFIG.PHASES.LATE_END = 18000;
}

// 각 단계의 시작 시간과 중반부를 나누는 지점을 명확히 정의
CONFIG.PHASES.EARLY_START = 0; // 초반부 시작
CONFIG.PHASES.MID_START = CONFIG.PHASES.EARLY_END; // 중반부 시작
CONFIG.PHASES.MID_1_END = CONFIG.PHASES.MID_START + (CONFIG.PHASES.MID_END - CONFIG.PHASES.MID_START) / 2; // 중반부 1 종료
CONFIG.PHASES.LATE_START = CONFIG.PHASES.MID_END; // 후반부 시작