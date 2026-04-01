//@ts-check

/** @type import("\@technobuddha/project").SyncConfig */
const config = [
  {
    transfers: [
      {
        file: '../knowledge/dist/@data/unicode-data.js',
        local: 'reference/knowledge/unicode-data.js',
      },
      {
        file: '../knowledge/dist/@data/unicode-data.d.ts',
        local: 'reference/knowledge/unicode-data.d.ts',
      },
      {
        file: '../knowledge/dist/@data/romanization.js',
        local: 'reference/knowledge/romanization.js',
      },
      {
        file: '../knowledge/dist/@data/romanization.d.ts',
        local: 'reference/knowledge/romanization.d.ts',
      },
    ],
  },
  {
    transfers: [
      {
        file: '../knowledge/dist/@data/hyphenation.js',
        local: 'reference/knowledge/hyphenation.js',
      },
      {
        file: '../knowledge/dist/@data/hyphenation.d.ts',
        local: 'reference/knowledge/hyphenation.d.ts',
      }
    ],
    onUpdate: 'npx tsx scripts/make-hyphenation.ts'
  }
];

export default config;
