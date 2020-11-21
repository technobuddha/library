import isNil        from 'lodash/isNil';
import compact      from 'lodash/compact';
import isRegExp     from 'lodash/isRegExp';
import zip          from 'lodash/zip';
import build        from './build';
import {month}      from './constants';
import isWhitespace from './isWhitespace';

function re(template: TemplateStringsArray, ...args: (string | RegExp)[]): RegExp {
    return new RegExp(
        build(
            pre.source,
            compact(
                zip(template, args.map(a => isRegExp(a) ? a.source : a)).flat()
            ),
            post.source
        )
    );
}

const pre           = /^\s*/;
const post          = /\s*$/;
const sep           = /(?:\s*[/.-]?\s*)/;
const mm            = /([0][1-9]|[1][012])/;
const mmm           = /(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december)/;
const dd            = /([0][1-9]|[12][0-9]|[3][01])/;
const yyyy          = /(\d{4})/;
const time          = /(?:(?:\s+|\s*t\s*)(?:(\d{1,2}):(\d{2})(?:[:](\d{1,2})(?:[.,](\d+))?)(?:\s*(a|p)(?:m)?)?))?/;
const zone          = /(?:\s*(?:(Z)|(?:gmt)?(?:([+-]\d{1,2})(?:[:](\d{2}))?)))?/;
const mdyNumeric    = re`${mm}${sep}${dd}${sep}${yyyy}${time}${zone}`;
const ymdNumeric    = re`${yyyy}${sep}${mm}${sep}${dd}${time}${zone}`;
const mdyString     = re`${mmm}${sep}${dd}${sep}${yyyy}${time}${zone}`;
const dmyString     = re`${dd}${sep}${mmm}${sep}${yyyy}${time}${zone}`;
const ymdString     = re`${yyyy}${sep}${mmm}${sep}${dd}${time}${zone}`;
const ydmString     = re`${yyyy}${sep}${dd}${sep}${mmm}${time}${zone}`;
const mNumeric      = re`${mm}`;
const myNumeric     = re`${mm}${sep}${yyyy}`;
const ymNumeric     = re`${yyyy}${sep}${mm}`;
const mString       = re`${mmm}`;
const myString      = re`${mmm}${sep}${yyyy}`;
const ymString      = re`${yyyy}${sep}${mmm}`;
const yNumeric      = re`${yyyy}`;

/**
 * Parse a string into a Date object
 * 
 * @remarks this is a little more generous about what formats it will take for a date, and if it can't match the input to one of it's supported formats it falls
 * back to new Date(text)
 * 
 * @param text The string containing a date
 * @returns new Date object
 */
export function parseDate(text: string): Date {
    const now = new Date();
    const gmt = now.getTimezoneOffset();
    let   dY  = 0;
    let   dM  = 0;
    let   dD  = 0;
    let   tH  = 0;
    let   tM  = 0;
    let   tS  = 0;
    let   tF  = 0;
    const xH  = -gmt / 60;
    const xM  = Math.abs(gmt % 60);
    let   zH  = xH;
    let   zM  = xM;

    text = text.toLowerCase();

    let match: RegExpExecArray | null;
    if((match = mdyNumeric.exec(text)) !== null) {
        dM = Number.parseInt(match[1]) - 1;
        dD = Number.parseInt(match[2]);
        dY = Number.parseInt(match[3]);
    } else if((match = ymdNumeric.exec(text)) !== null) {
        dM = Number.parseInt(match[2]) - 1;
        dD = Number.parseInt(match[3]);
        dY = Number.parseInt(match[1]);
    } else if((match = mdyString.exec(text)) !== null) {
        dM = month[match[1]];
        dD = Number.parseInt(match[2]);
        dY = Number.parseInt(match[3]);
    } else if((match = dmyString.exec(text)) !== null) {
        dM = month[match[2]];
        dD = Number.parseInt(match[1]);
        dY = Number.parseInt(match[3]);
    } else if((match = ymdString.exec(text)) !== null) {
        dM = month[match[2]];
        dD = Number.parseInt(match[3]);
        dY = Number.parseInt(match[1]);
    } else if((match = ydmString.exec(text)) !== null) {
        dM = month[match[3]];
        dD = Number.parseInt(match[2]);
        dY = Number.parseInt(match[1]);
    }

    if(isNil(match)) {
        if((match = mNumeric.exec(text)) !== null) {
            dM = Number.parseInt(match[1]) - 1;
            dY = 1000;
            dD = 1;
        } else if((match = mString.exec(text)) !== null) {
            dM = month[match[1]];
            dY = 1000;
            dD = 1;
        } else if((match = myNumeric.exec(text)) !== null) {
            dM = Number.parseInt(match[1]) - 1;
            dY = Number.parseInt(match[2]);
            dD = 1;
        } else if((match = ymNumeric.exec(text)) !== null)  {
            dM = Number.parseInt(match[2]) - 1;
            dY = Number.parseInt(match[1]);
            dD = 1;
        } else if((match = myString.exec(text)) !== null) {
            dM = month[match[1]];
            dY = Number.parseInt(match[2]);
            dD = 1;
        } else if((match = ymString.exec(text)) !== null)  {
            dM = month[match[2]];
            dY = Number.parseInt(match[1]);
            dD = 1;
        } else if((match = yNumeric.exec(text)) !== null) {
            dM    = 0;
            dY    = Number.parseInt(match[1]);
            dD    = 1;
        } else {
            //We have tried everything, so default to the built-in date parsing
            return new Date(Date.parse(text));
        }
    } else {
        tH = (isNil(match[4]) || isWhitespace(match[4])) ? 0 : Number.parseInt(match[4]);
        tM = (isNil(match[5]) || isWhitespace(match[5])) ? 0 : Number.parseInt(match[5]);
        tS = (isNil(match[6]) || isWhitespace(match[6])) ? 0 : Number.parseInt(match[6]);
        tF = (isNil(match[7]) || isWhitespace(match[7])) ? 0 : Number.parseFloat("0." + match[7]) * 1000;
        if(match[8] === 'p' && tH !== 12)
            tH += 12;
        else if(match[8] === 'a' && tH === 12)
            tH -= 12;

        if(match[9] !== 'z') {
            zH = (isNil(match[10]) || isWhitespace(match[10])) ? xH : Number.parseInt(match[10]);
            zM = (isNil(match[11]) || isWhitespace(match[11])) ? xM : Number.parseInt(match[11]);
        }
    }

    now.setFullYear(dY);
    now.setMonth(dM);
    now.setDate(dD);
    now.setHours(tH);
    now.setMinutes(tM);
    now.setSeconds(tS);
    now.setMilliseconds(tF);

    if (
        now.getFullYear()       !== dY ||
        now.getMonth()          !== dM ||
        now.getDate()           !== dD ||
        now.getHours()          !== tH ||
        now.getMinutes()        !== tM ||
        now.getSeconds()        !== tS ||
        now.getMilliseconds()   !== tF
    )
        return new Date(NaN);
    else {
        now.setMinutes(
            now.getMinutes()
            -    (xH < 0 ? (xH * 60 - xM) : (xH * 60 + xM))
            +    (zH < 0 ? (zH * 60 - zM) : (zH * 60 + zM))
        );    //Adjust the time zone
        return now;
    }
}

export default parseDate;
