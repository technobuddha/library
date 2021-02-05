import expect from '../util/expect';
import relativeTime from '../src/relativeTime';
import addTime      from '../src/addTime';

describe(
    'relativeTime',
    () => {
        test(
            'should detect invalid dates',
            () => {
                const now = new Date();

                expect(relativeTime(addTime(now, { hours: 2, minutes: 30 }), now)).toBe('2 hours 30 minutes from now');
            }
        );
    }
);
