

type Options = {
    UTC?: boolean;
}

export function isMidnight(input: Date, {UTC = false}: Options = {}): boolean {
    if(UTC)
        return input.getUTCHours() === 0 && input.getUTCMinutes() === 0 && input.getUTCSeconds() === 0 && input.getUTCMilliseconds() === 0;
    else
        return input.getHours() === 0 && input.getMinutes() === 0 && input.getSeconds() === 0 && input.getMilliseconds() === 0;
}

export default isMidnight;


