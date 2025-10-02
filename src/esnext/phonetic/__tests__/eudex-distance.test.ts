import { eudexDistance } from '../eudex-distance.ts';

describe('eudexDistance', () => {
  test('identical strings have zero distance', () => {
    expect(eudexDistance('cat', 'cat')).toBe(0);
    expect(eudexDistance('', '')).toBe(0);
  });

  test('similar sounding words have low distance', () => {
    expect(eudexDistance('cat', 'kat')).toBe(256);
    expect(eudexDistance('dog', 'dawg')).toBe(0);
  });

  test('different words have higher distance', () => {
    expect(eudexDistance('cat', 'dog')).toBe(259);
    expect(eudexDistance('cat', 'catalogue')).toBe(149);
    expect(eudexDistance('cat', 'mouse')).toBe(392);
  });

  test('empty string vs non-empty string', () => {
    expect(eudexDistance('', 'cat')).toBe(260);
    expect(eudexDistance('cat', '')).toBe(260);
  });

  test('case insensitivity', () => {
    expect(eudexDistance('Cat', 'cat')).toBe(0);
    expect(eudexDistance('DOG', 'dog')).toBe(0);
  });

  test('unicode and accented characters', () => {
    expect(eudexDistance('café', 'cafe')).toBe(1);
    expect(eudexDistance('über', 'uber')).toBe(128);
  });

  test('long strings', () => {
    expect(eudexDistance('encyclopedia', 'encyclopaedia')).toBe(0);
    expect(eudexDistance('encyclopedia', 'cat')).toBe(858);
  });

  test('no infinite loops for edge cases', () => {
    expect(eudexDistance('a'.repeat(1000), 'b'.repeat(1000))).toBe(258);
    expect(eudexDistance('a', 'b')).toBe(256);
  });
});
