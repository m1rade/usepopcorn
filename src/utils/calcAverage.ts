export const calAverage = <T extends number>(arr: T[]) => arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);
