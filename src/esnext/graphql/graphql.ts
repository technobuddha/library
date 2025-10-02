import { isArrayLike } from '../array/is-array-like.ts';
import { zipperMerge } from '../array/zipper-merge.ts';
import { isBoolean } from '../boolean/is-boolean.ts';
import { isNumber } from '../number/is-number.ts';
import { isString } from '../string/is-string.ts';
import { empty, space } from '../unicode/unicode.ts';

import { escapeGraphQL } from './escape-graphql.ts';
import { type GraphQLValue } from './graphql-value.ts';

/**
 * Escapes and formats GraphQL query strings or values.
 * @param template - The template string array representing the static parts of the GraphQL query.
 * @param args - The dynamic values to interpolate into the query.
 * @returns The resulting GraphQL query string with interpolated values.
 * @example
 * ```typescript
 * const userId = 123;
 * const query = graphQL`
 *   query GetUser { user(id: ${userId}) { id name } }
 * `;
 * // query: 'query GetUser { user(id: 123) { id name } }'
 * ```
 */
export function graphQL(template: TemplateStringsArray, ...args: GraphQLValue[]): string;
/**
 * Escape and format an individual GraphQL query string.
 * @param arg - The dynamic value to interpolate into the query.
 * @returns The resulting GraphQL query string with interpolated values.
 * @example
 * ```typescript
 * // Using as a function
 * graphQL('hello'); // '"hello"'
 * graphQL(42); // '42'
 * graphQL({ foo: 'bar' }); // '{foo:"bar"}'
 * ```
 */
export function graphQL(arg: GraphQLValue): string;
/**
 * Tagged template function for constructing GraphQL queries or mutations.
 * @group GraphQL
 * @category Escaping
 */
export function graphQL(
  template: TemplateStringsArray | GraphQLValue,
  ...args: GraphQLValue[]
): string {
  if (!isString(template) && isArrayLike(template) && 'raw' in template) {
    return Array.from(
      zipperMerge(
        template.map((t) => t.replaceAll(/[\r\n]+\s*/gv, space)),
        args.map((arg) => graphQL(arg)),
      ),
    )
      .flat()
      .join(empty)
      .trim();
  }

  if (isNumber(template)) {
    return template.toString();
  }
  if (isString(template)) {
    return `"${escapeGraphQL(template)}"`;
  }
  if (template === null) {
    return 'null';
  }
  if (isBoolean(template)) {
    return template ? 'true' : 'false';
  }
  if (Array.isArray(template)) {
    return `[ ${template.map((a) => graphQL(a)).join(', ')} ]`;
  }
  return `{ ${Object.entries(template as Record<string, GraphQLValue>)
    .map(([key, value]) => `${key}: ${graphQL(value)}`)
    .join(', ')} }`;
}
