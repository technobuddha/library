import isFunction from 'lodash/isFunction';

export function create2DArray<T>(width: number, height: number, fill: T | ((v: T, k: number) => T)): T[][] {
    if(isFunction(fill)) {
        return Array.from(Array(width), () => Array.from(Array(height), fill));
    }
    return Array.from(Array(width), () => new Array(height).fill(fill));
}

export default create2DArray;