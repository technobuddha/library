import { loremIpsum } from '../lorem-ipsum.ts';

describe('loremIpsum', () => {
  test('generates default single paragraph', () => {
    const result = loremIpsum();

    expect(result).toBeString();
    expect(result.length).toBeGreaterThan(0);
    expect(result).not.toContain('\n'); // Single paragraph should not have line breaks
    expect(result).toMatch(/^[A-Z]/v); // Should start with capital letter
    expect(result).toMatch(/\.$/v); // Should end with period
  });

  test('generates multiple paragraphs', () => {
    const result = loremIpsum({ paragraphs: 3 });

    expect(result).toBeString();
    expect(result.split('\n')).toHaveLength(3);

    // Each paragraph should start with capital and end with period
    const paragraphs = result.split('\n');
    for (const paragraph of paragraphs) {
      expect(paragraph).toMatch(/^[A-Z]/v);
      expect(paragraph).toMatch(/\.$/v);
    }
  });

  test('generates short paragraphs', () => {
    const result = loremIpsum({ size: 'short', paragraphs: 1 });

    expect(result).toBeString();
    expect(result.length).toBeGreaterThan(0);

    // Count sentences (periods)
    const sentenceCount = (result.match(/\./gv) ?? []).length;
    expect(sentenceCount).toBeGreaterThanOrEqual(2);
    expect(sentenceCount).toBeLessThanOrEqual(8);
  });

  test('generates middle-sized paragraphs', () => {
    const result = loremIpsum({ size: 'middle', paragraphs: 1 });

    expect(result).toBeString();
    expect(result.length).toBeGreaterThan(0);

    // Count sentences (periods)
    const sentenceCount = (result.match(/\./gv) ?? []).length;
    expect(sentenceCount).toBeGreaterThanOrEqual(3);
    expect(sentenceCount).toBeLessThanOrEqual(20);
  });

  test('generates long paragraphs', () => {
    const result = loremIpsum({ size: 'long', paragraphs: 1 });

    expect(result).toBeString();
    expect(result.length).toBeGreaterThan(0);

    // Count sentences (periods)
    const sentenceCount = (result.match(/\./gv) ?? []).length;
    expect(sentenceCount).toBeGreaterThanOrEqual(6);
    expect(sentenceCount).toBeLessThanOrEqual(40);
  });

  test('preserves first 5 words when option is enabled', () => {
    const result1 = loremIpsum({ preserveFirstWords: true });
    const result2 = loremIpsum({ preserveFirstWords: true });

    // First 5 words should be identical when preserveFirstWords is true
    const firstFiveWords1 = result1.split(' ').slice(0, 5).join(' ');
    const firstFiveWords2 = result2.split(' ').slice(0, 5).join(' ');

    expect(firstFiveWords1).toEqual(firstFiveWords2);

    // First sentence should have at least 6 words when preserved
    const [firstSentence] = result1.split('.', 1);
    const firstSentenceWords = firstSentence.split(' ').length;
    expect(firstSentenceWords).toBeGreaterThanOrEqual(6);
  });

  test('generates different content when preserveFirstWords is false', () => {
    const results = Array.from({ length: 10 }, () => loremIpsum({ preserveFirstWords: false }));

    // Not all results should be identical (high probability they differ)
    const uniqueResults = new Set(results);
    expect(uniqueResults.size).toBeGreaterThan(1);
  });

  test('uses different sources', () => {
    const loremResult = loremIpsum({ source: 'lorem-ipsum' });
    const haroldResult = loremIpsum({ source: 'childe-harold' });

    expect(loremResult).toBeString();
    expect(haroldResult).toBeString();
    expect(loremResult).not.toEqual(haroldResult);
  });

  test('handles zero paragraphs', () => {
    const result = loremIpsum({ paragraphs: 0 });

    expect(result).toBe('');
  });

  test('properly formats multiple paragraphs with newlines', () => {
    const result = loremIpsum({ paragraphs: 3 });

    expect(result.split('\n')).toHaveLength(3);

    // Should not start or end with newlines
    expect(result).not.toMatch(/^\n/v);
    expect(result).not.toMatch(/\n$/v);
  });

  test('sentences have proper spacing', () => {
    const result = loremIpsum({ paragraphs: 1 });

    // Should have double spaces between sentences (except first)
    expect(result).toMatch(/\. {2}[A-Z]/v);
  });

  test('words are properly capitalized and formatted', () => {
    const result = loremIpsum({ paragraphs: 1 });

    // Should start each sentence with capital letter
    const sentences = result.split(/\. {2}|^\.|\.$/v);
    for (const sentence of sentences) {
      if (sentence.trim()) {
        expect(sentence.trim()).toMatch(/^[A-Z]/v);
      }
    }
  });

  test('generates consistent structure across calls', () => {
    const options = { paragraphs: 2, size: 'middle' as const, preserveFirstWords: true };
    const result1 = loremIpsum(options);
    const result2 = loremIpsum(options);

    // Structure should be similar (same number of paragraphs)
    expect(result1.split('\n')).toHaveLength(2);
    expect(result2.split('\n')).toHaveLength(2);

    // First 5 words should be identical due to preserveFirstWords
    const firstFiveWords1 = result1.split(' ').slice(0, 5).join(' ');
    const firstFiveWords2 = result2.split(' ').slice(0, 5).join(' ');
    expect(firstFiveWords1).toEqual(firstFiveWords2);
  });

  test('handles edge case with single word sentences', () => {
    // This tests the randomNumber function's edge cases
    const result = loremIpsum({ size: 'short', paragraphs: 1 });

    expect(result).toBeString();
    expect(result.length).toBeGreaterThan(0);
    expect(result).toMatch(/^[A-Z]/v);
    expect(result).toMatch(/\.$/v);
  });

  test('preserveFirstWords ensures minimum word count and preserves first 5 words', () => {
    const result = loremIpsum({ preserveFirstWords: true, size: 'short' });
    const [firstSentence] = result.split('.', 1);
    const wordCount = firstSentence.split(' ').length;

    // When preserveFirstWords is true, first sentence should have at least 6 words
    expect(wordCount).toBeGreaterThanOrEqual(6);

    // Test that first 5 words are consistently preserved
    const result2 = loremIpsum({ preserveFirstWords: true, size: 'short' });
    const firstFiveWords1 = result.split(' ').slice(0, 5).join(' ');
    const firstFiveWords2 = result2.split(' ').slice(0, 5).join(' ');
    expect(firstFiveWords1).toEqual(firstFiveWords2);
  });
});
