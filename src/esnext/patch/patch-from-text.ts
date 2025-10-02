/**
 * Diff Match and Patch
 * Copyright 2018 The diff-match-patch Authors.
 * https://github.com/google/diff-match-patch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../difference/difference.ts';

import { type Patch } from './types.ts';

/**
 * Parse a textual representation of patches and return an array of patch objects.
 *
 * Parses patches in unified diff format (with \@\@ headers) back into
 * structured patch objects that can be applied to text.
 *
 * @param textline - Text representation of patches
 * @returns Array of patch objects
 * @throws Error if the input format is invalid
 * @group String
 * @category Patch
 */
export function patchFromText(textline: string): Patch[] {
  const patches: Patch[] = [];
  if (!textline) {
    return patches;
  }

  const text = textline.split('\n');
  let textPointer = 0;
  const patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/v;

  while (textPointer < text.length) {
    const m = patchHeader.exec(text[textPointer]);
    if (!m) {
      throw new Error(`Invalid patch string: ${text[textPointer]}`);
    }

    const patch: Patch = {
      diffs: [],
      start1: 0,
      start2: 0,
      length1: 0,
      length2: 0,
    };

    patches.push(patch);
    patch.start1 = Number.parseInt(m[1]);

    if (m[2] === '') {
      patch.start1--;
      patch.length1 = 1;
    } else if (m[2] === '0') {
      patch.length1 = 0;
    } else {
      patch.start1--;
      patch.length1 = Number.parseInt(m[2]);
    }

    patch.start2 = Number.parseInt(m[3]);

    if (m[4] === '') {
      patch.start2--;
      patch.length2 = 1;
    } else if (m[4] === '0') {
      patch.length2 = 0;
    } else {
      patch.start2--;
      patch.length2 = Number.parseInt(m[4]);
    }

    textPointer++;

    while (textPointer < text.length) {
      // If we see a new patch header, break to outer loop
      if (patchHeader.test(text[textPointer])) {
        break;
      }
      const sign = text[textPointer].charAt(0);
      let line: string;

      try {
        line = decodeURI(text[textPointer].slice(1));
      } catch {
        // Malformed URI sequence.
        throw new Error(`Illegal escape in patchFromText: ${text[textPointer].slice(1)}`);
      }

      switch (sign) {
        case '-': {
          // Deletion.
          patch.diffs.push({ op: DIFFERENCE_DELETE, text: line });
          break;
        }
        case '+': {
          // Insertion.
          patch.diffs.push({ op: DIFFERENCE_INSERT, text: line });
          break;
        }
        case ' ': {
          // Minor equality.
          patch.diffs.push({ op: DIFFERENCE_EQUAL, text: line });
          break;
        }
        case '@': {
          // Start of next patch.
          break;
        }
        case '': {
          // Blank line?  Whatever.
          break;
        }
        default: {
          // WTF?
          throw new Error(`Invalid patch mode "${sign}" in: ${line}`);
        }
      }

      textPointer++;
    }
  }

  return patches;
}
