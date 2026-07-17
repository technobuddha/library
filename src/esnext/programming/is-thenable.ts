export interface Thenable<T = unknown> {
  then<Fulfilled = T, Rejected = never>(
    onfulfilled?: ((value: T) => Fulfilled | PromiseLike<Fulfilled>) | null,
    onrejected?: ((reason: unknown) => Rejected | PromiseLike<Rejected>) | null,
  ): PromiseLike<Fulfilled | Rejected>;
}

export function isThenable<T = unknown>(value: unknown): value is Thenable<T> {
  if (value == null) {
    return false;
  }

  if (typeof value !== 'object' && typeof value !== 'function') {
    return false;
  }

  try {
    return typeof (value as Thenable).then === 'function';
  } catch {
    // If accessing .then throws, the value is not thenable
    return false;
  }
}
