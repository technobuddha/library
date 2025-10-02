import { hyphen } from '../../unicode/unicode.ts';

import { hundreds } from '../hundreds.ts';
import { type Numbering } from '../numbering.ts';

describe('hundreds', () => {
  const baseOptions: Pick<Numbering, 'and' | 'hyphen'> = {
    and: '',
    hyphen: hyphen,
  };

  test('should handle zero', () => {
    expect(hundreds(0, baseOptions as Numbering)).toEqual([]);
  });

  test('should handle single digit numbers', () => {
    expect(hundreds(1, baseOptions as Numbering)).toEqual(['one']);
    expect(hundreds(5, baseOptions as Numbering)).toEqual(['five']);
    expect(hundreds(9, baseOptions as Numbering)).toEqual(['nine']);
  });

  test('should handle teens', () => {
    expect(hundreds(10, baseOptions as Numbering)).toEqual(['ten']);
    expect(hundreds(11, baseOptions as Numbering)).toEqual(['eleven']);
    expect(hundreds(13, baseOptions as Numbering)).toEqual(['thirteen']);
    expect(hundreds(15, baseOptions as Numbering)).toEqual(['fifteen']);
    expect(hundreds(19, baseOptions as Numbering)).toEqual(['nineteen']);
  });

  test('should handle exact tens', () => {
    expect(hundreds(20, baseOptions as Numbering)).toEqual(['twenty']);
    expect(hundreds(30, baseOptions as Numbering)).toEqual(['thirty']);
    expect(hundreds(40, baseOptions as Numbering)).toEqual(['forty']);
    expect(hundreds(50, baseOptions as Numbering)).toEqual(['fifty']);
    expect(hundreds(60, baseOptions as Numbering)).toEqual(['sixty']);
    expect(hundreds(70, baseOptions as Numbering)).toEqual(['seventy']);
    expect(hundreds(80, baseOptions as Numbering)).toEqual(['eighty']);
    expect(hundreds(90, baseOptions as Numbering)).toEqual(['ninety']);
  });

  test('should handle compound numbers with default hyphen', () => {
    expect(hundreds(21, baseOptions as Numbering)).toEqual(['twenty‐one']);
    expect(hundreds(42, baseOptions as Numbering)).toEqual(['forty‐two']);
    expect(hundreds(99, baseOptions as Numbering)).toEqual(['ninety‐nine']);
  });

  test('should handle compound numbers with custom hyphen', () => {
    const customOptions: Pick<Numbering, 'and' | 'hyphen'> = {
      and: '',
      hyphen: '-',
    };
    expect(hundreds(21, customOptions as Numbering)).toEqual(['twenty-one']);
    expect(hundreds(56, customOptions as Numbering)).toEqual(['fifty-six']);
  });

  test('should handle compound numbers with space as hyphen', () => {
    const spaceOptions: Pick<Numbering, 'and' | 'hyphen'> = {
      and: '',
      hyphen: ' ',
    };
    expect(hundreds(21, spaceOptions as Numbering)).toEqual(['twenty one']);
    expect(hundreds(88, spaceOptions as Numbering)).toEqual(['eighty eight']);
  });

  test('should handle exact hundreds', () => {
    expect(hundreds(100, baseOptions as Numbering)).toEqual(['one', 'hundred']);
    expect(hundreds(200, baseOptions as Numbering)).toEqual(['two', 'hundred']);
    expect(hundreds(500, baseOptions as Numbering)).toEqual(['five', 'hundred']);
    expect(hundreds(900, baseOptions as Numbering)).toEqual(['nine', 'hundred']);
  });

  test('should handle hundreds with single digit remainder without "and"', () => {
    expect(hundreds(101, baseOptions as Numbering)).toEqual(['one', 'hundred', 'one']);
    expect(hundreds(205, baseOptions as Numbering)).toEqual(['two', 'hundred', 'five']);
    expect(hundreds(909, baseOptions as Numbering)).toEqual(['nine', 'hundred', 'nine']);
  });

  test('should handle hundreds with single digit remainder with "and"', () => {
    const andOptions: Pick<Numbering, 'and' | 'hyphen'> = {
      and: 'and',
      hyphen: hyphen,
    };
    expect(hundreds(101, andOptions as Numbering)).toEqual(['one', 'hundred', 'and', 'one']);
    expect(hundreds(205, andOptions as Numbering)).toEqual(['two', 'hundred', 'and', 'five']);
  });

  test('should handle hundreds with teens without "and"', () => {
    expect(hundreds(110, baseOptions as Numbering)).toEqual(['one', 'hundred', 'ten']);
    expect(hundreds(315, baseOptions as Numbering)).toEqual(['three', 'hundred', 'fifteen']);
    expect(hundreds(819, baseOptions as Numbering)).toEqual(['eight', 'hundred', 'nineteen']);
  });

  test('should handle hundreds with teens with "and"', () => {
    const andOptions: Pick<Numbering, 'and' | 'hyphen'> = {
      and: 'and',
      hyphen: hyphen,
    };
    expect(hundreds(112, andOptions as Numbering)).toEqual(['one', 'hundred', 'and', 'twelve']);
    expect(hundreds(517, andOptions as Numbering)).toEqual(['five', 'hundred', 'and', 'seventeen']);
  });

  test('should handle hundreds with exact tens without "and"', () => {
    expect(hundreds(120, baseOptions as Numbering)).toEqual(['one', 'hundred', 'twenty']);
    expect(hundreds(450, baseOptions as Numbering)).toEqual(['four', 'hundred', 'fifty']);
    expect(hundreds(690, baseOptions as Numbering)).toEqual(['six', 'hundred', 'ninety']);
  });

  test('should handle hundreds with exact tens with "and"', () => {
    const andOptions: Pick<Numbering, 'and' | 'hyphen'> = {
      and: 'and',
      hyphen: hyphen,
    };
    expect(hundreds(130, andOptions as Numbering)).toEqual(['one', 'hundred', 'and', 'thirty']);
    expect(hundreds(270, andOptions as Numbering)).toEqual(['two', 'hundred', 'and', 'seventy']);
  });

  test('should handle hundreds with compound numbers without "and"', () => {
    expect(hundreds(123, baseOptions as Numbering)).toEqual(['one', 'hundred', 'twenty‐three']);
    expect(hundreds(456, baseOptions as Numbering)).toEqual(['four', 'hundred', 'fifty‐six']);
    expect(hundreds(999, baseOptions as Numbering)).toEqual(['nine', 'hundred', 'ninety‐nine']);
  });

  test('should handle hundreds with compound numbers with "and"', () => {
    const andOptions: Pick<Numbering, 'and' | 'hyphen'> = {
      and: 'and',
      hyphen: hyphen,
    };
    expect(hundreds(142, andOptions as Numbering)).toEqual(['one', 'hundred', 'and', 'forty‐two']);
    expect(hundreds(367, andOptions as Numbering)).toEqual([
      'three',
      'hundred',
      'and',
      'sixty‐seven',
    ]);
    expect(hundreds(891, andOptions as Numbering)).toEqual([
      'eight',
      'hundred',
      'and',
      'ninety‐one',
    ]);
  });

  test('should handle edge cases', () => {
    // Just below 100
    expect(hundreds(99, baseOptions as Numbering)).toEqual(['ninety‐nine']);
    // Just at 100
    expect(hundreds(100, baseOptions as Numbering)).toEqual(['one', 'hundred']);
    // Maximum value
    expect(hundreds(999, baseOptions as Numbering)).toEqual(['nine', 'hundred', 'ninety‐nine']);
  });

  test('should respect empty "and" parameter', () => {
    const emptyAndOptions: Pick<Numbering, 'and' | 'hyphen'> = {
      and: '',
      hyphen: hyphen,
    };
    expect(hundreds(123, emptyAndOptions as Numbering)).toEqual(['one', 'hundred', 'twenty‐three']);
    // Should not insert empty string
    expect(hundreds(123, emptyAndOptions as Numbering)).not.toContain('');
  });

  test('should handle numbers with custom "and" text', () => {
    const customAndOptions: Pick<Numbering, 'and' | 'hyphen'> = {
      and: '&',
      hyphen: hyphen,
    };
    expect(hundreds(105, customAndOptions as Numbering)).toEqual(['one', 'hundred', '&', 'five']);
  });

  test('should not add "and" for exact hundreds', () => {
    const andOptions: Pick<Numbering, 'and' | 'hyphen'> = {
      and: 'and',
      hyphen: hyphen,
    };
    expect(hundreds(100, andOptions as Numbering)).toEqual(['one', 'hundred']);
    expect(hundreds(600, andOptions as Numbering)).toEqual(['six', 'hundred']);
  });
});
