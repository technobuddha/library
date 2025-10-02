import { type Cartesian } from './geometry.ts';

/**
 * Calculates the cosine similarity between two 2D vectors.
 *
 * Cosine similarity measures the cosine of the angle between two vectors, returning a value in the range [-1, 1].
 *
 * If either vector is the zero vector, returns 1 (maximum difference).
 *
 * @param a - The first vector as a Cartesian coordinate.
 * @param b - The second vector as a Cartesian coordinate.
 * @returns The cosine similarity between the two vectors.
 *
 * @example
 * ```ts
 * import { cosineSimilarity } from "@technobuddha/library";
 *
 * cosineSimilarity({x: 1, y: 0}, {x: 0, y: 1}); // 0
 * cosineSimilarity({x: 1, y: 0}, {x: 1, y: 0}); // 1
 * cosineSimilarity({x: 1, y: 0}, {x: -1, y: 0}); // -1
 * cosineSimilarity({x: 3, y: 4}, {x: 4, y: 3}); // ~0.96
 * ```
 *
 * @group Geometry
 * @category Similarity
 */
export function cosineSimilarity(a: Cartesian, b: Cartesian): number {
  const dotProduct = a.x * b.x + a.y * b.y;
  const magnitudeA = Math.hypot(a.x, a.y);
  const magnitudeB = Math.hypot(b.x, b.y);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 1; // If either vector is zero, return maximum difference
  }

  return dotProduct / (magnitudeA * magnitudeB);
}
