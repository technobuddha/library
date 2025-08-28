import { toEnumeration } from './to-enumeration.ts';

/**
 * Options for the {@link toBoolean} function
 * @group String
 * @category Conversion
 */
export type BooleanOptions = {
  /** An iterable list of values that are "true" */
  trueValues?: Iterable<string | RegExp>;
  /** An iterable list of values that are "false" */
  falseValues?: Iterable<string | RegExp>;
};

/**
 * List of string values interpreted as boolean true.
 * @internal
 */
const defaultTrue = ['true', 'yes', 'y', 'on', '1'];

/**
 * List of string values interpreted as boolean false.
 * @internal
 */
const defaultFalse = ['false', 'no', 'n', 'off', '0'];

/**
 * Convert a string to a boolean value
 * @param input - The string to convert
 * @param options - see {@link BooleanOptions}
 * @defaultValue trueValues 'true', 'yes', 'y', 'on', or '1'
 * @defaultValue falseValues 'false', 'no', 'n', 'off', '0'
 * @group String
 * @category Conversion
 */
export function toBoolean(
  input: string,
  { trueValues = defaultTrue, falseValues = defaultFalse }: BooleanOptions = {},
): boolean | undefined {
  return [true, false, undefined][toEnumeration(input, trueValues, falseValues) ?? 2];
}
