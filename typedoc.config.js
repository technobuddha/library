/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  entryPoints: ['src'],
  exclude: ['tests', 'doc', 'src/*.test.*', 'src/index.ts'],
  tsconfig: 'src/tsconfig.code.json',
  out: 'doc',
  readme: 'none',
  excludePrivate: true,
  plugin: ['typedoc-plugin-markdown', './typedoc-markdown-plugin.js'],
  gitRevision: 'main',
};

export default config;
