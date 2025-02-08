import { secondsPerHour, secondsPerMinute } from './constants.js';
import { getDayOfWeek } from './get-day-of-week.js';
import { getDayOfYear } from './get-day-of-year.js';
import { getISOWeekOfYear } from './get-iso-week-of-year.js';
import { getJulian } from './get-julian.js';
import { getTimezone } from './get-timezone.js';
import { ordinal } from './ordinal.js';
import { padNumber } from './pad-number.js';

const tokenizer =
  /[hHmDfO]{1,2}|[s]{1,3}|YYYY|YY|[Md]{1,4}|W(y|w{1,2}|d)|TZ|GMT|TH|T{1,2}|AM|PM|CE|BCE|AD|BC|E{2,3}|J|Q|"[^"]*"|'[^']*'/gu;

const masks: Readonly<Record<string, string>> = Object.freeze({
  default: 'YYYY-MM-DD hh:mm:ss.ff',
  rfc1123: 'ddd, DD MMM YYYY hh:mm:ss GMT',
  asctime: 'ddd MMM DD hh:mm:ss',

  shortDate: 'M/D/YY',
  mediumDate: 'MMM D, YYYY',
  longDate: 'MMMM D, YYYY',
  fullDate: 'dddd, MMMM D, YYYY',
  shortTime: 'H:mm TT',
  shortDateTime: 'M/D/YYYY H:mm TT',
  mediumTime: 'H:mm:ss TT',
  mediumDateTime: 'MMM D, YYYY H:mm:ss TT',
  longTime: 'H:mm:ss TT GMT',
  longDateTime: 'MMMM D, YYYY H:mm:ss TT GMT',
  isoDate: 'YYYY-MM-DD',
  isoDateTime: 'YYYY-MM-DD"T"hh:mm:ss',
  isoDateFull: 'YYYY-MM-DD"T"hh:mm:ss.ff',
  isoDateTimeZone: 'YYYY-MM-DD"T"hh:mm:ssTZ',
  isoDateFullZone: 'YYYY-MM-DD"T"hh:mm:ss.ffTZ',
  isoTime: 'hh:mm:ss',
  isoTimeFull: 'hh:mm:ss.ff',
  isoTimeZone: 'hh:mm:ssTZ',
  isoFullZone: 'hh:mm:ss.ffTZ',
  isoWeek: 'Wy"W"Www-Wd',
  isoWeekTime: 'Wy"W"Www-Wd"T"hh:mm:ss',
  isoWeekFull: 'Wy"W"Www-Wd"T"hh:mm:ss.ff',
  isoWeekTimeZone: 'Wy"W"Www-Wd"T"hh:mm:ssTZ',
  isoWeekFullZone: 'Wy"W"Www-Wd"T"hh:mm:ss.ffTZ',
  isoOrdinal: 'YYYY-OO',

  cookie: 'dddd, DD MMM YYYY hh:mm:ss GMT',
});
const dayOne = ['U', 'M', 'T', 'W', 'R', 'F', 'S'];
const dayTwo = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const dayAbbrev = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthAbbrev = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const monthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export type FormatDateOptions = {
  /** Format the date in the UTC timezone */
  utc?: boolean;
};

/**
 * Format a date
 *
 * @param input - The date
 * @param mask - The mask
 * @param __namedParameters - see {@link FormatDateOptions}
 * @defaultValue utc false
 */
