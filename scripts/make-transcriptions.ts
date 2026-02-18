import fs from 'node:fs/promises';
import path from 'node:path';

import { bannerize, empty, escapeJS, quote } from '@technobuddha/library';
import { err, locatePackageRoot } from '@technobuddha/library/node';

import { transcriptions } from '../reference/source/transcriptions.ts';

const root = await locatePackageRoot();
if (!root) {
  err('Could not find root directory');
  process.exit(1);
}

const code1: string[] = [
  empty,
  '// prettier-ignore',
  'export const asciiMapping: (string | undefined)[] = [',
  '// eslint-disable-next-line no-sparse-arrays, unicorn/no-hex-escape',
];

const code2: string[] = [
  empty,
  '// prettier-ignore',
  'export const romanization: (string | undefined)[] = [',
  '// eslint-disable-next-line no-sparse-arrays, unicorn/no-hex-escape',
];

let line1 = empty;
let last1 = 0;
let line2 = empty;
let last2 = 0;

for (const [codePoint, ascii, romanization] of transcriptions) {
  while (last1 < codePoint) {
    line1 += ',';
    last1++;
  }

  if (ascii != null) {
    line1 += quote(escapeJS(ascii).replace('\\u00', '\\x'));
  }

  while (last2 < codePoint) {
    line2 += ',';
    last2++;
  }

  if (romanization != null) {
    line2 += quote(escapeJS(romanization).replace('\\u00', '\\x'));
  }
}

// await fs
//   .readFile(path.join(root, 'reference', 'knowledge', 'ascii-transformation.tsv'), 'utf-8')
//   .then((content) => parseCsv(content, { delimiter: '\t', comment: '#' }))
//   .then((rows) =>
//     rows.map((row) => ({
//       codePoint: Number.parseInt(row.codepoint),
//       ascii: unescapeJS(row.ascii),
//     })),
//   )
//   .then((data) => data.sort((a, b) => a.codePoint - b.codePoint))
//   .then((data) => {
//     for (const { codePoint, ascii } of data) {
//       if (!Number.isNaN(codePoint)) {
//         while (last < codePoint) {
//           line += ',';
//           last++;
//         }

//         if (ascii !== '--null--') {
//           line += quote(escapeJS(ascii).replace('\\u00', '\\x'));
//         }
//         last = codePoint;
//       }
//     }

//     return undefined;
//   });

while (line1.endsWith(',')) {
  line1 = line1.slice(0, -1);
}
while (line2.endsWith(',')) {
  line2 = line2.slice(0, -1);
}

code1.push(line1, '];', empty);
code2.push(line2, '];', empty);

await fs.writeFile(
  path.join(root, 'src', 'esnext', '@data', 'ascii-mapping.ts'),
  bannerize(code1.join('\n'), '//'),
);
await fs.writeFile(
  path.join(root, 'src', 'esnext', '@data', 'romanization.ts'),
  bannerize(code2.join('\n'), '//'),
);
