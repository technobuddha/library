/**
 * Types of angle units
 *
 * @group Geometry
 * @category Angle
 */
export type AngleUnit = 'deg' | 'degrees' | 'rads' | 'radians' | 'grads' | 'gradians' | 'turns';

/**
 * Number of units in a circle
 * |unit|value|
 * |---|---|
 * |deg|360|
 * |degrees|360|
 * |rads|2π|
 * |radians|2π|
 * |grads|400|
 * |gradians|400|
 * |turns|1|
 *
 * @group Geometry
 * @category Angle
 */
export const angleUnits: Record<AngleUnit, number> = {
  deg: 360,
  degrees: 360,
  rads: Math.PI * 2,
  radians: Math.PI * 2,
  grads: 400,
  gradians: 400,
  turns: 1,
};
