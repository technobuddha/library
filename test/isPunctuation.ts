import 'mocha';
import { expect }       from 'chai';
import isPunctuation    from '../src/isPunctuation';
import { space, empty } from '../src/constants';

describe(
    'isPunctuation',
    () => {
        it(
            'should detect punctuation',
            () => {
                expect(isPunctuation('.')).to.equal(true);
                expect(isPunctuation('---')).to.equal(true);
                expect(isPunctuation(space)).to.equal(false);
                expect(isPunctuation(empty)).to.equal(false);
                expect(isPunctuation('hockey puck')).to.equal(false);
                expect(isPunctuation('$')).to.equal(false);
            }
        );
    }
);
