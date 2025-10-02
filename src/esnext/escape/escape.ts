/**
 * Options for the `escape` family of functions.
 *
 * Use these options to control how strings are escaped, for example which
 * quotation character to preserve or prefer when producing quoted output.
 *
 * @example
 * ```ts
 * const opts: EscapeOptions = { quote: '"' };
 * // prefer double quotes when escaping
 * ```
 *
 * @group String
 * @category Escape
 */
export type EscapeOptions = {
  /**
   * If true, non-ASCII (0x00-0x7F) printable characters will be escaped.
   */
  ascii?: boolean;
};
