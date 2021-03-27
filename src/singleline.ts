import { space, empty }  from './constants';
import zip        from 'lodash/zip';

export function singleline(template: TemplateStringsArray, ...args: (any)[]): string {
    return zip(template.map(t => t.replace(/[\r\n]+\s*/gu, space)), args).flat().join(empty).trim();
}

export default singleline;
