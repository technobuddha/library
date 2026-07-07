import { CustomEventTarget } from '../custom-event-target.ts';

interface TestEvents {
  userLogin: { userId: string; timestamp: Date };
  userLogout: undefined;
  dataUpdate: { data: number[] };
  notification: { message: string; level: 'info' | 'warning' | 'error' };
}

describe('CustomEventTarget', () => {
  test('creates instance correctly', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    expect(eventTarget).toBeInstanceOf(CustomEventTarget);
  });

  test('addEventListener with function listener', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();

    eventTarget.addEventListener('userLogin', listener);
    eventTarget.dispatchEvent('userLogin', { userId: '123', timestamp: new Date() });

    expect(listener).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        type: 'userLogin',
        // eslint-disable-next-line vitest/valid-expect
        detail: { userId: '123', timestamp: expect.any(Date) },
      }),
    );
  });

  test('addEventListener with object listener (handleEvent)', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = { handleEvent: vi.fn() };

    eventTarget.addEventListener('userLogin', listener);
    eventTarget.dispatchEvent('userLogin', { userId: '456', timestamp: new Date() });

    expect(listener.handleEvent).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        type: 'userLogin',
        // eslint-disable-next-line vitest/valid-expect
        detail: { userId: '456', timestamp: expect.any(Date) },
      }),
    );
  });

  test('dispatchEvent with payload', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();
    const testData = [1, 2, 3, 4, 5];

    eventTarget.addEventListener('dataUpdate', listener);
    const result = eventTarget.dispatchEvent('dataUpdate', { data: testData });

    expect(result).toBeTrue();
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'dataUpdate',
        detail: { data: testData },
      }),
    );
  });

  test('dispatchEvent without payload (undefined type)', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();

    eventTarget.addEventListener('userLogout', listener);
    const result = eventTarget.dispatchEvent('userLogout');

    expect(result).toBeTrue();
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'userLogout',
        // detail: undefined,
      }),
    );
  });

  test('removeEventListener removes function listener', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();

    eventTarget.addEventListener('userLogin', listener);
    eventTarget.removeEventListener('userLogin', listener);
    eventTarget.dispatchEvent('userLogin', { userId: '789', timestamp: new Date() });

    expect(listener).not.toHaveBeenCalled();
  });

  test('removeEventListener removes object listener', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = { handleEvent: vi.fn() };

    eventTarget.addEventListener('userLogin', listener);
    eventTarget.removeEventListener('userLogin', listener);
    eventTarget.dispatchEvent('userLogin', { userId: '789', timestamp: new Date() });

    expect(listener.handleEvent).not.toHaveBeenCalled();
  });

  test('addEventListener with options (once)', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();

    eventTarget.addEventListener('notification', listener, { once: true });

    eventTarget.dispatchEvent('notification', { message: 'First', level: 'info' });
    eventTarget.dispatchEvent('notification', { message: 'Second', level: 'info' });

    expect(listener).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        detail: { message: 'First', level: 'info' },
      }),
    );
  });

  test('addEventListener with AbortController signal', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();
    const controller = new AbortController();

    eventTarget.addEventListener('userLogout', listener, { signal: controller.signal });

    eventTarget.dispatchEvent('userLogout');
    expect(listener).toHaveBeenCalledOnce();

    controller.abort();
    listener.mockClear();

    eventTarget.dispatchEvent('userLogout');
    expect(listener).not.toHaveBeenCalled();
  });

  test('multiple listeners for same event', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    const listener3 = { handleEvent: vi.fn() };

    eventTarget.addEventListener('userLogout', listener1);
    eventTarget.addEventListener('userLogout', listener2);
    eventTarget.addEventListener('userLogout', listener3);

    eventTarget.dispatchEvent('userLogout');

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener2).toHaveBeenCalledOnce();
    expect(listener3.handleEvent).toHaveBeenCalledOnce();
  });

  test('different event types with different payloads', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const loginListener = vi.fn();
    const logoutListener = vi.fn();
    const notificationListener = vi.fn();

    eventTarget.addEventListener('userLogin', loginListener);
    eventTarget.addEventListener('userLogout', logoutListener);
    eventTarget.addEventListener('notification', notificationListener);

    const loginTime = new Date();
    eventTarget.dispatchEvent('userLogin', { userId: 'user123', timestamp: loginTime });
    eventTarget.dispatchEvent('userLogout');
    eventTarget.dispatchEvent('notification', { message: 'Welcome!', level: 'info' });

    expect(loginListener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'userLogin',
        detail: { userId: 'user123', timestamp: loginTime },
      }),
    );

    expect(logoutListener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'userLogout',
        // detail: undefined,
      }),
    );

    expect(notificationListener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'notification',
        detail: { message: 'Welcome!', level: 'info' },
      }),
    );
  });

  test('removeEventListener with non-existent listener does nothing', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    eventTarget.addEventListener('userLogin', listener1);
    eventTarget.removeEventListener('userLogin', listener2); // Different listener

    eventTarget.dispatchEvent('userLogin', { userId: 'test', timestamp: new Date() });

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener2).not.toHaveBeenCalled();
  });

  test('removeEventListener with matching options', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();

    eventTarget.addEventListener('userLogout', listener, { capture: true });
    eventTarget.removeEventListener('userLogout', listener, { capture: true });

    eventTarget.dispatchEvent('userLogout');

    expect(listener).not.toHaveBeenCalled();
  });

  test('event object has correct properties', () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();

    eventTarget.addEventListener('dataUpdate', listener);
    eventTarget.dispatchEvent('dataUpdate', { data: [42] });

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'dataUpdate',
        detail: { data: [42] },
        bubbles: false,
        cancelable: false,
        composed: false,
      }),
    );

    const [[event]] = listener.mock.calls;
    expect(event).toBeInstanceOf(CustomEvent);
  });

  test('dispatch returns false when preventDefault is called', () => {
    const listener = vi.fn((event: CustomEvent) => {
      event.preventDefault();
    });

    // Create a cancelable event by accessing the underlying EventTarget
    const cancelableEventTarget = new CustomEventTarget<TestEvents>();
    cancelableEventTarget.addEventListener('userLogout', listener);

    const result = cancelableEventTarget.dispatchEvent({ type: 'userLogout', cancelable: true });

    expect(result).toBeFalse();
  });

  test('handles complex payload types', () => {
    interface ComplexEvents {
      complexData: {
        nested: { value: number };
        array: string[];
        date: Date;
        optional?: boolean;
      };
    }

    const eventTarget = new CustomEventTarget<ComplexEvents>();
    const listener = vi.fn();

    eventTarget.addEventListener('complexData', listener);

    const complexPayload = {
      nested: { value: 42 },
      array: ['a', 'b', 'c'],
      date: new Date('2023-01-01'),
      optional: true,
    };

    eventTarget.dispatchEvent('complexData', complexPayload);

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'complexData',
        detail: complexPayload,
      }),
    );
  });
});
