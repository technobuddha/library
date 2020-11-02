import modulo from './modulo';

/**
  * Normalizes an angle to be in range [0-PI*2]. Angles outside this range will
  * be normalized to be the equivalent angle with that range.
  * @param angle    Angle in radians.
  * @return Standardized angle.
  */
export function normalizeAngle(radians: number):    number
{
    return modulo(radians, Math.PI * 2);
}

export default normalizeAngle;
