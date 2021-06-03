
/**
 * Compute the hypotenuse of a (multi-dimensional) right triangle
 *
 * @param sides The length of each side of the triangle
 * @returns The hypotenuse
 */
export function hypot(...sides: number[]): number {
    return Math.sqrt(sides.reduce((sum, side) => sum + side ** 2, 0))
}

export default hypot;
