import expect from '#util/expect';
import relativeTime from '../src/relativeTime';
import addTime      from '../src/addTime';
import formatDate   from '../src/formatDate';

describe(
    'relativeTime',
    () => {
        test(
            'should handle future dates',
            () => {
                const now = new Date();

                expect(relativeTime(addTime(now, { seconds: 1 }), now)).toBe('1 second from now');
                expect(relativeTime(addTime(now, { seconds: 2 }), now)).toBe('2 seconds from now');
                expect(relativeTime(addTime(now, { minutes: 1 }), now)).toBe('1 minute from now');
                expect(relativeTime(addTime(now, { minutes: 2 }), now)).toBe('2 minutes from now');
                expect(relativeTime(addTime(now, { hours: 1 }), now)).toBe('1 hour from now');
                expect(relativeTime(addTime(now, { hours: 2 }), now)).toBe('2 hours from now');
                expect(relativeTime(addTime(now, { days: 1 }), now)).toBe('1 day from now');
                expect(relativeTime(addTime(now, { days: 2 }), now)).toBe('2 days from now');
                expect(relativeTime(addTime(now, { days: 2 }), now)).toBe('2 days from now');
            }
        );

        test(
            'should handle past dates',
            () => {
                const now = new Date();

                expect(relativeTime(addTime(now, { seconds: -1 }), now)).toBe('1 second ago');
                expect(relativeTime(addTime(now, { seconds: -2 }), now)).toBe('2 seconds ago');
                expect(relativeTime(addTime(now, { minutes: -1 }), now)).toBe('1 minute ago');
                expect(relativeTime(addTime(now, { minutes: -2 }), now)).toBe('2 minutes ago');
                expect(relativeTime(addTime(now, { hours: -1 }), now)).toBe('1 hour ago');
                expect(relativeTime(addTime(now, { hours: -2 }), now)).toBe('2 hours ago');
                expect(relativeTime(addTime(now, { days: -1 }), now)).toBe('1 day ago');
                expect(relativeTime(addTime(now, { days: -2 }), now)).toBe('2 days ago');
            }
        );

        test(
            'should handle the distant future or past',
            () => {
                const now = new Date();
                const f31 = addTime(now, { days: 31 });
                const f91 = addTime(now, { days: 91 });
                const p31 = addTime(now, { days: -31 });
                const p91 = addTime(now, { days: -91 });

                expect(relativeTime(f31, now)).toBe(formatDate(f31, 'MMMM D'));
                expect(relativeTime(p31, now)).toBe(formatDate(p31, 'MMMM D'));
                expect(relativeTime(f91, now)).toBe(formatDate(f91, 'MMMM D YYYY'));
                expect(relativeTime(p91, now)).toBe(formatDate(p91, 'MMMM D YYYY'));
            }
        );

        test(
            'should handle compound date',
            () => {
                const now = new Date();

                expect(relativeTime(addTime(now, { minutes: 3, seconds: 30 }), now)).toBe('3 minutes 30 seconds from now');
                expect(relativeTime(addTime(now, { minutes: 4, seconds: 30 }), now)).toBe('4 minutes from now');
                expect(relativeTime(addTime(now, { hours: 3, minutes: 30 }), now)).toBe('3 hours 30 minutes from now');
                expect(relativeTime(addTime(now, { hours: 4, minutes: 30 }), now)).toBe('4 hours from now');
                expect(relativeTime(addTime(now, { days: 3, hours: 12 }), now)).toBe('3 days 12 hours from now');
                expect(relativeTime(addTime(now, { days: 4, hours: 12 }), now)).toBe('4 days from now');
            }
        );

        test(
            'should handle only 2 levels',
            () => {
                const now = new Date();

                expect(relativeTime(addTime(now, { hours: 3, minutes: 30, seconds: 30 }), now)).toBe('3 hours 30 minutes from now');
                expect(relativeTime(addTime(now, { days: 3, hours: 12, minutes: 30 }), now)).toBe('3 days 12 hours from now');
            }
        );

        test(
            'should handle today,tomorrow and yesterday',
            () => {
                const now = new Date();
                const f1 = addTime(now, { days: 1 });
                const f2 = addTime(now, { days: 2 });
                const p1 = addTime(now, { days: -1 });
                const p2 = addTime(now, { days: -2 });

                expect(relativeTime(now, now, { todayTomorrowYesterday: true })).toBe(`today ${formatDate(now, 'H:mm TT')} - now`);
                expect(relativeTime(f1, now, { todayTomorrowYesterday: true })).toBe(`tomorrow ${formatDate(now, 'H:mm TT')} - 1 day from now`);
                expect(relativeTime(p1, now, { todayTomorrowYesterday: true })).toBe(`yesterday ${formatDate(now, 'H:mm TT')} - 1 day ago`);
                expect(relativeTime(f2, now, { todayTomorrowYesterday: true })).toBe('2 days from now');
                expect(relativeTime(p2, now, { todayTomorrowYesterday: true })).toBe('2 days ago');
            }
        );
    }
);
