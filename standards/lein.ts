// cspell:disable
/* eslint-disable @typescript-eslint/prefer-destructuring */
/* eslint-disable require-unicode-regexp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

// Borrowed from 'talisman'
// Copyright (c) 2016-2020 Guillaume Plique (Yomguithereal)
// Licensed under the MIT License
// [Converted to TypeScript and modified by Technobuddha 2025]

import { removeDiacritics as deburr } from "@technobuddha/library";

function squeeze(target: string): string {
  const sequence = target.split("");
  const squeezed = [sequence[0]];

  for (let i = 1, l = sequence.length; i < l; i++) {
    if (sequence[i] !== sequence[i - 1]) {
      squeezed.push(sequence[i]);
    }
  }

  return squeezed.join("");
}

function translation(f1: string, s2: string) {
  const index: Record<string, string> = {};

  const first = f1.split("");
  const second = s2.split("");

  if (first.length !== second.length) {
    throw new Error("talisman/helpers#translation: given strings don't have the same length.");
  }

  for (let i = 0, l = first.length; i < l; i++) {
    index[first[i]] = second[i];
  }

  return index;
}

/**
 * Constants.
 */
const DROPPED = /[AEIOUYWH]/g;

const TRANSLATION = translation("DTMNLRBFPVCJKGQSXZ", "112233444455555555");

function pad(code: string) {
  return `${code}0000`.slice(0, 4);
}

export function lein(name: string): string {
  if (typeof name !== "string") {
    throw new TypeError("talisman/phonetics/lein: the given name is not a string.");
  }

  let code = deburr(name)
    .toUpperCase()
    .replaceAll(/[^A-Z\s]/g, "");

  if (code.length === 0) {
    return "";
  }

  // 1-- Keeping the first letter
  const first = code[0];
  code = code.slice(1);

  // 2-- Dropping vowels and Y, W & H
  code = code.replaceAll(DROPPED, "");

  // 3-- Dropping consecutive duplicates and truncating to 4 characters
  code = squeeze(code).slice(0, 4);

  // 4-- Translations
  const backup = code;
  code = "";

  for (let i = 0, l = backup.length; i < l; i++) {
    code += TRANSLATION[backup[i]] || backup[i];
  }

  return pad(first + code);
}
