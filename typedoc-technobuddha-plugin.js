// @ts-check
import fs from 'node:fs';
import { ReflectionKind } from 'typedoc';

import { plural, conjoin, fillTemplate, splitLines } from './dist/index.js';

/** @type { Record<string, string> } */
const tx = {
  'TypeAlias': 'Type Alias',
  'Variable': 'Constant'
}

/** @type { string[] } */
const header = ['<!-- markdownlint-disable -->', '', '# @technobuddha/library', ''];

/** @type {Record<number, string>} */
const reflectionKind = Object.fromEntries(Object.entries(ReflectionKind).filter(([, v]) => typeof v === 'number').map(([k, v]) => [v, k]));

/**
 * @param item {import('typedoc-plugin-markdown').NavigationItem}
 * @param count {Record<string, number>}
 * @param total {Record<string, number>}
 */
function countKinds(item, count, total) {
  if (item.kind) {
    let kind = reflectionKind[item.kind] ?? 'Unknown';
    kind = tx[kind] ?? kind;

    if (kind in count) {
      count[kind]++;
    } else {
      count[kind] = 1;
    }
    if (kind in total) {
      total[kind]++;
    } else {
      total[kind] = 1;
    }
  }

  if (item.children) {
    for (const child of item.children) {
      countKinds(child, count, total);
    }
  }
}

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  app.renderer.markdownHooks.on('page.begin', () => `<!-- markdownlint-disable -->`);
  app.renderer.markdownHooks.on('index.page.begin', () => `<!-- markdownlint-disable -->`);

  // Update the top-level README
  app.renderer.postRenderAsyncJobs.push(async (renderer) => {
    console.log(renderer.project.readme)


    /** @type {string[]} */
    const table = ['|Group|Contents|', '|---|---|'];
    /** @type {Record<string, number>} */
    const total = {};

    const navigation = renderer.navigation;
    if (navigation) {
      for (const group of navigation) {
        /** @type {Record<string, number>} */
        const count = {};
        countKinds(group, count, total);

        const line = `|[${group.title}](doc/${group.title}/index.md)|${Object.entries(count).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => plural(k, v, true).toLocaleLowerCase()).join(', ')}|`;
        table.push(line);
      }

      /** @type {string} */
      let readme = fs.readFileSync('./templates/README.md', 'utf-8').replaceAll('../doc', './doc');
      /** @type {Record<string, string>} */
      const values = {
        total: conjoin(Object.entries(total).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => plural(k, v, true).toLocaleLowerCase())),
        groups: table.join('\n'),
      }

      fs.writeFileSync('./README.md', fillTemplate(readme, values), 'utf-8');
      fs.writeFileSync('doc/navigation.json', JSON.stringify(navigation, null, 2));
    }
  });

  // Create more indices within the doc
  app.renderer.postRenderAsyncJobs.push(async () => {
    const index = splitLines(fs.readFileSync('./doc/index.md', 'utf-8'));
    /** @type {string[]} */
    let buffer = [...header];
    /** @type {string | null} */
    let group = null;

    for (const line of index) {
      if (line.startsWith('## ')) {
        if (group) {
          fs.writeFileSync(`./doc/${group}/index.md`, buffer.join('\n'), 'utf-8');
        }

        group = line.slice(3).trim();
        buffer = [...header, line];
      } else {
        buffer.push(line.replaceAll(`](${group}/`, ']('));
      }
    }
    if (group) {
      fs.writeFileSync(`./doc/${group}/index.md`, buffer.join('\n'), 'utf-8');
    }
  });

}
