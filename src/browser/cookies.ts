/* eslint-disable unicorn/no-document-cookie */
import { formatDate } from '../esnext/time/format-date.ts';

/**
 * Provides methods for reading, writing, deleting, and clearing cookies in the
 * browser environment.
 * @group Storage
 * @category Cookies
 */
export const cookies = {
  /**
   * Retrieves the value of the specified cookie.
   * @param name - The name of the cookie to retrieve.
   * @returns The value of the cookie, or `undefined` if it does not exist.
   */
  get: (name: string): string | undefined => yummy().get(name),
  /**
   * Sets the value of a cookie.
   * @param name - The name of the cookie to set.
   * @param value - The value to assign to the cookie.
   * @param expires - Optional expiration date for the cookie, as a string or `Date`.
   */
  set(name: string, value: string, expires?: string | Date): void {
    let cookie = `${name}=${encodeURIComponent(value)}; Path=/`;

    if (expires) {
      cookie += `; Expires=${formatDate(new Date(expires), 'cookie', { utc: true })}`;
    }
    document.cookie = cookie;
  },
  /**
   * Deletes the specified cookie.
   * @param name - The name of the cookie to delete.
   */
  delete(name: string): void {
    const host = location.hostname.split('.');
    while (host.length > 0) {
      const cookieBase = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=${host.join('.')}; path=`;
      const path = location.pathname.split('/');
      document.cookie = `${cookieBase}/`;
      while (path.length > 0) {
        document.cookie = `${cookieBase}${path.join('/')}`;
        path.pop();
      }
      host.shift();
    }
  },
  /**
   * Removes all cookies.
   */
  clear(): void {
    for (const name of yummy().keys()) {
      cookies.delete(name);
    }
  },
  /**
   * Returns an array of all cookie names.
   * @returns An array of cookie names.
   */
  names: (): string[] => Array.from(yummy().keys()),
};

function yummy(): Map<string, string> {
  const baked = new Map<string, string>();
  for (const cookie of document.cookie.split('; ')) {
    if (cookie) {
      const [name, value] = cookie.split('=');
      baked.set(name, decodeURIComponent(value.trim()));
    }
  }
  return baked;
}
