import 'mocha';
import { expect }  from 'chai';
import groupCode   from '../src/groupCode';

describe(
    'groupCode',
    () => {
        it(
            'should add select the proper sort order',
            () => {
                expect(groupCode('pink floyd')).to.equal('P');
                expect(groupCode('the beatles')).to.equal('B');
                expect(groupCode('"wierd" al yankovic')).to.equal('W');
                expect(groupCode('101 string')).to.equal('#');
                expect(groupCode('[Various Artists]')).to.equal('[]');
            }
        );
    }
);
