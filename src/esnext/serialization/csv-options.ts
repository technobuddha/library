/**
 * Options for CSV operations (assembly and disassembly)
 * @group Serialization
 * @category CSV
 */
export type CSVOptions = {
  /** The delimiter to separate values (default: ',') */
  delimiter?: string;
  /** The quote character to wrap/unwrap values containing special characters (default: '"') */
  quote?: string;
  /** The line separator to separate rows (default: '\\r\\n'). Must be either '\\n' or '\\r\\n'. */
  lineSeparator?: '\n' | '\r\n';
  /** Whether to include/expect headers in the CSV (default: true) */
  hasHeaders?: boolean;
  /** The character used to indicate a comment line */
  comment?: string;
};
