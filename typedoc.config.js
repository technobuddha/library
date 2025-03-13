//@ts-check
/**
 * @import { TypeDocOptions } from 'typedoc';
 * @import { PluginOptions } from 'typedoc-plugin-markdown';
 */

/**
 * @type Partial<TypeDocOptions & PluginOptions>
 */
const config = {
  entryPoints: ['src/index.ts'],
  exclude: [],
  tsconfig: 'src/tsconfig.code.json',
  out: 'doc',

  expandObjects: true,
  expandParameters: true,

  indexFormat: 'table',
  parametersFormat: 'table',
  interfacePropertiesFormat: 'table',
  classPropertiesFormat: 'table',
  enumMembersFormat: 'table',
  propertyMembersFormat: 'table',
  typeDeclarationFormat: 'table',

  typeDeclarationVisibility: 'verbose',

  hidePageHeader: true,
  entryFileName: 'INDEX.md',
  readme: 'none',
  excludePrivate: true,
  plugin: [
    'typedoc-plugin-markdown',
    'typedoc-plugin-mdn-links',
    '@giancosta86/typedoc-readonly',
    './typedoc-markdown-plugin.js',
  ],
  gitRevision: 'main',

  categorizeByGroup: true,
  navigation: {
    includeCategories: true,
    includeGroups: true,
    includeFolders: false,
    compactFolders: false,
    excludeReferences: true,
  },
};

export default config;
