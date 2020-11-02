import { space }  from './constants';
import build      from './build';
import escapeHTML from './escapeHTML';

/**
  * Surround text with an HTML tag
  * @param input        The text to surround
  * @param tag            The name of the tag
  * @param attributes    A dictionary of name value pairs to use for attribues
  */
export function tag(input: string, tag: string = 'span', attributes: Record<string, string> = {}): string {
    return build(
        '<',
        tag,
        Object.entries(attributes).flatMap(([v, k]) => [space, k, '="', escapeHTML(v), '"']),
        '>',
        escapeHTML(input),
        '</',
        tag,
        '>'
    );
}

export default tag;
