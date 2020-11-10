import normalizeAngle from './normalizeAngle';

type Point = {x: number, y: number};

/**
  * Computes the angle between two points (x1,y1) and (x2,y2).
  * Angle zero points in the +X direction, PI/2 radians points in the +Y
  * direction (down) and from there we grow clockwise towards PI*2 radians.
  * @param {[number, number] | { x: number, y: number }} a first point.
  * @param {[number, number] | { x: number, y: number }} b second.
  * @return {number} Standardized angle in radians of the vector from x1,y1 to x2,y2.
*/
export function angleBetweenPoints(a: Point, b: Point): number {
    return normalizeAngle(Math.atan2(b.y - a.y, b.x - a.x));
}

export default angleBetweenPoints;
