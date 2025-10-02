import { cull } from '../array/cull.ts';
import { zipperMerge } from '../array/zipper-merge.ts';
import { build } from '../string/build.ts';
import { splitChars } from '../tokenization/split-chars.ts';

/**
 * Constructs a new `RegExp` object by interpolating regular expressions into a template string.
 *
 * This function merges the provided template string and an array of `RegExp` arguments,
 * combining their sources and flags. Each interpolated regular expression is safely wrapped
 * in a non-capturing group unless it is already a character class, a non-capturing group, or
 * a fully anchored pattern. All flags from the arguments are collected and applied to the resulting regular expression.
 *
 * @param flags - A set of regular expression flags to be applied to the resulting RegExp.
 * @param template - The template string array representing the static parts of the pattern.
 * @param args - An array of `RegExp` objects to interpolate into the template.
 * @returns A new `RegExp` object constructed from the template and interpolated patterns.
 * @internal
 * @group RegExp
 * @category Construction
 */
function process(a: RegExp, flags: Set<string>): string {
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

  if (source.startsWith('(') && source.endsWith(')')) {
    return source;
  }

  return `(?:${source})`;
}

function reTemplate(flags: Set<string>, template: TemplateStringsArray, args: RegExp[]): RegExp {
  const reText = build(
    cull(
      Array.from(
        zipperMerge(
          Array.from(template.raw),
          args.map((reg) => process(reg, flags)),
        ),
      ).flat(),
    ),
  );

  return new RegExp(reText, build(flags.values()));
}

/**
 * Creates a tagged template function for building regular expressions with the specified flags.
 *
 * @param flags - The flags to apply to the resulting regular expression (e.g., 'g', 'i', 'm').
 * @returns A tagged template function that constructs a `RegExp` object from a template string and interpolated `RegExp` patterns.
 *
 * @example
 * ```typescript
 * const bar = /bar/;
 * const regex = re('gi')`foo${bar}baz${bar}qux`;
 * // regex is a RegExp with pattern 'foo(?:bar)baz(?:bar)qux' and flags 'giu'
 * ```
 *
 * @group RegExp
 * @category Construction
 */
export function re(flags: string): (template: TemplateStringsArray, ...args: RegExp[]) => RegExp;
/**
 * Creates a new `RegExp` object from a template string and interpolated regular expressions.
 *
 * @param template - The template string array containing the static parts of the regular expression.
 * @param args - The interpolated `RegExp` objects to be inserted between the template strings.
 * @returns A new `RegExp` object constructed from the combined template and arguments.
 *
 * @example
 * ```typescript
 * const bar = /bar/;
 * const regex = re`foo${bar}baz${bar}qux`;
 * // regex is a RegExp with pattern 'foo(?:bar)baz(?:bar)qux' and flags 'u'
 * ```
 *
 * @group RegExp
 * @category Construction
 */
export function re(template: TemplateStringsArray, ...args: RegExp[]): RegExp;
/**
 * Creates a tagged template function for building regular expressions with optional specified flags.
 *
 * This overload allows for both tagged template and curried flag usage.
 *
 * @param first - Either a string of flags or a template string array.
 * @param rest - The interpolated `RegExp` objects to be inserted between the template strings.
 * @returns A new `RegExp` object or a tagged template function, depending on usage.
 *
 * @group RegExp
 * @category Construction
 */
export function re(
  first: string | TemplateStringsArray,
  ...rest: RegExp[]
): RegExp | ((template: TemplateStringsArray, ...args: RegExp[]) => RegExp) {
  if (typeof first === 'string') {
    const flags = new Set<string>([...splitChars(first), 'v']);
    return (template: TemplateStringsArray, ...args: RegExp[]) => reTemplate(flags, template, args);
  }

  return reTemplate(new Set(['v']), first, rest);
}

export function reArray(array: RegExp[]): RegExp {
  const flags = new Set<string>('v');
  for (const reg of array) {
    for (const flag of splitChars(reg.flags)) {
      flags.add(flag);
    }
  }

  return new RegExp(
    `(?:${array.map((reg) => process(reg, flags)).join('|')})`,
    build(flags.values()),
  );
}
