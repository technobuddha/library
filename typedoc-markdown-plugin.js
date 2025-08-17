// @ts-check
import fs from 'node:fs';

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  app.renderer.markdownHooks.on('page.begin', () => `<!-- markdownlint-disable -->`);
  app.renderer.markdownHooks.on('index.page.begin', () => `<!-- markdownlint-disable -->`);

  app.renderer.postRenderAsyncJobs.push(async (renderer) => {
    const navigation = renderer.navigation;
    fs.writeFileSync('doc/navigation.json', JSON.stringify(navigation, null, 2));
  });
}
