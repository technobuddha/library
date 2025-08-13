import { summarize } from './summarize.ts';

describe('summarize', () => {
  test('should generate a short numeric description', () => {
    expect(summarize(Number.MAX_SAFE_INTEGER)).toBe('9 quadrillion');
  });
});
