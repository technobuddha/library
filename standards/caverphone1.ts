// cspell:disable
/* eslint-disable prefer-template */
/* eslint-disable unicorn/prefer-string-slice */
/* eslint-disable unicorn/prefer-string-replace-all */
/* eslint-disable require-unicode-regexp */

// Extracted from 'extra-english'
// Copyright (c) 2018-25 Subhajit Sahu
// Licensed under the MIT License.
// [Corrected and converted to TypeScript by Technobuddha 2025]

/** Replace rules for Caverphone phonetic algorithm. */
const RCAVERPHONE = [
  { p: /^cough/g, v: 'cou2f' },
  { p: /^rough/g, v: 'rou2f' },
  { p: /^tough/g, v: 'tou2f' },
  { p: /^enough/g, v: 'enou2f' },
  { p: /^gn/g, v: '2n' },
  { p: /mb$/g, v: 'm2' },
  { p: /cq/g, v: '2q' },
  { p: /ci/g, v: 'si' },
  { p: /ce/g, v: 'se' },
  { p: /cy/g, v: 'sy' },
  { p: /tch/g, v: '2ch' },
  { p: /c/g, v: 'k' },
  { p: /q/g, v: 'k' },
  { p: /x/g, v: 'k' },
  { p: /v/g, v: 'f' },
  { p: /dg/g, v: '2g' },
  { p: /tio/g, v: 'sio' },
  { p: /tia/g, v: 'sia' },
  { p: /d/g, v: 't' },
  { p: /ph/g, v: 'fh' },
  { p: /b/g, v: 'p' },
  { p: /sh/g, v: 's2' },
  { p: /z/g, v: 's' },
  { p: /^[aeiou]/g, v: 'A' },
  { p: /[aeiou]/g, v: '3' },
  { p: /3gh3/g, v: '3kh3' },
  { p: /gh/g, v: '22' },
  { p: /g/g, v: 'k' },
  { p: /ss+/g, v: 'S' },
  { p: /tt+/g, v: 'T' },
  { p: /pp+/g, v: 'P' },
  { p: /kk+/g, v: 'K' },
  { p: /ff+/g, v: 'F' },
  { p: /mm+/g, v: 'M' },
  { p: /nn+/g, v: 'N' },
  { p: /w3/g, v: 'W3' },
  { p: /wy/g, v: 'Wy' },
  { p: /wh3/g, v: 'Wh3' },
  { p: /why/g, v: 'Why' },
  { p: /w/g, v: '2' },
  { p: /^h/g, v: 'A' },
  { p: /h/g, v: '2' },
  { p: /r3/g, v: 'R3' },
  { p: /ry/g, v: 'Ry' },
  { p: /r/g, v: '2' },
  { p: /l3/g, v: 'L3' },
  { p: /ly/g, v: 'Ly' },
  { p: /l/g, v: '2' },
  { p: /j/g, v: 'y' },
  { p: /y3/g, v: 'Y3' },
  { p: /y/g, v: '2' },
  { p: /2/g, v: '' },
  { p: /3/g, v: '' },
];

export function caverphone1(txt: string, ext = false): string {
  let t = txt.replace(/[^A-Za-z]/g, '').toLowerCase();
  if (t === '') {
    return '';
  }
  for (const r of RCAVERPHONE) {
    t = t.replace(r.p, r.v);
  }
  t = ext ? t : (t + '111111').substring(0, 6);
  return t.toUpperCase();
}
