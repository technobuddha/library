
type Options = {
    UTC?: boolean;
}

export function getBeginningOfMonth(input: Date, {UTC = false}: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), 1));
    else
        return new Date(input.getFullYear(), input.getMonth(), 1);
}

export default getBeginningOfMonth;
