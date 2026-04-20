import { out } from '../out.ts';

describe('out', () => {
  test('writes a single string to stdout', () => {
    const spy = vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    out('hello');
    expect(spy).toHaveBeenCalledWith('hello');
    spy.mockRestore();
  });

  test('writes multiple strings to stdout', () => {
    const spy = vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    out('foo', 'bar', 'baz');
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(1, 'foo');
    expect(spy).toHaveBeenNthCalledWith(2, 'bar');
    expect(spy).toHaveBeenNthCalledWith(3, 'baz');
    spy.mockRestore();
  });

  test('does nothing if no arguments are provided', () => {
    const spy = vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    out();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
