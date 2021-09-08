import expect from '@util/expect';
import parseDate  from '../src/parseDate';

describe(
    'parseDate',
    () => {
        test(
            'should parse mdy (num)',
            () => {
                expect(parseDate('06012021').toString()).toBe(new Date('1 Jun 2021').toString());
            }
        );

        test(
            'should parse ymd (num)',
            () => {
                expect(parseDate('20210601').toString()).toBe(new Date('1 Jun 2021').toString());
            }
        );

        test(
            'should parse mdy (str)',
            () => {
                expect(parseDate('Jun012021').toString()).toBe(new Date('1 Jun 2021').toString());
            }
        );

        test(
            'should parse dmy (str)',
            () => {
                expect(parseDate('01Jun2021').toString()).toBe(new Date('1 Jun 2021').toString());
            }
        );

        test(
            'should parse ymd (str)',
            () => {
                expect(parseDate('2021Jun01').toString()).toBe(new Date('1 Jun 2021').toString());
            }
        );

        test(
            'should parse ydm (str)',
            () => {
                expect(parseDate('202101Jun').toString()).toBe(new Date('1 Jun 2021').toString());
            }
        );

        test(
            'should parse m (num)',
            () => {
                expect(parseDate('06').toString()).toBe(new Date('1 Jun 1000').toString());
            }
        );

        test(
            'should parse m (str)',
            () => {
                expect(parseDate('Jun').toString()).toBe(new Date('1 Jun 1000').toString());
            }
        );

        test(
            'should parse my (num)',
            () => {
                expect(parseDate('062021').toString()).toBe(new Date('1 Jun 2021').toString());
            }
        );

        test(
            'should parse ym (num)',
            () => {
                expect(parseDate('202106').toString()).toBe(new Date('1 Jun 2021').toString());
            }
        );

        test(
            'should parse my (str)',
            () => {
                expect(parseDate('Jun2021').toString()).toBe(new Date('1 Jun 2021').toString());
            }
        );

        test(
            'should parse ym (str)',
            () => {
                expect(parseDate('2021Jun').toString()).toBe(new Date('1 Jun 2021').toString());
            }
        );

        test(
            'should parse y (num)',
            () => {
                expect(parseDate('2021').toString()).toBe(new Date('1 Jan 2021').toString());
            }
        );

        test(
            'should fall back to Date parsing',
            () => {
                const now = new Date().toString();
                expect(parseDate(now).toString()).toBe(now);
            }
        );

        test(
            'should allow times on some formats',
            () => {
                expect(parseDate('06012021T01:02:03.456').toString()).toBe(new Date('1 Jun 2021 01:02:03.456').toString());
            }
        );

        test(
            'should allow am/pm on times',
            () => {
                expect(parseDate('06012021T12:02:03.456am').toString()).toBe(new Date('1 Jun 2021 00:02:03.456').toString());
                expect(parseDate('06012021T01:02:03.456pm').toString()).toBe(new Date('1 Jun 2021 13:02:03.456').toString());
            }
        );

        test(
            'should allow timezone',
            () => {
                expect(parseDate('06012021T01:02Z').toUTCString()).toBe(new Date('2021-06-01T01:02Z').toUTCString());
                expect(parseDate('06012021T01:02GMT-01').toUTCString()).toBe(new Date('2021-06-01T02:02Z').toUTCString());
                expect(parseDate('06012021T01:02GMT-01:30').toUTCString()).toBe(new Date('2021-06-01T01:32Z').toUTCString());
                expect(parseDate('06012021T01:02GMT-10').toUTCString()).toBe(new Date('2021-06-01T11:02Z').toUTCString());
            }
        );
    }
);
