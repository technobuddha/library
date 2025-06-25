import { isArray, isArrayLike, isBoolean, isNull, isNumber, isString, zip } from 'lodash-es';

import { empty, space } from './constants.ts';
import { escapeGraphQL } from './escape-graphql.ts';

/**
 * @group Template
 * @category GraphQl
 */
export type GraphQLObject = { [Key in string]: GraphQLValue };
/**
 * @group Template
 * @category GraphQl
 */
export type GraphQLArray = GraphQLValue[];
/**
 * @group Template
 * @category GraphQl
 */
export type GraphQLValue = number | string | null | boolean | GraphQLArray | GraphQLObject;

/**
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
    return zip(
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
  if (isNull(template)) {
    return 'null';
  }
  if (isBoolean(template)) {
    return template ? 'true' : 'false';
  }
  if (isArray(template)) {
    return `[ ${template.map((a) => graphQL(a)).join(', ')} ]`;
  }
  return `{ ${Object.entries(template as Record<string, GraphQLValue>)
    .map(([key, value]) => `${key}: ${graphQL(value)}`)
    .join(', ')} }`;
}
