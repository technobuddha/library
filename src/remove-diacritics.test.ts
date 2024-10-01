import removeDiacritics from './remove-diacritics.js';

describe('removeDiacritics', () => {
  test('should bad characters to be replaces', () => {
    // cspell:ignore ＡＢＣＤ
    expect(removeDiacritics('crème brûlée')).toBe('creme brulee');
    expect(removeDiacritics('ＡＢＣＤ')).toBe('ＡＢＣＤ');
    expect(removeDiacritics('⒜⒝⒞⒟')).toBe('⒜⒝⒞⒟');
  });
});
