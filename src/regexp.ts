/** validate a ISO formatted date */
// eslint-disable-next-line max-len
export const isoDate        = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/u;

/** validate a valid number */
export const numberString   = /^((?:NaN|[+-]?(?:(?:\d+|\d*\.\d+)(?:[Ee][+-]?\d+)?|[+-]?Infinity)))$/u;

/** validate an valid email address */
export const email          = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u;

export default { email, isoDate, numberString };
