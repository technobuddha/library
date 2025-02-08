import { removeDiacritics } from './remove-diacritics.ts';

describe('removeDiacritics', () => {
  test('should bad characters to be replaces', () => {
    expect(removeDiacritics('crème brûlée')).toBe('creme brulee');
    // cspell:ignore ＡＢＣＤ
    expect(removeDiacritics('ＡＢＣＤ')).toBe('ＡＢＣＤ');
    expect(removeDiacritics('⒜⒝⒞⒟')).toBe('⒜⒝⒞⒟');
  });
});
