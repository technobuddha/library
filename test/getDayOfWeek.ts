import expect from '../util/expect';
import getDayOfWeek from '../src/getDayOfWeek';
import { day }      from '../src/constants';

describe(
    'getDayOfWeek',
    () => {
        test(
            'should detect weekday',
            () => {
                expect(getDayOfWeek(new Date('4 Jul 2018'))).toBe(3);
            }
        );

        test(
            'should accept alternate start of week',
            () => {
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.sunday    })).toBe(3);
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.monday    })).toBe(2);
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.tuesday   })).toBe(1);
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.wednesday })).toBe(0);
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.thursday  })).toBe(6);
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.friday    })).toBe(5);
                expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.saturday  })).toBe(4);
            }
        );

        test(
            'should detect UTC weekday',
            () => {
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true })).toBe(3);
            }
        );

        test(
            'should accept UTC alternate start of week',
            () => {
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.sunday        })).toBe(3);
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.monday        })).toBe(2);
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.tuesday    })).toBe(1);
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.wednesday    })).toBe(0);
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.thursday    })).toBe(6);
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.friday        })).toBe(5);
                expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { UTC: true, startOfWeek: day.saturday    })).toBe(4);
            }
        );
    }
);
