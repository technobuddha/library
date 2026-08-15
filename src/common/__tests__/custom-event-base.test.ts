import { CustomEventBase } from '../custom-event-base.ts';

interface TestEvents {
  userLogin: { userId: string; timestamp: Date };
  userLogout: undefined;
  dataUpdate: { value: number };
}

describe('CustomEventBase', () => {
  test('on and fire pass typed payloads to listeners', async () => {
    const bus = new CustomEventBase<TestEvents>();
    const listener = vi.fn();
    const timestamp = new Date('2025-01-01T00:00:00.000Z');

    bus.on('userLogin', listener);
    await bus.fire('userLogin', { userId: 'user-42', timestamp });

    expect(listener).toHaveBeenCalledExactlyOnceWith({ userId: 'user-42', timestamp });
  });

  test('fire can dispatch an event without a payload', async () => {
    const bus = new CustomEventBase<TestEvents>();
    const listener = vi.fn();

    bus.on('userLogout', listener);
    await bus.fire('userLogout');

    expect(listener).toHaveBeenCalledExactlyOnceWith(undefined);
  });

  test('off removes a listener', async () => {
    const bus = new CustomEventBase<TestEvents>();
    const listener = vi.fn();

    bus.on('dataUpdate', listener);
    bus.off('dataUpdate', listener);
    await bus.fire('dataUpdate', { value: 7 });

    expect(listener).not.toHaveBeenCalled();
  });
});
