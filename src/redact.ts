import { ansiEscapes } from './regexp.ts';
import { empty } from './unicode.ts';

// const redacted = '█'; // 0x2588  ░▒▓

export type RedactAction = 'remove' | 'keep';

export type RedactOptions = {
  ansiEscape?: RedactAction;
};

export function redact(input: string, { ansiEscape = 'remove' }: RedactOptions = {}): string {
  let output = input;

  if (ansiEscape === 'remove') {
    output = output.replaceAll(ansiEscapes, empty);
  }

  return output;
}
