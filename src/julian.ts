import { ticksPerDay } from './constants.ts';

/**
 * Get the Julian date (number of days since noon on Monday, January 1 4713 BCE)
 * @remarks Julian dates are always in the UTC timezone
 * @param input - The date and time to convert
 * @returns The julian date.
 * @group Time
 * @category Julian
 */
export function julian(input: Date): number {
  return input.getTime() / ticksPerDay + 2440587.5;
}
