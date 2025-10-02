import { scrollbarSize } from '../scrollbar-size.ts';

describe('scrollbarSize', () => {
  test('determine scrollbar size', () => {
    const size = scrollbarSize();
    // the test environment always returns 0 for scrollbar sizes
    expect(size.scrollbarWidth).toBe(0);
    expect(size.scrollbarHeight).toBe(0);
  });
});
