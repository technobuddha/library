export type TimeIncrement = {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
};

/**
 * Add units of time to a Date
 *
 * @remarks Negative values will subtract from the Date
 *
 * @param input Starting date
 * @param __namedParameters Amount of time to increment
 * @returns Adjusted date.
 */
export function addTime(
    input: Date,
    {   years = 0,
        months = 0,
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
        milliseconds = 0 }:  TimeIncrement = {}
):  Date {
    return new Date(
        input.getFullYear() + years,
        input.getMonth() + months,
        input.getDate() + days,
        input.getHours() + hours,
        input.getMinutes() + minutes,
        input.getSeconds() + seconds,
        input.getMilliseconds() + milliseconds
    );
}

export default addTime;
