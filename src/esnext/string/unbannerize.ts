import { splitLines } from '../tokenization/split-lines.ts';

import { bannerMarker } from './bannerize.ts';
import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

export function unbannerize(text: StringLike): string {
  const content = toString(text);

  const lines = splitLines(content);

  let index = 0;
  let line = lines[index];

  if (line.startsWith('#')) {
    if (line.startsWith('#!')) {
      line = lines[++index];
    }

    while (line.startsWith('#') && line.includes(bannerMarker)) {
      lines.splice(index, 1);
      line = lines[index];
    }
  } else if (line.startsWith('<!--')) {
    if (!line.endsWith('-->')) {
      line = lines[++index];
      let found = false;

      while (line.includes(bannerMarker)) {
        found = true;

        lines.splice(index, 1);
        line = lines[index];
      }

      if (found) {
        lines.splice(index - 1, 2);
      }
    }
  } else if (line.startsWith('/**')) {
    if (!line.endsWith('*/')) {
      let found = false;
      line = lines[++index];

      while (line.includes(bannerMarker)) {
        found = true;
        lines.splice(index, 1);
        if (line.endsWith('*/')) {
          break;
        }
        line = lines[index];
      }
      if (found) {
        lines.splice(index - 1, 1);
      }
    }
  } else if (line.startsWith('//')) {
    while (line.startsWith('//') && line.includes(bannerMarker)) {
      lines.splice(index, 1);
      line = lines[index];
    }
  } else if (line.startsWith('%')) {
    while (line.startsWith('%') && line.includes(bannerMarker)) {
      lines.splice(index, 1);
      line = lines[index];
    }
  } else if (line.startsWith(';')) {
    while (line.startsWith(';') && line.includes(bannerMarker)) {
      lines.splice(index, 1);
      line = lines[index];
    }
  }

  return lines.join('\n');
}
