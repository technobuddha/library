import fs from 'node:fs/promises';
import path from 'node:path';

import { bannerize, empty, escapeJS, parseCsv, quote, unescapeJS } from '@technobuddha/library';
import { err, locatePackageRoot } from '@technobuddha/library/node';

const root = await locatePackageRoot();
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

await fs
  .readFile(path.join(root, 'reference', 'knowledge', 'ascii-transformation.tsv'), 'utf-8')
  .then((content) => parseCsv(content, { delimiter: '\t', comment: '#' }))
  .then((rows) =>
    rows.map((row) => ({
      codePoint: Number.parseInt(row.codepoint),
      ascii: unescapeJS(row.ascii),
    })),
  )
  .then((data) => data.sort((a, b) => a.codePoint - b.codePoint))
  .then((data) => {
    for (const { codePoint, ascii } of data) {
      if (!Number.isNaN(codePoint)) {
        while (last < codePoint) {
          line += ',';
          last++;
        }

        line += quote(escapeJS(ascii).replace('\\u00', '\\x'));
        last = codePoint;
      }
    }

    return undefined;
  });

while (line.endsWith(',')) {
  line = line.slice(0, -1);
}

code.push(line, '];', empty);

await fs.writeFile(
  path.join(root, 'src', 'esnext', '@data', 'ascii-mapping.ts'),
  bannerize(code.join('\n'), '//'),
);
