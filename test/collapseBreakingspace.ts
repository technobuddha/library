import 'mocha';
import { expect } from 'chai';
import collapseBreakingspace from '../src/collapseBreakingspace';

describe(
    'collapseBreakingspace',
    () => {
        it(
            'should collapse Breakingspace',
            () => {
                expect(collapseBreakingspace('   now   is the\r\t\f\v\ntime      for \tall   good men   ')).to.equal('now is the \f\v time for all good men');
            }
        );

        it(
            'should support the trim option',
            () => {
                expect(collapseBreakingspace('   now   is the\r\t\f\v\ntime      for \tall   good men   ', { trim: false })).to.equal(' now is the \f\v time for all good men ');
            }
        );
    }
);

