import expect from '#util/expect';
import formatDate from '../src/formatDate';
import getTimezone from '../src/getTimezone';

describe(
    'formatNumber',
    () => {
        test(
            'support the h format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'h')).toBe('5');
            }
        );

        test(
            'support the hh format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'hh')).toBe('05');
            }
        );

        test(
            'support the H format',
            () => {
                expect(formatDate(new Date('1969-07-20T15:17'), 'H')).toBe('3');
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'H')).toBe('5');
                expect(formatDate(new Date('2020-01-01T00:00:00'), 'H')).toBe('12');
            }
        );

        test(
            'support the HH format',
            () => {
                expect(formatDate(new Date('1969-07-20T15:17'), 'HH')).toBe('03');
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'HH')).toBe('05');
                expect(formatDate(new Date('2020-01-01T00:00:00'), 'HH')).toBe('12');
            }
        );

        test(
            'support the m format',
            () => {
                expect(formatDate(new Date('2021-03-04T01:02:03'), 'm')).toBe('2');
            }
        );

        test(
            'support the mm format',
            () => {
                expect(formatDate(new Date('1969-07-20T15:17:00'), 'mm')).toBe('17');
                expect(formatDate(new Date('2021-12-21T01:02:03'), 'mm')).toBe('02');
            }
        );

        test(
            'support the s format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29:45'), 's')).toBe('45');
                expect(formatDate(new Date('2021-12-21T01:02:03'), 's')).toBe('3');
            }
        );

        test(
            'support the ss format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'ss')).toBe('45');
                expect(formatDate(new Date('2021-12-21T01:02:03'), 'ss')).toBe('03');
            }
        );

        test(
            'support the sss format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'sss')).toBe('19785');
                expect(formatDate(new Date('2021-12-21T01:02:03'), 'sss')).toBe('3723');
            }
        );

        test(
            'support the f format',
            () => {
                expect(formatDate(new Date('2021-12-21T01:02:03.004'), 'f')).toBe('4');
            }
        );

        test(
            'support the ff format',
            () => {
                expect(formatDate(new Date('2021-12-21T01:02:03.004'), 'ff')).toBe('004');
            }
        );

        test(
            'support the YY format',
            () => {
                expect(formatDate(new Date('2021-12-21T01:02:03.004'), 'YY')).toBe('21');
                expect(formatDate(new Date(-1, 1, 1), 'YY')).toBe('02');
            }
        );

        test(
            'support the YYYY format',
            () => {
                expect(formatDate(new Date('2021-12-21T01:02:03.004'), 'YYYY')).toBe('2021');
                expect(formatDate(new Date(-1, 1, 1), 'YYYY')).toBe('0002');
            }
        );

        test(
            'support the M format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'M')).toBe('7');
                expect(formatDate(new Date('2021-12-21T01:02:03'), 'M')).toBe('12');
            }
        );

        test(
            'support the MM format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'MM')).toBe('07');
                expect(formatDate(new Date('2021-12-21T01:02:03'), 'MM')).toBe('12');
            }
        );

        test(
            'support the MMM format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'MMM')).toBe('Jul');
                expect(formatDate(new Date('2021-12-21T01:02:03'), 'MMM')).toBe('Dec');
            }
        );

        test(
            'support the MMMM format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'MMMM')).toBe('July');
                expect(formatDate(new Date('2021-12-21T01:02:03'), 'MMMM')).toBe('December');
            }
        );

        test(
            'support the D format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'D')).toBe('16');
                expect(formatDate(new Date('2021-03-04T01:02:03'), 'D')).toBe('4');
            }
        );

        test(
            'support the DD format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'DD')).toBe('16');
                expect(formatDate(new Date('2021-03-04T01:02:03'), 'DD')).toBe('04');
            }
        );

        test(
            'support the TH format',
            () => {
                expect(formatDate(new Date('2021-03-02T01:02:03'), 'TH')).toBe('2nd');
                expect(formatDate(new Date('2021-03-04T01:02:03'), 'TH')).toBe('4th');
            }
        );

        test(
            'support the d format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29'), 'd')).toBe('M');
                expect(formatDate(new Date('1969-07-20T15:17'), 'd')).toBe('U');
            }
        );

        test(
            'support the dd format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29'), 'dd')).toBe('Mo');
                expect(formatDate(new Date('1969-07-20T15:17'), 'dd')).toBe('Su');
            }
        );

        test(
            'support the ddd format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29'), 'ddd')).toBe('Mon');
                expect(formatDate(new Date('1969-07-20T15:17'), 'ddd')).toBe('Sun');
            }
        );

        test(
            'support the dddd format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29'), 'dddd')).toBe('Monday');
                expect(formatDate(new Date('1969-07-20T15:17'), 'dddd')).toBe('Sunday');
            }
        );

        test(
            'support the O format',
            () => {
                expect(formatDate(new Date('2020-01-01T12:23'), 'O')).toBe('1');
                expect(formatDate(new Date('1969-07-20T15:17'), 'O')).toBe('201');
            }
        );

        test(
            'support the OO format',
            () => {
                expect(formatDate(new Date('2020-01-01T12:23'), 'OO')).toBe('001');
                expect(formatDate(new Date('1969-07-20T15:17'), 'OO')).toBe('201');
            }
        );

        test(
            'support the Wy format',
            () => {
                expect(formatDate(new Date('2001-01-01T12:23'), 'Wy')).toBe('2001');
                expect(formatDate(new Date('1969-07-20T15:17'), 'Wy')).toBe('1969');
            }
        );

        test(
            'support the Ww format',
            () => {
                expect(formatDate(new Date('2001-01-01T12:23'), 'Ww')).toBe('1');
                expect(formatDate(new Date('1969-07-20T15:17'), 'Ww')).toBe('29');
            }
        );

        test(
            'support the Www format',
            () => {
                expect(formatDate(new Date('2001-01-01T12:23'), 'Www')).toBe('01');
                expect(formatDate(new Date('1969-07-20T15:17'), 'Www')).toBe('29');
            }
        );

        test(
            'support the Wd format',
            () => {
                expect(formatDate(new Date('2001-01-01T12:23'), 'Wd')).toBe('1');
                expect(formatDate(new Date('1969-07-20T15:17'), 'Wd')).toBe('0');
            }
        );

        test(
            'support the TZ format',
            () => {
                const d = new Date('1969-07-20T15:17');
                const t = getTimezone(d);
                expect(formatDate(d, 'TZ')).toBe(t);
            }
        );

        test(
            'support the GMT format',
            () => {
                const d = new Date('1969-07-20T15:17');
                const t = getTimezone(d, { GMT: true });
                expect(formatDate(d, 'GMT')).toBe(t);
            }
        );

        test(
            'support the AM format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29'), 'AM')).toBe('AM');
                expect(formatDate(new Date('1969-07-20T15:17'), 'AM')).toBe('');
            }
        );

        test(
            'support the PM format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29'), 'PM')).toBe('');
                expect(formatDate(new Date('1969-07-20T15:17'), 'PM')).toBe('PM');
            }
        );

        test(
            'support the T format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29'), 'T')).toBe('A');
                expect(formatDate(new Date('1969-07-20T15:17'), 'T')).toBe('P');
            }
        );

        test(
            'support the TT format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29'), 'TT')).toBe('AM');
                expect(formatDate(new Date('1969-07-20T15:17'), 'TT')).toBe('PM');
            }
        );

        test(
            'support the AD format',
            () => {
                expect(formatDate(new Date(-5, 1, 1), 'AD')).toBe('');
                expect(formatDate(new Date(5, 1, 1),  'AD')).toBe('AD');
            }
        );

        test(
            'support the BC format',
            () => {
                expect(formatDate(new Date(-5, 1, 1), 'BC')).toBe('BC');
                expect(formatDate(new Date(5, 1, 1),  'BC')).toBe('');
            }
        );

        test(
            'support the CE format',
            () => {
                expect(formatDate(new Date(-5, 1, 1), 'CE')).toBe('');
                expect(formatDate(new Date(5, 1, 1),  'CE')).toBe('CE');
            }
        );

        test(
            'support the BCE format',
            () => {
                expect(formatDate(new Date(-5, 1, 1), 'BCE')).toBe('BCE');
                expect(formatDate(new Date(5, 1, 1),  'BCE')).toBe('');
            }
        );

        test(
            'support the EE format',
            () => {
                expect(formatDate(new Date(-5, 1, 1), 'EE')).toBe('BC');
                expect(formatDate(new Date(5, 1, 1),  'EE')).toBe('AD');
            }
        );

        test(
            'support the EEE format',
            () => {
                expect(formatDate(new Date(-5, 1, 1), 'EEE')).toBe('BCE');
                expect(formatDate(new Date(5, 1, 1),  'EEE')).toBe('CE');
            }
        );

        test(
            'support the J format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29'), 'J')).toBe('2431652');
                expect(formatDate(new Date('1969-07-20T15:17'), 'J')).toBe('2440423');
            }
        );

        test(
            'support the Q format',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29'), 'Q')).toBe('3');
                expect(formatDate(new Date('1969-07-20T15:17'), 'Q')).toBe('3');
            }
        );

        test(
            'support compound formatting',
            () => {
                expect(formatDate(new Date('1945-07-16T05:29:45'), 'MM/DD/YYYY HH:mm:ss TT')).toBe('07/16/1945 05:29:45 AM');
            }
        );

        test(
            'support UTC option',
            () => {
                expect(formatDate(new Date('2000-01-01T00:00:00Z'), 'hh', { UTC: true })).toBe('00');
            }
        );

        test(
            'support default',
            () => {
                expect(formatDate(new Date('2000-01-01T00:00:00'))).toBe('2000-01-01 00:00:00.000');
            }
        );

        test(
            'support default',
            () => {
                const d = new Date('2000-01-01T00:00:00Z');
                expect(formatDate(d, 'default', { UTC: true })).toBe('2000-01-01 00:00:00.000');
                expect(formatDate(d, 'rfc1123', { UTC: true })).toBe('Sat, 01 Jan 2000 00:00:00 GMT');
                expect(formatDate(d, 'asctime', { UTC: true })).toBe('Sat Jan 01 00:00:00');
                expect(formatDate(d, 'shortDate', { UTC: true })).toBe('1/1/00');
                expect(formatDate(d, 'mediumDate', { UTC: true })).toBe('Jan 1, 2000');
                expect(formatDate(d, 'longDate', { UTC: true })).toBe('January 1, 2000');
                expect(formatDate(d, 'fullDate', { UTC: true })).toBe('Saturday, January 1, 2000');
                expect(formatDate(d, 'shortTime', { UTC: true })).toBe('12:00 AM');
                expect(formatDate(d, 'shortDateTime', { UTC: true })).toBe('1/1/2000 12:00 AM');
                expect(formatDate(d, 'mediumTime', { UTC: true })).toBe('12:00:00 AM');
                expect(formatDate(d, 'mediumDateTime', { UTC: true })).toBe('Jan 1, 2000 12:00:00 AM');
                expect(formatDate(d, 'longTime', { UTC: true })).toBe('12:00:00 AM GMT');
                expect(formatDate(d, 'longDateTime', { UTC: true })).toBe('January 1, 2000 12:00:00 AM GMT');
                expect(formatDate(d, 'ISODate', { UTC: true })).toBe('2000-01-01');
                expect(formatDate(d, 'ISODateTime', { UTC: true })).toBe('2000-01-01T00:00:00');
                expect(formatDate(d, 'ISODateFull', { UTC: true })).toBe('2000-01-01T00:00:00.000');
                expect(formatDate(d, 'ISODateTimeZone', { UTC: true })).toBe('2000-01-01T00:00:00Z');
                expect(formatDate(d, 'ISODateFullZone', { UTC: true })).toBe('2000-01-01T00:00:00.000Z');
                expect(formatDate(d, 'ISOTime', { UTC: true })).toBe('00:00:00');
                expect(formatDate(d, 'ISOTimeFull', { UTC: true })).toBe('00:00:00.000');
                expect(formatDate(d, 'ISOTimeZone', { UTC: true })).toBe('00:00:00Z');
                expect(formatDate(d, 'ISOFullZone', { UTC: true })).toBe('00:00:00.000Z');
                expect(formatDate(d, 'ISOWeek', { UTC: true })).toBe('1999W52-6');
                expect(formatDate(d, 'ISOWeekTime', { UTC: true })).toBe('1999W52-6T00:00:00');
                expect(formatDate(d, 'ISOWeekFull', { UTC: true })).toBe('1999W52-6T00:00:00.000');
                expect(formatDate(d, 'ISOWeekTimeZone', { UTC: true })).toBe('1999W52-6T00:00:00Z');
                expect(formatDate(d, 'ISOWeekFullZone', { UTC: true })).toBe('1999W52-6T00:00:00.000Z');
                expect(formatDate(d, 'ISOOrdinal', { UTC: true })).toBe('2000-001');
                expect(formatDate(d, 'cookie', { UTC: true })).toBe('Saturday, 01 Jan 2000 00:00:00 GMT');
            }
        );
    }
);
