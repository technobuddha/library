// import expect from '#util/expect';
import isPunctuation from './is-punctuation';
import { space, empty } from './constants';

describe('isPunctuation', () => {
  test('should detect punctuation', () => {
    expect(isPunctuation('.')).toBe(true);
    expect(isPunctuation('---')).toBe(true);
    expect(isPunctuation(space)).toBe(false);
    expect(isPunctuation(empty)).toBe(false);
    expect(isPunctuation('hockey puck')).toBe(false);
    expect(isPunctuation('$')).toBe(false);
  });
});
