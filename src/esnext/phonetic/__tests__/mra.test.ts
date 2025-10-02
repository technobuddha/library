import { mra as std } from '../../../../standards/mra.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { mra } from '../mra.ts';

describe('mra', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        expect(mra(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    60_000,
  );

  test('basic encoding', () => {
    expect(mra('Smith')).toBe('SMTH');
    expect(mra('Smyth')).toBe('SMYTH');
    expect(mra('Robert')).toBe('RBRT');
    expect(mra('Rupert')).toBe('RPRT');
  });

  test('handles short names', () => {
    expect(mra('Al')).toBe('AL');
    expect(mra('Bo')).toBe('B');
  });
});
