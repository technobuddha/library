import { unicodeLength } from '../unicode-length.ts';

describe('unicodeLength', () => {
  test('should detect surrogates', () => {
    expect('😀😁😂😺😸😹').toHaveLength(12);
    expect(unicodeLength('😀😁😂😺😸😹')).toBe(6);
  });
});
