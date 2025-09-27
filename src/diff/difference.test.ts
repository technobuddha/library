/* eslint-disable no-secrets/no-secrets */
import { empty, space } from '../unicode.ts';

import { DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT, difference } from './difference.ts';

describe('difference', () => {
  test('Null case', () => {
    expect(difference(empty, empty)).toEqual([]);
  });

  test('Equality', () => {
    expect(difference('abc', 'abc')).toEqual([{ op: DIFF_EQUAL, text: 'abc' }]);
  });

  test('Simple insertion', () => {
    expect(difference('abc', 'ab123c')).toEqual([
      { op: DIFF_EQUAL, text: 'ab' },
      { op: DIFF_INSERT, text: '123' },
      { op: DIFF_EQUAL, text: 'c' },
    ]);
  });

  test('Simple deletion', () => {
    expect(difference('a123bc', 'abc')).toEqual([
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_DELETE, text: '123' },
      { op: DIFF_EQUAL, text: 'bc' },
    ]);
  });

  test('Two insertions', () => {
    expect(difference('abc', 'a123b456c')).toEqual([
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_INSERT, text: '123' },
      { op: DIFF_EQUAL, text: 'b' },
      { op: DIFF_INSERT, text: '456' },
      { op: DIFF_EQUAL, text: 'c' },
    ]);
  });

  test('Two deletions', () => {
    expect(difference('a123b456c', 'abc')).toEqual([
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_DELETE, text: '123' },
      { op: DIFF_EQUAL, text: 'b' },
      { op: DIFF_DELETE, text: '456' },
      { op: DIFF_EQUAL, text: 'c' },
    ]);
  });

  test('Simple cases', () => {
    expect(difference('a', 'b')).toEqual([
      { op: DIFF_DELETE, text: 'a' },
      { op: DIFF_INSERT, text: 'b' },
    ]);
    expect(difference('Apples are a fruit.', 'Bananas are also fruit.')).toEqual([
      { op: DIFF_DELETE, text: 'Apple' },
      { op: DIFF_INSERT, text: 'Banana' },
      { op: DIFF_EQUAL, text: 's are a' },
      { op: DIFF_INSERT, text: 'lso' },
      { op: DIFF_EQUAL, text: ' fruit.' },
    ]);
    expect(difference('ax\tI', '栏x\0')).toEqual([
      { op: DIFF_DELETE, text: 'a' },
      { op: DIFF_INSERT, text: '栏' },
      { op: DIFF_EQUAL, text: 'x' },
      { op: DIFF_DELETE, text: '\tI' },
      { op: DIFF_INSERT, text: '\0' },
    ]);
  });

  test('Overlaps', () => {
    // cspell:ignore abaxb
    expect(difference('1ayb2', 'abaxb')).toEqual([
      { op: DIFF_DELETE, text: '1' },
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_DELETE, text: 'y' },
      { op: DIFF_EQUAL, text: 'b' },
      { op: DIFF_DELETE, text: '2' },
      { op: DIFF_INSERT, text: 'axb' },
    ]);
    // cspell:ignore abcy xaxcxabc xaxcx
    expect(difference('abcy', 'xaxcxabc')).toEqual([
      { op: DIFF_INSERT, text: 'xaxcx' },
      { op: DIFF_EQUAL, text: 'abc' },
      { op: DIFF_DELETE, text: 'y' },
    ]);

    // cspell:ignore efghijklmnopqrsEFGHIJKLMNOefg efghijklmnopqrs EFGHIJKLMNOefg
    expect(difference('ABCDa=bcd=efghijklmnopqrsEFGHIJKLMNOefg', 'a-bcd-efghijklmnopqrs')).toEqual([
      { op: DIFF_DELETE, text: 'ABCD' },
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_DELETE, text: '=' },
      { op: DIFF_INSERT, text: '-' },
      { op: DIFF_EQUAL, text: 'bcd' },
      { op: DIFF_DELETE, text: '=' },
      { op: DIFF_INSERT, text: '-' },
      { op: DIFF_EQUAL, text: 'efghijklmnopqrs' },
      { op: DIFF_DELETE, text: 'EFGHIJKLMNOefg' },
    ]);
  });

  test('Large equality', () => {
    expect(difference('a [[Pennsylvania]] and [[New', ' and [[Pennsylvania]]')).toEqual([
      { op: DIFF_INSERT, text: space },
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_INSERT, text: 'nd' },
      { op: DIFF_EQUAL, text: ' [[Pennsylvania]]' },
      { op: DIFF_DELETE, text: ' and [[New' },
    ]);
  });

  // cspell:ignore brillig slithy toves wabe mimsy borogoves mome raths outgrabe
  test('timeout', () => {
    const a =
      `Twas brillig, and the slithy toves\nDid gyre and gimble in the wabe:\nAll mimsy were the borogoves,\nAnd the mome raths outgrabe.\n`.repeat(
        1024,
      );
    const b =
      "I am the very model of a modern major general,\nI've information vegetable, animal, and mineral,\nI know the kings of England, and I quote the fights historical,\nFrom Marathon to Waterloo, in order categorical.".repeat(
        1024,
      );

    const startTime = Date.now();
    difference(a, b, { timeout: 0.1 });
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(100);
    expect(endTime - startTime).toBeLessThan(200);
  });

  test('checkLines speedup', () => {
    const a =
      '1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n';
    const b =
      'abcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\n';
    expect(difference(a, b, { checkLines: false })).toEqual(difference(a, b, { checkLines: true }));
  });

  test('detects replacement', () => {
    expect(difference('cat', 'dog')).toEqual([
      { op: DIFF_DELETE, text: 'cat' },
      { op: DIFF_INSERT, text: 'dog' },
    ]);
  });

  test('detects changes with common prefix and suffix', () => {
    expect(difference('start-middle-end', 'start-NEW-end')).toEqual([
      { op: DIFF_EQUAL, text: 'start-' },
      { op: DIFF_DELETE, text: 'middle' },
      { op: DIFF_INSERT, text: 'NEW' },
      { op: DIFF_EQUAL, text: '-end' },
    ]);
  });

  test('detects multiple changes', () => {
    expect(difference('abc123xyz', 'abc456xyz')).toEqual([
      { op: DIFF_EQUAL, text: 'abc' },
      { op: DIFF_DELETE, text: '123' },
      { op: DIFF_INSERT, text: '456' },
      { op: DIFF_EQUAL, text: 'xyz' },
    ]);
  });

  test('works with unicode', () => {
    expect(difference('mañana', 'banana')).toEqual([
      { op: DIFF_DELETE, text: 'm' },
      { op: DIFF_INSERT, text: 'b' },
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_DELETE, text: 'ñ' },
      { op: DIFF_INSERT, text: 'n' },
      { op: DIFF_EQUAL, text: 'ana' },
    ]);
  });

  test('works with empty old string', () => {
    expect(difference(empty, 'hello')).toEqual([{ op: DIFF_INSERT, text: 'hello' }]);
  });

  test('works with empty new string', () => {
    expect(difference('hello', empty)).toEqual([{ op: DIFF_DELETE, text: 'hello' }]);
  });

  test('words with single character strings', () => {
    expect(difference('hello', 'x')).toEqual([
      { op: DIFF_DELETE, text: 'hello' },
      { op: DIFF_INSERT, text: 'x' },
    ]);

    expect(difference('x', 'hello')).toEqual([
      { op: DIFF_DELETE, text: 'x' },
      { op: DIFF_INSERT, text: 'hello' },
    ]);
  });

  // cspell:ignore farew
  test('with timeout and quality for half-match', () => {
    expect(difference('hello goodbye', 'farewell', { timeout: 2 })).toEqual([
      { op: DIFF_DELETE, text: 'h' },
      { op: DIFF_INSERT, text: 'farew' },
      { op: DIFF_EQUAL, text: 'ell' },
      { op: DIFF_DELETE, text: 'o goodbye' },
    ]);
  });
});
