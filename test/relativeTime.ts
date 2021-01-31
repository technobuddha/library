import 'mocha';
import { expect }   from 'chai';
import relativeTime from '../src/relativeTime';
import addTime      from '../src/addTime';

describe(
    'relativeTime',
    () => {
        it(
            'should detect invalid dates',
            () => {
                const now = new Date();

                expect(relativeTime(addTime(now, { hours: 2, minutes: 30 }), now)).to.equal('2 hours 30 minutes from now');
            }
        );
    }
);
