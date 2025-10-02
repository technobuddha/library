import { modulo } from '../math/modulo.ts';

import { type Polygon } from './geometry.ts';

/**
 * Generate normalized edge angles from polygon edges.
 * @param polygon - The polygon to extract edge angles from
 * @param normalizeTo - Angle to normalize to (e.g., Math.PI * 2 for full rotation, Math.PI / 2 for quadrant)
 * @returns Generator that yields edge angles, normalized to the specified range
 * @example
 * ```typescript
 * const polygon: Polygon = [
 *   { x: 0, y: 0 },
 *   { x: 1, y: 1 },
 *   { x: 0, y: 2 },
 *   { x: -1, y: 1 }
 * ];
 * const angles = edgeAngles(polygon);
 * for (const angle of angles) {
 *   console.log(angle);
 * }
 * // Output:
 * // 0.7853981633974483
 * // 2.356194490192345
 * // 3.9269908169872414
 * // 5.497787143782138
 * ```
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
