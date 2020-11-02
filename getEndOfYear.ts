import { month } from './constants';

type Options = {
    UTC?: boolean;
}

export function getEndOfYear(input: Date, {UTC = false}: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), month.december, 31));
    else
        return new Date(input.getFullYear(), month.december, 31);
}

export default getEndOfYear;
