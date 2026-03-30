import { animate } from '../animate.ts';

// Mock requestAnimationFrame
const mockRequestAnimationFrame = vi.fn();
Object.defineProperty(globalThis, 'requestAnimationFrame', {
  value: mockRequestAnimationFrame,
  writable: true,
});

describe('animate', () => {
  beforeEach(() => {
    mockRequestAnimationFrame.mockClear();
  });

  test('resolves with callback result when callback succeeds', async () => {
    const expectedResult = 'test result';
    const callback = vi.fn().mockReturnValue(expectedResult);

    // Mock requestAnimationFrame to immediately call the provided callback
    mockRequestAnimationFrame.mockImplementation((cb: () => void) => {
      cb();
      return 1;
    });

    const result = await animate(callback);

    expect(result).toBe(expectedResult);
    expect(callback).toHaveBeenCalledOnce();
    expect(mockRequestAnimationFrame).toHaveBeenCalledOnce();
  });

  test('resolves with number when callback returns number', async () => {
    const expectedResult = 42;
    const callback = vi.fn().mockReturnValue(expectedResult);

    mockRequestAnimationFrame.mockImplementation((cb: () => void) => {
      cb();
      return 1;
    });

    const result = await animate(callback);

    expect(result).toBe(expectedResult);
    expect(callback).toHaveBeenCalledOnce();
  });

  test('resolves with object when callback returns object', async () => {
    const expectedResult = { foo: 'bar', count: 123 };
    const callback = vi.fn().mockReturnValue(expectedResult);

    mockRequestAnimationFrame.mockImplementation((cb: () => void) => {
      cb();
      return 1;
    });

    const result = await animate(callback);

    expect(result).toEqual(expectedResult);
    expect(callback).toHaveBeenCalledOnce();
  });

  test('resolves with undefined when callback returns void', async () => {
    const callback = vi.fn().mockReturnValue(undefined);

    mockRequestAnimationFrame.mockImplementation((cb: () => void) => {
      cb();
      return 1;
    });

    const result = await animate(callback);

    expect(result).toBeUndefined();
    expect(callback).toHaveBeenCalledOnce();
  });

  test('rejects when callback throws an error', async () => {
    const thrownError = new Error('Callback failed');
    const callback = vi.fn().mockImplementation(() => {
      throw thrownError;
    });

    mockRequestAnimationFrame.mockImplementation((cb: () => void) => {
      cb();
      return 1;
    });

    await expect(animate(callback)).rejects.toThrow('Callback failed');
    expect(callback).toHaveBeenCalledOnce();
    expect(mockRequestAnimationFrame).toHaveBeenCalledOnce();
  });

  test('rejects when callback throws a non-Error value', async () => {
    const thrownValue = 'string error';
    const callback = vi.fn().mockImplementation(() => {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw thrownValue;
    });

    mockRequestAnimationFrame.mockImplementation((cb: () => void) => {
      cb();
      return 1;
    });

    await expect(animate(callback)).rejects.toThrow();
    expect(callback).toHaveBeenCalledOnce();
  });

  test('calls requestAnimationFrame with a function', () => {
    const callback = vi.fn();

    // Don't execute the callback immediately to test the setup
    mockRequestAnimationFrame.mockReturnValue(1);

    void animate(callback);

    expect(mockRequestAnimationFrame).toHaveBeenCalledExactlyOnceWith(expect.any(Function));
  });

  test('callback is not executed until animation frame', async () => {
    const callback = vi.fn().mockReturnValue('result');
    let animationFrameCallback: () => void;

    mockRequestAnimationFrame.mockImplementation((cb: () => void) => {
      animationFrameCallback = cb;
      return 1;
    });

    const promise = animate(callback);

    // Callback should not be executed yet
    expect(callback).not.toHaveBeenCalled();

    // Execute the animation frame callback
    animationFrameCallback!();

    const result = await promise;
    expect(result).toBe('result');
    expect(callback).toHaveBeenCalledOnce();
  });

  test('handles multiple concurrent animate calls', async () => {
    const callback1 = vi.fn().mockReturnValue('result1');
    const callback2 = vi.fn().mockReturnValue('result2');

    mockRequestAnimationFrame.mockImplementation((cb: () => void) => {
      cb();
      return 1;
    });

    const [result1, result2] = await Promise.all([animate(callback1), animate(callback2)]);

    expect(result1).toBe('result1');
    expect(result2).toBe('result2');
    expect(callback1).toHaveBeenCalledOnce();
    expect(callback2).toHaveBeenCalledOnce();
    expect(mockRequestAnimationFrame).toHaveBeenCalledTimes(2);
  });
});
