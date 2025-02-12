/**
 * Angle units.
 * @group Geometry
 * @category Angle Conversion
 */
export const angleUnits = {
  degrees: 360,
  rads: 6.283185307179586, // Math.PI * 2,
  radians: 6.283185307179586, // Math.PI * 2,
  grads: 400,
  gradians: 400,
  turns: 1,
};

/**
 * Angle units.
 * @group Geometry
 * @category Angle Conversion
 */
export type AngleUnit = keyof typeof angleUnits;
