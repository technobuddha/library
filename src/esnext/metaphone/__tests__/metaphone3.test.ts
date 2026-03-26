import { metaphone3 as std } from '../../../../standards/metaphone3.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { metaphone3 } from '../metaphone3.ts';

describe('metaphone3', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        expect(metaphone3(word), word).toStrictEqual(std(prepare(word, true, false)));
      }
    },
    60_000,
  );

  test('encodes known words to expected primary/alternate keys (regression)', () => {
    // These expected values were recorded from the current implementation and
    // serve as regression checks.
    expect(metaphone3('Smith')).toEqual(['SM0', 'XMT']);
    expect(metaphone3('Schmidt')).toEqual(['XMT']);
    expect(metaphone3('Gnome')).toEqual(['NM']);
    expect(metaphone3('Knight')).toEqual(['NT']);
    expect(metaphone3('Audio')).toEqual(['AT']);
    expect(metaphone3('Queue')).toEqual(['K']);
    expect(metaphone3('Lame')).toEqual(['LM']);
    expect(metaphone3('Resume')).toEqual(['RSM']);
    expect(metaphone3('Wrinkle')).toEqual(['RNKL']);
  });

  test('empty string returns empty primary and undefined alternate', () => {
    expect(metaphone3('')).toEqual([]);
  });

  test('single letter vowel is encoded as A', () => {
    expect(metaphone3('A')).toEqual(['A']);
  });

  test('various consonant patterns and special cases', () => {
    // TH can produce '0' for many words (but not all variants). Check a strong example
    expect(metaphone3('Thick')[0]).toContain('0');

    // CH/SH should produce 'X' marker somewhere
    expect(metaphone3('Church')[0]).toContain('X');
    expect(metaphone3('Shine')[0]).toContain('X');

    // Silent letters and initial clusters
    expect(metaphone3('Knock')[0]).toBeTruthy();
    expect(metaphone3('Gnome')[0]).toBe('NM');

    // Words with accents/unicode should not throw
    const acc = metaphone3('José');
    expect(acc).toBeArray();
    expect(typeof acc[0]).toBe('string');
  });

  test('consistent results and config options passthrough', () => {
    const t1 = metaphone3('Testing');
    const t2 = metaphone3('Testing');
    expect(t1).toEqual(t2);

    // calling with config doesn't throw and returns the two-tuple
    const withVowels = metaphone3('Audio', { encodeVowels: true });
    expect(withVowels.length).toBeGreaterThanOrEqual(1);

    const withExact = metaphone3('David', { encodeExact: true });
    expect(withExact[0].length).toBeGreaterThan(0);
  });

  test('output only contains expected characters', () => {
    const words = ['Test', 'Algorithm', 'Phonetic', 'Supercalifragilisticexpialidocious'];
    for (const w of words) {
      const [p, a] = metaphone3(w);
      expect(/^[A-Z\d]*$/v.test(p)).toBeTrue();
      if (a != null) {
        expect(/^[A-Z\d]*$/v.test(a)).toBeTrue();
      }
    }
  });

  test('exercise many metaphone3 rules (smoke)', () => {
    // Words selected to drive many internal code paths in Metaphone3
    const words = [
      'Niña', //
      'AQQA', // double Q
      'joseph',
      'fanizza',
      'foxx',
      'yax',
      'wheelwright',
      'savvy',
      'tuttle',
      'scotland',
      'sia',
      'yoshi',
      'topp',
      'timm',
      'villa',
      'kubisiak',
      'chisholm',
      'thakkar',
      'sojo',
      'jose',
      'raj',
      'majestic',
      'getty',
      'pagni',
      'ignore',
      'ghee',
      'webb',
      'killjjoy', // artifical for test coverage
      'zullo',
      'cabrillo',
      'Lame',
      'Agape',
      'Resume',
      'BLESSED',
      'LEARNED',
      'INGE',
      'HUGH',
      'LAUGH',
      'COUGH',
      'ROUGH',
      'PNEUMONIA',
      'GNARLY',
      'IRON',
      'IRONIC',
      'PENELOPE',
      'CALLIOPE',
      'CHIPOTLE',
      'ANTIGONE',
      'KAMIKAZE',
      'EURIDICE',
      'YOSEMITE',
      'FERRANTE',
      'HYPERBOLE',
      'GUACAMOLE',
      'JAKUBOWSKI',
      'GONZALES',
      'PORSCHE',
      'DAPHNE',
      'BRIDGE',
      'CHEESE',
      'BLINKER',
      // additional words drawn from many of the literal lists in the file
      'ACME',
      'NIKE',
      'CAFE',
      'RENE',
      'LUPE',
      'JOSE',
      'ESME',
      'HECATE',
      'PSYCHE',
      'DAPHNE',
      'PENELOPE',
      'CALLIOPE',
      'ANTONIO',
      'STROPHE',
      'ARCHIMEDES',
      'MAGALLANES',
      'HERMES',
      'GONCALVES',
      'FERNANDES',
      'CERVANTES',
      'FERNANDEZ',
      'MERCEDES',
      'BUKKAKE',
      'SALOME',
      'CORTES',
      'MORALES',
      'DOLORES',
      'ANGELES',
      'RESPLEN',
      'PROBLEM',
      'CHARLES',
      'BRIDGET',
      'BRIDGETTE',
      'OLENA',
    ];

    for (const w of words) {
      const out = metaphone3(w, { encodeVowels: true, encodeExact: false });
      expect(out).toBeArray();
      expect(typeof out[0]).toBe('string');
      // alternate may be undefined
    }
  });

  test('targeted rule triggers for metaphone3', () => {
    // Specific words drawn from the many literal exception lists in the source
    const targets = [
      'STROPHE',
      'ACME',
      'NIKE',
      'CAFE',
      'RENE',
      'LUPE',
      'JOSE',
      'ESME',
      'HECATE',
      'PSYCHE',
      'PENELOPE',
      'CALLIOPE',
      'ARCHIMEDES',
      'MAGALLANES',
      'HYPERBOLE',
      'GUACAMOLE',
      'GONZALES',
      'FERNANDES',
      'CERVANTES',
      'MERCEDES',
    ];

    for (const t of targets) {
      const [p, a] = metaphone3(t);
      expect(typeof p).toBe('string');
      // alternate may or may not exist; ensure no exceptions thrown and valid strings
      if (a != null) {
        expect(typeof a).toBe('string');
      }
    }
  });

  test('more exhaustive metaphone3 smoke inputs', () => {
    const more = [
      'Ghislane',
      'Ghiradelli',
      'McLaughlin',
      'Laugh',
      'Cough',
      'Gough',
      'Tough',
      'Hugh',
      'Edge',
      'Edgar',
      'Edith',
      'Pfister',
      'Pfeiffer',
      'Tzvetan',
      'Tchaikovsky',
      'Tsar',
      'Tsunami',
      'Xavier',
      'Xray',
      'Yankelovich',
      'Jacinto',
      'Gregor',
      'Wasserman',
      'Vasserman',
      'Filipowicz',
      'Piotr',
      'Schlesinger',
      'Schermerhorn',
      'Schmidt',
      'Schneider',
      'Schubert',
    ];

    for (const w of more) {
      const [p, a] = metaphone3(w, { encodeVowels: false, encodeExact: false });
      expect(typeof p).toBe('string');
      if (a != null) {
        expect(typeof a).toBe('string');
      }
    }
  });
});
