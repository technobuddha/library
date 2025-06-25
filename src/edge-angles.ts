import { type Polygon } from './geometry.ts';
import { modulo } from './modulo.ts';

/**
 * Generate normalized edge angles from polygon edges.
 * @param polygon - The polygon to extract edge angles from
 * @param normalizeTo - Angle to normalize to (e.g., Math.PI * 2 for full rotation, Math.PI / 2 for quadrant)
 * @returns Generator that yields edge angles, normalized to the specified range
 *
 * @group Geometry
 * @category Polygon
 */
export function* edgeAngles(
  polygon: Polygon,
  normalizeTo: number = Math.PI * 2,
): Generator<number> {
  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i];
    const p2 = polygon[modulo(i + 1, polygon.length)];
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    yield modulo(angle, normalizeTo);
  }
}
