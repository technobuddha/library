import 'mocha';
import { expect }   from 'chai';
import getDayOfWeek from '../src/getDayOfWeek';
import { day }      from '../src/constants';

describe(
    'getDayOfWeek',
    () => {
        it(
            'should detect weekday',
            () => {
                expect(getDayOfWeek(new Date('4 Jul 2018'))).to.equal(3);
            }
        );

        it(
            'should accept alternate start of week',
            () => {
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.sunday    })).to.equal(3);
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.monday    })).to.equal(2);
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.tuesday   })).to.equal(1);
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.wednesday })).to.equal(0);
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.thursday  })).to.equal(6);
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.friday    })).to.equal(5);
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.saturday  })).to.equal(4);
            }
        );

        it(
            'should detect UTC weekday',
            () => {
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true })).to.equal(3);
            }
        );

        it(
            'should accept UTC alternate start of week',
            () => {
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.sunday        })).to.equal(3);
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.monday        })).to.equal(2);
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.tuesday    })).to.equal(1);
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.wednesday    })).to.equal(0);
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.thursday    })).to.equal(6);
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.friday        })).to.equal(5);
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.saturday    })).to.equal(4);
            }
        );
    }
);
