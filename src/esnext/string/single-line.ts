import { zipperMerge } from '../array/zipper-merge.ts';
import { empty, space } from '../unicode/unicode.ts';

/**
 * Joins a template literal into a single line string by removing line breaks and leading whitespace,
 * then interleaving the provided arguments. The result is a trimmed, single-line string.
 * @param template - The template strings array from a tagged template literal.
 * @param args - The values to be interpolated into the template.
 * @returns A single-line string with all line breaks and leading whitespace removed.
 * @group String
 * @category Clean
 */
export function singleLine(template: TemplateStringsArray, ...args: unknown[]): string {
  return zipperMerge(
    template.map((t) => t.replaceAll(/[\r\n]+\s*/gv, space)),
    args,
  )
    .toArray()
    .flat()
    .join(empty)
    .trim();
}
