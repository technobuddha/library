import { isRegExp, isString } from 'lodash-es';

export function matches(
  input: string,
  match: string | RegExp | Iterable<string | RegExp>,
): boolean {
  const text = input.trim().toLowerCase();

  if (isRegExp(match)) return match.test(text);
  if (isString(match)) return match.toLowerCase() === text;

  for (const m of match)
    if ((isRegExp(m) && m.test(text)) || (isString(m) && m.toLowerCase() === text)) return true;

  return false;
}

export default matches;
