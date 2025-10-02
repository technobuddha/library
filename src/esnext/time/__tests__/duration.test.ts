import { duration } from '../duration.ts';

describe('duration', () => {
  const base = new Date('2024-01-01T00:00:00.000Z');

  test('returns "0s" for identical dates', () => {
    expect(duration(base, base)).toBe('0s');
  });

  test('returns seconds only', () => {
    const d1 = base;
    const d2 = new Date(base.getTime() + 5000);
    expect(duration(d1, d2)).toBe('5s');
  });

  test('returns minutes and seconds', () => {
    const d1 = base;
    const d2 = new Date(base.getTime() + 2 * 60 * 1000 + 15 * 1000);
    expect(duration(d1, d2)).toBe('2m 15s');
  });

  test('returns hours, minutes, and seconds', () => {
    const d1 = base;
    const d2 = new Date(base.getTime() + 3 * 60 * 60 * 1000 + 4 * 60 * 1000 + 5 * 1000);
    expect(duration(d1, d2)).toBe('3h 4m 5s');
  });

  test('returns days, hours, minutes, and seconds', () => {
    const d1 = base;
    const d2 = new Date(
      base.getTime() + 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000 + 6 * 60 * 1000 + 7 * 1000,
    );
    expect(duration(d1, d2)).toBe('2d 5h 6m 7s');
  });

  test('handles negative durations (order of dates does not matter)', () => {
    const d1 = new Date(base.getTime() + 10000);
    const d2 = base;
    expect(duration(d1, d2)).toBe('10s');
  });

  test('applies fractionDigits option', () => {
    const d1 = base;
    const d2 = new Date(base.getTime() + 1234);
    expect(duration(d1, d2, { fractionDigits: 2 })).toBe('1.23s');
  });

  test('pads with zeros for fractionDigits', () => {
    const d1 = base;
    const d2 = new Date(base.getTime() + 100);
    expect(duration(d1, d2, { fractionDigits: 3 })).toBe('0.100s');
  });

  test('returns correct format for exactly 1 day', () => {
    const d1 = base;
    const d2 = new Date(base.getTime() + 24 * 60 * 60 * 1000);
    expect(duration(d1, d2)).toBe('1d 0h 0m 0s');
  });

  test('returns correct format for exactly 1 hour', () => {
    const d1 = base;
    const d2 = new Date(base.getTime() + 60 * 60 * 1000);
    expect(duration(d1, d2)).toBe('1h 0m 0s');
  });

  test('returns correct format for exactly 1 minute', () => {
    const d1 = base;
    const d2 = new Date(base.getTime() + 60 * 1000);
    expect(duration(d1, d2)).toBe('1m 0s');
  });
});
