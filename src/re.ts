import { build } from './build.ts';
import { collapse } from './collapse.ts';
import { splitChars } from './split-chars.ts';
import { zipperMerge } from './zipper-merge.ts';

/**
 * Constructs a new `RegExp` by interpolating template strings and provided regular expressions.
 *
 * This function allows you to compose regular expressions using template literals,
 * automatically merging flags and wrapping interpolated regex sources as non-capturing groups
 * when appropriate.
 * @param template - The template string array containing the literal parts of the pattern.
 * @param args - The regular expressions to interpolate into the template.
 * @returns A new `RegExp` object with the combined pattern and merged flags.
 * @group RegExp
 * @category Construction
 */
export function re(template: TemplateStringsArray, ...args: RegExp[]): RegExp {
  const flags = new Set<string>(['u']);
  const reText = build(
    collapse(
      zipperMerge(
        Array.from(template),
        args.map((a) => {
          for (const flag of splitChars(a.flags)) {
            flags.add(flag);
          }
          let { source } = a;
          if (source.startsWith('^') && source.endsWith('$')) {
            source = source.slice(1, -1);
          }

          if (source.startsWith('[') && source.endsWith(']')) {
            return source;
          }

          if (source.startsWith('(?:') && source.endsWith(')')) {
            return source;
          }

          return `(?:${source})`;
        }),
      ).flat(),
    ),
  );

  return new RegExp(reText, build(flags.values()));
}
