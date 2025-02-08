import { timezone } from './timezone.ts';

describe('timezone', () => {
  test('should output something resembling a timezone', () => {
    expect(timezone(new Date(2018, 6, 4))).toMatch(/^(Z|[+-]([0][0-9]|[1][0-2]):([0-5][0-9]))$/u);
  });

  test('should accept GMT option', () => {
    expect(timezone(new Date(2018, 6, 4), { gmt: true })).toMatch(
      /^(GMT[+-]([0][0-9]|[1][0-2]):([0-5][0-9]))$/u,
    );
  });

  test('should accept number', () => {
    expect(timezone(0)).toBe('Z');
    expect(timezone(-1)).toBe('+00:01');
    expect(timezone(1)).toBe('-00:01');
    expect(timezone(0, { gmt: true })).toBe('GMT');
    expect(timezone(-1, { gmt: true })).toBe('GMT+00:01');
    expect(timezone(1, { gmt: true })).toBe('GMT-00:01');
    expect(timezone(0, { z: false })).toBe('+00:00');
    expect(timezone(-1, { z: false })).toBe('+00:01');
    expect(timezone(1, { z: false })).toBe('-00:01');
  });
});
