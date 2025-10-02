import { applyPatches, patch, patchesFromText, patchesToText } from '../patch-public.ts';

describe('patch', () => {
  test('should create and apply simple patch', () => {
    const text1 = 'The quick brown fox jumps over the lazy dog.';
    const text2 = 'The quick red fox jumps over the sleepy dog.';

    // Create patches
    const patches = patch(text1, text2);

    expect(patches.length).toBeGreaterThan(0);

    // Apply patches
    const result = applyPatches(patches, text1);

    expect(result.text).toBe(text2);
    expect(result.results.every(Boolean)).toBeTrue();
  });

  test('should serialize and deserialize patches', () => {
    const text1 = 'Hello world';
    const text2 = 'Hello there';

    // Create patches
    const patches = patch(text1, text2);

    // Serialize
    const patchText = patchesToText(patches);
    expect(patchText).toContain('@@');

    // Deserialize
    const parsedPatches = patchesFromText(patchText);
    expect(parsedPatches.length).toBe(patches.length);

    // Apply deserialized patches
    const result = applyPatches(parsedPatches, text1);
    expect(result.text).toBe(text2);
  });

  test('should handle fuzzy matching', () => {
    const text1 = 'The cat sat on the mat.';
    const text2 = 'The dog sat on the mat.';

    // Create patches
    const patches = patch(text1, text2);

    // Apply to slightly modified text
    const modifiedText = 'The cat sat on the big mat.';
    const result = applyPatches(patches, modifiedText);

    expect(result.text).toBe('The dog sat on the big mat.');
    expect(result.results[0]).toBeTrue();
  });

  test('should return empty array for identical texts', () => {
    const text = 'No changes here';
    const patches = patch(text, text);

    expect(patches).toHaveLength(0);
  });

  test('should handle empty text', () => {
    const patches = patch('', 'new text');

    expect(patches.length).toBeGreaterThan(0);

    const result = applyPatches(patches, '');
    expect(result.text).toBe('new text');
    expect(result.results[0]).toBeTrue();
  });
});
