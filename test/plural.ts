import 'mocha';
import { expect } from 'chai';
import plural     from '../src/plural';

//TODO we need more comprehensive testing

describe(
    'plural',
    () => {
        it(
            'should handle simple plurals',
            () => {
                expect(plural('book')).to.equal('books');
            }
        );
    }
);
