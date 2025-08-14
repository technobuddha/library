//cspell:ignore tieth

import { hyphen } from '../constants.ts';

export function makeOrdinal(word: string): string {
  if (word.endsWith('11') || word.endsWith('12') || word.endsWith('13')) {
    return `${word}th`;
  }
  if (word.endsWith('1')) {
    return `${word}st`;
  }
  if (word.endsWith('2')) {
    return `${word}nd`;
  }
  if (word.endsWith('3')) {
    return `${word}rd`;
  }
  if (
    word.endsWith('4') ||
    word.endsWith('5') ||
    word.endsWith('6') ||
    word.endsWith('7') ||
    word.endsWith('8') ||
    word.endsWith('9') ||
    word.endsWith('0')
  ) {
    return `${word}th`;
  }

  if (word.endsWith('one')) {
    return `${word.slice(0, -3)}first`;
  }

  if (word.endsWith('two')) {
    return `${word.slice(0, -3)}second`;
  }

  if (word.endsWith('three')) {
    return `${word.slice(0, -5)}third`;
  }

  if (word.endsWith('five')) {
    return `${word.slice(0, -4)}fifth`;
  }

  if (word.endsWith('eight')) {
    return `${word.slice(0, -5)}eighth`;
  }

  if (word.endsWith('twelve')) {
    return `${word.slice(0, -6)}twelfth`;
  }

  if (word.endsWith('ty')) {
    return `${word.slice(0, -2)}tieth`;
  }

  return `${word}th`;
}
