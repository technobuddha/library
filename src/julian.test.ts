import { julian } from './julian.ts';

describe('julian', () => {
  test('should convert to Julian dates', () => {
    expect(julian(new Date('13 September 1999 00:00 UTC'))).toBeCloseTo(2451434.5);
    expect(julian(new Date('20 July 1969 20:18 UTC'))).toBeCloseTo(2440423.345833);
  });
});
