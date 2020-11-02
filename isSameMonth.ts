import isSameYear   from './isSameYear';

type Options = {
    UTC?: boolean;
}

export function isSameMonth(input1: Date, input2: Date, {UTC = false}: Options = {}): boolean {
    if(UTC)
        return input1.getUTCMonth() === input2.getUTCMonth() && isSameYear(input1, input2, {UTC});
    else
        return input1.getMonth() === input2.getMonth() && isSameYear(input1, input2, {UTC});
}

export default isSameMonth;
