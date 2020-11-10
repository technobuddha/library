import escapeRegExp from 'lodash/escapeRegExp';
import { empty }    from './constants';

type FillTemplateOptions = {
    open?: string,
    close?: string,
}

/**
  * Fill a template with supplies values
  * @param input The template
  * @param values A dictionary of name-values used to fill in values in the template
  * @param open The opening field delimiter (default '{{')
  * @param close The closing field delimiter (default '}}')
  */
export function fillTemplate(input: string, values: Record<string, string>, {open = '{{', close = '}}'}: FillTemplateOptions = {}): string {
    for(const match of input.match(new RegExp(escapeRegExp(open) + '(.+?)' + escapeRegExp(close), 'g')) ?? []) {
        const key = match.substring(open.length, match.length - close.length).trim();
        input = input.replace(match, values[key] ?? empty);
    }
    return input;
}

export default fillTemplate;
