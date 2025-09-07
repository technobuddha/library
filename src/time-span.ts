/* eslint-disable @typescript-eslint/unified-signatures */

import {
  hoursPerDay,
  minutesPerHour,
  secondsPerMinute,
  ticksPerDay,
  ticksPerHour,
  ticksPerMinute,
  ticksPerSecond,
} from './date.ts';
import { isString } from './is-string.ts';

/**
 * Store and manipulate a duration of time
 * @group Time
 * @category Time Span
 */
export class TimeSpan {
  /**
   * Create a new TimeSpan
   */
  public constructor();
  /**
   * Create a new TimeSpan from ticks (milliseconds)
   * @param ticks - the number of ticks (milliseconds)
   */
  public constructor(ticks: number);
  /**
   * Create a new TimeSpan from hours, minutes, and seconds
   * @param h - Hours
   * @param m - minutes
   * @param s - seconds
   */
  public constructor(h: number, m: number, s: number);
  /**
   * Create a new TimeSpan from days, hours, minutes, and seconds
   * @param d - Days
   * @param h - Hours
   * @param m - minutes
   * @param s - seconds
   */
  public constructor(d: number, h: number, m: number, s: number);
  /**
   * Create a new TimeSpan from days, hours, minutes, seconds, and milliseconds
   * @param d - Days
   * @param h - Hours
   * @param m - minutes
   * @param s - seconds
   * @param ms - milliseconds
   */
  public constructor(d: number, h: number, m: number, s: number, ms: number);
  /**
   * Create a new TimeSpan from a formatted string
   * @param text - formatted timespan (dd:hh:mm:ss.fff) leading zero fields can be omitted
   */
  public constructor(text: string);
  public constructor(...args: unknown[]) {
    let sign = 1;
    let d = 0;
    let h = 0;
    let m = 0;
    let s = 0;
    let ms = 0;

    switch (args.length) {
      case 0: {
        d = 0;
        h = 0;
        m = 0;
        s = 0;
        ms = 0;

        break;
      }
      case 1: {
        if (isString(args[0])) {
          let [text] = args;

          if (text.startsWith('-')) {
            sign = -1;
            text = text.slice(1);
          }

          const matches = /^(\d{1,2})(?::(\d\d)(?::(\d\d)(?::(\d\d))?)?)?(?:\.(\d{1,3}))?$/u.exec(
            text,
          );
          if (matches) {
            d = Number(matches[1]);
            h = Number(matches[2]);
            m = Number(matches[3]);
            s = Number(matches[4]);
            ms = matches[5] ? Math.floor(Number(`0.${matches[5]}`) * 1000) : Number.NaN;

            while (Number.isNaN(s)) {
              s = m;
              m = h;
              h = d;
              d = 0;
            }
          } else {
            d = 0;
            h = 0;
            m = 0;
            s = 0;
            ms = 0;
          }
        } else {
          ms = args[0] as number;
          d = 0;
          h = 0;
          m = 0;
          s = 0;
        }

        break;
      }
      case 3: {
        d = 0;
        h = args[0] as number;
        m = args[1] as number;
        s = args[2] as number;
        ms = 0;

        break;
      }
      default: {
        d = args[0] as number;
        h = args[1] as number;
        m = args[2] as number;
        s = args[3] as number;
        ms = args[4] as number;
      }
    }

    this.clicks =
      sign *
      ((d ? d * ticksPerDay : 0) +
        (h ? h * ticksPerHour : 0) +
        (m ? m * ticksPerMinute : 0) +
        (s ? s * ticksPerSecond : 0) +
        (ms || 0));
  }

  private readonly clicks: number;

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
    return (
      (Math.sign(this.clicks) * Math.floor(Math.abs(this.clicks) / ticksPerHour)) % hoursPerDay
    );
  }

  /**
   * Get the minutes portion
   */
  public get minutes(): number {
    return (
      (Math.sign(this.clicks) * Math.floor(Math.abs(this.clicks) / ticksPerMinute)) % minutesPerHour
    );
  }

  /**
   * Get the seconds portion
   */
  public get seconds(): number {
    return (
      (Math.sign(this.clicks) * Math.floor(Math.abs(this.clicks) / ticksPerSecond)) %
      secondsPerMinute
    );
  }

  /**
   * Get the milliseconds portion
   */
  public get milliseconds(): number {
    return (Math.sign(this.clicks) * Math.floor(Math.abs(this.clicks))) % ticksPerSecond;
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
   * @param mask - The mask
   * @returns the formatted TimeSpan
   */
  public format(mask?: string): string {
    if (mask) {
      const D = this.days;
      const S = this.seconds;
      const M = this.minutes;
      const H = this.hours;
      const F = this.milliseconds;
      const flags = {
        d: D.toString(),
        dd: D.toString().padStart(2, '0'),
        m: M.toString(),
        mm: M.toString().padStart(2, '0'),
        h: H.toString(),
        hh: H.toString().padStart(2, '0'),
        s: S.toString(),
        ss: S.toString().padStart(2, '0'),
        f: F.toString().padStart(3, '0'),
        ff: F.toString().padStart(3, '0'),
      } as { [key: string]: string };

      // cspell:ignore dmhsf
      return mask.replaceAll(/[dmhsf]{1,2}|"[^"]*"|'[^']*'/gu, ($0) =>
        $0 in flags ? flags[$0] : $0.slice(1, -1),
      );
    }
    const D = this.days;
    const H = this.hours;
    const M = this.minutes;
    const S = this.seconds;
    const F = this.milliseconds;

    let str: string;
    if (D !== 0) {
      str = `${D}d${H.toString().padStart(2, '0')}:${M.toString().padStart(2, '0')}:${S.toString().padStart(2, '0')}`;
    } else if (H === 0) {
      str = `${M}:${S.toString().padStart(2, '0')}`;
    } else {
      str = `${H}:${M.toString().padStart(2, '0')}:${S.toString().padStart(2, '0')}`;
    }
    if (F) {
      str += `.${F.toString().padStart(3, '0')}`;
    }
    return str;
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
   * @param other - TimeSpan to add to this
   * @returns a TimeSpan that is the sum of two timespans
   */
  public add(other: TimeSpan): TimeSpan {
    return new TimeSpan(this.ticks + other.ticks);
  }

  /**
   * Compare two TimeSpans
   *
   * @param t1 - First TimeSpan
   * @param t2 - Second TimeSpan
   * @returns -1 if the first time span is less then the second, 0 if they are equal, 1 if the first is greater
   */
  public static compare(t1: TimeSpan, t2: TimeSpan): number {
    return (
      t1.ticks === t2.ticks ? 0
      : Math.abs(t1.ticks) > Math.abs(t2.ticks) ? 1
      : -1
    );
  }
}
