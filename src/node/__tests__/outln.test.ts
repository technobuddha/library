import { outln } from '../outln.ts';

describe('outln', () => {
  test('writes a single string and a trailing newline to stdout', () => {
    const spy = vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    outln('hello');
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, 'hello');
    expect(spy).toHaveBeenNthCalledWith(2, '\n');
    spy.mockRestore();
  });

  test('writes multiple strings and a trailing newline to stdout', () => {
    const spy = vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    outln('foo', 'bar', 'baz');
    expect(spy).toHaveBeenCalledTimes(4);
    expect(spy).toHaveBeenNthCalledWith(1, 'foo');
    expect(spy).toHaveBeenNthCalledWith(2, 'bar');
    expect(spy).toHaveBeenNthCalledWith(3, 'baz');
    expect(spy).toHaveBeenNthCalledWith(4, '\n');
    spy.mockRestore();
  });

  test('writes only a trailing newline if no arguments are provided', () => {
    const spy = vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    outln();
    expect(spy).toHaveBeenCalledExactlyOnceWith('\n');
    spy.mockRestore();
  });
});
