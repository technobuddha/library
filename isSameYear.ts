type Options = {
    UTC?: boolean;
}

export function isSameYear(input1: Date, input2: Date, {UTC = false}: Options = {}): boolean {
    if(UTC)
        return input1.getUTCFullYear() === input2.getUTCFullYear();
        
    return input1.getFullYear() === input2.getFullYear();
}

export default isSameYear;