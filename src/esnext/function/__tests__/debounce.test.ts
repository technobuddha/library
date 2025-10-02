import { debounce } from '../debounce.ts';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('calls function after wait', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(60);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('debounces multiple rapid calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);

    debounced();
    debounced();
    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(60);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('leading option calls immediately', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50, { leading: true });

    debounced();
    expect(fn).toHaveBeenCalledOnce();

    vi.advanceTimersByTime(60);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('trailing option calls after wait', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50, { trailing: true });

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(60);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('cancel prevents call', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);

    debounced();
    debounced.cancel();

    vi.advanceTimersByTime(60);
    expect(fn).not.toHaveBeenCalled();
  });

  test('flush calls immediately', () => {
    const fn = vi.fn(() => 42);
    const debounced = debounce(fn, 50);

    debounced();
    const result = debounced.flush();
    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledOnce();

    // flush when timer is not active, should return last result
    const result2 = debounced.flush();
    expect(result2).toBe(42);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('handle calls after flush', () => {
    const fn = vi.fn(() => 42);
    const debounced = debounce(fn, 50);

    debounced();
    const result = debounced.flush();
    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledOnce();

    debounced();
    vi.advanceTimersByTime(30);
    expect(fn).toHaveBeenCalledOnce();
    vi.advanceTimersByTime(30);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('maxWait triggers call', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50, { maxWait: 60 });

    debounced();
    vi.advanceTimersByTime(30);
    expect(fn).not.toHaveBeenCalled();
    debounced();
    vi.advanceTimersByTime(40);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('xmaxWait triggers call', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50, { maxWait: 60 });

    vi.setSystemTime(new Date(2000, 0, 1, 12));
    debounced();
    expect(fn).not.toHaveBeenCalled();
    vi.setSystemTime(new Date(2000, 0, 1, 11));
    debounced();
    expect(fn).toHaveBeenCalledOnce();
    vi.advanceTimersByTime(60);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('flush returns last result if timer is not active', () => {
    const fn = vi.fn(() => 7);
    const debounced = debounce(fn, 50);

    debounced();
    vi.advanceTimersByTime(60);

    expect(debounced.flush()).toBe(7);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('cancel does nothing if timer is not active', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);

    debounced();
    vi.advanceTimersByTime(60);

    debounced.cancel();
    expect(fn).toHaveBeenCalledOnce();
  });

  test('throws if environment does not support setTimeout/clearTimeout', () => {
    const originalSetTimeout = globalThis.setTimeout;
    const originalClearTimeout = globalThis.clearTimeout;
    delete (globalThis as Record<string, unknown>).setTimeout;
    delete (globalThis as Record<string, unknown>).clearTimeout;

    expect(() => debounce(() => {}, 50)).toThrow(TypeError);

    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
  });

  test('invokes via maxWait tight loop', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50, { maxWait: 100 });

    // 1. Initial call to start the timer
    debounced();
    // 2. Advance time to just before maxWait
    vi.advanceTimersByTime(99);
    // 3. Call again to keep timer alive (timerId is set, maxWait is about to be hit)
    debounced();
    // 4. Advance time to just after maxWait
    vi.advanceTimersByTime(2); // now at 101ms
    // 5. Call again: this should hit the maxWait path (line 182)
    debounced();

    expect(fn).toHaveBeenCalled();
  });
});
