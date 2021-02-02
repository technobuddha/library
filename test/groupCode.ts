import expect from '../util/expect';
import groupCode   from '../src/groupCode';

describe(
    'groupCode',
    () => {
        it(
            'should add select the proper sort order',
            () => {
                expect(groupCode('pink floyd')).toBe('P');
                expect(groupCode('the beatles')).toBe('B');
                expect(groupCode('"wierd" al yankovic')).toBe('W');
                expect(groupCode('101 string')).toBe('#');
                expect(groupCode('[Various Artists]')).toBe('[]');
            }
        );
    }
);
