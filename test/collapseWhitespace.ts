import expect from '../util/expect';
import collapseWhitespace from '../src/collapseWhitespace';

describe(
    'collapseWhitespace',
    () => {
        test(
            'should collapse whitespace',
            () => {
                expect(collapseWhitespace('   now   is the\r\t\f\v\ntime      for \tall   good men   ')).toBe('now is the time for all good men');
            }
        );

        test(
            'should support the trim option',
            () => {
                expect(collapseWhitespace('   now   is the\r\t\f\v\ntime      for \tall   good men   ', { trim: false })).toBe(' now is the time for all good men ');
            }
        );
    }
);
