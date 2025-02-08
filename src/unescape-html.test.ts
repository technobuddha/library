import { space } from './constants.js';
import { unescapeHTML } from './unescape-html.js';

describe('unescapeHTML', () => {
  test('should unescape basic characters', () => {
    expect(unescapeHTML('&quot;&amp;&apos;&lt;&gt;')).toBe('"&\'<>');
  });

  test('should unescape control characters', () => {
    expect(unescapeHTML('&#0;')).toBe('\0');
    expect(unescapeHTML('&#1;')).toBe('\u0001');
    expect(unescapeHTML('&#127;')).toBe('\u007f');
    expect(unescapeHTML('&#159;')).toBe('\u009f');
  });

  test('should unescape hex control characters', () => {
    expect(unescapeHTML('&#x0;')).toBe('\0');
    expect(unescapeHTML('&#x1;')).toBe('\u0001');
    expect(unescapeHTML('&#x7F;')).toBe('\u007f');
    expect(unescapeHTML('&#x9f;')).toBe('\u009f');
  });

  test('should not unescape most ascii', () => {
    expect(unescapeHTML(space)).toBe(space);
    expect(unescapeHTML('ABCdef[~]')).toBe('ABCdef[~]');
  });

  test('should extended entities', () => {
    expect(unescapeHTML('ΑΒΓΔΕΖ')).toBe('ΑΒΓΔΕΖ');
    expect(unescapeHTML('&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;')).toBe('ΑΒΓΔΕΖ');
    expect(unescapeHTML('&Alpha;&Beta;ЖК')).toBe('ΑΒЖК');
  });

  test('should leave unknown entities', () => {
    expect(unescapeHTML('&unknown;')).toBe('&unknown;');
  });
});
