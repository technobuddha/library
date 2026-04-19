import path from 'node:path';

import { savePretty, saveRaw } from '@technobuddha/project';

import { romanization } from '../reference/knowledge/romanization.js';
import { unicodeData } from '../reference/knowledge/unicode-data.js';
import { transcriptions } from '../reference/source/transcriptions/transcriptions.js';
import { escapeJS } from '../src/esnext/escape/escape-js.ts';
import { quote } from '../src/esnext/string/quote.ts';
import { empty, space } from '../src/esnext/unicode/unicode.ts';
import { err } from '../src/node/err.ts';
import { locatePackageRoot } from '../src/node/locate-package-root.ts';

const root = await locatePackageRoot();
if (!root) {
  err('Could not find root directory');
  process.exit(1);
}

type UnicodeTranscription = {
  ascii: string | null;
  romanization: string | null;
  description: string;
};

const unicode: Map<number, UnicodeTranscription> = new Map();
for (const { codePoint, character, name, display, category, combining } of Object.values(unicodeData)) {
  unicode.set(codePoint, {
    ascii: null,
    romanization: null,
    description: `${name.padEnd(50)} ${display}`,
  });
}

for (const [char, roman] of Object.entries(romanization)) {
  const codePoint = char.codePointAt(0);
  if (codePoint != null) {
    const entry = unicode.get(codePoint);
    if (entry) {
      entry.romanization ??= roman;
    }
  }
}

for (const [codePoint, ascii] of transcriptions) {
  const entry = unicode.get(codePoint);
  if (entry) {
    entry.ascii ??= ascii;
  }
}

const code0 = ['// cspell:disable', empty, '// prettier-ignore', 'export const transcriptions = ['];

const code1: string[] = [
  empty,
  '// cspell:disable',
  '// prettier-ignore',
  'export const asciiMapping: (string | undefined)[] = [',
  '// eslint-disable-next-line no-sparse-arrays, unicorn/no-hex-escape',
];

const code2: string[] = [
  empty,
  '// cspell:disable',
  '// prettier-ignore',
  'export const romanization: (string | undefined)[] = [',
  '// eslint-disable-next-line no-sparse-arrays',
];

let line1 = empty;
let line2 = empty;
let last = 0;

for (const [codePoint, { ascii, romanization, description }] of Array.from(unicode.entries()).sort(
  ([a], [b]) => a - b,
)) {
  const cp = `0x${codePoint.toString(16).padStart(6, '0')}`;
  const asc = (ascii == null ? 'null,' : `${quote(escapeJS(ascii))},`).padEnd(12, space);
  const rom = (romanization == null ? 'null' : quote(escapeJS(romanization))).padEnd(32, space);
  code0.push(`  [${cp}, ${asc} ${rom}], // ${description}`);

  while (codePoint - last > 0) {
    line1 += ',';
    line2 += ',';
    last++;
  }

  if (ascii != null) {
    line1 += quote(escapeJS(ascii).replace('\\u00', '\\x'));
  }

  if (romanization != null) {
    line2 += quote(escapeJS(romanization).replace('\\u00', '\\x'));
  }
}
code0.push('];', empty);

while (line1.endsWith(',')) {
  line1 = line1.slice(0, -1);
}
while (line2.endsWith(',')) {
  line2 = line2.slice(0, -1);
}

code1.push(line1, '];', empty);
code2.push(line2, '];', empty);

await saveRaw(
  path.join(root, 'reference', 'source', 'transcriptions', 'transcriptions.js'),
  code0.join('\n'),
  '//',
);

await savePretty(
  path.join(root, 'src', 'esnext', '@data', 'ascii-mapping.ts'),
  code1.join('\n'),
  'typescript',
  '//',
);
await savePretty(
  path.join(root, 'src', 'esnext', '@data', 'romanization.ts'),
  code2.join('\n'),
  'typescript',
  '//',
);
