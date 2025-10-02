import { cologne as std } from '../../../../standards/cologne.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { cologne } from '../cologne.ts';

describe('cologne', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        expect(cologne(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    60_000,
  );

  test('encodes basic German names', () => {
    expect(cologne('Mueller')).toBe('657');
    expect(cologne('Müller')).toBe('657');
    expect(cologne('Schmidt')).toBe('862');
    expect(cologne('Meier')).toBe('67');
    expect(cologne('Maier')).toBe('67');
    expect(cologne('Mayer')).toBe('67');
    expect(cologne('Schneider')).toBe('8627');
    expect(cologne('Fischer')).toBe('387');
    expect(cologne('Weber')).toBe('317');
    expect(cologne('Wagner')).toBe('3467');
  });

  test('handles edge cases and normalization', () => {
    expect(cologne('')).toBe('');
    expect(cologne(' ')).toBe('');
    expect(cologne('123')).toBe('');
    expect(cologne('ÄÖÜ')).toBe('0'); // Updated expectation
    expect(cologne('ß')).toBe('8');
  });

  test('is case insensitive', () => {
    expect(cologne('Mueller')).toBe(cologne('MUELLER'));
    expect(cologne('schmidt')).toBe(cologne('SCHMIDT'));
  });

  test('returns same code for phonetically similar names', () => {
    expect(cologne('Meier')).toBe(cologne('Maier'));
    expect(cologne('Meier')).toBe(cologne('Mayer'));
    expect(cologne('Schmidt')).toBe(cologne('Schmitt'));
  });
});
