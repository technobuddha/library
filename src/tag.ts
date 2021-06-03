import { space }  from './constants';
import build      from './build';
import escapeHTML from './escapeHTML';

/**
 * Surround text with an HTML tag
 *
 * @param input The text to surround
 * @param tagName The name of the tag
 * @param attributes A dictionary of name value pairs to use for attributes
 * @returns HTML tag with text
 */
export function tag(input: string, tagName = 'span', attributes: Record<string, string> = {}): string {
    return build(
        '<',
        tagName,
        Object.entries(attributes).flatMap(([ k, v ]) => [ space, k, '="', escapeHTML(v), '"' ]),
        '>',
        escapeHTML(input),
        '</',
        tagName,
        '>'
    );
}

export default tag;
