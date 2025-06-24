export function getLevelDiffPercent(diff: any): 60 | 10 | 110 | 40 | 115 | 120 | 125 | 130 | 135 | 140 | 105 | 100 | 95 | 90 | 85 | 35;
export function calculateXP({ monsters, expRate, level, levelPercent, jobLevel, jobPercent, baseTable, jobTable, maxJobLevel, maxLevel, }: {
    monsters: any;
    expRate: any;
    level: any;
    levelPercent: any;
    jobLevel: any;
    jobPercent: any;
    baseTable: any;
    jobTable: any;
    maxJobLevel: any;
    maxLevel: any;
}): {
    totalBaseXP: number;
    totalJobXP: number;
    log: {
        monster: any;
        monsterLevel: any;
        base: number;
        job: number;
        percent: number;
        diff: number;
        afterLevel: number;
        afterLevelPercent: string;
        afterJobLevel: number;
        afterJobLevelPercent: string;
    }[];
    finalLevel: number;
    finalLevelPercent: string;
    finalJobLevel: number;
    finalJobLevelPercent: string;
    maxJobLevel: any;
    maxLevel: any;
};
