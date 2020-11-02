import { space, ticksPerSecond, secondsPerMinute, secondsPerHour, secondsPerDay } from './constants';
import isSameDay           from './isSameDay';
import formatDate          from './formatDate';
import addTime             from './addTime';
import plural              from './plural';

type Options = {
    relativeTo?: Date,
    todayTomorrowYesterday?: boolean,
    agoFromNow?: boolean,
    timeFormat?: string,
    ymdFormat?: string,
    mdFormat?: string,
}

export function relativeTime(
    input: Date,
    {
        relativeTo = new Date(),
        todayTomorrowYesterday = false,
        agoFromNow = true,
        timeFormat = 'H:mm AMPM',
        ymdFormat = 'MMMM D YYYY',
        mdFormat = 'MMMM D',
    }:  Options = {}
)
{
    const text  = [] as string[];
    let   diff  = (input.getTime() - relativeTo.getTime()) / ticksPerSecond;
    let   sign  = 1;

    if(diff < 0) { sign = -1; diff = Math.abs(diff) }

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
    }

    if(agoFromNow) {
        let d = Math.floor((diff) / secondsPerDay);
        let h = Math.floor((diff - d * secondsPerDay) / secondsPerHour);
        let m = Math.floor((diff - d * secondsPerDay - h * secondsPerHour) / secondsPerMinute);
        let s = Math.floor((diff - d * secondsPerDay - h * secondsPerHour - m * secondsPerMinute));
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
        } else
            text.push(plural('second', s));

        if(sign === -1)   text.push('ago');
        if(sign === 1)    text.push('from now');
    }

    return text.join(space);
}

export default relativeTime;


   

