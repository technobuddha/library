export function create2DArray<T>(width: number, height: number, fill: T): T[][] {
    return Array.from(Array(width), () => new Array<T>(height).fill(fill));
}

export default {create2DArray};