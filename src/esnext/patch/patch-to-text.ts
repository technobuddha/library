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
 * Convert an array of patches into a textual representation.
 *
 * Generates a unified diff format that can be saved and later reapplied.
 * The format follows GNU diff conventions with \@\@ headers.
 *
 * @param patches - Array of patches to serialize
 * @returns Text representation of patches
 * @group String
 * @category Patch
 */
export function patchToText(patches: Patch[]): string {
  const text: string[] = [];
  for (const patch of patches) {
    text.push(patchToString(patch));
  }
  return text.join('');
}

/**
 * Convert a patch object to its string representation.
 *
 * @param patch - The patch to convert
 * @returns GNU diff format string
 * @internal
 */
function patchToString(patch: Patch): string {
  let coords1: string;
  let coords2: string;

  if (patch.length1 === 0) {
    coords1 = `${patch.start1},0`;
  } else if (patch.length1 === 1) {
    coords1 = String(patch.start1 + 1);
  } else {
    coords1 = `${patch.start1 + 1},${patch.length1}`;
  }

  if (patch.length2 === 0) {
    coords2 = `${patch.start2},0`;
  } else if (patch.length2 === 1) {
    coords2 = String(patch.start2 + 1);
  } else {
    coords2 = `${patch.start2 + 1},${patch.length2}`;
  }

  const text = [`@@ -${coords1} +${coords2} @@\n`];

  // Escape the body of the patch with %xx notation.
  for (const diff of patch.diffs) {
    let op: string;
    switch (diff.op) {
      case DIFFERENCE_INSERT: {
        op = '+';
        break;
      }
      case DIFFERENCE_DELETE: {
        op = '-';
        break;
      }
      case DIFFERENCE_EQUAL: {
        op = ' ';
        break;
      }
      default: {
        op = ' ';
        break;
      }
    }
    text.push(`${op}${encodeURI(diff.text)}\n`);
  }

  return text.join('').replaceAll('%20', ' ');
}

// Export the conversion function
export { patchToString };
