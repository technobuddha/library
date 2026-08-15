/**
 * Listener signature for a typed custom event.
 *
 * Events with an undefined payload are treated as no-argument listeners.
 *
 * @typeParam T - Event map whose keys are event names and values are their payload types.
 * @typeParam E - The specific event name being listened to.
 * @group Data Structures
 * @category Events
 */
export type CustomEventListener<T extends Record<string, unknown>, E extends keyof T = keyof T> =
  T[E] extends undefined ? () => void | Promise<void> : (event: T[E]) => void | Promise<void>;

/**
 * A lightweight, type-safe custom event target.
 *
 * @typeParam T - Record of event names to payload types.
 * @typeParam EventName - The concrete string event names derived from T.
 * @group Data Structures
 * @category Events
 */
export class CustomEventTarget<
  T extends Record<EventName, unknown>,
  EventName extends string & keyof T = Extract<keyof T, string>,
> {
  private readonly eventListeners: Map<EventName, Set<CustomEventListener<T, EventName>>> =
    new Map();

  private listeners<E extends EventName>(event: E): Set<CustomEventListener<T, E>> {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      return listeners;
    }

    const set = new Set<CustomEventListener<T, EventName>>();
    this.eventListeners.set(event, set);
    return set;
  }

  /**
   * Registers a listener for a specific event.
   *
   * @param event - Event name to observe.
   * @param listener - Callback to invoke when the event is dispatched.
   * @group Data Structures
   * @category Events
   */
  public addEventListener<E extends EventName>(
    event: E,
    listener: CustomEventListener<T, E>,
  ): void {
    this.listeners(event).add(listener);
  }

  /**
   * Dispatches a typed custom event.
   *
   * @param event - Event name to emit.
   * @param args - Optional payload for the event.
   * @returns Resolves once all listeners have finished handling the event.
   * @group Data Structures
   * @category Events
   */
  public async dispatchEvent<E extends EventName>(
    event: E,
    ...args: T[E] extends undefined ? [] : [T[E]]
  ): Promise<void> {
    const payload: T[E] | undefined = args.length === 0 ? undefined : args[0];

    for (const listener of this.listeners(event)) {
      await listener(payload!);
    }
  }

  /**
   * Removes a previously added event listener.
   *
   * @param event - The event type to stop listening for.
   * @param listener - The previously registered listener to remove.
   * @group Data Structures
   * @category Events
   */
  public removeEventListener<E extends EventName>(
    event: E,
    listener: CustomEventListener<T, E>,
  ): void {
    this.listeners(event).delete(listener);
  }
}
