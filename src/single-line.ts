import { zip } from 'lodash-es';

import { empty, space } from './constants.js';

export function singleLine(template: TemplateStringsArray, ...args: unknown[]): string {
  return zip(
    template.map((t) => t.replaceAll(/[\r\n]+\s*/gu, space)),
    args,
  )
    .flat()
    .join(empty)
    .trim();
}
