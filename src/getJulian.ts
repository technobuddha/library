import { ticksPerDay } from './constants';

/**
 * Get the Julian date (number of days since noon on Monday, January 1 4713 BCE)
 *
 * @remarks Julian dates are always in the UTC timezone
 *
 * @param input The date and time to convert
 * @returns The julian date.
 */
export function getJulian(input: Date): number {
    return (input.getTime() / ticksPerDay) + 2440587.5;
}

export default getJulian;
