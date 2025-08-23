import { toASCII } from './to-ascii.ts';

describe('toASCII', () => {
  test('should bad characters to be replaces', () => {
    expect(toASCII('crème brûlée')).toBe('creme brulee');
    // cspell:ignore ＡＢＣＤ
    expect(toASCII('ＡＢＣＤ')).toBe('ABCD');
    expect(toASCII('⒜⒝⒞⒟')).toBe('(a)(b)(c)(d)');
  });
});
