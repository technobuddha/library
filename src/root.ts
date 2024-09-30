import { isNil } from 'lodash-es';

export type Options = {
  /** The refix string to remove */
  prefix?: string;
  /** The suffix string to remove */
  suffix?: string;
};

/**
 * Extract the root word, removing a prefix and/or suffix
 *
 * @param input The word, which might have {@code prefix} before it, and {@code suffix} after it.
 * @param __namedParameters see {@link Options}
 * @returns The root word
 */
export function root(input: string, { prefix, suffix }: Options = {}): string {
  let text = input;

  if (!isNil(prefix) && text.startsWith(prefix)) text = text.slice(prefix.length);

  if (!isNil(suffix) && text.endsWith(suffix))
    text = text.slice(0, Math.max(0, text.length - suffix.length));

  return text;
}

export default root;
