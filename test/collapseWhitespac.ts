import 'mocha';
import { expect } from 'chai';
import collapseWhitespace from '../src/collapseWhitespace';


describe(
    'collapseWhitespace',
    () => {
        it(
            'should collapse whitespace',
            () => {
                expect(collapseWhitespace('   now   is the\r\t\f\v\ntime      for \tall   good men   ')).to.equal('now is the time for all good men');
            }
        );

        it(
            'should support the trim option',
            () => {
                expect(collapseWhitespace('   now   is the\r\t\f\v\ntime      for \tall   good men   ', { trim: false })).to.equal(' now is the time for all good men ');
            }
        );
    }
);