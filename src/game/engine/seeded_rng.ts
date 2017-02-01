export function SeededRandom(seed: number, max: number, min: number) {
    max = max || 1;
    min = min || 0;

    let rnd = ((seed * 9301 + 49297) % 233280) / 233280;

    return min + rnd * (max - min);
}