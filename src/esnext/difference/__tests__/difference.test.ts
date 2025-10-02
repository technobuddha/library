/* eslint-disable no-secrets/no-secrets */
import { empty, space } from '../../unicode/unicode.ts';

import {
  difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../difference.ts';

describe('difference', () => {
  test('Null case', () => {
    expect(difference(empty, empty)).toEqual([]);
  });

  test('Equality', () => {
    expect(difference('abc', 'abc')).toEqual([{ op: DIFFERENCE_EQUAL, text: 'abc' }]);
  });

  test('Simple insertion', () => {
    expect(difference('abc', 'ab123c')).toEqual([
      { op: DIFFERENCE_EQUAL, text: 'ab' },
      { op: DIFFERENCE_INSERT, text: '123' },
      { op: DIFFERENCE_EQUAL, text: 'c' },
    ]);
  });

  test('Simple deletion', () => {
    expect(difference('a123bc', 'abc')).toEqual([
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: '123' },
      { op: DIFFERENCE_EQUAL, text: 'bc' },
    ]);
  });

  test('Two insertions', () => {
    expect(difference('abc', 'a123b456c')).toEqual([
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_INSERT, text: '123' },
      { op: DIFFERENCE_EQUAL, text: 'b' },
      { op: DIFFERENCE_INSERT, text: '456' },
      { op: DIFFERENCE_EQUAL, text: 'c' },
    ]);
  });

  test('Two deletions', () => {
    expect(difference('a123b456c', 'abc')).toEqual([
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: '123' },
      { op: DIFFERENCE_EQUAL, text: 'b' },
      { op: DIFFERENCE_DELETE, text: '456' },
      { op: DIFFERENCE_EQUAL, text: 'c' },
    ]);
  });

  test('Simple cases', () => {
    expect(difference('a', 'b')).toEqual([
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_INSERT, text: 'b' },
    ]);
    expect(difference('Apples are a fruit.', 'Bananas are also fruit.')).toEqual([
      { op: DIFFERENCE_DELETE, text: 'Apple' },
      { op: DIFFERENCE_INSERT, text: 'Banana' },
      { op: DIFFERENCE_EQUAL, text: 's are a' },
      { op: DIFFERENCE_INSERT, text: 'lso' },
      { op: DIFFERENCE_EQUAL, text: ' fruit.' },
    ]);
    expect(difference('ax\tI', '栏x\0')).toEqual([
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_INSERT, text: '栏' },
      { op: DIFFERENCE_EQUAL, text: 'x' },
      { op: DIFFERENCE_DELETE, text: '\tI' },
      { op: DIFFERENCE_INSERT, text: '\0' },
    ]);
  });

  test('Overlaps', () => {
    expect(difference('1ayb2', 'abaxb')).toEqual([
      { op: DIFFERENCE_DELETE, text: '1' },
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'y' },
      { op: DIFFERENCE_EQUAL, text: 'b' },
      { op: DIFFERENCE_DELETE, text: '2' },
      { op: DIFFERENCE_INSERT, text: 'axb' },
    ]);
    expect(difference('abcy', 'xaxcxabc')).toEqual([
      { op: DIFFERENCE_INSERT, text: 'xaxcx' },
      { op: DIFFERENCE_EQUAL, text: 'abc' },
      { op: DIFFERENCE_DELETE, text: 'y' },
    ]);

    expect(difference('ABCDa=bcd=efghijklmnopqrsEFGHIJKLMNOefg', 'a-bcd-efghijklmnopqrs')).toEqual([
      { op: DIFFERENCE_DELETE, text: 'ABCD' },
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: '=' },
      { op: DIFFERENCE_INSERT, text: '-' },
      { op: DIFFERENCE_EQUAL, text: 'bcd' },
      { op: DIFFERENCE_DELETE, text: '=' },
      { op: DIFFERENCE_INSERT, text: '-' },
      { op: DIFFERENCE_EQUAL, text: 'efghijklmnopqrs' },
      { op: DIFFERENCE_DELETE, text: 'EFGHIJKLMNOefg' },
    ]);
  });

  test('Large equality', () => {
    expect(difference('a [[Pennsylvania]] and [[New', ' and [[Pennsylvania]]')).toEqual([
      { op: DIFFERENCE_INSERT, text: space },
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_INSERT, text: 'nd' },
      { op: DIFFERENCE_EQUAL, text: ' [[Pennsylvania]]' },
      { op: DIFFERENCE_DELETE, text: ' and [[New' },
    ]);
  });

  test.skip('timeout', () => {
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
      { op: DIFFERENCE_DELETE, text: 'cat' },
      { op: DIFFERENCE_INSERT, text: 'dog' },
    ]);
  });

  test('detects changes with common prefix and suffix', () => {
    expect(difference('start-middle-end', 'start-NEW-end')).toEqual([
      { op: DIFFERENCE_EQUAL, text: 'start-' },
      { op: DIFFERENCE_DELETE, text: 'middle' },
      { op: DIFFERENCE_INSERT, text: 'NEW' },
      { op: DIFFERENCE_EQUAL, text: '-end' },
    ]);
  });

  test('detects multiple changes', () => {
    expect(difference('abc123xyz', 'abc456xyz')).toEqual([
      { op: DIFFERENCE_EQUAL, text: 'abc' },
      { op: DIFFERENCE_DELETE, text: '123' },
      { op: DIFFERENCE_INSERT, text: '456' },
      { op: DIFFERENCE_EQUAL, text: 'xyz' },
    ]);
  });

  test('works with unicode', () => {
    expect(difference('mañana', 'banana')).toEqual([
      { op: DIFFERENCE_DELETE, text: 'm' },
      { op: DIFFERENCE_INSERT, text: 'b' },
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'ñ' },
      { op: DIFFERENCE_INSERT, text: 'n' },
      { op: DIFFERENCE_EQUAL, text: 'ana' },
    ]);
  });

  test('works with empty old string', () => {
    expect(difference(empty, 'hello')).toEqual([{ op: DIFFERENCE_INSERT, text: 'hello' }]);
  });

  test('works with empty new string', () => {
    expect(difference('hello', empty)).toEqual([{ op: DIFFERENCE_DELETE, text: 'hello' }]);
  });

  test('words with single character strings', () => {
    expect(difference('hello', 'x')).toEqual([
      { op: DIFFERENCE_DELETE, text: 'hello' },
      { op: DIFFERENCE_INSERT, text: 'x' },
    ]);

    expect(difference('x', 'hello')).toEqual([
      { op: DIFFERENCE_DELETE, text: 'x' },
      { op: DIFFERENCE_INSERT, text: 'hello' },
    ]);
  });

  test('with timeout and quality for half-match', () => {
    expect(difference('hello goodbye', 'farewell', { timeout: 2 })).toEqual([
      { op: DIFFERENCE_DELETE, text: 'h' },
      { op: DIFFERENCE_INSERT, text: 'farew' },
      { op: DIFFERENCE_EQUAL, text: 'ell' },
      { op: DIFFERENCE_DELETE, text: 'o goodbye' },
    ]);
  });
});
