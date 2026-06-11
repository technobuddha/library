/**
 * Diff Match and Patch
 * Copyright 2018 The diff-match-patch Authors.
 * https://github.com/google/diff-match-patch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DIFFERENCE_EQUAL } from '../difference/difference.ts';

import { type Patch, type PatchInternal } from './types.ts';

/**
 * Increase the context around a patch until it is unique,
 * but don't let the pattern expand beyond the maximum bit limit.
 *
 * This function adds surrounding text to a patch to ensure it can be
 * uniquely located in the source text, which improves the reliability
 * of patch application.
 *
 * @param patch - The patch to add context to (modified in place)
 * @param text - The source text to extract context from
 * @param options - Internal patch options containing maxBits and margin settings
 * @internal
 */
export function patchAddContext(patch: Patch, text: string, options: PatchInternal): void {
  if (text.length === 0) {
    return;
  }

  let pattern = text.slice(patch.start2, patch.start2 + patch.length1);
  let padding = 0;

  // Look for the first and last matches of pattern in text. If two different
  // matches are found, increase the pattern length.
  while (
    text.indexOf(pattern) !== text.lastIndexOf(pattern) &&
    pattern.length < options.maxBits - options.margin - options.margin
  ) {
    padding += options.margin;
    pattern = text.slice(patch.start2 - padding, patch.start2 + patch.length1 + padding);
  }
  // Add one chunk for good luck.
  padding += options.margin;

  // Add the prefix.
  const prefix = text.slice(patch.start2 - padding, patch.start2);
  if (prefix) {
    patch.diffs.unshift({ op: DIFFERENCE_EQUAL, text: prefix });
  }

  // Add the suffix.
  const suffix = text.slice(patch.start2 + patch.length1, patch.start2 + patch.length1 + padding);
  if (suffix) {
    patch.diffs.push({ op: DIFFERENCE_EQUAL, text: suffix });
  }

  // Roll back the start points.
  patch.start1 -= prefix.length;
  patch.start2 -= prefix.length;
  // Extend the lengths.
  patch.length1 += prefix.length + suffix.length;
  patch.length2 += prefix.length + suffix.length;
}
