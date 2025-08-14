import { type LineSegment, type Polygon, type Rect } from './@types/geometry.ts';
import { bounds } from './bounds.ts';
import { edgeAngles } from './edge-angles.ts';
import { isInPolygon } from './is-in-polygon.ts';
import { lerp } from './lerp.ts';
import { lineIntersection } from './line-intersection.ts';
import { polygonSides } from './polygon-sides.ts';
import { rotate } from './rotate.ts';

/**
 * Represents a rectangle that has been rotated by a certain angle.
 * Extends the `Rect` type with additional properties for the area and rotation angle.
 *
 * @group Geometry
 * @category Rectangle
 */
export type RotatedRect = Rect & {
  /* The area of the rotated rectangle. */
  area: number;
  /* The rotation angle of the rectangle, in radians. */
  angle: number;
};

/**
 * Configuration options for the largest inscribed rectangle algorithm.
 *
 * @group Geometry
 * @category Rectangle
 */
export type LargestInscribedRectangleOptions = {
  /**
   * If true, only consider axis-aligned rectangles.
   * If false, considers rectangles at all orientations.
   * @defaultValue true
   */
  aligned?: boolean;

  /**
   * If true, only consider squares (rectangles where width equals height).
   * If false, considers rectangles of any aspect ratio.
   * @defaultValue false
   */
  squareOnly?: boolean;
};

// Algorithm constants
const SAMPLE_POINT_COUNT = 20;
const AREA_TOLERANCE = 1e-10;
const ANGLE_TOLERANCE = 1e-10;
const VERTICAL_LINE_EXTENT = 1e100; // For creating "infinite" vertical lines

/**
 * Computes the largest rectangle that can be inscribed within the given polygon.
 *
 * @param polygon - The polygon within which to inscribe the rectangle.
 * @param options - Configuration options for the computation.
 * @returns The largest inscribed rectangle.
 * @throws `Error` When polygon has fewer than 3 vertices
 *
 * @group Geometry
 * @category Polygon
 * @category Rectangle
 */
export function largestInscribedRectangle(
  polygon: Polygon,
  options?: { aligned?: true; squareOnly?: boolean },
): Rect;
export function largestInscribedRectangle(
  polygon: Polygon,
  options: { aligned: false; squareOnly?: boolean },
): RotatedRect;
export function largestInscribedRectangle(
  polygon: Polygon,
  { aligned = true, squareOnly = false }: LargestInscribedRectangleOptions = {},
): Rect | RotatedRect {
  if (polygon.length < 3) {
    throw new Error(`Polygon must have at least 3 vertices, received ${polygon.length}`);
  }

  if (aligned) {
    const rect = findLargestAxisAlignedRectangle(polygon, squareOnly);
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  }
  return findLargestRotatedRectangle(polygon, squareOnly);
}

/**
 * Find the largest inscribed rectangle using rotating calipers algorithm.
 * Tests each edge orientation to find the optimal rectangle angle.
 * @param polygon - The polygon to search within
 * @param squareOnly - If true, only consider squares
 * @returns The largest inscribed rectangle with area and angle properties
 */
function findLargestRotatedRectangle(polygon: Polygon, squareOnly: boolean): RotatedRect {
  let maxRectangle: RotatedRect = { x: 0, y: 0, width: 0, height: 0, area: 0, angle: 0 };

  // Use π/2 normalization since rectangles have 4-fold symmetry
  for (const angle of edgeAngles(polygon, Math.PI / 2)) {
    const rotatedPolygon = rotate(polygon, -angle);
    const rect = findLargestAxisAlignedRectangle(rotatedPolygon, squareOnly);

    const isBetterArea = rect.area > maxRectangle.area + AREA_TOLERANCE;
    const isSameAreaButBetterAngle =
      Math.abs(rect.area - maxRectangle.area) <= AREA_TOLERANCE &&
      angle < maxRectangle.angle + ANGLE_TOLERANCE;

    if (isBetterArea || isSameAreaButBetterAngle) {
      maxRectangle = { ...rect, angle };
    }
  }

  return maxRectangle;
}

// cspell: ignore sweepline
/**
 * Generate sample x-coordinates for sweepline algorithm.
 * Combines polygon vertex x-coordinates with evenly spaced sample points.
 * @param polygon - The polygon to sample coordinates from
 * @returns Sorted array of unique x-coordinates
 */
