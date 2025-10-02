import fs from 'node:fs/promises';
import path from 'node:path';

import { bannerize, empty, escapeJS, quote } from '@technobuddha/library';
import { err, locateRootDirectory } from '@technobuddha/library/node';

import { asciiTransformation } from '../reference/knowledge/ascii-transformation.ts';

const root = await locateRootDirectory();
if (!root) {
  err('Could not find root directory');
  process.exit(1);
}

const code: string[] = [
  empty,
  '// prettier-ignore',
  'export const asciiMapping: (string | undefined)[] = [',
  '// eslint-disable-next-line no-sparse-arrays, unicorn/no-hex-escape',
];

let line = empty;
let last = 0;

for (const [from, to] of Object.entries(asciiTransformation).sort(
  ([a], [b]) => Number(a) - Number(b),
)) {
  if (to !== undefined) {
    const codePoint = Number(from);
    while (last < codePoint) {
      line += ',';
      last++;
    }
    line += quote(escapeJS(to));
    last = codePoint;
  }
}

while (line.endsWith(',')) {
  line = line.slice(0, -1);
}
line = line.replaceAll('\\u00', '\\x');

code.push(line, '];', empty);

await fs.writeFile(
  path.join(root, 'src', 'esnext', '@data', 'ascii-mapping.ts'),
  bannerize(code.join('\n'), '//'),
);
