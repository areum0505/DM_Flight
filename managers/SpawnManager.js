class SpawnManager {
  constructor() {
    this.waves = WAVES; // 웨이브 데이터 로드
    this.currentWaveIndex = 0;
  }

  update(enemies) { // GameScene의 enemies 배열을 직접 받음
    // 다음 웨이브가 존재하고, p5.js의 전체 frameCount를 기준으로 발동할 시간이 되었는지 확인
    if (this.currentWaveIndex < this.waves.length &&
        frameCount >= this.waves[this.currentWaveIndex].triggerFrame) {
      
      const currentWave = this.waves[this.currentWaveIndex];

      // 현재 웨이브의 모든 적을 생성
      for (const enemyData of currentWave.enemies) {
        // 데이터에 저장된 비율(0~1)과 실제 width를 곱해 x좌표 계산
        const xPos = enemyData.x * width;
        const yPos = enemyData.y;
        
        enemies.push(new Enemy(xPos, yPos, enemyData.type));
      }

      this.currentWaveIndex++; // 다음 웨이브를 기다림
    }
  }
}
