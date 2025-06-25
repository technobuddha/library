import { toEnumeration } from './to-enumeration.ts';

/**
 * @group String
 * @category Conversion
 */
export type ToBooleanOptions = {
  /** An iterable list of values that are "true" */
  trueValues?: Iterable<string | RegExp>;
  /** An iterable list of values that are "true" */
  falseValues?: Iterable<string | RegExp>;
};

const defaultTrue = ['true', 'yes', 'y', 'on', '1'];
const defaultFalse = ['false', 'no', 'n', 'off', '0'];

/**
 * Convert a string to a boolean value
 *
 * @param input - The string to convert
 * @param __namedParameters - see {@link ToBooleanOptions}
 * @defaultValue trueValues 'true', 'yes', 'y', 'on', or '1'
 * @defaultValue falseValues 'false', 'no', 'n', 'off', '0'
 * @group String
 * @category Conversion
 */
export function toBoolean(
  input: string,
  { trueValues = defaultTrue, falseValues = defaultFalse }: ToBooleanOptions = {},
): boolean | undefined {
  return [true, false, undefined][toEnumeration(input, trueValues, falseValues) ?? 2];
}
