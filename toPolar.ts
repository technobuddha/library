import normalizeAngle from './normalizeAngle';
import { PolarCoordinate, CartesianCoordinate } from './Coordinates';


/**
  * Convert ccartesian coordinates to polar
  * @param x        X coordinate
  * @param y        Y coordinate
  */
export function toPolar({x, y}: CartesianCoordinate): PolarCoordinate {
    return { radius: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), angle: normalizeAngle(Math.atan2(y, x)) };
}

export default toPolar;
