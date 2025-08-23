import { space } from './constants.ts';
import { capitalize } from './index.ts';
import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';

export function startCase(input: string): string {
  return tokenize(removeDiacritics(input)).map(capitalize).join(space);
}
