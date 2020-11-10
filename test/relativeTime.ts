import 'mocha';
import { expect }   from 'chai';
import relativeTime from '../relativeTime';
import addTime      from '../addTime';

describe(
    'relativeTime',
    () => {
        it(
            'should detect invalid dates',
            () => {
                const now = new Date();

                expect(relativeTime(addTime(now, { hours: 2, minutes: 30 }), { relativeTo: now })).to.equal('2 hours 30 minutes from now');
            }
        );
    }
);




