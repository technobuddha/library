/**
 * Converts degrees to radians.
 *
 * @param angle Angle in degrees.
 * @return Angle in radians.
 */
export function toRadians(angle: number): number {
    return Math.PI * angle / 180;
}

export default toRadians;
