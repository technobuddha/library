// cspell:disable

import { deepEquals } from '@technobuddha/library';
import { out } from '@technobuddha/library/node';

import words from '../fixtures/master.json';
//@ts-expect-error - unsafe to rewrite
import { metaphone as lib } from '../src/esnext/metaphone/metaphone.ts';
//@ts-expect-error - unsafe to rewrite
import { keep } from '../src/esnext/string/keep.ts';
//@ts-expect-error - unsafe to rewrite
import { prepare } from '../src/helpers/prepare.ts';
import { doubleMetaphone as std } from '../standards/double-metaphone.ts';

const wl = process.argv[2] ? [process.argv[2]] : words;

let fails = 0;
let passes = 0;
for (const name of wl) {
  out(name, '                                                 \r');
  const w0 = std(prepare(name, true, false));
  const w1 = lib(name, '2');

  if (deepEquals(w0, w1)) {
    passes++;
  } else if (fails++ === 0) {
    out(`Mismatch ${name} std: ${w0}, lib: ${w1}\n`);
    out('-------\n');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-console
    console.log((globalThis as any).stdTrace);
    out('--------\n');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-console
    console.log((globalThis as any).phoneticTrace);
    break;
  }
}

out(`${passes} out of ${wl.length}\n`);
