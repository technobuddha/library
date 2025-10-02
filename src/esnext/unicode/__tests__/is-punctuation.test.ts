import { isPunctuation } from '../is-punctuation.ts';
import { empty, space } from '../unicode.ts';

describe('isPunctuation', () => {
  test('should detect punctuation', () => {
    expect(isPunctuation('.')).toBeTrue();
    expect(isPunctuation('---')).toBeTrue();
    expect(isPunctuation(space)).toBeFalse();
    expect(isPunctuation(empty)).toBeFalse();
    expect(isPunctuation('hockey puck')).toBeFalse();
    expect(isPunctuation('$')).toBeFalse();
  });
});
