import { empty } from '../../unicode/unicode.ts';

import { halfMatch } from '../half-match.ts';

describe('halfMatch', () => {
  const options = { timeout: 1, checkLines: true, editCost: 4, deadline: Date.now() + 1000 };

  test('No match', () => {
    expect(halfMatch('1234567890', 'abcdef', options)).toBeNull();
    expect(halfMatch('12345', '23', options)).toBeNull();
  });

  test('Single Match', () => {
    expect(halfMatch('1234567890', 'a345678z', options)).toStrictEqual([
      '12',
      '90',
      'a',
      'z',
      '345678',
    ]);

    expect(halfMatch('a345678z', '1234567890', options)).toStrictEqual([
      'a',
      'z',
      '12',
      '90',
      '345678',
    ]);

    expect(halfMatch('abc56789z', '1234567890', options)).toStrictEqual([
      'abc',
      'z',
      '1234',
      '0',
      '56789',
    ]);

    expect(halfMatch('a23456xyz', '1234567890', options)).toStrictEqual([
      'a',
      'xyz',
      '1',
      '7890',
      '23456',
    ]);
  });

  test('Multiple Matches', () => {
    expect(halfMatch('121231234123451234123121', 'a1234123451234z', options)).toStrictEqual([
      '12123',
      '123121',
      'a',
      'z',
      '1234123451234',
    ]);

    expect(halfMatch('x-=-=-=-=-=-=-=-=-=-=-=-=', 'xx-=-=-=-=-=-=-=', options)).toStrictEqual([
      empty,
      '-=-=-=-=-=',
      'x',
      empty,
      'x-=-=-=-=-=-=-=',
    ]);

    expect(halfMatch('-=-=-=-=-=-=-=-=-=-=-=-=y', '-=-=-=-=-=-=-=yy', options)).toStrictEqual([
      '-=-=-=-=-=',
      empty,
      empty,
      'y',
      '-=-=-=-=-=-=-=y',
    ]);
  });

  test('Non-optimal half-match', () => {
    // Optimal diff would be -q+x=H-i+e=lloHe+Hu=llo-Hew+y not -qHillo+x=HelloHe-w+Hulloy
    expect(halfMatch('qHilloHelloHew', 'xHelloHeHulloy', options)).toStrictEqual([
      'qHillo',
      'w',
      'x',
      'Hulloy',
      'HelloHe',
    ]);
  });
});
