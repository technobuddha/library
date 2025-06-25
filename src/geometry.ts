/**
 * @group Geometry
 * @category Coordinates
 */
export type Cartesian = {
  x: number;
  y: number;
};

/**
 * @group Geometry
 * @category Coordinates
 */
export const ORIGIN: Cartesian = { x: 0, y: 0 };

/**
 * @group Geometry
 * @category Coordinates
 */
export type Polar = {
  radius: number;
  angle: number;
};

/**
 * @group Geometry
 * @category Polygon
 */
export type Polygon = Cartesian[];

/**
 * @group Geometry
 * @category LineSegment
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
