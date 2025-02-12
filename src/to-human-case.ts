import { space } from './constants.js';
import { toCapitalCase } from './to-capital-case.js';

const re = /\p{Ll}\p{Lu}+/gu;

/**
 * Convert an identifier string to human readable form
 *
 * @param input - The identifier string
 * @returns the identifier in human readable form
 * @group String
 * @category Case Conversion
 */
export function toHumanCase(input: string): string {
  return toCapitalCase(
    input
      .trim()
      .replaceAll(/[-_.\s]+/gu, space)
      .replaceAll(re, (c) => `${c.slice(0, 1)} ${c.slice(1)}`),
    { lowerCase: true },
  );
}
