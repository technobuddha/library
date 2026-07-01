import { correctMSWord } from '../correct-ms-word.ts';

describe('correctMSWord', () => {
  test('should handle special characters', () => {
    expect(correctMSWord('\u{A0}')).toBe(' ');
    expect(correctMSWord('–—')).toBe('--');
    expect(correctMSWord('‘’')).toBe("''");
    expect(correctMSWord('‹›')).toBe('<>');
    expect(correctMSWord('“”')).toBe('""');
    expect(correctMSWord('«»')).toBe('<<>>');
    expect(correctMSWord('©')).toBe('(c)');
    expect(correctMSWord('®')).toBe('(r)');
    expect(correctMSWord('¼')).toBe('1/4');
    expect(correctMSWord('½')).toBe('1/2');
    expect(correctMSWord('¾')).toBe('3/4');
    expect(correctMSWord('…')).toBe('...');
    expect(correctMSWord('€')).toBe('(e)');
    expect(correctMSWord('←')).toBe('<--');
    expect(correctMSWord('→')).toBe('-->');
    expect(correctMSWord('⇐')).toBe('<==');
    expect(correctMSWord('⇒')).toBe('==>');
    expect(correctMSWord('⇔')).toBe('<=>');
    expect(correctMSWord('☹')).toBe(':(');
    expect(correctMSWord('☺')).toBe(':)');
  });

  test('should handle normal characters', () => {
    expect(correctMSWord('normal')).toBe('normal');
  });
});
