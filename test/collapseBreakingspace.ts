import expect from '@util/expect';
import collapseBreakingspace from '../src/collapseBreakingspace';

describe(
    'collapseBreakingspace',
    () => {
        test(
            'should collapse Breakingspace',
            () => {
                expect(collapseBreakingspace('   now   is the\r\t\f\v\ntime      for \tall   good men   ')).toBe('now is the \f\v time for all good men');
            }
        );

        test(
            'should support the trim option',
            () => {
                expect(collapseBreakingspace('   now   is the\r\t\f\v\ntime      for \tall   good men   ', { trim: false })).toBe(' now is the \f\v time for all good men ');
            }
        );
    }
);
