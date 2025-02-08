import { collapseWhitespace } from './collapse-whitespace.ts';

describe('collapseWhitespace', () => {
  test('should collapse whitespace', () => {
    expect(collapseWhitespace('   now   is the\r\t\f\v\ntime      for \tall   good men   ')).toBe(
      'now is the time for all good men',
    );
  });

  test('should support the trim option', () => {
    expect(
      collapseWhitespace('   now   is the\r\t\f\v\ntime      for \tall   good men   ', {
        trim: false,
      }),
    ).toBe(' now is the time for all good men ');
  });
});
