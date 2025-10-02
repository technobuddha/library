import {
  type Difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
} from '../../difference/difference.ts';

import { patchApply } from '../patch-apply.ts';
import { patchFromText } from '../patch-from-text.ts';
import { patchSplitMax } from '../patch-split-max.ts';
import { patchToString } from '../patch-to-text.ts';
import { type Patch, type PatchInternal } from '../types.ts';

describe('patch extra coverage', () => {
  const options: PatchInternal = {
    timeout: 1,
    editCost: 4,
    matchThreshold: 0.5,
    matchDistance: 1000,
    deleteThreshold: 0.5,
    margin: 4,
    maxBits: 10,
    deadline: Date.now() + 1000,
  };

  test('patchFromText: invalid patch mode', () => {
    // Patch with invalid mode character
    const text = '@@ -1,1 +1,1 @@\n!bad\n';
    expect(() => patchFromText(text)).toThrow('Invalid patch mode');
  });

  test('patchFromText: blank line', () => {
    // Patch with blank line (should be ignored, not throw)
    const text = '@@ -1,1 +1,1 @@\n\n';
    expect(() => patchFromText(text)).not.toThrow();
  });

  test('patchFromText: @ line', () => {
    // Patch with @ line (should break inner loop, not throw)
    const text = '@@ -1,1 +1,1 @@\n@header\n';
    expect(() => patchFromText(text)).not.toThrow();
  });

  test('patchToString: default op', () => {
    // Patch with unknown op (should default to ' ')
    // Cast to Difference to bypass type restriction for test
    const patch: Patch = {
      diffs: [{ op: 99, text: 'foo' } as unknown as Difference],
      start1: 0,
      start2: 0,
      length1: 1,
      length2: 1,
    };
    expect(patchToString(patch)).toContain(' foo');
  });

  test('patchApply: imperfect match with high levenshtein', () => {
    // Patch with imperfect match and high levenshtein ratio, and text1.length > maxBits
    const longText = 'a'.repeat(20) + 'b'.repeat(20); // length 40
    const patch: Patch = {
      diffs: [
        { op: DIFFERENCE_EQUAL, text: longText },
        { op: DIFFERENCE_DELETE, text: 'def' },
      ],
      start1: 0,
      start2: 0,
      length1: longText.length + 3,
      length2: longText.length,
    };
    // The text is very different, so patch should fail
    const result = patchApply([patch], 'x'.repeat(40), options);
    expect(result.results[0]).toBeFalse();
  });

  test('patchSplitMax: large patch with only delete', () => {
    const patch: Patch = {
      diffs: [{ op: DIFFERENCE_DELETE, text: 'a'.repeat(30) }],
      start1: 0,
      start2: 0,
      length1: 30,
      length2: 0,
    };
    const patches = [patch];
    patchSplitMax(patches, options);
    expect(patches.length).toBeGreaterThan(1);
  });

  test('patchApply: monster delete, patch fails (lines 90-99, negative branch)', () => {
    // Patch with a monster delete, but the trailing context cannot be found, even with fuzzy matching
    const monster = 'A'.repeat(options.maxBits + 5);
    const patch: Patch = {
      diffs: [{ op: DIFFERENCE_DELETE, text: monster }],
      start1: 0,
      start2: 0,
      length1: monster.length,
      length2: 0,
    };
    // The text is completely different, so the patch should fail
    const text = 'Z'.repeat(options.maxBits + 5);
    const result = patchApply([patch], text, options);
    expect(result.results[0]).toBeFalse();
  });

  test('patchApply: monster delete, no trailing context (lines 90-99)', () => {
    // Patch with a monster delete, but the trailing context cannot be found
    const monster = 'A'.repeat(options.maxBits + 5);
    const patch: Patch = {
      diffs: [{ op: DIFFERENCE_DELETE, text: monster }],
      start1: 0,
      start2: 0,
      length1: monster.length,
      length2: 0,
    };
    // The text does not contain the trailing context, but the patch is still applied due to fuzzy matching.
    // This demonstrates that the implementation will apply the patch even if the trailing context is missing,
    // as long as the prefix matches and the fuzzy match threshold is met.
    const text = `${'A'.repeat(options.maxBits)}BBBBB`;
    const result = patchApply([patch], text, options);
    expect(result.results[0]).toBeTrue();
  });

  test('patchApply: monster delete, trailing context present (lines 90-99, positive branch)', () => {
    // Patch with a monster delete, and the trailing context IS present
    const monster = 'A'.repeat(options.maxBits + 5);
    const patch: Patch = {
      diffs: [{ op: DIFFERENCE_DELETE, text: monster }],
      start1: 0,
      start2: 0,
      length1: monster.length,
      length2: 0,
    };
    // The text contains the trailing context, so patch should succeed
    const text = `${monster}C`;
    const result = patchApply([patch], text, options);
    expect(result.results[0]).toBeTrue();
  });

  test('patchApply: imperfect but accepted match (line 140)', () => {
    // Patch with imperfect match, but levenshtein ratio is low enough to accept
    const base = 'abcde'.repeat(3); // 15 chars
    const patch: Patch = {
      diffs: [
        { op: DIFFERENCE_EQUAL, text: base },
        { op: 1, text: 'X' },
      ],
      start1: 0,
      start2: 0,
      length1: base.length,
      length2: base.length + 1,
    };
    // The text is similar but not identical, but levenshtein ratio is just under the threshold
    const text = `${base.slice(0, -1)}f`;
    const result = patchApply([patch], text, options);
    expect(result.results[0]).toBeTrue();
    expect(result.text).toContain('X');
  });

  test('patchApply: imperfect match, not close enough (line 140, uncovered branch)', () => {
    // Patch with imperfect match, but the text is extremely different, so patch should fail
    const base = 'abcde'.repeat(3); // 15 chars
    const patch: Patch = {
      diffs: [
        { op: DIFFERENCE_EQUAL, text: base },
        { op: 1, text: 'X' },
      ],
      start1: 0,
      start2: 0,
      length1: base.length,
      length2: base.length + 1,
    };
    // The text is completely different, so levenshtein ratio is very high
    const text = 'z'.repeat(base.length);
    const result = patchApply([patch], text, options);
    expect(result.results[0]).toBeFalse();
  });

  test('patchApply: imperfect and rejected match (line 140, negative branch)', () => {
    // Patch with imperfect match, levenshtein ratio above threshold
    const base = 'abcde'.repeat(3); // 15 chars
    const patch: Patch = {
      diffs: [
        { op: DIFFERENCE_EQUAL, text: base },
        { op: 1, text: 'X' },
      ],
      start1: 0,
      start2: 0,
      length1: base.length,
      length2: base.length + 1,
    };
    // The text is very different, so levenshtein ratio is high
    const text = 'z'.repeat(base.length);
    const result = patchApply([patch], text, options);
    expect(result.results[0]).toBeFalse();
  });

  test('patchApply: applies delete operation (lines 154-156)', () => {
    // Patch with a delete operation
    const patch: Patch = {
      diffs: [
        { op: DIFFERENCE_EQUAL, text: 'abc' },
        { op: DIFFERENCE_DELETE, text: 'def' },
        { op: DIFFERENCE_EQUAL, text: 'ghi' },
      ],
      start1: 0,
      start2: 0,
      length1: 9,
      length2: 6,
    };
    // The text matches exactly, so the delete should be applied
    const result = patchApply([patch], 'abcdefghi', options);
    expect(result.results[0]).toBeTrue();
    expect(result.text).toBe('abcghi');
  });

  test('patchApply: applies delete operation with imperfect match (lines 154-156, diff branch)', () => {
    // Patch with a delete operation, but the text is slightly different, so it triggers the diff branch
    const patch: Patch = {
      diffs: [
        { op: DIFFERENCE_EQUAL, text: 'abc' },
        { op: DIFFERENCE_DELETE, text: 'def' },
        { op: DIFFERENCE_EQUAL, text: 'ghi' },
      ],
      start1: 0,
      start2: 0,
      length1: 9,
      length2: 6,
    };
    // The text is off by one character, so the diff branch is triggered
    const result = patchApply([patch], 'abczefghi', options);
    expect(result.results[0]).toBeTrue();
    expect(result.text).toBe('abcghi');
  });
});
