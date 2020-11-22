import isString from 'lodash/isString';
import { ticksPerDay, ticksPerHour, ticksPerMinute, ticksPerSecond, hoursPerDay, minutesPerHour, secondsPerMinute } from './constants';

// TODO UNIT tests

/**
 * Store and manipulate a duration of time
 */
export class TimeSpan {
    /**
     * 
     * @param text formatted timespan (dd:hh:mm:ss.fff) leading zero fields can be ommitted
     * @param ticks the number of ticks (milliseconds)
     * @param d Days
     * @param h Hours
     * @param m minutes
     * @param s seconds
     * @param ms milliseconds
     */
    constructor(text: string)
    constructor(ticks: number)
    constructor(h: number, m: number, s: number)
    constructor(d: number, h: number, m: number, s: number)
    constructor(d: number, h: number, m: number, s: number, ms: number)
    constructor(...args: any[]) {
        let sign    = 1;
        let d       = 0;
        let h       = 0;
        let m       = 0;
        let s       = 0;
        let ms      = 0;

        if(args.length === 0) {
            d = h = m = s = ms = 0;
        } else if(args.length === 1) {
            if(isString(args[0])) {
                let text    = args[0] as string;

                if(text[0] === '-') {
                    sign    = -1;
                    text    = text.slice(1);
                }

                const matches = text.match(/^(\d{1,2})(?::(\d\d)(?::(\d\d)(?::(\d\d))?)?)?(?:\.(\d{1,3}))?$/);
                if(matches) {
                    d   = Number(matches[1]);
                    h   = Number(matches[2]);
                    m   = Number(matches[3]);
                    s   = Number(matches[4]);
                    ms  = Number(matches[5]);

                    while(Number.isNaN(s)) {
                        s = m;
                        m = h;
                        h = d;
                        d = 0;
                    }
                }
                else {
                    d = h = m = s = ms = 0;
                }
            }
            else {
                ms    = args[0] as number;
                d    = h = m = s = 0;
            }
        } else if(args.length === 3) {
            d   = 0;
            h   = args[0] ?? 0;
            m   = args[1] ?? 0;
            s   = args[2] ?? 0;
            ms  = 0;
        } else {
            d   = args[0] ?? 0;
            h   = args[1] ?? 0;
            m   = args[2] ?? 0;
            s   = args[3] ?? 0;
            ms  = args[4] ?? 0;
        }

        this.clicks = sign * ((d ? d * ticksPerDay : 0) + (h ? h * ticksPerHour : 0) + (m ? m * ticksPerMinute : 0) + (s ? s * ticksPerSecond : 0) + (ms ? ms : 0));
    }

    private clicks: number;

    /**
     * Get the days portion
     */
    public get days(): number {
        return Math.sign(this.clicks) * Math.floor(Math.abs(this.clicks) / ticksPerDay);
    }

    /**
     * Get the hours portion
     */
    public get hours(): number {
        return Math.sign(this.clicks) * Math.floor(Math.abs(this.clicks) / ticksPerHour) % hoursPerDay;
    }

    /**
     * Get the minutes portion
     */
    public get minutes(): number { 
        return Math.sign(this.clicks) * Math.floor(Math.abs(this.clicks) / ticksPerMinute) % minutesPerHour; 
    }

    /**
     * Get the seconds portion
     */
    public get seconds(): number {
        return Math.sign(this.clicks) * Math.floor(Math.abs(this.clicks) / ticksPerSecond) % secondsPerMinute; 
    }

    /**
     * Get the milliseconds portion
     */
    public get milliseconds(): number {
        return Math.sign(this.clicks) * Math.floor(Math.abs(this.clicks)) % ticksPerSecond;
    }

    /** 
     * Get the total number of ticks (milliseconds)
     */
    public get ticks(): number {
        return this.clicks;
    }

    /**
     * Get the total number of days
     */
    public get totalDays(): number {
        return this.clicks / ticksPerDay;
    }

    /**
     * Get the total number of hours
     */
    public get totalHours(): number {
        return this.clicks / ticksPerHour;
    }

    /**
     * Get the total number of minutes
     */
    public get totalMinutes(): number {
        return this.clicks / ticksPerMinute;
    }

    /**
     * Get the total number of seconds
     */
    public get totalSeconds(): number {
        return this.clicks / ticksPerSecond; 
    }

    /**
     * Get the total number of milliseconds
     */
    public get totalMilliseconds(): number {
        return this.clicks;
    }

    /**
     * Format the timespan using a mask
     * 
     * @param mask The mask
     * @returns the formatted TimeSpan 
     */
    public format(mask?: string): string {
        if(mask) {
            const D       = this.days;
            const S       = this.seconds;
            const M       = this.minutes;
            const H       = this.hours;
            const L       = this.milliseconds;
            const flags   =
            {
                d:  D.toString(),
                dd: D.toString().padStart(2, '0'),
                m:  M.toString(),
                mm: M.toString().padStart(2, '0'),
                h:  H.toString(),
                hh: H.toString().padStart(2, '0'),
                s:  S.toString(),
                ss: S.toString().padStart(2, '0'),
                l:  L.toString(),
                ll: L.toString().padStart(3, '0'),
            } as {[key: string]: string };

            return mask.replace(
                /[dmhsl]{1,2}|"[^"]*"|'[^']*'/g,
                function($0) {
                    return ($0 in flags) ? flags[$0] : $0.slice(1, $0.length - 1);
                }
            );
        } else {
            const D = this.days;
            const H = this.hours;
            const M = this.minutes;
            const S = this.seconds;
            //const L = this.milliseconds;

            if(D > 0)
                return `${D}.${ H.toString().padStart(2, '0') }:${ M.toString().padStart(2, '0') }:${ S.toString().padStart(2, '0') }`;
            else
            if(H > 0)
                return `${H}:${ M.toString().padStart(2, '0') }:${ S.toString().padStart(2, '0') }`;
            else
                return `${M}:${ S.toString().padStart(2, '0') }`;
        }
    }

    /**
     * Convert the TimeSpan to a string
     * 
     * @returns formatted string
     */
    public toString(): string {
        return this.format();
    }

    /**
     * Add two timespans
     * 
     * @param other TimeSpan to add to this
     * @returns a TimeSpan that is the sum of two timespans
     */
    public add(other: TimeSpan): TimeSpan {
        return new TimeSpan(this.ticks + other.ticks);
    }

    /**
     * Compare two TimeSpans
     * 
     * @param t1 First TimeSpan
     * @param t2 Second TimeSpan
     * @returns -1 if the first time span is less then the second, 0 if they are equal, 1 if the firt is greater
     */
    public static compare(t1: TimeSpan, t2: TimeSpan): number {
        return t1.ticks === t2.ticks ? 0 : Math.abs(t1.ticks) > Math.abs(t2.ticks) ? 1 : -1;
    }
}

export default TimeSpan;
