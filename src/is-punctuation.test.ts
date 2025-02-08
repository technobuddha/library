import { empty, space } from './constants.js';
import { isPunctuation } from './is-punctuation.js';

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
