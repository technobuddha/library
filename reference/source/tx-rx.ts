import fs from 'node:fs/promises';
import path from 'node:path';

import { asciiMapping } from '../../src/esnext/@data/ascii-mapping.ts';
import { transcriptions } from './transcriptions.ts';
import { unicodeData } from '../unicode-data.js';
import { romanization } from '../romanization.js';

import { empty, escapeJS, quote, space } from '@technobuddha/library';

const unicode: Map<number, string> = new Map();

for (const { codePoint, character, name, category, combining } of Object.values(unicodeData)) {
  const display =
    combining ?
      combining === 233 || combining === 234 ?
        `o${character}o`
      : `${character}o`
    : category === 'Cs' ? 'surrogate'
    : category.startsWith('C') ? '◌'
    : name.startsWith('VARIATION SELECTOR') ? `◌${character}`
    : name === 'COMBINING GRAPHEME JOINER' ? `◌${character}`
    : character;

  unicode.set(codePoint, `// ${name.padEnd(50)} ${display}`);
}

const code = [
  '// cspell:disable',
  empty,
  '// prettier-ignore',
  'export const transcriptions: [number, string|null, string|null][] = [',
];

for (const codePoint of Array.from(unicode.keys()).sort((a, b) => a - b)) {
  const ascii = asciiMapping[codePoint];
  const cp = `0x${codePoint.toString(16).padStart(6, '0')}`;
  const asc = (ascii == null ? 'null,' : quote(escapeJS(ascii)) + ',').padEnd(12, space);

  const roman = romanization[String.fromCodePoint(codePoint)];
  const rom = (roman == null ? 'null' : quote(escapeJS(roman))).padEnd(32, space);

  code.push(`  [${cp}, ${asc} ${rom}], ${unicode.get(codePoint)}`);
}
code.push('];');

await fs.writeFile(path.join(import.meta.dirname, 'transcriptions.ts'), code.join('\n'));
