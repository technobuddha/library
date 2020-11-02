import isSameMonth  from './isSameMonth';

type Options = {
    UTC?: boolean;
}

export function isSameDay(input1: Date, input2: Date, {UTC = false}: Options = {}): boolean {
    if(UTC)
        return input1.getUTCDate() === input2.getUTCDate() && isSameMonth(input1, input2, {UTC});
    else
        return input1.getDate() === input2.getDate() && isSameMonth(input1, input2, {UTC});
}

export default isSameDay;
