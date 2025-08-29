import { escapeGraphQL } from './escape-graph-ql.ts';
import { isArrayLike } from './is-array-like.ts';
import { isBoolean } from './is-boolean.ts';
import { isNumber } from './is-number.ts';
import { isString } from './is-string.ts';
import { empty, space } from './unicode.ts';
import { zipperMerge } from './zipper-merge.ts';

/**
 * A GraphQL Object, similar to a JSONObject
 * @group Programming
 * @category GraphQl
 */
export type GraphQLObject = { [Key in string]: GraphQLValue };

/**
 * A GraphQL Array, similar to a JSONArray
 * @group Programming
 * @category GraphQl
 */
export type GraphQLArray = GraphQLValue[];

/**
 * A GraphQL Value, similar to a JSONValue
 * @group Programming
 * @category GraphQl
 */
export type GraphQLValue = number | string | null | boolean | GraphQLArray | GraphQLObject;

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
 * @group Programming
 * @category GraphQl
 */
export function graphQL(
  template: TemplateStringsArray | GraphQLValue,
  ...args: GraphQLValue[]
): string {
  if (!isString(template) && isArrayLike(template) && 'raw' in template) {
    return zipperMerge(
      template.map((t) => t.replaceAll(/[\r\n]+\s*/gu, space)),
      args.map((arg) => graphQL(arg)),
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
