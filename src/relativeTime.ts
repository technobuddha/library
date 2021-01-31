import { space, ticksPerSecond, secondsPerMinute, secondsPerHour, secondsPerDay } from './constants';
import isSameDay   from './isSameDay';
import formatDate  from './formatDate';
import addTime     from './addTime';
import plural      from './plural';

export type Options = {
    /** Describe the time difference as a time on a nearby day  */
    todayTomorrowYesterday?: boolean;
    /** Passed to {@link formatDate} to display a time */
    timeFormat?: string;
    /** Passed to {@link formatSate} to display a year, month and day */
    ymdFormat?: string;
    /** Passed to {@link formatDate} to dislay a month and day */
    mdFormat?: string;
};

/**
 * Describe the difference between two dates in a simpe format
 *
 * @param input The date
 * @param relativeTo The date to compare to
 * @param __namedParameters see {@link Options}
 * @returns string describing the time difference between the two dates
 */
export function relativeTime(
    input: Date,
    relativeTo: Date,
    {
        todayTomorrowYesterday = false,
        timeFormat = 'H:mm AMPM',
        ymdFormat = 'MMMM D YYYY',
        mdFormat = 'MMMM D',
    }:  Options = {}
) {
    const text  = [] as string[];

    if(todayTomorrowYesterday) {
        if(isSameDay(input, relativeTo))
            text.push(`today, ${formatDate(input, timeFormat)}`);
        else
        if(isSameDay(input, addTime(relativeTo, { days: 1 })))
            text.push(`tomorrow, ${formatDate(input, timeFormat)}`);
        else
        if(isSameDay(input, addTime(relativeTo, { days: -1 })))
            text.push(`yesterday, ${formatDate(input, timeFormat)}`);
        else
            text.push(`${formatDate(input, ymdFormat)} ${formatDate(input, timeFormat)}`);
    } else {
        let   diff  = (input.getTime() - relativeTo.getTime()) / ticksPerSecond;
        let   sign  = 1;

        if(diff < 0) { sign = -1; diff = Math.abs(diff); }

        const d = Math.floor((diff) / secondsPerDay);
        const h = Math.floor((diff - d * secondsPerDay) / secondsPerHour);
        const m = Math.floor((diff - d * secondsPerDay - h * secondsPerHour) / secondsPerMinute);
        const s = Math.floor((diff - d * secondsPerDay - h * secondsPerHour - m * secondsPerMinute));
        if(d > 90) {
            text.push(formatDate(input, ymdFormat));
            sign = 0;
        } else if(d > 30) {
            text.push(formatDate(input, mdFormat));
            sign = 0;
        } else if(d > 0) {
            text.push(plural('day', d));
            if(d < 4 && h > 0)
                text.push(plural('hour', h));
        } else if(h > 0) {
            text.push(plural('hour', h));
            if(h < 4 && m > 0)
                text.push(plural('minute', m));
        } else if(m > 0) {
            text.push(plural('minute', m));
            if(m < 4 && s > 0)
                text.push(plural('second', s));
        } else { text.push(plural('second', s)); }

        if(sign === -1)   text.push('ago');
        if(sign === 1)    text.push('from now');
    }

    return text.join(space);
}

export default relativeTime;
