import getDaysInMonth from './getDaysInMonth';

type Options = {
    UTC?: boolean;
}

export function getEndOfMonth(input: Date, {UTC = false}: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), getDaysInMonth(input, {UTC})));
    else
        return new Date(input.getFullYear(), input.getMonth(), getDaysInMonth(input, {UTC}));
}

export default getEndOfMonth;

