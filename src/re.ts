import { build } from './build.ts';
import { collapse } from './collapse.ts';
import { splitChars } from './split-chars.ts';
import { zipperMerge } from './zipper-merge.ts';

/**
 * Constructs a new `RegExp` object by interpolating regular expressions into a template string.
 *
 * This function merges the provided template string and an array of `RegExp` arguments,
 * combining their sources and flags. It ensures that each interpolated regular expression
 * is safely wrapped in a non-capturing group unless it is already a character class, a
 * non-capturing group, or a fully anchored pattern. All flags from the arguments are
 * collected and applied to the resulting regular expression.
 *
 * @param flags - A set of regular expression flags to be applied to the resulting RegExp.
 * @param template - The template string array representing the static parts of the pattern.
 * @param args - An array of `RegExp` objects to interpolate into the template.
 * @returns A new `RegExp` object constructed from the template and interpolated patterns.
 * @internal
 */
function reTemplate(flags: Set<string>, template: TemplateStringsArray, args: RegExp[]): RegExp {
  const reText = build(
    collapse(
      zipperMerge(
        Array.from(template.raw),
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
/**
 * Creates a tagged template function for building regular expressions with the specified flags.
 *
 * @param flags - The flags to apply to the resulting regular expression (e.g., 'g', 'i', 'm').
 * @returns A tagged template function that constructs a `RegExp` object from a template string and interpolated `RegExp` patterns.
 * @example
 * ```typescript
 * const bar = /bar/;
 * const regex = re('gi')`foo${bar}baz${bar}qux`;
 * // regex is a RegExp with pattern 'foo(?:bar)baz(?:bar)qux' and flags 'giu'
 * ```
 */
export function re(flags: string): (template: TemplateStringsArray, ...args: RegExp[]) => RegExp;
/**
 * Creates a new `RegExp` object from a template string and interpolated regular expressions.
 *
 * @param template - The template string array containing the static parts of the regular expression.
 * @param args - The interpolated `RegExp` objects to be inserted between the template strings.
 * @returns A new `RegExp` object constructed from the combined template and arguments.
 * @example
 * ```typescript
 * const bar = /bar/;
 * const regex = re`foo${bar}baz${bar}qux`;
 * // regex is a RegExp with pattern 'foo(?:bar)baz(?:bar)qux' and flags 'u'
 * ```
 */
export function re(template: TemplateStringsArray, ...args: RegExp[]): RegExp;
/**
 * Creates a tagged template function for building regular expressions with optional specified flags.
 */
export function re(
  first: string | TemplateStringsArray,
  ...rest: RegExp[]
): RegExp | ((template: TemplateStringsArray, ...args: RegExp[]) => RegExp) {
  if (typeof first === 'string') {
    const flags = new Set<string>([...splitChars(first), 'u']);
    return (template: TemplateStringsArray, ...args: RegExp[]) => reTemplate(flags, template, args);
  }

  return reTemplate(new Set(['u']), first, rest);
}
