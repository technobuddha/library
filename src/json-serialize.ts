import { type TBJsonValue } from './json.ts';
import { replacer } from './replacer.ts';
import { sortKeys } from './sort-keys.ts';

/**
 * Serializes a given `JsonValue` into a string, wrapping the JSON representation
 * with special delimiters (`⁅` and `⁆`). The keys of any objects within the value
 * are sorted to ensure consistent output.
 * @param value - The JSON-compatible value to serialize.
 * @returns The serialized string with sorted keys and custom delimiters.
 * @internal
 */
export function jsonSerialize(value: TBJsonValue): string {
  return `⁅${JSON.stringify(sortKeys(value), replacer)}⁆`;
}
