import expect from '@util/expect';
import TimeSpan from '../src/time-span';

describe(
    'time-span',
    () => {
        test(
            'construct no args',
            () => {
                const ts = new TimeSpan();
                expect(ts.milliseconds).toBe(0);
                expect(ts.seconds).toBe(0);
                expect(ts.minutes).toBe(0);
                expect(ts.hours).toBe(0);
                expect(ts.days).toBe(0);
            }
        );

        test(
            'construct 1 args',
            () => {
                const ts = new TimeSpan(100);
                expect(ts.milliseconds).toBe(100);
                expect(ts.seconds).toBe(0);
                expect(ts.minutes).toBe(0);
                expect(ts.hours).toBe(0);
                expect(ts.days).toBe(0);
            }
        );

        test(
            'construct 3 args',
            () => {
                const ts = new TimeSpan(1, 2, 3);
                expect(ts.milliseconds).toBe(0);
                expect(ts.seconds).toBe(3);
                expect(ts.minutes).toBe(2);
                expect(ts.hours).toBe(1);
                expect(ts.days).toBe(0);
            }
        );

        test(
            'construct 4 args',
            () => {
                const ts = new TimeSpan(1, 2, 3, 4);
                expect(ts.milliseconds).toBe(0);
                expect(ts.seconds).toBe(4);
                expect(ts.minutes).toBe(3);
                expect(ts.hours).toBe(2);
                expect(ts.days).toBe(1);
            }
        );

        test(
            'construct 5 args',
            () => {
                const ts = new TimeSpan(1, 2, 3, 4, 5);
                expect(ts.milliseconds).toBe(5);
                expect(ts.seconds).toBe(4);
                expect(ts.minutes).toBe(3);
                expect(ts.hours).toBe(2);
                expect(ts.days).toBe(1);
            }
        );

        test(
            'construct string args',
            () => {
                const ts = new TimeSpan('1');
                expect(ts.milliseconds).toBe(0);
                expect(ts.seconds).toBe(1);
                expect(ts.minutes).toBe(0);
                expect(ts.hours).toBe(0);
                expect(ts.days).toBe(0);
            }
        );

        test(
            'construct string args',
            () => {
                const ts = new TimeSpan('1.2');
                expect(ts.milliseconds).toBe(200);
                expect(ts.seconds).toBe(1);
                expect(ts.minutes).toBe(0);
                expect(ts.hours).toBe(0);
                expect(ts.days).toBe(0);
            }
        );

        test(
            'construct string args',
            () => {
                const ts = new TimeSpan('1:02');
                expect(ts.milliseconds).toBe(0);
                expect(ts.seconds).toBe(2);
                expect(ts.minutes).toBe(1);
                expect(ts.hours).toBe(0);
                expect(ts.days).toBe(0);
            }
        );

        test(
            'construct string args',
            () => {
                const ts = new TimeSpan('1:02');
                expect(ts.milliseconds).toBe(0);
                expect(ts.seconds).toBe(2);
                expect(ts.minutes).toBe(1);
                expect(ts.hours).toBe(0);
                expect(ts.days).toBe(0);
            }
        );

        test(
            'construct string args',
            () => {
                const ts = new TimeSpan('1:02:03');
                expect(ts.milliseconds).toBe(0);
                expect(ts.seconds).toBe(3);
                expect(ts.minutes).toBe(2);
                expect(ts.hours).toBe(1);
                expect(ts.days).toBe(0);
            }
        );

        test(
            'construct string args',
            () => {
                const ts = new TimeSpan('1:02:03:04');
                expect(ts.milliseconds).toBe(0);
                expect(ts.seconds).toBe(4);
                expect(ts.minutes).toBe(3);
                expect(ts.hours).toBe(2);
                expect(ts.days).toBe(1);
            }
        );

        test(
            'construct string args',
            () => {
                const ts = new TimeSpan('-1:02:03:04');
                expect(ts.milliseconds).toBe(-0);
                expect(ts.seconds).toBe(-4);
                expect(ts.minutes).toBe(-3);
                expect(ts.hours).toBe(-2);
                expect(ts.days).toBe(-1);
            }
        );

        test(
            'construct string args',
            () => {
                const ts = new TimeSpan('unknown');
                expect(ts.milliseconds).toBe(0);
                expect(ts.seconds).toBe(0);
                expect(ts.minutes).toBe(0);
                expect(ts.hours).toBe(0);
                expect(ts.days).toBe(0);
            }
        );

        test(
            'unit getters',
            () => {
                const ts = new TimeSpan(1, 2, 3, 4, 5);
                expect(ts.ticks).toBe(93784005);
                expect(ts.totalDays).toBeCloseTo(1.0854630208333333);
                expect(ts.totalHours).toBeCloseTo(26.051112);
                expect(ts.totalMinutes).toBeCloseTo(1563.06675);
                expect(ts.totalSeconds).toBeCloseTo(93784.005);
                expect(ts.totalMilliseconds).toBe(93784005);
            }
        );

        test(
            'format',
            () => {
                const ts = new TimeSpan(1, 2, 3, 4, 5);
                expect(ts.format('d:h:m:s.f')).toBe('1:2:3:4.005');
                expect(ts.format('dd:hh:mm:ss.ff')).toBe('01:02:03:04.005');
                expect(ts.format('dd"d"hh:mm:ss.ff')).toBe('01d02:03:04.005');
            }
        );

        test(
            'toString',
            () => {
                expect(new TimeSpan(1, 2, 3, 4, 5).toString()).toBe('1d02:03:04.005');
                expect(new TimeSpan(0, 2, 3, 4, 5).toString()).toBe('2:03:04.005');
                expect(new TimeSpan(0, 0, 3, 4, 5).toString()).toBe('3:04.005');
                expect(new TimeSpan(1, 2, 3, 4, 0).toString()).toBe('1d02:03:04');
                expect(new TimeSpan(0, 2, 3, 4, 0).toString()).toBe('2:03:04');
                expect(new TimeSpan(0, 0, 3, 4, 0).toString()).toBe('3:04');
            }
        );

        test(
            'add',
            () => {
                const ts = new TimeSpan(1, 2, 3, 4, 5);
                const ts2 = ts.add(ts);
                expect(ts2.milliseconds).toBe(10);
                expect(ts2.seconds).toBe(8);
                expect(ts2.minutes).toBe(6);
                expect(ts2.hours).toBe(4);
                expect(ts2.days).toBe(2);
            }
        );

        test(
            'add',
            () => {
                const ts1 = new TimeSpan(1, 2, 3, 4, 5);
                const ts2 = new TimeSpan(1, 2, 3, 4, 0);
                expect(TimeSpan.compare(ts1, ts1)).toBe(0);
                expect(TimeSpan.compare(ts1, ts2)).toBe(1);
                expect(TimeSpan.compare(ts2, ts1)).toBe(-1);
            }
        );
    }
);
