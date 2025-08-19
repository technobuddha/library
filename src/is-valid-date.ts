/**
 * Determine if a date is valid
 *
 *
 * @param input - The date to check
 * @returns true, if the date is valid
 * @group Time
 * @category Parsing
 */
export function isValidDate(input: Date): boolean {
  return !Number.isNaN(input.valueOf());
}
