import { type ElementSize } from './size.ts';

/**
 * Measures the current window size and scrollbar size.
 *
 * @returns Properties: width, height, scrollbarWidth, scrollbarHeight.
 *
 * @example
 * ```typescript
 * const size = measureWindow();
 * // size: { width: number, height: number, scrollbarWidth: number, scrollbarHeight: number \}
 * ```
 * @group DOM
 * @category Window
 */
export function measureWindow(): ElementSize {
  return { width: window.innerWidth, height: window.innerHeight };
}
