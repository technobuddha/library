import { build } from './build.ts';
import { splitChars } from './split-chars.ts';

/**
 * Options for {@link escapeHTML}
 * @group Encoding
 * @category Escaping
 */
export type EscapeHtmlOptions = {
  /** escape all characters outside the 7-bit ASCII range */
  escapeNonAscii?: boolean;
};

/**
 * Escape a string for use in HTML
 *
 * @param input - The string to escape
 * @param options - see {@link EscapeHtmlOptions}
 * @group Encoding
 * @category Escaping
 */
export function escapeHTML(
  input: string,
  { escapeNonAscii = false }: EscapeHtmlOptions = {},
): string {
  return build(
    splitChars(input).map(
      (c) =>
        entities[c] ??
        (c < '\u0020' || (c > '\u007E' && c < '\u00a0') || (escapeNonAscii && c > '\u007F') ?
          `&#${c.codePointAt(0)};`
        : c),
    ),
  );
}

const entities: Readonly<Record<string, string | undefined>> = Object.freeze({
  '"': '&quot;',
  '&': '&amp;',
  "'": '&apos;',
  '<': '&lt;',
  '>': '&gt;',
});
