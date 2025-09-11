import { build } from './build.ts';
import { splitChars } from './split-chars.ts';

/**
 * Options for {@link escapeHTML}
 * @group Programming
 * @category Escaping
 */
export type EscapeHtmlOptions = {
  /** escape all characters outside the 7-bit ASCII range */
  escapeNonASCII?: boolean;
};

/**
 * Escape a string for use in HTML
 * @param input - The string to escape
 * @param options - see {@link EscapeHtmlOptions}
 * @example
 * ```typescript
 * escapeHTML('<div>hello</div>'); // '&lt;div&gt;hello&lt;/div&gt';
 * escapeHTML('aáΔ😀', { escapeNonASCII: true }); // 'a&#225;&#916;&#128512';
 * ```
 * @group Programming
 * @category Escaping
 */
export function escapeHTML(
  input: string,
  { escapeNonASCII: escapeNonAscii = false }: EscapeHtmlOptions = {},
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
