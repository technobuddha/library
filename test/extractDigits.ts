import 'mocha';
import { expect }    from 'chai';
import extractDigits from '../extractDigits';
import { empty }     from '../constants';

describe(
    'extractDigits',
    () => {
        it(
            'should add Suffixes when needed',
            () => {
                expect(extractDigits('abcdef')).to.equal(empty);
                expect(extractDigits('a0b1c2d3e4')).to.equal('01234');
                expect(extractDigits('123')).to.equal('123');
                expect(extractDigits(empty)).to.equal(empty);
            }
        );
    }
);

