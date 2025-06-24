// Utility for XP calculation and level difference percent

// Level difference XP modifier table (as per user rules)
export function getLevelDiffPercent(diff) {
  if (diff >= 16) return 40;
  if (diff === 15) return 115;
  if (diff === 14) return 120;
  if (diff === 13) return 125;
  if (diff === 12) return 130;
  if (diff === 11) return 135;
  if (diff === 10) return 140;
  if (diff === 9) return 135;
  if (diff === 8) return 130;
  if (diff === 7) return 125;
  if (diff === 6) return 120;
  if (diff === 5) return 115;
  if (diff === 4) return 110;
  if (diff === 3) return 105;
  if (diff >= -2 && diff <= 2) return 100;
  if (diff >= -6 && diff <= -3) return 95;
  if (diff >= -15 && diff <= -7) return 90;
  if (diff >= -20 && diff <= -16) return 85;
  if (diff >= -25 && diff <= -21) return 60;
  if (diff >= -30 && diff <= -26) return 35;
  if (diff <= -31) return 10;
  return 100;
}

export function calculateXP({
  monsters,
  expRate,
  level,
  levelPercent,
  jobLevel,
  jobPercent,
  baseTable,
  jobTable,
  maxJobLevel,
  maxLevel,
}) {
  let currentLevel = Number(level);
  let currentLevelPercent = Number(levelPercent);
  let currentJobLevel = Number(jobLevel);
  let currentJobPercent = Number(jobPercent);
  let totalBaseXP = 0;
  let totalJobXP = 0;
  let baseXP = 0;
  let jobXP = 0;
  let log = [];

  // Deep copy for simulation
  let playerLevel = currentLevel;
  let playerLevelPercent = currentLevelPercent;
  let playerBaseXP = 0;
  let playerJobLevel = currentJobLevel;
  let playerJobPercent = currentJobPercent;
  let playerJobXP = 0;

  // Helper to get XP needed for next level
  function getNextBaseXP(lvl) {
    if (!baseTable) return 1e9;
    return baseTable[String(lvl + 1)] || 1e9;
  }
  function getNextJobXP(lvl) {
    if (!jobTable) return 1e9;
    return jobTable[String(lvl + 1)] || 1e9;
  }

  for (let i = 0; i < monsters.length; i++) {
    const monster = monsters[i];
    let baseWave = 0;
    let jobWave = 0;
    // Simulate 20 kills per wave, updating level after each kill
    for (let k = 0; k < 20; k++) {
      const diff = monster.level - playerLevel;
      const percent = getLevelDiffPercent(diff);
      const base = monster.base_exp * (percent / 100) * (expRate / 100);
      const job = monster.job_exp * (percent / 100) * (expRate / 100);
      baseXP += base;
      jobXP += job;
      totalBaseXP += base;
      totalJobXP += job;
      playerBaseXP += base;
      playerJobXP += job;

      // Level up simulation for base
      let nextBaseXP = getNextBaseXP(playerLevel);
      let baseProgress = (playerLevelPercent / 100) * nextBaseXP + playerBaseXP;
      let newLevel = playerLevel;
      let newLevelPercent = playerLevelPercent;
      while (baseProgress >= nextBaseXP) {
        baseProgress -= nextBaseXP;
        newLevel++;
        nextBaseXP = getNextBaseXP(newLevel);
      }
      newLevelPercent = (baseProgress / nextBaseXP) * 100;
      playerLevel = newLevel;
      playerLevelPercent = newLevelPercent;
      playerBaseXP = 0;

      // Level up simulation for job
      let nextJobXP = getNextJobXP(playerJobLevel);
      let jobProgress = (playerJobPercent / 100) * nextJobXP + playerJobXP;
      let newJobLevel = playerJobLevel;
      let newJobPercent = playerJobPercent;
      while (jobProgress >= nextJobXP) {
        jobProgress -= nextJobXP;
        newJobLevel++;
        nextJobXP = getNextJobXP(newJobLevel);
      }
      newJobPercent = (jobProgress / nextJobXP) * 100;
      playerJobLevel = newJobLevel;
      playerJobPercent = newJobPercent;
      playerJobXP = 0;

      baseWave += base;
      jobWave += job;
    }
    log.push({
      monster: monster.nome,
      monsterLevel: monster.level,
      base: Math.round(baseWave),
      job: Math.round(jobWave),
      percent: getLevelDiffPercent(monster.level - currentLevel), // Show initial diff for the wave
      diff: monster.level - currentLevel,
      afterLevel: playerLevel,
      afterLevelPercent: playerLevelPercent.toFixed(2),
      afterJobLevel: playerJobLevel,
      afterJobLevelPercent: playerJobPercent.toFixed(2),
    });
  }
  totalBaseXP = Math.round(baseXP);
  totalJobXP = Math.round(jobXP);
  return {
    totalBaseXP,
    totalJobXP,
    log,
    finalLevel: playerLevel,
    finalLevelPercent: playerLevelPercent.toFixed(2),
    finalJobLevel: playerJobLevel,
    finalJobLevelPercent: playerJobPercent.toFixed(2),
    maxJobLevel,
    maxLevel,
  };
}
