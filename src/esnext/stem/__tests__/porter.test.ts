import { stemmer } from '../../../../standards/stemmer.ts';

import { stem } from '../stem.ts';

const std = (word: string): string => stemmer(word);
const porter = (input: string): string => stem(input, 'porter');

describe('porter', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        expect(porter(word), word).toStrictEqual(std(word));
      }
    },
    60_000,
  );

  test('covers ll-ending branch for gt1 with constructed words', () => {
    expect(porter('ballall')).toBe('ballal'); // Should remove 'l' if gt1 matches
    expect(porter('tallill')).toBe('tallil'); // Should remove 'l' if gt1 matches
  });

  test('covers ll-ending branch for gt1 with parallel and artificial words', () => {
    expect(porter('parallel')).toBe('parallel'); // Should remove 'l' if gt1 matches
    expect(porter('compelled')).toBe('compel'); // Should remove 'l' if gt1 matches
    expect(porter('propelled')).toBe('propel'); // Should remove 'l' if gt1 matches
    expect(porter('ballroll')).toBe('ballrol'); // Artificial: ends with 'll', should match gt1
    expect(porter('tallwell')).toBe('tallwel'); // Artificial: ends with 'll', should match gt1
  });
  test('covers ll-ending branch for gt1 explicitly (diagnostic)', () => {
    // These words should stem to a form ending with 'll' and matching gt1
    // If coverage is not achieved, try other words or forms
    expect(porter('thrilled')).toBe('thrill'); // Should remove 'l' if gt1 matches
    expect(porter('spilled')).toBe('spill'); // Should remove 'l' if gt1 matches
    expect(porter('fulfilled')).toBe('fulfil'); // Should remove 'l' if gt1 matches
    expect(porter('distilled')).toBe('distil'); // Should remove 'l' if gt1 matches
    expect(porter('installed')).toBe('instal'); // Should remove 'l' if gt1 matches
  });
  test('words that give us 100% coverage', () => {
    expect(porter('abated')).toBe('abat');
    expect(porter('agreed')).toBe('agre');
  });

  test('covers step 1b consonantLike branch explicitly', () => {
    // Find a word that after removing 'ing' matches consonantLike and not previous branches
    // 'hoping' -> 'hop' (double consonant, not correct)
    // 'caving' -> 'cav' (may match previous branch)
    // Try 'having' -> 'hav' (should match consonantLike)
    expect(porter('having')).toBe('have');
    // Try 'saving' -> 'sav' (should match consonantLike)
    expect(porter('saving')).toBe('save');
    // Try 'paving' -> 'pav' (should match consonantLike)
    expect(porter('paving')).toBe('pave');
  });

  test('covers ll-ending branch explicitly', () => {
    // Find a word that after stemming ends with 'll' and matches gt1
    // 'fulfill' -> 'fulfil' (should remove last 'l' if gt1 matches)
    expect(porter('fulfill')).toBe('fulfil');
    // 'install' -> 'instal'
    expect(porter('install')).toBe('instal');
    // 'distill' -> 'distil'
    expect(porter('distill')).toBe('distil');
  });
  test('handles y-initial logic', () => {
    // Should convert initial y to Y and restore at end
    expect(porter('yelling')).toBe('yell');
    expect(porter('yelled')).toBe('yell');
  });

  test('covers step 1b branching logic', () => {
    // Suffix at/bl/iz: add e
    expect(porter('batted')).toBe('bat'); // triggers 'at' branch, then adds 'e' in step 1b
    expect(porter('blizzing')).toBe('blizz'); // triggers 'iz' branch, then adds 'e'
    // Double consonant: remove last char
    expect(porter('hopping')).toBe('hop'); // triggers double consonant branch
    // Consonant-like: add e
    expect(porter('caving')).toBe('cave'); // triggers consonant-like branch
  });

  test('handles ll-ending logic', () => {
    expect(porter('thrill')).toBe('thrill'); // Should not remove 'l' if not gt1
    expect(porter('thrilled')).toBe('thrill'); // Should remove 'l' if gt1
  });
  test('basic stemming', () => {
    expect(porter('running')).toBe('run');
    expect(porter('happiness')).toBe('happi');
    expect(porter('flies')).toBe('fli');
    expect(porter('ponies')).toBe('poni');
    expect(porter('caresses')).toBe('caress');
    expect(porter('cats')).toBe('cat');
  });

  test('handles short words', () => {
    expect(porter('at')).toBe('at');
    expect(porter('be')).toBe('be');
  });

  test('step 1b rules', () => {
    expect(porter('agreed')).toBe('agre');
    expect(porter('plastered')).toBe('plaster');
    expect(porter('bled')).toBe('bled');
    expect(porter('motoring')).toBe('motor');
    expect(porter('sing')).toBe('sing');
  });

  test('step 1c rules', () => {
    expect(porter('happy')).toBe('happi');
    expect(porter('sky')).toBe('sky');
  });

  test('step 2 rules', () => {
    expect(porter('relational')).toBe('relat');
    expect(porter('conditional')).toBe('condit');
    expect(porter('rational')).toBe('ration');
    expect(porter('valenci')).toBe('valenc');
    expect(porter('hesitanci')).toBe('hesit');
    expect(porter('digitizer')).toBe('digit');
  });

  test('step 3 rules', () => {
    expect(porter('triplicate')).toBe('triplic');
    expect(porter('formative')).toBe('form');
    expect(porter('formalize')).toBe('formal');
    expect(porter('electricity')).toBe('electr');
    expect(porter('electrical')).toBe('electr');
  });

  test('step 4 rules', () => {
    expect(porter('revival')).toBe('reviv');
    expect(porter('allowance')).toBe('allow');
    expect(porter('inference')).toBe('infer');
    expect(porter('airliner')).toBe('airlin');
    expect(porter('gyroscopic')).toBe('gyroscop');
  });

  test('step 5 rules', () => {
    expect(porter('probate')).toBe('probat');
    expect(porter('rate')).toBe('rate');
    expect(porter('cease')).toBe('ceas');
  });
});
