import { floor } from '../math/floor.ts';
import { space } from '../unicode/unicode.ts';

import { ticksPerDay, ticksPerHour, ticksPerMinute, ticksPerSecond } from './constants.ts';

/**
 * Options for the {@link relativeTime} function
 * @group Time
 * @category Relative Time
 */
export type DurationOptions = {
  /** Number of decimal places for seconds */
  fractionDigits?: number;
};

/**
 * Describe duration between two dates in a simple format
 * @param start - The date
 * @param finish - The date to compare to
 * @param options - see {@link DurationOptions}
 * @returns string describing the duration between the two dates
 * @group Time
 * @category Relative Time
 */
export function duration(
  start: Date,
  finish: Date,
  { fractionDigits = 0 }: DurationOptions = {},
): string {
  const text = [] as string[];

  let diff = Math.abs(start.getTime() - finish.getTime());

  const d = floor(diff / ticksPerDay);
  diff -= d * ticksPerDay;

  const h = floor(diff / ticksPerHour);
  diff -= h * ticksPerHour;

  const m = floor(diff / ticksPerMinute);
  diff -= m * ticksPerMinute;

  const s = diff / ticksPerSecond;

  if (d > 0) {
    text.push(`${d}d`);
  }

  if (h > 0 || d > 0) {
    text.push(`${h}h`);
  }

  if (m > 0 || h > 0 || d > 0) {
    text.push(`${m}m`);
  }

  text.push(`${s.toFixed(fractionDigits)}s`);

  return text.join(space);
}
