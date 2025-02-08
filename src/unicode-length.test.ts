import { unicodeLength } from './unicode-length.js';

describe('unicodeLength', () => {
  test('should detect surrogates', () => {
    expect('😀😁😂😺😸😹').toHaveLength(12);
    expect(unicodeLength('😀😁😂😺😸😹')).toBe(6);
  });
});
