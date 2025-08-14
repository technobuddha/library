/**
 * Cartesian coordinate (x, y)
 *
 * @group Geometry
 * @category Coordinates
 */
export type Cartesian = {
  x: number;
  y: number;
};

/**
 * The origin of cartesian coordinates (0, 0)
 *
 * @group Geometry
 * @category Coordinates
 */
export const Origin: Cartesian = { x: 0, y: 0 };

/**
 * Polar coordinate (angle, radius)
 *
 * @group Geometry
 * @category Coordinates
 */
export type Polar = {
  radius: number;
  angle: number;
};

/**
 * A polygon (a set of cartesian coordinates)
 *
 * @group Geometry
 * @category Polygon
 */
export type Polygon = Cartesian[];

/**
 * A line segments (defined by two endpoints)
 *
 * @group Geometry
 * @category Line Segment
 */
export type LineSegment = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
};

/**
 * @group Geometry
 * @category Rectangle
 */
export type Rect = Cartesian & {
  width: number;
  height: number;
};
