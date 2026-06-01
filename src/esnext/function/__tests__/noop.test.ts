import { noop } from '../noop.ts';

describe('noop', () => {
  test('returns undefined', () => {
    expect(noop()).toBeUndefined();
  });
});
