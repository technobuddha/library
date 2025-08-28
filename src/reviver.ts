import { specialBegin, specialFinish } from './json.ts';

/**
 * Used with JSON.parse to decode objected encoded by {@link replacer}
 *
 * @param this - The raw object
 * @param _key - The key
 * @param value - The value
 * @returns the decoded value
 * @group JSON
 * @category Serialization
 */
export function reviver(this: unknown, _key: string, value: unknown): unknown {
  if (
    typeof value === 'string' &&
    value.startsWith(specialBegin) &&
    value.endsWith(specialFinish)
  ) {
    const [type, jsonValue] = value.slice(1, -1).split(/:(.+)/u);
    switch (type) {
      case 'Date': {
        return new Date(jsonValue);
      }
      case 'RegExp': {
        const matches = /^\/(.*)\/([a-z]*)$/u.exec(jsonValue);
        return matches ? new RegExp(matches[1], matches[2]) : new RegExp(jsonValue, 'u');
      }
      case 'Number': {
        return Number(jsonValue);
      }
      case 'BigInt': {
        return BigInt(jsonValue);
      }
      default: {
        return value;
      }
    }
  }
  return value;
}
