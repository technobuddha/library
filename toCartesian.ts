
import { CartesianCoordinate, PolarCoordinate } from './Coordinates';
/**
  * Convert polar coordinates to cartesian
  * @param radius    Radius.
  * @param angle    Angle in radians (zero points in +X direction).
  * @returns        Object containing the X and Y-distance for the angle and radius.
  */
export function toCartesian({radius, angle}: PolarCoordinate): CartesianCoordinate {
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}

export default toCartesian;
