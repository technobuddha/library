import { nysiis1 } from './nysiis1.ts';
import { soundexNara } from './soundex-nara.ts';

export function onca(input: string): string {
  return soundexNara(nysiis1(input));
}
