import { err } from '../err.ts';

describe('err', () => {
  test('writes a single string to stderr', () => {
    const spy = vi.spyOn(process.stderr, 'write').mockReturnValue(true);
    err('hello');
    expect(spy).toHaveBeenCalledWith('hello');
    spy.mockRestore();
  });

  test('writes multiple strings to stderr', () => {
    const spy = vi.spyOn(process.stderr, 'write').mockReturnValue(true);
    err('foo', 'bar', 'baz');
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(1, 'foo');
    expect(spy).toHaveBeenNthCalledWith(2, 'bar');
    expect(spy).toHaveBeenNthCalledWith(3, 'baz');
    spy.mockRestore();
  });

  test('does nothing if no arguments are provided', () => {
    const spy = vi.spyOn(process.stderr, 'write').mockReturnValue(true);
    err();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
