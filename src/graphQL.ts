import { space, empty }  from './constants';
import zip               from 'lodash/zip';
import isNumber          from 'lodash/isNumber';
import isBoolean         from 'lodash/isBoolean';
import isNull            from 'lodash/isNull';
import isArray           from 'lodash/isArray';
import isArrayLike       from 'lodash/isArrayLike';
import isString          from 'lodash/isString';
import escapeGraphQL     from './escapeGraphQL';

type GraphQLObject    = {[Key in string]: GraphQLValue };
type GraphQLArray     = GraphQLValue[];
type GraphQLValue     = number | string | null | boolean | GraphQLArray | GraphQLObject;

export function graphQL(template: TemplateStringsArray, ...args: GraphQLValue[]): string;
export function graphQL(arg: GraphQLValue):                                       string;
export function graphQL(template: any, ...args: GraphQLValue[]):                  string {
    if(isArrayLike(template) && template.raw) {
        return zip(
            (template as TemplateStringsArray).map(t => t.replace(/[\r\n]+\s*/gu, space)),
            args.map(arg => graphQL(arg))
        )
        .flat()
        .join(empty).trim();
    }

    if(isNumber(template))
        return template.toString();
    if(isString(template))
        return `"${escapeGraphQL(template)}"`;
    if(isNull(template))
        return 'null';
    if(isBoolean(template))
        return template ? 'true' : 'false';
    if(isArray(template))
        return `[ ${template.map(a => graphQL(a)).join(', ')} ]`;
    return `{ ${Object.entries(template as Record<string, GraphQLValue>).map(([ key, value ]) => `${key}: ${graphQL(value)}`).join(', ')} }`;
}

export default graphQL;
