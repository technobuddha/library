function sameValue(x: any, y: any) {
    if (x === y)
        return x !== 0 || 1 / x === 1 / y;
    else
        return x !== x && y !== y;
}

/**
 * Compare two object for equality.  Testing goes one level deep.
 * 
 * @param objA First object to compare
 * @param objB Second object to compare
 * @param exclude Array of key names to exclude from the comparison
 * @returns true if the two objects have the same members
 */
export function shallowEquals(objA: Record<string, unknown> | null | undefined, objB: Record<string, unknown> | null | undefined, exclude: string[] = []): boolean {
    if (sameValue(objA, objB))
        return true;

    if(objA === null || objA == undefined || objB === null || objB === undefined)
        return false;

    const hash  = new Set(exclude);

    const keysA = Object.keys(objA).filter(key => !hash.has(key));
    const keysB = Object.keys(objB).filter(key => !hash.has(key));

    if (keysA.length !== keysB.length)
        return false;

    for (const key of keysA) {
        if (!Object.prototype.hasOwnProperty.call(objB, key) || !sameValue(objA[key], objB[key]))
            return false;
    }

    return true;
}

export default shallowEquals;
