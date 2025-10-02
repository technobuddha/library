import { escapeHTML } from '../escape/escape-html.ts';
import { space } from '../unicode/unicode.ts';

import { build } from './build.ts';
import { type StringLike } from './string-like.ts';

/**
 * Surround text with an HTML tag
 * @param input - The text to surround
 * @param tagName - The name of the tag
 * @param attributes - A dictionary of name value pairs to use for attributes
 * @returns HTML tag with text
 * @group String
 * @category Construction
 */
export function tag(
  input: StringLike,
  tagName = 'span',
  attributes: Record<string, string> = {},
): string {
  return build(
    '<',
    tagName,
    Object.entries(attributes).flatMap(([k, v]) => [space, k, '="', escapeHTML(v), '"']),
    '>',
    escapeHTML(input),
    '</',
    tagName,
    '>',
  );
}

export default tag;
