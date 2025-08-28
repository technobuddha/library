import { type JsonValue } from 'type-fest';

import { type TBJsonValue } from './json.ts';
import { replacer } from './replacer.ts';
import { reviver } from './reviver.ts';
import { sortKeys } from './sort-keys.ts';

/**
 * Serializes a given `JsonValue` into a string, wrapping the JSON representation
 * with special delimiters (`⁅` and `⁆`). The keys of any objects within the value
 * are sorted to ensure consistent output.
 *
 * @param value - The JSON-compatible value to serialize.
 * @returns The serialized string with sorted keys and custom delimiters.
 * @internal
 */
export function serialize(value: TBJsonValue): string {
  return `⁅${JSON.stringify(sortKeys(value), replacer)}⁆`;
}

/**
 * Deserializes a value that may be a specially formatted JSON string.
 *
 * If the input is a string that starts with '⁅' and ends with '⁆', the function
 * removes these delimiters and parses the inner content as JSON. Otherwise, it
 * returns the value as-is, cast to `JsonValue`.
 *
 * @param value - The value to deserialize, which may be a specially formatted JSON string.
 * @returns The deserialized `JsonValue` if the input was a specially formatted string,
 *          or the original value cast as `JsonValue` otherwise.
 * @internal
 */
export function deserialize(value: unknown): TBJsonValue {
  if (typeof value === 'string' && value.startsWith('⁅') && value.endsWith('⁆')) {
    return JSON.parse(value.slice(1, -1), reviver);
  }

  return value as JsonValue;
}
