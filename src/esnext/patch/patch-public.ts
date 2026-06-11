/**
 * Diff Match and Patch
 * Copyright 2018 The diff-match-patch Authors.
 * https://github.com/google/diff-match-patch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { type Difference } from '../difference/difference.ts';
import { ticksPerSecond } from '../time/constants.ts';

import { patchApply, type PatchApplyResult } from './patch-apply.ts';
import { patchFromText } from './patch-from-text.ts';
import { patchMake } from './patch-make.ts';
import { patchToText } from './patch-to-text.ts';
import { type Patch, type PatchInternal, type PatchOptions } from './types.ts';

/**
 * Create patches to transform text1 into text2.
 *
 * This is the main function for creating patches. It can accept either two text strings
 * or a text string with pre-computed differences. The patches can later be applied to
 * transform text1 into text2, even if the text has been slightly modified.
 *
 * @param text1 - The source text, or undefined if providing only diffs
 * @param text2OrDiffs - The target text, or an array of pre-computed differences
 * @param options - Configuration options for patch creation
 * @returns An array of patches
 *
 * @example
 * ```typescript
 * // Create patches from two texts
 * const patches = patch('Hello world', 'Hello there');
 *
 * // Apply patches to text
 * const result = applyPatches(patches, 'Hello world');
 * console.log(result.text); // 'Hello there'
 * console.log(result.results); // [true] - all patches applied successfully
 *
 * // Convert patches to text for storage
 * const patchText = patchesToText(patches);
 *
 * // Parse patches from text
 * const parsedPatches = patchesFromText(patchText);
 * ```
 * @group String
 * @category Patch
 */
export function patch(
  text1: string | undefined,
  text2OrDiffs: string | Difference[],
  options: PatchOptions = {},
): Patch[] {
  const internalOptions = createInternalOptions(options);
  return patchMake(text1, text2OrDiffs, internalOptions);
}

/**
 * Apply patches to text.
 *
 * Attempts to apply each patch using fuzzy matching to find the best location.
 * Returns the modified text and an array indicating which patches were successfully applied.
 *
 * @param patches - Array of patches to apply
 * @param text - The text to patch
 * @param options - Configuration options for patch application
 * @returns Object containing the patched text and success indicators
 *
 * @example
 * ```typescript
 * const patches = patch('The cat sat', 'The dog sat');
 * const result = applyPatches(patches, 'The cat sat on the mat');
 * console.log(result.text); // 'The dog sat on the mat'
 * console.log(result.results); // [true]
 * ```
 * @group String
 * @category Patch
 */
export function applyPatches(
  patches: Patch[],
  text: string,
  options: PatchOptions = {},
): PatchApplyResult {
  const internalOptions = createInternalOptions(options);
  return patchApply(patches, text, internalOptions);
}

/**
 * Convert patches to a textual representation.
 *
 * Serializes patches to a unified diff format that can be saved and later parsed.
 *
 * @param patches - Array of patches to serialize
 * @returns Text representation following GNU diff format
 *
 * @example
 * ```typescript
 * const patches = patch('old text', 'new text');
 * const text = patchesToText(patches);
 * // Can be saved to a file or transmitted
 * ```
 * @group String
 * @category Patch
 */
export function patchesToText(patches: Patch[]): string {
  return patchToText(patches);
}

/**
 * Parse patches from a textual representation.
 *
 * Deserializes patches from unified diff format back into patch objects.
 *
 * @param text - Text representation of patches
 * @returns Array of patch objects
 * @throws Error if the text format is invalid
 *
 * @example
 * ```typescript
 * const patchText = '@@ -1,3 +1,3 @@\n-old\n+new\n';
 * const patches = patchesFromText(patchText);
 * ```
 * @group String
 * @category Patch
 */
export function patchesFromText(text: string): Patch[] {
  return patchFromText(text);
}

/**
 * Create internal options with all defaults filled in.
 * @internal
 */
function createInternalOptions(options: PatchOptions): PatchInternal {
  const timeout = options.timeout ?? 1.0;
  return {
    timeout,
    editCost: options.editCost ?? 4,
    matchThreshold: options.matchThreshold ?? 0.5,
    matchDistance: options.matchDistance ?? 1000,
    deleteThreshold: options.deleteThreshold ?? 0.5,
    margin: options.margin ?? 4,
    maxBits: options.maxBits ?? 32,
    deadline: timeout <= 0 ? Infinity : Date.now() + timeout * ticksPerSecond,
  };
}

// Re-export types

export { type PatchApplyResult } from './patch-apply.ts';
export { type Patch, type PatchOptions } from './types.ts';
