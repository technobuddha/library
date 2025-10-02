import { type JSONValue } from '../serialization/json.ts';
import { replacer } from '../serialization/replacer.ts';
import { sortKeys } from '../serialization/sort-keys.ts';

/**
 * Serializes a given `JsonValue` into a string, wrapping the JSON representation
 * with special delimiters (`⁅` and `⁆`). The keys of any objects within the value
 * are sorted to ensure consistent output.
 * @param value - The JSON-compatible value to serialize.
 * @returns The serialized string with sorted keys and custom delimiters.
 * @internal
 */
export function jsonSerialize(value: JSONValue): string {
  return `⁅${JSON.stringify(sortKeys(value), replacer)}⁆`;
}
