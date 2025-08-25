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
const header = ['<!-- markdownlint-disable -->', 'Technobuddha Library', '---', empty];

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
 * @param pages {Map<string, string>}
 */
function gather(item, count, total, pages) {
  if (item.kind) {
    if (item.path) {
      pages.set(item.path, item.title);
    }

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
      gather(child, count, total, pages);
    }
  }
}

/**
 * @param index {string[]} The lines of a markdown file to process.
 * @returns {string[]}
 */
function alignTables(index) {
  return index;
  // /** @type {string[]} */
  // const result = [];
  // let table = false;

  // for (const line of index) {
  //   if (/^\| [A-Za-z\s]+ \| Description \|$/u.test(line)) {
  //     result.push('<table>', '<thead>', '<tr>', '<th style="width: 200px;">Name</th>', '<th>Description</th>', '</tr>', '</thead>', '<tbody>');
  //     table = true;
  //   } else if (/^\| ------  \| ------ \|$/u.test(line)) {
  //     // Skip the line
  //   } else {
  //     const matches = line.match(/^\| (.*) \| (.*) \|$/u);
  //     if (matches) {
  //       const [, name, description] = matches;
  //       result.push('<tr>', `<td style="width: 200px;">${name}</td>`, `<td>${description}</td>`, '</tr>');
  //     } else {
  //       if (table) {
  //         result.push('</tbody>', '</table>', empty);
  //         table = false;
  //       }
  //       result.push(line);
  //     }
  //   }
  // }
  //
  // return result;
}

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  app.renderer.markdownHooks.on('page.begin', () => `<!-- markdownlint-disable -->`);
  app.renderer.markdownHooks.on('index.page.begin', () => `<!-- markdownlint-disable -->`);

  // Update the top-level README
  app.renderer.postRenderAsyncJobs.push(async (renderer) => {
    /** @type {string[]} */
    const table = ['|Group|Contents|', '|---|---|'];
    /** @type {Record<string, NavigationItem[]>} */
    const total = {};
    /** @type {Map<string, string>} */
    const pages = new Map();

    const navigation = renderer.navigation;
    if (navigation) {
      for (const group of navigation) {
        /** @type {Record<string, NavigationItem[]>} */
        const count = {};
        gather(group, count, total, pages);

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

      for (const [path, entity] of pages.entries()) {
        const [group] = path.split('/');

        const doc = splitLines(fs.readFileSync(`./doc/${path}`, 'utf8'));
        doc.splice(0, 7, ...header, `[Library](../index.md) / [${group}](./index.md) / ${entity}`);
        fs.writeFileSync(`./doc/${path}`, `${doc.join('\n')}\n`, 'utf8');
      }
    }
  });

  // Create more indices within the doc
  app.renderer.postRenderAsyncJobs.push(async () => {
    const index = alignTables(splitLines(fs.readFileSync('./doc/index.md', 'utf-8')));
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
        buffer = [...header, `[Library](../index.md) / ${group}`, empty, `# ${group}`];
      } else {
        buffer.push(line.replaceAll(`](${group}/`, ']('));
      }
    }
    if (group) {
      fs.writeFileSync(`./doc/${group}/index.md`, buffer.join('\n'), 'utf-8');
    }

    index.splice(0, 7, ...header, empty, '# Index');
    fs.writeFileSync('./doc/index.md', `${index.join('\n')}\n`, 'utf-8');
  });
}
