import { space, empty }  from './constants';
import zip        from 'lodash/zip';

export function singleline(template: TemplateStringsArray, ...args: (any)[]): string {
    return zip(template.map(t => t.replace(/[\r\n]+\s*/gu, space).trim()), args).flat().join(empty);
}

export default singleline;
