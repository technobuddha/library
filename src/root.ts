import { isNil } from 'lodash-es';

/**
 * Options for the {@link root} function
 *
 * @group String
 * @category Affix
 */
export type RootOptions = {
  /** The refix string to remove */
  prefix?: string;
  /** The suffix string to remove */
  suffix?: string;
};

/**
 * Extract the root word, removing a prefix and/or suffix
 *
 * @param text - The word, which might have @see prefix before it, and @see suffix after it.
 * @param options - see {@link RootOptions}
 * @returns The root word
 * @group String
 * @category Affix
 */
export function root(text: string, { prefix, suffix }: RootOptions = {}): string {
  let input = text;
  if (!isNil(prefix) && input.startsWith(prefix)) {
    input = input.slice(prefix.length);
  }

  if (!isNil(suffix) && input.endsWith(suffix)) {
    input = input.slice(0, Math.max(0, input.length - suffix.length));
  }

  return input;
}
