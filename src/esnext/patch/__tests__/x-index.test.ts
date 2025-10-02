import {
  type Difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../../difference/difference.ts';

import { xIndex } from '../x-index.ts';

describe('xIndex', () => {
  test('Empty diffs array.', () => {
    const diffs: Difference[] = [];
    expect(xIndex(diffs, 0)).toBe(0);
    expect(xIndex(diffs, 5)).toBe(5);
  });

  test('Single equality - same position.', () => {
    const diffs: Difference[] = [{ op: DIFFERENCE_EQUAL, text: 'abc' }];
    expect(xIndex(diffs, 0)).toBe(0);
    expect(xIndex(diffs, 1)).toBe(1);
    expect(xIndex(diffs, 2)).toBe(2);
  });

  test('Single insertion at start.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_INSERT, text: 'xyz' },
      { op: DIFFERENCE_EQUAL, text: 'abc' },
    ];
    // Position 0 in text1 maps to position 3 in text2 (after the insertion)
    expect(xIndex(diffs, 0)).toBe(3);
    expect(xIndex(diffs, 1)).toBe(4);
    expect(xIndex(diffs, 2)).toBe(5);
  });

  test('Single insertion in middle.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'ab' },
      { op: DIFFERENCE_INSERT, text: 'xyz' },
      { op: DIFFERENCE_EQUAL, text: 'cd' },
    ];
    expect(xIndex(diffs, 0)).toBe(0);
    expect(xIndex(diffs, 1)).toBe(1);
    expect(xIndex(diffs, 2)).toBe(5); // After 'ab' + 'xyz'
    expect(xIndex(diffs, 3)).toBe(6);
  });

  test('Single deletion at start.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'abc' },
      { op: DIFFERENCE_EQUAL, text: 'def' },
    ];
    // Positions within 'abc' map to corresponding offsets in text2
    expect(xIndex(diffs, 0)).toBe(0);
    expect(xIndex(diffs, 1)).toBe(1);
    expect(xIndex(diffs, 2)).toBe(2);
    expect(xIndex(diffs, 3)).toBe(0); // Position 3 is start of 'def'
  });

  test('Single deletion in middle.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'ab' },
      { op: DIFFERENCE_DELETE, text: 'cd' },
      { op: DIFFERENCE_EQUAL, text: 'ef' },
    ];
    expect(xIndex(diffs, 0)).toBe(0);
    expect(xIndex(diffs, 1)).toBe(1);
    expect(xIndex(diffs, 2)).toBe(2);
    expect(xIndex(diffs, 3)).toBe(3);
    expect(xIndex(diffs, 4)).toBe(2); // Position 4 is start of 'ef'
    expect(xIndex(diffs, 5)).toBe(3);
  });

  test('Deletion at end.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'abc' },
      { op: DIFFERENCE_DELETE, text: 'def' },
    ];
    // When diffs end with deletion, locations map differently
    expect(xIndex(diffs, 0)).toBe(0);
    expect(xIndex(diffs, 1)).toBe(0);
    expect(xIndex(diffs, 2)).toBe(0);
    expect(xIndex(diffs, 3)).toBe(3); // After 'abc'
    expect(xIndex(diffs, 4)).toBe(3);
    expect(xIndex(diffs, 5)).toBe(3);
  });

  test('Mixed operations - insertions and deletions.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'b' },
      { op: DIFFERENCE_INSERT, text: 'cd' },
      { op: DIFFERENCE_EQUAL, text: 'e' },
    ];
    expect(xIndex(diffs, 0)).toBe(0); // 'a' at position 0
    expect(xIndex(diffs, 1)).toBe(1); // 'b' deleted position
    expect(xIndex(diffs, 2)).toBe(3); // 'e' at position 3 (after 'a' + 'cd')
  });

  test('Complex sequence with multiple operations.', () => {
    // text1: "The cat jumped"
    // text2: "The big cat leaped"
    // Insert "big " after "The ", delete "jumped", insert "leaped"
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'The ' },
      { op: DIFFERENCE_INSERT, text: 'big ' },
      { op: DIFFERENCE_EQUAL, text: 'cat ' },
      { op: DIFFERENCE_DELETE, text: 'jumped' },
      { op: DIFFERENCE_INSERT, text: 'leaped' },
    ];
    expect(xIndex(diffs, 0)).toBe(0); // 'T'
    expect(xIndex(diffs, 4)).toBe(8); // ' ' after 'The'
    expect(xIndex(diffs, 8)).toBe(12); // ' ' after 'cat'
    expect(xIndex(diffs, 9)).toBe(13); // Start of 'jumped' (deleted)
    expect(xIndex(diffs, 14)).toBe(18); // End of 'jumped' (deleted)
  });

  test('Location beyond all diffs.', () => {
    const diffs: Difference[] = [{ op: DIFFERENCE_EQUAL, text: 'abc' }];
    expect(xIndex(diffs, 5)).toBe(5);
    expect(xIndex(diffs, 10)).toBe(10);
  });

  test('Location at exact end of diff.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'abc' },
      { op: DIFFERENCE_INSERT, text: 'xyz' },
    ];
    expect(xIndex(diffs, 3)).toBe(6);
  });

  test('Only insertions.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_INSERT, text: 'abc' },
      { op: DIFFERENCE_INSERT, text: 'def' },
    ];
    expect(xIndex(diffs, 0)).toBe(6);
    expect(xIndex(diffs, 5)).toBe(11);
  });

  test('Only deletions.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'abc' },
      { op: DIFFERENCE_DELETE, text: 'def' },
    ];
    expect(xIndex(diffs, 0)).toBe(0);
    expect(xIndex(diffs, 2)).toBe(0);
    expect(xIndex(diffs, 5)).toBe(0);
    expect(xIndex(diffs, 10)).toBe(0);
  });

  test('Substitution (delete and insert).', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'bad' },
      { op: DIFFERENCE_INSERT, text: 'good' },
    ];
    expect(xIndex(diffs, 0)).toBe(0);
    expect(xIndex(diffs, 1)).toBe(1);
    expect(xIndex(diffs, 2)).toBe(2);
    expect(xIndex(diffs, 3)).toBe(4); // After 'bad' deleted and 'good' inserted
  });

  test('Real world example - cat to dog.', () => {
    // text1: "cat"
    // text2: "dog"
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'c' },
      { op: DIFFERENCE_INSERT, text: 'd' },
      { op: DIFFERENCE_EQUAL, text: 'o' },
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 't' },
      { op: DIFFERENCE_INSERT, text: 'g' },
    ];
    expect(xIndex(diffs, 0)).toBe(0); // 'c' deleted
    expect(xIndex(diffs, 1)).toBe(1); // 'o' position
    expect(xIndex(diffs, 2)).toBe(2); // 'a' deleted
    expect(xIndex(diffs, 3)).toBe(2); // 't' position
  });

  test('Location in deleted section followed by insertion.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'pre' },
      { op: DIFFERENCE_DELETE, text: 'old' },
      { op: DIFFERENCE_INSERT, text: 'new' },
      { op: DIFFERENCE_EQUAL, text: 'post' },
    ];
    expect(xIndex(diffs, 3)).toBe(3); // Start of 'old'
    expect(xIndex(diffs, 4)).toBe(4); // Middle of 'old'
    expect(xIndex(diffs, 5)).toBe(5); // End of 'old'
    expect(xIndex(diffs, 6)).toBe(6); // Start of 'post'
  });

  test('Multiple consecutive insertions.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_INSERT, text: 'b' },
      { op: DIFFERENCE_INSERT, text: 'c' },
      { op: DIFFERENCE_INSERT, text: 'd' },
      { op: DIFFERENCE_EQUAL, text: 'e' },
    ];
    expect(xIndex(diffs, 0)).toBe(0);
    expect(xIndex(diffs, 1)).toBe(4); // After all insertions
  });

  test('Multiple consecutive deletions.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'b' },
      { op: DIFFERENCE_DELETE, text: 'c' },
      { op: DIFFERENCE_DELETE, text: 'd' },
      { op: DIFFERENCE_EQUAL, text: 'e' },
    ];
    expect(xIndex(diffs, 0)).toBe(0);
    expect(xIndex(diffs, 1)).toBe(1);
    expect(xIndex(diffs, 2)).toBe(1);
    expect(xIndex(diffs, 3)).toBe(1);
    expect(xIndex(diffs, 4)).toBe(1); // 'e' after deletions
  });

  test('Empty strings in diffs.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: '' },
      { op: DIFFERENCE_INSERT, text: '' },
      { op: DIFFERENCE_DELETE, text: '' },
      { op: DIFFERENCE_EQUAL, text: 'abc' },
    ];
    expect(xIndex(diffs, 0)).toBe(0);
    expect(xIndex(diffs, 1)).toBe(1);
  });
});
