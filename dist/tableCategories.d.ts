export const tableCategories: ({
    label: string;
    base: string;
    job: string;
    maxLevel: number;
    maxJob: number;
    minLevel?: undefined;
} | {
    label: string;
    base: string;
    job: string;
    minLevel: number;
    maxLevel: number;
    maxJob: number;
})[];