function generateSampleXCoords(polygon: Polygon): number[] {
  const bounding = bounds(polygon);
  const vertexXCoords = [...new Set(polygon.map((p) => p.x))];
  const coords = new Set(vertexXCoords);

  for (let i = 0; i <= SAMPLE_POINT_COUNT; i++) {
    const t = i / SAMPLE_POINT_COUNT;
    const x = lerp(bounding.x, bounding.x + bounding.width, t);
    coords.add(x);
  }

  return Array.from(coords).sort((a, b) => a - b);
}

/**
 * Find the largest axis-aligned rectangle using sweepline algorithm.
 * @param polygon - The polygon to search within
 * @param squareOnly - If true, only consider squares
 * @returns The largest inscribed rectangle with area and angle properties
 */
function findLargestAxisAlignedRectangle(polygon: Polygon, squareOnly: boolean): RotatedRect {
  let maxArea = 0;
  let bestRect: RotatedRect = { x: 0, y: 0, width: 0, height: 0, area: 0, angle: 0 };

  const xCoords = generateSampleXCoords(polygon);

  for (let i = 0; i < xCoords.length; i++) {
    for (let j = i + 1; j < xCoords.length; j++) {
      const x0 = xCoords[i];
      const x1 = xCoords[j];
      const { width, height, y } = calculateRectangleDimensions(polygon, x0, x1, squareOnly);

      const area = width * height;
      if (area > maxArea) {
        maxArea = area;
        bestRect = { x: x0, y, width, height, area, angle: 0 };
      }
    }
  }

  return bestRect;
}

/**
 * Calculate rectangle dimensions between two x-coordinates.
 * @param polygon - The polygon to fit the rectangle within
 * @param x0 - First x-coordinate of the rectangle
 * @param x1 - Second x-coordinate of the rectangle
 * @param squareOnly - If true, constrain to square dimensions
 * @returns Rectangle dimensions and y-position
 */
function calculateRectangleDimensions(
  polygon: Polygon,
  x0: number,
  x1: number,
  squareOnly: boolean,
): { width: number; height: number; y: number } {
  let width = Math.abs(x1 - x0); // Handle case where x1 < x0
  const { height: maxHeight, y } = getMaxHeightBetweenX(
    polygon,
    Math.min(x0, x1),
    Math.max(x0, x1),
  );
  let height = maxHeight;

  if (squareOnly) {
    const size = Math.min(width, height);
    width = size;
    height = size;
  }

  return { width, height, y };
}

/**
 * Find the maximum height rectangle that can fit between two vertical lines.
 * @param polygon - The polygon to search within
 * @param x0 - First boundary x-coordinate
 * @param x1 - Second boundary x-coordinate
 * @returns Maximum height and optimal y-position
 */
function getMaxHeightBetweenX(
  polygon: Polygon,
  x0: number,
  x1: number,
): { height: number; y: number } {
  const intersections: number[] = [];

  // Find all y-intersections of vertical lines at x0 and x1
  for (const segment of polygonSides(polygon)) {
    // Check intersection with first vertical line
    const y0 = getVerticalIntersection(segment, x0);
    if (y0 !== null) {
      intersections.push(y0);
    }

    // Check intersection with second vertical line
    const y1 = getVerticalIntersection(segment, x1);
    if (y1 !== null) {
      intersections.push(y1);
    }
  }

  intersections.sort((a, b) => a - b);

  // Find largest gap between intersections
  let maxHeight = 0;
  let bestY = 0;

  for (let i = 0; i < intersections.length - 1; i++) {
    const height = intersections[i + 1] - intersections[i];
    const y = intersections[i];

    if (isInPolygon({ x: x0, y, width: x1 - x0, height }, polygon)) {
      if (height > maxHeight) {
        maxHeight = height;
        bestY = y;
      }
    }
  }

  return { height: maxHeight, y: bestY };
}

/**
 * Find where a vertical line intersects a line segment using lineIntersection.
 * @param segment - The line segment to intersect
 * @param x - The x-coordinate of the vertical line
 * @returns The y-coordinate of intersection, or null if no intersection
 */
function getVerticalIntersection(segment: LineSegment, x: number): number | null {
  const verticalLine: LineSegment = {
    x0: x,
    y0: -VERTICAL_LINE_EXTENT,
    x1: x,
    y1: VERTICAL_LINE_EXTENT,
  };

  const intersection = lineIntersection(segment, verticalLine, false);
  return intersection?.y ?? null;
}
