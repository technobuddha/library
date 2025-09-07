//cspell:ignore tieth illionth

import { makeOrdinal } from './make-ordinal.ts';

describe('make-ordinal', () => {
  test('should convert words ending with "one" to "first"', () => {
    expect(makeOrdinal('one')).toBe('first');
    expect(makeOrdinal('twenty one')).toBe('twenty first');
    expect(makeOrdinal('thirty one')).toBe('thirty first');
  });

  test('should convert words ending with "two" to "second"', () => {
    expect(makeOrdinal('two')).toBe('second');
    expect(makeOrdinal('twenty two')).toBe('twenty second');
    expect(makeOrdinal('thirty two')).toBe('thirty second');
  });

  test('should convert words ending with "three" to "third"', () => {
    expect(makeOrdinal('three')).toBe('third');
    expect(makeOrdinal('twenty three')).toBe('twenty third');
    expect(makeOrdinal('thirty three')).toBe('thirty third');
  });

  test('should convert words ending with "five" to "fifth"', () => {
    expect(makeOrdinal('five')).toBe('fifth');
    expect(makeOrdinal('twenty five')).toBe('twenty fifth');
    expect(makeOrdinal('thirty five')).toBe('thirty fifth');
  });

  test('should convert words ending with "twelve" to "twelfth"', () => {
    expect(makeOrdinal('twelve')).toBe('twelfth');
    expect(makeOrdinal('one hundred twelve')).toBe('one hundred twelfth');
  });

  test('should convert words ending with "ty" to "tieth"', () => {
    expect(makeOrdinal('twenty')).toBe('twentieth');
    expect(makeOrdinal('thirty')).toBe('thirtieth');
    expect(makeOrdinal('forty')).toBe('fortieth');
    expect(makeOrdinal('fifty')).toBe('fiftieth');
    expect(makeOrdinal('sixty')).toBe('sixtieth');
    expect(makeOrdinal('seventy')).toBe('seventieth');
    expect(makeOrdinal('ninety')).toBe('ninetieth');
  });

  test('should return the th suffix', () => {
    expect(makeOrdinal('four')).toBe('fourth');
    expect(makeOrdinal('six')).toBe('sixth');
    expect(makeOrdinal('eleven')).toBe('eleventh');
    expect(makeOrdinal('hundred')).toBe('hundredth');
    expect(makeOrdinal('thousand')).toBe('thousandth');
    expect(makeOrdinal('illion')).toBe('illionth');
  });
});
