import { isRegExp, isString } from 'lodash-es';

export function matches(text: string, match: string | RegExp | Iterable<string | RegExp>): boolean {
  const str = text.trim().toLocaleLowerCase();

  if (isRegExp(match)) {
    return match.test(str);
  }
  if (isString(match)) {
    return match.toLocaleLowerCase() === str;
  }

  for (const m of match) {
    if ((isRegExp(m) && m.test(str)) || (isString(m) && m.toLocaleLowerCase() === str)) {
      return true;
    }
  }

  return false;
}
