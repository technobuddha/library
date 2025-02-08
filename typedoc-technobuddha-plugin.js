// @ts-check
import fs from 'node:fs';
import { ReflectionKind } from 'typedoc';

import { empty, plural, conjoin, fillTemplate, splitLines } from './dist/index.js';

const isDevelopment = process.env.NODE_ENV !== 'production';
const LINK = isDevelopment ? empty : 'https://github.com/technobuddha/library/blob/main/';

console.log(isDevelopment ? 'DEVELOPMENT MODE' : 'PRODUCTION MODE');

/** @type { Record<string, string> } */
const tx = {
  TypeAlias: 'Type Alias',
  Variable: 'Constant',
};

/** @type { string[] } */
const header = ['<!-- markdownlint-disable -->', empty, '# @technobuddha/library', empty];

/** @type {Record<number, string>} */
const reflectionKind = Object.fromEntries(
  Object.entries(ReflectionKind)
    .filter(([, v]) => typeof v === 'number')
    .map(([k, v]) => [v, k]),
);

/**
 * @import { NavigationItem } from 'typedoc-plugin-markdown';
 * @param item {NavigationItem}
 * @param count {Record<string, NavigationItem[]>}
 * @param total {Record<string, NavigationItem[]>}
 */
function countKinds(item, count, total) {
  if (item.kind) {
    let kind = reflectionKind[item.kind] ?? 'Unknown';
    kind = tx[kind] ?? kind;

    if (kind in count) {
      count[kind].push(item);
    } else {
      count[kind] = [item];
    }
    if (kind in total) {
      total[kind].push(item);
    } else {
      total[kind] = [item];
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
    console.log(renderer.project.readme);

    /** @type {string[]} */
    const table = ['|Group|Contents|', '|---|---|'];
    /** @type {Record<string, NavigationItem[]>} */
    const total = {};

    const navigation = renderer.navigation;
    if (navigation) {
      for (const group of navigation) {
        /** @type {Record<string, NavigationItem[]>} */
        const count = {};
        countKinds(group, count, total);

        const list = Object.entries(count)
          .sort(([a], [b]) => a.localeCompare(b))
          .flatMap(([, v]) => v)
          .filter((ni) => ni.kind === ReflectionKind.Function || ni.kind === ReflectionKind.Class)
          .map((ni) => `[${ni.title}](${LINK}doc/${ni.path})`);

        const links = `<div style="width: 600px; display: flex; flex-direction: row; flex-wrap: wrap">${list.map((l) => `<div style="flex-basis: 200px;">${l}</div>`).join('')}</div>`;

        const line = `|[${group.title}](${LINK}doc/${group.title}/index.md)|${links}|`;
        table.push(line);
      }

      /** @type {string} */
      let readme = fs.readFileSync('./templates/README.md', 'utf-8').replaceAll('../doc', './doc');
      /** @type {Record<string, string>} */
      const values = {
        total: conjoin(
          Object.entries(total)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([k, v]) => plural(k, v.length, true).toLocaleLowerCase()),
        ),
        groups: table.join('\n'),
      };

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
