//#region trimEquivalent
/**
 * Regular expression that matches any whitespace character, including standard spaces,
 * non-breaking spaces (`\u00A0`), and zero-width no-break spaces (`\uFEFF`).
 * Useful for trimming or identifying whitespace-equivalent characters in strings.
 * @group RegExp
 * @category Constants
 */
export const trimEquivalent = /[\s\u{FEFF}\u{A0}]/v;
//#endregion
