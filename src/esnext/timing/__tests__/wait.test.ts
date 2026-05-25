import { wait } from '../wait.ts';

describe('wait', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('resolves after the specified delay', async () => {
    let resolved = false;
    const pending = wait(50).then(() => {
      resolved = true;
    });

    vi.advanceTimersByTime(49);
    await Promise.resolve();
    expect(resolved).toBeFalse();

    vi.advanceTimersByTime(1);
    await pending;
    expect(resolved).toBeTrue();
  });

  test('uses 0 milliseconds by default', async () => {
    let resolved = false;
    const pending = wait().then(() => {
      resolved = true;
    });

    await Promise.resolve();
    expect(resolved).toBeFalse();

    vi.advanceTimersByTime(0);
    await pending;
    expect(resolved).toBeTrue();
  });
});