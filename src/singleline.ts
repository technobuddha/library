import { empty }  from './constants';
import zip        from 'lodash/zip';

export function singleline(template: TemplateStringsArray, ...args: (string | RegExp)[]): string {
    return zip(template.map(t => t.replace(/[\r\n]+\s*/gu, empty)), args).flat().join(empty);
}

export default singleline;
