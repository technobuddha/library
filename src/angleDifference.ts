import normalizeAngle from './normalizeAngle';

/**
 * Computes the difference between startAngle and endAngle (angles in radians).
 * 
 * @param startAngle Start angle in radians.
 * @param endAngle End angle in radians.
 * @returns The number of radians that when added to *startAngle* will result in *endAngle*.
 * 
 * @remarks
 * Positive numbers mean that the
 * direction is clockwise. Negative numbers indicate a counter-clockwise direction.
 * The shortest route (clockwise vs counter-clockwise) between the angles is used.
 * When the difference is PI radians, the function returns PI (not -PI)
 * 
 * @example
 * angleDifference(PI * 1/6,  PI * 2/6) is PI * 1/6
 * 
 * angleDifference(PI * 2/6, PI * 1/6)  is -PI * 1/6.
 * 
 * angleDifference(PI * 11/6, PI * 1/6) is PI * 2/6
 * 
 * angleDifference(PI * 1/6, PI * 11/6) is -PI * 1/6.
 */
export function angleDifference(startAngle: number, endAngle: number): number {
    let d = normalizeAngle(endAngle) - normalizeAngle(startAngle);
    if(d > Math.PI)
        d -= Math.PI * 2;
    else if(d < -Math.PI)
        d += Math.PI * 2;

    return d;
}

export default angleDifference;
