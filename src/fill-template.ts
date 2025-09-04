import { empty } from './unicode.ts';
/**
 * Options for the {@link fillTemplate} function
 * @group String
 * @category Operations
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
 * @category Operations
 */
export function fillTemplate(
  input: string,
  values: Record<string, string | undefined>,
  { open = '{{', close = '}}' }: FillTemplateOptions = {},
): string {
  let argInput = input;

  for (const match of argInput.match(
    new RegExp(`${RegExp.escape(open)}(.+?)${RegExp.escape(close)}`, 'ug'),
  ) ?? []) {
    const key = match.slice(open.length, -close.length).trim();
    argInput = argInput.replace(match, values[key] ?? empty);
  }
  return argInput;
}
