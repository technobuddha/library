import { type DateOptions } from './constants.ts';

/**
 * Determine if two dates occur in the same year
 * @param input1 - The first date
 * @param input2 - The second date
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns true, if the two dates occur in the same year
 * @group Time
 * @category Year
 */
export function isSameYear(input1: Date, input2: Date, { utc = false }: DateOptions = {}): boolean {
  if (utc) {
    return input1.getUTCFullYear() === input2.getUTCFullYear();
  }

  return input1.getFullYear() === input2.getFullYear();
}
