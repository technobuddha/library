import { build } from './build.ts';
import { escapeHTML } from './escape-html.ts';
import { space } from './unicode.ts';

/**
 * Surround text with an HTML tag
 *
 * @param input - The text to surround
 * @param tagName - The name of the tag
 * @param attributes - A dictionary of name value pairs to use for attributes
 * @returns HTML tag with text
 * @group String
 * @category HTML
 */
export function tag(
  input: string,
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
