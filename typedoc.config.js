//@ts-check

/** @type {import('typedoc').TypeDocOptions & import('typedoc-plugin-markdown').PluginOptions} */
const config = {
  // typedoc
  //  Configuration
  tsconfig: 'src/tsconfig.code.json',
  plugin: [
    'typedoc-plugin-markdown',
    'typedoc-plugin-mdn-links',
    '@giancosta86/typedoc-readonly',
    'typedoc-plugin-coverage',
    './typedoc-markdown-plugin.js',
  ],
  //  Input
  entryPoints: ['src/index.ts'],
  exclude: [],
  excludeInternal: true,
  excludePrivate: true,
  excludeProtected: true,
  gitRevision: 'main',
  readme: 'none',
  //  Output
  out: 'doc',
  router: 'group',
  basePath: 'src',
  navigation: {
    includeCategories: true,
    includeGroups: true,
    includeFolders: false,
    compactFolders: false,
    excludeReferences: true,
  },
  //  Organization
  categorizeByGroup: true,
  defaultCategory: 'Uncategorized',
  categoryOrder: ['Uncategorized', '*'],


  // typedoc-plugin-markdown
  //  File Options
  entryFileName: 'index.md',
  //  Display
  hidePageHeader: true,
  expandObjects: true,
  expandParameters: true,
  indexFormat: 'table',
  parametersFormat: 'table',
  interfacePropertiesFormat: 'table',
  classPropertiesFormat: 'table',
  typeAliasPropertiesFormat: 'table',
  enumMembersFormat: 'table',
  propertyMembersFormat: 'table',
  typeDeclarationFormat: 'table',
  typeDeclarationVisibility: 'verbose',
};

export default config;
