import normalizeAngle from './normalizeAngle';
import { Polar, Cartesian } from './coordinates';


/**
  * Convert ccartesian coordinates to polar
  * @param x        X coordinate
  * @param y        Y coordinate
  */
export function toPolar({x, y}: Cartesian): Polar {
    return { radius: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), angle: normalizeAngle(Math.atan2(y, x)) };
}

export default toPolar;
