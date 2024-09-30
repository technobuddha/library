import { space } from './constants';
import toCapitalCase from './to-capital-case';

const re = /\p{Ll}\p{Lu}+/gu;

/**
 * Convert an identifier string to human readable form
 *
 * @param input The identifier string
 * @returns the identifier in human readable form
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

export default toHumanCase;
