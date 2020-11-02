
/**
  * Convert an angle from radians to degrees
  * @param radians	Angle in radians
  */
export function toDegrees(angle: number): number
{
    return 180 * angle / Math.PI;
}

export default toDegrees;
