/**
 * Event listener function or object that can handle custom events
 * @group Data Structures
 * @category Events
 */
export type CustomEventListener<T extends Record<string, unknown>, E extends keyof T = keyof T> =
  | ((event: T[E]) => void | Promise<void>)
  | {
      /** Handles the custom event */
      handleEvent(event: CustomEvent<T[E]>): void | Promise<void>;
    };

/**
 * Generic event handler for the underlying EventTarget
 * @internal
 */
type Handler = ((event: Event) => void) | { handleEvent(event: Event): void };

/**
 * A type-safe wrapper around the native EventTarget that provides strongly-typed custom events
 *
 * @example
 * ```typescript
 * interface MyEvents {
 *   userLogin: { userId: string; timestamp: Date };
 *   userLogout: undefined;
 *   dataUpdate: { data: any[] };
 * }
 *
 * const eventTarget = new CustomEventTarget<MyEvents>();
 *
 * // Type-safe event listening
 * eventTarget.addEventListener('userLogin', (event) => {
 *   console.log(event.detail.userId); // TypeScript knows this exists
 * });
 *
 * // Type-safe event dispatching
 * eventTarget.dispatchEvent('userLogin', { userId: '123', timestamp: new Date() });
 * eventTarget.dispatchEvent('userLogout'); // No payload required
 * eventTarget.dispatchEvent('userLogin', { userId: '456', timestamp: new Date() }, { bubbles: true });
 * ```
 *
 * @typeParam T - Record type defining the event names as keys and their payload types as values
 * @typeParam K - String union type of event names, extracted from T's keys
 *
 * @group Data Structures
 * @category Events
 */
export class CustomEventTarget<
  T extends Record<EventName, unknown>,
  EventName extends string & keyof T = Extract<keyof T, string>,
> {
  /**
   * The underlying native EventTarget instance
   */
  private readonly eventTarget: EventTarget = new EventTarget();
  /**
   * Interceptor functions
   */
  private readonly interceptors: WeakMap<object, Handler> = new WeakMap();

  /**
   * Adds a type-safe event listener for the specified event type
   *
   * @param type - The event type to listen for
   * @param listener - The listener function or object to handle the event
   * @param options - Optional event listener options (passive, once, signal, etc.)
   */
  public addEventListener<E extends EventName>(
    type: E,
    listener: CustomEventListener<T, E>,
    options?: Parameters<EventTarget['addEventListener']>[2],
  ): void {
    const interceptor = this.interceptors.getOrInsertComputed(listener, () =>
      typeof listener === 'function' ?
        async (e: Event) => {
          const event = e as CustomEvent<T[E]>;
          await listener(event.detail);
        }
      : async (e: Event) => {
          const event = e as CustomEvent<T[E]>;
          await listener.handleEvent(event);
        },
    );

    this.eventTarget.addEventListener(type, interceptor, options);
  }

  /**
   * Dispatches a type-safe custom event with optional payload and event options
   *
   * @param event - The event type or event configuration object
   * @param args - The event payload (required only if T[E] is not undefined)
   * @returns Boolean indicating whether the event was successfully dispatched
   */
  public dispatchEvent<E extends EventName>(
    event: E | { type: E; bubbles?: boolean; cancelable?: boolean; composed?: boolean },
    ...args: T[E] extends undefined ? [] : [payload: T[E]]
  ): boolean {
    const payload = args.length === 0 ? undefined : args[0];
    const { bubbles, cancelable, composed } = typeof event === 'string' ? {} : event;
    const type = typeof event === 'string' ? event : event.type;

    const customEvent = new CustomEvent(type, {
      detail: payload,
      bubbles,
      cancelable,
      composed,
    });
    return this.eventTarget.dispatchEvent(customEvent);
  }

  /**
   * Removes a previously added event listener
   *
   * @param type - The event type to stop listening for
   * @param listener - The listener function or object to remove
   * @param options - Optional event listener options that match those used when adding
   */
  public removeEventListener<E extends EventName>(
    type: E,
    listener: CustomEventListener<T, E>,
    options?: Parameters<EventTarget['removeEventListener']>[2],
  ): void {
    const interceptor = this.interceptors.get(listener);
    if (interceptor) {
      this.eventTarget.removeEventListener(type, interceptor, options);
    }
  }
}
