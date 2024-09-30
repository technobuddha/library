import { escapeRegExp } from 'lodash-es';

import { empty } from './constants';

type Options = {
  /** The opening field delimiter */
  open?: string;
  /** The closing field delimiter */
  close?: string;
};

/**
 * Fill a template with supplies values
 * @param input The template
 * @param values A dictionary of name-values used to fill in values in the template
 * @param __namedParameters see {@link Options}
 * @default open '{{'
 * @default close (default '}}')
 * @return template with values replaced
 */
export function fillTemplate(
  input: string,
  values: Record<string, string | undefined>,
  { open = '{{', close = '}}' }: Options = {},
): string {
  let text = input;

  for (const match of text.match(
    new RegExp(`${escapeRegExp(open)}(.+?)${escapeRegExp(close)}`, 'ug'),
  ) ?? []) {
    const key = match.slice(open.length, -close.length).trim();
    text = text.replace(match, values[key] ?? empty);
  }
  return text;
}

export default fillTemplate;
