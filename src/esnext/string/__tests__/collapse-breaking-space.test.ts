import { collapseBreakingSpace } from '../collapse-breaking-space.ts';

describe('collapseBreakingSpace', () => {
  test('should collapse Breaking Space', () => {
    expect(
      collapseBreakingSpace('   now   is the\r\t\f\v\ntime      for \tall   good men   '),
    ).toBe('now is the \f\v time for all good men');
  });

  test('should support the trim option', () => {
    expect(
      collapseBreakingSpace('   now   is the\r\t\f\v\ntime      for \tall   good men   ', {
        trim: false,
      }),
    ).toBe(' now is the \f\v time for all good men ');
  });
});
