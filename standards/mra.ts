/* eslint-disable @typescript-eslint/no-deprecated */
/* eslint-disable unicorn/prefer-string-slice */
/* eslint-disable require-unicode-regexp */
/* eslint-disable unicorn/prefer-string-replace-all */
/* eslint-disable unicorn/new-for-builtins */
/* eslint-disable curly */

// Borrowed from 'talisman'
// Copyright (c) 2016-2020 Guillaume Plique (Yomguithereal)
// MIT License
// [Port to TypeScript Technobuddha 2025]

import { removeDiacritics as deburr } from '@technobuddha/library';

export function mra(name: string): string {
  if (typeof name !== 'string')
    throw Error('talisman/phonetics/mra: the given name is not a string.');

  // Preparing the name
  let codex = deburr(name)
    .toUpperCase()
    .replace(/[^A-Z]/g, '');

  // Dropping non-leading vowels
  codex = codex.charAt(0) + codex.slice(1).replace(/[AEIOU]/g, '');

  // Dropping consecutive consonants
  codex = codex.replace(/(.)\1+/g, '$1');

  // Returning the codex
  const offset = Math.min(3, codex.length - 3);

  return codex.slice(0, 3) + codex.substr(codex.length - offset, offset);
}
