export const empty              = '';
export const space              = ' ';
export const nbsp               = '\u00A0';
export const zwsp			    = '\u200B';

export const ticksPerSecond		= 1000;
export const secondsPerMinute	=   60;
export const minutesPerHour		=   60;
export const hoursPerDay		=   24;
export const daysPerWeek		=    7;

export const ticksPerMinute		= ticksPerSecond	* secondsPerMinute;
export const ticksPerHour		= ticksPerMinute	* minutesPerHour;
export const ticksPerDay		= ticksPerHour		* hoursPerDay;
export const ticksPerWeek		= ticksPerDay		* daysPerWeek;

export const secondsPerHour		= secondsPerMinute	* minutesPerHour;
export const secondsPerDay		= secondsPerHour	* hoursPerDay;
export const secondsPerWeek		= secondsPerDay		* daysPerWeek;

export const minutesPerDay		= minutesPerHour	* hoursPerDay;
export const minutesPerWeek		= minutesPerDay		* daysPerWeek;

export const hoursPerWeek		= hoursPerDay		* daysPerWeek;

export type DayOfWeek			= (0 | 1 | 2 | 3 | 4 | 5 | 6);

export const day			    = Object.freeze({
	sunday:		0, sun: 0, su: 0,
	monday:		1, mon: 1, mo: 1,
	tuesday:	2, tue: 2, tu: 2, tues: 2,
	wednesday:	3, wed: 3, we: 3,
	thursday:	4, thu: 4, th: 4, thur: 4, thurs: 4,
	friday:		5, fri: 5, fr: 5,
	saturday:	6, sat: 6, sa: 6,
} as Record<string, DayOfWeek>);

export type MonthOfYear	= (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11);

export const month = Object.freeze({
	january:	 0, jan:   0,
	february:	 1, feb:   1,
	march:		 2, mar:   2,
	april:		 3, apr:   3,
	may:		 4,
	june:		 5, jun:   5,
	july:		 6, jul:   6,
	august:		 7, aug:   7,
	september:	 8, sept:  8, sep: 8,
	october:	 9, oct:   9,
	november:	10, nov:  10,
	december:	11, dec:  11,
} as Record<string, MonthOfYear>);

export default {
    empty, space, nbsp, zwsp,
    ticksPerSecond, secondsPerMinute, minutesPerHour, hoursPerDay, daysPerWeek,
    ticksPerMinute, ticksPerHour, ticksPerDay, ticksPerWeek,
    secondsPerHour, secondsPerDay, secondsPerWeek,
    minutesPerDay, minutesPerWeek,
    hoursPerWeek,
    day, month
 };