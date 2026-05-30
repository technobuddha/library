import { errln } from '../errln.ts';

describe('errln', () => {
  test('writes a single string and a trailing newline to stderr', () => {
    const spy = vi.spyOn(process.stderr, 'write').mockReturnValue(true);
    errln('hello');
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, 'hello');
    expect(spy).toHaveBeenNthCalledWith(2, '\n');
    spy.mockRestore();
  });

  test('writes multiple strings and a trailing newline to stderr', () => {
    const spy = vi.spyOn(process.stderr, 'write').mockReturnValue(true);
    errln('foo', 'bar', 'baz');
    expect(spy).toHaveBeenCalledTimes(4);
    expect(spy).toHaveBeenNthCalledWith(1, 'foo');
    expect(spy).toHaveBeenNthCalledWith(2, 'bar');
    expect(spy).toHaveBeenNthCalledWith(3, 'baz');
    expect(spy).toHaveBeenNthCalledWith(4, '\n');
    spy.mockRestore();
  });

  test('writes only a trailing newline if no arguments are provided', () => {
    const spy = vi.spyOn(process.stderr, 'write').mockReturnValue(true);
    errln();
    expect(spy).toHaveBeenCalledExactlyOnceWith('\n');
    spy.mockRestore();
  });
});
