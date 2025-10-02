import { escapeRegExp } from '../escape/escape-regexp.ts';
import { empty } from '../unicode/unicode.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Options for the {@link fillTemplate} function
 * @group String
 * @category Template
 */
export type FillTemplateOptions = {
  /** The opening field delimiter */
  open?: string;
  /** The closing field delimiter */
  close?: string;
};

/**
 * Fill a template with supplied values
 * @param input - The template
 * @param values - A dictionary of name-values used to fill in values in the template
 * @param options - see {@link FillTemplateOptions}
 * @defaultValue open '\{\{'
 * @defaultValue close '\}\}'
 * @returns template with values replaced
 * @group String
 * @category Template
 */
export function fillTemplate(
  input: StringLike,
  values: Record<string, StringLike | undefined>,
  { open = '{{', close = '}}' }: FillTemplateOptions = {},
): string {
  let argInput = toString(input);

  for (const match of argInput.match(
    new RegExp(`${escapeRegExp(open)}(.+?)${escapeRegExp(close)}`, 'vg'),
  ) ?? []) {
    const key = match.slice(open.length, -close.length).trim();
    argInput = argInput.replace(match, toString(values[key] ?? empty));
  }
  return argInput;
}
