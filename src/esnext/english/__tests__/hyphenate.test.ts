// Unit tests for hyphenate function
import { space } from '../../unicode/index.ts';

import { hyphenate } from '../hyphenate.ts';

describe('hyphenate', () => {
  test('hyphenates a truly unique non-exception word', () => {
    expect(hyphenate('technobuddha')).toBeArray();
    expect(hyphenate('technobuddha').join('-').length).toBeGreaterThan(0);
  });
  test('hyphenates a non-exception word', () => {
    // 'hyphenation' is not in the exceptions list
    expect(hyphenate('hyphenation')).toEqual(['hy', 'phen', 'ation']);
    expect(hyphenate('HyPhEnAtIoN')).toEqual(['Hy', 'PhEn', 'AtIoN']);
    expect(hyphenate('COMPUTER')).toEqual(['COM', 'PUT', 'ER']);
  });
  test('returns word as single token if <= 4 chars', () => {
    expect(hyphenate('test')).toEqual(['test']);
    expect(hyphenate('a')).toEqual(['a']);
    expect(hyphenate('abcd')).toEqual(['abcd']);
  });

  test('handles known exceptions', () => {
    // Example: exceptions['associate'] = ['as', 'so', 'ciate']
    expect(hyphenate('associate')).toEqual(['as', 'so', 'ciate']);
    expect(hyphenate('ASSOCIATE')).toEqual(['AS', 'SO', 'CIATE']);
    expect(hyphenate('AsSoCiAtE')).toEqual(['As', 'So', 'CiAtE']);
    expect(hyphenate('declination')).toEqual(['dec', 'li', 'na', 'tion']);
    expect(hyphenate('DECLINATION')).toEqual(['DEC', 'LI', 'NA', 'TION']);
    expect(hyphenate('DecLiNaTiOn')).toEqual(['Dec', 'Li', 'Na', 'TiOn']);
    // 'associate' exception: ['as', 'so', 'ciate']
    expect(hyphenate('ASsoCIate')).toEqual(['AS', 'so', 'CIate']);
    expect(hyphenate('asSOciATE')).toEqual(['as', 'SO', 'ciATE']);
    // 'declination' exception: ['dec', 'li', 'na', 'tion']
    expect(hyphenate('DEclINATion')).toEqual(['DEc', 'lI', 'NA', 'Tion']);
    expect(hyphenate('deCLInatION')).toEqual(['deC', 'LI', 'na', 'tION']);
  });

  test('hyphenates typical words', () => {
    expect(hyphenate('hyphenation')).toEqual(['hy', 'phen', 'ation']);
    expect(hyphenate('HyPhEnAtIoN')).toEqual(['Hy', 'PhEn', 'AtIoN']);
    expect(hyphenate('computer')).toEqual(['com', 'put', 'er']);
    expect(hyphenate('COMPUTER')).toEqual(['COM', 'PUT', 'ER']);
  });

  test('returns correct tokens for edge cases', () => {
    expect(hyphenate('')).toEqual(['']);
    expect(hyphenate(space.repeat(5))).toEqual([space.repeat(5)]);
  });

  test('handles characters that arewords that are not in the dictionary', () => {
    expect(hyphenate('qwertyuiop')).toEqual(['qw', 'er', 'tyuiop']);
  });
  // Already covered above
});
