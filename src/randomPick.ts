/**
 * Pick a random items from a list.
 *
 * @param list      Array of items to pick from
 * @param random    Random number generator
 * @default random  Math.random
 * @returns Randomly selected item
 */
export function randomPick<T = unknown>(list: T[], random: (() => number) = Math.random): T | undefined {
    return list.length === 0 ? undefined : list[Math.floor(random() * list.length)];
}

export default randomPick;
