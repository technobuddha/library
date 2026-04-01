import { daitchMokotoff as std } from '../../../../standards/daitch-mokotoff.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { daitchMokotoff } from '../daitch-mokotoff.ts';

describe('daitchMokotoff', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(daitchMokotoff(word).sort(), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );

  test('handles empty string', () => {
    expect(daitchMokotoff('')).toEqual([]);
  });

  test('generates codes for simple names', () => {
    expect(daitchMokotoff('Miller')).toEqual(['689000']);
    expect(daitchMokotoff('Johnson')).toEqual(['164600', '464600']);
    expect(daitchMokotoff('Smith')).toEqual(['463000']);
    expect(daitchMokotoff('Brown')).toEqual(['797600']);
  });

  test('handles case insensitivity', () => {
    expect(daitchMokotoff('MILLER')).toEqual(['689000']);
    expect(daitchMokotoff('miller')).toEqual(['689000']);
    expect(daitchMokotoff('MiLlEr')).toEqual(['689000']);
  });

  test('produces multiple codes for ambiguous pronunciations', () => {
    // CH can be pronounced as '5' or '4'
    expect(daitchMokotoff('Jackson')).toEqual(
      expect.arrayContaining(['154600', '454600', '145460', '445460']),
    );

    // C can be pronounced as '5' or '4'
    expect(daitchMokotoff('Cohen')).toEqual(['556000', '456000']);

    // J can be pronounced as '1' or '4'
    expect(daitchMokotoff('Jacobs')).toEqual(
      expect.arrayContaining(['157400', '457400', '147400', '447400']),
    );
  });

  test('handles complex Eastern European consonant clusters', () => {
    // SCH combinations
    expect(daitchMokotoff('Schmidt')).toEqual(['463000']);

    // SCHT combinations
    expect(daitchMokotoff('Schtein')).toEqual(['260000']);

    // Complex Polish combinations
    expect(daitchMokotoff('Szczepan')).toEqual(['276000']);
  });

  test('handles vowel combinations correctly', () => {
    // AI at start vs middle
    expect(daitchMokotoff('Ainsworth')).toEqual(['064793']);

    // AU combinations
    expect(daitchMokotoff('August')).toEqual(['054300']);

    // EI combinations
    expect(daitchMokotoff('Einstein')).toEqual(['064360']);
  });

  test('handles position-sensitive rules', () => {
    // H at start vs middle
    expect(daitchMokotoff('Henry')).toEqual(['569000']);
    expect(daitchMokotoff('Cohen')).toEqual(['556000', '456000']);

    // Different codes for start vs other positions
    expect(daitchMokotoff('Schuman')).toEqual(['466000']);
    expect(daitchMokotoff('Ashkenazi')).toEqual(['045640']);
  });

  test('removes diacritics and non-alphabetic characters', () => {
    expect(daitchMokotoff('José')).toEqual(['140000', '440000']);
    expect(daitchMokotoff('Müller')).toEqual(['689000']);
    expect(daitchMokotoff("O'Brien")).toEqual(['079600']);
    expect(daitchMokotoff('Van-Der-Berg')).toEqual(['763979']);
  });

  test('handles single characters', () => {
    expect(daitchMokotoff('A')).toEqual(['000000']);
    expect(daitchMokotoff('B')).toEqual(['700000']);
    expect(daitchMokotoff('Z')).toEqual(['400000']);
  });

  test('handles double consonants and special combinations', () => {
    // MN and NM combinations
    expect(daitchMokotoff('Goldman')).toEqual(['583660']);

    // Double consonants
    expect(daitchMokotoff('Hoffman')).toEqual(['576600']);

    // Complex TZ, TS combinations
    expect(daitchMokotoff('Katz')).toEqual(['540000']);
    expect(daitchMokotoff('Potts')).toEqual(['740000']);
  });

  test('generates expected codes for known Jewish surnames', () => {
    // Common Ashkenazi surnames
    expect(daitchMokotoff('Goldstein')).toEqual(['584360']);
    expect(daitchMokotoff('Rosenberg')).toEqual(['946795']);
    expect(daitchMokotoff('Weinstein')).toEqual(['764360']);
    expect(daitchMokotoff('Lieberman')).toEqual(['879660']);
  });

  test('handles Polish and Russian names correctly', () => {
    // Polish names with complex consonants
    expect(daitchMokotoff('Kowalski')).toEqual(['578450']);
    expect(daitchMokotoff('Nowak')).toEqual(['675000']);

    // Russian names
    expect(daitchMokotoff('Volkov')).toEqual(['785700']);
    expect(daitchMokotoff('Petrov')).toEqual(['739700']);
  });

  test('handles very long names', () => {
    expect(daitchMokotoff('Goldschmidtenstein')).toEqual(['584563', '584636']);
  });

  test('handles names with repeated patterns', () => {
    expect(daitchMokotoff('Schsch')).toEqual(['400000']);
    expect(daitchMokotoff('Chchch')).toEqual(
      expect.arrayContaining(['500000', '450000', '545000', '540000', '454000', '400000']),
    );
    expect(daitchMokotoff('MnMnMn')).toEqual(['660000']);
  });

  test('handles forks beyond the size limit', () => {
    expect(daitchMokotoff('GLGLGLGLGLGLCH')).toEqual(['585858']);
  });

  test('handles vowel-only names', () => {
    expect(daitchMokotoff('Aue')).toEqual(['000000']);
    expect(daitchMokotoff('Eau')).toEqual(['000000']);
    expect(daitchMokotoff('Io')).toEqual(['100000']);
  });

  test('maintains phonetic similarity for variants', () => {
    // Different spellings of similar sounding names
    const variants = [
      daitchMokotoff('Schwartz'),
      daitchMokotoff('Schwarz'),
      daitchMokotoff('Svarts'),
    ];

    // All should produce codes starting with similar patterns
    for (const codes of variants) {
      expect(codes).toEqual(expect.arrayContaining([expect.stringMatching(/^4.*/v)]));
    }
  });

  test('matches known examples', () => {
    expect(daitchMokotoff('AUERBACH')).toEqual(['097500', '097400']);
    expect(daitchMokotoff('OHRBACH')).toEqual(['097500', '097400']);
    expect(daitchMokotoff('LIPSHITZ')).toEqual(['874400']);
    expect(daitchMokotoff('LIPPSZYC')).toEqual(['874500', '874400']);
    expect(daitchMokotoff('LEWINSKY')).toEqual(['876450']);
    expect(daitchMokotoff('LEVINSKI')).toEqual(['876450']);
    expect(daitchMokotoff('SZLAMAWICZ')).toEqual(['486740']);
    expect(daitchMokotoff('SHLAMOVITZ')).toEqual(['486740']);
  });
});
