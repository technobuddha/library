import expect from '@util/expect';
import isPunctuation    from '../src/isPunctuation';
import { space, empty } from '../src/constants';

describe(
    'isPunctuation',
    () => {
        test(
            'should detect punctuation',
            () => {
                expect(isPunctuation('.')).toBe(true);
                expect(isPunctuation('---')).toBe(true);
                expect(isPunctuation(space)).toBe(false);
                expect(isPunctuation(empty)).toBe(false);
                expect(isPunctuation('hockey puck')).toBe(false);
                expect(isPunctuation('$')).toBe(false);
            }
        );
    }
);
