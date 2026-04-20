// cspell:disable
/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-unnecessary-type-conversion */
/* eslint-disable no-param-reassign */
const sh = 'X';
const th = '0';

export function metaphone(value: string): string {
  // eslint-disable-next-line no-multi-assign, @typescript-eslint/no-explicit-any
  const stdTrace: string[] = ((globalThis as any).stdTrace = []);

  let phonized = '';
  let index = 0;
  let skip;
  const next = atFactory(1);
  const current = atFactory(0);
  const previous = atFactory(-1);

  function phonize(characters: string): void {
    phonized += characters;
    stdTrace.push(`${current()} "${value.slice(index)}": ${characters}`);
  }

  function at(offset: number): string {
    return value.charAt(index + offset).toUpperCase();
  }

  function atFactory(offset: number): () => string {
    return () => at(offset);
  }

  value = String(value || '');

  if (!value) {
    return '';
  }

  while (!alpha(current())) {
    if (!current()) {
      return '';
    }

    index++;
  }

  switch (current()) {
    case 'A': {
      if (next() === 'E') {
        phonize('E');
        index += 2;
      } else {
        phonize('A');
        index++;
      }

      break;
    }
    case 'G':
    case 'K':
    case 'P': {
      if (next() === 'N') {
        phonize('N');
        index += 2;
      }

      break;
    }

    case 'W': {
      if (next() === 'R') {
        phonize(next());
        index += 2;
      } else if (next() === 'H') {
        phonize(current());
        index += 2;
      } else if (vowel(next())) {
        phonize('W');
        index += 2;
      }

      break;
    }
    case 'X': {
      phonize('S');
      index++;

      break;
    }
    case 'E':
    case 'I':
    case 'O':
    case 'U': {
      phonize(current());
      index++;
      break;
    }
    default: {
      break;
    }
  }

  while (current()) {
    skip = 1;

    if (!alpha(current()) || (current() === previous() && current() !== 'C')) {
      index += skip;
      continue;
    }

    switch (current()) {
      case 'B': {
        if (previous() !== 'M') {
          phonize('B');
        }

        break;
      }
      case 'C': {
        if (soft(next())) {
          if (next() === 'I' && at(2) === 'A') {
            phonize(sh);
          } else if (previous() !== 'S') {
            phonize('S');
          }
        } else if (next() === 'H') {
          phonize(sh);
          skip++;
        } else {
          phonize('K');
        }

        break;
      }
      case 'D': {
        if (next() === 'G' && soft(at(2))) {
          phonize('J');
          skip++;
        } else {
          phonize('T');
        }

        break;
      }
      case 'G': {
        if (next() === 'H') {
          if (!(noGhToF(at(-3)) || at(-4) === 'H')) {
            phonize('F');
            skip++;
          }
        } else if (next() === 'N') {
          if (!(!alpha(at(2)) || (at(2) === 'E' && at(3) === 'D'))) {
            phonize('K');
          }
        } else if (soft(next()) && previous() !== 'G') {
          phonize('J');
        } else {
          phonize('K');
        }

        break;
      }

      case 'H': {
        if (vowel(next()) && !diphthongH(previous())) {
          phonize('H');
        }

        break;
      }
      case 'K': {
        if (previous() !== 'C') {
          phonize('K');
        }

        break;
      }
      case 'P': {
        if (next() === 'H') {
          phonize('F');
        } else {
          phonize('P');
        }

        break;
      }
      case 'Q': {
        phonize('K');
        break;
      }
      case 'S': {
        if (next() === 'I' && (at(2) === 'O' || at(2) === 'A')) {
          phonize(sh);
        } else if (next() === 'H') {
          phonize(sh);
          skip++;
        } else {
          phonize('S');
        }

        break;
      }
      case 'T': {
        if (next() === 'I' && (at(2) === 'O' || at(2) === 'A')) {
          phonize(sh);
        } else if (next() === 'H') {
          phonize(th);
          skip++;
        } else if (!(next() === 'C' && at(2) === 'H')) {
          phonize('T');
        }

        break;
      }
      case 'V': {
        phonize('F');
        break;
      }
      case 'W': {
        if (vowel(next())) {
          phonize('W');
        }

        break;
      }
      case 'X': {
        phonize('KS');
        break;
      }
      case 'Y': {
        if (vowel(next())) {
          phonize('Y');
        }

        break;
      }
      case 'Z': {
        phonize('S');
        break;
      }
      case 'F':
      case 'J':
      case 'L':
      case 'M':
      case 'N':
      case 'R': {
        phonize(current());
        break;
      }
    }

    index += skip;
  }

  return phonized;
}
function noGhToF(character: string): boolean {
  character = char(character);

  return character === 'B' || character === 'D' || character === 'H';
}
function soft(character: string): boolean {
  character = char(character);
  return character === 'E' || character === 'I' || character === 'Y';
}
function vowel(character: string): boolean {
  character = char(character);

  return (
    character === 'A' ||
    character === 'E' ||
    character === 'I' ||
    character === 'O' ||
    character === 'U'
  );
}
function diphthongH(character: string): boolean {
  character = char(character);

  return (
    character === 'C' ||
    character === 'G' ||
    character === 'P' ||
    character === 'S' ||
    character === 'T'
  );
}
function alpha(character: string): boolean {
  const code = charCode(character);
  return code >= 65 && code <= 90;
}
function charCode(character: string): number {
  return char(character).charCodeAt(0);
}
function char(character: string): string {
  return String(character).charAt(0).toUpperCase();
}
