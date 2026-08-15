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

  test('addEventListener with function listener', async () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();

    eventTarget.addEventListener('userLogin', listener);
    await eventTarget.dispatchEvent('userLogin', { userId: '123', timestamp: new Date() });

    expect(listener).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ userId: '123', timestamp: expect.any(Date) }),
    );
  });

  test('dispatchEvent with payload', async () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();
    const testData = [1, 2, 3, 4, 5];

    eventTarget.addEventListener('dataUpdate', listener);
    await eventTarget.dispatchEvent('dataUpdate', { data: testData });

    expect(listener).toHaveBeenCalledWith(expect.objectContaining({ data: testData }));
  });

  test('dispatchEvent without payload (undefined type)', async () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();

    eventTarget.addEventListener('userLogout', listener);
    await eventTarget.dispatchEvent('userLogout');

    expect(listener).toHaveBeenCalled();
  });

  test('removeEventListener removes function listener', async () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();

    eventTarget.addEventListener('userLogin', listener);
    eventTarget.removeEventListener('userLogin', listener);
    await eventTarget.dispatchEvent('userLogin', { userId: '789', timestamp: new Date() });

    expect(listener).not.toHaveBeenCalled();
  });

  test('multiple listeners for same event', async () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    const listener3 = vi.fn();

    eventTarget.addEventListener('userLogout', listener1);
    eventTarget.addEventListener('userLogout', listener2);
    eventTarget.addEventListener('userLogout', listener3);

    await eventTarget.dispatchEvent('userLogout');

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener2).toHaveBeenCalledOnce();
    expect(listener3).toHaveBeenCalledOnce();
  });

  test('different event types with different payloads', async () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const loginListener = vi.fn();
    const logoutListener = vi.fn();
    const notificationListener = vi.fn();

    eventTarget.addEventListener('userLogin', loginListener);
    eventTarget.addEventListener('userLogout', logoutListener);
    eventTarget.addEventListener('notification', notificationListener);

    const loginTime = new Date();
    await eventTarget.dispatchEvent('userLogin', { userId: 'user123', timestamp: loginTime });
    await eventTarget.dispatchEvent('userLogout');
    await eventTarget.dispatchEvent('notification', { message: 'Welcome!', level: 'info' });

    expect(loginListener).toHaveBeenCalledWith(
      expect.objectContaining({ userId: 'user123', timestamp: loginTime }),
    );

    expect(logoutListener).toHaveBeenCalledWith(undefined);

    expect(notificationListener).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Welcome!',
        level: 'info',
      }),
    );
  });

  test('removeEventListener with non-existent listener does nothing', async () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    eventTarget.addEventListener('userLogin', listener1);
    eventTarget.removeEventListener('userLogin', listener2); // Different listener

    await eventTarget.dispatchEvent('userLogin', { userId: 'test', timestamp: new Date() });

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener2).not.toHaveBeenCalled();
  });

  test('removeEventListener with matching options', async () => {
    const eventTarget = new CustomEventTarget<TestEvents>();
    const listener = vi.fn();

    eventTarget.addEventListener('userLogout', listener);
    eventTarget.removeEventListener('userLogout', listener);

    await eventTarget.dispatchEvent('userLogout');

    expect(listener).not.toHaveBeenCalled();
  });

  test('handles complex payload types', async () => {
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

    await eventTarget.dispatchEvent('complexData', complexPayload);

    expect(listener).toHaveBeenCalledWith(complexPayload);
  });
});
