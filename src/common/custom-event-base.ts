import { CustomEventTarget } from './custom-event-target.ts';

/**
 * A simple event bus for typed custom events.
 * @typeParam T - Mapping of event names to payload types.
 * @group Data Structures
 * @category Events
 */
export class CustomEventBase<
  T extends Record<EventName, unknown>,
  EventName extends string & keyof T = Extract<keyof T, string>,
> {
  /**
   * Underlying typed event target instance.
   */
  private readonly eventTarget = new CustomEventTarget<T>();

  /**
   * Registers a listener for the given event.
   * @param event - Event name to listen for.
   * @param listener - Function invoked with the event payload.
   * @returns Nothing.
   * @example
   * ```typescript
   * interface Events {
   *   ready: { version: string };
   * }
   *
   * const bus = new CustomEventBase<Events>();
   * bus.on('ready', (event) => console.log(event.version));
   * ```
   * @group Data Structures
   * @category Events
   */
  public on<E extends Extract<keyof T, string>>(
    event: E,
    listener: (payload: T[E]) => void | Promise<void>,
  ): void {
    this.eventTarget.addEventListener(event, listener);
  }

  /**
   * Unregisters a listener for the given event.
   * @param event - Event name to stop listening to.
   * @param listener - Previously registered listener.
   * @returns Nothing.
   * @group Data Structures
   * @category Events
   */
  public off<E extends Extract<keyof T, string>>(
    event: E,
    listener: (payload: T[E]) => void | Promise<void>,
  ): void {
    this.eventTarget.removeEventListener(event, listener);
  }

  /**
   * Dispatches an event with an optional payload.
   * @param event - Event name to emit.
   * @param payload - Event payload for events that require one.
   * @returns Nothing.
   * @example
   * ```typescript
   * interface Events {
   *   userLogin: { userId: string };
   *   userLogout: undefined;
   * }
   *
   * const bus = new CustomEventBase<Events>();
   * bus.fire('userLogin', { userId: 'abc' });
   * bus.fire('userLogout');
   * ```
   * @group Data Structures
   * @category Events
   */
  public fire<E extends Extract<keyof T, string>>(event: E, payload?: T[E]): void {
    this.eventTarget.dispatchEvent(
      event,
      ...((payload === undefined ? [] : [payload]) as T[E] extends undefined ? []
      : [payload: T[E]]),
    );
  }
}
