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
    onUpdate: 'npx tsx scripts/make-transcriptions.ts'
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
  },
  {
    transfers: [
      {
        file: '../knowledge/reference/source/lorem/childe-harold.md',
        local: 'reference/knowledge/lorem/childe-harold.md',
      },
      {
        file: '../knowledge/reference/source/lorem/decameron.md',
        local: 'reference/knowledge/lorem/decameron.md',
      },
      {
        file: '../knowledge/reference/source/lorem/faust.md',
        local: 'reference/knowledge/lorem/faust.md',
      },
      {
        file: '../knowledge/reference/source/lorem/in-der-fremde.md',
        local: 'reference/knowledge/lorem/in-der-fremde.md',
      },
      {
        file: '../knowledge/reference/source/lorem/le-bateau-ivre.md',
        local: 'reference/knowledge/lorem/le-bateau-ivre.md',
      },
      {
        file: '../knowledge/reference/source/lorem/le-masque.md',
        local: 'reference/knowledge/lorem/le-masque.md',
      },
      {
        file: '../knowledge/reference/source/lorem/lorem-ipsum.md',
        local: 'reference/knowledge/lorem/lorem-ipsum.md',
      },
      {
        file: '../knowledge/reference/source/lorem/nagyon-faj.md',
        local: 'reference/knowledge/lorem/nagyon-faj.md',
      },
      {
        file: '../knowledge/reference/source/lorem/omagyar-maria-siralom.md',
        local: 'reference/knowledge/lorem/omagyar-maria-siralom.md',
      },
      {
        file: '../knowledge/reference/source/lorem/robinsono-kruso.md',
        local: 'reference/knowledge/lorem/robinsono-kruso.md',
      },
      {
        file: '../knowledge/reference/source/lorem/the-raven.md',
        local: 'reference/knowledge/lorem/the-raven.md',
      },
      {
        file: '../knowledge/reference/source/lorem/tierra-y-luna.md',
        local: 'reference/knowledge/lorem/tierra-y-luna.md',
      },
    ],
    onUpdate: 'npx tsx scripts/make-lorem-ipsum.ts'
  }
];

export default config;
