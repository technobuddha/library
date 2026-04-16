import fs from 'node:fs/promises';
import path from 'node:path';

import { savePretty } from '@technobuddha/project/library';

import { kebabCase } from '../src/esnext/case-conversion/kebab-case.ts';
import { quote } from '../src/esnext/string/quote.ts';
import { extractWords } from '../src/esnext/tokenization/extract-words.ts';
import { splitLines } from '../src/esnext/tokenization/split-lines.ts';
import { empty, space } from '../src/esnext/unicode/unicode.ts';
import { err } from '../src/node/err.ts';
import { locatePackageRoot } from '../src/node/locate-package-root.ts';

const root = await locatePackageRoot();
if (!root) {
  err('Could not find root directory');
  process.exit(1);
}

const lorem: string[] = [
  '// prettier-ignore',
  'export const loremIpsumData: Record<LoremIpsumVersions, string[]> = {',
];
const versions: string[] = [
  '/**',
  ' * Available Lorem Ipsum text variations from classic literature and poetry',
  ' *',
  ' * - `childe-harold` - From Lord Byron\'s "Childe Harold\'s Pilgrimage" (English)',
  ' * - `decameron` - From Boccaccio\'s "Decameron" (Italian)',
  ' * - `faust` - From Goethe\'s "Faust" (German)',
  ' * - `in-der-fremde` - From Heine\'s "In der Fremde" (German)',
  ' * - `le-bateau-ivre` - From Rimbaud\'s "Le Bateau Ivre" (French)',
  ' * - `le-masque` - From Baudelaire\'s "Le Masque" (French)',
  ' * - `lorem-ipsum` - Classic Lorem Ipsum placeholder text (Latin)',
  ' * - `nagyon-faj` - From Ady Endre\'s "Nagyon fáj" (Hungarian)',
  ' * - `omagyar-maria-siralom` - Old Hungarian "Ómagyar Mária-siralom" (Old Hungarian)',
  ' * - `robinsono-kruso` - From "Robinson Crusoe" (Esperanto)',
  ' * - `the-raven` - From Edgar Allan Poe\'s "The Raven" (English)',
  ' * - `tierra-y-luna` - From Federico García Lorca\'s "Tierra y Luna" (Spanish)',
  ' * @group Random',
  ' * @category Lorem Ipsum',
  ' */',
  'export type LoremIpsumVersions = ',
];

await fs.readdir(path.join(root, 'reference', 'knowledge', 'lorem')).then(async (files) => {
  for (const file of files) {
    const words: string[] = [];
    const { name, ext } = path.parse(file);

    if (ext === '.md') {
      const lines = splitLines(
        await fs.readFile(path.join(root, 'reference', 'knowledge', 'lorem', file), 'utf-8'),
      );
      let inText = false;
      for (const line of lines) {
        if (line.startsWith('#')) {
          inText = line.split(space)[1].toLowerCase() === 'text';
        } else if (inText) {
          words.push(...extractWords(line).filter((w) => w !== '-'));
        }
      }

      lorem.push(`'${kebabCase(name)}': [ ${words.map((w) => quote(w)).join(', ')} ],`);
      versions.push(`| '${kebabCase(name)}'`);
    }
  }
});

lorem.push('};', empty);
versions.push(';', empty);

const file = ['// cspell:disable', empty, ...versions, ...lorem].join('\n');

// await fs.writeFile(
//   path.join(root, 'src', 'esnext', '@data', 'lorem-ipsum.ts'),
//   bannerize(file, '//'),
// );
await savePretty(
  path.join(root, 'src', 'esnext', '@data', 'lorem-ipsum.ts'),
  file,
  'typescript',
  '//',
);
