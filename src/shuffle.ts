export function shuffle<T>(deck: T[], random: (() => number) = Math.random): T[] {
    const items = [ ...deck ];
    let index = items.length;

    while(index > 1) {
        const rnd = Math.floor(random() * index);
        const tmp = items[--index];
        items[index] = items[rnd];
        items[rnd]   = tmp;
    }

    return items;
}

export default shuffle;
