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

import { type Difference } from '../difference/difference.ts';

/**
 * Represents a single patch operation that can be applied to transform text.
 *
 * A patch contains a list of differences along with positional information
 * about where those differences apply in both the source and target texts.
 * @group String
 * @category Patch
 */
export type Patch = {
  /** Array of differences that make up this patch */
  diffs: Difference[];
  /** Starting position in the source text (0-based) */
  start1: number;
  /** Starting position in the target text (0-based) */
  start2: number;
  /** Length of the patch in the source text */
  length1: number;
  /** Length of the patch in the target text */
  length2: number;
};

/**
 * Options for configuring patch creation and application.
 * @group String
 * @category Patch
 */
export type PatchOptions = {
  /** Timeout in seconds for diff computation (0 for no timeout). Defaults to 1.0. */
  timeout?: number;
  /** Cost of an empty edit operation in terms of edit characters. Defaults to 4. */
  editCost?: number;
  /** Threshold for acceptable match quality (0.0 = perfect, 1.0 = very loose). Defaults to 0.5. */
  matchThreshold?: number;
  /** Search distance for fuzzy matching (0 = exact location, higher = broader search). Defaults to 1000. */
  matchDistance?: number;
  /** Threshold for accepting imperfect deletions (0.0 = perfect, 1.0 = very loose). Defaults to 0.5. */
  deleteThreshold?: number;
  /** Context size around each patch (in characters). Defaults to 4. */
  margin?: number;
  /** Maximum number of bits for the Bitap algorithm. Defaults to 32. */
  maxBits?: number;
};

/**
 * Internal options with all defaults filled in.
 * @internal
 */
export type PatchInternal = Required<PatchOptions> & {
  /** Deadline timestamp for timeout */
  deadline: number;
};
