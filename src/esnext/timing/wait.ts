/**
 * Waits for the specified number of milliseconds.
 *
 * @param milliseconds - The number of milliseconds to wait.
 * @returns A promise that resolves after the delay.
 *
 * @example
 * ```typescript
 * await wait(250);
 * ```
 *
 * @group Timing
 * @category Wait
 */
export async function wait(milliseconds = 0): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
