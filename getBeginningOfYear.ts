import { month }                from './constants';

type Options = {
    UTC?: boolean;
};

export function getBeginningOfYear(input: Date, {UTC = false}: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), month.january, 1));
    else
        return new Date(input.getFullYear(), month.january, 1);
}

export default getBeginningOfYear;
