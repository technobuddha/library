import { throttle } from '../throttle.ts';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('calls function at most once per wait period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50);

    throttled();
    expect(fn).toHaveBeenCalledOnce();

    throttled();
    throttled();
    expect(fn).toHaveBeenCalledOnce();

    vi.advanceTimersByTime(50);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('rapid calls only trigger one call per wait', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledOnce();

    vi.advanceTimersByTime(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('leading option calls immediately', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50, { leading: true });

    throttled();
    expect(fn).toHaveBeenCalledOnce();

    vi.advanceTimersByTime(50);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('trailing: false does not call after wait', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50, { trailing: false });

    throttled();
    expect(fn).toHaveBeenCalledOnce();

    throttled();
    vi.advanceTimersByTime(60);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('cancel prevents call', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50);

    throttled();
    throttled.cancel();

    vi.advanceTimersByTime(60);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('flush calls immediately if pending', () => {
    const fn = vi.fn(() => 42);
    const throttled = throttle(fn, 50);

    throttled();
    const result = throttled.flush();
    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledOnce();

    // flush when timer is not active, should return last result
    const result2 = throttled.flush();
    expect(result2).toBe(42);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('flush returns last result if timer is not active', () => {
    const fn = vi.fn(() => 7);
    const throttled = throttle(fn, 50);

    throttled();
    vi.advanceTimersByTime(60);

    expect(throttled.flush()).toBe(7);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('cancel does nothing if timer is not active', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50);

    throttled();
    vi.advanceTimersByTime(60);

    throttled.cancel();
    expect(fn).toHaveBeenCalledOnce();
  });

  test('passes options to debounce', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50, { maxWait: 60 });

    throttled();
    vi.advanceTimersByTime(30);
    throttled();
    vi.advanceTimersByTime(40);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('throws if environment does not support setTimeout/clearTimeout', () => {
    const originalSetTimeout = globalThis.setTimeout;
    const originalClearTimeout = globalThis.clearTimeout;
    delete (globalThis as Record<string, unknown>).setTimeout;
    delete (globalThis as Record<string, unknown>).clearTimeout;

    expect(() => throttle(() => {}, 50)).toThrow(TypeError);

    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
  });
});
