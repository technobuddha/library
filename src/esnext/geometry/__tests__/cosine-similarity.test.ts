import { cosineSimilarity } from '../cosine-similarity.ts';

describe('cosineSimilarity', () => {
  test('identical vectors', () => {
    expect(cosineSimilarity({ x: 1, y: 0 }, { x: 1, y: 0 })).toBe(1);
    expect(cosineSimilarity({ x: 0, y: 1 }, { x: 0, y: 1 })).toBe(1);
  });

  test('opposite vectors', () => {
    expect(cosineSimilarity({ x: 1, y: 0 }, { x: -1, y: 0 })).toBe(-1);
    expect(cosineSimilarity({ x: 0, y: 1 }, { x: 0, y: -1 })).toBe(-1);
  });

  test('orthogonal vectors', () => {
    expect(cosineSimilarity({ x: 1, y: 0 }, { x: 0, y: 1 })).toBe(0);
    expect(cosineSimilarity({ x: 0, y: 1 }, { x: 1, y: 0 })).toBe(0);
  });

  test('arbitrary vectors', () => {
    const result = cosineSimilarity({ x: 3, y: 4 }, { x: 4, y: 3 });
    expect(result).toBeCloseTo(0.96, 2);
  });

  test('zero vector', () => {
    expect(cosineSimilarity({ x: 0, y: 0 }, { x: 1, y: 0 })).toBe(1);
    expect(cosineSimilarity({ x: 1, y: 0 }, { x: 0, y: 0 })).toBe(1);
    expect(cosineSimilarity({ x: 0, y: 0 }, { x: 0, y: 0 })).toBe(1);
  });

  test('negative values', () => {
    expect(cosineSimilarity({ x: -1, y: -1 }, { x: 1, y: 1 })).toBeCloseTo(-1, 8);
    expect(cosineSimilarity({ x: -1, y: 0 }, { x: 0, y: -1 })).toBeCloseTo(0, 8);
  });
});
