import fs from 'node:fs/promises';
import path from 'node:path';

import { bannerize, empty, splitLines } from '@technobuddha/library';
import { err, locatePackageRoot } from '@technobuddha/library/node';

const root = await locatePackageRoot();
if (!root) {
  err('Could not find root directory');
  process.exit(1);
}

type Points = { points: number[] };
interface Tree {
  [key: string]: Tree | Points;
}

const copyright: string[] = [];
const patterns: string[] = [];
const exceptions: Record<string, string[]> = {};
const tree: Tree = {};
let mode: 'copyright' | 'notification' | 'comments' | 'patterns' | 'exceptions' = 'copyright';

await fs.readFile(path.join(root, 'reference', 'hyphen', 'ushyphmax.tex'), 'utf-8').then((data) => {
  const lines = splitLines(data);
  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    if (line.startsWith('%')) {
      if (mode === 'copyright') {
        if (line.startsWith('% Copyright')) {
          copyright.push(line.slice(2).trim());
          mode = 'notification';
        }
      } else if (mode === 'notification') {
        if (line.trim() === '%') {
          mode = 'comments';
        } else {
          copyright.push(line.slice(2).trim());
        }
      }
      continue;
    }

    if (line.startsWith('\\patterns{')) {
      mode = 'patterns';
      continue;
    }

    if (line.startsWith('\\hyphenation{')) {
      mode = 'exceptions';
      continue;
    }

    if (line.startsWith('}')) {
      mode = 'comments';
      continue;
    }

    switch (mode) {
      case 'copyright':
      case 'notification':
      case 'comments': {
        break;
      }

      case 'patterns': {
        patterns.push(line);
        break;
      }

      case 'exceptions': {
        const syllables = line.split('-');
        exceptions[syllables.join(empty)] = syllables;
        break;
      }

      // no default
    }
  }
});

for (const pattern of patterns) {
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

const source = bannerize(
  `// cspell:disable
/*
${copyright.map((line) => ` * ${line}`).join('\n')}
 */

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
