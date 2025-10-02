import { initials } from '../initials.ts';

describe('initials', () => {
  test('returns initials for a simple two-word name', () => {
    expect(initials('John Doe')).toBe('JD');
  });

  test('returns initials for a three-word name', () => {
    expect(initials('Ada Lovelace Byron')).toBe('ALB');
  });

  test('returns initials for a single word', () => {
    expect(initials('Plato')).toBe('P');
  });

  test('returns empty string for empty input', () => {
    expect(initials('')).toBe('');
  });

  test('handles multiple spaces between words', () => {
    expect(initials('  Alan   Turing  ')).toBe('AT');
  });

  test('handles non-letter characters', () => {
    expect(initials('Elon R. Musk')).toBe('ERM');
  });

  test('handles lowercase input', () => {
    expect(initials('grace hopper')).toBe('GH');
  });

  test('handles mixed case input', () => {
    expect(initials('Linus Torvalds')).toBe('LT');
  });

  test('handles hyphenated names', () => {
    expect(initials('Jean-Luc Picard')).toBe('JLP');
  });

  test('handles names with apostrophes', () => {
    expect(initials("O'Connor Patrick")).toBe('OCP');
  });

  test('handles unicode letters', () => {
    expect(initials('René Descartes')).toBe('RD');
  });

  test('ignores non-word characters at the start', () => {
    expect(initials('!@# $%^')).toBe('');
  });
});
