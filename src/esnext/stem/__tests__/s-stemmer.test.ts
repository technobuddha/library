import { stem } from '../stem.ts';

const sStemmer = (input: string): string => stem(input, 's');

describe('sStemmer', () => {
  test('does not stem esExceptions endings', () => {
    const esExceptions = [
      'xes',
      'ses',
      'zes',
      'ches',
      'shes',
      'oes',
      'ges',
      'tes',
      'ees',
      'ves',
      'ces',
      'pes',
      'les',
      'mes',
      'nes',
      'res',
      'fes',
      'hes',
      'kes',
      'wes',
      'yes',
    ];
    for (const ending of esExceptions) {
      const word = `test${ending}`;
      expect(sStemmer(word)).toBe(word);
    }
  });

  test('removes plural s from regular words', () => {
    expect(sStemmer('cats')).toBe('cat');
    expect(sStemmer('dogs')).toBe('dog');
    expect(sStemmer('books')).toBe('book');
  });

  test('does not stem short words', () => {
    expect(sStemmer('is')).toBe('is');
    expect(sStemmer('as')).toBe('as');
  });

  test('does not stem words ending in us or ss', () => {
    expect(sStemmer('bonus')).toBe('bonus');
    expect(sStemmer('glass')).toBe('glass');
  });

  test('handles words ending in es', () => {
    expect(sStemmer('foxes')).toBe('foxes');
    expect(sStemmer('boxes')).toBe('boxes');
    expect(sStemmer('babies')).toBe('baby');
    expect(sStemmer('ponies')).toBe('pony');
    expect(sStemmer('cases')).toBe('cases');
    expect(sStemmer('heroes')).toBe('heroes');
  });

  test('returns word unchanged if no s ending', () => {
    expect(sStemmer('dog')).toBe('dog');
    expect(sStemmer('cat')).toBe('cat');
  });
});
