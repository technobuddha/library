
type Options = {
    UTC?: boolean;
}

export function getBeginningOfDay(input: Date, {UTC = false}: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));
    else
        return new Date(input.getFullYear(), input.getMonth(), input.getDate());
}

export default getBeginningOfDay;
