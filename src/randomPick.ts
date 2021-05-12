export function randomPick<T>(list: T[], random: (() => number) = Math.random): T {
    return list[Math.floor(random() * list.length)];
}
