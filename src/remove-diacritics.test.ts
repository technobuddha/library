import { removeDiacritics } from './remove-diacritics.ts';

describe('removeDiacritics', () => {
  test('should bad characters to be replaces', () => {
    expect(removeDiacritics('crème brûlée')).toBe('creme brulee');
    expect(removeDiacritics('ＡＢＣＤ')).toBe('ＡＢＣＤ');
    expect(removeDiacritics('⒜⒝⒞⒟')).toBe('⒜⒝⒞⒟');
  });
});
