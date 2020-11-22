import { secondsPerHour, secondsPerMinute } from './constants';
import padNumber                            from './padNumber';
import ordinal                              from './ordinal';
import getDayOfYear                         from './getDayOfYear';
import getWeekOfYear                        from './getISOWeekOfYear';
import getTimezone                          from './getTimezone';
import getJulian                            from './getJulian';
import getDayOfWeek                         from './getDayOfWeek';

const tokenizer = /[hHmfDO]{1,2}|s{1,3}|YYYY|YY|[Md]{1,4}|W([wy]{1,2}|d)|TZ|GMT|TH|T{1,2}|AM|PM|AD|BC|CE|BCE|E{2,3}|J|Q|"[^"]*"|'[^']*'/g;
const masks: Readonly<Record<string, string>> = Object.freeze({
    'default':          'YYYY-MM-DD hh:mm:ss.ff GMT',
    'rfc1123':          'ddd, DD MMM YYYY hh:mm:ss GMT',
    'asctime':          'ddd MMM DD hh:mm:ss',

    'shortDate':        'M/D/YY',
    'mediumDate':       'MMM D, YYYY',
    'longDate':         'MMMM D, YYYY',
    'fullDate':         'dddd, MMMM D, yyyy',
    'shortTime':        'H:mm TT',
    'shortDateTime':    'M/D/YYYY H:mm TT',
    'mediumTime':       'H:mm:ss TT',
    'mediumDateTime':   'MMM D, YYYY H:mm:ss TT',
    'longTime':         'H:mm:ss TT GMT',
    'longDateTime':     'MMMM D, YYYY H:mm:ss TT GMT',
    'ISODate':          'YYYY-MM-DD',
    'ISODateTime':      'YYYY-MM-DD"T"hh:mm:ss',
    'ISODateFull':      'YYYY-MM-DD"T"hh:mm:ss.ff',
    'ISODateTimeZone':  'YYYY-MM-DD"T"hh:mm:ssTZ',
    'ISODateFullZone':  'YYYY-MM-DD"T"hh:mm:ss.ffTZ',
    'ISOTime':          'hh:mm:ss',
    'ISOFull':          'hh:mm:ss.ff',
    'ISOTimeZone':      'hh:mm:ssTZ',
    'ISOFullZone':      'hh:mm:ss.ffTZ',
    'ISOWeek':          'Wyy-"W"Www-Wd',
    'ISOWeekTime':      'Wyy-"W"Www-Wd"T"hh:mm:ss',
    'ISOWeekFull':      'Wyy-"W"Www-Wd"T"hh:mm:ss.ff',
    'ISOWeekTimeZone':  'Wyy-"W"Www-Wd"T"hh:mm:ss.ff',
    'ISOWeekFullZone':  'Wyy-"W"Www-Wd"T"hh:mm:ss.ffTZ',
    'ISOOrdinal':       'YYYY-OO',

    'cookie':           'dddd, DD MMM YYYY hh:mm:ss GMT'
});
const dayOne        = [ 'u', 'M', 'T', 'W', 'R', 'F', 'S'];
const dayTwo        = [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ];
const dayAbbrev     = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat' ];
const dayName       = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'    ];
const monthAbbrev   = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
const monthName     = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

type Options = {
    /** Format the date in the UTC timezone */
    UTC?: boolean
};

/**
 * Format a date
 * 
 * @param input The date
 * @param mask The mask
 * @param __namedParameters see {@link Options}
 * @default UTC false
 */
