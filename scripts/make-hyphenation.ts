import fs from 'node:fs/promises';
import path from 'node:path';

import { bannerize, empty } from '@technobuddha/library';
import { err, locatePackageRoot } from '@technobuddha/library/node';
import { hyphenation } from '../reference/knowledge/hyphenation.js';

const root = await locatePackageRoot();
if (!root) {
  err('Could not find root directory');
  process.exit(1);
}

type Points = { points: number[] };
interface Tree {
  [key: string]: Tree | Points;
}

const tree: Tree = {};
const exceptions: Record<string, string[]> = {};

for (const pattern of hyphenation.patterns) {
  const characters = pattern.replaceAll(/\d/gv, empty);
  // eslint-disable-next-line no-implicit-coercion
  const points = pattern.split(/[.a-z]/gv).map((d) => +d || 0);

  let branch: Tree | Points = tree;
  for (const character of characters) {
    if (!(character in branch)) {
      branch[character] = {};
    }
    branch = branch[character] as Tree;
  }
  (branch as unknown as Points).points = points;
}

for (const e of hyphenation.exceptions) {
  const syllables = e.split('-');
  exceptions[syllables.join(empty)] = syllables;
}

const source = bannerize(
  `// cspell:disable
type Points = { points: number[] };
interface Tree {
  [key: string]: Tree | Points;
};

// prettier-ignore
export const exceptions: Record<string, string[]> = ${JSON.stringify(exceptions)};

// prettier-ignore
export const tree: Tree = ${JSON.stringify(tree)};
`,
  '//',
);

await fs.writeFile(path.join(root, 'src', 'esnext', '@data', 'hyphenation.ts'), source);
