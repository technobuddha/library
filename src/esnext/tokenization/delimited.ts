import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty } from '../unicode/unicode.ts';

/**
 * Return a field from a delimited string
 * @param input - The delimited string
 * @param delimiter - The delimiter string
 * @param index - The position of the desired field, 0 is the first field, negative numbers count backwards from the end (default 0)
 * @param count - The number of fields to return (default 1)
 * @group String
 * @category Deconstruction
 */
export function delimited(input: StringLike, delimiter: StringLike, index = 0, count = 1): string {
  if (count <= 0) {
    return empty;
  }

  const text = toString(input);
  const delim = toString(delimiter);

  const splits = text.split(delim);
  const start = index < 0 ? splits.length + index : index;
  return splits.slice(start, start + count).join(delim);
}
