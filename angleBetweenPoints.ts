import normalizeAngle from './normalizeAngle';
import {Cartesian}    from './coordinates';

/**
 * Computes the angle between two points (x1,y1) and (x2,y2).
 * Angle zero points in the +X direction, PI/2 radians points in the +Y
 * direction (down) and from there we grow clockwise towards PI*2 radians.
 * 
 * @param a first point.
 * @param b second.
 * @return Standardized angle in radians of the vector from *a* to *b*.
 */
export function angleBetweenPoints(a: Cartesian, b: Cartesian): number {
    return normalizeAngle(Math.atan2(b.y - a.y, b.x - a.x));
}

export default angleBetweenPoints;
