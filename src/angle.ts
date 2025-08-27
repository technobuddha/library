import { type Cartesian } from './@types/geometry.ts';

/**
 * Types of angle units
 *
 * | unit          | number in full circle |
 * | ------------- | --------------------- |
 * | deg           | 360                   |
 * | degrees       | 360                   |
 * | rad           | 2π                    |
 * | radians       | 2π                    |
 * | turn          | 1                     |
 * | turns         | 1                     |
 * | arcmin        | 21600                 |
 * | arcminute     | 21600                 |
 * | arcsec        | 1296000               |
 * | arcsecond     | 1296000               |
 * | grad          | 400                   |
 * | gradians      | 400                   |
 *
 * @group Geometry
 * @category Angle
 */
export type AngleUnit =
  | 'deg'
  | 'degrees'
  | 'rad'
  | 'radians'
  | 'turn'
  | 'turns'
  | 'arcmin'
  | 'arcminutes'
  | 'arcsec'
  | 'arcseconds'
  | 'grad'
  | 'gradians';

/**
 * Number of units in a circle
 *
 * | division | name                  |
 * | -------- | --------------------- |
 * | 1        | turn, turns           |
 * | 2π       | rad, radians          |
 * | 360      | deg, degrees          |
 * | 400      | grad, gradians        |
 * | 21600    | arcmin, arcminutes    |
 * | 1296000  | arcsec, arcseconds    |
 *
 * @group Geometry
 * @category Angle
 */
export const angleUnits: Record<AngleUnit, number> = {
  deg: 360,
  degrees: 360,
  arcmin: 21600,
  arcminutes: 21600,
  arcsec: 1296000,
  arcseconds: 1296000,
  rad: Math.PI * 2,
  radians: Math.PI * 2,
  grad: 400,
  gradians: 400,
  turn: 1,
  turns: 1,
};

/**
 * Options for angle-related functions
 * @group Geometry
 * @category Angle
 */
export type UnitOptions = {
  /**
   * The unit of the angle (e.g., degrees, radians).
   */
  unit?: AngleUnit;
};

/**
 * Options for origin-related functions
 * @group Geometry
 * @category Angle
 */
export type OriginOptions = {
  /**
   * The origin for this operation
   */
  origin?: Cartesian;
};
