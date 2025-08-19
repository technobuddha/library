import { empty, space } from './constants.ts';
import { escapeGraphQL } from './escape-graphql.ts';
import { isArrayLike } from './is-array-like.ts';
import { isBoolean } from './is-boolean.ts';
import { isNumber } from './is-number.ts';
import { isString } from './is-string.ts';
import { zipperMerge } from './zipper-merge.ts';

/**
 * A GraphQL Object, similar to a JSONObject
 *
 * @group Template
 * @category GraphQl
 */
export type GraphQLObject = { [Key in string]: GraphQLValue };

/**
 * A GraphQL Array, similar to a JSONArray
 *
 * @group Template
 * @category GraphQl
 */
export type GraphQLArray = GraphQLValue[];

/**
 * A GraphQL Value, similar to a JSONValue
 *
 * @group Template
 * @category GraphQl
 */
export type GraphQLValue = number | string | null | boolean | GraphQLArray | GraphQLObject;

/**
 * Tagged template function for constructing GraphQL queries or mutations.
 *
 * @param template - The template string array representing the static parts of the GraphQL query.
 * @param args - The dynamic values to interpolate into the query.
 * @returns The resulting GraphQL query string with interpolated values.
 *
 * @group Template
 * @category GraphQl
 */
export function graphQL(template: TemplateStringsArray, ...args: GraphQLValue[]): string;
export function graphQL(arg: GraphQLValue): string;
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
