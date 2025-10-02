import { modulo } from '../math/modulo.ts';

import { type LineSegment, type Polygon } from './geometry.ts';
import { toLineSegment } from './to-line-segment.ts';

/**
 * Generate line segments for each side of the polygon.
 * @param polygon - The polygon to extract sides from
 * @returns Generator that yields line segments for each edge
 * @group Geometry
 * @category Polygon
 */
export function* polygonSides(polygon: Polygon): Generator<LineSegment> {
  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i];
    const p2 = polygon[modulo(i + 1, polygon.length)];
    yield toLineSegment(p1, p2);
  }
}