export function formatDate(
  input: Date,
  mask?: string,
  { utc = false }: FormatDateOptions = {},
): string {
  const argMask =
    mask ?
      mask in masks ?
        masks[mask]
      : mask
    : masks.default;

  const da = utc ? input.getUTCDate() : input.getDate();
  const dy = utc ? input.getUTCDay() : input.getDay();
  const mo = utc ? input.getUTCMonth() : input.getMonth();
  const yr = utc ? input.getUTCFullYear() : input.getFullYear();
  const ho = utc ? input.getUTCHours() : input.getHours();
  const mi = utc ? input.getUTCMinutes() : input.getMinutes();
  const se = utc ? input.getUTCSeconds() : input.getSeconds();
  const ms = utc ? input.getUTCMilliseconds() : input.getMilliseconds();
  const o = utc ? 0 : input.getTimezoneOffset();

  return argMask.replaceAll(tokenizer, (token) => {
    switch (token) {
      case 'h': {
        return padNumber(ho, 0);
      } //Hours (24)
      case 'hh': {
        return padNumber(ho, 2);
      } //Hours (24)
      case 'H': {
        return padNumber(ho % 12 || 12, 0);
      } //Hours (12)
      case 'HH': {
        return padNumber(ho % 12 || 12, 2);
      } //Hours (12)
      case 'm': {
        return padNumber(mi, 0);
      } //Minutes
      case 'mm': {
        return padNumber(mi, 2);
      } //Minutes
      case 's': {
        return padNumber(se, 0);
      } //Seconds
      case 'ss': {
        return padNumber(se, 2);
      } //Seconds
      case 'sss': {
        return padNumber(ho * secondsPerHour + mi * secondsPerMinute + se, 0);
      } //Seconds
      case 'f': {
        return padNumber(ms, 0);
      } //Milliseconds
      case 'ff': {
        return padNumber(ms, 3);
      } //Milliseconds
      case 'YYYY': {
        return padNumber(yr < 1 ? -yr + 1 : yr, 4);
      } //Year
      case 'YY': {
        return padNumber((yr < 1 ? -yr + 1 : yr) % 100, 2);
      } //Year
      case 'M': {
        return padNumber(mo + 1, 0);
      } //Month
      case 'MM': {
        return padNumber(mo + 1, 2);
      } //Month
      case 'MMM': {
        return monthAbbrev[mo];
      } //Month
      case 'MMMM': {
        return monthName[mo];
      } //Month
      case 'D': {
        return padNumber(da, 0);
      } //Day
      case 'DD': {
        return padNumber(da, 2);
      } //Day
      case 'TH': {
        return ordinal(da);
      }
      case 'd': {
        return dayOne[dy];
      } //WeekDay
      case 'dd': {
        return dayTwo[dy];
      }
      case 'ddd': {
        return dayAbbrev[dy];
      } //WeekDay
      case 'dddd': {
        return dayName[dy];
      }
      case 'O': {
        return padNumber(getDayOfYear(input, { utc }), 0);
      } //Day of Year (1-366)
      case 'OO': {
        return padNumber(getDayOfYear(input, { utc }), 3);
      } //Day of Year (1-366)
      case 'Wy': {
        return padNumber(getISOWeekOfYear(input, { utc }).year, 0);
      }
      case 'Ww': {
        return padNumber(getISOWeekOfYear(input, { utc }).week, 0);
      } //Week of Year (1-53)
      case 'Www': {
        return padNumber(getISOWeekOfYear(input, { utc }).week, 2);
      } //
      case 'Wd': {
        return padNumber(getDayOfWeek(input, { utc }), 0);
      }
      case 'TZ': {
        return getTimezone(o);
      }
      case 'GMT': {
        return getTimezone(o, { gmt: true });
      }
      case 'AM': {
        return ho < 12 ? 'AM' : '';
      } //AM  / --
      case 'PM': {
        return ho < 12 ? '' : 'PM';
      } //--  / PM
      case 'T': {
        return ho < 12 ? 'A' : 'P';
      } //A   / P
      case 'TT': {
        return ho < 12 ? 'AM' : 'PM';
      } //AM  / PM
      case 'AD': {
        return yr < 1 ? '' : 'AD';
      } //--  / AD
      case 'BC': {
        return yr < 1 ? 'BC' : '';
      } //BC  / --
      case 'CE': {
        return yr < 1 ? '' : 'CE';
      } //--  / CE
      case 'BCE': {
        return yr < 1 ? 'BCE' : '';
      } //BCE / --
      case 'EE': {
        return yr < 1 ? 'BC' : 'AD';
      } //BC  / AD
      case 'EEE': {
        return yr < 1 ? 'BCE' : 'CE';
      } //BCE / CE
      case 'J': {
        return padNumber(Math.floor(getJulian(input)), 0);
      }
      case 'Q': {
        return padNumber(Math.floor((mo + 3) / 3), 0);
      }
      //RM:        Month in roman numerals (UC);
      //rm:        Month in roman numerals (LC);
      default: {
        return token.slice(1, -1);
      }
    }
  });
}
