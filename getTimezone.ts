import isDate       from 'lodash/isDate';
import { empty }    from './constants';
import padNumber    from './padNumber';

type GetTimezoneOptions = {
    GMT?: boolean,
    Z?: boolean,
};

export function getTimezone(input: Date | number, {GMT = false, Z = true}: GetTimezoneOptions = {}): string {
    let offset = isDate(input) ? input.getTimezoneOffset() : input;

    if(offset === 0)
        return GMT ? 'GMT' : Z ? 'Z' : '+00:00';
    else
    {
        var n = Math.abs(offset) / 60;
        var h = Math.floor(n);
        var m = (n - h) * 60;
        return (GMT ? 'GMT' : empty) + (offset > 0 ? '-' : '+') + padNumber(h, 2) + ':' + padNumber(m, 2);
    }
}

export default getTimezone;
