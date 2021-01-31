import isSameMonth  from './isSameMonth';

type Options = {
    /** use the UTC timezone */
    UTC?: boolean;
};

/**
 * Determine if two dates occur on the same day
 *
 * @param input1 The first date
 * @param input2 The second date
 * @param __namedParameters see {@link Options}
 * @default UTC false
 * @returns true, if the two dates fall on the same day
 */
export function isSameDay(input1: Date, input2: Date, { UTC = false }: Options = {}): boolean {
    if(UTC)
        return input1.getUTCDate() === input2.getUTCDate() && isSameMonth(input1, input2, { UTC });

    return input1.getDate() === input2.getDate() && isSameMonth(input1, input2, { UTC });
}

export default isSameDay;
