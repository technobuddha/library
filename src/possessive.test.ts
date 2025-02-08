import { possessive } from './possessive.ts';

describe('possessive', () => {
  test('should handle simple possessives', () => {
    expect(possessive('Phil')).toBe("Phil's");
    expect(possessive('Chris')).toBe("Chris'");
  });
});
