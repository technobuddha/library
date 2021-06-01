import build      from './build';
import splitChars from './splitChars';

type Options = {
    /** escape all characters outside the 7-bit ASCII range */
    escapeNonAscii?: boolean;
};

/**
 * Escape a string for use in HTML
 *
 * @param input The string to escape
 * @param __namedParameters see {@link Options}
 */
export function escapeHTML(input: string, { escapeNonAscii = false }: Options = {}): string {
    return build(splitChars(input).map(c => entities[c] ?? ((c < '\u0020' || (c > '\u007E' && c < '\u00a0')) || (escapeNonAscii && c > '\u007F') ? `&#${c.codePointAt(0)};` : c)));
}

const entities: Readonly<Record<string, string | undefined>> = Object.freeze({
    '"': '&quot;',
    '&': '&amp;',
    "'": '&apos;',
    '<': '&lt;',
    '>': '&gt;',
});

export default escapeHTML;
