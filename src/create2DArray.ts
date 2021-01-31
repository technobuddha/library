import isFunction from 'lodash/isFunction';

/**
 * Create a two dimensional array with all elements initialized
 *
 * @remark Array is accessed by array[w][h]
 *
 * @param width Width of the array
 * @param height Height of the array
 * @param fill value to fill the array, or a function returning the fill value for each element
 */
export function create2DArray<T>(width: number, height: number, fill: T | ((x: number, y: number) => T)): T[][] {
    if(isFunction(fill))
        return Array.from(Array(width), (_1, x) => Array.from(Array<T>(height), (_2, y) => fill(x, y)));

    return Array.from(Array(width), () => new Array<T>(height).fill(fill));
}

export default create2DArray;
