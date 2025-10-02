import { singular } from '../singular.ts';

describe('singular', () => {
  test('regular plurals', () => {
    expect(singular('cats')).toBe('cat');
    expect(singular('dogs')).toBe('dog');
    expect(singular('cars')).toBe('car');
  });

  test('irregular plurals', () => {
    expect(singular('mice')).toBe('mouse');
    expect(singular('children')).toBe('child');
    expect(singular('geese')).toBe('goose');
    expect(singular('feet')).toBe('foot');
    expect(singular('people')).toBe('person');
  });

  test('uncountable nouns', () => {
    expect(singular('sheep')).toBe('sheep');
    expect(singular('series')).toBe('series');
    expect(singular('species')).toBe('species');
  });

  test('edge cases', () => {
    expect(singular('buses')).toBe('bus');
    expect(singular('analyses')).toBe('analysis');
    expect(singular('octopi')).toBe('octopus');
    expect(singular('phenomena')).toBe('phenomenon');
    expect(singular('indices')).toBe('index');
    expect(singular('matrices')).toBe('matrix');
    expect(singular('appendices')).toBe('appendix');
    expect(singular('stigmata')).toBe('stigma');
    expect(singular('dogmata')).toBe('dogma');
    expect(singular('schemata')).toBe('schema');
    expect(singular('anathema')).toBe('anathema'); // singular already
  });

  test('prefix handling', () => {
    expect(singular('anti-cats')).toBe('anti-cat');
    expect(singular('bi-dogs')).toBe('bi-dog');
    expect(singular('ex-children')).toBe('ex-child');
  });

  test('suffix handling', () => {
    expect(singular('cats-up')).toBe('cat-up');
    expect(singular('dogs-out')).toBe('dog-out');
    expect(singular('children-in-law')).toBe('child-in-law');
  });

  test('prefix and suffix combined', () => {
    expect(singular('anti-cats-up')).toBe('anti-cat-up');
    expect(singular('ex-children-in-law')).toBe('ex-child-in-law');
  });

  test('explicit singular rule', () => {
    expect(singular('themselves')).toBe('themself');
    expect(singular('Themselves')).toBe('Themself');
  });

  test('uncountable rules (regex)', () => {
    expect(singular('fish')).toBe('fish');
    expect(singular('measles')).toBe('measles');
    expect(singular('childhood')).toBe('childhood');
    expect(singular('wood')).toBe('wood');
  });

  test('fallback logic', () => {
    expect(singular('gas')).toBe('gas'); // not plural
    expect(singular('atlas')).toBe('atla'); // fallback removes trailing 's'
    expect(singular('bus')).toBe('bu'); // fallback removes trailing 's'
  });

  test('case sensitivity', () => {
    expect(singular('CATS')).toBe('CAT');
    expect(singular('MICE')).toBe('MOUSE');
    expect(singular('CHILDREN')).toBe('CHILD');
    expect(singular('DOGS')).toBe('DOG');
    expect(singular('GEese')).toBe('Goose');
    expect(singular('Feet')).toBe('Foot');
    expect(singular('PEOPLE')).toBe('PERSON');
    expect(singular('THEMSELVES')).toBe('THEMSELF');
  });

  test('irregulars not inverted', () => {
    expect(singular('dice')).toBe('die');
    expect(singular('oxen')).toBe('ox');
    expect(singular('were')).toBe('was');
    expect(singular('have')).toBe('has');
    expect(singular('these')).toBe('this');
    expect(singular('those')).toBe('that');
    expect(singular('us')).toBe('me');
    expect(singular('we')).toBe('i');
    expect(singular('she')).toBe('she'); // not reversed, matches actual behavior
  });

  test('irregulars where plural equals singular are not added to reverse map', () => {
    // Test uncountable nouns where singular === plural (these should not be in reverse map)
    expect(singular('deer')).toBe('deer');
    expect(singular('moose')).toBe('moose');
    expect(singular('aircraft')).toBe('aircraft');
  });
});