export function formatDate(input: Date, mask: string, {UTC = false}: Options = {}): string
{
    mask   = masks[mask] || mask || masks['default'];

    const da = UTC ? input.getUTCDate()          : input.getDate();
    const dy = UTC ? input.getUTCDay()           : input.getDay();
    const mo = UTC ? input.getUTCMonth()         : input.getMonth();
    const yr = UTC ? input.getUTCFullYear()      : input.getFullYear();
    const ho = UTC ? input.getUTCHours()         : input.getHours();
    const mi = UTC ? input.getUTCMinutes()       : input.getMinutes();
    const se = UTC ? input.getUTCSeconds()       : input.getSeconds();
    const ms = UTC ? input.getUTCMilliseconds()  : input.getMilliseconds();
    const o  = UTC ? 0                           : input.getTimezoneOffset();

    return mask.replace (
        tokenizer,
        function(token) {
            switch(token) {
                case 'h':           return padNumber(ho, 0);                                                //Hours (24)
                case 'hh':          return padNumber(ho, 2);                                                //Hours (24)
                case 'H':           return padNumber(ho % 12 || 12, 0);                                        //Hours (12)
                case 'HH':          return padNumber(ho % 12 || 12, 2);                                        //Hours (12)
                case 'm':           return padNumber(mi, 0);                                                //Minutes
                case 'mm':          return padNumber(mi, 2);                                                //Minutes
                case 's':           return padNumber(se, 0);                                                //Seconds
                case 'ss':          return padNumber(se, 2);                                                //Seconds
                case 'sss':         return padNumber(ho * secondsPerHour + mi * secondsPerMinute + se, 0);    
                case 'f':           return padNumber(ms, 0);                                                //Milliseconds
                case 'ff':          return padNumber(ms, 3);                                                //Milliseconds
                case 'YYYY':        return padNumber(yr<1?-yr+1:yr, 4);                                        //Year
                case 'YY':          return padNumber((yr<1?-yr+1:yr) % 100, 2);                                //Year
                case 'M':           return padNumber(mo+1, 0);                                                //Month
                case 'MM':          return padNumber(mo+1, 2);                                                //Month
                case 'MMM':         return monthAbbrev[mo];                                                    //Month
                case 'MMMM':        return monthName[mo];                                                    //Month
                case 'D':           return padNumber(da, 0);                                                //Day
                case 'DD':          return padNumber(da, 2);                                                //Day
                case 'TH':          return ordinal(da);
                case 'd':           return dayOne[dy];                                                        //WeekDay
                case 'dd':          return dayTwo[dy];
                case 'ddd':         return dayAbbrev[dy];                                                    //WeekDay
                case 'dddd':        return dayName[dy];
                case 'O':           return padNumber(getDayOfYear(input), 0);                                //Day of Year (1-366)
                case 'OO':          return padNumber(getDayOfYear(input), 3);                                //Day of Year (1-366)
                case 'Wy':          return padNumber(getWeekOfYear(input).year, 0);
                case 'Wyy':         return padNumber(getWeekOfYear(input).year, 4);
                case 'Ww':          return padNumber(getWeekOfYear(input).week, 0);                            //Week of Year (1-53)
                case 'Www':         return padNumber(getWeekOfYear(input).week, 0);                            //
                case 'Wd':          return padNumber(getDayOfWeek(input), 0);
                //TODO the year might shift for ISO formats            WOY:        padNumber(getWeekOfYear(input), 0),        //Week of Year (1-53)    //TODO pad(0) & pad(2) versions
                case 'TZ':          return getTimezone(o);                            
                case 'GMT':         return getTimezone(o, { GMT: true });
                case 'AM':          return ho < 12 ? 'AM'   : '';    //AM  / --
                case 'PM':          return ho < 12 ? ''     : 'PM';  //--  / PM
                case 'T':           return ho < 12 ? 'A'    : 'P';   //A   / P
                case 'TT':          return ho < 12 ? 'AM'   : 'PM';  //AM  / PM
                case 'AD':          return yr < 1 ? ''      : 'AD';  //--  / AD
                case 'BC':          return yr < 1 ? 'BC'    : '';    //BC  / --
                case 'CE':          return yr < 1 ? ''      : 'CE';  //--  / CE
                case 'BCE':         return yr < 1 ? 'BCE'   : '';    //BCE / --
                case 'EE':          return yr < 1 ? 'BC'    : 'AD';  //BC  / AD
                case 'EEE':         return yr < 1 ? 'BCE'   : 'CE';  //BCE / CE
                case 'J':           return padNumber(Math.floor(getJulian(input)), 0);
                case 'Q':           return padNumber(Math.floor((mo + 3) / 3), 0);
                //RM:        Month in roman numerals (UC);
                //rm:        Month in roman numerals (LC);
                default:            return token.slice(1, token.length - 1);
            }
        }
    );
}

export default formatDate;
