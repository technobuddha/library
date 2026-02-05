import { build } from '../string/build.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { splitChars } from '../tokenization/split-chars.ts';

import { type EscapeOptions } from './escape.ts';

/**
 * Escape a string for use in HTML
 * @param input - The string to escape
 * @param options - see {@link EscapeOptions}
 * @example
 * ```typescript
 * escapeHTML('<div>hello</div>'); // '&lt;div&gt;hello&lt;/div&gt';
 * escapeHTML('aáΔ😀', { escapeNonASCII: true }); // 'a&#225;&#916;&#128512';
 * ```
 * @group Escape
 * @category HTML
 */
export function escapeHTML(input: StringLike, { ascii = false }: EscapeOptions = {}): string {
  const text = toString(input);

  return build(
    splitChars(text).map(
      (c) =>
        entities[c] ??
        (c < '\u0020' || (c > '\u007E' && c < '\u00a0') || (ascii && c > '\u007F') ?
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
