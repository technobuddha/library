import { specialBegin, specialFinish } from './json.ts';

/**
 * Used with JSON.stringify to encode a wider range of objects into strings that can later be decoded with {@link reviver}
 *
 * @remarks Will encode Date, RegExp and BigInt objects.  The numeric values 'Infinity' and 'NaN' are also encoded.
 * @param this - The raw object being stringified
 * @param key - The key for the field
 * @param value - The value (may have already been encoded into a string)
 * @returns the encoded value
 * @group JSON
 * @category Serialization
 */
export function replacer(this: Record<string, unknown>, key: string, value: unknown): unknown {
  const raw = this[key];
  if (raw instanceof Date) {
    return `${specialBegin}Date:${raw.toISOString()}${specialFinish}`;
  } else if (raw instanceof RegExp) {
    return `${specialBegin}RegExp:/${raw.source}/${raw.flags}${specialFinish}`;
  } else if (typeof raw === 'number' && (Number.isNaN(raw) || !Number.isFinite(raw))) {
    return `${specialBegin}Number:${raw.toString()}${specialFinish}`;
  } else if (typeof raw === 'bigint') {
    return `${specialBegin}BigInt:${raw.toString()}${specialFinish}`;
  }

  return value;
}
