import { toError } from '../to-error.ts';

describe('toError', () => {
  test('should return Error', () => {
    const err = new Error('message');
    expect(toError(err)).toBeInstanceOf(Error);
    expect(toError(err).message).toBe('message');
  });

  test('should convert strings', () => {
    const err = 'message';
    expect(toError(err)).toBeInstanceOf(Error);
    expect(toError(err).message).toBe('message');
  });
});
