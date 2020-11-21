/**
 * Performs linear interpolation between values a and b. Returns the value
 * between a and b proportional to x (when x is between 0 and 1. When x is
 * outside this range, the return value is a linear extrapolation).
 * 
 * @param a A number.
 * @param b A number.
 * @param proportion The proportion between a and b.
 * @returns The interpolated value between a and b.
 */
export function lerp(a: number, b: number, proportion: number): number {
    return a + proportion * (b - a);
}

export default lerp;
