export function randomBetween2Values(v1: number, v2: number, decimalPlaces = 0): number
{
    const min = Math.min(v1, v2);
    const dif = Math.abs(v1 - v2);
    const mult = Math.pow(10, decimalPlaces);
    return min + (Math.floor(Math.random() * (dif * mult)) / mult);
}