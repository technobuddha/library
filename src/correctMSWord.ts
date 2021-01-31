const find = /[\u00A0–—‘’‹›“”«»©®¼½¾…€™←→⇐⇒⇔☹☺]/ug;
const replace: Readonly<Record<string, string | undefined>> = Object.freeze({
    '\u00A0': ' ',
    '–':      '-',
    '—':      '-',
    '‘':      "'",
    '’':      "'",
    '‹':      '<',
    '›':      '>',
    '“':      '"',
    '”':      '"',
    '«':      '<<',
    '»':      '>>',
    '©':      '(c)',
    '®':      '(r)',
    '¼':      '1/4',
    '½':      '1/2',
    '¾':      '3/4',
    '…':      '...',
    '€':      '(e)',
    '™':      '(tm)',
    '←':      '<--',
    '→':      '-->',
    '⇐':     '<==',
    '⇒':     '==>',
    '⇔':     '<=>',
    '☹':     ':(',
    '☺':     ':)',
});

/**
 * Correct character sequeces that Microsoft Word changes to make it look prettier
 *
 * @param input The mangled string
 * @returns string with special characters corrected
 */
export function correctMSWord(input: string): string {
    return input.replace(find, a => replace[a] ?? a);
}

export default correctMSWord;
