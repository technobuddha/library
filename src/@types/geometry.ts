/**
 * Represents a point in 2D Cartesian coordinate space.
 *
 * @group Geometry
 * @category Coordinates
 */
export type Cartesian = {
  /** The x-coordinate value. */
  x: number;
  /** The y-coordinate value. */
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
  r: number;
  φ: number;
};

/**
 * A polygon (a set of cartesian coordinates)
 *
 * @group Geometry
 * @category Polygon
 */
export type Polygon = Cartesian[];

/**
 * Represents a line segment in 2D space, defined by its start and end points.
 *
 * @group Geometry
 * @category Line Segment
 */
export type LineSegment = {
  /** The x-coordinate of the start point. */
  x0: number;
  /** The y-coordinate of the start point. */
  y0: number;
  /** The x-coordinate of the end point. */
  x1: number;
  /** The y-coordinate of the end point. */
  y1: number;
};

/**
 * A rectangle (defined by its top-left corner, width and height)
 *
 * @group Geometry
 * @category Rectangle
 */
export type Rect = Cartesian & {
  /** The width of the rectangle. */
  width: number;
  /** The height of the rectangle. */
  height: number;
};

/**
 * Represents a two-dimensional amount `x` and `y` aspects.
 * @group Geometry
 * @category Coordinates
 */
export type XY = {
  /**
   * The horizontal amount.
   */
  x: number;
  /**
   * The vertical amount.
   */
  y: number;
};
