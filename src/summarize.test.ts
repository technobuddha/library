import { summarize } from './summarize.ts';

describe('summarize', () => {
  test('should generate a short numeric description', () => {
    expect(summarize(10000000000000)).toBe('10 trillion');
    expect(summarize(1000000)).toBe('1 million');
    expect(summarize(1200000)).toBe('1.2 million');
    expect(summarize(1230000)).toBe('1.23 million');
    expect(summarize(1234000)).toBe('1.23 million');
    expect(summarize(1235000)).toBe('1.24 million');
    expect(summarize(Number.MAX_SAFE_INTEGER)).toBe('9.01 quadrillion');
  });
});
