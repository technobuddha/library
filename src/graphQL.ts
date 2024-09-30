import { space, empty } from './constants';
import { zip } from 'lodash-es';
import { isNumber } from 'lodash-es';
import { isBoolean } from 'lodash-es';
import { isNull } from 'lodash-es';
import { isArray } from 'lodash-es';
import { isArrayLike } from 'lodash-es';
import { isString } from 'lodash-es';
import escapeGraphQL from './escapeGraphQL';

type GraphQLObject = { [Key in string]: GraphQLValue };
type GraphQLArray = GraphQLValue[];
type GraphQLValue = number | string | null | boolean | GraphQLArray | GraphQLObject;

export function graphQL(template: TemplateStringsArray, ...args: GraphQLValue[]): string;
export function graphQL(arg: GraphQLValue): string;
export function graphQL(
  template: TemplateStringsArray | GraphQLValue,
  ...args: GraphQLValue[]
): string {
  if (!isString(template) && isArrayLike(template) && 'raw' in template) {
    return zip(
      template.map((t) => t.replace(/[\r\n]+\s*/gu, space)),
      args.map((arg) => graphQL(arg)),
    )
      .flat()
      .join(empty)
      .trim();
  }

  if (isNumber(template)) return template.toString();
  if (isString(template)) return `"${escapeGraphQL(template)}"`;
  if (isNull(template)) return 'null';
  if (isBoolean(template)) return template ? 'true' : 'false';
  if (isArray(template)) return `[ ${template.map((a) => graphQL(a)).join(', ')} ]`;
  return `{ ${Object.entries(template as Record<string, GraphQLValue>)
    .map(([key, value]) => `${key}: ${graphQL(value)}`)
    .join(', ')} }`;
}

export default graphQL;
