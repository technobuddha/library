import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

import { isIPV4 } from './is-ipv4.ts';

export function parseIPV4(address: StringLike): [number, number, number, number] | undefined {
  const text = toString(address);
  if (isIPV4(text)) {
    return text.split('.').map((octet) => Number.parseInt(octet)) as [
      number,
      number,
      number,
      number,
    ];
  }
  return undefined;
}
