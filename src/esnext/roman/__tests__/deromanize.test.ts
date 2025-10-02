import { deromanize } from '../deromanize.ts';

describe('deromanize', () => {
  test('should parse roman numbers', () => {
    expect(deromanize('iv')).toBe(4);
    expect(deromanize('IV')).toBe(4);

    expect(deromanize('mmxiii')).toBe(2013);
    expect(deromanize('MMXIII')).toBe(2013);
    expect(deromanize('MCMXCVI')).toBe(1996);
  });

  test('should return NaN on bad roman numbers', () => {
    expect(deromanize('foo')).toBeNaN();
  });
});
